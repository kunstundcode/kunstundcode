function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  let tileCount = 20;
  let actRandomSeed = 0;
  
  let circleAlpha = 130;
  let circleColor;

  p.setup = function () {
    p.createCanvas(600, 600);
    p.noFill();
    circleColor = p.color(0, 0, 0, circleAlpha);
  }

  p.draw = function() {
    p.translate(p.width / tileCount / 2, p.height / tileCount / 2);

    p.background(255);

    p.randomSeed(actRandomSeed);

    p.stroke(circleColor);
    p.strokeWeight(p.mouseY / 60);

    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {

        let posX = p.width / tileCount * gridX;
        let posY = p.height / tileCount * gridY;

        let shiftX = p.random(-p.mouseX, p.mouseX) / 20;
        let shiftY = p.random(-p.mouseX, p.mouseX) / 20;

        p.ellipse(posX + shiftX, posY + shiftY, p.mouseY / 15, p.mouseY / 15);
      }
    }
  }

  p.mousePressed = function () {
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
