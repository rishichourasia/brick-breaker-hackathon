import Ball from "./ball.js";
import { buildLevel, level1, level2 } from './levels.js';
import Paddle from "./paddle.js";
import InputHandler from "./input.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4,
};

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    // Instantiate Game Objects
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.bricks = [];
    this.gameObjects = [];

    // Instantiate Game rules
    this.lives = 3;
    this.gameState = GAME_STATE.MENU;
    this.levels = [level1, level2];
    this.currentLevel = 0;

    // Instantiate Input handler
    new InputHandler(this.paddle, this);
  }

  start () {
    if (this.gameState !== GAME_STATE.MENU &&
        this.gameState !== GAME_STATE.NEW_LEVEL
    ) return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();

    this.gameObjects = [
      this.ball,
      this.paddle,
    ];

    this.gameState = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gameState = GAME_STATE.GAME_OVER;
    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.GAME_OVER
    ) return;

    if (this.bricks.length === 0 ) {
      this.currentLevel++;
      this.lives++;
      switch (this.currentLevel) {
        case this.currentLevel === 1:
          alert("You have completed level 1");
          break;

        default:
          alert("You have completed level 1");
          break;
      }
      this.gameState = GAME_STATE.NEW_LEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(object => {
      object.update(deltaTime);
    });

    this.bricks = this.bricks.filter(gameObject => !gameObject.markedForDeletion)
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => {
      object.draw(ctx);
    });

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, .5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press SPACEBAR to Begin", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, .5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.GAME_OVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gameState == GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}

export default Game;
