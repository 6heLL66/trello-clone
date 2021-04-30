const Sequelize = require('sequelize')
const config = require('config')

const sequelize = new Sequelize(
  config.get('Customer.db.name'),
  process.env.DB_USERNAME || config.get('Customer.db.username'),
  process.env.DB_PASSWORD || config.get('Customer.db.password'),
  {
    host: process.env.DB_HOST || config.get('Customer.db.host'),
    dialect: config.get('Customer.db.dialect')
  }
)

module.exports = {
  connect: async () => {
    return sequelize.authenticate()
  },
  sequelize
}
