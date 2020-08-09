const express = require("express");

let Posts = require("./data/db");

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
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (post.length > 0) {
        res.status(200).json(post);
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

// router gets id for comments
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((comments) => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else if (comments === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      }
    })
    .catch((err) => {
      console.log("messed up comments get", err);
    });
});

//router makes a new post
router.post("/", (req, res) => {
  const newPost = req.body;
  const { title, contents } = req.body;
  Posts.insert(newPost)
    .then((post) => {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else if (post) {
        res.status(201).json(post);
      } else {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      }
    })
    .catch((err) => {
      console.log("messed up adding a new post", err);
    });
});

// router makes a comment via a specific ID
router.post("/:id/comments", (req, res) => {
  const newComment = req.body;
  const { text, post_id } = req.body;
  Posts.insertComment(newComment)
    .then((comment) => {
      if (!text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else if (!post_id) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (comment) {
        res.status(201).json(comment);
      } else {
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      }
    })
    .catch((err) => {
      console.log("you messed up adding a new comment");
    });
});
// router delets a post via ID
router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  Posts.remove(postId)
    .then((success) => {
      if (success) {
        res.status(200).json({ message: "post deleted" });
      } else if (!success) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The post could not be removed" });
      }
    })
    .catch((err) => {
      console.log("messed up the delete", err);
    });
});

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const postChanges = req.body;
  const { title, contents } = req.body;
  Posts.update(postId, postChanges)
    .then((post) => {
      if (post) {
        res.status(200).json(postChanges);
      } else if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log("messed up the update", err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});
module.exports = router;
