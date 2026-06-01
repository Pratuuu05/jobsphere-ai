import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://jobsphere-ai.onrender.com/api/auth/login",
        formData
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data))

      alert("Login Successful!")

      if (res.data.role === "employer") {
        navigate("/employer")
      } else {
        navigate("/jobs")
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6">
      <div className="bg-white shadow-2xl rounded-[40px] p-10 w-full max-w-md border border-zinc-200">
        <h1 className="text-5xl font-black text-center text-zinc-900">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4"
          />

          <button className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white py-4 rounded-2xl font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login