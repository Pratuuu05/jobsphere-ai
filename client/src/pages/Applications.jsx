import { useEffect, useState } from "react"
import axios from "axios"

function Applications() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "http://jobsphere-ai.onrender.com/api/applications"
        )

        setApplications(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchApplications()
  }, [])

  return (
    <div className="px-8 py-20 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-zinc-900">
        Job Applications
      </h1>

      <div className="mt-10 space-y-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-zinc-900">
              {app.name}
            </h2>

            <p className="text-zinc-600 mt-2">
              Email: {app.email}
            </p>

            <p className="text-zinc-600 mt-2">
              Resume: {app.resume}
            </p>

            <p className="text-violet-600 font-semibold mt-4">
              Applied For: {app.jobId?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Applications