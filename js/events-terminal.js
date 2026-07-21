(function () {
  const archiveFiles = [
    {
      id: "soma-newswire",
      label: "SOMA_NEWSWIRE_2077",
      date: "2077.07.21",
      clearance: "PUBLIC",
      summary: "Press clippings and public bulletins prepared for outside observers.",
      attachments: [
        {
          id: "chronicle-clipping",
          type: "clipping",
          label: "NEWSPAPER_CLIPPING_01",
          title: "Soma Inc. Announces Continuity Systems for a Changing World",
          publication: "The New Meridian Chronicle",
          dateline: "New Meridian District // July 21, 2077",
          body: [
            "Soma Inc. confirmed today that its Eidolon-Frame initiative has entered public demonstration status, describing the program as a continuity platform for memory, mobility, and identity preservation.",
            "Company representatives said the system is designed for people facing catastrophic injury, illness, or environmental risk, with SomaCloud acting as the protected archive layer for preserved cognitive records.",
            "Founder Eric Voss called the release 'a controlled first step toward making survival more durable than biology alone.'"
          ],
          footer: "Archive note: approved language for public circulation."
        },
        {
          id: "public-brief",
          type: "clipping",
          label: "EVENT_BRIEF_PUBLIC_RELEASE",
          title: "Public Demonstration Window Opened",
          publication: "Soma Inc. Events Desk",
          dateline: "Visitor Terminal Notice // 08:45",
          body: [
            "Demonstration slots are now available for press, medical partners, and approved continuity candidates.",
            "Observers may request access to frame stabilization tests, SomaCloud transfer simulations, and post-transfer mobility studies.",
            "All questions regarding permanent transfer must be routed through the Continuity Ethics Office."
          ],
          footer: "Reminder: no unsupervised access to Prototype Bay 03."
        }
      ]
    },
    {
      id: "comic-cache",
      label: "COMIC_STRIP_CACHE",
      date: "2077.07.18",
      clearance: "MEDIA",
      summary: "Recovered visual panels used in early public-facing Soma Inc. storytelling.",
      attachments: [
        {
          id: "comic-page-one",
          type: "comic",
          label: "COMIC_STRIP_PANEL_SET_A",
          title: "Continuity Broadcast: Page One",
          caption: "Recovered sequential art used to explain the human-to-frame transition in a more approachable format.",
          images: [
            {
              src: "images/Panel1.png",
              alt: "Comic panel from the Soma Inc. archive."
            },
            {
              src: "images/Page2.png",
              alt: "Second comic page from the Soma Inc. archive."
            }
          ]
        }
      ]
    },
    {
      id: "audio-logs",
      label: "AUDIO_LOGS_RECOVERED",
      date: "2077.07.16",
      clearance: "OBSERVER",
      summary: "Simulated holotape-style transmissions with transcripts attached.",
      attachments: [
        {
          id: "voss-audio",
          type: "audio",
          label: "AUDIO_LOG_VOSS_03",
          title: "Eric Voss: The Vessel Is Not the Person",
          channel: "SomaCloud Lab // Channel 6",
          duration: "00:46",
          transcript: [
            "Begin recording. The public keeps asking if the Eidolon-Frame is a body or a machine. That is the wrong question.",
            "The frame is a vessel. The person is the continuity held inside it: memory, preference, pattern, fear, loyalty, the stubborn little sparks that refuse to be reduced to a heartbeat.",
            "If we preserve those sparks, we preserve more than life. We preserve the witness."
          ]
        },
        {
          id: "operator-audio",
          type: "audio",
          label: "AUDIO_LOG_OPERATOR_12",
          title: "Bay Operator: Transfer Rehearsal",
          channel: "Prototype Bay 03 // Internal",
          duration: "00:31",
          transcript: [
            "Transfer rehearsal started at 02:13. Frame posture calibration stable. Neural sync receiver is holding at ninety-seven percent.",
            "Candidate memory echo is responsive. SomaCloud backup completed before motor initiation.",
            "Note to archive: the room got very quiet when the hand moved."
          ]
        }
      ]
    },
    {
      id: "schematic-docs",
      label: "SCHEMATIC_ATTACHMENTS",
      date: "2077.07.12",
      clearance: "TECHNICAL",
      summary: "Visual documents, technical diagrams, and recovered engineering attachments.",
      attachments: [
        {
          id: "frame-schematic",
          type: "image",
          label: "EIDOLON_FRAME_SCHEMA",
          title: "Eidolon-Frame Full-Body Schematic",
          caption: "Primary frame anatomy reference for stabilization, mobility, and external shell mapping.",
          src: "images/Eric-Voss-schematics.png",
          alt: "Eidolon-Frame full-body technical schematic."
        },
        {
          id: "head-schematic",
          type: "image",
          label: "CRANIAL_PORT_SCHEMA",
          title: "Cranial Receiver / Sensor Head Draft",
          caption: "Recovered sketch detailing the receiver shell, camera port, speaker, sensor mount, and casing for SomaLink communication.",
          src: "images/schematic-head.png",
          alt: "Hand-drawn cranial receiver schematic."
        },
        {
          id: "somacloud-node",
          type: "image",
          label: "SOMACLOUD_NODE_RENDER",
          title: "SomaCloud Memory Repository Node",
          caption: "A visual attachment linked to the offsite continuity archive and emergency backup protocol.",
          src: "images/somacloud.png",
          alt: "SomaCloud archive render."
        }
      ]
    }
  ];

  const app = document.querySelector("[data-terminal-app]");

  if (!app) {
    return;
  }

  const fileList = app.querySelector("[data-file-list]");
  const attachmentList = app.querySelector("[data-attachment-list]");
  const viewer = app.querySelector("[data-viewer]");
  const fileCount = app.querySelector("[data-file-count]");
  const attachmentCount = app.querySelector("[data-attachment-count]");
  const fileSummary = app.querySelector("[data-file-summary]");
  const viewerType = app.querySelector("[data-viewer-type]");
  const archiveScreen = app.querySelector("[data-archive-screen]");
  const backButton = app.querySelector("[data-back-button]");
  const breadcrumb = app.querySelector("[data-archive-breadcrumb]");
  const terminalTime = app.querySelector("[data-current-terminal-time]");
  const terminalYear = 2122;
  const terminalDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const archiveViews = {
    files: app.querySelector('[data-archive-view="files"]'),
    attachments: app.querySelector('[data-archive-view="attachments"]'),
    viewer: app.querySelector('[data-archive-view="viewer"]')
  };
  let currentView = "files";
  let activeFileId = null;
  let activeAttachmentId = null;
  let activeAudio = null;
  let mediaLightbox = null;
  let mediaLightboxContent = null;
  let mediaLightboxClose = null;
  let previousLightboxFocus = null;
  let lastBackActionAt = 0;

  function stopActiveAudio() {
    if (activeAudio) {
      activeAudio.stop();
      activeAudio = null;
    }
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text) {
      element.textContent = text;
    }

    return element;
  }

  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function isMediaLightboxOpen() {
    return Boolean(mediaLightbox && mediaLightbox.classList.contains("is-open"));
  }

  function createMediaLightbox() {
    const lightbox = createElement("section", "archive-lightbox");
    lightbox.hidden = true;
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Expanded archive media");

    const panel = createElement("div", "archive-lightbox-panel");
    const close = createElement("button", "archive-lightbox-close", "Close");
    close.type = "button";
    close.setAttribute("aria-label", "Close expanded media");

    const content = createElement("div", "archive-lightbox-content");

    close.addEventListener("click", closeMediaLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeMediaLightbox();
      }
    });

    panel.appendChild(close);
    panel.appendChild(content);
    lightbox.appendChild(panel);
    document.body.appendChild(lightbox);

    mediaLightbox = lightbox;
    mediaLightboxContent = content;
    mediaLightboxClose = close;

    return lightbox;
  }

  function getMediaLightbox() {
    if (!mediaLightbox) {
      createMediaLightbox();
    }

    return mediaLightbox;
  }

  function closeMediaLightbox() {
    if (!mediaLightbox) {
      return;
    }

    mediaLightbox.classList.remove("is-open");
    mediaLightbox.hidden = true;
    document.body.classList.remove("archive-lightbox-open");

    if (mediaLightboxContent) {
      clearElement(mediaLightboxContent);
    }

    if (previousLightboxFocus) {
      previousLightboxFocus.focus();
      previousLightboxFocus = null;
    }
  }

  function openMediaLightbox(media) {
    const lightbox = getMediaLightbox();
    const type = media.type || "image";

    previousLightboxFocus = document.activeElement;
    clearElement(mediaLightboxContent);

    const frame = createElement("figure", "archive-lightbox-frame");
    let mediaElement;

    if (type === "video") {
      stopActiveAudio();
      mediaElement = document.createElement("video");
      mediaElement.src = media.src;
      mediaElement.controls = true;
      mediaElement.autoplay = true;
      mediaElement.playsInline = true;

      if (media.poster) {
        mediaElement.poster = media.poster;
      }
    } else {
      mediaElement = document.createElement("img");
      mediaElement.src = media.src;
      mediaElement.alt = media.alt || media.title || "Expanded archive media.";
    }

    mediaElement.className = "archive-lightbox-media";
    frame.appendChild(mediaElement);

    if (media.title || media.description) {
      const caption = createElement("figcaption", "archive-lightbox-caption");

      if (media.title) {
        caption.appendChild(createElement("strong", "", media.title));
      }

      if (media.description) {
        caption.appendChild(createElement("span", "", media.description));
      }

      frame.appendChild(caption);
    }

    mediaLightboxContent.appendChild(frame);
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.classList.add("archive-lightbox-open");
    mediaLightboxClose.focus();
  }

  function createMediaTrigger(media) {
    const button = createElement("button", "archive-media-trigger");
    button.type = "button";
    button.setAttribute("aria-label", `Open ${media.title || media.alt || "archive media"} in expanded view`);

    let preview;

    if (media.type === "video") {
      preview = document.createElement("video");
      preview.src = media.src;
      preview.muted = true;
      preview.preload = "metadata";

      if (media.poster) {
        preview.poster = media.poster;
      }
    } else {
      preview = document.createElement("img");
      preview.src = media.src;
      preview.alt = media.alt || media.title || "Archive media preview.";
    }

    button.appendChild(preview);
    button.appendChild(createElement("span", "archive-media-expand", "Open full view"));
    button.addEventListener("click", () => openMediaLightbox(media));

    return button;
  }

  function padClockValue(value) {
    return String(value).padStart(2, "0");
  }

  function updateTerminalClock() {
    if (!terminalTime) {
      return;
    }

    const now = new Date();
    const month = padClockValue(now.getMonth() + 1);
    const day = padClockValue(now.getDate());
    const hours = padClockValue(now.getHours());
    const minutes = padClockValue(now.getMinutes());
    const seconds = padClockValue(now.getSeconds());

    terminalTime.textContent = `> ${terminalYear}.${month}.${day} - ${terminalDays[now.getDay()]} - ${hours}:${minutes}:${seconds}`;
    terminalTime.dateTime = `${terminalYear}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  function startTerminalClock() {
    updateTerminalClock();
    window.setInterval(updateTerminalClock, 1000);
  }

  function getActiveFile() {
    return archiveFiles.find((entry) => entry.id === activeFileId) || null;
  }

  function getActiveAttachment() {
    const file = getActiveFile();

    if (!file) {
      return null;
    }

    return file.attachments.find((entry) => entry.id === activeAttachmentId) || null;
  }

  function buildBreadcrumb() {
    const file = getActiveFile();
    const attachment = getActiveAttachment();

    if (currentView === "attachments" && file) {
      return `FILES > ${file.label} > ATTACHMENTS`;
    }

    if (currentView === "viewer" && file && attachment) {
      return `FILES > ${file.label} > ${attachment.label}`;
    }

    return "FILES";
  }

  function setView(viewName) {
    currentView = viewName;

    Object.entries(archiveViews).forEach(([name, element]) => {
      const isActive = name === currentView;
      element.hidden = !isActive;
      element.classList.toggle("is-view-active", isActive);
      element.setAttribute("aria-hidden", String(!isActive));
    });

    archiveScreen.dataset.currentView = currentView;
    breadcrumb.textContent = buildBreadcrumb();
    backButton.disabled = currentView === "files";

    if (currentView === "attachments") {
      backButton.textContent = "< BACK TO FILES";
      backButton.setAttribute("aria-label", "Back to file list");
    } else if (currentView === "viewer") {
      backButton.textContent = "< BACK TO ATTACHMENTS";
      backButton.setAttribute("aria-label", "Back to attachments");
    } else {
      backButton.textContent = "< BACK";
      backButton.setAttribute("aria-label", "Already on file list");
    }
  }

  function goBack() {
    const visibleView = archiveScreen.dataset.currentView || currentView;
    closeMediaLightbox();

    if (visibleView === "viewer") {
      stopActiveAudio();
      setView("attachments");
      return;
    }

    if (visibleView === "attachments") {
      stopActiveAudio();
      setView("files");
    }
  }

  function handleBackAction(event) {
    const now = Date.now();

    if (backButton.disabled || now - lastBackActionAt < 160) {
      return;
    }

    event.preventDefault();
    lastBackActionAt = now;
    goBack();
  }

  window.somaArchiveBack = handleBackAction;

  function renderFiles() {
    clearElement(fileList);
    fileCount.textContent = `${archiveFiles.length} files`;

    archiveFiles.forEach((file) => {
      const button = createElement("button", "archive-row", `[${file.label}]`);
      button.type = "button";
      button.dataset.fileId = file.id;
      button.setAttribute("aria-pressed", String(file.id === activeFileId));

      const meta = createElement("span", "archive-row-meta", `${file.date} // ${file.clearance}`);
      button.appendChild(meta);

      if (file.id === activeFileId) {
        button.classList.add("is-active");
      }

      button.addEventListener("click", () => {
        window.setTimeout(() => {
          selectFile(file.id);
        }, 80);
      });

      fileList.appendChild(button);
    });
  }

  function selectFile(fileId) {
    const file = archiveFiles.find((entry) => entry.id === fileId);

    if (!file) {
      return;
    }

    stopActiveAudio();
    activeFileId = file.id;
    activeAttachmentId = null;
    renderFiles();
    renderAttachments(file);
    renderFilePrompt(file);
    setView("attachments");
  }

  function renderAttachments(file) {
    clearElement(attachmentList);
    attachmentCount.textContent = `${file.attachments.length} attachments`;
    fileSummary.textContent = file.summary;

    file.attachments.forEach((attachment) => {
      const button = createElement("button", "archive-row archive-attachment-row", `[${attachment.label}]`);
      button.type = "button";
      button.dataset.attachmentId = attachment.id;
      button.setAttribute("aria-pressed", String(attachment.id === activeAttachmentId));

      const meta = createElement("span", "archive-row-meta", attachment.type.toUpperCase());
      button.appendChild(meta);

      if (attachment.id === activeAttachmentId) {
        button.classList.add("is-active");
      }

      button.addEventListener("click", () => {
        window.setTimeout(() => {
          openAttachment(file.id, attachment.id);
        }, 80);
      });

      attachmentList.appendChild(button);
    });
  }

  function openAttachment(fileId, attachmentId) {
    const file = archiveFiles.find((entry) => entry.id === fileId);

    if (!file) {
      return;
    }

    const attachment = file.attachments.find((entry) => entry.id === attachmentId);

    if (!attachment) {
      return;
    }

    stopActiveAudio();
    closeMediaLightbox();
    activeAttachmentId = attachment.id;
    renderAttachments(file);
    viewerType.textContent = attachment.type.toUpperCase();
    clearElement(viewer);
    setView("viewer");

    if (attachment.type === "clipping") {
      renderClipping(attachment);
      return;
    }

    if (attachment.type === "comic") {
      renderComic(attachment);
      return;
    }

    if (attachment.type === "image") {
      renderImageAttachment(attachment);
      return;
    }

    if (attachment.type === "video") {
      renderVideoAttachment(attachment);
      return;
    }

    if (attachment.type === "audio") {
      renderAudioAttachment(attachment);
    }
  }

  function renderFilePrompt(file) {
    viewerType.textContent = "Directory";
    clearElement(viewer);

    const prompt = createElement("div", "archive-directory-prompt");
    prompt.appendChild(createElement("p", "archive-output-line", `> FILE LOADED: ${file.label}`));
    prompt.appendChild(createElement("p", "archive-output-line", `> ATTACHMENTS FOUND: ${file.attachments.length}`));
    prompt.appendChild(createElement("p", "archive-output-line", "> Select an attachment from the attachment screen to open it."));

    const manifest = createElement("ul", "archive-manifest");
    file.attachments.forEach((attachment) => {
      const item = createElement("li", "", `${attachment.type.toUpperCase()} :: ${attachment.label}`);
      manifest.appendChild(item);
    });
    prompt.appendChild(manifest);
    viewer.appendChild(prompt);
  }

  function renderClipping(attachment) {
    const article = createElement("article", "archive-clipping");
    article.appendChild(createElement("p", "archive-paper-name", attachment.publication));
    article.appendChild(createElement("h3", "", attachment.title));
    article.appendChild(createElement("p", "archive-dateline", attachment.dateline));

    attachment.body.forEach((paragraph) => {
      article.appendChild(createElement("p", "", paragraph));
    });

    article.appendChild(createElement("p", "archive-footnote", attachment.footer));
    viewer.appendChild(article);
  }

  function renderComic(attachment) {
    const wrapper = createElement("div", "archive-comic");
    wrapper.appendChild(createElement("h3", "", attachment.title));
    wrapper.appendChild(createElement("p", "archive-caption", attachment.caption));

    const strip = createElement("div", "archive-comic-strip");
    attachment.images.forEach((image) => {
      strip.appendChild(createMediaTrigger({
        type: "image",
        src: image.src,
        alt: image.alt,
        title: attachment.title,
        description: image.caption || attachment.caption
      }));
    });

    wrapper.appendChild(strip);
    viewer.appendChild(wrapper);
  }

  function renderImageAttachment(attachment) {
    const figure = createElement("figure", "archive-image-attachment");
    figure.appendChild(createMediaTrigger({
      type: "image",
      src: attachment.src,
      alt: attachment.alt,
      title: attachment.title,
      description: attachment.caption
    }));

    const caption = createElement("figcaption", "");
    caption.appendChild(createElement("strong", "", attachment.title));
    caption.appendChild(createElement("span", "", attachment.caption));
    figure.appendChild(caption);
    viewer.appendChild(figure);
  }

  function renderVideoAttachment(attachment) {
    const wrapper = createElement("div", "archive-video");
    wrapper.appendChild(createElement("h3", "", attachment.title));
    wrapper.appendChild(createElement("p", "archive-caption", attachment.caption || "Recovered visual archive stream."));

    wrapper.appendChild(createMediaTrigger({
      type: "video",
      src: attachment.src,
      poster: attachment.poster,
      title: attachment.title,
      description: attachment.caption || attachment.description,
      alt: attachment.title
    }));

    viewer.appendChild(wrapper);
  }

  function renderAudioAttachment(attachment) {
    const wrapper = createElement("div", "archive-audio");
    wrapper.appendChild(createElement("p", "archive-output-line", `> AUDIO FILE MOUNTED: ${attachment.label}`));
    wrapper.appendChild(createElement("h3", "", attachment.title));
    wrapper.appendChild(createElement("p", "archive-caption", `${attachment.channel} // Duration ${attachment.duration}`));

    const simulator = createElement("div", "audio-simulator");
    const button = createElement("button", "archive-action", "Load holotape");
    button.type = "button";
    const progress = createElement("div", "archive-audio-progress");
    const progressFill = createElement("span");
    progress.appendChild(progressFill);

    const wave = createElement("div", "archive-wave");
    for (let index = 0; index < 24; index += 1) {
      wave.appendChild(document.createElement("span"));
    }

    simulator.appendChild(button);
    simulator.appendChild(progress);
    simulator.appendChild(wave);
    wrapper.appendChild(simulator);

    const transcript = createElement("div", "archive-transcript");
    transcript.appendChild(createElement("p", "archive-output-line", "> TRANSCRIPT"));
    attachment.transcript.forEach((line) => {
      transcript.appendChild(createElement("p", "", line));
    });
    wrapper.appendChild(transcript);

    button.addEventListener("click", () => {
      if (activeAudio) {
        stopActiveAudio();
        simulator.classList.remove("is-playing");
        button.textContent = "Load holotape";
        progressFill.style.width = "0%";
        return;
      }

      simulator.classList.add("is-playing");
      button.textContent = "Stop playback";
      activeAudio = startAudioSimulation(progressFill, () => {
        simulator.classList.remove("is-playing");
        button.textContent = "Load holotape";
      });
    });

    viewer.appendChild(wrapper);
  }

  function startAudioSimulation(progressFill, onComplete) {
    const duration = 12000;
    const start = Date.now();
    let audioContext = null;
    let oscillator = null;
    let tremolo = null;
    let gain = null;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;

      if (AudioContextClass) {
        audioContext = new AudioContextClass();
        oscillator = audioContext.createOscillator();
        tremolo = audioContext.createOscillator();
        gain = audioContext.createGain();
        const tremoloGain = audioContext.createGain();

        oscillator.type = "sawtooth";
        oscillator.frequency.value = 86;
        tremolo.type = "square";
        tremolo.frequency.value = 12;
        tremoloGain.gain.value = 0.006;
        gain.gain.value = 0.018;

        tremolo.connect(tremoloGain);
        tremoloGain.connect(gain.gain);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        tremolo.start();
      }
    } catch (error) {
      audioContext = null;
    }

    const timer = window.setInterval(() => {
      const percent = Math.min(((Date.now() - start) / duration) * 100, 100);
      progressFill.style.width = `${percent}%`;

      if (percent >= 100) {
        stop();
        onComplete();
      }
    }, 120);

    function stop() {
      window.clearInterval(timer);

      if (oscillator) {
        oscillator.stop();
      }

      if (tremolo) {
        tremolo.stop();
      }

      if (audioContext) {
        audioContext.close();
      }

      progressFill.style.width = "0%";
      activeAudio = null;
    }

    return { stop };
  }

  backButton.addEventListener("click", handleBackAction);
  backButton.addEventListener("pointerup", handleBackAction);

  document.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement?.tagName;
    const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

    if (event.key === "Escape" && isMediaLightboxOpen()) {
      event.preventDefault();
      closeMediaLightbox();
      return;
    }

    if (isTyping) {
      return;
    }

    if ((event.key === "Backspace" || event.key === "Escape") && currentView !== "files") {
      event.preventDefault();
      goBack();
    }

    if ((event.key === "Enter" || event.key === " ") && document.activeElement === backButton) {
      handleBackAction(event);
    }
  });

  renderFiles();
  setView("files");
  startTerminalClock();
})();
