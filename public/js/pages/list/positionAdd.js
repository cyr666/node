function Position(elem){
	this.elem = elem;
	this.saveBtn = elem.find("#js-saveBtn");
	this.position = elem.find("#position");
	this.salary = elem.find("#salary");
	this.company = elem.find("#company");
	this.logoFile = elem.find("#logoFile");
	this.bindEvent();
	
}
$.extend(Position.prototype,{
	bindEvent:function(){
		this.saveBtn.on("click",$.proxy(this.handlePositionSave,this))
	},
	handlePositionSave:function(){
	var formData = new FormData();  
		formData.append( "position", this.position.val());
		formData.append( "salary", this.salary.val());
		formData.append( "company", this.company.val());
		formData.append("logofile",this.logoFile[0].files[0])
		$.ajax({
			url:"/api/position/message",
			method:"POST",
			cache: false,
			data:formData,
			processData: false,
    		contentType: false,
			success:$.proxy(this.handlePositionSaveSucc,this),
			error:$.proxy(this.handlePositionSaveError,this)
		})
	},
	handlePositionSaveSucc:function(res){
		if(res.ret && res.data){
		console.log(res.data)
			window.location.reload()
		}
	},
	handlePositionSaveError:function(){
		alert("请求失败")
	}
})
