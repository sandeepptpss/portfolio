const bcrypt = require('bcrypt'); 
const model = require('../model/user');
const User = model.User;
// Insert User data
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send({ code: 400, message: 'Invalid input data' });
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ code: 409, message: 'Email already in use' });
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const success = await newUser.save();
    if (success) {
        return res.send({ code: 200, message: 'add success' , user: success });
      } else {
        return res.send({ code: 404, message: 'Service error' });
      }
  };
  // View All User data
  exports.getAllUsers = async (req ,res)=>{
      const showAllUsers = await User.find();
      if (showAllUsers) {
        res.status(200).json(showAllUsers);
      } else {
        res.status(500).json({ message: 'Server error' });
      }
  }
    // View specific User data
  exports.getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  };
  // Delete User data
  exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const deleteDoc = await User.findOneAndDelete({_id:id});
    if (deleteDoc) {
      return res.send({ code: 201, message: 'Delete successflly' , user: deleteDoc });
    } else {
      return res.send({ code: 404, message: 'Service error' });
    }
};
//Update user data 

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: `Cannot find any user with ID ${id}` });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  