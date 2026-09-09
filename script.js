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
    ".takeaway-skill, .today-skill"
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


  if (prefersReducedMotion.addEventListener) {

    prefersReducedMotion.addEventListener(
      "change",
      () => {

        if (reducedMotion()) {

          document
            .querySelectorAll(".reveal")
            .forEach(element => {

              element.classList.add(
                "visible"
              );

            });

        }

      }
    );

  }


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
    {
      passive: true
    }
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

    const open =
      isMenuOpen();


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


    mobileNav.classList.add(
      "active"
    );

    menuToggle.classList.add(
      "active"
    );

    body.classList.add(
      "menu-open"
    );


    syncMenuAccessibility();

  }


  function closeMenu(
    returnFocus = false
  ) {

    if (!mobileNav || !menuToggle) {
      return;
    }


    mobileNav.classList.remove(
      "active"
    );

    menuToggle.classList.remove(
      "active"
    );

    body.classList.remove(
      "menu-open"
    );


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

  const mobileLinks =
    document.querySelectorAll(
      ".mobile-nav a"
    );


  mobileLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          closeMenu();

        }
      );

    }
  );


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

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  function getHeaderOffset() {

    return window.innerWidth <= 700
      ? 70
      : 82;

  }


  anchorLinks.forEach(
    link => {

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
              document.querySelector(
                targetID
              );

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

            top:
              Math.max(
                0,
                targetPosition
              ),

            behavior:
              reducedMotion()
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

    }
  );


  /* =========================================================
     JOURNEY — INTERACTIVE ROADMAP
  ========================================================= */

  function closeAllMilestones(
    except = null
  ) {

    milestones.forEach(
      milestone => {

        if (
          milestone === except
        ) {

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
    );

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
        milestone.classList.contains(
          "active"
        )
          ? "true"
          : "false"
      );


      /* -----------------------------------------
         CLICK
      ----------------------------------------- */

      milestone.addEventListener(
        "click",
        event => {

          const interactive =
            event.target.closest(
              "a, button, input, textarea, select"
            );


          if (interactive) {
            return;
          }


          toggleMilestone(
            milestone
          );

        }
      );


      /* -----------------------------------------
         KEYBOARD
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
         STAGGER
      ----------------------------------------- */

      if (!reducedMotion()) {

        milestone.style.transitionDelay =
          `${Math.min(
            index * 45,
            270
          )}ms`;

      }

    }
  );


  /* =========================================================
     JOURNEY — ORGANIC SKILL SHAPES
  ========================================================= */

  journeySkills.forEach(
    skill => {

      skill.removeAttribute(
        "tabindex"
      );

      skill.removeAttribute(
        "role"
      );

      skill.removeAttribute(
        "aria-pressed"
      );

    }
  );


  /* =========================================================
     SKILLS — INTERACTIVE UNIVERSE
  =========================================================

     Six interactive skill circles:

       Strategy
       Brand
       Business
       Creative
       Research
       Consumer Insights

     Each circle controls:

       → its active state
       → its matching detail panel
       → its matching SVG connection line

     Interaction works with:

       → mouse click
       → keyboard Enter
       → keyboard Space

     Only one skill is active at a time.
  ========================================================= */

  const universeSkills =
    document.querySelectorAll(
      ".universe-skill[data-skill]"
    );


  const skillInfoPanels =
    document.querySelectorAll(
      ".skill-info-panel[data-info]"
    );


  const skillConnections =
    document.querySelectorAll(
      ".connection[data-line]"
    );


  /* =========================================================
     ACTIVATE UNIVERSE SKILL
  ========================================================= */

  function activateUniverseSkill(
    skillName
  ) {

    if (!skillName) {
      return;
    }


    /* -----------------------------------------
       UPDATE SKILL CIRCLES
    ----------------------------------------- */

    universeSkills.forEach(
      skill => {

        const active =
          skill.dataset.skill === skillName;


        skill.classList.toggle(
          "active",
          active
        );


        skill.setAttribute(
          "aria-pressed",
          active
            ? "true"
            : "false"
        );

      }
    );


    /* -----------------------------------------
       UPDATE DETAIL PANELS
    ----------------------------------------- */

    skillInfoPanels.forEach(
      panel => {

        const active =
          panel.dataset.info === skillName;


        panel.classList.toggle(
          "active",
          active
        );

      }
    );


    /* -----------------------------------------
       UPDATE SVG CONNECTIONS
    ----------------------------------------- */

    skillConnections.forEach(
      line => {

        const active =
          line.dataset.line === skillName;


        line.classList.toggle(
          "active",
          active
        );

      }
    );

  }


  /* =========================================================
     INITIALIZE UNIVERSE SKILLS
  ========================================================= */

  universeSkills.forEach(
    (skill, index) => {

      /* -----------------------------------------
         ACCESSIBILITY
      ----------------------------------------- */

      skill.setAttribute(
        "role",
        "button"
      );


      skill.setAttribute(
        "tabindex",
        "0"
      );


      skill.setAttribute(
        "aria-pressed",
        "false"
      );


      /* -----------------------------------------
         CLICK
      ----------------------------------------- */

      skill.addEventListener(
        "click",
        () => {

          activateUniverseSkill(
            skill.dataset.skill
          );

        }
      );


      /* -----------------------------------------
         KEYBOARD
      ----------------------------------------- */

      skill.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();


            activateUniverseSkill(
              skill.dataset.skill
            );

          }

        }
      );


      /* -----------------------------------------
         STAGGER
      ----------------------------------------- */

      if (!reducedMotion()) {

        skill.style.transitionDelay =
          `${Math.min(
            index * 60,
            300
          )}ms`;

      }

    }
  );


  /* =========================================================
     INITIAL ACTIVE SKILL
  ========================================================= */

  if (universeSkills.length) {

    const existingActive =
      document.querySelector(
        ".universe-skill.active[data-skill]"
      );


    if (existingActive) {

      activateUniverseSkill(
        existingActive.dataset.skill
      );

    } else {

      activateUniverseSkill(
        universeSkills[0].dataset.skill
      );

    }

  }


  /* =========================================================
     SKILLS — DESKTOP HOVER
  ========================================================= */

  if (
    supportsHover.matches &&
    !reducedMotion()
  ) {

    universeSkills.forEach(
      skill => {

        skill.addEventListener(
          "mouseenter",
          () => {

            skill.classList.add(
              "is-hovered"
            );

          }
        );


        skill.addEventListener(
          "mouseleave",
          () => {

            skill.classList.remove(
              "is-hovered"
            );

          }
        );

      }
    );

  }


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

    ".skill-universe",

    ".skill-info",

    ".skills-tools",

    ".skills-education",

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

          threshold:
            0.08,

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
          `${Math.min(
            index * 45,
            250
          )}ms`;

      }
    );

  }


  /* =========================================================
     PROJECT MICRO-MOTION
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
              `translate3d(
                ${moveX}px,
                ${moveY}px,
                0
              )`;

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

  let parallaxTicking =
    false;


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


    parallaxTicking =
      true;


    window.requestAnimationFrame(
      () => {

        updatePhotoshopParallax();

        parallaxTicking =
          false;

      }
    );

  }


  if (photoshopImage) {

    window.addEventListener(
      "scroll",
      requestPhotoshopParallax,
      {
        passive: true
      }
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
          link.getAttribute(
            "href"
          );


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

  let resizeTimer =
    null;


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
    document.readyState ===
    "loading"
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
