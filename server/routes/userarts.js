const express = require('express');
const Userart = require('../models/Userart')
const { isLoggedIn, isAdmin} = require('../middlewares')
const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/userarts');
  next()
})

// Route to get all userarts
router.get('/', (req, res, next) => {
  Userart.find()
    .then(userarts => {
      res.json(userarts);
    })
    .catch(err => next(err))
});

router.get('/ofUser/:userId', (req, res, next) => {
  Userart.find({_user: req.params.userId})
    .populate('_codekunst', 'projectcode')
    .populate('_user', 'username')
    .then(userarts => {
			console.log('TCL: userarts', userarts)
      res.json(userarts);
    })
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  Userart.findById(req.params.id)
    .populate('_user', 'username') // Just populate the username and the _id (default) of the creator
    .populate('_codekunst', 'projectcode') // Just populate the username and the _id (default) of the creator
    .then(userart => {
      res.json(userart);
    })
    .catch(err => next(err))
});

// Route to add a userart (protected)
router.post('/:codekunstid/', isLoggedIn, isAdmin, (req, res, next) => {
  let { pictureUrl } = req.body;
	console.log('TCL: pictureUrl', pictureUrl)
  // let _user = req.user._id // req.user contains information about the connected user //TODO: Add user again, when frontend is set up
  let _codekunst = req.params.codekunstid 
  // Userart.create({ pictureUrl, _codekunst, _user }) //TODO: Add user again, when frontend is set up
  Userart.create({ pictureUrl, _codekunst})
    .then(userart => {
      res.json({
        success: true,
        userart
      });
    })
    .catch(err => next(err))
});

// The route is DELETE /api/userarts/:id
router.delete('/:id', (req,res,next)=>{
  Userart.findByIdAndDelete(req.params.id)
    .then(userart => {
      res.json({
        message: "The userart was deleted",
        userart: userart // The deleted userart is sent
      })
    })
    .catch(err => next(err))
})

// The route is PUT /api/userarts/:id
router.put('/:id', (req,res,next)=>{
  Userart.findByIdAndUpdate(req.params.id, {
    pictureUrl: req.body.pictureUrl,
    // _codekunst: req.params.codekunstid, //TODO: Needed?
    // _user: req.user._id, //TODO: Add user again, when frontend is set up
  }, { new: true }) // To access the updated userart (and not the old userart)
    .then(userart => {
      res.json({
        message: "The userart has been updated",
        userart: userart
      })
    })
    .catch(err => next(err))
})

module.exports = router;
