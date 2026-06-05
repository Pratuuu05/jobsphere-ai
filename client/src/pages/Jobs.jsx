import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import JobCard from "../components/JobCard"

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState("All")
  const [companyFilter, setCompanyFilter] = useState("All")
  const [salaryFilter, setSalaryFilter] = useState("All")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://jobsphere-ai.onrender.com/api/jobs"
        )
        setJobs(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchJobs()
  }, [])

  const locations = useMemo(
    () => ["All", ...new Set(jobs.map((job) => job.location).filter(Boolean))],
    [jobs]
  )

  const companies = useMemo(
    () => ["All", ...new Set(jobs.map((job) => job.company).filter(Boolean))],
    [jobs]
  )

  const getSalaryNumber = (salary = "") => {
    const match = salary.toString().match(/\d+/)
    return match ? Number(match[0]) : 0
  }

  const filteredJobs = jobs.filter((job) => {
    const text = `${job.title} ${job.company} ${job.location} ${job.description}`.toLowerCase()

    const salaryNumber = getSalaryNumber(job.salary)

    return (
      text.includes(search.toLowerCase()) &&
      (locationFilter === "All" || job.location === locationFilter) &&
      (companyFilter === "All" || job.company === companyFilter) &&
      (salaryFilter === "All" ||
        (salaryFilter === "0-10" && salaryNumber <= 10) ||
        (salaryFilter === "10-20" && salaryNumber > 10 && salaryNumber <= 20) ||
        (salaryFilter === "20+" && salaryNumber > 20))
    )
  })

  const clearFilters = () => {
    setSearch("")
    setLocationFilter("All")
    setCompanyFilter("All")
    setSalaryFilter("All")
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="text-center max-w-4xl mx-auto">
        <span className="bg-white/80 border border-violet-200 text-violet-700 px-6 py-3 rounded-full font-bold shadow-sm">
          🔍 AI Powered Job Discovery
        </span>

        <h1 className="text-6xl md:text-7xl font-black text-zinc-900 mt-7">
          Find Your{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
            Perfect Job
          </span>
        </h1>

        <p className="text-zinc-600 mt-6 text-xl">
          Search, filter, save and match jobs with your career profile.
        </p>
      </div>

      <div className="glass-card rounded-[35px] p-6 mt-14">
        <input
          type="text"
          placeholder="Search role, company, location or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="soft-input"
        />

        <div className="grid md:grid-cols-4 gap-5 mt-5">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="soft-input"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location === "All" ? "All Locations" : location}
              </option>
            ))}
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="soft-input"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company === "All" ? "All Companies" : company}
              </option>
            ))}
          </select>

          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            className="soft-input"
          >
            <option value="All">All Salaries</option>
            <option value="0-10">Up to 10 LPA</option>
            <option value="10-20">10 - 20 LPA</option>
            <option value="20+">Above 20 LPA</option>
          </select>

          <button onClick={clearFilters} className="dark-btn px-5 py-4">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-zinc-600 text-lg">
          Found <strong>{filteredJobs.length}</strong> jobs
        </p>

        <p className="text-zinc-500">
          Use AI Match Score inside job details.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <div className="col-span-full text-center py-20 glass-card rounded-[35px]">
            <h2 className="text-3xl font-black text-zinc-800">
              No Jobs Found
            </h2>
            <p className="text-zinc-500 mt-4">
              Try another keyword or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs