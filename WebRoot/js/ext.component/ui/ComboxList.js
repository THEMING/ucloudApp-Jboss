Ext.namespace("ucloud.ui")
var jsonStore;
ucloud.ui.ComboxList = function(itemConfig) {
	var config = {
		fieldLabel : '数据字典',
		store : jsonStore,
		displayField : 'describe',
		valueField : 'code',
		hiddenName : '',
		typeAhead : true,
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		selectOnFocus : true,
		comboxAction : '../../examcenter/examManage/examManageAction',
		comboxMethod : 'initCombox',
		comboxType : 'comboxType',
		comboxTypeValue : '',
		comboxList : 'comboxList',
		anchor : '90%',
		isAddAll : true,
		isAddAllText : '显示全部'
	}
	config = Ext.apply(config, itemConfig || {});
	ucloud.ui.ComboxList.superclass.constructor.call(this, config);
	// this.init();

};

Ext.extend(ucloud.ui.ComboxList, Ext.form.ComboBox, {
			initComponent : function() {
				var flagAll = this.isAddAll;
				var isAddAllText = this.isAddAllText;
				this.store = new Ext.data.JsonStore({
							url : this.comboxAction + '!' + this.comboxMethod
									+ '.action?' + this.comboxType + '='
									+ this.comboxTypeValue,
							autoLoad : true,
							root : this.comboxList,
							fields : [{
										name : this.valueField
									}, {
										name : this.displayField
									}],
							listeners : {
								load : function(store) {
									if (flagAll) {
										var TopicRecord = Ext.data.Record
												.create([{
															name : 'code',
															type : 'string'
														}, {
															name : 'describe',
															type : 'string'
														}]);

										myNewRecord = new TopicRecord({
													code : '',
													describe : isAddAllText
												});
										store.insert(0, myNewRecord);
									}
								}
							}
						});
				ucloud.ui.ComboxList.superclass.initComponent.call(this);
			},
			/**
			 * 扩展comblist的setValue()方法
			 * 当给combo赋值时，而combo的store还未加载则先去加载其数据源然后再进行赋值
			 * @param {String} value The value to match
			 */
		    setValue : function(v){
		    	
		    	var callParentSetValue = function(){
			    	ucloud.ui.ComboxList.superclass.setValue.call(this,v);
			    	//赋值成功后立即将关联的事件注销
			    	this.store.removeListener('load',callParentSetValue,this);
			    };
		    	//数据为空时先去加载数据源
		        if(this.store && (!this.store.getCount()))
		        {
		        	//监听数据加载完成事件
		        	this.store.on('load',callParentSetValue,this);
		        	//先判断数据源是否为自动加载,是则不再加;否则要去加载
		        	if(!this.store.autoLoad)
		        	{
		        		this.store.reload();
		        	}
		        }
		        else
		        {
		        	ucloud.ui.ComboxList.superclass.setValue.call(this,v);
		        }
		    }		    
		})

Ext.reg('comboxlist', ucloud.ui.ComboxList);