/* CAP=TAL — the only behaviour the design needs beyond CSS.
   Hover, scroll and the marquee are all handled in the stylesheet. */

(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.dataset.open = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(nav.dataset.open !== "true");
  });

  // Following a link closes the sheet; the target section is already in view
  // by the time it animates away.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.dataset.open === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // The sheet is a mobile affordance only — leaving that range resets it so it
  // can never be left stranded open over the desktop layout.
  var wide = window.matchMedia("(min-width: 861px)");
  var onChange = function (e) {
    if (e.matches) setOpen(false);
  };
  if (wide.addEventListener) wide.addEventListener("change", onChange);
  else wide.addListener(onChange);
})();
