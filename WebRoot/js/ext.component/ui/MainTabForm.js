Ext.namespace('ucloud');

ucloud.MainTabForm = function(itemConfig) {
	this.pBtns = new Ext.util.MixedCollection();
	this.toolbar = this.initToolbar();
	var config = {
		id : Ext.id(),
		title : '功能菜单',
		bodyStyle : 'padding:0px 0px 0px 0px',
		margins : '0 0 0 0',
		iconCls : null,
		autoScroll : true,
		layoutOnTabChange : true,
		region : 'center',
		layout : 'border',
		closable : true,
		focusObj : undefined,
		border : false,
		tbar : this.toolbar,
		items : []
	};
	config = Ext.apply(config, itemConfig || {});
	// config.items = config.items.concat([toolbar], [panel]);
	ucloud.MainTabForm.superclass.constructor.call(this, config);

	this.on("render", function() {
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
			}, this)
};

Ext.extend(ucloud.MainTabForm, Ext.Panel, {
			initToolbar : function() {
				var toolbar = new ucloud.ui.Toolbar({
							renderTo : null,
							margins : '0 0 0 0'
						});
				return toolbar;
			},
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

Ext.reg('yfc-maintabform', ucloud.MainTabForm);