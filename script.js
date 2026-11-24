const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Replace this placeholder with the business email before publishing.
const contactLink = document.querySelector("#contact-link");
if (contactLink) {
  contactLink.href = "mailto:Aegarcia1012925@gmail.com";
}

// Respect reduced-motion preferences while revealing content on scroll.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else { revealItems.forEach((item) => item.classList.add("is-visible")); }

// The inquiry form opens a prefilled email; it does not store or send data itself.
const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const data = new FormData(inquiryForm);
  const subject = encodeURIComponent("Kuji Digital project inquiry");
  const body = encodeURIComponent("Name: " + (data.get("name") || "") + "\\nBusiness: " + (data.get("business") || "") + "\\nReply email: " + (data.get("email") || "") + "\\nService: " + (data.get("service") || "") + "\\n\\nProject details:\\n" + (data.get("details") || ""));
  const status = document.querySelector("#form-status");
  if (status) status.textContent = "Opening your email app. Review the message and send it when you're ready.";
  window.location.href = "mailto:Aegarcia1012925@gmail.com?subject=" + subject + "&body=" + body;
});

// Scripted sample replies for the portfolio demo; this is not a live AI service.
const demoMessages = document.querySelector("#demo-messages");
if (demoMessages) document.querySelectorAll(".prompt-chip").forEach((button) => button.addEventListener("click", () => {
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.textContent = button.textContent.trim();
  const answerBubble = document.createElement("div");
  answerBubble.className = "chat-bubble assistant";
  answerBubble.textContent = button.dataset.answer;
  demoMessages.append(userBubble, answerBubble);
  demoMessages.scrollTop = demoMessages.scrollHeight;
}));
