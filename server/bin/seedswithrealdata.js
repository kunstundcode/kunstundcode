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
    url: "http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_0_01",
    code: 'var s=function(e){console.log(e),e.setup=function(){e.createCanvas(720,720),e.noCursor(),e.colorMode(e.HSB,360,100,100),e.rectMode(e.CENTER),e.noStroke()},e.draw=function(){e.background(e.mouseY/2,100,100),e.fill(360-e.mouseY/2,100,100),e.rect(360,360,e.mouseX+1,e.mouseX+1)},e.keyPressed=function(){"s"!=e.key&&"S"!=e.key||e.saveCanvas("k","png")}},myp5=new p5(s,document.getElementById("box"));'
  },
  {
    projectcode: "P_1_1_1_01",
    thumbnail: "http://www.generative-gestaltung.de/2/img/P_1_1_1_01.png",
    userarts: [],
    url: "http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01",
    code: '"use strict";var stepX;var stepY;function setup(){createCanvas(800,400);noStroke();colorMode(HSB,width,height,100)}function draw(){stepX=mouseX+2;stepY=mouseY+2;for(var b=0;b<height;b+=stepY){for(var a=0;a<width;a+=stepX){fill(a,height-b,100);rect(a,b,stepX,stepY)}}}function keyPressed(){if(key=="s"||key=="S"){saveCanvas(gd.timestamp(),"png")}};'
  }
];

Promise.all([User.deleteMany(), Codekunst.deleteMany(), Userart.deleteMany()])
.then (() => User.create(users))
.then (() => Codekunst.create(codekuenste))
.catch(err => {
  mongoose.disconnect();
  throw err;
});
