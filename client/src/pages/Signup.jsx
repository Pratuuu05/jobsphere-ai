import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        "http://jobsphere-ai.onrender.com/api/auth/register",
        formData
      )

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      )

      alert("Signup Successful!")

      navigate("/jobs")

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      )

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center px-6">

      <div className="bg-white shadow-2xl rounded-[40px] p-10 w-full max-w-md border border-zinc-200">

        <h1 className="text-5xl font-black text-center text-zinc-900">
          Create Account
        </h1>

        <p className="text-center text-zinc-500 mt-4">
          Join JobSphere AI today
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none"
          >

            <option value="user">
              Job Seeker
            </option>

            <option value="employer">
              Employer
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white py-4 rounded-2xl font-semibold shadow-xl hover:scale-[1.02] transition"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>

  )
}

export default Signup