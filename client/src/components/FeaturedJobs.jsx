import JobCard from "./JobCard"

function FeaturedJobs() {
  const jobs = [
    {
      _id: "1",
      title: "Frontend Developer",
      company: "Google",
      salary: "₹12 LPA",
      location: "Remote",
    },
    {
      _id: "2",
      title: "Backend Developer",
      company: "Microsoft",
      salary: "₹15 LPA",
      location: "Bangalore",
    },
    {
      _id: "3",
      title: "UI/UX Designer",
      company: "Adobe",
      salary: "₹10 LPA",
      location: "Mumbai",
    },
  ]

  return (
    <section className="px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-semibold">
          Featured Opportunities
        </span>

        <h2 className="text-6xl font-black text-zinc-900 mt-6">
          Top Jobs This Week
        </h2>

        <p className="text-zinc-600 mt-5 text-xl">
          Discover hand-picked opportunities from leading companies.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedJobs