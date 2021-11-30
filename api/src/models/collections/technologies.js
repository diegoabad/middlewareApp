const { Schema, model } = require('mongoose');

const technologiesSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = model('technologies', technologiesSchema)