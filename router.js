const express = require("express");

const Posts = require("./data/db");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log("you messed up the get request for the posts", err);
    });
});

module.exports = router;
