const mongoose = require('mongoose')

const user = mongoose.model('user', mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avata: {type: Object, default: { id: 'none', url: 'https://res.cloudinary.com/tepim/image/upload/v1659705588/user_icon_172810_fgvljb.png'}},
    time_join: {type: Object, required: true}
}))

module.exports = user
