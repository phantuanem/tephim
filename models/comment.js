const mongoose = require('mongoose')

const comment = mongoose.model('comment', mongoose.Schema({
    slug: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Object, required: true }
}))

module.exports = comment
