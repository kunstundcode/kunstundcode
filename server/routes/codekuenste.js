const express = require('express');
const Codekunst = require('../models/Codekunst')
const { isLoggedIn, isAdmin} = require('../middlewares')
const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/codekuenste');
  next()
})

// Route to get all codekuenste
router.get('/', (req, res, next) => {
  Codekunst.find()
    .then(codekuenste => {
      res.json(codekuenste);
    })
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  Codekunst.findById(req.params.id)
    .populate('_user', 'username') // Just populate the username and the _id (default) of the creator
    .then(codekunst => {
      res.json(codekunst);
    })
    .catch(err => next(err))
});

// Route to add a codekunst (protected)
router.post('/', (req, res, next) => {
  // router.post('/', isLoggedIn, (req, res, next) => {
  let { thumbnail, result, projectcode, url, code } = req.body
  // let _creator = req.user._id // req.user contains information about the connected user
  Codekunst.create({ thumbnail, result, projectcode, url, code })
    .then(codekunst => {
      res.json({
        success: true,
        codekunst
      });
    })
    .catch(err => next(err))
});

// The route is DELETE /api/codekuenste/:id
router.delete('/:id', (req,res,next)=>{
  Codekunst.findByIdAndDelete(req.params.id)
    .then(codekunst => {
      res.json({
        message: "The codekunst was deleted",
        codekunst: codekunst // The deleted codekunst is sent
      })
    })
    .catch(err => next(err))
})

// The route is PUT /api/codekuenste/:id
router.put('/:id', (req,res,next)=>{
  Codekunst.findByIdAndUpdate(req.params.id, {
    thumbnail: req.body.thumbnail,
    result: req.body.result,
    projectcode: req.body.projectcode,
    url: req.body.url,
    code: req.body.code,
  }, { new: true }) // To access the updated codekunst (and not the old codekunst)
    .then(codekunst => {
      res.json({
        message: "The codekunst has been updated",
        codekunst: codekunst
      })
    })
    .catch(err => next(err))
})

module.exports = router;
