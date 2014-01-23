Ext.namespace("ucloud.ui")

ucloud.ui.TreePanel = function(itemConfig) {
	var config = {
		id : 'tree',
		collapsed : false, // 树建立时默认为展开状态： true：折叠；false：展开
		bodyBorder : false,
		split : true,
		width : 280,
		minSize : 175,
		maxSize : 500,
		collapsible : true,
		margins : '0 0 1 1',
		cmargins : '0 0 0 0',
		rootVisible : false,
		lines : false,
		enableDD : false, // 树节点是否可以拖拽： true：允许；false：禁止
		autoScroll : true,
		animCollapse : true,
		animate : true,
		useArrows : false,
		collapseMode : 'mini',
		isChecked : undefined,
		root : undefined,
		isSynchTree:false,//是同步树还是异步树 默认是异步树
		singleClickExpand : false, // 是否单击展开
		autoCheckMode : undefined,
		dataMap : {
			id : 'id',
			text : 'text',
			leaf : 'leaf',
			parentId : 'parentId',
			index : 'index'
		}
	};
	config = Ext.apply(config, itemConfig || {});
	ucloud.ui.TreePanel.superclass.constructor.call(this, config);
};

Ext.extend(ucloud.ui.TreePanel, Ext.tree.TreePanel, {
	initComponent : function() {
		this.record = Ext.data.Record.create(this.record || {});
		if (this.root) {
			this.root = new Ext.tree.AsyncTreeNode(Ext.apply({
				id : '-1',
				leaf : 1,
				expanded : this.root.expanded,
				draggable : this.root.draggable,
				data : new this.record().newInstance(),
				listeners : {
					expand : function() {
						var tree = this.getOwnerTree();
						if (!tree.rootVisible && this.hasChildNodes() > 0) {
							tree.getSelectionModel()
									.select(tree.root.firstChild);
						}
					}
				}
			}, this.root || {}))
		}
		if (this.loadUrl) {
			this.loader = new ucloud.ui.TreeLoader({
				preloadChildren : true,
				clearOnLoad : false,
				dataUrl : this.loadUrl,
				treePanel : this
			});
		}
		this.store = new Ext.data.Store({
			pruneModifiedRecords : true
		});
		ucloud.ui.TreePanel.superclass.initComponent.call(this);
		this.root.nodeToRecord(true);
		this.addEvents(
		/*
		 * *
		 */
		"yfc_beforeAdd",
		/*
		 * *
		 */
		"yfc_beforeDelete",
		/*
		 * *
		 */
		"beforeselect",
		/*
		 * *
		 */
		"selectionchange");
	},
	initEvents : function() {
		ucloud.ui.TreePanel.superclass.initEvents.call(this);
		this.on('click', this.onClick, this);
		this.body.on('click', this.onClick, this);
		this.on('startdrag', this.onStartdrag, this);
		this.getSelectionModel().on('selectionchange',
				function(selectionModel, node) {
					this.fireEvent('selectionchange', selectionModel, node);
				}, this);
		this.getSelectionModel().on('beforeselect',
				function(selectionModel, newNode, oldNode) {
					return oldNode == null ? true : this.fireEvent(
							'beforeselect', selectionModel, newNode, oldNode);
				}, this);
	},
	onClick : function(node, e) {
		var topContainer = this.getTopContainer();
		if (topContainer != undefined && topContainer.currentObject != this) {
			topContainer.currentObject = this;
			if (topContainer.getXType() == 'yfc-viewport') {
				topContainer.refreshToolbar(this); // 刷新工具条
			}
		}
	},
	createNewNode : function(node) {
		var node = new Ext.tree.TreeNode(node);
		node.attributes.data = new this.record().newInstance();
		node.getRecord().owner = node;
		return node;
	},
	yfcAdd : function(isSameLevel) {
		if (this.fireEvent('yfc_beforeAdd')) {
			var currentNode = this.getCurrentNode();
			if (currentNode == null) {
				currentNode = this.root;
			}
			if (!isSameLevel && currentNode != this.root
					&& currentNode.getRecord().get(this.dataMap['id']) == null) {
				Ext.Msg.alert('提示', '未保存的节点不能增加子节点');
			} else {
				if (isSameLevel) {
					this.addNewNode(currentNode, isSameLevel);
				} else {
					currentNode.expand(false, true, function() {
						this.addNewNode(currentNode, isSameLevel);
					}.createDelegate(this));
				}
			}
		}
	},
	addNewNode : function(currentNode, isSameLevel) {
		var newNode = this.createNewNode({
			id : Ext.id(),
			text : '新建节点...',
			leaf : 1,
			checked : this.isChecked
		})
		newNode.setOwnerTree(this);
		newNode.nodeToRecord();
		if (isSameLevel) {
			newNode = currentNode.parentNode.appendChild(newNode);
		} else {
			newNode = currentNode.appendChild(newNode);
		}
		this.getSelectionModel().select(newNode);
	},
	yfcDelete : function() {
		var currentNode = this.getCurrentNode();
		if (this.fireEvent('yfc_beforeDelete', currentNode)) {
			currentNode.expand(false, true, function() {
				if (currentNode.childNodes.length > 0) {
					return Ext.Msg.alert('提示', '当前节点有下级节点，不能删除');
				} else {
					Ext.Msg.confirm('提示', '是否确定删除当前节点？', function(btn) {
						if (btn == 'yes') {
							var selectNode = currentNode.previousSibling
									|| currentNode.nextSibling
									|| currentNode.parentNode;
							if (currentNode.getRecord().get('sid') != null) {
								Ext.Ajax.request({
									url : this.deleteUrl,
									params : {
										node : Ext.encode(currentNode
												.getRecord().data)
									},
									success : function(response, request) {
										Ext.Msg.alert('提示', '删除成功！')
										this
												.removeNode(currentNode,
														selectNode);
									},
									failure : function(response, request) {
										Ext.Msg.alert('提示', '删除失败！')
									},
									scope : this
								})
							} else {
								this.removeNode(currentNode, selectNode);
							}
						}
					}, this)
				}
			}.createDelegate(this))
		}
	},
	removeNode : function(removeNode, selectNode) {
		removeNode.remove();
		if (selectNode != this.root) {
			this.getSelectionModel().select(selectNode); // 选择被删除节点的上个节点或父节点为当前节点
		}
	},
	onStartdrag : function(treePanel, node, e) {
		treePanel.getSelectionModel().select(node);
	},
	// private
	getCurrentNode : function() {
		return this.getSelectionModel().getSelectedNode();
	},
	getModifiedRecords : function() {
		return this.store.getModifiedRecords();
	},
	getRecordByModel : function(oParam) {
		return new this.record(oParam);
	},
	commitChanges : function() {
		this.store.commitChanges();
	},
	refreshNode : function(node) {
		var record = node.getRecord();
		var text = record.get(this.dataMap['text']);
		if (text != node.text) {
			node.setText(text);
		}
		var isLeaf = record.get(this.dataMap['leaf'])
		if (isLeaf != node.leaf) {
			if (isLeaf == "1") {
				node.leaf = true;
				node.attributes.expandable = false;
			} else {
				node.leaf = false;
				node.attributes.expandable = true;
			}
			node.ui.updateExpandIcon();
		}
	}
});

/*******************************************************************************
 * treeload对象
 ******************************************************************************/
ucloud.ui.TreeLoader = function(itemConfig) {
	var config = {

	};
	config = Ext.apply(config, itemConfig || {});
	ucloud.ui.TreeLoader.superclass.constructor.call(this, config);
}

Ext.extend(ucloud.ui.TreeLoader, Ext.tree.TreeLoader, {
	createNode : function(oAttr) {
		var record = (oAttr instanceof Ext.data.Record)
				? oAttr
				: new this.treePanel.record(oAttr);
		var attr = {}
		attr.data = record;
		attr.checked = this.treePanel.isChecked;
		for (var p in this.treePanel.dataMap) {
			var map = this.treePanel.dataMap[p];
			if (typeof map == 'object') {
				attr[p] = '';
				for (var i = 0; i < map.length; i++) {
					if (record.fields.containsKey(map[i]))
						attr[p] += record.get(map[i]);
					else {
						attr[p] += map[i];
					}
				}
			} else {
				attr[p] = record.get(map);
			}
		}
		attr.leaf = (attr.leaf == 1) ? true : false;
		if (this.treePanel.isChecked !== undefined) {
			attr.checked = (attr.checked == 1) ? true : false;
		}
		if (record.get(this.treePanel.dataMap['id']) == undefined) {
			attr.id = Ext.id();
		}
		if (this.treePanel.dataMap['iconCls'] != undefined) {
			attr.iconCls = record.get(this.treePanel.dataMap['iconCls']);
		}
		if (this.treePanel.dataMap['children'] != undefined) {
			attr.children = record.get(this.treePanel.dataMap['children']);
		}
		
		var node = ucloud.ui.TreeLoader.superclass.createNode.call(this, attr);
		node.getRecord().owner = node;
		this.treePanel.store.add(record);
		return node;
	},
	processResponse : function(response, node, callback) {
		var json = response.responseText;
		try {
			var success = eval(eval("(" + json + ")").success);

			if (success === false) {
				var errors = eval("(" + json + ")").errors;

				if (errors === null) {
					Ext.Msg.alert('错误', '执行失败,没有定义错误变量!');
					return;
				}

				var msg = eval("(" + json + ")").errors.msg;

				if (msg === undefined) {
					Ext.Msg.alert('错误', '执行失败,没有定义错误信息!');

				} else {
					Ext.Msg.alert('错误', msg);
				}
				return;
			}
			var o = eval("(" + json + ")").nodeList;
			if (o === undefined) {
				Ext.Msg.alert('错误', '数据解析错误，请与开发人员联系');
				return;
			}
			node.beginUpdate();
			for (var i = 0, len = o.length; i < len; i++) {
				var n = this.createNode(o[i]);
				if (n) {
					node.appendChild(n);
				}
			}
			node.endUpdate();
			if (typeof callback == "function") {
				callback(this, node);
			}
		} catch (e) {
			this.handleFailure(response);
		}
	}
});

Ext.override(Ext.tree.TreeNode, {
	// 覆盖原有函数，增加事件关联
	render : function(bulkRender) {
		this.attributes.singleClickExpand = this.getOwnerTree().singleClickExpand;
		this.ui.render(bulkRender);
		if (!this.rendered) {
			// make sure it is registered
			this.getOwnerTree().registerNode(this);
			this.rendered = true;
			if (this.expanded) {
				this.expanded = false;
				if (this.getOwnerTree().isSynchTree){
					this.expand(true, false);//同步树时全部加载
				}
				else {
					this.expand(false, false);//异步树时默认不变
				}				
			}
		}
		if (this.getRecord() != undefined) {
			this.on('append', this.onAppend, this);
			this.on('insert', this.onInsert, this);
			this.on('remove', this.onRemove, this);
		}
		if (this.attributes.checked !== undefined
				&& this.getOwnerTree().autoCheckMode !== undefined) {
			this.on('checkchange', this.onCheckValueChanged, this);
		}
	},
	// 覆盖原有函数，判断当前节点是否子节点，增加判断leaf为1的情况
	isLeaf : function() {
		return this.leaf === true || this.leaf == 1;
	},
	onCheckValueChanged : function(node, isChecked) {
		// 同时修改下级节点选择状态
		this.cascade(this.setCheckedValue, undefined, [node]);
		// 勾选时把父级节点选上
		var root = node.getOwnerTree().getRootNode();
		var parentNode = node.parentNode
		if (isChecked) {
			while (parentNode != root && !parentNode.attributes.checked) {
				parentNode.setCheckedValue(node);
				parentNode = parentNode.parentNode;
			}
		} else {
			// 取消时判断上级节点是否取消
			while (parentNode != root) {
				var childNodes = parentNode.childNodes;
				for (var i = 0; i < childNodes.length; i++) {
					if (childNodes[i].attributes.checked) {
						return;
					}
				}
				parentNode.setCheckedValue(node);
				parentNode = parentNode.parentNode;
			}
		}
	},
	setCheckedValue : function(node) {
		var isChecked;
		if (Ext.isArray(node)) {
			isChecked = node[0].attributes.checked;
		} else {
			isChecked = node.attributes.checked;
		}
		this.suspendEvents();
		this.ui.toggleCheck(isChecked);
		this.resumeEvents();
		if (this.getRecord) {
			this.getRecord().set(node.getOwnerTree().dataMap['checked'],
					isChecked)
		}
	},
	// 节点删除时触发onRemove事件
	onRemove : function(tree, node, removeNode) {
		if (node.childNodes.length < 1) {
			node.leaf = 1;
			node.getRecord().set(tree.dataMap['leaf'], 1);
		} else {
			for (var i = 0; i < node.childNodes.length; i++) {
				node.childNodes[i].getRecord().set(tree.dataMap['index'], i);
			}
		}
		if (removeNode.getRecord() != null) {
			tree.store.remove(removeNode.getRecord());
		}
	},
	// 节点插入时触发onInsert事件
	onInsert : function(tree, parent, node, refNode) {
		var index = parent.indexOf(node);
		var record = node.getRecord();
		record.set(tree.dataMap['index'], index);
		record.set(tree.dataMap['parentId'], parent.getRecord()
				.get(tree.dataMap['id']));
		for (var i = index + 1; i < parent.childNodes.length; i++) {
			parent.childNodes[i].getRecord().set(tree.dataMap['index'], i);
		}
		if (tree.store.indexOf(record) == -1) {
			tree.store.add(record);
		}
	},
	onAppend : function(tree, node, appendNode, index) {
		if (node.leaf = 1) {
			node.leaf = 0;
			node.getRecord().set(tree.dataMap['leaf'], 0);
		}
		var r = appendNode.getRecord();
		if (tree.store.indexOf(r) == -1) {
			tree.store.add(r);
			r.set(tree.dataMap['index'], index);
			r.set(tree.dataMap['parentId'], node.getRecord()
					.get(tree.dataMap['id']));
		}
	},
	getRecord : function() {
		return this.attributes.data;
	},
	setRecord : function(record) {
		var r = this.attributes.data;
		r.owner = this;
		Ext.apply(r, record);
	},
	removeRecord : function() {
		this.attributes.data = null;
	},
	// 从node取值填充record的值，ID不填充
	nodeToRecord : function(isAll) {
		var record = this.getRecord();
		var tree = this.getOwnerTree();
		record.beginEdit();
		for (var p in tree.dataMap) {
			if (isAll || p != 'id') {
				record.set(tree.dataMap[p], this[p]);
			}
		}
		record.endEdit();
	}
})