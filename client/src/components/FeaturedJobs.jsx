import JobCard from "./JobCard"

function FeaturedJobs() {

  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      salary: "₹12 LPA",
      location: "Remote"
    },

    {
      title: "Backend Developer",
      company: "Microsoft",
      salary: "₹15 LPA",
      location: "Bangalore"
    },

    {
      title: "UI/UX Designer",
      company: "Adobe",
      salary: "₹10 LPA",
      location: "Mumbai"
    }
  ]

  return (
    <section className="px-8 py-20">

      {/* Heading */}
      <div className="text-center mb-14">

        <h2 className="text-5xl font-black text-zinc-900">
          Featured Jobs
        </h2>

        <p className="text-zinc-600 mt-4 text-lg">
          Explore trending opportunities from top companies
        </p>

      </div>

      {/* Job Grid */}
      <div className="grid md:grid-cols-3 gap-8">

        {jobs.map((job, index) => (
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