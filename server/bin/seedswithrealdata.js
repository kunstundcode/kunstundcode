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
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){"use strict";var t,o;e.setup=function(){e.createCanvas(800,400),e.noStroke(),e.colorMode(e.HSB,e.width,e.height,100)},e.draw=function(){t=e.mouseX+2,o=e.mouseY+2;for(;0<e.height;e.gridY+=o)for(var a=0;a<e.width;a+=t)e.fill(a,e.height-0,100),e.rect(a,0,t,o)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=e.canvas.toDataURL("image/jpeg"),o=Date.now();console.log("TCL: p.keyPressed -> filename",o);let a=dataURLtoFile(t,o),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let i=new FormData;i.append("file",a);let c={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:i,xhrFields:{withCredentials:!0}};$.ajax(c).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_1_1_2_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_2_01.png",
    userarts: [],
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){var segmentCount=360;var radius=300;p.setup=function(){p.createCanvas(800,800);p.noStroke();} p.draw=function(){p.colorMode(p.HSB,360,p.width,p.height);p.background(360,0,p.height);var angleStep=360/segmentCount;p.beginShape(p.TRIANGLE_FAN);p.vertex(p.width/2,p.height/2);for(var angle=0;angle<=360;angle+=angleStep){var vx=p.width/2+p.cos(p.radians(angle))*radius;var vy=p.height/2+p.sin(p.radians(angle))*radius;p.vertex(vx,vy);p.fill(angle,p.mouseX,p.mouseY);} p.endShape();} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){console.log('Key Pressed!') let dataURL=p.canvas.toDataURL('image/jpeg');let filename=Date.now() console.log('TCL: p.keyPressed -> filename',filename) let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});} switch(p.key){case'1':segmentCount=360;break;case'2':segmentCount=45;break;case'3':segmentCount=24;break;case'4':segmentCount=12;break;case'5':segmentCount=6;break;}}} let myp5=new p5(s,document.getElementById('box'))"
  },
  {
    projectcode: "P_2_0_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_01.png",
    userarts: [],
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){p.setup=function(){p.createCanvas(550,550);p.strokeCap(p.SQUARE);} p.draw=function(){p.background(255);p.translate(p.width/2,p.height/2);var circleResolution=p.int(p.map(p.mouseY,0,p.height,2,80));var radius=p.mouseX-p.width/2;var angle=p.TAU/circleResolution;p.strokeWeight(p.mouseY/20);for(var i=0;i<=circleResolution;i++){var x=p.cos(angle*i)*radius;var y=p.sin(angle*i)*radius;p.line(0,0,x,y);}} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/jpeg');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});}}} let myp5=new p5(s,document.getElementById('box'))"
  },
  {
    projectcode: "P_2_0_02",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_02.png",
    userarts: [],
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){p.setup=function(){p.createCanvas(550,550);p.strokeCap(p.SQUARE);} p.draw=function(){p.background(255);p.translate(p.width/2,p.height/2);var circleResolution=p.int(p.map(p.mouseY,0,p.height,2,80));var radius=p.mouseX-p.width/2;var angle=p.TAU/circleResolution;p.strokeWeight(p.mouseY/20);for(var i=0;i<=circleResolution;i++){var x=p.cos(angle*i)*radius;var y=p.sin(angle*i)*radius;p.line(0,0,x,y);}} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/jpeg');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});}}} let myp5=new p5(s,document.getElementById('box'))"
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
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){let tileCount=10;let tileWidth;let tileHeight;let shapeSize=50;let newShapeSize=shapeSize;let shapeAngle=0;let maxDist;let currentShape;let shapes;let sizeMode=0;p.preload=function(){shapes=[];shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_6.svg'));shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_4.svg'));shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_3.svg'));shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_2.svg'));shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_5.svg'));shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_1.svg'));shapes.push(p.loadImage('https://res.cloudinary.com/djyjdargg/image/upload/v1551522590/KunstundCode-SRC/module_7.svg'));} p.setup=function(){p.createCanvas(600,600);p.imageMode(p.CENTER);currentShape=shapes[0];tileWidth=p.width/tileCount;tileHeight=p.height/tileCount;maxDist=p.sqrt(p.pow(p.width,2)+p.pow(p.height,2));} p.draw=function(){p.clear();for(let gridY=0;gridY<tileCount;gridY++){for(let gridX=0;gridX<tileCount;gridX++){let posX=tileWidth*gridX+tileWidth/2;let posY=tileHeight*gridY+tileWidth/2;let angle=p.atan2(p.mouseY-posY,p.mouseX-posX)+(shapeAngle*(p.PI/180));if(sizeMode==0)newShapeSize=shapeSize;if(sizeMode==1)newShapeSize=shapeSize*1.5-p.map(p.dist(p.mouseX,p.mouseY,posX,posY),0,500,5,shapeSize);if(sizeMode==2)newShapeSize=p.map(p.dist(p.mouseX,p.mouseY,posX,posY),0,500,5,shapeSize);p.push();p.translate(posX,posY);p.rotate(angle);p.noStroke();p.image(currentShape,0,0,newShapeSize,newShapeSize);p.pop();}}} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/png');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});} if(p.key=='d'||p.key=='D')sizeMode=(sizeMode+1)%3;if(p.key=='g'||p.key=='G'){tileCount+=5;if(tileCount>20){tileCount=10;} tileWidth=p.width/tileCount;tileHeight=p.height/tileCount;} if(p.key=='1')currentShape=shapes[0];} if(p.key=='2')currentShape=shapes[1];if(p.key=='3')currentShape=shapes[2];if(p.key=='4')currentShape=shapes[3];if(p.key=='5')currentShape=shapes[4];if(p.key=='6')currentShape=shapes[5];if(p.key=='7')currentShape=shapes[6];if(p.keyCode==p.UP_ARROW)shapeSize+=5;if(p.keyCode==p.DOWN_ARROW)shapeSize=max(shapeSize-5,5);if(p.keyCode==p.LEFT_ARROW)shapeAngle+=5;if(p.keyCode==p.RIGHT_ARROW)shapeAngle-=5;}} let myp5=new p5(s,document.getElementById('box'))"
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
