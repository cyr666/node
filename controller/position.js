const positionModel = require("../model/position.js");

const positionSave = (req,res)=>{
//console.log(res);
console.log(req.file)
	const{position,salary,company} = req.body;
	const logoFile = req.file.filename;
	console.log(logoFile)
	positionModel.savePosition({
		position,
		salary,
		company,
		logoFile
	},()=>{
		res.json({
			ret:true,
			data:true
		})
	})
}
const getData =(req,res)=>{
	const{page,count}=req.query;
	positionModel.findAll((result)=>{
		var totalPage = 1;
		 totalPage = Math.ceil(result.length/count);
		positionModel.getPageList({page,count},(results)=>{
		console.log(results)
			res.json({
				ret:true,
				data:{
					list:results,
					totalPage:totalPage
				}
				
			})
		})
	})
}
const deletData = (req,res) =>{
	const {id} = req.query;
	positionModel.deletPosition({id},()=>{
		res.json({
			ret:true,
			data:true		
		})
	})
}
const updateData = (req,res) =>{
	const {id,position,salary,company} = req.query;
	positionModel.updatePosition({
		id,
		position,
		salary,
		company
	},()=>{
		res.json({
			ret:true,
			data:true		
		})
	})
}
//const getOldData = (req,res) =>{
//	const{id} = req.query;
//	console.log(req.query)
//	positionModel.getOldPosition({id},(result) =>{
//		console.log(result)
//	})
//}
module.exports = {
	positionSave,
	getData,
	deletData,
	updateData
//	getOldData
}
