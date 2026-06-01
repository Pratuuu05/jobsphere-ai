import { useEffect, useState } from "react"
import axios from "axios"

function EmployerDashboard() {
  const [jobs, setJobs] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  })

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs")
    setJobs(res.data)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/api/jobs", formData)

      alert("Job Posted Successfully!")

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      })

      fetchJobs()
    } catch (error) {
      console.log(error)
      alert("Failed to post job")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`)

      setJobs(jobs.filter((job) => job._id !== id))

      alert("Job deleted successfully!")
    } catch (error) {
      console.log(error)
      alert("Failed to delete job")
    }
  }

  return (
    <div className="min-h-screen px-6 py-20 bg-zinc-50">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[40px] shadow-2xl border border-zinc-200">
        <h1 className="text-5xl font-black text-zinc-900 text-center">
          Employer Dashboard
        </h1>

        <p className="text-center text-zinc-500 mt-4">
          Post and manage job opportunities
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <textarea
            name="description"
            placeholder="Job Description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white py-4 rounded-2xl font-semibold shadow-xl hover:scale-[1.02] transition"
          >
            Post Job
          </button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-4xl font-black text-zinc-900 mb-6">
          Posted Jobs
        </h2>

        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-lg flex justify-between items-center gap-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-zinc-900">
                  {job.title}
                </h3>

                <p className="text-zinc-500 mt-1">
                  {job.company} • {job.location} • {job.salary}
                </p>
              </div>

              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-100 text-red-600 px-5 py-3 rounded-2xl font-semibold hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmployerDashboard