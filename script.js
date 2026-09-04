/* =========================================================
   TAMIMMAH DISMA LESTARI
   PORTFOLIO JAVASCRIPT
   Marketing · Consumer Insights · Business Development
========================================================= */

(() => {
  "use strict";


  /* =========================================================
     DOM
  ========================================================= */

  const html = document.documentElement;
  const body = document.body;

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const currentYear = document.getElementById("currentYear");

  const milestones = document.querySelectorAll(
    ".milestone[data-milestone]"
  );

  const journeySkills = document.querySelectorAll(
    ".journey-skill"
  );

  const skillNodes = document.querySelectorAll(
    ".skill-node[data-skill]"
  );

  const skillDetails = document.querySelectorAll(
    ".skill-detail[data-detail]"
  );

  const projectCards = document.querySelectorAll(
    ".project"
  );

  const creativePieces = document.querySelectorAll(
    ".creative-piece"
  );

  const experienceRows = document.querySelectorAll(
    ".experience-row"
  );

  const sections = document.querySelectorAll(
    "section[id]"
  );

  const desktopNavLinks = document.querySelectorAll(
    ".desktop-nav a"
  );

  const photoshopImage = document.querySelector(
    ".photoshop-image"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const supportsHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );


  /* =========================================================
     PAGE READY
  ========================================================= */

  html.classList.add("js-enabled");


  /* =========================================================
     MOTION STATE
  ========================================================= */

  function reducedMotion() {
    return prefersReducedMotion.matches;
  }


  prefersReducedMotion.addEventListener?.(
    "change",
    () => {
      if (reducedMotion()) {
        document
          .querySelectorAll(".reveal")
          .forEach(element => {
            element.classList.add("visible");
          });
      }
    }
  );


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

    header.classList.toggle(
      "scrolled",
      window.scrollY > 32
    );
  }


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  function isMenuOpen() {

    return (
      mobileNav &&
      mobileNav.classList.contains("active")
    );
  }


  function syncMenuAccessibility() {

    if (!mobileNav || !menuToggle) {
      return;
    }

    const open = isMenuOpen();

    mobileNav.setAttribute(
      "aria-hidden",
      open ? "false" : "true"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      open
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


  function closeMenu(
    returnFocus = false
  ) {

    if (!mobileNav || !menuToggle) {
      return;
    }

    mobileNav.classList.remove("active");
    menuToggle.classList.remove("active");
    body.classList.remove("menu-open");

    syncMenuAccessibility();

    if (
      returnFocus &&
      window.innerWidth <= 700
    ) {
      menuToggle.focus();
    }
  }


  function toggleMenu() {

    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      toggleMenu
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
        isMenuOpen()
      ) {

        closeMenu(true);

      }

    }
  );


  /* =========================================================
     MOBILE NAV BACKDROP
  ========================================================= */

  if (mobileNav) {

    mobileNav.addEventListener(
      "click",
      event => {

        if (
          event.target === mobileNav
        ) {
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


  function getHeaderOffset() {

    return window.innerWidth <= 700
      ? 70
      : 82;

  }


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

        let target;

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

        closeMenu();

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          getHeaderOffset();


        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: reducedMotion()
            ? "auto"
            : "smooth"
        });


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
  =========================================================

     Each milestone works as a small story module.

     Closed:
       → hook / title remains visible

     Open:
       → story + skills become visible

     Only one milestone stays open at a time.
  ========================================================= */


  function closeAllMilestones(
    except = null
  ) {

    milestones.forEach(milestone => {

      if (milestone === except) {
        return;
      }

      milestone.classList.remove(
        "active"
      );

      milestone.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  }


  function openMilestone(
    milestone
  ) {

    if (!milestone) {
      return;
    }

    closeAllMilestones(
      milestone
    );

    milestone.classList.add(
      "active"
    );

    milestone.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  function closeMilestone(
    milestone
  ) {

    if (!milestone) {
      return;
    }

    milestone.classList.remove(
      "active"
    );

    milestone.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function toggleMilestone(
    milestone
  ) {

    if (!milestone) {
      return;
    }

    const active =
      milestone.classList.contains(
        "active"
      );

    if (active) {

      closeMilestone(
        milestone
      );

    } else {

      openMilestone(
        milestone
      );

    }

  }


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


      /* -----------------------------------------
         Click
      ----------------------------------------- */

      milestone.addEventListener(
        "click",
        () => {

          toggleMilestone(
            milestone
          );

        }
      );


      /* -----------------------------------------
         Keyboard
      ----------------------------------------- */

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


      /* -----------------------------------------
         Stagger
      ----------------------------------------- */

      if (!reducedMotion()) {

        milestone.style.transitionDelay =
          `${Math.min(index * 45, 270)}ms`;

      }

    }
  );


  /* =========================================================
     JOURNEY — SKILL CHIPS
  =========================================================

     These are intentionally NOT interactive.

     They function as quick employer-facing
     summaries of what was built at each stage.
  ========================================================= */

  journeySkills.forEach(
    skill => {

      skill.setAttribute(
        "tabindex",
        "-1"
      );

      skill.setAttribute(
        "role",
        "presentation"
      );

    }
  );


  /* =========================================================
     SKILLS CONSTELLATION
  ========================================================= */

  function activateSkill(
    skillName
  ) {

    if (!skillName) {
      return;
    }


    skillNodes.forEach(node => {

      const active =
        node.dataset.skill === skillName;

      node.classList.toggle(
        "active",
        active
      );

      node.setAttribute(
        "aria-pressed",
        active
          ? "true"
          : "false"
      );

    });


    skillDetails.forEach(detail => {

      const active =
        detail.dataset.detail === skillName;

      detail.classList.toggle(
        "active",
        active
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
    reducedMotion() ||
    !("IntersectionObserver" in window)
  ) {

    revealTargets.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  } else {

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
            "0px 0px -50px 0px"
        }
      );


    revealTargets.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  /* =========================================================
     EXPERIENCE STAGGER
  ========================================================= */

  if (!reducedMotion()) {

    experienceRows.forEach(
      (row, index) => {

        row.style.transitionDelay =
          `${Math.min(index * 45, 250)}ms`;

      }
    );

  }


  /* =========================================================
     PROJECT MICRO-MOTION
  =========================================================

     Very subtle movement only.
     The visual should feel tactile,
     not like a 3D card effect.
  ========================================================= */

  if (
    supportsHover.matches &&
    !reducedMotion()
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
              (x - 0.5) * 4;


            const moveY =
              (y - 0.5) * 4;


            visual.style.transform =
              `translate3d(${moveX}px, ${moveY}px, 0)`;

          }
        );


        project.addEventListener(
          "mouseleave",
          () => {

            visual.style.transform =
              "translate3d(0, 0, 0)";

          }
        );

      }
    );

  }


  /* =========================================================
     CREATIVE — PHOTOSHOP PARALLAX
  ========================================================= */

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
      reducedMotion() ||
      window.innerWidth <= 700
    ) {

      resetPhotoshopParallax();

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


  function requestPhotoshopParallax() {

    if (
      parallaxTicking ||
      reducedMotion()
    ) {
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

  if (
    supportsHover.matches &&
    !reducedMotion()
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
     ACTIVE DESKTOP NAVIGATION
  ========================================================= */

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


        const active =
          href === `#${sectionID}`;


        link.classList.toggle(
          "active",
          active
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
            "-18% 0px -48% 0px"
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

            /* -------------------------------------
               Return to desktop
            ------------------------------------- */

            if (
              window.innerWidth > 700 &&
              isMenuOpen()
            ) {

              closeMenu();

            }


            /* -------------------------------------
               Reset project movement
            ------------------------------------- */

            projectCards.forEach(
              project => {

                const visual =
                  project.querySelector(
                    ".project-visual"
                  );


                if (visual) {

                  visual.style.transform =
                    "translate3d(0, 0, 0)";

                }

              }
            );


            /* -------------------------------------
               Recalculate parallax
            ------------------------------------- */

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

          image.classList.add(
            "image-error"
          );

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

  function initialize() {

    updateHeader();

    syncMenuAccessibility();

    updatePhotoshopParallax();

  }


  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true
      }
    );

  } else {

    initialize();

  }

})();
