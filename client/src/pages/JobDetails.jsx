import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ApplicationModal from "../components/ApplicationModal"

function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [match, setMatch] = useState(null)
  const [questions, setQuestions] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `https://jobsphere-ai.onrender.com/api/jobs/${id}`
        )
        setJob(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchJob()
  }, [id])

  const saveJob = async () => {
    try {
      if (!token) return alert("Please login first")

      await axios.post(
        `https://jobsphere-ai.onrender.com/api/users/save-job/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert("Job saved successfully!")
    } catch (error) {
      alert(error.response?.data?.message || "Could not save job")
    }
  }

  const getMatchScore = async () => {
    try {
      if (!token) return alert("Please login first")

      const res = await axios.get(
        `https://jobsphere-ai.onrender.com/api/users/job-match/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setMatch(res.data)
    } catch (error) {
      alert(error.response?.data?.message || "Could not calculate match")
    }
  }

  const getInterviewQuestions = async () => {
    try {
      if (!token) return alert("Please login first")

      const res = await axios.get(
        `https://jobsphere-ai.onrender.com/api/users/interview-questions/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setQuestions(res.data.questions)
    } catch (error) {
      alert(error.response?.data?.message || "Could not generate questions")
    }
  }

  if (!job) {
    return (
      <div className="text-center py-40 text-3xl font-bold text-zinc-700">
        Loading...
      </div>
    )
  }

  return (
    <div className="px-8 py-20 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[40px] p-10">
          <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-semibold">
            {job.company}
          </span>

          <h1 className="text-6xl font-black text-zinc-900 mt-8">
            {job.title}
          </h1>

          <div className="flex gap-4 mt-8 flex-wrap">
            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
              📍 {job.location}
            </span>

            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
              💰 {job.salary}
            </span>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-black text-zinc-900">
              Job Description
            </h2>

            <p className="text-zinc-600 mt-5 text-lg leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-black text-zinc-900">
              Requirements
            </h2>

            <ul className="mt-5 space-y-4 text-zinc-600 text-lg">
              <li>• Strong communication skills</li>
              <li>• Experience with modern technologies</li>
              <li>• Problem solving mindset</li>
              <li>• Team collaboration experience</li>
            </ul>
          </div>

          {match && (
            <div className="mt-12 bg-green-50 border border-green-200 rounded-3xl p-8">
              <h2 className="text-4xl font-black text-green-700">
                AI Match Score: {match.matchScore}%
              </h2>

              <p className="mt-4 text-green-800 text-lg">
                {match.message}
              </p>

              <div className="flex gap-2 mt-5 flex-wrap">
                {match.matchedSkills.length > 0 ? (
                  match.matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-green-700 px-4 py-2 rounded-full font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-green-700">
                    Add more skills in your profile to improve matching.
                  </p>
                )}
              </div>
            </div>
          )}

          {questions.length > 0 && (
            <div className="mt-12 bg-orange-50 border border-orange-200 rounded-3xl p-8">
              <h2 className="text-4xl font-black text-orange-700">
                AI Interview Questions
              </h2>

              <ul className="list-disc pl-6 mt-5 space-y-3 text-zinc-700 text-lg">
                {questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="glass-card rounded-[40px] p-8 h-fit sticky top-28">
          <h2 className="text-3xl font-black text-zinc-900">
            Career Actions
          </h2>

          <div className="grid gap-4 mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="primary-btn px-8 py-4"
            >
              Apply Now
            </button>

            <button
              className="
              bg-white
             border-2
             border-pink-200
             text-pink-600
             py-4
             rounded-[20px]
             font-bold
             hover:bg-pink-50
             transition
             shadow-md
             "
            >
             Save Job ❤️
            </button>

            <button
              onClick={getMatchScore}
              className="bg-green-600 text-white px-8 py-4 rounded-[18px] font-bold hover:bg-green-700 transition"
            >
              Get AI Match Score
            </button>

            <button
              onClick={getInterviewQuestions}
              className="bg-orange-500 text-white px-8 py-4 rounded-[18px] font-bold hover:bg-orange-600 transition"
            >
              Generate Interview Questions
            </button>
          </div>

          <div className="mt-8 bg-zinc-50 rounded-3xl p-5">
            <p className="text-zinc-600">
              Tip: Update your profile skills and resume score to improve your AI match results.
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <ApplicationModal
          jobId={job._id}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default JobDetails