const mongoose =require('mongoose');
const {Schema} =mongoose;
const  userSchema = new Schema({
    name: { 
        type: String
    },
    username: { 
        type: String
    },
    email:{
      type :String,
      required :true,
      uniique :true
    },
    password :{
        type: String,
        required:true
    },
  resetPasswordToken: { 
    type: String,
     default: null
     },
  resetPasswordExpires: { 
    type: Date,
     default: null
     },
     token: String,
});
exports.User = mongoose.model('User', userSchema);
