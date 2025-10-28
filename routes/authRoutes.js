const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');
const { bookAppointment } = require('../controllers/appoinmentController');


router.post('/register', register);
router.post('/login', login);
router.post('/book', bookAppointment);

router.get('/admin', authMiddleware, adminOnly, (req, res) => {
  res.json({ message: 'Welcome, Admin!', user: req.user });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome, User!', user: req.user });
});

module.exports = router;
