// document variables
var caption = document.getElementById("caption");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = math.round(window.innerWidth * .99);
canvas.height = math.round(window.innerHeight * .87);

caption.width = math.round(window.innerWidth * .99);
caption.height = math.round(window.innerHeight * .5);

// globals
var boxDrag = false;
var mouseX;
var mouseY;
var preMouseX; // previous mouseX
var preMouseY; // previous mouseY
var drawTime = 1;
var drawProportion = (0.6 + drawTime / 24) * .5;//drawTime / 1.75;

// objects
var box = {
  x    : 10,
  y    : 10,
  difX : 0, // difference between mouseX and box.x
  difY : 0, // difference between mouseY and box.y
  size : 75,
  grav : 1.5,
  velX : 0, // x velocity
  velY : 0, // Y velocity
  color: "#ffffff", // color 
};

// event listeners
addEventListener("mousemove", mouseMoveHandler);
addEventListener("mousedown", mouseDownHandler);
addEventListener("mouseup", mouseUpHandler);

// event handlers
function mouseMoveHandler() {
  preMouseX = mouseX;
  preMouseY = mouseY;
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function mouseDownHandler() {
  if ((box.x < mouseX && mouseX < box.x + box.size) && (box.y < mouseY && mouseY < box.y + box.size)) {
    box.difX = mouseX - box.x;
    box.difY = mouseY - box.y;
    boxDrag = true;
  }
}

function mouseUpHandler() {
  if (boxDrag) {
    box.velX = mouseX - preMouseX;
    box.velY = mouseY - preMouseY;
  }
  boxDrag = false;

  if (box.y + box.size >= canvas.height) {
    box.y = 0 - box.size;//canvas.height - box.size;
  }
}

// draw functions
function drawRect() {
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.size, box.size);
  ctx.fillStyle = box.color;
  ctx.fill();
}

function draw() {
  // clear and redraw objects onto canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect();
  caption.innerHTML = math.round(box.x) + ", " + math.round(box.y);

  // if the box is not being dragged
  if (!boxDrag) {

    // gravity
    box.velY += box.grav * drawProportion;
    box.x += box.velX * drawProportion;
    box.y += box.velY * drawProportion;

    if (box.y + box.size >= canvas.height) {
      box.y = canvas.height - box.size;
      box.velY = box.velY * -1 * 0.75;
      box.velX *= .9;
    }


    // wraparound
    if (box.x >= canvas.width) {
      box.x = 0 - box.size;
    }
    else if (box.x <= 0 - box.size) {
      box.x = canvas.width;
    }
    
  }

  // if the box is being dragged
  if (boxDrag) {
    box.x = mouseX - box.difX;
    box.y = mouseY - box.difY;
  }
}

var drawInterval = setInterval(draw, drawTime);
