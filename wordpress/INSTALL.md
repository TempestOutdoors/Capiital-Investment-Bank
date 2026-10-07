# Installing, click by click

Written for `capiital.eu` as it stands on 7 October 2026: WordPress 7.0, PHP 8.4, Elementor
4.3.4 and Elementor Pro 4.3.1, Hello Elementor 3.5.1 already installed, WPML present, Yoast
present, WP Rocket present, `Capiital Blank` the active theme.

**Menu labels move between versions.** Where a label here does not match exactly, the setting
is almost always one level up or down in the same screen. Nothing below depends on a label.

**Before you start:** take a restore point. *WP Time Capsule → Backup now*, or your host's
own snapshot. Step 4 changes how every page on the site renders, and a restore point makes
that a decision rather than a risk.

---

## 0 · WP Rocket, first of all

Do this before anything else, or you will spend step 11 debugging a design that is fine.

1. **WP Rocket** in the left sidebar → **File Optimization**.
2. Under **CSS Files**, untick **Optimize CSS delivery** (it holds *Remove Unused CSS*). Save.
3. Under **JavaScript Files**, untick **Delay JavaScript execution**. Save.
4. Leave **Combine CSS files** and **Combine JavaScript files** unticked.
5. Top right → **Clear cache**.

Keep page caching, GZIP and image lazy-loading. Those help and touch nothing here.

**Why.** Almost every state in this design is a class JavaScript adds while you scroll —
`is-in`, `is-live`, `is-here`, `is-staged`, `is-grid`. *Remove Unused CSS* reads the HTML as
first served, does not find them, and deletes the rules. *Delay JavaScript* postpones the
script that measures the two held sections until you touch the page, by which time the
measurement is wrong.

## 1 · Google Fonts off

1. **Elementor → Settings → Advanced**.
2. **Google Fonts** → **Disable**. **Load Font Awesome 4 Support** → off.
3. **Save changes**.

**Why.** The legal page states as a fact that no third party is contacted when a page loads.
Both typefaces are inside the theme. The theme also refuses Google Fonts requests in PHP, but
a setting that is right beats a guard that has to fire.

## 2 · Hello Elementor is already there

Check: **Appearance → Themes**. *Hello Elementor 3.5.1* should be listed, inactive. Leave it
inactive — it is the parent, and the child is what gets activated.

If it is missing: **Add New Theme → search "Hello Elementor" → Install**, and stop there.

## 3 · Install the child theme

1. **Appearance → Themes → Add New Theme** (top of the page).
2. **Upload Theme** (top of the next page) → **Choose File** → `capiital-child-theme.zip`.
3. **Install Now**. Do **not** click Activate yet.

## 4 · Activate it

**Appearance → Themes** → hover the card titled **Capiital** → **Activate**.

The whole site changes appearance at this moment. If anything is publicly live, this is the
step to do at a quiet hour.

**Check:** open the site in a new tab. You should see an unstyled-looking page with the right
typefaces — the colours and fonts are loaded, and there is no content yet because the theme
renders none. That is correct.

**If the site goes blank or says the parent is missing:** Hello Elementor is not installed.
Go back to step 2.

## 5 · The rest of the Elementor settings

Work through **`SETTINGS.md`** now. It is the Global Colours, the type styles, the layout
numbers and the breakpoints, and it takes about twenty minutes.

The four that matter most, if you do nothing else:

- **Site Settings → Layout**: content width **1400**, container padding **0**, widgets space **0**
- **Site Settings → Theme Style → Buttons / Form Fields**: border radius **0**, no shadow
- **Settings → Features**: Flexbox Container **on**, Grid Container **on**
- **Settings → General**: Disable Default Colours **on**, Disable Default Fonts **on**

## 6 · Advanced Custom Fields

1. **Plugins → Add New Plugin** → search **Advanced Custom Fields** (by WP Engine).
2. **Install Now** → **Activate**.

The free one. The four publication fields are registered against it in code, so there is
nothing to draw in its interface.

**Install it before the plugin in step 7.** The fields register on ACF's own startup hook; if
ACF arrives second, the fields do not appear until something reloads.

## 7 · Install the plugin

1. **Plugins → Add New Plugin → Upload Plugin** (top of the page).
2. **Choose File** → `capiital-site-plugin.zip` → **Install Now** → **Activate Plugin**.

**Check:** a **Publications** item appears in the left sidebar, below Pages.

**If `/publications/` shows a 404 later:** **Settings → Permalinks → Save Changes**. Changing
nothing and saving rewrites the rules. Then **WP Rocket → Clear cache**.

## 8 · The twelve placeholder publications

1. **Publications → Placeholder entries**.
2. **Import the missing entries**.

Twelve **drafts** appear, each flagged as a placeholder. They are drafts on purpose: nothing
invented goes live without you publishing it.

**To see the archive working now**, publish two or three: **Publications → All Publications**,
tick them, **Bulk actions → Edit → Apply**, **Status → Published**, **Update**.

**To remove the whole set later**, when the firm has written its own: the same screen, **Bin
every placeholder**.

## 9 · The header and the footer

These become Theme Builder templates, so they appear on every page — the front page, the
archive and the legal page — from one place.

**The header**

1. **Templates → Theme Builder**.
2. **Import Templates** (the up-arrow icon, top right of that screen).
3. Choose `wordpress/templates/capiital-header.json` → **Import Now**.
4. The template appears under **Header**. Open it, then **Publish** (bottom left).
5. Elementor asks **Where do you want to display your Header?** → **Add Condition** →
   **Entire Site** → **Save & Close**.

**The footer**

Repeat with `wordpress/templates/capiital-footer.json`, which lands under **Footer**, also
set to **Entire Site**.

**Check:** open any page. The Logo Border sits top-left, the six section links are in the bar,
and the ice footer band is at the foot.

**The header's links.** They come from a menu so WPML can translate the labels. Build it under
**Appearance → Menus**: *Create a new menu*, name it *Sections*, add six **Custom Links** —
`#services` Where we engage, `#learned` What we learned, `#cases` Cases, `#people` Who we are,
`#papers` What we think, `#contact` How to reach us — then tick the **Primary** display
location and **Save Menu**. Until you do, the widget uses the design's own six.

## 10 · The contact form

The footer's form is a real Elementor Pro Form, so submissions are stored and the email action
runs. It is built once as a template and chosen in the widget.

1. **Templates → Saved Templates → Add New** → type **Section** → name it *Capiital form* →
   **Create Template**.
2. Drag in a **Form** widget. Set the fields:
   - **Field 1** — type *Textarea*, label *What you are weighing*, placeholder
     *A sale, an acquisition, a raise, a succession*, **Required** on, Column Width 100%, Rows 2
   - **Field 2** — type *Email*, label *Where we reply*, placeholder *name@company.eu*,
     **Required** on, Column Width 50%
   - **Field 3** — type **Honeypot**. No label. This is Elementor's own anti-spam field.
   - **Field 4** — type *Hidden*, **ID exactly `t0`**, value left empty.
3. **Submit Button** → text `Message →`.
4. **Actions After Submit** → **Email** and **Collect Submissions**.
   - Email → **To** `contact@capiital.eu`, **Subject** `Website enquiry`, **Reply-To** the
     email field's shortcode.
5. **Additional Options → Custom Messages** → on:
   - Success: *Received, with thanks. A principal will reply in person.*
   - Error: *The message could not be sent. Please write to contact@capiital.eu directly.*
   - Required: *Please tell us, briefly, what you are weighing.*
   - Invalid: *That address appears incomplete; please look at it again.*
6. **Publish**.
7. **Templates → Theme Builder → Footer** → open the Capiital footer → click the
   **Capiital · Contact** widget → **Form** → choose *Capiital form* → **Update**.

**The field named `t0` is not optional.** The plugin stamps it with the moment the page loaded
and rejects anything submitted within three seconds — a bot, in other words. Without the
field there is no floor, only the honeypot.

**Test it:** load the site, scroll to the footer, submit immediately. You should see
*Received, with thanks*, **no email should arrive**, and nothing should appear under
**Elementor → Submissions**. Wait four seconds and submit again: that one should arrive.

## 11 · The front page

1. **Pages → Add New Page**. Title it *Front page*. **Publish**.
2. **Edit with Elementor**.
3. The gear icon, bottom left → **Page Layout** → **Elementor Canvas** → **Update**.
4. Drag in an **HTML** widget and paste **`dist/sections-grouped/2-middle.html`** whole.
5. **Update**.
6. **Settings → Reading → Your homepage displays → A static page → Homepage: Front page** →
   **Save Changes**.

**Why `2-middle.html` and not all three pieces.** Pieces 1 and 3 carry the header and the
footer, and the Theme Builder templates from step 9 now own those. Piece 2 is everything
between them.

**Check:** the hero's skyline band brightens from the top-left once on load. Scrolling,
*Where we engage* holds for about a screen while the four stages arrive left to right.
*What we learned* pins its left column and re-forms into a 2×2 grid. The ledger's four rows
open the archive.

## 12 · The archive page

1. **Pages → Add New Page**. Title *Archive*. Check the permalink reads `/archive/`.
   **Publish**, then **Edit with Elementor**.
2. Gear icon → **Page Layout → Elementor Canvas**.
3. In the widget panel search **Capiital** — the six widgets are in their own category. Drag
   in **Capiital · Archive**.
4. **Update**.

**Check:** the cards appear, five across at full width. Resting on one shows its particulars
on a band of ice. Clicking one opens the reading panel, the address gains `#slug`, and
Escape closes it. The four filter dropdowns and the order menu all work.

**If the grid is empty** and you are logged in, a line explains why: no publication is
published yet. Go back to step 8.

## 13 · The legal page

1. **Pages → Add New Page**. Title *Legal*. Permalink `/legal/`. **Publish** →
   **Edit with Elementor** → **Elementor Canvas**.
2. One **HTML** widget. Open `templates/legal.html` in a text editor and copy everything
   between `<main class="page-main" id="main">` and its closing `</main>`, inclusive. Paste.
3. **Update**.

**Check:** four parts, and the index on the left stays put while the text scrolls past it,
marking the part you are reading.

**Do not remove `[Draft for legal review]`** until the firm's lawyer has approved the text.
Two other bracketed items — the retention period `[twelve]` and the conflicts-of-interest
statement — are for the firm to fill, and must not be invented.

## 14 · Walk the checklist

`wordpress-elementor-v3-2026-10-06/checklist.md` in the repository. Work it at **1440, 1024
and 390px** wide, and once more with your operating system's *Reduce motion* turned on. The
lines about Danish will not pass yet; everything else should.

Then **WP Rocket → Clear cache**, and look at the site logged out, in a private window.

## 15 · Tidy up

**Appearance → Themes** → delete **Capiital Blank** and **CAP=TAL One-Page**. Both are
superseded. Astra and Aveo Child can go too once you are sure nothing references them.

**Plugins** → consider deactivating **Ultimate Addons for Elementor Pro**. This design uses
none of it, and it loads CSS, JavaScript and icon fonts on every page.

---

## Later, and deliberately not now

**Converting the sections to widgets.** Steps 11 and 13 paste HTML. Three of those sections
have real widgets ready — *Capiital · Front page*, *Where we engage*, *What we learned* — and
swapping each one makes its text editable in the panel. Do them one at a time, checking the
page after each.

One seam to know about before you start. The rule that closes the gap between *What we
learned* and the quote beneath it is an adjacent-sibling selector, so the two must remain
siblings. Split into separate Elementor widgets they are not, and an eggshell strip opens
between them on release. Converting *What we learned* therefore needs a small change to the
stylesheet first — ask for it rather than working around it.

**WPML and the Danish.** Last, and after WPML is updated: it is four major versions behind,
and the plugin's `wpml-config.xml` depends on a current one to see the widgets' fields.

**Site Kit.** While Google Analytics is active, the legal page's cookie paragraph is not true
and the checklist's third-party line fails. Switching the Analytics module off — Search
Console and PageSpeed load nothing on the front end and can stay — settles it with no banner
and no rewrite.
