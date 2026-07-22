(() => {
  const productPage = document.querySelector(".prodscroll .product-terminal");

  if (!productPage) {
    return;
  }

  const productCarousel = productPage.matches("[data-product-carousel]")
    ? productPage
    : productPage.querySelector("[data-product-carousel]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const textSelector = [
    ".terminal-kicker",
    ".terminal-command",
    ".terminal-panel > h2",
    ".terminal-panel > p",
    ".terminal-hero > h1",
    ".terminal-hero > p",
    ".terminal-card h3",
    ".terminal-card p",
    ".terminal-list li"
  ].join(", ");
  const stableHeadingSelector = [
    ".terminal-kicker",
    ".terminal-panel > h2",
    ".terminal-hero > h1"
  ].join(", ");
  const textRevealData = new WeakMap();
  const runningAnimations = new WeakMap();
  const resetTimers = new WeakMap();

  function getTextNodes(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    const records = [];

    while (walker.nextNode()) {
      records.push({
        node: walker.currentNode,
        text: walker.currentNode.nodeValue
      });
    }

    return records;
  }

  function setVisibleCharacters(records, characterCount) {
    let remainingCharacters = characterCount;

    records.forEach((record) => {
      const visibleCharacters = Math.min(
        record.text.length,
        Math.max(remainingCharacters, 0)
      );

      record.node.nodeValue = record.text.slice(0, visibleCharacters);
      remainingCharacters -= visibleCharacters;
    });
  }

  function stopTyping(element) {
    const animationId = runningAnimations.get(element);

    if (animationId) {
      cancelAnimationFrame(animationId);
      runningAnimations.delete(element);
    }
  }

  function typeElement(element) {
    const revealData = textRevealData.get(element);

    if (!revealData || element.dataset.consoleTyped === "true") {
      return;
    }

    stopTyping(element);
    element.dataset.consoleTyped = "true";
    element.classList.add("is-typing");
    setVisibleCharacters(revealData.records, 0);

    const duration = Math.min(
      2600,
      Math.max(520, revealData.totalCharacters * 15)
    );
    const startTyping = performance.now() + revealData.delay;

    function writeFrame(now) {
      if (!element.classList.contains("is-visible")) {
        stopTyping(element);
        element.classList.remove("is-typing");
        return;
      }

      if (now < startTyping) {
        runningAnimations.set(element, requestAnimationFrame(writeFrame));
        return;
      }

      const progress = Math.min((now - startTyping) / duration, 1);
      const visibleCharacters = Math.ceil(progress * revealData.totalCharacters);

      setVisibleCharacters(revealData.records, visibleCharacters);

      if (progress < 1) {
        runningAnimations.set(element, requestAnimationFrame(writeFrame));
        return;
      }

      element.classList.remove("is-typing");
      runningAnimations.delete(element);
    }

    runningAnimations.set(element, requestAnimationFrame(writeFrame));
  }

  function showElement(element) {
    const resetTimer = resetTimers.get(element);

    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimers.delete(element);
    }

    element.classList.add("is-visible");

    if (element.classList.contains("console-text-reveal")) {
      typeElement(element);
    }
  }

  function hideElement(element) {
    element.classList.remove("is-visible");

    if (!element.classList.contains("console-text-reveal")) {
      return;
    }

    stopTyping(element);
    element.classList.remove("is-typing");
    element.dataset.consoleTyped = "false";

    const revealData = textRevealData.get(element);
    const resetTimer = setTimeout(() => {
      if (!element.classList.contains("is-visible") && revealData) {
        setVisibleCharacters(revealData.records, 0);
      }
    }, 380);

    resetTimers.set(element, resetTimer);
  }

  function prepareTextElement(element, index) {
    const records = getTextNodes(element);

    if (!records.length) {
      return;
    }

    const originalText = element.textContent.trim();
    const elementHeight = element.getBoundingClientRect().height;

    if (originalText) {
      element.setAttribute("aria-label", originalText);
    }

    if (elementHeight > 0) {
      element.style.minHeight = `${Math.ceil(elementHeight)}px`;
    }

    element.classList.add("console-reveal");
    element.style.setProperty("--console-delay", `${Math.min(index * 34, 520)}ms`);

    if (element.matches(stableHeadingSelector)) {
      return;
    }

    element.classList.add("console-text-reveal");

    const revealData = {
      delay: Math.min(index * 34, 520),
      records,
      totalCharacters: records.reduce((total, record) => total + record.text.length, 0)
    };

    textRevealData.set(element, revealData);

    if (!reducedMotion) {
      setVisibleCharacters(records, 0);
    }
  }

  function prepareImageElement(element, index) {
    element.classList.add("console-reveal", "console-image-reveal");
    element.style.setProperty("--console-delay", `${Math.min(index * 42, 420)}ms`);
  }

  function initializeReveal() {
    const textElements = [...new Set([...productPage.querySelectorAll(textSelector)])];
    const imageElements = [...productPage.querySelectorAll(".terminal-visual img")];
    const revealElements = [];

    textElements.forEach((element, index) => {
      prepareTextElement(element, index);
      revealElements.push(element);
    });

    imageElements.forEach((element, index) => {
      prepareImageElement(element, index);
      revealElements.push(element);
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");

        if (element.classList.contains("console-text-reveal")) {
          const revealData = textRevealData.get(element);

          if (revealData) {
            setVisibleCharacters(revealData.records, revealData.totalCharacters);
          }
        }
      });
      return;
    }

    if (productCarousel) {
      function updateCarouselReveal() {
        const activeSlide = productCarousel.querySelector(".product-carousel-slide.is-active");

        revealElements.forEach((element) => {
          if (activeSlide?.contains(element)) {
            showElement(element);
            return;
          }

          hideElement(element);
        });
      }

      productCarousel.addEventListener("productSlideChange", updateCarouselReveal);
      requestAnimationFrame(updateCarouselReveal);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showElement(entry.target);
          return;
        }

        hideElement(entry.target);
      });
    }, {
      rootMargin: "-8% 0px -18% 0px",
      threshold: 0.08
    });

    revealElements.forEach((element) => observer.observe(element));
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initializeReveal);
    return;
  }

  window.addEventListener("load", initializeReveal, { once: true });
})();
