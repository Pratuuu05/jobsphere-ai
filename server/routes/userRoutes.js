const express = require("express")
const router = express.Router()

const { protect } = require("../middleware/authMiddleware")

const {
  getProfile,
  updateProfile,
  saveJob,
  getSavedJobs,
  analyzeResume,
  getJobMatch,
  generateInterviewQuestions,
} = require("../controllers/userController")

router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfile)

router.post("/save-job/:jobId", protect, saveJob)
router.get("/saved-jobs", protect, getSavedJobs)

router.post("/analyze-resume", protect, analyzeResume)
router.get("/job-match/:jobId", protect, getJobMatch)
router.get("/interview-questions/:jobId", protect, generateInterviewQuestions)

module.exports = router