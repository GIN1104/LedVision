(function (global) {
  "use strict";

  var KEY = "ledvision-theme";

  function getLang() {
    if (global.LedVisionI18n && typeof global.LedVisionI18n.getLang === "function") {
      return global.LedVisionI18n.getLang();
    }
    return "he";
  }

  function ariaLabel(currentTheme) {
    var pack = global.LedVisionI18n && global.LedVisionI18n.STRINGS && global.LedVisionI18n.STRINGS[getLang()];
    if (!pack || !pack.nav) {
      return currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
    return currentTheme === "dark" ? pack.nav.themeUseLight : pack.nav.themeUseDark;
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function syncUI(theme) {
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0f172a" : "#eef2f6");
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", ariaLabel(theme));
    });
  }

  function persist(theme) {
    try {
      global.localStorage.setItem(KEY, theme);
    } catch (e) {}
  }

  /** Сохраняет выбор пользователя и обновляет UI. */
  function applyChoice(theme) {
    syncUI(theme);
    persist(theme);
  }

  function toggle() {
    applyChoice(currentTheme() === "dark" ? "light" : "dark");
  }

  function refreshAria() {
    syncUI(currentTheme());
  }

  function init() {
    syncUI(currentTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      if (btn.getAttribute("data-theme-listener") === "1") return;
      btn.setAttribute("data-theme-listener", "1");
      btn.addEventListener("click", toggle);
    });
  }

  global.LedVisionTheme = {
    init: init,
    refreshAria: refreshAria,
    applyChoice: applyChoice,
    toggle: toggle,
    currentTheme: currentTheme,
  };
})(typeof window !== "undefined" ? window : this);
