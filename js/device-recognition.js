(function () {
  const root = document.documentElement;
  const touchQuery = window.matchMedia ? window.matchMedia("(pointer: coarse)") : null;
  const hoverQuery = window.matchMedia ? window.matchMedia("(hover: none)") : null;

  function getDeviceProfile() {
    const width = window.innerWidth || root.clientWidth || 1024;
    const height = window.innerHeight || root.clientHeight || 768;
    const hasTouchPoints = Number(navigator.maxTouchPoints || 0) > 0;
    const coarsePointer = Boolean(touchQuery && touchQuery.matches);
    const hoverless = Boolean(hoverQuery && hoverQuery.matches);
    const touchInput = hasTouchPoints || coarsePointer || hoverless;
    const viewport = width <= 720 || (touchInput && width <= 900)
      ? "mobile"
      : width <= 1180 || (touchInput && width <= 1280)
        ? "tablet"
        : "desktop";

    return {
      height,
      input: touchInput ? "touch" : "pointer",
      viewport,
      width
    };
  }

  function applyDeviceProfile() {
    const profile = getDeviceProfile();
    const classTargets = [root, document.body].filter(Boolean);

    root.dataset.deviceViewport = profile.viewport;
    root.dataset.inputType = profile.input;
    root.style.setProperty("--soma-vh", `${profile.height}px`);

    classTargets.forEach((target) => {
      target.classList.toggle("soma-device-mobile", profile.viewport === "mobile");
      target.classList.toggle("soma-device-tablet", profile.viewport === "tablet");
      target.classList.toggle("soma-device-desktop", profile.viewport === "desktop");
      target.classList.toggle("soma-input-touch", profile.input === "touch");
      target.classList.toggle("soma-input-pointer", profile.input === "pointer");
      target.dataset.deviceViewport = profile.viewport;
      target.dataset.inputType = profile.input;
    });

    if (profile.viewport === "desktop") {
      closeMobileNavigation();
    }
  }

  function closeMobileNavigation() {
    document.querySelectorAll(".navbar.mobile-menu-open").forEach((navbar) => {
      const toggle = navbar.querySelector(".mobile-menu-toggle");

      navbar.classList.remove("mobile-menu-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initMobileNavigation() {
    const navbar = document.querySelector(".navbar");
    const navList = navbar?.querySelector(":scope > ul");
    const navRight = navbar?.querySelector(".nav-right");

    if (!navbar || !navList || navbar.dataset.mobileMenuReady === "true") {
      return;
    }

    if (!navList.id) {
      navList.id = "soma-mobile-menu";
    }

    let toggle = navbar.querySelector(".mobile-menu-toggle");

    if (!toggle) {
      toggle = document.createElement("button");
      toggle.innerHTML = "<span></span><span></span><span></span>";
      navbar.insertBefore(toggle, navRight || navList);
    }

    toggle.type = "button";
    toggle.classList.add("mobile-menu-toggle");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.setAttribute("aria-controls", navList.id);
    toggle.setAttribute("aria-expanded", "false");
    navbar.dataset.mobileMenuReady = "true";

    toggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("mobile-menu-open");

      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navList.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMobileNavigation();
      }
    });

    document.addEventListener("click", (event) => {
      if (!navbar.contains(event.target)) {
        closeMobileNavigation();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileNavigation();
        toggle.focus();
      }
    });
  }

  initMobileNavigation();
  applyDeviceProfile();

  window.addEventListener("resize", applyDeviceProfile, { passive: true });
  window.addEventListener("orientationchange", applyDeviceProfile, { passive: true });
  window.addEventListener("pageshow", applyDeviceProfile);
  document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    applyDeviceProfile();
  });
})();
