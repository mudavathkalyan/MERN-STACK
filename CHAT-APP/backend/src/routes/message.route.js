import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router=express.Router();

router.get("/users",protectRoute,getUsersForSidebar);

router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);
// Delete message
router.delete("/messages/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

export default router;