const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const { translate } = require("bing-translate-api");
const { formatDate } = require("@fullcalendar/core");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/genshin", (req, res) => {
  // 米游社 API
  url = "https://bbs-api-static.miyoushe.com/apihub/wapi/webHome?gids=2";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
});

app.get("/translate", (req, res) => {
  console.log(req.query);
  const { text, from, to } = req.query;
  translate(text, from, to)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
});

let port = 62801;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
