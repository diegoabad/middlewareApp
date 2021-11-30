const { Schema, model } = require('mongoose');

const languagesSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

})

module.exports = model('languages', languagesSchema)