/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("active");
  });

  // Close menu when a navigation link is clicked
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.classList.remove("active");
    });
  });

  // Close menu when clicking outside it
  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      nav.classList.remove("open");
      menuButton.classList.remove("active");
    }
  });
}


/* =========================
   START WEBSITE AT THE TOP
========================= */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  if (!window.location.hash) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }
});


/* =========================
   JOURNEY — CLICK TO EXPAND
========================= */

document.querySelectorAll(".journey-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isOpen = card.classList.contains("open");

    // Close other journey cards
    document.querySelectorAll(".journey-card.open").forEach((openCard) => {
      openCard.classList.remove("open");
    });

    // Open clicked card if it wasn't already open
    if (!isOpen) {
      card.classList.add("open");
    }
  });
});
