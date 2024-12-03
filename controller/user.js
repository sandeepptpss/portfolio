const bcrypt = require('bcrypt'); 
const model = require('../model/user');
const User = model.User;
// Insert User data
exports.createUser = async (req, res) => {
  const { name, username,gender, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send({ code: 400, message: 'Invalid input data' });
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ code: 409, message: 'Email already in use' });
    }
    const newUser = new User({
      name,
      username,
      gender,
      email,
      password: hashedPassword,
    });
    const success = await newUser.save();
    if (success) {
        return res.send({ code: 201, message: 'add success' , user: success });
      } else {
        return res.send({ code: 404, message: 'Service error' });
      }
  };
  // Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `No user found with ID ${id}` });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error ', error: error.message });
  }
};
// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `No user found with ID ${id}` });
    }
    return res.status(200).json({
      code: 200,
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Update a user by ID
 exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: `No user found with ID ${id}` });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }};