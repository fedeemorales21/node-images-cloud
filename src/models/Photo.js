const { Schema , model } = require('mongoose')

const SchemaPhoto = Schema({
    name: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
    
})

module.exports = model('Photo',SchemaPhoto)