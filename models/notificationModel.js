const db = require("../config/db");

const Notification = {
  async createNotification({ senderId, receiverId, message, type }) {
    const query = `
      INSERT INTO Notifications (senderId, receiverId, message, type)
      VALUES (@senderId, @receiverId, @message, @type)
    `;
    const request = db.request();
    request.input("senderId", senderId);
    request.input("receiverId", receiverId);
    request.input("message", message);
    request.input("type", type);
    await request.query(query);
  },

  async getNotifications(receiverId) {
    const query = `
      SELECT * FROM Notifications
      WHERE receiverId = @receiverId
      ORDER BY createdAt DESC
    `;
    const request = db.request();
    request.input("receiverId", receiverId);
    const result = await request.query(query);
    return result.recordset;
  },

  async markAsRead(notificationId) {
    const query = `UPDATE Notifications SET status='read' WHERE NotificationID=@notificationId`;
    const request = db.request();
    request.input("notificationId", notificationId);
    await request.query(query);
  }
};

module.exports = Notification;
