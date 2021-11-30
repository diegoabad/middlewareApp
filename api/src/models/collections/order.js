const { Schema, model } = require('mongoose');

const orderSchema = new Schema({

    status: {
        type: String,
        required: false
    },

    payment_id: {
        type: String,
        required: false
    },

    payment_status: {
        type: String,
        required: false
    },

    merchant_order_id: {
        type: String,
        required: false
    },

    date_created: {
        type: Date,
        required: false
    },
    
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'publication'
    }]

})

module.exports = model('order', orderSchema)