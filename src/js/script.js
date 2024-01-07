document.addEventListener('DOMContentLoaded', function () {
  const svgContainer = document.getElementById('svgContainer');
  const svgLine = document.getElementById('scrollLine');
  const containerHeight = svgContainer.clientHeight;
  const aboutMeSect = document.getElementById("about-me-sect");

  window.addEventListener('scroll', function () {
    const scrollPerc = window.scrollY / (document.documentElement.scrollHeight - containerHeight);
    const draw = 700 * scrollPerc;

    svgLine.setAttribute("y2", draw + "%");

    if (draw >= 90) {

        aboutMeSect.style.display = "block"

      if (aboutMeSect.classList.contains("fadeOut")) {
        aboutMeSect.classList.remove("fadeOut");
      }
      aboutMeSect.classList.add("fadeIn");
    } else if (draw < 90) {
     
      aboutMeSect.classList.remove("fadeIn");
      aboutMeSect.classList.add("fadeOut");
     
        aboutMeSect.style.display = "none"
     
    }
  });
});


// document.addEventListener('DOMContentLoaded', function () {
//   const svgContainer = document.getElementById('svgContainer2');
//   const svgLine = document.getElementById('scrollLine2');
//   const containerHeight = svgContainer.clientHeight;

//   window.addEventListener('scroll', function () {
//     const scrollPerc = window.scrollY / (document.documentElement.scrollHeight - containerHeight);
//     const draw = 700 * scrollPerc; // 100% for the full height of the container

//     svgLine.setAttribute("y2", draw + "%");
//   });
// });