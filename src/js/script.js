const svg = document.getElementById("linePath");
const lineLength = svg.getTotalLength();


svg.style.strokeDasharray = length;
svg.style.strokeDashoffset = length;
console.log(lineLength)