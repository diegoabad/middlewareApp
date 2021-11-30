const { Schema, model } = require("mongoose");

const jobsSchema = new Schema({
  
  photograph: {
    type: String,
    required: false,
  },

  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    // autopopulate: true
  },

  title: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
    defalut: "Complete job description",
  },

  country: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: false,
  },

  salary: {
    type: Number,
    required: false,
  },

  currency: {
    type: String,
    enum: ["dollar", "peso", "euro"],
    default: "dollar"
  },

  date: {
    type: Date,
    default: Date.now,
  },

  
  latitude: {
    type: String,
},

longitude: {
    type: String,
},

  juniors: [{
    type: String,
    ref: "juniors",
  }],

  admin: {
    type: Schema.Types.ObjectId,
    ref: "admins",
  },

  technologies: [{
    type: Schema.Types.ObjectId,
    ref: "technologies",
  }],

  premium: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },

  status: {
    type: String,
    enum: ["active", "paused", "closed"],
    default: "active" 
  },
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

});


module.exports = model("jobs", jobsSchema);
