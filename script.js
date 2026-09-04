/* =========================================================
   TAMIMMAH DISMA LESTARI
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   DOM
========================================================= */

const body = document.body;
const header = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL
========================================================= */

function handleHeaderScroll() {

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

  mobileNav.classList.add("active");
  menuToggle.classList.add("active");

  body.classList.add("menu-open");

  menuToggle.setAttribute("aria-expanded", "true");

}


function closeMenu() {

  mobileNav.classList.remove("active");
  menuToggle.classList.remove("active");

  body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");

}


if (menuToggle) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mobileNav.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });

}


/* =========================================================
   MOBILE NAV LINKS
========================================================= */

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(link => {

  link.addEventListener("click", () => {
    closeMenu();
  });

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeMenu();
  }

});


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING BACKDROP
========================================================= */

if (mobileNav) {

  mobileNav.addEventListener("click", event => {

    if (event.target === mobileNav) {
      closeMenu();
    }

  });

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {

  link.addEventListener("click", event => {

    const targetID = link.getAttribute("href");

    if (!targetID || targetID === "#") {
      return;
    }

    const target = document.querySelector(targetID);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerOffset = 75;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});


/* =========================================================
   JOURNEY MILESTONES
========================================================= */

const milestones = document.querySelectorAll(".milestone[data-milestone]");

milestones.forEach(milestone => {

  milestone.addEventListener("click", () => {

    const isActive = milestone.classList.contains("active");

    milestones.forEach(item => {
      item.classList.remove("active");
    });

    if (!isActive) {
      milestone.classList.add("active");
    }

  });

});


/* =========================================================
   SKILL MAP
========================================================= */

const skillNodes = document.querySelectorAll(".skill-node");
const skillDetails = document.querySelectorAll(".skill-detail");

function activateSkill(skillName) {

  skillNodes.forEach(node => {

    node.classList.toggle(
      "active",
      node.dataset.skill === skillName
    );

  });


  skillDetails.forEach(detail => {

    detail.classList.toggle(
      "active",
      detail.dataset.detail === skillName
    );

  });

}


skillNodes.forEach(node => {

  node.addEventListener("click", () => {

    activateSkill(node.dataset.skill);

  });

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealTargets = document.querySelectorAll(
  ".section-heading, " +
  ".about-grid, " +
  ".proof-strip, " +
  ".journey-intro, " +
  ".milestone, " +
  ".experience-row, " +
  ".projects-intro, " +
  ".project, " +
  ".skills-intro, " +
  ".skills-map, " +
  ".skill-details, " +
  ".tools-row, " +
  ".education-block, " +
  ".creative-intro, " +
  ".creative-piece, " +
  ".contact-content"
);


revealTargets.forEach(element => {
  element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);


revealTargets.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================================
   STAGGER EXPERIENCE ROWS
========================================================= */

const experienceRows =
  document.querySelectorAll(".experience-row");

experienceRows.forEach((row, index) => {

  row.style.transitionDelay = `${index * 50}ms`;

});


/* =========================================================
   STAGGER JOURNEY
========================================================= */

const journeyItems =
  document.querySelectorAll(".milestone[data-milestone]");

journeyItems.forEach((item, index) => {

  item.style.transitionDelay = `${index * 50}ms`;

});


/* =========================================================
   PROJECT MICRO-MOTION
========================================================= */

const projectCards =
  document.querySelectorAll(".project");

projectCards.forEach(project => {

  const visual = project.querySelector(".project-visual");

  if (!visual) {
    return;
  }


  project.addEventListener("mousemove", event => {

    const rect = project.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    const moveX = (x - 0.5) * 8;
    const moveY = (y - 0.5) * 8;

    visual.style.transform =
      `translate(${moveX}px, ${moveY}px)`;

  });


  project.addEventListener("mouseleave", () => {

    visual.style.transform =
      "translate(0, 0)";

  });

});


/* =========================================================
   CREATIVE IMAGE PARALLAX
========================================================= */

const photoshopImage =
  document.querySelector(".photoshop-image");

if (photoshopImage) {

  window.addEventListener("scroll", () => {

    const rect =
      photoshopImage.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;

    if (
      rect.top < viewportHeight &&
      rect.bottom > 0
    ) {

      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height);

      const offset =
        (progress - 0.5) * 12;

      photoshopImage.style.setProperty(
        "--image-shift",
        `${offset}px`
      );

    }

  });

}


/* =========================================================
   ACTIVE SECTION NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
  "section[id]"
);

const desktopNavLinks =
  document.querySelectorAll(
    ".desktop-nav a"
  );


const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.id;

        desktopNavLinks.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );

        });

      });

    },
    {
      threshold: 0.35
    }
  );


sections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener("resize", () => {

  if (
    window.innerWidth > 700 &&
    mobileNav.classList.contains("active")
  ) {

    closeMenu();

  }

});


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const images =
  document.querySelectorAll("img");

images.forEach(image => {

  image.addEventListener("error", () => {

    image.style.display = "none";

  });

});
