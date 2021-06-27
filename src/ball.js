import { detectCollision } from "./collisionDetection.js";

class Ball {
  constructor(game) {
    this.img = document.getElementById("image_ball");
    let { gameWidth, gameHeight } = game;

    // Ball attributes
    this.size = 20;

    // Game object instantiation
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.game = game;

    // Reset ball position on instantiation
    this.reset();
  }

  draw(ctx) {
    const {
      img,
      position: {
        x: x,
        y: y,
      },
      size,
    } = this;

    ctx.drawImage(img, x, y, size, size);
  }

  update(deltaTime) {
    const {
      game,
      gameWidth,
      position,
      speed,
      size,
    } = this;

    position.x += speed.x;
    position.y += speed.y;

    // Check left / right walls
    if (position.x + size > gameWidth || position.x <= 0) {
      speed.x = -speed.x;
    }

    // Check top wall
    if (this.position.y <= 0) {
      speed.y = -speed.y;
    }

    if (this.position.y + size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // Check paddle collision
    if (detectCollision(this, game.paddle)) {
      speed.y = -speed.y;
      position.y = game.paddle.position.y - size;
    }
  }

  reset() {
    this.speed = { x: 7.5, y: -2 };
    this.position = { x: 10, y: 550 };
  }
}

export default Ball;