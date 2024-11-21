const bcrypt = require('bcrypt'); 
const model = require('../model/user');
const User = model.User;
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


  exports.getAllUsers = async (req ,res)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  

  }