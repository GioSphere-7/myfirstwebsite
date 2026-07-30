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
  }

  applyDeviceProfile();

  window.addEventListener("resize", applyDeviceProfile, { passive: true });
  window.addEventListener("orientationchange", applyDeviceProfile, { passive: true });
  window.addEventListener("pageshow", applyDeviceProfile);
  document.addEventListener("DOMContentLoaded", applyDeviceProfile);
})();
