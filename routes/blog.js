import express from "express";
import {
    //   updateUser,
    getAllBlogs,
    getSingleBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    commentBlog,
} from "../controller/blogController.js";

const router = express.Router();

// get All blogs
router.get("/", getAllBlogs);

// Get a single blog
router.get("/singleblog/:id", getSingleBlog);

// Create blog
router.post("/create", createBlog);

// update blog
router.put("/updateblog/:id", updateBlog);

// delete blog
router.delete("/deleteblog/:id", deleteBlog);

// comment on a blog
router.post("/singleblog/:id/comment", commentBlog);

// likes
// router.post("/singleblog/:id/likes", commentBlog);

// features
// router.post("/singleblog/:id/feature", commentBlog);

export default router;
