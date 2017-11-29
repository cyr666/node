const UserModel = require("../model/user.js");
const crypto = require("crypto");
const register = (req,res)=>{
	const{name,password} = req.body;
//调用model层saveUser的方法
//saveUser方法含有三个参数
//参数一：需要存储的用户的信息
//参数二：成功存储时要执行的函数
//参数三：存储失败时要执行的函数
	UserModel.findOneUser({name},(result)=>{
		if(result.length>0){
			res.json({
				cyr:true,
				data:false
			})
		}else{
			const hash = crypto.createHash("sha256");
			hash.update(password);
			UserModel.saveUser({
				name,
				password:hash.digest("hex")
			},()=>{
				res.json({
					cyr:true,
					data:true
				})
			})
		}
	})
}

const login = (req,res)=>{
	const{name,password} = req.body;
	
	const hash = crypto.createHash("sha256");
		hash.update(password);
		
	UserModel.findOneUser({
		name,
		password:hash.digest("hex")
	},(result)=>{
		if(result.length>0){
			req.session.name = name;
			req.session.login = true;
			res.json({
				ret:true,
				data:{
					login:true
				}
			})
		}else{			
				res.json({
					ret:true,
					data:{login:false}
				})			
		}
	})
}
const islogin = (req,res)=>{
	
	if(req.session.login){
		res.json({
			ret:true,
			data:{
				login:true,
				name:req.session.name
			}
		})
	}else{
		res.json({
			ret:true,
			data:{
				login:false
			}
		})
	}
}
const logout = (req,res)=>{
	req.session.login = null;
	console.log(res)
	res.json({
		ret:true,
		data:{
			logout:true
		}
	})
}
module.exports = {
	register,
	login,
	islogin,
	logout
}
