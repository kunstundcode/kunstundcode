function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  let strokeColor;

  p.setup = function () {
    p.createCanvas(720, 720);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noFill();
    p.background(0, 0, 100)
    p.strokeWeight(2);
    strokeColor = p.color(0, 10);
  }

  p.draw = function() {
    if (p.mouseIsPressed && p.mouseButton == p.LEFT) {
      p.push();
      p.translate(p.width / 2, p.height / 2);
  
      let circleResolution = p.int(p.map(p.mouseY + 100, 0, p.height, 2, 10));
      let radius = p.mouseX - p.width / 2;
      let angle = p.TAU / circleResolution;
  
      p.stroke(strokeColor);
  
      p.beginShape();
      for (let i = 0; i <= circleResolution; i++) {
        let x = p.cos(angle * i) * radius;
        let y = p.sin(angle * i) * radius;
        p.vertex(x, y);
      }
      p.endShape();
  
      p.pop();
    }
  }

  p.keyPressed = function () {
    if (p.key === 's' || p.key === 'S') {
      let dataURL = p.canvas.toDataURL( 'image/jpeg' );
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
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(0, 0, 100);  
    if (p.key == '1') strokeColor = p.color(0, 10);
    if (p.key == '2') strokeColor = p.color(192, 100, 64, 10);
    if (p.key == '3') strokeColor = p.color(52, 100, 71, 10);
  }
}

let myp5 = new p5(s, document.getElementById('box'))
