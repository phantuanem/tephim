const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const pass_jwt = '25032002'

function returnTime(){
    var dateObj = new Date();
    return {
        month: dateObj.getUTCMonth() + 1, //months from 1-12
        day: dateObj.getUTCDate(),
        year: dateObj.getUTCFullYear()
    }
}

async function Register(req, res){
    var response = {
        success: false
    }
    try {
        const re = /\S+@\S+\.\S+/
        if(req.body.name){
            if(req.body.email){
                if(re.test(req.body.email)){
                    if(req.body.password){
                        if(req.body.password.length > 5){
                            const count = await User.countDocuments({email: req.body.email})
                            if(!count && req.body.name.length <= 50){
                                var obj = {
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: jwt.sign(req.body.password, pass_jwt),
                                    time_join: returnTime()
                                }
                                const result = await User.create(obj)
                                if(result){
                                    response.success = true
                                }
                            }else {
                                response.message = 'Email đã tồn tại'
                            }
                        } else {
                            response.message = 'Mật khẩu ít nhất 6 ký tự'
                        }
                    } else {
                        response.message = 'Vui lòng nhập mật khẩu'
                    }
                } else {
                    response.message = 'Vui lòng nhập đúng email'
                }
            } else {
                response.message = 'Vui lòng nhập email'
            }
        } else {
            response.message = 'Vui lòng nhập tên'
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

router.post('/register', Register)

module.exports = router
