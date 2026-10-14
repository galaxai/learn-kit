#!/usr/bin/env python3
"""Heuristic checker for plain-English (ASD-STE100 style) writing.

Not a compliance tool. It flags:
  - sentences over the word limit (20 for an instruction, 25 for an explanation)
  - paragraphs with more than 6 sentences
  - -ing words (allowed only inside technical names)
  - likely passive voice
  - perfect tenses
  - common long words, with a short replacement

Input can be an .html note from this repo (only prose is checked: code, SVG,
math, scripts and styles are skipped) or a plain text / Markdown file.

Usage:
  python3 check.py FILE [--limit 20|25]
  cat text.txt | python3 check.py -

Adapted from scripts/ste_check.py in Ajith Raghavan's make-it-click skill.
"""
import re
import sys
from html.parser import HTMLParser

SUBSTITUTIONS = {
    "in order to": "to", "utilize": "use", "utilise": "use", "commence": "start",
    "initiate": "start", "terminate": "stop", "ensure": "make sure",
    "prior to": "before", "approximately": "about", "subsequently": "then / after",
    "facilitate": "help", "numerous": "many", "sufficient": "enough",
    "additional": "more", "obtain": "get", "require": "need", "replenish": "fill",
    "leverage": "use", "in the event that": "if",
}
ING_ALLOW = {"thing", "things", "string", "strings", "during", "nothing", "something",
             "anything", "everything", "bring", "spring", "ring", "king", "wing", "sing",
             "morning", "evening", "building", "meaning", "warning", "setting", "settings",
             "encoding", "listing", "ceiling", "sibling", "siblings", "heading", "headings",
             "padding", "binding", "bindings", "mapping", "mappings", "matching",
             "hashing", "casting", "parsing", "typing", "indexing", "slicing",
             "caching", "logging", "scheduling", "borrowing", "ordering"}
PASSIVE = re.compile(r"\b(is|are|was|were|be|been|being)\s+(\w+ed|\w+en)\b", re.I)
NOT_PARTICIPLE = {"even", "open", "often", "seven", "ten", "then", "when", "green", "between",
                  "golden", "wooden", "sudden", "eleven", "oxygen", "token", "kitchen", "need",
                  "red", "indeed", "speed", "feed", "seed", "shed", "bed", "wed"}
PERFECT = re.compile(r"\b(has|have|had)\s+(\w+ed|\w+en|been)\b", re.I)
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")

# HTML: elements whose text is not prose, and elements that start a new paragraph.
SKIP = {"pre", "code", "svg", "math", "script", "style", "kbd", "head", "title", "button"}
BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "figcaption", "summary", "td", "th", "dd", "dt",
         "blockquote"}


class ProseExtractor(HTMLParser):
    """Collect the prose of a note as a list of (label, text) paragraphs."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.paragraphs = []
        self.buf = []
        self.skip_depth = 0
        self.block = None
        self.line = 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.skip_depth += 1
        elif tag in BLOCK and self.skip_depth == 0:
            self.flush()
            self.block = tag
            self.line = self.getpos()[0]

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip_depth = max(0, self.skip_depth - 1)
        elif tag in BLOCK:
            self.flush()

    def handle_data(self, data):
        if self.skip_depth == 0 and self.block:
            self.buf.append(data)

    def flush(self):
        text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        if text:
            self.paragraphs.append((f"L{self.line} <{self.block}>", text))
        self.buf = []
        self.block = None


def words(s):
    return re.findall(r"[A-Za-z0-9'-]+", s)


def is_procedural(s):
    w = words(s)
    return bool(w) and w[0].lower() in {
        "make", "close", "open", "remove", "install", "set", "do", "put", "turn",
        "start", "stop", "use", "check", "read", "write", "run", "add", "click", "go",
        "copy", "paste", "save", "delete", "type", "press", "change", "replace", "fix"}


def paragraphs_from_text(text):
    out = []
    for pi, para in enumerate([p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()], 1):
        flat = re.sub(r"\n\s*[-*\d.]+\s+", ". ", para).replace("\n", " ")
        out.append((f"P{pi}", flat))
    return out


def paragraphs_from_html(text):
    p = ProseExtractor()
    p.feed(text)
    p.flush()
    return p.paragraphs


def check(paragraphs, limit=None):
    issues = []
    for label, para in paragraphs:
        sentences = [s for s in SENT_SPLIT.split(para) if words(s)]
        if len(sentences) > 6:
            issues.append((label, None, f"paragraph has {len(sentences)} sentences (max 6)"))
        for si, s in enumerate(sentences, 1):
            n = len(words(s))
            lim = limit or (20 if is_procedural(s) else 25)
            if n > lim:
                issues.append((label, si, f"{n} words (limit {lim}): {s[:70]}..."))
            low = s.lower()
            for bad, good in SUBSTITUTIONS.items():
                stem = bad if " " in bad else bad.rstrip("e")
                if re.search(r"\b" + re.escape(stem) + r"\w*\b", low):
                    issues.append((label, si, f'"{bad}" -> use "{good}"'))
            for w in words(s):
                if w.lower().endswith("ing") and len(w) > 4 and w.lower() not in ING_ALLOW:
                    issues.append((label, si, f'-ing form "{w}" (OK only in a technical name)'))
            for m in PASSIVE.finditer(s):
                if m.group(2).lower() in NOT_PARTICIPLE:
                    continue
                issues.append((label, si, f'possible passive "{m.group(0)}"'))
            for m in PERFECT.finditer(s):
                issues.append((label, si, f'perfect tense "{m.group(0)}"'))
    return issues


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])
    src = [a for a in sys.argv[1:] if not a.startswith("--") and not a.isdigit()][0]
    text = sys.stdin.read() if src == "-" else open(src, encoding="utf-8").read()
    is_html = src.endswith((".html", ".htm")) or text.lstrip()[:15].lower().startswith("<!doctype html")
    paragraphs = paragraphs_from_html(text) if is_html else paragraphs_from_text(text)
    issues = check(paragraphs, limit)
    if not issues:
        print("No issues found. (Heuristic check only.)")
        return
    for label, si, msg in issues:
        loc = label + (f" S{si}" if si else "")
        print(f"{loc:18} {msg}")
    print(f"\n{len(issues)} possible issue(s). Review each one; some may be false positives.")


if __name__ == "__main__":
    main()
