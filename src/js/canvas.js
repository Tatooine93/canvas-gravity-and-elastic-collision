/* import utils, { randomIntFromRange, randomColor, distance, rotate, resolveCollision } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

document.body.style.overflow = 'hidden';

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

//settings
let gravity = 0.2;
let friction = 0.96;
let airFriction = 0.99999;
let ballsNumber = 80;
let minRadius = 4;
let maxRadius = 20;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color, mass) {
    this.x = x
    this.y = y
    this.velocity = {
      x: dx,
      y: dy,
    }
    this.radius = radius
    this.color = color
    this.mass = mass
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update(ballArray) {

    for (let ball of ballArray) {
      if (this === ball) continue;
      if (distance(this.x, this.y, ball.x, ball.y) - this.radius * 2 < 0) {
        resolveCollision(this, ball)
      }
    }

    if (this.y + this.radius + this.velocity.y > canvas.height || this.y + this.radius <=0) {
      this.velocity.y = -this.velocity.y * friction

      this.velocity.x = this.velocity.x * friction
    }
    else {
      this.velocity.y += gravity;
    }

    if(this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x;
    }
    else {
      this.velocity.x = this.velocity.x * airFriction
    }

    //if(this.y > canvas.height || this.y <= 0 || this.x > canvas.width || this.x <= 0) {
      //document.body.style.backgroundColor = 'red'
    //}
    //else {
    //  document.body.style.backgroundColor = 'white'
    //}

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  }
}

// Implementation
let ballArray;

function init() {

  ballArray = [];

  for (let i = 0; i < ballsNumber; i++) {
      let radius = randomIntFromRange(minRadius, maxRadius);
      let x = randomIntFromRange(radius, canvas.width - radius);
      let y = randomIntFromRange(0, canvas.height - radius);
      let dx = randomIntFromRange(-2, 2);
      let dy = randomIntFromRange(-2, 2);
      let color = randomColor(colors);
      let mass = 1;
      
      if(i !== 0){
        for (let j = 0;  j < ballArray.length; j++){
          if (distance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0){
            x = randomIntFromRange(radius, canvas.width - radius);
            y = randomIntFromRange(radius, canvas.height - radius);
            j = -1;
          }
        }
      }
      ballArray.push(new Ball(x, y, dx, dy, radius, color, mass));
    }

  console.log(ballArray);

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)

  for (const ball of ballArray) {
    ball.update(ballArray)
  }
}

init()
animate()
 */

import { randomIntFromRange, randomColor, distance, rotate, resolveCollision } from './utils.js';

const canvas = document.getElementById('simCanvas');
const c = canvas.getContext('2d');

let settings = {
  gravity: 0.2,
  friction: 0.96,
  airFriction: 0.99999,
  ballsNumber: 60,
  minRadius: 8,
  maxRadius: 20
};

let ballArray = [];

class Ball {
  constructor(x, y, dx, dy, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.velocity = { x: dx, y: dy };
    this.radius = radius;
    this.color = color;
    this.mass = mass;
  }

  draw() {
    const gradient = c.createRadialGradient(
      this.x - this.radius / 3,
      this.y - this.radius / 3,
      this.radius / 5,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.3, this.color);
    gradient.addColorStop(1, '#000');

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = gradient;
    c.fill();
    c.closePath();
  }

  update(ballArray) {
    for (let ball of ballArray) {
      if (this === ball) continue;
      if (distance(this.x, this.y, ball.x, ball.y) - this.radius * 2 < 0) {
        resolveCollision(this, ball);
      }
    }

    if (this.y + this.radius + this.velocity.y > canvas.height || this.y - this.radius <= 0) {
      this.velocity.y = -this.velocity.y * settings.friction;
      this.velocity.x *= settings.friction;
    } else {
      this.velocity.y += settings.gravity;
    }

    if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x;
    } else {
      this.velocity.x *= settings.airFriction;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function init() {
  ballArray = [];
  for (let i = 0; i < settings.ballsNumber; i++) {
    let radius = randomIntFromRange(settings.minRadius, settings.maxRadius);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    let color = randomColor(['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']);

    if (i !== 0) {
      for (let j = 0; j < ballArray.length; j++) {
        if (distance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }
    ballArray.push(new Ball(x, y, dx, dy, radius, color, 1));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (const ball of ballArray) {
    ball.update(ballArray);
  }
}

function restartSimulation() {
  init();
}

window.addEventListener('resize', () => {
  resizeCanvas();
  init();
});

window.addEventListener('load', () => {
  resizeCanvas();
  init();
  animate();
});

// --- Sliders ---
const inputs = [
  "gravity",
  "friction",
  "airFriction",
  "ballsNumber",
  "minRadius",
  "maxRadius"
];

inputs.forEach((key) => {
  const input = document.getElementById(key);
  const valueLabel = document.getElementById(`val-${key}`);
  input.addEventListener("input", (e) => {
    settings[key] = parseFloat(e.target.value);
    valueLabel.textContent = e.target.value;
  });
});

document.getElementById("restartBtn").addEventListener("click", restartSimulation);
