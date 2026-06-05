import { useState } from "react"
import axios from "axios"

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  const analyzeResumeText = async () => {
    try {
      setLoading(true)

      const res = await axios.post(
        "https://jobsphere-ai.onrender.com/api/users/analyze-resume",
        {
          resumeText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setResult(res.data)
    } catch (error) {
      alert(error.response?.data?.message || "Resume analysis failed")
    } finally {
      setLoading(false)
    }
  }

  const uploadResumePDF = async () => {
    try {
      if (!resumeFile) {
        alert("Please select a PDF file first")
        return
      }

      setLoading(true)

      const formData = new FormData()
      formData.append("resume", resumeFile)

      const res = await axios.post(
        "https://jobsphere-ai.onrender.com/api/users/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setResult(res.data)
      setResumeText(res.data.resumeText || "")
    } catch (error) {
      alert(error.response?.data?.message || "PDF upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center">
        <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-semibold">
          AI Resume Intelligence
        </span>

        <h1 className="text-5xl font-black text-zinc-900 mt-6">
          AI Resume Analyzer
        </h1>

        <p className="text-zinc-600 mt-4 text-lg">
          Upload your resume PDF or paste resume text to get instant AI feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-white rounded-[35px] shadow-xl border border-zinc-200 p-8">
          <h2 className="text-3xl font-black mb-5">
            Upload Resume PDF
          </h2>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4"
          />

          <button
            onClick={uploadResumePDF}
            disabled={loading}
            className="mt-5 w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-4 rounded-2xl font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Upload & Analyze PDF"}
          </button>

          <div className="mt-8 bg-violet-50 rounded-3xl p-6">
            <h3 className="font-bold text-xl text-violet-800">
              What this feature does
            </h3>

            <ul className="list-disc pl-5 mt-4 text-violet-700 space-y-2">
              <li>Extracts resume text from PDF</li>
              <li>Detects technical skills</li>
              <li>Generates resume score</li>
              <li>Saves skills to your profile</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-[35px] shadow-xl border border-zinc-200 p-8">
          <h2 className="text-3xl font-black mb-5">
            Or Paste Resume Text
          </h2>

          <textarea
            rows="12"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume here..."
            className="w-full border border-zinc-300 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <button
            onClick={analyzeResumeText}
            disabled={loading}
            className="mt-5 w-full bg-zinc-900 text-white px-6 py-4 rounded-2xl font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white mt-10 rounded-[35px] shadow-xl border border-zinc-200 p-8">
          <h2 className="text-4xl font-black">
            Resume Score:{" "}
            <span className="text-green-600">
              {result.score}/100
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-bold text-2xl">
                Matched Skills
              </h3>

              <div className="flex gap-2 flex-wrap mt-4">
                {result.matchedSkills?.length > 0 ? (
                  result.matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-zinc-500">
                    No matched skills detected.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-2xl">
                Suggestions
              </h3>

              <ul className="list-disc pl-5 mt-4 space-y-3 text-zinc-700">
                {result.suggestions?.length > 0 ? (
                  result.suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>Your resume has good basic coverage.</li>
                )}
              </ul>
            </div>
          </div>

          {result.resumeText && (
            <div className="mt-8">
              <h3 className="font-bold text-2xl">
                Extracted Resume Text
              </h3>

              <div className="mt-4 max-h-72 overflow-y-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-5 text-sm text-zinc-600 whitespace-pre-wrap">
                {result.resumeText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ResumeAnalyzer