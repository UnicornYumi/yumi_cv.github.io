document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initTypedRole();
  initAOS();
  initTilt();
  initProjectFilters();
  initCopyButtons();
  initPrintButton();
});

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initTypedRole() {
  const typedTarget = document.querySelector("#typed-role");

  if (!typedTarget || typeof Typed === "undefined") {
    return;
  }

  new Typed("#typed-role", {
    strings: [
      "Machine Learning Intern",
      "AI Research Intern",
      "Data Analyst Intern"
    ],
    typeSpeed: 58,
    backSpeed: 28,
    backDelay: 1450,
    loop: true
  });
}

function initAOS() {
  if (typeof AOS === "undefined") {
    return;
  }

  AOS.init({
    duration: 650,
    once: true,
    offset: 40,
    easing: "ease-out-cubic"
  });
}

function initTilt() {
  if (typeof VanillaTilt === "undefined") {
    return;
  }

  VanillaTilt.init(document.querySelectorAll("[data-tilt-card]"), {
    max: 6,
    speed: 400,
    scale: 1.02,
    glare: true,
    "max-glare": 0.12
  });
}

function initProjectFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-project-type]");

  if (!buttons.length || !cards.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      cards.forEach((card) => {
        const match = selected === "all" || card.dataset.projectType === selected;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll("[data-copy-text]");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyText || "");
        const originalText = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = originalText;
        }, 1400);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    });
  });
}

function initPrintButton() {
  const trigger = document.querySelector(".print-trigger");

  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", () => {
    window.print();
  });
}
