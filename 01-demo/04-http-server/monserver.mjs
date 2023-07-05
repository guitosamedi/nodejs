// module HTTP
import http from 'node:http'

const server = http.createServer()

server.on('request', (request, response) => {
    console.log('requête reçu', request.url)
    response.writeHead(200,
        {
            'Content-type': 'text/html'
        })

    const d1 = new Date()
    response.end(
        `
<!doctype html>
<html>
  <head>
      <title>Page 1</title>
  </head>
  <body>
        <h1>${d1}</h1>
      <button class="btn btn-primary">Hello</button>
  </body>
</html>
`)
})

server.listen(4000)
