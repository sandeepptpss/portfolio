const model = require('../model/user')
const mongoose = require('mongoose');
const User = model.User;
exports.userLogin= async (req, res) => {
  if(req.body.password  && req.body.email){
  let users = await User.findOne(req.body).select("-password");
    console.log(users);
   if(users){
  res.send(users)
    }else{
      res.send('User is not found');
    }
  }
}