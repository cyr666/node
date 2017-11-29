function PgContainer(elem){
	this.elem = elem;
	console.log(this.elem)
	this.bindEvent();
}

PgContainer.Template = `
	<% for(var i = 0;i < count;i++){%>
		<li><a href="#"><%= i+1%></a></li>
		<%}%>
`
$.extend(PgContainer.prototype,{
	render:function(num){
		this.page = num;
		var str = new EJS({text:PgContainer.Template}).render({
			count:this.page
		});
		this.elem.html(str)
	},
	bindEvent:function(){
		this.elem.on("click","a",$.proxy(this.handlepagination,this))
	},
	handlepagination:function(e){
		var num =  $(e.currentTarget);
		var page = num.text();
		$(this).trigger(new $.Event("change",{
			nowpage:page
		}))
	}
})
