const mongoose = require('mongoose')

let menuSchema = new mongoose.Schema({
    name: String,
    price: Number
})

let Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu