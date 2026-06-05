import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-8 py-24">
      <div className="glass-card rounded-[40px] p-12">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              JobSphere AI
            </h2>

            <p className="text-zinc-600 mt-5 leading-relaxed">
              AI-powered career platform helping students and professionals
              discover jobs, improve resumes, and prepare for interviews.
            </p>

            <div className="flex gap-3 mt-6">
              <div className="bg-violet-100 text-violet-700 px-3 py-2 rounded-xl">
                AI Resume
              </div>

              <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-xl">
                Job Match
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900 mb-5 text-lg">
              Platform
            </h3>

            <ul className="space-y-4 text-zinc-600">
              <li><Link to="/jobs">Find Jobs</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/saved-jobs">Saved Jobs</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900 mb-5 text-lg">
              AI Features
            </h3>

            <ul className="space-y-4 text-zinc-600">
              <li>Resume Analysis</li>
              <li>Skill Detection</li>
              <li>Job Match Score</li>
              <li>Interview Questions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900 mb-5 text-lg">
              Stay Updated
            </h3>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter email"
                className="soft-input"
              />

              <button className="primary-btn w-full py-4">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500">
            © 2026 JobSphere AI. All rights reserved.
          </p>

          <p className="text-zinc-500 mt-3 md:mt-0">
            Built with React • Node.js • MongoDB • AI
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer