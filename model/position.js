const mongoose = require("../utils/database.js");

const Position = mongoose.model("position",{
	position:String,
	salary:String,
	company:String,
	logoFile:String
});

const savePosition = (positionInfo, succCb) => {
	const position = new Position(positionInfo);
	position.save().then(() => {
		succCb();
	})
}
const findAll = (succCb)=>{
	Position.find({}).then((result)=>{
		succCb(result)
	})
}
const getPageList = (listInfo,succCb)=>{
	const{page,count}=listInfo;
	Position.find({}).limit(parseInt(count),10).skip((page-1)*count).then((result)=>{
		succCb(result)
	})
}
const deletPosition = (listInfo,succCb)=>{
	const {id} = listInfo;
	Position.findByIdAndRemove(id).then(()=>{
		succCb()
	})
}
const updatePosition = (listInfo,succCb)=>{
	const {id,position,salary,company} = listInfo;
	Position.findByIdAndUpdate(id,{$set:{position:position,salary:salary,company:company}}).then(()=>{
		succCb()
	})
}
//const getOldPosition = (listInfo,succCb)=>{
//	const {id} = listInfo;
//	Position.findById(id).then((result)=>{
//		succCb(result)
//	})
//}
module.exports = {
	savePosition,
	findAll,
	getPageList,
	deletPosition,
	updatePosition
//	getOldPosition
}
