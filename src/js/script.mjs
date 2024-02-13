import config from "./config.js";

async function getWeatherData() {
  const url = `${config.apiUrl}${config.apiKey}`;
  const weatherDescContainer = document.getElementById("weather-desc");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error retrieving weather results");
    }

    const data = await response.json();
    console.log(data);
    const temp = data.main.temp.toFixed(0);
    const weatherDesc = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    const weatherIconImg = document.createElement("img");
    weatherIconImg.setAttribute("width", "25px");
    weatherIconImg.style.display = "inline";
    weatherIconImg.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;

    const weatherSentence = `Based in Melbourne, where it's currently ${temp}° with ${weatherDesc}`;
    weatherDescContainer.textContent = weatherSentence;
    weatherDescContainer.appendChild(weatherIconImg);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeatherData();
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
      aboutMeSect.style.visibility = "visible";

      if (aboutMeSect.classList.contains("fadeOut")) {
        aboutMeSect.classList.remove("fadeOut");
      }
      aboutMeSect.classList.add("fadeIn");
    } else if (draw < 90 && aboutMeSectionVisible) {
      aboutMeSectionVisible = false;
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

      if (draw2 >= 100 && !projectSectionVisible) {
        projectSectionVisible = true;

        projectSect.style.display = "block";
        projectSect.style.visibility = "visible";
        if (projectSect.classList.contains("fadeOut")) {
          projectSect.classList.remove("fadeOut");
        }
        projectSect.classList.add("fadeIn");
      } else if (draw2 < 90 && projectSectionVisible) {
        projectSectionVisible = false;
        projectSect.style.display = "hidden";
        projectSect.classList.remove("fadeIn");
        projectSect.classList.add("fadeOut");
      }
    }

    if (projectSectionVisible && window.scrollY >= projectSectTop) {
      const scrollPerc3 =
        (window.scrollY - projectSectTop) /
        (document.documentElement.scrollHeight - projectSectTop);
      const draw3 = 700 * scrollPerc3;

      if (draw3 >= 90 && !contactSectionVisible) {
        contactSectionVisible = true;
        contactSect.style.display = "block";
        contactSect.style.visibility = "visible";
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
    }
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

document.getElementById("scroll-top").addEventListener("click", scrollToTop);

export function scrollToSection(sectionId) {
  console.log(sectionId);
  const section = document.getElementById(sectionId);
  console.log(section);
  if (section) {
    const offset =
      section.getBoundingClientRect().top +
      window.scrollY -
      0.11 * window.innerHeight;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

const aboutBtn = document.getElementById("about-btn");
const welcomeBtn = document.getElementById("welcome-btn");
const projectsBtn = document.getElementById("projects-btn");
const contactBtn = document.getElementById("contact-btn");

welcomeBtn.addEventListener("click", () => {
  scrollToTop();
});
aboutBtn &&
  aboutBtn.addEventListener("click", function () {
    scrollToSection("about-me-sect");
    console.log("hello");
  });

projectsBtn.addEventListener("click", () => {
  scrollToSection("projects");
});

contactBtn.addEventListener("click", () => {
  scrollToSection("contact");
});

let sectionEls = document.querySelectorAll("section"),
  hrLines = document.getElementsByClassName("hr-active"),
  currentlyActiveSection = 0;

window.onscroll = function () {
  let newActiveSection = null;
  const sectionEls = document.querySelectorAll("section");
  // the 0.25 here is so that the active class is applied to the correct section a bit earlier
  // when scrolling
  const scrollPosition = window.scrollY + 0.25 * window.innerHeight;

  for (let i = 0; i < sectionEls.length; i++) {
    const sectionTop = sectionEls[i].offsetTop;
    const sectionBottom = sectionTop + sectionEls[i].offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
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



const themeIcon = document.getElementById("switch-icon");

const themeToggle = document.getElementById("btn-toggle-container");

themeToggle.addEventListener("click", () => {
  // lightIcon.classList.toggle("hidden");
  // darkIcon.classList.toggle("hidden");
  if (themeIcon.innerText === "wb_sunny") {
    themeIcon.innerText = "dark_mode";
  } else {
    themeIcon.innerText = "wb_sunny"
  }

  document.documentElement.classList.toggle("dark");
});


// Function to capture content as an image
function captureContent() {
  // Use html2canvas library or native HTML5 Canvas API to capture content
  // Return the captured image data
}

// Function to split image data into portions
function splitImageData(imageData, numPortions) {
  // Split the imageData into numPortions portions
  // Return an array of smaller image data portions
}

// Function to create a canvas from image data
function createCanvasFromImageData(imageData) {
  // Create a new canvas
  // Set its width and height
  // Get its 2D rendering context
  // Put the image data onto the canvas
  // Return the canvas element
}

// Function to apply animation effects to a canvas
function animateCanvas(canvas) {
  // Apply animation effects to the canvas
  // You can use CSS animations, requestAnimationFrame, or any other animation technique
}

// Main function to start the effect
function startEffect() {
  // Capture content as an image
  const imageData = captureContent();
  
  // Split image data into portions
  const portions = splitImageData(imageData, 35); // Adjust the number of portions as needed
  
  // Create canvases for each portion and apply animation effects
  portions.forEach(imageDataPortion => {
      const canvas = createCanvasFromImageData(imageDataPortion);
      animateCanvas(canvas);
      // Append the canvas to the document body or a specific element
      document.body.appendChild(canvas);
  });
}

// Event listener to start the effect
// document.getElementById("start-btn").addEventListener("click", startEffect);



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
