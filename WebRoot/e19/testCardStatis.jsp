<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<%@ include file="../common/deeptree/include/rmGlobal.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>测试卡统计</title>
<!-- 树目录用到的引入 -->
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.treedata.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>
<!-- 上传下载用到的引入 -->
<link type="text/css" rel="stylesheet" href="<%=path%>/common/udf/js/icon.css" />
<script type="text/javascript" src="<%=path%>/common/udf/js/swfupload.js"></script>
<script type="text/javascript" src="<%=path%>/common/udf/js/uploaderPanel.js"></script>
<script type="text/javascript" src="<%=path%>/common/udf/js/ztesoft.file.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/deeptree/css/deeptree.css" />
		<script type="text/javascript" src="<%=path%>/common/deeptree/js/showDeeptreeWin.js"></script>
		<script type="text/javascript" src="<%=path%>/common/deeptree/js/showFreetreeWin.js"></script>
</head>
<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script language="javascript" src="./js/testCardManageMod.js" ></script>
<script language="javascript" src="./js/jsonStroe.js" ></script>    
<script type="text/javascript">
var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var qryPnWidth = 680;
var qryPnHeight = 30;
var gridPnHeight = body_height - qryPnHeight;
var gridWidth = body_width*0.8;
var cnt = 30; //列表每页显示多少条数据

var testCardEnum = 1;//测试卡枚举值
var terminalEnum = 2;//测试终端枚举值
var teleCardEnum = 3;//固定电话枚举值
var rechCardEnum = 4;//充值卡枚举值

var oper = new PageOper();
var manaOper = new ManagerOper();
var modOper = new TestCardModOper();
var stroe = new jsonStroe();

var qryParams = new Object();
var testCardStatisParam = null;
var testCardStatisTestProvinceId = null;
var testCardStatisTestCityId = null;
var testCardStatisTestTypeEnumId = null;
var testCardStatisQryWin = null;

Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 
	qryParams.testProvinceId = session.logonAccount.provinceCompanyId;
	testCardStatisQryWin = oper.initQryWin();
    oper.init();
    testCardStatisQryWin.show();
 //   oper.doQuery();
});

function PageOper() {
    
    this.init = function() {
        var mainPanel = this.initMainPanel();
        var viewport = new Ext.Viewport({
            el : 'content',
            layout : 'border',
            margins : '5 5 5 5',
            items : [ mainPanel ]
        });
    }
    
    this.initMainPanel = function() {
        var tbar = this.initGridToolsBar();
        
        var  testPanel = this.initGrid();
        var mainPanel = new Ext.Panel({
            region : 'center',
            layout : 'border',
            items : [tbar,testPanel]
        });
        return mainPanel;
    }
    
    this.initGridToolsBar = function() {
        var tb = new Ext.Toolbar({region : 'north'});
        tb.add({
            text : '高级检索',
            xtype: 'ZTESOFT.Button',
            onClick : function() {
              //  oper.initQryWin();
              testCardStatisQryWin.show();
            }
        });
        tb.add("->");
        
        tb.add({
            text : '导出',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.expData();
            }
        });

        return tb;
    }
    
    this.initQryWin = function(){
  
        var qryFrom = this.initQryPn();
           return  new Ext.Window({
             id:'qryWin',
             title: '高级检索',
             closable:true,
             width: 680,
             height: 250,
             plain:true,
             modal: true,
//             layout : 'border',
             items: [qryFrom],
             buttonAlign:'center',
             buttons : [{
                 text : '查询',
                 id: 'qryBtn',
                 xtype: 'ZTESOFT.Button',
                 listeners : {
                     "click" : function() {
                     if(Ext.getCmp('creationStartDate').getValue()!=""&&Ext.getCmp('creationEndDate').getValue()!=""&&new Date(Date.parse(Ext.getCmp('creationStartDate').getValue()))>new Date(Date.parse(Ext.getCmp('creationEndDate').getValue()))){
                  Ext.Msg.alert("提示","开始时间不能晚于结束时间！");
                  return;
              }
                         oper.winQuery();
                         
                         testCardStatisQryWin.hide();
                     }
                 }
             },  {
                 text : '重置',
                 xtype: 'ZTESOFT.Button',
                 listeners : {
                     "click" : function() {
                         Ext.getCmp('qryForm').getForm().reset();
				//		 Ext.getCmp('testProvinceId').setValue('');
						 Ext.getCmp('testTypeEnumId').setValue('');
                     }
                 }
             },{
                 text : '关闭',
                 xtype: 'ZTESOFT.Button',
                 listeners : {
                     "click" : function() {
                         testCardStatisQryWin.hide();
                     }
                 }
             }]
         });
		 var ob = new Object();
         ob.data = testCardStatisParam;
         Ext.getCmp('qryForm').getForm().loadRecord(ob);
      }
    
    this.initQryPn = function() {
   
        var qryForm = new Ext.FormPanel({
            id : 'qryForm',
//            region : 'center',
            buttonAlign : 'right',
            frame : true,
            layoutConfig : {
                columns : 4
            },
            layout : 'table',
            bodyStyle : 'padding:10px;overflow-x:hidden;overflow-y:auto;',
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',
                hideLabel : true,
                width : 150,
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '归属省份'
                    }
                },
                {
                    colspan : 1,
                    items : [{
/*                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        triggerAction: 'all',
                        name : 'testProvinceId',
                        id : 'testProvinceId',
                        mode: 'local',
                        dict: false,
                        forceSelect : true,
                        editable : true,
                        url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
                        valueField: 'id',
                        displayField: 'text',
                        baseParams : {node:1},
                        value: testCardStatisTestProvinceId,
                        anchor : '100%',*/
						
						xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name :'testProvinceName',
                            id : 'testProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            readOnly:true,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'text',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                          //  value: testCardStatisTestProvinceId,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            value:session.logonAccount.provinceCompanyName,
                            anchor:'100%',
						
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('testProvinceId').setValue(record.id);
                            }
                        }
                        },{
                          xtype : 'hidden',
                          value:session.logonAccount.provinceCompanyId,
                          name : 'testProvinceId',
                          id : 'testProvinceId'
                      }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '归属地市'
                    }
                },
                {
                    colspan : 1,
                    items : [{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'testCityName',
                        id : 'testCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                        forceSelect : true,
                        editable : true,
                        //value :session.logonAccount.cityCompanyName,
                        value:'',
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                           listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('testCityId').setValue(record.data.id);
                            }
                        },
                        anchor : '100%'
                    },{
                         xtype : 'hidden',
                          name : 'testCityId',
                          id : 'testCityId'
                      }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '测试卡类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'testTypeEnumId',
                        id : 'testTypeEnumId',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        value: testCardStatisTestTypeEnumId,
                        store: stroe.testCardStore,
                        anchor : '100%'
                    }
                },
                        {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '存放部门'
                        }
                    },
 
                {
                             colspan :1,
                             items : [{xtype:'ZTESOFT.popupfield',
                             hideLabel : true,
                             readOnly:true,
                       //      value:session.logonAccount.userDeptName,
                            id : 'storageDepartmentNameQry',
                            name : 'storageDepartmentNameQry',
//                            fieldLabel : '被清查部门',
                     //       valueFile : 'attributionDepartmentId',
                            readOnly:true,
                            onPopup : function() {
                                //选择事件逻辑
                                oper.openWin();
                            },
                             anchor:'100%'
                                    }, {
                            xtype : 'hidden',
                            name : 'storageDepartmentId',
                            id : 'storageDepartmentId'
                        }]
                                }
   /*              {
                    colspan : 2,
                    width : 150*2,
                    items : {
                        xtype: 'radiogroup',
                        hideLabel : true,
                        id : 'statisRadio',
                        name : 'statisRadio',
                        anchor : '100%',
                        items: [
                            {boxLabel: '按省分统计', name: 'statisRadioItem', inputValue: 1,width:150},
                            {boxLabel: '按本地网统计', name: 'statisRadioItem', inputValue: 2,width:150,checked: true}
                        ],
                        listeners : {
                            change : function(radiofield,oldvalue){
                                if(radiofield.getValue().inputValue == 1){ 
                                    Ext.getCmp('testCityId').setValue('');
                                    Ext.getCmp('testCityId').setDisabled(true);
                                }else if(radiofield.getValue().inputValue == 2){ 
                                    Ext.getCmp('testCityId').setDisabled(false);
                                }
                            }
                        }
                    }
                } */, {
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
                                            name : 'creationStartDate',
                                            id : 'creationStartDate',         
                                            format : 'Y-m-d H:i:s',
                                        anchor : '100%'        
                                    }]
                                },  {
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
                                            name: 'creationEndDate',
                                            id : 'creationEndDate',
                                            format : 'Y-m-d H:i:s',
                                        anchor : '100%'
                                    }]
                                }   
            
                
            ]
        });
         if(session.logonAccount.provinceCompanyId){
        var cityCombo = Ext.getCmp('testCityName');
        cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                    method:'post'
                                });
                                cityCombo.getStore().load();
        }
        return qryForm;
    };
    this.openWin = function(){
    		var _nodeRelationType="noRelation";
            var _isOnlyLeaf="0";
            var _inputType="radio";
            var _orgId = null;//session.org.cloudOrgId;
            var freeTreeObj = new FreeTreeObj("storageDepartmentOrg",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
            freeTreeObj.showTree(function(data){
                Ext.getCmp('storageDepartmentNameQry').setValue(data.text);
                Ext.getCmp('storageDepartmentId').setValue(data.id);
            });
    }
    
    this.winQuery = function(){
        var param = {};
        param = Ext.getCmp('qryForm').getForm().getValues();
		if(Ext.getCmp('testProvinceId').getValue()!=null&&Ext.getCmp('testProvinceId').getValue()!=""){
			param.testProvinceId = Ext.getCmp('testProvinceId').getValue();
		}else{
			param.testProvinceId = null;
		}
		if(Ext.getCmp('testCityId').getValue()!=null&&Ext.getCmp('testCityId').getValue()!=""){
			param.testCityId = Ext.getCmp('testCityId').getValue();
		}else{
			param.testCityId = null;
		}
		if(Ext.getCmp('testTypeEnumId').getValue()!=null&&Ext.getCmp('testTypeEnumId').getValue()!=""){
		param.testTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
		}else{
		param.testTypeEnumId = null;
		}
   //     param.testobjectTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
        qryParams = param;
		testCardStatisTestProvinceId = Ext.getCmp('testProvinceId').getValue();
        testCardStatisTestCityId = Ext.getCmp('testCityId').getValue(); 
        testCardStatisTestTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
		testCardStatisParam = Ext.getCmp('qryForm').getForm().getValues();
		testCardStatisParam.testProvinceId = null;
		testCardStatisParam.testCityId = null; 
		testCardStatisParam.testTypeEnumId = null;
		testCardStatisParam.creationStartDate = null;
		testCardStatisParam.creationEndDate = null;
		//testCardStatisParam.testTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
        oper.doQuery();
    }
    this.doQuery = function(){    
        ZTESOFT.invokeAction(
                PATH+'/e19/testCardStatisAction.json?method=getTestCardStatisInfo',
                qryParams,
                function(response){
                    Ext.getCmp('statisGrid').store.removeAll();
                    Ext.getCmp('statisGrid').store.loadData(response);
                }
        );
    } 

    this.qryListGrid = function(gridName,param){
        Ext.getCmp(gridName).store.on('beforeload', function(store) {
            if (Ext.getCmp(gridName).store.lastOptions != null) {
                Ext.getCmp(gridName).store.baseParams = param;
            }
        });

        Ext.getCmp(gridName).store.load({
            params : {
                start : 0,
                limit : Ext.getCmp(gridName).getPageSize()//步数
            }
        
        });

        Ext.getCmp(gridName).store.on('load', function() {
            Ext.getCmp(gridName).getSelectionModel().selectFirstRow();
        });
    }
    

    this.initGrid = function() {
        //创建列   
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel([
            cm,         
            new Ext.grid.RowNumberer({header:'序号',width:40}),
            {header:'测试卡类型ID',dataIndex:'testobjectTypeEnumId',hidden:true},
            
            {header:'测试卡类型',dataIndex:'testobjectTypeEnumName',width:gridWidth*0.1},
            
            {header:'总卡数',dataIndex:'totalCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(1,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1},
            {header:'正常卡',dataIndex:'normalCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(2,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1},
            {header:'故障卡',dataIndex:'faultCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(3,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1},
            {header:'报废卡',dataIndex:'unUsedCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(4,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1},
            {header:'送修卡',dataIndex:'fixingCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(5,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1},
            {header:'欠费停机卡',dataIndex:'overDueNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(6,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.15},
            {header:'SIM卡注册失败卡',dataIndex:'failRegisterNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(7,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.15}, 
            {header:'外借数',dataIndex:'lendCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(8,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1},
            {header:'未借数',dataIndex:'leftCardNum',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail(9,'+record.data.testobjectTypeEnumId+');">' + value + '</a>';
            },width:gridWidth*0.1}
            
        ]);
        var grid = new ZTESOFT.Grid({
            id : 'statisGrid',
            region : 'center',//在父容器里的位置
            height : gridPnHeight,//默认宽度为自适应的，一般不用设置
            title : '测试卡统计信息',
            cm : column,//列定义
            pageSize : cnt,//页纪录数
//            collapsible : true,//是否可以收缩
            url:PATH+'/e19/testCardStatisAction.json?method=getTestCardStatisInfo',
            sm :cm                       
        });

        return grid;    

    }
    
    this.expData = function(){
        var param = qryParams;
        if(qryParams.testCityId ==null){
				param.testCityId = "";
				}
				if(qryParams.testTypeEnumId ==null){
				param.testTypeEnumId = "";
				}
        param.serviceClass = 'com.unicom.ucloud.eom.e19.service.TestCardStatServiceImpl';
		
		var selinfo = Ext.getCmp('statisGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.testobjectTypeEnumId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.testobjectTypeEnumId;
                    }
                    param.selectIds = selectIds;
                }else{
					param.selectIds = "0";
				}
        new ZTESOFT.FileUtil().exportData(param);
    }
    
    this.expDataStatic = function(index,typeId){
    		var param = new Object();
				manaOper.cloneAll(qryParams,param);
				if(qryParams.testCityId ==null){
				param.testCityId = "";
				}
				if(qryParams.testTypeEnumId ==null){
				param.testTypeEnumId = "";
				}
            param.cardType = typeId;
            param.testobjectTypeEnumId = typeId;
                // 1.总卡数 2.正常卡3.故障卡4.报废卡5.送修卡6.外借卡7.余卡数
                if(index == 1){//全部卡  
                }else if(index == 2){//正常卡
                    param.testcardStatusEnumId = '1';
                }else if(index == 3){//故障卡
                    param.testcardStatusEnumId = '2';
                }else if(index == 4){//报废卡
                    param.testcardStatusEnumId = '3';
                }else if(index == 5){//送修卡
                    param.testcardStatusEnumId = '4';
                }else if(index == 6){
                	param.testcardStatusEnumId = '5';
                }else if(index == 7){
               		param.testcardStatusEnumId = '6';
                }
                 else if(index == 8){//借出卡
                    param.lendFlag = '1';           
                }else if(index == 9){//剩余卡
                    param.lendFlag = '0';         
                }
            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ExpTestCardStatServiceImpl';
            if(typeId == testCardEnum){
                var selinfo = Ext.getCmp('testGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.testCardId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.testCardId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
            }else if(typeId == teleCardEnum){   
                var selinfo = Ext.getCmp('teleGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.fixedTelId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.fixedTelId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
            }else if(typeId == terminalEnum){
                var selinfo = Ext.getCmp('termiGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.testTerminalId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.testTerminalId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
            }else if(typeId == rechCardEnum){
                var selinfo = Ext.getCmp('rechGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.rechCardId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.rechCardId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
            }
            
            
            new ZTESOFT.FileUtil().exportData(param);
    }
    
    
    this.doViewDetail = function(index,typeId){       
        manaOper.initWindow(index,typeId);
    }
}


function ManagerOper(){
    //主窗口
    this.winTitle = '';
    this.initWindow = function(index,typeId){
        var formPanel = this.initFormPanel(typeId);

        if(typeId == testCardEnum){
            this.winTitle = '测试卡信息列表';
        }else if(typeId == teleCardEnum){
            this.winTitle = '固定电话信息列表';
        }else if(typeId == terminalEnum){
            this.winTitle = '测试终端信息列表';
        }else if(typeId == rechCardEnum){
            this.winTitle = '充值卡信息列表';
        }
        
        this.initGridData(index,typeId);
    
        var formWin = new Ext.Window({
            id:'statsWin',
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
                oper.expDataStatic(index,typeId);
            }
       		  },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('statsWin').close();
                }
            }]
        });
         formWin.show();
         
    }

    this.initFormPanel = function(typeId){

        var infoPage = this.getPn(typeId);
        return infoPage;
      
    }
    
            this.getPn = function(typeId){
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
					sm:new Ext.grid.CheckboxSelectionModel(),
                    url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage'                     
                });

                return grid;
            }
            
          //初始化grid列
          this.getGridColumn = function(typeId){
              var column = null;
              if(typeId == testCardEnum){
                  column = new Ext.grid.ColumnModel([ 
                  	  new Ext.grid.CheckboxSelectionModel(), 
                      new Ext.grid.RowNumberer({header:'序号',width:40}),
                      {header:'ID',dataIndex:'testCardId',hidden:true},
        //              {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true}, 
                      {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},  
                      {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.08}, 
                      {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.08},
                      {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                      {header:'测试卡类别',dataIndex:'testcardTypeEnumName',width:gridWidth*0.1},
                      {header:'测试卡编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                          return '<a href="#" onclick="manaOper.viewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                      },width:gridWidth*0.09},
                      {header:'用户号码',dataIndex:'subscriberNumber',width:gridWidth*0.09},
                      {header:'测试卡卡号',dataIndex:'cardNo',width:gridWidth*0.09},
                      {header:'IMSI',dataIndex:'imsi',width:gridWidth*0.09},
                 //     {header:'编号',dataIndex:'number',width:gridWidth*0.1},
                      {header:'测试卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                      {header:'余额',dataIndex:'balance',width:gridWidth*0.08,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                          return value ? parseFloat(value) : '';
                        }
                      },
                      {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                	  {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                      {header:'管理员',dataIndex:'adminName',width:gridWidth*0.08},
                      {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.07},
                	  {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                      {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.07}
                  ]);
              }else if(typeId == teleCardEnum){
                  column = new Ext.grid.ColumnModel([
                  									 new Ext.grid.CheckboxSelectionModel(),  
                                                     new Ext.grid.RowNumberer({header:'序号',width:40}),
                                                     {header:'ID',dataIndex:'fixedTelId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.11},
                                                     {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.08},
                                                     {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                                                     {header:'固定电话编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                                         return '<a href="#" onclick="manaOper.viewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                                                     },width:gridWidth*0.12},
                                                     {header:'电话号码',dataIndex:'phoneNumber',width:gridWidth*0.11},
                                                     {header:'固定电话状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.15},
                                                     {header:'功能',dataIndex:'teleFunction',width:gridWidth*0.11},
                                                     {header:'类型',dataIndex:'fixedPhoneTypeEnumName',width:gridWidth*0.11},
                                                     {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                									 {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                                                     {header:'管理员',dataIndex:'adminName',width:gridWidth*0.11},
                                                     {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.11},
                									 {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.11},
                      								 {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.11}
                                                 ]);
              }else if(typeId == terminalEnum){
                  column = new Ext.grid.ColumnModel([  
                  									 new Ext.grid.CheckboxSelectionModel(),
                                                     new Ext.grid.RowNumberer({header:'序号',width:40}),
                                                     {header:'ID',dataIndex:'testTerminalId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                                                     {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.08},
                                                     {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                                                     {header:'测试终端编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                                         return '<a href="#" onclick="manaOper.viewDetail(terminalEnum,'+record.data.testTerminalId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                                                     },width:gridWidth*0.15},
                                                     {header:'手机串号',dataIndex:'imei',width:gridWidth*0.1},
                                                     {header:'手机类型',dataIndex:'moblieTypeEnumName',width:gridWidth*0.1},
                                                     {header:'手机型号',dataIndex:'phoneModel',width:gridWidth*0.1},
                                                     {header:'测试终端状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.15},
                                                     {header:'厂家',dataIndex:'manufacturerName',width:gridWidth*0.1},
                                                     {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
               										 {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                                                     {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                                                     {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.1},
                	  								 {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                      								 {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.1}
                                                 ]);
              }else if(typeId == rechCardEnum){
                  column = new Ext.grid.ColumnModel([  
                                                     new Ext.grid.CheckboxSelectionModel(),
                                                     new Ext.grid.RowNumberer({header:'序号',width:40}),
                                                     {header:'ID',dataIndex:'rechCardId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                                                     {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.11},
                                                     {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.08},
                                                     {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                                                     {header:'充值卡编号',dataIndex:'cardNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                                          return '<a href="#" onclick="manaOper.viewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                                                     },width:gridWidth*0.12},
                                                     {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.11},
                                                     {header:'面值',dataIndex:'parValueName',width:gridWidth*0.11},
                                                     {header:'卡类型',dataIndex:'rechCardTypeEnumName',width:gridWidth*0.11},
                                                     {header:'充值卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                                                     {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
               										 {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                                                     {header:'管理员',dataIndex:'adminName',width:gridWidth*0.11},
                                                     {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.11},
                	 								 {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.11},
                      								 {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.11}
                                                 ]);
              }
              return column;
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
            }
            
            this.initGridData = function(index,typeId){
				var param = new Object();
		//		qryParams.selectIds = "";
				this.cloneAll(qryParams,param);
				if(qryParams.testCityId ==null){
				param.testCityId = "";
				}
				if(qryParams.testTypeEnumId ==null){
				param.testTypeEnumId = "";
				}
                param.testobjectTypeEnumId = typeId;
                // 1.总卡数 2.正常卡3.故障卡4.报废卡5.送修卡6.欠费停机卡7.SIM卡注册失败卡8.外借卡9.余卡数
                if(index == 1){//全部卡  
                }else if(index == 2){//正常卡
                    param.testcardStatusEnumId = '1';
                }else if(index == 3){//故障卡
                    param.testcardStatusEnumId = '2';
                }else if(index == 4){//报废卡
                    param.testcardStatusEnumId = '3';
                }else if(index == 5){//送修卡
                    param.testcardStatusEnumId = '4';
                }else if(index ==6){//欠费停机卡
                	param.testcardStatusEnumId = '5';
                }else if(index ==7){//SIM卡注册失败卡
                	param.testcardStatusEnumId = '6';
                }
                else if(index == 8){//借出卡
                    param.lendFlag = '1';           
                }else if(index == 9){//剩余卡
                    param.lendFlag = '0';         
                }
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
				
                this.qryListGrid(gridName,param);
            }
			
			 this.cloneAll = function(fromObj,toObj){      
				 for(var i in fromObj){     
					 if(typeof fromObj[i] == "object"){            
					 toObj[i]={};            
					 this.cloneAll(fromObj[i],toObj[i]);            
					 continue;         
					 }         
				 toObj[i] = fromObj[i];      
				 }   
			 } 
        
        this.viewDetail = function(typeId,value,attributionProvinceId){
            var items = [];
            var param = {};
            param.attributionProvinceId = attributionProvinceId; 
            param.testobjectType = typeId;
            ZTESOFT.invokeAction(
                    PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList',
                    param,
                    function(response){
						var priItems = modOper.getPriItems(typeId);
                        items.push(priItems);
                        var pubItems = modOper.getPubItems(typeId);
                        items.push(pubItems);
                         if(response && response.rows && response.rows.length > 0){
                            modOper.autoSetItem(response.rows,items);
                        }
						
                        modOper.initWindow('detail',typeId,value,items);
                    }
            );
        }
}

</script>