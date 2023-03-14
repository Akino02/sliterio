//vytvoření kostky
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const coor = document.getElementById("coor");
const coorsnake = document.getElementById("coorsnake");

let x = 500;
let y = 500;
let xx = 0;
//snaha udělat úhel pod kterým se kruh bude otáčet
let xa = 0;
//
let yy = 0;
let mx = 0;
let my = 0;

//zkusi udělat pole které bude dávat prvnímu kruhu pozici a druhému to zpozdí o jednu
//musí to být přes class

canvas.width = 1600;
canvas.height = 850;

let fx = Math.random() * canvas.width;
let fy = Math.random() * canvas.height;

class Snake {
  constructor(rk) {
    this.position = {
      coorx: 100,
      coory: 0
    }
    this.rk = rk;
    
  }
  Head() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    //ctx.translate(canvas.width/2,canvas.height/2)
    //this.rotate(0.45);
    ctx.arc(this.coorx, this.coory, this.rk, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
  UpdateH() {
    this.coorx = x;
    this.coory = y;
  }
  Body() {}
}
//spawn jídla
class Food {
  constructor(coorx, coory) {
    this.coorx = coorx;
    this.coory = coory;
  }
  Foods() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.coorx, this.coory, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
  UpdateF() {
    this.coorx = fx;
    this.coory = fy
  }
}
const mySnake = new Snake(20);
//tady ještě bude body snejka
const myFood = new Food(fx, fy, 5);
const myFood1 = new Food(fx, fy, 5);
const myFood2 = new Food(fx, fy, 5);
const myFood3 = new Food(fx, fy, 5);
const myFood4 = new Food(fx, fy, 5);
const myFood5 = new Food(fx, fy, 5);
const myFood6 = new Food(fx, fy, 5);
const myFood7 = new Food(fx, fy, 5);
const myFood8 = new Food(fx, fy, 5);
const myFood9 = new Food(fx, fy, 5);
//
//vytvoření a posouvání/reagování objektu //funguje
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x += xx;
  y += yy;
  mySnake.Head();
  mySnake.UpdateH();
  setInterval(() => {
    fx = Math.random() * canvas.width;
    fy = Math.random() * canvas.height;
  }, 1);
  myFood.Foods();
  /*myFood1.Foods(); test jídla
  myFood2.Foods();
  myFood3.Foods();
  myFood4.Foods();
  myFood5.Foods();
  myFood6.Foods();
  myFood7.Foods();
  myFood8.Foods();
  myFood9.Foods();*/
  requestAnimationFrame(update);
  coorsnake.innerHTML = `${x} , ${y}`;
  //snaha udělat podmínku na to když se dotkne jídla tak se změní pozice a připíše score
  /*if(myFood.UpdateF() == x){
    score++;
    myFood.UpdateF();
  }*/
}
//vycentrování kruhu
x = canvas.width / 2;
y = canvas.height / 2;
update();
//
//uživatel ovládání kostky
addEventListener("keydown", function (move) {
  if (move.code == "KeyD") {
    xx = 5;
    xa--;
  } else if (move.code == "KeyA") {
    xx = -5;
    xa++;
  } else if (move.code == "KeyW") {
    yy = -5;
  } else if (move.code == "KeyS") {
    yy = 5;
  }
});
addEventListener("keyup", function (move) {
  if (move.code == "KeyD") {
    xx = 0;
  } else if (move.code == "KeyA") {
    xx = 0;
  } else if (move.code == "KeyW") {
    yy = 0;
  } else if (move.code == "KeyS") {
    yy = 0;
  }
});
let cx = 0;
let cy = 0;
//nový movement
/*addEventListener("mousedown", function (move2){
  cx = mx;
  cy = my;
  if (cx > x){
    xx += 1;
    if (cy > y) {
      yy += 1;
      if(cy == y){
        yy += 0;
      }
    }
    if(cx == x){
      xx += 0;
    }
  }
  else if (cx < x){
    xx -= 1;
    if(cx == x){
      xx -= 0;
    }
  }
  if (cy > y) {
    yy += 1;
    if(cy == y){
      yy += 0;
    }
  }
  else if (cy < y) {
    yy -= 1;
    if(cy == y){
      yy -= 0
    }
  }
});*/
//
//tracking mouse
canvas.addEventListener(
  "mousemove",
  function (evt) {
    let mousePos = getMousePos(canvas, evt);
    coor.innerHTML = `${Math.floor(mousePos.x)} , ${Math.floor(mousePos.y)}`;
    mx = Math.floor(mousePos.x);
    my = Math.floor(mousePos.y);
  },
  false
);

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
