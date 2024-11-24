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
    }
});
exports.User = mongoose.model('User', userSchema);
