(function () {
  if (window.LedVisionI18n && typeof window.LedVisionI18n.init === "function") {
    window.LedVisionI18n.init();
  }

  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var form = document.getElementById("lead-form");
  var drawerRoot = document.getElementById("a11y-drawer-root");
  var drawerBackdrop = document.getElementById("a11y-drawer-backdrop");
  var drawerClose = document.getElementById("a11y-drawer-close");
  var drawerOpenBtn = document.getElementById("open-a11y-drawer");
  var drawerPanel = document.getElementById("a11y-drawer-panel");
  var lastFocusBeforeDrawer = null;

  function setNavOpen(open) {
    if (!nav || !burger) return;
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setA11yDrawerOpen(open) {
    if (!drawerRoot) return;
    drawerRoot.classList.toggle("is-open", open);
    drawerRoot.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("a11y-drawer-open", open);
    if (open) {
      lastFocusBeforeDrawer = document.activeElement;
      window.setTimeout(function () {
        if (drawerClose) drawerClose.focus();
      }, 100);
    } else {
      if (lastFocusBeforeDrawer && typeof lastFocusBeforeDrawer.focus === "function") {
        lastFocusBeforeDrawer.focus();
      } else if (drawerOpenBtn) {
        drawerOpenBtn.focus();
      }
    }
  }

  var navClose = document.getElementById("nav-close");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    if (navClose) {
      navClose.addEventListener("click", function () {
        setNavOpen(false);
        if (burger) burger.focus();
      });
    }

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(min-width: 769px)").matches) {
          setNavOpen(false);
        }
      },
      { passive: true }
    );
  }

  if (drawerRoot && drawerOpenBtn) {
    drawerOpenBtn.addEventListener("click", function () {
      setA11yDrawerOpen(true);
    });
  }

  function closeA11yDrawer() {
    setA11yDrawerOpen(false);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeA11yDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener("click", closeA11yDrawer);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (drawerRoot && drawerRoot.classList.contains("is-open")) {
      e.preventDefault();
      closeA11yDrawer();
      return;
    }
    if (burger && nav && nav.classList.contains("is-open")) {
      setNavOpen(false);
      burger.focus();
    }
  });

  document.querySelectorAll(".blog-card--stub").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  // Facebook gallery: fallback image for unavailable media (fbcdn links may expire).
  (function initFbMediaFallbacks() {
    var root = document.getElementById("fb-gallery");
    if (!root) return;
    var imgs = root.querySelectorAll("img");
    if (!imgs || !imgs.length) return;

    function markUnavailable(img) {
      if (!img || img.getAttribute("data-fb-fallback-applied") === "1") return;
      img.setAttribute("data-fb-fallback-applied", "1");
      img.setAttribute("src", "assets/fb-unavailable.svg");
      img.setAttribute("alt", "");
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    }

    imgs.forEach(function (img) {
      img.addEventListener("error", function () {
        markUnavailable(img);
      });
    });
  })();

  // Facebook gallery: load official video embed iframe on hover/focus (no MP4 on our server).
  (function initFbHoverEmbeds() {
    var items = document.querySelectorAll("[data-fb-embed]");
    if (!items || !items.length) return;
    items.forEach(function (a) {
      var href = a.getAttribute("data-fb-embed");
      if (!href) return;
      var host = a.querySelector(".fb-media__embed-host");
      if (!host) return;

      var loaded = false;
      function pluginUrl() {
        return (
          "https://www.facebook.com/plugins/video.php?href=" +
          encodeURIComponent(href) +
          "&show_text=false&width=560&height=560"
        );
      }

      function mount() {
        if (loaded) return;
        loaded = true;
        var ifr = document.createElement("iframe");
        ifr.className = "fb-media__iframe";
        ifr.setAttribute("src", pluginUrl());
        ifr.setAttribute("title", "Facebook video");
        ifr.setAttribute("loading", "lazy");
        ifr.setAttribute("allowfullscreen", "true");
        ifr.setAttribute(
          "allow",
          "autoplay; encrypted-media; picture-in-picture; fullscreen"
        );
        var done = false;
        var t = window.setTimeout(function () {
          if (done) return;
          // If iframe doesn't load, keep preview but swap it to "unavailable".
          var preview = a.querySelector(".fb-media__preview");
          if (preview && preview.tagName === "IMG") {
            preview.setAttribute("src", "assets/fb-unavailable.svg");
          }
        }, 12000);

        ifr.addEventListener("load", function () {
          done = true;
          window.clearTimeout(t);
          a.classList.add("is-embed-loaded");
        });
        host.appendChild(ifr);
      }

      function unmount() {
        host.innerHTML = "";
        loaded = false;
      }

      a.addEventListener("mouseenter", mount);
      a.addEventListener("focusin", mount);
      a.addEventListener("mouseleave", unmount);
      a.addEventListener("focusout", function (e) {
        if (!a.contains(e.relatedTarget)) unmount();
      });
    });
  })();

  // Facebook gallery: load official post embed iframe on hover/focus (for photos/posts).
  (function initFbHoverPosts() {
    var items = document.querySelectorAll("[data-fb-post]");
    if (!items || !items.length) return;
    items.forEach(function (a) {
      var href = a.getAttribute("data-fb-post");
      if (!href) return;
      var host = a.querySelector(".fb-media__embed-host");
      if (!host) return;

      var loaded = false;
      function pluginUrl() {
        return (
          "https://www.facebook.com/plugins/post.php?href=" +
          encodeURIComponent(href) +
          "&show_text=false&width=560"
        );
      }

      function mount() {
        if (loaded) return;
        loaded = true;
        var ifr = document.createElement("iframe");
        ifr.className = "fb-media__iframe";
        ifr.setAttribute("src", pluginUrl());
        ifr.setAttribute("title", "Facebook post");
        ifr.setAttribute("loading", "lazy");
        ifr.setAttribute("allowfullscreen", "true");

        var done = false;
        var t = window.setTimeout(function () {
          if (done) return;
          var preview = a.querySelector(".fb-media__preview");
          if (preview && preview.tagName === "IMG") {
            preview.setAttribute("src", "assets/fb-unavailable.svg");
          }
        }, 12000);

        ifr.addEventListener("load", function () {
          done = true;
          window.clearTimeout(t);
          a.classList.add("is-embed-loaded");
        });

        host.appendChild(ifr);
      }

      function unmount() {
        host.innerHTML = "";
        loaded = false;
        a.classList.remove("is-embed-loaded");
      }

      a.addEventListener("mouseenter", mount);
      a.addEventListener("focusin", mount);
      a.addEventListener("mouseleave", unmount);
      a.addEventListener("focusout", function (e) {
        if (!a.contains(e.relatedTarget)) unmount();
      });
    });
  })();

  // Facebook gallery: zoom on click to 90vw (16:9).
  (function initFbClickZoom() {

    var gallery = document.getElementById("fb-gallery");
    if (!gallery) return;

    var items = gallery.querySelectorAll("[data-fb-embed], [data-fb-post]");
    if (!items || !items.length) return;

    var overlay = document.createElement("div");
    overlay.className = "fb-zoom";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = '<div class="fb-zoom__panel"></div>';
    document.body.appendChild(overlay);

    var panel = overlay.querySelector(".fb-zoom__panel");
    var active = null;

    function clearPanel() {
      if (panel) panel.innerHTML = "";
    }

    function close() {
      active = null;
      clearPanel();
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }

    function openFor(a) {
      if (!a || !panel) return;
      if (active === a && overlay.classList.contains("is-open")) return;

      active = a;
      clearPanel();
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");

      var src = "";
      var title = "Facebook";
      if (a.hasAttribute("data-fb-embed")) {
        src =
          "https://www.facebook.com/plugins/video.php?href=" +
          encodeURIComponent(a.getAttribute("data-fb-embed") || "") +
          "&show_text=false&width=900&height=506";
        title = "Facebook video";
      } else if (a.hasAttribute("data-fb-post")) {
        src =
          "https://www.facebook.com/plugins/post.php?href=" +
          encodeURIComponent(a.getAttribute("data-fb-post") || "") +
          "&show_text=false&width=900";
        title = "Facebook post";
      }

      var ifr = document.createElement("iframe");
      ifr.className = "fb-media__iframe";
      ifr.setAttribute("src", src);
      ifr.setAttribute("title", title);
      ifr.setAttribute("loading", "lazy");
      ifr.setAttribute("allowfullscreen", "true");
      ifr.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
      panel.appendChild(ifr);
    }

    // Close on background click / Escape.
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    items.forEach(function (a) {
      a.addEventListener("click", function (e) {
        // Keep default behavior for new tab / modifiers.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        openFor(a);
      });
    });
  })();

  // Hero parallax background (uses the hero image as background).
  (function initHeroParallax() {
    var hero = document.querySelector("[data-hero-parallax]");
    if (!hero) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var bg = hero.querySelector(".hero__bg");
    if (!bg) return;

    var src = hero.getAttribute("data-hero-parallax-src") || "";
    if (typeof src === "string" && src.length) {
      // Use a valid CSS url() token; do not escape quotes with backslashes.
      hero.style.setProperty("--hero-parallax-img", 'url("' + src.replace(/"/g, "%22") + '")');
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        var rect = hero.getBoundingClientRect();
        var viewH = window.innerHeight || 0;
        // progress: 0 when hero top at viewport top, 1 when hero bottom at viewport top
        var denom = Math.max(1, rect.height + viewH);
        var progress = (viewH - rect.top) / denom;
        // limit and convert to translate (px) - move background only
        var offset = Math.max(-0.6, Math.min(1.6, progress)) * 80;
        hero.style.setProperty("--hero-parallax-y", offset.toFixed(2) + "px");
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  })();

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (window.LedVisionSecurity && typeof window.LedVisionSecurity.validateLeadForm === "function") {
        var check = window.LedVisionSecurity.validateLeadForm(form);
        if (!check.ok) {
          var errMsg =
            typeof window.__formValidationMsg === "string" && window.__formValidationMsg.length
              ? window.__formValidationMsg
              : "Please fill required fields.";
          window.alert(errMsg);
          return;
        }
      }
      var msg =
        typeof window.__formAlertMsg === "string"
          ? window.__formAlertMsg
          : "Thanks! Demo only.";
      window.alert(msg);
    });
  }
})();
