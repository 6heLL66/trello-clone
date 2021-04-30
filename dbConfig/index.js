const Sequelize = require('sequelize')
const config = require('config')

const sequelize = new Sequelize(
  config.get('Customer.db.name'),
  config.util.getEnv('DB_USERNAME') || config.get('Customer.db.username'),
  config.util.getEnv('DB_PASSWORD') || config.get('Customer.db.password'),
  {
    host: config.util.getEnv('DB_HOST') || config.get('Customer.db.host'),
    dialect: config.get('Customer.db.dialect')
  }
)

module.exports = {
  connect: async () => {
    return sequelize.authenticate()
  },
  sequelize
}
