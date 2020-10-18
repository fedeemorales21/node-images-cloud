const { Router } = require('express')
const router = Router()

router.get('/', ( req,res ) => {
    res.render('index')
})

router.post('/add', ( req,res ) => {
    
})


module.exports = router
