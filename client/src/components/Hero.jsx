import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="relative px-8 py-32 text-center overflow-hidden">
      <div className="absolute top-16 left-20 w-80 h-80 bg-violet-300 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute top-40 right-1/3 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-7 px-6 py-3 rounded-full bg-white/80 shadow-md border border-violet-200 text-violet-700 font-bold">
          ✨ AI Powered Career Platform
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-tight text-zinc-900">
          Build Your{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
            Dream Career
          </span>{" "}
          With AI
        </h1>

        <p className="mt-8 max-w-3xl text-zinc-600 text-xl md:text-2xl leading-relaxed">
          Find jobs, improve your resume, match your skills with roles, save
          opportunities and prepare for interviews in one intelligent platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <Link to="/signup" className="primary-btn px-10 py-5 text-center">
            Get Started Free
          </Link>

          <Link to="/jobs" className="dark-btn px-10 py-5 text-center">
            Explore Jobs
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16 w-full">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-4xl font-black text-violet-600">10K+</h3>
            <p className="text-zinc-500 mt-2">Jobs</p>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-4xl font-black text-blue-600">500+</h3>
            <p className="text-zinc-500 mt-2">Companies</p>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-4xl font-black text-pink-600">AI</h3>
            <p className="text-zinc-500 mt-2">Resume Score</p>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-4xl font-black text-green-600">95%</h3>
            <p className="text-zinc-500 mt-2">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero