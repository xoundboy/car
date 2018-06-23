var x = 0;
var viewportWidth = 500;
setViewportWidth();

function setViewportWidth() {
  viewportWidth = document.documentElement.clientWidth;
  var style = {
    width: viewportWidth + "px"
  };
  $("#page").css(style);
}

function moveRight() {
    x = x + 5;
    updatePosition();
}

function moveLeft() {
    x = x - 5;
    updatePosition();
}

function updatePosition() {

    if (x > viewportWidth)
        x = -150;
    if (x < -150)
        x = viewportWidth;

    var style = {left:x};
    $("#car").css(style);
}

window.addEventListener("keydown", function(event){
    switch(event.key) {
        case "ArrowRight":
            moveRight();
            event.preventDefault();
            break;

        case "ArrowLeft":
            moveLeft();
            event.preventDefault();
            break;
    };
}, true);

window.addEventListener("resize", function(event){
  setViewportWidth();
}, true);