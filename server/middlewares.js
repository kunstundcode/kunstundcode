function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

function isAdmin (req, res, next) {       //TODO: Check, if this works
  if (req.user.isAdmin) next()
  else next({ status: 403, message: 'Unauthorized. No Admin' })
}

module.exports = {
  isLoggedIn,
  isAdmin
}
