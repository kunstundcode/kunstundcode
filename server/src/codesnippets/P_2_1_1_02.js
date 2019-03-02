function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  var tileCount = 20;
  var actRandomSeed = 0;

  var actStrokeCap;

  var colorLeft;
  var colorRight;
  var alphaLeft = 255;
  var alphaRight = 255;

  p.setup = function () {
    p.createCanvas(600, 600);
    actStrokeCap = p.ROUND;
    colorLeft = p.color(197, 0, 123, alphaLeft);
    colorRight = p.color(87, 35, 129, alphaRight);
  }

  p.draw = function() {
    p.clear();
    p.strokeCap(actStrokeCap);
  
    p.randomSeed(actRandomSeed);
  
    for (var gridY = 0; gridY < tileCount; gridY++) {
      for (var gridX = 0; gridX < tileCount; gridX++) {
  
        var posX = p.width / tileCount * gridX;
        var posY = p.height / tileCount * gridY;
  
        var toggle = p.int(p.random(0, 2));
  
        if (toggle == 0) {
          p.stroke(colorLeft);
          p.strokeWeight(p.mouseX / 10);
          p.line(posX, posY, posX + p.width / tileCount, posY + p.height / tileCount);
        }
        if (toggle == 1) {
          p.stroke(colorRight);
          p.strokeWeight(p.mouseY / 10);
          p.line(posX, posY + p.width / tileCount, posX + p.height / tileCount, posY);
        }
      }
    }
  }

  p.mousePressed = function () {
    actRandomSeed = p.random(100000);
  }

  p.colorsEqual = function (col1, col2) {
    return col1.toString() == col2.toString();
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
    if (p.key == '1') actStrokeCap = p.ROUND;
    if (p.key == '2') actStrokeCap = p.SQUARE;
    if (p.key == '3') actStrokeCap = p.PROJECT;

    var black = p.color(0, 0, 0, 255);
    if (p.key == '4') {
      if (colorsEqual(colorLeft, black)) {
        colorLeft = p.color(197, 0, 123, alphaLeft);
      } else {
        colorLeft = p.color(0, 0, 0, alphaLeft);
      }
    }
    if (p.key == '5') {
      if (colorsEqual(colorRight, black)) {
        colorRight = p.color(87, 35, 129, alphaRight);
      } else {
        colorRight = p.color(0, 0, 0, alphaRight);
      }
    }

    if (p.key == '6') {
      if (alphaLeft == 255) {
        alphaLeft = 127;
      } else {
        alphaLeft = 255;
      }
      colorLeft = p.color(red(colorLeft), green(colorLeft), blue(colorLeft), alphaLeft);
    }
    if (p.key == '7') {
      if (alphaRight == 255) {
        alphaRight = 127;
      } else {
        alphaRight = 255;
      }
      colorRight = p.color(red(colorRight), green(colorRight), blue(colorRight), alphaRight);
    }

    if (p.key == '0') {
      actStrokeCap = p.ROUND;
      alphaLeft = 255;
      alphaRight = 255;
      colorLeft = p.color(0, 0, 0, alphaLeft);
      colorRight = p.color(0, 0, 0, alphaRight);
    }
  }
}

let myp5 = new p5(s, document.getElementById('box'))
