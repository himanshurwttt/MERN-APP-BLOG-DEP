import express from "express";
import {
  CommentDelete,
  commentLike,
  createComment,
  edit,
  getCommentUser,
  getComments,
  test,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.post("/create/:userId", verifyToken, createComment);
router.get("/getComments/:postId", getComments);
router.get("/getCommentUser/:userId", getCommentUser);
router.patch("/like/:id", commentLike);
router.put("/edit/:commentId", verifyToken, edit);
router.delete("/delete/:commentId", verifyToken, CommentDelete);

export default router;
