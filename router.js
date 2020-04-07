const express = require("express");

const Posts = require("./data/db");

const router = express.Router();

// router gets all posts
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log("you messed up the get request for the posts", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// router gets post via ID
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      }
    })
    .catch((err) => {
      console.log("get for ID is messed up ", err);
    });
});

module.exports = router;
