import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [applications, setApplications] = useState([])

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const profileRes = await axios.get(
          "https://jobsphere-ai.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const savedRes = await axios.get(
          "https://jobsphere-ai.onrender.com/api/users/saved-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setProfile(profileRes.data)
        setSavedJobs(savedRes.data)

        try {
          const appRes = await axios.get(
            "https://jobsphere-ai.onrender.com/api/applications",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          setApplications(appRes.data)
        } catch {
          setApplications([])
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchDashboard()
  }, [token])

  const profileCompletion = profile
    ? Math.round(
        ([
          profile.name,
          profile.email,
          profile.location,
          profile.bio,
          profile.skills?.length > 0,
          profile.resumeScore > 0,
        ].filter(Boolean).length /
          6) *
          100
      )
    : 0

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="text-center max-w-4xl mx-auto">
        <span className="bg-white/80 border border-violet-200 text-violet-700 px-6 py-3 rounded-full font-bold shadow-sm">
          📊 Career Command Center
        </span>

        <h1 className="text-6xl md:text-7xl font-black text-zinc-900 mt-7">
          Your{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
            Career Dashboard
          </span>
        </h1>

        <p className="text-zinc-600 mt-6 text-xl">
          Track your applications, saved jobs, resume score and profile progress.
        </p>

        <Link
          to="/profile"
          className="inline-block mt-8 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-[20px] font-bold shadow-lg hover:scale-[1.02] transition"
        >
          Update Profile
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-16">
        <div className="glass-card rounded-[32px] p-8 text-center">
          <h2 className="text-6xl font-black text-violet-600">
            {applications.length}
          </h2>
          <p className="text-zinc-600 mt-3 text-lg font-semibold">
            Applications
          </p>
        </div>

        <div className="glass-card rounded-[32px] p-8 text-center">
          <h2 className="text-6xl font-black text-blue-600">
            {savedJobs.length}
          </h2>
          <p className="text-zinc-600 mt-3 text-lg font-semibold">
            Saved Jobs
          </p>
        </div>

        <div className="glass-card rounded-[32px] p-8 text-center">
          <h2 className="text-6xl font-black text-green-600">
            {profile?.resumeScore || 0}
          </h2>
          <p className="text-zinc-600 mt-3 text-lg font-semibold">
            Resume Score
          </p>
        </div>

        <div className="glass-card rounded-[32px] p-8 text-center">
          <h2 className="text-6xl font-black text-pink-600">
            {profileCompletion}%
          </h2>
          <p className="text-zinc-600 mt-3 text-lg font-semibold">
            Profile Completion
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-16">
        <div className="glass-card rounded-[35px] p-8">
          <h2 className="text-4xl font-black text-zinc-900">
            AI Career Actions
          </h2>

          <div className="grid gap-4 mt-8">
            <Link
              to="/resume-analyzer"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-[20px] px-6 py-4 font-bold shadow-lg hover:scale-[1.02] transition"
            >
              Analyze Resume
            </Link>

            <Link
              to="/jobs"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-[20px] px-6 py-4 font-bold shadow-lg hover:scale-[1.02] transition"
            >
              Find Matching Jobs
            </Link>

            <Link
              to="/saved-jobs"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-[20px] px-6 py-4 font-bold shadow-lg hover:scale-[1.02] transition"
            >
              View Saved Jobs
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-[35px] p-8">
          <h2 className="text-4xl font-black text-zinc-900">
            Profile Snapshot
          </h2>

          <div className="mt-8 space-y-4 text-lg text-zinc-700">
            <p>
              <strong>Name:</strong> {profile?.name || "Not added"}
            </p>

            <p>
              <strong>Email:</strong> {profile?.email || "Not added"}
            </p>

            <p>
              <strong>Location:</strong> {profile?.location || "Not added"}
            </p>

            <p>
              <strong>Role:</strong> {profile?.role || "Not added"}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-xl">Skills</h3>

            <div className="flex flex-wrap gap-2 mt-3">
              {profile?.skills?.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-semibold"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-zinc-500">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard