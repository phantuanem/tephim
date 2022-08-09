const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary');
const pass_jwt = '25032002'

async function updateProfile(req, res){
    var response = {
        success: false
    }
    try {
        if(req.body.token){
            const email = jwt.verify(req.body.token, pass_jwt)
            if(email){
                if(req.body.name){
                    if(req.body.name.length <= 50){
                        let result = await User.updateOne({email: email, name: req.body.name})
                        if(result.modifiedCount){
                            response.success = true
                        }
                    }
                }
                if(req.body.image){
                    let result_img = await User.findOne({email}).select('avata.id')
                    let result_cloud = await cloudinary.uploader.upload(req.body.image)
                    if(result_cloud){
                        const result_update = await User.updateOne({email}, {avata: {id: result_cloud.public_id, url: result_cloud.url}})
                        if(result_update.modifiedCount){
                            response.success = true
                            if(result_img.avata.id.length !== 4){
                                cloudinary.uploader.destroy(result_img.avata.id)
                            }
                        }

                    }
                }
            }
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

router.put('/profile', updateProfile)

module.exports = router
