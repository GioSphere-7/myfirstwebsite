const siteSearchEntries = [
  {
    label: "News & Events",
    url: "events.html#event-terminal",
    keywords: ["news", "event", "events", "news and events", "documents", "articles", "updates", "archive", "terminal", "fallout", "files", "attachments", "newspaper", "clipping", "comic", "comic strip", "audio", "audio log", "save logs", "holotape"]
  },
  {
    label: "Eidolon-Frame",
    url: "prod.html#eframe",
    keywords: ["eidolon", "eidolon frame", "eidolon frames", "frame", "synthetic body", "titanium", "survival"]
  },
  {
    label: "Eidolon-Frame Models",
    url: "shop.html#eidolon-models",
    keywords: ["eidolon models", "frame models", "economic frame", "economy frame", "budget frame", "luxury frame", "aurelian", "access model", "core model"]
  },
  {
    label: "Eidolon-Frame Parts",
    url: "shop.html#eidolon-parts",
    keywords: ["parts", "eidolon parts", "frame parts", "replacement parts", "optic sensor", "hand actuator", "neural sync receiver", "power spine", "dermal sensor", "mobility calibration"]
  },
  {
    label: "Eidolon-Frame Accessories",
    url: "shop.html#eidolon-accessories",
    keywords: ["accessories", "eidolon accessories", "frame accessories", "arm extender", "arm extenders", "leg extender", "leg extenders", "torso extender", "torso extension"]
  },
  {
    label: "Eidolon-Frame Repairs",
    url: "shop.html#eidolon-repairs",
    keywords: ["repairs", "repair parts", "hydraulics", "replacement hydraulics", "arm hydraulics", "leg hydraulics", "hydraulic diagnostic", "damaged frame"]
  },
  {
    label: "Eidolon-Frame Upgrades",
    url: "shop.html#eidolon-upgrades",
    keywords: ["upgrades", "frame upgrades", "storage", "more storage", "backup battery", "extended backup battery", "emergency backup", "overclock", "overclocking", "chip slots", "eidolon chip", "custom frame", "customizable", "bespoke"]
  },
  {
    label: "SomaCloud",
    url: "prod.html#sctitle",
    keywords: ["somacloud", "soma cloud", "cloud", "memories", "memory", "personality", "digital repository", "legacy"]
  },
  {
    label: "Products",
    url: "prod.html",
    keywords: ["product", "products", "technology", "technologies", "somalink", "cpu", "cpu2", "consciousness", "bluetooth"]
  },
  {
    label: "Shop",
    url: "shop.html",
    keywords: ["shop", "store", "buy", "purchase", "parts", "cart", "price", "prices"]
  },
  {
    label: "Account",
    url: "account.html",
    keywords: ["account", "login", "log in", "sign in", "signup", "sign up", "email notifications", "profile", "soma id"]
  },
  {
    label: "Purchase History",
    url: "purchase-history.html",
    keywords: ["purchase history", "order history", "orders", "saved orders", "cart history", "remove order", "delete order", "purchase archive"]
  },
  {
    label: "Home",
    url: "index.html",
    keywords: ["home", "soma", "soma inc", "company", "about", "eric voss", "founder", "mission"]
  }
];

function normalizeSearchTerm(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findSearchDestination(query) {
  const normalizedQuery = normalizeSearchTerm(query);

  if (!normalizedQuery) {
    return null;
  }

  const exactMatch = siteSearchEntries.find((entry) =>
    entry.keywords.some((keyword) => normalizeSearchTerm(keyword) === normalizedQuery)
  );

  if (exactMatch) {
    return exactMatch;
  }

  const queryWords = normalizedQuery.split(" ");
  let bestMatch = null;
  let bestScore = 0;

  siteSearchEntries.forEach((entry) => {
    const searchableText = normalizeSearchTerm(`${entry.label} ${entry.keywords.join(" ")}`);
    const matchedWords = queryWords.filter((word) => searchableText.includes(word));
    const score = matchedWords.length / queryWords.length;

    if (score > bestScore) {
      bestMatch = entry;
      bestScore = score;
    }
  });

  return bestScore >= 0.5 ? bestMatch : null;
}

function initializeSiteSearch(form, index) {
  const input = form.querySelector("input[type='search']");
  const status = form.querySelector("[data-search-status]");
  const listId = `site-search-keywords-${index}`;
  const dataList = document.createElement("datalist");

  dataList.id = listId;
  siteSearchEntries.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.label;
    dataList.appendChild(option);
  });
  form.appendChild(dataList);
  input.setAttribute("list", listId);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    const destination = findSearchDestination(query);

    if (!query) {
      status.textContent = "Enter a keyword to search.";
      input.focus();
      return;
    }

    if (!destination) {
      status.textContent = "No match found. Try News, Products, Eidolon, SomaCloud, or Shop.";
      return;
    }

    status.textContent = `Opening ${destination.label}...`;
    const target = new URL(destination.url, window.location.href);
    target.searchParams.set("q", query);
    window.location.assign(target.href);
  });

  input.addEventListener("input", () => {
    status.textContent = "";
  });

  const currentQuery = new URLSearchParams(window.location.search).get("q");
  if (currentQuery) {
    input.value = currentQuery;
  }
}

document.querySelectorAll("[data-site-search]").forEach(initializeSiteSearch);

if (window.location.hash) {
  const searchTarget = document.querySelector(window.location.hash);
  if (searchTarget) {
    searchTarget.classList.add("search-target-highlight");
  }
}
