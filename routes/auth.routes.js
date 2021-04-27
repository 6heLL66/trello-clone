const sequelize = require('../dbConfig/index').sequelize
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const Boom = require('@hapi/boom')
const isAuth = require('../middleweares/isAuth.middleweare')

const addUser = {
  method: 'PUT',
  path: '/api/auth/add',
  options: {
    validate: {
      payload: Joi.object({
        username: Joi.string().min(4).max(16),
        password: Joi.string().min(6).max(16)
      }).options({ stripUnknown: true })
    }
  },
  handler: async (req, reply) => {
    try {
      const { username, password } = req.payload
      const [users] = await sequelize.query('SELECT * FROM users')

      const duplicates = users.find((e) => e.username === username)

      if (duplicates) {
        return Boom.badRequest('Username must be unique.')
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const id = users.length

      await sequelize.query(
        `INSERT INTO users VALUES ('${id}', '${username}', '${hashedPassword}')`
      )

      return reply
        .response({ message: 'User was successfully created.' })
        .code(200)
    } catch (e) {
      return Boom.serverUnavailable(e.message)
    }
  }
}

const authUser = {
  method: 'POST',
  path: '/api/auth/auth',
  handler: async (req, reply) => {
    try {
      const { username, password } = req.payload
      const [users] = await sequelize.query('SELECT * FROM users')

      const exist = users.find((e) => e.username === username)

      if (!exist) {
        return Boom.badData('There are no users with this username.')
      }

      const equalPasswords = await bcrypt.compare(password, exist.password)

      if (!equalPasswords) {
        return Boom.badData('Invalid password.')
      }

      const token = jwt.sign(
        { id: exist.id, username },
        config.get('Customer.tokens.jwt_secret'),
        { expiresIn: '6h' }
      )
      return reply
        .response({
          token,
          username,
          userId: exist.id,
          message: 'Success auth'
        })
        .code(200)
    } catch (e) {
      return Boom.serverUnavailable(e.message)
    }
  }
}

const checkUser = {
  method: 'POST',
  path: '/api/auth/check',
  config: {
    pre: [
      { method: isAuth, assign: "auth" }
    ],
    handler: async (req, reply) => {
      return req.pre.auth
    }
  }
}

module.exports = [addUser, authUser, checkUser]
