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

// Track selected size per card in the menu grid
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

// Render Cake Cards in Menu Section
function renderCakeMenu() {
  const grid = document.getElementById("cake-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.cakes
    .map((cake) => {
      const selectedSize = cardSizeState[cake.id] || "0.5 kg";
      const currentPrice = cake.prices[selectedSize];

      return `
        <article class="cake-card" data-cake-id="${cake.id}">
          <div class="cake-img-wrap">
            <img src="${cake.image}" alt="${cake.name} - Sweet Crumbs Kochi" width="800" height="800" loading="lazy" />
            <span class="cake-tag">${cake.tag}</span>
          </div>
          <div class="cake-body">
            <h3 class="cake-title">${cake.name}</h3>
            <p class="cake-desc">${cake.description}</p>
            <div class="card-size-pills" role="group" aria-label="Choose size for ${cake.name}">
              <button
                type="button"
                class="size-pill-btn ${selectedSize === "0.5 kg" ? "active" : ""}"
                data-action="switch-size"
                data-cake-id="${cake.id}"
                data-size="0.5 kg"
              >
                0.5 kg · ₹${cake.prices["0.5 kg"]}
              </button>
              <button
                type="button"
                class="size-pill-btn ${selectedSize === "1 kg" ? "active" : ""}"
                data-action="switch-size"
                data-cake-id="${cake.id}"
                data-size="1 kg"
              >
                1 kg · ₹${cake.prices["1 kg"]}
              </button>
            </div>
            <div class="cake-footer">
              <div class="cake-price">
                ₹<span id="price-${cake.id}">${currentPrice}</span>
                <small id="size-label-${cake.id}">for ${selectedSize}</small>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                data-action="select-cake"
                data-cake-id="${cake.id}"
              >
                Select for Order
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// Populate Cake Select Dropdown
function populateCakeSelect() {
  const select = document.getElementById("order-cake");
  if (!select) return;

  select.textContent = "";
  CONFIG.cakes.forEach((cake) => {
    const option = document.createElement("option");
    option.value = cake.id;
    option.textContent = `${cake.name} (0.5 kg: ₹${cake.prices["0.5 kg"]} / 1 kg: ₹${cake.prices["1 kg"]})`;
    select.appendChild(option);
  });
}

// Calculate and update live summary for Standard Order Form
function updateStandardOrderSummary() {
  const cakeSelect = document.getElementById("order-cake");
  const sizeInput = document.querySelector('input[name="size"]:checked');
  const dietarySelect = document.getElementById("order-dietary");
  const priceDisplay = document.getElementById("standard-price-display");
  const metaDisplay = document.getElementById("standard-summary-meta");

  if (!cakeSelect || !sizeInput || !dietarySelect || !priceDisplay || !metaDisplay) return;

  const cake = CONFIG.cakes.find((c) => c.id === cakeSelect.value) || CONFIG.cakes[0];
  const size = sizeInput.value;
  const dietary = dietarySelect.value;
  const isEggless = dietary.includes("Eggless");

  const basePrice = cake.prices[size] || cake.prices["0.5 kg"];
  const totalPrice = basePrice + (isEggless ? CONFIG.egglessSurchargeINR : 0);

  priceDisplay.textContent = `₹${totalPrice}`;
  metaDisplay.textContent = `${cake.name} · ${size} · ${isEggless ? "Eggless" : "Regular"}`;
}

// Configure Date Pickers & Lead Time Constraints
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

// Build WhatsApp URL and open in a new tab
function openWhatsAppOrder(messageText) {
  const encoded = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// Setup Event Listeners
function initSweetCrumbsApp() {
  // Set Razorpay link from central CONFIG
  const rzpBtn = document.getElementById("razorpay-advance-link");
  if (rzpBtn) {
    rzpBtn.href = CONFIG.razorpayAdvanceLink;
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = "2026";
  }

  renderCakeMenu();
  populateCakeSelect();
  setupDatePickers();
  updateStandardOrderSummary();

  // Menu Card Interactions (Size Toggle & Select for Order)
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
          `input[name="size"][value="${chosenSize}"]`
        );
        if (sizeRadio) {
          sizeRadio.checked = true;
        }
        updateStandardOrderSummary();

        const orderSection = document.getElementById("order");
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Live Summary Updates on Standard Order Form
  const standardForm = document.getElementById("standard-order-form");
  if (standardForm) {
    standardForm.addEventListener("change", updateStandardOrderSummary);

    standardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorEl = document.getElementById("standard-form-error");
      if (errorEl) errorEl.hidden = true;

      const cakeId = document.getElementById("order-cake").value;
      const cake = CONFIG.cakes.find((c) => c.id === cakeId) || CONFIG.cakes[0];
      const size = document.querySelector('input[name="size"]:checked').value;
      const deliveryDate = document.getElementById("order-date").value;
      const dietary = document.getElementById("order-dietary").value;
      const customerName = document.getElementById("customer-name").value.trim();
      const deliveryArea = document.getElementById("delivery-area").value.trim();
      const cakeMessage = document.getElementById("cake-message").value.trim();

      const todayISO = formatDateISO(getDateDaysAhead(0));

      if (!customerName || !deliveryArea || !deliveryDate) {
        if (errorEl) {
          errorEl.textContent =
            "Please enter your name, delivery area in Kochi, and delivery date.";
          errorEl.hidden = false;
        }
        return;
      }

      if (deliveryDate < todayISO) {
        if (errorEl) {
          errorEl.textContent = "Delivery date cannot be in the past.";
          errorEl.hidden = false;
        }
        return;
      }

      const isEggless = dietary.includes("Eggless");
      const totalPrice =
        cake.prices[size] + (isEggless ? CONFIG.egglessSurchargeINR : 0);

      const messageLines = [
        "Hi Sneha! I would like to place a cake order from *Sweet Crumbs*:",
        "",
        `- *Cake:* ${cake.name}`,
        `- *Size:* ${size}`,
        `- *Preference:* ${dietary.replace("₹", "Rs. ")}`,
        `- *Estimated Price:* Rs. ${totalPrice}`,
        `- *Delivery Date:* ${deliveryDate}`,
        `- *Message on Cake:* ${cakeMessage || "None"}`,
        "",
        `- *Customer Name:* ${customerName}`,
        `- *Delivery Area (Kochi):* ${deliveryArea}`,
      ];

      openWhatsAppOrder(messageLines.join("\n"));
    });
  }

  // Custom Cake Order Form Submission (enforces >= 2 days ahead)
  const customForm = document.getElementById("custom-order-form");
  if (customForm) {
    customForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorEl = document.getElementById("custom-form-error");
      if (errorEl) errorEl.hidden = true;

      const customerName = document.getElementById("custom-name").value.trim();
      const size = document.getElementById("custom-size").value;
      const flavour = document.getElementById("custom-flavour").value;
      const deliveryDate = document.getElementById("custom-date").value;
      const notes = document.getElementById("custom-notes").value.trim();
      const paymentRef = document.getElementById("custom-ref").value.trim();

      const minCustomISO = formatDateISO(
        getDateDaysAhead(CONFIG.customCakeMinDaysAhead)
      );

      if (!customerName || !deliveryDate || !notes) {
        if (errorEl) {
          errorEl.textContent =
            "Please fill in your name, delivery date, and custom design description.";
          errorEl.hidden = false;
        }
        return;
      }

      if (deliveryDate < minCustomISO) {
        if (errorEl) {
          errorEl.textContent = `Custom cakes require at least ${CONFIG.customCakeMinDaysAhead} days notice. Please choose ${minCustomISO} or later.`;
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
        `- *Delivery Date:* ${deliveryDate} (2+ days notice)`,
        `- *Theme & Cake Message:* ${notes}`,
        `- *Rs. ${CONFIG.advanceAmountINR} Razorpay Advance:* ${
          paymentRef || `Paid / Paying via ${CONFIG.razorpayAdvanceLink}`
        }`,
        "",
        `- *Customer Name:* ${customerName}`,
      ];

      openWhatsAppOrder(messageLines.join("\n"));
    });
  }
}

document.addEventListener("DOMContentLoaded", initSweetCrumbsApp);
