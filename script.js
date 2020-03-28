const canvas = document.querySelector("#canvas");
const context = document.querySelector("#canvas").getContext("2d");
var permission = document.querySelector("#permission");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var boxWidth = 75;
var boxHeight = 45;
var color;
var gravityX = 0;

window.addEventListener("load", function() {
  let beforeRendering = new Date().getMilliseconds();
  console.log("BeforeRendering time is : ", beforeRendering);
  draw();
  let afterRendering = new Date().getMilliseconds();
  console.log("AfterRendering time is : ", afterRendering);
  let renderingTime = afterRendering - beforeRendering;
  console.log("Render time is : ", renderingTime, "milliseconds");
});

function onClick() {

  console.log("button clicked")
  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', myDeviceMotion, true);
        }
      })
      .catch(console.error);
  } else {
   
    //window.addEventListener("devicemotion", myDeviceMotion, true);
  }
  alert("Device motion has been activated.")
}
permission.addEventListener("click", onClick);

window.addEventListener("devicemotion", myDeviceMotion, true);

 function myDeviceMotion(event) {
   gravityX = event.accelerationIncludingGravity.x;
   
   
   window.requestAnimationFrame(draw);
 }

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw()
});

draw();
 function draw(){
  var getColor = () =>
  "rgb(" +
  Math.floor(Math.random() * 256) +
  ", " +
  Math.floor(Math.random() * 256) +
  ", " +
  Math.floor(Math.random() * 256) +
  ", " +
  1 +
  ")";
  var drawSquare = (boxWidth, boxHeight, x, y) => {
    
    context.save();
    context.beginPath();
    context.moveTo(0 + y, boxHeight + x);
    context.lineTo(boxWidth + y, 0 + x);
    context.lineTo(boxWidth + y, boxHeight + x);
    context.lineTo(0 + y, 90 + x);
    context.closePath();
    color = getColor();
    context.fillStyle = color;
    context.fill();
    context.restore();
  
  };
  var drawTriangle = (boxWidth, boxHeight, y) => {
    context.save();
    context.beginPath();
    context.moveTo(0 + y, 0);
    context.lineTo(boxWidth + y, 0);
    context.lineTo(0 + y, boxHeight);
    context.closePath();
    color = getColor();
    context.fillStyle = color;
    context.fill();
    context.restore();
  };
  
  for (let y = 0; y <= canvas.width; y += boxWidth+gravityX) {
    drawTriangle(boxWidth, boxHeight, y);
  
    for (let x = 0; x <= canvas.height; x += boxHeight+gravityX) {
      drawSquare(boxWidth, boxHeight, x, y);
    }
  }
 }

 
