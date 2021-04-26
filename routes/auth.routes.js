const sequelize = require('../dbConfig/index').sequelize
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const addUser = {
  method: 'POST',
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

      const duplicates = users.find(e => e.username === username)

      if (duplicates) {
        return reply.response({ message: "Error: Username must be unique." }).code(400)
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const id = users.length

      await sequelize.query(`INSERT INTO users VALUES ('${id}', '${username}', '${hashedPassword}')`)

      return reply.response({ message: "User was successfully created." }).code(200)
    } catch (e) {
      return reply.response({ message: e.message }).code(500)
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

      const exist = users.find(e => e.username === username)

      if (!exist) {
        return reply.response({ message: "Error: There are no users with this username." }).code(400)
      }

      const equalPasswords = await bcrypt.compare(password, exist.password)

      if (!equalPasswords) {
        return reply.response({ message: "Error: Invalid password." }).code(400)
      }

      const token = jwt.sign(
        { id: exist.id, username },
        config.get('Customer.tokens.jwt_secret'),
        { expiresIn: "6h" }
      )
      return reply.response({ token, username, message: "Success auth" }).code(200)

    } catch (e) {
      return reply.response({ message: e.message }).code(500)
    }
  }
}

module.exports = [
  addUser,
  authUser
]