(function () {
  var COMPANY_EMAIL = "loveness@manondo.co.za";

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // "Request this service" buttons pre-select the service in the form
  var serviceSelect = document.getElementById("service");
  document.querySelectorAll("[data-service]").forEach(function (a) {
    a.addEventListener("click", function () {
      serviceSelect.value = a.getAttribute("data-service");
    });
  });

  // ------------------------------------------------------------
  // CLIENT REVIEWS
  // Replace the placeholder entries below with real reviews from
  // Manondo's past clients (get their permission first).
  // If this list is empty, the whole Reviews section is hidden.
  // ------------------------------------------------------------
  var REVIEWS = [
    {
      text: "Add a real client review here.",
      name: "Client Name",
      role: "Business / Position",
      stars: 5,
    },
    {
      text: "Add a real client review here.",
      name: "Client Name",
      role: "Business / Position",
      stars: 5,
    },
    {
      text: "Add a real client review here.",
      name: "Client Name",
      role: "Business / Position",
      stars: 5,
    },
  ];

  var reviewsSection = document.getElementById("reviews");
  var reviewsNav = document.getElementById("reviewsNav");
  var reviewsList = document.getElementById("reviewsList");

  if (!REVIEWS.length) {
    reviewsSection.hidden = true;
    reviewsNav.hidden = true;
  } else {
    REVIEWS.forEach(function (r) {
      var card = document.createElement("figure");
      card.className = "review";

      var stars = document.createElement("div");
      stars.className = "review-stars";
      stars.setAttribute("aria-label", (r.stars || 5) + " out of 5 stars");
      stars.textContent = "\u2605".repeat(r.stars || 5);

      var quote = document.createElement("blockquote");
      quote.className = "review-text";
      quote.textContent = r.text;

      var author = document.createElement("figcaption");
      author.className = "review-author";
      author.textContent = r.name;
      if (r.role) {
        var role = document.createElement("span");
        role.className = "review-role";
        role.textContent = r.role;
        author.appendChild(role);
      }

      card.appendChild(stars);
      card.appendChild(quote);
      card.appendChild(author);
      reviewsList.appendChild(card);
    });
  }

  // Form -> opens email app with the request filled in
  var form = document.getElementById("requestForm");
  var errorBox = document.getElementById("formError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var service = form.service.value;
    var message = form.message.value.trim();

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !service || !message) {
      errorBox.textContent =
        "Please fill in your name, a valid email, the service needed and your request.";
      errorBox.hidden = false;
      return;
    }
    errorBox.hidden = true;

    var subject = "Service Request: " + service + " - " + name;
    var body =
      "Hello Manondo,\n\n" +
      "I would like to request the following service: " +
      service +
      ".\n\n" +
      "Request details:\n" +
      message +
      "\n\n" +
      "Contact details:\n" +
      "Name: " +
      name +
      "\n" +
      "Email: " +
      email +
      "\n" +
      (phone ? "Phone: " + phone + "\n" : "") +
      "\nKind regards,\n" +
      name;

    window.location.href =
      "mailto:" +
      COMPANY_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  });
})();
