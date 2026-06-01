import { useState } from "react"
import axios from "axios"

function ApplicationModal({ jobId, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://jobsphere-ai.onrender.com/api/applications",
        {
          jobId,
          ...formData,
        }
      )

      alert("Application Submitted Successfully!")

      closeModal()
    } catch (error) {
      console.log(error)
      alert("Failed to submit application")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-[400px]">
        <h2 className="text-2xl font-bold mb-4">
          Apply for Job
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border p-3 mb-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border p-3 mb-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="resume"
            placeholder="Resume Link"
            className="w-full border p-3 mb-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-5 py-3 rounded-lg w-full"
          >
            Submit Application
          </button>
        </form>

        <button
          onClick={closeModal}
          className="mt-4 text-red-500"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ApplicationModal