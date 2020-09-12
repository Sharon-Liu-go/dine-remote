const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Dine', restaurantSchema)