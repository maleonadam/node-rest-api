const mongoose = require("mongoose");

const Job = require("../models/job");

// GET ALL JOBS
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().select("_id title job_type company location");

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs: jobs.map((job) => {
        return {
          _id: job._id,
          title: job.title,
          job_type: job.job_type,
          company: job.company,
          location: job.location,
          details: {
            description: "VIEW JOB DETAILS",
            type: "GET",
            url: "http://localhost:3000/jobs/" + job._id,
          },
        };
      }),
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

// ADD A JOB
exports.addNewJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      job_type: req.body.job_type,
      company: req.body.company,
      company_url: req.body.company_url,
      location: req.body.location,
      description: req.body.description,
    });

    return res.status(201).json({
      success: true,
      message: "Job added successfully...",
      addedJob: {
        title: job.title,
        job_type: job.job_type,
        company: job.company,
        location: job.location,
        details: {
          description: "VIEW ADDED JOB",
          type: "GET",
          url: "http://localhost:3000/jobs/" + job._id,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

// GET SINGLE JOB
exports.getSingleJob = async (req, res, next) => {
  try {
    const id = req.params.jobId;
    const job = await Job.findById(id).select(
      "_id title job_type company company_url location description created_at"
    );

    if (!job) {
      return res
        .status(404)
        .json({ success: false, error: "No record found!" });
    } else {
      return res.status(200).json({
        success: true,
        job: job,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

// UPDATE A JOB
exports.updateSingleJob = async (req, res, next) => {};

// DELETE A JOB
exports.deleteSingleJob = async (req, res, next) => {
  try {
    const id = req.params.jobId;
    const job = await Job.findById(id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, error: "No record found!" });
    } else {
      await job.remove();

      return res.status(200).json({
        success: true,
        message: "Job deleted successfully...",
        job: {},
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
