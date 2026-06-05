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
    <div className="px-8 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
            Career Command Center
          </span>

          <h1 className="text-6xl font-black text-zinc-900 mt-6">
            Dashboard
          </h1>

          <p className="text-zinc-600 mt-4 text-xl">
            Track your real applications, saved jobs, resume score and profile progress.
          </p>
        </div>

        <Link
          to="/profile"
          className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
        >
          Update Profile
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-16">
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-5xl font-black text-violet-600">
            {applications.length}
          </h2>
          <p className="text-zinc-600 mt-3 text-lg">Applications</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-5xl font-black text-blue-600">
            {savedJobs.length}
          </h2>
          <p className="text-zinc-600 mt-3 text-lg">Saved Jobs</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-5xl font-black text-green-600">
            {profile?.resumeScore || 0}
          </h2>
          <p className="text-zinc-600 mt-3 text-lg">Resume Score</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg">
          <h2 className="text-5xl font-black text-pink-600">
            {profileCompletion}%
          </h2>
          <p className="text-zinc-600 mt-3 text-lg">Profile Completion</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-16">
        <div className="bg-white border border-zinc-200 rounded-[35px] p-8 shadow-lg">
          <h2 className="text-3xl font-black text-zinc-900">
            AI Career Actions
          </h2>

          <div className="grid gap-4 mt-8">
            <Link
              to="/resume-analyzer"
              className="bg-violet-600 text-white rounded-2xl px-6 py-4 font-semibold"
            >
              Analyze Resume
            </Link>

            <Link
              to="/jobs"
              className="bg-zinc-900 text-white rounded-2xl px-6 py-4 font-semibold"
            >
              Find Matching Jobs
            </Link>

            <Link
              to="/saved-jobs"
              className="bg-blue-600 text-white rounded-2xl px-6 py-4 font-semibold"
            >
              View Saved Jobs
            </Link>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-[35px] p-8 shadow-lg">
          <h2 className="text-3xl font-black text-zinc-900">
            Profile Snapshot
          </h2>

          <div className="mt-8 space-y-4 text-lg">
            <p><strong>Name:</strong> {profile?.name || "Not added"}</p>
            <p><strong>Email:</strong> {profile?.email || "Not added"}</p>
            <p><strong>Location:</strong> {profile?.location || "Not added"}</p>
            <p><strong>Role:</strong> {profile?.role || "Not added"}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-xl">Skills</h3>

            <div className="flex flex-wrap gap-2 mt-3">
              {profile?.skills?.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full"
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