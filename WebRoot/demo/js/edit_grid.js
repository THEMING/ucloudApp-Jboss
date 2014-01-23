function EdGridOper() {

    this.width = 600;
    this.height = 400;
    this.gridHeight = 100;
    this.init = function() {

        //初始化edit grid
        var grid = this.getGrid();
        new Ext.Window({
            id : 'edit_grid_win',
            width : this.width,
            modal : true,
            title : '编辑grid演示',
            height : this.height,
            layout : 'fit',
            items : [ grid ],
            buttonAlign : 'center',
            buttons : [ {
                text : '确定',
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                  //获取所有更新过的记录
                    //注意，用此方法，是获取不到增加时有默认值但没有编辑过的行的！
                    //var mr=Ext.getCmp('edit_grid').store.getModifiedRecords();
                    
                    //选中行。
                    var mr = Ext.getCmp('edit_grid').getSelectionModel().getSelections();
                    
                    var data = new Array();
                    //将grid和纪录加入到一个数组里面
                    for(var i=0;i<mr.length;i++){
                        data.push(mr[i].data);
                    }
                    //将js数组转化为json字符串，以方便向后台传参
                    //在后台JSONArray ar = new JSONArray(JsonUtil.getString(jsonObj, "xxxx"));转换成数组
                    var jsonstr = Ext.util.JSON.encode(data);
                    
                    alert(jsonstr);

                }
            }, {
                text : '关闭',
                xtype: 'ZTESOFT.Button',
                color: 'gray',
                onClick : function() {
                    Ext.getCmp('edit_grid_win').close();
                }
            } ]
        }).show();

    }

    this.getGrid = function() {
        //初始化一个checkbox的列，在这里单独处理是因为checkbox需要单独载入以使grid能识别到它的事件
        var checkColumn = new Ext.grid.CheckColumn({
            header: 'check',
            dataIndex: 'extCol3',
            width: 55 
         });
        //初始化combo的store，这里不使用公共的combo控件是因为grid里面重复加载相同的combo太多，影响性能
        var dicStore = ZTESOFT.createComboStore({
            dict: true,//此值为ture，则使用默认的字典表来赋值
            dictType: '1',//只需指定类型值。
            hasBlank: true//为true表示加一个空白选择项，只对字典对象有效
            //dict为false时，需要告知combox访问后台的地址
            //url:PATH+'/demo/fun1/demoAction.json?method=tree',
            //valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
            //displayField: 'text',
            //baseParams : {node:1}//查询数据时传递给后台的参数
        });
        //加载后台数据
        dicStore.load();
        
        
        var gridWidth = this.width;
        
        var cm = new Ext.grid.CheckboxSelectionModel();
        //这里开始定义列，跟普通的grid最大的不同之处在于要指定其editor属性
        var column = new Ext.grid.ColumnModel([
             cm,                                  
            //new Ext.grid.RowNumberer({header:'序号',width:40}),   
            {header:'ID',dataIndex:'dictId',hidden:true},
            {header:'类型ID',dataIndex:'dataType',hidden:true},
            {header:'名称',dataIndex:'dataName',width:gridWidth*0.15,
                editor: new Ext.form.TextField({
                    allowBlank: false
                })
            },
            {header:'值',dataIndex:'dataValue',width:gridWidth*0.1,
                editor: new Ext.form.NumberField({
                    allowNegative: false,
                    maxValue: 100000
                })
            },
            {header:'类型',dataIndex:'dataTypeName',width:gridWidth*0.15,
                editor: new Ext.form.TextField({
                    allowBlank: false
                })
            },
            {header:'顺序',dataIndex:'orderIndex',width:gridWidth*0.1,
                editor: new Ext.form.TextField({
                    allowBlank: false
                })
            },
            {header:'时间',dataIndex:'extCol1',width:gridWidth*0.15,
                renderer: formatDate,
                editor: new Ext.ux.form.DateTimeField({
                    format:'Y-m-d h:i:s'
                    //value: '2012-02-04 16:00:01'
                })
            },
            {header:'下拉列表',dataIndex:'extCol2',width:gridWidth*0.15,
                editor: new Ext.form.ComboBox({
                    valueField: 'dataValue',
                    displayField: 'dataName',
                    mode: 'local',
                    triggerAction: 'all',
                    typeAhead : true,
                    editable : true ,
                    value: '',
                    store: dicStore //注意这里combo的用法
                }),
                renderer: function(value, cellmeta, record, rowIndex, columnIndex, store){
                    
                    //alert(Ext.getCmp('edit_grid').getColumnModel().getCellEditor(columnIndex,rowIndex).getXType());
                    var s = Ext.getCmp('edit_grid').getColumnModel().getCellEditor(columnIndex,rowIndex).field.initialConfig.store;
                    var index = s.find('dataValue',value);
                    if(index!=-1){
                        return s.getAt(index).data.dataName;
                    }
                    return value;
                    
                    //加入这个render，处理选中之后不显示label值而显示hidden值的问题
                    //要特别注意这里的store变更和valueField，displayField的定义
                    /*
                    var index = dicStore.find('dataValue',value);
                    if(index!=-1){
                        return dicStore.getAt(index).data.dataName;
                    }
                    return value;
                    */
                }
            },
            //将checkbox列加入
            checkColumn
          ]);  
    
        //获得列索引以使初始化grid的store
        var fields = new Array();  
        for(var i=0;i<column.getColumnCount();i++){
            fields.push({name:column.getDataIndex(i)});
        }

        //初始化grid store
        var store = ZTESOFT.createGridStore({
            id:'edit_Store',
            fields: fields,
            url : PATH+'/demo/fun1/demoAction.json?method=page'
        }); 
        
        // create the editor grid
        var grid = new ZTESOFT.EditorGridPanel({
            id:'edit_grid',
            paging:true,
            store: store,
            cm: column,
            sm :cm,
            //height: 300,
            //autoExpandColumn: 'dataName', // column with this id will be expanded
            plugins: checkColumn,//注意这里，要单独说明加载了一个checkbox的列，以便grid处理其事件
            frame: false,
            clicksToEdit: 1,//这里表明需要点击多次才能编辑单元格，默认是2，即双击
            bodyStyle:'padding:0px;',
            tbar: this.inittbar()
        });
        
        return grid;
    }
    
    this.inittbar = function () {
        var tb = new Ext.Toolbar();
        tb.add({
            text : '增加',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
             // access the Record constructor through the grid's store 
                //新插入一行
                var grid = Ext.getCmp('edit_grid');
                //获得store的record定义
                var Plant = grid.getStore().recordType;
                //创建一个record
                var p = new Plant({
                    dataName: 'dataName',
                    dataTypeName: 'dataTypeName',
                    dataValue: 0,
                    extCol1: new Date(),
                    extCol3: false
                });
                //选停止监听编辑事件
                grid.stopEditing();
                //插入行
                grid.getStore().insert(0, p);
                //恢复监听
                grid.startEditing(0, 0);
            }
        },"-");//加这个符号，会在页面上添加一个竖线分隔符
        tb.add({
            text : 'excel导入',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                eo.importData();
            }
        },"-");
        tb.add({
            text : '删除所选',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                eo.remove();
            }
        });
        
        return tb;
    }
    
    this.importData = function(){
      //传递给导出页面的参数，在后台仍使用getParam()方法可以获得
        var param = new Object();
        //param.userid = 'fy';
        //param.pageId = 'excel_demo';
        

        /*这个为后台实现类，请写全路名，简单的列表可以参考ReadDemoServiceImpl,继承
        com.unicom.ucloud.eom.base.service.ReadSimpleElsService类.并实现其中的抽象方法。
                     复杂的逻辑请继承原有的
        com.unicom.ucloud.eom.base.service.BaseServiceImpl类，并实现
        com.unicom.ucloud.eom.base.service.IReadElsService接口

         */
        param.serviceClass = 'com.unicom.ucloud.eom.demo.fun1.service.ReadDemoServiceImpl';

        new ZTESOFT.FileUtil().uploadExcel(param,function(retVal){
            //导入成功时，会返回列表数据，格式跟读取DB的一样
            Ext.getCmp('edit_grid').store.removeAll();
            Ext.getCmp('edit_grid').store.loadData(retVal);
        });
    }
    
    this.remove = function(){
        var grid = Ext.getCmp('edit_grid');
        //删除选中的第一条记录
        //grid.store.remove(grid.getSelectionModel().getSelected());
        //删除选中的全部记录
        var records = grid.getSelectionModel().getSelections();
        for(var i = 0,len = records.length;i<len;i++ ){
                grid.store.remove(records[i]);
        }
        grid.store.commitChanges();
    }

}

//处理日期的render
function formatDate(value){
    return value ? value.dateFormat('Y-m-d h:i:s') : '';
}