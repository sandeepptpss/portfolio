const path = require('path');
const model = require('../model/portfolio');
const Portfolio = model.Portfolio;
//insert data portfolio
exports.portfolioCreate = async (req, res) => {
	const {
		title,
		description,
		portfoliolink
	} = req.body;
	const image = req.files[0]
	if (!req.files[0]){
		return res.status(400).send('No image file uploaded.');
	}
	const existingTitle = await Portfolio.findOne({title});
    if(existingTitle){
		return res.status(409).send({
		    code: 409,
			message: 'Title already Use'
 });
}
const existingLink = await Portfolio.findOne({portfoliolink});
	if(existingLink){
		return res.status(409).send({
			code:409,
			message:'Portfoliolink already use'
	  })
	}
	const newPortfolio = new Portfolio({
		title,
		description,
		portfoliolink,
		image: image.path
	});
	const success = await newPortfolio.save();
	if (success){
		return res.send({
			code: 200,
			message: 'Portfolio Data Insert Successfully'
		});
	  }else {
		return res.send({
			code: 404,
			message: 'Service error'
		});
	}
}
// portfolioViews
exports.portfolioViews = async (req, res)=>{
	const portfolioShow = await Portfolio.find();
	if (portfolioShow){
		return res.status(200).json(portfolioShow);
	} else {
		return res.send({
			code: 404,
			message: 'Service error'
		});
	}
};
// get Portfolio data
exports.getPortfolio = async (req, res) => {
	const id = req.params.id;
	const portfolio = await Portfolio.findById(id);
	if (portfolio) {
		return res.status(200).json(portfolio);
	} else {
		return res.send({
			message: 404,
			message: 'Service error'
		});
	}
}
// delete Portfolio
exports.deletePortfolio = async (req, res)=>{
	const id = req.params.id;
	const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
	if (!deletedPortfolio) {
		return res.status(404).json({
			message: `No Portfolio found with ID ${id}`
		});
	}
	return res.status(200).json({
		code: 200,
		message: 'Portfolio deleted successfully',
		user: deletedPortfolio,
	});
}
// updated Portfolio
  exports.updatePortFolio = async(req , res)=>{
    const id =req.params.id;
    const updateData = await Portfolio.findByIdAndUpdate(id);
    if(updateData){
      return res.status(200).json({
        code: 200,
        message: 'Portfolio updated successfully',
        user: deletedPortfolio,
      });
    }else{
      return res.status(404).json({
        message: `No Portfolio found with ID ${id}`
      })
}}