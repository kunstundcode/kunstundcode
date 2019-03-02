function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  let tileCount = 10;

  let tileWidth;
  let tileHeight;
  let shapeSize = 50;
  let newShapeSize = shapeSize;
  let shapeAngle = 0;
  let maxDist;
  let currentShape;
  let shapes;
  
  let sizeMode = 0;

  p.preload = function () {
    shapes = [];
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_6.svg'));
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_4.svg'));
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_3.svg'));
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_2.svg'));
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_5.svg'));
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_1.svg'));
    shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522590/KunstundCode-SRC/module_7.svg'));
  }

  p.setup = function () {
    p.createCanvas(600, 600);
    p.imageMode(p.CENTER);
    // set the current shape to the first in the array
    currentShape = shapes[0];
    tileWidth = p.width / tileCount;
    tileHeight = p.height / tileCount;
    maxDist = p.sqrt(p.pow(p.width, 2) + p.pow(p.height, 2));
  }

  p.draw = function() {
    p.clear();

    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {

        let posX = tileWidth * gridX + tileWidth / 2;
        let posY = tileHeight * gridY + tileWidth / 2;

        // calculate angle between mouse position and actual position of the shape
        let angle = p.atan2(p.mouseY - posY, p.mouseX - posX) + (shapeAngle * (p.PI / 180));

        if (sizeMode == 0) newShapeSize = shapeSize;
        if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - p.map(p.dist(p.mouseX, p.mouseY, posX, posY), 0, 500, 5, shapeSize);
        if (sizeMode == 2) newShapeSize = p.map(p.dist(p.mouseX, p.mouseY, posX, posY), 0, 500, 5, shapeSize);

        p.push();
        p.translate(posX, posY);
        p.rotate(angle);
        p.noStroke();
        p.image(currentShape, 0, 0, newShapeSize, newShapeSize);
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
    if (p.key == 'd' || p.key == 'D') sizeMode = (sizeMode + 1) % 3;
    if (p.key == 'g' || p.key == 'G') {
      tileCount += 5;
      if (tileCount > 20) {
        tileCount = 10;
      }
      tileWidth = p.width / tileCount;
      tileHeight = p.height / tileCount;
    }

    if (p.key == '1') currentShape = shapes[0];
    if (p.key == '2') currentShape = shapes[1];
    if (p.key == '3') currentShape = shapes[2];
    if (p.key == '4') currentShape = shapes[3];
    if (p.key == '5') currentShape = shapes[4];
    if (p.key == '6') currentShape = shapes[5];
    if (p.key == '7') currentShape = shapes[6];

    if (p.keyCode == p.UP_ARROW) shapeSize += 5;
    if (p.keyCode == p.DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
    if (p.keyCode == p.LEFT_ARROW) shapeAngle += 5;
    if (p.keyCode == p.RIGHT_ARROW) shapeAngle -= 5;
  
  }
}

let myp5 = new p5(s, document.getElementById('box'))
