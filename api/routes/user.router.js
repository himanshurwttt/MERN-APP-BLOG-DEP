import express from "express";
import {
  deleteUser,
  getUsers,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.put("/updateUser/:userId", verifyToken, updateUser);
router.get("/getUsers", verifyToken, getUsers);
router.delete("/deleteuser/:userId", verifyToken, deleteUser);
export default router;
