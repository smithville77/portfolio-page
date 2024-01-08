document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.getElementById("svgContainer");
  const svgLine = document.getElementById("scrollLine");
  const containerHeight = svgContainer.clientHeight;
  const aboutMeSect = document.getElementById("about-me-sect");

  const svgContainer2 = document.getElementById("svgContainer2");
  const svgLine2 = document.getElementById("scrollLine2");
  const aboutMeSectTop = aboutMeSect.offsetTop + 0.3 * window.innerHeight; // Start when aboutMeSect is 30vh from the top
  const projectSect = document.getElementById("projects");

  let aboutMeSectionVisible = false;
  let projectSectionVisible = false;

  window.addEventListener("scroll", function () {
    const scrollPerc =
      window.scrollY /
      (document.documentElement.scrollHeight - containerHeight);
    const draw = 700 * scrollPerc;

    svgLine.setAttribute("y2", draw + "%");

    if (draw >= 90 && !aboutMeSectionVisible) {
      aboutMeSectionVisible = true;
      aboutMeSect.style.display = "block";
      if (aboutMeSect.classList.contains("fadeOut")) {
        aboutMeSect.classList.remove("fadeOut");
      }
      aboutMeSect.classList.add("fadeIn");
    } else if (draw < 90 && aboutMeSectionVisible) {
      aboutMeSectionVisible = false;
      aboutMeSect.style.display = "hidden";
      aboutMeSect.classList.remove("fadeIn");
      aboutMeSect.classList.add("fadeOut");
      aboutMeSect.style.display = "hidden";
    }

    // Check if the user has scrolled past the "About Me" section
    if (aboutMeSectionVisible && window.scrollY >= aboutMeSectTop) {
      const scrollPerc2 =
        (window.scrollY - aboutMeSectTop) /
        (document.documentElement.scrollHeight - aboutMeSectTop);
      const draw2 = 700 * scrollPerc2;

      svgLine2.setAttribute("y2", draw2 + "%");

      if (draw2 >= 90 && !projectSectionVisible) {
        projectSectionVisible = true;
        projectSect.style.display = "block";
        if (projectSect.classList.contains("fadeOut")) {
          projectSect.classList.remove("fadeOut");
        }
        projectSect.classList.add("fadeIn");
      } else if (draw2 < 90 && projectSectionVisible) {
        projectSectionVisible = false;
        projectSect.style.display = "hidden";
        projectSect.classList.remove("fadeIn");
        projectSect.classList.add("fadeOut");
        projectSect.style.display = "hidden";
      }
    } else {
      // If the user hasn't scrolled past the "About Me" section, reset the second line
      svgLine2.setAttribute("y2", "0%");
    }
  });
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

let sectionEls = document.getElementsByTagName("section"),
  navBtns = document.getElementsByClassName("navBtn"),
  i;

  window.onscroll = function () {
    for (let i = 0; i < sectionEls.length; i++) {
      if (
        sectionEls[i] &&
        navBtns[i] &&
        window.scrollY > sectionEls[i].offsetTop &&
        window.scrollY < sectionEls[i].offsetTop + sectionEls[i].offsetHeight
      ) {
        navBtns[i].classList.add("active");
      } else {
        if (navBtns[i] && navBtns[i].classList.contains("active")) {
          setTimeout(() => {
            navBtns[i].classList.remove("active");
          }, 700);
        }
      }
    }
  };
  
