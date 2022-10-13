const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  // console.log(req);   this is the request object

  // set header content-type

  res.setHeader('Content-Type', 'Text/html')

  // using readfile for returing html pages

  let path = './views/'
  if (req.url == '/') {
    path += 'index.html'
    res.statusCode = 200
  } else if (req.url == '/about') {
    path += 'about.html'
    res.statusCode = 200
  } else if ((req.url = '/about-me')) {
    res.statusCode = 301
    res.setHeader('Location', '/about')
    res.end()
  } else {
    path += '404.html'
    res.statusCode = 404
  }

  // fs.readFile(path, (err, data) => {
  //   if (err) {
  //     console.log(err)
  //     res.end()
  //   } else {
  //     res.write(data)
  //     res.end()
  //   }
  // })

  let data = fs.readFileSync(path)
  res.write(data.toString())
  res.end()
})

server.listen(3000, 'localhost', () => {
  console.log('listening on port 3000')
})
