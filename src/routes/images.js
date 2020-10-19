const { Router } = require('express')
const router = Router()

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const { unlink } = require('fs-extra')

const Photo = require('../models/Photo')

router.get('/', async(req,res) => {
    try {
        // const photos = await Photo.find()
        res.render('index' )
    } catch (error) {
        console.log(error)
    }
})


router.post('/add', async(req,res) => {
    try {
        const { name } = req.body
        const { public_id, url } = await cloudinary.uploader.upload(req.file.path)
        const newPhoto = new Photo({ name, public_id, url })
        await newPhoto.save()
        await unlink(req.file.path)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


router.post('/dalete/:id', async(req,res) => {
    try {
        const id = req.params.id
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
