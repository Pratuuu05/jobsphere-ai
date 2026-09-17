const axios = require("axios");
const Job = require("../models/Job");


// ========================================
// GET REAL JOBS FROM ADZUNA
// ========================================

const getJobs = async (req, res) => {
  try {
    const search = req.query.search?.trim() || "software developer";
    const location = req.query.location?.trim() || "";
    const page = Number(req.query.page) || 1;

    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    // Check API credentials
    if (!appId || !appKey) {
      return res.status(500).json({
        message: "Adzuna API credentials are missing",
      });
    }

    console.log("--------------------------------");
    console.log("ADZUNA JOB SEARCH");
    console.log("Search:", search);
    console.log("Location:", location);
    console.log("Page:", page);
    console.log("--------------------------------");

    const url =
      `https://api.adzuna.com/v1/api/jobs/in/search/${page}`;

    const params = {
      app_id: appId,
      app_key: appKey,
      results_per_page: 20,
      what: search,
    };

    // Add location only when provided
    if (location) {
      params.where = location;
    }

    const response = await axios.get(url, {
      params,
      headers: {
        Accept: "application/json",
      },
    });

    const results = response.data.results || [];

    console.log("Adzuna jobs received:", results.length);

    // ========================================
    // FORMAT ADZUNA JOBS
    // ========================================

    const jobs = results.map((job) => ({
      id: String(job.id),

      title:
        job.title || "Untitled Job",

      company:
        job.company?.display_name ||
        "Company not disclosed",

      location:
        job.location?.display_name ||
        "Location not disclosed",

      description:
        job.description ||
        "No description available.",

      salary:
        job.salary_min && job.salary_max
          ? `₹${Math.round(job.salary_min)} - ₹${Math.round(
              job.salary_max
            )}`
          : job.salary_min
          ? `From ₹${Math.round(job.salary_min)}`
          : "Salary not disclosed",

      url:
        job.redirect_url || "",

      created:
        job.created || null,

      contractType:
        job.contract_type ||
        "Not specified",

      contractTime:
        job.contract_time ||
        "Not specified",

      category:
        job.category?.label ||
        "Other",

      source: "Adzuna",
    }));

    // ========================================
    // RETURN REAL JOBS
    // ========================================

    res.json({
      count: response.data.count || jobs.length,
      jobs,
    });

  } catch (error) {

    console.error("--------------------------------");
    console.error("ADZUNA ERROR");
    console.error("--------------------------------");

    console.error(
      "Status:",
      error.response?.status
    );

    console.error(
      "Data:",
      error.response?.data
    );

    console.error(
      "Message:",
      error.message
    );

    res.status(
      error.response?.status || 500
    ).json({
      message: "Unable to fetch real jobs",
      status: error.response?.status || 500,
      error:
        error.response?.data ||
        error.message,
    });
  }
};


// ========================================
// GET SINGLE JOB
// ========================================

const getSingleJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// CREATE JOB
// ========================================

const createJob = async (req, res) => {
  try {

    const job = await Job.create(req.body);

    res.status(201).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// DELETE JOB
// ========================================

const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  getJobs,
  createJob,
  getSingleJob,
  deleteJob,
};