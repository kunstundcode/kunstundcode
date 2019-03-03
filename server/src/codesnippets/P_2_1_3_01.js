function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  let count = 0;
  let tileCountX = 10;
  let tileCountY = 10;
  let tileWidth = 0;
  let tileHeight = 0;
  
  let colorStep = 15;
  
  let circleCount = 0;
  let endSize = 0;
  let endOffset = 0;
  
  let actRandomSeed = 0;

  p.setup = function () {
    p.createCanvas(800, 800);
    tileWidth = p.width / tileCountX;
    tileHeight = p.height / tileCountY;
    p.noFill();
    p.stroke(0, 128);
  }

  p.draw = function() {
    p.background(255);
    p.randomSeed(actRandomSeed);

    p.translate(tileWidth / 2, tileHeight / 2);

    circleCount = p.mouseX / 30 + 1;
    endSize = p.map(p.mouseX, 0, p.max(p.width, p.mouseX), tileWidth / 2, 0);
    endOffset = p.map(p.mouseY, 0, p.max(p.height, p.mouseY), 0, (tileWidth - endSize) / 2);

    for (let gridY = 0; gridY <= tileCountY; gridY++) {
      for (let gridX = 0; gridX <= tileCountX; gridX++) {
        p.push();
        p.translate(tileWidth * gridX, tileHeight * gridY);
        p.scale(1, tileHeight / tileWidth);

        let toggle = p.int(p.random(0, 4));
        if (toggle == 0) p.rotate(-p.HALF_PI);
        if (toggle == 1) p.rotate(0);
        if (toggle == 2) p.rotate(p.HALF_PI);
        if (toggle == 3) p.rotate(p.PI);

        // draw module
        for (let i = 0; i < circleCount; i++) {
          let diameter = p.map(i, 0, circleCount, tileWidth, endSize);
          let offset = p.map(i, 0, circleCount, 0, endOffset);
          p.ellipse(offset, 0, diameter, diameter);
        }
        p.pop();
      }
    }
  }

  p.mousePressed = function() {
    actRandomSeed = p.random(100000);
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
  }
}

let myp5 = new p5(s, document.getElementById('box'))
