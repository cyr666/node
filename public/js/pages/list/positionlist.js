function GetListData(elem){
	this.elem = elem;
	this.tbody = elem.find("tbody");
	this.getList();
	this.bindEvent();
}
GetListData.Template = `
	<% for(var i = 0; i < list.length; i++){%>
		<tr>
			<td><%=i+1%></td>
			<td><%=list[i].position%></td>
			<td><%=list[i].salary%></td>
			<td><%=list[i].company%></td>
			<td><img src = "/uploads/<%=list[i].logoFile%>"/></td>
			<td>
				<span id = <%=list[i]._id%> class = "js-deletBtn" data-toggle="modal" data-target="#updateModal">删除</span>
				<span  class = "js-updateBtn" data-toggle="modal" data-target="#updateModal"> <a href="#" id = <%=list[i]._id%>>修改</a></span>
			</td>
		</tr>
		<%}%>
`
$.extend(GetListData.prototype,{
	bindEvent:function(){
		this.elem.on("click",".js-deletBtn",$.proxy(this.handleclick,this));
		this.elem.on("click",".js-updateBtn",$.proxy(this.handleupdate,this));
	},
	handleclick:function(e){		
		var target = $(e.target)
		$.ajax({
			url:"/api/position/delet",
			data:{
				id:target.attr("id")
			},
			success:$.proxy(this.handleDeletSucc,this)
		})
	},
	handleDeletSucc:function(res){
		if(res.ret && res.data){
			this.changePage()
		}
		
	},
	handleupdate:function(e){
		var target = $(e.target);
		var id = target.attr("id")
		this.updateList = new UpdateList(this.elem,id)
//		$.ajax({
//			url:"/api/position/olddata",
//			data:this.id,
//			success:$.proxy(this.handleGetOldData,this)
//		})
		
	},
//	handleGetOldData:function(res){
//		if(res.ret){
//		
//			$.proxy(this.handleGetOldDataSucc,this)
//		}
//		
//	},
//	handleGetOldDataSucc:function(){
//		this.updateList = new UpdateList(this.elem,this.id)
//	},
	getList:function(page){
		$.ajax({
			url:"/api/position/getlist",
			data:{
				page: page || 1,
				count:2
			},
			success:$.proxy(this.handleGetDataSucc,this),
			error:$.proxy(this.handleGetDataError,this)
		})
	},
	handleGetDataSucc:function(res){
		console.log(res.data.list)
		var page = res.data.totalPage;
		$(this).trigger(new $.Event("change",{
			total:page
		}))
		var str = new EJS({text:GetListData.Template}).render({
			list:res.data.list
		})
		this.tbody.html(str)
	},
	changePage:function(page){
		if(page){
			this.nowPage = page;
		}
		$.ajax({
			url:"/api/position/getlist",
			data:{
				page: page || this.nowPage,
				count:2
			},
			success:$.proxy(this.handleChangeDataSucc,this),
			error:$.proxy(this.handleGetDataError,this)
		})
	},
	handleChangeDataSucc:function(res){
		console.log(res.data.totalPage)
		var str = new EJS({text:GetListData.Template}).render({
			list:res.data.list
		})
		this.tbody.html(str)
	}
	
})
