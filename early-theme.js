(function () {
  "use strict";
  var KEY = "ledvision-theme";

  function systemTheme() {
    try {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch (e) {}
    return "light";
  }

  function readInitial() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === "dark" || v === "light") return v;
    } catch (e) {}
    return systemTheme();
  }

  var theme = readInitial();
  var root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme === "dark" ? "dark" : "light";
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0f172a" : "#eef2f6");
})();
