const http = require('http')

const routes = require('./routes') // whatever was exported will now be in the routes const
const server = http.createServer(routes) // execute the function stored in routes for incoming requests

server.listen(3000)
