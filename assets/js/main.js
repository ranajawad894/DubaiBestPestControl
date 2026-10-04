// Calculator State
let currentPropType = "apartment";

function setPropertyType(type, btn) {
  currentPropType = type;
  document.querySelectorAll(".calc-prop-btn").forEach((b) => {
    b.classList.remove("border-brand-600", "bg-brand-50", "text-brand-800");
    b.classList.add("border-slate-200", "bg-white", "text-slate-700");
  });
  btn.classList.remove("border-slate-200", "bg-white", "text-slate-700");
  btn.classList.add("border-brand-600", "bg-brand-50", "text-brand-800");
  calculatePrice();
}

function calculatePrice() {
  const sizeElem = document.getElementById("calc-size");
  const pestElem = document.getElementById("calc-pest");
  const priceDisplay = document.getElementById("calc-price-display");

  if (!sizeElem || !pestElem || !priceDisplay) return;

  const size = sizeElem.value;
  const pest = pestElem.value;

  let base = 130;
  if (currentPropType === "villa") base = 200;

  if (size === "2bh") base += 40;
  if (size === "3bh") base += 80;
  if (size === "large") base += 120;

  if (pest === "bedbugs") base += 0;
  if (pest === "termites") base += 0;
  if (pest === "rodents") base += 0;

  priceDisplay.innerText = `AED ${base}`;
}

// Form Submission Handlers
function handleQuickSubmit(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("hero-name")?.value.trim() || "";
  const phone = document.getElementById("hero-phone")?.value.trim() || "";
  const pest = document.getElementById("hero-pest")?.value || "";

  // Validate
  if (!name || !phone || !pest) {
    showModal(
      "Missing Information",
      "Please fill in all required fields before continuing.",
    );
    return;
  }

  // WhatsApp number
  const whatsappNumber = "971563269418";

  // WhatsApp message
  const message =
    "*QUICK PEST CONTROL REQUEST*\n\n" +
    "👤 *Name:* " +
    name +
    "\n" +
    "📞 *UAE Phone:* " +
    phone +
    "\n" +
    "🐜 *Pest Problem:* " +
    pest +
    "\n\n" +
    "📍 *Request:* Free Consultation";

  // Encode message
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp URL
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=" +
    whatsappNumber +
    "&text=" +
    encodedMessage;

  // Debug
  console.log("Quick Booking Message:", message);
  console.log("WhatsApp URL:", whatsappUrl);

  // Change button
  const button = document.getElementById("hero-submit-btn");

  if (button) {
    button.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Opening WhatsApp...';

    button.disabled = true;
  }

  // Show popup
  showModal(
    "Opening WhatsApp",
    "Your consultation request is ready. WhatsApp will open now. Please press Send to submit your request.",
  );

  // Reset after values are captured
  e.target.reset();

  // Open WhatsApp
  setTimeout(function () {
    window.location.href = whatsappUrl;
  }, 800);
}

function handleBookingSubmit(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("booking-name")?.value.trim() || "";
  const phone = document.getElementById("booking-phone")?.value.trim() || "";
  const area = document.getElementById("booking-area")?.value.trim() || "";
  const service = document.getElementById("booking-service")?.value || "";
  const notes =
    document.getElementById("booking-notes")?.value.trim() || "None";

  // Validate required fields
  if (!name || !phone || !area || !service) {
    showModal(
      "Missing Information",
      "Please fill in all required fields before continuing.",
    );
    return;
  }

  // WhatsApp recipient
  // 0343-33315082 → 923433315082
  const whatsappNumber = "971563269418";

  // Create WhatsApp message
  const message =
    "*NEW APPOINTMENT REQUEST*\n\n" +
    "👤 *Name:* " +
    name +
    "\n" +
    "📞 *Phone:* " +
    phone +
    "\n" +
    "📍 *Area:* " +
    area +
    "\n" +
    "🛠️ *Service:* " +
    service +
    "\n" +
    "📝 *Notes / Preferred Date & Time:* " +
    notes;

  // Encode message
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp URL
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=" +
    whatsappNumber +
    "&text=" +
    encodedMessage;

  console.log("WhatsApp URL:", whatsappUrl);
  console.log("WhatsApp Message:", message);

  // Show opening message
  showModal(
    "Opening WhatsApp",
    "Your booking details are ready. WhatsApp will open now. Please press Send to submit your appointment.",
  );

  // Reset form after collecting values
  e.target.reset();

  // Open WhatsApp
  setTimeout(function () {
    window.location.href = whatsappUrl;
  }, 800);
}

function showModal(title, desc) {
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const customModal = document.getElementById("custom-modal");

  if (modalTitle) modalTitle.innerText = title;
  if (modalDesc) modalDesc.innerText = desc;
  if (customModal) customModal.classList.remove("hidden");
}

function closeModal() {
  const customModal = document.getElementById("custom-modal");
  if (customModal) customModal.classList.add("hidden");
}

// Scroll Spy Functionality for Address Bar and Nav Highlighting
function setupScrollSpy() {
  // Look inside your dynamically loaded section containers for elements with IDs
  const sectionContainers = document.querySelectorAll("main > div[id]");

  if (sectionContainers.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Extract the section name (e.g., "section-calculator" -> "calculator")
        const rawId = entry.target.getAttribute("id");
        const id = rawId.replace("section-", "");

        // Update URL hash cleanly without page jumping
        if (history.replaceState) {
          history.replaceState(null, null, `#${id}`);
        }

        // Highlight active nav link
        updateActiveNavLink(id);
      }
    });
  }, observerOptions);

  sectionContainers.forEach((container) => {
    observer.observe(container);
  });
}

function updateActiveNavLink(id) {
  const navLinks = document.querySelectorAll("nav a, #mobile-menu a");

  navLinks.forEach((link) => {
    link.classList.remove("text-brand-600", "font-bold");
    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("text-brand-600", "font-bold");
    }
  });
}

// Make functions globally available
window.setPropertyType = setPropertyType;
window.calculatePrice = calculatePrice;
window.handleQuickSubmit = handleQuickSubmit;
window.handleBookingSubmit = handleBookingSubmit;
window.showModal = showModal;
window.closeModal = closeModal;
window.setupScrollSpy = setupScrollSpy;
