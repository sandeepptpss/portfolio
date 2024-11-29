const model = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = model.User;
exports.userLogin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email) {
      return res.status(400).send({ message: 'Username or Email is required' });
    }
    if (!password) {
      return res.status(400).send({ message: 'Password is required' });
    }
    const user = await User.findOne({
      $or: [{ username }, { email }]
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password', status: 401 });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    return res.status(200).send({
      message: 'Login successful',
      user: { id: user._id, email: user.email, username: user.username },
      token
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Generate token and set expiration
    const token = crypto.randomBytes(32).toString('hex');
    const expiration = Date.now() + 3600000; // 1 hour expiry time (3600000ms = 1 hour)

    // Save token and expiration to the user's record
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiration;
    await user.save();

    // Generate the reset password URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/?token='${token}'`;

    // Set up the transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options, including the reset password link
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>The link will expire in 1 hour.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return res.status(200).send({
      message: 'Password reset email sent',
      token, 
      expiresAt: expiration, // Include token expiration time (optional)
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};
//function resetPassword 
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.query; // Extract token from query string
    const { password } = req.body;

    if (!token) {
      console.error('Token not provided in query');
      return res.status(400).send({ message: 'Token is required' });
    }
    console.log('Token received:', token);

    if (!password) {
      return res.status(400).send({ message: 'Password is required' });
    }

    // Attempt to find the user
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.error('User not found or token expired');
      return res.status(400).send({ message: 'Invalid or expired token' });
    }
    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    console.log('Password reset successful for user:', user._id);

    return res.status(200).send({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};


