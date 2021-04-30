const Sequelize = require('sequelize')
const config = require('config')

const sequelize = new Sequelize(
  config.get('Customer.db.name'),
  config.get('Customer.db.username'),
  config.get('Customer.db.password'),
  {
    host: config.get('Customer.db.host'),
    dialect: config.get('Customer.db.dialect')
  }
)

module.exports = {
  connect: async () => {
    return sequelize.authenticate()
  },
  sequelize
}
