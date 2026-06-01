const Job = require("../models/Job")

// GET ALL JOBS
const getJobs = async (req, res) => {

  try {

    const jobs = await Job.find()

    res.json(jobs)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

}

// GET SINGLE JOB
const getSingleJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id)

    res.json(job)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

}

// CREATE JOB
const createJob = async (req, res) => {

  try {

    const job = await Job.create(req.body)

    res.status(201).json(job)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

}

// DELETE JOB
const deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id)

    if (!job) {

      return res.status(404).json({
        message: "Job not found",
      })

    }

    await job.deleteOne()

    res.json({
      message: "Job deleted successfully",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

}

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  deleteJob,
}