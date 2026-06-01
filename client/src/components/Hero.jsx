function Hero() {
  return (
    <section className="px-8 py-28 text-center flex flex-col items-center">

      {/* Badge */}
      <div className="mb-6 px-5 py-2 rounded-full bg-violet-100 text-violet-700 font-medium">
        ✨ AI Powered Career Platform
      </div>

      {/* Heading */}
      <h1 className="text-7xl font-black max-w-5xl leading-tight text-zinc-900">

        Discover Your{" "}
        <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
          Dream Career
        </span>{" "}
        Faster Than Ever

      </h1>

      {/* Description */}
      <p className="mt-8 max-w-2xl text-zinc-600 text-xl leading-relaxed">
        Explore thousands of curated jobs, connect with top companies,
        and get personalized AI recommendations built for the next generation.
      </p>

      {/* Search Box */}
      <div className="mt-12 bg-white shadow-2xl border border-zinc-200 rounded-3xl p-4 flex items-center gap-4 w-full max-w-3xl">

        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          className="flex-1 outline-none text-zinc-700 px-4 text-lg"
        />

        <button className="bg-gradient-to-r from-violet-600 to-blue-500 hover:scale-105 transition text-white px-8 py-4 rounded-2xl font-medium shadow-lg">
          Search
        </button>

      </div>

      {/* CTA Buttons */}
      <div className="flex gap-5 mt-10">

        <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-medium">
          Get Started
        </button>

        <button className="bg-white border border-zinc-200 px-8 py-4 rounded-2xl hover:bg-zinc-100 transition font-medium">
          Explore Jobs
        </button>

      </div>

    </section>
  )
}

export default Hero