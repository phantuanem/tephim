const mongoose = require('mongoose')

const watched = mongoose.model('watched', mongoose.Schema({
    email: {type: String, required: true},
    slug: {type: String, required: true},
    time: {type: Object, required: true}
}))

module.exports = watched
