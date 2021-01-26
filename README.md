## Get a server running

- require the `http` module
- create a server var `http.createServer(res)` that responds to every request
- NodeJS relies heavily on event driven architecture (if x happens do y)
- run `$ node app.js` to start the server
- get server listening `server.listen(<portNumber>)`

Once you have your server going, it's just time to start doing something meaningful with it.

## Sending Responses

- `res.setHeader('Content-Type', 'text/html');` will attach a header to our response that passes along in the header that the content is HTML.
- there are other headers, but there really aren't that many to concern yourself with
- you can then proceed to write HTML for your response `res.write('line of html');`
- then finally cap it off with `res.end();` after end() there's no more writing because this will already have been sent off to the client
