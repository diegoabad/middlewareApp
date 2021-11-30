const { Schema, model } = require('mongoose');

const softSkillsSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: false
    }
})

module.exports = model('softskills', softSkillsSchema)