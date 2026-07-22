(() => {
  const productPage = document.querySelector(".prodscroll .product-terminal");

  if (!productPage) {
    return;
  }

  const images = [...productPage.querySelectorAll(".terminal-visual img")];
  let lightbox;
  let lightboxImage;
  let lightboxTitle;
  let closeButton;
  let previousFocus;

  if (!images.length) {
    return;
  }

  function createElement(tagName, className = "", text = "") {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (text) {
      element.textContent = text;
    }

    return element;
  }

  function getImageTitle(image) {
    return image.dataset.productImageTitle || image.alt || "Soma Inc. archive image";
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.body.classList.remove("product-lightbox-open");

    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  function createLightbox() {
    lightbox = createElement("section", "product-lightbox");
    lightbox.hidden = true;
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Expanded product image");

    const panel = createElement("div", "product-lightbox-panel");
    const frame = createElement("figure", "product-lightbox-frame");

    closeButton = createElement("button", "product-lightbox-close", "Close");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close expanded product image");

    lightboxImage = document.createElement("img");
    lightboxImage.className = "product-lightbox-media";
    lightboxImage.alt = "";

    const caption = createElement("figcaption", "product-lightbox-caption");
    lightboxTitle = createElement("strong");
    caption.appendChild(lightboxTitle);

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    frame.appendChild(lightboxImage);
    frame.appendChild(caption);
    panel.appendChild(closeButton);
    panel.appendChild(frame);
    lightbox.appendChild(panel);
    document.body.appendChild(lightbox);
  }

  function openLightbox(image) {
    if (!lightbox) {
      createLightbox();
    }

    previousFocus = document.activeElement;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";
    lightboxTitle.textContent = getImageTitle(image);
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.classList.add("product-lightbox-open");
    closeButton.focus();
  }

  function handleTriggerKeydown(event, image) {
    if (!["Enter", " "].includes(event.key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    openLightbox(image);
  }

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) {
      return;
    }

    if (["Escape", "ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    if (event.key === "Escape") {
      closeLightbox();
    }
  }, true);

  images.forEach((image) => {
    const title = getImageTitle(image);

    image.classList.add("product-enlargeable-image");
    image.setAttribute("role", "button");
    image.setAttribute("tabindex", "0");
    image.setAttribute("aria-label", `Open ${title} in expanded view`);

    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => handleTriggerKeydown(event, image));
  });
})();
