const mongoose =require('mongoose');
const { Schema } = mongoose;
const portfolioSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type:String
    },
    portfoliolink:{
        type:String
    },
    image:{
        type:String
    }
});
exports.Portfolio = mongoose.model('Portfolio', portfolioSchema);