const express = require("express");
const db = require("./repository.js");
const reviews = require("./controller.js");

const app = express();
const port = 3001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// API
app.get("/api/reviews/", async function (req, res) {
  reviews.findAll(req.body, res);
});

app.post("/api/reviews/", function (req, res) {
  reviews.create(req.body, res);
});

db.connect()
  .then(() => {
    console.log("Successfully connected to the db.");
  })
  .catch((err) => {
    console.error("Failed to connect to db.", err);
    process.exit();
  });

process.on("exit", function () {
  db.close();
});

app.listen(port, () => console.log("Live on http://localhost:" + port));