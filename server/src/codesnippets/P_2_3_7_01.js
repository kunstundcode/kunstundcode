function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  var gif;
  var canvasElement;
  var recording = false;
  
  var lineWidth = 3;
  var lineColor;
  
  var mv = true;
  var mh = true;
  var md1 = true;
  var md2 = true;
  var penCount = 1;
  
  var showAxes = true;
  
  var img;

  p.setup = function () {
    // Please work with a square canvas
    canvasElement = p.createCanvas(800, 800);
    p.noCursor();
    p.noFill();
    lineColor = p.color(0);

    // Create an offscreen graphics object to draw into
    img = p.createGraphics(p.width, p.height);
    img.pixelDensity(1);

    p.setupGIF();
  }

  p.draw = function() {
    p.background(255);
    p.image(img, 0, 0);

    img.strokeWeight(lineWidth);
    img.stroke(lineColor);

    if (p.mouseIsPressed && p.mouseButton == p.LEFT) {
      var w = p.width / penCount;
      var h = p.height / penCount;
      var x = p.mouseX % w;
      var y = p.mouseY % h;
      var px = x - (p.mouseX - p.pmouseX);
      var py = y - (p.mouseY - p.pmouseY);

      for (var i = 0; i < penCount; i++) {
        for (var j = 0; j < penCount; j++) {
          var ox = i * w;
          var oy = j * h;

          // Normal position
          img.line(x + ox, y + oy, px + ox, py + oy);
          // Horizontal mirror or all three other mirrors
          if (mh || md2 && md1 && mv) img.line(w - x + ox, y + oy, w - px + ox, py + oy);
          // Vertical mirror
          if (mv || md2 && md1 && mh) img.line(x + ox, h - y + oy, px + ox, h - py + oy);
          // Horizontal and vertical mirror
          if (mv && mh || md2 && md1) img.line(w - x + ox, h - y + oy, w - px + ox, h - py + oy);

          // When mirroring diagonally, flip X and Y inputs.
          if (md1 || md2 && mv && mh) img.line(y + ox, x + oy, py + ox, px + oy);
          if (md1 && mh || md2 && mv) img.line(y + ox, w - x + oy, py + ox, w - px + oy);
          if (md1 && mv || md2 && mh) img.line(h - y + ox, x + oy, h - py + ox, px + oy);
          if (md1 && mv && mh || md2) img.line(h - y + ox, w - x + oy, h - py + ox, w - px + oy);
        }
      }

      if (recording) {
        gif.addFrame(canvasElement.canvas, {delay: 1, copy: true});
      }
    }

    if (showAxes) {
      var w = p.width / penCount;
      var h = p.height / penCount;

      // draw mirror axes and tiles
      for (var i = 0; i < penCount; i++) {
        for (var j = 0; j < penCount; j++) {
          var x = i * w;
          var y = j * h;

          p.stroke(0, 50);
          p.strokeWeight(1);
          if (mh) p.line(x + w / 2, y, x + w / 2, y + h);
          if (mv) p.line(x, y + h / 2, x + w, y + h / 2);
          if (md1) p.line(x, y, x + w, y + h);
          if (md2) p.line(x + w, y, x, y + h);

          p.stroke(15, 233, 118, 50);
          p.strokeWeight(1);
          p.rect(i * w, j * h, w - 1, h - 1);
        }
      }

      // draw pen
      p.fill(lineColor);
      p.noStroke();
      p.ellipse(p.mouseX, p.mouseY, lineWidth + 2, lineWidth + 2);
      p.stroke(0, 50);
      p.noFill();
      p.ellipse(p.mouseX, p.mouseY, lineWidth + 1, lineWidth + 1);
    }
  }

  p.mousePressed = function () {
    // init shape on mouse position
    p.centerX = p.mouseX;
    p.centerY = p.mouseY;
    var angle = p.radians(360 / formResolution);
    var radius = initRadius * p.random(0.5, 1);
    for (var i = 0; i < formResolution; i++) {
      x[i] = p.cos(angle * i) * initRadius;
      y[i] = p.sin(angle * i) * initRadius;
    }
  }

  p.keyPressed = function () {
    if (p.key === 's' || p.key === 'S') {
      let dataURL = p.canvas.toDataURL( 'image/png' );
      let filename = Date.now()
      let file = dataURLtoFile(dataURL, filename);

      let url = '';
      if (window.location.origin.includes('localhost')) url = 'http://localhost:5000/api/uploadPicture/' + projectcode
      else url = window.location.origin + '/api/uploadPicture/' + projectcode; //letiable projectcode comes from scope of the react app

      let form = new FormData();
      form.append('file', file);

      let settings = {
        'async': true,
        'crossDomain': true,
        'url': url,
        'method': 'POST',
        'headers': {
          'cache-control': 'no-cache',
          'Postman-Token': 'c398ba57-8976-47e9-acc1-ec8e4c121b09'
        },
        'processData': false,
        'contentType': false,
        'mimeType': 'multipart/form-data',
        'data': form,
        'xhrFields': {
          'withCredentials': true
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
    if (p.keyCode == p.DELETE || keyCode == BACKSPACE) img.clear();

    if (p.keyCode == p.RIGHT_ARROW) penCount++;
    if (p.keyCode == p.LEFT_ARROW) penCount = p.max(1, penCount - 1);
  
    if (p.keyCode == p.UP_ARROW) lineWidth++;
    if (p.keyCode == p.DOWN_ARROW) lineWidth = p.max(1, lineWidth - 1);

    if (p.key == '2') mh = !mh;
    if (p.key == '1') mv = !mv;
    if (p.key == '3') md1 = !md1;
    if (p.key == '4') md2 = !md2;
  
    if (p.key == '5') lineColor = p.color(0);
    if (p.key == '6') lineColor = p.color(15, 233, 118);
    if (p.key == '7') lineColor = p.color(245, 95, 80);
    if (p.key == '8') lineColor = p.color(65, 105, 185);
    if (p.key == '9') lineColor = p.color(255, 231, 108);
    if (p.key == '0') lineColor = p.color(255);
  
    if (p.key == 'd' || p.key == 'D') showAxes = !showAxes;
    if (p.key == 'g' || p.key == 'G') {
      recording = !recording;
      if (!recording) {
        gif.render();
      }
    }
  }

  p.setupGIF = function () {
    p.background(255);
    gif = new GIF({
      workers: 16,
      quality: 10000,
      debug: true,
      workerScript: '../../libraries/gif.js/gif.worker.js'
    });
    gif.on('finished', function(blob) {
      p.saveAs(blob, gd.timestamp() + '.gif');
      p.setupGIF();
    });
  }
}

let myp5 = new p5(s, document.getElementById('box'))
