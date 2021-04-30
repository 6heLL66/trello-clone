const Sequelize = require('sequelize')
const config = require('config')


const sequelize = new Sequelize(
  config.get('Customer.db.name'),
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: config.get('Customer.db.dialect')
  }
)

module.exports = {
  connect: async () => {
    return sequelize.authenticate()
  },
  sequelize
}
