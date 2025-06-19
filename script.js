const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 8;
let ballSpeedX = 4;
let ballSpeedY = -4;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#00ffff";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  // Movimiento
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote horizontal
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX *= -1;
  }

  // Rebote vertical
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY *= -1;
  }

  requestAnimationFrame(draw);
}

draw();
