const getUniqueId = require('../helpers/getUniqueId')

const isAuth = require('../middleweares/isAuth.middleweare')
const Boom = require('@hapi/boom')
const sequelize = require('../dbConfig').sequelize

const createBoard = {
  method: 'PUT',
  path: '/api/board/createOrChange',
  config: {
    pre: [{ method: isAuth, assign: 'auth' }],
    handler: async (req, reply) => {
      try {
        const { name, color } = req.payload
        const [boards] = await sequelize.query(`SELECT * FROM boards`)
        let id = req.payload.id || getUniqueId(boards, 8)

        const find = boards.find((e) => e.id === id)

        if (find) {
          await sequelize.query(
            `UPDATE boards SET name='${name}', color='${color}' WHERE id='${id}'`
          )
        } else {
          await sequelize.query(
            `INSERT INTO boards VALUES('${id}', '${name}', '${color}', '${req.pre.auth.userId}')`
          )
        }

        return reply
          .response({ name, color, id, parentId: req.pre.auth.userId })
          .code(200)
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
        const [boards] = await sequelize.query(
          `SELECT * FROM boards WHERE id='${id}'`
        )
        const [lists] = await sequelize.query(
          `SELECT * FROM lists WHERE parentId='${id}'`
        )
        let items = []
        for (let i = 0; i < lists.length; i++) {
          const [listItems] = await sequelize.query(
            `SELECT * FROM items WHERE parentId='${lists[i].id}'`
          )
          items = [...items, ...listItems]
        }
        return reply.response({ board: boards[0], lists, items }).code(200)
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
        const [boards] = await sequelize.query(
          `SELECT * FROM boards WHERE parentId='${id}'`
        )
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
    pre: [{ method: isAuth, assign: 'auth' }],
    handler: async (req, reply) => {
      try {
        const { id } = req.query
        await sequelize.query(`DELETE FROM boards WHERE id='${id}'`)
        const [lists] = await sequelize.query(
          `SELECT * FROM lists WHERE parentId='${id}'`
        )

        for (let i = 0; i < lists.length; i++) {
          await sequelize.query(
            `DELETE FROM items WHERE parentId='${lists[i].id}'`
          )
        }

        await sequelize.query(`DELETE FROM lists WHERE parentId='${id}'`)

        return reply.response({ message: 'Board Deleted' }).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

module.exports = [createBoard, getBoard, getBoards, deleteBoard]
