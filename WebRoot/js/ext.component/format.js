Ext.namespace('ucloud')

ucloud.format = {
	formatDate : function(value) {
		return value ? value.dateFormat('M d, Y') : '';
	},
	showUrl : function(value) {
		return "<a href='http://" + value + "' target='_blank'>" + value + "</a>";
	}
};