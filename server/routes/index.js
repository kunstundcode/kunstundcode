const express = require('express');
const mongoose = require("mongoose");
const Codekunst = require('../models/Codekunst');
const Userart = require('../models/Userart');
const { isLoggedIn, isAdmin } = require('../middlewares');
const router = express.Router();
const upload = require("../configs/cloudinary")

router.get('/admin', isLoggedIn, isAdmin, (req, res, next) => {
  console.log(req.user)
  res.json({
    secret: 42,
    user: req.user
  });
});

router.get('/profile', (req, res, next) => {
  res.json(req.user)
});

router.post('/uploadPicture/:projectCode', isLoggedIn,upload.single("file"), (req, res, next) => {
  let projectCode = req.params.projectCode;
  let receivedFileUrl = req.file.secure_url;
  Codekunst.find({ "projectcode" : projectCode})
  .then((foundCodeKunst) => {
    let newUserArt = {
      pictureUrl: receivedFileUrl,
      _codekunst: mongoose.Types.ObjectId(foundCodeKunst[0]._id),
      _user: req.user._id
    }
    Userart.create(newUserArt)
    .then(createdArt => Codekunst.findByIdAndUpdate(createdArt._codekunst,
      {$push: {userarts: mongoose.Types.ObjectId(createdArt._id)}}
    ))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})


module.exports = router;
