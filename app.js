var x = 0;
var y = 0;
var arrowRightPressed = false;
var arrowLeftPressed = false;
var arrowUpPressed = false;
var arrowDownPressed = false;
var speedIncrement = 5;

setViewport();
updatePosition();
drawBarGap(50, 300, 150);
drawBarGap(50, 300, 100);
drawBarGap(50, 300, 50);
drawBarGap(50, 300, 25);
drawBarGap(50, 300, 0);
drawBarGap(50, 300, -50);

setInterval (function(){
  if (arrowRightPressed)
    x = x + speedIncrement;
  if (arrowLeftPressed)
    x = x - speedIncrement;
  if (arrowUpPressed)
    y = y - speedIncrement;
  if (arrowDownPressed)
    y = y + speedIncrement;
  updatePosition();
}, 10);

function drawBarGap(width, aperture, offsetY) {

  var fullBar = document.createElement("div");
  var upperBar = document.createElement("div");
  var lowerBar = document.createElement("div");

  upperBar.className = "upperBar";
  upperBar.style.width = width + "px";
  upperBar.style.height = ((viewportHeight - aperture + offsetY) / 2) + "px";

  lowerBar.className = "lowerBar";
  lowerBar.style.width = width + "px";
  lowerBar.style.height = ((viewportHeight - aperture - offsetY) / 2) + "px";
  lowerBar.style.top = aperture + "px";

  fullBar.className = "fullBar";
  fullBar.style.width = width + "px";
  fullBar.appendChild(upperBar);
  fullBar.appendChild(lowerBar);

  document.getElementById("roadContainer").appendChild(fullBar);
}

function setViewport() {
  viewportWidth = document.documentElement.clientWidth;
  viewportHeight = document.documentElement.clientHeight;
  var style = {
    width: viewportWidth + "px",
    height: viewportHeight + "px"
  };
  $("#page").css(style);
}

function updatePosition() {
    if (x > viewportWidth)
        x = -150;
    if (x < -150)
        x = viewportWidth;
    if (y > viewportHeight)
        y = -110;
    if (y < -110)
        y = viewportHeight;

    var style = {left: x, top: y};
    $("#car").css(style);
}

window.addEventListener("keydown", function(event){
    switch(event.key) {
        case "ArrowRight":
            arrowRightPressed = true;
            break;
        case "ArrowLeft":
            arrowLeftPressed = true;
            break;
        case "ArrowUp":
            arrowUpPressed = true;
            break;
        case "ArrowDown":
            arrowDownPressed = true;
            break;
        default:
            return;
    };
    event.preventDefault();
}, true);

window.addEventListener("keyup", function(event){
    switch(event.key) {
        case "ArrowRight":
            arrowRightPressed = false;
            break;
        case "ArrowLeft":
            arrowLeftPressed = false;
            break;
        case "ArrowUp":
            arrowUpPressed = false;
            break;
        case "ArrowDown":
            arrowDownPressed = false;
            break;
        default:
            return;
    };
    event.preventDefault();
}, true);

window.addEventListener("resize", function(event){
  setViewport();
}, true);