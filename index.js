const Hapi = require('@hapi/hapi')
const db = require('./dbConfig/index.js')
const config = require('config')
const Path = require('path')


const server = Hapi.server({
  port: config.get('Customer.server.port'),
  host: config.get('Customer.server.host')
})



server.route(require('./routes/auth.routes'))
server.route(require('./routes/board.routes'))
server.route(require('./routes/list.routes'))
server.route(require('./routes/item.routes'))

const init = async () => {
  try {
    await db.connect()
    await server.register(require('inert'))

    if (process.env.NODE_ENV === 'production') {
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
          directory: {
            path: './client/build',
            listing: false,
            index: true
          }
        }
      })
    }

    await server.start()
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