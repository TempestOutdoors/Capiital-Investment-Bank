# Open items: do not invent these

Each item has a stand-in to build now and leave editable. Mirrors the project's actions register and
the hub's *Awaiting decision* column on 6 October 2026.

## Not yet supplied

| Item | Stand-in in this build | Who supplies |
| --- | --- | --- |
| **The plugin list and pages already on the WordPress install** | Read them from the test site yourself, before building | Mathias, or read from the site |
| **Danish copy, native-speaker review** | Use `content/copy-en-da.md` as is; it is a reviewed-in-progress draft | Mathias |
| **Legal text approval** (English and Danish) | Build as drafted, with *[Draft for legal review]* visible | The firm's lawyer |
| Legal brackets: retention period *[twelve]* months, conflicts-of-interest statement, hosting and e-mail processors | Leave the brackets visible | The firm |
| Portraits for all six people | Placeholder boxes | The firm's photographer |
| Peter and Richard: full names, roles, phones, e-mails | `[Role]`, `M: +45 [0000 0000]`, `[name]@capiital.eu` | The firm |
| J.S. Wiese's phone (may be a placeholder) | As given | The firm |
| LinkedIn addresses for each person | `#` | The firm |
| The three cases: real situations, and a non-identifying photograph for each | Placeholder accounts and image boxes | The firm |
| The twelve publications: real titles, texts and photographs | Placeholder entries, each tagged with a *placeholder* term (e.g. a private taxonomy or a custom field) so they can be removed in one step | The firm |
| The typeface | Source Serif 4 + Inter. Must be changeable in two variables / Global Fonts | The firm, from `Type specimens.html` |
| The wordmark as vector artwork | `logo-rgb-white.png` (2036px wide) as a mask; replace with an SVG mask when supplied | The firm |

## Decided since the export (7 October 2026)

Phone and touch behaviour for *Where we engage*, *Cases*, the quote, the *What we think* ledger and the
footer, plus the archive panel's focus trap, are now built in v3 and written into their specs. The PDF
link in the panel is shown only when a PDF is attached. Nothing here is provisional any more.

## Held copy changes

The peer-test pass of 7 October 2026 lists eight lines to rewrite and three flags (project's
`copy-register.md`). **Build the copy as it stands in `content/copy-en-da.md`.** If the firm approves the
fixes before you finish, a refreshed copy file will follow.

## Conditional

- **Spam:** if spam persists with the honeypot and the 3-second floor, add **Cloudflare Turnstile** (not
  reCAPTCHA), and then update the *Cookies* part of the legal page in both languages. Ask the firm first.
- **Drag-and-drop ordering of publications in the admin:** not needed while the archive opens *Newest*.
  If the firm later wants a hand-set order, use the CPT's menu order with a small ordering plugin. Ask first.
