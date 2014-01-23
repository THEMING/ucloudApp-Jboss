/**
 * 通用下拉框树
 */
Ext.namespace("ucloud.ui")
ucloud.ui.ComboxTree=function(combConfig){
	var config={
		store:new Ext.data.SimpleStore({fields:[],data:[[]]}),    
	    typeAhead: true,
	    mode: 'local',
	    combTree:null,//树的实例
	    triggerAction: 'all',
	    treeHeight:200,//树的高度
	    treeRenderId:Ext.id()//树要渲染的位置
	}
	if(combConfig.treeRenderId){
		combConfig.treeRenderId=combConfig.treeRenderId+Ext.id();
	}
	Ext.apply(config,combConfig||{});
		ucloud.ui.ComboxTree.superclass.constructor.call(this,config);
}

Ext.extend(ucloud.ui.ComboxTree,Ext.form.ComboBox,{
	initComponent:function(){
		 this.tpl=String.format("<tpl for='.'><div style='height:{0}px'><div id='{1}'></div></div></tpl>",this.treeHeight,this.treeRenderId);
		 ucloud.ui.ComboxTree.superclass.initComponent.call(this);
	},
	initEvents:function(){
	  ucloud.ui.ComboxTree.superclass.initEvents.call(this); 
	  this.on('expand',function(){//使树展开
       		 this.combTree?this.combTree.render(this.treeRenderId):'';
      },this);
      if(this.combTree){
      	 this.combTree.on('click',function(node){  //注册树的事件 
	          this.setValue(node.text);   
	          this.collapse();   
	          this.targetObj?this.targetObj.hiddenValue=node.id:''
	          Ext.getCmp(this.hiddenValue)?Ext.getCmp(this.hiddenValue).setValue(node.id):'';
	          if(this.targetObj&&this.targetObj.getXType()&&this.targetObj.getXType().indexOf('grid')){
	          	this.gridRecordValue?this.targetObj.getSelectionModel().getSelected().data[this.gridRecordValue]=node.id:'';
	          }
       },this);   
      }
	}
});
Ext.reg('comboxtree',ucloud.ui.ComboxTree);