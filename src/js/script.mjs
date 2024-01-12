
import config from './config.js';


async function getWeatherData() {
  const url = `${config.apiUrl}${config.apiKey}`;
  const weatherDescContainer = document.getElementById('weather-desc');
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error retrieving weather results');
    }

    const data = await response.json();
    console.log(data);
    const temp = (data.main.temp / 10).toFixed(0);
    const weatherDesc = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    
    const weatherIconImg = document.createElement('img');
    weatherIconImg.setAttribute("width", "15px")
    weatherIconImg.style.display = 'inline';
    weatherIconImg.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    

    const weatherSentence = `Currently based in ${weatherDesc}y Melbourne, where it's currently ${temp}°` 
    weatherDescContainer.textContent = weatherSentence;
    weatherDescContainer.appendChild(weatherIconImg)

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

getWeatherData()
document.addEventListener("DOMContentLoaded", function () {
  // const svgContainer = document.getElementById("svgContainer");
  // const svgLine = document.getElementById("scrollLine");
  const mainSect = document.getElementById("main-sect");
  const containerHeight = mainSect.clientHeight;
  const aboutMeSect = document.getElementById("about-me-sect");

  // const svgContainer2 = document.getElementById("svgContainer2");
  // const svgLine2 = document.getElementById("scrollLine2");
  const aboutMeSectTop = aboutMeSect.offsetTop + 0.1 * window.innerHeight; // Start when aboutMeSect is 30vh from the top
  const projectSect = document.getElementById("projects");

  const contactSect = document.getElementById("contact");
  const projectSectTop = projectSect.offsetTop + 0.1 * window.innerHeight;
  // const svgLine3 = document.getElementById("scrollLine3");

  let aboutMeSectionVisible = false;
  let projectSectionVisible = false;
  let contactSectionVisible = false;

  window.addEventListener("scroll", function () {
    const scrollPerc =
      window.scrollY /
      (document.documentElement.scrollHeight - containerHeight);
    const draw = 700 * scrollPerc;

    // svgLine.setAttribute("y2", draw + "%");

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

      // svgLine2.setAttribute("y2", draw2 + "%");

      if (draw2 >= 100 && !projectSectionVisible) {
        projectSectionVisible = true;
        document.getElementById("projects-section").classList.remove("hidden");
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
      // svgLine2.setAttribute("y2", "0%");
    }

    if (projectSectionVisible && window.scrollY >= projectSectTop) {
      const scrollPerc3 =
        (window.scrollY - projectSectTop) /
        (document.documentElement.scrollHeight - projectSectTop);
      const draw3 = 700 * scrollPerc3;

      // svgLine3.setAttribute("y2", draw3 + "%");

      if (draw3 >= 90 && !contactSectionVisible) {
        contactSectionVisible = true;
        contactSect.style.display = "block";
        if (contactSect.classList.contains("fadeOut")) {
          contactSect.classList.remove("fadeOut");
        }
        contactSect.classList.add("fadeIn");
      } else if (draw3 < 90 && contactSectionVisible) {
        contactSectionVisible = false;
        contactSect.style.display = "hidden";
        contactSect.classList.remove("fadeIn");
        contactSect.classList.add("fadeOut");
      }
    } else {
      // svgLine3.setAttribute("y2", "0%");
    }
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

document.getElementById("scroll-top").addEventListener("click", scrollToTop);

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset =
      section.getBoundingClientRect().top +
      window.scrollY -
      0.11 * window.innerHeight;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

let sectionEls = document.querySelectorAll("section"),
  hrLines = document.getElementsByClassName("hr-active"),
  currentlyActiveSection = 0;

window.onscroll = function () {
  let newActiveSection = null;

  for (let i = 0; i < sectionEls.length; i++) {
    const sectionTop = sectionEls[i].offsetTop;
    const sectionBottom = sectionTop + sectionEls[i].offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      newActiveSection = i;
    }
  }

  // Exclude the footer from adding/removing the "active" class
  const isFooter =
    document.body.scrollHeight - window.innerHeight === window.scrollY;
  if (
    !isFooter &&
    newActiveSection !== null &&
    newActiveSection !== currentlyActiveSection
  ) {
    if (hrLines[currentlyActiveSection]) {
      hrLines[currentlyActiveSection].classList.remove("active");
    }

    if (hrLines[newActiveSection]) {
      hrLines[newActiveSection].classList.add("active");
    }

    currentlyActiveSection = newActiveSection;
  }
};

function footerDate() {
  const footerDate = document.getElementById("footer-date");

  const date = new Date();
  const year = date.getFullYear();
  // const day = date.getDay();
  footerDate.innerText = `© Adam Smith ${year}`;
}
footerDate();

// const date = footerDate();
// console.log(date)
// const socialBtns = Array.from(document.getElementsByClassName("social-btn"));

// socialBtns.forEach(element => {
//     const svgIcon = element.querySelector("svg");

//     if (svgIcon) {
//         element.addEventListener("mouseenter", () => {
//             svgIcon.classList.add("text-teal-500");
//         });

//         element.addEventListener("mouseleave", () => {
//             svgIcon.classList.remove("text-teal-500");
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const welcomeSection = document.getElementById("welcome-sect");
//   const sidebarContainer = document.getElementById("welcome-spacer");
//   const mainSect = document.getElementById("main-sect");
//   let isSidebarVisible = false;

//   const debounce = (func, delay) => {
//     let timeout;
//     return function () {
//       const context = this;
//       const args = arguments;
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(context, args), delay);
//     };
//   };

//   const handleScroll = debounce(function () {
//     const scrollY = window.scrollY;
//     const threshold = 100;

//     if (scrollY >= threshold && !isSidebarVisible) {

//       sidebarContainer.append(welcomeSection);
//       welcomeSection.classList.add("animate-move-into-sidebar");
//       welcomeSection.querySelector("div").classList.remove("ml-20", "w-1/2");
//       isSidebarVisible = true;
//     } else if (scrollY < threshold && isSidebarVisible) {

//       mainSect.prepend(welcomeSection);
//       welcomeSection.classList.remove("animate-move-into-sidebar", "fadeIn");
//       welcomeSection.querySelector("div").classList.add("mt-20", "ml-20", "w-1/2");
//       isSidebarVisible = false;
//     }
//   }, 300);

//   window.addEventListener("scroll", handleScroll);
// });