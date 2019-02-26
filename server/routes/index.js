const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares')
const router = express.Router();

router.get('/admin', isLoggedIn, isAdmin, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

module.exports = router;
