// ============================================================================
// SWEET CRUMBS BY SNEHA — CENTRAL CONFIGURATION
// Sneha can update her WhatsApp number, Razorpay link, and cake menu here.
// ============================================================================
const CONFIG = {
  whatsappNumber: "910000000000",
  razorpayAdvanceLink: "https://rzp.io/rzp/K9KIDju",
  advanceAmountINR: 200,
  customCakeMinDaysAhead: 2,
  egglessSurchargeINR: 50,
  cakes: [
    {
      id: "chocolate-truffle",
      name: "Belgian Chocolate Truffle",
      tag: "Bestseller",
      badgeClass: "badge-yellow rotate-pos",
      cardClass: "card-white",
      description:
        "Rich dark chocolate sponge layered with silky 55% Belgian couverture ganache.",
      image: "images/chocolate-truffle.webp",
      prices: {
        "0.5 kg": 550,
        "1 kg": 1000,
      },
    },
    {
      id: "tender-coconut",
      name: "Kerala Tender Coconut (Elaneer)",
      tag: "Kochi Favourite",
      badgeClass: "badge-mint rotate-pos",
      cardClass: "card-white",
      description:
        "Soft vanilla sponge soaked in tender coconut milk with fresh elaneer pulp & white chocolate.",
      image: "images/tender-coconut.webp",
      prices: {
        "0.5 kg": 600,
        "1 kg": 1100,
      },
    },
    {
      id: "red-velvet",
      name: "Classic Red Velvet Cream Cheese",
      tag: "Signature",
      badgeClass: "badge-yellow rotate-neg",
      cardClass: "card-mint",
      description:
        "Velvety cocoa-kissed crimson layers frosted with tangy house-whipped cream cheese.",
      image: "images/red-velvet.webp",
      prices: {
        "0.5 kg": 580,
        "1 kg": 1050,
      },
    },
    {
      id: "mango-bliss",
      name: "Fresh Alphonso Mango Bliss",
      tag: "Seasonal Special",
      badgeClass: "badge-yellow rotate-neg",
      cardClass: "card-mint",
      description:
        "Light sponge layered with real Alphonso mango compote, whipped cream & fresh mango cubes.",
      image: "images/mango-cake.webp",
      prices: {
        "0.5 kg": 520,
        "1 kg": 950,
      },
    },
  ],
};

// Track selected size per card in the menu grid (only 0.5 kg and 1 kg)
const cardSizeState = {};
CONFIG.cakes.forEach((cake) => {
  cardSizeState[cake.id] = "0.5 kg";
});

// Format date as YYYY-MM-DD in local time
function formatDateISO(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateDaysAhead(days) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

// Render the 4 Signature Cake Cards into the menu grid
function renderCakeMenu() {
  const grid = document.getElementById("cake-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.cakes
    .map((cake) => {
      const selectedSize = cardSizeState[cake.id] || "0.5 kg";
      const priceHalfKg = cake.prices["0.5 kg"];
      const priceOneKg = cake.prices["1 kg"];

      return `
        <article class="cake-card ${cake.cardClass}" data-cake-id="${cake.id}">
          <div class="card-badge-wrap">
            <span class="sticker-badge ${cake.badgeClass}">
              ★ ${cake.tag}
            </span>
          </div>
          <div>
            <div class="card-img-wrap">
              <img src="${cake.image}" alt="${cake.name} - Sweet Crumbs Kochi" width="600" height="600" loading="lazy" />
            </div>
            <h3 class="card-title font-headline">${cake.name}</h3>
            <p class="card-desc">${cake.description}</p>
          </div>
          <div>
            <div class="card-size-selector" role="group" aria-label="Select size for ${cake.name}">
              <button
                type="button"
                class="size-btn ${selectedSize === "0.5 kg" ? "active" : ""}"
                data-action="switch-size"
                data-cake-id="${cake.id}"
                data-size="0.5 kg"
              >
                0.5 kg
              </button>
              <button
                type="button"
                class="size-btn ${selectedSize === "1 kg" ? "active" : ""}"
                data-action="switch-size"
                data-cake-id="${cake.id}"
                data-size="1 kg"
              >
                1 kg
              </button>
            </div>
            <div class="card-pricing-pill">
              <span class="card-pricing-text">0.5 kg: ₹${priceHalfKg} &nbsp;|&nbsp; 1 kg: ₹${priceOneKg}</span>
              <span class="card-pricing-sub">Selected: <strong>${selectedSize} (₹${cake.prices[selectedSize]})</strong></span>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-full"
              data-action="select-cake"
              data-cake-id="${cake.id}"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Select Cake</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

// Populate the cake select options in the WhatsApp order form
function populateCakeSelect() {
  const select = document.getElementById("order-cake");
  if (!select) return;

  select.innerHTML = "";
  CONFIG.cakes.forEach((cake) => {
    const opt = document.createElement("option");
    opt.value = cake.id;
    opt.textContent = `${cake.name} (0.5 kg: ₹${cake.prices["0.5 kg"]} / 1 kg: ₹${cake.prices["1 kg"]})`;
    select.appendChild(opt);
  });
}

// Calculate and update the live order price display (only 0.5 kg and 1 kg)
function updateStandardOrderSummary() {
  const cakeSelect = document.getElementById("order-cake");
  const sizeInput = document.querySelector('input[name="cakeWeight"]:checked');
  const dietarySelect = document.getElementById("order-dietary");
  const priceDisplay = document.getElementById("standard-price-display");
  const metaDisplay = document.getElementById("standard-summary-meta");

  if (!cakeSelect || !sizeInput || !priceDisplay || !metaDisplay) return;

  const cake = CONFIG.cakes.find((c) => c.id === cakeSelect.value) || CONFIG.cakes[0];
  const size = sizeInput.value;
  const dietary = dietarySelect ? dietarySelect.value : "Regular (With Egg)";
  const isEggless = dietary.includes("Eggless");

  const basePrice = cake.prices[size] || cake.prices["0.5 kg"];
  const totalPrice = basePrice + (isEggless ? CONFIG.egglessSurchargeINR : 0);

  priceDisplay.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;
  metaDisplay.textContent = `${cake.name} · ${size} · ${isEggless ? "Eggless (+₹50)" : "Regular"}`;
}

// Set up date pickers with appropriate minimum dates
function setupDatePickers() {
  const standardDateInput = document.getElementById("order-date");
  const customDateInput = document.getElementById("custom-date");
  const customDateHint = document.getElementById("custom-date-hint");

  const todayISO = formatDateISO(getDateDaysAhead(0));
  const tomorrowISO = formatDateISO(getDateDaysAhead(1));
  const minCustomDateObj = getDateDaysAhead(CONFIG.customCakeMinDaysAhead);
  const minCustomISO = formatDateISO(minCustomDateObj);

  if (standardDateInput) {
    standardDateInput.min = todayISO;
    standardDateInput.value = tomorrowISO;
  }

  if (customDateInput) {
    customDateInput.min = minCustomISO;
    customDateInput.value = minCustomISO;
  }

  if (customDateHint) {
    customDateHint.textContent = `Earliest available custom cake date: ${minCustomISO} (at least ${CONFIG.customCakeMinDaysAhead} days ahead).`;
  }
}

// Open WhatsApp with pre-composed order text
function openWhatsAppOrder(messageText) {
  const encoded = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// Smooth scroll to an element by ID
function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// Active navigation highlight on scroll
function setupScrollSpy() {
  const navLinks = document.querySelectorAll(".main-navigation .nav-link");
  const sections = ["menu", "order-form", "custom-cakes", "about"];

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          current = id;
        }
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Initialize Application
function initSweetCrumbsApp() {
  // Sync Razorpay advance link button from CONFIG
  const rzpBtn = document.getElementById("razorpay-advance-link");
  if (rzpBtn) {
    rzpBtn.href = CONFIG.razorpayAdvanceLink;
  }

  // Update dynamic year
  const yearEls = document.querySelectorAll(".current-year");
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  renderCakeMenu();
  populateCakeSelect();
  setupDatePickers();
  updateStandardOrderSummary();
  setupScrollSpy();

  // Menu card button events (size toggle & select cake)
  const cakeGrid = document.getElementById("cake-grid");
  if (cakeGrid) {
    cakeGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");
      const cakeId = btn.getAttribute("data-cake-id");

      if (action === "switch-size") {
        const newSize = btn.getAttribute("data-size");
        cardSizeState[cakeId] = newSize;
        renderCakeMenu();
      } else if (action === "select-cake") {
        const chosenSize = cardSizeState[cakeId] || "0.5 kg";
        const cakeSelect = document.getElementById("order-cake");
        if (cakeSelect) {
          cakeSelect.value = cakeId;
        }

        const sizeRadio = document.querySelector(
          `input[name="cakeWeight"][value="${chosenSize}"]`
        );
        if (sizeRadio) {
          sizeRadio.checked = true;
        }

        updateStandardOrderSummary();
        scrollToElement("order-form");
      }
    });
  }

  // Listen to order form changes to update live price
  const standardForm = document.getElementById("standard-order-form");
  if (standardForm) {
    standardForm.addEventListener("change", updateStandardOrderSummary);

    // Standard Order Form Submission
    standardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorEl = document.getElementById("standard-form-error");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }

      const cakeId = document.getElementById("order-cake").value;
      const cake = CONFIG.cakes.find((c) => c.id === cakeId) || CONFIG.cakes[0];
      const weightElem = document.querySelector('input[name="cakeWeight"]:checked');
      const weight = weightElem ? weightElem.value : "0.5 kg";

      const date = document.getElementById("order-date").value;
      const time = document.getElementById("order-time-slot").value;
      const message = document.getElementById("cake-message").value.trim() || "None";
      const area = document.getElementById("delivery-area").value.trim();
      const name = document.getElementById("customer-name").value.trim();
      const phone = document.getElementById("customer-phone").value.trim();
      const dietarySelect = document.getElementById("order-dietary");
      const dietary = dietarySelect ? dietarySelect.value : "Regular (With Egg)";
      const isEggless = dietary.includes("Eggless");

      const todayISO = formatDateISO(getDateDaysAhead(0));

      if (!name || !phone || !area || !date) {
        if (errorEl) {
          errorEl.textContent = "Please fill in your name, WhatsApp phone, delivery area, and celebration date.";
          errorEl.hidden = false;
        }
        return;
      }

      if (date < todayISO) {
        if (errorEl) {
          errorEl.textContent = "Celebration date cannot be in the past.";
          errorEl.hidden = false;
        }
        return;
      }

      const basePrice = cake.prices[weight] || cake.prices["0.5 kg"];
      const totalPrice = basePrice + (isEggless ? CONFIG.egglessSurchargeINR : 0);

      const messageLines = [
        "Hi Sneha! I would like to place a cake order from *Sweet Crumbs*:",
        "",
        `- *Cake:* ${cake.name}`,
        `- *Size:* ${weight}`,
        `- *Preference:* ${dietary.replace("₹", "Rs. ")}`,
        `- *Estimated Price:* Rs. ${totalPrice}`,
        `- *Delivery Date:* ${date}`,
        `- *Time Slot:* ${time}`,
        `- *Message on Cake:* ${message}`,
        "",
        `- *Customer Name:* ${name} (${phone})`,
        `- *Delivery Area (Kochi):* ${area}`,
      ];

      openWhatsAppOrder(messageLines.join("\n"));
    });
  }

  // Custom Cake Form Submission
  const customForm = document.getElementById("custom-order-form");
  if (customForm) {
    customForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorEl = document.getElementById("custom-form-error");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }

      const name = document.getElementById("custom-name").value.trim();
      const size = document.getElementById("custom-size").value;
      const flavour = document.getElementById("custom-flavour").value;
      const date = document.getElementById("custom-date").value;
      const notes = document.getElementById("custom-notes").value.trim();
      const ref = document.getElementById("custom-ref").value.trim();

      const minCustomISO = formatDateISO(getDateDaysAhead(CONFIG.customCakeMinDaysAhead));

      if (!name || !date || !notes) {
        if (errorEl) {
          errorEl.textContent = "Please fill in your name, delivery date, and custom design description.";
          errorEl.hidden = false;
        }
        return;
      }

      if (date < minCustomISO) {
        if (errorEl) {
          errorEl.textContent = `Custom theme cakes require at least ${CONFIG.customCakeMinDaysAhead} days advance notice. Please select ${minCustomISO} or later.`;
          errorEl.hidden = false;
        }
        return;
      }

      const messageLines = [
        "Hi Sneha! I would like to book a *Custom Cake* from *Sweet Crumbs*:",
        "",
        `- *Order Type:* Custom Theme Cake`,
        `- *Base Flavour:* ${flavour}`,
        `- *Size:* ${size}`,
        `- *Delivery Date:* ${date} (2+ days notice)`,
        `- *Theme & Cake Message:* ${notes}`,
        `- *Rs. ${CONFIG.advanceAmountINR} Razorpay Advance:* ${
          ref || `Paid / Paying via ${CONFIG.razorpayAdvanceLink}`
        }`,
        "",
        `- *Customer Name:* ${name}`,
      ];

      openWhatsAppOrder(messageLines.join("\n"));
    });
  }
}

document.addEventListener("DOMContentLoaded", initSweetCrumbsApp);
