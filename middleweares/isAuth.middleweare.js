const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function isAuth(req) {
  try {
    let decoded = jwt.verify(req.payload.token, config.get('Customer.tokens.jwt_secret'))
    return { ...req.payload, senderName: decoded.username, senderId: decoded.id }
  } catch (e) {
    return null
  }
}