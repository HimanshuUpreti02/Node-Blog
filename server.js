const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const { response } = require('express')
const app = express()

// connnect to mongodb
const dbURI =
  'mongodb+srv://Himanshu_13:Sri141102@node-basics.cvzcmuk.mongodb.net/node-basics?retryWrites=true&w=majority'
mongoose
  .connect(dbURI)
  .then(result => app.listen(3000)) //listen to the request after conneted to the database
  .catch(err => console.log(err))

// register ejs as view engine

app.set('view engine', 'ejs')

/*===================== Static Middleware for giving access to files ===========================*/
app.use(express.static('public'))

/*----------------------- MiddleWare ---------------------*/
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true })) //use to parse data of form to the route



/*---------------------- Routes --------------------------*/
app.get('/', (req, res) => {
  //   res.send('<p>hello world</p>')
  
  res.render('home', { title: 'Home'})
})

app.get('/about', (req, res) => {
  // res.sendFile('./views/about.html', { root: __dirname })
  res.render('about', { title: 'about' })
})

// blog Routes
app.use('/blogs' , blogRoutes)


// 404 error
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname })
  res.status(404).render('404', { title: '404' })
})
