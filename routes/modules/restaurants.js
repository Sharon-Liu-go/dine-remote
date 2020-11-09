const express = require('express')
const router = express.Router()

const Dine = require('../../models/restaurant')

router.get('/create', (req, res) => {
  res.render('create')
})


router.post('/', (req, res) => {
  const userId = req.user._id
  let restaurantCreated = Object.assign(req.body, { userId })
  Dine.create(restaurantCreated)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})
//使用restaurant.json
//
// router.get('/:restaurant_id', (req, res) => {
//   console.log("req.params", req.params.restaurant_id)//傳回是字串
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })

//使用mongodb資料庫,瀏覽特定一筆餐廳
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Dine.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))

})

router.get('/edit/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Dine.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))

})

router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Dine.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body, { userId })
      console.log(restaurant)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))

})
router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Dine.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})



// sort function：　
router.get('/sort/:sortTarget', (req, res) => {
  console.log(req.params.sortTarget)
  const sortTarget = req.params.sortTarget
  const userId = req.user._id

  switch (sortTarget) {
    case "A-Z":
      return Dine.findOne({ userId })
        .lean()
        .sort({ name_en: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case "Z-A":
      return Dine.findOne({ userId })
        .lean()
        .sort({ name_en: 'desc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case "類別":
      return Dine.findOne({ userId })
        .lean()
        .sort({ category: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case "地區":
      return Dine.findOne({ userId })
        .lean()
        .sort({ location: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
  }
})

module.exports = router