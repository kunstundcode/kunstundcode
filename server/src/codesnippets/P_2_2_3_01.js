function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  var formResolution = 15;
  var stepSize = 2;
  var distortionFactor = 1;
  var initRadius = 150;
  var centerX;
  var centerY;
  var x = [];
  var y = [];
  
  var filled = false;
  var freeze = false;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // init shape
    centerX = p.width / 2;
    centerY = p.height / 2;
    var angle = p.radians(360 / formResolution);
    for (var i = 0; i < formResolution; i++) {
      x.push(p.cos(angle * i) * initRadius);
      y.push(p.sin(angle * i) * initRadius);
    }

    p.stroke(0, 50);
    p.strokeWeight(0.75);
    p.background(255);
  }

  p.draw = function() {
    // floating towards mouse position
    centerX += (p.mouseX - centerX) * 0.01;
    centerY += (p.mouseY - centerY) * 0.01;

    // calculate new points
    for (var i = 0; i < formResolution; i++) {
      x[i] += p.random(-stepSize, stepSize);
      y[i] += p.random(-stepSize, stepSize);
      // uncomment the following line to show position of the agents
      // ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
    }

    if (filled) {
      p.fill(p.random(255));
    } else {
      p.noFill();
    }

    p.beginShape();
    // first controlpoint
    p.curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

    // only these points are drawn
    for (var i = 0; i < formResolution; i++) {
      p.curveVertex(x[i] + centerX, y[i] + centerY);
    }
    p.curveVertex(x[0] + centerX, y[0] + centerY);

    // end controlpoint
    p.curveVertex(x[1] + centerX, y[1] + centerY);
    p.endShape();
  }

  p.mousePressed = function () {
    // init shape on mouse position
    centerX = p.mouseX;
    centerY = p.mouseY;
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
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
    if (p.key == '1') filled = false;
    if (p.key == '2') filled = true;

    // pauze/play draw loop
    if (p.key == 'f' || p.key == 'F') freeze = !freeze;
    if (freeze) {
      p.noLoop();
    } else {
      p.loop();
    }
  }
}

let myp5 = new p5(s, document.getElementById('box'))
