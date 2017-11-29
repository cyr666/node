const mongoose = require("../utils/database.js");

const User = mongoose.model("user",{
	name:String,
	password:String
});

const saveUser = (userInfo, succCb) => {
	const user = new User(userInfo);
	user.save().then(() => {
		succCb();
	})
}
const findOneUser = (userInfo,succCb)=>{
	User.find(userInfo).then((result)=>{
		succCb(result)
	})
}

module.exports = {
	saveUser,
	findOneUser
}
