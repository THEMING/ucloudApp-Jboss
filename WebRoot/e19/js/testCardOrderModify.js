var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var qryPnHeight = 120;
    var gridPnHeight = body_height - qryPnHeight;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据
    var testCardOrderModifyWidth = 160;

    var processInstID = "";
var activityInstID = "";
var taskInstID = "";
var cardSheetIdGlo = 0;
var testCardChecktestobjectType = "";
var testOrderCheckFlag = "";
var testCardOrderModifyWoStatusEnumId = "";
var testCardOrderModifyAftereditFlagAndSetView = 0;//编辑触发标记，使得render不运行,并跳过数量对比，直接设成查看明细
var fileList = new Array();
var testCardOrderModifyFileList = new Object();
var testCardOrderModityCardOperationTypeEnumId = "";
var testCardOrderModifyProcessModelName = "";
var onlyShowMyProvince = 0;
var testCardQueryAndSelect = new TestCardQueryAndSelect();//各种类型测试卡查询form的初始化
var modifyProcessingTypeMap = null;
var urgencyLevelMap = null;
var modOper = new TestCardModOper();
var stroe = new jsonStroe();
var modifyUrgencyLevelId = "";

modifyProcessingTypeMap = getMap("TCM_PROCESSING_TYPE");
urgencyLevelMap = getMap("URGENCY_LEVEL");
    var testCardOrderModify = new TestCardOrderModify();
//    var manager = new DetailWin();
    var applyAndmodWin = new ApplyAndModWin();
    
function getMap(value){
        var oo = new Object();
        oo.dictType = value;
        
        var url = PATH + '/commondata/commonDataAction.json?method=qryDictData&dictType='+oo.dictType;
        var _ret = ZTESOFT.Synchronize(url,oo);
        var map = new   Map();
        var array = new Array();
        var _retValue = null;
        array = eval(_ret); 
        for(var v=0; v<array.length; v++){
            map.set(array[v].dataValue,array[v].dataName);
        }
        return map;
    }
    
/**
 * 创建Map对象
 * @returns
 */
function Map() {
                this.keys = new Array();
                this.data = new Array();
                //添加键值对
                this.set = function (key, value) {
                    if (this.data[key] == null) {//如键不存在则身【键】数组添加键名

                        this.keys.push(value);
                    }
                    this.data[key] = value;//给键赋值

                };
                //获取键对应的值

                this.get = function (key) {
                    return this.data[key];
                };
                //去除键值，(去除键数据中的键名及对应的值)
                this.remove = function (key) {
                    this.keys.remove(key);
                    this.data[key] = null;
                };
                //判断键值元素是否为空

                this.isEmpty = function () {
                    return this.keys.length == 0;
                };
                //获取键值元素大小

                this.size = function () {
                    return this.keys.length;
                };
            }

    function TestCardOrderModify() {
    	
    	this.showWinPre = function(processInstIDTmp,activityInstIDTmp,taskInstIDTmp,urlTmp){//与showWinPreMyUndoTaskUnify方法的业务逻辑保持一致
           processInstID = processInstIDTmp;
           activityInstID = activityInstIDTmp;
           taskInstID = taskInstIDTmp;
           if(urlTmp=='checkModify'){
               testOrderCheckFlag = 'modify';
           }
           var ob = new Object();
           ob.processInstID = processInstID;
           ZTESOFT.invokeAction(
                                    PATH+'/e19/tcmBpsAction.json?method=getCardSheetIdByProcessInstID',
                                    ob,
                                    function(response){
                                        if(response.total!=1){
                                           Ext.Msg.alert("提示","查询工单Id异常！");
                                           return;
                                        }
                                        
                                        var ro = response.rows;
//                                        testCardOrderModify.detail("mod");
                                        applyAndmodWin.showWin("mod",ro[0].flowingObjectId);
                                        
//                                        new DetailWin().showWin(urlTmp,ro[0].flowingObjectId);
                                    }
                            );
        }
        
        this.showWinPreMyUndoTaskUnify = function(processInstIDTmp,activityInstIDTmp,taskInstIDTmp,urlTmp){
        	testCardOrderModifyWidth = (myUndoTaskUnifyBody_width-80)/4;
           processInstID = processInstIDTmp;
           activityInstID = activityInstIDTmp;
           taskInstID = taskInstIDTmp;
           if(urlTmp=='checkModify'){
               testOrderCheckFlag = 'modify';
           }
           var ob = new Object();
           ob.processInstID = processInstID;
           ZTESOFT.invokeAction(
                                    PATH+'/e19/tcmBpsAction.json?method=getCardSheetIdByProcessInstID',
                                    ob,
                                    function(response){
                                        if(response.total!=1){
                                           Ext.Msg.alert("提示","查询工单Id异常！");
                                           return;
                                        }
                                        
                                        var ro = response.rows;
//                                        testCardOrderModify.detail("mod");
                                        return applyAndmodWin.showWinMyUndoTaskUnify("mod",ro[0].flowingObjectId);
                                        
//                                        new DetailWin().showWin(urlTmp,ro[0].flowingObjectId);
                                    }
                            );
        }
        
        
        this.currentNodeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['','全部'],
                ['1','申请'],
                ['2','执行'],
                ['3','审核'],
                ['4','接收']
            ]
        });
        
        this.sheetStatusStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['','全部'],
                ['1','待派发'],
                ['2','待接收'],
                ['3','完成']
            ]
        });
        
        this.sheetTypeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['1','移交'],
                ['2','报废'],
                ['3','借用'],
                ['4','调拨'],
                ['5','归还']
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
                labelWidth : 60,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩
                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : 800,//body_width,
                items : [{
                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉
                    items : [{
                        columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性
                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
                        items : [{
                            xtype : 'numberfield',
                            fieldLabel : '工单号',
                            name : 'sheetSerialNumberQry',
                            id : 'sheetSerialNumberQry',//sheetSerialNumberQry
                            allowBlank: true,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                            anchor : '90%'//大概意思是表示这个textfield控件，占整个列宽的比例
                        }]
                    }, {
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '环节',
                            name : 'currentNodeQry',
                            id : 'currentNodeQry',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.currentNodeStore,
                            anchor : '90%'
                            
                        }]
                    }, {
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '工单状态',
                            name : 'sheetStatusQry',
                            id : 'sheetStatusQry',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.sheetStatusStore,
                            anchor : '90%'
                            
                        }]
                    }]
                },
                {
                    layout : 'column',
                    items : [{
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            fieldLabel : '开始时间',
                            name : 'creationStartDate',
                            id : 'creationStartDate',
                            format:'Y-m-d h:i:s',
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            fieldLabel : '结束时间',
                            name : 'creationEndDate',
                            id : 'creationEndDate',
                            format:'Y-m-d h:i:s',
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype: 'checkbox',
                            name : 'dealMan',
                            id : 'dealMan',
                            checked:true,
                            boxLabel:'本处理人',
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
                            param.currentNode = Ext.getCmp('currentNodeQry').getValue();
                            param.woStatusEnumId = Ext.getCmp('sheetStatusQry').getValue();
//                            alert(Ext.getCmp('dealMan').checked);
//                            param.dealMan = Ext.getCmp('dealMan').checked;
                            
                            testCardOrderModify.qryListGrid(param);

                        }
                    }
                }, {
                    text : '重置',
                    listeners : {
                        "click" : function() {
                            Ext.getCmp('qryForm').getForm().reset();
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
//                    Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
                }
            });
            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
            Ext.getCmp('listGrid').store.load({
                params : 
                    {
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
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'工单流水号',dataIndex:'sheetSerialNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:manager.showWin(0,'+record.data.cardSheetId+')>' + value + '</a>';
                    },width:gridWidth*0.1},
                {header:'工单类型',dataIndex:'sheetTypeName',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                        return record.data.sheetType==1?"测试卡移交":(record.data.sheetType==2?"测试卡报废":(record.data.sheetType==3?"测试卡借用":(record.data.sheetType==4?"测试卡调拨":"测试卡归还")));
//                    },
                    width:gridWidth*0.1},
                {header:'当前环节',dataIndex:'currentNodeName',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                        return record.data.currentNode=="1"?"申请":(record.data.currentNode=="2"?"执行":(record.data.currentNode=="3"?"审核":"接收"));
//                    },
                    width:gridWidth*0.1},
                {header:'处理组',dataIndex:'dealGroup',width:gridWidth*0.1,hidden:true},
                {header:'处理人',dataIndex:'dealMan',width:gridWidth*0.1,hidden:true},
                {header:'处理组/处理人',dataIndex:'dealGroupOrMan',width:gridWidth*0.2},
                {header:'要求完成时限',dataIndex:'requiredFinishTime',width:gridWidth*0.1},
                {header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.1},
                {header:'派发时间',dataIndex:'dispatchDate',width:gridWidth*0.1,sortable:true,defaultSortable:true},
                {header:'工单状态',dataIndex:'sheetStatusName',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                        return record.data.sheetStatus=="1"?"待派发":(record.data.sheetStatus=="2"?"待接收":(record.data.sheetStatus=="3"?"完成":""));
//                    },
                    width:gridWidth*0.1},
                
                {header:'当前环节',dataIndex:'currentNode',hidden:true},
                {header:'工单状态',dataIndex:'woStatusEnumId',hidden:true},
                {header:'工单类型',dataIndex:'cardOperationTypeEnumId',hidden:true},
                
                {header:'归属地',dataIndex:'localeId',hidden:true},
                {header:'单位名称',dataIndex:'companyName',hidden:true},
                {header:'建单人',dataIndex:'createdBy',hidden:true},
                {header:'建单时间',dataIndex:'creationDate',hidden:true},
                {header:'审核单位',dataIndex:'auditDepartmentId',hidden:true},
                {header:'审核人',dataIndex:'auditPersonId',hidden:true},
                
                {header:'执行单位',dataIndex:'executeDepartmentId',hidden:true},
                {header:'执行人',dataIndex:'executePersonId',hidden:true},
                {header:'预计归还时间',dataIndex:'expectedReturnTime',hidden:true},
                {header:'备注',dataIndex:'remarks',hidden:true},
                
                {header:'id',dataIndex:'cardSheetId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'listGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试卡工单列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initGridToolsBar(),//工具条，用来放操作按键
                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryList',
                sm : new Ext.grid.RowSelectionModel({
                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                    listeners : {
                        //行选中事件
                        rowselect : function(sm, row, rec) {
                            //oper.qryRule(rec.data.tacheId);
                        }
                    }
                })

            });

            return grid;

        }

        this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '添加',
                onClick : function() {
                    testCardOrderModify.detail("add");
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '删除',
                onClick : function() {
                    testCardOrderModify.del();
                }
            },"-");
            tb.add({
                text : '编辑',
                onClick : function() {
                    testCardOrderModify.detail("mod");
                }
            },"-");
//            tb.add({
//                text : '批量导入',
//                onClick : function() {
//                    oper.del();
//                }
//            },"-");
            tb.add({
                text : '导出',
                onClick : function() {
                    testCardOrderModify.exportData();
                }
            });
//            tb.add('->');//加这个符号可以使在此之后的按键靠右对齐
//            tb.add({
//                text : '上传附件',
//                onClick : function() {
//                    oper.del();
//                }
//            },"-");
//            tb.add({
//                text : '下载附件',
//                onClick : function() {
//                    oper.del();
//                }
//            });

            return tb;
        }
        
        this.exportData = function(){
            //这是页面参数，跟普通查询一样，如果有分页需求的，也一起写上
            //获取查询参数
            var param = Ext.getCmp('qryForm').getForm().getValues();
            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
            param.currentNode = Ext.getCmp('currentNodeQry').getValue();
            param.woStatusEnumId = Ext.getCmp('sheetStatusQry').getValue();
            
            //分页参数
            param.start = Ext.getCmp('listGrid').getStart();
            param.limit = Ext.getCmp('listGrid').getPageSize();//步数
            
            //alert(param.start + ':' + param.limit);

            /*这个为后台实现类，请写全路名，简单的列表可以参考ExportDemoServiceImpl,继承
            com.unicom.ucloud.eom.base.service.ExportSimpleElsService类.并实现其中的抽象方法。
                         复杂的逻辑请继承原有的
            com.unicom.ucloud.eom.base.service.BaseServiceImpl类，并实现
            com.unicom.ucloud.eom.base.service.IExportElsService接口
                        传递的参数除了自己的查询条件及分页参数之外，增加了以下两个：
            fileType(导出类型):excle,word,pdf
            exportType(数据量):ALL(全量)，PAGE(当前页)

             */
            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.TestCardOrderApplyServiceImpl';

            //param.userid = 'fy';

            new ZTESOFT.FileUtil().exportData(param);
        }
        
        this.detail = function (operStr){
            
            //alert(selNode.id);
            var param = new Object();
            var par = "";
            if(operStr == 'mod'){
                var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if(selinfo.length!=1){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                }
                //var rec = Ext.getCmp('listGrid').getSelectionModel().getSelected();
                var rec = selinfo[0];
                if(rec==null){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                param = rec;
                par = param.data.cardSheetId;
            }
            applyAndmodWin.showWin(operStr,par);
//            manager.initWindow(operStr,param);
            //alert(rec.data.tacheId);
        }
        
        this.del = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length==0){
                Ext.Msg.alert('操作提示','请先选择您要删除的行');
            }else{
//                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
                var ob = new Object();
                var li = new Array();
                for(var i=0;i<selinfo.length;i++){
                    var o = selinfo[i].data;
                    o.deleteBy = session.logonAccount.cloudUserId;
                    li.push(o);
                }
                ob.sheetList = Ext.util.JSON.encode(li);
                ZTESOFT.invokeAction(
                                PATH+'/e19/testCardOrderApplyAction.json?method=deleteTestCardOrder',
                                ob,
                                function(response){
                                    Ext.Msg.alert("操作提示","删除成功");
//                                            Ext.getCmp('detailWin').close();
                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                    
                                }
                        );
            }
        }
    }
    
    
    
    function ApplyAndModWin(){
        
        this.sheetTypeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['2','移交'],
                ['5','报废'],
                ['3','借用'],
                ['1','调拨'],
                ['4','归还'],
                ['6','清查']
            ]
        });
        //主窗口
        this.winTitle = '详情';
        
        this.initTestCardQry = function(){
            var testCardQry = new Ext.FormPanel({
                id : 'testCardQryForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
                labelWidth : 70,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩
                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
//                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
//                width : body_width,
                items : [{
                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉
                    items : [{
                        columnWidth : 1,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性
                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
                        items : [{
                            xtype : 'radiogroup', 
                            id:'testcardTypeEnumId',
                            fieldLabel : '请选择类型', 
                            items : [ { 
                                boxLabel : '测试卡', 
                                name : 'testcardTypeEnumId', 
                                inputValue : 1 , 
                                checked : true 
                            }, { 
                                boxLabel : '测试终端', 
                                name : 'testcardTypeEnumId', 
                                inputValue : 2
                            }, { 
                                boxLabel : '固定电话', 
                                name : 'testcardTypeEnumId', 
                                inputValue : 3 
                            }, { 
                                boxLabel : '充值卡', 
                                name : 'testcardTypeEnumId', 
                                inputValue : 4 
                            }],listeners : {
                                change : function(radiofield,oldvalue){          
                                    if(radiofield.getValue().inputValue == 1){ 
    
                                        Ext.getCmp('qryTestForm').setVisible(true);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == 2){
    
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(true);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                        
                                    }else if(radiofield.getValue().inputValue == 3){
    
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(true);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == 4){
    
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(true);
                                    }
                                    oper.doQry();
                                }
                            },
                            anchor : '95%'
                        }]
                    }
//                    , {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '卡号',
//                                name: 'cardNo',
//                                id: 'cardNo',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '手机号码',
//                                name: 'subscriberNumber',
//                                id: 'subscriberNumber',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '测试卡状态',
//                                name: 'testcardStatusEnumId',
//                                id: 'testcardStatusEnumId',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '归属国家',
//                                name: 'attributionCountryId',
//                                id: 'attributionCountryId',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '归属省',
//                                name: 'attributionProvinceId',
//                                id: 'attributionProvinceId',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '归属地市',
//                                name: 'attributionCityId',
//                                id: 'attributionCityId',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '运营商',
//                                name: 'operatorEnumId',
//                                id: 'operatorEnumId',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '是否付费',
//                                name: 'whetherPrepaid',
//                                id: 'whetherPrepaid',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '网络类型',
//                                name: 'cardNetworkTypeEnumId',
//                                id: 'cardNetworkTypeEnumId',
//                            anchor : '95%'
//                            
//                        }]
//                    }
                    ]
                }]
//                ,
//                buttons : [{
//                    text : '查询',
//                    listeners : {
//                        "click" : function() {
//                            //获取查询参数
//                            var param = Ext.getCmp('testCardQryForm').getForm().getValues();
//                            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
////                            param.currentNode = Ext.getCmp('testcardTypeEnumId').getValue();
////                            param.sheetStatus = Ext.getCmp('sheetStatusQry').getValue();
////                            alert(Ext.getCmp('dealMan').checked);
////                            param.dealMan = Ext.getCmp('dealMan').checked;
//                            param.testcardTypeEnumId = Ext.getCmp('testcardTypeEnumId').getValue().inputValue;
//                            //绑定发送请求参数
//                            Ext.getCmp('testCardQryResult').store.on('beforeload', function(store) {
//                
//                                if (Ext.getCmp('testCardQryResult').store.lastOptions != null) {
//                                    //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变
//                                    Ext.getCmp('testCardQryResult').store.baseParams = param;
//                //                    Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
//                                }
//                            });
//                            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
//                            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
//                            Ext.getCmp('testCardQryResult').store.load({
//                                params : 
//                                    {
//                                    start : 0,//开始索引
//                                    limit : Ext.getCmp('testCardQryResult').getPageSize()//步数
//                                }
//                            });
//
//                        }
//                    }
//                }]
            });
            var it = Ext.getCmp('testcardTypeEnumId').items;
            for(var i=0;i<it.length;i++){
                if(it[i].inputValue==testCardChecktestobjectType){
                    it[i].checked = true;
                    Ext.getCmp('testcardTypeEnumId').setValue(testCardChecktestobjectType);
                }
            }
            
            return testCardQry;
        }
        
        this.initTestCardQryResultToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '添加',
                onClick : function() {
                    var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
                    var st = Ext.getCmp('testCardQryResultSelected').getStore();
                    var fla = 0;
                    var num = 0;
                    var str = "";
                    if(a.length==0){
                        Ext.Msg.alert('操作提示','请选择要添加的测试卡！');
                        return;
                    }
                    for(var i=0;i<a.length;i++){
                        for(var j=0;j<st.data.items.length;j++){
                            if(a[i].data.testobjectType==st.data.items[j].data.testobjectType
                                    &&a[i].data.testobjectId==st.data.items[j].data.testobjectId){
                            	str = str +"["+a[i].data.numberTmp+"]";
                            	fla = 1;
                            }
                        }
                        if(fla==0){
                            Ext.getCmp('testCardQryResultSelected').getStore().add(new Ext.data.Record(a[i].data)); 
                            num = num + 1;
                        }
                        fla = 0;
                    }
                    if(str !==""){
                    	Ext.Msg.alert('操作提示','已成功添加'+num+'条记录,'+'编号为'+str+'的测试卡已经添加,不能重复添加');
                    }else{
                    	Ext.Msg.alert('操作提示','添加成功');
                    }
                }
            });//加这个符号，会在页面上添加一个竖线分隔符
            

            return tb;
        }
        
        this.initTestCardQryResult = function(){
            
            //创建列   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="applyAndmodWin.testCardOrderModifyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.12},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="applyAndmodWin.testCardOrderModifyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.12},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.07},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'testCardQryResult',
//                region : 'center',//在父容器里的位置
                height : 250,//默认宽度为自适应的，一般不用设置
                title : '查询结果',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initTestCardQryResultToolsBar(),//工具条，用来放操作按键
                url:PATH+'/e19/testCardInfoAction.json?method=qryList',
                sm : new Ext.grid.CheckboxSelectionModel()
//                new Ext.grid.RowSelectionModel({
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
        
        this.initTestCardQryResultSelectedToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '删除',
                onClick : function() {
                    var a = Ext.getCmp('testCardQryResultSelected').getSelectionModel().getSelections();
                    if(a.length!=0){
                        Ext.Msg.confirm('系统提示','确定要删除吗？',
                        function(btn){
                          if(btn=='yes'){
                              for(var i=0;i<a.length;i++){
                                    Ext.getCmp('testCardQryResultSelected').getStore().remove(a[i]);
                                }   
                                Ext.getCmp('testCardQryResultSelected').getView().refresh();
                                Ext.Msg.alert("提示","删除成功！");
                          }
                          
                        },this);
                    }
                }
            });//加这个符号，会在页面上添加一个竖线分隔符
            

            return tb;
        }
        
        this.initTestCardQryResultSelected = function(){
            
            //创建列   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="applyAndmodWin.testCardOrderModifyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.12},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="applyAndmodWin.testCardOrderModifyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.12},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.07},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'testobjectType',dataIndex:'testobjectType'},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'testCardQryResultSelected',
//                region : 'center',//在父容器里的位置
                height : 250,//默认宽度为自适应的，一般不用设置
                title : '已选数据',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : false,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initTestCardQryResultSelectedToolsBar(),//工具条，用来放操作按键
//                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryList',
                sm : new Ext.grid.CheckboxSelectionModel()
//                new Ext.grid.RowSelectionModel({
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
        
        this.initSelectTestCardPanel = function(){
//            var testCardQry = this.initTestCardQry();
//            
//            //测试卡查询form
//            var qryTestFrom = testCardQueryAndSelect.initTestQryPn();
//            //固定电话查询FORM
//            var qryTeleForm = testCardQueryAndSelect.initTeleQryPn();
//            //测试终端查询form
//            var qryTermiForm = testCardQueryAndSelect.initTermiQryPn();
//            //充值卡查询form
//           var qryRechForm =  testCardQueryAndSelect.initRechQryPn();
        	
//        	var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBar();
            var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBarTwo("modify",testCardOrderModityCardOperationTypeEnumId);
            
            var testCardQryResult = this.initTestCardQryResult();
            var testCardQryResultSelected = this.initTestCardQryResultSelected();
//            var auditHisList = this.initAuditHisList();
//            var auditHisDetail = this.initAuditHisDetail();
//            var approveOpinionEditPanel = this.initApproveOpinionEditPanel();
            var selectTestCardPanel = new Ext.Panel({
                id:'selectTestCardPanel',
                labelAlign: 'left',
                region: 'center',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                width:720,//Ext.getBody().getSize(),
//                height:800,
                bodyStyle:'padding:10px;overflow-x:hidden;overflow-y:auto;width:720px',
                labelWidth: 70,
                items: [testQryPnToolsBar,
//                testCardQry,qryTestFrom,qryTeleForm,qryTermiForm,qryRechForm,
                testCardQryResult,testCardQryResultSelected]
            });
            
            return selectTestCardPanel;
        }
        
        this.initSelectTestCardWin = function(){
            
            
            
            var selectTestCardPanel = this.initSelectTestCardPanel();
            var selectTestCardWin = new Ext.Window({
                id:'selectTestCardWin',
                title: this.winTitle,
                closable:true,
                width: 740,//body_width*0.6,
                height: 550,//body_height*0.8,
                layout: 'border',
                plain:true,
                items: [selectTestCardPanel],
                buttonAlign:'center',
                buttons: [
                {
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    id:'add',
                    onClick:function(){
                        var a = Ext.getCmp("testCardQryResultSelected").getStore().data.items;
                        var b = Ext.getCmp("testCardList").getStore().data.items;
                        var str = "";
                        var num = 0;
                        var fla = 0;
                        if(a.length==0){
                            Ext.Msg.alert('操作提示','请选择要添加的测试卡！');
                            return;
                        }
                        for(var i=0;i<a.length;i++){
                            for(var j=0;j<b.length;j++){
                              if(a[i].data.testobjectType==b[j].data.testobjectType
                                      &&a[i].data.testobjectId==b[j].data.testobjectId){
                            	  str = str+"["+a[i].data.numberTmp+"]";
                                  fla = 1;
                              }
                            }
                            if(fla==0){
                           Ext.getCmp("testCardList").getStore().add(new Ext.data.Record(a[i].data));
                           num = num +1;
                            }
                            fla =0;
                        }
                        if(str!==""){
                     	   Ext.Msg.alert('操作提示','已成功添加'+num+'条记录,'+'编号为'+str+'的测试卡已经添加,不能重复添加');
                     }else{
                     	Ext.Msg.alert('操作提示','添加成功');
                     }
//                      b.data.items = a.data.items;
//                      st.data.items[j].data.testCardId
//                        Ext.getCmp('testCardQryResultSelected').getStore().add(new Ext.data.Record(a[i].data)); 
//                        Ext.getCmp("testCardList").store = Ext.getCmp("testCardQryResultSelected").getStore();
                        Ext.getCmp('selectTestCardWin').close();
//                        if(Ext.getCmp("approveOpinionEdit").getValue()==""){
//                           Ext.Msg.alert("提示","请填写执行意见！");
//                           return;
//                        }
//                         manager.initNextDealMan("2");//0为查看详情  1为审核  2为执行 3为接收
                    }
                },
//               
                    {
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    id:'close',
                    onClick:function(){
                        Ext.getCmp('selectTestCardWin').close();
                    }
                }
                ]
            });
             selectTestCardWin.show();
             
        
        }
        
        this.initValueListGridToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '添加',
                onClick : function() {
                    applyAndmodWin.initSelectTestCardWin();
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '删除',
                onClick : function() {
                    var a = Ext.getCmp('testCardList').getSelectionModel().getSelections();
                    for(var i=0;i<a.length;i++){
                    Ext.getCmp('testCardList').getStore().remove(a[i]);
                    Ext.getCmp('testCardList').getView().refresh();
                }
                }
            });

            return tb;
        }
        
        this.testCardOrderModifyDoViewDetail = function(typeId,value,attributionProvinceId){
            isTestApplyOpenMod = 1;
            var items = [];
            var param = {};
            param.attributionProvinceId = attributionProvinceId; 
            param.testobjectType = typeId;
            ZTESOFT.invokeAction(
                    PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList',
                    param,
                    function(response){
                        var items = modOper.getPriItems(typeId);
                        
                        var pubItems = modOper.getPubItems(typeId);
                        items.push(pubItems);
                        if(response && response.rows && response.rows.length > 0){
                            modOper.autoSetItem(response.rows,items);
                        }
                        modOper.initWindow('detail',typeId,value,items);
                    }
            );
        }
        
        this.initTestCardList = function(){
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:testCardOrderModifyWidth*4/6*5*0.1}),
                {header:'类型',dataIndex:'testobjectName',width:testCardOrderModifyWidth*4/6*5*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="applyAndmodWin.testCardOrderModifyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderModifyWidth*4/6*5*0.16},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="applyAndmodWin.testCardOrderModifyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderModifyWidth*4/6*5*0.16},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:testCardOrderModifyWidth*4/6*5*0.16},
                {header:'是否借出',dataIndex:'lendFlagName',width:testCardOrderModifyWidth*4/6*5*0.14},
                {header:'管理员',dataIndex:'adminName',width:testCardOrderModifyWidth*4/6*5*0.16},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            //人员信息
            var testCardList = new ZTESOFT.Grid({
                id : 'testCardList',
//                height : body_height*0.3,//默认宽度为自适应的，一般不用设置
                width : testCardOrderModifyWidth*4/6*5,
//                fieldLabel:'<font color="red">*</font>测试卡列表',
                height:200,
//                title : '测试卡列表',
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

            return testCardList;

        }
        
        this.initOrderInfo = function(){
            var testCardList = this.initTestCardList();
            
            var orderInfo = new Ext.FormPanel({
                id:'orderInfo',
//                region: 'center',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'工单信息',
                width:testCardOrderModifyWidth*4+20+20+10,//Ext.getBody().getSize(),
//                height:400,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
//                labelWidth: 70,
                layoutConfig : {
                            columns : 2 * 3
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : testCardOrderModifyWidth*4/6,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>工单主题'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardOrderModifyWidth*4/6*5,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
                                            readOnly:false,
//                                            fieldLabel: '<font color="red">*</font>工单主题',
                                            name: 'sheetTheme',
                                            id: 'sheetTheme',
                                            blankText:'请填写工单主题!',
                                            maxLength:240,
                                            maxLengthText:'工单主题不能超过240个字！',
                                            allowBlank: false,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>内容'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardOrderModifyWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '<font color="red">*</font>内容',
                                            name: 'content',
                                            id: 'content',
                                            blankText:'请填写内容!',
                                            maxLength:500,
                                            height : 50,
                                            maxLengthText:'备注不能超过500个字！',
                                            allowBlank: false,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    id:'testCardListTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>测试卡列表'
                                    }
                                },{
                                    colspan : 5,
                                    id:'testCardListTR2',
                                    width:testCardOrderModifyWidth*4/6*5,
                                    height:200,
                                    items : [
                                        testCardList
                                    ]
                                },
                                {
                                    colspan : 1,
                                    id:'filesTR1',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '附件'
                                    }
                                },{
                                    colspan : 5,
                                    id:'filesTR2',
                                    width:testCardOrderModifyWidth*4/6*5,
                                    height : 100,
                                    items : [
//                                        {
//                                            xtype:'ZTESOFT.textfield',
//                                            hideLabel : true,
////                                            fieldLabel:'附件',
//                                            name:'filesName',
//                                            id: 'filesName',
//                                            editable : false ,
//                                            anchor:'100%'
//                                        }
                                        {
                                        xtype : 'ZTESOFT.attachmentPanel',
                                        id:'filesName',
                                        //align:"left",
                                        //cls:'zs-attachment',
                                        autoScroll:true,
                                        detailValues:testCardOrderModifyFileList,//已有的附件数据（从数据库读出），格式为一个object，里面包含数组

                                        operType:'',//操作类型，如果为DETAIL则只是查询详情，不提供上传功能
                                        fileTypes:"*.*",//附件类型，默认为所有，即“*.*”
//                                        fileLimit:1,//同时上传的最大数目
                                        hideLabel : true,
                                        anchor : '100%',
//                                        bodyStyle:'margin:10px',
                                        height : 100
                                        //html:'1.测试doc.doc<a href="#" class="zs-link-all">[下载]</a>'
                                    }
                                    ]
                                },
//                                {
//                                    colspan : 1,
//                                    id:'filesTR3',
//                                    items : {
////                                    xtype:'button',
//                                    xtype: 'ZTESOFT.Button',
//                                    name:'uploa',
//                                    id: 'uploa',
//                                    onClick : function() {
//                                        applyAndmodWin.upload('filesName');
//                                    },
//                                    text:'上传'
//                                }
//                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '备注'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardOrderModifyWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '备注',
                                            name: 'testCardOrderModifyRemarks',
                                            id: 'testCardOrderModifyRemarks',
                                            maxLength:500,
                                            height : 50,
                                            maxLengthText:'备注不能超过500个字！',
                                            anchor:'100%'
                                        }
                                    ]
                                }
                ]
//                items: [{
//                    layout:'column',
//                    items:[
//                        {
//                        columnWidth:1,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '<font color="red">*</font>工单主题',
//                                name: 'sheetTheme',
//                                id: 'sheetTheme',
//                                blankText:'请填写工单主题!',
//                                maxLength:240,
//                                maxLengthText:'工单主题不能超过240个字！',
//                                allowBlank: false,
//                                anchor:'95%'
//                            }]
//                        }
//                        ,
//                        {
//                         columnWidth:1,
//                         layout: 'form',
//                         items: [{
//                                xtype:'textarea',
//                                fieldLabel: '<font color="red">*</font>内容',
//                                name: 'content',
//                                id: 'content',
//                                blankText:'请填写内容!',
//                                maxLength:500,
//                                maxLengthText:'备注不能超过500个字！',
//                                allowBlank: false,
//                                anchor:'95%'
//                           }]
//                        },
////                        {
////                        columnWidth:1,
////                        layout:'column',
////                        id:'testCardListTR',
////                        items: [
////                        {columnWidth:0.1,
////                         layout: 'form',
////                         items: [{
////                                xtype:'textfield',
////                                fieldLabel: '测试卡列表',
////                                hidden:true,
////                                disabled:true,
////                                anchor:'100%'
////                           }]
////                            },{columnWidth:0.9,
////                         layout: 'form',
////                         items: [testCardList]
////                            }
////                            ]
////                        }
//                        {
//                        columnWidth:1,
//                        layout:'form',
//                        id:'testCardListTR',
//                        items: [testCardList]
//                        }
//                        
//                        ,
//                            
//                        {
//                        columnWidth:.8,
//                        layout: 'form',
//                        id:'filesTR1',
//                        items: [
//                        {
//                                xtype:'textfield',
//                                fieldLabel:'附件',
//                                name:'filesName',
//                                id: 'filesName',
//                                editable : false ,
//                                anchor:'95%'
//                            }
//                        ]
//                        },
//                        {
//                            columnWidth:.2,
//                            layout: 'form',
//                            id:'filesTR2',
//                            items: [{
////                                    xtype:'button',
//                                    xtype: 'ZTESOFT.Button',
//                                    name:'uploa',
//                                    id: 'uploa',
//                                    onClick : function() {
//                                        applyAndmodWin.upload('filesName');
//                                    },
//                                    text:'上传'
//                                }
//                            ]
//                            },
//                        {
//                        columnWidth:1,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textarea',
//                                fieldLabel: '备注',
//                                name: 'remarks',
//                                id: 'remarks',
//                                maxLength:500,
//                                maxLengthText:'备注不能超过500个字！',
//                                anchor:'95%'
//                            }
//                            ]
//                        }
//                   ]}
//            ]
                });
            return orderInfo;
        
        }
        
        this.upload = function(name){
        	var o = new Object();
            o.fileUploadLimit=1;
            new ZTESOFT.FileUtil().uploadFile(o,function(fileListTmp){
                if(fileListTmp.length!=0){
                //回调方法，返回列表[{fileId,fileName}]
                    var fileNames = fileListTmp[0].fileName;
                    for(var i=1;i<fileListTmp.length;i++){
                        fileNames = fileNames+","+fileListTmp[i].fileName;
                    }
                    
                    Ext.getCmp(name).setValue(fileNames);
                    fileList = fileListTmp;
                }
            });
            
        }
        
        this.initAuditHisList = function(){
            
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
//                cm,                         
                {header:'操作人',dataIndex:'operatorId',width:gridWidth*0.15},
                {header:'操作单位',dataIndex:'operateDepartmentId',width:gridWidth*0.15},
                {header:'目的单位',dataIndex:'targetDepartmentId',width:gridWidth*0.15},
                {header:'接单时限',dataIndex:'receiveSheetTimeLimit',width:gridWidth*0.15},
                {header:'回复时限',dataIndex:'replySheetTimeLimit',width:gridWidth*0.15},
                {header:'操作时间',dataIndex:'operateTime',width:gridWidth*0.15},
                {header:'操作类型',dataIndex:'operateType',width:gridWidth*0.15},
                {header:'operatorContactInfo',dataIndex:'operatorContactInfo',hidden:true,width:gridWidth*0.15},
                {header:'targetPerson',dataIndex:'targetPerson',hidden:true,width:gridWidth*0.15},
                {header:'targetType',dataIndex:'targetType',hidden:true,width:gridWidth*0.15},
                {header:'approveOpinion',dataIndex:'approveOpinion',hidden:true,width:gridWidth*0.15}
            ]);
            //人员信息
            var auditHisList = new ZTESOFT.Grid({
                id : 'auditHisList',
//                height : body_height*0.3,//默认宽度为自适应的，一般不用设置
                width : 800,
                height:200,
                title : '审批历史',
                cm : column,//列定义
                paging : false,//是否分页
//                collapsible : true,//是否可以收缩
//                tbar : this.initValueListGridToolsBar(),//,//工具条，用来放操作按键
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
            
            auditHisList.on('rowclick', this.onauditHisListRowClick);

            return auditHisList;

        
        }
        
        this.onauditHisListRowClick = function(){
            var a = Ext.getCmp('auditHisList').getSelectionModel().getSelections();
            
            Ext.getCmp('auditHisDetail').getForm().loadRecord(a[0]);
        }
        
        this.initAuditHisDetail = function(){
            var auditHisDetail = new Ext.FormPanel({
                id:'auditHisDetail'
                ,
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'详情',
                width:800,//Ext.getBody().getSize(),
//                height:400,
                bodyStyle:'padding:20px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
                labelWidth: 70
                ,
                items: [
                    {
                    layout:'column',
                    items:[
                        {
                         columnWidth:.5,
                         layout: 'form',
                         items: [{
                                xtype:'textfield',
                                fieldLabel: '操作人',
                                name: 'operatorId',
                                id: 'operatorId',
                                disabled:true,
                                anchor:'95%'
                           }]
                        }
                        ,
                            
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'操作单位',
                                name:'operateDepartmentId',
                                id: 'operateDepartmentId',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'操作人联系方式',
                                name:'operatorContactInfo',
                                id: 'operatorContactInfo',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'操作时间',
                                name:'operateTime',
                                id: 'operateTime',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'目标人',
                                name:'targetPerson',
                                id: 'targetPerson',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'目标类型',
                                name:'targetType',
                                id: 'targetType',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'受理时间',
                                name:'receiveSheetTimeLimit',
                                id: 'receiveSheetTimeLimit',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'处理时间',
                                name:'replySheetTimeLimit',
                                id: 'replySheetTimeLimit',
                                disabled:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:1,
                        layout: 'form',
                        items: [{
                                xtype:'textarea',
                                fieldLabel: '审批意见',
                                name: 'approveOpinion',
                                id: 'approveOpinion',
                                disabled:true,
                                anchor:'95%'
                            }
                            ]
                        }
                   ]}
            ]
            });
            
            return auditHisDetail;
            
            
        }
        
        this.initApproveOpinionEditPanel = function(){
            var approveOpinionEditPanel = new Ext.FormPanel({
                id:'approveOpinionEditPanel'
                ,
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'填写审核意见',
                width:800,//Ext.getBody().getSize(),
//                height:400,
                bodyStyle:'padding:20px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
                labelWidth: 70
                ,
                items: [
                    {
                    layout:'column',
                    items:[
                        {
                        columnWidth:1,
                        layout: 'form',
                        id:'auditResultt',
                        items: [{
                                xtype:'radiogroup',
                                fieldLabel : "审核结果",  
                                id:'auditResult',
                                items : [{  
                                            boxLabel : '通过',  
                                            inputValue : "1",  
                                            name : "rg",  
                                            checked : true  
                                        }, {  
                                            boxLabel : '不通过',  
                                            name : "rg",  
                                            inputValue : "2"  
                                        }],
                                anchor:'95%'
                            }
                            ]
                        },{
                        columnWidth:1,
                        layout: 'form',
                        items: [{
                            xtype:'textarea',
                                fieldLabel: '<font color="red">*</font>审核意见',
                                name: 'approveOpinionEdit',
                                id: 'approveOpinionEdit',
                                allowBlank:false,
                                blankText:'请填写审核意见!',
                                anchor:'95%'
                        }]
                        }
                   ]}
            ]
            });
            
            return approveOpinionEditPanel;
        }
        
        this.initOrderInfoForm = function(){
            
            var formPanel = this.initFormPanel();
            var orderInfo = this.initOrderInfo();
            var checkGrid = this.getGrid(testOrderCheckFlag);
//            var auditHisList = this.initAuditHisList();
//            var auditHisDetail = this.initAuditHisDetail();
//            var approveOpinionEditPanel = this.initApproveOpinionEditPanel();
            var orderInfoForm = new Ext.Panel({
                id:'orderInfoForm',
                labelAlign: 'left',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                title:'工单信息',
                width:720,//Ext.getBody().getSize(),
//                height:800,
                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;width:800px',
//                labelWidth: 70,
                items: [formPanel,orderInfo,checkGrid]//,//auditHisList,
//                auditHisDetail,
//                approveOpinionEditPanel]
            });
            
            return orderInfoForm;
        }
        
        //弹窗列出测试卡列表
    this.showNumDetail = function(testobjectType,adminId,fla){
        applyAndmodWin.initNumDetailWindow(testobjectType,adminId,fla);
    }
    
    //初始化grid列
          this.getGridColumn = function(typeId){
              var column = null;
              if(typeId == testCardEnum){
                  column = new Ext.grid.ColumnModel([ 
                      new Ext.grid.CheckboxSelectionModel(), 
                      new Ext.grid.RowNumberer({header:'序号',width:40}),
                      {header:'ID',dataIndex:'testCardId',hidden:true},
                      {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true}, 
                      {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},  
                      {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.08}, 
                      {header:'测试卡类别',dataIndex:'testcardTypeEnumName',width:gridWidth*0.08},
                      {header:'测试卡编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                          return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                      },width:gridWidth*0.09},
                      {header:'用户号码',dataIndex:'subscriberNumber',width:gridWidth*0.09},
                      {header:'测试卡卡号',dataIndex:'cardNo',width:gridWidth*0.09},
                      {header:'IMSI',dataIndex:'imsi',width:gridWidth*0.09},
                 //     {header:'编号',dataIndex:'number',width:gridWidth*0.1},
                      {header:'测试卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.08},
                      {header:'余额',dataIndex:'balance',width:gridWidth*0.08,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                          return value ? parseFloat(value) : '';
                        }
                      },
                      {header:'管理员',dataIndex:'adminName',width:gridWidth*0.08},
                      {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.07},
                      {header:'借出单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                      {header:'借出人',dataIndex:'lenderName',width:gridWidth*0.07}
                  ]);
              }else if(typeId == teleCardEnum){
                  column = new Ext.grid.ColumnModel([
                                                     new Ext.grid.CheckboxSelectionModel(),  
                                                     new Ext.grid.RowNumberer({header:'序号',width:40}),
                                                     {header:'ID',dataIndex:'fixedTelId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.11},
                                                     {header:'测试卡编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                                         return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                                                     },width:gridWidth*0.12},
                                                     {header:'电话号码',dataIndex:'phoneNumber',width:gridWidth*0.11},
                                                     {header:'功能',dataIndex:'teleFunction',width:gridWidth*0.11},
                                                     {header:'类型',dataIndex:'fixedPhoneTypeEnumName',width:gridWidth*0.11},
                                                     {header:'管理员',dataIndex:'adminName',width:gridWidth*0.11},
                                                     {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.11},
                                                     {header:'借出单位',dataIndex:'lendDepartmentName',width:gridWidth*0.11},
                                                     {header:'借出人',dataIndex:'lenderName',width:gridWidth*0.11}
                                                 ]);
              }else if(typeId == terminalEnum){
                  column = new Ext.grid.ColumnModel([  
                                                     new Ext.grid.CheckboxSelectionModel(),
                                                     new Ext.grid.RowNumberer({header:'序号',width:40}),
                                                     {header:'ID',dataIndex:'testTerminalId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                                                     {header:'测试终端编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                                         return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail(terminalEnum,'+record.data.testTerminalId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                                                     },width:gridWidth*0.1},
                                                     {header:'手机串号',dataIndex:'imei',width:gridWidth*0.1},
                                                     {header:'手机类型',dataIndex:'moblieTypeEnumName',width:gridWidth*0.1},
                                                     {header:'手机型号',dataIndex:'phoneModel',width:gridWidth*0.1},
                                                     {header:'厂家',dataIndex:'manufacturerName',width:gridWidth*0.1},
                                                     {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                                                     {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.1},
                                                     {header:'借出单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                                                     {header:'借出人',dataIndex:'lenderName',width:gridWidth*0.1}
                                                 ]);
              }else if(typeId == rechCardEnum){
                  column = new Ext.grid.ColumnModel([  
                                                     new Ext.grid.CheckboxSelectionModel(),
                                                     new Ext.grid.RowNumberer({header:'序号',width:40}),
                                                     {header:'ID',dataIndex:'rechCardId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.11},
                                                     {header:'充值卡编号',dataIndex:'cardNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                                          return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                                                     },width:gridWidth*0.12},
                                                     {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.11},
                                                     {header:'面值',dataIndex:'parValueName',width:gridWidth*0.11},
                                                     {header:'卡类型',dataIndex:'rechCardTypeEnumName',width:gridWidth*0.11},
                                                     {header:'管理员',dataIndex:'adminName',width:gridWidth*0.11},
                                                     {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.11},
                                                     {header:'借出单位',dataIndex:'lendDepartmentName',width:gridWidth*0.11},
                                                     {header:'借出人',dataIndex:'lenderName',width:gridWidth*0.11}
                                                 ]);
              }
              return column;
          }
    
    this.initNumDetailFormPanel = function(typeId){
                var column = this.getGridColumn(typeId);
                var title = '';
                var id = '';
                if(typeId == testCardEnum){
                    id='testGrid';
                    title = '测试卡信息列表';
                }else if(typeId == teleCardEnum){
                    id='teleGrid';
                    title = '固定电话信息列表';
                }else if(typeId == terminalEnum){
                    id='termiGrid';
                    title = '测试终端信息列表';
                }else if(typeId == rechCardEnum){
                    id='rechGrid';
                    title = '充值卡信息列表';
                }
                //测试卡信息
                var grid = new ZTESOFT.Grid({
                    id : id,
                    region : 'center',//在父容器里的位置
                    height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                    title : title,
                    cm : column,//列定义
                    pageSize : 10,//页纪录数
                    paging : true,//是否分页
//                    collapsible : true,//是否可以收缩
                    url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage'                     
                });

                return grid;
            }
            
    this.initNumDetailGridData = function(typeId,adminId,fla){
        var param = applyAndmodWin.getNumDetailExportParam(typeId,adminId,fla);
//                if(index == 1){//全部卡  
//                }else if(index == 2){//正常卡
//                    param.testcardStatusEnumId = '1';
//                }else if(index == 3){//报废卡
//                    param.testcardStatusEnumId = '3';
//                }else if(index == 4){//借出卡
//                    param.lendFlag = '1';           
//                }else if(index == 5){//剩余卡
//                    param.lendFlag = '0';         
//                }
                var gridName = '';
                if(typeId == testCardEnum){
                    gridName = 'testGrid';
                }else if(typeId == teleCardEnum){
                    gridName = 'teleGrid';
                }else if(typeId == terminalEnum){
                    gridName = 'termiGrid';
                }else if(typeId == rechCardEnum){
                    gridName = 'rechGrid';
                }
                
                manager.qryListGrid(gridName,param);
    }
    
    this.initNumDetailWindow = function(typeId,adminId,fla){
        var formPanel = this.initNumDetailFormPanel(typeId);

        if(typeId == testCardEnum){
            this.winTitle = '测试卡信息列表';
        }else if(typeId == teleCardEnum){
            this.winTitle = '固定电话信息列表';
        }else if(typeId == terminalEnum){
            this.winTitle = '测试终端信息列表';
        }else if(typeId == rechCardEnum){
            this.winTitle = '充值卡信息列表';
        }
        
        this.initNumDetailGridData(typeId,adminId,fla);
    
        var formWin = new Ext.Window({
            id:'numDetailWindow',
            title: this.winTitle,
            closable:true,
            width: body_width*0.8,
            height: body_height*0.9,
            layout: 'border',
            plain:true,
            items: [formPanel],
            buttonAlign:'center',
            buttons: [{
            text : '导出',
            xtype: 'ZTESOFT.Button',
            onClick : function() {
                var pa = applyAndmodWin.getNumDetailExportParam(typeId,adminId,fla);
                pa.cardType = typeId;
                pa.testobjectTypeEnumId = typeId;
                
                pa.serviceClass = 'com.unicom.ucloud.eom.e19.service.ExpTestCardStatServiceImpl';
            if(typeId == testCardEnum){
                var selinfo = Ext.getCmp('testGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.testCardId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.testCardId;
                    }
                    pa.selectIds = selectIds;
                }else{
                    pa.selectIds = null;
                }
            }else if(typeId == teleCardEnum){   
                var selinfo = Ext.getCmp('teleGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.fixedTelId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.fixedTelId;
                    }
                    pa.selectIds = selectIds;
                }else{
                    pa.selectIds = null;
                }
            }else if(typeId == terminalEnum){
                var selinfo = Ext.getCmp('termiGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.testTerminalId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.testTerminalId;
                    }
                    pa.selectIds = selectIds;
                }else{
                    pa.selectIds = null;
                }
            }else if(typeId == rechCardEnum){
                var selinfo = Ext.getCmp('rechGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.rechCardId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.rechCardId;
                    }
                    pa.selectIds = selectIds;
                }else{
                    pa.selectIds = null;
                }
            }
            
            
            new ZTESOFT.FileUtil().exportData(pa);
            }
              },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('numDetailWindow').close();
                }
            }]
        });
         formWin.show();
         
    }
    
    this.getNumDetailExportParam = function(typeId,adminId,fla){
        var param = new Object();
//                qryParams.selectIds = "";
//                this.cloneAll(qryParams,param);
                param.testobjectTypeEnumId = typeId;
                param.adminId = adminId;
                
                if(fla=="inventoryAvailableNum"){//库存可用，根据EomCardCheckDaoImpl可知是非借出的正常卡
                    param.testcardStatusEnumId = '1';//正常
                    param.lendFlag = '0';//非借出
                }else if(fla=="inventoryUnavailableNum"){//库存不可用，根据EomCardCheckDaoImpl可知是故障、送修、报废的卡总和
                    param.testcardStatusEnumId = "2','3','4','5','6";//非正常
                }else if(fla=="inventoryLendNum"){//库存借出，根据EomCardCheckDaoImpl可知是借出并且状态正常的卡
                    param.testcardStatusEnumId = '1';//正常
                    param.lendFlag = '1';//借出
                }
                
                return param;
    }
        
        this.getGrid = function(type) {
        var gridWidth = body_width*0.9;
        
        var cm = new Ext.grid.CheckboxSelectionModel();
        //这里开始定义列，跟普通的grid最大的不同之处在于要指定其editor属性
        var column = new Ext.grid.ColumnModel([
             //cm,
             new Ext.grid.RowNumberer({header:'序号',width:40}),
             {
                 header : '管理员',
                 dataIndex : 'adminName',
                 width : gridWidth * 0.09
             },
             	{
                 header : '管理员',
                 dataIndex : 'adminId',
                 width : gridWidth * 0.09,
                 hidden:true
             },
             {
                 header : '归属部门',
                 dataIndex : 'attributionDepartmentName',
                 width : gridWidth * 0.09
             },
             	{
                 header : '归属部门',
                 dataIndex : 'attributionDepartmentId',
                 width : gridWidth * 0.09,
                 hidden:true
             }, 
             	{header:'测试卡类型',dataIndex:'testobjectTypeName',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                switch(record.data.testobjectType){
                   case "1":return "测试卡";
                   case "2":return "测试终端";
                   case "3":return "固定电话";
                   case "4":return "充值卡";
                   default:return "";
                }
            },width:gridWidth*0.1},
            	{header:'testobjectType',dataIndex:'testobjectType',hidden:true},{
                 header : '清查时间',
                 dataIndex : 'checkTime',
                 width : gridWidth * 0.09
             }, {
                 header : '库存可用数量',
                 dataIndex : 'inventoryAvailableNum',
                 renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:applyAndmodWin.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryAvailableNum")>' + value + '</a>';
                    },
                 width : gridWidth * 0.08
             }, 
            {header:'实际可用数量',dataIndex:'actualAvailableNum',width:gridWidth*0.08,
                editor: new Ext.form.NumberField({
                    allowNegative: false,
                    allowBlank: false,
                    disabled:(type=='detail'?true:false),
                    maxValue: 100000
                })
            }, {
                header : '库存不可用数量',
                dataIndex : 'inventoryUnavailableNum',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:applyAndmodWin.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryUnavailableNum")>' + value + '</a>';
                    },
                width : gridWidth * 0.08
            }, 
           {header:'实际不可用数量',dataIndex:'actualUnavailableNum',width:gridWidth*0.08,
               editor: new Ext.form.NumberField({
                   allowNegative: false,
                   allowBlank: false,
                   disabled:(type=='detail'?true:false),
                   maxValue: 100000
               })
           }, {
               header : '库存借出数量',
               dataIndex : 'inventoryLendNum',
               renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:applyAndmodWin.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryLendNum")>' + value + '</a>';
                    },
               width : gridWidth * 0.08
           }, 
          {header:'实际借出数量',dataIndex:'actualLendNum',width:gridWidth*0.08,
              editor: new Ext.form.NumberField({
                  allowNegative: false,
                  allowBlank: false,
                  disabled:(type=='detail'?true:false),
                  maxValue: 100000
              })
          },{
              header:'清查状态ID',dataIndex:'checkStatus',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                return record.data.checkStatus=="0"?"":"查看明细";
//                
//                "<a id='a_"+val.record.data.adminId+"' href='javascript: eo.differentDetail("
//                +Math.abs(val.record.data.inventoryAvailableNum-val.record.data.actualAvailableNum)
//                                +","+Math.abs(val.record.data.inventoryUnavailableNum-val.record.data.actualUnavailableNum)
//                                +","+Math.abs(val.record.data.inventoryLendNum-val.record.data.actualLendNum)+",\""
//                                +val.record.data.adminId+"\")'>填写明细</a>"
                
                                
                                
                if(record.data.inventoryAvailableNum!=(record.data.actualAvailableNum||0)
                            ||record.data.inventoryUnavailableNum!=(record.data.actualUnavailableNum||0)
                            ||record.data.inventoryLendNum!=(record.data.actualLendNum||0)){
//                        record.set("checkStatusName","需整改");
//                        record.set("checkStatus","2");
//                        
////                        record.set("detail","<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+Math.abs(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
////                                +","+Math.abs(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
////                                +","+Math.abs(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\")'>填写明细</a>");
//                        record.set("needFill","1");//需填写并未填写
                        return "2";
                    }else{
//                        record.set("needFill","0");//不需填写
//                        record.set("checkStatus","1");
//                        record.set("checkStatusName","正常");
//                        record.set("detail","");
                        return "1";
                    }
                                
            },hidden:true
          },{
              header : '清查状态',
              dataIndex : 'checkStatusName',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                if(record.data.inventoryAvailableNum!=(record.data.actualAvailableNum||0)
                            ||record.data.inventoryUnavailableNum!=(record.data.actualUnavailableNum||0)
                            ||record.data.inventoryLendNum!=(record.data.actualLendNum||0)){
                        return "需整改";
                    }else{
                        return "正常";
                    }
                                
            },
              width : gridWidth * 0.09
          }, {
              header:'备注',dataIndex:'remarks',width:gridWidth*0.07,
                editor: new Ext.form.TextField({
                    disabled:(type=='detail'?true:false),
                    allowBlank: true
                })
            }, {
              header:'差异明细',dataIndex:'detail',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                if(record.data.inventoryAvailableNum!=(record.data.actualAvailableNum||0)
                            ||record.data.inventoryUnavailableNum!=(record.data.actualUnavailableNum||0)
                            ||record.data.inventoryLendNum!=(record.data.actualLendNum||0)){
                                if(testCardOrderModifyAftereditFlagAndSetView==2){//修改数量的时候，改成填写明细，而不是查看，因为修改页面默认是查看
                                    testCardOrderModifyAftereditFlagAndSetView = 0;
                                return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\","+record.data.checkListId+",\""+type+"\",\""+record.data.adminName+"\")'>填写明细</a>";
                                   
                                }
                                if(type=='add'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\",\"\",\""+type+"\",\""+record.data.adminName+"\")'>填写明细</a>";
                                }
                                if(type=='modify'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\","+record.data.checkListId+",\""+type+"\",\""+record.data.adminName+"\")'>查看明细</a>";
                                }
                                if(type=='detail'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\","+record.data.checkListId+",\""+type+"\",\""+record.data.adminName+"\")'>查看明细</a>";
                                }
                    }else{
                        return "";
                    }
                                
            },width:gridWidth*0.1
            }, {
              header:'需填写标识',dataIndex:'needFill',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                if(record.data.inventoryAvailableNum!=(record.data.actualAvailableNum||0)
                            ||record.data.inventoryUnavailableNum!=(record.data.actualUnavailableNum||0)
                            ||record.data.inventoryLendNum!=(record.data.actualLendNum||0)){
                        return "1";
                    }else{
                        return "0";
                    }
                                
            },hidden:true //0不需填写，1需填写并未填写，2需填写并已填写
            }, {
              header:'id',dataIndex:'checkListId',hidden:true 
            }, {
              header:'checkListNumber',dataIndex:'checkListId',hidden:true 
            }
          
          ]);  
    
        //获得列索引以使初始化grid的store
        var fields = new Array();  
        for(var i=0;i<column.getColumnCount();i++){
            fields.push({name:column.getDataIndex(i)});
        }

        //初始化grid store
        var store = ZTESOFT.createGridStore({
            id:'checkEditStor',
            fields: fields,
            url:PATH+'/e19/eomCardCheckAction.json?method=qryEomCheckCardInfoList'
        }); 
        
        // create the editor grid
        var grid = new Ext.grid.EditorGridPanel({
            id:'checkEditgrid',
            store: store,
            cm: column,
            sm :cm,
            height: 300,//body_height * 0.55,
            width:720,
            frame: true,
            clicksToEdit: 1,
            title:'清查记录列表',
            bodyStyle:'padding:0px;',
            listeners : {
                afteredit : function(val) {
                    if(val.field=="remarks"){//填写备注则绕过
                        if(val.record.data.needFill==1){
                           testCardOrderModifyAftereditFlagAndSetView = 2;//设为2，让render显示填写明细，下面一句只是触发render，无用
                           val.record.set("detail","<a id='a_"+val.record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(val.record.data.inventoryAvailableNum-val.record.data.actualAvailableNum)
                                    +","+(val.record.data.inventoryUnavailableNum-val.record.data.actualUnavailableNum)
                                    +","+(val.record.data.inventoryLendNum-val.record.data.actualLendNum)+",\""+val.record.data.adminId+"\",\"\",\""+type+"\",\""+val.record.data.adminName+"\")'>明细</a>");//随便设一下，重点在render
                        }
                    }else{
                        if(val.record.data.inventoryAvailableNum!=(val.record.data.actualAvailableNum||0)
                                ||val.record.data.inventoryUnavailableNum!=(val.record.data.actualUnavailableNum||0)
                                ||val.record.data.inventoryLendNum!=(val.record.data.actualLendNum||0)){
                            val.record.set("checkStatusName","需整改");
                            val.record.set("checkStatus","2");
                            val.record.set("needFill","1");//需填写并未填写
                            testCardOrderModifyAftereditFlagAndSetView = 2;
                            val.record.set("detail","<a id='a_"+val.record.data.adminId+"' href='javascript: eo.differentDetail("+(val.record.data.inventoryAvailableNum-val.record.data.actualAvailableNum)
                                    +","+(val.record.data.inventoryUnavailableNum-val.record.data.actualUnavailableNum)
                                    +","+(val.record.data.inventoryLendNum-val.record.data.actualLendNum)+",\""+val.record.data.adminId+"\",\"\",\""+type+"\",\""+val.record.data.adminName+"\")'>填写明细</a>");
                            
                        }else{
                            val.record.set("needFill","0");//不需填写
                            val.record.set("checkStatus","1");
                            val.record.set("checkStatusName","正常");
                            val.record.set("detail","");
                            hadModifyDefferenceList = 1;
                        }
                    }
                }
            }
        });
        
        
        return grid;
    }
    
    this.funDoc= function(rec){
            return '<a href="javascript:new DetailWin().download()">'+rec+'</a>'; 
        }
    
    this.initAttachmentGrid = function() {
            /**
             * 定义附件
             */
            var checkshow = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([  checkshow,new Ext.grid.RowNumberer({header:'序号',width:40}), {
                header : '附件ID',
                dataIndex : 'attRelGenId',
                hidden : true
            }, {
                header : '附件',
                dataIndex : 'attachmentName',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return new DetailWin().funDoc(value);
                },width:gridWidth*0.15
            },
            {
                header : '附件类型',
                dataIndex : 'attachmentTypeEnumId',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return "测试卡申请单附件";
                },width:gridWidth*0.1
            },
            {
                header : '附件格式',
                dataIndex : 'attachmentFormatEnumId',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    switch(value){
                       case 1:return"WORD";break;
                       case 2:return"EXCEL";break;
                       case 3:return"PDF";break;
                       case 4:return"图片";break;
                       case 5:return"压缩文件";break;
                       case 6:return"其他";break;
                       default:return "";
                    }
                },width:gridWidth*0.07

            },
//            {
//                header : '附件格式',
//                dataIndex : 'attachmentFormatEnumId'
//            },
            {
                header : '上传部门',
                dataIndex : 'uploadedByOrgName',
                width:gridWidth*0.12
            },{
                header : '上传人',
                dataIndex : 'uploadedByPersonName',
                width:gridWidth*0.07
            }, {
                header : '上传时间',
                dataIndex : 'creationDate',
                hidden : true
            }, {
                header : '附件用途',
                dataIndex : 'attachmentPurpose',
                hidden : true
            }]);
            var grid = new ZTESOFT.Grid({
                id : 'attachmentInfo',
                title : '附件详情',
                region : 'center',
                header : false,
                cm : column,
                pageSize : 10,
                //tbar : this.initPersonToolsBar(),
                paging : true,
//                url : PATH + '/e24/announce/announceReleaseAction.json?method=qryAttachment',
                url:PATH+'/e19/testCardCommonAction.json?method=qryAttachment',
                sm : checkshow
            });
            return grid;
        }
        
        this.initWorkflowPanel = function(){
        //获取流程实例ID
//        var param = new Object();
//        var selInfo = Ext.getCmp(tabActive.id).getSelectionModel().getSelected();
//        param.objectTable = 'T_EOM_WORK_ORDER';
//        //param.objectId = selInfo.data.announceId;
//        param.objectId = selInfo.data.workOrderId;
//        var _ret = ZTESOFT.Synchronize(PATH
//                + '/e24/announce/announceReleaseAction.json?method=getProcessInst',
//                param);
        var designHtml = null;
       if(processInstID==null){
         designHtml = '<div id=div_aa width="720" height="600">'+
//         '<iframe id="f_" width="100%" height="600" '+
//         'src="'+PATH +'/processGraph.jsp"/>' +
         		'</div>';
       }
       else{
        designHtml = '<div id=div_aa width="720" height="600">'+
         '<iframe id="f_" width="100%" height="600" '+
         'src="'+PATH +'/processGraph.jsp?processInstID='+processInstID+'"/></div>';}
        var panel = new Ext.Panel({
            id:'workflowPanel',
            //layout:'border',
            height:600,
            width:720,
            title:'工作流程',
            xtype:'panel',
            html:designHtml
        });
        return panel;
    }
    
    this.initAttachmentPanel = function(){
            var grid = this.initAttachmentGrid();
            var panel = new Ext.form.FormPanel({
                id:'attachmentPanel',
                layout:'border',
                title:'附件详情',
                xtype:'formpanel',
                items:[
                            grid
                       ]
            });
            this.getOperateHisListData(cardSheetIdGlo);//加载审批历史和附件数据
            return panel;
        }
        
        this.getOperateHisListData = function(cardSheetIdGlo){
            var param = new Object();
            param.processingObjectId = cardSheetIdGlo;
            Ext.getCmp('approvalGrid').store.on('beforeload', function(store) {
                if (Ext.getCmp('approvalGrid').store.lastOptions != null) {
                    Ext.getCmp('approvalGrid').store.baseParams = param;
                }
            });
            //Ext.getCmp('approvalGrid').store.removeAll();//先移除旧数据
            Ext.getCmp('approvalGrid').store.load({
                params : {
                    start : 0,// 开始索引
                    limit : Ext.getCmp('approvalGrid').getPageSize(),
                    deletedFlag : 0
                }
            });
            /*Ext.getCmp('approvalGrid').store.on('load', function() {
                Ext.getCmp('approvalGrid').getSelectionModel().selectFirstRow();// 选中第一行
            });*/
            Ext.getCmp('approvalGrid').getSelectionModel().addListener("rowselect",function(){
                var selectItem = Ext.getCmp('approvalGrid').getSelectionModel().getSelected();
                selectItem.data.operatorDtl = selectItem.data.operator;
                selectItem.data.operateDepDtl = selectItem.data.operatorDep;
                selectItem.data.operateTimeDtl = selectItem.data.operateTime;
                if(selectItem.data.operateType==11){
                    selectItem.data.operateResultDtl = selectItem.data.operateResult==1?"通过":"不通过";
                }else{
                    selectItem.data.operateResultDtl = selectItem.data.operateResult;
                }
//                selectItem.data.operateTypeDtl = selectItem.data.operateType;
                selectItem.data.operateTypeDtl = modifyProcessingTypeMap.get(selectItem.data.operateType);//selectItem.data.operateTypeName;
                selectItem.data.operateContentDtl = selectItem.data.operateContent;
                selectItem.data.remarksDtl = selectItem.data.remarks;
                Ext.getCmp('approvalFormDtl').getForm().loadRecord(selectItem);
            });
//            alert(1);
//            Ext.getCmp('attachmentInfo').store.load({
//                             params:{
//                                 start:0,
//                                 limit:Ext.getCmp('attachmentInfo').getPageSize(),
//                                 objectTable:'T_EOM_CARD_SHEET',
//                                 objectId:cardSheetIdGlo
//                                 }
//                         });
             
            
            var ob = new Object();
            ob.start = 0;
            ob.limit = Ext.getCmp('attachmentInfo').getPageSize();
            ob.objectTable = 'T_EOM_CARD_SHEET';
            ob.objectId = cardSheetIdGlo;
            var filesName = "";
            ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardCommonAction.json?method=qryAttachment',
                                    ob,
                                    function(response){
                                    	var ro = response.rows;
                                        for(var i=0;i<ro.length;i++){
                                           Ext.getCmp('attachmentInfo').getStore().add(new Ext.data.Record(ro[i]));//填充附件列表
//                                           filesName = filesName + "["+ro[i].attachmentName+"]";
                                        }
//                                        Ext.getCmp('filesName').setValue(filesName);
                                    }
                            );
            
        }
        
        this.initTabPanel = function(){
            
            
            
            var orderInfoForm = this.initOrderInfoForm();
            var tab2 = this.getApprovalTabPn();
            var p3 = this.initAttachmentPanel();
            var p4 = this.initWorkflowPanel();
            
            var obLis = new Array();
            obLis.push(orderInfoForm);
            obLis.push(tab2);
            obLis.push(p3);
            
            if(testCardOrderModifyWoStatusEnumId!=""&&testCardOrderModifyWoStatusEnumId!=1){//草稿时不显示流程图
                obLis.push(p4);
            }
            
            var tabs = new Ext.TabPanel({
                activeTab: 0,
                region: 'center',
                items: [obLis]//orderInfoForm
//                ,tab2,p3,p4]
            });
            tabs.on('tabchange',function(){
        
                
                if(tabs.getActiveTab().id=='modifyApprovalTabPn'){
                    var aa = new Array();
                    var st = Ext.getCmp('approvalGrid').getStore();
                     //   var record = st.getAt(st.getCount()-1);
                    var record = st.getAt(0);
                            aa.push(record);
                    Ext.getCmp('approvalGrid').getSelectionModel().selectRecords(aa);
           //         manager.getOperateHisListData(cardSheetIdGlo);
                }
            });
            return tabs;
        }
        
        this.initApprovalHisGrid = function() {
        //创建列   
        var approvalGridWidth = body_width*0.6;
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel(
                [
				//cm,         
				new Ext.grid.RowNumberer({header:'序号',align:'center',width:720*0.1}),                
				//{header:'环节ID',dataIndex:'stepId',align:'center',width:approvalGridWidth*0.15,hidden:true},
				{header:'操作时间',dataIndex:'operateTime',align:'center',width:720*0.3},
				{header:'操作人',dataIndex:'operator',align:'center',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
				  return manager.format(record.data);
				},width:720*0.2
				},
				{header : '处理人类型',dataIndex:'processingObjType',hidden:true},
				{header : '处理人ID',dataIndex :'createdBy',hidden:true,hideable:false},
				{header:'操作部门',dataIndex:'operatorDep',align:'center',width:720*0.2},
				//{header:'操作类型',dataIndex:'operateTypeName',align:'center',width:720*0.2},
				{header:'操作类型',dataIndex:'operateTypeName',align:'center',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
				     
				     return detailProcessingTypeMap.get(record.data.operateType);
				 },width:720*0.2},
				{header:'操作类型',dataIndex:'operateType',align:'center',hidden:true},
				//{header:'下一步部门',dataIndex:'nextStepDep',align:'center',width:approvalGridWidth*0.075},
				// {header:'接单时限',dataIndex:'acceptLimit',align:'center',width:approvalGridWidth*0.075},
				//{header:'接单时间',dataIndex:'acceptTime',align:'center',width:approvalGridWidth*0.075},
				//{header:'回复时限',dataIndex:'responseLimit',align:'center',width:approvalGridWidth*0.1},
				{header:'处理意见',dataIndex:'operateContent',align:'center',width:approvalGridWidth*0.15,hidden:true},
				{header:'处理结果',dataIndex:'operateResult',align:'center',width:approvalGridWidth*0.15,hidden:true},
				{header:'备注',dataIndex:'remarks',align:'center',width:approvalGridWidth*0.15,hidden:true}
]
        );
        var grid = new ZTESOFT.Grid({
            id : 'approvalGrid',
            height : 240,//默认宽度为自适应的，一般不用设置
            width : testCardOrderModifyWidth*4+20+20+10,//720,//approvalGridWidth,
//            title : '审批历史',
            cm : column,//列定义
            pageSize : 20,//页纪录数
            paging : true,//是否分页
//            collapsible : true,//是否可以收缩
            //store : this.testGridStore ,
            url:PATH+'/e19/testCardCommonAction.json?method=getOperateHisList',
            sm :cm/*,
            listeners:{
                rowselect : function(grid,rowIndex, e){  
                    var selectItem = grid.getSelectionModel().getSelected();
                    selectItem.data.operatorDtl = selectItem.data.operator;
                    selectItem.data.operateDepDtl = selectItem.data.operatorDep;
                    selectItem.data.operateTimeDtl = selectItem.data.operateTime;
                    selectItem.data.operateResultDtl = selectItem.data.operateResult;
                    selectItem.data.operateTypeDtl = selectItem.data.operateType;
                    selectItem.data.operateContentDtl = selectItem.data.operateContent;
                    selectItem.data.remarksDtl = selectItem.data.remarks;
                    Ext.getCmp('approvalFormDtl').getForm().loadRecord(selectItem);
                }
            }*/
        });
        return grid;
    }
    
    this.getApprovalDetailFormPn = function(){

        var  approvalDtlPn = new Ext.FormPanel({
            id:'approvalFormDtl',
            labelAlign : 'right',
//            labelWidth : 80,
            frame : true,
            title : '步骤详情',
            //height : body_height*0.25,
//            width: 720,//body_width*0.6,
            layoutConfig : {
                            columns : 2 * 2
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:8px;overflow-x:hidden;overflow-y:auto;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : testCardOrderModifyWidth,//最小是120，最大190
                            height : 30
                        },
            items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '操作人'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel: '操作人',
                        name: 'operatorDtl',
                        id: 'operatorDtl',
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '操作人部门'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel: '操作人部门',
                        name: 'operateDepDtl',
                        id: 'operateDepDtl',
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '操作时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel: '操作时间',
                        name: 'operateTimeDtl',
                        id: 'operateTimeDtl',
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '操作类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel: '操作类型',
                        name: 'operateTypeDtl',
                        id: 'operateTypeDtl',
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '处理结果'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel: '处理结果',
                        name: 'operateResultDtl',
                        id: 'operateResultDtl',
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '处理说明'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    height:50,
                                    items : [{xtype:'ZTESOFT.textarea',
                                    hideLabel : true,
//                                            fieldLabel: '处理说明',
                        name: 'operateContentDtl',
                        id: 'operateContentDtl',
                        height:50,
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    hidden:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '备注'
                                    }
                                },{
                                    colspan : 3,
                                    hidden:true,
                                    width:510,
                                    items : [{xtype:'ZTESOFT.textarea',
                                    hideLabel : true,
//                                            fieldLabel: '备注',
                        name: 'remarksDtl',
                        id: 'remarksDtl',
                        height:50,
                        readOnly : true,
                        anchor : '100%'
                                    }]
                                }
            ]
//            items: [{
//                layout:'column',
//                items:[{
//                    columnWidth:.45,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textfield',
//                        fieldLabel: '操作人',
//                        name: 'operatorDtl',
//                        id: 'operatorDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                },{
//                    columnWidth:.45,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textfield',
//                        fieldLabel: '操作人部门',
//                        name: 'operateDepDtl',
//                        id: 'operateDepDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                }]
//            },{
//                layout:'column',
//                items:[{
//                    columnWidth:.45,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textfield',
//                        fieldLabel: '操作时间',
//                        name: 'operateTimeDtl',
//                        id: 'operateTimeDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                },{
//                    columnWidth:.45,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textfield',
//                        fieldLabel: '操作类型',
//                        name: 'operateTypeDtl',
//                        id: 'operateTypeDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                }]
//            },{
//                layout:'column',
//                items:[{
//                    columnWidth:.9,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textfield',
//                        fieldLabel: '处理结果',
//                        name: 'operateResultDtl',
//                        id: 'operateResultDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                }]
//            },{
//                layout:'column',
//                items:[{
//                    columnWidth:.9,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textarea',
//                        fieldLabel: '处理说明',
//                        name: 'operateContentDtl',
//                        id: 'operateContentDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                }]
//            },{
//                layout:'column',
//                hidden:true,
//                items:[{
//                    columnWidth:.9,
//                    layout: 'form',
//                    items: [{
//                        xtype:'textarea',
//                        fieldLabel: '备注',
//                        name: 'remarksDtl',
//                        id: 'remarksDtl',
//                        anchor : '95%',
//                        disabled : true
//                    }]
//                }]
//            }]
        });
        return approvalDtlPn;        
    }
        
        this.getApprovalTabPn = function(){
            var approvalHisGrid= this.initApprovalHisGrid();
            var formPn = this.getApprovalDetailFormPn();
            var pn = new Ext.Panel({
            	id:"modifyApprovalTabPn",
//                title:"审批历史",
//                height:body_height*0.75,
//                plain:true,
//                autoScroll:true,
                
                labelAlign: 'left',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                title:'审批历史',
                width:720,//Ext.getBody().getSize(),
                height:body_height*0.75,
                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;width:800px',
                labelWidth: 70,
                
                items: [approvalHisGrid,formPn]
            });
            return pn;
        }
        
        
        this.oper = function(actionFlag,obj){
            var targetPerson = obj.targetPerson;
            var ob = new Object();
                 ob.cardSheetId = Ext.getCmp("cardSheetId").getValue();
                 ob.lendDepartmentId = session.logonAccount.cloudOrgId;//借出单位
                 ob.cardOperationTypeEnumId = Ext.getCmp("cardOperationTypeEnumId").getValue();
                 ob.expectedReturnTime = Ext.getCmp("expectedReturnTime").getValue();
                 ob.activityInsId = "1";//$("input[name='cardSheetId']").val();
                 ob.processInsId = "1";//$("input[name='cardSheetId']").val();
                 ob.operatorId = session.logonAccount.cloudUserId;//$("input[name='operatorId']").val();
                 ob.operateDepartmentId = session.logonAccount.cloudOrgId;//$("input[name='cardSheetId']").val();
                 ob.operateType = actionFlag;//actionFlag 0为查看详情  3为审核  2为执行 4为接收
                 ob.dealState = "1";//$("input[name='cardSheetId']").val();
                 ob.dealAction = "1";
                 ob.createdBy = session.logonAccount.cloudUserId;//$("input[name='cardSheetId']").val();
                 ob.lastUpdatedBy = session.logonAccount.cloudUserId;//$("input[name='cardSheetId']").val();
                 ob.recordVersion = "1";//$("input[name='cardSheetId']").val();
                 ob.deletedFlag = "0";//$("input[name='cardSheetId']").val();
                 ob.marketingAreaId = session.logonAccount.marketingAreaId;//$("input[name='cardSheetId']").val();
                 ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;//$("input[name='cardSheetId']").val();
                 ob.orgId = session.logonAccount.cloudOrgId;//$("input[name='cardSheetId']").val();
                 ob.approveOpinion = Ext.getCmp("approveOpinionEdit").getValue();
                 ob.auditResult = Ext.getCmp("auditResult").getValue().inputValue;//审核结果
                 ob.timeOut = "0";
                 ob.operatorContactInfo = "1";
                 ob.targetPerson = targetPerson.id;
                 ob.nextActivityInsId = obj.nextActivityInsId;
                 ob.targetType = "1";
                 ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderAuditAction.json?method=addCardOrderAudit',
                                    ob,
                                    function(response){
                                        if(actionFlag==2)Ext.Msg.alert("提示","执行成功！");
                                        if(actionFlag==3)Ext.Msg.alert("提示","审核成功！");
                                        if(actionFlag==4)Ext.Msg.alert("提示","接收成功！");
                                        Ext.getCmp("detailWin").close();
                                    }
                            );
        }
        
        this.initWindow = function(recordData,flag){//与initWindowMyUndoTaskUnify方法的业务逻辑保持一致
            
            var attNums = new Array();
            var attNames = new Array();
            var attIds = new Array();
            
            var tmpO = new Object();
            tmpO.start = 0;
            tmpO.limit = 99;
            tmpO.objectTable = 'T_EOM_CARD_SHEET';
            tmpO.objectId = cardSheetIdGlo;
            var _ret = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryAttachment',tmpO);
            if(_ret.total!=null&&_ret.total!=0){
                var li = _ret.rows;
               for(var i=0;i<_ret.total;i++){
                   attNums.push(li[i].attRelGenId);
                   attNames.push(li[i].attachmentName);
                   attIds.push(li[i].attachmentId);
               }
            }
            
            testCardOrderModifyFileList.attNums = attNums;
            testCardOrderModifyFileList.attNames = attNames;
            testCardOrderModifyFileList.attIds = attIds;
            
            if(recordData.woStatusEnumId!=null){
                testCardOrderModifyWoStatusEnumId = recordData.woStatusEnumId;
            }
            modifyUrgencyLevelId = recordData.urgencyLevelId;
            var tabPanel = this.initTabPanel();
            
            this.initUpdate(recordData);
            var formWin = new Ext.Window({
                id:'detailWin',
                title: this.winTitle,
                closable:true,
                width: 740,//body_width*0.65,
                height: 500,//body_height*0.7,
                layout: 'border',
                plain:true,
                modal: true,
                items: [tabPanel],
                buttonAlign:'center',
                buttons: [
                        
                            
//                    {
//                    text: '签单',
//                    aa:'bar',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },{
//                    text: '回单',
//                    aa:'bar',
//                    id:'returnBut',
//                    onClick:function(){
//                        if(Ext.getCmp("approveOpinionEdit").getValue()==""){
//                            if(flag==3){
//                               Ext.Msg.alert("提示","请填写审批意见！");
//                            }
//                            if(flag==2){
//                               Ext.Msg.alert("提示","请填写执行意见！");
//                            }
//                            if(flag==4){
//                               Ext.Msg.alert("提示","请填写接收意见！");
//                            }
//                           return;
//                        }
//                         manager.initNextDealMan(flag);//0为查看详情  3为审核  2为执行 4为接收

//                        
//                    }
//                },
                {
                    text: '提交',
                    xtype: 'ZTESOFT.Button',
                    id:'add',
                    hidden:true,
                    onClick:function(){
                        if(!Ext.getCmp('infoPage').getForm().isValid()
                        ||
                        (!Ext.getCmp('orderInfo').getForm().isValid())
                        ){
//                            Ext.Msg.alert("提示","请填写必要的信息！");
                            return;
                        }
                        if(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))<new Date()){
                             Ext.Msg.alert("提示","建议完成时间必须晚于当前时间！");return;
                         }
                         
                         
                         var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
                         if(a!=3&&a!=6){
                            if(Ext.getCmp("testCardList").getStore().data.items.length==0){
                                Ext.Msg.alert("提示","请选择测试卡！");
                                return;
                            }
                            
                         }else if(a==3){
                            if(Ext.getCmp("expectedReturnTime").getValue()==""){
                                Ext.Msg.alert("提示","请填写预计归还时间！");
                                return;
                            }
                            if(new Date(Date.parse(Ext.getCmp('expectedReturnTime').getValue()))<new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))){
                                Ext.Msg.alert("提示","预计归还时间必须晚于建议完成时间！");
                                return;
                            }
//                            if(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue().format('Y/m/d h:i:s')))>new Date(Date.parse(Ext.getCmp('expectedReturnTime').getValue().format('Y/m/d h:i:s')))){
//                             Ext.Msg.alert("提示","预计归还时间必须晚于建议完成时间！");return;
//                            }
                         }
                        var ob = Ext.getCmp('infoPage').getForm().getValues();
                        ob.urgencyLevel = Ext.getCmp('urgencyLevel').getValue();
                        ob.cardOperationTypeEnumId = Ext.getCmp('cardOperationTypeEnumId').getValue();
                        ob.processInsId = "1";//$("input[name='cardSheetId']").val();
                         ob.lastUpdatedBy = session.logonAccount.cloudUserId;//$("input[name='cardSheetId']").val();
                         ob.marketingAreaId = session.logonAccount.marketingAreaId;
                         ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                         ob.companyId = session.logonAccount.cloudOrgId;
                         ob.companyName = session.logonAccouserDeptNameName;
                         ob.orgId = session.logonAccount.cloudOrgId;
                         ob.processingOrgId = session.logonAccount.cloudOrgId;
                         ob.sheetTheme = Ext.getCmp('sheetTheme').getValue();
                         ob.content = Ext.getCmp('content').getValue();
                         ob.remarks = Ext.getCmp('testCardOrderModifyRemarks').getValue();
                         ob.archiveBaseDate = Ext.getCmp('requiredFinishTime').getValue();
                         ob.loginId = session.logonAccount.accountId;//"tiger";//targetPerson.id;
                         ob.loginName = session.logonAccount.userEmpName;//"tiger";//targetPerson.text;
                         
//                         Person Company auditThisType
//                         alert(Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person");
//                         alert(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="");
//                         alert(Ext.getCmp('auditDepartmentId').getValue()!="");
//                         if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
//                         ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
////                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
//                         ob.targetType = 1;//用户
//                         ob.auditDepartmentId = null;
//                         }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
//                         ob.targetType = 3;//部门
//                         ob.auditPersonId = null;
//                         }else if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
//                         ob.targetPerson = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
////                         ob.targetPerson = Ext.getCmp('executePersonId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                         ob.targetType = 1;//用户
//                         ob.executeDepartmentId = null;
//                         }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                         ob.targetType = 3;//部门
//                         ob.executePersonId = null;
//                         }
////                         return;
//                         if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="1"){//调拨
//                            
//                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
//                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
//                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
//                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
//                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
//                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
//                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
//                         }
                         
                         if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="5"||
                         Ext.getCmp("cardOperationTypeEnumId").getValue()=="6"
                         ){//报废 清查 对象赋值 审核对象
                             if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;
                             ob.auditPersonId = "";
                             }
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="4"){//归还 对象赋值 执行对象
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('executePersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.executeDepartmentId = null;
                             ob.executeDepartmentId = "";
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.executePersonId = null;
                             ob.executePersonId = "";
                             }
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="1"||Ext.getCmp("cardOperationTypeEnumId").getValue()=="2"
                         ){//调拨 移交 对象赋值 审核 执行对象
                            
                            if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;
                             ob.auditPersonId = "";
                             }
                             
                             //调拨的执行对象要特殊处理
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
                             ob.executeDepartmentId = "";
                             ob.executePersonId = "";
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="3"){//借用 对象赋值 本部门审核 审核 执行对象
                            
                            if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
//                             ob.auditDepartmentId = null;//避免修改加载时查accountId
                             ob.auditDepartmentId = "";//避免修改加载时查accountId
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
//                             ob.auditPersonId = null;//避免修改加载时查accountId
                             ob.auditPersonId = "";//避免修改加载时查accountId
                             }
                             
                             if((Ext.getCmp('auditMyThisType').getValue()!=""&&Ext.getCmp('auditMyThisType').getValue()=="Person")
                             ||(Ext.getCmp('auditMyThisType').getValue()==""&&Ext.getCmp('auditMyPersonAccountId').getValue()!="")){//本部门审核对象 用于传入流程参与者
                                 ob.targetPerson = Ext.getCmp('auditMyPersonAccountId').getValue();//"tiger";
        //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                                 ob.targetPersonName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.targetType = 1;//用户
                                 }else if(Ext.getCmp('auditMyDepartmentId').getValue()!=""){
                                 ob.targetPerson = Ext.getCmp('auditMyDepartmentId').getValue();//"tiger";
                                 ob.targetPersonName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.targetType = 3;//部门
                             }
                             
                             if((Ext.getCmp('auditMyThisType').getValue()!=""&&Ext.getCmp('auditMyThisType').getValue()=="Person")
                             ||(Ext.getCmp('auditMyThisType').getValue()==""&&Ext.getCmp('auditMyPersonAccountId').getValue()!="")){//本部门审核对象 用于出入调度表修改

                                 ob.auditMyObjectId = Ext.getCmp('auditMyPersonAccountId').getValue();//"tiger";
        //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                                 ob.auditMyObjectName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.auditMyObjectType = 3;//用户
                                 }else if(Ext.getCmp('auditMyDepartmentId').getValue()!=""){
                                 ob.auditMyObjectId = Ext.getCmp('auditMyDepartmentId').getValue();//"tiger";
                                 ob.auditMyObjectName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.auditMyObjectType = 1;//部门
                             }
                             
                             //调拨移交借用的执行对象要特殊处理
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
                             ob.executeDepartmentId = "";
                             ob.executePersonId = "";
                         }
                         
                         if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")
                         ||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                             ob.flowExecutor = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                             ob.flowExecutor = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                             }
                         
//                         ob.targetPerson = session.logonAccount.cloudAccountId;//"tiger";
//                         ob.targetPersonName = session.logonAccount.userEmpName;//"tiger";
                         ob.operatorName = session.logonAccount.userEmpName;//"黄寿琴";//$("input[name='operatorId']").val();
                         ob.operateDepartmentName = session.logonAccount.userDeptName;//"网络公司福建省分公司网络管理中心";//$("input[name='cardSheetId']").val();
                         
                         fileList = getNewUplValue('filesName');
                         //附件对象
                         for(var i=0;i<fileList.length;i++){//处理附件列表 fileId,fileName
                             fileList[i].attachmentId = fileList[i].fileId;
                             fileList[i].attachmentName = fileList[i].fileName;
                             fileList[i].attachmentTypeEnumId = 1;//测试卡申请单附件
                             fileList[i].attachmentFormatEnumId = fileList[i].attachmentFormatEnumId;//TXT
                             fileList[i].createdBy = session.logonAccount.cloudUserId;
                             fileList[i].lastUpdatedBy = session.logonAccount.cloudUserId;
                             fileList[i].deletedBy = session.logonAccount.cloudUserId;
                             fileList[i].objectId = Ext.getCmp('cardSheetId').getValue();
                             fileList[i].objectTable = "T_EOM_CARD_SHEET";
                             
                             fileList[i].uploadedByPersonId = session.logonAccount.cloudUserId;
                             fileList[i].uploadedByPersonName = session.logonAccount.userEmpName;
                             fileList[i].uploadedByOrgId = session.logonAccount.cloudOrgId;
                             fileList[i].uploadedByOrgName = session.logonAccount.userDeptName;
                             
                             fileList[i].activityInstanceId = 0;
                             fileList[i].taskInstanceId = 0;
                         }
                         ob.fileList = Ext.encode(fileList);
                         fileList = new Array();//清空附件列表变量
                         
                         var removeFileList = getRemoveValue('filesName');
                         var removeFileListl = new Array();
                         for(var i=0;i<removeFileList.length;i++){
                            var ooo = new Object();
                            ooo.attRelGenId = removeFileList[i];
                            removeFileListl.push(ooo);
                         }
                         ob.removeFileList = Ext.encode(removeFileListl);
//                         ob.targetPerson = targetPerson.id;
//                         ob.targetPersonName = targetPerson.text;
                         ob.processInstanceId = processInstID;
                         ob.activityInstanceId = activityInstID;
                         ob.taskInstanceId = taskInstID;
                         
                         
                         var st = Ext.getCmp('testCardList').getStore();
                        var le = st.getCount();
                            
                          var sheetCardList = new Array();
                        if(a!=3&&a!=6){
                            
                            if(a==5){//报废流程，验证所选测试卡是否属于同一个管理员，目前工单不支持多派，需限制
                                var tm = st.data.items[0].data.adminName;
                               for(var z=1;z<le;z++){
                                   if(tm!=st.data.items[z].data.adminName){
                                       Ext.Msg.alert("提示","请选择归属于同一管理员的测试卡！");
                                       return;
                                   }
                               }
                               
                               if(st.data.items[0].data.adminName==session.logonAccount.userEmpName){//说明选择了管理员为自己的测试卡，不用走报废流程的接收者审核环节，以T_EOM_CARD_SHEET表的ATTRIBUTE1字段来识别该报废工单是否走接收者审核环节，ATTRIBUTE1为acceptAudit需要走，为空不需要
                                   ob.attribute1 = "";
                               }else{
                                   ob.attribute1 = "acceptAudit";
                               }
                            }
                            
                            if(a==4){//归还流程，验证所选测试卡是否属于同一个管理员，目前工单不支持多派，需限制
                            	var oo = new Object();
                            	var tm = st.data.items[0].data.adminName;
                            	oo.adminName = tm;
                               for(var z=1;z<le;z++){
                                   if(tm!=st.data.items[z].data.adminName){
                                       Ext.Msg.alert("提示","请选择归属于同一管理员的测试卡！");
                                       return;
                                   }
                               }
                               if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                            	   if(tm != Ext.getCmp('executeDepartment').getValue()){
                                	   Ext.Msg.alert("提示","执行对象必须是测试卡管理员");
                                       return;
                                   }
                                   }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                	   oo.orgId = Ext.getCmp('executeDepartmentId').getValue();
                                	   oo.orgName = Ext.getCmp('executeDepartment').getValue();
                                	   var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=findUserEntity',oo);
                                	   if(response.total ==0){
                                       	 Ext.Msg.alert("提示",oo.orgName+"部门不存在执行人员"+tm);
                                       	 return;	   
                                     }   
                                   }
                            }
                            
                             for(var i=0;i<le;i++){
                                 var sheetCard = new Object();
                                 sheetCard.testobjectId = st.data.items[i].data.testobjectId;//cardId
                                 sheetCard.testobjectType = st.data.items[i].data.testobjectType;//testobjectTypeEnumId
                                 sheetCard.archiveBaseDate = Ext.getCmp('requiredFinishTime').getValue();
                                 sheetCard.creationDate = Ext.getCmp('creationDate').getValue();
                                 sheetCard.lastUpdatedBy = session.logonAccount.cloudUserId;
                                 sheetCard.lastUpdateDate = Ext.getCmp('creationDate').getValue();
                                 sheetCard.marketingAreaId = session.logonAccount.marketingAreaId;
                                 sheetCard.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                                 sheetCard.orgId = session.logonAccount.cloudOrgId;
                                 sheetCard.createdBy = Ext.getCmp('createdBy').getValue();
                                 if(flag=="mod"){
                                    sheetCard.cardSheetId = Ext.getCmp('cardSheetId').getValue();
                                 }
                                 sheetCardList.push(sheetCard);
                             }
                         }
                             ob.sheetCardList = Ext.encode(sheetCardList);
                             
                             
                             if(a==6){//清查修改获取数据
                                    var st = Ext.getCmp('checkEditgrid').getStore();
                                if(st.getCount()!=0){
                                    var len = st.getCount();
                                    var dataArray = new Array();//存放清查记录list
                                    
                                    for(var i=0;i<len;i++){
                                        if(st.data.items[i].data.needFill==1){
                                            Ext.Msg.alert("操作提示","请填写管理员为["+st.data.items[i].data.adminName+"]的差异明细！");
                                            return;
                                        }else if(st.data.items[i].data.needFill==""&&(st.data.items[i].data.inventoryAvailableNum!=(st.data.items[i].data.actualAvailableNum||0)
                                        ||st.data.items[i].data.inventoryUnavailableNum!=(st.data.items[i].data.actualUnavailableNum||0)
                                        ||st.data.items[i].data.inventoryLendNum!=(st.data.items[i].data.actualLendNum||0))){
                                            Ext.Msg.alert("操作提示","请填写管理员为["+st.data.items[i].data.adminName+"]的差异明细！");
                                            return;
                                        }
                                        var ob2 = new Object();//存放某个清查记录
                                        ob2.checkListNumber = st.data.items[i].data.checkListNumber;
                                        ob2.checkListId = st.data.items[i].data.checkListId;
                                        ob2.deletedBy = session.logonAccount.cloudUserId;
                                        ob2.testobjectType = testCardChecktestobjectType;
                                        ob2.checkPersonId = session.logonAccount.cloudUserId;//当前用户id
                                        ob2.checkTime = st.data.items[i].data.checkTime;
                                        ob2.adminId = st.data.items[i].data.adminId;
                                        ob2.attributionDepartmentId = st.data.items[i].data.attributionDepartmentId;
                                        ob2.inventoryAvailableNum = st.data.items[i].data.inventoryAvailableNum;
                                        ob2.actualAvailableNum = st.data.items[i].data.actualAvailableNum||0;
                                        ob2.inventoryUnavailableNum = st.data.items[i].data.inventoryUnavailableNum;
                                        ob2.actualUnavailableNum = st.data.items[i].data.actualUnavailableNum||0;
                                        ob2.inventoryLendNum = st.data.items[i].data.inventoryLendNum;
                                        ob2.actualLendNum = st.data.items[i].data.actualLendNum||0;
                                        ob2.checkStatus = st.data.items[i].data.checkStatus;
                                        ob2.remarks = st.data.items[i].data.remarks;
                                        ob2.checkFormStatusEnumId = 2;//未审核

                                        ob2.createdBy = session.logonAccount.cloudUserId;
                                        ob2.lastUpdatedBy = session.logonAccount.cloudUserId;
                                        ob2.marketingAreaId = session.logonAccount.marketingAreaId;
                                        ob2.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                                        
                                        ob2.orgId = session.logonAccount.cloudOrgId;
                                        
                                        if(st.data.items[i].data.needFill==2){
                                            var differentDetailObjTmp = st.data.items[i].data.differentDetailObj;
                                            var differentDetailObj = new Object();//存放某一记录的清查详情

                                            differentDetailObj.AvailableNumList = Ext.encode(differentDetailObjTmp.AvailableNumList);
                                            differentDetailObj.UnavailableNumList = Ext.encode(differentDetailObjTmp.UnavailableNumList);
                                            differentDetailObj.LendNumList = Ext.encode(differentDetailObjTmp.LendNumList);
                                            
                                            ob2.differentDetailObj = Ext.encode(differentDetailObj);
                                        }
                                        
                                        dataArray.push(ob2);
                                    }
                                    
//                                    var data = new Object();
//                                    data.dataArray = Ext.encode(dataArray);
                                    ob.checkArray = Ext.encode(dataArray);
                                    ob.checkListId = dataArray[0].checkListId;
                                    }
                             }
                         
                             var now = new Date();
                            var timeLimite = Ext.getCmp('requiredFinishTime').getValue();
//                            ob.flowTimeLimit = (timeLimite - now)/1000/60/60;
                            
                            var yu = Math.floor(((timeLimite - now)/1000/60)%60);
                            var zheng = Math.floor((timeLimite - now)/1000/60/60);
                            var resu = zheng+"."+yu;
//                            alert(yu+"|"+zheng+"|"+resu);return;
                            ob.flowTimeLimit = resu;//(timeLimite - now)/1000/60/60;
                            
//                             alert("ob.targetPerson="+ob.targetPerson);return;
                             if(flag=="mod"){//修改
                                var sheetCardObj = new Object();
                                 sheetCardObj.deletedBy = session.logonAccount.cloudUserId;
                                 sheetCardObj.cardSheetId = Ext.getCmp('cardSheetId').getValue();
                                 
                                 ob.sheetCardObj = Ext.encode(sheetCardObj);
                                    ob.hadModifyDefferenceList = hadModifyDefferenceList;
                                    ob.woStatusEnumId = 2;//工单状态 处理中
//                                 ob.targetPerson = "tiger";
//                                 ob.targetPersonName ="tiger";
                                 
                                    var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',ob);
                                    
//                                 ZTESOFT.invokeAction(
//                                        PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',
//                                        ob,
//                                        function(response){
                                            Ext.Msg.alert("操作提示","修改成功");
                                            if(Ext.getCmp('undoTaskGrid')!=null){
                                                myUndoTask.qryListGrid(myUndoTaskWholeParam);
                                            }
                                            if(Ext.getCmp('checkGrid')!=null){
                                                var param = testCardCheckWholeParam;
                                                oper.qryListGrid('checkGrid',param);
                                            }
                                            if(Ext.getCmp('listGrid')!=null){
                                                var param = wholeParam;
                                                oper.qryListGrid(param);
                                            }
                                            
                                                    Ext.getCmp('detailWin').close();
        //                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                            
//                                        }
//                                );
                                 
//                                 applyAndmodWin.initNextDealMan(ob);
                                 
                             }else{//新增
                             
                             	var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',ob);
                             	
//                          ZTESOFT.invokeAction(
//                                PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',
//                                ob,
//                                function(response){
                                    Ext.Msg.alert("操作提示","新增成功");
                                            Ext.getCmp('detailWin').close();
                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                    
//                                }
//                        );
                             }
                         
                    }
                },
                    {
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    id:'close',
                    onClick:function(){
                        Ext.getCmp('detailWin').close();
                    }
                }
                ]
            });
            
            this.initBtnVisible(new Object(),true);
            
             formWin.show();
             
        }
        
        this.initWindowMyUndoTaskUnify = function(recordData,flag){
        	
        	var attNums = new Array();
            var attNames = new Array();
            var attIds = new Array();
            
            var tmpO = new Object();
            tmpO.start = 0;
            tmpO.limit = 99;
            tmpO.objectTable = 'T_EOM_CARD_SHEET';
            tmpO.objectId = cardSheetIdGlo;
            var _ret = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryAttachment',tmpO);
            if(_ret.total!=null&&_ret.total!=0){
                var li = _ret.rows;
               for(var i=0;i<_ret.total;i++){
                   attNums.push(li[i].attRelGenId);
                   attNames.push(li[i].attachmentName);
                   attIds.push(li[i].attachmentId);
               }
            }
            
            testCardOrderModifyFileList.attNums = attNums;
            testCardOrderModifyFileList.attNames = attNames;
            testCardOrderModifyFileList.attIds = attIds;
        	
            if(recordData.woStatusEnumId!=null){
                testCardOrderModifyWoStatusEnumId = recordData.woStatusEnumId;
            }
            modifyUrgencyLevelId = recordData.urgencyLevelId;
            var tabPanel = this.initTabPanel();
            this.initUpdate(recordData);
            var formWin = new Ext.Panel({
                id:'detailWin',
                title: this.winTitle,
                header:false,
                renderTo:'content',
                align:'center',
                region:'center',
                layout : 'border',
//                closable:true,
                width: myUndoTaskUnifyBody_width,//body_width*0.65,
                height: myUndoTaskUnifyBody_height,//body_height*0.7,
//                layout: 'border',
//                plain:true,
                items: [tabPanel],
                buttonAlign:'center',
                buttons: [
                {
                    text: '提交',
                    xtype: 'ZTESOFT.Button',
                    id:'add',
                    hidden:true,
                    onClick:function(){
                        if(!Ext.getCmp('infoPage').getForm().isValid()
                        ||
                        (!Ext.getCmp('orderInfo').getForm().isValid())
                        ){
//                            Ext.Msg.alert("提示","请填写必要的信息！");
                            return;
                        }
                        if(Ext.getCmp('sheetTheme').getValue()==""){
                            Ext.Msg.alert("提示","请填写工单主题！");
                            return;
                        }
                        if(Ext.getCmp('content').getValue()==""){
                            Ext.Msg.alert("提示","请填写内容！");
                            return;
                        }
                        if(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))<new Date()){
                             Ext.Msg.alert("提示","建议完成时间必须晚于当前时间！");return;
                         }
                         
                         
                         var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
                         if(a!=3&&a!=6){
                            if(Ext.getCmp("testCardList").getStore().data.items.length==0){
                                Ext.Msg.alert("提示","请选择测试卡！");
                                return;
                            }
                            
                         }else if(a==3){
                            if(Ext.getCmp("expectedReturnTime").getValue()==""){
                                Ext.Msg.alert("提示","请填写预计归还时间！");
                                return;
                            }
                            if(new Date(Date.parse(Ext.getCmp('expectedReturnTime').getValue()))<new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))){
                                Ext.Msg.alert("提示","预计归还时间必须晚于建议完成时间！");
                                return;
                            }
//                            if(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue().format('Y/m/d h:i:s')))>new Date(Date.parse(Ext.getCmp('expectedReturnTime').getValue().format('Y/m/d h:i:s')))){
//                             Ext.Msg.alert("提示","预计归还时间必须晚于建议完成时间！");return;
//                            }
                         }
                        var ob = Ext.getCmp('infoPage').getForm().getValues();
                        ob.urgencyLevel = Ext.getCmp('urgencyLevel').getValue();
                        ob.cardOperationTypeEnumId = Ext.getCmp('cardOperationTypeEnumId').getValue();
                        ob.processInsId = "1";//$("input[name='cardSheetId']").val();
                         ob.lastUpdatedBy = session.logonAccount.cloudUserId;//$("input[name='cardSheetId']").val();
                         ob.marketingAreaId = session.logonAccount.marketingAreaId;
                         ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                         ob.companyId = session.logonAccount.cloudOrgId;
                         ob.companyName = session.logonAccount.userDeptName;
                         ob.orgId = session.logonAccount.cloudOrgId;
                         ob.processingOrgId = session.logonAccount.cloudOrgId;
                         ob.sheetTheme = Ext.getCmp('sheetTheme').getValue();
                         ob.content = Ext.getCmp('content').getValue();
                         ob.remarks = Ext.getCmp('testCardOrderModifyRemarks').getValue();
                         ob.archiveBaseDate = Ext.getCmp('requiredFinishTime').getValue();
                         ob.loginId = session.logonAccount.accountId;//"tiger";//targetPerson.id;
                         ob.loginName = session.logonAccount.userEmpName;//"tiger";//targetPerson.text;
//                         if(Ext.getCmp('auditPersonAccountId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
////                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
//                         ob.targetType = 1;//用户
//                         ob.auditDepartmentId = null;
//                         }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
//                         ob.targetType = 3;//部门
//                         ob.auditPersonId = null;
//                         }else if(Ext.getCmp('executePersonAccountId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
////                         ob.targetPerson = Ext.getCmp('executePersonId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                         ob.targetType = 1;//用户
//                         ob.executeDepartmentId = null;
//                         }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                         ob.targetType = 3;//部门
//                         ob.executePersonId = null;
//                         }
//                         
//                         if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="1"){//调拨
//                            
//                             if(Ext.getCmp('executePersonAccountId').getValue()!=""){
//                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
//                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
//                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
//                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
//                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
//                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
//                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
//                         }
                         
                         if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="5"||
                         Ext.getCmp("cardOperationTypeEnumId").getValue()=="6"
                         ){//报废 清查 对象赋值 审核对象
                             if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;
                             ob.auditPersonId = "";
                             }
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="4"){//归还 对象赋值 执行对象
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('executePersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.executeDepartmentId = null;
                             ob.executeDepartmentId = "";
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.executePersonId = null;
                             ob.executePersonId = "";
                             }
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="2"
                         ||Ext.getCmp("cardOperationTypeEnumId").getValue()=="1"){//移交 调拨 对象赋值 审核 执行对象
                            
                            if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartmentName').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;
                             ob.auditPersonId = "";
                             }
                             
                             //调拨移交借用的执行对象要特殊处理
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
                             ob.executeDepartmentId = "";
                             ob.executePersonId = "";
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="3"){//借用 对象赋值 本部门审核 审核 执行对象
                            
                            if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
//                             ob.auditDepartmentId = null;//避免修改加载时查accountId
                             ob.auditDepartmentId = "";//避免修改加载时查accountId
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
//                             ob.auditPersonId = null;//避免修改加载时查accountId
                             ob.auditPersonId = "";//避免修改加载时查accountId
                             }
                             
                             if((Ext.getCmp('auditMyThisType').getValue()!=""&&Ext.getCmp('auditMyThisType').getValue()=="Person")
                             ||(Ext.getCmp('auditMyThisType').getValue()==""&&Ext.getCmp('auditMyPersonAccountId').getValue()!="")){//本部门审核对象 用于传入流程参与者
                                 ob.targetPerson = Ext.getCmp('auditMyPersonAccountId').getValue();//"tiger";
        //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                                 ob.targetPersonName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.targetType = 1;//用户
                                 }else if(Ext.getCmp('auditMyDepartmentId').getValue()!=""){
                                 ob.targetPerson = Ext.getCmp('auditMyDepartmentId').getValue();//"tiger";
                                 ob.targetPersonName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.targetType = 3;//部门
                             }
                             
                             if((Ext.getCmp('auditMyThisType').getValue()!=""&&Ext.getCmp('auditMyThisType').getValue()=="Person")
                             ||(Ext.getCmp('auditMyThisType').getValue()==""&&Ext.getCmp('auditMyPersonAccountId').getValue()!="")){//本部门审核对象 用于插入调度表修改

                                 ob.auditMyObjectId = Ext.getCmp('auditMyPersonAccountId').getValue();//"tiger";
        //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                                 ob.auditMyObjectName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.auditMyObjectType = 3;//用户
                                 }else if(Ext.getCmp('auditMyDepartmentId').getValue()!=""){
                                 ob.auditMyObjectId = Ext.getCmp('auditMyDepartmentId').getValue();//"tiger";
                                 ob.auditMyObjectName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                                 ob.auditMyObjectType = 1;//部门
                             }
                             
                             //调拨移交借用的执行对象要特殊处理
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartmentName').getValue();//"tiger";
                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
                             ob.executeDepartmentId = "";
                             ob.executePersonId = "";
                         }
                         
                         
//                         ob.targetPerson = session.logonAccount.cloudAccountId;//"tiger";
//                         ob.targetPersonName = session.logonAccount.userEmpName;//"tiger";
                         ob.operatorName = session.logonAccount.userEmpName;//"黄寿琴";//$("input[name='operatorId']").val();
                         ob.operateDepartmentName = session.logonAccount.userDeptName;//"网络公司福建省分公司网络管理中心";//$("input[name='cardSheetId']").val();
                         
                         fileList = getNewUplValue('filesName');
                         //附件对象
                         for(var i=0;i<fileList.length;i++){//处理附件列表 fileId,fileName
                             fileList[i].attachmentId = fileList[i].fileId;
                             fileList[i].attachmentName = fileList[i].fileName;
                             fileList[i].attachmentTypeEnumId = 1;//测试卡申请单附件
                             fileList[i].attachmentFormatEnumId = fileList[i].attachmentFormatEnumId;//TXT
                             fileList[i].createdBy = session.logonAccount.cloudUserId;
                             fileList[i].lastUpdatedBy = session.logonAccount.cloudUserId;
                             fileList[i].deletedBy = session.logonAccount.cloudUserId;
                             fileList[i].objectId = Ext.getCmp('cardSheetId').getValue();
                             fileList[i].objectTable = "T_EOM_CARD_SHEET";
                             
                             fileList[i].uploadedByPersonId = session.logonAccount.cloudUserId;
                             fileList[i].uploadedByPersonName = session.logonAccount.userEmpName;
                             fileList[i].uploadedByOrgId = session.logonAccount.cloudOrgId;
                             fileList[i].uploadedByOrgName = session.logonAccount.userDeptName;
                             
                             fileList[i].activityInstanceId = 0;
                             fileList[i].taskInstanceId = 0;
                         }
                         ob.fileList = Ext.encode(fileList);
                         fileList = new Array();//清空附件列表变量
                         
                         var removeFileList = getRemoveValue('filesName');
                         var removeFileListl = new Array();
                         for(var i=0;i<removeFileList.length;i++){
                         	var ooo = new Object();
                            ooo.attRelGenId = removeFileList[i];
                            removeFileListl.push(ooo);
                         }
                         ob.removeFileList = Ext.encode(removeFileListl);
//                         ob.targetPerson = targetPerson.id;
//                         ob.targetPersonName = targetPerson.text;
                         ob.processInstanceId = processInstID;
                         ob.activityInstanceId = activityInstID;
                         ob.taskInstanceId = taskInstID;
                         
                         
                         var st = Ext.getCmp('testCardList').getStore();
                        var le = st.getCount();
                            
                          var sheetCardList = new Array();
                        if(a!=3&&a!=6){
                        	
                        	if(a==5){//报废流程，验证所选测试卡是否属于同一个管理员，目前工单不支持多派，需限制
                                var tm = st.data.items[0].data.adminName;
                               for(var z=1;z<le;z++){
                                   if(tm!=st.data.items[z].data.adminName){
                                       Ext.Msg.alert("提示","请选择归属于同一管理员的测试卡！");
                                       return;
                                   }
                               }
                               
                               if(st.data.items[0].data.adminName==session.logonAccount.userEmpName){//说明选择了管理员为自己的测试卡，不用走报废流程的接收者审核环节，以T_EOM_CARD_SHEET表的ATTRIBUTE1字段来识别该报废工单是否走接收者审核环节，ATTRIBUTE1为acceptAudit需要走，为空不需要
                                   ob.attribute1 = "";
                               }else{
                                   ob.attribute1 = "acceptAudit";
                               }
                            }
                        	
                             for(var i=0;i<le;i++){
                                 var sheetCard = new Object();
                                 sheetCard.testobjectId = st.data.items[i].data.testobjectId;//cardId
                                 sheetCard.testobjectType = st.data.items[i].data.testobjectType;//testobjectTypeEnumId
                                 sheetCard.archiveBaseDate = Ext.getCmp('requiredFinishTime').getValue();
                                 sheetCard.creationDate = Ext.getCmp('creationDate').getValue();
                                 sheetCard.lastUpdatedBy = session.logonAccount.cloudUserId;
                                 sheetCard.lastUpdateDate = Ext.getCmp('creationDate').getValue();
                                 sheetCard.marketingAreaId = session.logonAccount.marketingAreaId;
                                 sheetCard.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                                 sheetCard.orgId = session.logonAccount.cloudOrgId;
                                 sheetCard.createdBy = Ext.getCmp('createdBy').getValue();
                                 if(flag=="mod"){
                                    sheetCard.cardSheetId = Ext.getCmp('cardSheetId').getValue();
                                 }
                                 sheetCardList.push(sheetCard);
                             }
                         }
                             ob.sheetCardList = Ext.encode(sheetCardList);
                             
                             
                             if(a==6){//清查修改获取数据
                                    var st = Ext.getCmp('checkEditgrid').getStore();
                                if(st.getCount()!=0){
                                    var len = st.getCount();
                                    var dataArray = new Array();//存放清查记录list
                                    
                                    for(var i=0;i<len;i++){
                                        if(st.data.items[i].data.needFill==1){
                                            Ext.Msg.alert("操作提示","请填写管理员为["+st.data.items[i].data.adminName+"]的差异明细！");
                                            return;
                                        }else if(st.data.items[i].data.needFill==""&&(st.data.items[i].data.inventoryAvailableNum!=(st.data.items[i].data.actualAvailableNum||0)
                                        ||st.data.items[i].data.inventoryUnavailableNum!=(st.data.items[i].data.actualUnavailableNum||0)
                                        ||st.data.items[i].data.inventoryLendNum!=(st.data.items[i].data.actualLendNum||0))){
                                            Ext.Msg.alert("操作提示","请填写管理员为["+st.data.items[i].data.adminName+"]的差异明细！");
                                            return;
                                        }
                                        var ob2 = new Object();//存放某个清查记录
                                        ob2.checkListNumber = st.data.items[i].data.checkListNumber;
                                        ob2.checkListId = st.data.items[i].data.checkListId;
                                        ob2.deletedBy = session.logonAccount.cloudUserId;
                                        ob2.testobjectType = testCardChecktestobjectType;
                                        ob2.checkPersonId = session.logonAccount.cloudUserId;//当前用户id
                                        ob2.checkTime = st.data.items[i].data.checkTime;
                                        ob2.adminId = st.data.items[i].data.adminId;
                                        ob2.attributionDepartmentId = st.data.items[i].data.attributionDepartmentId;
                                        ob2.inventoryAvailableNum = st.data.items[i].data.inventoryAvailableNum;
                                        ob2.actualAvailableNum = st.data.items[i].data.actualAvailableNum||0;
                                        ob2.inventoryUnavailableNum = st.data.items[i].data.inventoryUnavailableNum;
                                        ob2.actualUnavailableNum = st.data.items[i].data.actualUnavailableNum||0;
                                        ob2.inventoryLendNum = st.data.items[i].data.inventoryLendNum;
                                        ob2.actualLendNum = st.data.items[i].data.actualLendNum||0;
                                        ob2.checkStatus = st.data.items[i].data.checkStatus;
                                        ob2.remarks = st.data.items[i].data.remarks;
                                        ob2.checkFormStatusEnumId = 2;//未审核
                                        ob2.createdBy = session.logonAccount.cloudUserId;
                                        ob2.lastUpdatedBy = session.logonAccount.cloudUserId;
                                        ob2.marketingAreaId = session.logonAccount.marketingAreaId;
                                        ob2.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                                        
                                        ob2.orgId = session.logonAccount.cloudOrgId;
                                        
                                        if(st.data.items[i].data.needFill==2){
                                            var differentDetailObjTmp = st.data.items[i].data.differentDetailObj;
                                            var differentDetailObj = new Object();//存放某一记录的清查详情
                                            differentDetailObj.AvailableNumList = Ext.encode(differentDetailObjTmp.AvailableNumList);
                                            differentDetailObj.UnavailableNumList = Ext.encode(differentDetailObjTmp.UnavailableNumList);
                                            differentDetailObj.LendNumList = Ext.encode(differentDetailObjTmp.LendNumList);
                                            
                                            ob2.differentDetailObj = Ext.encode(differentDetailObj);
                                        }
                                        
                                        dataArray.push(ob2);
                                    }
                                    
//                                    var data = new Object();
//                                    data.dataArray = Ext.encode(dataArray);
                                    ob.checkArray = Ext.encode(dataArray);
                                    ob.checkListId = dataArray[0].checkListId;
                                    }
                             }
                         
                             var now = new Date();
                            var timeLimite = Ext.getCmp('requiredFinishTime').getValue();
//                            ob.flowTimeLimit = (timeLimite - now)/1000/60/60;
                            
                            var yu = Math.floor(((timeLimite - now)/1000/60)%60);
                            var zheng = Math.floor((timeLimite - now)/1000/60/60);
                            var resu = zheng+"."+yu;
//                            alert(yu+"|"+zheng+"|"+resu);return;
                            ob.flowTimeLimit = resu;//(timeLimite - now)/1000/60/60;
                             
                             if(flag=="mod"){//修改
                                var sheetCardObj = new Object();
                                 sheetCardObj.deletedBy = session.logonAccount.cloudUserId;
                                 sheetCardObj.cardSheetId = Ext.getCmp('cardSheetId').getValue();
                                 
                                 ob.sheetCardObj = Ext.encode(sheetCardObj);
                                    ob.hadModifyDefferenceList = hadModifyDefferenceList;
                                    ob.woStatusEnumId = 2;//工单状态 处理中
//                                 ob.targetPerson = "tiger";
//                                 ob.targetPersonName ="tiger";
                                 
                                    
                                    var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',ob);
                                    
//                                 ZTESOFT.invokeAction(
//                                        PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',
//                                        ob,
//                                        function(response){
                                        	if(response.msg!=null&&response.msg=="warn"){
                                               Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被选择！");
                                               return;
                                            }
                                            Ext.Msg.alert("操作提示","修改成功");
                                            if(Ext.getCmp('undoTaskGrid')!=null){
                                                myUndoTask.qryListGrid(myUndoTaskWholeParam);
                                            }
                                            if(Ext.getCmp('checkGrid')!=null){
                                                var param = testCardCheckWholeParam;
                                                oper.qryListGrid('checkGrid',param);
                                            }
                                            if(Ext.getCmp('listGrid')!=null){
                                                var param = wholeParam;
                                                oper.qryListGrid(param);
                                            }
                                            window.close();
//                                                    Ext.getCmp('detailWin').close();
        //                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                            
//                                        }
//                                );
                                 
//                                 applyAndmodWin.initNextDealMan(ob);
                                 
                             }else{//新增
                             
                             	var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',ob);
                             	
//                          ZTESOFT.invokeAction(
//                                PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',
//                                ob,
//                                function(response){
                                    Ext.Msg.alert("操作提示","新增成功");
                                            Ext.getCmp('detailWin').close();
                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                    
//                                }
//                        );
                             }
                         
                    }
                },
                {
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    id:'close',
                    onClick:function(){
                     //   Ext.getCmp('detailWin').close();
                    	window.close();
                    }
                }
                ]
            });
//             formWin.show();
            this.initBtnVisible(new Object(),true);
             return formWin;
        }
        
        this.initBtnVisible = function(rowData,flag){
            var param = {
                    taskInstID : taskInstID,
                    accountId : session.logonAccount.accountId,
                    accountName : session.logonAccount.userEmpName
            };
            var url = PATH+'/e19/testCardCommonAction.json?method=getExtendAttributes';
            var response = ZTESOFT.Synchronize(url,param);
            if(response && response.length && response.length > 0){
                
                if(typeof(myUndoTaskCurrentState)!="undefined"&&myUndoTaskCurrentState==4){//myUndoTaskCurrentState为4表明该工单必须签收才可以进行其他操作
                        for(var i=0;i<response.length;i++){
                            var value = response[i].value;
                            
                            if(Ext.getCmp(value)){
                                if(value == "myUndoTaskSign"){
                                    Ext.getCmp(value).setVisible(flag);
                                }
                            }
                        }
                }else{//否则过滤掉签收按钮
                    for(var i=0;i<response.length;i++){
                        var value = response[i].value;
                        if(Ext.getCmp(value)){
                            if(value != "myUndoTaskSign"){
                                Ext.getCmp(value).setVisible(flag);
                            }
                        }
                    }
                }
                
            } 
        }
        
        this.initNextDealMan = function(ob){
            
            var nextActivityInsIdStore = new Ext.data.ArrayStore({
                fields: ['value','text'],
                data:[
                    ['','请选择'],
                    ['1','送会签部门负责人'],
                    ['2','送处室负责人'],
                    ['3','送经办人'],
                    ['4','返回承办人']
                ]
            });
            
            
            var nextDealManWin = new Ext.Window({
                id:'nextDealMan',
                title: '选择人员',
                closable:true,
                width: 700,
                height: 600,
                plain:true,
                
                items: [{layout: 'column',
                items:[
//                    {
//                        columnWidth : 1,
//                        layout : 'form',
//                        labelWidth:150,
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '<font color="red">*</font>请选择下一步环节',
//                            name : 'nextActivityInsId',
//                            id : 'nextActivityInsId',
//                            valueField: 'value',
//                            displayField: 'text',
//                            allowBlank:false,
//                            blankText:'请选择下一环节!',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : false ,
//                            value: '',
//                            store: nextActivityInsIdStore,
//                            anchor : '95%'
//                            
//                        }]
//                    },
                        {
                        columnWidth : 1,
                        layout : 'column',
                        labelWidth:150,
                        height:400,
                        items : [
                            {columnWidth : .4,
                        items : [
                            {title: '请选择下一个处理人',
                            xtype: 'treepanel',
                            width: 280,
                            height:400,
                            useArrows:true,
                            autoScroll:true,
                            id:'selectNextMan',
                            animate:true,
                            enableDD:true,
                            containerScroll: true,
                            frame: true,
                            root: new Ext.tree.AsyncTreeNode({
                                text: 'To Do', 
                                id:'11',
                                cls: 'folder',
                                leaf:false,
                                children: [{
                                    text: '1',//'tiger',
                                    id:3,
                                    leaf: true,
                                    checked: false
                                }]
                            }),
                            rootVisible: false//,
//                            listeners: {
//                                click: function(n) {
//                                    Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
//                                }
//                            }
                        }
                        ]
                        },
                            {columnWidth : .2,
                        items : [{
                            xtype: 'form',
                            layout:'column',
                            buttonAlign:'center',
                            items:[
                            {columnWidth : 1,
                            items:[
                            {xtype:'button',
                            text:'>>',
                            listeners: {
                                click: function(n) {
                                    var a = Ext.getCmp("selectNextMan").getChecked();
                                    var b = Ext.getCmp("selectedNextMan").getRootNode();
                                    b.appendChild(a);
//                                    for(var i=0;i<a.length;i++){
//                                        
//                                    }
//                                    alert(a.length);
                                }
                            }
                            }
                            ]
                            },{columnWidth : 1,
                            items:[
                            {xtype:'button',
                            text:'<<<',
                            listeners: {
                                click: function(n) {
                                    var a = Ext.getCmp("selectNextMan").getRootNode();
                                    var b = Ext.getCmp("selectedNextMan").getChecked();
                                    a.appendChild(b);
                                }
                            }
                            }
                            ]
                            }
                            ]
                            
                            
                        }]
                            
                        },{columnWidth : .4,
                        items : [
                            {
                            xtype: 'treepanel',
                            width: 280,
                            height:400,
                            useArrows:true,
                            autoScroll:true,
                            id:'selectedNextMan',
                            animate:true,
                            enableDD:true,
                            containerScroll: true,
                            frame: true,
                            root: new Ext.tree.AsyncTreeNode({
                                id:''
                            }),
                            rootVisible: false
                        }]
                            
                        }]
                    }]}
                    ],
                buttonAlign:'center',
                buttons: [
                    {
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
//                        if(Ext.getCmp("nextActivityInsId").getValue()==""){
//                            Ext.Msg.alert("提示","请选择下一步环节！");
//                            return;
//                        }
                        var aaqq = Ext.getCmp("selectedNextMan").getRootNode();
                        if(aaqq.childNodes.length!=1){
                            Ext.Msg.alert("提示","请选择一个处理人！");
                            return;
                        }
                        
//                        ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
                        
                        ob.targetPerson = aaqq.childNodes[0].id;
                        ob.targetPersonName = aaqq.childNodes[0].text;
                        
//                        manager.oper(actionFlag,ob);
                        
                        ZTESOFT.invokeAction(
                                PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',
                                ob,
                                function(response){
                                    Ext.Msg.alert("操作提示","修改成功");
                                            Ext.getCmp('detailWin').close();
//                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                    
                                }
                        );
                        
                        nextDealManWin.close();
                    }
                },{
                    text: '取消',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        nextDealManWin.close();
                    }
                }]
            });
            nextDealManWin.show();
            
        }
        
        this.showWin = function(flag,cardSheetId){//与showWinMyUndoTaskUnify方法的业务逻辑保持一致
            haveLoad = 0;
            var ob = new Object();
//                ob.cardSheetId = cardSheetId;
//                ob.detailOnly = 1;
            var param  = new Object();
            if(flag=="add"){
                var dat = new Object();
                dat.data = new Object();
                var dd = new Object();
                dd.localeId = session.logonAccount.provinceCompanyId;
                dd.companyName = session.logonAccount.userDeptName;
                dd.companyId = session.logonAccount.cloudOrgId;
                dd.createdBy = session.logonAccount.cloudUserId;
                dd.createdByName = session.logonAccount.userEmpNam;
                dd.sheetSerialNumber = new Date().getTime();
                dd.woStatusEnumId = 1;
                dd.currentNode = 1;
                
                var d = new Date();
                var dateStr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
            
                dd.creationDate = dateStr;
                dd.dispatchDate = dateStr;
                dat.data = dd;
                applyAndmodWin.initWindow(dd,flag);
                return;
            }
            
            
            
            if(cardSheetId!=null){
                param.cardSheetId = cardSheetId;
                cardSheetIdGlo = cardSheetId;
            }else{
                Ext.Msg.alert("提示","请输入工单ID！");
                return;
            }
//            var a = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            
//            param.cardSheetId = a[0].data.cardSheetId;
            
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardOrderApplyAction.json?method=qryAtestCardOrder',
                    param,
                    function(response){
                        applyAndmodWin.initWindow(response.rows[0],flag);
                        testCardOrderModityCardOperationTypeEnumId = response.rows[0].cardOperationTypeEnumId;
                        applyAndmodWin.controlTestCardList(response.rows[0].cardOperationTypeEnumId);
//                        if(response.rows[0].sheetType==3){
//                           Ext.getCmp('testCardListTR').hide();
//                        }else{
                               ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderApplyAction.json?method=qryAtestCardOrderTestCard',
                                    param,
                                    function(response){
                                        var ro = response.rows;
                                        for(var i=0;i<ro.length;i++){
                                           Ext.getCmp('testCardList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡列表

                                        }
                                    }
                            );
                            
                            if(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3"){//调拨和移交和借用流程修改草稿时如果有执行对象就查询调度表加载执行对象
                                var ob = new Object();
                                ob.workOrderId = cardSheetId;
                                ob.activityId=0;
                                ob.taskId = 0; 
                                var retOb = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryDisAssignObjectListByParam',ob);
                                if(retOb.total!=0){
                                    var disAssignObjectList = retOb.rows;
                                    for(var i=0;i<disAssignObjectList.length;i++){
                                        if(disAssignObjectList[i].disAssignObjectTypeEnumId==1){//1表示组织
                                            Ext.getCmp('executeDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
                                            Ext.getCmp('executeDepartmentName').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            if(flag==3&&response.rows[0].cardOperationTypeEnumId=="1"){
//                                            Ext.getCmp('auditResultExecuteDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
//                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            }
                                        }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员
                                            Ext.getCmp('executePersonId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('executeDepartmentName').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            if(flag==3&&response.rows[0].cardOperationTypeEnumId=="1"){
//                                            Ext.getCmp('auditResultExecutePersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
//                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            }
                                        }
                                    }
                                    
                                    
                                }
                                
                                if(response.rows[0].cardOperationTypeEnumId=="3"){//借用流程 还要填充本部门审核对象 用-1表示
                                    var ob = new Object();
                                    ob.workOrderId = cardSheetId;
                                    ob.activityId=-1;
                                    ob.taskId = -1; 
                                    var retOb = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryDisAssignObjectListByParam',ob);
                                    if(retOb.total!=0){
                                        var disAssignObjectList = retOb.rows;
                                        for(var i=0;i<disAssignObjectList.length;i++){
                                            if(disAssignObjectList[i].disAssignObjectTypeEnumId==1){//1表示组织
                                                Ext.getCmp('auditMyDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
                                                Ext.getCmp('auditMyDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员
                                                Ext.getCmp('auditMyPersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
                                                Ext.getCmp('auditMyDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }
                                        }
                                        
                                        
                                    }
                                }
                                
                       }
//                        }
                        
//                        ZTESOFT.invokeAction(
//                                    PATH+'/e19/testCardOrderAuditAction.json?method=qryAuditHistory',
//                                    param,
//                                    function(response){
//                                        var ro = response.rows;
//                                        if(ro&&ro.length!=0){
//                                            for(var i=0;i<ro.length;i++){
//                                               Ext.getCmp('auditHisList').getStore().add(new Ext.data.Record(ro[i]));//填充审批历史
//                                            }
//                                        }
//                                    }
//                            );
                        
//                        if(flag==3){//审核
////                          Ext.getCmp("executeBut").hide();
//                            
//                        }
//                        if(flag==2){//执行
//                            Ext.getCmp("auditResultt").hide();
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写执行意见");
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
//                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
//                        }
//                        if(flag==4){//接收
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写接收意见");
//                            Ext.getCmp("auditResultt").hide();
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
//                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
//                        }
//                        if(flag==0){//详情
//                            var buts = Ext.getCmp("detailWin").buttons;
//                            for(var i=0;i<buts.length;i++){
//                               if(buts[i].id==null||(buts[i].id!="close")){
//                                   buts[i].hide();
//                               }
//                            }
//                            Ext.getCmp("approveOpinionEditPanel").hide();
//                        }
                    }
            );
            
            
            
            
//                this.initWindow(a[0]);
//                window.showModalDialog(PATH+'/e19/testCardOrderDetail.jsp', ob, "dialogWidth=700px;dialogHeight=700px");
                
        }
        
        this.showWinMyUndoTaskUnify = function(flag,cardSheetId){
        	haveLoad = 0;
        	var retPanel = null;
            var ob = new Object();
//                ob.cardSheetId = cardSheetId;
//                ob.detailOnly = 1;
            var param  = new Object();
            if(flag=="add"){
                var dat = new Object();
                dat.data = new Object();
                var dd = new Object();
                dd.localeId = session.logonAccount.provinceCompanyId;
                dd.companyName = session.logonAccount.userDeptName;
                dd.companyId = session.logonAccount.cloudOrgId;
                dd.createdBy = session.logonAccount.cloudUserId;
                dd.createdByName = session.logonAccount.userEmpNam;
                dd.sheetSerialNumber = new Date().getTime();
                dd.woStatusEnumId = 1;
                dd.currentNode = 1;
                
                var d = new Date();
                var dateStr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
            
                dd.creationDate = dateStr;
                dd.dispatchDate = dateStr;
                dat.data = dd;
                applyAndmodWin.initWindow(dd,flag);
                return;
            }
            
            
            
            if(cardSheetId!=null){
                param.cardSheetId = cardSheetId;
                cardSheetIdGlo = cardSheetId;
            }else{
                Ext.Msg.alert("提示","请输入工单ID！");
                return;
            }
//            var a = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            
//            param.cardSheetId = a[0].data.cardSheetId;
            
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardOrderApplyAction.json?method=qryAtestCardOrder',
                    param,
                    function(response){
                        retPanel = applyAndmodWin.initWindowMyUndoTaskUnify(response.rows[0],flag);
                        testCardOrderModityCardOperationTypeEnumId = response.rows[0].cardOperationTypeEnumId;
                        applyAndmodWin.controlTestCardList(response.rows[0].cardOperationTypeEnumId);
//                        if(response.rows[0].sheetType==3){
//                           Ext.getCmp('testCardListTR').hide();
//                        }else{
                               ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderApplyAction.json?method=qryAtestCardOrderTestCard',
                                    param,
                                    function(response){
                                        var ro = response.rows;
                                        for(var i=0;i<ro.length;i++){
                                           Ext.getCmp('testCardList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡列表
                                        }
                                    }
                            );
                            
                            if(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3"){//调拨和移交和借用流程修改草稿时如果有执行对象就查询调度表加载执行对象
                                var ob = new Object();
                                ob.workOrderId = cardSheetId;
                                ob.activityId=0;
                                ob.taskId = 0; 
                                var retOb = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryDisAssignObjectListByParam',ob);
                                if(retOb.total!=0){
                                    var disAssignObjectList = retOb.rows;
                                    for(var i=0;i<disAssignObjectList.length;i++){
                                        if(disAssignObjectList[i].disAssignObjectTypeEnumId==1){//1表示组织
                                            Ext.getCmp('executeDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
                                            Ext.getCmp('executeDepartmentName').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            if(flag==3&&response.rows[0].cardOperationTypeEnumId=="1"){
//                                            Ext.getCmp('auditResultExecuteDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
//                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            }
                                        }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员
                                            Ext.getCmp('executePersonId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('executeDepartmentName').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            if(flag==3&&response.rows[0].cardOperationTypeEnumId=="1"){
//                                            Ext.getCmp('auditResultExecutePersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
//                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
//                                            }
                                        }
                                    }
                                    
                                    
                                }
                                
                                
                       }
                       
                       if(response.rows[0].cardOperationTypeEnumId=="3"){//借用流程 还要填充本部门审核对象 用-1表示
                                    var ob = new Object();
                                    ob.workOrderId = cardSheetId;
                                    ob.activityId=-1;
                                    ob.taskId = -1; 
                                    var retOb = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryDisAssignObjectListByParam',ob);
                                    if(retOb.total!=0){
                                        var disAssignObjectList = retOb.rows;
                                        for(var i=0;i<disAssignObjectList.length;i++){
                                            if(disAssignObjectList[i].disAssignObjectTypeEnumId==1){//1表示组织
                                                Ext.getCmp('auditMyDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
                                                Ext.getCmp('auditMyDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员
                                                Ext.getCmp('auditMyPersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
                                                Ext.getCmp('auditMyDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }
                                        }
                                        
                                        
                                    }
                                }
//                        }
                        
//                        ZTESOFT.invokeAction(
//                                    PATH+'/e19/testCardOrderAuditAction.json?method=qryAuditHistory',
//                                    param,
//                                    function(response){
//                                        var ro = response.rows;
//                                        if(ro&&ro.length!=0){
//                                            for(var i=0;i<ro.length;i++){
//                                               Ext.getCmp('auditHisList').getStore().add(new Ext.data.Record(ro[i]));//填充审批历史
//                                            }
//                                        }
//                                    }
//                            );
                        
//                        if(flag==3){//审核
////                          Ext.getCmp("executeBut").hide();
//                            
//                        }
//                        if(flag==2){//执行
//                            Ext.getCmp("auditResultt").hide();
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写执行意见");
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
//                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
//                        }
//                        if(flag==4){//接收
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写接收意见");
//                            Ext.getCmp("auditResultt").hide();
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
//                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
//                        }
//                        if(flag==0){//详情
//                            var buts = Ext.getCmp("detailWin").buttons;
//                            for(var i=0;i<buts.length;i++){
//                               if(buts[i].id==null||(buts[i].id!="close")){
//                                   buts[i].hide();
//                               }
//                            }
//                            Ext.getCmp("approveOpinionEditPanel").hide();
//                        }

                        return retPanel;
                    }
            );
            
            
            
            
//                this.initWindow(a[0]);
//                window.showModalDialog(PATH+'/e19/testCardOrderDetail.jsp', ob, "dialogWidth=700px;dialogHeight=700px");
                
            
        }
        
        this.controlTestCardList = function(val){
        	
        	if(val==1){//调拨，修改执行对象为执行部门
               Ext.getCmp('testCardOrderModifyExecutorLabel').update('<font color="red">*</font>执行部门');
            }else{
               Ext.getCmp('testCardOrderModifyExecutorLabel').update('<font color="red">*</font>执行对象');
            }
        	
        	if(val==1){//调拨
               onlyShowMyProvince = 0;
               testCardOrderModifyProcessModelName = "com.unicom.ucloud.eom.e19.allot";
            }else if(val==2){//移交
               onlyShowMyProvince = 1;
               testCardOrderModifyProcessModelName = "com.unicom.ucloud.eom.e19.transfer";
            }else if(val==3){//借用
               onlyShowMyProvince = 1;
               testCardOrderModifyProcessModelName = "com.unicom.ucloud.eom.e19.lend";
            }else if(val==4){//归还
               onlyShowMyProvince = 1;
               testCardOrderModifyProcessModelName = "com.unicom.ucloud.eom.e19.return";
            }else if(val==5){//报废
               onlyShowMyProvince = 1;
               testCardOrderModifyProcessModelName = "com.unicom.ucloud.eom.e19.dumping";
            }else if(val==6){//清查
               onlyShowMyProvince = 1;
               testCardOrderModifyProcessModelName = "com.unicom.ucloud.eom.e19.check";
            }
        	
            if(val==3){//代表借用
                  Ext.getCmp('testCardListTR').hide();
                  Ext.getCmp('testCardListTR2').hide();
                  Ext.getCmp('expectedReturnTimeTR').show();
                  Ext.getCmp('expectedReturnTimeTR2').show();
                  Ext.getCmp('checkEditgrid').hide();
                }else if(val==6){//清查
                    Ext.getCmp('testCardListTR').hide();
                    Ext.getCmp('testCardListTR2').hide();
                    Ext.getCmp('expectedReturnTimeTR').hide();   
                    Ext.getCmp('expectedReturnTimeTR2').hide();  
                    Ext.getCmp('executeDepartmentIdTR').hide();  
                    Ext.getCmp('executeDepartmentIdTR2').hide();  
//                    Ext.getCmp('executePersonIdTR').hide();  
//                    Ext.getCmp('executePersonIdTR2').hide();  
                    Ext.getCmp('executeDepartmentName').allowBlank = true;
                    
                    if(Ext.getCmp('checkGrid')!=null){
                        var a = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
                        for(var i=0;i<a.length;i++){
                                Ext.getCmp('checkEditgrid').getStore().add(new Ext.data.Record(a[i].data)); 
                                testCardChecktestobjectType = a[i].data.testobjectType;
                        }
                    }else{
                        var data = new Object();
                        data.cardSheetId = cardSheetIdGlo;
                        ZTESOFT.invokeAction(
                                    PATH+'/e19/eomCardCheckAction.json?method=qryEomCardCheckList',
                                    data,
                                    function(response){
                                        var ro = response.rows;
                                        for(var i=0;i<ro.length;i++){
                                           Ext.getCmp('checkEditgrid').getStore().add(new Ext.data.Record(ro[i]));//填充清查记录列表
                                           testCardChecktestobjectType = ro[0].testobjectType;
                                        }
                                    }
                            );
                    }
                }else{
                  Ext.getCmp('testCardListTR').show();
                  Ext.getCmp('testCardListTR2').show();
                  Ext.getCmp('checkEditgrid').hide();
                  Ext.getCmp('expectedReturnTimeTR').hide();
                  Ext.getCmp('expectedReturnTimeTR2').hide();
                }
                
                if(val==4){ //归还
                    Ext.getCmp('auditDepartmentIdTR').hide();  
                    Ext.getCmp('auditDepartmentIdTR2').hide();  
//                    Ext.getCmp('auditPersonIdTR').hide();  
//                    Ext.getCmp('auditPersonIdTR2').hide();  
                    Ext.getCmp('auditDepartmentName').allowBlank = true;
                    
//                    Ext.getCmp('executePersonIdTR').show();  
//                    Ext.getCmp('executePersonIdTR2').show();  
                    Ext.getCmp('executeDepartmentIdTR').show();  
                    Ext.getCmp('executeDepartmentIdTR2').show();  
                    Ext.getCmp('executeDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
                }else if(val==5||val==6){//报废 清查
//                    Ext.getCmp('executePersonIdTR').hide();  
//                    Ext.getCmp('executePersonIdTR2').hide();  
                    Ext.getCmp('executeDepartmentIdTR').hide();  
                    Ext.getCmp('executeDepartmentIdTR2').hide();  
                    Ext.getCmp('executeDepartmentName').allowBlank = true;
                    
                    Ext.getCmp('auditDepartmentIdTR').show();  
                    Ext.getCmp('auditDepartmentIdTR2').show();  
//                    Ext.getCmp('auditPersonIdTR').show();  
//                    Ext.getCmp('auditPersonIdTR2').show();  
                    Ext.getCmp('auditDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
                }else if(val==2||val==1){//移交 调拨
//                    Ext.getCmp('executePersonIdTR').hide();  
//                    Ext.getCmp('executePersonIdTR2').hide();  
                    Ext.getCmp('executeDepartmentIdTR').show();  
                    Ext.getCmp('executeDepartmentIdTR2').show();  
                    Ext.getCmp('executeDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditDepartmentIdTR').show();  
                    Ext.getCmp('auditDepartmentIdTR2').show();  
//                    Ext.getCmp('auditPersonIdTR').show();  
//                    Ext.getCmp('auditPersonIdTR2').show();  
                    Ext.getCmp('auditDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
                }else if(val==3){//借用
//                    Ext.getCmp('executePersonIdTR').hide();  
//                    Ext.getCmp('executePersonIdTR2').hide();  
                    Ext.getCmp('executeDepartmentIdTR').show();  
                    Ext.getCmp('executeDepartmentIdTR2').show();  
                    Ext.getCmp('executeDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditDepartmentIdTR').show();  
                    Ext.getCmp('auditDepartmentIdTR2').show();  
//                    Ext.getCmp('auditPersonIdTR').show();  
//                    Ext.getCmp('auditPersonIdTR2').show();  
                    Ext.getCmp('auditDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditMyDepartmentIdTR').show();  
                Ext.getCmp('auditMyDepartmentIdTR2').show(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = false;
                }else{
                    Ext.getCmp('auditDepartmentIdTR').show();  
                    Ext.getCmp('auditDepartmentIdTR2').show();  
//                    Ext.getCmp('auditPersonIdTR').show();  
//                    Ext.getCmp('auditPersonIdTR2').show();  
                    Ext.getCmp('auditDepartmentName').allowBlank = false;
                    
//                    Ext.getCmp('executePersonIdTR').show();  
//                    Ext.getCmp('executePersonIdTR2').show();  
                    Ext.getCmp('executeDepartmentIdTR').show();  
                    Ext.getCmp('executeDepartmentIdTR2').show();  
                    Ext.getCmp('executeDepartmentName').allowBlank = false;
                    
                    Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
                }
        }
        
        this.initFormPanel = function(){
            var infoPage = new Ext.FormPanel({
                id:'infoPage',
//                region: 'north',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'申请信息',
                width:testCardOrderModifyWidth*4+20+20+10,//Ext.getBody().getSize(),
//                height:200,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
//                labelWidth: 70,
                layoutConfig : {
                            columns : 2 * 2
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : testCardOrderModifyWidth,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单流水号'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderModifyWidth*3,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
//                                            fieldLabel:'工单流水号',
                                            hideLabel : true,
                                            name:'sheetSerialNumber',
                                            id: 'sheetSerialNumber',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '归属地'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel: '归属地',
                                            name: 'localeName',
                                            id: 'localeName',
                                            readOnly:true,
                                            anchor:'100%'
                                        },{
                                            xtype:'hidden',
                                            name: 'localeId',
                                            id: 'localeId'
                                        },{
                                            xtype:'hidden',
                                            name: 'cardSheetId',
                                            id: 'cardSheetId'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '单位名称'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel: '单位名称',
                                            name: 'companyName',
                                            id: 'companyName',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建单人'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel:'建单人',
                                            name:'createdByName',
                                            id: 'createdByName',
                                            readOnly:true,
                                            anchor:'100%'
                                        },{
                                            xtype:'hidden',
                                            name: 'createdBy',
                                            id: 'createdBy'
                                        }
                                    ]
                                },
                                
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单状态'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel: '工单状态',
                                            name: 'sheetStatusName',//'woStatusEnumId',
                                            id: 'sheetStatusName',//'woStatusEnumId',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建单时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel: '建单时间',
                                            name: 'creationDate',
                                            id: 'creationDate',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '派单时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
            //                                fieldLabel: '派单时间',
                                            name: 'dispatchDate',
                                            id: 'dispatchDate',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>工单类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.combofield',
                                            hideLabel : true,
//                                fieldLabel: '<font color="red">*</font>工单类型',
                                name: 'cardOperationTypeEnumId',
                                id: 'cardOperationTypeEnumId',
                                valueField: 'value',
                                displayField: 'text',
                                mode: 'local',
                                triggerAction: 'all',
                                blankText:'请选择工单类型!',
                                disabled:true,
                                allowBlank: false,
                                store: this.sheetTypeStore,
                                listeners:{
                                      'select':function(me,newValue,oldValue){
                                           var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
                                           applyAndmodWin.controlTestCardList(a);   
                                      }
                            
                              },
                                anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>缓急程度'
                                    }
                                },{
                                    colspan : 1,
                                    items : {                            
                                         xtype: 'ZTESOFT.enum',
                                        hideLabel : true,
//                                         fieldLabel : '工单状态',
                                         name : 'urgencyLevel',
                                         id : 'urgencyLevel',
                                         valueField: 'dataValue',
                                         displayField: 'dataName',
                                         allowBlank: false,
                                         blankText:'请选择工单缓急程度!',
                                         mode: 'local',
                                         typeAhead : true,
                                         triggerAction: 'all',
                                         editable : false ,
                                         dict: true,
                                         dictType:'URGENCY_LEVEL',
                                         value: modifyUrgencyLevelId,
                                         anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>建议完成时间'
                                    }
                                },{
                                	colspan : 3,
                                    width:testCardOrderModifyWidth*3,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.datefield',
                                            hideLabel : true,
//                                fieldLabel: '<font color="red">*</font>建议完成时间',
                                name: 'requiredFinishTime',
                                id: 'requiredFinishTime',
                                format:'Y-m-d h:i:s',
                                editable : false ,
                                blankText:'建议完成时间不能为空!',
                                allowBlank: false,
                                anchor:'100%'
                                      }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    id:"auditMyDepartmentIdTR",
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>本部门审核对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderModifyWidth*3,
                                    id:"auditMyDepartmentIdTR2",
                                    items : [{
                                        xtype:'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id: 'auditMyDepartment',
                                        name: 'auditMyDepartment',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
                                        blankText:'本部门审核单位不能为空!',
                                        allowBlank: false,
                                        valueFile : 'auditMyDepartmentId',
//                                        editable : false ,
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                        	applyAndmodWin.selectDep('auditMy');
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'auditMyDepartmentId',
                                        id: 'auditMyDepartmentId'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditMyPersonId',
                                        id: 'auditMyPersonId'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditMyPersonAccountId',
                                        id: 'auditMyPersonAccountId'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditMyPerson',
                                        id: 'auditMyPerson'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditMyThisType',
                                        id: 'auditMyThisType'
                                      }]
                                },
                                {
                                    colspan : 1,
                                    id:"auditDepartmentIdTR",
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>审核对象'
                                    }
                                },
                                	{
                                    colspan : 3,
                                    width:testCardOrderModifyWidth*3,
                                    id:"auditDepartmentIdTR2",
                                    items : [
                                        {
                                            xtype:'ZTESOFT.popupfield',
                                            hideLabel : true,
                                        id: 'auditDepartmentName',
                                        name: 'auditDepartmentName',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
                                        blankText:'审核单位不能为空!',
                                        allowBlank: false,
                                        valueFile : 'auditDepartmentId',
//                                        editable : false ,
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                                applyAndmodWin.selectDep('audit');
                                        }
                                        },
                                        {
                                        xtype:'hidden',
                                        name: 'auditDepartmentId',
                                        id: 'auditDepartmentId'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditPersonId',
                                        id: 'auditPersonId'
                                      },
                                        {
                                        xtype:'hidden',
                                        name: 'auditPersonAccountId',
                                        id: 'auditPersonAccountId'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditPersonName',
                                        id: 'auditPersonName'
                                      },{
                                        xtype:'hidden',
                                        name: 'auditThisType',
                                        id: 'auditThisType'
                                      }
                                    ]
                                },
//                                {
//                                    colspan : 1,
//                                    id:"auditPersonIdTR",
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '审核人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    id:"auditPersonIdTR2",
//                                    items : [
//                                        {
//                                            xtype:'ZTESOFT.popupfield',
//                                            hideLabel : true,
//                                        id: 'auditPersonName',
//                                        name: 'auditPersonName',
////                                        fieldLabel : '审核人',
//                                        valueFile : 'auditPersonId',
//                                        readOnly: true,
////                                        editable : false ,
//                                        anchor : '100%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                applyAndmodWin.selectPer('auditPerson');
//                                        }
//                                        },
//                                        {
//                                        xtype:'hidden',
//                                        name: 'auditPersonId',
//                                        id: 'auditPersonId'
//                                      },
//                                        {
//                                        xtype:'hidden',
//                                        name: 'auditPersonAccountId',
//                                        id: 'auditPersonAccountId'
//                                      }
//                                    ]
//                                },
                                {
                                    colspan : 1,
                                    id:"executeDepartmentIdTR",
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        id:'testCardOrderModifyExecutorLabel',
                                        html : '<font color="red">*</font>执行对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderModifyWidth*3,
                                    id:"executeDepartmentIdTR2",
                                    items : [
                                        {
                                            xtype:'ZTESOFT.popupfield',
                                            hideLabel : true,
                                        id: 'executeDepartmentName',
                                        name: 'executeDepartmentName',
//                                        fieldLabel : '<font color="red">*</font>执行单位',
                                        blankText:'执行单位不能为空!',
                                        allowBlank: false,
//                                        editable : false ,
                                        valueFile : 'executeDepartmentId',
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                                applyAndmodWin.selectDep('execute');
                                        }
                                        },
                                        {
                                        xtype:'hidden',
                                        name: 'executeDepartmentId',
                                        id: 'executeDepartmentId'
                                      },
                                      {
                                        xtype:'hidden',
                                        name: 'executePersonId',
                                        id: 'executePersonId'
                                      },
                                        {
                                        xtype:'hidden',
                                        name: 'executePersonAccountId',
                                        id: 'executePersonAccountId'
                                      },{
                                        xtype:'hidden',
                                        name: 'executePersonName',
                                        id: 'executePersonName'
                                      },{
                                        xtype:'hidden',
                                        name: 'executeThisType',
                                        id: 'executeThisType'
                                      }
                                    ]
                                },
//                                {
//                                    colspan : 1,
//                                    id:"executePersonIdTR",
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '执行人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    id:"executePersonIdTR2",
//                                    items : [
//                                        {
//                                            xtype:'ZTESOFT.popupfield',
//                                            hideLabel : true,
//                                        id: 'executePersonName',
//                                        name: 'executePersonName',
////                                        fieldLabel : '执行人',
////                                        editable : false ,
//                                        valueFile : 'executePersonId',
//                                        readOnly: true,
//                                        anchor : '100%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                applyAndmodWin.selectPer('executePerson');
//                                        }
//                                        },
//                                        {
//                                        xtype:'hidden',
//                                        name: 'executePersonId',
//                                        id: 'executePersonId'
//                                      },
//                                        {
//                                        xtype:'hidden',
//                                        name: 'executePersonAccountId',
//                                        id: 'executePersonAccountId'
//                                      }
//                                    ]
//                                },
                                
                                {
                                    colspan : 1,
                                    id:'expectedReturnTimeTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>预计归还时间'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderModifyWidth*3,
                                    id:'expectedReturnTimeTR2',
                                    items : [
                                        {
                                            xtype:'ZTESOFT.datefield',
                                            hideLabel : true,
//                                fieldLabel: '<font color="red">*</font>预计归还时间',
                                name: 'expectedReturnTime',
                                id: 'expectedReturnTime',
                                format:'Y-m-d h:i:s',
                                editable : false ,
//                                allowBlank: false,
                                blankText:'预计归还时间不能为空!',
                                anchor:'100%'
                                      }
                                    ]
                                }
                ]
//                items: [{
//                    layout:'column',
//                    items:[
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '归属地',
//                                name: 'localeId',
//                                id: 'localeId',
//                                readOnly:true,
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'cardSheetId',
//                                id: 'cardSheetId'
//                            }]
//                        }
//                        ,
//                        {
//                         columnWidth:.3,
//                         layout: 'form',
//                         items: [{
//                                xtype:'textfield',
//                                fieldLabel: '单位名称',
//                                name: 'companyName',
//                                id: 'companyName',
//                                readOnly:true,
//                                anchor:'95%'
//                           }]
//                        },
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel:'建单人',
//                                name:'createdByName',
//                                id: 'createdByName',
//                                readOnly:true,
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'createdBy',
//                                id: 'createdBy'
//                            }]
//                        },
//                            
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel:'工单流水号',
//                                name:'sheetSerialNumber',
//                                id: 'sheetSerialNumber',
//                                readOnly:true,
//                                anchor:'95%'
//                            }]
//                        },
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '工单状态',
//                                name: 'sheetStatusName',//'woStatusEnumId',
//                                id: 'sheetStatusName',//'woStatusEnumId',
//                                readOnly:true,
//                                anchor:'95%'
//                            }
////                            ,{
////                                xtype:'hidden',
////                                name: 'sheetStatus',
////                                id: 'sheetStatus'
////                            }
//                            ]
//                        },
////                          {
////                        columnWidth:.3,
////                        layout: 'form',
////                        items: [{
////                                xtype:'textfield',
////                                fieldLabel: '当前环节',
////                                name: 'currentNode',
////                                id: 'currentNode',
////                                readOnly:true,
////                                anchor:'95%'
////                            }
//////                            ,{
//////                                xtype:'hidden',
//////                                name: 'currentNode',
//////                                id: 'currentNode'
//////                            }
////                            ]
////                        }
////                        ,
//                        
//                            {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '建单时间',
//                                name: 'creationDate',
//                                id: 'creationDate',
//                                readOnly:true,
//                                anchor:'95%'
//                            }]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '派单时间',
//                                name: 'dispatchDate',
//                                id: 'dispatchDate',
//                                readOnly:true,
//                                anchor:'95%'
//                            }]
//                        }
//                        ,
//                            {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'combo',
//                                fieldLabel: '<font color="red">*</font>工单类型',
//                                name: 'cardOperationTypeEnumId',
//                                id: 'cardOperationTypeEnumId',
//                                valueField: 'value',
//                                displayField: 'text',
//                                mode: 'local',
//                                triggerAction: 'all',
//                                blankText:'请选择工单类型!',
//                                disabled:true,
//                                allowBlank: false,
//                                store: this.sheetTypeStore,
//                                listeners:{
//                                      'select':function(me,newValue,oldValue){
//                                           var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
//                                           applyAndmodWin.controlTestCardList(a);   
//                                      }
//                            
//                              },
//                                anchor:'95%'
//                            }]
//                        }
//                        
//                        ,{
//                        columnWidth:.3,
//                        layout: 'form',
//                        id:"auditDepartmentIdTR",
//                        items: [
////                          {
////                                xtype:'textfield',
////                                fieldLabel: '<font color="red">*</font>审核单位',
////                                name: 'auditDepartmentId',
////                                id: 'auditDepartmentId',
////                                blankText:'审核单位不能为空!',
////                                allowBlank: false,
////                                anchor:'95%'
////                            },
//                    new ZTESOFT.Popup({
//                                        id: 'auditDepartmentName',
//                                        name: 'auditDepartmentName',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
//                                        blankText:'审核单位不能为空!',
//                                        allowBlank: false,
//                                        valueFile : 'auditDepartmentId',
////                                        editable : false ,
//                                        readOnly: true,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                applyAndmodWin.selectDep('auditDepartment');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'auditDepartmentId',
//                                        id: 'auditDepartmentId'
//                                      }
//                       ]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        id:"auditPersonIdTR",
//                        items: [
////                          {
////                                xtype:'textfield',
////                                fieldLabel: '审核人',
////                                name: 'auditPersonId',
////                                id: 'auditPersonId',
////                                blankText:'审核人不能为空!',
////                                anchor:'95%'
////                            }
//                            new ZTESOFT.Popup({
//                                        id: 'auditPersonName',
//                                        name: 'auditPersonName',
//                                        fieldLabel : '审核人',
//                                        valueFile : 'auditPersonId',
//                                        readOnly: true,
////                                        editable : false ,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                applyAndmodWin.selectPer('auditPerson');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'auditPersonId',
//                                        id: 'auditPersonId'
//                                      }]
//                        }
//                        
//                        
//                        
//                        ,
//                        
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        id:"executeDepartmentIdTR",
//                        items: [
////                          {
////                                xtype:'textfield',
////                                fieldLabel: '<font color="red">*</font>执行单位',
////                                name: 'executeDepartmentId',
////                                id: 'executeDepartmentId',
////                                blankText:'执行单位不能为空!',
////                                allowBlank: false,
////                                anchor:'95%'
////                            }
//                            new ZTESOFT.Popup({
//                                        id: 'executeDepartmentName',
//                                        name: 'executeDepartmentName',
//                                        fieldLabel : '<font color="red">*</font>执行单位',
//                                        blankText:'执行单位不能为空!',
//                                        allowBlank: false,
////                                        editable : false ,
//                                        valueFile : 'executeDepartmentId',
//                                        readOnly: true,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                applyAndmodWin.selectDep('executeDepartment');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'executeDepartmentId',
//                                        id: 'executeDepartmentId'
//                                      }]
//                        }
//                        ,{
//                        columnWidth:.3,
//                        layout: 'form',
//                        id:"executePersonIdTR",
//                        items: [
////                          {
////                                xtype:'textfield',
////                                fieldLabel: '执行人',
////                                name: 'executePersonId',
////                                id: 'executePersonId',
////                                blankText:'执行人不能为空!',
////                                anchor:'95%'
////                            }
//                            new ZTESOFT.Popup({
//                                        id: 'executePersonName',
//                                        name: 'executePersonName',
//                                        fieldLabel : '执行人',
////                                        editable : false ,
//                                        valueFile : 'executePersonId',
//                                        readOnly: true,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                applyAndmodWin.selectPer('executePerson');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'executePersonId',
//                                        id: 'executePersonId'
//                                      }
//                            ]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'datetimefield',
//                                fieldLabel: '<font color="red">*</font>建议完成时间',
//                                name: 'requiredFinishTime',
//                                id: 'requiredFinishTime',
//                                format:'Y-m-d h:i:s',
//                                editable : false ,
//                                blankText:'建议完成时间不能为空!',
//                                allowBlank: false,
//                                anchor:'95%'
//                            }]
//                        }
//                          ,{
//                        columnWidth:.3,
//                        layout: 'form',
//                        id:'expectedReturnTimeTR',
//                        items: [{
//                                xtype:'datetimefield',
//                                fieldLabel: '<font color="red">*</font>预计归还时间',
//                                name: 'expectedReturnTime',
//                                id: 'expectedReturnTime',
//                                format:'Y-m-d h:i:s',
//                                editable : false ,
////                                allowBlank: false,
//                                blankText:'预计归还时间不能为空!',
//                                anchor:'95%'
//                            }]
//                        }
//                   ]}
//            ]
                
                });
            return infoPage;
        }
        
        this.getRoleIdList = function(){
            var roleIDArray = new Array();
            var processModelName = testCardOrderModifyProcessModelName;
            var abstractRoleId = "";
            
            //获取流程挂接后的模板名称
            var param = new Object();
            /*param.modelId = 'E18';
            param.businessCode = 'E183';
            param.orgCode = session.logonAccount.provinceCompanyId;
            url = PATH+ '/commondata/commonDataAction.json?method=findProcessModel';
            response = ZTESOFT.Synchronize(url,param);
            if(response && response.length && response.length > 0){
                processModelName = response[0].templateId;
            }*/
            
            //通过模板名称和起始环节获取下一个环节的抽象角色ID
            param = new Object();
            param.accountId = session.logonAccount.accountId;
            param.processModelId = processModelName;
            param.activityDefId = 'ApplyActivity';//每个流程的起始环节
    
            url = PATH+ '/e19/tcmBpsAction.json?method=qryActivityExtendAttributes';
            response = ZTESOFT.Synchronize(url,param);
            if(response && response.length && response.length > 0){
                abstractRoleId = response[0].value;
            }
            
            //通过5个维度查询对应的角色列表
            param = new Object();
            param.roleclass = abstractRoleId;
            param.orgId = session.logonAccount.cloudOrgId;
            url = PATH+ '/commonData/proxy4AUserAndOrg/findRoleListByDimensions.json?method=POST';
            response = ZTESOFT.Synchronize(url,param);
            if(response && response.length && response.length > 0){
                for(var i=0;i<response.length;i++){
                    roleIDArray.push(response[i].roleCloudRoleId);
                }
            }
            return roleIDArray;
        }
        
        //选择单位
        this.selectDep = function(val){
        	
        	if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==1){//调拨流程 执行对象，用组织派发树,只能派组织

//                TreeOper.singleOrgTree({
//                                    onComplete: function(id,text,data){
//                                        Ext.getCmp(val+"DepartmentName").setValue(text);
//                                        Ext.getCmp(val+"DepartmentId").setValue(id);
//                                        Ext.getCmp(val+"ThisType").setValue("Org");
//                                    }
//                                });return;
                                
                                        var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeObj = {
                                            isSearchBox:0
                                        };
                                        var freeTreeObj = new FreeTreeObj("alot"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"COMPANY",freeObj);
                                        freeTreeObj.showTree(function(data){
                                            Ext.getCmp(val+"DepartmentName").setValue(data.text);
                                        Ext.getCmp(val+"DepartmentId").setValue(data.id);
                                        Ext.getCmp(val+"ThisType").setValue("Org");
                                            
//                                            Ext.getCmp('testStorageCityName').setValue(data.text);
//                                            Ext.getCmp('testStorageCityId').setValue(data.id);
                                            });return;

            }
        	
        	var inputName = val+"DepartmentName,"+val+"DepartmentId,"+val+"PersonId,"+val+"PersonAccountId,"+val+"ThisType";
        	
        	if(val=="auditMy"){//借用流程 本部门审核对象独有的一套id
        	   inputName = val+"Department,"+val+"DepartmentId,"+val+"PersonId,"+val+"PersonAccountId,"+val+"ThisType";
        	}
        	
            var requestData = "text,id,id,accountId,thisType";
            var isUseful = [1,0,0];
            var _nodeRelationType="noRelation";
            var _isOnlyLeaf="0";
            var _inputType="radio";
            var _orgId = session.logonAccount.provinceCompanyId;//session.org.cloudOrgId;
            
            if(Ext.getCmp("cardOperationTypeEnumId").getValue()==1&&val=="execute"){
                _orgId = null;
            }
            
            //alert(_orgId);
            /*
            *树对象有6个配置参数，1、2个为必输项，其余4个为选填，如果填请按照顺序配置

            *第1个参数--字符串，用逗号截开，控件名称

            *第2个参数--字符串，orgId,null表示整个联通集团，传入组织id表示该组织以下人员或组织
            *第3个参数--字符串，用逗号截开，对应树节点属性

            *第4个参数--数组：配置派发、送审、抄送按钮，用数组表示，1代表启用，0代表不启用

            *第5个参数--字符串，hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
            *第6个参数--字符串，是否联动：1代表只回传叶子节点，0代表回传父子节点
            *第7个参数--字符串，输入类型：checkbox代表复选框，radio代表单选框
            */
//            var tree = new DeepTreeObj(inputName,requestData,val+"DeepTreeObj",_orgId,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType);
//            
//            tree.showTree(deeptreeUrl);
            
            
            //过滤派发树↓
            var _qryType="assignTree";
            var _cloudUserId =  session.logonAccount.cloudUserId;
            var _roleArray =  applyAndmodWin.getRoleIdList();//角色列表
            var _treeType =  3;//1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
            if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==4){
            	var _treeType =  2;
            }
            
            if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==1){//调拨流程选择接收人的派发树过滤
                //通过5个维度查询对应的角色列表
                var param = new Object();
                param.roleclass = 10016;//接收人的环节抽象角色Id
                param.orgId = session.logonAccount.cloudOrgId;
                url = PATH+ '/commonData/proxy4AUserAndOrg/findRoleListByDimensions.json?method=POST';
                response = ZTESOFT.Synchronize(url,param);
                var roleIDArray = new Array();
                if(response && response.length && response.length > 0){
                    for(var i=0;i<response.length;i++){
                        roleIDArray.push(response[i].roleCloudRoleId);
                    }
                }
                _roleArray = roleIDArray;
                _treeType = 4;//由于接收人是可以跨省的
            }
            if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==2){//移交流程选择接收人的派发树过滤
                //通过5个维度查询对应的角色列表
                var param = new Object();
                param.roleclass = 10018;//接收人的环节抽象角色Id
                param.orgId = session.logonAccount.cloudOrgId;
                url = PATH+ '/commonData/proxy4AUserAndOrg/findRoleListByDimensions.json?method=POST';
                response = ZTESOFT.Synchronize(url,param);
                var roleIDArray = new Array();
                if(response && response.length && response.length > 0){
                    for(var i=0;i<response.length;i++){
                        roleIDArray.push(response[i].roleCloudRoleId);
                    }
                }
                _roleArray = roleIDArray;
                _treeType = 2;//由于接收人是省内的
            }
            if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==3){//借用流程选择执行人的派发树过滤
                //通过5个维度查询对应的角色列表
                var param = new Object();
                param.roleclass = 10020;//执行人的环节抽象角色Id
                param.orgId = session.logonAccount.cloudOrgId;
                url = PATH+ '/commonData/proxy4AUserAndOrg/findRoleListByDimensions.json?method=POST';
                response = ZTESOFT.Synchronize(url,param);
                var roleIDArray = new Array();
                if(response && response.length && response.length > 0){
                    for(var i=0;i<response.length;i++){
                        roleIDArray.push(response[i].roleCloudRoleId);
                    }
                }
                _roleArray = roleIDArray;
                _treeType = 2;//由于接收人是省内的
            }
            if(val=="audit"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==3){//借用流程选择审核对象的派发树过滤

                //通过5个维度查询对应的角色列表
                var param = new Object();
                param.roleclass = 10021;//审核人的环节抽象角色Id
                param.orgId = session.logonAccount.cloudOrgId;
                url = PATH+ '/commonData/proxy4AUserAndOrg/findRoleListByDimensions.json?method=POST';
                response = ZTESOFT.Synchronize(url,param);
                var roleIDArray = new Array();
                if(response && response.length && response.length > 0){
                    for(var i=0;i<response.length;i++){
                        roleIDArray.push(response[i].roleCloudRoleId);
                    }
                }
                _roleArray = roleIDArray;
                _treeType = 2;//由于接收人是省内的

            }
            
            var searchObject = {
                                    fuzzySearchType : 0//前台（0）或后台（1）查询，默认为0
                            };
            
            var tree = new DeepTreeObj(inputName,requestData,val+"DeepTreeObj"+new Date().getTime(),_orgId,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType,searchObject,_qryType,_cloudUserId,_roleArray,_treeType);
            tree.showTree(deeptreeUrl);
            //过滤派发树↑
                                
//            TreeOper.orgAndUserByCon({
//                parentId:'1',
//                parentName:'联通',
//                singleSelect:true,
//                onComplete: function(id,text,data){
//                    if(data.leaf==0){//说明是组织
//                        Ext.getCmp(val+"DepartmentId").setValue(id);
//                        Ext.getCmp(val+"DepartmentName").setValue(text);
//                        Ext.getCmp(val+"PersonAccountId").setValue("");
//                        Ext.getCmp(val+"PersonId").setValue("");
////                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                    }else{//说明是人员
//                        Ext.getCmp(val+"PersonId").setValue(id);
//                        Ext.getCmp(val+"PersonAccountId").setValue(data.accountId);
//                        Ext.getCmp(val+"DepartmentId").setValue("");
//                        Ext.getCmp(val+"DepartmentName").setValue(text);
////                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                    }
//                    
//                }
//            });
        	
        }
        
        //选择人
        this.selectPer = function(val){
        	
        	TreeOper.singleUserTree({
                onComplete: function(id,text,data){
                    Ext.getCmp(val+"Id").setValue(id);
                    Ext.getCmp(val+"AccountId").setValue(data.accountId);
                    Ext.getCmp(val+"Name").setValue(text);
                }
            });
            return;
            
            
            var nextActivityInsIdStore = new Ext.data.ArrayStore({
                fields: ['value','text'],
                data:[
                    ['','请选择'],
                    ['1','送会签部门负责人'],
                    ['2','送处室负责人'],
                    ['3','送经办人'],
                    ['4','返回承办人']
                ]
            });
            
            
            var nextDealManWin = new Ext.Window({
                id:'nextDealMan',
                title: '选择人员',
                closable:true,
                width: 700,
                height: 300,
                plain:true,
                
                items: [{layout: 'column',
                items:[
//                    {
//                        columnWidth : 1,
//                        layout : 'form',
//                        labelWidth:150,
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '<font color="red">*</font>请选择下一步环节',
//                            name : 'nextActivityInsId',
//                            id : 'nextActivityInsId',
//                            valueField: 'value',
//                            displayField: 'text',
//                            allowBlank:false,
//                            blankText:'请选择下一环节!',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : false ,
//                            value: '',
//                            store: nextActivityInsIdStore,
//                            anchor : '95%'
//                            
//                        }]
//                    },
                        {
                        columnWidth : 1,
                        layout : 'column',
                        labelWidth:150,
                        title: '请选择下一个处理人',
                        height:400,
                        items : [
                            {columnWidth : .2,
                        items : [
                            {
                            xtype: 'treepanel',
                            width: 280,
                            height:400,
                            title:'组织',
                            useArrows:true,
                            autoScroll:true,
                            id:'dep',
                            animate:true,
                            enableDD:true,
                            containerScroll: true,
                            frame: true,
                            root: new Ext.tree.AsyncTreeNode({
                                text: 'To Do', 
                                id:'11',
                                cls: 'folder',
                                leaf:false,
                                children: [{
                                    text: '1',
                                    id:1,
                                    leaf: true,
                                    checked: false
                                },{
                                    text: '2',
                                    id:2,
                                    leaf: true,
                                    checked: false
                                },{
                                    text: '3',
                                    id:3,
                                    leaf: true,
                                    checked: false
                                }]
                            }),
                            rootVisible: false//,
//                            listeners: {
//                                click: function(n) {
//                                    Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
//                                }
//                            }
                        }
                        ]
                        },{columnWidth : .2,
                        items : [
                            {
                            xtype: 'treepanel',
                            width: 280,
                            height:400,
                            title:'人员',
                            useArrows:true,
                            autoScroll:true,
                            id:'selectNextMan',
                            animate:true,
                            enableDD:true,
                            containerScroll: true,
                            frame: true,
                            root: new Ext.tree.AsyncTreeNode({
                                text: 'To Do', 
                                id:'11',
                                cls: 'folder',
                                leaf:false,
                                children: [{
                                    text: '1',
                                    id:1,
                                    leaf: true,
                                    checked: false
                                },{
                                    text: '2',
                                    id:2,
                                    leaf: true,
                                    checked: false
                                },{
                                    text: '3',
                                    id:3,
                                    leaf: true,
                                    checked: false
                                }]
                            }),
                            rootVisible: false//,
//                            listeners: {
//                                click: function(n) {
//                                    Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
//                                }
//                            }
                        }
                        ]
                        },
                            {columnWidth : .2,
                        items : [{
                            xtype: 'form',
                            layout:'column',
                            buttonAlign:'center',
                            items:[
                            {columnWidth : 1,
                            items:[
                            {xtype:'button',
                            text:'>>',
                            listeners: {
                                click: function(n) {
                                    var a = Ext.getCmp("selectNextMan").getChecked();
                                    var b = Ext.getCmp("selectedNextMan").getRootNode();
                                    b.appendChild(a);
//                                    for(var i=0;i<a.length;i++){
//                                        
//                                    }
//                                    alert(a.length);
                                }
                            }
                            }
                            ]
                            },{columnWidth : 1,
                            items:[
                            {xtype:'button',
                            text:'<<<',
                            listeners: {
                                click: function(n) {
                                    var a = Ext.getCmp("selectNextMan").getRootNode();
                                    var b = Ext.getCmp("selectedNextMan").getChecked();
                                    a.appendChild(b);
                                }
                            }
                            }
                            ]
                            }
                            ]
                            
                            
                        }]
                            
                        },{columnWidth : .4,
                        items : [
                            {
                            xtype: 'treepanel',
                            width: 280,
                            title:'已选人员',
                            height:400,
                            useArrows:true,
                            autoScroll:true,
                            id:'selectedNextMan',
                            animate:true,
                            enableDD:true,
                            containerScroll: true,
                            frame: true,
                            root: new Ext.tree.AsyncTreeNode({
                                id:''
                            }),
                            rootVisible: false
                        }]
                            
                        }]
                    }]}
                    ],
                buttonAlign:'center',
                buttons: [
                    {
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        var aaqq = Ext.getCmp("selectedNextMan").getRootNode();
                        if(aaqq.childNodes.length!=1){
                            Ext.Msg.alert("提示","请选择一位人员！");
                            return;
                        }
//                        var ob = new Object();
//                        ob.targetPerson = aaqq.childNodes[0];
//                        ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
//                        alert(Ext.getCmp("nextActivityInsId").getValue());
                        Ext.getCmp(val).setValue(aaqq.childNodes[0].id);
                        nextDealManWin.close();
                    }
                },{
                    text: '取消',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        nextDealManWin.close();
                    }
                }]
            });
            nextDealManWin.show();
            
        
        }
        
        //增加任务提交
        this.addCommit = function(){
            if(!Ext.getCmp('infoPage').getForm().isValid()){
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            ZTESOFT.invokeAction(
                    PATH+'/demo/fun1/demoAction.json?method=save',
                    param,
                    function(response){
                        Ext.Msg.confirm("操作提示","新增成功",function(btn){
                            if(btn=="yes"){
                                Ext.getCmp('detailWin').close();
                                Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                            }
                        });
                    }
            );
            
            
        }
        //修改任务提交
        this.updateCommit = function(rowData){
            if(!Ext.getCmp('infoPage').getForm().isValid()){
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            ZTESOFT.invokeAction(
                    PATH+'/demo/fun1/demoAction.json?method=update',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示', '修改成功');
                    }
            );

        }
        
        this.del = function(dicId){
            
        }
        //修改初始化

        this.initUpdate = function(rowData){
            
//          Ext.getCmp('infoPage').getForm().loadRecord(rowData);
//            var par = new Object();
//            par.cardDictionaryAttrId = rowData.data.cardDictionaryAttrId;
//            ZTESOFT.invokeAction(
//                    PATH+'/e19/testCardDictionaryAttrAction.json?method=qryAtestCardDictionaryAttr',
//                    rowData.data,
//                    function(response){
//                        var rows = response.rows2;
//                        var li = rows.length;
//                        for(var i=0;i<li;i++){
//                           Ext.getCmp('valueListGrid').getStore().add(new Ext.data.Record(rows[i]));
//                        }
//                    }
//            );
//            
//            this.initDefaultAttributeValue();
            rowData.data = rowData;//infoPage
            Ext.getCmp('infoPage').getForm().loadRecord(rowData);//填充申请信息
//            Ext.getCmp('urgencyLevel').setValue(rowData.urgencyLevelId);
//            Ext.getCmp('urgencyLevel').setRawValue(rowData.urgencyLevel);
            Ext.getCmp('orderInfo').getForm().loadRecord(rowData);//填充工单信息
            
//            if(Ext.getCmp('createdByName')!=null&&Ext.getCmp('createdByName').getValue()!=""){
//                if(Ext.getCmp('createdByName').getValue()=="郭继磊"){
//                    Ext.getCmp('localeName').setValue("山东");
//                }else{
//                    Ext.getCmp('localeName').setValue("福建");
//                }
//            }
            
            if(rowData.localeId!=null){
                var obb = new Object();
                                obb.orgId = rowData.localeId;
                ZTESOFT.invokeAction(
                                        PATH+'/commonData/proxy4AUserAndOrg/findOrgbyOrgId.json',
                                        obb,
                                        function(response){
                                        Ext.getCmp('localeName').setValue(response.orgName);
                                        }
                                );
            }
            
            if(rowData.auditPersonId!=null){
            	var obb = new Object();
                                obb.cloudUserId = rowData.auditPersonId;
                ZTESOFT.invokeAction(
                                        PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',
                                        obb,
                                        function(response){
                                        Ext.getCmp('auditPersonAccountId').setValue(response.accountId);
                                        }
                                );
            }
            
            if(rowData.executePersonId!=null){
                var obb = new Object();
                                obb.cloudUserId = rowData.executePersonId;
                ZTESOFT.invokeAction(
                                        PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',
                                        obb,
                                        function(response){
                                        Ext.getCmp('executePersonAccountId').setValue(response.accountId);
                                        }
                                );
            }
            
            if(rowData.remarks!=null){//设置备注
                Ext.getCmp('testCardOrderModifyRemarks').setValue(rowData.remarks);
            }
            
//            var o = new Object();
//            o.start = 0;
//            o.limit = Ext.getCmp('attachmentInfo').getPageSize();
//            o.objectTable = 'T_EOM_CARD_SHEET';
//            o.objectId = cardSheetIdGlo;
//            o.activityInstanceId = 0;
//            o.taskInstanceId = 0;
//            ZTESOFT.invokeAction(
//                    PATH+'/e19/testCardCommonAction.json?method=qryAttachment',
//                    o,
//                    function(response){
//                        var rows = response.rows;
//                        var li = rows.length;
//                        var filesName = "";
//                        for(var i=0;i<li;i++){
//                            filesName = filesName+"[<a href='javascript:new DetailWin().download2("+rows[i].attachmentId+",\'"+rows[i].attachmentName+"\')'>"+rows[i].attachmentName+"</a>]";
//                            
////                           Ext.getCmp('valueListGrid').getStore().add(new Ext.data.Record(rows[i]));
//                        }
//                        Ext.getCmp('filesName').setValue(filesName);
//                    }
//            );
        }
    }
    
    
    
    
    