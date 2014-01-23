var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var qryPnHeight = 120;//body_height * 0.2;
var gridPnHeight = body_height - qryPnHeight;//body_height * 0.8;
var gridWidth = body_width;
var cnt = 30; //列表每页显示多少条数据
var cardType = 0;
var operType = "";
var aftereditFlagAndSetView = 0;//编辑触发标记，使得render不运行,并跳过数量对比，直接设成查看明细

//var session = new Object();
var oper = new PageOper();
var testCardCheckEdGridOper = new TestCardCheckEdGridOper();
var manager = new DetailWin();
var fileList = new Array();
var testCardQueryAndSelect = new TestCardQueryAndSelect();//各种类型测试卡查询form的初始化
var testCardCheckWholeParam = new Object();
var checkAddQryWinGooble;
var checkFormStatusMap = null;
var urgencyLevelMap = null; 
var testCardCheckWidth = 160;
var checkTestobjectTypeGol = "";
var testCardEnum = 1;//测试卡枚举值

var terminalEnum = 2;//测试终端枚举值

var teleCardEnum = 3;//固定电话枚举值

var rechCardEnum = 4;//充值卡枚举值

var modOper = new TestCardModOper();
var stroe = new jsonStroe();

Ext.onReady(function() {
    checkFormStatusMap = getMap("CHECK_FORM_STATUS");
    urgencyLevelMap = getMap("URGENCY_LEVEL");
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 


    oper.init();

});

function getMap(value){
        var oo = new Object();
        oo.dictType = value;
        return initEnumMap(oo);
    }


function PageOper() {
    
    this.init = function() {
//    	this.initSession();
    	testCardCheckEdGridOper.initCheckAddQryWin();
        var mainPanel = this.initMainPanel();
        var viewport = new Ext.Viewport({
            el : 'content',
            layout : 'border',
            margins : '5 5 5 5',
            items : [ mainPanel ]
        });
        testCardCheckWholeParam.createdByQry = session.logonAccount.cloudUserId;
        var param = testCardCheckWholeParam;//Ext.getCmp('qryForm').getForm().getValues();
//        param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
        oper.qryListGrid('checkGrid',param);
    }
    
//    this.initSession = function() {
//            ZTESOFT.invokeAction(
//                    PATH+'/e19/testCardCommonAction.json?method=getLogonAccount',
//                    null,
//                    function(response){
//                        
////                        session={};
//                        session.staffId =1;
//                        session.staffName = response.accountName;
//                        session.staffDepId = "000123201";
//                        session.staffDepName = "测试部门";
//                        session.provinceId = "020";
//                        session.provinceName = "北京";
//                        session.telephoneNumber = "10010";
//                        session.marketingAreaId = 1;
//                        session.maintenanceAreaId = 1;
//                        session.orgId = "000123201";
//                        session.orgName="测试部门";
//                        session.shardingId=121001;
//                    }
//            );
//        }
    
    this.initMainPanel = function() {
        
//        var qryFrom = this.initQryPn();
        
        var tbar = this.initGridToolsBar();
        
        var  gridPanel = this.initGrid();
        //主面板
        var mainPanel = new Ext.Panel({
            region : 'center',
            layout : 'border',
            items : [tbar,gridPanel]
        });
        return mainPanel;
    }
   
    this.initQryPn = function() {
        var qryForm = new Ext.FormPanel({
            id : 'qryForm',
            region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
            labelAlign : 'right',//按键的对齐方式
//            labelWidth : 80,//标签宽度
            frame : true,
//            collapsible : true,//是否可收缩
//            title : '查询条件',
            //bodyStyle : 'padding:5px 5px 5px 5px',
//            height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
            width : 700,
            layoutConfig : {
                            columns : 2 * 2
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : 160,//最小是120，最大190
                            height : 30
                        },
            items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '清查部门'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype : 'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id: 'attributionDepartmentNameQry',
                                        name: 'attributionDepartmentNameQry',
//                                        fieldLabel : '清查部门',
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                                oper.selectDep('attributionDepartment');
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'attributionDepartmentIdQry',
                                        id: 'attributionDepartmentIdQry'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '清查人'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype : 'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id: 'checkPersonNameQry',
                                        name: 'checkPersonNameQry',
//                                        fieldLabel : '清查人',
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                                testCardCheckEdGridOper.selectPer('checkPerson');
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'checkPersonIdQry',
                              id: 'checkPersonIdQry'
                                    },{
                                        xtype:'hidden',
                                        name: 'checkPersonAccountId',
                              id: 'checkPersonAccountId'
                                    },{
                                        xtype:'hidden',
                                        name: 'createdByQry',
                                        value:session.logonAccount.cloudUserId,
                              id: 'createdByQry'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '测试卡类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype : 'ZTESOFT.combofield',
                                        hideLabel : true,
//                                        fieldLabel : '测试卡类型',
                                        mode : 'local',//'remote',
                                        triggerAction : 'all',
                                        name : 'testobjectTypeQry',
                                        id : 'testobjectTypeQry',
                                        valueField: 'value',
                                            displayField: 'text',
                                        editable : false,
                //                        dict : true,
                //                        dictType : '52',
                //                        hasBlank : true,
                                        store:new Ext.data.ArrayStore({
                            fields : [ 'value', 'text' ],
                            data : [ [ '', '全部' ], [ '1', '测试卡' ], [ '2', '测试终端' ], [ '3', '固定电话' ], [ '4', '充值卡' ] ]
                        }),
                                        value : '',
                                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '开始时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype : 'ZTESOFT.datefield',
                                        hideLabel : true,
//                                        fieldLabel : '开始时间',
                                            name : 'checkTimeBegin',
                                            id : 'checkTimeBegin',         
                                            format : 'Y-m-d H:i:s',
                                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '结束时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype : 'ZTESOFT.datefield',
                                        hideLabel : true,
//                                        fieldLabel: '结束时间',
                                            name: 'checkTimeEnd',
                                            id : 'checkTimeEnd',
                                            format : 'Y-m-d H:i:s',
                                        anchor : '100%'
                                    }]
                                },
                                {
                                    colspan : 2,
                                    items : {
                                    }
                                }
            ]
//            items : [
//            	{
//                layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉//
//                items : [
//                	{
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [new ZTESOFT.Popup({
//                                        id: 'attributionDepartmentNameQry',
//                                        name: 'attributionDepartmentNameQry',
//                                        fieldLabel : '清查部门',
//                                        readOnly: true,
//                                        anchor : '90%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                oper.selectDep('attributionDepartment');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'attributionDepartmentIdQry',
//                                        id: 'attributionDepartmentIdQry'
//                                    }
////                                    	{
////                        xtype : 'combo',//'ZTESOFT.Combobox',
////                        fieldLabel : '清查部门',
////                        mode : 'local',//'remote',
////                        triggerAction : 'all',
////                        name : 'attributionCityId',
////                        id : 'attributionCityId',
////                        editable : false,
////                        valueField: 'value',
////                            displayField: 'text',
//////                        dict : true,
//////                        dictType : '54',
//////                        hasBlank : true,
////                        store:new Ext.data.ArrayStore({
////            fields : [ 'value', 'text' ],
////            data : [ [ '1', '1' ], [ '2', '2' ] ]
////        }),
////                        value : '',
////                        anchor : '90%'                      
////                    }
//                    ]
//                },{
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [new ZTESOFT.Popup({
//                                        id: 'checkPersonNameQry',
//                                        name: 'checkPersonNameQry',
//                                        fieldLabel : '清查人',
//                                        readOnly: true,
//                                        anchor : '90%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardCheckEdGridOper.selectPer('checkPerson');
//                                        }
//                                    }),{
//                                xtype:'hidden',
//                              name: 'checkPersonIdQry',
//                              id: 'checkPersonIdQry'
//                            }
////                            	{
////                        xtype : 'combo',//'ZTESOFT.Combobox',
////                        fieldLabel : '清查人',
////                        mode : 'local',//'remote',
////                        triggerAction : 'all',
////                        name : 'attributionCityId',
////                        id : 'attributionCityId',
////                        editable : false,
////                        valueField: 'value',
////                            displayField: 'text',
//////                        dict : true,
//////                        dictType : '54',
//////                        hasBlank : true,
////                        store:new Ext.data.ArrayStore({
////            fields : [ 'value', 'text' ],
////            data : [ [ '1', '1' ], [ '2', '2' ] ]
////        }),
////                        value : '',
////                        anchor : '90%'                      
////                    }
//                    ]
//                }, {
//                    columnWidth : .4,
//                    layout : 'form',
//                    items : [{
//                        xtype : 'combo',//'ZTESOFT.Combobox',
//                        fieldLabel : '测试卡类型',
//                        mode : 'local',//'remote',
//                        triggerAction : 'all',
//                        name : 'testobjectTypeQry',
//                        id : 'testobjectTypeQry',
//                        valueField: 'value',
//                            displayField: 'text',
//                        editable : false,
////                        dict : true,
////                        dictType : '52',
////                        hasBlank : true,
//                        store:new Ext.data.ArrayStore({
//            fields : [ 'value', 'text' ],
//            data : [ [ '', '全部' ], [ '1', '测试卡' ], [ '2', '测试终端' ], [ '3', '固定电话' ], [ '4', '充值卡' ] ]
//        }),
//                        value : '',
//                        anchor : '90%'
//                    }]
//                }]
//            },{
//                layout : 'column',
//                items : [{
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'datetimefield',
//                        fieldLabel : '开始时间',
//                        name : 'checkTimeBegin',
//                        id : 'checkTimeBegin',         
//                        format : 'Y-m-d H:i:s',
//                        anchor : '90%'
//                    }]
//                }, {
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'datetimefield',
//                        fieldLabel: '结束时间',
//                        name: 'checkTimeEnd',
//                        id : 'checkTimeEnd',
//                        format : 'Y-m-d H:i:s',
//                        anchor : '90%'
//                    }]
//                }]
//            }]
//            ,
//            buttons : [{
//                text : '查询',
//                listeners : {
//                    "click" : function() {
//                        //获取查询参数
//                         var param = Ext.getCmp('qryForm').getForm().getValues();
//                        param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
//                        oper.qryListGrid('checkGrid',param);
//                    }
//                }
//            },{
//                text : '重置',
//                listeners : {
//                    "click" : function() {
//                        Ext.getCmp('qryForm').getForm().reset();
//                    }
//                }
//            }]
        });
        return qryForm;
    }


    this.qryListGrid = function(gridName,param){
        //绑定发送请求参数
        Ext.getCmp(gridName).store.on('beforeload', function(store) {
            if (Ext.getCmp(gridName).store.lastOptions != null) {
                //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变
                Ext.getCmp(gridName).store.baseParams = param;
            }
        });
        
        //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
        Ext.getCmp(gridName).store.load({
            params : {
                start : 0,//开始索引
                limit : Ext.getCmp(gridName).getPageSize()//步数
            }
        
        });

        //load数据后自动选择第一行数据,load事件为加载数据完成后触发
        Ext.getCmp(gridName).store.on('load', function() {
            Ext.getCmp(gridName).getSelectionModel().selectFirstRow();//选中第一行
        });
    }
    
    this.getFormStatusEnumName = function(value){
        var name = "";
        if(value == 1){
            name = "草稿";
        }else if(value == 2){
            name = "未审批";
        }else if(value == 3){
            name = "完成";
        }else if(value == 4){
            name = "审批不通过";
        }
        return name;
    }

    this.initGrid = function() {
        //创建列   
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel([
            cm,         
            new Ext.grid.RowNumberer({header:'序号',width:40}), 
            {header:'ID',dataIndex:'checkListId',hidden:true},
            {header:'清查单状态ID',dataIndex:'checkFormStatusEnumId',hidden:true},
            {header:'清查记录编号',dataIndex:'checkListNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.operation(\'detail\');">' + value + '</a>';
            },width:gridWidth*0.2},
            {header:'工单主题',dataIndex:'sheetTheme',width:gridWidth*0.1},
            {header:'清查单状态ID',dataIndex:'checkFormStatusEnum',width:gridWidth*0.1,hidden:true},
            {header:'清查单状态',dataIndex:'checkFormStatusEnumId',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){                
                return checkFormStatusMap.get(value);
            },width:gridWidth*0.1},
            {header:'清查单状态',dataIndex:'checkFormStatusEnumName',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){                
                return oper.getFormStatusEnumName(record.data.checkFormStatusEnumId);
            },width:gridWidth*0.1,hidden:true},
            {header:'清查人',dataIndex:'checkPersonName',width:gridWidth*0.1},
            {header:'清查人Id',dataIndex:'checkPersonId',width:gridWidth*0.1,hidden:true},
            {header:'清查部门',dataIndex:'attributionDepartmentName',width:gridWidth*0.1},
            {header:'测试卡类型',dataIndex:'testobjectTypeName',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
            	switch(record.data.testobjectType){
            	   case "1":return "测试卡";
            	   case "2":return "测试终端";
            	   case "3":return "固定电话";
            	   case "4":return "充值卡";
            	   default:return "";
            	}
            },width:gridWidth*0.1},
            {header:'清查部门Id',dataIndex:'attributionDepartmentId',width:gridWidth*0.1,hidden:true},
            {header:'清查时间',dataIndex:'checkTime',width:gridWidth*0.2},
            {header:'可用数量',dataIndex:'actualAvailableNum',width:gridWidth*0.1},
            {header:'不可用数量',dataIndex:'actualUnavailableNum',width:gridWidth*0.1},
            {header:'借出数',dataIndex:'actualLendNum',width:gridWidth*0.1},
            {header:'清查状态ID',dataIndex:'checkStatus',width:gridWidth*0.1,hidden:true},
            {header:'库存可用',dataIndex:'inventoryAvailableNum',hidden:true},
            {header:'库存不可用',dataIndex:'inventoryUnavailableNum',hidden:true},
            {header:'库存借出',dataIndex:'inventoryLendNum',hidden:true},
            {header:'工单ID',dataIndex:'cardSheetId',hidden:true},
            {header:'管理员',dataIndex:'adminId',hidden:true},
            {header:'管理员',dataIndex:'adminName',hidden:true},
            {header:'清查状态',dataIndex:'checkStatusName',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return record.data.checkStatus=="1"?"正常":"<font color='red'>需整改</font>";
            },width:gridWidth*0.1},
            {header:'processInstanceId',dataIndex:'processInstanceId',hidden:true},
            {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
            {header:'备注',dataIndex:'remarks',width:gridWidth*0.1}
        ]);
        //测试卡信息
        var grid = new ZTESOFT.Grid({
            id : 'checkGrid',
            region : 'center',//在父容器里的位置
            height : gridPnHeight,//gridPnHeight,//默认宽度为自适应的，一般不用设置
//            width:800,
            title : '清查记录列表',
            cm : column,//列定义
            pageSize : cnt,//页纪录数
            paging : true,//是否分页
//            collapsible : true,//是否可以收缩
//            tbar : this.initGridToolsBar(),//工具条，用来放操作按键
            url:PATH+'/e19/eomCardCheckAction.json?method=qryEomCardCheckInfoPage',
            sm :cm                       
        });

        return grid;

    }
    
//    this.initGridToolsBar = function() {
//        var tb = new Ext.Toolbar();
//        tb.add({
//            text : '新 增',
//            onClick : function() {
//                oper.operation('add');
//            }
//        },"-");
//        tb.add({
//            text : '送 审',
//            onClick : function() {
//                oper.sendAudit();
//            }
//        },"-");
//        tb.add({
//            text : '编 辑',
//            onClick : function() {
//            	
////            	Ext.getCmp('checkGrid').
//            	
//            	var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
//                    if(selItems.length == 0){           
//                        Ext.Msg.alert('操作提示','请选择待编辑记录!');
//                        return;
//                }
//            	
//            	oper.operation('modify');
////                oper.updCheckList();
//            }
//        },"-");
//        tb.add({
//            text : '删 除',
//            onClick : function() {
//                oper.delCheckList();
//            }
//        },"-");
//        tb.add({
//            text : '导 出',
//            onClick : function() {
//                oper.exportData();
//            }
//        });
//        return tb;
//    }
    
    this.initTestCardCheckQryWin = function(){
            //qery
              var qryFrom = this.initQryPn();
              
              new Ext.Window({
                  id:'qryWin',
                  title: '高级检索',
                  closable:true,
                  width: 700,
                  height: 250,
//                  layout: 'border',
                  plain:true,
                  modal: true,
                  items: [qryFrom],
                  buttonAlign:'center',
                  buttons : [{
                      
                      text : '查询',//两个字以内（包含两字）用红色，两个字以上用蓝色，特殊用灰色

                      id: 'qryBtn',
                      //disabled: true,
                      xtype: 'ZTESOFT.Button',
                      listeners : {
                          "click" : function() {
                          	if(Ext.getCmp('checkTimeBegin').getValue()!=""&&Ext.getCmp('checkTimeEnd').getValue()!=""&&new Date(Date.parse(Ext.getCmp('checkTimeBegin').getValue()))>new Date(Date.parse(Ext.getCmp('checkTimeEnd').getValue()))){
                             Ext.Msg.alert("提示","开始时间不能晚于结束时间！");
                             return;
                            }
                              
                            //获取查询参数
                         var param = Ext.getCmp('qryForm').getForm().getValues();
                        param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
                        oper.qryListGrid('checkGrid',param);
                              
                              testCardCheckWholeParam = param;
                              
                              Ext.getCmp('qryWin').close();
                              
//                              //获取查询参数
//                              var param = Ext.getCmp('qryForm').getForm().getValues();
//                              //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
//
//                              param.com_test = Ext.getCmp('com_test').getValue();
//                              
//                              //alert(param.pop_id_test);
//                              //alert(param.com_test);
//                              
//                              oper.qryListGrid(param);
//                              
//                              //根据name取值，一般建议使用ID
//                              var el = Ext.get("num_test"); 
//                              //使用选择器，匹配所有name属性以‘_test’结尾的元素，注意这里跟jquery一样，返回的是伪数组
//
//                              var e2 = Ext.query("*[name$=_test]"); 
//                              //将dom元素转化为ext的对象
//
//                              Ext.each(e2,function(){
//                                  var e3 = Ext.get(this);
//                                  //接下来就可以使用所有ext对象的方法了。
//
//                                  //alert(e3.getValue());
//                              });
//                              
//                              Ext.getCmp('qryWin').close();
//                              //特别注意这里的处理
//
//                              qryParams = param;

                          }
                      }
                  },{
                      text : '重置',
                      xtype: 'ZTESOFT.Button',
                      //disabled: true,
                      //color: 'gray',//这里取消按钮比较特殊，用的是灰色底色，一般情况下都是红蓝
                      listeners : {
                          "click" : function() {
                              Ext.getCmp('qryForm').getForm().reset();
                          }
                      }
                  }, {
                      text : '关闭',
                      xtype: 'ZTESOFT.Button',
                      //disabled: true,
                      //color: 'gray',//这里取消按钮比较特殊，用的是灰色底色，一般情况下都是红蓝
                      listeners : {
                          "click" : function() {
                              Ext.getCmp('qryWin').close();
                          }
                      }
                  }]
              }).show();
              
              var ob = new Object();
              ob.data = testCardCheckWholeParam;
              Ext.getCmp('qryForm').getForm().loadRecord(ob);
          }
    
    this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar({region : 'north'});
            
            tb.add({
                text : '高级检索',
                //disabled: true,
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                    //alert('高级检索');
                    oper.initTestCardCheckQryWin();
                    /*
                    var param = new Object();
                    param.orgId = '0100028156';
                    
                    ZTESOFT.invokeAction(
                            PATH+'/commonData/proxy4AUserAndOrg/findOrgbyOrgId.json',
                            param,
                            function(response){
                                alert(response.orgId);
                            }
                    );
                    */
                    
                }
                
            });
            
            tb.add("->");//加这个符号可以使在此之后的按键靠右对齐
            tb.add({
            text : '新 增',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.operation('add');
                }
            },"-");
            tb.add({
                text : '送 审',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.sendAudit();
                }
            },"-");
            tb.add({
                text : '编 辑',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    
    //              Ext.getCmp('checkGrid').
                    
                    var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
                        if(selItems.length == 0){           
                            Ext.Msg.alert('操作提示','请选择待编辑记录!');
                            return;
                    }
                    
                    oper.operation('modify');
    //                oper.updCheckList();
                }
            },"-");
            tb.add({
                text : '删 除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.delCheckList();
                }
            },"-");
            tb.add({
                text : '导 出',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.exportData();
                }
            });
            

            return tb;
        }
    
    this.operation = function(operT){
        var obj = {};
        operType = operT;
        obj.type = operT;
        if(operT=='detail'){
            
            
            var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
            if(selItems[0].data.checkFormStatusEnumId != 1){//非草稿{header:'processInstanceId',dataIndex:'processInstanceId',hidden:true}
            	checkTestobjectTypeGol = selItems[0].data.testobjectType;
            	cardType = selItems[0].data.testobjectType;
                manager.showWin(0,selItems[0].data.cardSheetId);
                return;
            } 
        }
        
        if(operT=='modify'){
            var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
            if(selItems.length !=1){
                Ext.Msg.alert("提示","请选择一条记录！");
                return;
            }
            if(selItems[0].data.processInstanceId != ""){//非草稿{header:'processInstanceId',dataIndex:'processInstanceId',hidden:true}
            	var ob = new Object();
                ob.loginId = session.logonAccount.accountId;//"tiger";
                ob.processInstID = selItems[0].data.processInstanceId;
                ZTESOFT.invokeAction(
                        PATH+'/e19/testCardOrderApplyAction.json?method=qryUndoByCardSheetId',
                        ob,
                        function(response){                            
                            var ro = response.rows;
                            
                            if(ro.length!=1){
                            	
                            	if(ro.length==0){
                            	   Ext.Msg.alert("提示","工单状态不是审批不通过或草稿！不能编辑！");
                                    return;
                            	}
                            	
//                            	ro[0].formUrl = ro[0].formUrl.substring(33);//因为流程环节的url地址为/e19/myUndoTaskUnify.jsp?formUrl=开头，共33个字符，需要截取位置33后所有信息作为环节标记
//
//                            	if(ro[0].formUrl!=0&&ro[0].formUrl!="checkModify"){
//                            	   Ext.Msg.alert("提示","工单不处于修改环节！不能编辑！");
//                                    return;
//                            	}
                            	Ext.Msg.alert("提示","工单查询异常！");
                            	return;
                            }else{
                                ro[0].formUrl = ro[0].formUrl.substring(33);
                                var taskInstID = ro[0].taskInstID;
                                var processInstID = ro[0].processInstID;
                                var activityInstID = ro[0].activityInstID;
                                var formUrl = ro[0].formUrl;
//                                alert(taskInstID+"|"+activityInstID+"|"+processInstID+"|"+formUrl);
                                testCardOrderModify.showWinPre(processInstID,activityInstID,taskInstID,formUrl);
                                
                            }
                        }
                );
//                manager.showWin(0,selItems[0].data.cardSheetId);
                return;
            } 
        }
        testCardCheckEdGridOper.initWindow(obj);
    }
    
    this.delCheckList = function(){
        var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
        if(selItems && selItems.length && selItems.length > 0){
            Ext.Msg.confirm("操作提示","确定要删除所选记录",function(btn){
                if(btn=="yes"){
                    var checkListIds = "";
                    var checkListIdsNo = "";
                    for(var i=0; i<selItems.length; i++){
                    	if(selItems[i].data.checkFormStatusEnumId!=1){
                        checkListIdsNo += "["+selItems[i].data.checkListNumber+"]";  
                    	}else{
                        checkListIds += ",";
                        checkListIds += selItems[i].data.checkListId;         
                    	}
                    }
                    checkListIds = checkListIds.toString().substring(1);
                    checkListIdsNo = checkListIdsNo.toString();
                    var param = {};
                    param.checkListIds = checkListIds;
                    param.deletedBy = session.logonAccount.cloudUserId;
                    if(checkListIds!=""){
                    ZTESOFT.invokeAction(
                            PATH+'/e19/eomCardCheckAction.json?method=delCheckListBatch',
                            param,
                            function(response){
                                if(response.data == "success"){
                                    Ext.Msg.alert('操作提示','删除成功!'+(checkListIdsNo==""?"":('其中清查记录编号为'+checkListIdsNo+'的工单不处于草稿状态！无法删除！')));
                                    //获取查询参数
                                      var param = testCardCheckWholeParam;//Ext.getCmp('qryForm').getForm().getValues();
//                                      param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
                                      oper.qryListGrid('checkGrid',param);     
                                }
                                                           
                            }
                    );
                    }else{
                        Ext.Msg.alert('操作提示','清查记录编号为'+checkListIdsNo+"的工单不处于草稿状态！无法删除！");
                    }
                }
             });
        }else{
            Ext.Msg.alert('操作提示','请先选择要删除的记录');
            return;
        }
    }
    
    this.controlTestCardList = function(val){
            if(val==3){//代表借用
                  Ext.getCmp('testCardListTR').hide();
                  Ext.getCmp('expectedReturnTimeTR').show();
                }else{
                  Ext.getCmp('testCardListTR').show();
                  
                  Ext.getCmp('expectedReturnTimeTR').hide();
                }
        }
        
    //选择单位
        this.selectDep = function(val){
        	
//        	 var inputName = val+"NameQry,"+val+"IdQry,pop_id_test3,pop_id_test4,pop_id_test5,pop_id_test6";
//             var requestData = "text,id,leaf,accountId,accountName,parentId";
//             var isUseful = [1,0,0];
//             var _nodeRelationType="noRelation";
//             var _isOnlyLeaf="0";
//             var _inputType="radio";
//             var _orgId = session.org.cloudOrgId;
//             //alert(_orgId);
//             /*
//             *树对象有6个配置参数，1、2个为必输项，其余4个为选填，如果填请按照顺序配置
//
//             *第1个参数--字符串，用逗号截开，控件名称
//
//             *第2个参数--字符串，orgId,null表示整个联通集团，传入组织id表示该组织以下人员或组织
//             *第3个参数--字符串，用逗号截开，对应树节点属性
//
//             *第4个参数--数组：配置派发、送审、抄送按钮，用数组表示，1代表启用，0代表不启用
//
//             *第5个参数--字符串，hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
//             *第6个参数--字符串，是否联动：1代表只回传叶子节点，0代表回传父子节点
//             *第7个参数--字符串，输入类型：checkbox代表复选框，radio代表单选框
//             */
//             var tree = new DeepTreeObj(inputName,requestData,null,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType);
//             
//             tree.showTree(deeptreeUrl);
        	/*
        	TreeOper.singleOrgTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp(val+"NameQry").setValue(text);
                                        Ext.getCmp(val+"IdQry").setValue(id);
                                    }
                                });*/
        	
        	var _nodeRelationType="noRelation";
        	var _isOnlyLeaf = '0';
        	var _inputType = 'radio';
        	var _orgId = null;
            if(session.logonAccount.orgType=="GroupCompany"){
            	_orgId = 1;
            }
            if(session.logonAccount.orgType=="ProvinceCompany"){
            	_orgId = session.logonAccount.provinceCompanyId;
            }
            if(session.logonAccount.orgType=="CityCompany"){
            	_orgId = session.logonAccount.cityCompanyId;
            }
        	var freeTreeObj = new FreeTreeObj('attributionDepartmentNameQryT'+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
        	freeTreeObj.showTree(function(data){
        		 Ext.getCmp(val+"NameQry").setValue(data.text);
                 Ext.getCmp(val+"IdQry").setValue(data.id);
               
               });
        }
        
        this.getRoleIdList = function(){
            var roleIDArray = new Array();
            
            var processModelName = "com.unicom.ucloud.eom.e19.check";
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
        this.selectDep2 = function(val){
            
                                
        	var inputName = val+"Department,"+val+"DepartmentId,"+val+"PersonAccountId,"+val+"PersonId";
             var requestData = "text,id,accountId,id";
             var isUseful = [0,1,0];
             var _nodeRelationType="noRelation";
             var _isOnlyLeaf="0";
             var _inputType="radio";
             var _orgId = session.logonAccount.provinceCompanyId;
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
//             var tree = new DeepTreeObj(inputName,requestData,val+"DeepTreeObj",_orgId,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType);
//             
//             tree.showTree(deeptreeUrl);
             
             //过滤派发树↓
             var _qryType="assignTree";
            var _cloudUserId =  session.logonAccount.cloudUserId;
            var _roleArray =  oper.getRoleIdList();//角色列表
            var _treeType =  3;//1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
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
//                        Ext.getCmp(val+"Department").setValue(text);
//                        Ext.getCmp(val+"PersonAccountId").setValue("");
//                        Ext.getCmp(val+"PersonId").setValue("");
////                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                    }else{//说明是人员
//                        Ext.getCmp(val+"PersonId").setValue(id);
//                        Ext.getCmp(val+"PersonAccountId").setValue(data.accountId);
//                        Ext.getCmp(val+"DepartmentId").setValue("");
//                        Ext.getCmp(val+"Department").setValue(text);
////                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                    }
//                    
//                }
//            });
                                
        }
        
       //选择人
//        this.selectPer = function(val){
//            
//            
//            var nextActivityInsIdStore = new Ext.data.ArrayStore({
//                fields: ['value','text'],
//                data:[
//                    ['','请选择'],
//                    ['1','送会签部门负责人'],
//                    ['2','送处室负责人'],
//                    ['3','送经办人'],
//                    ['4','返回承办人']
//                ]
//            });
//            
//            
//            var nextDealManWin = new Ext.Window({
//                id:'nextDealMan',
//                title: '选择人员',
//                closable:true,
//                width: 700,
//                height: 500,
//                plain:true,
//                
//                items: [{layout: 'column',
//                items:[
////                    {
////                        columnWidth : 1,
////                        layout : 'form',
////                        labelWidth:150,
////                        items : [{
////                            xtype: 'combo',
////                            fieldLabel : '<font color="red">*</font>请选择下一步环节',
////                            name : 'nextActivityInsId',
////                            id : 'nextActivityInsId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            allowBlank:false,
////                            blankText:'请选择下一环节!',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : false ,
////                            value: '',
////                            store: nextActivityInsIdStore,
////                            anchor : '95%'
////                            
////                        }]
////                    },
//                        {
//                        columnWidth : 1,
//                        layout : 'column',
//                        labelWidth:150,
//                        title: '请选择下一个处理人',
//                        height:400,
//                        items : [
//                            {columnWidth : .2,
//                        items : [
//                            {
//                            xtype: 'treepanel',
//                            width: 280,
//                            height:400,
//                            title:'组织',
//                            useArrows:true,
//                            autoScroll:true,
//                            id:'dep',
//                            animate:true,
//                            enableDD:true,
//                            containerScroll: true,
//                            frame: true,
//                            root: new Ext.tree.AsyncTreeNode({
//                                text: 'To Do', 
//                                id:'11',
//                                cls: 'folder',
//                                leaf:false,
//                                children: [{
//                                    text: '1',
//                                    id:1,
//                                    leaf: true,
//                                    checked: false
//                                },{
//                                    text: '2',
//                                    id:2,
//                                    leaf: true,
//                                    checked: false
//                                },{
//                                    text: '3',
//                                    id:3,
//                                    leaf: true,
//                                    checked: false
//                                }]
//                            }),
//                            rootVisible: false//,
////                            listeners: {
////                                click: function(n) {
////                                    Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
////                                }
////                            }
//                        }
//                        ]
//                        },{columnWidth : .2,
//                        items : [
//                            {
//                            xtype: 'treepanel',
//                            width: 280,
//                            height:400,
//                            title:'人员',
//                            useArrows:true,
//                            autoScroll:true,
//                            id:'selectNextMan',
//                            animate:true,
//                            enableDD:true,
//                            containerScroll: true,
//                            frame: true,
//                            root: new Ext.tree.AsyncTreeNode({
//                                text: 'To Do', 
//                                id:'11',
//                                cls: 'folder',
//                                leaf:false,
//                                children: [{
//                                    text: '1',
//                                    id:1,
//                                    leaf: true,
//                                    checked: false
//                                },{
//                                    text: '2',
//                                    id:2,
//                                    leaf: true,
//                                    checked: false
//                                },{
//                                    text: '3',
//                                    id:3,
//                                    leaf: true,
//                                    checked: false
//                                }]
//                            }),
//                            rootVisible: false//,
////                            listeners: {
////                                click: function(n) {
////                                    Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
////                                }
////                            }
//                        }
//                        ]
//                        },
//                            {columnWidth : .2,
//                        items : [{
//                            xtype: 'form',
//                            layout:'column',
//                            buttonAlign:'center',
//                            items:[
//                            {columnWidth : 1,
//                            items:[
//                            {xtype:'button',
//                            text:'>>',
//                            listeners: {
//                                click: function(n) {
//                                    var a = Ext.getCmp("selectNextMan").getChecked();
//                                    var b = Ext.getCmp("selectedNextMan").getRootNode();
//                                    b.appendChild(a);
////                                    for(var i=0;i<a.length;i++){
////                                        
////                                    }
////                                    alert(a.length);
//                                }
//                            }
//                            }
//                            ]
//                            },{columnWidth : 1,
//                            items:[
//                            {xtype:'button',
//                            text:'<<<',
//                            listeners: {
//                                click: function(n) {
//                                    var a = Ext.getCmp("selectNextMan").getRootNode();
//                                    var b = Ext.getCmp("selectedNextMan").getChecked();
//                                    a.appendChild(b);
//                                }
//                            }
//                            }
//                            ]
//                            }
//                            ]
//                            
//                            
//                        }]
//                            
//                        },{columnWidth : .4,
//                        items : [
//                            {
//                            xtype: 'treepanel',
//                            width: 280,
//                            title:'已选人员',
//                            height:400,
//                            useArrows:true,
//                            autoScroll:true,
//                            id:'selectedNextMan',
//                            animate:true,
//                            enableDD:true,
//                            containerScroll: true,
//                            frame: true,
//                            root: new Ext.tree.AsyncTreeNode({
//                                id:''
//                            }),
//                            rootVisible: false
//                        }]
//                            
//                        }]
//                    }]}
//                    ],
//                buttonAlign:'center',
//                buttons: [
//                    {
//                    text: '确定',
//                    onClick:function(){
//                        var aaqq = Ext.getCmp("selectedNextMan").getRootNode();
//                        if(aaqq.childNodes.length!=1){
//                            Ext.Msg.alert("提示","请选择一位人员！");
//                            return;
//                        }
////                        var ob = new Object();
////                        ob.targetPerson = aaqq.childNodes[0];
////                        ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
////                        alert(Ext.getCmp("nextActivityInsId").getValue());
//                        Ext.getCmp(val).setValue(aaqq.childNodes[0].id);
//                        nextDealManWin.close();
//                    }
//                },{
//                    text: '取消',
//                    onClick:function(){
//                        nextDealManWin.close();
//                    }
//                }]
//            });
//            nextDealManWin.show();
//            
//        
//        }
        
    this.testCardOrderPanel = function(recordData,flag,selItems){
    	return new Ext.Panel(
        {
                id:'orderInfoForm',
                labelAlign: 'left',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                title:'工单信息',
                width:testCardCheckWidth*4+20+20,//Ext.getBody().getSize(),
//                height:800,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
//                labelWidth: 70,
                
                
                items: [new Ext.FormPanel({
                id:'infoPage',
//                region: 'north',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'申请信息',
                width:testCardCheckWidth*4+20+20+10,//Ext.getBody().getSize(),
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
                            width : testCardCheckWidth,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '归属地'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype:'ZTESOFT.textfield',
//                                        fieldLabel: '归属地',
                                        hideLabel : true,
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
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '单位名称'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype:'ZTESOFT.textfield',
//                                        fieldLabel: '单位名称',
                                        hideLabel : true,
                                        name: 'companyName',
                                        id: 'companyName',
                                        readOnly:true,
                                        anchor:'100%'
                                    }
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
//                                            fieldLabel:'建单人',
                                            hideLabel : true,
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
//                                            fieldLabel: '工单状态',
                                            hideLabel : true,
                                            name: 'woStatusEnumName',
                                            id: 'woStatusEnumName',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                        ,{
                                            xtype:'hidden',
                                            name: 'woStatusEnumId',
                                            id: 'woStatusEnumId'
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
//                                            fieldLabel: '建单时间',
                                            hideLabel : true,
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
//                                          fieldLabel: '派单时间',
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
                                        text : '工单类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
                                                {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                          fieldLabel: '<font color="red">*</font>工单类型',
                                            name: 'cardOperationTypeEnumName',
                                            id: 'cardOperationTypeEnumName',
                                            readOnly:true,
                                            anchor:'100%'
                                        },
                                        {
                                xtype:'hidden',
                                name: 'cardOperationTypeEnumId',
                                id: 'cardOperationTypeEnumId'
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
                                        value: '1',
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
                                    width:testCardCheckWidth*3,
                                    items : [
                                                {
                                            xtype:'ZTESOFT.datefield',
                                            hideLabel : true,
//                                            fieldLabel: '<font color="red">*</font>建议完成时间',
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
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>审核对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardCheckWidth*3,
                                    items : [
                                                {
                                            xtype:'ZTESOFT.popupfield',
                                            hideLabel : true,
                                          id : 'auditDepartment',
                                            name : 'auditDepartment',
//                                            fieldLabel : '<font color="red">*</font>审核单位',
                                            valueFile : 'auditDepartmentId',
                //                            editable : false ,
                                            readOnly: true,
                                            allowBlank: false,
                                            blankText:'审核对象不能为空!',
                                            anchor : '100%',
                                            onPopup : function() {
                                                //选择事件逻辑
                                                oper.selectDep2('audit');
                                            }
                                        },
                                        {
                                xtype:'hidden',
                                name: 'auditDepartmentId',
                                        id: 'auditDepartmentId'
                            },
                                        {
                                xtype:'hidden',
                                name: 'auditPersonId',
                                        id: 'auditPersonId'
                            },{
                                xtype:'hidden',
                                name: 'auditPersonAccountId',
                                        id: 'auditPersonAccountId'
                            },{
                                xtype:'hidden',
                                name: 'auditPerson',
                                        id: 'auditPerson'
                            }
                                    ]
                                }
//                                {
//                                    colspan : 1,
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '审核人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    items : [
//                                                {
//                                            xtype:'ZTESOFT.popupfield',
//                                            hideLabel : true,
//                                          id: 'auditPerson',
//                                        name: 'auditPerson',
////                                        fieldLabel : '审核人',
//                                        valueFile : 'auditPersonId',
//                                        readOnly: true,
////                                        editable : false ,
//                                        anchor : '100%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardCheckEdGridOper.selectPer2('auditPerson');
//                                        }
//                                        },
//                                        {
//                                xtype:'hidden',
//                                name: 'auditPersonId',
//                                        id: 'auditPersonId'
//                            },{
//                                xtype:'hidden',
//                                name: 'auditPersonAccountId',
//                                        id: 'auditPersonAccountId'
//                            }
//                                    ]
//                                }
                                
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
////                        {
////                        columnWidth:.3,
////                        layout: 'form',
////                        items: [{
////                                xtype:'textfield',
////                                fieldLabel:'工单流水号',
////                                name:'sheetSerialNumber',
////                                id: 'sheetSerialNumber',
////                                readOnly:true,
////                                anchor:'95%'
////                            }]
////                        },
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '工单状态',
//                                name: 'woStatusEnumName',
//                                id: 'woStatusEnumName',
//                                readOnly:true,
//                                anchor:'95%'
//                            }
//                            ,{
//                                xtype:'hidden',
//                                name: 'woStatusEnumId',
//                                id: 'woStatusEnumId'
//                            }
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
//                        items: [
//                            {
//                                xtype:'textfield',
//                                fieldLabel: '<font color="red">*</font>工单类型',
//                                name: 'cardOperationTypeEnumName',
//                                id: 'cardOperationTypeEnumName',
//                                readOnly:true,
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'cardOperationTypeEnumId',
//                                id: 'cardOperationTypeEnumId'
//                            }
//                            ]
//                        }
//                        
//                        ,{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [
//                            {
//                            xtype : 'ZTESOFT.Popup',
//                            id : 'auditDepartment',
//                            name : 'auditDepartment',
//                            fieldLabel : '<font color="red">*</font>审核单位',
////                            valueFile : 'pop_id_test',
////                            editable : false ,
//                            readOnly: true,
//                            allowBlank: false,
//                            blankText:'审核单位不能为空!',
//                            anchor : '95%',
//                            onPopup : function() {
//                                //选择事件逻辑
//                                oper.selectDep2('auditDepartment');
//                            }
//                        },{
//                                        xtype:'hidden',
//                                        name: 'auditDepartmentId',
//                                        id: 'auditDepartmentId'
//                                      }
//                       ]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [
//                            new ZTESOFT.Popup({
//                                        id: 'auditPerson',
//                                        name: 'auditPerson',
//                                        fieldLabel : '审核人',
////                                        valueFile : 'pop_id_test',
//                                        readOnly: true,
////                                        editable : false ,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardCheckEdGridOper.selectPer2('auditPerson');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'auditPersonId',
//                                        id: 'auditPersonId'
//                                      }]
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
//                        
//                   ]}
//            ]
                }),new Ext.FormPanel({
                id:'orderInfo',
//                region: 'center',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'工单信息',
                width:testCardCheckWidth*4+20+20+10,//Ext.getBody().getSize(),
//                height:400,
//                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;',
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
                            width : testCardCheckWidth*4/6,//最小是120，最大190
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
                                    width:testCardCheckWidth*4/6*5,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel: '<font color="red">*</font>工单主题',
                                            name: 'sheetTheme',
                                            id: 'sheetTheme',
                                            blankText:'请填写工单主题!',
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
                                    width:testCardCheckWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '<font color="red">*</font>内容',
                                            name: 'content',
                                            id: 'content',
                                            height : 50,
                                            blankText:'请填写内容!',
                                            allowBlank: false,
                                            anchor:'100%'
                                        }
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
                                    width:testCardCheckWidth*4/6*5,
                                    height : 100,
                                    items : [
//                                        {
//                                            xtype:'ZTESOFT.textfield',
//                                            hideLabel : true,
////                                            fieldLabel:'附件',
//                                            name:'filesName',
//                                            id: 'filesName',
//                                            anchor:'100%'
//                                        }
                                        {
                                        xtype : 'ZTESOFT.attachmentPanel',
                                        id:'filesName',
                                        //align:"left",
                                        //cls:'zs-attachment',
                                        autoScroll:true,
//                                        detailValues:attObj,//已有的附件数据（从数据库读出），格式为一个object，里面包含数组

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
//    //                                    xtype:'button',
//                                    xtype: 'ZTESOFT.Button',
//                                        name:'uploa',
//                                        id: 'uploa',
//                                        onClick : function() {
//                                            oper.upload('filesName');
//                                        },
//                                        text:'上传'
//                                    }
//                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '备注'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardCheckWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '备注',
                                            height : 50,
                                            name: 'remarks',
                                            id: 'remarks',
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
//                        
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
//                            	xtype: 'ZTESOFT.Button',
//                                    name:'uploa',
//                                    id: 'uploa',
//                                    onClick : function() {
//                                        oper.upload('filesName');
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
//                                anchor:'95%'
//                            }
//                            ]
//                        }
//                   ]}
//            ]
                })]//,//auditHisList,
//                auditHisDetail,
//                approveOpinionEditPanel]
            }
            )
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
    
    this.initTestCardOrderWindow = function(recordData,flag,selItems){
            var testCardOrderPanel = oper.testCardOrderPanel(recordData,flag,selItems);
            
            var tabPanel = new Ext.TabPanel({
                activeTab: 0,
                region: 'center',
                items: [testCardOrderPanel
                ]
            });
            
            recordData.data = recordData;//infoPage
            Ext.getCmp('infoPage').getForm().loadRecord(recordData);//填充申请信息
            Ext.getCmp('orderInfo').getForm().loadRecord(recordData);//填充工单信息
            
            if(recordData.auditPersonId!=null){
                var obb = new Object();
                                obb.cloudUserId = recordData.auditPersonId;
                ZTESOFT.invokeAction(
                                        PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',
                                        obb,
                                        function(response){
                                        Ext.getCmp('auditPersonAccountId').setValue(response.accountId);
                                        }
                                );
            }
            
            var formWin = new Ext.Window({
                id:'detailWin',
                title: this.winTitle,
                closable:true,
                width: testCardCheckWidth*4+20+20+20+20+20,//body_width*0.65,
                height: 500,//body_height*0.7,
                layout: 'border',
                plain:true,
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
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    id:'add',
                    onClick:function(){
                        if(!Ext.getCmp('infoPage').getForm().isValid()||
                        (!Ext.getCmp('orderInfo').getForm().isValid())){
//                            Ext.Msg.alert("提示","请填写必要的信息！");
                            return;
                        }
                        if(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))<new Date()){
                             Ext.Msg.alert("提示","建议完成时间必须晚于当前时间！");return;
                         }
                         
                         
                        var ob = Ext.getCmp('infoPage').getForm().getValues();
                        ob.cardOperationTypeEnumId = Ext.getCmp('cardOperationTypeEnumId').getValue();
                        ob.urgencyLevel = Ext.getCmp('urgencyLevel').getValue();
                        //流程挂接参数
                        ob.modelId = 'E19';//模块编号
                        ob.businessCode = 'E196';//流程编码
                        ob.orgCode = session.logonAccount.provinceCompanyId;//所选的组织ID
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
                         ob.remarks = Ext.getCmp('remarks').getValue();
                         ob.archiveBaseDate = Ext.getCmp('requiredFinishTime').getValue();
                         ob.accountId = session.logonAccount.accountId;//流程专用id
                         ob.loginId = session.logonAccount.accountId;//"tiger";//targetPerson.id;
                         ob.loginName = session.logonAccount.userEmpName;//"tiger";//targetPerson.text;
                         if(Ext.getCmp('auditPersonAccountId').getValue()!=""){
                         ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
//                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                         ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
                         ob.targetType = 1;//用户
                         ob.auditDepartmentId = null;
                         }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                         ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                         ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
                         ob.targetType = 3;//部门
                         ob.auditPersonId = null;//设为空，避免修改加载时查accountId
                         }
                         ob.operatorName = session.logonAccount.userEmpName;//"李志敏";//$("input[name='operatorId']").val();
                         ob.operateDepartmentName = session.logonAccount.userDeptName;//"网络公司山东省分公司网络管理中心";//$("input[name='cardSheetId']").val();
//                         alert(ob.targetPerson+"|"+ob.targetType);
                         fileList = getNewUplValue('filesName');
                         for(var i=0;i<fileList.length;i++){//处理附件列表 fileId,fileName
                             fileList[i].attachmentId = fileList[i].fileId;
                             fileList[i].attachmentName = fileList[i].fileName;
                             fileList[i].attachmentTypeEnumId = 1;//测试卡申请单附件
                             fileList[i].attachmentFormatEnumId = fileList[i].attachmentFormatEnumId;//TXT
                             fileList[i].createdBy = session.logonAccount.cloudUserId;
                             fileList[i].lastUpdatedBy = session.logonAccount.cloudUserId;
                             
                             fileList[i].uploadedByPersonId = session.logonAccount.cloudUserId;
                             fileList[i].uploadedByPersonName = session.logonAccount.userEmpName;
                             fileList[i].uploadedByOrgId = session.logonAccount.cloudOrgId;
                             fileList[i].uploadedByOrgName = session.logonAccount.userDeptName;
                             
                             fileList[i].activityInstanceId = 0;
                             fileList[i].taskInstanceId = 0;
                         }
                         ob.fileList = Ext.encode(fileList);
                         fileList = new Array();
                          var sheetCardList = new Array();
                             ob.sheetCardList = Ext.encode(sheetCardList);
                             
                          var cardCheckList = new Array();
                          var cardCheckListSheetSerialNumber = new Array();
                          for(var i=0;i<selItems.length;i++){
                            cardCheckList.push(selItems[i].data.checkListId);
                            cardCheckListSheetSerialNumber.push(selItems[i].data.checkListNumber);
                          }
                          ob.cardCheckList = Ext.encode(cardCheckList);
                          ob.cardCheckListSheetSerialNumber = Ext.encode(cardCheckListSheetSerialNumber);
                         
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
                                 ZTESOFT.invokeAction(
                                PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',
                                ob,
                                function(response){
                                    Ext.Msg.alert("操作提示","修改成功");
                                            Ext.getCmp('detailWin').close();
                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                    
                                }
                        );
                                 
                             }else{//                                                                                                                                          
                             
                          ZTESOFT.invokeAction(
//                                PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',
                                PATH+'/e19/eomCardCheckAction.json?method=sendAuditBatch',
                                ob,
                                function(response){
                                	
                                	if(response.msg!=null&&response.msg=="error"){
                                       Ext.Msg.alert("操作提示","派发失败！请选择正确的派发对象！");
                                       return;
                                    }
                                    
                                    Ext.Msg.alert("操作提示","送审成功");
                                    var param = testCardCheckWholeParam;//Ext.getCmp('qryForm').getForm().getValues();
//                                      param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
                                      
                                        oper.qryListGrid('checkGrid',param);
                                            Ext.getCmp('detailWin').close();
                                    
                                }
                        );
                             }
                         
//                        if(Ext.getCmp("approveOpinionEdit").getValue()==""){
//                           Ext.Msg.alert("提示","请填写执行意见！");
//                           return;
//                        }
//                         manager.initNextDealMan("2");//0为查看详情  1为审核  2为执行 3为接收
                    }
                },
//                {
//                    text: '转发',
//                    aa:'bar',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },{
//                    text: '流程调整',
//                    aa:'bar',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },{
//                    text: '流程跟踪',
//                    aa:'bar',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },{
//                    text: '收回',
//                    aa:'bar',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },{
//                    text: '催办',
//                    aa:'bar',
//                    id:'urge',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },{
//                    text: '退回上一步处理人',
//                    aa:'bar',
//                    onClick:function(){
//                        if(operStr=='add'){
//                            manager.addCommit();
//                        }else{
//                            manager.updateCommit(recordData);
//                        }
//                    }
//                },
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
             formWin.show();
             
        }
        
     this.sendAudit = function(){
        var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
        if(selItems.length == 0){           
            Ext.Msg.alert('操作提示','没有选择任何记录!');
            return;
        }else{                   
            var sheetObj = '';
            var sheetActivObj =  '';
            var dataArray = new Array();
            for(var i=0;i<selItems.length;i++){  
                var now = new Date();
                if(selItems[i].data.checkFormStatusEnumId != 1){                   
                    Ext.Msg.alert('操作提示','编号为:'+selItems[i].data.checkListNumber+'的清查记录已经送审!');
                    return;
                }        
            }
                //生成测试卡工单
                var dat = new Object();
                dat.data = new Object();
                var dd = new Object();
                
//                if(session.logonAccount.userEmpName!=null&&session.logonAccount.userEmpName=='郭继磊'){
//                   dd.localeName = '山东';
//                }else{
                   dd.localeName = session.logonAccount.provinceCompanyName;//'福建';
//                }
                dd.localeId = session.logonAccount.provinceCompanyId;
                dd.companyName = session.logonAccount.userDeptName;
                dd.companyId = session.logonAccount.cloudOrgId;
                dd.createdBy = session.logonAccount.cloudUserId;
                dd.createdByName = session.logonAccount.userEmpName;
                dd.sheetSerialNumber = "TCMA000000001"+new Date().getTime();
                dd.woStatusEnumId = 2;
                dd.woStatusEnumName = "草稿";
                dd.currentNode = 1;
                
                var d = new Date();
                var dateStr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours()>9?d.getHours():"0"+d.getHours())+":"+(d.getMinutes()>9?d.getMinutes():"0"+d.getMinutes())+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
            
                dd.creationDate = dateStr;
                dd.dispatchDate = dateStr;
                dd.cardOperationTypeEnumId = 6;
                dd.cardOperationTypeEnumName = '清查';
                dat.data = dd;
                oper.initTestCardOrderWindow(dd,"add",selItems);//
                //生成测试卡工单
                
                
//                sheetObj = new Object();
//                sheetObj.sheetTheme = "测试卡清查单工单";
//                sheetObj.localeId = 1;
//                sheetObj.companyName = 1;
//                sheetObj.dispatchDate = now;
//                sheetObj.requiredFinishTime = now;
//                sheetObj.sheetType = 6;
//                sheetObj.content = "测试卡清查单工单";
//                sheetObj.processInsId = 100;
//                sheetObj.sheetStatus = 1;
//                
//                sheetObj.currentNode = "test";                
//                sheetObj.createdBy = 1007;
//                sheetObj.creationDate = now;
//                sheetObj.lastUpdatedBy = 1007;
//                sheetObj.lastUpdateDate = now;
//                sheetObj.recordVersion = 1;
//                sheetObj.deletedFlag = false;
//                sheetObj.deletionDate = now;
//                sheetObj.marketingAreaId = 1;
//                sheetObj.maintenanceAreaId = 1;
//                sheetObj.orgId = 1;
//                
//                selItems[i].data.sheetObj = sheetObj;
//                
//                sheetActivObj = new Object();
//                
//                sheetActivObj.activityInsId = 1;
//                sheetActivObj.processInsId = 100;
//                sheetActivObj.operatorId = 1007;
//                sheetActivObj.operateDepartmentId = 1;
//                sheetActivObj.operateTime = now;
//                sheetActivObj.operateType = 1;
//                sheetActivObj.dealState = 1;                     
//                sheetActivObj.timeOut = 0;
//                sheetActivObj.dealAction = "待审核";                                     
//                sheetActivObj.createdBy = 1007;
//                sheetActivObj.creationDate = now;
//                sheetActivObj.lastUpdatedBy = 1007;
//                sheetActivObj.lastUpdateDate = now;
//                sheetActivObj.recordVersion = 1;
//                sheetActivObj.deletedFlag = false;
//                sheetActivObj.deletionDate = now;
//                sheetActivObj.marketingAreaId = 1;
//                sheetActivObj.maintenanceAreaId = 1;
//                sheetActivObj.orgId = 1;
//                selItems[i].data.sheetActivObj = sheetActivObj;
//                
//                dataArray.push(selItems[i].data);
            
//            var param = {};
//            param.list = Ext.encode(dataArray);
//            ZTESOFT.invokeAction(
//                    PATH+'/e19/eomCardCheckAction.json?method=sendAuditBatch',
//                    param,
//                    function(response){
//                        if(response.data == "success"){
//                            Ext.Msg.alert('操作提示','送审成功');
//                            //获取查询参数
//                              var param = Ext.getCmp('qryForm').getForm().getValues();
//                              
//                              oper.qryListGrid('checkGrid',param);  
//                        }
//                    }
//            );
        }
        
    }
     

     this.exportData = function(){
         var param = testCardCheckWholeParam;
         
         //分页参数
         param.start = 0;//Ext.getCmp('checkGrid').getStart();
         param.limit = 5000;//Ext.getCmp('checkGrid').getPageSize();
//         param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();

         var selinfo = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.checkListId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.checkListId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
         
         param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ExportCheckListServiceImpl';

         new ZTESOFT.FileUtil().exportData(param);
     }
     
}

function TestCardCheckEdGridOper() {

    this.width = 600;
    this.height = 400;
    this.gridHeight = 100;
    this.winTitle = '';
    
    this.initWindow = function(obj){
        var type = obj.type;
//        var formPanel = this.initFormPanel();
        var checkAddQueryToolsBar= this.initCheckAddQueryToolsBar();
        var gridPn= this.getGrid(type);
        
        if(type == 'add'){
            this.winTitle = '清查记录新增面板';
        }else if(type == 'modify'){
            this.winTitle = '清查记录修改面板';
            var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
            
            var a = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
            for(var i=0;i<a.length;i++){
                    Ext.getCmp('checkEditgrid').getStore().add(new Ext.data.Record(a[i].data)); 
            }
            
//            Ext.getCmp('qryStatisForm').hide();
            Ext.getCmp('checkAddQryToolsBar').hide();
            
        }else if(type == 'detail'){
            this.winTitle = '清查记录详情面板';
            var selItems = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
            
            var a = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
            for(var i=0;i<a.length;i++){
                    Ext.getCmp('checkEditgrid').getStore().add(new Ext.data.Record(a[i].data)); 
            }
            
//            Ext.getCmp('qryStatisForm').hide();
            Ext.getCmp('checkAddQryToolsBar').hide();
        }
        
        //this.initGridData(index,typeId);
    
        var formWin = new Ext.Window({
            id:'statsWin',
            title: this.winTitle,
            closable:true,
            width: 740,//body_width*0.9,
            height: 500,//body_height*0.8,
            layout: 'anchor',
            plain:true,
            modal: true,
            items: [checkAddQueryToolsBar//formPanel
            ,gridPn],
            buttonAlign:'center',
            buttons: [{
                text: '保存',
                xtype: 'ZTESOFT.Button',
                id:'statsWinAddBut',
                onClick:function(){
                    var st = Ext.getCmp('checkEditgrid').getStore();
                    if(st.getCount()!=0){
                    	var len = st.getCount();
                    	var dataArray = new Array();//存放清查记录list
                    	
                        for(var i=0;i<len;i++){
                            if(st.data.items[i].data.needFill==1){//需填写并未填写
                                Ext.Msg.alert("操作提示","请填写管理员为["+st.data.items[i].data.adminName+"]的差异明细！");
                                return;
                            }else if(st.data.items[i].data.needFill==""&&(st.data.items[i].data.inventoryAvailableNum!=(st.data.items[i].data.actualAvailableNum||0)
                            ||st.data.items[i].data.inventoryUnavailableNum!=(st.data.items[i].data.actualUnavailableNum||0)
                            ||st.data.items[i].data.inventoryLendNum!=(st.data.items[i].data.actualLendNum||0))){
                                Ext.Msg.alert("操作提示","请填写管理员为["+st.data.items[i].data.adminName+"]的差异明细！");
                                return;
                            }
                            var ob = new Object();//存放某个清查记录
                            if(type=='modify'){
                                ob.checkListNumber = st.data.items[i].data.checkListNumber;
                                ob.checkListId = st.data.items[i].data.checkListId;
                                ob.deletedBy = session.logonAccount.cloudUserId;
                            }else{
                            	ob.testobjectType = cardType;
                            	
                            	var provinceOrgShortNameTmp = session.logonAccount.provinceOrgShortName;
                                if(!provinceOrgShortNameTmp){//把集团简码或者省份简码放到provinceOrgShortName中
                                    provinceOrgShortNameTmp = session.logonAccount.groupOrgShortName;
                                }
                            	
                            	var obj={//E196为清查
                                                        woType : 'E196',//E18为考核管理模块的业务模块缩写；1为流程序号。查看中国联通_UCloud_应用_电子运维_系统需求规范书_工单编码规则_v1.5.doc 找到对应的流程序号
                                                        modelCode : 'EOM_TCM_ADB', //考核管理数据库模块编号
                                                        cityCompanyId : session.logonAccount.cityCompanyId||"",//地市分公司ID，为空的话表示该人员所在组织为省分(包括集团)
                                                        provinceOrgShortName : provinceOrgShortNameTmp,//session.logonAccount.provinceOrgShortName,//省分公司英文缩写
                                                        cityOrgShortName : session.logonAccount.cityOrgShortName||"",//地市分公司英文缩写
                                                        createdBy : session.logonAccount.cloudUserId,//当前操作人
                                                        lastUpdatedBy : session.logonAccount.cloudUserId //当前操作人
                                                };
                                                   var _ret = ZTESOFT.Synchronize(PATH+'/eomSequence/eomSequenceAction.json?method=queryEomWoNo',obj);
                            	
                                ob.checkListNumber = _ret.woNo;//"TCMA000000001"+new Date().getTime()+i;//new Date().getTime()+i;
                            }
                            ob.checkPersonId = session.logonAccount.cloudUserId;//当前用户id
                            ob.checkPersonName = session.logonAccount.userEmpName;//当前用户id
                            ob.checkTime = st.data.items[i].data.checkTime;
                            ob.adminId = st.data.items[i].data.adminId;
                            ob.adminName = st.data.items[i].data.adminName;
                            ob.attributionDepartmentId = st.data.items[i].data.attributionDepartmentId;
                            ob.attributionDepartmentName = st.data.items[i].data.attributionDepartmentName;
                            ob.inventoryAvailableNum = st.data.items[i].data.inventoryAvailableNum;
                            ob.actualAvailableNum = st.data.items[i].data.actualAvailableNum||0;
                            ob.inventoryUnavailableNum = st.data.items[i].data.inventoryUnavailableNum;
                            ob.actualUnavailableNum = st.data.items[i].data.actualUnavailableNum||0;
                            ob.inventoryLendNum = st.data.items[i].data.inventoryLendNum;
                            ob.actualLendNum = st.data.items[i].data.actualLendNum||0;
                            
                            if(st.data.items[i].data.inventoryAvailableNum!=(st.data.items[i].data.actualAvailableNum||0)
                            ||st.data.items[i].data.inventoryUnavailableNum!=(st.data.items[i].data.actualUnavailableNum||0)
                            ||st.data.items[i].data.inventoryLendNum!=(st.data.items[i].data.actualLendNum||0)){
                                ob.checkStatus = "2";
                            }else{
                                ob.checkStatus = "1";
                            }
                            
//                            ob.checkStatus = st.data.items[i].data.checkStatus;alert("st.data.items[i].data.checkStatus="+st.data.items[i].data.checkStatus);
                            ob.remarks = st.data.items[i].data.remarks;
                            ob.checkFormStatusEnumId = 1;//草稿
                            ob.createdBy = session.logonAccount.cloudUserId;
                            ob.lastUpdatedBy = session.logonAccount.cloudUserId;
                            ob.marketingAreaId = session.logonAccount.marketingAreaId;
                            ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                            
                            ob.orgId = session.logonAccount.cloudOrgId;
                            
                            if(st.data.items[i].data.needFill==2){
                                var differentDetailObjTmp = st.data.items[i].data.differentDetailObj;
                                var differentDetailObj = new Object();//存放某一记录的清查详情
                                
//                                differentDetailObjTmp.AvailableNumList.createdBy = 1;
//                                differentDetailObjTmp.AvailableNumList.lastUpdatedBy = 1;
//                                differentDetailObjTmp.AvailableNumList.marketingAreaId = 1;
//                                differentDetailObjTmp.AvailableNumList.maintenanceAreaId = 1;
//                                differentDetailObjTmp.AvailableNumList.orgId = 1;
//                                differentDetailObjTmp.AvailableNumList.differenceSortEnumId = 1;//可用数量差异
//                                differentDetailObjTmp.AvailableNumList.testobjectTypeEnumId = cardType;
                                differentDetailObj.AvailableNumList = Ext.encode(differentDetailObjTmp.AvailableNumList);
//                                differentDetailObjTmp.UnavailableNumList.createdBy = 1;
//                                differentDetailObjTmp.UnavailableNumList.lastUpdatedBy = 1;
//                                differentDetailObjTmp.UnavailableNumList.marketingAreaId = 1;
//                                differentDetailObjTmp.UnavailableNumList.maintenanceAreaId = 1;
//                                differentDetailObjTmp.UnavailableNumList.orgId = 1;
//                                differentDetailObjTmp.UnavailableNumList.differenceSortEnumId = 2;//不可用数量差异
//                                differentDetailObjTmp.UnavailableNumList.testobjectTypeEnumId = cardType;
                                differentDetailObj.UnavailableNumList = Ext.encode(differentDetailObjTmp.UnavailableNumList);
//                                differentDetailObjTmp.LendNumList.createdBy = 1;
//                                differentDetailObjTmp.LendNumList.lastUpdatedBy = 1;
//                                differentDetailObjTmp.LendNumList.marketingAreaId = 1;
//                                differentDetailObjTmp.LendNumList.maintenanceAreaId = 1;
//                                differentDetailObjTmp.LendNumList.orgId = 1;
//                                differentDetailObjTmp.LendNumList.differenceSortEnumId = 3;//借出数量差异
//                                differentDetailObjTmp.LendNumList.testobjectTypeEnumId = cardType;
                                differentDetailObj.LendNumList = Ext.encode(differentDetailObjTmp.LendNumList);
                                
                                ob.differentDetailObj = Ext.encode(differentDetailObj);
                            }
                            
                            dataArray.push(ob);
                        }
                        
                        var data = new Object();
                        data.dataArray = Ext.encode(dataArray);
                        
                        if(type=='add'){
                        
                            ZTESOFT.invokeAction(
                                    PATH+'/e19/eomCardCheckAction.json?method=insertEomCardCheck',
                                    data,
                                    function(response){
                                        Ext.Msg.alert("操作提示","保存成功");
                                        //获取查询参数
//                                         var param = Ext.getCmp('qryForm').getForm().getValues();
//                                      param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
                                        var param = testCardCheckWholeParam;
                                        oper.qryListGrid('checkGrid',param);
                                        Ext.getCmp('statsWin').close();
    //                                            Ext.getCmp('detailWin').close();
    //                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                        
                                    }
                            );
                        }else if(type=='modify'){
                        
                            ZTESOFT.invokeAction(
                                    PATH+'/e19/eomCardCheckAction.json?method=updateEomCardCheck',
                                    data,
                                    function(response){
                                        Ext.Msg.alert("操作提示","编辑成功");
                                        //获取查询参数
                                         var param = testCardCheckWholeParam;//Ext.getCmp('qryForm').getForm().getValues();
//                                      param.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
                                        oper.qryListGrid('checkGrid',param);
                                        Ext.getCmp('statsWin').close();
    //                                            Ext.getCmp('detailWin').close();
    //                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                        
                                    }
                            );
                        }
                        
                    }
                }
            },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('statsWin').close();
                }
            }]
        });
        if(operType=='detail'){
            Ext.getCmp('statsWinAddBut').hide();
            
        }
         formWin.show();
    }
    
    this.initFormPanel = function() {
        var qryStatisForm = new Ext.FormPanel({
            id : 'qryStatisForm',
            region : 'center',//在父容器中的位置，按地图方位布局，只有一个元素时用center
            labelAlign : 'right',//按键的对齐方式
//            labelWidth : 80,//标签宽度
            frame : true,
//            collapsible : true,//是否可收缩
            title : '查询条件',
            width: 720,//body_width*0.9,
            height: 250,
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
                            width : 170,//最小是120，最大190
                            height : 30
                        },
            items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '请选择类型'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    items : [{xtype:'ZTESOFT.checkbox',
                                    hideLabel : true,
                                            id : 'cardType',
                        name : 'cardType',
//                        fieldLabel: '请选择类型',
                        items: [
                            {boxLabel: '测试卡', name: 'testobjectType', inputValue: 1,checked: true},
                            {boxLabel: '测试终端', name: 'testobjectType', inputValue: 2},
                            {boxLabel: '固定电话', name: 'testobjectType', inputValue: 3},
                            {boxLabel: '充值卡', name: 'testobjectType', inputValue: 4}
                        ],
                                            anchor:'100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '被清查部门'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    items : [{xtype:'ZTESOFT.popupfield',
                                    hideLabel : true,
                                            id : 'attributionDepartment',
                            name : 'attributionDepartment',
//                            fieldLabel : '被清查部门',
                            valueFile : 'pop_id_test',
                            readOnly:true,
                            onPopup : function() {
                                //选择事件逻辑
                                testCardCheckEdGridOper.openWin();
                            },
                                            anchor:'100%'
                                    }, {
                            xtype : 'hidden',
                            name : 'attributionDepartmentId',
                            id : 'attributionDepartmentId'
                        }]
                                }
            ],
//            items : [{
//                layout : 'column',
//                items : [{
//                    columnWidth : .6,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'radiogroup',
//                        id : 'cardType',
//                        name : 'cardType',
//                        fieldLabel: '请选择类型',
//                        items: [
//                            {boxLabel: '测试卡', name: 'testobjectType', inputValue: 1,checked: true},
//                            {boxLabel: '测试终端', name: 'testobjectType', inputValue: 2},
//                            {boxLabel: '固定电话', name: 'testobjectType', inputValue: 3},
//                            {boxLabel: '充值卡', name: 'testobjectType', inputValue: 4}
//                        ]
//                        } ]
//                    }, {
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [ {
//                            xtype : 'ZTESOFT.Popup',
//                            id : 'attributionDepartment',
//                            name : 'attributionDepartment',
//                            fieldLabel : '被清查部门',
//                            valueFile : 'pop_id_test',
//                            readOnly:true,
//                            anchor : '90%',
//                            onPopup : function() {
//                                //选择事件逻辑
//                                testCardCheckEdGridOper.openWin();
//                            }
//                        }, {
//                            xtype : 'hidden',
//                            name : 'attributionDepartmentId',
//                            id : 'attributionDepartmentId'
//                        } ]
//                    } ]
//                } ],
        buttons : [{
            text : '统计',
            listeners : {
                "click" : function() {
                    testCardCheckEdGridOper.doStatis();
                }
            }
        }]
            });
            return qryStatisForm;
        }
        
    this.doStatis = function(){
        var param = Ext.getCmp('qryStatisForm').getForm().getValues();
        if(!param.attributionDepartmentId){
            Ext.Msg.alert('操作提示','请选择被清查对象');
            return;
        }
        
        var attributionDepartmentThisTypeList = Ext.getCmp('attributionDepartmentThisType').getValue().split(",");   
        var attributionDepartmentIdList = Ext.getCmp('attributionDepartmentId').getValue().split(",");   
        var attributionDepartmentList = Ext.getCmp('attributionDepartment').getValue().split(",");   
        
        var personIdStr = "";
        var companyIdStr = "";
        
//        if(attributionDepartmentThisTypeList[0]=="Person"){//说明是人员
//        	       personIdStr = personIdStr+attributionDepartmentIdList[0];
//                }else{//否则为组织
//                	companyIdStr = companyIdStr+attributionDepartmentIdList[0];
//                }
                
        for(var i=0;i<attributionDepartmentThisTypeList.length;i++){
            if(attributionDepartmentThisTypeList[i]=="Person"){//说明是人员
            	if(personIdStr==""){
            	   personIdStr = attributionDepartmentIdList[i];
            	}else{
            	   personIdStr = personIdStr+","+attributionDepartmentIdList[i];
            	}
            }else{//否则为组织
                if(companyIdStr==""){
                    companyIdStr = attributionDepartmentIdList[i];
                }else{
                    companyIdStr = companyIdStr+","+attributionDepartmentIdList[i];
                }
                    
            }
        }
        
        param.attributionDepartmentId = companyIdStr;
        param.adminId = personIdStr;
        
        
        cardType = Ext.getCmp('cardType').getValue().inputValue;
        Ext.getCmp('checkEditgrid').store.load({
            params : param
        });
    }
    
        this.openWin = function() {
        	
        	
        	var _nodeRelationType="noRelation";
            var _isOnlyLeaf="0";
            var _inputType="checkbox";
            var _orgId = null;
            if(session.logonAccount.orgType=="GroupCompany"){
            	_orgId = 1;
            }
            if(session.logonAccount.orgType=="ProvinceCompany"){
            	_orgId = session.logonAccount.provinceCompanyId;
            }
            if(session.logonAccount.orgType=="CityCompany"){
            	_orgId = session.logonAccount.cityCompanyId;
            }
           
            var freeTreeObj = new FreeTreeObj("free_tree_1"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
            freeTreeObj.showTree(function(data){
                var qq = data;
                
                
                Ext.getCmp("attributionDepartmentThisType").setValue(data.thisType);
                Ext.getCmp("attributionDepartmentId").setValue(data.id);
                Ext.getCmp("attributionDepartment").setValue(data.text);
//                Ext.getCmp("attributionDepartmentId").setValue(data.accountId);
            });

//        	var _nodeRelationType="noRelation";
//            var _isOnlyLeaf="0";
//            var _inputType="radio";
//            var _orgId = session.logonAccount.provinceCompanyId;//session.org.cloudOrgId;
//            var freeTreeObj = new FreeTreeObj("attributionDepartmentTree",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
//            freeTreeObj.showTree(function(data){
//                Ext.getCmp('attributionDepartment').setValue(data.text);
//                Ext.getCmp('attributionDepartmentId').setValue(data.id);
//            });
        	
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
             {
                 header : '测试卡类型',
                 dataIndex : 'testobjectTypeName',
                 renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    switch(record.data.testobjectType){
                       case "1":return "测试卡";
                       case "2":return "测试终端";
                       case "3":return "固定电话";
                       case "4":return "充值卡";
                       default:return "";
                    }
                },
                 width : gridWidth * 0.09
             },
             {
                 header : '测试卡类型',
                 dataIndex : 'testobjectType',
                 width : gridWidth * 0.09,
                 hidden:true 
             },
             	{
                 header : '清查时间',
                 dataIndex : 'checkTime',
                 width : gridWidth * 0.09
             }, {
                 header : '库存可用数量',
                 dataIndex : 'inventoryAvailableNum',
                 renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:testCardCheckEdGridOper.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryAvailableNum")>' + value + '</a>';
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
                        return '<a href=javascript:testCardCheckEdGridOper.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryUnavailableNum")>' + value + '</a>';
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
                        return '<a href=javascript:testCardCheckEdGridOper.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryLendNum")>' + value + '</a>';
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
                            	if(aftereditFlagAndSetView==1){
                            		aftereditFlagAndSetView = 0;
                                return "<a id='a_"+record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\",\""+record.data.checkListId+"\",\""+type+"\",\""+record.data.adminName+"\")'>查看明细</a>";
                            	   
                            	}
                            	if(type=='add'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\",\"\",\""+type+"\",\""+record.data.adminName+"\")'>填写明细</a>";
                            	}
                            	if(type=='modify'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\","+record.data.checkListId+",\""+type+"\",\""+record.data.adminName+"\")'>查看明细</a>";
                                }
                                if(type=='detail'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
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
            height: 350,//body_height,
            frame: true,
            clicksToEdit: 1,
            width:720,
            title:'清查记录列表',
            bodyStyle:'padding:0px;',
            listeners : {
                afteredit : function(val) {
                    if(val.field=="remarks"){
                    	if(val.record.data.needFill==2){//需要填写并填写
                    	   aftereditFlagAndSetView = 1;
                    	   val.record.set("detail","<a id='a_"+val.record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(val.record.data.inventoryAvailableNum-val.record.data.actualAvailableNum)
                                    +","+(val.record.data.inventoryUnavailableNum-val.record.data.actualUnavailableNum)
                                    +","+(val.record.data.inventoryLendNum-val.record.data.actualLendNum)+",\""+val.record.data.adminId+"\",\"\",\""+type+"\",\""+record.data.adminName+"\")'>明细</a>");//随便设一下，重点在render
                    	}
                    }else{
                        if(val.record.data.inventoryAvailableNum!=(val.record.data.actualAvailableNum||0)
                                ||val.record.data.inventoryUnavailableNum!=(val.record.data.actualUnavailableNum||0)
                                ||val.record.data.inventoryLendNum!=(val.record.data.actualLendNum||0)){
                            val.record.set("checkStatusName","需整改");
                            val.record.set("checkStatus","2");
                            val.record.set("needFill","1");//需填写并未填写
                            val.record.set("detail","<a id='a_"+val.record.data.adminId+"' href='javascript: testCardCheckEdGridOper.differentDetail("+(val.record.data.inventoryAvailableNum-val.record.data.actualAvailableNum)
                                    +","+(val.record.data.inventoryUnavailableNum-val.record.data.actualUnavailableNum)
                                    +","+(val.record.data.inventoryLendNum-val.record.data.actualLendNum)+",\""+val.record.data.adminId+"\",\"\",\""+type+"\",\""+record.data.adminName+"\")'>填写明细</a>");
                            
                        }else{
                        	val.record.set("needFill","0");//不需填写
                        	val.record.set("checkStatus","1");
                            val.record.set("checkStatusName","正常");
                            val.record.set("detail","");
                        }
                    }
                }
            }
        });
        
        return grid;
    }
    
    //弹窗列出测试卡列表
    this.showNumDetail = function(testobjectType,adminId,fla){
    	testCardCheckEdGridOper.initNumDetailWindow(testobjectType,adminId,fla);
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
                          return '<a href="#" onclick="testCardCheckEdGridOper.testCardCheckDoViewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
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
                                                         return '<a href="#" onclick="testCardCheckEdGridOper.testCardCheckDoViewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
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
                                                         return '<a href="#" onclick="testCardCheckEdGridOper.testCardCheckDoViewDetail(terminalEnum,'+record.data.testTerminalId+','+record.data.attributionProvinceId+');">' + value + '</a>';
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
                                                          return '<a href="#" onclick="testCardCheckEdGridOper.testCardCheckDoViewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
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
    
    this.testCardCheckDoViewDetail = function(typeId,value,attributionProvinceId){
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
                
               var param = this.getNumDetailExportParam(typeId,adminId,fla);
                
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
                
                oper.qryListGrid(gridName,param);
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
                var pa = testCardCheckEdGridOper.getNumDetailExportParam(typeId,adminId,fla);
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
    
    
    //差异明细form
    this.initDifferentFormPanel = function(aName) {
        var differentForm = new Ext.FormPanel({
            id : 'differentForm',
            region : 'center',//在父容器中的位置，按地图方位布局，只有一个元素时用center
            labelAlign : 'right',//按键的对齐方式
            labelWidth : 80,//标签宽度
            frame : true,
//            collapsible : true,//是否可收缩
            title : '清查明细',
            width: 720,
            //height: 100,
            items : [{
                layout : 'column',
                items : [{
                    columnWidth : 1,
                    layout : 'form',
                    items : [{                    
                        xtype:'textfield',
                        fieldLabel: '被清查人',
                        name: 'adminId',
                        id: 'adminId',
                        value:aName,
                        disabled:true,
//                        readOnly:true,
                        anchor:'95%'
                        } ]
                    }
                    ]
                } ]
            });
        
        
        //初始化可用数量差异
            
            return differentForm;
        }
    
    this.initDifferentDetailGrid = function(idtmp,titl){
        var gri = new ZTESOFT.Grid({
            id : idtmp,
            title:titl,
//          region : 'center',//在父容器里的位置
          height : 250,//默认宽度为自适应的，一般不用设置
          width:677,
//            autoHeight:true,
            autoScroll:true,
          cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel(),
                                         new Ext.grid.RowNumberer({header:'序号',width:40}),
                                         {header:'测试卡编号',dataIndex:'number',width:677*0.2},//body_width*0.5*0.25
                                         {header:'差异类型',dataIndex:'differenceTypeEnumName',width:677*0.2},
                                         {header:'差异详细',dataIndex:'differentDetail',width:677*0.25},
                                         {header:'差异备注',dataIndex:'differencesRemarks',width:677*0.25},
                                         {header:'',dataIndex:'cardId',hidden:true},
                                         {header:'',dataIndex:'differenceTypeEnumId',hidden:true},
                                         {header:'',dataIndex:'personCurrentToId',hidden:true},
                                         {header:'',dataIndex:'currentStatus',hidden:true}
                         
                                      ]),//列定义
//          collapsible : true,//是否可以收缩
          tbar : this.initAvailableNumGridToolsBar(idtmp),//工具条，用来放操作按键
          url:PATH+'/e19/eomCardCheckAction.json?method=getCardCheckDetailList',
          sm : new Ext.grid.CheckboxSelectionModel()
//          new Ext.grid.RowSelectionModel({
//              singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
//              listeners : {
//                  //行选中事件
//                  rowselect : function(sm, row, rec) {
//                      //oper.qryRule(rec.data.tacheId);
//                  }
//              }
//          })

      });
        return gri;
    }
    
    this.initCheckAddQryWin = function(){
    	checkAddQryWinGooble = new Ext.Window({
                  id:'checkAddQryWin',
                  title: '高级检索',
                  closable:true,
                  width: 720,
                  height: 210,
//                  layout: 'border',
                  plain:true,
                  modal: true,
                  items: [new Ext.FormPanel({
                id : 'qryStatisForm',
//                region : 'center',//'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
                labelWidth : 60,//标签宽度
                frame : true,
//                height : 200,//qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : 720,//body_width,
                layoutConfig : {
                            columns : 2 * 2
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:10px;overflow-x:hidden;overflow-y:auto;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : 160,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '请选择类型'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    items : [{
                                    xtype: 'radiogroup',
                        id : 'cardType',
                        name : 'cardType',
//                        fieldLabel: '请选择类型',
                        hideLabel : true,
                        items: [
                            {boxLabel: '测试卡', name: 'testobjectType', inputValue: 1,checked: true},
                            {boxLabel: '测试终端', name: 'testobjectType', inputValue: 2},
                            {boxLabel: '固定电话', name: 'testobjectType', inputValue: 3},
                            {boxLabel: '充值卡', name: 'testobjectType', inputValue: 4}
                        ],
                                            anchor:'100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '清查对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    items : [{xtype:'ZTESOFT.popupfield',
                                    hideLabel : true,
                                            id : 'attributionDepartment',
                            name : 'attributionDepartment',
//                            fieldLabel : '被清查部门',
                            valueFile : 'attributionDepartmentId',
                            readOnly:true,
                            onPopup : function() {
                                //选择事件逻辑
                                testCardCheckEdGridOper.openWin();
                            },
                                            anchor:'100%'
                                    }, {
                            xtype : 'hidden',
                            name : 'attributionDepartmentId',
                            id : 'attributionDepartmentId'
                        }, {
                            xtype : 'hidden',
                            name : 'attributionDepartmentThisType',
                            id : 'attributionDepartmentThisType'
                        }]
                                }
            ]
//                items : [{
//                layout : 'column',
//                items : [{
//                    columnWidth : .6,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'radiogroup',
//                        id : 'cardType',
//                        name : 'cardType',
//                        fieldLabel: '请选择类型',
//                        items: [
//                            {boxLabel: '测试卡', name: 'testobjectType', inputValue: 1,checked: true},
//                            {boxLabel: '测试终端', name: 'testobjectType', inputValue: 2},
//                            {boxLabel: '固定电话', name: 'testobjectType', inputValue: 3},
//                            {boxLabel: '充值卡', name: 'testobjectType', inputValue: 4}
//                        ]
//                        } ]
//                    }, {
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [ {
//                            xtype : 'ZTESOFT.Popup',
//                            id : 'attributionDepartment',
//                            name : 'attributionDepartment',
//                            fieldLabel : '被清查部门',
//                            valueFile : 'pop_id_test',
//                            readOnly:true,
//                            anchor : '90%',
//                            onPopup : function() {
//                                //选择事件逻辑
//                                testCardCheckEdGridOper.openWin();
//                            }
//                        }, {
//                            xtype : 'hidden',
//                            name : 'attributionDepartmentId',
//                            id : 'attributionDepartmentId'
//                        } ]
//                    } ]
//                }
//                ]
            })],
                  buttonAlign:'center',
                  buttons : [{
                      text : '查询',//两个字以内（包含两字）用红色，两个字以上用蓝色，特殊用灰色
                      id: 'qryBtn',
                      xtype: 'ZTESOFT.Button',
                      listeners : {
                          "click" : function() {
                              testCardCheckEdGridOper.doStatis();
//                            //获取查询参数
//                              var param = Ext.getCmp('checkAddQryForm').getForm().getValues();
//                              param.woStatusEnumId = Ext.getCmp('sheetStatusQry').getValue();
//                              
//                              wholeParam = param;
//                              
//                              oper.qryListGrid(param);
                              
                              Ext.getCmp('checkAddQryWin').hide();

                          }
                      }
                  },{
                      text : '重置',
                      xtype: 'ZTESOFT.Button',
                      listeners : {
                          "click" : function() {
                              Ext.getCmp('qryStatisForm').getForm().reset();
                          }
                      }
                  }, {
                      text : '关闭',
                      xtype: 'ZTESOFT.Button',
                      listeners : {
                          "click" : function() {
                              Ext.getCmp('checkAddQryWin').hide();
                          }
                      }
                  }]
              });
    }
    
    //清查记录新增页面的高级检索
    this.initCheckAddQueryToolsBar = function() {
            var tb = new Ext.Toolbar({region : 'north',id:'checkAddQryToolsBar'});
            
            tb.add({
                text : '高级检索',
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                    checkAddQryWinGooble.show();
                    
                }
                
            });
            
//            tb.add("->");//加这个符号可以使在此之后的按键靠右对齐
//
//            tb.add({
//                text : '统计',
//                xtype: 'ZTESOFT.Link',
//                onClick : function() {
//                    oper.exportData();
//                }
//            });
            

            return tb;
        }
    
    this.initTestCardQry = function(){
            var testCardQry = new Ext.FormPanel({
                id : 'testCardQryForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
//                region: 'center',
                labelWidth : 70,//标签宽度
                frame : true,
//                width: 800,
//                collapsible : true,//是否可收缩
//                title : '查询条件',
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
//                                    oper.doQry();
                                }
                            },
                            anchor : '95%',
                            disabled:true
                        }]
                    }
                    ]
                }]
            });
            
            var it = Ext.getCmp('testcardTypeEnumId').items;
            for(var i=0;i<it.length;i++){
                if(it[i].inputValue==cardType){
                    it[i].checked = true;
                    Ext.getCmp('testcardTypeEnumId').setValue(cardType);
                }
            }
            
            
            
            return testCardQry;
        }
        
    this.initTestCardQryResult = function(){
            
            //创建列   
//            var column = new Ext.grid.ColumnModel([
//                new Ext.grid.CheckboxSelectionModel(),    
//                new Ext.grid.RowNumberer(),
//                {header:'测试卡编号',dataIndex:'number',width:gridWidth*0.1},
//                {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.1},
//                {header:'用户号码',dataIndex:'subscriberNumber',width:gridWidth*0.1},
//                {header:'卡状态',dataIndex:'testcardStatusEnumId',width:gridWidth*0.1},
//                {header:'IMSI',dataIndex:'imsi',width:gridWidth*0.1},
//                
//                {header:'',dataIndex:'testcardTypeEnumId',hidden:true},
//                {header:'id',dataIndex:'testCardId',hidden:true},
//                {header:'PIN1',dataIndex:'pin1',hidden:true}
//            ]);
            
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.15},
//                {header:'编号',dataIndex:'numberTmp',width:gridWidth*0.15},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardCheckEdGridOper.testCardCheckDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.15},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.15},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.15},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'testCardQryResult',
//                region : 'center',//在父容器里的位置
//                width: 800,
                height : 300,//默认宽度为自适应的，一般不用设置
                title : '查询结果',
//                region: 'center',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
//                tbar : this.initTestCardQryResultToolsBar(idtmp),//工具条，用来放操作按键
//                url:PATH+'/e19/testCardInfoAction.json?method=qryList',
                url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',
                
                sm : new Ext.grid.CheckboxSelectionModel(
                	{
//                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                    listeners : {
                        //行选中事件
                        rowselect : function(sm, row, rec) {
//                            oper.qryRule(rec.data.tacheId);
//                          Ext.getCmp('cardId').vlaue = rec.data.testCardId;
//                          Ext.getCmp('number').vlaue = rec.data.number;
                        	var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
                        	var numberTmp = "";
                        	var cardIdTmp = "";
                        	for(var i=0;i<a.length;i++){
                        	   numberTmp = numberTmp+"["+a[i].data.numberTmp+"]";
                        	   cardIdTmp = cardIdTmp+","+a[i].data.testobjectId;
                        	}
                        	Ext.getCmp('numberCheck').setValue(numberTmp);
                            Ext.getCmp('cardId').setValue(cardIdTmp.substring(1));
//                            alert(Ext.getCmp('cardId').getValue());
                        	
//                        	var a = Ext.getCmp(idtmp)
//                if(a.length==0){
//                    Ext.Msg.alert("提示","请选择要删除的行！");
//                    return;
//                }
//                for(var i=0;i<a.length;i++){
//                Ext.getCmp(idtmp).getStore().remove(a[i]);
//            }
                        	
//                            Ext.getCmp('number').setValue("["+rec.data.numberTmp+"]");
//                            Ext.getCmp('cardId').setValue(","+rec.data.testobjectId);
                        },
                        rowdeselect : function(sm, row, rec) {
//                            oper.qryRule(rec.data.tacheId);
//                          Ext.getCmp('cardId').vlaue = rec.data.testCardId;
//                          Ext.getCmp('number').vlaue = rec.data.number;
                            var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
                            var numberTmp = "";
                            var cardIdTmp = "";
                            for(var i=0;i<a.length;i++){
                               numberTmp = numberTmp+"["+a[i].data.numberTmp+"]";
                               cardIdTmp = cardIdTmp+","+a[i].data.testobjectId;
                            }
                            Ext.getCmp('numberCheck').setValue(numberTmp);
                            Ext.getCmp('cardId').setValue(cardIdTmp.substring(1));
//                            alert(Ext.getCmp('cardId').getValue());
                            
//                          var a = Ext.getCmp(idtmp)
//                if(a.length==0){
//                    Ext.Msg.alert("提示","请选择要删除的行！");
//                    return;
//                }
//                for(var i=0;i<a.length;i++){
//                Ext.getCmp(idtmp).getStore().remove(a[i]);
//            }
                            
//                            Ext.getCmp('number').setValue("["+rec.data.numberTmp+"]");
//                            Ext.getCmp('cardId').setValue(","+rec.data.testobjectId);
                        }
                    }
                }
                )
//                new Ext.grid.RowSelectionModel({
//                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
//                    listeners : {
//                        //行选中事件
//                        rowselect : function(sm, row, rec) {
////                            oper.qryRule(rec.data.tacheId);
////                        	Ext.getCmp('cardId').vlaue = rec.data.testCardId;
////                        	Ext.getCmp('number').vlaue = rec.data.number;
//                        	Ext.getCmp('number').setValue(rec.data.numberTmp);
//                        	Ext.getCmp('cardId').setValue(rec.data.testobjectId);
//                        }
//                    }
//                })

            });

            return grid;

        
        }
        
    this.initAvailableNumGridToolsBarAdd = function(idtmp){
        var sto = null;
        if(idtmp=='AvailableNumGrid'){
            sto = new Ext.data.ArrayStore({
                fields: ['value','text'],
                data:[
                    ['1','所属权变更'],
                    ['2','状态变更']
                ]
            });
        }else if(idtmp=='UnavailableNumGrid'){
            sto = new Ext.data.ArrayStore({
                fields: ['value','text'],
                data:[
                    ['2','状态变更']
                ]
            });
        }else if(idtmp=='LendNumGrid'){
            sto = new Ext.data.ArrayStore({
                fields: ['value','text'],
                data:[
                    ['3','借出未登记'],
                    ['4','归还未登记']
                ]
            });
        }
        
//        var testCardQry = this.initTestCardQry();
//        //测试卡查询form
//            var qryTestFrom = testCardQueryAndSelect.initTestQryPn();
//            //固定电话查询FORM
//            var qryTeleForm = testCardQueryAndSelect.initTeleQryPn();
//            //测试终端查询form
//            var qryTermiForm = testCardQueryAndSelect.initTermiQryPn();
//            //充值卡查询form
//           var qryRechForm =  testCardQueryAndSelect.initRechQryPn();
           var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBar("apply",cardType);
           
        var testCardQryResult = this.initTestCardQryResult();
        
        var formwin = new Ext.Window({
                id:'detailWin2',
                title: '差异详情填写',
                closable:true,
                width: 740,
                height: 420,
                modal:true,
                layout: 'border'
                ,
                plain:true
                ,
                items: [new Ext.Panel({
                id:'detailWin2Panel',
                labelAlign: 'left',
                region: 'center',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                width:testCardCheckWidth*4+20+20,//Ext.getBody().getSize(),
//                height:800,
                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;',
                labelWidth: 80,
                items: [testQryPnToolsBar,//testCardQry,qryTestFrom,qryTeleForm,qryTermiForm,qryRechForm,
                testCardQryResult,new Ext.FormPanel({
                    id:'valueInfo',
//                    region: 'center',
                    labelAlign: 'left',
                    title:'差异详情',
                    frame:true,
                    autoScroll :true,
                    height:250,
                    width:720,//Ext.getBody().getSize(),
//                    bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;',
                    buttonAlign: 'center',
//                    labelWidth: 80,
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
                            width : testCardCheckWidth,//最小是120，最大190
                            height : 30
                        },
                    items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>测试卡编号'
                                    }
                                },{
                                    colspan :3 ,
                                    width:testCardCheckWidth*3,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel:'<font color="red">*</font>测试卡编号',
                                    name:'numberCheck',
                                    id: 'numberCheck',
                                    readOnly:true,
                                    blankText:'测试卡编号不能为空!',
                                    allowBlank:false, 
                                            anchor:'100%'
                                    },{
                                    xtype:'hidden',
                                    name: 'cardId',
                                    id: 'cardId'
                                }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>差异类型'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardCheckWidth*3,
                                    items : [{xtype:'ZTESOFT.enum',
                                    hideLabel : true,
//                                           fieldLabel : '<font color="red">*</font>差异类型',
                                        name : 'differenceTypeEnumId',
                                        id : 'differenceTypeEnumId',
                                        valueField: 'dataValue',
                                        displayField: 'dataName',
                                        mode: 'local',
                                        triggerAction: 'all',
                                        typeAhead : true,
                                        editable : false ,
                                        dict: true,
                                        dictType:'DIFFERENCE_TYPE',
                                        value: '',
//                                        store: sto,
                                        listeners:{
                                            'select':function(me,newValue,oldValue){
                                                 
                                                 testCardCheckEdGridOper.changeDifferenceTypeEnumId();   
                                            }
                                  
                                    },
                                    anchor : '100%'
                                }]
                                },
                                
                                //////////////////////////////////////↓
                                {
                                    colspan : 1,
                                    id : 'personCurrentToIdTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        
                                        html : '<font color="red">*</font>当前归属人'
                                    }
                                },{colspan : 3,
                                width:testCardCheckWidth*3,
                                id: 'personCurrentToTR',
                                    items : [
                                    	{
                                    xtype: 'ZTESOFT.popupfield',
                                    hideLabel : true,
                                    id: 'personCurrentTo',
                                    name: 'personCurrentTo',
                                    valueFile : 'personCurrentToId',
                                    readOnly : true,
//                                    hidden:true,
                                    anchor : '100%',
                                    onPopup : function() {
                                        var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                   //     var _orgId = session.logonAccount.provinceCompanyId;
                                        var  _orgId = null;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp("personCurrentToId").setValue(data.id);
                                            Ext.getCmp("personCurrentTo").setValue(data.text);
                                            Ext.getCmp("personCurrentToAccountId").setValue(data.accountId);
                                            
//                                            if(data.contactNumber){
//                                                Ext.getCmp('contactTel').setValue(data.id);
//                                            }else{
//                                                Ext.getCmp('contactTel').setValue("18028686880");
//                                            }
////                                            Ext.getCmp('contactPersonId').setValue(data.id);
//                                            Ext.getCmp('attribute1').setValue(data.text);
                                        });
                                    }
                                    } ,
                                    {
                                        xtype:'ZTESOFT.textfield',
                                        hidden:true,
                                        name: 'personCurrentToId',
                                        id: 'personCurrentToId'
                                      },{
                                        xtype:'ZTESOFT.textfield',
                                        hidden:true,
                                        name: 'personCurrentToAccountId',
                                        id: 'personCurrentToAccountId'
                                      }]}
                                
                                 ,    
                                      
                                      
                                {
                                    colspan : 1,
                                    id : 'currentStatusTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        
                                        html : '<font color="red">*</font>当前状态'
                                    }
                                },{colspan : 3,
                                width:testCardCheckWidth*3,
                                id : 'currentStatusTR2',
                                    items : [
                                    	{xtype:'ZTESOFT.enum',
                                    hideLabel : true,
//                                    hidden:true,
//                                           fieldLabel : '<font color="red">*</font>当前状态',
                                                name : 'currentStatus',
                                                id : 'currentStatus',
                                                valueField: 'dataValue',
                                                displayField: 'dataName',
                                                mode: 'local',
                                                triggerAction: 'all',
                                                typeAhead : true,
                                                dict: true,
                                                dictType:'TESTCARD_STATUS',
                                                editable : false ,
                                                value: '',
//                                                store: new Ext.data.ArrayStore({
//                                                    fields: ['value','text'],
//                                                    data:[
//                                                        ['1','正常'],
//                                                        ['2','故障'],
//                                                        ['3','报废'],
//                                                        ['4','送修']
//                                                    ]
//                                                }),
                                                anchor : '100%'
                                      }]},
                                
                                /////////////////////////////////////↑
                                      
                                      
                                      
                                //////////////////////////////////原代码↓
//                                {
//                                    colspan : 1,
////                                    id : 'personCurrentToIdTR',
//                                    items : [{
//                                    	id : 'personCurrentToIdTR',
//                                        xtype : 'ZTESOFT.label',
////                                        hidden:true,
//                                        html : '<font color="red">*</font>当前归属人'
//                                    },{
//                                    	id : 'currentStatusTR',
//                                        xtype : 'ZTESOFT.label',
////                                        hidden:true,
//                                        html : '<font color="red">*</font>当前状态'
//                                    }]
//                                },{
//                                    colspan : 1,
////                                    id : 'personCurrentToIdTR2',
//                                    items : [
////                                    	{xtype:'ZTESOFT.popupfield',
////                                    hideLabel : true,
////                                    hidden:true,
////                                    id: 'personCurrentTo',
////                                        name: 'personCurrentTo',
//////                                           fieldLabel : '<font color="red">*</font>当前归属人',
////                                        valueFile : 'personCurrentToId',
////                                        readOnly: true,
//////                                        editable : false ,
////                                        onPopup : function() {
////                                                //选择事件逻辑
////                                                testCardCheckEdGridOper.selectPer2('personCurrentTo');
////                                        },
////                                    anchor : '100%'
////                                }
//                                {
//                                    xtype: 'ZTESOFT.popupfield',
//                                    hideLabel : true,
//                                    id: 'personCurrentTo',
//                                    name: 'personCurrentTo',
//                                    valueFile : 'personCurrentToId',
//                                    readOnly : true,
////                                    hidden:true,
//                                    anchor : '100%',
//                                    onPopup : function() {
//                                        var _nodeRelationType="noRelation";
//                                        var _isOnlyLeaf="1";
//                                        var _inputType="radio";
//                                   //     var _orgId = session.logonAccount.provinceCompanyId;
//                                        var  _orgId = null;
//                                        var freeTreeObj = new FreeTreeObj("free_tree_1"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
//                                        freeTreeObj.showTree(function(data){
//                                        	
//                                        	Ext.getCmp("personCurrentToId").setValue(data.id);
//                                            Ext.getCmp("personCurrentTo").setValue(data.text);
//                                            Ext.getCmp("personCurrentToAccountId").setValue(data.accountId);
//                                        	
////                                            if(data.contactNumber){
////                                                Ext.getCmp('contactTel').setValue(data.id);
////                                            }else{
////                                                Ext.getCmp('contactTel').setValue("18028686880");
////                                            }
//////                                            Ext.getCmp('contactPersonId').setValue(data.id);
////                                            Ext.getCmp('attribute1').setValue(data.text);
//                                        });
//                                    }
//                                    }
//                                ,{
//                                        xtype:'hidden',
//                                        name: 'personCurrentToId',
//                                        id: 'personCurrentToId'
//                                      },{
//                                        xtype:'hidden',
//                                        name: 'personCurrentToAccountId',
//                                        id: 'personCurrentToAccountId'
//                                      }
//                                      ,{xtype:'ZTESOFT.enum',
//                                    hideLabel : true,
////                                    hidden:true,
////                                           fieldLabel : '<font color="red">*</font>当前状态',
//                                                name : 'currentStatus',
//                                                id : 'currentStatus',
//                                                valueField: 'dataValue',
//                                                displayField: 'dataName',
//                                                mode: 'local',
//                                                triggerAction: 'all',
//                                                typeAhead : true,
//                                                dict: true,
//                                                dictType:'TESTCARD_STATUS',
//                                                editable : false ,
//                                                value: '',
////                                                store: new Ext.data.ArrayStore({
////                                                    fields: ['value','text'],
////                                                    data:[
////                                                        ['1','正常'],
////                                                        ['2','故障'],
////                                                        ['3','报废'],
////                                                        ['4','送修']
////                                                    ]
////                                                }),
//                                                anchor : '100%'
//                                      }]
//                                },
                                //////////////////////////////////原代码↑
//                                {
//                                    colspan : 1,
//                                    id : 'currentStatusTR',
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        html : '<font color="red">*</font>当前状态'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    id : 'currentStatusTR2',
//                                    items : [{xtype:'ZTESOFT.combofield',
//                                    hideLabel : true,
////                                           fieldLabel : '<font color="red">*</font>当前状态',
//                                                name : 'currentStatus',
//                                                id : 'currentStatus',
//                                                valueField: 'value',
//                                                displayField: 'text',
//                                                mode: 'local',
//                                                triggerAction: 'all',
//                                                editable : false ,
//                                                value: '',
//                                                store: new Ext.data.ArrayStore({
//                                                    fields: ['value','text'],
//                                                    data:[
//                                                        ['1','正常'],
//                                                        ['2','故障'],
//                                                        ['3','报废'],
//                                                        ['4','送修']
//                                                    ]
//                                                }),
//                                                anchor : '100%'
//                                      }]
//                                },
//                                {
//                                    colspan : 1,
//                                    id : 'blankTR',
//                                    items : {anchor : '100%'
//                                    }
//                                },
//                                {
//                                    colspan : 1,
//                                    id : 'blankTR2',
//                                    items : {anchor : '100%'
//                                    }
//                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '差异备注'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardCheckWidth*3,
                                    height:50,
                                    items : [{xtype:'ZTESOFT.textarea',
                                    hideLabel : true,
//                                           fieldLabel:'差异备注',
                                                name:'differencesRemarks',
                                                id: 'differencesRemarks',
                                                height:50,
                                                anchor : '100%'
                                      }]
                                }
                    ]
//                    items: [{
//                        layout:'column',
//                        items:[{
//                            columnWidth:.3,
//                            layout: 'form',
//                            items: [{
//                                    xtype:'textfield',
//                                    fieldLabel:'<font color="red">*</font>测试卡编号',
//                                    name:'number',
//                                    id: 'number',
//                                    blankText:'测试卡编号不能为空!',
//                                    allowBlank:false, 
//                                    anchor:'95%'
//                                },{
//                                    xtype:'hidden',
//                                    name: 'cardId',
//                                    id: 'cardId'
//                                }]
//                            },{
//                            columnWidth:.3,
//                            layout: 'form',
//                            items: [{
//                                        xtype: 'combo',
//                                        fieldLabel : '<font color="red">*</font>差异类型',
//                                        name : 'differenceTypeEnumId',
//                                        id : 'differenceTypeEnumId',
//                                        valueField: 'value',
//                                        displayField: 'text',
//                                        mode: 'local',
//                                        triggerAction: 'all',
//                                        editable : false ,
//                                        value: '',
//                                        store: sto,
//                                        listeners:{
//                                            'select':function(me,newValue,oldValue){
//                                                 
//                                                 testCardCheckEdGridOper.changeDifferenceTypeEnumId();   
//                                            }
//                                  
//                                    },
//                                        anchor : '95%'
//                                }]
//                            },{
//                                columnWidth:.3,
//                                id : 'personCurrentToIdTR',
//                                layout: 'form',
//                                items: [new ZTESOFT.Popup({
//                                        id: 'personCurrentTo',
//                                        name: 'personCurrentTo',
//                                        fieldLabel : '<font color="red">*</font>当前归属人',
////                                        valueFile : 'pop_id_test',
//                                        readOnly: true,
////                                        editable : false ,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardCheckEdGridOper.selectPer2('personCurrentTo');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'personCurrentToId',
//                                        id: 'personCurrentToId'
//                                      }]
//                                },{
//                                    columnWidth:.3,
//                                    layout: 'form',
//                                    id : 'currentStatusTR',
//                                    items: [{
//                                                xtype: 'combo',
//                                                fieldLabel : '<font color="red">*</font>当前状态',
//                                                name : 'currentStatus',
//                                                id : 'currentStatus',
//                                                valueField: 'value',
//                                                displayField: 'text',
//                                                mode: 'local',
//                                                triggerAction: 'all',
//                                                editable : false ,
//                                                value: '',
//                                                store: new Ext.data.ArrayStore({
//                                                    fields: ['value','text'],
//                                                    data:[
//                                                        ['1','正常'],
//                                                        ['2','故障'],
//                                                        ['3','报废'],
//                                                        ['4','送修']
//                                                    ]
//                                                }),
//                                                anchor : '95%'
//                                        }]
//                                    },{
//                                        columnWidth:1,
//                                        layout: 'form',
//                                        items: [{
//                                                xtype:'textarea',
//                                                fieldLabel:'差异备注',
//                                                name:'differencesRemarks',
//                                                id: 'differencesRemarks',
//                                                anchor:'95%'
//                                            }]
//                                        }]
//                        }]
                       })]
            })
                ]
                ,
                buttonAlign:'center'
                ,
                buttons: [{
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        
                    	
                    	var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
                    	
                    	if(Ext.getCmp('numberCheck').getValue()==""){
                    	   Ext.Msg.alert("提示","请选择测试卡！");
                                       return;
                    	}
//                            var numberTmp = "";
//                            var cardIdTmp = "";
//                            for(var i=0;i<a.length;i++){
//                               numberTmp = numberTmp+"["+a[i].data.numberTmp+"]";
//                               cardIdTmp = cardIdTmp+","+a[i].data.testobjectId;
//                            }
                    	
                        var valusInfo = Ext.getCmp('valueInfo').getForm().getValues();
                        var p = null;
                        if(Ext.getCmp('differenceTypeEnumId').getValue()==""){
                                       Ext.Msg.alert("","请选择差异类型！");
                                       return;
                                    }
                        if(Ext.getCmp('differenceTypeEnumId').getValue()==1
                                ||Ext.getCmp('differenceTypeEnumId').getValue()==3
                                ||Ext.getCmp('differenceTypeEnumId').getValue()==4){
                                	
                                	if(Ext.getCmp('personCurrentToId').getValue()==""){
                                	   Ext.Msg.alert("","请选择当前归属人！");
                                	   return;
                                	}
                            for(var k=0;k<a.length;k++){
                                var p = new Ext.data.Record({"number":a[k].data.numberTmp,
                                "differenceTypeEnumId":Ext.getCmp('differenceTypeEnumId').getValue()
                                ,"differenceTypeEnumName":valusInfo.differenceTypeEnumId
                                ,"differentDetail":valusInfo.personCurrentTo
                                ,"personCurrentToId":valusInfo.personCurrentToId
                                ,"currentStatus":Ext.getCmp('currentStatus').getValue()
                                ,"cardId":a[k].data.testobjectId
                                ,"differencesRemarks":valusInfo.differencesRemarks});
                                
                                var st = Ext.getCmp(idtmp).getStore();
                                for(var j=0;j<st.data.items.length;j++){
                                    if(a[k].data.numberTmp==st.data.items[j].data.number){
                                        Ext.Msg.alert("","测试卡["+a[k].data.numberTmp+"]已被选择！");
                                               return;
                                    }}
                                Ext.getCmp(idtmp).getStore().add(p);
                            }
//                            var p = new Ext.data.Record({"number":valusInfo.number,
//                                "differenceTypeEnumId":Ext.getCmp('differenceTypeEnumId').getValue()
//                                ,"differenceTypeEnumName":valusInfo.differenceTypeEnumId
//                                ,"differentDetail":valusInfo.personCurrentToId
//                                ,"personCurrentToId":valusInfo.personCurrentToId
//                                ,"currentStatus":Ext.getCmp('currentStatus').getValue()
//                                ,"cardId":valusInfo.cardId
//                                ,"differencesRemarks":valusInfo.differencesRemarks});
                                
//                            var st = Ext.getCmp(idtmp).getStore();
//                        for(var j=0;j<st.data.items.length;j++){
//                            if(valusInfo.number==st.data.items[j].data.number){
//                                Ext.Msg.alert("","该测试卡已被选择！");
//                                       return;
//                            }}
//                            Ext.getCmp(idtmp).getStore().add(p);
                        }
                        if(Ext.getCmp('differenceTypeEnumId').getValue()==2
                                ){
                                	if(Ext.getCmp('currentStatus').getValue()==""){
                                       Ext.Msg.alert("","请选择当前状态！");
                                       return;
                                    }
                            for(var k=0;k<a.length;k++){
                            var p = new Ext.data.Record({"number":a[k].data.numberTmp,
                                "differenceTypeEnumId":Ext.getCmp('differenceTypeEnumId').getValue()
                                ,"differenceTypeEnumName":valusInfo.differenceTypeEnumId
                                ,"differentDetail":Ext.getCmp('currentStatus').getRawValue()
                                ,"personCurrentToId":valusInfo.personCurrentToId
                                ,"currentStatus":Ext.getCmp('currentStatus').getValue()
                                ,"cardId":a[k].data.testobjectId
                                ,"differencesRemarks":valusInfo.differencesRemarks});
                            var st = Ext.getCmp(idtmp).getStore();
                        for(var j=0;j<st.data.items.length;j++){
                            if(a[k].data.numberTmp==st.data.items[j].data.number){
                                Ext.Msg.alert("","测试卡["+a[k].data.numberTmp+"]已被选择！");
                                       return;
                            }}
                            Ext.getCmp(idtmp).getStore().add(p);
                            }
                        }
                                
                        Ext.getCmp('detailWin2').close();
                        
                    }
                },{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('detailWin2').close();
                    }
                }]
            });
            
            
            testCardCheckEdGridOper.changeDifferenceTypeEnumId();   
            
             formwin.show();
             Ext.getCmp('personCurrentToIdTR').hide();
             Ext.getCmp('personCurrentToTR').hide();
             Ext.getCmp('currentStatusTR').hide();
             Ext.getCmp('currentStatusTR2').hide();
             
             //personCurrentToIdTR personCurrentToTR currentStatusTR currentStatusTR2
//            if(cardType == 1){ 
//                Ext.getCmp('qryTestForm').setVisible(true);
//                Ext.getCmp('qryTeleForm').setVisible(false);
//                Ext.getCmp('qryTermiForm').setVisible(false);
//                Ext.getCmp('qryRechForm').setVisible(false);
//            }else if(cardType == 2){
//                Ext.getCmp('qryTestForm').setVisible(false);
//                Ext.getCmp('qryTeleForm').setVisible(false);
//                Ext.getCmp('qryTermiForm').setVisible(true);
//                Ext.getCmp('qryRechForm').setVisible(false);
//                
//            }else if(cardType == 3){
//                Ext.getCmp('qryTestForm').setVisible(false);
//                Ext.getCmp('qryTeleForm').setVisible(true);
//                Ext.getCmp('qryTermiForm').setVisible(false);
//                Ext.getCmp('qryRechForm').setVisible(false);
//            }else if(cardType == 4){
//                Ext.getCmp('qryTestForm').setVisible(false);
//                Ext.getCmp('qryTeleForm').setVisible(false);
//                Ext.getCmp('qryTermiForm').setVisible(false);
//                Ext.getCmp('qryRechForm').setVisible(true);
//            }
    }
    
    this.initAvailableNumGridToolsBar = function(idtmp) {
        var tb = new Ext.Toolbar({
//            id:'AvailableNumGridToolsBar'
        });
        
        if(operType=='detail'){
            return tb;
            
        }
        tb.add({
            text : '添加',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
            
            testCardCheckEdGridOper.initAvailableNumGridToolsBarAdd(idtmp);
            
            }
        },"-");//加这个符号，会在页面上添加一个竖线分隔符
        tb.add({
            text : '删除',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                var a = Ext.getCmp(idtmp).getSelectionModel().getSelections();
                if(a.length==0){
                    Ext.Msg.alert("提示","请选择要删除的行！");
                    return;
                }
                for(var i=0;i<a.length;i++){
                Ext.getCmp(idtmp).getStore().remove(a[i]);
                Ext.getCmp(idtmp).getView().refresh();
            }
            }
        });

        return tb;
    }
    
    this.changeDifferenceTypeEnumId = function(){
        var val = Ext.getCmp("differenceTypeEnumId").getValue();
        if(val==1||val==3||val==4){
//            Ext.getCmp('personCurrentToIdTR').show();
//            Ext.getCmp('personCurrentTo').show();
////            Ext.getCmp('personCurrentToIdTR2').show();
//            Ext.getCmp('currentStatusTR').hide();
//            Ext.getCmp('currentStatus').hide();
            
            Ext.getCmp('personCurrentToIdTR').show();
            Ext.getCmp('personCurrentToTR').show();
//            Ext.getCmp('personCurrentToIdTR2').show();
            Ext.getCmp('currentStatusTR').hide();
            Ext.getCmp('currentStatusTR2').hide();
            
            //personCurrentToIdTR personCurrentToTR currentStatusTR currentStatusTR2
        }
        if(val==2){
//            Ext.getCmp('currentStatusTR').show();
//            Ext.getCmp('currentStatus').show();
////            Ext.getCmp('currentStatusTR2').show();
//            Ext.getCmp('personCurrentToIdTR').hide();
//            Ext.getCmp('personCurrentTo').hide();
            
            Ext.getCmp('currentStatusTR').show();
            Ext.getCmp('currentStatusTR2').show();
//            Ext.getCmp('currentStatusTR2').show();
            Ext.getCmp('personCurrentToIdTR').hide();
            Ext.getCmp('personCurrentToTR').hide();
        }
    }
    
    //选择人

    this.selectPer2 = function(val){
        TreeOper.singleUserTree({
                onComplete: function(id,text,data){
                    Ext.getCmp(val+"Id").setValue(id);
                    Ext.getCmp(val).setValue(text);
                    Ext.getCmp(val+"AccountId").setValue(data.accountId);
                }
            });
    }
    
  //选择人
    this.selectPer = function(val){
    	
//    	var inputName = val+"NameQry,"+val+"IdQry,"+val+"AccountId";
//        var requestData = "text,id,accountId";
//        var isUseful = [1,0,0];
//        var _nodeRelationType="noRelation";
//        var _isOnlyLeaf="1";
//        var _inputType="radio";
//        var _orgId = session.org.cloudOrgId;
//        //alert(_orgId);
//        /*
//        *树对象有6个配置参数，1、2个为必输项，其余4个为选填，如果填请按照顺序配置
//
//        *第1个参数--字符串，用逗号截开，控件名称
//
//        *第2个参数--字符串，orgId,null表示整个联通集团，传入组织id表示该组织以下人员或组织
//        *第3个参数--字符串，用逗号截开，对应树节点属性
//
//        *第4个参数--数组：配置派发、送审、抄送按钮，用数组表示，1代表启用，0代表不启用
//
//        *第5个参数--字符串，hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
//        *第6个参数--字符串，是否联动：1代表只回传叶子节点，0代表回传父子节点
//        *第7个参数--字符串，输入类型：checkbox代表复选框，radio代表单选框
//        */
//        var tree = new DeepTreeObj(inputName,requestData,null,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType);
//        
//        tree.showTree(deeptreeUrl);
//        //alert(retSubmitStringArray[0]["busType"]);
//        //选择事件逻辑
//       /* TreeOper.userTree({
//            onComplete: function(id,text,data){
//                Ext.getCmp('pop_id_test2').setValue(id);
//                Ext.getCmp('pop_test2').setValue(text);
//            }
//        });*/

        var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                        var _orgId = null;
                                        if(session.logonAccount.orgType=="GroupCompany"){
                                        	_orgId = 1;
                                        }
                                        if(session.logonAccount.orgType=="ProvinceCompany"){
                                        	_orgId = session.logonAccount.provinceCompanyId;
                                        }
                                        if(session.logonAccount.orgType=="CityCompany"){
                                        	_orgId = session.logonAccount.cityCompanyId;
                                        }
                                        //var _orgId = session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp(val+"IdQry").setValue(data.id);
                                            Ext.getCmp(val+"NameQry").setValue(data.text);
                                            Ext.getCmp(val+"AccountId").setValue(data.accountId);
                                            
//                                            if(data.contactNumber){
//                                                Ext.getCmp('contactTel').setValue(data.id);
//                                            }else{
//                                                Ext.getCmp('contactTel').setValue("18028686880");
//                                            }
////                                            Ext.getCmp('contactPersonId').setValue(data.id);
//                                            Ext.getCmp('attribute1').setValue(data.text);
                                        });
    	
//    	TreeOper.singleUserTree({
//                onComplete: function(id,text,data){
//                    Ext.getCmp(val+"IdQry").setValue(id);
//                    Ext.getCmp(val+"NameQry").setValue(text);
//                    Ext.getCmp(val+"AccountId").setValue(data.accountId);
//                }
//            });
    
    }
        
    
    //差异明细window
    this.differentDetail = function(AvailableNum,UnavailableNum,LendNum,aId,checkListId,type,aName){
        var differentFormPanel = this.initDifferentFormPanel(aName);
        
        var differentPanel = new Ext.Panel({
            id:'differentPanel',
            labelAlign: 'left',
            region: 'center',
//            layout: 'border',
            frame:true,
            autoScroll :true,
            width:700,//Ext.getBody().getSize(),
//            height:800,
            bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;',
            labelWidth: 70,
            items: [differentFormPanel,
                    testCardCheckEdGridOper.initDifferentDetailGrid('AvailableNumGrid',AvailableNum>0?('库存可用数量比实际可用数量多<font color="red"><U>'+AvailableNum+'</U></font>'):(AvailableNum==0?('库存可用数量与实际可用数量相同'):('库存可用数量比实际可用数量少<font color="red"><U>'+Math.abs(AvailableNum)+'</U></font>')))
                    ,
                    testCardCheckEdGridOper.initDifferentDetailGrid('UnavailableNumGrid',UnavailableNum>0?('库存不可用数量比实际不可用数量多<font color="red"><U>'+UnavailableNum+'</U></font>'):(UnavailableNum==0?('库存不可用数量与实际不可用数量相同'):('库存不可用数量比实际不可用数量少<font color="red"><U>'+Math.abs(UnavailableNum)+'</U></font>')))
                    ,
                    testCardCheckEdGridOper.initDifferentDetailGrid('LendNumGrid',LendNum>0?('库存借出数量比实际借出数量多<font color="red"><U>'+LendNum+'</U></font>'):(LendNum==0?('库存借出数量与实际借出数量相同'):('库存借出数量比实际借出数量少<font color="red"><U>'+Math.abs(LendNum)+'</U></font>')))]
        });
        
        			var AvailableNum = Math.abs(AvailableNum);
        			var UnavailableNum = Math.abs(UnavailableNum);
        			var LendNum = Math.abs(LendNum);
        
        if(checkListId!=""){
            
            var ob = new Object();
            ob.checkListId = checkListId;
            ob.differenceSortEnumId = 1;
                Ext.getCmp('AvailableNumGrid').store.load({
                params : ob
            });
            ob.differenceSortEnumId = 2;
                Ext.getCmp('UnavailableNumGrid').store.load({
                params : ob
            });
            ob.differenceSortEnumId = 3;
                Ext.getCmp('LendNumGrid').store.load({
                params : ob
            });
//            eo.qryListGrid('AvailableNumGrid',ob);
//            ob.differenceSortEnumId = 2;
//            eo.qryListGrid('UnavailableNumGrid',ob);
//            ob.differenceSortEnumId = 3;
//            eo.qryListGrid('LendNumGrid',ob);
            
//            ZTESOFT.invokeAction(
//                    PATH+'/e19/eomCardCheckAction.json?method=getCardCheckDetailList',
//                    ob,
//                    function(response){
//                    	var ro = response.rows;
//                                        for(var i=0;i<ro.length;i++){
//                                           Ext.getCmp('testCardList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡列表
//                                        }
//                    }
//            );
            
        }
        
        var formWin = new Ext.Window({
            id:'differentWin',
            title: '差异明细',
            closable:true,
            width: 720,
            height: body_height*0.9,
            layout: 'border',//anchor
            plain:true,
            items: [differentPanel],
            buttonAlign:'center',
            buttons: [{
                text: '保存',
                xtype: 'ZTESOFT.Button',
                id:'differentWinAddBut',
                onClick:function(){
                    var AvailableNumSto = Ext.getCmp('AvailableNumGrid').getStore();
                    if(AvailableNumSto.getCount()!=AvailableNum){
                    	if(AvailableNum==0){
                    	   Ext.Msg.alert('操作提示','不需要填写可用数量差异记录！请去掉！');
                    	   return;
                    	}
                        Ext.Msg.alert('操作提示','请填写'+AvailableNum+'条可用数量差异记录！');
                        return;
                    }
                    var UnavailableNumSto = Ext.getCmp('UnavailableNumGrid').getStore();
                    if(UnavailableNumSto.getCount()!=UnavailableNum){
                    	if(UnavailableNum==0){
                           Ext.Msg.alert('操作提示','不需要填写不可用数量差异记录！请去掉！');
                           return;
                        }
                        Ext.Msg.alert('操作提示','请填写'+UnavailableNum+'条不可用数量差异记录！');
                        return;
                    }
                    var LendNumSto = Ext.getCmp('LendNumGrid').getStore();
                    if(LendNumSto.getCount()!=LendNum){
                    	if(LendNum==0){
                           Ext.Msg.alert('操作提示','不需要填写借出数量差异记录！请去掉！');
                           return;
                        }
                        Ext.Msg.alert('操作提示','请填写'+LendNum+'条借出数量差异记录！');
                        return;
                    }
                    
                    //清查所选测试卡校验↓
                    var valiList = new Array();
                    for(var i=0;i<AvailableNum;i++){//可用
                        valiList.push(AvailableNumSto.data.items[i].data);
                    }
                    for(var i=0;i<UnavailableNum;i++){//不可用
                        valiList.push(UnavailableNumSto.data.items[i].data);
                    }
                    for(var i=0;i<LendNum;i++){//借出
                        valiList.push(LendNumSto.data.items[i].data);
                    }
                    var msgS = "";
                    for(var i=0;i<valiList.length;i++){
                    	for(var j=i+1;j<valiList.length;j++){
                    	   if(valiList[i].number==valiList[j].number&&valiList[i].differenceTypeEnumId==2&&valiList[j].differenceTypeEnumId==2&&valiList[i].differentDetail!=valiList[j].differentDetail){//状态变更不相同
                    	       msgS = msgS+"编号为["+valiList[i].number+"]的测试卡状态变更不能既是["+valiList[i].differentDetail+"]又是["+valiList[j].differentDetail+"];\n";
                    	   }
                    	   if(valiList[i].number==valiList[j].number&&valiList[i].differenceTypeEnumId!=2&&valiList[j].differenceTypeEnumId!=2&&valiList[i].differentDetail!=valiList[j].differentDetail){//非状态变更不相同
                    	       msgS = msgS+"编号为["+valiList[i].number+"]的测试卡归属人不能既是["+valiList[i].differentDetail+"]又是["+valiList[j].differentDetail+"];\n";
                    	   }
                    	}
                    }
                    if(msgS!=""){
                        Ext.Msg.alert("提示",msgS);
                        return;
                    }
                    //清查所选测试卡校验↑
                    
                    var differentDetailObj = new Object();
                    var AvailableNumList = new Array();
                    for(var i=0;i<AvailableNum;i++){//可用
                        var ob = new Object();
                        ob.number = AvailableNumSto.data.items[i].data.number;
                        ob.differenceTypeEnumName = AvailableNumSto.data.items[i].data.differenceTypeEnumName;
                        ob.differentDetail = AvailableNumSto.data.items[i].data.differentDetail;
                        ob.differencesRemarks = AvailableNumSto.data.items[i].data.differencesRemarks;
                        ob.differenceTypeEnumId = AvailableNumSto.data.items[i].data.differenceTypeEnumId;
                        ob.personCurrentToId = AvailableNumSto.data.items[i].data.personCurrentToId;//当前归属人
                        ob.currentStatus = AvailableNumSto.data.items[i].data.currentStatus;  
                        ob.cardId = AvailableNumSto.data.items[i].data.cardId;  
                        
                        ob.createdBy = session.logonAccount.cloudUserId;
                        ob.lastUpdatedBy = session.logonAccount.cloudUserId;
                        ob.marketingAreaId = session.logonAccount.marketingAreaId;
                        ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                        ob.orgId = session.logonAccount.cloudOrgId;
                        ob.differenceSortEnumId = 1;//可用数量差异
                        ob.testobjectType = cardType;
                        
                        AvailableNumList.push(ob);
                    }
                    differentDetailObj.AvailableNumList = AvailableNumList;
                    
                    var UnavailableNumList = new Array();
                    for(var i=0;i<UnavailableNum;i++){//不可用
                        var ob = new Object();
                        ob.number = UnavailableNumSto.data.items[i].data.number;
                        ob.differenceTypeEnumName = UnavailableNumSto.data.items[i].data.differenceTypeEnumName;
                        ob.differentDetail = UnavailableNumSto.data.items[i].data.differentDetail;
                        ob.differencesRemarks = UnavailableNumSto.data.items[i].data.differencesRemarks;
                        ob.differenceTypeEnumId = UnavailableNumSto.data.items[i].data.differenceTypeEnumId;
                        ob.personCurrentToId = UnavailableNumSto.data.items[i].data.personCurrentToId;
                        ob.currentStatus = UnavailableNumSto.data.items[i].data.currentStatus; 
                        ob.cardId = UnavailableNumSto.data.items[i].data.cardId;  
                        
                        ob.createdBy = session.logonAccount.cloudUserId;
                        ob.lastUpdatedBy = session.logonAccount.cloudUserId;
                        ob.marketingAreaId = session.logonAccount.marketingAreaId;
                        ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                        ob.orgId = session.logonAccount.cloudOrgId;
                        ob.differenceSortEnumId = 2;//不可用数量差异
                        ob.testobjectType = cardType;
                        
                        UnavailableNumList.push(ob);
                    }
                    differentDetailObj.UnavailableNumList = UnavailableNumList;
                    
                    var LendNumList = new Array();
                    for(var i=0;i<LendNum;i++){//借出
                        var ob = new Object();
                        ob.number = LendNumSto.data.items[i].data.number;
                        ob.differenceTypeEnumName = LendNumSto.data.items[i].data.differenceTypeEnumName;
                        ob.differentDetail = LendNumSto.data.items[i].data.differentDetail;
                        ob.differencesRemarks = LendNumSto.data.items[i].data.differencesRemarks;
                        ob.differenceTypeEnumId = LendNumSto.data.items[i].data.differenceTypeEnumId;
                        ob.personCurrentToId = LendNumSto.data.items[i].data.personCurrentToId;
                        ob.currentStatus = LendNumSto.data.items[i].data.currentStatus;  
                        ob.cardId = LendNumSto.data.items[i].data.cardId; 
                        
                        ob.createdBy = session.logonAccount.cloudUserId;
                        ob.lastUpdatedBy = session.logonAccount.cloudUserId;
                        ob.marketingAreaId = session.logonAccount.marketingAreaId;
                        ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                        ob.orgId = session.logonAccount.cloudOrgId;
                        ob.differenceSortEnumId = 3;//借出数量差异
                        ob.testobjectType = cardType;
                        
                        LendNumList.push(ob);
                    }
                    differentDetailObj.LendNumList = LendNumList;
                    
                    var selinfo = Ext.getCmp('checkEditgrid').getSelectionModel().getSelections();
                    selinfo[0].data.differentDetailObj = differentDetailObj;
                    selinfo[0].data.needFill = "2";//需填写并已填写

                    Ext.getCmp('differentWin').close();
                    var dd = Ext.get("a_"+aId);
                    Ext.get("a_"+aId).dom.innerHTML = "查看明细";
//                    Ext.get(aId).dom.href = "javascript: eo.differentDetail("+AvailableNum+","+UnavailableNum+","+LendNum+",\""+aId+"\")";
                    //alert("3="+Ext.getCmp("checkEditgrid").getStore().data.items[0].data.differentDetailObj);
                }
            },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('differentWin').close();
                }
            }]
        });
        
        var selinfo = Ext.getCmp('checkEditgrid').getSelectionModel().getSelections();
        var differentDetailObj = null;
        if(selinfo[0].data.differentDetailObj){
            differentDetailObj = selinfo[0].data.differentDetailObj;
        }
        
        if(differentDetailObj&&differentDetailObj.AvailableNumList&&differentDetailObj.AvailableNumList.length!=0){
            var lis = differentDetailObj.AvailableNumList;
            for(var i=0;i<lis.length;i++){
                var p = new Ext.data.Record(lis[i]);
                Ext.getCmp('AvailableNumGrid').getStore().add(p);
            }
        }
        if(differentDetailObj&&differentDetailObj.UnavailableNumList&&differentDetailObj.UnavailableNumList.length!=0){
            var lis = differentDetailObj.UnavailableNumList;
            for(var i=0;i<lis.length;i++){
                var p = new Ext.data.Record(lis[i]);
                Ext.getCmp('UnavailableNumGrid').getStore().add(p);
            }
        }
        if(differentDetailObj&&differentDetailObj.LendNumList&&differentDetailObj.LendNumList.length!=0){
            var lis = differentDetailObj.LendNumList;
            for(var i=0;i<lis.length;i++){
                var p = new Ext.data.Record(lis[i]);
                Ext.getCmp('LendNumGrid').getStore().add(p);
            }
        }
        
        if(operType=='detail'){
            Ext.getCmp('differentWinAddBut').hide();
            
        }
        
//        var p = new Ext.data.Record({"number":valusInfo.number,
//            "differenceTypeEnumId":Ext.getCmp('differenceTypeEnumId').getValue()
//            ,"differenceTypeEnumName":valusInfo.differenceTypeEnumId
//            ,"differentDetail":valusInfo.personCurrentToId
//            ,"personCurrentToId":valusInfo.personCurrentToId
//            ,"currentStatus":valusInfo.currentStatus
//            ,"differencesRemarks":valusInfo.differencesRemarks});
//        Ext.getCmp(idtmp).getStore().add(p);
//        Ext.getCmp('AvailableNumGrid').
//        differentDetailObj.AvailableNumList
//        differentDetailObj.UnavailableNumList
//        differentDetailObj.LendNumList
        
        
         formWin.show();
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

}

//处理日期的render
function formatDate(value){
    return value ? value.dateFormat('Y-m-d h:i:s') : '';
}