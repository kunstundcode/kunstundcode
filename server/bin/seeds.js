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

let userarts = [
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550168765/Ironclass/IH_Jan1952.jpg.jpg" },
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550167977/Ironclass/IH_Jan1938.jpg.jpg" },
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550167937/Ironclass/IH_Jan1940.jpg.jpg" },
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550167904/Ironclass/IH_Jan1944.jpg.jpg" },
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550167875/Ironclass/IH_Jan1948.jpg.jpg" },
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550167744/Ironclass/IH_Jan1929.jpg.jpg" },
  { pictureUrl: "https://res.cloudinary.com/djyjdargg/image/upload/v1550167694/Ironclass/IH_Jan1941.jpg.jpg" },
]



Promise.all([User.deleteMany(), Codekunst.deleteMany(), Userart.deleteMany()])
.then (() => User.create(users))
.then (() => {
  let franziId, juliaId, codekunst1, codekunst2;
  Promise.all([User.find({username: "franzi"}), User.find({username: "julia"})])
  .then(values => {
    franziId = values[0][0]._id;
    juliaId = values[1][0]._id;
    for(let i = 0; i < 4; i++) {userarts[i]._user = franziId}
    for(let i = 4; i < userarts.length; i++) {userarts[i]._user = juliaId}
  })
  .then (() => Codekunst.create(codekuenste))
  .then ((foundcodekuenste) => {
    codekunst1 = foundcodekuenste[0]._id;
    codekunst2 = foundcodekuenste[1]._id;
    for(let i = 0; i < 4; i++) {userarts[i]._codekunst = codekunst1}
    for(let i = 4; i < userarts.length; i++) {userarts[i]._codekunst = codekunst2}
  })
  .then (() => Userart.create(userarts))
  .then ((alluserarts) => {
   Promise.all([Userart.find({_codekunst: mongoose.Types.ObjectId(codekunst1)}), Userart.find({_codekunst: mongoose.Types.ObjectId(codekunst2)})])
   .then(values => {
    let resultArr1 = [];
    let resultArr2 = [];
    values[0].forEach(item => resultArr1.push(item._id))
    values[1].forEach(item => resultArr2.push(item._id))
		console.log('TCL: resultArr1', resultArr1)
    console.log('TCL: resultArr2', resultArr2)
    Promise.all([
      Codekunst.findByIdAndUpdate(codekunst1,{ userarts: resultArr1}),
      Codekunst.findByIdAndUpdate(codekunst2,{ userarts: resultArr2})
    ])
    .then (() => mongoose.disconnect())
    .catch(err => {
      mongoose.disconnect();
      throw err;
    });
   })
   .catch(err => {
      mongoose.disconnect();
      throw err;
    });
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
})
.catch(err => {
  mongoose.disconnect();
  throw err;
});



// User.deleteMany()
//   .then(() => {
//     return User.create(users)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })

// Codekunst.deleteMany()
//   .then(() => {
//     return Codekunst.create(codekuenste)
//   })
//   .then(codekuensteCreated => {
//     console.log(`${codekuensteCreated.length} codekuenste created with the following id:`);
//     console.log(codekuensteCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })
