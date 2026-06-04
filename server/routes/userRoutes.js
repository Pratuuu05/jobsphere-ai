const express = require("express")
const multer = require("multer")

const router = express.Router()

const { protect } = require("../middleware/authMiddleware")

const storage = multer.memoryStorage()
const upload = multer({ storage })

const {
  getProfile,
  updateProfile,
  saveJob,
  getSavedJobs,
  analyzeResume,
  getJobMatch,
  generateInterviewQuestions,
  uploadResumePDF,
} = require("../controllers/userController")

router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfile)

router.post("/save-job/:jobId", protect, saveJob)
router.get("/saved-jobs", protect, getSavedJobs)

router.post("/analyze-resume", protect, analyzeResume)
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResumePDF
)

router.get("/job-match/:jobId", protect, getJobMatch)
router.get("/interview-questions/:jobId", protect, generateInterviewQuestions)

module.exports = router