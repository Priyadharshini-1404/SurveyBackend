const razorpay = require("../config/razorpay");
const Payment = require("../models/paymentModel");

exports.createOrder = async (req, res) => {
  try {
    const { amount, userName, surveyType } = req.body;

    if (!amount || !userName || !surveyType) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const orderOptions = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    return res.status(200).json({
      success: true,
      order,               // Full order object
      key: process.env.RAZORPAY_KEY_ID, // Frontend Razorpay key
    });
  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userName,
      contactNumber,
      surveyType,
      selectedStaff,
      date,
      time,
      location,
      notes,
      amount,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment details missing" });
    }

    // Save payment in SQL Server
    await Payment.createPayment({
      userName,
      contactNumber,
      surveyType,
      selectedStaff,
      date,
      time,
      location,
      notes,
      amount,
      paymentType: "Razorpay",
      paymentStatus: "Success",
    });

    return res.json({ success: true, message: "Payment saved successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
