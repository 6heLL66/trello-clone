const Boom = require('@hapi/boom')
const sequelize = require('../dbConfig').sequelize
const isAuth = require('../middleweares/isAuth.middleweare')
const { nanoid } = require('nanoid')

const getLists = {
  method: 'GET',
  path: '/api/lists/get',
  config: {
    handler: async (req, h) => {
      try {
        const { id } = req.query
        const lists = await sequelize.query(
          `SELECT * FROM lists WHERE parentId='${id}'`
        )

        return h.response(lists).code(200)
      } catch (e) {
        return Boom.badRequest('Server error')
      }
    }
  }
}

const putList = {
  method: 'PUT',
  path: '/api/lists/put',
  config: {
    pre: [{ method: isAuth, assign: 'auth' }],
    handler: async (req, h) => {
      try {
        const { ownerId, data, id } = req.payload
        const [lists] = await sequelize.query(`SELECT * FROM lists`)

        if (ownerId !== req.pre.auth.userId) {
          return Boom.badRequest('You have no permission for that.')
        }

        for (let i = 0; i < data.length; i++) {
          if (!data[i].id) data[i].id = nanoid(8)
          const find = lists.find((e) => e.id === data[i].id)

          if (find) {
            await sequelize.query(
              `UPDATE lists SET name='${data[i].name}', ind='${data[i].ind}' WHERE id='${data[i].id}'`
            )
          } else {
            await sequelize.query(
              `INSERT INTO lists VALUES('${data[i].id}', '${data[i].name}', '${data[i].parentId}', '${data[i].ind}', '${req.pre.auth.userId}')`
            )
          }
        }

        const [newLists] = await sequelize.query(
          `SELECT * FROM lists WHERE parentId='${id}'`
        )

        return h.response([...newLists]).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

const deleteList = {
  method: 'DELETE',
  path: '/api/list/delete',
  config: {
    pre: [{ method: isAuth, assign: 'auth' }],
    handler: async (req, h) => {
      try {
        const { id } = req.query

        await sequelize.query(`DELETE FROM lists WHERE id='${id}'`)
        await sequelize.query(`DELETE FROM items WHERE parentId='${id}'`)

        return h.response({ message: 'List Deleted' }).code(200)
      } catch (e) {
        return Boom.badRequest('Server error.')
      }
    }
  }
}

module.exports = [getLists, putList, deleteList]
