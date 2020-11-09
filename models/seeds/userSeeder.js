const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurants = require('./restaurant.json')
const User = require('../user')
const Dine = require('../restaurant')

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}
]

db.once('open', () => {
  SEED_USER.forEach(seedUser => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash =>
        User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }
        ))
      .then(user => {
        const userId = user._id
        const name = user.name
        switch (name) {
          case 'user1':
            return Promise.all(Array.from(
              { length: 3 },
              (_, i) => {
                let restaurant = Restaurants.results[i]
                return Dine.create(Object.assign(restaurant, { userId })

                )
              }
            ))
          case 'user2':
            return Promise.all(Array.from(
              { length: 3 },
              (_, i) => {
                let restaurant = Restaurants.results[i + 3]
                return Dine.create(Object.assign(restaurant, { userId })
                )
              }
            ))
        }
      })
      .then(() => {
        console.log('done.')
      })
  })

})





