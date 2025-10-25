const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/admin', authMiddleware, adminOnly, (req, res) => {
  res.json({ message: 'Welcome, Admin!', user: req.user });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome, User!', user: req.user });
});

module.exports = router;
