function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

let s = function(p) {

  var segmentCount = 360;
  var radius = 300;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.noStroke();
  }

  p.draw = function() {
    p.colorMode(p.HSB, 360, p.width, p.height);
    p.background(360, 0, p.height);

    var angleStep = 360 / segmentCount;

    p.beginShape(p.TRIANGLE_FAN);
    p.vertex(p.width / 2, p.height / 2);

    for (var angle = 0; angle <= 360; angle += angleStep) {
      var vx = p.width / 2 + p.cos(p.radians(angle)) * radius;
      var vy = p.height / 2 + p.sin(p.radians(angle)) * radius;
      p.vertex(vx, vy);
      p.fill(angle, p.mouseX, p.mouseY);
    }

    p.endShape();
  }

  p.keyPressed = function () {
    if (p.key === 's' || p.key === 'S') {
      console.log("Key Pressed!")
      let dataURL = p.canvas.toDataURL( "image/jpeg" );
      let filename = Date.now()
			console.log('TCL: p.keyPressed -> filename', filename)
      let file = dataURLtoFile(dataURL, filename);

      let url = '';
      if (window.location.origin.includes('localhost')) url = "http://localhost:5000/api/uploadPicture/" + projectcode
      else url = window.location.origin + "/api/uploadPicture/" + projectcode; //variable projectcode comes from scope of the react app

      let form = new FormData();
      form.append("file", file);

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
          "Postman-Token": "c398ba57-8976-47e9-acc1-ec8e4c121b09"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "xhrFields": {
          "withCredentials": true
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }

    switch (p.key) {
      case '1':
        segmentCount = 360;
        break;
      case '2':
        segmentCount = 45;
        break;
      case '3':
        segmentCount = 24;
        break;
      case '4':
        segmentCount = 12;
        break;
      case '5':
        segmentCount = 6;
        break;
      
    }
  }
}

let myp5 = new p5(s, document.getElementById("box"))
