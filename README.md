## Get a server running

- require the `http` module
- create a server var `http.createServer(res)` that responds to every request
- NodeJS relies heavily on event driven architecture (if x happens do y)
- run `$ node app.js` to start the server
- get server listening `server.listen(<portNumber>)`

Once you have your server going, it's just time to start doing something meaningful with it.

## Understanding Requests

In your server, check somethings out in the response with `console.log(req.url, req.method, req.headers)`

## Sending Responses

- `res.setHeader('Content-Type', 'text/html');` will attach a header to our response that passes along in the header that the content is HTML.
- there are other headers, but there really aren't that many to concern yourself with
- you can then proceed to write HTML for your response `res.write('line of html');`
- then finally cap it off with `res.end();` after end() there's no more writing because this will already have been sent off to the client

## Routing Requests

Do different things depending on the route that is visited.

## Redirecting Requests

## Parsing Request Bodies

- note the `Buffer` object
- we can work with the name attribute on the input

## Understanding Event Driven Code

- heavily used nodeJS pattern: pass in function to functions that will be run at a later point in time, asyncronously
- think of nodeJS as having an internal registry of events
- but the loop will not pause
- wrap your head around the fact that you are registering functions that will not necessarily run right away, like you're merely registering callback most of the time , otherwise node would have to keep pausing at each step and slow everything down until it's done
- register things with the loop, then run things as they're due to be executed
- you don't want to block that loop!

## Blocking and Nonblocking Code

.writeFile() vs .writeFileSync()

### Steps Node Takes

- tell nodeJS to do something
- it will offload that process to the operating system, which uses multithreading
- it'll continue its event loop to listen for event callbacks, and always dispatch tiny action to never block the code execution
- then always comeback when the operation is done by the OS

### Why NodeJS is High Performant

- it never blocks your code
- it never blocks the server
- it just goes ahead and tells the operating system to do things
- then it eventually comes around and does something in the callback, like send a response, which is not a blocking operation

## NodeJS Behind the Scenes

This is all just built into NodeJS

- the event loop will only handle callbacks that contain fast finishing code
- instead LONGER operations are sent to a "Worker Pool" that does all the heavy lifting, and is totally detached from our code and runs on different threads on the OS.
- once the worker is done it will trigger a callback
- and this will be recognized in the event loop
- then NodeJS will execute the appropriate callback

### Event Loop

- keeps the NodeJS process running
- handles all the callbacks
- has an order in which it goes through all the callbacks

#### order - beginning of each loop iteration

- TIMERS - first it checks if there are any timer callbacks it should execute (setTimeout & setInterval)
- PENDING CALLBACKS - things waiting on long operations to complete
- ...after working on these it'll defer...
- POLL - look for new I/O events and executes their callbacks immediately if possible or defer, also check for timer callbacks that maybe due to be executed, if so it'll **JUMP** to that timer phase and execute them right away
- CHECK for and execute setImmedita() callbacks
- CLOSE CALLBACKS - executes close event callbacks

So to reiterate, we have - callbacks are handled seperately

- timer callbacks
- I/O related callbacks
- other callbacks
- setImmediate() callbacks
- close event callbacks

process.exit

Then we may completely exit the whole NodeJS program if there are no remaining event handlers that are registered (refs == 0)

NodeJS keeps track of its open event listeners
refs basically has a counter of active event listeners
like server.listen() - listen never finishes by default so it doesn't exit

## Using the Node Module System

- split code over 2 files, 1 lean, the other with logic
- the lean 1 makes a connnection to the other file through the import
- and through the export in the other file
- if you were going to export many things you could put it in an object

### for the most part immutable

- the file content that is being imported can't be overwritted because it is cached by node
- so we can't manipulate it
- we can only read from what we import
- but we can export functions that change stuff inside of that file

###

multiple exports example

```js
module.exports = {
  handler: requestHandler,
  someText: 'Some hard coded text'
}

// or another way to export, but all into the same obj
module.exports.handler = requestHandler
module.exports.someText = 'Hello Springfield!'

// now there is a shortcut for this where we can just omit module, just a nodeJS thing
exports.handler = requestHandler
exports.someText = 'Hello Springfield!'
```

```js
// if you were exporting multiple items...
const server = http.createServer(routes.handler)

// or even
console.log(routes.someText)
```
