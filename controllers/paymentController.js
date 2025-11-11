const Payment = require("../models/paymentModel");

// ✅ Add a new payment record (with survey details)
exports.addPayment = async (req, res) => {
  try {
    const {
      userName,
      contactNumber,
      surveyId,
      surveyType,
      selectedStaff,
      date,
      time,
      location,
      notes,
      amount,
      paymentType,
      paymentStatus,
      cardNumber,
    } = req.body;

    // ✅ Validate required fields
    if (!userName || !surveyType || !amount || !paymentType) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // ✅ Store all survey + payment data
    await Payment.createPayment({
      userName,
      contactNumber,

      surveyId,
      surveyType,
      selectedStaff,
      date,
      time,
      location,
      notes,
      amount,
      paymentType,
      paymentStatus: paymentStatus || "Pending",
      cardNumber: paymentType === "Credit / Debit Card" ? cardNumber : null,
    });

    res.status(201).json({ message: "✅ Payment and survey details stored successfully" });
  } catch (error) {
    console.error("❌ Error adding payment:", error);
    res.status(500).json({ message: "Server error while saving payment" });
  }
};

// ✅ Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    console.error("❌ Error fetching payments:", error);
    res.status(500).json({ message: "Server error while fetching payments" });
  }
};

// ✅ Get payments by username
exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const payments = await Payment.getPaymentsByUser(userName);
    res.status(200).json(payments);
  } catch (error) {
    console.error("❌ Error fetching user payments:", error);
    res.status(500).json({ message: "Server error while fetching user payments" });
  }
};

// ✅ Get payment by survey ID (optional)
exports.getPaymentBySurveyId = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const payment = await Payment.getPaymentBySurveyId(surveyId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found for this survey" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("❌ Error fetching payment by survey ID:", error);
    res.status(500).json({ message: "Server error while fetching payment" });
  }
};
