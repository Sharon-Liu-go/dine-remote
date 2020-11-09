const express = require('express')
// const restaurantList = require('./restaurant.json')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


require('./config/mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')

const routes = require('./routes')
const flash = require('connect-flash')



app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost http://localhost:${port}`)
})
