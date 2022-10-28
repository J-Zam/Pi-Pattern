import "./style.scss";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const API = "https://uploadbeta.com/api/pi/?cached&n=100000";
const btnStart = document.getElementById("btn__start") as HTMLElement;
const counter = document.getElementById("counter") as HTMLElement;
const PORCENTAJE_RADIUS = 0.6;
let maxRadius = window.innerWidth * PORCENTAJE_RADIUS * 100;
let digits: string[] = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

async function getData() {
  await fetch(API)
    .then((data) => data.json())
    .then((result) => {
      digits = result.split("");
      translateOrigin();
      begin();
    });
}

// Formating the origin of the canvas to the center.
function translateOrigin() {
  maxRadius = window.innerWidth * PORCENTAJE_RADIUS * 100;
  ctx.save;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  translateOrigin();
});

async function begin() {
  let angle = 0;
  let color = "white";
  let delay = 33;

  for (let i = 0; i <= digits.length; i++) {
    counter.textContent = `${i} out of 100000`;
    let digit = parseInt(digits[i]);
    if (delay > 0) delay -= 3;

    let radius = Math.sqrt(Math.floor(Math.random() * maxRadius));

    if (digit === 0) {
      angle = randomNumber(0, 36);
      color = `#9e0142`;
    }
    if (digit === 1) {
      angle = randomNumber(36, 72);
      color = `#d53e4f`;
    }
    if (digit === 2) {
      angle = randomNumber(72, 108);
      color = `#f46d43`;
    }
    if (digit === 3) {
      angle = randomNumber(108, 144);
      color = `#fdae61`;
    }
    if (digit === 4) {
      angle = randomNumber(114, 180);
      color = `#f46d43`;
    }
    if (digit === 5) {
      angle = randomNumber(180, 216);
      color = `#e6f598`;
    }
    if (digit === 6) {
      angle = randomNumber(216, 252);
      color = `#abdda4`;
    }
    if (digit === 7) {
      angle = randomNumber(252, 288);
      color = `#66c2a5`;
    }
    if (digit === 8) {
      angle = randomNumber(288, 324);
      color = `#3288bd`;
    }
    if (digit === 9) {
      angle = randomNumber(324, 360);
      color = `#5e4fa2`;
    }

    let xCurrent = Math.floor(radius * Math.cos(angle));
    let yCurrent = Math.floor(radius * Math.sin(angle));

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(xCurrent, yCurrent, 1.5, 0, Math.PI * 2);
    ctx.fill();
    await sleep(delay);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function randomNumber(min: number, max: number) {
  min = Math.ceil(Math.pow(min, .96));
  max = Math.floor(Math.pow(max, .96));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnStart.addEventListener("click", async () => {
  if (!btnStart.textContent!.includes("Start")) {
    window.location.reload();
    return;
  }

  btnStart.innerText = "Restart";
  getData();
});
