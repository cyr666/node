function Register(container){
	this.container = container;
	this.createDom();
	this.bindEvent();
}
//注册页的字符串模板
Register.Template = `
		<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
		<div class="modal-dialog" role="document">
		    <div class="modal-content">
			    <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="registerModalLabel">注册</h4>
			    </div>
			    <div class="modal-body">
			  		<form>
						  <div class="form-group">
						    <label for="inputuser">用户名</label>
						    <input type="text" class="form-control" id="inputuser" placeholder="请输入用户名">
						  </div>
						  <div class="form-group">
						    <label for="inputPassword">密码</label>
						    <input type="password" class="form-control" id="inputPassword" placeholder="请输入密码">
						  </div>
					</form>
					<div class="alert alert-success hide" role="alert" id = "js-registersucc">恭喜您! 注册成功</div>
					<div class="alert alert-danger hide" role="alert" id = "js-registerfail">该用户名已被注册过</div>
					<div class="alert alert-warning hide" role="alert" id = "js-registererror">用户名或密码不能为空</div>
			    </div>
			    <div class="modal-footer">		        
			        <button type="button" class="btn btn-primary" id = "js-registerbtn">注册</button>
			    </div>
		    </div>
		</div>
	</div>
	
`
$.extend(Register.prototype,{
	createDom:function(){
		this.element = $("<div></div>").append(Register.Template);
		this.registersucc = this.element.find("#js-registersucc");
		this.registerfail = this.element.find("#js-registerfail");
		this.registermodel = this.element.find("#registerModal");
		this.registererror = this.element.find("#js-registererror");
		this.container.append(this.element);
	},
	bindEvent:function(){
		var submitBtn = this.element.find("#js-registerbtn");
		submitBtn.on("click",$.proxy(this.hanleSunbmitBtnClick,this))
	},
	hanleSunbmitBtnClick:function(){
		var name = this.element.find("#inputuser").val(),
			password = this.element.find("#inputPassword").val();
			if(name == "" || password == ""){
				this.registererror.removeClass("hide");
				setTimeout($.proxy(this.hanleregisterError,this),3000)
			}else{
				$.ajax({
					url:"/api/user/register",
					type:"POST",
					data:{
						name:name,
						password:password
					},
					success:($.proxy(this.hanleSubmitSucc,this)),
					error:($.proxy(this.hanleSubmitError,this))
				});
			}
	},
	hanleregisterError:function(){
		this.registererror.addClass("hide")
	},
	hanleSubmitSucc:function(response){
		if(response.cyr && response.data){
			this.registersucc.removeClass("hide");
			setTimeout($.proxy(this.hanleregistersucc,this),3000)
		}else{
			this.registerfail.removeClass("hide");		
			setTimeout($.proxy(this.hanleregisterfail,this),3000)
		}
	},
	hanleregistersucc:function(){
		this.registersucc.addClass("hide");
		this.registermodel.modal('hide')
	},
	hanleregisterfail:function(){
		this.registerfail.addClass("hide");
	},
	hanleSubmitError:function(response){
		alert("请求失败")
	}
})