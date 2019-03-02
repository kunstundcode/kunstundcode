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
    url: "http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01",
    code: 'function dataURLtoFile(e,t){let o=e.split(","),a=o[0].match(/:(.*?);/)[1],n=atob(o[1]),i=n.length,c=new Uint8Array(i);for(;i--;)c[i]=n.charCodeAt(i);return new File([c],t,{type:a})}let s=function(e){"use strict";var t,o;e.setup=function(){e.createCanvas(800,400),e.noStroke(),e.colorMode(e.HSB,e.width,e.height,100)},e.draw=function(){t=e.mouseX+2,o=e.mouseY+2;for(;0<e.height;e.gridY+=o)for(var a=0;a<e.width;a+=t)e.fill(a,e.height-0,100),e.rect(a,0,t,o)},e.keyPressed=function(){if("s"===e.key||"S"===e.key){let t=e.canvas.toDataURL("image/jpeg"),o=Date.now();console.log("TCL: p.keyPressed -> filename",o);let a=dataURLtoFile(t,o),n="";n=window.location.origin.includes("localhost")?"http://localhost:5000/api/uploadPicture/"+projectcode:window.location.origin+"/api/uploadPicture/"+projectcode;let i=new FormData;i.append("file",a);let c={async:!0,crossDomain:!0,url:n,method:"POST",headers:{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:i,xhrFields:{withCredentials:!0}};$.ajax(c).done(function(e){console.log(e)})}}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_1_1_2_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_2_01.png",
    userarts: [],
    url: "http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01",
    code: `function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n)}
    return new File([u8arr],filename,{type:mime})}
    let s=function(p){var segmentCount=360;var radius=300;p.setup=function(){p.createCanvas(800,800);p.noStroke()}
    p.draw=function(){p.colorMode(p.HSB,360,p.width,p.height);p.background(360,0,p.height);var angleStep=360/segmentCount;p.beginShape(p.TRIANGLE_FAN);p.vertex(p.width/2,p.height/2);for(var angle=0;angle<=360;angle+=angleStep){var vx=p.width/2+p.cos(p.radians(angle))*radius;var vy=p.height/2+p.sin(p.radians(angle))*radius;p.vertex(vx,vy);p.fill(angle,p.mouseX,p.mouseY)}
    p.endShape()}
    p.keyPressed=function(){if(p.key==='s'||p.key==='S'){console.log("Key Pressed!")
    let dataURL=p.canvas.toDataURL("image/jpeg");let filename=Date.now()
    console.log('TCL: p.keyPressed -> filename',filename)
    let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url="http://localhost:5000/api/uploadPicture/"+projectcode
    else url=window.location.origin+"/api/uploadPicture/"+projectcode;let form=new FormData();form.append("file",file);let settings={"async":!0,"crossDomain":!0,"url":url,"method":"POST","headers":{"cache-control":"no-cache","Postman-Token":"c398ba57-8976-47e9-acc1-ec8e4c121b09"},"processData":!1,"contentType":!1,"mimeType":"multipart/form-data","data":form,"xhrFields":{"withCredentials":!0}}
    $.ajax(settings).done(function(response){console.log(response)})}
    switch(p.key){case '1':segmentCount=360;break;case '2':segmentCount=45;break;case '3':segmentCount=24;break;case '4':segmentCount=12;break;case '5':segmentCount=6;break}}}
    let myp5=new p5(s,document.getElementById("box"))`
  },
  {
    projectcode: "P_2_0_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_2_0_01.png",
    userarts: [],
    url: "http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01",
    code: "function dataURLtoFile(dataurl,filename){let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);} return new File([u8arr],filename,{type:mime});} let s=function(p){p.setup=function(){p.createCanvas(550,550);p.strokeCap(p.SQUARE);} p.draw=function(){p.background(255);p.translate(p.width/2,p.height/2);var circleResolution=p.int(p.map(p.mouseY,0,p.height,2,80));var radius=p.mouseX-p.width/2;var angle=p.TAU/circleResolution;p.strokeWeight(p.mouseY/20);for(var i=0;i<=circleResolution;i++){var x=p.cos(angle*i)*radius;var y=p.sin(angle*i)*radius;p.line(0,0,x,y);}} p.keyPressed=function(){if(p.key==='s'||p.key==='S'){let dataURL=p.canvas.toDataURL('image/jpeg');let filename=Date.now() let file=dataURLtoFile(dataURL,filename);let url='';if(window.location.origin.includes('localhost'))url='http://localhost:5000/api/uploadPicture/'+projectcode else url=window.location.origin+'/api/uploadPicture/'+projectcode;let form=new FormData();form.append('file',file);let settings={'async':true,'crossDomain':true,'url':url,'method':'POST','headers':{'cache-control':'no-cache','Postman-Token':'c398ba57-8976-47e9-acc1-ec8e4c121b09'},'processData':false,'contentType':false,'mimeType':'multipart/form-data','data':form,'xhrFields':{'withCredentials':true}} $.ajax(settings).done(function(response){console.log(response);});}}} let myp5=new p5(s,document.getElementById('box'))"
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