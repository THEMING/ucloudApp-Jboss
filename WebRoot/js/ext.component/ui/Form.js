Ext.namespace("ucloud.ui")

ucloud.ui.FormPanel = function(itemConfig) {
	var config = {
		id : 'form',
		split : true,
		collapsible : true,
		collapseMode : 'mini',
		region : 'center',
		height : 80,
		autoScroll : true
	};
	config = Ext.apply(config, itemConfig || {});
	ucloud.ui.FormPanel.superclass.constructor.call(this, config);
};

Ext.extend(ucloud.ui.FormPanel, Ext.form.FormPanel, {
	initComponent : function() {
		ucloud.ui.FormPanel.superclass.initComponent.call(this);
		this.addEvents("yfc_beforeSearch", // 查询之前,返回false则终止查询

				"yfc_afterSearch", // 查询之后

				"yfc_beforeSave", // 查询之前

				"yfc_afterSave", // 查询之后

				"yfc_beforeAdd", // 增加之前

				"yfc_afterAdd", // 增加之后

				"yfc_beforeDelete", // 删除之前

				"yfc_afterDelete", // 删除之后

				"focus",

				"itemchanged")
	},
	initEvents : function() {
		ucloud.ui.FormPanel.superclass.initEvents.call(this);
		this.on('focus', this.setCurrentObj, this);
		this.body.on('click', function() {
			this.fireEvent('focus');
		}, this)
		this.form.items.each(function(f) {
			f.on('blur', function(field, newValue, oldValue) {
				if (this.record) {
					this.getForm().updateRecord(this.record);
				}
				this.fireEvent('itemchanged', this.record, field, newValue,
						oldValue);
			}, this);
			f.on('focus', function(field) {
				this.fireEvent('focus', field);
			}, this)
		}, this)
	},
	yfcClear : function() {
		this.getForm().reset();
	},
	addFieldSet : function(title) {
		this.add({
			xtype : 'fieldset',
			title : '&nbsp;' + title + '&nbsp;',
			autoHeight : true,
			autoWidth : true,
			padding : 10
		})
	},
	/**
	 * 通过表单中的fieldset增加选项
	 */
	addItem : function(config) {
		if (this.getFieldSet() !== null) {
			this.getFieldSet().add(config);
		} else {
			this.add(config);
		}
	},
	/**
	 * 获得fieldSet的引用
	 */
	getFieldSet : function() {
		if (this.items && this.items.first().isXType('fieldset')) {
			return this.items.first();
		}
		return null;
	},
	yfcSave : function() {
		return this.getForm().submit({
			scope : this,
			clientValidation : true,
			waitTitle : '提示',
			waitMsg : '表单提交中...',
			url : this.url || '',
			params : this.params || {},
			success : function(form, action) {
				this.fireEvent('yfc_afterSave', this, 'success', form, action);
			},
			failure : function(form, action) {
				if (action.failureType == Ext.form.Action.CLIENT_INVALID) {

				} else if (action.failureType == Ext.form.Action.CONNECT_FAILURE) {
					ucloud.global.msg('服务器异常！');
				} else if (action.failureType == Ext.form.Action.SERVER_INVALID) {
					ucloud.global.msg(action.result.errors.msg);
				}
				this.fireEvent('yfc_afterSave', this, 'failure', form, action);
			}
		})
	},
	setRecord : function(record) {
		this.record = record;
		this.getForm().loadRecord(record);
	},
	getRecord : function() {
		return this.record;
	},
	isValid : function() {
		return this.getForm().isValid();
	}
});