const express = require("express");

const JobsController = require("../controllers/jobs");
const checkAuth = require("../auth/jwt-auth");

const router = express.Router();

// GET ALL JOBS
router.get("/", JobsController.getAllJobs);

// ADD A JOB
router.post("/", checkAuth, JobsController.addNewJob);

// GET SINGLE JOB
router.get("/:jobId", JobsController.getSingleJob);

// UPDATE A JOB
router.get("/:jobId", checkAuth, JobsController.updateSingleJob);

// DELETE A JOB
router.delete("/:jobId", checkAuth, JobsController.deleteSingleJob);

module.exports = router;
