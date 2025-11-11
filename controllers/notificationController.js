const Notification = require("../models/notificationModel");

exports.createNotification = async (req, res) => {
  try {
    const { senderId, receiverId, message, type } = req.body;
    await Notification.createNotification({ senderId, receiverId, message, type });
    res.status(201).json({ message: "Notification sent" });
  } catch (error) {
    console.error("Create Notification Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const notifications = await Notification.getNotifications(receiverId);
    res.json(notifications);
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.markAsRead(id);
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
