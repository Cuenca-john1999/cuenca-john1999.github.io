#!/usr/bin/env python3
from pathlib import Path

path = Path('assets/css/layout.css')
text = path.read_text(encoding='utf-8')
anchor = '''.focus-item__actions > .practice-details {
    margin-block-start: 0;
}
'''
insert = '''.focus-item__actions > .practice-details {
    margin-block-start: 0;
}

/* Education cards carry expandable evidence. Keep their controls close to
   the card heading instead of using the generic bottom-aligned card action. */
.education-section .focus-item__actions {
    flex: none;
    justify-content: flex-start;
}
'''
if text.count(anchor) != 1:
    raise SystemExit(f'Expected one education spacing anchor, found {text.count(anchor)}')
if '.education-section .focus-item__actions {' in text:
    raise SystemExit('Education spacing override already exists')
path.write_text(text.replace(anchor, insert, 1), encoding='utf-8')
print('Education card spacing override applied.')
