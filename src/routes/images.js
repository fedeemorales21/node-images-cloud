const { Router } = require('express')
const router = Router()

const Photo = require('../models/Photo')
const fs = require('fs-extra')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


router.get('/', async(req,res) => {
    try {
        const photos = await Photo.find()
        res.render( 'index', { photos } )
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
        await fs.unlink(req.file.path)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


router.get('/delete/:id', async(req,res) => {
    try {
        const { public_id } = await Photo.findByIdAndDelete(req.params.id)
        await cloudinary.uploader.destroy(public_id)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router