function Stats() {

  const stats = [
    {
      number: "10K+",
      label: "Active Jobs"
    },

    {
      number: "500+",
      label: "Companies"
    },

    {
      number: "15K+",
      label: "Candidates"
    },

    {
      number: "95%",
      label: "Success Rate"
    }
  ]

  return (
    <section className="px-8 py-24">

      <div className="grid md:grid-cols-4 gap-8">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* Number */}
            <h2 className="text-6xl font-black bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              {stat.number}
            </h2>

            {/* Label */}
            <p className="text-zinc-600 mt-5 text-lg font-medium">
              {stat.label}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Stats