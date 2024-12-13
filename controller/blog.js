const model = require('../model/blog');
const Blog = model.Blog;
exports.createBlog = async(req, res)=>{
const {title,content,auther,date}= req.body;
const image = req.files[0]
if (!req.files[0]){
    return res.status(400).send('No image file uploaded.');
}
const newBlog = new Blog({
    title,
    content,
    auther,
    image: image.path
  });
const exitTitle = await Blog.findOne({title});
if(exitTitle){
    return res.status(409).send({
        code: 409,
        message: 'Title already Use'
});
}
const success = await newBlog.save();
if(success){
    return res.status(200).send({
    code: 200,
    message: 'sucessfully added',
    data:success
})
}else{
return res.status(400).send('Server Error');
}
}
exports.getBlog = async(req, res)=>{
const showAllBlog = await Blog.find();
if(showAllBlog){
return res.status(200).send({
        code: 200,
        message: 'Blogs retrieved successfully',
        data: showAllBlog,
  });
}else{
return res.status(400).send('Server Error');
}
}
exports.getBlogId = async(req, res)=>{
    try {
    const id = req.params.id;
    const blogs = await Blog.findById(id);
    return res.status(200).json(blogs);
    } catch (error) {
        return res.send({
			message: 404,
			message: 'Service error'
		});
    }
}
exports.deleteBlog = async(req, res)=>{
try {
   const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
   if(blog){
    return res.status(200).send({
        code: 200,
        message: 'Deleted Data successfully',
        data: blog,
      });
   }
  }catch (error) {
    return res.send({
        code: 404,
        message: 'Service error'
    });
} 
}