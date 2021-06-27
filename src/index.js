// Components
import Game from "./game.js"

// Canvas setup
let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

// Generate Random Background each game
var totalCount = 10;
function randBackground() {
  var num = Math.ceil(Math.random() * totalCount);
  canvas.style.backgroundImage = `url("assets/images/bg${num}.png")`;
  canvas.style.backgroundRepeat = "none";// Background repeat
}
randBackground();

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

const gameLoop = (timeStamp) => {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);
  ctx.fillStyle=("")

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);