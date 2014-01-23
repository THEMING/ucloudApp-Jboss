/**
 * ButtonTextField主要方法FORM布局中textField加上查询按钮
 */
Ext.namespace("ucloud.ui.ButtonTextField")

ButtonTextField=Ext.extend(Ext.form.TriggerField,{
	 	 triggerClass : 'x-btn-text-field-trigger',
	  	 defaultAutoCreate : {tag: "input", type: "text", size: "16", autocomplete: "off"},
	  	 initComponent : function(){
	  	 	ButtonTextField.superclass.initComponent.call(this);
	  	 	this.readOnly=true;
	  	 },
	     getValue : function(){
       		return  ButtonTextField.superclass.getValue.call(this)||"";
   		 },
         setValue : function(value){
        	ButtonTextField.superclass.setValue.call(this,value);
         },
         onTriggerClick : function(){
           if(this.btnReadOnly){
           	return false;
           }
           if(this.window!=null){
           		this.window.show();
           		this.window.valueRef=this.valueRef;
           		this.window.labelRef=this.labelRef;
           		if(this.window.initWindowEvent){//用于初始化之后调用的
           			this.window.initWindowEvent(this);
           		}
           }
         	
         },
         disable:function(){
         	this.btnReadOnly = true;
         	ButtonTextField.superclass.disable.call(this);
         },
         enable:function(){
         	this.btnReadOnly = false;
         	ButtonTextField.superclass.enable.call(this);
         }
       
	  });
Ext.reg('btntextfield',ButtonTextField);
	 
	  