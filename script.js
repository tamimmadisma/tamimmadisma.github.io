const m = document.querySelector('#menu');
const n = document.querySelector('nav');

m.onclick = () => n.classList.toggle('open');

document.querySelectorAll('nav a').forEach(a => {
  a.onclick = () => n.classList.remove('open');
});


/* START WEBSITE AT THE TOP */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
