import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import ApplicationModal from "../components/ApplicationModal"

function JobDetails() {

  const { id } = useParams()

  const [job, setJob] = useState(null)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const res = await axios.get(
          `http://jobsphere-ai.onrender.com/api/jobs/${id}`
        )

        setJob(res.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchJob()

  }, [id])

  // LOADING STATE
  if (!job) {

    return (

      <div className="text-center py-40 text-3xl font-bold text-zinc-700">
        Loading...
      </div>

    )

  }

  return (

    <div className="px-8 py-20 max-w-5xl mx-auto">

      <div className="bg-white border border-zinc-200 rounded-[40px] shadow-xl p-12">

        {/* Company */}
        <p className="text-violet-600 font-semibold text-lg">
          {job.company}
        </p>

        {/* Title */}
        <h1 className="text-6xl font-black text-zinc-900 mt-4">
          {job.title}
        </h1>

        {/* Tags */}
        <div className="flex gap-4 mt-8 flex-wrap">

          <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-medium">
            {job.salary}
          </span>

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium">
            {job.location}
          </span>

        </div>

        {/* Description */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold text-zinc-900">
            Job Description
          </h2>

          <p className="text-zinc-600 mt-5 text-lg leading-relaxed">
            {job.description}
          </p>

        </div>

        {/* Requirements */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold text-zinc-900">
            Requirements
          </h2>

          <ul className="mt-5 space-y-4 text-zinc-600 text-lg">

            <li>• Strong communication skills</li>
            <li>• Experience with modern technologies</li>
            <li>• Problem solving mindset</li>
            <li>• Team collaboration experience</li>

          </ul>

        </div>

        {/* Apply Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-14 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-10 py-5 rounded-2xl font-semibold shadow-xl hover:scale-[1.02] transition"
        >
          Apply Now
        </button>

        {/* Application Modal */}
        {showModal && (

          <ApplicationModal
            jobId={job._id}
            closeModal={() => setShowModal(false)}
          />

        )}

      </div>

    </div>

  )
}

export default JobDetails