const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Assignment 1</title></head>')
    res.write('<body>')
    res.write('<h1>Hello, Moto </h1>')
    res.write("<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form>")
    res.write('</body>')
    res.write('</html>')
    return res.end()
  }

  if (url === '/create-user' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => body.push(chunk))
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const newUserName = parsedBody.split('=')[1]
      console.log(newUserName)
    })
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  }

  if (url === '/users') {
    res.write('<html>')
    res.write('<head><title>Assignment 1</title></head>')
    res.write('<body><ul>')
    res.write('<li>User1</l1>')
    res.write('<li>User2</l1>')
    res.write('<li>User3</l1>')
    res.write('<li>User4</l1>')
    res.write('</ul></body>')
    res.write('</html>')
    return res.end()
  }
})

server.listen(3000)
