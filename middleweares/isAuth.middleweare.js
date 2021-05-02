const jwt = require('jsonwebtoken')
const config = require('config')
const Boom = require('@hapi/boom')

module.exports = function isAuth(req) {
  try {
    let token =
      req.method === 'post' || req.method === 'put'
        ? req.payload.token
        : req.query.token
    console.log(token)
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    return { ...req.payload, senderName: decoded.username, userId: decoded.id }
  } catch (e) {
    return Boom.badRequest('invalid token')
  }
}
