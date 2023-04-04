const canvas = document.querySelector("canvas");
const mouseposs = document.getElementById("mouseposs");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");
const ctx = canvas.getContext("2d");

// úvodní stránka
const ff = document.getElementById("ff");
const start = document.getElementById("start");
const menu2 = document.getElementById("menu2");
const end = document.getElementById("end");
const playername = document.getElementById("playername");
const privacy = document.getElementById("privacy");
const contact = document.getElementById("contact");
const authors = document.getElementById("authors");
const back = document.getElementById("back");

playername.innerHTML = localStorage.getItem("value");
if (localStorage.getItem("score") > 0){
  highscore.innerHTML = `HighScore: ${localStorage.getItem("score")}`;
}

let nospam = 0;

start.onclick = () => {
  if (ff.value != "") {
    localStorage.setItem("value", ff.value);
    playername.innerHTML = localStorage.getItem("value");
    canvas.style.display = "block";
    score.style.display = "block";
    menu2.style.display = "none";
    end.style.display = "none";
    highscore.style.display = "none";
    snakeSize = 20;
    snakeSizeAI = 20;
    snakeTail = 10;
    snakeTailAI = 10;
    scores = 0;
    score.innerHTML = `Score: ${scores}`;
    ff.value = "";
    if (nospam == 0) {
      init();
      nospam++;
    }
  } else if (ff.value == "") {
    alert("Musíš napsat své jméno !!!");
  }
};

contact.onclick = () => {
  authors.style.display = "flex";
  menu2.style.display = "none";
  end.style.display = "none";
  playername.style.display = "none";
};
back.onclick = () => {
  authors.style.display = "none";
  menu2.style.display = "block";
  end.style.display = "flex";
  playername.style.display = "block";
}

//

canvas.width = 1800;
canvas.height = 900;

let snakeSpeed = 6;
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakeSize = 15;
let snakeTrail = [];
let snakeTail = 10;
let foodposs = [];
let foodmax = 100;
let foodX = Math.random(Math.floor) * canvas.width - 500;
let foodY = Math.random(Math.floor) * canvas.height - 500;
let mouseX = 0;
let mouseY = 0;
let scores = 0;
let r = Math.random(Math.floor) * 255;
let g = Math.random(Math.floor) * 255;
let b = Math.random(Math.floor) * 255;

// AI
let mouseAIX = Math.random(Math.floor) * canvas.width;
let mouseAIY = Math.random(Math.floor) * canvas.height;
let snakeAIX = canvas.width / 3;
let snakeAIY = canvas.height / 3;
let snakeTrailAI = [];
let snakeSizeAI = 20;
let snakeTailAI = 10;

// nastavení pozadí na bílé a čištění následně to vytvoří hada kruhového
function drawCanvas() {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // player snake
  for (let i = 0; i < snakeTrail.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(snakeTrail[i].x, snakeTrail[i].y, snakeSize, 0, Math.PI * 2);
    ctx.fill();

    // kolize
    //celé tělo hada hráče reaguje s hlavou hadaAI
    let distToHeadP = Math.sqrt(
      (snakeAIX - snakeTrail[i].x) ** 2 + (snakeAIY - snakeTrail[i].y) ** 2
    );
    if (distToHeadP < snakeSize) {
      snakeSizeAI = 0;
      setTimeout(() => {
        snakeSizeAI = 20;
        snakeTailAI = 10;
      }, 5000);
    }
  }
  //AI snake
  for (let i = 0; i < snakeTrailAI.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "orange";

    ctx.arc(snakeTrailAI[i].x, snakeTrailAI[i].y, snakeSizeAI, 0, Math.PI * 2);
    ctx.fill();

    //kolize
    //celé tělo hadaAI reaguje s hlavou hada hráče
    let distToHeadAI = Math.sqrt(
      (snakeX - snakeTrailAI[i].x) ** 2 + (snakeY - snakeTrailAI[i].y) ** 2
    );
    //pokud se hráč dotkne druhého hada hlavou, tak prohraje. pokud vyjede z pole prohraje
    if (distToHeadAI < snakeSizeAI || (snakeX > canvas.width || snakeY > canvas.height || snakeX < 0 || snakeY < 0)) {
      snakeSize = 0;
      canvas.style.display = "none";
      score.style.display = "none";
      menu2.style.display = "block";
      end.style.display = "flex";
      if (scores >= localStorage.getItem("score")){
        localStorage.setItem("score", scores);
      }
      document.location.reload();
      snakeX = canvas.width/2;
      snakeY = canvas.height/2;
    }
  }

  //funkce pro jídlo (spawn jídla a následně podmínka stím kde se jídlo nachází a pokud bude sebráné tak se změní pozice)
  for (let i = 0; i < foodmax; i++) {
    //náhodná pozice jídla a následně je přidána do foodposs pod nějaký název
    foodX = Math.random(Math.floor) * canvas.width - 100;
    foodY = Math.random(Math.floor) * canvas.height - 100;
    foodposs.push({ x: foodX, y: foodY });
    //
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(foodposs[i].x, foodposs[i].y, 10, 10);
    let distToFood = Math.sqrt(
      (snakeX - foodposs[i].x) ** 2 + (snakeY - foodposs[i].y) ** 2
    );
    let distToFoodAI = Math.sqrt(
      (snakeAIX - foodposs[i].x) ** 2 + (snakeAIY - foodposs[i].y) ** 2
    );
    if (distToFood < snakeSize) {
      scores++;
      snakeTail += 1;

      foodposs[i].x = Math.random(Math.floor) * canvas.width - 100;
      foodposs[i].y = Math.random(Math.floor) * canvas.height - 100;
      score.innerHTML = `Score: ${scores}`;
    }
    if (distToFoodAI < snakeSizeAI) {
      snakeTailAI += 1;
      foodposs[i].x = Math.random(Math.floor) * canvas.width - 100;
      foodposs[i].y = Math.random(Math.floor) * canvas.height - 100;
    }
  }
}
let lastMouseX, lastMouseY;
let lastMoveTimestamp;
let lastDirection;

document.addEventListener("mousemove", function (event) {
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  lastMoveTimestamp = Date.now();
});

function moveSnake() {
  //přidává to pozici prvního kruhu a z toho si to berou ostatní
  snakeTrail.push({ x: snakeX, y: snakeY });
  snakeTrailAI.push({ x: snakeAIX, y: snakeAIY });

  // stará se o to aby v poli nebylo více kruhů než má být
  if (snakeTrail.length > snakeTail) {
    snakeTrail.shift();
  }
  if (snakeTrailAI.length > snakeTailAI) {
    snakeTrailAI.shift();
  }

  let now = Date.now();
  let timeSinceLastMove = now - lastMoveTimestamp;

  // pohyb hada k myši a následně si i vypočítá rychlost
  let dx = lastMouseX - snakeX;
  let dy = lastMouseY - snakeY;
  let dxAI = mouseAIX - snakeAIX;
  let dyAI = mouseAIY - snakeAIY;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let distAI = Math.sqrt(dxAI * dxAI + dyAI * dyAI);
  let velX = (dx / dist) * snakeSpeed;
  let velY = (dy / dist) * snakeSpeed;
  let velXAI = (dxAI / distAI) * snakeSpeed;
  let velYAI = (dyAI / distAI) * snakeSpeed;

  // uloží poslední směr myši, pokud se myš hybala v posledních 300ms
  if (timeSinceLastMove < 10) {
    lastDirection = { x: velX, y: velY };
  }

  // pokud je uložen poslední směr a myš se nehýbe, tak se had pohybuje v tomto směru
  if (lastDirection && timeSinceLastMove >= 10) {
    velX = lastDirection.x;
    velY = lastDirection.y;
  }

  snakeX += velX;
  snakeY += velY;
  snakeAIX += velXAI;
  snakeAIY += velYAI;
}

// zjišťuje pozici uživatele
function init() {
  canvas.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
  // start game loop
  gameLoop();
}

//hlavní funkce ve které jsou zbylé a opakuje se vše
function gameLoop() {
  setInterval(() => {
    moveSnake();
    drawCanvas();
  }, 1000 / 60);

  setInterval(() => {
    mouseAIX = Math.floor(Math.random() * canvas.width);
    mouseAIY = Math.floor(Math.random() * canvas.height);
  }, 1000);
}