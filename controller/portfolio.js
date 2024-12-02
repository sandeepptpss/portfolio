const path = require('path');
const model =require('../model/portfolio');
const Portfolio =model.Portfolio;
exports.portfolioCreate =async(req, res)=>{
    const { title, description, portfoliolink } = req.body;
    const image = req.files[0]
    if (!req.files[0]) {
        return res.status(400).send('No image file uploaded.');
      }
    const existingTitle = await Portfolio.findOne({ title });
    if(existingTitle){
      return res.status(409).send({ code: 409, message: 'Title already in use' });
    }
    const newPortfolio = new Portfolio({
        title,
        description,
        portfoliolink,
        image:image.path
    });
    const success = await newPortfolio.save();
    if(success){
    return res.send({ code: 200, message: 'Portfolio Data Insert Successfully' });
    }else{
    return res.send({ code: 404, message: 'Service error' });
  }
}
exports.portfolioViews =async(req, res)=>{
const portfolioShow = await Portfolio.find();
if(portfolioShow){
  return res.status(200).json(portfolioShow);
}else{
  return res.send({ code: 404, message: 'Service error' });
}
};
exports.getPortfolio = async(req, res)=>{
  const id = req.params.id;
  console.log(id);
  const portfolio = await Portfolio.findById(id);
  if(portfolio){
    return res.status(200).json(portfolio);
  }else{
  return res.send({message:404, message:'Service error'});
  }
}
