// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Codekunst = require("../models/Codekunst");
const Userart = require("../models/Userart");

const bcryptRounds = 10;

require('../configs/database')

let users = [
  {
    username: "andre",
    password: bcrypt.hashSync("andre", bcrypt.genSaltSync(bcryptRounds)),
    isAdmin: true
  },
  {
    username: "svenja",
    password: bcrypt.hashSync("svenja", bcrypt.genSaltSync(bcryptRounds)),
    isAdmin: true
  },
  {
    username: "julia",
    password: bcrypt.hashSync("julia", bcrypt.genSaltSync(bcryptRounds)),
  },
  {
    username: "franzi",
    password: bcrypt.hashSync("franzi", bcrypt.genSaltSync(bcryptRounds)),
  }
]

let codekuenste = [
  {
    projectcode: "P_1_0_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_0_01.png",
    userarts: [],
    code: 'function dataURLtoFile(e,o){let t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],o,{type:a})}let s=function(e){e.setup=function(){e.createCanvas(720,720),e.noCursor(),e.colorMode(e.HSB,360,100,100),e.rectMode(e.CENTER),e.noStroke()},e.draw=function(){e.background(e.mouseY/2,100,100),e.fill(360-e.mouseY/2,100,100),e.rect(360,360,e.mouseX+1,e.mouseX+1)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=e.canvas.toDataURL("image/jpeg"),t=Date.now();console.log("TCL: p.keyPressed -> filename",t);let a=dataURLtoFile(o,t),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let c=new FormData;c.append("file",a);let i={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:c,xhrFields:{withCredentials:!0}};$.ajax(i).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_1_1_1_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_1_01.png",
    userarts: [],
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],t,{type:a})}let s=function(e){let t,o;e.setup=function(){e.createCanvas(800,400),e.noStroke(),e.colorMode(e.HSB,e.width,e.height,100)},e.draw=function(){t=e.mouseX+2,o=e.mouseY+2;for(let a=0;a<e.height;a+=o)for(let n=0;n<e.width;n+=t)e.fill(n,e.height-a,100),e.rect(n,a,t,o)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){console.log("Key Pressed!");let t=e.canvas.toDataURL("image/jpeg"),o=Date.now();console.log("TCL: p.keyPressed -> filename",o);let a=dataURLtoFile(t,o),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let c=new FormData;c.append("file",a);let i={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:c,xhrFields:{withCredentials:!0}};$.ajax(i).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_1_1_2_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_2_01.png",
    userarts: [],
    code: 'function dataURLtoFile(e,a){let t=e.split(","),o=t[0].match(/:(.*?);/)[1],n=atob(t[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],a,{type:o})}let s=function(e){var a=360;e.setup=function(){e.createCanvas(800,800),e.noStroke()},e.draw=function(){e.colorMode(e.HSB,360,e.width,e.height),e.background(360,0,e.height);var t=360/a;e.beginShape(e.TRIANGLE_FAN),e.vertex(e.width/2,e.height/2);for(var o=0;o<=360;o+=t){var n=e.width/2+300*e.cos(e.radians(o)),c=e.height/2+300*e.sin(e.radians(o));e.vertex(n,c),e.fill(o,e.mouseX,e.mouseY)}e.endShape()},e.keyPressed=function(){if("s"===e.key||"S"===e.key){console.log("Key Pressed!");let a=e.canvas.toDataURL("image/jpeg"),t=Date.now();console.log("TCL: p.keyPressed -> filename",t);let o=dataURLtoFile(a,t),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let c=new FormData;c.append("file",o);let i={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:c,xhrFields:{withCredentials:!0}};$.ajax(i).done(function(e){console.log(e)})}switch(e.key){case"1":a=360;break;case"2":a=45;break;case"3":a=24;break;case"4":a=12;break;case"5":a=6}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_0_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_01.png",
    userarts: [],
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){e.setup=function(){e.createCanvas(550,550),e.strokeCap(e.SQUARE)},e.draw=function(){e.background(255),e.translate(e.width/2,e.height/2);var t=e.int(e.map(e.mouseY,0,e.height,2,80)),o=e.mouseX-e.width/2,a=e.TAU/t;e.strokeWeight(e.mouseY/20);for(var n=0;n<=t;n++){var i=e.cos(a*n)*o,c=e.sin(a*n)*o;e.line(0,0,i,c)}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/jpeg"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_0_02",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_02.png",
    userarts: [],
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){e.setup=function(){e.createCanvas(720,720),e.noFill(),e.background(255),e.strokeWeight(2),e.stroke(0,25)},e.draw=function(){if(e.mouseIsPressed&&e.mouseButton==e.LEFT){e.push(),e.translate(e.width/2,e.height/2);var t=e.int(e.map(e.mouseY+100,0,e.height,2,10)),o=e.mouseX-e.width/2,a=e.TAU/t;e.beginShape();for(var n=0;n<=t;n++){var i=e.cos(a*n)*o,c=e.sin(a*n)*o;e.vertex(i,c)}e.endShape(),e.pop()}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/jpeg"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_0_03",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_03.png",
    userarts: [],
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){let strokeColor;p.setup=function(){p.createCanvas(720,720);p.colorMode(p.HSB,360,100,100,100);p.noFill();p.background(0,0,100) p.strokeWeight(2);strokeColor=p.color(0,10);} p.draw=function(){if(p.mouseIsPressed&&p.mouseButton==p.LEFT){p.push();p.translate(p.width/2,p.height/2);let circleResolution=p.int(p.map(p.mouseY+100,0,p.height,2,10));let radius=p.mouseX-p.width/2;let angle=p.TAU/circleResolution;p.stroke(strokeColor);p.beginShape();for(let i=0;i<=circleResolution;i++){let x=p.cos(angle*i)*radius;let y=p.sin(angle*i)*radius;p.vertex(x,y);} p.endShape();p.pop();}} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/jpeg');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});} if(p.keyCode==p.DELETE||p.keyCode==p.BACKSPACE)p.background(0,0,100);if(p.key=='1')strokeColor=p.color(0,10);if(p.key=='2')strokeColor=p.color(192,100,64,10);if(p.key=='3')strokeColor=p.color(52,100,71,10);}} let myp5=new p5(s,document.getElementById('box'))"
  },
  {
    projectcode: "P_2_1_1_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_1_01.png",
    userarts: [],
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){var tileCount=20;var actRandomSeed=0;var actStrokeCap;p.setup=function(){p.createCanvas(600,600) p.background(0,0,100) actStrokeCap=p.ROUND;} p.draw=function(){p.clear();p.strokeCap(actStrokeCap);p.randomSeed(actRandomSeed);for(var gridY=0;gridY<tileCount;gridY++){for(var gridX=0;gridX<tileCount;gridX++){var posX=p.width/tileCount*gridX;var posY=p.height/tileCount*gridY;var toggle=p.int(p.random(0,2));if(toggle==0){p.strokeWeight(p.mouseX/20);p.line(posX,posY,posX+p.width/tileCount,posY+p.height/tileCount);} if(toggle==1){p.strokeWeight(p.mouseY/20);p.line(posX,posY+p.width/tileCount,posX+p.height/tileCount,posY);}}}} p.mousePressed=function(){actRandomSeed=p.random(100000);} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/png');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});} if(p.key=='1')actStrokeCap=p.ROUND;if(p.key=='2')actStrokeCap=p.SQUARE;if(p.key=='3')actStrokeCap=p.PROJECT;}} let myp5=new p5(s,document.getElementById('box'))"
  },
  {
    projectcode: "P_2_1_1_02",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_1_02.png",
    userarts: [],
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){var tileCount=20;var actRandomSeed=0;var actStrokeCap;var colorLeft;var colorRight;var alphaLeft=255;var alphaRight=255;p.setup=function(){p.createCanvas(600,600);actStrokeCap=p.ROUND;colorLeft=p.color(197,0,123,alphaLeft);colorRight=p.color(87,35,129,alphaRight);} p.draw=function(){p.clear();p.strokeCap(actStrokeCap);p.randomSeed(actRandomSeed);for(var gridY=0;gridY<tileCount;gridY++){for(var gridX=0;gridX<tileCount;gridX++){var posX=p.width/tileCount*gridX;var posY=p.height/tileCount*gridY;var toggle=p.int(p.random(0,2));if(toggle==0){p.stroke(colorLeft);p.strokeWeight(p.mouseX/10);p.line(posX,posY,posX+p.width/tileCount,posY+p.height/tileCount);} if(toggle==1){p.stroke(colorRight);p.strokeWeight(p.mouseY/10);p.line(posX,posY+p.width/tileCount,posX+p.height/tileCount,posY);}}}} p.mousePressed=function(){actRandomSeed=p.random(100000);} p.colorsEqual=function(col1,col2){return col1.toString()==col2.toString();} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/png');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});} if(p.key=='1')actStrokeCap=p.ROUND;if(p.key=='2')actStrokeCap=p.SQUARE;if(p.key=='3')actStrokeCap=p.PROJECT;var black=p.color(0,0,0,255);if(p.key=='4'){if(colorsEqual(colorLeft,black)){colorLeft=p.color(197,0,123,alphaLeft);}else{colorLeft=p.color(0,0,0,alphaLeft);}} if(p.key=='5'){if(colorsEqual(colorRight,black)){colorRight=p.color(87,35,129,alphaRight);}else{colorRight=p.color(0,0,0,alphaRight);}} if(p.key=='6'){if(alphaLeft==255){alphaLeft=127;}else{alphaLeft=255;} colorLeft=p.color(red(colorLeft),green(colorLeft),blue(colorLeft),alphaLeft);} if(p.key=='7'){if(alphaRight==255){alphaRight=127;}else{alphaRight=255;} colorRight=p.color(red(colorRight),green(colorRight),blue(colorRight),alphaRight);} if(p.key=='0'){actStrokeCap=p.ROUND;alphaLeft=255;alphaRight=255;colorLeft=p.color(0,0,0,alphaLeft);colorRight=p.color(0,0,0,alphaRight);}}} let myp5=new p5(s,document.getElementById('box'))"
  },
  {
    projectcode: "P_2_1_1_04",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_1_04.png",
    userarts: [],
    code: 'function dataURLtoFile(e,o){let a=e.split(","),t=a[0].match(/:(.*?);/)[1],d=atob(a[1]),n=d.length,s=new Uint8Array(n);for(;n--;)s[n]=d.charCodeAt(n);return new File([s],o,{type:t})}let s=function(e){let o,a,t,d,n,s=10,u=50,l=u,i=0,r=0;e.preload=function(){(n=[]).push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_6.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_4.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_3.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_2.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_5.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_1.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522590/KunstundCode-SRC/module_7.svg"))},e.setup=function(){e.createCanvas(600,600),e.imageMode(e.CENTER),d=n[0],o=e.width/s,a=e.height/s,t=e.sqrt(e.pow(e.width,2)+e.pow(e.height,2))},e.draw=function(){e.clear();for(let t=0;t<s;t++)for(let n=0;n<s;n++){let s=o*n+o/2,c=a*t+o/2,m=e.atan2(e.mouseY-c,e.mouseX-s)+i*(e.PI/180);0==r&&(l=u),1==r&&(l=1.5*u-e.map(e.dist(e.mouseX,e.mouseY,s,c),0,500,5,u)),2==r&&(l=e.map(e.dist(e.mouseX,e.mouseY,s,c),0,500,5,u)),e.push(),e.translate(s,c),e.rotate(m),e.noStroke(),e.image(d,0,0,l,l),e.pop()}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),a="";a=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let t=new FormData;t.append("file",o);let d={async:!0,crossDomain:!0,url:a,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:t,xhrFields:{withCredentials:!0}};$.ajax(d).done(function(e){console.log(e)})}"d"!=e.key&&"D"!=e.key||(r=(r+1)%3),"g"!=e.key&&"G"!=e.key||((s+=5)>20&&(s=10),o=e.width/s,a=e.height/s),"1"==e.key&&(d=n[0]),"2"==e.key&&(d=n[1]),"3"==e.key&&(d=n[2]),"4"==e.key&&(d=n[3]),"5"==e.key&&(d=n[4]),"6"==e.key&&(d=n[5]),"7"==e.key&&(d=n[6]),e.keyCode==e.UP_ARROW&&(u+=5),e.keyCode==e.DOWN_ARROW&&(u=max(u-5,5)),e.keyCode==e.LEFT_ARROW&&(i+=5),e.keyCode==e.RIGHT_ARROW&&(i-=5)}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_1_2_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_2_01.png",
    userarts: [],
    code: 'function dataURLtoFile(e,o){let t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],o,{type:a})}let s=function(e){let o,t=0;e.setup=function(){e.createCanvas(600,600),e.noFill(),o=e.color(0,0,0,130)},e.draw=function(){e.translate(e.width/20/2,e.height/20/2),e.background(255),e.randomSeed(t),e.stroke(o),e.strokeWeight(e.mouseY/60);for(let o=0;o<20;o++)for(let t=0;t<20;t++){let a=e.width/20*t,n=e.height/20*o,i=e.random(-e.mouseX,e.mouseX)/20,c=e.random(-e.mouseX,e.mouseX)/20;e.ellipse(a+i,n+c,e.mouseY/15,e.mouseY/15)}},e.mousePressed=function(){t=e.random(1e5)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),t="";t=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",o);let n={async:!0,crossDomain:!0,url:t,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
];

Promise.all([User.deleteMany(), Codekunst.deleteMany(), Userart.deleteMany()])
.then (() => User.create(users))
.then (() => Codekunst.create(codekuenste))
.then (() => mongoose.disconnect())
.catch(err => {
  mongoose.disconnect();
  throw err;
});
