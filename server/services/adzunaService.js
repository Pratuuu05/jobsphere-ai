const axios = require("axios");

const searchAdzunaJobs = async ({
  page = 1,
  keyword = "",
  location = "",
} = {}) => {
  try {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      throw new Error("Adzuna API credentials are missing");
    }

    const country = "in";

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

    const params = {
      app_id: appId,
      app_key: appKey,
      results_per_page: 20,
      what: keyword,
      where: location,
      contenttype: "application/json",
    };

    const response = await axios.get(url, { params });

    return response.data;
  } catch (error) {
    console.error(
      "Adzuna API error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = {
  searchAdzunaJobs,
};