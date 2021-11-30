const { model } = require("mongoose");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const companySchema = new Schema({
  idFireBase: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  webpage: {
    type: String,
    required: false,
  },

  gmail: {
    type: String,
    required: true,
    unique: true,
  },
  linkedin: {
    type: String,
  },

  photograph: {
    type: String,
    required: false,
  },

  userType: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  premium: {
    type: Boolean,
    default: false,
  },

  description: {
    type: String,
    required: false,
    maxLength: 500,
  },

  latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },

  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "technologies",
    },
  ],

  publications: [
    {
      type: Schema.Types.ObjectId,
      ref: "publication",
      // autopopulate: true
    },
  ],

  jobs: [{
      type: Schema.Types.ObjectId,
      ref: "jobs",
      autopopulate: true,
    }],

    notifications: [{
        _id: Schema.Types.ObjectId,
        userName: String,
        typeNotification: Number,
        date: {
          type: Date,
          default: Date.now
        },
        idPublication: Schema.Types.ObjectId,
        userType: String,
        userPublicationId: String
    }]
})

// companySchema.plugin(require('mongoose-autopopulate'));

module.exports = model("company", companySchema);
