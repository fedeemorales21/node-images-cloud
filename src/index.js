require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const { join } = require('path')
const multer = require('multer')

const app = express()
require('./db')


app.set('port', process.env.PORT || 3000)
app.set('views', join(__dirname,'views'))

app.engine('.hbs',exphbs({
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'), 
    defaultLayout: 'main' ,
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(express.urlencoded( { extended: false } ))
app.use(express.json())

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, join(__dirname, 'public/my-uploads'))
    },

    filename: (req, file, cb) => {
      cb(null, Date.now() + file.path)
    }
})
app.use(multer({ storage }).single('picture'))

app.use(express.static(join(__dirname, 'public')))

app.use('/', require('./routes/images'))

app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))