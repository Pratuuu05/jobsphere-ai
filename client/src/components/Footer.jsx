function Footer() {
  return (
    <footer className="px-8 py-20 mt-24">

      <div className="bg-white/70 backdrop-blur-2xl border border-zinc-200 rounded-[40px] shadow-2xl p-12">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              JobSphere AI
            </h2>

            <p className="text-zinc-600 mt-5 leading-relaxed">
              AI powered platform helping candidates discover modern career opportunities faster and smarter.
            </p>

          </div>

          {/* Platform */}
          <div>

            <h3 className="font-bold text-zinc-900 mb-5">
              Platform
            </h3>

            <ul className="space-y-4 text-zinc-600">

              <li className="hover:text-violet-600 cursor-pointer transition">
                Find Jobs
              </li>

              <li className="hover:text-violet-600 cursor-pointer transition">
                Companies
              </li>

              <li className="hover:text-violet-600 cursor-pointer transition">
                Dashboard
              </li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h3 className="font-bold text-zinc-900 mb-5">
              Company
            </h3>

            <ul className="space-y-4 text-zinc-600">

              <li className="hover:text-violet-600 cursor-pointer transition">
                About
              </li>

              <li className="hover:text-violet-600 cursor-pointer transition">
                Careers
              </li>

              <li className="hover:text-violet-600 cursor-pointer transition">
                Contact
              </li>

            </ul>

          </div>

          {/* Newsletter */}
          <div>

            <h3 className="font-bold text-zinc-900 mb-5">
              Stay Updated
            </h3>

            <div className="flex flex-col gap-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200 transition"
              />

              <button className="bg-gradient-to-r from-violet-600 to-blue-500 hover:scale-[1.02] transition text-white py-4 rounded-2xl font-semibold shadow-lg">
                Subscribe
              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-200 mt-12 pt-8 text-center text-zinc-500">
          © 2026 JobSphere AI. Crafted for the next generation.
        </div>

      </div>

    </footer>
  )
}

export default Footer