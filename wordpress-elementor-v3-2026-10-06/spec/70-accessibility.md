# 70 · Accessibility

- **Language:** `<html lang="en">` or `lang="da"` per WPML language. The language switch codes carry `lang`.
- **Landmarks:**
  - `header` (fixed)
  - `main` around the page body: front page sections, archive, legal
  - `footer#contact`
  - `nav` for the section links, with `aria-label`; `nav` for the folded menu (*Sections* / *Afsnit*); `nav` for the legal index
- **Headings:**
  - One `h1` per page: front page = hero; archive and legal = their section heading, promoted to `h1`.
  - Section headings `h2`; item titles `h3`; the archive panel title `h2` inside the dialog.
  - Do not skip levels.
- **Focus:** visible 1px navy outline, offset 2px, on every interactive element, including:
  - the quadrants in *Where we engage* (`tabindex="0"`, focus works like hover)
  - the archive cards (buttons)
  - menu options
  - the language switch
- **Archive panel:**
  - `role="dialog"`, `aria-modal`, `aria-labelledby`
  - focus to *Close* on open; Escape closes; focus returns to the card
  - Tab and Shift+Tab are kept inside the panel while it is open (in v3 since 7 October 2026)
- **Archive menus:** buttons with `aria-expanded`; options with `role="checkbox"` or `role="radio"` and
  `aria-checked`; Escape and click-outside close them.
- **Live regions:** the archive count (`aria-live="polite"`) and the form status (`role="status"`).
- **Form:**
  - labels tied to fields
  - errors linked by `aria-describedby`, with `aria-invalid`
  - focus moves to the first error
  - the honeypot is `aria-hidden`, off-screen and `tabindex="-1"`
- **Images:**
  - Skyline: decorative (`aria-hidden`, or a CSS background).
  - Logo: the link's `aria-label="Capiital"`.
  - Portraits: the person's name.
  - Publication photographs: `photo_brief`.
  - Placeholders: `role="img"` with *… to follow*.
- **Contrast:** table in `spec/00-foundations.md` §3. Slate is never used on ice. Steel is never text.
- **Motion:** everything honours `prefers-reduced-motion` (`spec/50`).
- **Touch:** hover-only content is visible on `(hover:none)` (Where we engage, Cases, archive cards).
- **Targets:** at least 24×24px for all controls. The menu button and the language codes reach this
  through padding.
