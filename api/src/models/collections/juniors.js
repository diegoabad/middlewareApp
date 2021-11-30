const { model } = require("mongoose");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const juniorSchema = new Schema({

  idFireBase: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true,
  },
  
  date: {
    type: Date,
    default: Date.now,
  },

  gmail: {
    type: String,
    required: false,
    unique: true,
  },

  github: {
    type: String,
    required: false,
  },

  photograph: {
    type: String,
    required: false,
  },

  website: {
    type: String,
    required: false,
  },

  title: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  linkedin: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: false,
  },
  
  userType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
    default: "Completa tu descripción",
  },

  languages: [
    {
      type: Schema.Types.ObjectId,
      ref: "languages",
      autopopulate: false,

    },
  ],

  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "technologies",
      autopopulate: false,
    },
  ],

  publications: [
    {
      type: Schema.Types.ObjectId,
      ref: "publication",
    },
  ],

  softskills: [
    {
      type: Schema.Types.ObjectId,
      ref: "softskills",
      autopopulate: false,
    },
  ],

  jobsExperience: [
    {
      companyName: String,
      industry: String,
      workPosition: String,
      workingTime: String,
      _id:String
    },
  ],

  academicHistory: [
    {
      institute: String,
      title: String,
      date: String,
      description: String,
      _id:String
    },
  ],

  openToRelocate: {
    type: Boolean,
    required: false,
    default: false,
  },

  openToRemote: {
    type: Boolean,
    required: false,
    default: false,
  },

  openToFullTime: {
    type: Boolean,
    required: false,
    default: false,
  },

  postulationsJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "jobs",
    }, 
  ],

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

juniorSchema.plugin(require("mongoose-autopopulate"));

module.exports = model("juniors", juniorSchema);
