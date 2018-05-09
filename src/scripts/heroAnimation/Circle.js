// check pos has got x and y values

function Circle(pos, rad, color, ctx) {
  this.pos = pos || null;
  this.radius = rad || null;
  this.color = color || null;
  this.ctx = ctx || null;
  this.active = false;
}

Circle.prototype.draw = function() {
  if (!this.active) return;
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
  this.ctx.fillStyle = `rgba(${this.color},${this.active})`;
  this.ctx.fill();
};

export default Circle;
