import { Link } from "react-router-dom"

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent"
        >
          JobSphere AI
        </Link>

        <ul className="hidden lg:flex gap-7 text-zinc-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/employer">Employer</Link></li>
          <li><Link to="/applications">Applications</Link></li>
        </ul>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white"
          >
            Sign Up
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500 text-white"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar