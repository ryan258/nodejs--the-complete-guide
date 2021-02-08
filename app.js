const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter Message</title></head>')
    res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>")
    res.write('</html>')
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    // buffeer the chunks - on allows us to listen for events, in this case,
    // - data - which fires when a new piece of data is ready to be read
    // - fn - the function that will be exec for every data event
    const body = [] // push ready chunks to this array
    req.on('data', (chunk) => {
      // we get a chunk to do something with
      // console.log(chunk) // log out chunks -- ie <Buffer 8d 65 73 72...
      body.push(chunk)
      // and this will run until it's finished
    })
    // we'll always want to have this 'end' listener, runs when the request is finished
    return req.on('end', () => {
      // time to read in all the chunks we've processed
      // so the bus has stopped and we need to do something with it
      //! think of the Buffer as a bus stop
      const parsedBody = Buffer.concat(body).toString()
      // console.log(parsedBody) // got out key & value -- message=boogie+woogie
      const message = parsedBody.split('=')[1] // grab that value
      // we can make files in 2 modes
      // .writeFileSync() will block code execution until file is created/done
      // fs.writeFileSync('message.txt', message) // print that value to file
      // - instead use a nonblocking way to create the file
      // .writeFile('gileName', content, callback to be executed when done)
      fs.writeFile('message.txt', message, (err) => {
        // this should be sent when we're done working with the file
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  }
  // console.log(req.url, req.method, req.headers)
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>Home Page</title></head>')
  res.write('<body><h1>The front page, baby!</h1></body>')
  res.write('</html>')
  res.end()
})

server.listen(3000)
