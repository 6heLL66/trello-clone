const Boom = require('@hapi/boom')
const sequelize = require('../dbConfig').sequelize
const isAuth = require('../middleweares/isAuth.middleweare')
const getUniqueId = require('../helpers/getUniqueId')

const putItems = {
  method: 'PUT',
  path: '/api/items/put',
  config: {
    pre: [{ method: isAuth, assign: 'auth' }],
    handler: async (req, h) => {
      try {
        const { data, ownerId } = req.payload
        const [items] = await sequelize.query(`SELECT * FROM items`)

        if (ownerId !== req.pre.auth.userId) {
          return Boom.badRequest('You have no permission for that.')
        }

        for (let i = 0; i < data.length; i++) {
          if (!data[i].id) data[i].id = getUniqueId(items, 8)
          const find = items.find((e) => e.id === data[i].id)

          if (find) {
            await sequelize.query(
              `UPDATE items SET name='${data[i].name}', isDone='${data[i].isDone}', ind='${data[i].ind}', parentId='${data[i].parentId}' WHERE id=${data[i].id}`
            )
          } else {
            await sequelize.query(
              `INSERT INTO items VALUES('${data[i].id}', '${data[i].name}', '${data[i].isDone}', '${data[i].parentId}', '${data[i].ind}', '${req.pre.auth.userId}')`
            )
          }
        }
        const [newItems] = await sequelize.query(
          `SELECT * FROM items WHERE ownerId=${ownerId}`
        )
        return h.response([...newItems]).code(200)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    }
  }
}

const deleteItem = {
  method: 'DELETE',
  path: '/api/item/delete',
  config: {
    pre: [{ method: isAuth, assign: 'auth' }],
    handler: async (req, h) => {
      try {
        const { id } = req.query

        await sequelize.query(`DELETE FROM items WHERE id='${id}'`)

        return h.response({ message: 'Item Deleted' }).code(200)
      } catch (e) {
        return Boom.badRequest('Server error.')
      }
    }
  }
}

module.exports = [putItems, deleteItem]
