(function () {
  const USERS_KEY = "soma-demo-users";
  const SESSION_KEY = "soma-demo-session";

  function readUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    const userId = localStorage.getItem(SESSION_KEY);
    return readUsers().find((user) => user.id === userId) || null;
  }

  function saveCurrentUser(updatedUser) {
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUsers(users);
    }
  }

  function removePurchase(purchaseId) {
    const currentUser = getCurrentUser();
    const historyMessage = document.querySelector("[data-history-message]");

    if (!currentUser) {
      return;
    }

    const purchases = currentUser.purchases || [];
    const removedPurchase = purchases.find((purchase) => (purchase.id || purchase.orderId) === purchaseId);

    if (!removedPurchase) {
      setMessage(historyMessage, "That demo order could not be found.", "error");
      return;
    }

    currentUser.purchases = purchases.filter((purchase) => (purchase.id || purchase.orderId) !== purchaseId);
    saveCurrentUser(currentUser);
    renderPurchaseHistory(currentUser);
    setMessage(
      historyMessage,
      `${removedPurchase.product} was removed from your purchase history.`,
      "success"
    );
  }

  async function hashPassword(password) {
    const encodedPassword = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function createId(prefix) {
    if (crypto.randomUUID) {
      return `${prefix}-${crypto.randomUUID()}`;
    }

    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function setMessage(element, message, type) {
    if (!element) {
      return;
    }

    element.textContent = message;
    element.dataset.type = type || "info";
  }

  function updateAccountLinks() {
    const currentUser = getCurrentUser();

    document.querySelectorAll("[data-account-link]").forEach((link) => {
      link.classList.toggle("is-signed-in", Boolean(currentUser));
      link.setAttribute(
        "aria-label",
        currentUser ? `Open ${currentUser.name}'s account` : "Sign in or create an account"
      );
      link.title = currentUser ? `Signed in as ${currentUser.name}` : "Sign in or create an account";
    });
  }

  function renderPurchaseHistory(user) {
    const history = document.querySelector("[data-purchase-history]");

    if (!history) {
      return;
    }

    history.replaceChildren();

    if (!user.purchases || user.purchases.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "empty-history";
      emptyState.textContent = "No demo purchases yet. Visit the shop to add your first order.";
      history.appendChild(emptyState);
      return;
    }

    user.purchases.forEach((purchase) => {
      const item = document.createElement("article");
      const details = document.createElement("div");
      const productName = document.createElement("h3");
      const orderDetails = document.createElement("p");
      const actions = document.createElement("div");
      const total = document.createElement("strong");
      const deleteButton = document.createElement("button");
      const date = new Date(purchase.date);
      const purchaseId = purchase.id || purchase.orderId;

      item.className = "history-item";
      actions.className = "history-actions";
      productName.textContent = purchase.product;
      orderDetails.textContent = `${purchase.orderId} · ${date.toLocaleDateString()} · ${purchase.status}`;
      total.textContent = `$${Number(purchase.total).toLocaleString()}`;
      deleteButton.className = "danger-action";
      deleteButton.type = "button";
      deleteButton.textContent = "Remove";
      deleteButton.setAttribute("aria-label", `Remove ${purchase.product} from purchase history`);
      deleteButton.addEventListener("click", () => removePurchase(purchaseId));

      details.append(productName, orderDetails);
      actions.append(total, deleteButton);
      item.append(details, actions);
      history.appendChild(item);
    });
  }

  function renderAccountPage() {
    const guestView = document.querySelector("[data-guest-view]");
    const memberView = document.querySelector("[data-member-view]");

    if (!guestView || !memberView) {
      return;
    }

    const currentUser = getCurrentUser();
    guestView.hidden = Boolean(currentUser);
    memberView.hidden = !currentUser;

    if (!currentUser) {
      return;
    }

    const welcomeName = document.querySelector("[data-account-name]");
    const accountEmail = document.querySelector("[data-account-email]");
    const notificationCheckbox = document.querySelector("[data-notification-preference]");

    welcomeName.textContent = currentUser.name;
    accountEmail.textContent = currentUser.email;
    notificationCheckbox.checked = Boolean(currentUser.emailNotifications);
  }

  function renderPurchaseHistoryPage() {
    const historyPage = document.querySelector("[data-history-page]");

    if (!historyPage) {
      return;
    }

    const guestView = document.querySelector("[data-history-guest-view]");
    const memberView = document.querySelector("[data-history-member-view]");
    const currentUser = getCurrentUser();

    guestView.hidden = Boolean(currentUser);
    memberView.hidden = !currentUser;

    if (!currentUser) {
      return;
    }

    const historyName = document.querySelector("[data-history-name]");
    const historyEmail = document.querySelector("[data-history-email]");

    historyName.textContent = currentUser.name;
    historyEmail.textContent = currentUser.email;
    renderPurchaseHistory(currentUser);
  }

  const signUpForm = document.querySelector("[data-signup-form]");
  if (signUpForm) {
    signUpForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = signUpForm.querySelector("[data-form-message]");
      const formData = new FormData(signUpForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const password = String(formData.get("password") || "");
      const confirmPassword = String(formData.get("confirmPassword") || "");
      const users = readUsers();

      if (password.length < 8) {
        setMessage(message, "Use at least 8 characters for your password.", "error");
        return;
      }

      if (password !== confirmPassword) {
        setMessage(message, "The passwords do not match.", "error");
        return;
      }

      if (users.some((user) => user.email === email)) {
        setMessage(message, "An account with that email already exists.", "error");
        return;
      }

      const submitButton = signUpForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Creating account...";

      try {
        const user = {
          id: createId("user"),
          name,
          email,
          passwordHash: await hashPassword(password),
          emailNotifications: formData.get("emailNotifications") === "on",
          purchases: [],
          createdAt: new Date().toISOString()
        };

        users.push(user);
        saveUsers(users);
        localStorage.setItem(SESSION_KEY, user.id);
        signUpForm.reset();
        updateAccountLinks();
        renderAccountPage();
      } catch (error) {
        setMessage(message, "This browser could not create the demo account.", "error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create account";
      }
    });
  }

  const loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = loginForm.querySelector("[data-form-message]");
      const formData = new FormData(loginForm);
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const passwordHash = await hashPassword(String(formData.get("password") || ""));
      const user = readUsers().find(
        (candidate) => candidate.email === email && candidate.passwordHash === passwordHash
      );

      if (!user) {
        setMessage(message, "Email or password not recognized.", "error");
        return;
      }

      localStorage.setItem(SESSION_KEY, user.id);
      loginForm.reset();
      updateAccountLinks();
      renderAccountPage();
    });
  }

  const logoutButton = document.querySelector("[data-logout]");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      updateAccountLinks();
      renderAccountPage();
      renderPurchaseHistoryPage();
    });
  }

  const notificationForm = document.querySelector("[data-notification-form]");
  if (notificationForm) {
    notificationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const currentUser = getCurrentUser();
      const checkbox = notificationForm.querySelector("[data-notification-preference]");
      const message = notificationForm.querySelector("[data-form-message]");

      if (!currentUser) {
        return;
      }

      currentUser.emailNotifications = checkbox.checked;
      saveCurrentUser(currentUser);
      setMessage(
        message,
        checkbox.checked
          ? "Email notifications are enabled for this demo account."
          : "Email notifications are turned off.",
        "success"
      );
    });
  }

  const shopMessage = document.querySelector("[data-shop-message]");
  document.querySelectorAll("[data-purchase]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        setMessage(shopMessage, "Sign in or create an account before saving a demo purchase.", "error");
        return;
      }

      const purchase = {
        id: createId("purchase"),
        orderId: `SOMA-${Date.now().toString(36).toUpperCase()}`,
        product: button.dataset.product,
        total: Number(button.dataset.price),
        status: "Confirmed",
        date: new Date().toISOString()
      };

      currentUser.purchases = currentUser.purchases || [];
      currentUser.purchases.unshift(purchase);
      saveCurrentUser(currentUser);
      setMessage(
        shopMessage,
        `${purchase.product} was saved to ${currentUser.name}'s purchase history. No payment was charged.`,
        "success"
      );
    });
  });

  updateAccountLinks();
  renderAccountPage();
  renderPurchaseHistoryPage();
})();
