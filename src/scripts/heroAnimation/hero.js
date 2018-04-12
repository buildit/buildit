import { TweenLite, EasePack } from "gsap";

let width, height, ctx, points, target, animateHeader = true;
const canvas = document.getElementById('js-canvas-hero');
const container = document.querySelector('.grav-c-hero');

const scrollCheck = () => {
  if (document.body.scrollTop > height) {
    animateHeader = false;
  } else {
    animateHeader = true;
  }
}

const resizeCanvas = () => {
  canvas.setAttribute('style', `width: ${container.clientWidth}px; height: ${container.clientHeight}px;`);
};


class HeroAnimation {
  constructor() {
    if (!('ontouchstart' in window)) {
      //window.addEventListener('mousemove', this.mouseMove());
    }

    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resizeCanvas);
    
  }

  init() {
    this.initHeader();
    this.initAnimation();
    this.addListeners();
  }

  initHeader() {
    this.resizeCanvas;
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    target = {
      x: width / 2,
      y: height / 2
    };

    if (typeof canvas.getContext !== 'function') {
      console.info('the thingy bob doesn\'t support canvas. Bailing out.');
      return;
    }

    ctx = canvas.getContext('2d');
    target = {
      x: width / 2,
      y: height / 2
    };

    // create points - added breakpoint with less nodes displayed as on smaller screens as it can look very dense
    if (window.matchMedia('screen and (min-width:768px)').matches) {
      points = [];
      for (var x = 0; x < width; x = x + width / 9) {
        for (var y = 0; y < height; y = y + height / 9) {
          var px = x + Math.random() * width / 9;
          var py = y + Math.random() * height / 9;
          var p = {
            x: px,
            originX: px,
            y: py,
            originY: py
          };
          points.push(p);
        }
      }
    } else {
      points = [];
      for (var x = 0; x < width; x = x + width / 6) {
        for (var y = 0; y < height; y = y + height / 6) {
          var px = x + Math.random() * width / 6;
          var py = y + Math.random() * height / 6;
          var p = {
            x: px,
            originX: px,
            y: py,
            originY: py
          };
          points.push(p);
        }
      }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j]
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
      var c = new this.Circle(points[i], 2 + Math.random() * 2.5, 'rgba(255,255,255,0.3)');
      points[i].circle = c;
    }
  }

  // mouseMove(e) {

  //   let posy = 0;
  //   let pageX = 0;
  //   let pageY = 0;
  //   let posx = posy = 0;
    
  //   if (e.pageX || e.pageY) {
  //     posx = e.pageX;
  //     posy = e.pageY;
  //   } else if (e.clientX || e.clientY) {
  //     posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  //     posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  //   }
  //   target.x = posx;
  //   target.y = posy;
  // }

  // animation
  initAnimation() {
    this.animate();

    for (var i in points) {
      this.shiftPoint(points[i]);
    }
  }

  animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(this.getDistance(target, points[i])) < 8000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.75;
        } else if (Math.abs(this.getDistance(target, points[i])) < 40000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(this.getDistance(target, points[i])) < 80000) {
          points[i].active = 0.04;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0.03;
          points[i].circle.active = 0.03;
        }

        this.drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(this.animate);
  }

  shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 0 + Math.random() * 20,
      y: p.originY - 0 + Math.random() * 20,
      ease: Circ.easeInOut,
      onComplete: function () {
        this.shiftPoint(p);
      }
    });
  }

  // Canvas manipulation
  drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(94, 161, 184,' + p.active + ')';
      ctx.stroke();
    }
  }

  Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(94, 161, 184,' + _this.active + ')';
      ctx.fill();
    };
  }

  // Util
  getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

}

export default HeroAnimation;
