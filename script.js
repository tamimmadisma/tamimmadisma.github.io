/* =========================================================
   TAMIMMAH DISMA LESTARI
   PORTFOLIO JAVASCRIPT
   Marketing · Consumer Insights · Business Development
========================================================= */


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const currentYear = document.getElementById("currentYear");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;


/* =========================================================
   PAGE READY
========================================================= */

document.documentElement.classList.add("js-enabled");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

function syncMenuAccessibility() {

  if (!mobileNav || !menuToggle) {
    return;
  }

  const isOpen =
    mobileNav.classList.contains("active");

  mobileNav.setAttribute(
    "aria-hidden",
    isOpen ? "false" : "true"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation"
      : "Open navigation"
  );

}


function openMenu() {

  if (!mobileNav || !menuToggle) {
    return;
  }

  mobileNav.classList.add("active");
  menuToggle.classList.add("active");
  body.classList.add("menu-open");

  syncMenuAccessibility();

}


function closeMenu() {

  if (!mobileNav || !menuToggle) {
    return;
  }

  mobileNav.classList.remove("active");
  menuToggle.classList.remove("active");
  body.classList.remove("menu-open");

  syncMenuAccessibility();

}


if (menuToggle && mobileNav) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        mobileNav.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    }
  );

}


/* =========================================================
   MOBILE NAV LINKS
========================================================= */

const mobileLinks = document.querySelectorAll(
  ".mobile-nav a"
);

mobileLinks.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      closeMenu();

    }
  );

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      mobileNav &&
      mobileNav.classList.contains("active")
    ) {

      closeMenu();

      if (menuToggle) {
        menuToggle.focus();
      }

    }

  }
);


/* =========================================================
   MOBILE BACKDROP
========================================================= */

if (mobileNav) {

  mobileNav.addEventListener(
    "click",
    event => {

      if (event.target === mobileNav) {
        closeMenu();
      }

    }
  );

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

const anchorLinks = document.querySelectorAll(
  'a[href^="#"]'
);

anchorLinks.forEach(link => {

  link.addEventListener(
    "click",
    event => {

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
      ) {
        return;
      }

      let target = null;

      try {

        target =
          document.querySelector(targetID);

      } catch (error) {

        return;

      }

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset =
        window.innerWidth <= 700
          ? 65
          : 75;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({

        top: targetPosition,

        behavior:
          prefersReducedMotion
            ? "auto"
            : "smooth"

      });

      /*
        Update the URL without causing
        another browser jump.
      */

      if (
        history.replaceState &&
        targetID !== "#"
      ) {

        history.replaceState(
          null,
          "",
          targetID
        );

      }

    }
  );

});


/* =========================================================
   JOURNEY — INTERACTIVE ROADMAP
========================================================= */

const milestones = document.querySelectorAll(
  ".milestone[data-milestone]"
);


/*
  Close every milestone except
  the one supplied.
*/

function closeAllMilestones(
  except = null
) {

  milestones.forEach(milestone => {

    if (milestone === except) {
      return;
    }

    milestone.classList.remove("active");

    milestone.setAttribute(
      "aria-expanded",
      "false"
    );

  });

}


/*
  Open / close a milestone.
*/

function toggleMilestone(
  milestone
) {

  if (!milestone) {
    return;
  }

  const isActive =
    milestone.classList.contains("active");

  closeAllMilestones();

  if (!isActive) {

    milestone.classList.add("active");

    milestone.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


/*
  Initialize every roadmap milestone.
*/

milestones.forEach(
  (milestone, index) => {

    milestone.setAttribute(
      "tabindex",
      "0"
    );

    milestone.setAttribute(
      "role",
      "button"
    );

    milestone.setAttribute(
      "aria-expanded",
      "false"
    );


    /*
      Click interaction
    */

    milestone.addEventListener(
      "click",
      () => {

        toggleMilestone(
          milestone
        );

      }
    );


    /*
      Keyboard interaction
    */

    milestone.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          toggleMilestone(
            milestone
          );

        }

      }
    );


    /*
      Small stagger on entrance.
    */

    if (!prefersReducedMotion) {

      milestone.style.transitionDelay =
        `${Math.min(index * 45, 250)}ms`;

    }

  }
);


/* =========================================================
   JOURNEY — SKILL CHIPS
========================================================= */

/*
  Skill chips are intentionally static.

  They do not need separate interaction.
  Their purpose is to make each milestone
  immediately scannable for employers.
*/

const journeySkills =
  document.querySelectorAll(
    ".journey-skill"
  );


journeySkills.forEach(
  skill => {

    skill.setAttribute(
      "tabindex",
      "-1"
    );

  }
);


/* =========================================================
   SKILLS CONSTELLATION
========================================================= */

const skillNodes = document.querySelectorAll(
  ".skill-node[data-skill]"
);

const skillDetails = document.querySelectorAll(
  ".skill-detail[data-detail]"
);


function activateSkill(
  skillName
) {

  if (!skillName) {
    return;
  }


  skillNodes.forEach(node => {

    const isActive =
      node.dataset.skill === skillName;

    node.classList.toggle(
      "active",
      isActive
    );

    node.setAttribute(
      "aria-pressed",
      isActive
        ? "true"
        : "false"
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

  node.setAttribute(
    "role",
    "button"
  );

  node.setAttribute(
    "tabindex",
    "0"
  );

  node.setAttribute(
    "aria-pressed",
    "false"
  );


  /*
    Mouse
  */

  node.addEventListener(
    "click",
    () => {

      activateSkill(
        node.dataset.skill
      );

    }
  );


  /*
    Keyboard
  */

  node.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        activateSkill(
          node.dataset.skill
        );

      }

    }
  );

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealSelector = [

  ".section-heading",

  ".about-grid",

  ".proof-strip",

  ".journey-intro",

  ".roadmap",

  ".milestone",

  ".experience-row",

  ".projects-intro",

  ".project",

  ".skills-intro",

  ".skills-map",

  ".skill-details",

  ".tools-row",

  ".education-block",

  ".creative-intro",

  ".creative-piece",

  ".contact-content"

].join(", ");


const revealTargets =
  document.querySelectorAll(
    revealSelector
  );


revealTargets.forEach(
  element => {

    element.classList.add(
      "reveal"
    );

  }
);


if (
  !prefersReducedMotion &&
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.08,

        rootMargin:
          "0px 0px -45px 0px"
      }
    );


  revealTargets.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  /*
    Reduced motion / unsupported browsers:
    reveal everything immediately.
  */

  revealTargets.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   STAGGER EXPERIENCE
========================================================= */

const experienceRows =
  document.querySelectorAll(
    ".experience-row"
  );


experienceRows.forEach(
  (row, index) => {

    if (prefersReducedMotion) {
      return;
    }

    row.style.transitionDelay =
      `${Math.min(index * 45, 250)}ms`;

  }
);


/* =========================================================
   PROJECT MICRO-MOTION
========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project"
  );


if (
  supportsHover &&
  !prefersReducedMotion
) {

  projectCards.forEach(
    project => {

      const visual =
        project.querySelector(
          ".project-visual"
        );


      if (!visual) {
        return;
      }


      project.addEventListener(
        "mousemove",
        event => {

          const rect =
            project.getBoundingClientRect();


          if (
            !rect.width ||
            !rect.height
          ) {
            return;
          }


          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width;


          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;


          const moveX =
            (x - 0.5) * 5;


          const moveY =
            (y - 0.5) * 5;


          visual.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

        }
      );


      project.addEventListener(
        "mouseleave",
        () => {

          visual.style.transform =
            "translate(0, 0)";

        }
      );

    }
  );

}


/* =========================================================
   CREATIVE — PHOTOSHOP PARALLAX
========================================================= */

const photoshopImage =
  document.querySelector(
    ".photoshop-image"
  );


let parallaxTicking = false;


function resetPhotoshopParallax() {

  if (!photoshopImage) {
    return;
  }

  photoshopImage.style.setProperty(
    "--image-shift",
    "0px"
  );

}


function updatePhotoshopParallax() {

  if (
    !photoshopImage ||
    prefersReducedMotion ||
    window.innerWidth <= 700
  ) {

    resetPhotoshopParallax();

    return;

  }


  const rect =
    photoshopImage.getBoundingClientRect();


  const viewportHeight =
    window.innerHeight;


  /*
    Stop calculations when the image
    is completely outside the viewport.
  */

  if (
    rect.bottom < 0 ||
    rect.top > viewportHeight
  ) {

    return;

  }


  const progress =
    (
      viewportHeight -
      rect.top
    ) /
    (
      viewportHeight +
      rect.height
    );


  const offset =
    (progress - 0.5) * 10;


  photoshopImage.style.setProperty(
    "--image-shift",
    `${offset}px`
  );

}


function requestPhotoshopParallax() {

  if (parallaxTicking) {
    return;
  }

  parallaxTicking = true;

  window.requestAnimationFrame(
    () => {

      updatePhotoshopParallax();

      parallaxTicking = false;

    }
  );

}


if (photoshopImage) {

  window.addEventListener(
    "scroll",
    requestPhotoshopParallax,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestPhotoshopParallax
  );

  updatePhotoshopParallax();

}


/* =========================================================
   CREATIVE — TACTILE HOVER
========================================================= */

const creativePieces =
  document.querySelectorAll(
    ".creative-piece"
  );


if (
  supportsHover &&
  !prefersReducedMotion
) {

  creativePieces.forEach(
    piece => {

      piece.addEventListener(
        "mouseenter",
        () => {

          piece.classList.add(
            "is-hovered"
          );

        }
      );


      piece.addEventListener(
        "mouseleave",
        () => {

          piece.classList.remove(
            "is-hovered"
          );

        }
      );

    }
  );

}


/* =========================================================
   ACTIVE SECTION NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const desktopNavLinks =
  document.querySelectorAll(
    ".desktop-nav a"
  );


function setActiveNavigation(
  sectionID
) {

  if (!sectionID) {
    return;
  }

  desktopNavLinks.forEach(
    link => {

      const href =
        link.getAttribute("href");


      const isActive =
        href === `#${sectionID}`;


      link.classList.toggle(
        "active",
        isActive
      );

    }
  );

}


if (
  sections.length &&
  desktopNavLinks.length &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        const visibleSections =
          entries
            .filter(
              entry =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );


        if (
          visibleSections.length
        ) {

          setActiveNavigation(
            visibleSections[0]
              .target
              .id
          );

        }

      },
      {

        threshold: [
          0.15,
          0.3,
          0.5,
          0.7
        ],

        rootMargin:
          "-15% 0px -45% 0px"

      }
    );


  sections.forEach(
    section => {

      sectionObserver.observe(
        section
      );

    }
  );

}


/* =========================================================
   RESIZE SAFETY
========================================================= */

let resizeTimer = null;


window.addEventListener(
  "resize",
  () => {

    clearTimeout(
      resizeTimer
    );


    resizeTimer =
      setTimeout(
        () => {

          /*
            Close mobile navigation
            when returning to desktop.
          */

          if (
            window.innerWidth > 700
          ) {

            closeMenu();

          }


          /*
            Reset project visual transforms.
          */

          projectCards.forEach(
            project => {

              const visual =
                project.querySelector(
                  ".project-visual"
                );


              if (visual) {

                visual.style.transform =
                  "translate(0, 0)";

              }

            }
          );


          /*
            Recalculate Photoshop
            parallax after resizing.
          */

          updatePhotoshopParallax();

        },
        150
      );

  }
);


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const images =
  document.querySelectorAll(
    "img"
  );


images.forEach(
  image => {

    image.addEventListener(
      "error",
      () => {

        /*
          Keep the surrounding layout intact
          if an image fails to load.
        */

        image.style.opacity =
          "0";

        image.setAttribute(
          "aria-hidden",
          "true"
        );

      },
      {
        once: true
      }
    );

  }
);


/* =========================================================
   INITIAL ACCESSIBILITY STATE
========================================================= */

if (menuToggle) {

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation"
  );

}


if (mobileNav) {

  mobileNav.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateHeader();

    syncMenuAccessibility();

    updatePhotoshopParallax();

  }
);
