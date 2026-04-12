(function () {
  "use strict";

  var STORAGE_KEY = "ledvision-a11y-tools";

  var FALLBACK = {
    he: {
      title: "התאמות נגישות",
      openFab: "פתיחת כלי נגישות",
      closeFab: "סגירת כלי נגישות",
      panelLabel: "כלי נגישות",
      textInc: "הגדלת טקסט",
      textLevel0: "רגיל",
      textLevel1: "בינוני",
      textLevel2: "גדול",
      highContrast: "ניגודיות גבוהה",
      links: "הדגשת קישורים",
      readableFont: "גופן קריא",
      stopMotion: "עצירת אנימציות",
      largeCursor: "סמן מוגדל",
      grayscale: "מצב אפור",
      reset: "איפוס כל ההתאמות",
    },
    en: {
      title: "Accessibility options",
      openFab: "Open accessibility tools",
      closeFab: "Close accessibility tools",
      panelLabel: "Accessibility tools",
      textInc: "Larger text",
      textLevel0: "Default",
      textLevel1: "Medium",
      textLevel2: "Large",
      highContrast: "High contrast",
      links: "Highlight links",
      readableFont: "Readable font",
      stopMotion: "Stop animations",
      largeCursor: "Large cursor",
      grayscale: "Grayscale",
      reset: "Reset all",
    },
    ru: {
      title: "Параметры доступности",
      openFab: "Открыть инструменты доступности",
      closeFab: "Закрыть инструменты доступности",
      panelLabel: "Инструменты доступности",
      textInc: "Увеличить текст",
      textLevel0: "Обычный",
      textLevel1: "Средний",
      textLevel2: "Крупный",
      highContrast: "Высокий контраст",
      links: "Выделение ссылок",
      readableFont: "Читабельный шрифт",
      stopMotion: "Остановить анимации",
      largeCursor: "Крупный курсор",
      grayscale: "Оттенки серого",
      reset: "Сбросить всё",
    },
  };

  var defaults = function () {
    return { text: 0, contrast: false, links: false, font: false, motion: false, cursor: false, grayscale: false };
  };

  function getLang() {
    try {
      if (window.LedVisionI18n && typeof window.LedVisionI18n.getLang === "function") {
        return window.LedVisionI18n.getLang();
      }
    } catch (e) {}
    try {
      var s = localStorage.getItem("ledvision-lang");
      if (s && FALLBACK[s]) return s;
    } catch (e2) {}
    return "he";
  }

  function getStrings() {
    var lang = getLang();
    var t =
      window.LedVisionI18n &&
      window.LedVisionI18n.STRINGS &&
      window.LedVisionI18n.STRINGS[lang] &&
      window.LedVisionI18n.STRINGS[lang].toolbar
        ? window.LedVisionI18n.STRINGS[lang].toolbar
        : FALLBACK[lang] || FALLBACK.he;
    return t;
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      var s = JSON.parse(raw);
      if (typeof s !== "object" || s === null) return defaults();
      var d = defaults();
      if (typeof s.text === "number" && s.text >= 0 && s.text <= 2) d.text = s.text;
      ["contrast", "links", "font", "motion", "cursor", "grayscale"].forEach(function (k) {
        if (typeof s[k] === "boolean") d[k] = s[k];
      });
      return d;
    } catch (e) {
      return defaults();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function applyClasses(state) {
    var h = document.documentElement;
    h.classList.remove("a11y-text-1", "a11y-text-2");
    if (state.text === 1) h.classList.add("a11y-text-1");
    if (state.text === 2) h.classList.add("a11y-text-2");
    h.classList.toggle("a11y-high-contrast", state.contrast);
    h.classList.toggle("a11y-highlight-links", state.links);
    h.classList.toggle("a11y-readable-font", state.font);
    h.classList.toggle("a11y-stop-motion", state.motion);
    h.classList.toggle("a11y-large-cursor", state.cursor);
    h.classList.toggle("a11y-grayscale", state.grayscale);
  }

  var toolbar;
  var fab;
  var panel;
  var textBtn;
  var textHint;
  var resetBtn;
  var docClickBound = false;
  var initialized = false;

  function setPanelOpen(open) {
    if (!panel || !fab) return;
    panel.hidden = !open;
    fab.setAttribute("aria-expanded", open ? "true" : "false");
    var t = getStrings();
    fab.setAttribute("aria-label", open ? t.closeFab : t.openFab);
    if (open) {
      if (!docClickBound) {
        document.addEventListener("click", onDocClick, true);
        docClickBound = true;
      }
    } else if (docClickBound) {
      document.removeEventListener("click", onDocClick, true);
      docClickBound = false;
    }
  }

  function onDocClick(e) {
    if (!toolbar || !fab || !panel) return;
    if (toolbar.contains(e.target)) return;
    setPanelOpen(false);
  }

  function textLevelLabel(level) {
    var t = getStrings();
    if (level === 1) return t.textLevel1;
    if (level === 2) return t.textLevel2;
    return t.textLevel0;
  }

  function syncUi(state) {
    if (!textBtn || !textHint) return;
    textBtn.setAttribute("data-text-level", String(state.text));
    var t = getStrings();
    textHint.textContent = " (" + textLevelLabel(state.text) + ")";
    var desc = t.textInc + " — " + textLevelLabel(state.text);
    textBtn.setAttribute("aria-label", desc);
    textBtn.setAttribute("aria-pressed", state.text > 0 ? "true" : "false");

    document.querySelectorAll("[data-a11y-tool]").forEach(function (btn) {
      var tool = btn.getAttribute("data-a11y-tool");
      if (tool === "text") return;
      var on = false;
      if (tool === "contrast") on = state.contrast;
      else if (tool === "links") on = state.links;
      else if (tool === "font") on = state.font;
      else if (tool === "motion") on = state.motion;
      else if (tool === "cursor") on = state.cursor;
      else if (tool === "grayscale") on = state.grayscale;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  var state = loadState();

  function commit(next) {
    state = next;
    saveState(state);
    applyClasses(state);
    syncUi(state);
  }

  function initDom() {
    if (initialized) return;
    toolbar = document.getElementById("a11y-toolbar");
    fab = document.getElementById("a11y-toolbar-fab");
    panel = document.getElementById("a11y-toolbar-panel");
    textBtn = toolbar && toolbar.querySelector('[data-a11y-tool="text"]');
    textHint = document.getElementById("a11y-toolbar-text-hint");
    resetBtn = document.getElementById("a11y-toolbar-reset");
    if (!toolbar || !fab || !panel) {
      initialized = true;
      return;
    }
    initialized = true;

    applyClasses(state);
    syncUi(state);
    var t = getStrings();
    fab.setAttribute("aria-label", t.openFab);
    if (panel.getAttribute("aria-label") == null || panel.getAttribute("aria-label") === "") {
      panel.setAttribute("aria-label", t.panelLabel);
    }

    fab.addEventListener("click", function (e) {
      e.stopPropagation();
      setPanelOpen(panel.hidden);
    });

    if (textBtn) {
      textBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var nextText = state.text >= 2 ? 0 : state.text + 1;
        commit(Object.assign({}, state, { text: nextText }));
      });
    }

    document.querySelectorAll("[data-a11y-tool]").forEach(function (btn) {
      var tool = btn.getAttribute("data-a11y-tool");
      if (tool === "text") return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var next = Object.assign({}, state);
        if (tool === "contrast") next.contrast = !next.contrast;
        else if (tool === "links") next.links = !next.links;
        else if (tool === "font") next.font = !next.font;
        else if (tool === "motion") next.motion = !next.motion;
        else if (tool === "cursor") next.cursor = !next.cursor;
        else if (tool === "grayscale") next.grayscale = !next.grayscale;
        commit(next);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        commit(defaults());
      });
    }

    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key !== "Escape") return;
        if (!panel || panel.hidden) return;
        e.preventDefault();
        setPanelOpen(false);
        if (fab) fab.focus();
      },
      true
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDom);
  } else {
    initDom();
  }

  window.LedVisionA11yToolbar = {
    refresh: function () {
      var t = getStrings();
      if (fab) {
        var open = panel && !panel.hidden;
        fab.setAttribute("aria-label", open ? t.closeFab : t.openFab);
      }
      if (panel) {
        panel.setAttribute("aria-label", t.panelLabel);
      }
      syncUi(state);
    },
  };
})();
