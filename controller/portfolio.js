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
      return res.status(409).send({ code: 409, message: 'This title already use' });
    }
  // The path to the uploaded image (adjust if needed);
    const newPortfolio = new Portfolio({
        title,
        description,
        portfoliolink,
        image:image.path
    });
    const success = await newPortfolio.save();
    if(success){
    return res.send({ code: 200, message: 'Portfolio Successfully' });
    }else{
    return res.send({ code: 404, message: 'Service error' });
  }
}
