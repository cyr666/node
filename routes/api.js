var express = require('express');
var router = express.Router();
//引入controller这个模块
var userController = require("../controller/user.js");
var positionController = require("../controller/position.js");
var upload = require("../utils/multer.js")
//引入multer
//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
/* GET users listing. */
//服务器发现此路由与ajax发过来的url完全吻合,然后执行userController下的register这个方法
router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.get('/user/islogin',userController.islogin);
router.get('/user/logout',userController.logout);

//职位路由
router.post('/position/message',upload.single('logofile'),positionController.positionSave);
router.get('/position/getlist',positionController.getData);
router.get('/position/delet',positionController.deletData);
router.get('/position/update',positionController.updateData);
//router.get('/position/olddata',positionController.getOldData);
module.exports = router;
