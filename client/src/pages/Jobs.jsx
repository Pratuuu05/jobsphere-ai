import { useEffect, useState } from "react"
import axios from "axios"

import JobCard from "../components/JobCard"

function Jobs() {

  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState("All")

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/jobs"
        )

        setJobs(response.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchJobs()

  }, [])

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      locationFilter === "All" ||
      job.location === locationFilter

    return matchesSearch && matchesLocation

  })

  return (

    <div className="px-8 py-20">

      {/* Heading */}
      <div className="text-center">

        <h1 className="text-6xl font-black text-zinc-900">
          Explore Jobs
        </h1>

        <p className="text-zinc-600 mt-5 text-xl">
          Discover opportunities tailored for your future
        </p>

      </div>

      {/* Search + Filter */}
      <div className="mt-14 bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-6 shadow-lg flex flex-col md:flex-row gap-5">

        <input
          type="text"
          placeholder="Search jobs or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="bg-white border border-zinc-300 rounded-2xl px-5 py-4 outline-none"
        >

          <option value="All">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Hyderabad">Hyderabad</option>

        </select>

      </div>

      {/* Results Count */}
      <p className="mt-8 text-zinc-600 text-lg">
        Found {filteredJobs.length} jobs
      </p>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (

            <JobCard
              key={job._id}
              job={job}
            />

          ))

        ) : (

          <div className="col-span-full text-center py-20">

            <h2 className="text-3xl font-bold text-zinc-700">
              No Jobs Found
            </h2>

            <p className="text-zinc-500 mt-4">
              Try searching with another keyword or location.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default Jobs