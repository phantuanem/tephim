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
    const categorys = ['Hành Động',
                        'Tình Cảm',
                        'Hài Hước',
                        'Cổ Trang',
                        'Tâm Lý',
                        'Hình Sự',
                        'Chiến Tranh',
                        'Thể Thao',
                        'Võ Thuật',
                        'Viễn Tưởng',
                        'Phiêu Lưu',
                        'Khoa Học',
                        'Kinh Dị',
                        'Âm Nhạc',
                        'Thần Thoại',
                        'Tài Liệu',
                        'Gia Đình',
                        'Chính kịch',
                        'Bí ẩn',
                        'Học Đường',
                        'Kinh Điển']
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
    const countrys = ['Trung Quốc',
                        'Hàn Quốc',
                        'Nhật Bản',
                        'Thái Lan',
                        'Âu Mỹ',
                        'Đài Loan',
                        'Hồng Kông',
                        'Ấn Độ',
                        'Anh',
                        'Pháp',
                        'Canada',
                        'Quốc Gia Khác',
                        'Đức',
                        'Tây Ban Nha',
                        'Thổ Nhĩ Kỳ',
                        'Hà Lan',
                        'Indonesia',
                        'Nga',
                        'Mexico',
                        'Ba lan',
                        'Úc',
                        'Thụy Điển',
                        'Malaysia',
                        'Brazil',
                        'Philippines',
                        'Bồ Đào Nha',
                        'Ý',
                        'Đan Mạch',
                        'UAE',
                        'Na Uy',
                        'Thụy Sĩ',
                        'Châu Phi',
                        'Nam Phi',
                        'Ukraina',
                        'Ả Rập Xê Út']
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
