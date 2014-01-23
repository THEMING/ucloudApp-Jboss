Ext.namespace("ucloud.ui")

Ext.override(Ext.PagingToolbar, {

			beforeCustomNumText : '每页',

			afterCustomNumText : '行',

			onRender : function(ct, position) {
				Ext.PagingToolbar.superclass.onRender.call(this, ct, position);
				this.first = this.addButton({
							tooltip : this.firstText,
							iconCls : "x-tbar-page-first",
							disabled : true,
							handler : this.onClick.createDelegate(this,
									["first"])
						});
				this.prev = this.addButton({
							tooltip : this.prevText,
							iconCls : "x-tbar-page-prev",
							disabled : true,
							handler : this.onClick.createDelegate(this,
									["prev"])
						});
				this.addSeparator();
				this.add(this.beforePageText);
				this.field = Ext.get(this.addDom({
							tag : "input",
							type : "text",
							size : "3",
							value : "1",
							cls : "x-tbar-page-number"
						}).el);
				this.field.on("keydown", this.onPagingKeydown, this);
				this.field.on("focus", function() {
							this.dom.select();
						});
				this.afterTextEl = this.addText(String.format(
						this.afterPageText, 1));
				this.field.setHeight(18);
				this.addSeparator();
				this.add(this.beforeCustomNumText);
				this.customNum = Ext.get(this.addDom({
							tag : "input",
							type : "text",
							size : "3",
							value : this.pageSize,
							cls : "x-tbar-page-number"
						}).el);
				this.customNum.on("keydown", this.onCustomNumKeydown, this);
				this.customNum.on("focus", function() {
							this.dom.select();
						});
				this.add(this.afterCustomNumText);
				this.customNum.setHeight(18);
				this.addSeparator();
				this.next = this.addButton({
							tooltip : this.nextText,
							iconCls : "x-tbar-page-next",
							disabled : true,
							handler : this.onClick.createDelegate(this,
									["next"])
						});
				this.last = this.addButton({
							tooltip : this.lastText,
							iconCls : "x-tbar-page-last",
							disabled : true,
							handler : this.onClick.createDelegate(this,
									["last"])
						});
				this.addSeparator();
				this.loading = this.addButton({
							tooltip : this.refreshText,
							iconCls : "x-tbar-loading",
							handler : this.onClick.createDelegate(this,
									["refresh"])
						});

				if (this.displayInfo) {
					this.displayEl = Ext.fly(this.el.dom).createChild({
								cls : 'x-paging-info'
							});
				}
				if (this.dsLoaded) {
					this.onLoad.apply(this, this.dsLoaded);
				}
			},
			onCustomNumKeydown : function(e) {
				var k = e.getKey()
				if (k == e.RETURN) {
					e.stopEvent();
					var customNum = this.customNum.dom.value;
					if (!customNum || isNaN(parseInt(customNum, 10))) {
						this.customNum.dom.value = this.pageSize;
						return false;
					}
					this.pageSize = parseInt(customNum, 10);
					if (this.owner) {
						this.owner.pageSize = this.pageSize;
					}
					this.doLoad(0);
				}
			},
			onLoad : function(store, r, o) {
				if (!this.rendered) {
					this.dsLoaded = [store, r, o];
					return;
				}
				this.cursor = o.params ? o.params[this.paramNames.start] : 0;
				var d = this.getPageData(), ap = d.activePage, ps = d.pages;

				this.afterTextEl.el.innerHTML = String.format(
						this.afterPageText, d.pages);
				this.field.dom.value = ap;
				this.customNum.dom.value = this.pageSize;
				this.first.setDisabled(ap == 1);
				this.prev.setDisabled(ap == 1);
				this.next.setDisabled(ap == ps);
				this.last.setDisabled(ap == ps);
				this.loading.enable();
				this.updateInfo();
			}
		});

ucloud.ui.EditorGridPanel = function(itemConfig) {
	var config = {
		clicksToEdit : 1,
		region : 'center',
		record : undefined,
		searchAction : undefined,
		stripeRows : true,
		isAutoLoad : false, // grid是否自动载入数据，默认为false
		saveOrUpdateMethod : 'saveOrUpdate',
		deleteMethod : 'delete',
		pageSize : 20,
		autoScroll : true,
		autoExpandMin : 120,
		searchForm : undefined,
		isSortable : true,
		iconCls : 'grid_tit_ico',
		exportMethod : undefined,
		loadMask : {
			msg : '数据装载中...'
		},
		stateful : true,
		frame : false,
		isModify : false, // 表格是否能够修改，默认为false
		afterSearchIsModify : false,// 查询后是否可以修改
		/**
		 * @cfg {Blooean} isRowNumber grid上是否是显示行号
		 */
		isRowNumber : false,
		/**
		 * @cfg {Blooean} isCheckboxSelectionModel grid上是否是CheckboxSelection模式
		 */
		isCheckboxSelectionModel : false,
		/**
		 * @cfg {Blooean} isSplitPage grid上是否是分页模式
		 */
		isSplitPage : false,
		displayInfo : true,
		isGroupGrid : false,
		view : undefined,
		collapsible : false,
		animCollapse : false,
		groupSortInfo : undefined,
		groupField : undefined

	}
	config = Ext.apply(config, itemConfig || {});
	ucloud.ui.EditorGridPanel.superclass.constructor.call(this, config);
}

Ext.extend(ucloud.ui.EditorGridPanel, Ext.grid.EditorGridPanel, {
	initComponent : function() {
		if (this.record) {
			this.record = Ext.data.Record.create(this.record);
		} else {
			Ext.Msg.alert('警告', '没有设置record属性');
		}
		if (this.searchAction) {
			var reader = new Ext.data.JsonReader({
						root : 'page.data',
						totalProperty : 'page.totalCount',
						id : 'id'
					}, this.record);
			if (!this.isGroupGrid) {
				this.store = new Ext.data.Store({
							autoLoad : this.isAutoLoad,
							baseParams : this.baseParams || {},
							remoteSort : true,
							proxy : new Ext.data.HttpProxy({
										url : this.searchAction
									}),
							paramNames : {
								sort : 'page.sort',
								dir : 'page.direction'
							},
							reader : reader
						});
			} else {
				//update by liwei,增加属性view可覆盖
				if(this.view==null || this.view=='undefined'){
						this.view = new Ext.grid.GroupingView({
						forceFit : true,
						groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "项" : "项"]})'
					})
				}
				
				var groupSortInfo = this.groupSortInfo;
				if (groupSortInfo == null || groupSortInfo == undefined) {
					Ext.Msg.alert('警告', '分组grid必须设置groupSortInfo属性');
				}
				var groupField = this.groupField;
				if (groupField == null || groupField == undefined) {
					Ext.Msg.alert('警告', '分组grid必须设置groupField属性');
				}
				this.store = new Ext.data.GroupingStore({
							reader : reader,
							autoLoad : this.isAutoLoad,
							baseParams : this.baseParams || {},
							remoteSort : true,
							proxy : new Ext.data.HttpProxy({
										url : this.searchAction
									}),
							paramNames : {
								sort : 'page.sort',
								dir : 'page.direction'
							},
							// data : dummyData,
							sortInfo : {
								field : groupSortInfo,
								direction : "ASC"
							},
							groupField : groupField
						})
			}
		} else {
			Ext.Msg.alert('警告', '没有设置actionName属性');
			return;
		}
		if (this.isCheckboxSelectionModel) {
			if (!this.cm) {
				ucloud.global.msg('警告', this.title + '没有设置cm属性')
				return;
			}
			// update by yangweiping;
			if(this.sm==null||this.sm === undefined||this.sm ==""){
				this.sm = new Ext.grid.CheckboxSelectionModel();
			}
			this.cm = [this.sm].concat(this.cm);
		}
		if (this.sm === undefined) {
			this.sm = new Ext.grid.RowSelectionModel();
		}
		if (this.isRowNumber) {
			this.cm = [new Ext.grid.RowNumberer()].concat(this.cm)
		}
		if (this.isSplitPage) {
			this.bbar = new Ext.PagingToolbar({
						pageSize : this.pageSize,
						store : this.store,
						displayInfo : this.displayInfo,
						displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
						emptyMsg : "没有记录",
						owner : this,
						paramNames : {
							start : 'page.start',
							limit : 'page.pageSize'
						}
					});
		}
		if (this.cm) {
			this.cm = new Ext.grid.ColumnModel(this.cm);
			// by default columns are sortable
			this.cm.defaultSortable = this.isSortable;
		}
		ucloud.ui.EditorGridPanel.superclass.initComponent.call(this);
		this.addEvents(
				/**
				 * @event Retrieve 查询，返回false则终止查询 <br />
				 */
				'yfc_beforeSearch',

				'yfc_afterSearch',
				/**
				 * @event yfc-add 增加 <br />
				 */
				"yfc_beforeAdd",

				"yfc_afterAdd",
				/**
				 * @event delete 删除 <br />
				 */
				"yfc_beforeDelete",

				"yfc_afterDelete",
				/**
				 * @event yfc-modify 修改 <br />
				 */
				"yfc_beforeSave",

				"yfc_afterSave",

				/**
				 * @event Retrieve 导入，返回false则终止查询 <br />
				 */
				'yfc_beforeImport',

				'yfc_afterImport');
	},
	// 注册响应事件
	initEvents : function() {
		ucloud.ui.EditorGridPanel.superclass.initEvents.call(this);
		this.body.on("click", this.setCurrentObj, this);

		this.on("rowclick", function(object, rowIndex, e) {
					var record = this.getStore().getAt(rowIndex);
					this.yfcRowclick(record, rowIndex, object, e)
				}, this);
		this.on("rowdblclick", function(object, rowIndex, e) {
					var record = this.getStore().getAt(rowIndex);
					this.yfcRowdblclick(record, rowIndex, object, e)
				}, this);
		this.on("yfc_beforeSearch", function() {
					return this.yfcBeforeSearch();
				}, this);

		this.on("beforeedit", function(e) {
					return this.isModify;
				}, this);
		this.getStore().on('beforeload', function(store, options) {// 在发送请求之前,保证分页的数据也能带自定义的参数
					if (this.params) {
						Ext.apply(options.params, this.params);
					}
				}, this);
		this.getSelectionModel().on('rowselect',
				function(selectionModel, rowIndex, record) {
					this.currentRow = rowIndex;
				}, this)
	},
	yfcClear : function() {
		if (this.searchForm) {
			this.searchForm.getForm().reset();
		}
		this.getStore().removeAll();
		// this.isModify = true;
		// this.insertRow(0);
	},
	yfcBeforeSearch : function() {
		if (this.searchForm) {
			this.setBaseParam(this.searchForm.getForm().getValues(true));
		}
	},
	yfcRowclick : function(record, rowIndex, object, e) {

	},
	yfcRowdblclick : function(record, rowIndex, object, e) {

	},
	yfcModify : function() {
		this.isModify = true;
		var col = this.colModel.getFirstEditCol(this.currentRow);
		if (col != null) {
			this.startEditing(this.currentRow, col);
		}
	},
	yfcAdd : function() {
		this.insertRow(0);
	},
	insertRow : function(row, record) {
		if (row === undefined || row === null) {
			row = 0;
		}
		if (record === undefined || record === null) {
			record = new this.record().newInstance();
		}
		this.isModify = true;
		this.stopEditing();
		this.store.insert(row, record);
		if (this.getSelectionModel() instanceof Ext.grid.RowSelectionModel) {
			this.getSelectionModel().selectRow(row);
		}
		var col = this.colModel.getFirstEditCol(row)
		if (col != null) {
			this.startEditing(row, col);
		}
	},
	yfcDelete : function() {
		var record = this.getSelectionModel().getSelections();
		if (this.fireEvent('yfc_beforeDelete', record)) {
			if (!record || record.length == 0) {
				Ext.Msg.alert("提示信息", "请先选择要删除的行!");
			} else {
				Ext.MessageBox.confirm('确认删除', '你真的要删除所选' + record.length
								+ '行信息吗?', function(btn) {
							if (btn == 'yes') {
								var jsonData = "[";
								var isDeleteFromDB = false;
								for (i = 0; i < record.length; i++) {
									if (record[i].get('sid') != undefined) {
										isDeleteFromDB = true;
										jsonData += Ext.util.JSON
												.encode(record[i].data)
												+ ",";
									};
								}
								jsonData = jsonData.substring(0,
										jsonData.length - 1)
										+ "]";
								if (isDeleteFromDB) {
									Ext.Ajax.request({
										url : this.searchAction,
										params : {
											records : jsonData
										},
										success : function(response, request) {
											var json = eval("("
													+ response.responseText
													+ ")");
											if (json.success == false) {
												var errorMsg = json
														? json.errors.msg
														: '';
												this.fireEvent(
														'yfc_afterDelete',
														this, 'failure',
														errorMsg, response,
														request);
											} else {
												for (var i = record.length - 1; i >= 0; i--) {
													this.store
															.remove(record[i]);
												}
												this.fireEvent(
														'yfc_afterDelete',
														this, 'success', null,
														response, request);
											}
										},
										failure : function(response, request) {

											var errorMsg = json
													? json.errors.msg
													: '';
											this.fireEvent('yfc_afterDelete',
													this, 'failure', errorMsg,
													response, request);
										},
										scope : this
									})
								} else {
									for (var i = record.length - 1; i >= 0; i--) {
										this.store.remove(record[i]);
									}
									this.fireEvent('yfc_afterDelete', this,
											'success');
								}
							}
						}, this);
			}
		}
	},
	yfcSearch : function() {
		if (this.fireEvent('yfc_beforeSearch')) {
			this.getStore().removeAll();
			this.store.load({
				params : Ext.apply({
							'page.start' : 0,
							'page.pageSize' : this.isSplitPage
									? this.pageSize
									: -1
						}, this.params || {}),
				callback : function() {
					if (this.getSelectionModel() instanceof Ext.grid.RowSelectionModel
							&& !this.isCheckboxSelectionModel) {
						this.getSelectionModel().selectFirstRow();
					}
					this.isModify = this.afterSearchIsModify;
					this.fireEvent('yfc_afterSearch', this.store
									.getTotalCount())
				},
				scope : this
			});
		}
	},
	
	yfcRefresh : function() {
		this.getStore().reload({
			callback : function() {
				if (this.getSelectionModel() instanceof Ext.grid.RowSelectionModel
						&& !this.isCheckboxSelectionModel) {
					this.getSelectionModel().selectFirstRow();
				}
				this.isModify = this.afterSearchIsModify;
				this.fireEvent('yfc_afterSearch', this.store.getTotalCount())
			},
			scope : this
		});
	},
	yfcAfterDelete : function(count) {
		if (this.getSelectionModel() instanceof Ext.grid.RowSelectionModel) {
			this.getSelectionModel().selectFirstRow();
		}
	},
	yfcImport : function() {
		this.fireEvent("yfc_beforeImport");

		this.fireEvent("yfc_afterImport");
	},
	yfcExport : function() {
		var store = this.getStore();

		if (store == null || store == undefined || !(store.getCount() > 0)) {
			Ext.MessageBox.alert('提示', '没有数据导出');
			return false;
		}
		if (this.exportMethod == null || this.exportMethod == undefined) {
			Ext.MessageBox.alert('提示', '未设置exportMethod方法');
			return false;
		}

		var obj = Ext.getCmp("yfc_exportWin");
		if (obj != null && obj != undefined) {
			obj.destroy();
			obj.close();
		}
		var exportWin = new Ext.Window({
			labelWidth : 65,
			title : '导出数据',
			frame : true,
			id : 'yfc_exportWin',
			closeAction : 'close',
			bodyStyle : 'padding:5px 1px',
			width : 240,
			height : 150
				// items:[selectForm]
			})
		var url = this.searchAction;
		var frmName = this.formName;
		var comParams = this.params;
		var field = undefined;
		var direction = undefined;
		var sortInfo = store.getSortState();// 排序对象
		if (sortInfo != null && sortInfo != undefined) {
			field = sortInfo.field;
			direction = sortInfo.direction;
		}
		var SelectFrom = function(itemConfig) {
			var config = {
				frame : true,
				bodyStyle : 'padding:5px 10px 0px 0px',
				labelAlign : 'right',
				fileUpload : true,
				height : 110,
				items : [{
					layout : 'form',
					border : false,
					items : [{// 左边
						layout : 'form',
						border : false,
						items : [{
									xtype : 'numberfield',
									fieldLabel : ' 从第几条',
									id : 'start',
									name : 'start',
									value : 1,
									maxLength : 10,
									allowBlank : false,
									allowNegative : false,
									allowDecimals : false,
									anchor : '85%'
								}, {
									xtype : 'numberfield',
									id : 'end',
									fieldLabel : '到第几条',
									name : 'end',
									value : store.getTotalCount(),
									allowBlank : false,
									allowNegative : false,
									allowDecimals : false,
									maxLength : 10,
									anchor : '85%'
								}]
					}
					// 右边 end items.
					]
						// 左中右 end items.
					}],// end items
				buttons : [{
					text : '确定',
					minWidth : 50,
					handler : function() {
						var start = Ext.getCmp("start").getValue();// 开始条数
						var end = Ext.getCmp("end").getValue();// 截至条数
						if (start > end) {
							Ext.MessageBox.alert('提示', '导出起始记录数不能大于截至记录数');
							return false;
						}
						exportWin.hide();
						return selectForm.getForm().submit({
									method : 'post',
									url : url,
									params : Ext.apply({
												'page.start' : start - 1,
												'page.pageSize' : (end + 1 - start),
												'page.sort' : field,
												'page.direction' : direction
											}, comParams)
								})
						// exportWin.destroy();
						// exportWin.close();
					}
				}]
			}
			config = Ext.apply(config, itemConfig || {});
			SelectFrom.superclass.constructor.call(this, config);
		}
		Ext.extend(SelectFrom, ucloud.ui.FormPanel, {})
		selectForm = new SelectFrom({})
		exportWin.add(selectForm);
		exportWin.show();

	},
	setBaseParam : function(params) {
		this.params = Ext.urlDecode(params);
	},
	setBaseParams : function(params) {
		this.params = params;
	}
});