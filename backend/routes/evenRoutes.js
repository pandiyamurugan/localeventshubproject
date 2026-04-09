import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById
} from "../controllers/eventController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();



router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"), 
  createEvent
);
router.get("/", getEvents);

router.get("/:id", getEventById);

// UPDATE EVENT
router.put("/:id", verifyToken, isAdmin, upload.single("image"),  updateEvent);

// DELETE EVENT
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

export default router;