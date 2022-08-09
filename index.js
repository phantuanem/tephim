const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')
require('dotenv').config()
const path = require('path')

mongoose.connect('mongodb+srv://tuanem:25032002@cluster0.pktdo.mongodb.net/myapiphim?retryWrites=true&w=majority')
        .then(() => {
            // console.log('connect to db...')
        })
        .catch(err => {"can not connect to db...", err})

cloudinary.config({
    cloud_name: 'tepim',
    api_key: '815847529766398',
    api_secret: 'LfrjXnGZw5IVKuJ9zL8CEGhDn14'
})

const app = express()
var server = require("http").Server(app, { cors: { origin: '*' } })
var io = require("socket.io")(server)
app.use(cors())
app.use(express.json({limit: '2mb'}))
app.use(express.urlencoded({extended: true, limit: '2mb'}))
app.use(express.static('public'))

const Phim = require('./controllers/phim')
const Register = require('./controllers/register')
const Login = require('./controllers/login')
const Profile = require('./controllers/profile')
const Comment = require('./controllers/comment')
const Socket = require('./socket/index')


app.use('/api', Phim)
app.use('/api', Register)
app.use('/api', Login)
app.use('/api', Profile)
app.use('/api', Comment)
Socket(io)

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

server.listen(3000)
