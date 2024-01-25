const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const gameFPS = 30;
let pointsPlayer = 0;
let pointsComputer = 0;
let leftArrowHit = false;
let rightArrowHit = false;
const audio1 = new Audio("audio/pong.wav");
const audio2 = new Audio("audio/ping.mp3");
const ball = {
  x: 160,
  y: 240,
  xSpeed: 1,
  ySpeed: 3,
  radius: 10,
};
const topPaddle = {
  x: canvas.width / 2 - 50,
  y: 10,
  height: 10,
  width: 100,
};
const bottomPaddle = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 20,
  height: 10,
  width: 100,
};
function drawBackground() {
  ctx.fillStyle = "#cccccc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTopPaddle() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(topPaddle.x, topPaddle.y, 100, 10); 
}

function drawBall() {
  ctx.fillStyle = "#ffff00";
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
}

function drawBottomPaddle() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(bottomPaddle.x, bottomPaddle.y, 100, 10); 
}

function hitDetection() {
  if (ball.y - ball.radius <= topPaddle.y + topPaddle.height) {
    if (topPaddle.x <= ball.x && ball.x <= topPaddle.x + topPaddle.width) {
      console.log("TopPaddle hit");
      audio1.play();
      ball.ySpeed *= -1;
      ball.y = topPaddle.y + topPaddle.height + ball.radius;
      return;
    }
  }
  if (ball.y + ball.radius >= bottomPaddle.y) {
    if (
      bottomPaddle.x <= ball.x &&
      ball.x <= bottomPaddle.x + bottomPaddle.width
    ) {
      console.log("bottomPaddle hit");
      audio1.play();
      ball.ySpeed *= -1;
      ball.y = bottomPaddle.y - ball.radius;
      return;
    }
  }
  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    audio1.play();
    ball.xSpeed *= -1;
    return;
  }

  if (ball.y < 0 - ball.radius) {
    audio2.play();
    pointsPlayer++;
    console.log("Pelaaja: " + pointsPlayer);
    initGameObjects();
  }

  if (ball.y > canvas.height + ball.radius) {
    audio2.play();
    pointsComputer++;
    console.log("Vastustaja: " + pointsComputer);
    initGameObjects();
  }
}

function initGameObjects() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  topPaddle.x = canvas.width / 2 - 50;
  bottomPaddle.x = canvas.width / 2 - 50;
  drawBall();
  drawTopPaddle();
  drawBottomPaddle();
}

addEventListener("keydown", keydownHandler, false);

function keydownHandler(evt) {
  console.log(evt.keyCode);
  if (evt.keyCode == 37) {
    leftArrowHit = true;
  }
  if (evt.keyCode == 39) {
    rightArrowHit = true;
  }
}

function keyboardEvents() {
  if (leftArrowHit) {
    bottomPaddle.x -= 3;
    leftArrowHit = false;
  }
  if (rightArrowHit) {
    bottomPaddle.x += 3;
    rightArrowHit = false;
  }
  if (bottomPaddle.x <= 0) {
    bottomPaddle.x = 0;
  }
  if (bottomPaddle.x >= canvas.width - bottomPaddle.width) {
    bottomPaddle.x = canvas.width - bottomPaddle.width;
  }
}

function computerAI() {
  if (ball.ySpeed < 0) {
    if (ball.x < topPaddle.x + topPaddle.width / 2) {
      topPaddle.x--;
    } else {
      topPaddle.x++;
    }
    if (topPaddle.x <= 0) {
      topPaddle.x = 0;
    }
    if (topPaddle.x >= canvas.width - topPaddle.width) {
      topPaddle.x = canvas.width - topPaddle.width;
    }
  }
}

function drawScore() {
  ctx.font = "bold 16px Arial";
  ctx.fillText("Computer: " + pointsComputer, 10, 220);
  ctx.fillText("Player: " + pointsPlayer, 10, 240);
  if (pointsComputer >= 10 || pointsPlayer >= 10) {
    clearInterval(gameClock);
  }
}
function pongGame() {
  drawBackground();
  drawTopPaddle();
  drawBall();
  drawBottomPaddle();
  hitDetection();
  keyboardEvents();
  computerAI();
  drawScore();
}

const gameClock = window.setInterval(pongGame, 1000 / gameFPS);
// pongGame();
