/* ═══════════════════════════════════════════════════════════════════════════════
   Capiital · the archive
   Ported from reference/source/archive.jsx: the four filter dropdowns, the order menu,
   the card grid and the reading panel, with the React state turned into classes.

   One renderer, two sources of data. It reads a JSON island — <script type="application/json"
   id="arc-data"> — and never knows where it came from. On the static page build.sh writes
   that island from content/publications.json; on WordPress the Capiital · Archive widget
   writes it from the publication post type. Nothing about a card is styled per entry, so a
   publication the firm adds appears with the formatting and behaviour already on it.

   Filters combine AND across groups and OR within one. Order defaults to newest.
   ═══════════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var doc = document, win = window;
  var root = doc.querySelector("[data-archive]");
  var island = doc.getElementById("arc-data");
  if (!root || !island) return;

  var DATA;
  try { DATA = JSON.parse(island.textContent); } catch (e) { return; }
  var ENTRIES = DATA.publications || [];
  var TERMS = DATA.terms || {};
  if (!ENTRIES.length) return;

  var LANG = doc.documentElement.lang === "da" ? "da" : "en";
  var L = function (en, da) { return LANG === "da" ? da : en; };

  /* A filter matches on the English value, in both languages; only the label is translated.
     That is the reference's arrangement, and WPML keeps it, so an entry filtered on /da/
     answers to the same term as on /. */
  function term(v) { return (LANG === "da" && TERMS[v]) || v; }
  function text(entry, key) {
    var side = entry[LANG] || entry.en;
    return (side && side[key]) || entry.en[key];
  }
  function year(entry) { return entry.date.slice(0, 4); }
  function dateOf(entry) {
    var d = new Date(entry.date + "T12:00:00");
    var s = d.toLocaleDateString(LANG === "da" ? "da-DK" : "en-GB", { month: "long", year: "numeric" });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function valueOf(entry, key) { return key === "year" ? year(entry) : entry[key]; }

  var GROUPS = [
    { key: "kind", label: L("Type", "Type") },
    { key: "sector", label: L("Sector", "Sektor") },
    /* The four stages are a fixed fact of the firm, repeated in the footer and in Where we
       engage. They are listed in the order of an ownership, never alphabetically. */
    { key: "stage", label: L("Stage", "Fase"),
      order: ["Before a transaction", "After a transaction", "During ownership", "Before exit"] },
    { key: "year", label: L("Year", "År") }
  ];
  var SORTS = [
    ["new", L("Newest", "Nyeste")],
    ["old", L("Oldest", "Ældste")],
    ["az", L("A–Z", "A–Å")],
    ["za", L("Z–A", "Å–A")]
  ];

  /* Only values that occur in at least one publication are offered. Across sectors sorts
     last among the sectors; years run newest first. */
  function optionsFor(group) {
    var seen = {}, vals = [];
    ENTRIES.forEach(function (e) {
      var v = valueOf(e, group.key);
      if (v && !seen[v]) { seen[v] = 1; vals.push(v); }
    });
    if (group.order) return group.order.filter(function (v) { return seen[v]; });
    if (group.key === "year") return vals.sort().reverse();
    return vals.sort(function (a, b) {
      var across = (a === "Across sectors") - (b === "Across sectors");
      return across || term(a).localeCompare(term(b), LANG);
    });
  }

  var state = { kind: [], sector: [], stage: [], year: [] };
  var sort = "new";
  var openMenu = null;
  var openSlug = null;
  var returnTo = null;

  var el = {
    menus: root.querySelector("[data-arc-menus]"),
    order: root.querySelector("[data-arc-order]"),
    count: root.querySelector("[data-arc-count]"),
    clear: root.querySelector("[data-arc-clear]"),
    grid: root.querySelector("[data-arc-grid]"),
    empty: root.querySelector("[data-arc-empty]")
  };

  function svg(size, stroke, body) {
    return '<svg aria-hidden="true" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="' + stroke + '" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }
  var CHEVRON = svg(12, 2, '<path d="m6 9 6 6 6-6"></path>');
  var TICK = svg(10, 3, '<path d="M20 6 9 17l-5-5"></path>');
  var CLOSE = svg(16, 1.25, '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>');
  var CAMERA = '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ── The dropdowns ──────────────────────────────────────────────────────────
     Checkboxes for a filter, radios for the order. Only one is open at a time;
     a click outside or Escape closes it. Choosing an order closes its menu, while a
     filter stays open so several can be picked. */
  function menuMarkup(id, label, options, selected, single, end) {
    var count = single || !selected.length ? "" : " (" + selected.length + ")";
    var html = '<div class="arc-menu' + (end ? " is-end" : "") + '" data-arc-menu="' + id + '">' +
      '<button type="button" class="arc-menu-btn" aria-haspopup="true" aria-expanded="' + (openMenu === id) + '">' +
      esc(label) + esc(count) + " " + CHEVRON + "</button>";
    if (openMenu === id) {
      html += '<div class="arc-pop" role="' + (single ? "radiogroup" : "group") + '" aria-label="' + esc(label) + '">';
      options.forEach(function (pair) {
        var on = selected.indexOf(pair[0]) > -1;
        html += '<button type="button" class="arc-opt" role="' + (single ? "radio" : "checkbox") +
          '" aria-checked="' + on + '" data-arc-pick="' + esc(pair[0]) + '">' +
          '<span class="arc-box' + (single ? " is-radio" : "") + '">' + (!single && on ? TICK : "") + "</span>" +
          esc(pair[1]) + "</button>";
      });
      html += "</div>";
    }
    return html + "</div>";
  }

  function drawBar() {
    el.menus.innerHTML = GROUPS.map(function (g) {
      var opts = optionsFor(g).map(function (v) { return [v, term(v)]; });
      return menuMarkup(g.key, g.label, opts, state[g.key], false, false);
    }).join("");
    var current = SORTS.filter(function (s) { return s[0] === sort; })[0];
    el.order.innerHTML = menuMarkup("order", L("Order: ", "Rækkefølge: ") + current[1], SORTS, [sort], true, true);
  }

  /* ── The cards ──────────────────────────────────────────────────────────────
     The photograph alone at rest; the particulars veil in over its foot on hover or focus.
     On touch, which cannot hover, they sit beneath the photograph throughout. */
  function photo(entry, ratio, large) {
    var brief = text(entry, "photo");
    if (entry.img) {
      return '<img src="' + esc(entry.img) + '" alt="' + esc(brief) + '" style="aspect-ratio:' + ratio + '">';
    }
    return '<div class="arc-ph" role="img" style="aspect-ratio:' + ratio + '" aria-label="' +
      esc(L("Photograph to follow: ", "Fotografi følger: ") + brief) + '">' +
      svg(large ? 30 : 22, 1.25, CAMERA) +
      '<span class="arc-ph__brief">' + esc(brief) + "</span></div>";
  }

  function cardMarkup(entry) {
    return '<button type="button" class="arc-card" data-arc-open="' + esc(entry.slug) + '" ' +
      'aria-haspopup="dialog" aria-label="' + esc(text(entry, "title")) + '">' +
      photo(entry, "4 / 5", false) +
      '<span class="arc-info" aria-hidden="true">' +
        '<span class="arc-info__meta">' + esc(term(entry.kind)) + " &middot; " + esc(dateOf(entry)) + "</span>" +
        '<span class="arc-info__title">' + esc(text(entry, "title")) + "</span>" +
        '<span class="arc-info__summary">' + esc(text(entry, "summary")) + "</span>" +
        '<span class="arc-info__meta">' + esc(term(entry.sector)) + "</span>" +
      "</span></button>";
  }

  function matching() {
    return ENTRIES.filter(function (e) {
      return GROUPS.every(function (g) {
        return !state[g.key].length || state[g.key].indexOf(valueOf(e, g.key)) > -1;
      });
    }).sort(function (a, b) {
      if (sort === "new") return b.date.localeCompare(a.date);
      if (sort === "old") return a.date.localeCompare(b.date);
      var ta = text(a, "title"), tb = text(b, "title");
      return sort === "az" ? ta.localeCompare(tb, LANG) : tb.localeCompare(ta, LANG);
    });
  }

  function draw() {
    drawBar();
    var list = matching();
    el.grid.innerHTML = list.map(cardMarkup).join("");
    el.grid.hidden = !list.length;
    el.empty.hidden = !!list.length;

    el.count.innerHTML = '<span class="arc-count__n">' + list.length + "</span> " +
      esc(L("of", "af")) + " " + ENTRIES.length + " " + esc(L("publications", "publikationer"));

    var active = GROUPS.some(function (g) { return state[g.key].length; });
    el.clear.hidden = !active;
  }

  /* ── The reading panel ──────────────────────────────────────────────────────
     The site stays visible, muted, behind it. Focus goes to Close on open, Tab is kept
     inside while it is open, Escape closes, and focus returns to the card that opened it.
     Opening sets #slug so an entry can be sent as a link. */
  var veil = null;

  function panelMarkup(entry) {
    var meta = [
      [L("Type", "Type"), term(entry.kind)],
      [L("Sector", "Sektor"), term(entry.sector)],
      [L("Stage", "Fase"), term(entry.stage)],
      [L("Published", "Udgivet"), dateOf(entry)],
      [L("Reading time", "Læsetid"), entry.read]
    ];
    var body = (text(entry, "body") || []).map(function (p) {
      return '<p class="arc-detail__body">' + esc(p) + "</p>";
    }).join("");
    var rows = meta.map(function (m) {
      return '<div class="arc-meta__row"><dt>' + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>";
    }).join("");
    /* The PDF link is shown only when a PDF is attached (spec/30). */
    var pdf = entry.pdf
      ? '<a class="arrow-link arc-pdf" href="' + esc(entry.pdf) + '">' +
        esc(L("Download the PDF", "Hent PDF")) + ' <span aria-hidden="true">&rarr;</span></a>'
      : "";
    return '<div class="arc-panel" role="dialog" aria-modal="true" aria-labelledby="arc-title">' +
      '<div class="arc-head">' +
        '<span class="arc-head__meta">' + esc(term(entry.kind)) + " &middot; " + esc(dateOf(entry)) + "</span>" +
        '<button type="button" class="arc-close" data-arc-close>' + esc(L("Close", "Luk")) + " " + CLOSE + "</button>" +
      "</div>" +
      '<div class="arc-detail">' +
        '<div class="arc-detail__photo">' + photo(entry, "4 / 3", true) + "</div>" +
        '<div class="arc-detail__text">' +
          '<h2 id="arc-title">' + esc(text(entry, "title")) + "</h2>" +
          '<p class="arc-detail__summary">' + esc(text(entry, "summary")) + "</p>" +
          body +
          '<dl class="arc-meta">' + rows + "</dl>" + pdf +
        "</div>" +
      "</div></div>";
  }

  function onPanelKey(ev) {
    if (ev.key === "Escape") { close(); return; }
    if (ev.key !== "Tab" || !veil) return;
    var panel = veil.querySelector(".arc-panel");
    var f = panel.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    var inside = panel.contains(doc.activeElement);
    if (ev.shiftKey && (doc.activeElement === first || !inside)) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && (doc.activeElement === last || !inside)) { ev.preventDefault(); first.focus(); }
  }

  function open(slug, from) {
    var entry = ENTRIES.filter(function (e) { return e.slug === slug; })[0];
    if (!entry || veil) return;
    returnTo = from || null;
    openSlug = slug;

    veil = doc.createElement("div");
    veil.className = "arc-veil";
    veil.innerHTML = panelMarkup(entry);
    doc.body.appendChild(veil);
    doc.documentElement.style.overflow = "hidden";
    /* One frame, so the opacity transition has a starting state to move from. */
    win.requestAnimationFrame(function () { veil && veil.classList.add("is-in"); });

    veil.addEventListener("mousedown", function (ev) { if (ev.target === veil) close(); });
    var closeBtn = veil.querySelector("[data-arc-close]");
    closeBtn.addEventListener("click", close);
    closeBtn.focus({ preventScroll: true });
    win.addEventListener("keydown", onPanelKey);

    setHash(slug);
  }

  function close() {
    if (!veil) return;
    win.removeEventListener("keydown", onPanelKey);
    veil.remove();
    veil = null;
    openSlug = null;
    doc.documentElement.style.overflow = "";
    setHash(null);
    if (returnTo) { returnTo.focus({ preventScroll: true }); returnTo = null; }
  }

  function setHash(slug) {
    if (!win.history || !win.history.replaceState) return;
    win.history.replaceState(null, "", win.location.pathname + win.location.search + (slug ? "#" + slug : ""));
  }

  /* ── Events ─────────────────────────────────────────────────────────────────
     One delegated listener on the archive, so redrawing the bar and the grid never leaves
     a stale handler behind. */
  root.addEventListener("click", function (ev) {
    var t = ev.target;

    var card = t.closest("[data-arc-open]");
    if (card) { open(card.getAttribute("data-arc-open"), card); return; }

    var opt = t.closest("[data-arc-pick]");
    if (opt) {
      var id = opt.closest("[data-arc-menu]").getAttribute("data-arc-menu");
      var v = opt.getAttribute("data-arc-pick");
      if (id === "order") { sort = v; openMenu = null; }
      else {
        var at = state[id].indexOf(v);
        if (at > -1) state[id].splice(at, 1); else state[id].push(v);
      }
      draw();
      return;
    }

    var btn = t.closest(".arc-menu-btn");
    if (btn) {
      var menuId = btn.closest("[data-arc-menu]").getAttribute("data-arc-menu");
      openMenu = openMenu === menuId ? null : menuId;
      drawBar();
      return;
    }

    if (t.closest("[data-arc-clear]")) {
      GROUPS.forEach(function (g) { state[g.key] = []; });
      draw();
    }
  });

  doc.addEventListener("mousedown", function (ev) {
    if (openMenu && !ev.target.closest("[data-arc-menu]")) { openMenu = null; drawBar(); }
  });
  doc.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && openMenu && !veil) { openMenu = null; drawBar(); }
  });

  draw();

  /* Loading /archive/#slug opens that entry. */
  var hash = decodeURIComponent(win.location.hash.slice(1));
  if (hash) {
    var target = root.querySelector('[data-arc-open="' + hash.replace(/"/g, "") + '"]');
    open(hash, target);
  }
})();
