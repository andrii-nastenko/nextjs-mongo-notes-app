const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Title cannot be longer than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [250, 'Description cannot be longer than 250 characters']
    }
})

module.exports = mongoose.model('Notes', notesSchema)