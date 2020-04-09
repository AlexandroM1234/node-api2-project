require("dotenv").config();

const express = require("express");

const postRouter = require("./router");

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>API IS WORKING</h2>
    `);
});
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`\n === Server is Running on http://localhost:${port} ===\n`);
});
