Ext.namespace('ucloud')

ucloud.global = {

	/**
	 * 将数字如 438732转换为438,732
	 * @param value
	 * @return
	 */
	changeMathFormat : function(value) {
		var str;
		if (value != null) {
			str = parseFloat(value).toLocaleString()
		} else {
			str = "";
		}
		return str;
	},

	/**
	 * 弹出消息提示框
	 * @return none
	 */
	msg : function(msg, processResult) {
		Ext.MessageBox.show({
					title : '提示信息',
					msg : msg,
					buttons : Ext.Msg.OK,
					fn : processResult,
					icon : Ext.MessageBox.INFO
				});
	},
	/**
	 * AJAX请求工具方法 wait:是否出现等待条 waitMsg:等待信息 url:请求地址 params:请求参数
	 * callback:{success:function(response,request,json)成功回调,failure:function(response,request,errorMsg,json)失败回调}
	 * isShowErrorMsg:是否显示错误信息 isShowSuccessMsg:是否显示成功信息
	 * isHideMsgAfter:是否显示成功或失败信息后隐藏提示框 hideMilliseconds:500 msg:自定义成功信息
	 * scope:作用域
	 */
	ajaxRequest : function(requestConfig) {
		if (requestConfig.wait) {
			Ext.Msg.wait(requestConfig.waitMsg || '数据提交中...', '提示', {
						value : .5
					});
		}
		Ext.Ajax.request({
					url : requestConfig.url || '',
					params : requestConfig.params || {},
					success : function(response, request) {
						var json = eval("(" + response.responseText + ")");
						if (json.success == false) {
							var errorMsg = json ? json.errors.msg : '';
							if (requestConfig.callback
									&& requestConfig.callback.failure) {
								requestConfig.callback.failure.call(
										requestConfig.scope || window,
										response, request, errorMsg, json);
							}
							requestConfig.isShowErrorMsg ? Ext.Msg.alert('提示',
									'请求失败,错误原因如下:' + '<br>' + errorMsg) : '';
						} else {
							requestConfig.isShowSuccessMsg ? Ext.Msg.alert(
									'提示', requestConfig.msg || '请求成功') : '';
							requestConfig.callback
									? requestConfig.callback.success.call(
											requestConfig.scope || window,
											response, request, json)
									: '';
							requestConfig.isHideMsgAfter ? window.setTimeout(
									function() {
										Ext.Msg.hide()
									}, requestConfig.hideMilliseconds
											? requestConfig.hideMilliseconds
											: 500) : '';
						}
					},
					failure : function(response, request) {
						var json = eval("(" + response.responseText + ")");
						var errorMsg = json ? json.errors.msg : '';
						requestConfig.isShowErrorMsg ? Ext.Msg.alert('提示',
								'请求失败,错误原因如下:' + '<br>' + errorMsg) : '';
						if (requestConfig.callback
								&& requestConfig.callback.failure) {
							requestConfig.callback.failure.call(
									requestConfig.scope || window, response,
									request, errorMsg, json);
						}

					}
				})
	},
	clearDatass : function(panel) {
		panel.findById('userCode').setValue("");
		panel.findById('password').setValue("");
	},

	login : function(callback) {
		var login = function() {
			return panel.getForm().submit({
				clientValidation : true,
				url : _CONTEXT + '/base/loginAction!login.action',
				success : function(form, action) {
					winPanel.close();
					// window.location.reload();
					if (window.document.getElementById("user_name")) {
						window.document.getElementById("user_name").innerHTML = action.result.infoUser.userName;
					} else if (parent.document.getElementById("user_name")) {
						parent.document.getElementById("user_name").innerHTML = action.result.infoUser.userName;
					} else if (top.document.getElementById("user_name")) {
						top.document.getElementById("user_name").innerHTML = action.result.infoUser.userName;
					}
					if (parent.ucloud && parent.ucloud.ask
							&& parent.ucloud.ask.common
							&& parent.ucloud.ask.common.util) {
						parent.ucloud.ask.common.util.PubFun.setHTML(action);
					}
					if (typeof(callback) != 'undefined') {
						callback(form, action);
					}
				},
				failure : function(form, action) {
					if (action.failureType == Ext.form.Action.CLIENT_INVALID) {
						top.Ext.Msg.alert('提示','帐号不能为空，请输入帐号！');
						top.Ext.get('userCode').focus();
					} else if (action.failureType == Ext.form.Action.CONNECT_FAILURE) {
						top.Ext.Msg.alert('服务器异常，请与管理员联系！');
					} else if (action.failureType == Ext.form.Action.SERVER_INVALID) {
						ucloud.global.msg(action.result.errors.msg, function() {
									top.Ext.get('userCode').focus();
								})
					}
				}
			})
		};
		var panel = new top.Ext.FormPanel({
					id : 'ucloud.base.loginForm',
					frame : false,
					bodyStyle : 'background-color:transparent',
					width : 340,
					height : 110,
					defaultType : 'textfield',
					labelAlign : 'right',
					border : false,
					defaults : {
						width : 165,
						height : 22,
						labelAlign : 'right'
					},
					items : [{
								cls : 'user',
								id : 'userCode',
								stateId : 'ucloud.login.userCode',
								name : 'infoUser.userCode',
								allowBlank : false,
								fieldLabel : '帐 号',
								blankText : '帐号不能为空',
								listeners : {
									specialkey : function(obj, e) {
										if (e.getKey() == top.Ext.EventObject.ENTER) {
											if (this.validate()) {
												top.Ext.get('password').focus();
											}
										}
									}
								}
							}, {
								cls : 'key',
								id : 'password',
								name : 'infoUser.password',
								stateId : 'ucloud.login.password',
								fieldLabel : '密 码',
								inputType : 'password',
								listeners : {
									specialkey : function(obj, e) {
										if (e.getKey() == top.Ext.EventObject.ENTER) {
											login();
										}
									}
								}
							}
					// , {
					// xtype : 'checkbox',
					// fieldLabel : '强行登录',
					// name : 'forceLogin',
					// inputValue : 'true',
					// width : 12
					// }
					],
					buttons : [{
								text : '登录',
								handler : login
							}, {
								text : '重置',
								handler : function() {
									ucloud.global.clearDatass(panel);
								}
							}
					// , {
					// text : '注册',
					// handler : function() {
					// window.open(
					// _CONTEXT + "/base/register.jsp",
					// "_blank");// 弹出注册页面
					// }
					// }
					],
					buttonAlign : 'center'
				});
		var winPanel = new top.Ext.Window({
					title : '您不是系统用户，请先登录系统!!!',
					closable : true,
					width : 340,
					height : 150,
					bodyStyle : 'padding-top:5px',
					renderTo : top.Ext.getBody(),
					modal : true,
					items : [panel]
				})
		winPanel.show();
		top.Ext.get('userCode').focus();

	}
};

Ext.override(Ext.data.Record, {
			newInstance : function() {
				var record = new Ext.data.Record({})
				var fs = this.fields;
				fs.each(function(f) {
							record.set(f.name, null);
						});
				record.fields = fs;
				return record;
			}
		});

Ext.override(Ext.Panel, {
			oBtns : undefined
		});

Ext.override(Ext.FormPanel, {
			iconCls : 'form_tit_ico'
		});

Ext.override(Ext.grid.GridView, {
			getColumnStyle : function(col, isHeader) {
				var style = !isHeader ? (this.cm.config[col].css || '') : '';
				style += 'width:' + this.getColumnWidth(col) + ';';
				if (this.cm.isHidden(col)) {
					style += 'display:none;';
				}
				var align = this.cm.config[col].align;
				if (isHeader) {
					style += 'text-align:center;';
				} else if (align) {
					style += 'text-align:' + align + ';';
				}
				return style;
			}
		})

Ext.override(Ext.Container, {
			objRight : undefined,
			getTopContainer : function() {
				var p = this;
				while (p) {
					if (p.isTopContainer) {
						return p;
					}
					p = p.ownerCt;
				}
				return undefined;
			},
			addBarItems : function(items) {
				if (this.oBtns === undefined) {
					this.oBtns = new Ext.util.MixedCollection();
				}
				this.oBtns.addAll(items);
			},
			// 面板被点击时响应
			setCurrentObj : function() {
				var topContainer = this.getTopContainer();
				if (topContainer != undefined
						&& topContainer.currentObject != this) {
					topContainer.setFocusObject(this);
					if (topContainer.getXType() == 'yfc-viewport') {
						topContainer.refreshToolbar(this); // 刷新工具条
					}
				}
			},
			setFocusObject : Ext.emptyFn,

			yfcClear : function() {
			},
			yfcSearch : function() {
			},
			yfcAdd : function() {
			},
			yfcDelete : function() {
			},
			yfcModify : function() {
			},
			setResetRight : function(bRight) {
				this.setObjRight('t_reset', bRight);
			},
			setSearchRight : function(bRight) {
				this.setObjRight('t_search', bRight);
			},
			setAddRight : function(bRight) {
				this.setObjRight('t_add', bRight);
			},
			setModifyRight : function(bRight) {
				this.setObjRight('t_modify', bRight);
			},
			setDeleteRight : function(bRight) {
				this.setObjRight('t_delete', bRight);
			},
			setSaveRight : function(bRight) {
				this.setObjRight('t_save', bRight);
			},
			setObjRight : function(btnId, bRight) {
				if (this.objRight === undefined) {
					this.objRight = new Ext.util.MixedCollection();
				}
				this.objRight.add({
							id : btnId,
							disabled : bRight
						})
			}
		});

Ext.override(Ext.grid.ColumnModel, {
			getFirstEditCol : function(row) {
				for (var i = 0; i < this.getColumnCount(); i++) {
					if (this.isCellEditable(i, row) && !this.isHidden(i)) {
						return i;
					}
				}
			}
		});

Ext.override(Ext.form.Field, {
			validateOnBlur : false,
			labelSeparator : ''
		})

Ext.override(Ext.util.MixedCollection, {
			applyAll : function(objs) {
				if (arguments.length > 1 || Ext.isArray(objs)) {
					var args = arguments.length > 1 ? arguments : objs;
					for (var i = 0, len = args.length; i < len; i++) {
						this.apply(args[i]);
					}
				} else {
					for (var key in objs) {
						if (this.allowFunctions
								|| typeof objs[key] != "function") {
							this.apply(key, objs[key]);
						}
					}
				}
			},
			apply : function(key, o) {
				if (arguments.length == 1) {
					o = arguments[0];
					key = this.getKey(o);
				}
				var old = this.item(key);
				if (typeof key == "undefined" || key === null
						|| typeof old == "undefined") {
					return this.add(key, o);
				}
				var index = this.indexOfKey(key);
				this.items[index] = Ext.apply(this.items[index], o);
				this.map[key] = o;
				return o;
			}
		});

Ext.override(Ext.Component, {
			stateful : false
		});
Ext.override(Ext.tree.TreeNodeUI, {
			updateExpandIcon : function() {
				if (this.rendered) {
					var n = this.node, c1, c2;
					var cls = n.isLast() ? "x-tree-elbow-end" : "x-tree-elbow";
					var hasChild = n.hasChildNodes();
					if (hasChild || n.attributes.expandable) {
						if (n.expanded) {
							cls += "-minus";
							c1 = "x-tree-node-collapsed";
							c2 = "x-tree-node-expanded";
						} else {
							cls += "-plus";
							c1 = "x-tree-node-expanded";
							c2 = "x-tree-node-collapsed";
						}
						if (this.wasLeaf) {
							this.removeClass("x-tree-node-leaf");
							this.wasLeaf = false;
						}
						if (this.c1 != c1 || this.c2 != c2) {
							Ext.fly(this.elNode).replaceClass(c1, c2);
							this.c1 = c1;
							this.c2 = c2;
						}
					} else {
						if (!this.wasLeaf) {
							Ext.fly(this.elNode).replaceClass(
									n.expanded
											? "x-tree-node-expanded"
											: "x-tree-node-collapsed",
									"x-tree-node-leaf");
							delete this.c1;
							delete this.c2;
							this.wasLeaf = true;
						}
					}
					var ecc = "x-tree-ec-icon " + cls;
					if (this.ecc != ecc) {
						this.ecNode.className = ecc;
						this.ecc = ecc;
					}
				}
			}
		})

Ext.Ajax.on("requestcomplete", function(conn, response, options) {
	var obj;
	try {
		obj = Ext.util.JSON.decode(response.responseText);
	} catch (e) {
		obj = {};
	}
	if (obj.isLoginError && !obj.success) {
		response.responseText = "{errors:false,success:false,msg:false,isLoginError:true}";
		ucloud.global.login();
	} else if (obj.retMessage && !obj.success) {
		response.responseText = "{errors:false,success:false,msg:false,retMessage:true}";
		var message = obj.message;
		Ext.Msg.alert("提示", message);
	}

})