const express = require('express')
// const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose')
const methodOverride = require('method-override')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurantList.results })
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost http://localhost:${port}`)
})
