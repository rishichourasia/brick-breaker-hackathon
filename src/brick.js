import Ball from './ball.js';
import { detectCollision } from './collisionDetection.js';

class Brick {
  constructor(game, position) {
    let { gameWidth, gameHeight } = game;
    this.img = document.getElementById("image_brick");
    this.game = game;

    // Brick attributes
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.markedForDeletion = false;
  }

  update() {

    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    const {
      img,
      position: {
        x,
        y,
      },
      width,
      height,
    } = this;

    ctx.drawImage(img, x, y, width, height);
  }
}

export default Brick;
