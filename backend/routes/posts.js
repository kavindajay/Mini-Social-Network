const express = require("express");
const multer = require("multer");

const PostController = require("../controllers/posts");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

router.post("", checkAuth, extractFile, PostController.createPost);

//for update method
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
