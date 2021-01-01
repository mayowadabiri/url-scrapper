// @ts-nocheck

const axios = require("axios");
const $ = require("cheerio");
const url = "https://www.interswitchgroup.com/news/insights";

axios
  .get(url)
  .then(async (result) => {
    const links = $(".insight_link", result.data)
      .get()
      .map((x) => $(x).attr("href"));

    const link = await Promise.all(
      links.map(async (url) => {
        const filter = await axios.get(
          `https://www.interswitchgroup.com${url}`
        );
        const filtered = $("p", filter.data).text();
        if (
          filtered.includes("CEO") ||
          filtered.includes("COO") ||
          filtered.includes("Manager") ||
          filtered.includes("President") ||
          filtered.includes("Vice President")
        ) {
          return url;
        }
      })
    );

    console.log(link.filter((url) => url));
  })
  .catch((error) => {
    console.log(error);
  });
