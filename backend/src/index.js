require("dotenv").config({ path: "../../.env" });
const express = require("express");
const db = require("./repository.js");
const reviews = require("./controller.js");
const ws = require("ws");
const { readFile } = require("fs").promises;
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

let staticFilesPath = path.join(__dirname, "../../frontend/build");

app.use(express.static(staticFilesPath));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const server = require("http").createServer(app);

// WS
const wss = new ws.Server({ server });
let sockets = [];
wss.on("connection", function (socket) {
  sockets.push(socket);

  socket.on("close", function () {
    sockets = sockets.filter((s) => s !== socket);
  });
});

// API
app.get("/api/reviews/", async function (req, res) {
  reviews.findAll(req.body, res);
});

app.post("/api/reviews/", async function (req, res) {
  reviews.create(req.body, res).then((review) => {
    sockets.forEach(function each(client) {
      client.send(JSON.stringify(review));
    });
  });
});

app.get("*", async function (req, res) {
  res.send(await readFile(staticFilesPath + "/index.html", "utf8"));
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

server.listen(port, () => console.log("Live on http://localhost:" + port));
