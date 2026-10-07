/* ═══════════════════════════════════════════════════════════════════════════════
   Capiital · the front page's behaviour
   Ported from reference/source/ in wordpress-elementor-v3-2026-10-06: useInPageLinks,
   useReadingLine, ScrollProgress, Reveal, useEngageStage, usePinnedStage and the contact
   form, with the React state turned into classes.

   On WordPress this file belongs to the capiital-site plugin and is enqueued once for the
   whole site; while the front page is still markup it is enqueued by the child theme. Either
   way it is never pasted into page content, where WordPress would filter it.

   Motion arrives; it does not perform. Every gesture here fires once and never reverses,
   except the header's state, which follows the scroll by design. Nothing intercepts the
   wheel: the two held sections are simply taller than what is pinned inside them.
   ═══════════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var doc = document, win = window;
  var still = win.matchMedia ? win.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false, addEventListener: null };
  var NAV_IDS = ["services", "learned", "cases", "people", "papers", "contact"];

  function navHeight() {
    var h = doc.querySelector("header");
    return (h && h.offsetHeight) || 64;
  }
  function on(el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts); }

  /* ── Language ───────────────────────────────────────────────────────────────
     The static build carries both languages in the markup: data-da on the element whose
     whole text is translated, data-da-label for an aria-label, data-da-placeholder for a
     field. A choice is kept so a reload holds it, exactly as the reference does.
     On WordPress none of this survives: WPML serves /da/ as its own page, and these
     attributes are simply ignored. */
  var LANG = (function () {
    var v = null;
    try { v = new URLSearchParams(win.location.search).get("lang"); } catch (e) {}
    if (!v) { try { v = win.localStorage.getItem("capiital-lang"); } catch (e) {} }
    return v === "da" ? "da" : "en";
  })();

  function applyLanguage() {
    doc.documentElement.lang = LANG;
    if (LANG === "da") {
      var i, els;
      els = doc.querySelectorAll("[data-da]");
      for (i = 0; i < els.length; i++) els[i].textContent = els[i].getAttribute("data-da");
      els = doc.querySelectorAll("[data-da-label]");
      for (i = 0; i < els.length; i++) els[i].setAttribute("aria-label", els[i].getAttribute("data-da-label"));
      els = doc.querySelectorAll("[data-da-placeholder]");
      for (i = 0; i < els.length; i++) els[i].setAttribute("placeholder", els[i].getAttribute("data-da-placeholder"));
      doc.title = "Capiital · M&A-rådgivning";
    }
    var codes = doc.querySelectorAll(".lang__code");
    for (var j = 0; j < codes.length; j++) {
      var code = codes[j], mine = code.getAttribute("lang") === "da" ? "da" : "en";
      var current = mine === LANG;
      code.classList.toggle("is-current", current);
      if (current) code.setAttribute("aria-current", "true"); else code.removeAttribute("aria-current");
      code.addEventListener("click", switchLanguage);
    }
  }
  function switchLanguage(ev) {
    var mine = this.getAttribute("lang") === "da" ? "da" : "en";
    if (mine === LANG) { ev.preventDefault(); return; }
    try {
      win.localStorage.setItem("capiital-lang", mine);
      win.sessionStorage.setItem("capiital-lang-y", String(win.scrollY));
    } catch (e) {}
  }
  applyLanguage();
  /* Returning the reader to the same place after a language change. */
  (function () {
    var y = null;
    try { y = win.sessionStorage.getItem("capiital-lang-y"); win.sessionStorage.removeItem("capiital-lang-y"); } catch (e) {}
    if (y) setTimeout(function () { win.scrollTo(0, +y); }, 150);
  })();

  /* ── Reveals · spec/50 ──────────────────────────────────────────────────────
     One observer per element, added once, never reversed.

     An observer alone is not enough, and two cases proved it. An IntersectionObserver
     reports only a *change* in intersection: an element flung past between two sampled
     frames goes from below the viewport to above it without its ratio ever rising, so no
     entry is delivered and the element stays at opacity 0 for the rest of the visit — two
     of the six principals did exactly that. And while What we learned is staged, its rail
     sits inside a window with overflow:hidden, which clips the intersection rectangle, so
     the third and fourth observations can never intersect at all.

     So the observer is the primary, and a sweep on each scroll frame is the guard: anything
     still waiting whose top has passed the top of the viewport is simply released. The set
     only shrinks, so the sweep costs nothing after the first screens. */
  var revealSweep = function () {};
  (function reveals() {
    var pending = [].slice.call(doc.querySelectorAll("[data-reveal]"));
    if (!pending.length) return;

    function release(el) {
      el.classList.add("is-in");
      var at = pending.indexOf(el);
      if (at > -1) pending.splice(at, 1);
    }
    if (!("IntersectionObserver" in win)) {
      while (pending.length) release(pending[0]);
      return;
    }
    for (var i = 0; i < pending.length; i++) {
      var el = pending[i];
      var threshold = parseFloat(el.getAttribute("data-reveal-threshold"));
      if (isNaN(threshold)) threshold = 0.2;
      var margin = el.getAttribute("data-reveal-margin") || "0px 0px -12% 0px";
      var io = new IntersectionObserver(function (entries, obs) {
        for (var n = 0; n < entries.length; n++) {
          if (entries[n].isIntersecting) { release(entries[n].target); obs.unobserve(entries[n].target); }
        }
      }, { threshold: threshold, rootMargin: margin });
      io.observe(el);
    }

    revealSweep = function () {
      for (var k = pending.length - 1; k >= 0; k--) {
        if (pending[k].getBoundingClientRect().top < 0) release(pending[k]);
      }
    };
    var raf = 0;
    on(win, "scroll", function () {
      if (!raf) raf = win.requestAnimationFrame(function () { raf = 0; revealSweep(); });
    }, { passive: true });
  })();

  /* ── Header: state, reading line, read progress · spec/01 ───────────────────
     The live link is the last of the six whose top is at or above a reading line a third of
     the way down the screen, checked on every scroll inside one frame. An
     IntersectionObserver was tried and dropped: it misses short sections, What we think
     among them. */
  (function header() {
    var head = doc.querySelector(".site-header");
    var bar = doc.querySelector("[data-progress]");
    var links = doc.querySelectorAll('.site-nav a[href^="#"], .site-menu a[href^="#"]');
    if (!head) return;
    var raf = 0;

    function check() {
      raf = 0;
      head.setAttribute("data-scrolled", win.scrollY > 40 ? "true" : "false");

      if (bar) {
        var h = doc.documentElement.scrollHeight - win.innerHeight;
        bar.style.width = (h > 0 ? Math.min(1, win.scrollY / h) * 100 : 0).toFixed(2) + "%";
      }

      var line = win.innerHeight * 0.34, live = null, i;
      for (i = 0; i < NAV_IDS.length; i++) {
        var el = doc.getElementById(NAV_IDS[i]);
        if (el && el.getBoundingClientRect().top <= line) live = NAV_IDS[i];
      }
      if (win.innerHeight + win.scrollY >= doc.documentElement.scrollHeight - 2) live = NAV_IDS[NAV_IDS.length - 1];
      for (i = 0; i < links.length; i++) {
        links[i].classList.toggle("is-live", live !== null && links[i].getAttribute("href") === "#" + live);
      }
    }
    var sched = function () { if (!raf) raf = win.requestAnimationFrame(check); };
    on(win, "scroll", sched, { passive: true });
    on(win, "resize", sched);
    check();
  })();

  /* ── The folded menu · spec/01 ──────────────────────────────────────────────
     Not modal: nothing is trapped. Escape closes it and returns focus to the button. */
  (function menu() {
    var btn = doc.querySelector(".site-menu-btn");
    var panel = doc.getElementById("site-menu");
    var label = doc.querySelector("[data-menu-label]");
    var icon = doc.querySelector("[data-menu-icon]");
    if (!btn || !panel) return;
    var ICONS = {
      menu: '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>',
      x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'
    };
    var WORDS = { en: { open: "Menu", close: "Close" }, da: { open: "Menu", close: "Luk" } };

    function set(open) {
      panel.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? WORDS[LANG].close : WORDS[LANG].open;
      if (icon) icon.innerHTML = open ? ICONS.x : ICONS.menu;
    }
    on(btn, "click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    on(panel, "click", function (ev) { if (ev.target.closest("a")) set(false); });
    on(doc, "keydown", function (ev) {
      if (ev.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
    });
  })();

  /* ── In-page links · spec/60 ────────────────────────────────────────────────
     Every #id click is caught and scrolled so the section's top meets the header's foot.
     On arrival with a hash the scroll is tried twice, because heights settle after load. */
  function scrollToSection(id, smooth) {
    var el = id === "top" ? null : doc.getElementById(id);
    if (id !== "top" && !el) return false;
    var y = el ? el.getBoundingClientRect().top + win.scrollY - navHeight() + 1 : 0;
    win.scrollTo({ top: Math.max(0, y), behavior: smooth && !still.matches ? "smooth" : "auto" });
    return true;
  }
  on(doc, "click", function (ev) {
    if (ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button) return;
    var a = ev.target.closest && ev.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (href && href.length > 1 && href.charAt(0) === "#" && scrollToSection(decodeURIComponent(href.slice(1)), true)) {
      ev.preventDefault();
      if (win.history && win.history.replaceState) win.history.replaceState(null, "", href);
    }
  });
  (function arrival() {
    var id = decodeURIComponent(win.location.hash.slice(1));
    if (!id) return;
    setTimeout(function () { scrollToSection(id, false); }, 80);
    setTimeout(function () { scrollToSection(id, false); }, 450);
  })();

  /* ── 03 · Where we engage: the held row · spec/03 ───────────────────────────
     The track is nine-tenths of a screen taller than the stage, and the stage is sticky
     inside it, so the section holds at the header while the four stages arrive left to
     right, one each quarter of the way. `best` only ever rises. Once all four have arrived
     the hold is given up for the rest of the visit, and the height is removed while the
     section is out of view so nothing on screen shifts. */
  (function engage() {
    var track = doc.querySelector("[data-svc-track]");
    var stage = doc.querySelector("[data-svc-stage]");
    var grid = doc.querySelector("[data-svc-grid]");
    if (!track || !stage || !grid) return;
    var stages = grid.querySelectorAll(".svc-q");
    var staged = false, released = false, travel = 0, raf = 0, best = 0;

    function paint(n) {
      for (var i = 0; i < stages.length; i++) {
        var here = i < n;
        stages[i].classList.toggle("is-here", here);
        stages[i].setAttribute("tabindex", here ? "0" : "-1");
      }
    }
    function show(n) { if (n > best) { best = n; paint(n); } }

    function release() {
      var r = track.getBoundingClientRect();
      if (r.bottom > 0 && r.top < win.innerHeight) return;      /* only while out of view */
      var above = r.bottom <= 0, before = track.offsetHeight;
      released = true; staged = false;
      track.classList.remove("is-staged");
      track.style.height = "";
      if (above) win.scrollTo({ top: win.scrollY - (before - track.offsetHeight), behavior: "instant" });
      win.dispatchEvent(new Event("scroll"));
    }
    function tick() {
      raf = 0;
      if (!staged) return;
      var nav = navHeight(), top = track.getBoundingClientRect().top;
      if (top <= nav) show(Math.min(4, Math.floor(Math.min(1, (nav - top) / travel) * 4) + 1));
      if (best === 4) release();
    }
    function measure() {
      if (released) { show(4); return; }
      var nav = navHeight();
      staged = win.innerWidth > 900 && !still.matches && stage.offsetHeight + nav <= win.innerHeight;
      track.classList.toggle("is-staged", staged);
      if (!staged) { track.style.height = ""; paint(4); return; }
      travel = Math.round(win.innerHeight * 0.9);
      track.style.height = (stage.offsetHeight + travel) + "px";
      if (track.getBoundingClientRect().bottom <= 0) { best = 4; paint(4); release(); return; }
      paint(best);
      tick();
    }

    /* Live by hover or focus, and only once a stage has arrived. Emphasis by withdrawal:
       the grid dims and the live stage keeps its weight. */
    function setLive(el) {
      for (var i = 0; i < stages.length; i++) stages[i].classList.toggle("is-live", stages[i] === el);
      grid.classList.toggle("has-live", !!el);
    }
    for (var i = 0; i < stages.length; i++) {
      (function (q) {
        on(q, "mouseenter", function () { if (q.classList.contains("is-here")) setLive(q); });
        on(q, "focus", function () { setLive(q); });
        on(q, "blur", function () { setLive(null); });
      })(stages[i]);
    }
    on(grid, "mouseleave", function () { setLive(null); });

    on(win, "scroll", function () { if (!raf) raf = win.requestAnimationFrame(tick); }, { passive: true });
    on(win, "resize", measure);
    if (still.addEventListener) still.addEventListener("change", measure);
    if (win.ResizeObserver) {
      new win.ResizeObserver(function () {
        if (staged) track.style.height = (stage.offsetHeight + travel) + "px";
      }).observe(stage);
    }
    measure();
  })();

  /* ── 04 · What we learned: the pinned stage · spec/04 ───────────────────────
     The left column holds at the header while the rail travels up past it at exactly the
     reader's scroll speed. The window is as tall as the left column, so the stage ends
     where the last observation ends and no empty strip follows. When the last row is
     flush the stage stands still for a third of a screen, then the rail veils out and the
     section re-forms in place as a 2×2 grid — once per page load. */
  (function learned() {
    var sec = doc.querySelector("[data-learned]") || doc.getElementById("learned");
    var track = doc.querySelector("[data-learned-track]");
    var stage = doc.querySelector("[data-learned-stage]");
    var pin = doc.querySelector("[data-learned-pin]");
    var rail = doc.querySelector("[data-learned-rail]");
    var winEl = doc.querySelector("[data-learned-window]");
    if (!sec || !track || !stage || !pin || !rail || !winEl) return;
    var active = false, grid = false, leaving = false, travel = 0, dwell = 0, navH = 0, raf = 0;

    function toGrid(flush) {
      if (grid) return;
      grid = true; active = false;
      var before = stage.getBoundingClientRect().top;
      sec.classList.remove("is-staged", "is-leaving");
      sec.classList.add("is-grid");
      if (flush) sec.classList.add("is-flushing");
      /* The grid's own gesture is learned-in, staggered 90ms. Any observation the clipped
         window never let the observer see is released here, so no cell comes up blank. */
      var waiting = sec.querySelectorAll("[data-reveal]:not(.is-in)");
      for (var i = 0; i < waiting.length; i++) waiting[i].classList.add("is-in");
      rail.style.transform = "none";
      track.style.height = "";
      winEl.style.height = "";
      var after = stage.getBoundingClientRect().top;
      if (Math.abs(after - before) > 0.5) win.scrollTo({ top: win.scrollY + (after - before), behavior: "instant" });
      win.dispatchEvent(new Event("scroll"));
    }
    function apply() {
      raf = 0;
      if (!active || grid) return;
      var raw = navH - track.getBoundingClientRect().top;
      var s = Math.min(travel, Math.max(0, raw));
      rail.style.transform = "translate3d(0," + (-s).toFixed(2) + "px,0)";
      if (!leaving && raw >= travel + dwell * 0.5) {
        leaving = true;
        sec.classList.add("is-leaving");
        setTimeout(function () { toGrid(true); }, 320);
      }
    }
    function measure() {
      if (grid) return;
      active = !still.matches && win.innerWidth > 900;
      sec.classList.toggle("is-staged", active);
      rail.style.transform = "none";
      if (!active) { track.style.height = ""; winEl.style.height = ""; return; }
      var probe = doc.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;height:var(--nav-height)";
      doc.body.appendChild(probe); navH = probe.offsetHeight; probe.remove();
      travel = Math.max(0, rail.offsetHeight - pin.offsetHeight);
      winEl.style.height = pin.offsetHeight + "px";
      dwell = Math.round(win.innerHeight * 0.35);
      track.style.height = (stage.offsetHeight + travel + dwell) + "px";
      if (track.getBoundingClientRect().bottom <= 0) { toGrid(false); return; }
      apply();
    }
    on(win, "scroll", function () { if (!raf) raf = win.requestAnimationFrame(apply); }, { passive: true });
    on(win, "resize", measure);
    if (still.addEventListener) still.addEventListener("change", measure);
    if (win.ResizeObserver) {
      var ro = new win.ResizeObserver(measure);
      ro.observe(rail); ro.observe(pin);
    }
    measure();
  })();

  /* ── The contact form · spec/20, elementor.md §6 ────────────────────────────
     Checked on submit, never while typing. Each error sits under its field, in navy; there
     is no red anywhere. A filled honeypot, or a submission inside three seconds of load,
     is shown Received and nothing is sent.
     On WordPress this becomes a native Elementor Pro Form, the floor moving into the
     elementor_pro/forms/validation hook. This handler is the staging stand-in. */
  (function contact() {
    var form = doc.querySelector("[data-contact-form]");
    if (!form) return;
    var weighing = doc.getElementById("cf-weighing");
    var address = doc.getElementById("cf-address");
    var trap = doc.getElementById("cf-website");
    var statusEl = doc.querySelector("[data-form-status]");
    var button = form.querySelector('button[type="submit"]');
    var buttonLabel = doc.querySelector("[data-submit-label]");
    var opened = Date.now();
    var sent = false;

    var COPY = {
      en: {
        needWeighing: "Please tell us, briefly, what you are weighing.",
        needAddress: "Please give an address at which we may reply.",
        badAddress: "That address appears incomplete; please look at it again.",
        sending: "Sending", send: "Message",
        sent: "Received, with thanks. A principal will reply in person.",
        failed: "The message could not be sent. Please write to contact@capiital.eu directly."
      },
      da: {
        needWeighing: "Skriv venligst kort, hvad der overvejes.",
        needAddress: "Angiv venligst en adresse, vi kan svare på.",
        badAddress: "Adressen ser ufuldstændig ud; se den venligst efter igen.",
        sending: "Sender", send: "Send",
        sent: "Modtaget, med tak. En partner svarer personligt.",
        failed: "Beskeden kunne ikke sendes. Skriv venligst direkte til contact@capiital.eu."
      }
    }[LANG];

    function clearError(field) {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
      var err = doc.getElementById(field.id + "-err");
      if (err) err.remove();
    }
    function setError(field, message) {
      clearError(field);
      var p = doc.createElement("p");
      p.className = "foot-form__err";
      p.id = field.id + "-err";
      p.textContent = message;
      field.parentNode.appendChild(p);
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", p.id);
    }
    on(weighing, "input", function () { clearError(weighing); });
    on(address, "input", function () { clearError(address); });

    on(form, "submit", function (ev) {
      ev.preventDefault();
      if (sent) return;
      clearError(weighing); clearError(address);

      var first = null;
      if (!weighing.value.trim()) { setError(weighing, COPY.needWeighing); first = weighing; }
      var a = address.value.trim();
      if (!a) { setError(address, COPY.needAddress); first = first || address; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a)) { setError(address, COPY.badAddress); first = first || address; }
      if (first) { first.focus(); return; }

      /* Caught: the visitor is told Received and nothing goes anywhere. */
      if ((trap && trap.value) || Date.now() - opened < 3000) { finish(COPY.sent); return; }

      if (buttonLabel) buttonLabel.textContent = COPY.sending;
      if (button) button.disabled = true;
      setTimeout(function () {
        finish(/formfail/.test(win.location.search) ? COPY.failed : COPY.sent);
      }, 800);
    });

    function finish(message) {
      sent = true;
      if (statusEl) statusEl.textContent = message;
      if (button) button.disabled = true;
      if (buttonLabel) buttonLabel.textContent = COPY.send;
      weighing.disabled = true; address.disabled = true;
    }
  })();
})();
