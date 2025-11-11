const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.addPayment);
router.get("/", paymentController.getPayments);
router.get("/user/:userName", paymentController.getPaymentsByUser);
router.get("/survey/:surveyId", paymentController.getPaymentBySurveyId);

module.exports = router;
