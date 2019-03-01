function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}


let s = function(p) {
  p.setup = function () {
    p.createCanvas(720, 720);
    p.noCursor();

    p.colorMode(p.HSB, 360, 100, 100);
    p.rectMode(p.CENTER);
    p.noStroke();
  }

  p.draw = function () {
    p.background(p.mouseY / 2, 100, 100);

    p.fill(360 - p.mouseY / 2, 100, 100);
    p.rect(360, 360, p.mouseX + 1, p.mouseX + 1);
  }

  p.keyPressed = function () {
    if (p.key === 's' || p.key === 'S') {
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
  }
}

let myp5 = new p5(s, document.getElementById("box"))