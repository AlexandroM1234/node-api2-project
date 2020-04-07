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

server.listen(4000, () => {
  console.log("\n === Server is Running on Port 4000 ===\n");
});
