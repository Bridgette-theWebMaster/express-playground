const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore-data.js");
const app = express();
const cors = require("cors");

app.use(morgan("common"));
app.use(cors());

app.get("/playstore", (req, res) => {
  const { genres = "", sort } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  let results = playstore.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.export = app
