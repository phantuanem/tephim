const express = require('express')
const router = express.Router()
const slug = require('slug')
const Phim = require('../models/phim')
const Watched = require('../models/watched')

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

async function getListNewMovies(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const count = await Phim.countDocuments({yesr: year})
        const result = await Phim.find({yesr: year}).skip(Math.floor(Math.random()*8000)).limit(12).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewMoviesHot(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const count = await Phim.countDocuments({yesr: year})
        const result = await Phim.find({yesr: year}).skip(Math.floor(Math.random()*4000)).limit(20).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewSeries(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const result = await Phim.find({yesr: year, type: 'series'}).skip(Math.floor(Math.random()*1900)).limit(12).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewSeriesHot(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const result = await Phim.find({yesr: year, type: 'series'}).skip(Math.floor(Math.random()*1000)).limit(20).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewMovie(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const result = await Phim.find({yesr: year, type: 'single'}).skip(Math.floor(Math.random()*5450)).limit(12).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewMovieHot(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const result = await Phim.find({yesr: year, type: 'single'}).skip(Math.floor(Math.random()*4000)).limit(20).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewAnime(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const result = await Phim.find({yesr: year, type: 'hoathinh'}).skip(Math.floor(Math.random()*660)).limit(12).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getListNewAnimeHot(req, res){
    var response = {
        success: false
    }
    try {
        const now = new Date()
        const year = now.getFullYear()
        const result = await Phim.find({yesr: year, type: 'hoathinh'}).skip(Math.floor(Math.random()*300)).limit(20).select('name thumb_url slug category')
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log('/api/phimmoi', err)
    }
    res.json(response)
}

async function getMovie(req, res){
    var response = {
        success: false
    }
    try {
        const result = await Phim.findOne({slug: req.params.slug})
        if(result){
            response.success = true
            response.data = result
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function geSuggestCategory(req, res){
    var response = {
        success: false
    }
    try {
        if(req.params.category){
            const count = await Phim.countDocuments({'category.name': req.params.category})
            var quantity_skip = 0
            if(count > 11){
                quantity_skip = Math.floor(Math.random()*(count - 10))
            }
            const result = await Phim.find({'category.name': req.params.category}).skip(quantity_skip).limit(10).select('name thumb_url slug category')
            if(result){
                response.success = true
                response.data = result
            }
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function getListType(req, res){
    var response = {
        success: false
    }
    try {
        if(req.params.type){
            const count = await Phim.countDocuments({'type': req.params.type})
            const result = await Phim.find({'type': req.params.type}).skip(20 * Number(req.query.page)).limit(20).select('name thumb_url slug category')
            if(result){
                response.success = true
                response.data = result
                response.count = count
            }
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function getCategory(req, res){
    const categorys = ['H??nh ?????ng',
                        'T??nh C???m',
                        'H??i H?????c',
                        'C??? Trang',
                        'T??m L??',
                        'H??nh S???',
                        'Chi???n Tranh',
                        'Th??? Thao',
                        'V?? Thu???t',
                        'Vi???n T?????ng',
                        'Phi??u L??u',
                        'Khoa H???c',
                        'Kinh D???',
                        '??m Nh???c',
                        'Th???n Tho???i',
                        'T??i Li???u',
                        'Gia ????nh',
                        'Ch??nh k???ch',
                        'B?? ???n',
                        'H???c ???????ng',
                        'Kinh ??i???n']
    var response = {
        success: false
    }
    try {
        if(req.params.category){
            var category = ''
            categorys.forEach(text => {
                const str = slug(text)
                if(str === req.params.category){
                    category = text
                    return
                }
            })
            const count = await Phim.countDocuments({'category.name': category})
            const result = await Phim.find({'category.name': category}).skip(20 * Number(req.query.page)).limit(20).select('name thumb_url slug category')
            if(result){
                response.success = true
                response.data = result
                response.count = count
            }
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function getCountry(req, res){
    const countrys = ['Trung Qu???c',
                        'H??n Qu???c',
                        'Nh???t B???n',
                        'Th??i Lan',
                        '??u M???',
                        '????i Loan',
                        'H???ng K??ng',
                        '???n ?????',
                        'Anh',
                        'Ph??p',
                        'Canada',
                        'Qu???c Gia Kh??c',
                        '?????c',
                        'T??y Ban Nha',
                        'Th??? Nh?? K???',
                        'H?? Lan',
                        'Indonesia',
                        'Nga',
                        'Mexico',
                        'Ba lan',
                        '??c',
                        'Th???y ??i???n',
                        'Malaysia',
                        'Brazil',
                        'Philippines',
                        'B??? ????o Nha',
                        '??',
                        '??an M???ch',
                        'UAE',
                        'Na Uy',
                        'Th???y S??',
                        'Ch??u Phi',
                        'Nam Phi',
                        'Ukraina',
                        '??? R???p X?? ??t']
    var response = {
        success: false
    }
    try {
        if(req.params.country){
            var country = ''
            countrys.forEach(text => {
                const str = slug(text)
                if(str === req.params.country){
                    country = text
                    return
                }
            })
            const count = await Phim.countDocuments({'country.name': country})
            const result = await Phim.find({'country.name': country}).skip(20 * Number(req.query.page)).limit(20).select('name thumb_url slug category')
            if(result){
                response.success = true
                response.data = result
                response.count = count
            }
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function getSearch(req, res){
    var response = {
        success: false
    }
    try {
        if(req.params.search){
            const count = await Phim.countDocuments({ "slug": { $regex: '.*' + req.params.search + '.*' }})
            const result = await Phim.find({ "slug": { $regex: '.*' + req.params.search + '.*' }}).skip(20 * Number(req.query.page)).limit(20).select('name thumb_url slug category')
            if(result){
                response.success = true
                response.data = result
                response.count = count
            }
        }
    } catch(err){
        console.log(err)
    }
    res.json(response)
}

async function createWatch(req, res){
    var response = {
        success: false
    }
    try {
        if(req.body.email && req.body.slug){
            const result_delete = await Watched.deleteMany({email: req.body.email, slug: req.body.slug})
            const result_watch = await Watched.create({email: req.body.email, slug: req.body.slug,time: returnTime()})
            if(result_watch){
                response.success = true
            }
        }
    }catch(err){
        console.log(err)
    }
    res.json(response)
}

async function getWatch(req, res){
    var response = {
        success: false
    }
    try {
        if(req.query.email){
            const result = await Watched.aggregate([
                {
                    $match: {
                        email: { $eq: req.query.email }
                    }
                },
                {
                    $lookup: {
                        from: "phims",
                        localField: "slug",
                        foreignField: "slug",
                        as: "movie",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    modified: 0,
                                    origin_name: 0,
                                    content: 0,
                                    type: 0,
                                    status: 0,
                                    is_copyright: 0,
                                    trailer_url: 0,
                                    time: 0,
                                    episode_current: 0,
                                    episode_total: 0,
                                    quality: 0,
                                    lang: 0,
                                    notify: 0,
                                    showtimes: 0,
                                    slug: 0,
                                    year: 0,
                                    actor: 0,
                                    director: 0,
                                    category: 0,
                                    country: 0,
                                    episodes: 0
                                }
                            }
                        ]
                    }
                },
                { $unwind: "$movie" },
                {
                    $project: {
                        _id: 0,
                        email: 0
                    }
                }
            ])
            if(result){
                response.success = true
                response.data = result.reverse()
            }
        }
    }catch(err){
        console.log(err)
    }
    res.json(response)
}

router.get('/phimmoi',getListNewMovies)
router.get('/phimmoihot',getListNewMoviesHot)
router.get('/phimbomoi',getListNewSeries)
router.get('/phimbomoihot',getListNewSeriesHot)
router.get('/phimlemoi',getListNewMovie)
router.get('/phimlemoihot',getListNewMovieHot)
router.get('/phimhoathinhmoi',getListNewAnime)
router.get('/phimhoathinhmoihot',getListNewAnimeHot)
router.get('/phim/:slug', getMovie)
router.get('/suggest/category/:category', geSuggestCategory)
router.get('/danh-sach/:type', getListType)
router.get('/the-loai/:category', getCategory)
router.get('/quoc-gia/:country', getCountry)
router.get('/tim-kiem/:search', getSearch)
router.post('/watched', createWatch)
router.get('/watched', getWatch)

module.exports = router
