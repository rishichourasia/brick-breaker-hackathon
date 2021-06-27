class Paddle {
  constructor(game) {
    let { gameWidth, gameHeight } = game;
    this.gameWidth = gameWidth;
    this.maxSpeed = 10;
    this.speed = 0;

    this.width = 95;
    this.height = 20;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10,
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'purple';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }
}

export default Paddle;
