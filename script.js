const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 8;
let ballSpeedX = 4;
let ballSpeedY = -4;

// Paleta
const paddleHeight = 12;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleSpeed = 6;
let moveLeft = false;
let moveRight = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#00ffff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
  ctx.fillStyle = "#00ff00";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  // Movimiento de la pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote horizontal
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX *= -1;
  }

  // Rebote arriba
  if (ballY - ballRadius < 0) {
    ballSpeedY *= -1;
  }

  // Rebote con la paleta
  if (
    ballY + ballRadius >= canvas.height - paddleHeight - 10 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballSpeedY *= -1;
  }

  // Movimiento de la paleta
  if (moveLeft && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  if (moveRight && paddleX + paddleWidth < canvas.width) {
    paddleX += paddleSpeed;
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft = true;
  if (e.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") moveLeft = false;
  if (e.key === "ArrowRight") moveRight = false;
});

draw();
