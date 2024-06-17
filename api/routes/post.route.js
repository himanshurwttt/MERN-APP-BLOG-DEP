import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost/:userId", verifyToken, createPost);

router.get("/getpost", getPost);
router.put("/updatepost/:postId", verifyToken, updatePost); // Ensure no spaces in the path
router.delete("/deletepost/:postId", verifyToken, deletePost);

export default router;
