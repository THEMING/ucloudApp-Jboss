Ext.namespace("ucloud.ui")

ucloud.ui.Toolbar = function(itemConfig) {
	var pBtns = [{
				id : 't_reset',
				text : '清屏',
				icon : __ctxPath + '/resources/images/toolbar/query.gif',
				event : 'yfcClear()',
				secLevel : 'PO'
			}, {
				id : 't_search',
				text : '查询',
				icon : __ctxPath + '/resources/images/toolbar/search.gif',
				event : 'yfcSearch()',
				secLevel : 'PO'
			}, {
				id : 't_add',
				text : '增加',
				icon : __ctxPath + '/resources/images/toolbar/add.gif',
				event : 'yfcAdd()',
				secLevel : 'PO'
			}, {
				id : 't_delete',
				text : '删除',
				icon : __ctxPath + '/resources/images/toolbar/delete.gif',
				event : 'yfcDelete()',
				secLevel : 'PO'
			}, {
				id : 't_modify',
				text : '修改',
				icon : __ctxPath + '/resources/images/toolbar/edits.gif',
				event : 'yfcModify()',
				secLevel : 'PO'
			}, {
				id : 't_save',
				text : '保存',
				icon : __ctxPath + '/resources/images/toolbar/save.gif',
				event : 'yfcSave()',
				secLevel : 'P'
			}, {
				id : 't_import',
				text : '导入',
				icon : __ctxPath + '/resources/images/toolbar/import.gif',
				event : 'yfcImport()',
				secLevel : 'P'
			}, {
				id : 't_export',
				text : '导出',
				icon : __ctxPath + '/resources/images/toolbar/export.gif',
				event : 'yfcExport()',
				secLevel : 'P'
			}];
	var config = {
		id : 'main-toolbar',
		region : 'north',
		renderTo : Ext.getBody(),
		pBtns : new Ext.util.MixedCollection(),
		height : 28
	};
	config = Ext.apply(config, itemConfig || {});
	config.pBtns.addAll(pBtns);
	ucloud.ui.Toolbar.superclass.constructor.call(this, config);
};

Ext.extend(ucloud.ui.Toolbar, Ext.Toolbar, {
			removeAllItem : function() {
				for (var i = 0; i < this.items.getCount(); i++) {
					var item = this.items.get(i);
					if (item.text) {
						if (item.secLevel !== 'P') {
							if (item.secLevel == 'PO' || item.secLevel == 'C') {
								if (item.secLevel == 'C') {
									item = this
											.createBarItem(this.pBtns.get(i));
								}
								// item.setDisabled(true);
							} else {
								item.destroy();
								this.items.remove(item);
							}
						}
					}
				}
			},
			refreshRight : function(oParam) {
				if (oParam !== undefined) {
					for (var i = 0; i < oParam.getCount(); i++) {
						var item = oParam.get(i);
						var btn = this.items.get(item.id);
						if (btn && item.visible !== undefined) {
							btn.setVisible(item.visible);
						} else {
							if (btn && item.disabled !== undefined) {
								btn.setDisabled(!item.disabled);
							}
						}
					}
				}
			},
			createToolbar : function(config) {
				if (Ext.isArray(config)) {
					for (var i = 0, len = config.length; i < len; i++) {
						config[i] = this.createBarItem(config[i])
					}
				} else {
					config = this.createBarItem(config);
				}
			},
			createBarItem : function(config) {
				var btn;
				if (typeof config == "object") {
					config.cls = 'x-btn-text-icon';
					if (config.secLevel == 'P' || config.secLevel == 'PO') {
						if (config.event !== undefined) {
							config.handler = function() {
								ucloud.global.viewport.pageFunc(this);
							}
						}
						if (config.menu) {
							for (var i = 0; i < config.menu.length; i++) {
								if (config.menu[i].event !== undefined) {
									config.menu[i].handler = function() {
										ucloud.global.viewport.pageFunc(this);
									};
								}
							}
						}
					} else {
						config.handler = function() {
							if (config.event !== undefined) {
								ucloud.global.viewport.objectFunc(this);
							}
						}
						if (config.menu) {
							for (var i = 0; i < config.menu.length; i++) {
								if (config.menu[i].event !== undefined) {
									config.menu[i].handler = function() {
										ucloud.global.viewport.objectFunc(this);
									};
								}
							}
						}
					}
				}
				var index = this.items.indexOfKey(config.id);
				if (index > -1) {
					var item = this.items.get(index);
					item.destroy();
					this.items.remove(item);
					btn = this.insertButton(index, config);
				} else {
					btn = this.addButton(config);
				}
				// btn.setDisabled(true);
				return btn;
			}
		});