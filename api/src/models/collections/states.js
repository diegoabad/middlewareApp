const { Schema, model } = require('mongoose');

const stateSchema = new Schema({

    name: 
    {
        type: String,
    },
    name_country:
    {
        type: String,
    }
  },

  {collection: 'states'}
    
);

module.exports = model('states', stateSchema)