const pdfParse = require("pdf-parse/lib/pdf-parse.js")
const User = require("../models/User")
const SavedJob = require("../models/SavedJob")
const Job = require("../models/Job")

const getProfile = async (req, res) => {
  res.json(req.user)
}

const updateProfile = async (req, res) => {
  try {
    const { name, location, bio, skills, resumeText } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.name = name || user.name
    user.location = location || user.location
    user.bio = bio || user.bio
    user.skills = skills || user.skills
    user.resumeText = resumeText || user.resumeText

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      location: updatedUser.location,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      resumeText: updatedUser.resumeText,
      resumeScore: updatedUser.resumeScore,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const saveJob = async (req, res) => {
  try {
    const jobExists = await Job.findById(req.params.jobId)

    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" })
    }

    const alreadySaved = await SavedJob.findOne({
      user: req.user._id,
      job: req.params.jobId,
    })

    if (alreadySaved) {
      return res.status(400).json({ message: "Job already saved" })
    }

    const savedJob = await SavedJob.create({
      user: req.user._id,
      job: req.params.jobId,
    })

    res.status(201).json(savedJob)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.user._id }).populate("job")
    res.json(savedJobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" })
    }

    const keywords = [
      "react",
      "node",
      "express",
      "mongodb",
      "javascript",
      "html",
      "css",
      "api",
      "git",
      "deployment",
    ]

    const lowerText = resumeText.toLowerCase()

    const matchedSkills = keywords.filter((skill) =>
      lowerText.includes(skill)
    )

    const score = Math.min(100, matchedSkills.length * 10)

    const suggestions = []

    if (!lowerText.includes("project")) {
      suggestions.push("Add more project details with measurable impact.")
    }

    if (!lowerText.includes("github")) {
      suggestions.push("Add your GitHub profile link.")
    }

    if (!lowerText.includes("deployment")) {
      suggestions.push("Mention deployed project links.")
    }

    if (!lowerText.includes("api")) {
      suggestions.push("Mention REST API or backend integration experience.")
    }

    const user = await User.findById(req.user._id)

    user.resumeText = resumeText
    user.resumeScore = score
    user.skills = [...new Set([...user.skills, ...matchedSkills])]

    await user.save()

    res.json({
      score,
      matchedSkills,
      suggestions,
      message: "Resume analyzed successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getJobMatch = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
    const user = await User.findById(req.user._id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    const userSkills = user.skills.map((skill) => skill.toLowerCase())

    const jobText = `${job.title} ${job.description} ${job.skills || ""}`.toLowerCase()

    const matchedSkills = userSkills.filter((skill) =>
      jobText.includes(skill)
    )

    const score =
      userSkills.length === 0
        ? 0
        : Math.round((matchedSkills.length / userSkills.length) * 100)

    res.json({
      matchScore: score,
      matchedSkills,
      message:
        score >= 70
          ? "Strong match for this job"
          : score >= 40
          ? "Moderate match, improve a few skills"
          : "Low match, improve your resume and skills",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const generateInterviewQuestions = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    const title = job.title || "this role"

    const questions = [
      `Tell me about yourself for a ${title} position.`,
      `What projects have you built related to ${title}?`,
      "Explain one technical challenge you faced and how you solved it.",
      "How do you handle deadlines and teamwork?",
      "Why should we hire you for this role?",
    ]

    res.json({ questions })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const uploadResumePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF file" })
    }

    const data = await pdfParse(req.file.buffer)
    const resumeText = data.text

    const keywords = [
      "react",
      "node",
      "express",
      "mongodb",
      "javascript",
      "html",
      "css",
      "api",
      "git",
      "deployment",
    ]

    const lowerText = resumeText.toLowerCase()

    const matchedSkills = keywords.filter((skill) =>
      lowerText.includes(skill)
    )

    const score = Math.min(100, matchedSkills.length * 10)

    const suggestions = []

    if (!lowerText.includes("project")) {
      suggestions.push("Add more project details with measurable impact.")
    }

    if (!lowerText.includes("github")) {
      suggestions.push("Add your GitHub profile link.")
    }

    if (!lowerText.includes("deployment")) {
      suggestions.push("Mention deployed project links.")
    }

    if (!lowerText.includes("api")) {
      suggestions.push("Mention REST API or backend integration experience.")
    }

    const user = await User.findById(req.user._id)

    user.resumeText = resumeText
    user.resumeScore = score
    user.skills = [...new Set([...user.skills, ...matchedSkills])]

    await user.save()

    res.json({
      score,
      matchedSkills,
      suggestions,
      resumeText,
      message: "Resume PDF analyzed successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  getProfile,
  updateProfile,
  saveJob,
  getSavedJobs,
  analyzeResume,
  getJobMatch,
  generateInterviewQuestions,
  uploadResumePDF,
}