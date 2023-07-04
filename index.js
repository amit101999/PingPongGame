let fp = document.getElementsByClassName("firstPlayer")[0];
let sp = document.getElementsByClassName("secondPlayer")[0];
let paddel1 = document.getElementsByClassName("rods")[0];
let paddel2 = document.getElementsByClassName("rods")[1];
let ball = document.getElementsByClassName("ball")[0];
let gameArea = document.getElementsByClassName("pingpongGame")[0];
let greenScore = 0;
let redScore = 0;

let moveLeft = false;
let moveRight = false;
document.addEventListener("keydown", move);
document.addEventListener("keyup", NotMove);

function move(e) {
  if (e.key == "a") {
    moveLeft = true;
  } else if (e.key == "d") {
    moveRight = true;
  }
}
function NotMove(e) {
  if (e.key == "a") {
    moveLeft = false;
  } else if (e.key == "d") {
    moveRight = false;
  }
}

let vx = -4; // xdrirection speed
let vy = -4; // ydirection speed

function collision(paddel) {
  var leftPaddel = paddel.offsetLeft;
  var rightPaddel = paddel.offsetLeft + 150;
  var topPaddel = paddel.offsetTop;
  var bottomPaddel = paddel.offsetTop + 25;

  var leftBall = ball.offsetLeft;
  var rightBall = ball.offsetLeft + ball.offsetWidth;
  var topBall = ball.offsetTop;
  var bottomBall = ball.offsetTop + 50;

  if (
    rightBall > leftPaddel &&
    leftBall < rightPaddel &&
    topBall < bottomPaddel &&
    bottomBall > topPaddel
  ) {
    return true;
  }
}

function resetGame() {
  vx = -4;
  vy = -4;
  ball.style.top = "50%";
  ball.style.left = "50%";
  paddel1.style.left = "50%";
  paddel2.style.left = "50%";
}

function gameLoop() {
  let paddel = ball.offsetTop < gameArea.offsetHeight / 2 ? paddel1 : paddel2;

  if (collision(paddel)) {
    //if collide the chnage direction of both x and y axis of ball
    vy = -vy;
    vx = -vx;
  }

  if (ball.offsetLeft < 0) {
    vx = -vx; // if ball reaches to the left end then change direction
  }
  if (ball.offsetLeft > gameArea.offsetWidth - ball.offsetWidth - 10) {
    vx = -vx; // if ball reaches to the right end then change direction
  }
  if (ball.offsetTop < 0) {
    // if ball hits to the top end then reset
    resetGame();
    greenScore++;
    document.getElementById("gscore").innerHTML = `${greenScore}`;
    paddel1.style.left = "50%";
    paddel2.style.left = "50%";
  }
  if (ball.offsetTop > gameArea.offsetHeight - ball.offsetHeight) {
    resetGame();
    redScore++;
    document.getElementById("rscore").innerHTML = `${redScore}`;
    paddel1.style.left = "50%";
    paddel2.style.left = "50%";
  }
  ball.style.left = ball.offsetLeft + vx + "px"; // adding speed in +ve or -ve directions on x axis
  ball.style.top = ball.offsetTop + vy + "px"; // adding speed in +ve or -ve directions on y axis

  // paddel left
  if (moveLeft && paddel1.offsetLeft > 0) {
    paddel1.style.left = paddel1.offsetLeft - 5 + "px";
    paddel2.style.left = paddel1.offsetLeft - 5 + "px";
  }
  //paddel right
  if (moveRight && paddel1.offsetLeft < document.body.clientWidth - 158) {
    paddel1.style.left = paddel1.offsetLeft + 5 + "px";
    paddel2.style.left = paddel1.offsetLeft + 5 + "px";
  }

  requestAnimationFrame(gameLoop);
}
alert("game is started");
gameLoop();
