// Answers for the quizzes in a note.
// Every <div class="quiz" data-q="…"> not graded yet (no visible .answer) becomes answerable: its options
// can be chosen, and a box takes the reasoning (or, with no options, the answer). The answers are kept
// in this browser (localStorage) and, under `bun run dev`, saved by server.ts to
// <topic>/answers/<note>.md, where the LLM reads them. Without the server, "Copy my answers" gives the
// same text to paste into the chat. The key stays in <template class="key"> and is never shown.
(function () {
  var quizzes = [].slice.call(document.querySelectorAll('div.quiz[data-q]'));
  if (!quizzes.length) return;

  var page = decodeURIComponent(location.pathname).replace(/^\//, '');
  var storeKey = 'answers:' + location.pathname;
  var answers = load();
  var bar, status, timer, savedTo = null;

  function load() { try { return JSON.parse(localStorage.getItem(storeKey)) || {}; } catch (e) { return {}; } }
  function keep() { try { localStorage.setItem(storeKey, JSON.stringify(answers)); } catch (e) {} }
  function now() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }
  function badge(q) { return q.dataset.q.toUpperCase(); }
  // graded: the LLM has moved the key into a visible .answer and recorded the learner's answer
  function open(q) { return !q.querySelector(':scope > .answer'); }

  function letter(i) { return String.fromCharCode(65 + i); }
  // answered: an option chosen, "I don't know", or (open question) some text
  function answered(q) {
    var a = answers[q.dataset.q];
    return !!a && (a.pick != null || a.idk || (!q.querySelector('.options') && !!a.text.trim()));
  }

  quizzes.forEach(function (q) {
    var ask = q.querySelector('.ask');
    if (ask) ask.dataset.badge = badge(q);
    if (!open(q)) return;

    var id = q.dataset.q, a = answers[id] || { pick: null, idk: false, text: '' };
    var list = q.querySelector('.options'), opts = list ? [].slice.call(list.children) : [];
    var box = el('textarea', {
      rows: '3', 'aria-label': (list ? 'Your reasoning for ' : 'Your answer to ') + badge(q),
      placeholder: list ? 'Write your reasoning for the answer.' : 'Write your answer and your reasoning.'
    });
    box.value = a.text || '';
    var dunno = el('button', { type: 'button' }, "I don't know");
    var state = el('span', { class: 'state' });
    var row = el('div', { class: 'row' });
    row.append(dunno, state);
    var reply = el('div', { class: 'reply' });
    reply.append(box, row);
    q.appendChild(reply);

    // options are a radio group: click (or Enter/Space) to choose one
    if (list) list.setAttribute('role', 'radiogroup');
    opts.forEach(function (li, i) {
      li.setAttribute('role', 'radio');
      li.tabIndex = 0;
      li.addEventListener('click', function () { a.pick = a.pick === i ? null : i; a.idk = false; change(); });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
      });
    });

    function show() {
      opts.forEach(function (li, i) { li.setAttribute('aria-checked', String(a.pick === i)); });
      dunno.setAttribute('aria-pressed', String(!!a.idk));
      state.textContent = answered(q) ? 'answered ' + a.at
        : list && box.value.trim() ? 'choose an option' : 'not answered yet';
    }
    function change() {
      a.text = box.value; a.at = now();
      if (a.pick == null && !a.idk && !a.text.trim()) delete answers[id]; else answers[id] = a;
      keep(); show(); later(); relock();
    }
    box.addEventListener('input', change);
    dunno.addEventListener('click', function () { a.idk = !a.idk; if (a.idk) a.pick = null; change(); });
    show();
  });

  // ---------- the text the LLM reads ------------------------------------------
  function text(node) { return node ? node.innerText.trim() : ''; }
  function indent(t) { return t.trim().split('\n').join('\n  '); }
  function markdown() {
    var title = text(document.querySelector('h1')) || document.title;
    var open_ = quizzes.filter(open);
    var missing = open_.filter(function (q) { return !answered(q); }).map(badge);
    var out = [
      '# Answers: ' + title, '',
      '- Note: `' + page + '`',
      '- Saved: ' + now(),
      '- Answered: ' + (open_.length - missing.length) + ' of ' + open_.length +
        (missing.length ? '. Not answered: ' + missing.join(', ') + '.' : '.'),
      '', 'The learner answered these in the note. The key for each question is in the note, in its `<template class="key">`.', ''
    ];
    open_.forEach(function (q) {
      var a = answers[q.dataset.q] || { pick: null, idk: false, text: '' };
      out.push('## ' + badge(q) + (q.classList.contains('predict') ? ' (predict)' : ''), '', text(q.querySelector('.ask')), '');
      var opts = [].slice.call(q.querySelectorAll('.options > li'));
      if (opts.length) {
        out.push(opts.map(function (li, i) { return letter(i) + '. ' + text(li); }).join('  \n'), '');
        out.push('- Answer: ' + (a.idk ? "I don't know" : a.pick != null ? letter(a.pick) : '(not chosen)'),
                 '- Reasoning: ' + (a.text.trim() ? indent(a.text) : '(none)'));
      } else {
        out.push('- Answer: ' + (a.text.trim() ? indent(a.text) : a.idk ? "I don't know" : '(not answered)'));
        if (a.idk && a.text.trim()) out.push("- Marked: I don't know");
      }
      if (a.at) out.push('- Time: ' + a.at);
      out.push('');
    });
    return out.join('\n');
  }

  // ---------- save to the repo (bun run dev) or offer a copy ------------------
  function later() { clearTimeout(timer); timer = setTimeout(save, 700); }
  function save() {
    fetch('/answers?page=' + encodeURIComponent('/' + page), { method: 'POST', body: markdown() })
      .then(function (r) { if (!r.ok) throw r; return r.json(); })
      .then(function (r) { savedTo = r.path; summary(); })
      .catch(function () { savedTo = null; summary(); });
  }
  function copy() {
    var md = markdown(), done = function () { status.textContent = 'Copied. Paste it in the chat.'; };
    if (navigator.clipboard) navigator.clipboard.writeText(md).then(done, fallback);
    else fallback();
    function fallback() {
      var t = el('textarea'); t.value = md; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      t.remove();
    }
  }
  function summary() {
    var open_ = quizzes.filter(open);
    var n = open_.filter(answered).length;
    bar.querySelector('strong').textContent = 'Answered ' + n + ' of ' + open_.length + '.';
    status.textContent = savedTo
      ? 'Saved to ' + savedTo + '. Tell the LLM: "check my answers".'
      : 'Kept in this browser. To send them, copy them and paste them in the chat.';
  }

  if (!quizzes.some(open)) return relock();
  bar = document.querySelector('.answers') || document.querySelector('main').appendChild(el('div', { class: 'answers' }));
  bar.replaceChildren(el('strong'), status = el('span'));
  var button = el('button', { type: 'button' }, 'Copy my answers');
  button.addEventListener('click', copy);
  bar.appendChild(button);
  summary();
  if (Object.keys(answers).length) save();
  relock();

  // ---------- lock the rest of the note until the questions above are answered ----------
  // Only in a note with <main data-lock>. Quizzes that stand next to each other open as a group.
  // Once a part is open it stays open (the count is kept), even if an answer above is cleared later.
  // ?unlocked in the address shows everything, for previews.
  function relock() {
    var main = document.querySelector('main[data-lock]');
    if (!main || /[?&]unlocked\b/.test(location.search)) return;
    var openKey = storeKey + ':opened', opened = 0;
    try { opened = Number(localStorage.getItem(openKey)) || 0; } catch (e) {}
    var i = 0;
    while (i < quizzes.length && (i < opened || !open(quizzes[i]) || answered(quizzes[i]))) i++;
    try { localStorage.setItem(openKey, String(Math.max(opened, i))); } catch (e) {}

    var gate = main.querySelector(':scope > .locked');
    var kids = [].slice.call(main.children).filter(function (k) { return k !== gate && !/^(SCRIPT|TEMPLATE)$/.test(k.tagName); });
    function top(n) { while (n.parentElement !== main) n = n.parentElement; return n; }
    function isQuiz(k) { return k && k.matches('div.quiz[data-q]'); }
    var end = -1, waiting = [];
    if (i < quizzes.length) {
      end = kids.indexOf(top(quizzes[i]));
      while (isQuiz(kids[end + 1])) end++;
      for (var k = kids.indexOf(top(quizzes[i])); k <= end; k++) {
        if (isQuiz(kids[k]) && open(kids[k]) && !answered(kids[k])) waiting.push(badge(kids[k]));
      }
    }
    kids.forEach(function (k, n) {
      if (end >= 0 && n > end) k.setAttribute('data-locked', ''); else k.removeAttribute('data-locked');
    });
    if (end < 0 || end === kids.length - 1) { if (gate) gate.remove(); return; }

    if (!gate) gate = el('div', { class: 'locked' });
    var parts = kids.slice(end + 1).filter(function (k) { return k.tagName === 'H2'; }).map(function (h) { return h.textContent.trim(); });
    gate.replaceChildren(
      el('p', {}, 'Answer ' + waiting.join(', ') + ' to open the next part. "I don\'t know" also opens it.'),
      el('p', {}, parts.length ? 'Still locked: ' + parts.join(' · ') : 'The rest of this part is still locked.'));
    gate.firstChild.prepend(el('strong', {}, 'Locked. '));
    kids[end].after(gate);
  }
})();
