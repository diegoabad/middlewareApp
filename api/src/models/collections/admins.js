const { Schema, model } = require('mongoose');

const adminSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    idFireBase: {
        type: String,
        required: true 
    },

    userType: {
        type: String,
        required: true,
        enum: ['admin']
    },

    gmail: {
        type: String,
        required: true
    },

    github: {
        type: String,
        required: false
    },
    photograph: {
        type: String,
        required: false
    },

    publications: [{
        type: Schema.Types.ObjectId,
        ref: 'publication'
    }],

    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'jobs',
        autopopulate: true
    }]

})

module.exports = model('admins', adminSchema)