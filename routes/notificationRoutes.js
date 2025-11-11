const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/", notificationController.createNotification);
router.get("/:receiverId", notificationController.getNotifications);
router.put("/read/:id", notificationController.markAsRead);

module.exports = router;
