Ext.namespace('ucloud');

ucloud.Viewport = function(itemConfig) {
	this.pBtns = new Ext.util.MixedCollection();
	var config = {
		id : 'viewport',
		layout : 'border',
		focusObj : undefined,
		toolbar : new ucloud.ui.Toolbar(),
		isTopContainer : true,
		pageRight : new Ext.util.MixedCollection()
	};
	config = Ext.apply(config, itemConfig || {});
	config.items = config.items.concat([config.toolbar]);
	ucloud.Viewport.superclass.constructor.call(this, config);
	ucloud.global.viewport = this;
	if (this.oBtns !== undefined) {
		this.toolbar.pBtns.applyAll(this.oBtns.getRange());
	}
	delete this.oBtns;
	this.toolbar.createToolbar(this.toolbar.pBtns.getRange())
	if (this.focusObj) {
		this.setFocusObject(this.focusObj);
		delete this.focusObj;
		this.refreshToolbar(this.currentObject);
	};
};

Ext.extend(ucloud.Viewport, Ext.Viewport, {
	yfcClear : function() {
		if (this.currentObject && this.currentObject.yfcClear) {
			this.currentObject.yfcClear();
		}
	},
	yfcSearch : function() {
		if (this.currentObject && this.currentObject.yfcSearch) {
			this.currentObject.yfcSearch();
		}
	},
	yfcAdd : function() {
		if (this.currentObject && this.currentObject.yfcAdd) {
			this.currentObject.yfcAdd();
		}
	},
	yfcDelete : function() {
		if (this.currentObject && this.currentObject.yfcDelete) {
			this.currentObject.yfcDelete();
		}
	},
	yfcModify : function() {
		if (this.currentObject) {
			this.currentObject.yfcModify();
		}
	},
	yfcImport : function() {
		if (this.currentObject) {
			this.currentObject.yfcImport();
		}
	},
	yfcExport : function() {
		if (this.currentObject) {
			this.currentObject.yfcExport();
		}
	},
	yfcSave : function() {
	   if (this.currentObject) {
		 this.currentObject.yfcSave();
	   }
	},
	setFocusObject : function(obj) {
		this.currentObject = obj;
		// if (this.currentObj) {
		// this.currentObject.style.border = "1px inset lightBlue";
		// }
	},
	refreshToolbar : function(currentObject) {
		this.toolbar.removeAllItem();
		if (currentObject.oBtns) {
			this.toolbar.createToolbar(currentObject.oBtns.getRange());
		}
		var objRight = (this.objRight === undefined)
				? new Ext.util.MixedCollection()
				: this.objRight;
		if (currentObject.objRight !== undefined) {
			currentObject.objRight.each(function(item, index, length) {
				if (objRight.indexOfKey(item.id) == -1) {
					objRight.add(item);
				} else {
					Ext.apply(objRight.get(item.id), item);
				}
			})
		}
		this.toolbar.refreshRight(objRight);
	},
	setSaveRight : function(bRight) {
		this.setBtnInvisible('t_save', bRight);
	},
	setBtnInvisible : function(btnId, bRight) {
		if (this.objRight === undefined) {
			this.objRight = new Ext.util.MixedCollection();
		}
		this.objRight.add({
			id : btnId,
			visible : bRight
		})
	},
	// 工具条对目标对象的功能调用
	objectFunc : function(btn) {
		if (!this.currentObject) {
			return;
		}
		var oBtn = this.toolbar.items.get(btn);
		if (this.runMode == "EMPOWER") {
			this.toggleButton(oBtn);
		} else {
			var object = this.currentObject;
			eval("object." + btn.event);
		}
	},
	// 工具条对页面的功能调用
	pageFunc : function(btn) {
		var oBtn = this.toolbar.items.get(btn);
		if (this.runMode == "EMPOWER") {
			this.toggleButton(oBtn);
		} else {
			eval("this." + btn.event);
		}
	},
	toggleButton : function(btn) {

	}
});

Ext.reg('yfc-viewport', ucloud.Viewport);