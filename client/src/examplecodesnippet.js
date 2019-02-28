var s = function(p) {

  console.log(p);

  p.setup = function () {
    p.createCanvas(720, 720);
    p.noCursor();

    p.colorMode(p.HSB, 360, 100, 100);
    p.rectMode(p.CENTER);
    p.noStroke();
  }

  p.draw = function () {
    p.background(p.mouseY / 2, 100, 100);

    p.fill(360 - p.mouseY / 2, 100, 100);
    p.rect(360, 360, p.mouseX + 1, p.mouseX + 1);
  }

  p.keyPressed = function () {
    if (p.key == 's' || p.key == 'S') p.saveCanvas("k", 'png');
  }
}

var myp5 = new p5(s, document.getElementById("box"))