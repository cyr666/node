function Header(container,page){
	this.page = page || 'index';
	this.container = container;//此时的container就是在index.js页面的new Header(this.container)
								//这里的参数
	this.createDom();//对Dom操作的函数
	this.register();
	this.login();
	this.bindEvent();
	this.getLoginStatus();
}
//字符串模板
Header.Template = `
			<nav class="navbar navbar-inverse">
  			<div class="container-fluid">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </button>
			      <a class="navbar-brand" href="#">职位管理系统</a>
			    </div>

			    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				    <ul class="nav navbar-nav">
				        <li <%if(page == "index"){%>class="active"<%}%>>
				        	<a href="/">首页</a>
				        </li>
				        <li <%if(page == "list"){%>class="active"<%}%>>
				        	<a href="/list.html">列表页</a>
				        </li>
				    </ul>
				    <ul class="nav navbar-nav navbar-right" id = "unLoginArea">
				        <li data-toggle="modal" data-target="#registerModal"> <a href="#">注册</a></li>
				        <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
				    </ul>
				    <ul class="nav navbar-nav navbar-right hide" id = "LoginArea">
				        <li > 
				        	<a href="#" id = "username"></a>
				        </li>	
				        <li id = "loginbtn">
				        	<a href="#">退出</a>
				        </li>				       
				    </ul>
			    </div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid -->
	</nav>
`
$.extend(Header.prototype,{
	createDom:function(){
		var html = new EJS({text:Header.Template}).render({
			page:this.page
		});
		this.element = $("<div></div>").append(html);
		this.loginbtn = this.element.find("#loginbtn");
		this.unLoginArea = this.element.find("#unLoginArea");
		this.LoginArea = this.element.find("#LoginArea");
		this.username = this.element.find("#username");
		this.container.append(this.element)
	},
	register:function(){
		this.register = new Register(this.container);
	},
	login:function(){
		this.login = new Login(this.container);
	},
	getLoginStatus:function(){
		$.ajax({
			url:"api/user/islogin",
			success:$.proxy(this.handleloginsucc,this)
		})
	},
	handleloginsucc:function(res){
		if(res.ret && res.data.login){
			this.username.text(res.data.name);
			this.unLoginArea.addClass("hide");
			this.LoginArea.removeClass("hide");
		}
	},
	//点击退出按钮执行事件
	bindEvent:function(){
		this.loginbtn.on("click",$.proxy(this.handleloginout,this))
	},
	handleloginout:function(){		
		$.ajax({
			url:"api/user/logout",
			success:$.proxy(this.handleloginOutSucc,this)
		})
	},
	handleloginOutSucc:function(res){
		console.log(res)
		if(res.data.logout && res.ret){
			window.location.reload()
		}else{
			console.log("login")
		}
	}
})
