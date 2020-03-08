// document variables
var caption = document.getElementById("myCaption");
var canvas = document.getElementById("myCanvas");
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
var gravityInc = 1.05; // gravity increase
var velocityDec = .99; // velocity decay

// objects
var box = {
  x   : 10,
  y   : 10,
  difX: 0, // difference between mouseX and box.x
  difY: 0, // difference between mouseY and box.y
  size: 75,
  fall: 3,
  grav: 1,
  velX: 0, // x velocity
  velY: 0, // Y velocity
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
}

// draw functions
function drawRect() {
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.size, box.size);
  ctx.fillStyle = "#7ee8fa";
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
    box.x += box.velX;
    box.y += (box.fall * box.grav) + box.velY;
    if ((box.grav * box.fall) + box.velY > canvas.height + box.size) {
      box.grav /= gravityInc ^ 2;
    }
    else {
      box.grav *= gravityInc;
    }
    box.velX *= velocityDec;
    box.velY *= velocityDec;

    // wraparound
    if (box.y > canvas.height) {
      box.y = 0 - box.size;
    }
    else if (box.y + box.size >= canvas.height) {
      box.y = canvas.height - box.size;
      box.grav = 1;
    }

    if (box.x > canvas.width) {
      box.x = 0;
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

var drawInterval = setInterval(draw, 10);
