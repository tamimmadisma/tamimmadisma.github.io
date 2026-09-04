const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav nav");

menu?.addEventListener("click", () => {
  nav.classList.toggle("open");
  menu.textContent = nav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    if (menu) menu.textContent = "☰";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}
