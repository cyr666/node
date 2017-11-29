function Page(){
	this.container = $("#headerContainer");
}
$.extend(Page.prototype,{
	init:function(){
		this.createHeader();
		this.positionAdd();
		this.positionList();
		this.createPgContainer();
	},
	createHeader:function(){
		this.header = new Header(this.container,"list")
	},
	positionAdd:function(){
		var ModelElem = $("#positionModal");
		this.addposition = new Position(ModelElem)
	},
	positionList:function(){
		var ModelElem = $("#js-listtable");
		this.getListData = new GetListData(ModelElem);
		$(this.getListData).on("change",$.proxy(this.handlePageChange,this))
	},	
	createPgContainer:function(){
		var PgElem = $("#js-listPgContainer");
		this.Pgcontainer = new PgContainer(PgElem);
		$(this.Pgcontainer).on("change",$.proxy(this.handlePageShowData,this))
	},
	handlePageChange:function(e){
		this.Pgcontainer.render(e.total);
	},
	handlePageShowData:function(e){
		this.getListData.changePage(e.nowpage)
	}
})
var page = new Page();
page.init()
