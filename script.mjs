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

document.addEventListener("DOMContentLoaded", () => {
  const aboutMeSect = document.getElementById("about-me-sect");
  const projectSect = document.getElementById("projects");
  const contactSect = document.getElementById("contact");

  const aboutMeSectTop = aboutMeSect.offsetTop;
  const projectSectTop = projectSect.offsetTop;
  const contactSectTop = contactSect.offsetTop;

  let aboutMeSectionVisible = false;
  let projectSectionVisible = false;
  let contactSectionVisible = false;

  function toggleSectionVisibility(section, isVisible) {
    if (isVisible) {
      section.style.visibility = "visible";
      section.classList.remove("fadeOut");
      section.classList.add("fadeIn");
    } else {
      section.classList.remove("fadeIn");
      section.classList.add("fadeOut");
      setTimeout(() => {
        section.style.visibility = "hidden";
      }, 300); // Adjust timeout to match animation duration
    }
  }

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY + window.innerHeight;
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY >= aboutMeSectTop && window.scrollY < aboutMeSectTop + aboutMeSect.clientHeight) {
      if (!aboutMeSectionVisible) {
        aboutMeSectionVisible = true;
        toggleSectionVisibility(aboutMeSect, true);
      }
    } else if (aboutMeSectionVisible) {
      aboutMeSectionVisible = false;
      toggleSectionVisibility(aboutMeSect, false);
    }

    if (scrollY >= projectSectTop && window.scrollY < projectSectTop + projectSect.clientHeight) {
      if (!projectSectionVisible) {
        projectSectionVisible = true;
        toggleSectionVisibility(projectSect, true);
      }
    } else if (projectSectionVisible) {
      projectSectionVisible = false;
      toggleSectionVisibility(projectSect, false);
    }

    if (scrollY >= contactSectTop || scrollBottom >= documentHeight) {
      if (!contactSectionVisible) {
        contactSectionVisible = true;
        toggleSectionVisibility(contactSect, true);
      }
    } else if (contactSectionVisible) {
      contactSectionVisible = false;
      toggleSectionVisibility(contactSect, false);
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
  if (themeIcon.innerText === "wb_sunny") {
    themeIcon.innerText = "dark_mode";
  } else {
    themeIcon.innerText = "wb_sunny";
  }

  document.documentElement.classList.toggle("dark");
});


const canvasCount = 35;

document.getElementById("start-btn").addEventListener("click", function() {
  const ids = ["welcome-sect", "linkedIn", "contact-btn", "about-btn", "tag-line-sidebar"];
  const elements = ids.map(id => document.getElementById(id)).filter(el => el !== null);
  elements.forEach(function(element) {
    applyThanosSnap(element);
  });
});

function applyThanosSnap(element) {
  html2canvas(element).then(function(canvas) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelArr = imageData.data;
    const imageDataArray = [];

    createBlankImageData(imageData, imageDataArray);

    for (let i = 0; i < pixelArr.length; i += 4) {
      const p = Math.floor((i / pixelArr.length) * canvasCount);
      const a = imageDataArray[weightedRandomDistrib(p)];
      a[i] = pixelArr[i];
      a[i + 1] = pixelArr[i + 1];
      a[i + 2] = pixelArr[i + 2];
      a[i + 3] = pixelArr[i + 3];
    }

    const elementRect = element.getBoundingClientRect();
    for (let i = 0; i < canvasCount; i++) {
      const c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
      c.classList.add("dust");
      c.style.position = "absolute";
      c.style.top = `${elementRect.top + window.scrollY}px`;
      c.style.left = `${elementRect.left + window.scrollX}px`;
      c.style.width = `${elementRect.width}px`;
      c.style.height = `${elementRect.height}px`;
      document.body.appendChild(c);
    }

    element.style.visibility = "hidden";

    document.querySelectorAll(".dust").forEach(function(elem, index) {
      animateBlur(elem, 0.8, 800);
      setTimeout(function() {
        animateTransform(elem, 100, -100, getRandomInt(-15, 15), 800 + (110 * index));
      }, 70 * index);

      setTimeout(function() {
        elem.style.opacity = 0;
        elem.style.transition = "opacity 3.5s ease-out";
      }, 70 * index);

      setTimeout(function() {
        elem.parentNode.removeChild(elem);
      }, (110 * index) + 800);
    });
  }).catch(function(error) {
    console.error("Error capturing section:", error);
  });
}

function createBlankImageData(imageData, imageDataArray) {
  for (let i = 0; i < canvasCount; i++) {
    const arr = new Uint8ClampedArray(imageData.data);
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    imageDataArray.push(arr);
  }
}

function newCanvasFromImageData(imageDataArray, w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const tempCtx = canvas.getContext("2d");
  tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);
  return canvas;
}

function weightedRandomDistrib(peak) {
  const prob = [], seq = [];
  for (let i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
    seq.push(i);
  }
  return weightedRandom(seq, prob);
}

function weightedRandom(seq, prob) {
  const sum = prob.reduce((a, b) => a + b, 0);
  let acc = 0;
  const rand = Math.random() * sum;
  for (let i = 0; i < seq.length; i++) {
    acc += prob[i];
    if (rand < acc) {
      return seq[i];
    }
  }
}

function animateBlur(elem, radius, duration) {
  let r = 0;
  const animInterval = setInterval(function() {
    if (r < radius) {
      r++;
      elem.style.filter = 'blur(' + r + 'px)';
    } else {
      clearInterval(animInterval);
    }
  }, duration / radius);
}

function animateTransform(elem, sx, sy, angle, duration) {
  let td = 0, tx = 0, ty = 0;
  let start = null;
  const animFunction = function(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    td = (progress / duration) * angle;
    tx = (progress / duration) * sx;
    ty = (progress / duration) * sy;
    elem.style.transform = 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,' + ty + 'px)';
    if (progress < duration) {
      window.requestAnimationFrame(animFunction);
    }
  };
  window.requestAnimationFrame(animFunction);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
