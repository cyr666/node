function Login(container){
	this.container = container;
	this.createDom();
	this.bindEvent();
}

Login.Template = `
		<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
		<div class="modal-dialog" role="document">
		    <div class="modal-content">
			    <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="loginModalLabel">登录</h4>
			    </div>
			    <div class="modal-body">
			  		<form>
						  <div class="form-group">
						    <label for="inputuser">用户名</label>
						    <input type="text" class="form-control" id="LoginUser" placeholder="请输入用户名">
						  </div>
						  <div class="form-group">
						    <label for="inputPassword">密码</label>
						    <input type="password" class="form-control" id="LoginPassword" placeholder="请输入密码">
						  </div>
					</form>
					<div class="alert alert-success hide" role="alert" id = "js-loginsucc">恭喜你!登录成功</div>
			   		<div class="alert alert-warning hide" role="alert" id = "js-loginfail">用户名或密码有误</div>
			   </div>
			    <div class="modal-footer">		        
			        <button type="button" class="btn btn-primary" id = "js-loginbtn">登录</button>
			    </div>
		    </div>
		</div>
	</div>
`

$.extend(Login.prototype,{
	createDom:function(){
		this.element = $("<div></div>").append(Login.Template);
		this.loginBtn = this.element.find("#js-loginbtn");
		this.loginsucc = this.element.find("#js-loginsucc");
		this.loginfail = this.element.find("#js-loginfail");
		this.container.append(this.element)
	},
	bindEvent:function(){
		this.loginBtn.on("click",$.proxy(this.hanleLogin,this))
	},
	hanleLogin:function(){
		var name = this.element.find("#LoginUser").val(),
		password = this.element.find("#LoginPassword").val();
		$.ajax({
			url:"/api/user/login",
			type:"POST",
			data:{
				name:name,
				password:password
			},
			success:$.proxy(this.hanleLoginsucc,this),
			error:$.proxy(this.hanleLoginerr,this)
		})
	},
	hanleLoginsucc:function(response){
		if(response.ret && response.data.login){
			this.loginsucc.removeClass("hide")
			setTimeout($.proxy(this.refashPage,this),1000)
		}else{
			this.loginfail.removeClass("hide")
			setTimeout($.proxy(this.handleloginfail,this),3000)
		}
	},
	refashPage:function(){
		window.location.reload()
	},
	handleloginfail:function(){
		this.loginfail.addClass("hide")
	},
	hanleLoginerr:function(){
		alert("请求失败")
	}
})
