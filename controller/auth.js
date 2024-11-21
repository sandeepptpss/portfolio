const model = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const User = model.User;
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2YyOTZjNGZhNmZmNzI3OTI2MGNiZiIsImVtYWlsIjoiUnVjaGlrYTEyQGdtYWlsLmNvbSIsImlhdCI6MTczMjIwNjYzMiwiZXhwIjoxNzMyMjEwMjMyfQ.sMc6lZdI_c-6OOxyEh6w0od64If0-w0huB77PG7-OLw',
      { expiresIn: '1h' }
    );
    return res.status(200).send({ message: 'Login successful', user: { id: user._id, email: user.email }, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};
