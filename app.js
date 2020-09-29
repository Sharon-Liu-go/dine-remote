const express = require('express')
// const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/restaurants/create', (req, res) => {
  res.render('create')
})


app.post('/restaurants', (req, res) => {
  console.log(req.body)
  Dine.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})
//使用restaurant.json
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   console.log("req.params", req.params.restaurant_id)//傳回是字串
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })

//使用mongodb資料庫,瀏覽特定一筆餐廳
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Dine.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))

})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  return Dine.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))

})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  console.log(req.body)
  return Dine.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  console.log(req.body)
  return Dine.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.get('/search', (req, res) => {
  console.log("req", req.query.keyword)//傳回是字串
  const keyword = req.query.keyword
  // const restaurants = Dine.filter(restaurant => { return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) })
  // res.render('index', { restaurants: restaurants, keyword, keyword })
  Dine.find()
    .lean()
    .then(restaurantsFiltered => {
      return restaurantsFiltered.filter(restaurants => restaurants.name.toLowerCase().includes(keyword.toLowerCase()))
    })
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword, keyword })
    )
})

app.listen(port, () => {
  console.log(`Express is listening on localhost http://localhost:${port}`)
})
