  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  let s = function(p) {

    let shapes = [];
    let density = 2.5;
    let shapeHeight = 64;
    let shapeColor;
    
    let newShape;

    p.setup = function () {
      p.createCanvas(800, 800);
      p.noFill();
      p.shapeColor = p.color(0);
    }

    p.draw = function() {
      p.background(255);

      shapes.forEach(function(shape) {
        shape.draw();
      });
    
      if (newShape) {
        newShape.x2 = p.mouseX;
        newShape.y2 = p.mouseY;
        newShape.h = shapeHeight;
        newShape.c = shapeColor;
        newShape.draw();
      }
    }

    p.Shape = function (x1, y1, x2, y2, h, c) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.h = h;
      this.c = c;
    
      p.Shape.prototype.draw = function() {
        let w = p.dist(this.x1, this.y1, this.x2, this.y2);
        let a = p.atan2(this.y2 - this.y1, this.x2 - this.x1);
        p.stroke(this.c);
        p.push();
        p.translate(this.x1, this.y1);
        p.rotate(a);
        p.translate(0, -this.h / 2);
        for (let i = 0; i < this.h; i += density) {
          p.line(0, i, w, i);
        }
        p.pop();
      };
    }

    p.mousePressed = function() {
      newShape = new p.Shape(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY, shapeHeight, shapeColor);
    }

    p.mouseReleased = function () {
      shapes.push(newShape);
      newShape = undefined;
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

      if (p.key == '1') shapeColor = p.color(255, 0, 0);
      if (p.key == '2') shapeColor = p.color(0, 255, 0);
      if (p.key == '3') shapeColor = p.color(0, 0, 255);
      if (p.key == '4') shapeColor = p.color(0);

      if (p.keyCode == p.UP_ARROW) shapeHeight += density;
      if (p.keyCode == p.DOWN_ARROW) shapeHeight -= density;
    }
  }

  let myp5 = new p5(s, document.getElementById('box'))
