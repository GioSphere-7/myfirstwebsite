(() => {
  const carousel = document.querySelector("[data-product-carousel]");

  if (!carousel) {
    return;
  }

  const track = carousel.querySelector("[data-product-carousel-track]");
  const slides = [...carousel.querySelectorAll(".product-carousel-slide")];
  const previousButton = carousel.querySelector("[data-product-carousel-prev]");
  const nextButton = carousel.querySelector("[data-product-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-product-carousel-dots]");
  const status = carousel.querySelector("[data-product-carousel-status]");
  const carouselScreen = carousel.querySelector(".product-carousel-screen");
  const wheelCooldown = 640;
  let currentIndex = 0;
  let lastWheelTime = 0;
  let touchStartY = null;

  if (!track || !slides.length) {
    return;
  }

  function getSlideLabel(slide, index) {
    return slide.dataset.slideLabel || slide.querySelector("h1, h2")?.textContent.trim() || `Slide ${index + 1}`;
  }

  function getSlideIndexFromHash(hashValue = window.location.hash) {
    const hash = hashValue.replace("#", "");

    if (!hash) {
      return 0;
    }

    const directMatch = slides.findIndex((slide) => slide.id === hash);

    if (directMatch >= 0) {
      return directMatch;
    }

    return slides.findIndex((slide) => Boolean(slide.querySelector(`#${CSS.escape(hash)}`)));
  }

  function resetCarouselScroll() {
    window.scrollTo(0, 0);

    [
      document.scrollingElement,
      document.documentElement,
      document.body,
      carousel,
      carouselScreen,
      track
    ].forEach((element) => {
      if (!element) {
        return;
      }

      element.scrollTop = 0;
      element.scrollLeft = 0;
    });
  }

  function scheduleCarouselScrollReset() {
    resetCarouselScroll();
    requestAnimationFrame(resetCarouselScroll);
    window.setTimeout(resetCarouselScroll, 0);
  }

  function setHashForSlide(slide) {
    if (!slide.id) {
      return;
    }

    const nextHash = `#${slide.id}`;

    if (window.location.hash !== nextHash) {
      history.replaceState(null, "", nextHash);
    }
  }

  function updateCarousel(nextIndex, options = {}) {
    const boundedIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);
    const isImmediateJump = Boolean(options.immediate);

    if (isImmediateJump) {
      track.classList.add("is-jump-immediate");
    }

    currentIndex = boundedIndex;
    track.style.setProperty("--product-slide-index", String(currentIndex));

    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.toggleAttribute("inert", !isActive);
    });

    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;

    [...dotsContainer.querySelectorAll("button")].forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
      dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
    });

    const activeSlide = slides[currentIndex];
    const label = getSlideLabel(activeSlide, currentIndex);

    status.textContent = `Product slide ${currentIndex + 1} of ${slides.length}: ${label}`;

    if (!options.keepHash) {
      setHashForSlide(activeSlide);
    }

    scheduleCarouselScrollReset();

    carousel.dispatchEvent(new CustomEvent("productSlideChange", {
      detail: {
        index: currentIndex,
        label,
        slide: activeSlide
      }
    }));

    if (isImmediateJump) {
      requestAnimationFrame(() => {
        track.classList.remove("is-jump-immediate");
      });
    }
  }

  function goToSlide(nextIndex) {
    updateCarousel(nextIndex);
  }

  function goNext() {
    goToSlide(currentIndex + 1);
  }

  function goPrevious() {
    goToSlide(currentIndex - 1);
  }

  function buildDots() {
    const fragment = document.createDocumentFragment();

    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      const label = getSlideLabel(slide, index);

      dot.type = "button";
      dot.className = "product-carousel-dot";
      dot.setAttribute("aria-label", `Go to ${label}`);
      dot.dataset.slideIndex = String(index);
      dot.addEventListener("click", () => goToSlide(index));
      fragment.appendChild(dot);
    });

    dotsContainer.appendChild(fragment);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
      return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
      return;
    }

    const hashIndex = getSlideIndexFromHash(url.hash);

    if (hashIndex < 0) {
      return;
    }

    event.preventDefault();
    updateCarousel(hashIndex, { immediate: true });
  });

  previousButton.addEventListener("click", goPrevious);
  nextButton.addEventListener("click", goNext);

  window.addEventListener("wheel", (event) => {
    const activeTag = document.activeElement?.tagName;
    const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

    if (isTyping || Math.abs(event.deltaY) < 18) {
      return;
    }

    event.preventDefault();

    const now = Date.now();

    if (now - lastWheelTime < wheelCooldown) {
      return;
    }

    lastWheelTime = now;

    if (event.deltaY > 0) {
      goNext();
      return;
    }

    goPrevious();
  }, { passive: false });

  window.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement?.tagName;
    const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

    if (isTyping) {
      return;
    }

    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      goNext();
      return;
    }

    if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      goPrevious();
    }
  });

  window.addEventListener("touchstart", (event) => {
    touchStartY = event.changedTouches[0]?.clientY ?? null;
  }, { passive: true });

  window.addEventListener("touchend", (event) => {
    if (touchStartY === null) {
      return;
    }

    const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
    const deltaY = touchStartY - touchEndY;

    touchStartY = null;

    if (Math.abs(deltaY) < 44) {
      return;
    }

    if (deltaY > 0) {
      goNext();
      return;
    }

    goPrevious();
  }, { passive: true });

  window.addEventListener("hashchange", () => {
    const hashIndex = getSlideIndexFromHash();

    if (hashIndex >= 0 && hashIndex !== currentIndex) {
      updateCarousel(hashIndex, {
        immediate: true,
        keepHash: true
      });
    }
  });

  buildDots();

  const initialIndex = getSlideIndexFromHash();
  updateCarousel(initialIndex >= 0 ? initialIndex : 0, {
    immediate: true,
    keepHash: true
  });
})();
