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
    description: `changing colors and size by moving the mouse

    MOUSE
    position x          : size
    position y          : color
    
    KEYS
    s                   : save png`,
    code: 'function dataURLtoFile(e,o){let t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],o,{type:a})}let s=function(e){e.setup=function(){e.createCanvas(720,720),e.noCursor(),e.colorMode(e.HSB,360,100,100),e.rectMode(e.CENTER),e.noStroke()},e.draw=function(){e.background(e.mouseY/2,100,100),e.fill(360-e.mouseY/2,100,100),e.rect(360,360,e.mouseX+1,e.mouseX+1)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=e.canvas.toDataURL("image/jpeg"),t=Date.now();console.log("TCL: p.keyPressed -> filename",t);let a=dataURLtoFile(o,t),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let c=new FormData;c.append("file",a);let i={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:c,xhrFields:{withCredentials:!0}};$.ajax(i).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  // {
  //   projectcode: "P_1_1_1_01",
  //   thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_1_01.png",
  //   userarts: [],
  //   code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],t,{type:a})}let s=function(e){let t,o;e.setup=function(){e.createCanvas(800,400),e.noStroke(),e.colorMode(e.HSB,e.width,e.height,100)},e.draw=function(){t=e.mouseX+2,o=e.mouseY+2;for(let a=0;a<e.height;a+=o)for(let n=0;n<e.width;n+=t)e.fill(n,e.height-a,100),e.rect(n,a,t,o)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){console.log("Key Pressed!");let t=e.canvas.toDataURL("image/jpeg"),o=Date.now();console.log("TCL: p.keyPressed -> filename",o);let a=dataURLtoFile(t,o),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let c=new FormData;c.append("file",a);let i={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:c,xhrFields:{withCredentials:!0}};$.ajax(i).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  // },
  {
    projectcode: "P_1_1_2_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_2_01.png",
    userarts: [],
    description: `changing the color circle by moving the mouse.

    MOUSE
    position x          : saturation
    position y          : brighness
    
    KEYS
    1-5                 : number of segments
    s                   : save png`,
    code: 'function dataURLtoFile(e,a){let t=e.split(","),o=t[0].match(/:(.*?);/)[1],n=atob(t[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],a,{type:o})}let s=function(e){var a=360;e.setup=function(){e.createCanvas(800,800),e.noStroke()},e.draw=function(){e.colorMode(e.HSB,360,e.width,e.height),e.background(360,0,e.height);var t=360/a;e.beginShape(e.TRIANGLE_FAN),e.vertex(e.width/2,e.height/2);for(var o=0;o<=360;o+=t){var n=e.width/2+300*e.cos(e.radians(o)),c=e.height/2+300*e.sin(e.radians(o));e.vertex(n,c),e.fill(o,e.mouseX,e.mouseY)}e.endShape()},e.keyPressed=function(){if("s"===e.key||"S"===e.key){console.log("Key Pressed!");let a=e.canvas.toDataURL("image/jpeg"),t=Date.now();console.log("TCL: p.keyPressed -> filename",t);let o=dataURLtoFile(a,t),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let c=new FormData;c.append("file",o);let i={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:c,xhrFields:{withCredentials:!0}};$.ajax(i).done(function(e){console.log(e)})}switch(e.key){case"1":a=360;break;case"2":a=45;break;case"3":a=24;break;case"4":a=12;break;case"5":a=6}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_0_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_01.png",
    userarts: [],
    description: `drawing a filled circle with lines.

    MOUSE
    position x          : length
    position y          : thickness and number of lines
    
    KEYS
    s                   : save png`,
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){e.setup=function(){e.createCanvas(550,550),e.strokeCap(e.SQUARE)},e.draw=function(){e.background(255),e.translate(e.width/2,e.height/2);var t=e.int(e.map(e.mouseY,0,e.height,2,80)),o=e.mouseX-e.width/2,a=e.TAU/t;e.strokeWeight(e.mouseY/20);for(var n=0;n<=t;n++){var i=e.cos(a*n)*o,c=e.sin(a*n)*o;e.line(0,0,i,c)}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/jpeg"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_0_02",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_02.png",
    userarts: [],
    description: `drawing with a changing shape by draging the mouse.

    MOUSE
    position x          : length
    position y          : thickness and number of lines
    drag                : draw
    
    KEYS
    del, backspace      : erase
    s                   : save png
    `,
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){e.setup=function(){e.createCanvas(720,720),e.noFill(),e.background(255),e.strokeWeight(2),e.stroke(0,25)},e.draw=function(){if(e.mouseIsPressed&&e.mouseButton==e.LEFT){e.push(),e.translate(e.width/2,e.height/2);var t=e.int(e.map(e.mouseY+100,0,e.height,2,10)),o=e.mouseX-e.width/2,a=e.TAU/t;e.beginShape();for(var n=0;n<=t;n++){var i=e.cos(a*n)*o,c=e.sin(a*n)*o;e.vertex(i,c)}e.endShape(),e.pop()}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/jpeg"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_0_03",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_03.png",
    userarts: [],
    description: `drawing with a changing shape by draging the mouse.

    MOUSE
    position x          : length
    position y          : thickness and number of lines
    drag                : draw
    
    KEYS
    1-3                 : stroke color
    del, backspace      : erase
    s                   : save png`,
    code: 'function dataURLtoFile(e,o){let t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],o,{type:a})}let s=function(e){let o;e.setup=function(){e.createCanvas(720,720),e.colorMode(e.HSB,360,100,100,100),e.noFill(),e.background(0,0,100),e.strokeWeight(2),o=e.color(0,10)},e.draw=function(){if(e.mouseIsPressed&&e.mouseButton==e.LEFT){e.push(),e.translate(e.width/2,e.height/2);let t=e.int(e.map(e.mouseY+100,0,e.height,2,10)),a=e.mouseX-e.width/2,n=e.TAU/t;e.stroke(o),e.beginShape();for(let o=0;o<=t;o++){let t=e.cos(n*o)*a,c=e.sin(n*o)*a;e.vertex(t,c)}e.endShape(),e.pop()}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/jpeg"),Date.now()),t="";t=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",o);let n={async:!0,crossDomain:!0,url:t,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}e.keyCode!=e.DELETE&&e.keyCode!=e.BACKSPACE||e.background(0,0,100),"1"==e.key&&(o=e.color(0,10)),"2"==e.key&&(o=e.color(192,100,64,10)),"3"==e.key&&(o=e.color(52,100,71,10))}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_1_1_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_1_01.png",
    userarts: [],
    description: `changing strokeweight and strokecaps on diagonals in a grid

    MOUSE
    position x          : left diagonal strokeweight
    position y          : right diagonal strokeweight
    left click          : new random layout
    
    KEYS
    1                   : round strokecap
    2                   : square strokecap
    3                   : project strokecap
    s                   : save png`,
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){var t,o=0;e.setup=function(){e.createCanvas(600,600),e.background(0,0,100),t=e.ROUND},e.draw=function(){e.clear(),e.strokeCap(t),e.randomSeed(o);for(var a=0;a<20;a++)for(var n=0;n<20;n++){var i=e.width/20*n,c=e.height/20*a,r=e.int(e.random(0,2));0==r&&(e.strokeWeight(e.mouseX/20),e.line(i,c,i+e.width/20,c+e.height/20)),1==r&&(e.strokeWeight(e.mouseY/20),e.line(i,c+e.width/20,i+e.height/20,c))}},e.mousePressed=function(){o=e.random(1e5)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}"1"==e.key&&(t=e.ROUND),"2"==e.key&&(t=e.SQUARE),"3"==e.key&&(t=e.PROJECT)}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_1_1_02",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_1_02.png",
    userarts: [],
    description: `changing strokeweight on diagonals in a grid with colors

    MOUSE
    position x          : left diagonal strokeweight
    position y          : right diagonal strokeweight
    left click          : new random layout
    
    KEYS
    s                   : save png
    1                   : round strokecap
    2                   : square strokecap
    3                   : project strokecap
    4                   : color left diagonal
    5                   : color right diagonal
    6                   : transparency left diagonal
    7                   : transparency right diagonal
    0                   : default`,
    code: 'function dataURLtoFile(e,o){let t=e.split(","),r=t[0].match(/:(.*?);/)[1],a=atob(t[1]),n=a.length,c=new Uint8Array(n);for(;n--;)c[n]=a.charCodeAt(n);return new File([c],o,{type:r})}let s=function(e){var o,t,r,a=0,n=255,c=255;e.setup=function(){e.createCanvas(600,600),o=e.ROUND,t=e.color(197,0,123,n),r=e.color(87,35,129,c)},e.draw=function(){e.clear(),e.strokeCap(o),e.randomSeed(a);for(var n=0;n<20;n++)for(var c=0;c<20;c++){var l=e.width/20*c,i=e.height/20*n,s=e.int(e.random(0,2));0==s&&(e.stroke(t),e.strokeWeight(e.mouseX/10),e.line(l,i,l+e.width/20,i+e.height/20)),1==s&&(e.stroke(r),e.strokeWeight(e.mouseY/10),e.line(l,i+e.width/20,l+e.height/20,i))}},e.mousePressed=function(){a=e.random(1e5)},e.colorsEqual=function(e,o){return e.toString()==o.toString()},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),t="";t=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let r=new FormData;r.append("file",o);let a={async:!0,crossDomain:!0,url:t,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:r,xhrFields:{withCredentials:!0}};$.ajax(a).done(function(e){console.log(e)})}"1"==e.key&&(o=e.ROUND),"2"==e.key&&(o=e.SQUARE),"3"==e.key&&(o=e.PROJECT);var a=e.color(0,0,0,255);"4"==e.key&&(t=colorsEqual(t,a)?e.color(197,0,123,n):e.color(0,0,0,n)),"5"==e.key&&(r=colorsEqual(r,a)?e.color(87,35,129,c):e.color(0,0,0,c)),"6"==e.key&&(n=255==n?127:255,t=e.color(red(t),green(t),blue(t),n)),"7"==e.key&&(c=255==c?127:255,r=e.color(red(r),green(r),blue(r),c)),"0"==e.key&&(o=e.ROUND,n=255,c=255,t=e.color(0,0,0,n),r=e.color(0,0,0,c))}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_1_1_04",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_1_04.png",
    userarts: [],
    description: `shapes in a grid, that are always facing the mouse

    MOUSE
    position x/y        : position to face
    
    KEYS
    1-7                 : choose shapes
    arrow up/down       : scale of shapes
    arrow left/right    : additional rotation of shapes
    d                   : toggle size depending on distance
    g                   : toggle grid resolution
    s                   : save png`,
    code: 'function dataURLtoFile(e,o){let a=e.split(","),t=a[0].match(/:(.*?);/)[1],d=atob(a[1]),n=d.length,s=new Uint8Array(n);for(;n--;)s[n]=d.charCodeAt(n);return new File([s],o,{type:t})}let s=function(e){let o,a,t,d,n,s=10,u=50,l=u,i=0,r=0;e.preload=function(){(n=[]).push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_6.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_4.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_3.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_2.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_5.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522589/KunstundCode-SRC/module_1.svg")),n.push(e.loadImage("https://res.cloudinary.com/djyjdargg/image/upload/v1551522590/KunstundCode-SRC/module_7.svg"))},e.setup=function(){e.createCanvas(600,600),e.imageMode(e.CENTER),d=n[0],o=e.width/s,a=e.height/s,t=e.sqrt(e.pow(e.width,2)+e.pow(e.height,2))},e.draw=function(){e.clear();for(let t=0;t<s;t++)for(let n=0;n<s;n++){let s=o*n+o/2,c=a*t+o/2,m=e.atan2(e.mouseY-c,e.mouseX-s)+i*(e.PI/180);0==r&&(l=u),1==r&&(l=1.5*u-e.map(e.dist(e.mouseX,e.mouseY,s,c),0,500,5,u)),2==r&&(l=e.map(e.dist(e.mouseX,e.mouseY,s,c),0,500,5,u)),e.push(),e.translate(s,c),e.rotate(m),e.noStroke(),e.image(d,0,0,l,l),e.pop()}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),a="";a=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let t=new FormData;t.append("file",o);let d={async:!0,crossDomain:!0,url:a,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:t,xhrFields:{withCredentials:!0}};$.ajax(d).done(function(e){console.log(e)})}"d"!=e.key&&"D"!=e.key||(r=(r+1)%3),"g"!=e.key&&"G"!=e.key||((s+=5)>20&&(s=10),o=e.width/s,a=e.height/s),"1"==e.key&&(d=n[0]),"2"==e.key&&(d=n[1]),"3"==e.key&&(d=n[2]),"4"==e.key&&(d=n[3]),"5"==e.key&&(d=n[4]),"6"==e.key&&(d=n[5]),"7"==e.key&&(d=n[6]),e.keyCode==e.UP_ARROW&&(u+=5),e.keyCode==e.DOWN_ARROW&&(u=max(u-5,5)),e.keyCode==e.LEFT_ARROW&&(i+=5),e.keyCode==e.RIGHT_ARROW&&(i-=5)}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_1_2_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_2_01.png",
    userarts: [],
    description: `changing size and position of circles in a grid

    MOUSE
    position x          : circle position
    position y          : circle size
    left click          : random position
    
    KEYS
    s                   : save png`,
    code: 'function dataURLtoFile(e,o){let t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],o,{type:a})}let s=function(e){let o,t=0;e.setup=function(){e.createCanvas(600,600),e.noFill(),o=e.color(0,0,0,130)},e.draw=function(){e.translate(e.width/20/2,e.height/20/2),e.background(255),e.randomSeed(t),e.stroke(o),e.strokeWeight(e.mouseY/60);for(let o=0;o<20;o++)for(let t=0;t<20;t++){let a=e.width/20*t,n=e.height/20*o,i=e.random(-e.mouseX,e.mouseX)/20,c=e.random(-e.mouseX,e.mouseX)/20;e.ellipse(a+i,n+c,e.mouseY/15,e.mouseY/15)}},e.mousePressed=function(){t=e.random(1e5)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),t="";t=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",o);let n={async:!0,crossDomain:!0,url:t,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_2_1_2_03",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_2_03.png",
    userarts: [],
    description: `changing size of circles in a rad grid depending the mouseposition

    MOUSE
    position x/y        : module size and offset z
    
    KEYS
    s                   : save png
    `,
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),c=n.length,i=new Uint8Array(c);for(;c--;)i[c]=n.charCodeAt(c);return new File([i],t,{type:a})}let s=function(e){var t;e.setup=function(){e.createCanvas(600,600),e.noFill(),e.strokeWeight(3),t=e.color(0,0,0,180)},e.draw=function(){e.clear(),e.stroke(t);for(var o=0;o<e.width;o+=25)for(var a=0;a<e.height;a+=25){var n=e.dist(e.mouseX,e.mouseY,a,o);n=n/500*40,e.push(),e.translate(a,o,5*n),e.rect(0,0,n,n),e.pop()}},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  // {
  //   projectcode: "P_2_1_3_01",
  //   thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_1_3_01.png",
  //   userarts: [],
  //   code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,l=new Uint8Array(i);for(;i--;)l[i]=n.charCodeAt(i);return new File([l],t,{type:a})}let s=function(e){let t=0,o=0,a=0,n=0,i=0,l=0;e.setup=function(){e.createCanvas(800,800),t=e.width/10,o=e.height/10,e.noFill(),e.stroke(0,128)},e.draw=function(){e.background(255),e.randomSeed(l),e.translate(t/2,o/2),a=e.mouseX/30+1,n=e.map(e.mouseX,0,e.max(e.width,e.mouseX),t/2,0),i=e.map(e.mouseY,0,e.max(e.height,e.mouseY),0,(t-n)/2);for(let l=0;l<=10;l++)for(let c=0;c<=10;c++){e.push(),e.translate(t*c,o*l),e.scale(1,o/t);let r=e.int(e.random(0,4));0==r&&e.rotate(-e.HALF_PI),1==r&&e.rotate(0),2==r&&e.rotate(e.HALF_PI),3==r&&e.rotate(e.PI);for(let o=0;o<a;o++){let l=e.map(o,0,a,t,n),c=e.map(o,0,a,0,i);e.ellipse(c,0,l,l)}e.pop()}},e.mousePressed=function(){l=e.random(1e5)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),o="";o=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",t);let n={async:!0,crossDomain:!0,url:o,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  // },
  {
    projectcode: "P_2_2_3_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_2_3_01.png",
    userarts: [],
    description: `form mophing process by connected random agents

    MOUSE
    click               : start a new circe
    position x/y        : direction of floating
    
    KEYS
    1-2                 : fill styles
    f                   : freeze. loop on/off
    Delete/Backspace    : clear display
    s                   : save png`,
    code: 'function dataURLtoFile(e,o){let t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),r=n.length,c=new Uint8Array(r);for(;r--;)c[r]=n.charCodeAt(r);return new File([c],o,{type:a})}let s=function(e){var o,t,a=[],n=[],r=!1,c=!1;e.setup=function(){e.createCanvas(800,800),o=e.width/2,t=e.height/2;for(var r=e.radians(24),c=0;c<15;c++)a.push(150*e.cos(r*c)),n.push(150*e.sin(r*c));e.stroke(0,50),e.strokeWeight(.75),e.background(255)},e.draw=function(){o+=.01*(e.mouseX-o),t+=.01*(e.mouseY-t);for(var c=0;c<15;c++)a[c]+=e.random(-2,2),n[c]+=e.random(-2,2);r?e.fill(e.random(255)):e.noFill(),e.beginShape(),e.curveVertex(a[14]+o,n[14]+t);for(c=0;c<15;c++)e.curveVertex(a[c]+o,n[c]+t);e.curveVertex(a[0]+o,n[0]+t),e.curveVertex(a[1]+o,n[1]+t),e.endShape()},e.mousePressed=function(){o=e.mouseX,t=e.mouseY;for(var r=e.radians(24),c=(e.random(.5,1),0);c<15;c++)a[c]=150*e.cos(r*c),n[c]=150*e.sin(r*c)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let o=dataURLtoFile(e.canvas.toDataURL("image/png"),Date.now()),t="";t=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let a=new FormData;a.append("file",o);let n={async:!0,crossDomain:!0,url:t,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a,xhrFields:{withCredentials:!0}};$.ajax(n).done(function(e){console.log(e)})}e.keyCode!=e.DELETE&&e.keyCode!=e.BACKSPACE||e.background(255),"1"==e.key&&(r=!1),"2"==e.key&&(r=!0),"f"!=e.key&&"F"!=e.key||(c=!c),c?e.noLoop():e.loop()}},myp5=new p5(s,document.getElementById("box"));'
  }
];

Promise.all([User.deleteMany(), Codekunst.deleteMany(), Userart.deleteMany()])
.then (() => User.create(users))
.then (() => Codekunst.create(codekuenste))
.then (() => mongoose.disconnect())
.catch(err => {
  mongoose.disconnect();
  throw err;
});
