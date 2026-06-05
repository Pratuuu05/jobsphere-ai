import { useEffect, useState } from "react"
import axios from "axios"

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          "https://jobsphere-ai.onrender.com/api/users/saved-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setSavedJobs(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSavedJobs()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <h1 className="text-6xl font-black text-zinc-900">
        Saved Jobs
      </h1>

      <p className="text-zinc-600 mt-4 text-xl">
        Jobs you saved for later
      </p>

      <div className="mt-12 space-y-6">
        {savedJobs.length > 0 ? (
          savedJobs.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg border border-zinc-200 p-8"
            >
              <p className="text-violet-600 font-semibold">
                {item.job.company}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.job.title}
              </h2>

              <div className="flex gap-4 mt-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  {item.job.location}
                </span>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  {item.job.salary}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">
              No Saved Jobs Yet
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedJobs