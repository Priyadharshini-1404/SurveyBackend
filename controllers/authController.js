const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail, createUser } = require('../models/userModel');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) 
      return res.status(400).json({ success: false, message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await createUser({ name, email, password: hashedPassword, role });

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) 
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.Password) return res.status(500).json({ message: 'Password not set for this user' });

    // Compare password
    const valid = await bcrypt.compare(password, user.Password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT
    const token = jwt.sign(
      { id: user.Id, role: user.Role, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.Id, name: user.Name, email: user.Email, role: user.Role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
