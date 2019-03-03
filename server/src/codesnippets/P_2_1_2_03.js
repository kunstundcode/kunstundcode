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

var moduleColor;
var moduleAlpha = 180;
var maxDistance = 500;

  p.setup = function () {
    p.createCanvas(600, 600);
    p.noFill();
    p.strokeWeight(3);
    moduleColor = p.color(0, 0, 0, moduleAlpha);
  }

  p.draw = function() {
    p.clear();
    p.stroke(moduleColor);

    for (var gridY = 0; gridY < p.width; gridY += 25) {
      for (var gridX = 0; gridX < p.height; gridX += 25) {
        var diameter = p.dist(p.mouseX, p.mouseY, gridX, gridY);
        diameter = diameter / maxDistance * 40;
        p.push();
        p.translate(gridX, gridY, diameter * 5);
        p.rect(0, 0, diameter, diameter); // also nice: ellipse(...)
        p.pop();
      }
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
  }
}

let myp5 = new p5(s, document.getElementById('box'))
