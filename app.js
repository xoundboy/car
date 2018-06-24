var x;
var y;
var viewportWidth;
var viewportHeight;
var arrowRightPressed = false;
var arrowLeftPressed = false;
var arrowUpPressed = false;
var arrowDownPressed = false;
var speedIncrement = 5;
var currentSection;
var sectionOffset = 0;
var barWidth = 10;
var barAperture = 250;
var started = false;
var carInterval;
var roadInterval;
var roadMotionTickMs = 10;
var roadCycles = 0;

setViewport();
x = 50;
y = (viewportHeight - 150) / 2;

firstBitOfRoad();
updateCarPosition();

startGame();

function startGame() {
	carInterval = setInterval(carMotion,10);
	roadInterval = setInterval(roadMotion, roadMotionTickMs);
	started = true;
}

function pauseGame() {
	clearInterval(carInterval);
	clearInterval(roadInterval);
	started = false;
}

function firstBitOfRoad() {
	var barsInViewport = Math.ceil(viewportWidth / barWidth);
	for (var i = 0; i < barsInViewport; i++)
		drawBarGaps(0);
}

function roadMotion() {
	if (!currentSection || currentSection.remaining <= 0)
		loadNextSection();
	sectionOffset = sectionOffset + (currentSection.gradient * barWidth);
	currentSection.remaining = currentSection.remaining - 1;
	drawBarGaps(sectionOffset);
	document.getElementsByClassName("fullBar")[0].remove();
	roadCycles++;
	if (roadCycles % 50 === 0)
		barAperture--;
}

function carMotion() {
	if (arrowRightPressed)
		x = x + speedIncrement;
	if (arrowLeftPressed)
		x = x - speedIncrement;
	if (arrowUpPressed)
		y = y - speedIncrement;
	if (arrowDownPressed)
		y = y + speedIncrement;
	updateCarPosition();
}

function getRandomNumberInRange(min, max) {
	return Math.floor((Math.random() * (max - min)) + min);
}

function loadNextSection(forceGradient) {
	var resolutionFactor = 20 / barWidth;
	var remaining = getRandomNumberInRange(2 * resolutionFactor ,10 * resolutionFactor);
	var gradient = forceGradient ? forceGradient : getRandomNumberInRange(-4,4) / remaining;
	currentSection = {gradient: gradient, remaining: remaining};
}

function drawBarGaps(offset) {

  var fullBar = document.createElement("div");
  var upperBar = document.createElement("div");
  var lowerBar = document.createElement("div");

  var upperBarHeight = ((viewportHeight - barAperture) / 2) - offset;
  var lowerBarHeight = ((viewportHeight - barAperture) / 2) + offset;

  if (upperBarHeight <=  0)
  	loadNextSection(-.5);

  if (lowerBarHeight <= 0)
  	loadNextSection(.5);

  upperBar.className = "upperBar";
  upperBar.style.width = barWidth + "px";
  upperBar.style.height = upperBarHeight + "px";

  lowerBar.className = "lowerBar";
  lowerBar.style.width = barWidth + "px";
  lowerBar.style.height = lowerBarHeight + "px";
  lowerBar.style.top = barAperture + "px";

  fullBar.className = "fullBar";
  fullBar.style.width = barWidth + "px";
  fullBar.appendChild(upperBar);
  fullBar.appendChild(lowerBar);

  document.getElementById("roadContainer").appendChild(fullBar);
}

function setViewport(){
	viewportWidth = document.documentElement.clientWidth;
	viewportHeight = document.documentElement.clientHeight;
	var style = {width: viewportWidth + "px", height: viewportHeight + "px"};
	$("#page").css(style);
}

function updateCarPosition() {
	if (x > viewportWidth)  x = -150;
	if (x < -150)  x = viewportWidth;
	if (y > viewportHeight)  y = -110;
	if (y < -110)  y = viewportHeight;
	var style = {left: x, top: y};
	$("#car").css(style);
}

window.addEventListener("keydown", function(event){
	switch(event.key) {
		case "ArrowRight": arrowRightPressed = true; break;
		case "ArrowLeft": arrowLeftPressed = true; break;
		case "ArrowUp": arrowUpPressed = true; break;
		case "ArrowDown": arrowDownPressed = true; break;
		case " ":
			if (started)
				pauseGame();
			else
				startGame();
	}
	event.preventDefault();
}, true);

window.addEventListener("keyup", function(event){
	switch(event.key) {
		case "ArrowRight": arrowRightPressed = false; break;
		case "ArrowLeft": arrowLeftPressed = false; break;
		case "ArrowUp": arrowUpPressed = false; break;
		case "ArrowDown": arrowDownPressed = false; break;
	}
	event.preventDefault();
}, true);

window.addEventListener("resize", function(){
  setViewport();
}, true);