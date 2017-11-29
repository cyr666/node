function UpdateList(elem,id){
	this.id = id;
	console.log(this.id)
	this.container = elem;
	this.createDom();
	this.bindEvent();
}

UpdateList.Template = `
		<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			
			<div class="modal-dialog" role="document">
			    <div class="modal-content">
			    	<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">职位信息</h4>
			      	</div>
			      	<div class="modal-body">
					    <div class="form-group">
						    <label for="position">职位</label>
						    <input type="text" class="form-control" id="position">
						</div>
						<div class="form-group">
						    <label for="salary">薪资</label>
						    <input type="text" class="form-control" id="salary">
						</div>
						<div class="form-group">
						    <label for="company">公司</label>
						    <input type="text" class="form-control" id="company">
						</div>
			      	</div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-primary" id = "js-updateBtn">Save</button>
			      </div>
			    </div>
			  </div>
		</div>
`
$.extend(UpdateList.prototype,{
	createDom:function(){
		this.elem = $("<div></div>").append(UpdateList.Template);
		this.position = this.elem.find("#position");
		this.salary = this.elem.find("#salary");
		this.company = this.elem.find("#company");
		this.updateBtn = this.elem.find("#js-updateBtn")
		this.container.append(this.elem)
	},
	bindEvent:function(){
		this.updateBtn.on("click",$.proxy(this.handleBtnEvent,this))
	},
	handleBtnEvent:function(){
		var data = {
			position:this.position.val(),
			salary:this.salary.val(),
			company:this.company.val(),
			id:this.id
		}
		$.ajax({
			url:"/api/position/update",
			data:data,
			success:$.proxy(this.handleupdatesucc,this)
		})
	},
	handleupdatesucc:function(res){
		if(res.ret && res.data){
			window.location.reload()
		}
	}
})
