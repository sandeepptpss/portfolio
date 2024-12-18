const bcrypt = require('bcrypt'); 
const model = require('../model/user');
const User = model.User;
// Insert User data

exports.createUser = async (req, res) => {
  try {
    const { name, username, gender, email, password } = req.body;
    if (!name || !username || !gender || !email || !password) {
      return res.status(400).send({ code: 400, message: 'All fields are required' });
    }
    if (password.length < 8) {
      return res.status(400).send({ code: 400, message: 'Password must be at least 8 characters long' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const field = existingUser.email === email ? 'Email' : 'Username';
      return res.status(409).send({ code: 409, message: `${field} already in use` });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User({
      name,
      username,
      gender,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).send({ code: 201, message: 'User added successfully', userId: newUser._id });
     } catch (error) {
      console.error(error);
    return res.status(500).send({ code: 500, message: 'Internal Server Error' });
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
    }catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific user by ID
exports.getUser = async (req, res)=>{
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
  // const { id } = req.params;
  const id = req.params.id;
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