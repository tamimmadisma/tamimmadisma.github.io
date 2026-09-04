/* =========================================================
   TAMIMMAH DISMA LESTARI
   PORTFOLIO JAVASCRIPT
   Marketing · Consumer Insights · Business Development
========================================================= */


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const header =
  document.getElementById("siteHeader");

const menuToggle =
  document.getElementById("menuToggle");

const mobileNav =
  document.getElementById("mobileNav");

const currentYear =
  document.getElementById("currentYear");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {

  if (!header) {
    return;
  }

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

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

function openMenu() {

  if (!mobileNav || !menuToggle) {
    return;
  }

  mobileNav.classList.add("active");
  menuToggle.classList.add("active");

  body.classList.add("menu-open");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Close navigation"
  );

}


function closeMenu() {

  if (!mobileNav || !menuToggle) {
    return;
  }

  mobileNav.classList.remove("active");
  menuToggle.classList.remove("active");

  body.classList.remove("menu-open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation"
  );

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

const mobileLinks =
  document.querySelectorAll(
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

const anchorLinks =
  document.querySelectorAll(
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
      } catch {
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
        behavior: "smooth"
      });

    }
  );

});


/* =========================================================
   JOURNEY — MILESTONES
========================================================= */

const milestones =
  document.querySelectorAll(
    ".milestone[data-milestone]"
  );


function closeAllMilestones() {

  milestones.forEach(item => {
    item.classList.remove("active");
    item.setAttribute(
      "aria-expanded",
      "false"
    );
  });

}


function toggleMilestone(milestone) {

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


milestones.forEach(milestone => {

  milestone.addEventListener(
    "click",
    () => {
      toggleMilestone(milestone);
    }
  );


  /* Keyboard accessibility */

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

});


/* =========================================================
   SKILLS CONSTELLATION
========================================================= */

const skillNodes =
  document.querySelectorAll(
    ".skill-node[data-skill]"
  );

const skillDetails =
  document.querySelectorAll(
    ".skill-detail[data-detail]"
  );


function activateSkill(skillName) {

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


  node.addEventListener(
    "click",
    () => {

      activateSkill(
        node.dataset.skill
      );

    }
  );


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
    element.classList.add("reveal");
  }
);


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

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

        });

      },
      {
        threshold: 0.08,
        rootMargin:
          "0px 0px -45px 0px"
      }
    );


  revealTargets.forEach(
    element => {
      revealObserver.observe(element);
    }
  );

} else {

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

    row.style.transitionDelay =
      `${Math.min(index * 45, 250)}ms`;

  }
);


/* =========================================================
   STAGGER JOURNEY
========================================================= */

milestones.forEach(
  (item, index) => {

    item.style.transitionDelay =
      `${Math.min(index * 45, 250)}ms`;

  }
);


/* =========================================================
   PROJECT MICRO-MOTION
========================================================= */

/*
   Desktop only.

   This creates a subtle movement when the
   employer moves the cursor over a project.

   It intentionally stays very small so the
   portfolio remains professional.
*/

const projectCards =
  document.querySelectorAll(
    ".project"
  );


const supportsHover =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;


if (supportsHover) {

  projectCards.forEach(project => {

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


        const x =
          (
            event.clientX -
            rect.left
          ) / rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) / rect.height;


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

  });

}


/* =========================================================
   PHOTOSHOP IMAGE PARALLAX
========================================================= */

const photoshopImage =
  document.querySelector(
    ".photoshop-image"
  );


let parallaxTicking = false;


function updatePhotoshopParallax() {

  if (
    !photoshopImage ||
    window.innerWidth <= 700
  ) {
    return;
  }


  const rect =
    photoshopImage.getBoundingClientRect();


  const viewportHeight =
    window.innerHeight;


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


if (photoshopImage) {

  window.addEventListener(
    "scroll",
    () => {

      if (!parallaxTicking) {

        window.requestAnimationFrame(
          () => {

            updatePhotoshopParallax();

            parallaxTicking = false;

          }
        );

        parallaxTicking = true;

      }

    },
    { passive: true }
  );


  updatePhotoshopParallax();

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

  desktopNavLinks.forEach(
    link => {

      const isActive =
        link.getAttribute("href") ===
        `#${sectionID}`;


      link.classList.toggle(
        "active",
        isActive
      );

    }
  );

}


if (
  sections.length &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        /*
          Sort by visibility so the most
          visible section wins.
        */

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

let resizeTimer;


window.addEventListener(
  "resize",
  () => {

    clearTimeout(resizeTimer);


    resizeTimer =
      setTimeout(() => {

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
          Reset project transforms.
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


        updatePhotoshopParallax();

      }, 150);

  }
);


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const images =
  document.querySelectorAll(
    "img"
  );


images.forEach(image => {

  image.addEventListener(
    "error",
    () => {

      /*
        Instead of collapsing the layout,
        keep a neutral placeholder area.
      */

      image.style.opacity = "0";

      image.setAttribute(
        "aria-hidden",
        "true"
      );

    },
    { once: true }
  );

});


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


/* =========================================================
   PAGE READY
========================================================= */

document.documentElement.classList.add(
  "js-enabled"
);
