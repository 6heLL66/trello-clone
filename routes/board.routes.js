const isAuth = require('../middleweares/isAuth.middleweare')
const Boom = require('@hapi/boom')
const sequelize = require('../dbConfig/index').sequelize

const createBoard = {
  method: 'PUT',
  path: '/api/board/createOrChange',
  config: {
    pre: [
      { method: isAuth, assign: "auth" }
    ],
    handler: async (req, reply) => {
      try {
        const { id, name, color } = req.payload

        const [find] = await sequelize.query(`SELECT * FROM boards WHERE id='${id}'`)

        if (find.length > 0) {
          await sequelize.query(`UPDATE boards SET name='${name}', color='${color}' WHERE id='${id}'`)
        } else {
          await sequelize.query(`INSERT INTO boards VALUES('${id}', '${name}', '${color}', '${req.pre.auth.senderId}')`)
        }

        return reply.response({}).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

const getBoard = {
  method: 'GET',
  path: '/api/board/get',
  config: {
    handler: async (req, reply) => {
      try {
        const { id } = req.query
        const [boards] = await sequelize.query(`SELECT * FROM boards WHERE id='${id}'`)
        return reply.response(boards[0]).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

const getBoards = {
  method: 'GET',
  path: '/api/boards/get',
  config: {
    handler: async (req, reply) => {
      try {
        const { id } = req.query
        const [boards] = await sequelize.query(`SELECT * FROM boards WHERE parentId='${id}'`)
        return reply.response(boards).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

const deleteBoard = {
  method: 'DELETE',
  path: '/api/board/delete',
  config: {
    pre: [
      { method: isAuth, assign: "auth" }
    ],
    handler: async (req, reply) => {
      try {
        const { id } = req.query
        await sequelize.query(`DELETE FROM boards WHERE id='${id}'`)
        return reply.response({}).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

module.exports = [createBoard, getBoard, getBoards, deleteBoard]