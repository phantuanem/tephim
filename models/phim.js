const mongoose = require('mongoose')

const phim = mongoose.model('phim', mongoose.Schema({
    modified: { type: Object, required: false },
    name: { type: String, required: false },
    origin_name: { type: String, required: false },
    content: { type: String, required: false },
    type: { type: String, required: false },
    status: { type: String, required: false },
    thumb_url: { type: String, required: false },
    is_copyright: { type: String, required: false },
    trailer_url: { type: String, required: false },
    time: { type: String, required: false },
    episode_current: { type: String, required: false },
    episode_total: { type: String, required: false },
    quality: { type: String, required: false },
    lang: { type: String, required: false },
    notify: { type: String, required: false },
    showtimes: { type: String, required: false },
    slug: { type: String, required: false },
    year: { type: Number, required: false },
    actor: { type: Array, required: false },
    director: { type: Array, required: false },
    category: { type: Array, required: false },
    country: { type: Array, required: false },
    episodes: { type: Array, required: false }
}))

module.exports = phim
