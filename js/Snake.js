class Snake {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.color = id === 0 ? "lime" : "rgb(0, 200, 0)";
    this.stroke = "rgb(0, 220, 0)";
  }

  changeDirection(key) {
    if ((key === "KeyW" || key === "ArrowUp") && this.velocity.y !== 1) {
      this.velocity.x = 0;
      this.velocity.y = -1;
      return;
    }
    if ((key === "KeyS" || key === "ArrowDown") && this.velocity.y !== -1) {
      this.velocity.x = 0;
      this.velocity.y = 1;
      return;
    }
    if ((key === "KeyA" || key === "ArrowLeft") && this.velocity.x !== 1) {
      this.velocity.x = -1;
      this.velocity.y = 0;
      return;
    }
    if ((key === "KeyD" || key === "ArrowRight") && this.velocity.x !== -1) {
      this.velocity.x = 1;
      this.velocity.y = 0;
      return;
    }
  }

  draw() {
    c.fillStyle = this.color;
    c.strokeStlye = this.stroke;
    c.fillRect(this.x * pixelSize, this.y * pixelSize, pixelSize, pixelSize);
    c.strokeRect(this.x * pixelSize, this.y * pixelSize, pixelSize, pixelSize);
  }

  update() {
    const idx = snakeBody.indexOf(this);
    const cloneBody = snakeBody.slice();

    if (idx === 0) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      cloneBody.forEach((body) => {
        if (snake.x === body.x && snake.y === body.y && snake.id !== body.id) {
          gameActive = false;
        }
      });
    } else {
      snakeBody[idx].x = snakeBody[idx - 1].x;
      snakeBody[idx].y = snakeBody[idx - 1].y;
    }

    this.draw();
  }
}
