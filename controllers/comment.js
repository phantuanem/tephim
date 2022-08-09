const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const mongoose = require('mongoose')

function returnTime(){
    var dateObj = new Date();
    return {
        h: dateObj.getHours(),
        m: dateObj.getMinutes(),
        month: dateObj.getUTCMonth() + 1, //months from 1-12
        day: dateObj.getUTCDate(),
        year: dateObj.getUTCFullYear()
    }
}

async function createComment(req, res){
    var response = {
        success: false
    }
    try {
        var obj = {...req.body}
        obj.time = returnTime()
        const result = await Comment.create(obj)
        if(result){
            response.success = true
            response.data = obj.time
            response.id = result._id
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function getComment(req, res){
    var response = {
        success: false
    }
    try {
        const result = await Comment.aggregate([
            {
                $match: {
                    slug: req.query.slug
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'user',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                password: 0,
                                email: 0,
                                'avata.id': 0,
                                time_join: 0
                            }
                        }
                    ]
                }
            },
            {
                $unwind: '$user'
            },{
                $project: {
                    email: 0,
                    slug: 0
                }
            }
        ])
        if(result){
            response.success = true
            response.data = result.reverse()
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function deleteComment(req, res){
    var response = {
        success: false
    }
    try {
        const result = await Comment.deleteOne({_id: mongoose.Types.ObjectId(req.query.id), email: req.query.email})
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

router.post('/comment', createComment)
router.get('/comment', getComment)
router.delete('/comment', deleteComment)

module.exports = router
