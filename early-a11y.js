(function () {
  "use strict";
  try {
    var s = JSON.parse(localStorage.getItem("ledvision-a11y-tools"));
    if (!s || typeof s !== "object") return;
    var h = document.documentElement;
    h.classList.remove("a11y-text-1", "a11y-text-2");
    if (s.text === 1) h.classList.add("a11y-text-1");
    else if (s.text === 2) h.classList.add("a11y-text-2");
    if (s.contrast) h.classList.add("a11y-high-contrast");
    if (s.links) h.classList.add("a11y-highlight-links");
    if (s.font) h.classList.add("a11y-readable-font");
    if (s.motion) h.classList.add("a11y-stop-motion");
    if (s.cursor) h.classList.add("a11y-large-cursor");
    if (s.grayscale) h.classList.add("a11y-grayscale");
  } catch (e) {}
})();
