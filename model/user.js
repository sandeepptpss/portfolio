const mongoose =require('mongoose');
const {Schema} = mongoose;
const  userSchema = new Schema({
  name:{ 
       type: String
    },
  username: { 
        type: String
  },
  gender:{ 
      type: String
  },
  email: {
      type: String,
      required: true,
      unique: true
},
 password :{
      type: String,
      required:true
    },
  role: { type: String, default: 'user', eNum: ['user', 'admin'] },
  resetPasswordToken:{ 
      type: String
    },
  resetPasswordExpires:{ 
     type: Date
  },
  token:{
     token: String
  }
});
exports.User = mongoose.model('User', userSchema);

