import { Link } from "react-router-dom"

function JobCard({ job }) {

  return (

    <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">

      {/* Company */}
      <p className="text-violet-600 font-semibold text-sm">
        {job.company}
      </p>

      {/* Title */}
      <h2 className="text-2xl font-bold text-zinc-900 mt-3">
        {job.title}
      </h2>

      {/* Tags */}
      <div className="flex gap-3 flex-wrap mt-5">

        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium">
          {job.salary}
        </span>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          {job.location}
        </span>

      </div>

      {/* Button */}
      <Link to={`/jobs/${job._id}`}>

        <button className="mt-8 w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition">

          View Details

        </button>

      </Link>

    </div>
  )
}

export default JobCard