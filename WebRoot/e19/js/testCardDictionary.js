var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var qryPnHeight = 120;
    var gridPnHeight = body_height - qryPnHeight;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据

    var oper = new PageOper();
    var manager = new ManagerOper();

    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 


        oper.init();

    });

    function PageOper() {
        
        this.testobjectTypeEnumIdStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['','全部'],
                ['1','SIM卡'],
                ['2','固定电话'],
                ['3','测试中端'],
                ['4','充值卡']
            ]
        });
        
        this.attributeNameStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['','全部'],
                ['1','卡类型'],
                ['2','卡类别']
            ]
        });

        this.init = function() {
            var mainPanel = this.initMainPanel();
            var viewport = new Ext.Viewport({
                //所有的页面元素最终都加入到这个显示容器中，并且添加到页面的ID为content的div中，
                //也可以单个元素直接加到页面dom元素，但不建议
                el : 'content',
                layout : 'border',
                margins : '5 5 5 5',
                items : [ mainPanel ]
            });
        }

        //初始化主面板

        this.initMainPanel = function() {
            //qery
            var qryFrom = this.initQryPn();
            //列表
            var listPanel = this.initListGrid();
            //主面板
            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',//这种布局方式类似地图，子元素按方位布局
                items : [ qryFrom,listPanel ]
            });
            return mainPanel;
        }

        this.initQryPn = function() {
            var qryForm = new Ext.FormPanel({
                id : 'qryForm',
                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
                labelWidth : 90,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩
                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : body_width,
                items : [{
                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉
                    items : [{
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '测试卡类型',
                            name : 'testobjectTypeEnumIdQry',
                            id : 'testobjectTypeEnumIdQry',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.testobjectTypeEnumIdStore,
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '属性名称',
                            name : 'attributeNameQry',
                            id : 'attributeNameQry',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.attributeNameStore,
                            anchor : '90%'
                            
                        }]
                    }]
                }],
                buttons : [{
                    text : '查询',
                    listeners : {
                        "click" : function() {
                            //获取查询参数
                            var param = Ext.getCmp('qryForm').getForm().getValues();
                            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
                            param.testobjectTypeEnumIdQry = Ext.getCmp('testobjectTypeEnumIdQry').getValue();
                            param.attributeNameQry = Ext.getCmp('attributeNameQry').getValue();
                            
                            oper.qryListGrid(param);
                            

                        }
                    }
                }]
            });
            return qryForm;
        };

        //查询列表
        this.qryListGrid = function(param) {
            
            //绑定发送请求参数
            Ext.getCmp('listGrid').store.on('beforeload', function(store) {

                if (Ext.getCmp('listGrid').store.lastOptions != null) {
                    //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变
                    Ext.getCmp('listGrid').store.baseParams = param;
                    //Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
                }
            });
            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
            Ext.getCmp('listGrid').store.load({
                params : {
                    start : 0,//开始索引
                    limit : Ext.getCmp('listGrid').getPageSize()//步数
                }
            });
            //load数据后自动选择第一行数据,load事件为加载数据完成后触发
            Ext.getCmp('listGrid').store.on('load', function() {
                Ext.getCmp('listGrid').getSelectionModel().selectFirstRow();//选中第一行
            });

        }

        this.initListGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,                         
                {header:'测试卡类型',dataIndex:'testobjectTypeEnumId',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return value==1?"SIM卡":(value==2?"固定电话":(value==3?"测试终端":(value==4?"充值卡":"")));
                    },width:gridWidth*0.15},
                {header:'属性编号',dataIndex:'cardDictionaryAttrId',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:oper.detai('+value+')>' + value + '</a>';
                    },width:gridWidth*0.15},
                {header:'属性名称',dataIndex:'attributeName',width:gridWidth*0.15},
                {header:'默认属性值',dataIndex:'defaultAttributeValue',width:gridWidth*0.1},
                {header:'生效时间',dataIndex:'effectiveDate',hidden:true},
                {header:'失效时间',dataIndex:'cancelDate',hidden:true},
                {header:'备注',dataIndex:'remarks',hidden:true},
                {header:'属性类型',dataIndex:'attributeType',hidden:true}
            ]);
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'listGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试演示列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initGridToolsBar(),//工具条，用来放操作按键
                url : PATH+'/e19/testCardDictionaryAttrAction.json?method=qryList',//访问读取后台数据的地址
                sm :cm        
                /*        
                sm : new Ext.grid.RowSelectionModel({
                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                    listeners : {
                        //行选中事件
                        rowselect : function(sm, row, rec) {
                            //oper.qryRule(rec.data.tacheId);
                        }
                    }
                })*/
            });

            return grid;

        }
        
        this.detai = function(a){
        
        	oper.detail('mod');
                
                Ext.getCmp('infoPage').getForm().items.eachKey(function(key,item){  //alert(1); 
                  //console.log(item.fieldLabel)   
                  //item.setDisabled(true)   
                  item.el.dom.readOnly=true;   
                item.disabled=true;
                });
                Ext.getCmp('valueListGrid').getTopToolbar().disable();
        	Ext.getCmp('winComBut').hide();
        }
        

        this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '增加',
                onClick : function() {
                    oper.detail('add');
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '修改',
                onClick : function() {
                    oper.detail('mod');
                }
            },"-");
            tb.add({
                text : '删除',
                onClick : function() {
                    oper.del();
                }
            },"-");

            return tb;
        }
        
        this.detail = function (operStr){
            
            //alert(selNode.id);
            var param = new Object();
            if(operStr == 'mod'){
                var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if(selinfo.length!=1){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                //var rec = Ext.getCmp('listGrid').getSelectionModel().getSelected();
                var rec = selinfo[0];
                if(rec==null){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                param = rec;
            }
            
            manager.initWindow(operStr,param);
            //alert(rec.data.tacheId);
        }
        
        this.del = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length==0){
                Ext.Msg.alert('操作提示','请先选择您要删除的行');
            }else{
            	
            	var par = new Object();
            	var li = new Array();
            	for(var i=0;i<selinfo.length;i++){
            	   var a = selinfo[i].data;
            	   li.push(a);
            	}
            	
            	par.lis = Ext.util.JSON.encode(li);
            	par.deleteBy = 1;
            	ZTESOFT.invokeAction(
                    PATH+'/e19/testCardDictionaryAttrAction.json?method=deleteTestCardDictionaryAttr',
                    par,
                    function(response){
                    	if(response.msg=="success"){
                    	   Ext.Msg.alert('操作提示',"删除成功！");
                    	   var param = Ext.getCmp('qryForm').getForm().getValues();
                            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
                            param.testobjectTypeEnumIdQry = Ext.getCmp('testobjectTypeEnumIdQry').getValue();
                            param.attributeNameQry = Ext.getCmp('attributeNameQry').getValue();
                            
                            oper.qryListGrid(param);
                    	}else{
                    	   Ext.Msg.alert('操作提示',"删除失败！");
                    	}
                    	
                    }
            );
            	
                
            }
        }
    }
    
    

    function ManagerOper(){
        //主窗口
        this.winTitle = '新增面板';
        
        this.testobjectTypeEnumIdStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['1','SIM卡'],
                ['2','固定电话'],
                ['3','测试中端'],
                ['4','充值卡']
            ]
        });
        
        this.attributeTypeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['1','下拉框'],
                ['2','日期型'],
                ['3','文本框']
            ]
        });
        
        
        this.initWindow = function(operStr,rowData){
            var formPanel = this.initFormPanel();
            
            var initValueListGrid = this.initValueListGrid();
            
            if(operStr == 'add'){
                this.winTitle = '新增面板';
            }else if(operStr == 'mod'){
                this.winTitle = '属性编辑面板';
                this.initUpdate(rowData);
                
            }
        
            var formWin = new Ext.Window({
                id:'detailWin',
                title: this.winTitle,
                closable:true,
                width: body_width*0.6,
                height: body_height*0.8,
                modal:true,
                layout: 'border',
                plain:true,
                items: [formPanel,
                initValueListGrid],
                buttonAlign:'center',
                buttons: [{
                    text: '确定',
                    id:'winComBut',
                    onClick:function(){
                        if(operStr=='add'){
                            manager.addCommit();
                        }else{
                            manager.updateCommit(rowData);
                        }
                    }
                },{
                    text: '关闭',
                    onClick:function(){
                        Ext.getCmp('detailWin').close();
                    }
                }]
            });
             formWin.show();
             
        }
        
        
        this.initValueListGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,                         
                {header:'属性值编号',dataIndex:'attributeValueCode',width:gridWidth*0.15},
                {header:'属性值名称',dataIndex:'attributeValueName',width:gridWidth*0.15}
            ]);
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'valueListGrid',
                region : 'center',//在父容器里的位置
                height : body_height*0.3,//默认宽度为自适应的，一般不用设置
                width : body_width*0.6,
                title : '属性值列表',
                cm : column,//列定义
                paging : false,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initValueListGridToolsBar(),//,//工具条，用来放操作按键
//                url : PATH+'/e19/testCardDictionaryAttrAction.json?method=qryList',//访问读取后台数据的地址
                sm :cm 
                      
//                sm : new Ext.grid.RowSelectionModel({
//                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
//                    listeners : {
//                        //行选中事件
//                        rowselect : function(sm, row, rec) {
//                            //oper.qryRule(rec.data.tacheId);
//                        }
//                    }
//                })
            });

            return grid;

        }
        
        this.initValueListGridToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '增加',
                onClick : function() {
                    manager.detail('add');
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '修改',
                onClick : function() {
                    manager.detail('mod');
                }
            },"-");
            tb.add({
                text : '删除',
                onClick : function() {
                    manager.detail('del');
                }
            },"-");

            return tb;
        }
        
        this.detail = function(flag){
        	this.title = '新增面板';
//            alert(flag);
        	if(flag)
        	
        	
        	var formpanel = this.initformpanel();
        	
        	
        	if(flag == 'add'){
                this.title = '新增面板';
            }else if(flag == 'mod'){
            	var selinfo = Ext.getCmp('valueListGrid').getSelectionModel().getSelections();
                if(selinfo.length!=1){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                this.title = '编辑面板';
                Ext.getCmp('valueInfo').getForm().loadRecord(selinfo[0]);
                aaaaaaaaaaa
            }else{
                var selinfo = Ext.getCmp('valueListGrid').getSelectionModel().getSelections();
                if(selinfo.length==0){
                    Ext.Msg.alert('操作提示','请先选择您要删除的行');
                    return;
                }
                for(var i=0;i<selinfo.length;i++){
                    Ext.getCmp('valueListGrid').getStore().remove(selinfo[i]);
                }
                            return;
                
            }
        	
            var formwin = new Ext.Window({
                id:'detailWin2',
                title: this.title,
                closable:true,
                width: 400,
                height: 300
                ,
                modal:true,
                layout: 'border'
                ,
                plain:true
                ,
                items: [formpanel
                ]
                ,
                buttonAlign:'center'
                ,
                buttons: [{
                    text: '确定',
                    onClick:function(){
                    	var valusInfo = Ext.getCmp('valueInfo').getForm().getValues();
                    	var p = new Ext.data.Record({"attributeValueCode":valusInfo.attributeValueCode,
                            "attributeValueName":valusInfo.attributeValueName});
                        if(flag=='mod'){
                            
                            var sele = Ext.getCmp('valueListGrid').getSelectionModel().getSelections();
                            
                            Ext.getCmp('valueListGrid').getStore().remove(sele[0]);
                            
                        	
                        }
                            
                        
                        var st = Ext.getCmp('valueListGrid').getStore();
                        Ext.getCmp('defaultAttributeValue').store = st;
                        
                        Ext.getCmp('valueListGrid').getStore().add(p);
                        Ext.getCmp('detailWin2').close();
                        
                    }
                },{
                    text: '关闭',
                    onClick:function(){
                        Ext.getCmp('detailWin2').close();
                    }
                }]
            });
            
            
            
             formwin.show();
        }
        
        this.initformpanel = function(){
            var infoPage = new Ext.FormPanel({
                id:'valueInfo',
                region: 'center',
                labelAlign: 'left',
                title:'属性值信息',
                frame:true,
                autoScroll :true,
                height:200,
                width:400,//Ext.getBody().getSize(),
                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;',
                buttonAlign: 'center',
                labelWidth: 80,
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:1,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'<font color="red">*</font>属性值编码',
                                name:'attributeValueCode',
                                id: 'attributeValueCode',
                                blankText:'属性编码不能为空!',
                                allowBlank:false, 
                                anchor:'95%'
                            }]
                        },{
                        columnWidth:1,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'<font color="red">*</font>属性值名称',
                                name:'attributeValueName',
                                id: 'attributeValueName',
                                blankText:'属性名称不能为空!',
                                allowBlank:false, 
                                anchor:'95%'
                            }]
                        }]
                    }]
                   });
            return infoPage;
        }
        
        this.initFormPanel = function(){
            var infoPage = new Ext.FormPanel({
                id:'infoPage',
                region: 'north',
                labelAlign: 'left',
                title:'新增属性',
                frame:true,
                autoScroll :true,
                height:body_height*0.3,
                width:body_width*0.6,//Ext.getBody().getSize(),
                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;',
                buttonAlign: 'center',
                labelWidth: 80,
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '<font color="red">*</font>测试卡类型',
                            name : 'testobjectTypeEnumId',
                            id : 'testobjectTypeEnumId',
                            valueField: 'value',
                            displayField: 'text',
                            allowBlank:false,
                            blankText:'测试卡类型不能为空!',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.testobjectTypeEnumIdStore,
                            anchor : '90%'
                            
                        }]
                    },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'<font color="red">*</font>属性名称',
                                name:'attributeName',
                                id: 'attributeName',
                                blankText:'属性名称不能为空!',
                                allowBlank:false, 
                                anchor:'95%'
                            },{
                                xtype:'hidden',
                                name: 'cardDictionaryAttrId',
                                id: 'cardDictionaryAttrId'
                            }]
                        },
                        {
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '<font color="red">*</font>属性类型',
                            name : 'attributeType',
                            id : 'attributeType',
                            valueField: 'value',
                            allowBlank:false,
                            blankText:'属性类型不能为空!',
                            displayField: 'text',
                            listeners : {
                        "select" : function() {
                            var attributeType = Ext.getCmp('attributeType').getValue();
                            if(attributeType==1){
                                Ext.getCmp('defaultAttributeValue').enable();
                            }else{
                                Ext.getCmp('defaultAttributeValue').disable();
                            }
//                            alert(attributeType);
                        }
                    },
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.attributeTypeStore,
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '默认属性值',
                            name : 'defaultAttributeValue',
                            id : 'defaultAttributeValue',
                            valueField: 'attributeValueName',
                            displayField: 'attributeValueName',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : true ,
                            disabled:true,
                            value: '',
                            store: new Ext.data.ArrayStore({
                                fields: ['attributeValueName','attributeValueName'],
                                data:[
                                ]
                            }),
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel: '备注',
                                name: 'remarks',
                                id: 'remarks',
                                anchor:'95%'
                            }]
                        },{
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            fieldLabel : '<font color="red">*</font>生效日期',
                            name : 'effectiveDate',
                            id : 'effectiveDate',
                            allowBlank:false,
                            blankText:'生效日期不能为空!',
                            format:'Y-m-d h:i:s',
                            anchor : '90%'
                            }]
                        },{
                        columnWidth : .5,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            allowBlank:false,
                            fieldLabel : '<font color="red">*</font>失效日期',
                            name : 'cancelDate',
                            id : 'cancelDate',
                            blankText:'失效日期不能为空!',
                            format:'Y-m-d h:i:s',
                            anchor : '90%'
                            }]
                        }]
                    }]
                   });
                   
                   
                   
                   
            return infoPage;
        }
        
        //增加任务提交
        this.addCommit = function(){
            if(!Ext.getCmp('infoPage').getForm().isValid()){
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            
            param.testobjectTypeEnumId = Ext.getCmp('testobjectTypeEnumId').getValue();
            param.attributeType = Ext.getCmp('attributeType').getValue();
            param.createdBy = 1;
            param.lastUpdatedBy = 1;
            param.marketingAreaId = 1;
            param.maintenanceAreaId = 1;
            param.orgId = 1;
            var st = Ext.getCmp('valueListGrid').getStore();
            var valLis = new Array();
            if(param.attributeType==1&&st.getCount()==0){
                Ext.Msg.alert("提示","请添加属性值！");
                return;
            }else if(param.attributeType==1&&st.getCount()!=0){
            var le = st.getCount();//this.showObject(st.data.items[0].data);
                for(var i=0;i<le;i++){
                    var dd = st.data.items[i].data;
                    dd.createdBy = 1;
                    dd.lastUpdatedBy = 1;
                    dd.marketingAreaId = 1;
                    dd.maintenanceAreaId = 1;
                    dd.orgId = 1;
                    valLis.push(dd);
                }
            }
            
            param.valueList = Ext.util.JSON.encode(valLis);
            
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardDictionaryAttrAction.json?method=addTestCardDictionaryAttr',
                    param,
                    function(response){
                        Ext.Msg.alert("操作提示","新增成功");
                                Ext.getCmp('detailWin').close();
                                Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                        
                    }
            );
            
            
        }
        //修改任务提交
        this.updateCommit = function(rowData){
            
            if(!Ext.getCmp('infoPage').getForm().isValid()){
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            
            param.testobjectTypeEnumId = Ext.getCmp('testobjectTypeEnumId').getValue();
            param.attributeType = Ext.getCmp('attributeType').getValue();
            param.createdBy = 1;
            param.lastUpdatedBy = 1;
            param.marketingAreaId = 1;
            param.maintenanceAreaId = 1;
            param.orgId = 1;
            var st = Ext.getCmp('valueListGrid').getStore();
            var valLis = new Array();
            if(param.attributeType==1&&st.getCount()==0){
                Ext.Msg.alert("提示","请添加属性值！");
                return;
            }else if(param.attributeType==1&&st.getCount()!=0){
            var le = st.getCount();//this.showObject(st.data.items[0].data);
            
                for(var i=0;i<le;i++){
                    var dd = st.data.items[i].data;
                    dd.createdBy = 1;
                    dd.lastUpdatedBy = 1;
                    dd.marketingAreaId = 1;
                    dd.maintenanceAreaId = 1;
                    dd.orgId = 1;
                    valLis.push(dd);
                }
            }
            
            param.eomCardDictAttrList = Ext.util.JSON.encode(valLis);
            
            var dele = new Object();
            dele.deletedBy = 1;
            dele.cardDictionaryAttrId = param.cardDictionaryAttrId;
            param.eomCardDictAttrListObj = Ext.util.JSON.encode(dele);
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardDictionaryAttrAction.json?method=updateTestCardDictionaryAttr',
                    param,
                    function(response){
                        Ext.Msg.alert("操作提示","修改成功");
                                Ext.getCmp('detailWin').close();
                                Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                        
                    }
            );
            

        }
        
        this.del = function(dicId){
            
        }
        //修改初始化

        this.initUpdate = function(rowData){
            Ext.getCmp('infoPage').getForm().loadRecord(rowData);
            var par = new Object();
            par.cardDictionaryAttrId = rowData.data.cardDictionaryAttrId;
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardDictionaryAttrAction.json?method=qryAtestCardDictionaryAttr',
                    rowData.data,
                    function(response){
                    	var rows = response.rows2;
                    	var li = rows.length;
                    	for(var i=0;i<li;i++){
                    	   Ext.getCmp('valueListGrid').getStore().add(new Ext.data.Record(rows[i]));
                    	}
                    }
            );
            
            this.initDefaultAttributeValue();
            
            
        }
        
        
        this.initDefaultAttributeValue = function(){
            var attributeType = Ext.getCmp('attributeType').getValue();
                            if(attributeType==1){
                                Ext.getCmp('defaultAttributeValue').enable();
                                
                                var st = Ext.getCmp('valueListGrid').getStore();
                                Ext.getCmp('defaultAttributeValue').store = st;
                                
                            }else{
                                Ext.getCmp('defaultAttributeValue').disable();
                            }
        }
    }