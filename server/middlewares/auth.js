const jwt = require('jsonwebtoken')

function userAuthentication(req, res, next) {
   try {
      if(!req.headers || !req.headers.token) throw {
         errorCode: 401,
         message: 'This action requires user authentication'
      }

      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)

      req.userId = decoded.userId
   }
   catch (error) {
      if(error.name == 'JsonWebTokenError') next({
         errorCode: 400,
         message: 'Invalid authentication'
      })
      else next(error)
   }
}

function userAuthorization(req, res, next) {}

module.exports = {
   userAuthentication,
   userAuthorization
}