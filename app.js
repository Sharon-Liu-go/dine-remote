const express = require('express')
// const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Dine = require('./models/restaurant') // 載入 

mongoose.connect('mongodb://localhost/dine', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurantList.results })
// })

app.get('/', (req, res) => {
  Dine.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))

})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log("req.params", req.params.restaurant_id)//傳回是字串
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  console.log("req", req.query.keyword)//傳回是字串
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => { return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) })
  res.render('index', { restaurants: restaurants, keyword, keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost http://localhost:${port}`)
})
