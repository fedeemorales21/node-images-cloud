const { Router } = require('express')
const router = Router()

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const Photo = require('../models/Photo')

router.get('/', async(req,res) => {
    try {
        const photos = await Photo.find()
        res.render('index' , { photos })
    } catch (error) {
        console.log(error)
    }
})


router.post('/add', async( req,res ) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
})


router.post('/dalete/:id', async( req,res ) => {
    try {
        const id = req.params.id
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
