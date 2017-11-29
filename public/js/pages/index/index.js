function Page(){
	this.container = $("#headerContainer");
}

//$.extend是一个浅拷贝
$.extend(Page.prototype,{
	
	init:function(){
		console.log(this)//this指的就是Page{}
		this.createHeader();
	},
	
	createHeader:function(){
		console.log(this)//this指的就是Page{}
		this.header = new Header(this.container);
	}
})

var page = new Page();
page.init();//只要一执行page.init()
