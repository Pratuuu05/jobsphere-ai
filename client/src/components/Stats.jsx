function Stats() {
  const stats = [
    {
      number: "10K+",
      label: "Active Jobs",
      icon: "💼",
    },
    {
      number: "500+",
      label: "Companies",
      icon: "🏢",
    },
    {
      number: "15K+",
      label: "Candidates",
      icon: "👨‍💻",
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: "🚀",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="text-center mb-14">
        <h2 className="text-5xl font-black text-zinc-900">
          Trusted By Thousands
        </h2>

        <p className="text-zinc-600 text-xl mt-4">
          Helping students and professionals land better opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card rounded-[32px] p-10 text-center hover:-translate-y-2 transition-all duration-300"
          >
            <div className="text-5xl mb-5">
              {stat.icon}
            </div>

            <h2 className="text-6xl font-black bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              {stat.number}
            </h2>

            <p className="text-zinc-600 mt-5 text-lg font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats