const Hapi = require('@hapi/hapi')
const db = require('./dbConfig/index.js')

const server = Hapi.server({
  port: 5000,
  host: 'localhost'
})

server.route({
  method: 'GET',
  path: '/',
  handler: (req, h) => {
    return 'HELLO WORLD'
  }
})

server.route(require('./routes/auth.routes'))

const init = async () => {
  try {
    await db.connect()
    await server.start()
    //const [res, data] = await db.sequelize.query(`INSERT INTO users VALUES (0, 'test', 'test')`)
    console.log('Server running on %s', server.info.uri)
  } catch(err) {
    throw err
  }
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()