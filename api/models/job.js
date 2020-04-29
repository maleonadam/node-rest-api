const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  title: { type: String, required: true },

  job_type: { type: String, required: true },

  company: { type: String, required: true },

  company_url: { type: String, required: true },

  location: { type: String, required: true },

  description: { type: String, required: true },

  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
