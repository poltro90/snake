var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var pts = document.getElementById("pts");
var csize = 400
var sx = sy = 200;
var ax = ay = 0;
var pt = 0;
var mx = my = 390;
var tail = [];
var sxoff = syoff = 0

var cancolor= "#333"
var sncolor = "#abc000"
var apcolor = "#ff0000"


function reset() {
  ctx.fillStyle = cancolor;
  ctx.fillRect(0, 0, csize, csize);
  sx = sy = 200;
  ax = ay = 0;
  pt = 0;
  mx = my = 390;
  tail = [];
  sxoff = syoff = 0;
  for (var i = 0; i < 5; i++) {
    tail.push({ x: sx + (i * 10), y: sy })
  }
  console.log(tail)
  setApple();
}

function snake() {
  reset();
  setSnake();
  document.body.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        sxoff = -10;
        syoff = 0;
        break;
      case 38:
        sxoff = 0;
        syoff = -10;
        break;
      case 39:
        sxoff = 10;
        syoff = 0;
        break;
      case 40:
        sxoff = 0;
        syoff = 10;
        break;
      case 27:
        return reset();
    }
  };
  setInterval(setSnake, 75)
}

function setApple() {
  do {
    ax = Math.floor(Math.random() * mx / 10) * 10;
    ay = Math.floor(Math.random() * my / 10) * 10;
  } while (ax == sx && ay == sy)
  ctx.fillStyle = apcolor;
  ctx.fillRect(ax, ay, 10, 10);
}

function setSnake() {
  if (sxoff == 0 && syoff == 0) {
    return
  }
  var len = tail.length
  var d = tail[0]
  tail[0].x += sxoff;
  tail[0].y += syoff;
  if (tail[0].x < 0) {
    tail[0].x += csize;
  }
  if (tail[0].x > mx) {
    tail[0].x -= csize;
  }
  if (tail[0].y < 0) {
    tail[0].y += csize;
  }
  if (tail[0].y > my) {
    tail[0].y -= csize;
  }
  ctx.fillStyle = sncolor;
  ctx.fillRect(tail[0].x, tail[0].y, 10, 10);
  ctx.fillStyle = cancolor;
  ctx.fillRect(tail[len - 1].x, tail[len - 1].y, 10, 10);
  for (var i = len - 1; i > 0; i--) {
    tail[i] = { x: tail[i - 1].x, y: tail[i - 1].y };
  }
  sx = tail[0].x
  sy = tail[0].y
  lx = tail[len - 1].x
  ly = tail[len - 1].y
  if (sx == ax && sy == ay) {
    tail.push({ x: lx, y: ly })
    pt++
    pts.innerHTML = "Points: " + pt
    setApple();
  }
}

snake()