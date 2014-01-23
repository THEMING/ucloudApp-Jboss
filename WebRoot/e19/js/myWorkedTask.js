var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var qryPnHeight = 120;
var gridPnHeight = body_height - qryPnHeight;
var gridWidth = body_width;
var count = 30; //列表每页显示多少条数据
//var session = new Object();
var urlLoginId = session.logonAccount.accountId;
var processModelId = "";
var myUndoTaskWholeParam = new Object();

var myUndoTask = new MyUndoTask();
var manager = new DetailWin();
var myWorkedTaskUrgencyLevelQry = "";
//var manaUndoOper = new ManaUndoOper();
//var finishOper = new FinishOper();

Ext.onReady(function() {
	
//	var str=window.location.href;
//    //alert(str);
//    var es=/urlLoginId=/; 
//    es.exec(str); 
//    urlLoginId=RegExp.rightContext;
	
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 

    myUndoTask.init();

});

function MyUndoTask() {

    this.init = function() {
//    	this.initSession();
        var mainPanel = this.initMainPanel();
        var viewport = new Ext.Viewport({
            //所有的页面元素最终都加入到这个显示容器中，并且添加到页面的ID为content的div中，
            //也可以单个元素直接加到页面dom元素，但不建议
            el : 'content',
            layout : 'border',
            margins : '5 5 5 5',
            items : [ mainPanel ]
        });
        var qryParam = new Object();
//        qryParam.processDefId = 'com.unicom.ucloud.eom.e19.allot';//'41';
        qryParam.loginId = session.logonAccount.accountId;//'tiger';
        myUndoTask.qryListGrid(qryParam);
//        myUndoTaskWholeParam.loginId = urlLoginId;
//        myUndoTask.qryListGrid(myUndoTaskWholeParam);
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
        //查询form
//        var qryTb = this.initAppQryPn();
        var tbar = this.initGridToolsBar();
        //grid
        var  testPanel = this.initTestGrid();

        //主面板
        var mainPanel = new Ext.Panel({
            region : 'center',
            layout : 'border',//这种布局方式类似地图，子元素按方位布局
            items : [tbar,testPanel]
        });
        return mainPanel;
        
//        var myWorkedFinishPanel = new Ext.Panel({
//                id:'myWorkedFinish',
//                labelAlign: 'left',
////                layout: 'border',
//                frame:true,
//                autoScroll :true,
//                title:'已办（完成）',
//                width:720,//Ext.getBody().getSize(),
////                height:800,
//                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;width:740px',
//                labelWidth: 70,
//                items: [tbar,testPanel]//auditHisList,auditHisDetail
//            });
//            
//         var myWorkedUnFinishPanel = new Ext.Panel({
//                id:'myWorkedUnFinish',
//                labelAlign: 'left',
////                layout: 'border',
//                frame:true,
//                autoScroll :true,
//                title:'已办（未完成）',
//                width:720,//Ext.getBody().getSize(),
////                height:800,
//                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;width:740px',
//                labelWidth: 70,
//                items: []//auditHisList,auditHisDetail
//            });
//            
//         var myWorkedTabPanel = new Ext.TabPanel({
//                activeTab: 0,
//                region: 'center',
//                bodyStyle:'padding:0px;overflow-x:auto;overflow-y:auto;width:740px',
//                items: [myWorkedFinishPanel,myWorkedUnFinishPanel]//orderInfoForm
////                ,tab2,p3,p4]
//            });
            
//         return myWorkedTabPanel;
    }
    
    this.initTestCardOrderApplyQryWin = function(){
            //qery
              var qryFrom = this.initAppQryPn();
              
              new Ext.Window({
                  id:'qryWin',
                  title: '高级检索',
                  closable:true,
                  width: 716,
                  height: 310,
                  layout: 'border',
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
                          	if((Ext.getCmp('requiredFinishTimeStartQry').getValue()!=""&&Ext.getCmp('requiredFinishTimeEndQry').getValue()=="")
                            ||(Ext.getCmp('requiredFinishTimeEndQry').getValue()!=""&&Ext.getCmp('requiredFinishTimeStartQry').getValue()=="")){
                             Ext.Msg.alert("提示","建议完成开始时间和结束时间必须同时设定！");
                             return;
                            }
                            
                            if(Ext.getCmp('requiredFinishTimeStartQry').getValue()!=""&&Ext.getCmp('requiredFinishTimeEndQry').getValue()!=""
                            &&new Date(Date.parse(Ext.getCmp('requiredFinishTimeStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('requiredFinishTimeEndQry').getValue()))){
                             Ext.Msg.alert("提示","建议完成开始时间不能晚于建议完成结束时间！");
                             return;
                            }
                            if((Ext.getCmp('startTime').getValue()!=""&&Ext.getCmp('endTime').getValue()=="")||(Ext.getCmp('endTime').getValue()!=""&&Ext.getCmp('startTime').getValue()=="")){
                             Ext.Msg.alert("提示","开始时间和结束时间必须同时设定！");
                             return;
                            }
                            
                            if(Ext.getCmp('startTime').getValue()!=""&&Ext.getCmp('endTime').getValue()!=""&&new Date(Date.parse(Ext.getCmp('startTime').getValue()))>new Date(Date.parse(Ext.getCmp('endTime').getValue()))){
                             Ext.Msg.alert("提示","开始时间不能晚于结束时间！");
                             return;
                            }
                            
                            var qryParam = Ext.getCmp('qryTestForm').getForm().getValues();
//                        var temp = Ext.getCmp('taskType').getValue();
//                        qryParam.processDefId = temp.substring(temp.indexOf("$$$$")+4,temp.length);
//                        qryParam.activityDefId = Ext.getCmp('stepId').getValue();
                        urlLoginId = qryParam.loginId;
                        
                        myUndoTaskWholeParam = qryParam;
                            
                        myUndoTask.qryListGrid(qryParam);
                              
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
                              Ext.getCmp('qryTestForm').getForm().reset();
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
              
              if(myUndoTaskWholeParam.processDefIdId!=null){
                var ob2 = new Object();
                ob2.value = myUndoTaskWholeParam.processDefIdId+"$$$$";
                myUndoTask.taskTypeOnSelect(ob2);
              }
              
              var ob = new Object();
              ob.data = myUndoTaskWholeParam;
              Ext.getCmp('qryTestForm').getForm().loadRecord(ob);
          }
    
    this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar({region : 'north'});
            
            tb.add({
                text : '高级检索',
                //disabled: true,
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                    //alert('高级检索');
                    new MyUndoTask().initTestCardOrderApplyQryWin();
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
//
//            tb.add({
//                text : '添加',
//                onClick : function() {
//                    oper.detail("add");
//                }
//            },"-");//加这个符号，会在页面上添加一个竖线分隔符
//            tb.add({
//                text : '撤单',
//                onClick : function() {
//                    oper.del();
//                }
//            },"-");
//            tb.add({
//                text : '编辑',
//                onClick : function() {
//                    oper.detail("mod");
//                }
//            },"-");
////            tb.add({
////                text : '批量导入',
////                onClick : function() {
////                    oper.del();
////                }
////            },"-");
            tb.add({
                text : '催办',
                onClick : function() {
                	myUndoTask.urge();
                }
            });
            

            return tb;
        }
        
    //催办
        this.urge = function(){
            
            
            var selinfo = Ext.getCmp('undoTaskGrid').getSelectionModel().getSelections();
            if (selinfo.length != 1) {
                Ext.Msg.alert('操作提示', '请先选择一条要催办的任务');
                return;
            }
            
            var param = {
                    processInstID : selinfo[0].data.processInstID,
                    accountId : session.logonAccount.accountId
            }
            
            var url = PATH+'/e19/testCardCommonAction.json?method=findDoingParticipant';
            ZTESOFT.invokeAction(url, param, function(response) {
                if (response) {
                    testCardOrderUrge.initWindow(response,selinfo[0].data);
                } 
            });
        }

    this.initAppQryPn = function() {

        var taskTypeStore = new Ext.data.JsonStore({
            remoteSort: true,
            fields: ['processDefId', 'processChName'],
            baseParams:{accountId:session.logonAccount.accountId,password:"000000"},
            proxy: new Ext.data.HttpProxy({
                url: PATH + '/e19/tcmBpsAction.json?method=getAllProccess'
            })

        });
        var stepIdStore = new Ext.data.JsonStore({
            remoteSort: true,
            fields: ['activityId', 'activityName']
        //baseParams:{a:'22'},
        /*proxy: new Ext.data.HttpProxy({
               url: PATH + '/e22/managerSetting/CnsBpsAction.json?method=getAllProccess'
           })*/

        });
        var qryTestForm = new Ext.FormPanel({
            id : 'qryTestForm',
            region : 'center',//在父容器中的位置，按地图方位布局，只有一个元素时用center
            labelAlign : 'right',//按键的对齐方式
//            labelWidth : 80,//标签宽度
            frame : true,
            //collapsible : true,//是否可收缩
            //title : '查询条件',
            height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
            width : body_width,
            layoutConfig : {
                            columns : 2 * 2
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:14px;overflow-x:hidden;overflow-y:auto;',
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
                   /*             {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '任务类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
//                        fieldLabel : '任务类型',
                        name : 'taskType',
                        id : 'taskType',
                        valueField : 'processDefId',
                        displayField : 'processChName',
                        mode: 'local',
                        triggerAction: 'all',
                        value : '',
//                        store : new Ext.data.ArrayStore({
//                            fields: ['processDefId','processChName'],
//                            data:[
//                                ['117$$$$com.unicom.ucloud.eom.e19.allot','测试卡调拨流程'],
//                                ['118$$$$com.unicom.ucloud.eom.e19.transfer','测试卡移交流程'],
//                                ['119$$$$com.unicom.ucloud.eom.e19.lend','测试卡借用流程'],
//                                ['120$$$$com.unicom.ucloud.eom.e19.return','测试卡归还流程'],
//                                ['121$$$$com.unicom.ucloud.eom.e19.dumping','测试卡报废流程'],
//                                ['122$$$$com.unicom.ucloud.eom.e19.check','测试卡清查流程']
//                            ]
//                        }),
                        store:taskTypeStore,
                        anchor : '100%',
                        listeners:{
                            select: function(combo, record, index){                           
                                var processDefId = combo.value.substring(0,combo.value.indexOf("$$$$"));
                                var twoCombo = Ext.getCmp('stepId');
                                twoCombo.clearValue();
                                twoCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH + '/e19/tcmBpsAction.json?method=getAllActivityByProcessId&processDefId='+processDefId+'&accountId='+session.logonAccount.accountId+'&password=000000', 
                                    method:'post'
                                });
                                twoCombo.getStore().load();
                                Ext.getCmp('processDefIdId').setValue(processDefId);
                                
                                Ext.getCmp('processDefId').setValue(combo.value.substring(combo.value.indexOf("$$$$")+4,combo.value.length));
//                                Ext.getCmp('processDefId').setValue(combo.value.substring(0,combo.value.indexOf("$$$$")));
                                Ext.getCmp('activityDefId').setValue("");
                            }
                        }
                    },{
                                xtype:'hidden',
                                name: 'processDefId',
                                id: 'processDefId'
                            },{
                                xtype:'hidden',
                                name: 'processDefIdId',
                                id: 'processDefIdId'
                            }]
                                },*/
          /*                      {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '环节'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
//                        fieldLabel : '环节',
                        name : 'stepId',
                        id : 'stepId',
                        valueField : 'activityId',
                        displayField : 'activityName',
                        mode: 'local',
                        triggerAction: 'all',
                        value : '',
                        store: stepIdStore,
                        anchor : '100%',
                        listeners:{
                            select: function(combo, record, index){   
                                
                                Ext.getCmp('activityDefId').setValue(combo.value);
                            }
                        }
                    },{
                                xtype:'hidden',
                                name: 'activityDefId',
                                id: 'activityDefId'
                            }]
                                },*/
                             /*   {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单流水号'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype: 'ZTESOFT.textfield',
                        hideLabel : true,
//                        fieldLabel : '工单标题',
                        name : 'woNoQry',
                        id : 'woNoQry',
                        anchor : '100%'
                            }]
                                },*/
                    {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '工单编码'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'jobCode',
                        id : 'jobCode',
                        anchor : '100%'
                    }
                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单标题'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                    	xtype: 'ZTESOFT.textfield',
                        hideLabel : true,
//                        fieldLabel : '工单标题',
                        name : 'jobTitle',
                        id : 'jobTitle',
                        anchor : '100%'
                            }]
                                },
                       /*         {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '缓急程度'
                                    }
                                },{
                                    colspan : 1,
//                                    items : [{
//                                        xtype: 'ZTESOFT.textfield',
//                                        hideLabel : true,
//                //                        fieldLabel : '工单标题',
//                                        name : 'urgencyLevelQry',
//                                        id : 'urgencyLevelQry',
//                                        anchor : '100%'
//                                    }
                                    items : [{                            
                                         xtype: 'ZTESOFT.enum',
                                        hideLabel : true,
//                                         fieldLabel : '工单状态',
                                         name : 'urgencyLevelNameQry',
                                         id : 'urgencyLevelNameQry',
                                         valueField: 'dataValue',
                                         displayField: 'dataName',
                                         mode: 'local',
                                         typeAhead : true,
                                         triggerAction: 'all',
                                         editable : false ,
                                         dict: true,
                                         dictType:'URGENCY_LEVEL',
                                         value:myWorkedTaskUrgencyLevelQry==""?"":null,
                                         anchor : '100%',
                                         listeners:{
                                            select: function(combo, record, index){   
                                                
                                                Ext.getCmp('urgencyLevelQry').setValue(combo.value);
                                                myWorkedTaskUrgencyLevelQry = combo.value;
                                            }
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'urgencyLevelQry',
                                        id: 'urgencyLevelQry'
                                    }]
                                },*/
                   /*             {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '执行对象'
                                    }
                                },{
                                    colspan : 1,
                                    items : [
//                                      {
//                                        xtype: 'ZTESOFT.textfield',
//                                        hideLabel : true,
//                //                        fieldLabel : '工单标题',
//                                        name : 'flowExecutorQry',
//                                        id : 'flowExecutorQry',
//                                        anchor : '100%'
//                                    }
                                    {xtype:'ZTESOFT.popupfield',
                                    hideLabel : true,
                                            id : 'flowExecutorNameQry',
                                    name : 'flowExecutorNameQry',
        //                            fieldLabel : '被清查部门',
                                    valueFile : 'flowExecutorQry',
                                    readOnly:true,
                                    onPopup : function() {
                                        var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="checkbox";
                                        var _orgId = 1;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            var qq = data;
                                            
                                            if(data.thisType=="Person"){
                                                Ext.getCmp("flowExecutorQry").setValue(data.accountId);
                                            }else{
                                                Ext.getCmp("flowExecutorQry").setValue(data.id);
                                            }
                                            Ext.getCmp("flowExecutorNameQry").setValue(data.text);
                            //                Ext.getCmp("attributionDepartmentId").setValue(data.accountId);
                                        });
                                    },
                                                    anchor:'100%'
                                            }, {
                                    xtype : 'hidden',
                                    name : 'flowExecutorQry',
                                    id : 'flowExecutorQry'
                                }]
                                },*/
//                                {
//                                    colspan : 1,
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '派发人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    items : [{
//                                        xtype: 'ZTESOFT.textfield',
//                        hideLabel : true,
////                        fieldLabel : '派发人',
//                        name : 'sendPersonId',
//                        id : 'sendPersonId',
//                        anchor : '100%'
//                            }]
//                                },
                        /*        {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建议完成开始时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype: 'ZTESOFT.datefield',
                        hideLabel : true,
//                        fieldLabel : '开始时间',
                        name : 'requiredFinishTimeStartQry',
                        id : 'requiredFinishTimeStartQry',
                        format : 'Y-m-d h:i:s',
                        anchor : '100%'
                            }]
                                },*/
                     /*           {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建议完成结束时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype: 'ZTESOFT.datefield',
                        hideLabel : true,
//                        fieldLabel : '结束时间',
                        name : 'requiredFinishTimeEndQry',
                        id : 'requiredFinishTimeEndQry',
                        format : 'Y-m-d h:i:s',
                        anchor : '100%'
                            }]
                                },*/
                      /*          {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '任务实例创建开始时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype: 'ZTESOFT.datefield',
                        hideLabel : true,
//                        fieldLabel : '开始时间',
                        name : 'startTime',
                        id : 'startTime',
                        format : 'Y-m-d h:i:s',
                        anchor : '100%'
                            }]
                                },*/
                             /*   {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '任务实例创建结束时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype: 'ZTESOFT.datefield',
                        hideLabel : true,
//                        fieldLabel : '结束时间',
                        name : 'endTime',
                        id : 'endTime',
                        format : 'Y-m-d h:i:s',
                        anchor : '100%'
                            }]
                                },*/
                                {
                                    colspan : 1,
                                    hidden:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '用户名'
                                    }
                                },{
                                    colspan : 1,
                                    hidden:true,
                                    items : [{
                                        xtype: 'ZTESOFT.textfield',
                        hideLabel : true,
//                        fieldLabel : '用户名',
                        name : 'loginId',
                        id : 'loginId',
                        value:session.logonAccount.accountId,//'tiger',
                        anchor : '100%'
                            }]
                                }
            ]
//            items : [{
//                layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉//
//                items : [{
//                    columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性//
//                    layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
//                    items : [{
//                        xtype: 'combo',
//                        fieldLabel : '任务类型',
//                        name : 'taskType',
//                        id : 'taskType',
//                        valueField : 'processDefId',
//                        displayField : 'processChName',
//                        mode: 'local',
//                        triggerAction: 'all',
//                        value : '',
//                        store : new Ext.data.ArrayStore({
//                            fields: ['processDefId','processChName'],
//                            data:[
//                                ['41$$$$com.unicom.ucloud.eom.e19.allot','测试卡调拨流程'],
//                                ['61$$$$com.unicom.ucloud.eom.e19.transfer','测试卡移交流程'],
//                                ['62$$$$com.unicom.ucloud.eom.e19.lend','测试卡借用流程'],
//                                ['63$$$$com.unicom.ucloud.eom.e19.return','测试卡归还流程'],
//                                ['64$$$$com.unicom.ucloud.eom.e19.dumping','测试卡报废流程'],
//                                ['65$$$$com.unicom.ucloud.eom.e19.check','测试卡清查流程']
//                            ]
//                        }),
//                        anchor : '95%',
//                        listeners:{
//                            select: function(combo, record, index){                           
//                                var processDefId = combo.value.substring(0,combo.value.indexOf("$$$$"));
//                                var twoCombo = Ext.getCmp('stepId');
//                                twoCombo.clearValue();
//                                twoCombo.getStore().proxy = new Ext.data.HttpProxy({
//                                    url:PATH + '/e19/tcmBpsAction.json?method=getAllActivityByProcessId&processDefId='+processDefId, 
//                                    method:'post'
//                                });
//                                twoCombo.getStore().load();
//                                
//                                Ext.getCmp('processDefId').setValue(combo.value.substring(combo.value.indexOf("$$$$")+4,combo.value.length));
//                                Ext.getCmp('activityDefId').setValue("");
//                            }
//                        }
//                    },{
//                                xtype:'hidden',
//                                name: 'processDefId',
//                                id: 'processDefId'
//                            }]
//                }, {
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'combo',
//                        fieldLabel : '环节',
//                        name : 'stepId',
//                        id : 'stepId',
//                        valueField : 'activityId',
//                        displayField : 'activityName',
//                        mode: 'local',
//                        triggerAction: 'all',
//                        value : '',
//                        store: stepIdStore,
//                        anchor : '95%',
//                        listeners:{
//                            select: function(combo, record, index){   
//                                
//                                Ext.getCmp('activityDefId').setValue(combo.value);
//                            }
//                        }
//                    },{
//                                xtype:'hidden',
//                                name: 'activityDefId',
//                                id: 'activityDefId'
//                            }]
//                }, {
//                    columnWidth : .4,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'textfield',
//                        fieldLabel : '工单标题',
//                        name : 'jobTitle',
//                        id : 'jobTitle',
//                        anchor : '95%'
//                    }]
//                }]
//            }, {
//                layout : 'column',
//                items : [{
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'textfield',
//                        fieldLabel : '派发人',
//                        name : 'sendPersonId',
//                        id : 'sendPersonId',
//                        anchor : '95%'
//                    }]
//                },{
//                    columnWidth : .3,
//                    layout : 'form',
//                    items : [{
//                        xtype : 'datetimefield',
//                        fieldLabel : '开始时间',
//                        name : 'startTime',
//                        id : 'startTime',
//                        anchor : '95%'
//                    }]
//                },{
//                    columnWidth : .4,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'datetimefield',
//                        fieldLabel : '结束时间',
//                        name : 'endTime',
//                        id : 'endTime',
//                        anchor : '95%'
//                    }]
//                },{
//                    columnWidth : .4,
//                    layout : 'form',
//                    items : [{
//                        xtype: 'textfield',
//                        fieldLabel : '用户名',
//                        name : 'loginId',
//                        id : 'loginId',
//                        value:session.logonAccount.cloudAccountId,//'tiger',
//                        anchor : '95%'
//                    }]
//                }]
//            }]
//            ,
//            buttons : [{
//                text : '查询',
//                listeners : {
//                    "click" : function() {
//                        var qryParam = Ext.getCmp('qryTestForm').getForm().getValues();
//                        var temp = Ext.getCmp('taskType').getValue();
//                        qryParam.processDefId = temp.substring(temp.indexOf("$$$$")+4,temp.length);
//                        qryParam.activityDefId = Ext.getCmp('stepId').getValue();
//                        qryParam.loginId = urlLoginId;
//                        myUndoTask.qryListGrid(qryParam);
//                    }
//                }
//            }, {
//                text : '重置',
//                listeners : {
//                    "click" : function() {
//                        Ext.getCmp('qryTestForm').getForm().reset();
//                    }
//                }
//            }]
        });
//        Ext.getCmp('taskType').setValue("117$$$$com.unicom.ucloud.eom.e19.allot");//选中  
//    var ob = new Object();
//    ob.value = "117$$$$com.unicom.ucloud.eom.e19.allot";
//    myUndoTask.taskTypeOnSelect(ob);
        taskTypeStore.load();
        return qryTestForm;
    }
    
    this.taskTypeOnSelect = function(combo){
        var processDefId = combo.value.substring(0,combo.value.indexOf("$$$$"));
        var twoCombo = Ext.getCmp('stepId');
        twoCombo.clearValue();
        twoCombo.getStore().proxy = new Ext.data.HttpProxy({
            url:PATH + '/e19/tcmBpsAction.json?method=getAllActivityByProcessId&processDefId='+processDefId, 
            method:'post'
        });
        twoCombo.getStore().load();
        
        Ext.getCmp('processDefId').setValue(combo.value.substring(combo.value.indexOf("$$$$")+4,combo.value.length));
        Ext.getCmp('activityDefId').setValue("");
    }

    this.qryListGrid = function(param) {
        Ext.getCmp('undoTaskGrid').store.on('beforeload', function(store) {
            if (Ext.getCmp('undoTaskGrid').store.lastOptions != null) {
                Ext.getCmp('undoTaskGrid').store.baseParams = param;
            }
        });
        Ext.getCmp('undoTaskGrid').store.removeAll();//先移除旧数据
        Ext.getCmp('undoTaskGrid').store.load({
            params : {
                start : 0,// 开始索引
                limit : Ext.getCmp('undoTaskGrid').getPageSize(),
                deletedFlag : 0
            }
        });
        Ext.getCmp('undoTaskGrid').store.on('load', function() {
            Ext.getCmp('undoTaskGrid').getSelectionModel().selectFirstRow();// 选中第一行
        });

    }


    this.initTestGrid = function() {
        //创建列   
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel(
                [
                 cm,         
//                 new Ext.grid.RowNumberer(),  
                 new Ext.grid.RowNumberer({header:'序号',width:40}),
                 {header:'任务实例ID',dataIndex:'taskInstID',width:gridWidth*0.1,hidden:true},
                 {header:'工单流水号',dataIndex:'jobCode',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                     return '<a href="#" onclick="manager.showWin(0,'+record.data.jobId+')">' + value + '</a>';
//                  	return '<a href="#" onclick="manager.showWin(0,'+record.data.cardSheetId+')">' + value + '</a>';
                  	
                  },width:gridWidth*0.18},
                 {header:'工单标题',dataIndex:'jobTitle',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                     return '<a href="#" onclick="manager.showWin(0,'+record.data.jobId+')">' + value + '</a>';
//                  	return '<a href="#" onclick="manager.showWin(0,'+record.data.cardSheetId+')">' + value + '</a>';
                  	
                  },width:gridWidth*0.2},
                 {header:'URL',dataIndex:'formUrl',width:gridWidth*0.15,hidden:true},
                 {header:'任务类型',dataIndex:'processModelId',width:gridWidth*0.1,hidden:true},
                 {header:'任务类型',dataIndex:'flowType',width:gridWidth*0.15,hidden:true},
                 {header:'任务类型',dataIndex:'processModelName',hidden:true},
                 {header:'任务类型',dataIndex:'processModelCNName',width:gridWidth*0.2},
                 {header:'流程实例ID',dataIndex:'processInstID',width:gridWidth*0.1,hidden:true},
                 {header:'环节名称',dataIndex:'activityInstName',width:gridWidth*0.15,hidden:true},
                 {header:'环节ID',dataIndex:'activityInstID',width:gridWidth*0.1,hidden:true},
                 {header:'派发人',dataIndex:'senderID',width:gridWidth*0.1,hidden:true},
                 {header:'派发人',dataIndex:'senderName',width:gridWidth*0.1},
                 {header:'派发时间',dataIndex:'createDate',width:gridWidth*0.12},
                 {header:'任务实例创建时间',dataIndex:'createDate',width:gridWidth*0.15,hidden:true},
                 {header:'工单Id',dataIndex:'jobId',width:gridWidth*0.15,hidden:true},
                 {header:'任务期望完成时间',dataIndex:'endDate',width:gridWidth*0.15,hidden:true}
                 ]
        );
        //测试卡信息
        var grid = new ZTESOFT.Grid({
            id : 'undoTaskGrid',
            region : 'center',//在父容器里的位置
            height : gridPnHeight,//gridPnHeight,//默认宽度为自适应的，一般不用设置
            title : '已办任务列表',
            cm : column,//列定义
            pageSize : count,//页纪录数
            paging : true,//是否分页
//            collapsible : true,//是否可以收缩
            url: PATH+'/e19/tcmBpsAction.json?method=getMyWorkedTasks',
            sm :cm                       
        });
        return grid;

    }  

    this.doDetail = function (rowIndex){
        var param = new Object();
        param=Ext.getCmp('undoTaskGrid').getStore().getAt(rowIndex).data;
        processModelId = param.processModelName;
        if(param.formUrl==0){//清查以外修改环节
//            oper.detail("mod");
            testCardOrderModify.showWinPre(param.processInstID,param.activityInstID,param.taskInstID,param.formUrl);
        }else if(param.formUrl=='checkModify'){//清查修改环节
        	testCardOrderModify.showWinPre(param.processInstID,param.activityInstID,param.taskInstID,param.formUrl);
//            manager.showWinPre(param.processInstID,param.activityInstID,param.taskInstID,param.formUrl);
        }else{
            manager.showWinPre(param.processInstID,param.activityInstID,param.taskInstID,param.formUrl,param.jobId);
        }
        
//        if(param.processModelId =="com.unicom.ucloud.eom.e22.managerSetting"){
//            finishOper.initWindow(param);
//        }else if(param.processModelId =="com.unicom.ucloud.eom.e22.networkTaskFlow"){
//
//        }
    }


}