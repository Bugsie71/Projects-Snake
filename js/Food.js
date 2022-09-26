class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "red";
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x * pixelSize, this.y * pixelSize, pixelSize, pixelSize);
  }
}
