const mongoose =require('mongoose');
const {Schema} = mongoose;
const blogSchema = new Schema({
    title: { type: String},
    content:{ type:String},
    image:{ type:String},
    auther:{ type:String}
})
exports.Blog = mongoose.model('Blog', blogSchema);

