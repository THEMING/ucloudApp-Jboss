Ext.namespace("ucloud.ui")

ucloud.ui.Window = function(itemConfig) {
	var config = {
		layout : 'border',
		width : 600,
		height : 400,
		constrainHeader : true,
		isTopContainer : true,
		modal : true,
		resizable : false,
		isAutoShow : false
	};
	config = Ext.apply(config, itemConfig || {});
	ucloud.ui.Window.superclass.constructor.call(this, config);
	if (this.isAutoShow) {
		this.show();
	}
};

Ext.extend(ucloud.ui.Window, Ext.Window, {

});
Ext.reg('yfc-window',ucloud.ui.Window)