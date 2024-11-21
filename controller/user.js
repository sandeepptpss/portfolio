const bcrypt = require('bcrypt'); 
const model = require('../model/user');
const User = model.User;
exports.createUser = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({ code: 400, message: 'Invalid input data' });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const success = await newUser.save();
    if (success) {
        return res.send({ code: 200, message: 'add success' , user: success });
      } else {
        return res.send({ code: 404, message: 'Service error' });
      }
  };

