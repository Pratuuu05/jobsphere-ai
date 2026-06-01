const express = require("express")

const router = express.Router()
const {
  getJobs,
  createJob,
  getSingleJob,
  deleteJob
} = require("../controllers/jobController")

// GET JOBS
router.get("/", getJobs)
router.get("/:id", getSingleJob)


// CREATE JOB
router.post("/", createJob)
router.delete("/:id", deleteJob)

module.exports = router