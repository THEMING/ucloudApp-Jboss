var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var qryPnHeight = 120;
    var gridPnHeight = body_height - qryPnHeight;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据
    var intervalId = '';
    var intervalFlag = false;//定时器开关
//    var session = new Object();
    var oper = new PageOper();
    var manager = new DetailWin();
    var orderDet = new DetailWin();
    var testCardOrderApplyApplyAndmodWin = new TestCardOrderApplyApplyAndModWin();
    var testCardQueryAndSelect = new TestCardQueryAndSelect();//各种类型测试卡查询form的初始化
    var fileList = new Array();
    var testCardOrderApplyFileList = new Array();
    var wholeParam = new Object();
    var testCardOrderApplyWidth = 160;
    var woStatusMap = null;
    var urgencyLevelMap = null;
    var onlyShowMyProvince = 0;
    var testCardOrderApplyAddOrMod = "";
    var testCardOrderApplyProcessModelName = "";
    var testCardOrderApplyIsDraft = 0;
    var modOper = new TestCardModOper();
    var testCardEnum = 1;//测试卡枚举值

var terminalEnum = 2;//测试终端枚举值

var teleCardEnum = 3;//固定电话枚举值

var rechCardEnum = 4;//充值卡枚举值
var stroe = new jsonStroe();
var isTestApplyOpenMod = 0;
var hisOper = new TestCardHistoryOper();
var applyUrgencyLevelId = '1';


    Ext.onReady(function() {
        
        woStatusMap = getMap("WO_STATUS");
        urgencyLevelMap = getMap("URGENCY_LEVEL");
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';

        oper.init();
        
        oper.qryMustReturnTestCard();
    });
    
    function getMap(value){
        var oo = new Object();
        oo.dictType = value;
        return initEnumMap(oo);
    }

    function PageOper() {
        
//        this.initSession = function() {
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
    	
    	this.qryMustReturnTestCard = function() {
                    
             var oo = new Object();
             oo.lenderId = session.logonAccount.cloudUserId;
             oo.start = 0;
             oo.limit = 99;
                    var _ret = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=qryMustReturnTestCard',oo);
                    if(_ret.total==0){
                        return;
                    }
             var formPanel = oper.initMustReturnTestCardPanel();
             var formWin = new Ext.Window({
                id:'mustReturnTestCardWin',
                title: "待归还的测试卡",
                closable:true,
                width: 700,
                height: body_height*0.9,
                layout: 'border',
                plain:true,
                modal: true,
                items: [formPanel],
                buttonAlign:'center',
                buttons: [{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('mustReturnTestCardWin').close();
                    }
                }]
            });
             formWin.show();
             
             var ro = _ret.rows;
                                        for(var i=0;i<ro.length;i++){
                                           Ext.getCmp('mustReturnTestCardGrid').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡列表
                                        }
    	}
    	
    	this.qryListAnyGrid = function(gridName,param){
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
    	
    	this.initMustReturnTestCardPanel = function() {
    		
    		var cm = new Ext.grid.CheckboxSelectionModel();
    		
            //创建列   
            var column = new Ext.grid.ColumnModel([    
                new Ext.grid.RowNumberer({header:'序号',width:40}), 
                {header:'类型',dataIndex:'testobjectName',width:700*0.20},
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:700*0.20},
                {header:'归属省份',dataIndex:'attributionProvinceName',width:700*0.10},
                {header:'管理员',dataIndex:'adminName',width:700*0.10},
                {header:'预计归还时间',dataIndex:'planReturnTime',width:700*0.20},
                {header:'变动历史',dataIndex:'overHis',width:gridWidth*0.15,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="hisOper.initHistory('+record.data.testobjectType+","+record.data.testobjectId+');">变动历史</a>';
                    }
                },
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true}
            ]);
            //测试卡信息
            var historyGrid = new ZTESOFT.Grid({
                id : 'mustReturnTestCardGrid',
                region : 'center',
                title : '待归还测试卡列表',
                cm : column,
//                pageSize : 10,
                paging : false,
//                collapsible : true,
//                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryMustReturnTestCard',
                sm :cm        
            }); 
            return historyGrid;
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
                ['1','草稿'],
                ['2','处理中'],
                ['6','已完成']
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
//            this.initSession();
            
//            alert(11);
            
            var mainPanel = this.initMainPanel();
            var viewport = new Ext.Viewport({
                //所有的页面元素最终都加入到这个显示容器中，并且添加到页面的ID为content的div中，
                //也可以单个元素直接加到页面dom元素，但不建议
                el : 'content',
                layout : 'border',
                margins : '5 5 5 5',
                items : [ mainPanel ]
            });
            wholeParam.createdByQry = session.logonAccount.cloudUserId+"";
            oper.qryListGrid(wholeParam);
            
        }

        //初始化主面板

        this.initMainPanel = function() {
            //qery
//            var qryFrom = this.initQryPn();
            
            var tbar = this.initGridToolsBar();
            
            //列表
            var listPanel = this.initListGrid();
            //主面板
            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',//这种布局方式类似地图，子元素按方位布局
                items : [ tbar,//qryFrom,
                          listPanel ]
            });
            return mainPanel;
        }
        
        this.initTestCardOrderApplyQryWin = function(){
            //qery
              var qryFrom = this.initQryPn();              
              
              new Ext.Window({
                  id:'qryWin',
                  title: '高级检索',
                  closable:true,
                  width: testCardOrderApplyWidth*4+20+20+14,
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
                            if(Ext.getCmp('creationStartDate').getValue()!=""&&Ext.getCmp('creationEndDate').getValue()!=""&&new Date(Date.parse(Ext.getCmp('creationStartDate').getValue()))>new Date(Date.parse(Ext.getCmp('creationEndDate').getValue()))){
                             Ext.Msg.alert("提示","开始时间不能晚于结束时间！");
                             return;
                            }
                              
                            //获取查询参数
                              var param = Ext.getCmp('qryForm').getForm().getValues();
                              //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
//                              param.currentNode = Ext.getCmp('currentNodeQry').getValue();
                              param.woStatusEnumId = Ext.getCmp('sheetStatusQry').getValue();
                              param.cardOperationTypeEnumIdQry = Ext.getCmp('cardOperationTypeEnumIdQry').getValue();
                              
                              wholeParam = param;
//                              alert(Ext.getCmp('dealMan').checked);
//                              param.dealMan = Ext.getCmp('dealMan').checked;
                              
                              oper.qryListGrid(param);
                              
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
              wholeParam.sheetStatusQry = wholeParam.woStatusEnumId;
              ob.data = wholeParam;
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
                    oper.initTestCardOrderApplyQryWin();
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
                text : '新增',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.detail("add");
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '撤单',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.del();
                }
            },"-");
            tb.add({
                text : '编辑',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.detail("mod");
                }
            },"-");
            tb.add({
                text : '删除',
                onClick : function() {
                    oper.deleteDraft();
                }
            },"-");
//            tb.add({
//                text : '催办',
//                onClick : function() {
//                    oper.urge();
//                }
//            },"-");
            tb.add({
                text : '导出',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.exportData();
                }
            });
            

            return tb;
        }

        this.initQryPn = function() {
            var qryForm = new Ext.FormPanel({
                id : 'qryForm',
//                region : 'center',//'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
//                labelWidth : 60,//标签宽度
                frame : true,
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
                            width : testCardOrderApplyWidth,//最小是120，最大190
                            height : 30
                        },
//                collapsible : true,//是否可收缩
//                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : body_width,
                items : [
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '工单号'
                       }
                   },{
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.textfield',
                           hideLabel : true,
//                            fieldLabel : '工单号',
                            name : 'sheetSerialNumberQry',
                            id : 'sheetSerialNumberQry',//sheetSerialNumberQry
                            allowBlank: true,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                            anchor : '100%'//大概意思是表示这个textfield控件，占整个列宽的比例
                       }
                   },
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '工单主题'
                       }
                   },{
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.textfield',
                           hideLabel : true,
//                            fieldLabel : '工单号',
                            name : 'sheetThemeQry',
                            id : 'sheetThemeQry',
                            allowBlank: true,
                            anchor : '100%'
                       }
                   },
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '工单类型'
                       }
                   },{
                       colspan : 1,
                       items : [{
                           xtype:'ZTESOFT.combofield',
                           hideLabel : true,
//                           fieldLabel: '<font color="red">*</font>工单类型',
                           name: 'cardOperationTypeEnumIdQry',
                           id: 'cardOperationTypeEnumIdQry',
                           valueField: 'value',
                           displayField: 'text',
                           mode: 'local',
                           triggerAction: 'all',
                           store: testCardOrderApplyApplyAndmodWin.sheetTypeStore,
                           editable : false ,
                           value: '',
                           anchor:'100%'
                       }]
                   },
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '工单状态'
                       }
                   },{
                       colspan : 1,
                       items : {                            
                            xtype: 'ZTESOFT.enum',
                           hideLabel : true,
//                            fieldLabel : '工单状态',
                            name : 'sheetStatusQry',
                            id : 'sheetStatusQry',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            typeAhead : true,
                            triggerAction: 'all',
                            editable : false ,
                            dict: true,
                            dictType:'WO_STATUS',
                            value: '',
//                            listeners:{
//                                              'click':function(me,newValue,oldValue){alert(1);
//                                              var r = new Record();
//                                                  var sto = Ext.getCmp("sheetStatusQry").getStore().remove(r);
//                                                  alert(sto.getTotalCount());
//                                              }
//                                    
//                                      },
//                            store: this.sheetStatusStore,
                            anchor : '100%'
                       }
                   },
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '开始时间'
                       }
                   },{
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '开始时间',
                            name : 'creationStartDate',
                            id : 'creationStartDate',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                   },
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '结束时间'
                       }
                   },{
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '结束时间',
                            name : 'creationEndDate',
                            id : 'creationEndDate',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                   },{
                        xtype:'hidden',
                        id:'createdByQry',
                        name:'createdByQry',
                        value:session.logonAccount.cloudUserId+""
                   }
                ]
//                items : [{
//                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉
//                    items : [{
//                        columnWidth : .25,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性
//                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '工单号',
//                            name : 'sheetSerialNumberQry',
//                            id : 'sheetSerialNumberQry',//sheetSerialNumberQry
//                            allowBlank: true,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
//                            anchor : '90%'//大概意思是表示这个textfield控件，占整个列宽的比例
//                        }]
//                    }, 
//                    {
//                        columnWidth : .25,
//                        layout : 'form',
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '工单状态',
//                            name : 'sheetStatusQry',
//                            id : 'sheetStatusQry',
//                            valueField: 'value',
//                            displayField: 'text',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : false ,
//                            value: '',
//                            store: this.sheetStatusStore,
//                            anchor : '90%'
//                            
//                        }]
//                    },{
//                        columnWidth : .25,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'datetimefield',
//                            fieldLabel : '开始时间',
//                            name : 'creationStartDate',
//                            id : 'creationStartDate',
//                            format:'Y-m-d h:i:s',
//                            anchor : '90%'
//                            
//                        }]
//                    },{
//                        columnWidth : .25,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'datetimefield',
//                            fieldLabel : '结束时间',
//                            name : 'creationEndDate',
//                            id : 'creationEndDate',
//                            format:'Y-m-d h:i:s',
//                            anchor : '90%'
//                            
//                        }]
//                    }]
//                }
//                ]
            });
            return qryForm;
        };

        //查询列表
        this.qryListGrid = function(param,param2) {
        	var gridName = "listGrid";
        	var para = param;
        	if(param=="historyGrid"){//说明是调拨历史调用的查询
        	   gridName = param;
        	   para = param2;
        	}
            
//            Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
            
            //绑定发送请求参数
            Ext.getCmp(gridName).store.on('beforeload', function(store) {

                if (Ext.getCmp(gridName).store.lastOptions != null) {
                    //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变
                    Ext.getCmp(gridName).store.baseParams = para;
//                    Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
                }
            });
            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
            Ext.getCmp(gridName).store.load({
                params : 
                    {
                    start : 0,//开始索引
                    limit : Ext.getCmp(gridName).getPageSize()//步数
                }
            });
            //load数据后自动选择第一行数据,load事件为加载数据完成后触发
            Ext.getCmp(gridName).store.on('load', function() {
                Ext.getCmp(gridName).getSelectionModel().selectFirstRow();//选中第一行
            });

        }

        this.initListGrid = function() {
            //创建列   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),   
//                {header:'序号',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                    return rowIndex+1;
//                }},
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'工单流水号',dataIndex:'sheetSerialNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:manager.showWin(0,'+record.data.cardSheetId+')>' + value + '</a>';
                    },width:gridWidth*0.15},
                {header:'工单类型',dataIndex:'sheetTypeName',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                        return record.data.sheetType==1?"测试卡移交":(record.data.sheetType==2?"测试卡报废":(record.data.sheetType==3?"测试卡借用":(record.data.sheetType==4?"测试卡调拨":"测试卡归还")));
//                    },
                    width:gridWidth*0.1},
                {header:'工单主题',dataIndex:'sheetTheme',width:gridWidth*0.1},  
//                {header:'当前环节',dataIndex:'currentNodeName',
////                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
////                        return record.data.currentNode=="1"?"申请":(record.data.currentNode=="2"?"执行":(record.data.currentNode=="3"?"审核":"接收"));
////                    },
//                    width:gridWidth*0.1},
                {header:'缓急程度',dataIndex:'urgencyLevel',width:gridWidth*0.1},
                {header:'处理组',dataIndex:'dealGroup',width:gridWidth*0.1,hidden:true},
                {header:'处理人',dataIndex:'dealMan',width:gridWidth*0.1,hidden:true},
//                {header:'处理组/处理人',dataIndex:'dealGroupOrMan',width:gridWidth*0.2},
                {header:'建议完成时间',dataIndex:'requiredFinishTime',width:gridWidth*0.15},
                {header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.15},
                {header:'创建时间',dataIndex:'creationDate',width:gridWidth*0.15,sortable:true,defaultSortable:true},
                {header:'工单状态',dataIndex:'woStatusEnumId',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return woStatusMap.get(value);
                    },
                    width:gridWidth*0.1},
                {header:'工单状态',dataIndex:'sheetStatusName',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                        return record.data.sheetStatus=="1"?"待派发":(record.data.sheetStatus=="2"?"待接收":(record.data.sheetStatus=="3"?"完成":""));
//                    },
                    width:gridWidth*0.1,hidden:true},
                
                {header:'当前环节',dataIndex:'currentNode',hidden:true},
                {header:'工单状态',dataIndex:'woStatusEnumId',hidden:true},
                {header:'工单类型',dataIndex:'cardOperationTypeEnumId',hidden:true},
                
                {header:'归属地',dataIndex:'localeId',hidden:true},
                {header:'单位名称',dataIndex:'companyName',hidden:true},
                {header:'建单人',dataIndex:'createdBy',hidden:true},
                {header:'派发时间',dataIndex:'dispatchDate',hidden:true},
                {header:'建单时间',dataIndex:'creationDate',hidden:true},
                {header:'审核单位',dataIndex:'auditDepartmentId',hidden:true},
                {header:'审核人',dataIndex:'auditPersonId',hidden:true},
                
                {header:'执行单位',dataIndex:'executeDepartmentId',hidden:true},
                {header:'执行人',dataIndex:'executePersonId',hidden:true},
                {header:'预计归还时间',dataIndex:'expectedReturnTime',hidden:true},
           //    {header:'备注',dataIndex:'testCardOrderApplyRemarks',hidden:true},
                {header:'工单标题',dataIndex:'sheetTheme',hidden:true},
                
                {header:'id',dataIndex:'cardSheetId',hidden:true},
                {header:'processInstanceId',dataIndex:'processInstanceId',hidden:true}
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
//                tbar : this.initGridToolsBar(),//工具条，用来放操作按键
                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryList',
//                sm : new Ext.grid.RowSelectionModel({
//                    singleSelect : true,//单选，如果有带checkbox的话，可以选择多选模式
//                    listeners : {
//                        //行选中事件
//                        rowselect : function(sm, row, rec) {
//                            //oper.qryRule(rec.data.tacheId);
//                        }
//                    }
//                })
            sm : new Ext.grid.CheckboxSelectionModel()

            });

            return grid;

        }

//        this.initGridToolsBar = function() {
//            var tb = new Ext.Toolbar();
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
//            tb.add({
//                text : '导出',
//                onClick : function() {
//                    oper.exportData();
//                }
//            });
////            tb.add('->');//加这个符号可以使在此之后的按键靠右对齐
////            tb.add({
////                text : '上传附件',
////                onClick : function() {
////                    oper.del();
////                }
////            },"-");
////            tb.add({
////                text : '下载附件',
////                onClick : function() {
////                    oper.del();
////                }
////            });
//
//            return tb;
//        }
        
        this.exportData = function(){
            //这是页面参数，跟普通查询一样，如果有分页需求的，也一起写上
            //获取查询参数
//            var param = Ext.getCmp('qryForm').getForm().getValues();
//            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
////            param.currentNode = Ext.getCmp('currentNodeQry').getValue();
//            param.woStatusEnumId = Ext.getCmp('sheetStatusQry').getValue();
            var param = wholeParam;
            //分页参数
            param.start = 0;//Ext.getCmp('listGrid').getStart();
            param.limit = 5000;//Ext.getCmp('listGrid').getPageSize();//步数
            
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
            
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.cardSheetId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.cardSheetId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
            
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
                    Ext.Msg.alert('操作提示','请选择一条记录');
                    return;
                }
                //var rec = Ext.getCmp('listGrid').getSelectionModel().getSelected();
                var rec = selinfo[0];
                if(rec==null){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                param = rec;
                par = param.data.cardSheetId;
                
                if(param.data.woStatusEnumId==1){//判断是否草稿 1为草稿
                    testCardOrderApplyIsDraft = 1;
                    testCardOrderApplyApplyAndmodWin.showWin(operStr,par);
                    return;
                }
                if(param.data.woStatusEnumId !=1 && param.data.woStatusEnumId !=5){
                    Ext.Msg.alert('操作提示','只能编辑草稿和已驳回的工单');
                    return;
                }
                var ob = new Object();
                ob.loginId = session.logonAccount.accountId;//"tiger";
                ob.loginName = session.logonAccount.userEmpName;//"tiger";
                ob.processInstID = param.data.processInstanceId;
                ZTESOFT.invokeAction(
                        PATH+'/e19/testCardOrderApplyAction.json?method=qryUndoByCardSheetId',
                        ob,
                        function(response){                            
                            var ro = response.rows;
                            
                            if(ro.length!=1){
                                ro[0].formUrl = ro[0].formUrl.substring(33);//因为流程环节的url地址为/e19/myUndoTaskUnify.jsp?formUrl=开头，共33个字符，需要截取位置33后所有信息作为环节标记
                                if(ro[0].formUrl!=0&&ro[0].formUrl!="checkModify"){
                                   Ext.Msg.alert("提示","工单不处于修改环节！不能编辑！");
                                    return;
                                }
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
                
//                return;
            }else{
                testCardOrderApplyApplyAndmodWin.showWin(operStr,par);
            }
            
            
            
            
            
            
//            manager.initWindow(operStr,param);
            //alert(rec.data.tacheId);
        }
        
        //催办
        this.urge = function(){
            
            
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if (selinfo.length != 1) {
                Ext.Msg.alert('操作提示', '请先选择一条要催办的任务');
                return;
            }
            
            var param = {
                    processInstID : selinfo[0].data.processInstanceId,
                    accountId : session.logonAccount.accountId
            }
            
            var url = PATH+'/e19/testCardCommonAction.json?method=findDoingParticipant';
            ZTESOFT.invokeAction(url, param, function(response) {
                if (response) {
                	testCardOrderUrge.initWindow(response,selinfo[0].data);
                } 
            });
        }
        
        //删除草稿
        this.deleteDraft = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length==0){
                Ext.Msg.alert('操作提示','请先选择您要删除的行');
            }else{
//                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
                var ob = new Object();
                var li = new Array();
                for(var i=0;i<selinfo.length;i++){
                    if(selinfo[i].data.woStatusEnumId!=1){
                        Ext.Msg.alert('操作提示',"工单流水号为["+selinfo[i].data.sheetSerialNumber+"]的工单不处于草稿状态不能进行删除操作！");
                        return;
                    }
                    var o = selinfo[i].data;
                    o.deleteBy = session.logonAccount.cloudUserId;
                    o.lastUpdatedBy = session.logonAccount.cloudUserId;
                    o.processingOrgId = session.logonAccount.cloudOrgId;
                    o.deletedFlag = 1;
                    li.push(o);
                }
                
                Ext.Msg.confirm('系统提示','确定要删除吗？',
                        function(btn){
                          if(btn=='yes'){
                              ob.sheetList = Ext.util.JSON.encode(li);
                              ob.loginId = session.logonAccount.accountId;//"tiger";
                              ob.loginName = session.logonAccount.userEmpName;//"tiger";
                              ob.deleteDraft = 1;
                              ZTESOFT.invokeAction(
                                              PATH+'/e19/testCardOrderApplyAction.json?method=deleteTestCardOrder',
                                              ob,
                                              function(response){
                                                  Ext.Msg.alert("操作提示","删除成功");
//                                                          Ext.getCmp('detailWin').close();
                                                          Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                                  
                                              }
                                      );                         
                          }
                          
                        },this);
                
                
            }
        }
        
        this.del = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length==0){
                Ext.Msg.alert('操作提示','请先选择您要撤销的工单');
            }else{
//                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
                var ob = new Object();
                var li = new Array();
                for(var i=0;i<selinfo.length;i++){
                  /*  if(selinfo[i].data.processInstanceId==""||(selinfo[i].data.woStatusEnumId!=2&&selinfo[i].data.woStatusEnumId!=5)){//2处理中，5已驳回
                        Ext.Msg.alert('操作提示',"工单流水号为["+selinfo[i].data.sheetSerialNumber+"]的工单不处于处理中状态不能进行撤单操作！");
                        return;
                    }*/
                    if(selinfo[i].data.woStatusEnumId!=5){//2处理中，5已驳回
                        Ext.Msg.alert('操作提示',"工单流水号为["+selinfo[i].data.sheetSerialNumber+"]的工单不处于审核不通过状态不能进行撤单操作！");
                        return;
                    }
                    var o = selinfo[i].data;
                    o.deleteBy = session.logonAccount.cloudUserId;
                    o.lastUpdatedBy = session.logonAccount.cloudUserId;
                    o.processingOrgId = session.logonAccount.cloudOrgId;
                    o.operatorName = session.logonAccount.userEmpName;//
                    o.operateDepartmentName = session.logonAccount.userDeptName;
                    li.push(o);
                }
                
                Ext.Msg.confirm('系统提示','确定要撤单吗？',
                        function(btn){
                          if(btn=='yes'){
                              ob.sheetList = Ext.util.JSON.encode(li);
                              ob.loginId = session.logonAccount.accountId;//"tiger";
                              ob.loginName = session.logonAccount.userEmpName;//"tiger";
                              ZTESOFT.invokeAction(
                                              PATH+'/e19/testCardOrderApplyAction.json?method=deleteTestCardOrder',
                                              ob,
                                              function(response){
                                                  Ext.Msg.alert("操作提示","撤单成功");
//                                                          Ext.getCmp('detailWin').close();
                                                          Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                                  
                                              }
                                      );                         
                          }
                          
                        },this);
                
                
            }
        }
    }
   
    
    
    function TestCardOrderApplyApplyAndModWin(){
        
        this.sheetTypeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['2','移交'],
                ['5','报废'],
                ['3','借用'],
                ['1','调拨'],
                ['4','归还']
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
                            }],
                            listeners : {
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
                            anchor : '95%'
                        }]
                    }
                    ]
                }]
            });
            return testCardQry;
        }
        
        this.initTestCardQryResultToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '添加',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
                    var st = Ext.getCmp('testCardQryResultSelected').getStore();
                    var str = "";
                    var num = 0;
                    var flag = 0;
                    
                    if(a.length==0){
                            Ext.Msg.alert('操作提示','请选择要添加的测试卡！');
                            return;
                        }
                    
                   for(var i=0;i<a.length;i++){
                        for(var j=0;j<st.data.items.length;j++){
                            if(a[i].data.testobjectType==st.data.items[j].data.testobjectType
                                    &&a[i].data.testobjectId==st.data.items[j].data.testobjectId){
                            	str = str+"["+a[i].data.numberTmp+"]";
                            	flag =1;
                           // 	Ext.Msg.alert('操作提示','编号为'+str+'的'+a[i].data.testobjectName+'已经添加');
                            }
                        }
                        if(flag ==0){
                        	Ext.getCmp('testCardQryResultSelected').getStore().add(new Ext.data.Record(a[i].data));
                        	num =num+1;
                        }
                        flag = 0;
                    }
                if(str!==""){
                	   Ext.Msg.alert('操作提示','已成功添加'+num+'条记录,'+'编号为'+str+'的测试卡已经添加,不能重复添加');
                }else{
                	Ext.Msg.alert('操作提示','添加成功');
                }
            }});//加这个符号，会在页面上添加一个竖线分隔符
            return tb;
        }
        this.testCardOrderApplyDoViewDetail = function(typeId,value,attributionProvinceId){
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
        
        this.initTestCardQryResult = function(){
            
            //创建列   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
//                new Ext.grid.RowNumberer(),
                new Ext.grid.RowNumberer({header:'序号',width:40}), 
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.11},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.11},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.09},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true}
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
//                url:PATH+'/e19/testCardInfoAction.json?method=qryList',
                url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',
                
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
                xtype: 'ZTESOFT.Link',
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
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.11},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.11},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.09},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true}
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
//          //测试卡查询form
//            var qryTestFrom = testCardQueryAndSelect.initTestQryPn();
//            //固定电话查询FORM
//            var qryTeleForm = testCardQueryAndSelect.initTeleQryPn();
//            //测试终端查询form
//            var qryTermiForm = testCardQueryAndSelect.initTermiQryPn();
//            //充值卡查询form
//           var qryRechForm =  testCardQueryAndSelect.initRechQryPn();
            var cardOperationTypeEnumId = Ext.getCmp("cardOperationTypeEnumId").getValue();
            var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBarTwo("apply",cardOperationTypeEnumId);
//            var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBar();
            
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
                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;width:800px',
                labelWidth: 70,
                items: [testQryPnToolsBar//testCardQry,qryTestFrom,qryTeleForm,qryTermiForm,qryRechForm
                        ,testCardQryResult,testCardQryResultSelected]
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
                height:550,//body_height*0.8,
                layout: 'border',
                plain:true,
                modal:true,
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
                        var flag = 0;
                        
                        if(a.length==0){
                            Ext.Msg.alert('操作提示','请选择要添加的测试卡！');
                            return;
                        }
                        
                       for(var i=0;i<a.length;i++){
                            for(var j=0;j<b.length;j++){
                                if(a[i].data.testobjectType==b[j].data.testobjectType
                                        &&a[i].data.testobjectId==b[j].data.testobjectId){
                                	str = str+"["+a[i].data.numberTmp+"]";
                                	flag =1;
                               // 	Ext.Msg.alert('操作提示','编号为'+str+'的'+a[i].data.testobjectName+'已经添加');
                                }
                            }
                            if(flag ==0){
                            	Ext.getCmp("testCardList").getStore().add(new Ext.data.Record(a[i].data));
                            	num =num+1;
                            }
                            flag = 0;
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
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    testCardOrderApplyApplyAndmodWin.initSelectTestCardWin();
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '删除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    var a = Ext.getCmp('testCardList').getSelectionModel().getSelections();
                    if(a.length!=0){
                        Ext.Msg.confirm('系统提示','确定要删除吗？',
                        function(btn){
                          if(btn=='yes'){
                              for(var i=0;i<a.length;i++){
                                    Ext.getCmp('testCardList').getStore().remove(a[i]);
                                }      
                                Ext.getCmp('testCardList').getView().refresh();
                                Ext.Msg.alert("提示","删除成功！");
                          }
                          
                        },this);
                    }
                    
                
                }
            });

            return tb;
        }
        
        this.initTestCardList = function(){
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:testCardOrderApplyWidth*4/6*5*0.08}),
                {header:'类型',dataIndex:'testobjectName',width:testCardOrderApplyWidth*4/6*5*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderApplyWidth*4/6*5*0.17},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="testCardOrderApplyApplyAndmodWin.testCardOrderApplyDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderApplyWidth*4/6*5*0.17},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:testCardOrderApplyWidth*4/6*5*0.16},
                {header:'是否借出',dataIndex:'lendFlagName',width:testCardOrderApplyWidth*4/6*5*0.13},
                {header:'管理员',dataIndex:'adminName',width:testCardOrderApplyWidth*4/6*5*0.17},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true},
                {header:'归属省份id',dataIndex:'attributionProvinceId',hidden:true}
            ]);
            
            //人员信息
            var testCardList = new ZTESOFT.Grid({
                id : 'testCardList',
//                height : body_height*0.3,//默认宽度为自适应的，一般不用设置
                width : testCardOrderApplyWidth*4/6*5,
//                fieldLabel:'<font color="red">*</font>测试卡列表',
                height:200,
//                title : '测试卡列表',
                cm : column,//列定义
//                pageSize : 20,//页纪录数
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
                width:testCardOrderApplyWidth*4+20+20+10,//Ext.getBody().getSize(),
//                height:400,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
//                labelWidth: 80,
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
                            width : testCardOrderApplyWidth*4/6,//最小是120，最大190
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
                                    width:testCardOrderApplyWidth*4/6*5,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
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
                                    width:testCardOrderApplyWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
//                                            fieldLabel: '<font color="red">*</font>内容',
                                            hideLabel : true,
                                            name: 'content',
                                            id: 'content',
                                            height : 50,
                                            blankText:'请填写内容!',
                                            maxLength:500,
                                            maxLengthText:'内容不能超过500个字！',
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
                                    width:testCardOrderApplyWidth*4/6*5,
                                    height:200,
                                    items : [
                                        testCardList
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '附件'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardOrderApplyWidth*4/6*5,
                                    height : 100,
                                    items : [
                                    {
                                        xtype : 'ZTESOFT.attachmentPanel',
                                        id:'filesName',
                                        //align:"left",
                                        //cls:'zs-attachment',
                                        autoScroll:true,
                                        detailValues:testCardOrderApplyFileList.attNums==null?null:testCardOrderApplyFileList,//已有的附件数据（从数据库读出），格式为一个object，里面包含数组

                                        operType:'',//操作类型，如果为DETAIL则只是查询详情，不提供上传功能
                                        fileTypes:"*.*",//附件类型，默认为所有，即“*.*”
//                                        fileLimit:1,//同时上传的最大数目
                                        hideLabel : true,
                                        anchor : '100%',
//                                        bodyStyle:'margin:10px',
                                        height : 100
                                        //html:'1.测试doc.doc<a href="#" class="zs-link-all">[下载]</a>'
                                    }
//                                        {
//                                            xtype:'ZTESOFT.textfield',
//                                            hideLabel : true,
////                                            fieldLabel:'附件',
//                                            name:'filesName',
//                                            id: 'filesName',
//                                            anchor:'100%'
//                                        }
                                        ,{
                                            xtype:'hidden',
                                            name:'filesId',
                                            id: 'filesId'
                                        }
                                    ]
                                },
//                                {
//                                    colspan : 1,
//                                    items : {
//    //                                    xtype:'button',
//                                        xtype: 'ZTESOFT.Button',
//                                        name:'uploa',
//                                        id: 'uploa',
//                                        onClick : function() {
//                                            testCardOrderApplyApplyAndmodWin.upload('filesName');
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
                                    width:testCardOrderApplyWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '备注',
                                            /*name: 'remarks',
                                            id: 'remarks',*/
                                            name: 'testCardOrderApplyRemarks',
                                            id: 'testCardOrderApplyRemarks',
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
//                                maxLengthText:'内容不能超过500个字！',
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
//                        items: [
//                        {
//                                xtype:'textfield',
//                                fieldLabel:'附件',
//                                name:'filesName',
//                                id: 'filesName',
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name:'filesId',
//                                id: 'filesId'
//                            }
//                        ]
//                        },
//                        {
//                            columnWidth:.2,
//                            layout: 'form',
//                            items: [{
////                                    xtype:'button',
//                                    xtype: 'ZTESOFT.Button',
//                                    name:'uploa',
//                                    id: 'uploa',
//                                    onClick : function() {
//                                        testCardOrderApplyApplyAndmodWin.upload('filesName');
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
                bodyStyle:'padding:0px;overflow-x:hidden;overflow-y:auto;width:720px',
                labelWidth: 70,
                items: [formPanel,orderInfo]//,//auditHisList,
//                auditHisDetail,
//                approveOpinionEditPanel]
            });
            
            return orderInfoForm;
        }
        
        this.initTabPanel = function(){
            
            
            
            var orderInfoForm = this.initOrderInfoForm();
            
            var tabs = new Ext.TabPanel({
                activeTab: 0,
                region: 'center',
                items: [orderInfoForm
                ]
            });
            return tabs;
        }
        
        this.initNextDealMan = function(actionFlag){
            
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
                modal:true,
                items: [{layout: 'column',
                items:[
                    {
                        columnWidth : 1,
                        layout : 'form',
                        labelWidth:150,
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '<font color="red">*</font>请选择下一步环节',
                            name : 'nextActivityInsId',
                            id : 'nextActivityInsId',
                            valueField: 'value',
                            displayField: 'text',
                            allowBlank:false,
                            blankText:'请选择下一环节!',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: nextActivityInsIdStore,
                            anchor : '95%'
                            
                        }]
                    },{
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
                    onClick:function(){
                        if(Ext.getCmp("nextActivityInsId").getValue()==""){
                            Ext.Msg.alert("提示","请选择下一步环节！");
                            return;
                        }
                        var aaqq = Ext.getCmp("selectedNextMan").getRootNode();
                        if(aaqq.childNodes.length!=1){
                            Ext.Msg.alert("提示","请选择一个处理人！");
                            return;
                        }
                        var ob = new Object();
                        ob.targetPerson = aaqq.childNodes[0];
                        ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
                        manager.oper(actionFlag,ob);
                        nextDealManWin.close();
                    }
                },{
                    text: '取消',
                    onClick:function(){
                        nextDealManWin.close();
                    }
                }]
            });
            nextDealManWin.show();
            
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
        
        this.doSubmit = function(recordData,flag,doFlag){
            if(doFlag=='submit'){
//              alert(Ext.getCmp('requiredFinishTime').getValue());
//              alert(Ext.getCmp('requiredFinishTime').getValue().format('Y/m/d h:i:s'));
//          alert(Date.parse(Ext.getCmp('requiredFinishTime').getValue()));
//          alert(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))+"||"+new Date());return;
                        if(!Ext.getCmp('infoPage').getForm().isValid()||
                        (!Ext.getCmp('orderInfo').getForm().isValid())){
//                            Ext.Msg.alert("提示","请填写必要的信息！");
                            return;
                        }
                        if(new Date(Date.parse(Ext.getCmp('requiredFinishTime').getValue()))<new Date()){
                             Ext.Msg.alert("提示","建议完成时间必须晚于当前时间！");return;
                         }
                         
                         
                         var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
                         if(a!=3){
                            if(Ext.getCmp("testCardList").getStore().data.items.length==0){
                                Ext.Msg.alert("提示","请选择测试卡！");
                                return;
                            }
                            
                         }else{
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
            }
                        var ob = Ext.getCmp('infoPage').getForm().getValues();
                        ob.woNo = ob.sheetSerialNumber;
                        if(doFlag=='draft'){//创建草稿时，必填字段可不写，先附临时值插入后台
                            if(Ext.getCmp('requiredFinishTime').getValue()==""){
                                var newdate = new Date(new Date().getTime() + 24*60*60*1000);//加一天
                                var dateStr = newdate.getFullYear()+"-"+(newdate.getMonth()+1)+"-"+newdate.getDate()+" "+newdate.getHours()+":"+newdate.getMinutes()+":"+newdate.getSeconds();
//                               alert(newdate+"|"+new Date());return;
                               ob.requiredFinishTime = dateStr;
                            }
                            ob.woStatusEnumId = 1;
                        }
                        if(doFlag=='submit'){
                            ob.woStatusEnumId = 2;
                        }
                        if(flag=="mod"){
                            var removeFileList = getRemoveValue('filesName');
                             var removeFileListl = new Array();
                             for(var i=0;i<removeFileList.length;i++){
                                var ooo = new Object();
                                ooo.attRelGenId = removeFileList[i];
                                removeFileListl.push(ooo);
                             }
                             ob.removeFileList = Ext.encode(removeFileListl);
                        }
                        //流程挂接参数
                        ob.modelId = 'E19';//模块编号
                        ob.businessCode = 'E19'+ a;//流程编码
                        ob.orgCode = session.logonAccount.provinceCompanyId;//所选的组织ID
                        ob.doFlag = doFlag;
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
                         ob.remarks = Ext.getCmp('testCardOrderApplyRemarks').getValue();
                       //  ob.remarks = Ext.getCmp('remarks').getValue();
                         ob.archiveBaseDate = Ext.getCmp('requiredFinishTime').getValue();
                         ob.loginId = session.logonAccount.accountId;//"tiger";//targetPerson.id;
                         ob.loginName = session.logonAccount.userEmpName;//"tiger";//targetPerson.text;
//                         if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
//                         ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
////                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
//                         ob.targetType = 1;//用户
//                         ob.auditDepartmentId = null;
//                         }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
//                         ob.targetType = 3;//部门
//                         ob.auditPersonId = null;//设为空，避免修改加载时查accountId
//                         }else if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
//                         ob.targetPerson = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
////                         ob.targetPerson = Ext.getCmp('executePersonId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('executeDepartment').getValue();//"tiger";
//                         ob.targetType = 1;//用户
//                         ob.executeDepartmentId = null;
//                         }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
//                         ob.targetPerson = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
//                         ob.targetPersonName = Ext.getCmp('executeDepartment').getValue();//"tiger";
//                         ob.targetType = 3;//部门
//                         ob.executePersonId = null;//设为空，避免修改加载时查accountId
//                         }
                         
                         if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="5"
                         ){//报废 对象赋值 审核对象
                             if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;//设为空，避免修改加载时查accountId
                             ob.auditPersonId = "";//设为空，避免修改加载时查accountId
                             }
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="4"){//归还 对象赋值 执行对象
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('executePersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('executeDepartment').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.executeDepartmentId = null;
                             ob.executeDepartmentId = "";
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('executeDepartment').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.executePersonId = null;//设为空，避免修改加载时查accountId
                             ob.executePersonId = "";//设为空，避免修改加载时查accountId
                             }
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="1"||Ext.getCmp("cardOperationTypeEnumId").getValue()=="2"
                         ){//调拨 移交 对象赋值 审核 执行对象
                            
                            if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
                             ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;//设为空，避免修改加载时查accountId
                             ob.auditPersonId = "";//设为空，避免修改加载时查accountId
                             }
                            
                             if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){
                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartment').getValue();//"tiger";
                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartment').getValue();//"tiger";
                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
                             }
//                             ob.executeDepartmentId = null;
//                             ob.executePersonId = null;
                             ob.executeDepartmentId = "";
                             ob.executePersonId = "";
                         }else if(Ext.getCmp("cardOperationTypeEnumId").getValue()=="3"){//借用 对象赋值 本部门审核 审核 执行对象
                         	
                         	if((Ext.getCmp('auditThisType').getValue()!=""&&Ext.getCmp('auditThisType').getValue()=="Person")||(Ext.getCmp('auditThisType').getValue()==""&&Ext.getCmp('auditPersonAccountId').getValue()!="")){
//                             ob.auditDepartmentId = null;
                             ob.auditDepartmentId = "";
                             }else if(Ext.getCmp('auditDepartmentId').getValue()!=""){
//                             ob.auditPersonId = null;//设为空，避免修改加载时查accountId
                             ob.auditPersonId = "";//设为空，避免修改加载时查accountId
                             }
                            
                            if((Ext.getCmp('auditMyThisType').getValue()!=""&&Ext.getCmp('auditMyThisType').getValue()=="Person")
                            ||(Ext.getCmp('auditMyThisType').getValue()==""&&Ext.getCmp('auditMyPersonAccountId').getValue()!="")){//本部门审核对象 用于插入调度表
//                             ob.targetPerson = Ext.getCmp('auditPersonAccountId').getValue();//"tiger";
//    //                         ob.targetPerson = Ext.getCmp('auditPersonId').getValue();//"tiger";
//                             ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
//                             ob.targetType = 1;//用户
//                             ob.auditDepartmentId = null;
                             
                             ob.auditMyObjectId = Ext.getCmp('auditMyPersonAccountId').getValue();//"tiger";
                             ob.auditMyObjectName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                             ob.auditMyObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             
                             }else if(Ext.getCmp('auditMyDepartmentId').getValue()!=""){
//                             ob.targetPerson = Ext.getCmp('auditDepartmentId').getValue();//"tiger";
//                             ob.targetPersonName = Ext.getCmp('auditDepartment').getValue();//"tiger";
//                             ob.targetType = 3;//部门
//                             ob.auditPersonId = null;//设为空，避免修改加载时查accountId
                             
                             ob.auditMyObjectId = Ext.getCmp('auditMyDepartmentId').getValue();//"tiger";
                             ob.auditMyObjectName = Ext.getCmp('auditMyDepartment').getValue();//"tiger";
                             ob.auditMyObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
                             }
                           
                            if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")
                             ||(Ext.getCmp('executeThisType').getValue()==""&&Ext.getCmp('executePersonAccountId').getValue()!="")){//执行对象
                                 ob.acceptObjectId = Ext.getCmp('executePersonAccountId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartment').getValue();//"tiger";
                                 ob.acceptObjectType = 3;//人员 此处对应的是调度表的类型,与流程引擎的类型相反
                             }else if(Ext.getCmp('executeDepartmentId').getValue()!=""){
                                 ob.acceptObjectId = Ext.getCmp('executeDepartmentId').getValue();//"tiger";
                                 ob.acceptObjectName = Ext.getCmp('executeDepartment').getValue();//"tiger";
                                 ob.acceptObjectType = 1;//组织 此处对应的是调度表的类型,与流程引擎的类型相反
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
                             
//                             ob.executeDepartmentId = null;//ZTESOFT.invokeAction时用
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
//                         ob.targetPersonName = session.logonAccount.cloudAccountId;//"tiger";
                         ob.operatorName = session.logonAccount.userEmpName;//'黄寿琴'$("input[name='operatorId']").val();
                         ob.operateDepartmentName = session.logonAccount.userDeptName;//"网络公司福建省分公司网络管理中心";//$("input[name='cardSheetId']").val();
                         fileList = getNewUplValue('filesName');
                         var filesNames = "";
                         for(var i=0;i<fileList.length;i++){//处理附件列表 fileId,fileName
                             fileList[i].attachmentId = fileList[i].fileId;
                             fileList[i].attachmentName = fileList[i].fileName;
                             fileList[i].attachmentTypeEnumId = 1;//测试卡申请单附件
                             fileList[i].attachmentFormatEnumId = fileList[i].attachmentFormatEnumId;//TXT fileList[i].fileType;//
                             fileList[i].createdBy = session.logonAccount.cloudUserId;
                             fileList[i].lastUpdatedBy = session.logonAccount.cloudUserId;
                             
                             fileList[i].uploadedByPersonId = session.logonAccount.cloudUserId;
                             fileList[i].uploadedByPersonName = session.logonAccount.userEmpName;
                             fileList[i].uploadedByOrgId = session.logonAccount.cloudOrgId;
                             fileList[i].uploadedByOrgName = session.logonAccount.userDeptName;
                             
                             fileList[i].activityInstanceId = 0;
                             fileList[i].taskInstanceId = 0;
                             if(flag=="mod"){
                                 fileList[i].objectId = Ext.getCmp('cardSheetId').getValue();
                                 fileList[i].objectTable = 'T_EOM_CARD_SHEET';
                             }
                             
                             filesNames = filesNames+"["+fileList[i].fileName+"]";
                         }
                         ob.fileList = Ext.encode(fileList);
                         fileList = new Array();
                         ob.filesName = filesNames;//Ext.getCmp('filesName').getValue();
                         ob.filesId = Ext.getCmp('filesId').getValue();
                         
                         var st = Ext.getCmp('testCardList').getStore();
                        var le = st.getCount();
                            
                          var sheetCardList = new Array();
                        if(a!=3){//借用流程
                            
                            if(a==5){//报废流程，验证所选测试卡是否属于同一个管理员，目前工单不支持多派，需限制
                                var tm = st.data.items[0].data.adminName;
                               for(var z=1;z<le;z++){
                                   if(tm!=st.data.items[z].data.adminName){
                                       Ext.Msg.alert("提示","请选择归属于同一管理员的测试卡！");
                                       return;
                                   }
                               }
                               
                               if(st.data.items[0].data.adminName==session.logonAccount.userEmpName){//说明选择了管理员为自己的测试卡，不用走报废流程的接收者审核环节，以T_EOM_CARD_SHEET表的ATTRIBUTE1字段来识别该报废工单是否走接收者审核环节，ATTRIBUTE1为acceptAudit需要走，为空不需要
                                   
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
                               if((Ext.getCmp('executeThisType').getValue()!=""&&Ext.getCmp('executeThisType').getValue()=="Person")
                            		   ||(Ext.getCmp('executeThisType').getValue()==""
                            			   &&Ext.getCmp('executePersonAccountId').getValue()!="")){
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
                                 sheetCard.testobjectId = st.data.items[i].data.testobjectId;//testobjectId
                                 sheetCard.testobjectType = st.data.items[i].data.testobjectType;//testobjectType
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
                             
                         
                             var now = new Date();
                            var timeLimite = Ext.getCmp('requiredFinishTime').getValue();
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
                                    var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',ob);
                                    if(response.msg!=null&&response.msg=="warn"){
                                       Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被选择！");
                                       return;
                                    }
                                    if(doFlag=='submit'){
                                       Ext.Msg.alert("操作提示","提交成功");
                                    }else{
                                       Ext.Msg.alert("操作提示","修改成功");
                                    }
                                    
                                            Ext.getCmp('detailWin').close();
                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                 
//                                 ZTESOFT.invokeAction(
//                                PATH+'/e19/testCardOrderApplyAction.json?method=updateTestCardOrder',
//                                ob,
//                                function(response){
//                                	if(response.msg!=null&&response.msg=="warn"){
//                                       Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被选择！");
//                                       return;
//                                    }
//                                    if(doFlag=='submit'){
//                                       Ext.Msg.alert("操作提示","提交成功");
//                                    }else{
//                                       Ext.Msg.alert("操作提示","修改成功");
//                                    }
//                                    
//                                            Ext.getCmp('detailWin').close();
//                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
//                                    
//                                }
//                        );
                                 
                             }else{//新增
                             	
                             	var response = ZTESOFT.Synchronize(PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',ob);
                             
//                          ZTESOFT.invokeAction(
//                                PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrder',
//                                ob,
//                                function(response){
                                    
                                    if(response.msg!=null&&response.msg=="error"){
                                       Ext.Msg.alert("操作提示","派发失败！请选择正确的派发对象！");
                                       return;
                                    }else if(response.msg!=null&&response.msg=="warn"){
                                       Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被选择！");
                                       return;
                                    }
                                    
                                    Ext.Msg.alert("操作提示","新增成功");
                                            Ext.getCmp('detailWin').close();
                                            Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
                                    
//                                }
//                        );
                             }
                         
//                        if(Ext.getCmp("approveOpinionEdit").getValue()==""){
//                           Ext.Msg.alert("提示","请填写执行意见！");
//                           return;
//                        }
//                         manager.initNextDealMan("2");//0为查看详情  1为审核  2为执行 3为接收
        }
        
        this.initWindow = function(recordData,flag){
            testCardOrderApplyAddOrMod = flag;
            applyUrgencyLevelId = recordData.urgencyLevelId==null?'1':recordData.urgencyLevelId;
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
                        
                            
                    {
                    text: '保存',
                    hidden:flag=='add'?false:(flag=='mod'?false:true),
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        testCardOrderApplyApplyAndmodWin.doSubmit(recordData,flag,'draft');
                    }
                },
                {
                    text: '提交',
                    xtype: 'ZTESOFT.Button',
                    id:'add',
                    onClick:function(){
                        testCardOrderApplyApplyAndmodWin.doSubmit(recordData,flag,'submit');
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
                    	 window.clearInterval(intervalId);
                         intervalFlag = false;//在关闭方法中关闭计时器,计时器状态变为关闭状态
                        Ext.getCmp('detailWin').close();
                    }
                }
                ]
            });
             formWin.show();
             intervalFlag = true;
             //intervalId = self.setInterval("editOper.doRefresh("+operStr+")",1000*60*5);//5分钟执行一次
//            intervalId = self.setInterval("testCardOrderApplyApplyAndmodWin.doRefresh('"+recordData+"','"+flag+"','draft')",1000*5);
             window.setTimeout("testCardOrderApplyApplyAndmodWin.doRefresh('"+recordData+"','"+flag+"','draft')",1000*5*60);
            
        }
        this.doRefresh = function(recordData,flag,draft){
//        	intervalFlag = true;
        	
        	if(intervalFlag == false){
        	   return;
        	}
        	
        	if(!Ext.getCmp('detailWin')){//窗口已关闭，不用计时器
                intervalFlag = false;
                return;
            }
        	
            Ext.Msg.alert("操作提示","继续操作?",function(){
                		intervalFlag = false;	
//                        window.clearInterval(intervalId)
//                        intervalId = self.setInterval("testCardOrderApplyApplyAndmodWin.doRefresh('"+recordData+"','"+flag+"','draft')",1000*5);
                        window.setTimeout("testCardOrderApplyApplyAndmodWin.doRefresh('"+recordData+"','"+flag+"','draft')",1000*5*60);
                });
                window.setTimeout(function(){
                	if(intervalFlag){
                		window.clearInterval(intervalId);//关闭定时器
                		intervalFlag = false;
                		testCardOrderApplyApplyAndmodWin.doSubmit(recordData,flag,draft);//草稿保存方法
                		Ext.WindowMgr.each(function(win){
                            win.close();
                        });
                	}
                },1000*60);//1分钟后重置定时器,再执行保存方法,关闭定时器(正常情况是1分钟1000*1*60)
        }
      
        this.showWin = function(flag,cardSheetId){
            var ob = new Object();
//                ob.cardSheetId = cardSheetId;
//                ob.detailOnly = 1;
            var param  = new Object();
            if(flag=="add"){
                var dat = new Object();
                dat.data = new Object();
                var dd = new Object();
                
//              if(session.logonAccount.userEmpName!=null&&session.logonAccount.userEmpName=='郭继磊'){
//                 dd.localeName = '山东';
//              }else{
                   dd.localeName = session.logonAccount.provinceCompanyName;//'福建';
//              }
                
                dd.localeId = session.logonAccount.provinceCompanyId;
                dd.companyName = session.logonAccount.userDeptName;
                dd.companyId = session.logonAccount.cloudOrgId;
                dd.createdBy = session.logonAccount.cloudUserId;
                dd.createdByName = session.logonAccount.userEmpName;
                
                var provinceOrgShortNameTmp = session.logonAccount.provinceOrgShortName;
                if(!provinceOrgShortNameTmp){//把集团简码或者省份简码放到provinceOrgShortName中
                    provinceOrgShortNameTmp = session.logonAccount.groupOrgShortName;
                }

                 var obj={//E192 2为移交
                            woType : 'E192',//E18为考核管理模块的业务模块缩写；1为流程序号。查看中国联通_UCloud_应用_电子运维_系统需求规范书_工单编码规则_v1.5.doc 找到对应的流程序号
                            modelCode : 'EOM_TCM_ADB', //考核管理数据库模块编号
                            cityCompanyId : session.logonAccount.cityCompanyId||"",//地市分公司ID，为空的话表示该人员所在组织为省分(包括集团)
                            provinceOrgShortName : provinceOrgShortNameTmp,//session.logonAccount.provinceOrgShortName,//省分公司英文缩写
                            cityOrgShortName : session.logonAccount.cityOrgShortName||"",//地市分公司英文缩写
                            createdBy : session.logonAccount.cloudUserId,//当前操作人
                            lastUpdatedBy : session.logonAccount.cloudUserId //当前操作人
                    };
                    var _ret = ZTESOFT.Synchronize(PATH+'/eomSequence/eomSequenceAction.json?method=queryEomWoNo',obj);
                    dd.sheetSerialNumber = _ret.woNo;
                    
//                    ZTESOFT.invokeAction(
//                            PATH + '/eomSequence/eomSequenceAction.json?method=queryEomWoNo',
//                            obj,
//                            function(response){
//                                if (response) {
//                                  dd.sheetSerialNumber = response.woNo;
//                                    Ext.Msg.alert('操作提示',response.woNo);
//                                } else {
//                                    Ext.Msg.alert('操作提示', '获取工单编码失败，请检查！');
//                                }
//                            }
//                    );
                
//              dd.sheetSerialNumber = "TCMA000000001"+new Date().getTime();//ANND00000000012013020200002  
                dd.woStatusEnumId = 2;
                dd.woStatusEnumName = "草稿";
                dd.currentNode = 1;
                
                var d = new Date();
                var dateStr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours()>9?d.getHours():"0"+d.getHours())+":"+(d.getMinutes()>9?d.getMinutes():"0"+d.getMinutes())+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
            
                dd.creationDate = dateStr;
                dd.dispatchDate = dateStr;
                dat.data = dd;
                testCardOrderApplyApplyAndmodWin.initWindow(dd,flag);
                testCardOrderApplyApplyAndmodWin.controlTestCardList(2);   //新增时默认是移交类型，为2
                return;
            }
            
            if(cardSheetId!=null){
                param.cardSheetId = cardSheetId;
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
                        
                        var attNums = new Array();//附件初始化处理
                        var attNames = new Array();
                        var attIds = new Array();
                        var tmpO = new Object();
                        tmpO.start = 0;
                        tmpO.limit = 99;
                        tmpO.objectTable = 'T_EOM_CARD_SHEET';
                        tmpO.objectId = cardSheetId;
                        var _ret = ZTESOFT.Synchronize(PATH+'/e19/testCardCommonAction.json?method=qryAttachment',tmpO);
                        if(_ret.total!=null&&_ret.total!=0){
                            var li = _ret.rows;
                           for(var i=0;i<_ret.total;i++){
                               attNums.push(li[i].attRelGenId);
                               attNames.push(li[i].attachmentName);
                               attIds.push(li[i].attachmentId);
                           }
                        }
                        testCardOrderApplyFileList.attNums = attNums;
                        testCardOrderApplyFileList.attNames = attNames;
                        testCardOrderApplyFileList.attIds = attIds;
                        
                        testCardOrderApplyApplyAndmodWin.initWindow(response.rows[0],flag);
                        
                        testCardOrderApplyFileList = new Array();
                        
                        testCardOrderApplyApplyAndmodWin.controlTestCardList(response.rows[0].cardOperationTypeEnumId);
                        
                        if(flag=="mod"){
//                            if(session.logonAccount.userEmpName!=null&&session.logonAccount.userEmpName=='郭继磊'){
//                              Ext.getCmp('localeName').setValue('山东');
//                            }else{
                            Ext.getCmp('localeName').setValue(session.logonAccount.provinceCompanyName);
                          
//                              Ext.getCmp('localeName').setValue('福建');
//                            }
                            
                            if(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"
                            ||response.rows[0].cardOperationTypeEnumId=="3"){//调拨和移交和借用流程修改草稿时如果有执行对象就查询调度表加载执行对象
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
                                            Ext.getCmp('executeDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                        }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员
                                            Ext.getCmp('executePersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('executeDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                        }
                                    }
                                }
                                
                                if(response.rows[0].cardOperationTypeEnumId=="3"){//借用流程 填充本部门审核对象 -1表示本部门对象
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
                            var d = new Date();
                            var dateStr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(d.getHours()>9?d.getHours():"0"+d.getHours())+":"+(d.getMinutes()>9?d.getMinutes():"0"+d.getMinutes())+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
                            Ext.getCmp('dispatchDate').setValue(dateStr);//草稿状态，派单时间永远为打开页面的时间
                        }
                        if(response.rows[0].auditPersonId!=null){
                            var obb = new Object();
                                obb.cloudUserId = response.rows[0].auditPersonId;
                            ZTESOFT.invokeAction(
                                                    PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',
                                                    obb,
                                                    function(response){
                                                    Ext.getCmp('auditPersonAccountId').setValue(response.accountId);
                                                    }
                                            );
                        }
                        
                        if(response.rows[0].executePersonId!=null){
                            var obb = new Object();
                                obb.cloudUserId = response.rows[0].executePersonId;
                            ZTESOFT.invokeAction(
                                                    PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',
                                                    obb,
                                                    function(response){
                                                    Ext.getCmp('executePersonAccountId').setValue(response.accountId);
                                                    }
                                            );
                        }
                                            
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
                            
                            var ob = new Object();
                            ob.start = 0;
                            ob.limit = 99;
                            ob.objectTable = 'T_EOM_CARD_SHEET';
                            ob.objectId = cardSheetId;
                            var filesName = "";
                            ZTESOFT.invokeAction(
                                                    PATH+'/e19/testCardCommonAction.json?method=qryAttachment',
                                                    ob,
                                                    function(response){
                                                        var ro = response.rows;
                                                        for(var i=0;i<ro.length;i++){
//                                                           Ext.getCmp('attachmentInfo').getStore().add(new Ext.data.Record(ro[i]));//填充附件列表
                                                           filesName = filesName + "["+ro[i].attachmentName+"]";
                                                        }
                                                        Ext.getCmp('filesName').setValue(filesName);
                                                    }
                                            );
                                            
                    }
            );
            
                
        }
        
        this.controlTestCardList = function(val){
            //testCardListTR 测试卡列表
            //expectedReturnTimeTR 预计归还时间
            //expectedReturnTimeTR2 预计归还时间
            //auditDepartmentIdTR 审核单位
            //auditDepartmentIdTR2 审核单位
            //auditPersonIdTR 审核人员
            //auditPersonIdTR2 审核人员
            //auditDepartment 审核单位为空性
            //executePersonIdTR 执行人员
            //executePersonIdTR2 执行人员
            //executeDepartmentIdTR 执行单位
            //executeDepartmentIdTR2 执行单位
            //executeDepartment 执行单位为空性
            
//          if(val==1){//调拨 执行隐藏，可为空
//             Ext.getCmp('executePersonIdTR').hide();  
//                Ext.getCmp('executePersonIdTR2').hide();  
//                Ext.getCmp('executeDepartmentIdTR').hide();  
//                Ext.getCmp('executeDepartmentIdTR2').hide();  
//                Ext.getCmp('executeDepartment').allowBlank = true;
//          }else if(val==3){//借用 测试卡列表隐藏
//                  Ext.getCmp('testCardListTR').hide();
//                  Ext.getCmp('expectedReturnTimeTR').show();
//                  Ext.getCmp('expectedReturnTimeTR2').show();
//            }
        	
        	if(val==1){//调拨，修改执行对象为执行部门
        	   Ext.getCmp('testCardOrderApplyExecutorLabel').update('<font color="red">*</font>执行部门');
        	}else{
        	   Ext.getCmp('testCardOrderApplyExecutorLabel').update('<font color="red">*</font>执行对象');
        	}
            
            if(val==1){//调拨
               onlyShowMyProvince = 1;
               testCardOrderApplyProcessModelName = "com.unicom.ucloud.eom.e19.allot";
            }else if(val==2){//移交
               onlyShowMyProvince = 1;
               testCardOrderApplyProcessModelName = "com.unicom.ucloud.eom.e19.transfer";
            }else if(val==3){//借用
               onlyShowMyProvince = 1;
               testCardOrderApplyProcessModelName = "com.unicom.ucloud.eom.e19.lend";
            }else if(val==4){//归还
               onlyShowMyProvince = 1;
               testCardOrderApplyProcessModelName = "com.unicom.ucloud.eom.e19.return";
            }else if(val==5){//报废
               onlyShowMyProvince = 1;
               testCardOrderApplyProcessModelName = "com.unicom.ucloud.eom.e19.dumping";
            }
            
            
            if(val==3){//代表借用
                  Ext.getCmp('testCardListTR').hide();
                  Ext.getCmp('testCardListTR2').hide();
                  Ext.getCmp('expectedReturnTimeTR').show();
                  Ext.getCmp('expectedReturnTimeTR2').show();
                }else{
                  Ext.getCmp('testCardListTR').show();
                  Ext.getCmp('testCardListTR2').show();
                  Ext.getCmp('expectedReturnTimeTR').hide();
                  Ext.getCmp('expectedReturnTimeTR2').hide();
                }
            if(val==4){ //归还
                Ext.getCmp('auditDepartmentIdTR').hide();  
                Ext.getCmp('auditDepartmentIdTR2').hide();  
//                Ext.getCmp('auditPersonIdTR').hide();  
//                Ext.getCmp('auditPersonIdTR2').hide();  
                Ext.getCmp('auditDepartment').allowBlank = true;
                
//                Ext.getCmp('executePersonIdTR').show();  
//                Ext.getCmp('executePersonIdTR2').show(); 
                Ext.getCmp('executeDepartmentIdTR').show();  
                Ext.getCmp('executeDepartmentIdTR2').show();  
                Ext.getCmp('executeDepartment').allowBlank = false;
                
                Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
            }else if(val==5||val==6){// 报废 清查
//                Ext.getCmp('executePersonIdTR').hide();  
//                Ext.getCmp('executePersonIdTR2').hide();  
                Ext.getCmp('executeDepartmentIdTR').hide();  
                Ext.getCmp('executeDepartmentIdTR2').hide();  
                Ext.getCmp('executeDepartment').allowBlank = true;
                
                Ext.getCmp('auditDepartmentIdTR').show();  
                Ext.getCmp('auditDepartmentIdTR2').show(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditDepartment').allowBlank = false;
                
                Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
            }else if(val==3){//借用
                Ext.getCmp('auditDepartmentIdTR').show();  
                Ext.getCmp('auditDepartmentIdTR2').show(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditDepartment').allowBlank = false;
                
//                Ext.getCmp('executePersonIdTR').show();  
//                Ext.getCmp('executePersonIdTR2').show(); 
                Ext.getCmp('executeDepartmentIdTR').show();  
                Ext.getCmp('executeDepartmentIdTR2').show();  
                Ext.getCmp('executeDepartment').allowBlank = false;
                
                Ext.getCmp('auditMyDepartmentIdTR').show();  
                Ext.getCmp('auditMyDepartmentIdTR2').show(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = false;
            }else if(val==2||val==1){//移交 调拨
                Ext.getCmp('auditDepartmentIdTR').show();  
                Ext.getCmp('auditDepartmentIdTR2').show(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditDepartment').allowBlank = false;
                
//                Ext.getCmp('executePersonIdTR').show();  
//                Ext.getCmp('executePersonIdTR2').show(); 
                Ext.getCmp('executeDepartmentIdTR').show();  
                Ext.getCmp('executeDepartmentIdTR2').show();  
                Ext.getCmp('executeDepartment').allowBlank = false;
                
                Ext.getCmp('auditMyDepartmentIdTR').hide();  
                Ext.getCmp('auditMyDepartmentIdTR2').hide(); 
//                Ext.getCmp('auditPersonIdTR').show();  
//                Ext.getCmp('auditPersonIdTR2').show();  
                Ext.getCmp('auditMyDepartment').allowBlank = true;
            }
            
            //清空测试卡列表
            Ext.getCmp('testCardList').getStore().removeAll();
            
            if(testCardOrderApplyIsDraft==0){
                //清空审核人和执行人信息
                this.clearAuditAndExecuteObject("audit");
                this.clearAuditAndExecuteObject("execute");
            }else{
                testCardOrderApplyIsDraft==1;
            }
            
        }
        
        this.clearAuditAndExecuteObject = function(val){
            var a = Ext.getCmp(val+"Department");
            Ext.getCmp(val+"Department").setValue("");
            Ext.getCmp(val+"Department").clearInvalid();
            Ext.getCmp(val+"DepartmentId").setValue("");
            Ext.getCmp(val+"PersonAccountId").setValue("");
            Ext.getCmp(val+"PersonId").setValue("");
            Ext.getCmp(val+"ThisType").setValue("");
        }
        
        this.initFormPanel = function(){
            var infoPage = new Ext.FormPanel({
                id:'infoPage',
//                region: 'north',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'申请信息',
                width:testCardOrderApplyWidth*4+20+20+10,//Ext.getBody().getSize(),
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
                            width : testCardOrderApplyWidth,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
//                                    hidden:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单流水号'
                                    }
                                },{
                                    colspan : 3,
//                                    hidden:true,
                                    width:testCardOrderApplyWidth*3,
                                    items : [{xtype:'ZTESOFT.textfield',
                                    hideLabel : true,
//                                            fieldLabel:'工单流水号',
                                            name:'sheetSerialNumber',
                                            id: 'sheetSerialNumber',
                                            readOnly:true,
                                            anchor:'300%'
                                    }]
                                },
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
                                        hideLabel : true,
//                                        fieldLabel: '归属地',
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
                                    items : [{
                                        xtype:'ZTESOFT.textfield',
                                        hideLabel : true,
//                                        fieldLabel: '单位名称',
                                        name: 'companyName',
                                        id: 'companyName',
                                        readOnly:true,
                                        anchor:'100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建单人'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype:'ZTESOFT.textfield',
                                        hideLabel : true,
//                                        fieldLabel:'建单人',
                                        name:'createdByName',
                                        id: 'createdByName',
                                        readOnly:true,
                                        anchor:'100%'
                                    },{
                                        xtype:'hidden',
                                        name: 'createdBy',
                                        id: 'createdBy'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单状态'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype:'ZTESOFT.textfield',
//                                        fieldLabel: '工单状态',
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
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建单时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{xtype:'ZTESOFT.textfield',
//                                        fieldLabel: '建单时间',
                                        hideLabel : true,
                                        name: 'creationDate',
                                        id: 'creationDate',
                                        readOnly:true,
                                        anchor:'100%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '派单时间'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{xtype:'ZTESOFT.textfield',
//                                            fieldLabel: '派单时间',
                                            hideLabel : true,
                                            name: 'dispatchDate',
                                            id: 'dispatchDate',
                                            readOnly:true,
                                            anchor:'95%'
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>工单类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                        xtype:'ZTESOFT.combofield',
                                        hideLabel : true,
//                                        fieldLabel: '<font color="red">*</font>工单类型',
                                        name: 'cardOperationTypeEnumId',
                                        id: 'cardOperationTypeEnumId',
                                        valueField: 'value',
                                        displayField: 'text',
                                        mode: 'local',
                                        triggerAction: 'all',
                                        blankText:'请选择工单类型!',
                                        allowBlank: false,
                                        store: this.sheetTypeStore,
                                        readOnly:testCardOrderApplyAddOrMod=='mod'?true:false,
                                        value:'2',
                                        listeners:{
                                              'select':function(me,newValue,oldValue){
                                                   var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
                                                   testCardOrderApplyApplyAndmodWin.controlTestCardList(a);   
                                                   var obj={
                                                        woType : 'E19'+a,//E18为考核管理模块的业务模块缩写；1为流程序号。查看中国联通_UCloud_应用_电子运维_系统需求规范书_工单编码规则_v1.5.doc 找到对应的流程序号
                                                        modelCode : 'EOM_TCM_ADB', //考核管理数据库模块编号
                                                        cityCompanyId : session.logonAccount.cityCompanyId||"",//地市分公司ID，为空的话表示该人员所在组织为省分(包括集团)
                                                        provinceOrgShortName : session.logonAccount.provinceOrgShortName,//省分公司英文缩写
                                                        cityOrgShortName : session.logonAccount.cityOrgShortName||"",//地市分公司英文缩写
                                                        createdBy : session.logonAccount.cloudUserId,//当前操作人
                                                        lastUpdatedBy : session.logonAccount.cloudUserId //当前操作人
                                                };
                                                   var _ret = ZTESOFT.Synchronize(PATH+'/eomSequence/eomSequenceAction.json?method=queryEomWoNo',obj);
                                                    Ext.getCmp('sheetSerialNumber').setValue(_ret.woNo);
                                              }
                                    
                                      },
                                        anchor:'100%'
                                    }]
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
                                         value: applyUrgencyLevelId,
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
                                    width:testCardOrderApplyWidth*3,
                                    items : [{
                                        xtype:'ZTESOFT.datefield',
                                        hideLabel : true,
//                                        fieldLabel: '<font color="red">*</font>建议完成时间',
                                        name: 'requiredFinishTime',
                                        id: 'requiredFinishTime',
                                        format:'Y-m-d h:i:s',
                                        editable : false ,
                                        blankText:'建议完成时间不能为空!',
                                        allowBlank: false,
                                        anchor:'100%'
                                      }]
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
                                    width:testCardOrderApplyWidth*3,
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
                                                testCardOrderApplyApplyAndmodWin.selectDep('auditMy');
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
                                },{
                                    colspan : 3,
                                    width:testCardOrderApplyWidth*3,
                                    id:"auditDepartmentIdTR2",
                                    items : [{
                                        xtype:'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id: 'auditDepartment',
                                        name: 'auditDepartment',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
                                        blankText:'审核单位不能为空!',
                                        allowBlank: false,
                                        valueFile : 'auditDepartmentId',
//                                        editable : false ,
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                                testCardOrderApplyApplyAndmodWin.selectDep('audit');
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'auditDepartmentId',
                                        id: 'auditDepartmentId'
                                      },{
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
                                      },{
                                        xtype:'hidden',
                                        name: 'auditThisType',
                                        id: 'auditThisType'
                                      }]
                                },
//                                {
//                                    colspan : 1,
//                                    hidden:true,
//                                    id:"auditPersonIdTR",
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '审核人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    hidden:true,
//                                    id:"auditPersonIdTR2",
//                                    items : [{
//                                        xtype:'ZTESOFT.popupfield',
//                                        hideLabel : true,
//                                        id: 'auditPerson',
//                                        name: 'auditPerson',
////                                        fieldLabel : '审核人',
//                                        valueFile : 'auditPersonId',
//                                        readOnly: true,
////                                        editable : false ,
//                                        anchor : '100%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardOrderApplyApplyAndmodWin.selectPer('auditPerson');
//                                        }
//                                    },{
//                                        xtype:'hidden',
//                                        name: 'auditPersonId',
//                                        id: 'auditPersonId'
//                                      },{
//                                        xtype:'hidden',
//                                        name: 'auditPersonAccountId',
//                                        id: 'auditPersonAccountId'
//                                      }]
//                                },
                                {
                                    colspan : 1,
                                    id:"executeDepartmentIdTR",
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        id:'testCardOrderApplyExecutorLabel',
                                        html : '<font color="red">*</font>执行对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderApplyWidth*3,
                                    id:"executeDepartmentIdTR2",
                                    items : [{
                                        xtype:'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id: 'executeDepartment',
                                        name: 'executeDepartment',
//                                        fieldLabel : '<font color="red">*</font>执行单位',
                                        blankText:'执行单位不能为空!',
                                        allowBlank: false,
//                                        editable : false ,
                                        readOnly: true,
                                        valueFile : 'executeDepartmentId',
//                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                //选择事件逻辑
                                                testCardOrderApplyApplyAndmodWin.selectDep('execute');
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'executeDepartmentId',
                                        id: 'executeDepartmentId'
                                      },{
                                        xtype:'hidden',
                                        name: 'executeDepartmentIsLeaf',
                                        id: 'executeDepartmentIsLeaf'
                                      },{
                                        xtype:'hidden',
                                        name: 'executePersonId',
                                        id: 'executePersonId'
                                      },{
                                        xtype:'hidden',
                                        name: 'executePersonAccountId',
                                        id: 'executePersonAccountId'
                                      },{
                                        xtype:'hidden',
                                        name: 'executePerson',
                                        id: 'executePerson'
                                      },{
                                        xtype:'hidden',
                                        name: 'executeThisType',
                                        id: 'executeThisType'
                                      }]
                                },
//                                {
//                                    colspan : 1,
//                                    hidden:true,
//                                    id:"executePersonIdTR",
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '执行人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    hidden:true,
//                                    id:"executePersonIdTR2",
//                                    items : [{
//                                        xtype:'ZTESOFT.popupfield',
//                                        hideLabel : true,
//                                        id: 'executePerson',
//                                        name: 'executePerson',
////                                        fieldLabel : '执行人',
////                                        editable : false ,
//                                        valueFile : 'executePersonId',
//                                        readOnly: true,
//                                        anchor : '100%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardOrderApplyApplyAndmodWin.selectPer('executePerson');
//                                        }
//                                    },{
//                                        xtype:'hidden',
//                                        name: 'executePersonId',
//                                        id: 'executePersonId'
//                                      },{
//                                        xtype:'hidden',
//                                        name: 'executePersonAccountId',
//                                        id: 'executePersonAccountId'
//                                      }]
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
                                    width:testCardOrderApplyWidth*3,
                                    id:'expectedReturnTimeTR2',
                                    items : [{
                                        xtype:'ZTESOFT.datefield',
                                        hideLabel : true,
//                                        fieldLabel: '<font color="red">*</font>预计归还时间',
                                        name: 'expectedReturnTime',
                                        id: 'expectedReturnTime',
                                        format:'Y-m-d h:i:s',
                                        editable : false ,
        //                                allowBlank: false,
                                        blankText:'预计归还时间不能为空!',
                                        anchor:'100%'
                                      }]
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
//                                allowBlank: false,
//                                store: this.sheetTypeStore,
//                                listeners:{
//                                      'select':function(me,newValue,oldValue){
//                                           var a = Ext.getCmp("cardOperationTypeEnumId").getValue();
//                                           testCardOrderApplyApplyAndmodWin.controlTestCardList(a);   
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
////                            {
////                                xtype:'textfield',
////                                fieldLabel: '<font color="red">*</font>审核单位',
////                                name: 'auditDepartmentId',
////                                id: 'auditDepartmentId',
////                                blankText:'审核单位不能为空!',
////                                allowBlank: false,
////                                anchor:'95%'
////                            },
//                    new ZTESOFT.Popup({
//                                        id: 'auditDepartment',
//                                        name: 'auditDepartment',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
//                                        blankText:'审核单位不能为空!',
//                                        allowBlank: false,
////                                        valueFile : 'pop_id_test',
////                                        editable : false ,
//                                        readOnly: true,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardOrderApplyApplyAndmodWin.selectDep('auditDepartment');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'auditDepartmentId',
//                                        id: 'auditDepartmentId'
//                                      }
//                    
////                    {
////                        xtype: 'ZTESOFT.Popup',
////                        id: 'auditDepartmentId',
////                        name: 'auditDepartmentId',
////                        fieldLabel : '<font color="red">*</font>审核单位',
////                        valueFile : 'adminId',
////                        readOnly: true,
////                        allowBlank : false,
////                        anchor : '90%',
////                        onPopup : function() {
////                            TreeOper.singleUserTree({
////                                onComplete: function(id,text,data){
////                                    Ext.getCmp('adminId').setValue(id);
////                                    Ext.getCmp('adminName').setValue(text);
////                                }
////                            });
////                        }
////                    }
//                       ]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        id:"auditPersonIdTR",
//                        items: [
////                            {
////                                xtype:'textfield',
////                                fieldLabel: '审核人',
////                                name: 'auditPersonId',
////                                id: 'auditPersonId',
////                                blankText:'审核人不能为空!',
////                                anchor:'95%'
////                            }
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
//                                                testCardOrderApplyApplyAndmodWin.selectPer('auditPerson');
//                                        }
//                                    }),{
//                                xtype:'hidden',
//                              name: 'auditPersonId',
//                              id: 'auditPersonId'
//                            }]
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
////                            {
////                                xtype:'textfield',
////                                fieldLabel: '<font color="red">*</font>执行单位',
////                                name: 'executeDepartmentId',
////                                id: 'executeDepartmentId',
////                                blankText:'执行单位不能为空!',
////                                allowBlank: false,
////                                anchor:'95%'
////                            }
//                            new ZTESOFT.Popup({
//                                        id: 'executeDepartment',
//                                        name: 'executeDepartment',
//                                        fieldLabel : '<font color="red">*</font>执行单位',
//                                        blankText:'执行单位不能为空!',
//                                        allowBlank: false,
////                                        editable : false ,
//                                        readOnly: true,
////                                        valueFile : 'pop_id_test',
////                                        readOnly: true,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardOrderApplyApplyAndmodWin.selectDep('executeDepartment');
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
////                            {
////                                xtype:'textfield',
////                                fieldLabel: '执行人',
////                                name: 'executePersonId',
////                                id: 'executePersonId',
////                                blankText:'执行人不能为空!',
////                                anchor:'95%'
////                            }
//                            new ZTESOFT.Popup({
//                                        id: 'executePerson',
//                                        name: 'executePerson',
//                                        fieldLabel : '执行人',
////                                        editable : false ,
////                                        valueFile : 'pop_id_test',
//                                        readOnly: true,
//                                        anchor : '95%',
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                testCardOrderApplyApplyAndmodWin.selectPer('executePerson');
//                                        }
//                                    }),{
//                                        xtype:'hidden',
//                                        name: 'executePersonId',
//                                        id: 'executePersonId'
//                                      }
//                            ]
//                        },{
//                            columnWidth:.3,
//                            layout: 'form',
//                            items: [{
//                                    xtype:'datetimefield',
//                                    fieldLabel: '<font color="red">*</font>建议完成时间',
//                                    name: 'requiredFinishTime',
//                                    id: 'requiredFinishTime',
//                                    format:'Y-m-d h:i:s',
//                                    editable : false ,
//                                    blankText:'建议完成时间不能为空!',
//                                    allowBlank: false,
//                                    anchor:'95%'
//                                }]
//                            }
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
            
            var processModelName = testCardOrderApplyProcessModelName;
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
//                                        Ext.getCmp(val+"Department").setValue(text);
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
                                        	Ext.getCmp(val+"Department").setValue(data.text);
                                            Ext.getCmp(val+"DepartmentId").setValue(data.id);
                                            Ext.getCmp(val+"ThisType").setValue("Org");
                                            
//                                            Ext.getCmp('testStorageCityName').setValue(data.text);
//                                            Ext.getCmp('testStorageCityId').setValue(data.id);
                                            });return;
            }
            
            var inputName = val+"Department,"+val+"DepartmentId,"+val+"PersonAccountId,"+val+"PersonId,"+val+"ThisType";
            var requestData = "text,id,accountId,id,thisType";
            var isUseful = [0,1,0];
            
            if(val=="execute"){
                isUseful = [1,0,0];
            }
            
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
//            var tree = new DeepTreeObj(inputName,requestData,val+"DeepTreeObj"+new Date().getTime(),_orgId,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType);
//            
//            tree.showTree(deeptreeUrl);
            
            //过滤派发树↓
            
            var _qryType="assignTree";
            var _cloudUserId =  session.logonAccount.cloudUserId;
            var _roleArray =  testCardOrderApplyApplyAndmodWin.getRoleIdList();//角色列表
            var _treeType =  3;//1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
            if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==4){
            	 _treeType =  2;
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
            if(val=="execute"&&Ext.getCmp("cardOperationTypeEnumId").getValue()==3){//借用流程选择接收人的派发树过滤
                //通过5个维度查询对应的角色列表
                var param = new Object();
                param.roleclass = 10020;//执行的环节抽象角色Id
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
                param.roleclass = 10021;//执行的环节抽象角色Id
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
            
            //alert(retSubmitStringArray[0]["busType"]);
            //选择事件逻辑
           /* TreeOper.userTree({
                onComplete: function(id,text,data){
                    Ext.getCmp('pop_id_test2').setValue(id);
                    Ext.getCmp('pop_test2').setValue(text);
                }
            });*/
            
//            TreeOper.orgAndUserByCon({
//              parentId:'1',
//              parentName:'联通',
//              singleSelect:true,
//                onComplete: function(id,text,data){
//                  if(data.leaf==0){//说明是组织
//                      Ext.getCmp(val+"DepartmentId").setValue(id);
//                        Ext.getCmp(val+"Department").setValue(text);
//                        Ext.getCmp(val+"PersonAccountId").setValue("");
//                        Ext.getCmp(val+"PersonId").setValue("");
////                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                  }else{//说明是人员
//                      Ext.getCmp(val+"PersonId").setValue(id);
//                      Ext.getCmp(val+"PersonAccountId").setValue(data.accountId);
//                      Ext.getCmp(val+"DepartmentId").setValue("");
//                        Ext.getCmp(val+"Department").setValue(text);
////                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                  }
//                    
//                }
//            });
            
        }
        
        //选择人
        this.selectPer = function(val){
          //选择事件逻辑
            TreeOper.singleUserTree({
                onComplete: function(id,text,data){
                    Ext.getCmp(val+"Id").setValue(id);
                    Ext.getCmp(val).setValue(text);
                    Ext.getCmp(val+"AccountId").setValue(data.accountId);
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
                modal:true,
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
            Ext.getCmp('testCardOrderApplyRemarks').setValue(rowData.remarks);
        }
    }
    
    
    
    
    