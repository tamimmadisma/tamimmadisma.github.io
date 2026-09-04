/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#nav");

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuButton.classList.toggle("active", isOpen);

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

  });


  /* CLOSE MENU AFTER CLICKING A LINK */

  document.querySelectorAll("nav a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");
      menuButton.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open menu"
      );

    });

  });


  /* CLOSE WHEN CLICKING OUTSIDE */

  document.addEventListener("click", (event) => {

    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {

      nav.classList.remove("open");
      menuButton.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open menu"
      );

    }

  });


  /* CLOSE WITH ESCAPE */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      nav.classList.contains("open")
    ) {

      nav.classList.remove("open");
      menuButton.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open menu"
      );

      menuButton.focus();

    }

  });

}


/* =========================
   START WEBSITE AT THE TOP
========================= */

/*
   Prevent the browser from restoring an old
   scroll position when reopening the website.
*/

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}


/*
   Only force the top when there is no anchor
   in the URL.

   This means:
   tamimmah-disma.github.io/
   → starts at the top

   tamimmah-disma.github.io/#journey
   → opens at Journey normally
*/

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
   JOURNEY ACCORDION
========================= */

const journeyCards = document.querySelectorAll(".journey-card");

journeyCards.forEach((card) => {

  card.addEventListener("click", () => {

    const alreadyOpen = card.classList.contains("open");


    /* CLOSE ALL OTHER CARDS */

    journeyCards.forEach((otherCard) => {
      otherCard.classList.remove("open");
    });


    /* OPEN THE CLICKED CARD */

    if (!alreadyOpen) {
      card.classList.add("open");
    }

  });

});


/* =========================
   SMOOTH ANCHOR NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#" ||
      targetId === "#top"
    ) {

      if (targetId === "#top") {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }

      return;
    }


    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    /*
       Update the URL without causing the browser
       to perform another jump.
    */

    history.pushState(
      null,
      "",
      targetId
    );

  });

});
