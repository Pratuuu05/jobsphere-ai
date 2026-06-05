import { useEffect, useState } from "react"
import axios from "axios"

function Profile() {
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
    skills: "",
    resumeText: "",
  })

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://jobsphere-ai.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setProfile(res.data)

        setFormData({
          name: res.data.name || "",
          location: res.data.location || "",
          bio: res.data.bio || "",
          skills: res.data.skills?.join(", ") || "",
          resumeText: res.data.resumeText || "",
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [token])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        "https://jobsphere-ai.onrender.com/api/users/profile",
        {
          name: formData.name,
          location: formData.location,
          bio: formData.bio,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          resumeText: formData.resumeText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProfile(res.data)
      alert("Profile updated successfully!")
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed")
    }
  }

  if (!profile) return <h1 className="p-10">Loading...</h1>

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-[35px] shadow-xl p-8 border border-zinc-200">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 flex items-center justify-center text-white text-5xl font-black">
            {profile.name?.charAt(0)?.toUpperCase()}
          </div>

          <h1 className="text-4xl font-black mt-6">
            {profile.name}
          </h1>

          <p className="text-zinc-500 mt-2">
            {profile.email}
          </p>

          <span className="inline-block mt-5 bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            {profile.role}
          </span>

          <div className="mt-8">
            <h2 className="font-bold text-xl">
              Resume Score
            </h2>

            <p className="text-6xl font-black text-green-600 mt-3">
              {profile.resumeScore || 0}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-xl mb-3">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-zinc-500">
                  No skills added yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[35px] shadow-xl p-8 border border-zinc-200">
          <h2 className="text-4xl font-black mb-8">
            Edit Profile
          </h2>

          <form onSubmit={updateProfile} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />

            <textarea
              name="bio"
              placeholder="Short bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills comma separated e.g. React, Node, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />

            <textarea
              name="resumeText"
              placeholder="Paste your resume summary here"
              value={formData.resumeText}
              onChange={handleChange}
              rows="8"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
