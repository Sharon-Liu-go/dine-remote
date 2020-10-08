const express = require('express')
const router = express.Router()

const Dine = require('../../models/restaurant')

router.get('/', (req, res) => {
  Dine.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))

})

router.get('/search', (req, res) => {
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
module.exports = router