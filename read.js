const fs = require("fs");

module.exports = (req, res) => {
  try {
    const data = fs.readFileSync("logs.txt", "utf8");
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Could not read logs.txt");
  }
};