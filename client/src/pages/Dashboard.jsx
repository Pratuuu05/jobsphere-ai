function Dashboard() {

  const appliedJobs = [
    {
      company: "Google",
      role: "Frontend Developer",
      status: "Interview"
    },

    {
      company: "Microsoft",
      role: "Backend Engineer",
      status: "Applied"
    },

    {
      company: "Netflix",
      role: "DevOps Engineer",
      status: "Rejected"
    }
  ]

  return (
    <div className="px-8 py-20 max-w-7xl mx-auto">

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>

          <h1 className="text-6xl font-black text-zinc-900">
            Dashboard
          </h1>

          <p className="text-zinc-600 mt-4 text-xl">
            Track your applications and career progress
          </p>

        </div>

        <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition">
          Update Profile
        </button>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">

        <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-5xl font-black text-violet-600">
            12
          </h2>

          <p className="text-zinc-600 mt-3 text-lg">
            Applications Sent
          </p>

        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-5xl font-black text-blue-600">
            4
          </h2>

          <p className="text-zinc-600 mt-3 text-lg">
            Interviews
          </p>

        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-5xl font-black text-pink-600">
            8
          </h2>

          <p className="text-zinc-600 mt-3 text-lg">
            Saved Jobs
          </p>

        </div>

      </div>

      {/* Applied Jobs */}
      <div className="mt-20">

        <h2 className="text-4xl font-black text-zinc-900">
          Applied Jobs
        </h2>

        <div className="mt-10 space-y-6">

          {appliedJobs.map((job, index) => (

            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >

              <div>

                <p className="text-violet-600 font-semibold">
                  {job.company}
                </p>

                <h3 className="text-3xl font-bold text-zinc-900 mt-2">
                  {job.role}
                </h3>

              </div>

              <div>

                <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-medium">
                  {job.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard