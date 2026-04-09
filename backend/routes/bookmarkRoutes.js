import express from "express";
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.post("/", addBookmark);
router.delete("/", removeBookmark);
router.get("/:userId", getBookmarks);

export default router;