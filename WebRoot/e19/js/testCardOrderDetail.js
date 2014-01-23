
var cardSheetIdGlo = 0;
var cardOperationTypeIdGlo = 0;//全局工单类型变量
var operationTypeIdGlo = 0;//全局执行类型变量
var body_width = Ext.getBody().getSize().width;
var body_height = Ext.getBody().getSize().height;
var operType = "";
var processInstID = "";
var activityInstID = "";
var taskInstID = "";
var testOrderCheckFlag = "detail";
var cardType = "";
var checkListId = "";
var haveLoad = 0;
var hadModifyDefferenceList = 0;
var testCardOrderDetailWoStatusEnumId = "";
var testCardOrderDetailFileList = new Object();
var testCardOrderDetailWidth = 160;
var eo = new EdGridOper();
var testCardOrderDetailIsUnify = 0;
var testCardOrderDetailDifferenceTypeEnumId = "";
var testCardOrderDetailCurrentStatus = "";
var testCardOrderDetailNumberTmp = "";
var testCardOrderDetailTestobjectId = "";
var modOper = new TestCardModOper();
var detailProcessingTypeMap = null;
var stroe = new jsonStroe();
var detailTip = "";

detailProcessingTypeMap = getMap("TCM_PROCESSING_TYPE");

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

    function DetailWin(){
    	
    	this.showWinPre = function(processInstIDTmp,activityInstIDTmp,taskInstIDTmp,urlTmp,workOrderId){//与showWinPreMyUndoTaskUnify方法的业务逻辑保持一致
    		testCardOrderDetailIsUnify = 0;
    		testOrderCheckFlag = "detail";
    	   processInstID = processInstIDTmp;
    	   activityInstID = activityInstIDTmp;
    	   taskInstID = taskInstIDTmp;
    	   
    	   if(urlTmp=='checkModify'){
    	       testOrderCheckFlag = 'modify';
    	   }
    	   
    	   if(workOrderId==null||workOrderId==""){
    	       Ext.Msg.alert("提示","查询工单Id异常！");return;
    	   }
    	   new DetailWin().showWin(urlTmp,workOrderId);
//    	   var ob = new Object();
//    	   ob.processInstID = processInstID;
//    	   ZTESOFT.invokeAction(
//                                    PATH+'/e19/tcmBpsAction.json?method=getCardSheetIdByProcessInstID',
//                                    ob,
//                                    function(response){
//                                    	if(response.total<1){
//                                    	   Ext.Msg.alert("提示","查询工单Id异常！");
//                                    	   return;
//                                    	}
//                                    	
//                                        var ro = response.rows;
//                                        new DetailWin().showWin(urlTmp,ro[0].flowingObjectId);
//                                    }
//                            );
    	}
    	
    	
    	this.showWinPreMyUndoTaskUnify = function(processInstIDTmp,activityInstIDTmp,taskInstIDTmp,urlTmp,workOrderId){
    		testCardOrderDetailIsUnify = 1;
    		testCardOrderDetailWidth = (myUndoTaskUnifyBody_width-80)/4;
            testOrderCheckFlag = "detail";
           processInstID = processInstIDTmp;
           activityInstID = activityInstIDTmp;
           taskInstID = taskInstIDTmp;
           
           if(urlTmp=='checkModify'){
               testOrderCheckFlag = 'modify';
           }
           
           if(workOrderId==null||workOrderId==""){
               Ext.Msg.alert("提示","查询工单Id异常！");return;
           }
           return new DetailWin().showWinMyUndoTaskUnify(urlTmp,workOrderId);
        }
    	
    	
    	this.controlLendTestCardList = function(val,flag){
    	   if(val==3&&(flag==2||flag==4||flag==0||flag==6)){//借用，并且执行环节或接收环节或详情或执行人确认
    	       Ext.getCmp('testCardLendPanel').show();
    	       if(flag==4||flag==0||flag==6){
    	           Ext.getCmp('valueListGridToolsBar').hide();
    	       }
    	   }
    	}
    	
    	this.controlTestCardList = function(val){//控制各种隐藏显示
    		
    		if(val==1){//调拨，修改执行对象为执行部门
               Ext.getCmp('testCardOrderDetailExecutorLabel').update('执行部门');
            }else{
               Ext.getCmp('testCardOrderDetailExecutorLabel').update('执行对象');
            }
    		
            if(val==3){//代表借用
                  Ext.getCmp('testCardListTR').hide();
                  Ext.getCmp('testCardListTR2').hide();
                  Ext.getCmp('expectedReturnTimeTR').show();
                  Ext.getCmp('expectedReturnTimeTR2').show();
//                  Ext.getCmp('executePersonTR').hide();  
//                  Ext.getCmp('executePersonTR2').hide();  
                  Ext.getCmp('executeDepartmentTR').show();  
                  Ext.getCmp('executeDepartmentTR2').show();  
                  Ext.getCmp('checkEditgrid').hide();
                  
                  Ext.getCmp('auditMyDepartmentIdTR').show();  
                Ext.getCmp('auditMyDepartmentIdTR2').show(); 
                }else if(val==4){//归还
                	Ext.getCmp('auditDepartmentIdTR').hide();  
                    Ext.getCmp('auditDepartmentIdTR2').hide();  
//                    Ext.getCmp('auditPersonIdTR').hide();  
//                    Ext.getCmp('auditPersonIdTR2').hide(); 
                    Ext.getCmp('expectedReturnTimeTR').hide();   
                    Ext.getCmp('expectedReturnTimeTR2').hide();  
                    Ext.getCmp('checkEditgrid').hide();
                }else if(val==5){//报废
//                    Ext.getCmp('executePersonTR').hide();  
//                    Ext.getCmp('executePersonTR2').hide();  
                    Ext.getCmp('executeDepartmentTR').hide();  
                    Ext.getCmp('executeDepartmentTR2').hide();  
                    Ext.getCmp('expectedReturnTimeTR').hide();   
                    Ext.getCmp('expectedReturnTimeTR2').hide();  
                    Ext.getCmp('checkEditgrid').hide();
                }else if(val==2||val==1){//移交 调拨
//                    Ext.getCmp('executePersonTR').hide();  
//                    Ext.getCmp('executePersonTR2').hide();  
                    Ext.getCmp('executeDepartmentTR').show();  
                    Ext.getCmp('executeDepartmentTR2').show();  
                    Ext.getCmp('expectedReturnTimeTR').hide();   
                    Ext.getCmp('expectedReturnTimeTR2').hide();  
                    Ext.getCmp('checkEditgrid').hide();
                }else if(val==6){//清查
                    Ext.getCmp('testCardListTR').hide();
                    Ext.getCmp('testCardListTR2').hide();
                    Ext.getCmp('expectedReturnTimeTR').hide();   
                    Ext.getCmp('expectedReturnTimeTR2').hide();   
                    Ext.getCmp('executeDepartmentTR').hide();   
                    Ext.getCmp('executeDepartmentTR2').hide();  
//                    Ext.getCmp('executePersonTR').hide();   
//                    Ext.getCmp('executePersonTR2').hide();  
                    if(Ext.getCmp('checkGrid')!=null){
                        var a = Ext.getCmp('checkGrid').getSelectionModel().getSelections();
                        for(var i=0;i<a.length;i++){
                                Ext.getCmp('checkEditgrid').getStore().add(new Ext.data.Record(a[i].data)); 
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
                                           cardType = ro[0].testobjectType;
                                           checkListId = ro[0].checkListId;
                                        }
                                    }
                            );
                    }
                }else{
                  Ext.getCmp('testCardListTR').show();
                  Ext.getCmp('testCardListTR2').show();
                  Ext.getCmp('expectedReturnTimeTR').hide();
                  Ext.getCmp('expectedReturnTimeTR2').hide();
                  Ext.getCmp('checkEditgrid').hide();
                }
        }
        
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
        
        this.initTestCardLendList = function(){
            //创建列   
        	var tip = "";
            var cm = new Ext.grid.CheckboxSelectionModel();            
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:testCardOrderDetailWidth*4*0.1}),
                {header:'类型',dataIndex:'testobjectName',width:testCardOrderDetailWidth*4*0.15},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.2},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.2},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:testCardOrderDetailWidth*4*0.15},
                {header:'是否借出',dataIndex:'lendFlagName',width:testCardOrderDetailWidth*4*0.2},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            
            if((operationTypeIdGlo==4&&(cardOperationTypeIdGlo==3))){//接收环节的借用流程
            	tip = "(请勾选已接收的卡)";
                column = new Ext.grid.ColumnModel([
//                new Ext.grid.CheckboxSelectionModel({header:"已接收",width:testCardOrderDetailWidth*4*0.06}),
                new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:testCardOrderDetailWidth*4*0.1}),
                {header:'类型',dataIndex:'testobjectName',width:testCardOrderDetailWidth*4*0.15},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.2},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.2},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:testCardOrderDetailWidth*4*0.15},
                {header:'是否借出',dataIndex:'lendFlagName',width:testCardOrderDetailWidth*4*0.2},
//                {header:'接收',dataIndex:'accepted',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                    if(record.data.isAccepted=="accepted"){
//                       return "是";
//                    }else{
//                       return "否";
//                    }
//                    
//                },width:4*testCardOrderDetailWidth/6*5*0.1},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            }
            
            if(operationTypeIdGlo=="6"||operationTypeIdGlo=="0"){//执行人确认环节 或者详情
                column = new Ext.grid.ColumnModel([
//                new Ext.grid.CheckboxSelectionModel({header:"已接收",width:testCardOrderDetailWidth*4*0.06}),
//                new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:testCardOrderDetailWidth*4*0.1}),
                {header:'类型',dataIndex:'testobjectName',width:testCardOrderDetailWidth*4*0.15},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.2},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.2},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:testCardOrderDetailWidth*4*0.15},
                {header:'是否借出',dataIndex:'lendFlagName',width:testCardOrderDetailWidth*4*0.1},
                {header:'接收',dataIndex:'accepted',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    if(record.data.isAccepted=="accepted"){
                       return "是";
                    }else{
                       return "否";
                    }
                    
                },width:4*testCardOrderDetailWidth/6*5*0.12},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            }
            
            //人员信息
            var testCardList = new ZTESOFT.Grid({
                id : 'testCardLendList',
//                height : body_height*0.3,//默认宽度为自适应的，一般不用设置
                width : testCardOrderDetailWidth*4,
//                fieldLabel:'测试卡借用列表',
                height:200,
//                title : '测试卡借用列表',
                cm : column,//列定义
                paging : false,//是否分页
//                collapsible : false,//是否可以收缩
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

            
            var orderInfo = new Ext.FormPanel({
                id:'testCardLendPanel',
//                region: 'center',
                labelAlign: 'left',
                frame:true,
//                autoScroll :true,
//                hidden:true,
                title:'测试卡借用列表'+tip,
                width:testCardOrderDetailWidth*4+50,//Ext.getBody().getSize(),
//                height:350,
                bodyStyle:'padding:20px;overflow-x:hidden;overflow-y:auto;width:'+(testCardOrderDetailWidth*4+50)+'px',
                buttonAlign: 'center',
                labelWidth: 70,
                items: [
//                	{
//                    layout:'column',
//                    items:[
                    testCardList
                        
//                        {
//                        columnWidth:1,
//                        layout:'form',
//                        items: [testCardList]
//                        }
                        
//                   ]
//                   }
            ]});
            
            return orderInfo;
        }
        
        this.initValueListGridToolsBar = function() {
            var tb = new Ext.Toolbar({id:'valueListGridToolsBar'});
            tb.add({
                text : '添加',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    new DetailWin().initSelectTestCardWin();
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '删除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    var a = Ext.getCmp('testCardLendList').getSelectionModel().getSelections();
                    if(a.length!=0){
                        Ext.Msg.confirm('系统提示','确定要删除吗？',
                        function(btn){
                          if(btn=='yes'){
                              for(var i=0;i<a.length;i++){
                                    Ext.getCmp('testCardLendList').getStore().remove(a[i]);
                                }  
                                Ext.getCmp('testCardLendList').getView().refresh();
                                Ext.Msg.alert("提示","删除成功！");
                          }
                          
                        },this);
                    }
                    
                }
            });

            return tb;
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
            
//            var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBar();
                var testQryPnToolsBar = testCardQueryAndSelect.initTestQryPnToolsBarTwo("execute",3);//代表执行环节，借用类型
            
            var testCardQryResult = eo.initTestCardDetailQryResult();
            
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
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                labelWidth: 70,
                items: [testQryPnToolsBar//testCardQry,qryTestFrom,qryTeleForm,qryTermiForm,qryRechForm
                        ,testCardQryResult,testCardQryResultSelected]
            });
            
            return selectTestCardPanel;
        }
        
        this.initTestCardQryResultSelected = function(){
            
            //创建列   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.12},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.12},
               /* {header:'编号',dataIndex:'numberTmp',width:gridWidth*0.12},
                {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.12},*/
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.07},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
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
                tbar : this.initTestCardOrderDetailResultSelectedToolsBar(),//工具条，用来放操作按键
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
        
        this.initTestCardOrderDetailResultSelectedToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '删除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    var a = Ext.getCmp('testCardQryResultSelected').getSelectionModel().getSelections();
                    for(var i=0;i<a.length;i++){
                        Ext.getCmp('testCardQryResultSelected').getStore().remove(a[i]);
                    }
                    Ext.getCmp('testCardQryResultSelected').getView().refresh();
                }
            });//加这个符号，会在页面上添加一个竖线分隔符
            

            return tb;
        }
        
        this.initSelectTestCardWin = function(){
            
            
            
            var selectTestCardPanel = this.initSelectTestCardPanel();
            var selectTestCardWin = new Ext.Window({
                id:'selectTestCardWin',
                title: this.winTitle,
                closable:true,
                width: 650,//body_width*0.6,
                height: 550,//body_height*0.8,
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
                        var b = Ext.getCmp("testCardLendList").getStore().data.items;
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
                            	  str = str +"["+a[i].data.numberTmp+"]";
                                  fla = 1;
                              }
                            }
                            if(fla==0){
                           Ext.getCmp("testCardLendList").getStore().add(new Ext.data.Record(a[i].data));
                           num = num+1;
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
        
        this.initTestCardList = function(){
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer({header:'序号',width:4*testCardOrderDetailWidth/6*5*0.08}),
                {header:'类型',dataIndex:'testobjectName',width:4*testCardOrderDetailWidth/6*5*0.12},
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:4*testCardOrderDetailWidth/6*5*0.17},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:4*testCardOrderDetailWidth/6*5*0.17},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:4*testCardOrderDetailWidth/6*5*0.16},
                {header:'是否借出',dataIndex:'lendFlagName',width:4*testCardOrderDetailWidth/6*5*0.13},
                {header:'管理员',dataIndex:'adminName',width:4*testCardOrderDetailWidth/6*5*0.17},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'isAccepted',dataIndex:'isAccepted',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            if((operationTypeIdGlo==4&&(cardOperationTypeIdGlo==1||cardOperationTypeIdGlo==2||cardOperationTypeIdGlo==4))){//接收环节的移交和调拨和归还流程
            	column = new Ext.grid.ColumnModel([
//            	new Ext.grid.CheckboxSelectionModel({header:"已接收",width:4*testCardOrderDetailWidth/6*5*0.06}),
            	new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:4*testCardOrderDetailWidth/6*5*0.08}),
                {header:'类型',dataIndex:'testobjectName',width:4*testCardOrderDetailWidth/6*5*0.12},
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:4*testCardOrderDetailWidth/6*5*0.17},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:4*testCardOrderDetailWidth/6*5*0.17},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:4*testCardOrderDetailWidth/6*5*0.16},
                {header:'是否借出',dataIndex:'lendFlagName',width:4*testCardOrderDetailWidth/6*5*0.13},
                {header:'管理员',dataIndex:'adminName',width:4*testCardOrderDetailWidth/6*5*0.17},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'isAccepted',dataIndex:'isAccepted',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            }
            if(operationTypeIdGlo=="6"||operationTypeIdGlo=="0"){//申请人确认环节 或者 详情
                column = new Ext.grid.ColumnModel([
//              new Ext.grid.CheckboxSelectionModel({header:"已接收",width:4*testCardOrderDetailWidth/6*5*0.06}),
//                new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:4*testCardOrderDetailWidth/6*5*0.1}),
                {header:'类型',dataIndex:'testobjectName',width:4*testCardOrderDetailWidth/6*5*0.13},
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:4*testCardOrderDetailWidth/6*5*0.15},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:4*testCardOrderDetailWidth/6*5*0.15},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:4*testCardOrderDetailWidth/6*5*0.15},
                {header:'是否借出',dataIndex:'lendFlagName',width:4*testCardOrderDetailWidth/6*5*0.12},
                {header:'管理员',dataIndex:'adminName',width:4*testCardOrderDetailWidth/6*5*0.1},
                {header:'接收',dataIndex:'accepted',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                	if(record.data.isAccepted=="accepted"){
                	   return "是";
                	}else{
                	   return "否";
                	}
                    
                },width:4*testCardOrderDetailWidth/6*5*0.1},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'isAccepted',dataIndex:'isAccepted',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
            }
            
            
            
            //人员信息
            var testCardList = new ZTESOFT.Grid({
                id : 'testCardList',
//                height : body_height*0.3,//默认宽度为自适应的，一般不用设置
                width : testCardOrderDetailWidth*4/6*5,
//                fieldLabel:'测试卡列表',
                height:200,
//                title : '测试卡列表',
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

            return testCardList;

        }
        
        this.initOrderInfo = function(){
        	
        	if(operationTypeIdGlo==4&&(cardOperationTypeIdGlo==1||cardOperationTypeIdGlo==2)){//接收环节的移交和调拨流程
        		detailTip = "(请勾选已接收的卡)";
        	}else{
        	   detailTip = "";
        	}
        	
            var testCardList = this.initTestCardList();
            
            var orderInfo = new Ext.FormPanel({
                id:'orderInfo',
//                region: 'center',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'工单信息',
                width:4*testCardOrderDetailWidth+20+20+10,//Ext.getBody().getSize(),
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
                            width : 4*testCardOrderDetailWidth/6
//                            ,//最小是120，最大190
//                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '工单主题'
                                    }
                                },{
                                    colspan : 5,
                                    width:4*testCardOrderDetailWidth/6*5,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textfield',
                                            hideLabel : true,
//                                            fieldLabel: '工单主题',
                                            name: 'sheetTheme',
                                            id: 'sheetTheme',
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '内容'
                                    }
                                },{
                                    colspan : 5,
                                    width:4*testCardOrderDetailWidth/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '内容',
                                            name: 'content',
                                            id: 'content',
                                            height : 50,
                                            readOnly:true,
                                            anchor:'100%'
                                        }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    id:'testCardListTR',
                                    width:4*testCardOrderDetailWidth/6,
//                                    height:200,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '测试卡列表'+detailTip
                                    }
                                },{
                                    colspan : 5,
                                    id:'testCardListTR2',
                                    width:4*testCardOrderDetailWidth/6*5,
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
                                        text : '附件'
                                    }
                                },{
                                    colspan : 5,
                                    id:'filesTR2',
                                    width:4*testCardOrderDetailWidth/6*5,
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
                                        detailValues:testCardOrderDetailFileList,//已有的附件数据（从数据库读出），格式为一个object，里面包含数组

                                        operType:'DETAIL',//操作类型，如果为DETAIL则只是查询详情，不提供上传功能
                                        fileTypes:"*.*",//附件类型，默认为所有，即“*.*”
                                        fileLimit:1,//同时上传的最大数目
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
//                                    xtype:'button',
//                                    name:'uploa',
//                                    id: 'uploa',
//                                    onClick : function() {
//                                        oper.upload('filesName');
//                                    },
//                                    text:'上传'
//                                }
//                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '备注'
                                    }
                                },{
                                    colspan : 5,
                                    width:4*testCardOrderDetailWidth/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '备注',
                                            name: 'remarks',
                                            id: 'remarks',
                                            height : 50,
                                            readOnly:true,
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
//                                fieldLabel: '工单主题',
//                                name: 'sheetTheme',
//                                id: 'sheetTheme',
//                                disabled:true,
//                                anchor:'95%'
//                            }]
//                        }
//                        ,
//                        {
//                         columnWidth:1,
//                         layout: 'form',
//                         items: [{
//                                xtype:'textarea',
//                                fieldLabel: '内容',
//                                name: 'content',
//                                id: 'content',
//                                disabled:true,
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
//                        columnWidth:.95,
//                        layout: 'form',
//                        id:'filesTR1',
//                        items: [
//                        {
//                                xtype:'textfield',
//                                fieldLabel:'附件',
//                                name:'filesName',
//                                id: 'filesName',
//                                editable : false ,
////                                html:aaa,//'<a href="javascript:alert(2);">aaa</a>',
//                                anchor:'95%'
//                            }
//                        ]
//                        },
//                        {
//                            columnWidth:.05,
//                            layout: 'form',
//                            id:'filesTR2',
//                            items: [{
//                                    xtype:'button',
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
//                                disabled:true,
//                                anchor:'95%'
//                            }
//                            ]
//                        }
//                   ]}
//            ]
                
                });
            return orderInfo;
        
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
                title : '审核历史',
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
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:1,
                        layout: 'form',
                        items: [{
                                xtype:'textarea',
                                fieldLabel: '审核意见',
                                name: 'approveOpinion',
                                id: 'approveOpinion',
                                readOnly:true,
                                anchor:'95%'
                            }
                            ]
                        }
                   ]}
            ]
            });
            
            return auditHisDetail;
            
            
        }
        
        this.getRoleclassId = function(){
        
            switch(cardOperationTypeIdGlo){
                       case 1:{//调拨
                        switch(operationTypeIdGlo){
                           case "3":return 10016;break;//审核
                        }
                        break;
                       }
                       case 2:{//移交
                        switch(operationTypeIdGlo){
                           case "3":return 10018;break;//审核
                        }
                        break;
                       }
                       case 3:{//借用
                        switch(operationTypeIdGlo){
                           case "3":return 10020;break;//审核
                        }
                        break;
                       }
                       case 4:{//归还
                        switch(operationTypeIdGlo){
                        }
                        break;
                       }
                       case 5:{//报废
                        switch(operationTypeIdGlo){
                        }
                        break;
                       }
                       case 6:{//清查
                        switch(operationTypeIdGlo){
                        }
                        break;
                       }
                    }
        }
        
        this.getRoleIdList = function(){
            var roleIDArray = new Array();
//            var roleclassId = this.getRoleclassId();
            var param = {
                    processInstID :  processInstID,
                    activityInstID : activityInstID,
                    accountId : session.logonAccount.accountId,
                    taskInstID : taskInstID
                    
          //          orgcode:session.logonAccount.cloudOrgId
//                    roleclass : roleclassId
            };
            var url = PATH + '/e19/testCardCommonAction.json?method=qryNextPaticipants';
            var response = ZTESOFT.Synchronize(url,param);
            if(response && response.length && response.length > 0){
                for(var i=0;i<response.length;i++){
                    if(response[i].participantType == 2){//组织
                        roleIDArray.push(response[i].participantID);
                    }
                }
            }
            return roleIDArray;
        }
        
        this.auditResultExecuteDepartmentOnPopup = function(inputNameTmp,requestDataTmp){
            if(cardOperationTypeIdGlo==1){//调拨流程 无论是审核还是执行对象，都用组织派发树,只能派组织
//                                                TreeOper.singleOrgTree({
//                                                    onComplete: function(id,text,data){
//                                                        Ext.getCmp("auditResultExecuteDepartment").setValue(text);
//                                                        Ext.getCmp("auditResultExecuteDepartmentId").setValue(id);
////                                                        Ext.getCmp(val+"ThisType").setValue("Org");
//                                                    }
//                                                });return;
                                                
                                                var _nodeRelationType="noRelation";
                                                var _isOnlyLeaf="0";
                                                var _inputType="radio";
                                                var _orgId = null;//session.logonAccount.provinceCompanyId;
                                                var freeObj = {
                                                    isSearchBox:0
                                                };
                                                var freeTreeObj = new FreeTreeObj("alot"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"COMPANY",freeObj);
                                                freeTreeObj.showTree(function(data){
                                                    Ext.getCmp("auditResultExecuteDepartment").setValue(data.text);
                                                        Ext.getCmp("auditResultExecuteDepartmentId").setValue(data.id);
                                                    
        //                                            Ext.getCmp('testStorageCityName').setValue(data.text);
        //                                            Ext.getCmp('testStorageCityId').setValue(data.id);
                                                    });return;
                                            }
                                                
                                                var inputName = inputNameTmp;
                                            var requestData = requestDataTmp;
                                            var isUseful = [1,0,0];
                                            var _nodeRelationType="noRelation";
                                            var _isOnlyLeaf="0";
                                            var _inputType="radio";
                                            var _orgId = session.org.cloudOrgId;
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
//                                            var tree = new DeepTreeObj(inputName,requestData,"auditResultExecuteDeepTreeObj",null,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType);
//                                            
//                                            tree.showTree(deeptreeUrl);
                                              
                                            
                                            //过滤派发树↓
                                            var _qryType="assignTree";
                                            var _cloudUserId =  session.logonAccount.cloudUserId;
                                            var _roleArray =  manager.getRoleIdList();//角色列表
//                                            var roleIDArray = new Array();
//                                            roleIDArray.push(4260002);
//                                            var _roleArray = roleIDArray;
                                            
                                            var _treeType =  2;//1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
                                            
                                            if(cardOperationTypeIdGlo==1){//调拨
                                                _treeType = 4;
                                            }else if(cardOperationTypeIdGlo==2){//移交
                                                _treeType = 2;
                                            }else if(cardOperationTypeIdGlo==3){//借用
                                                _treeType = 2;
                                            }
                                            
                                            var searchObject = {
                                                    fuzzySearchType : 0//前台（0）或后台（1）查询，默认为0
                                            };
                                            
                                            var tree = new DeepTreeObj(inputName,requestData,"auditResultExecuteDeepTreeObj"+new Date().getTime(),null,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType,searchObject,_qryType,_cloudUserId,_roleArray,_treeType);
                                            tree.showTree(deeptreeUrl);
                                            
                                            //过滤派发树↑
        }

        
        this.initApproveOpinionEditPanel = function(){
            var approveOpinionEditPanel = new Ext.FormPanel({
                id:'approveOpinionEditPanel'
                ,
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                title:'填写审核意见',
                width:testCardOrderDetailWidth*4+20+20,//Ext.getBody().getSize(),
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
                            width : testCardOrderDetailWidth*4/6,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    id:'auditResultt',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : operationTypeIdGlo=="countersign"?'会签结果':(operationTypeIdGlo=="2"?'执行结果':'审核结果')
                                    }
                                },{
                                    colspan : 5,
                                    id:'auditResultt2',
                                    width:testCardOrderDetailWidth*4/6*5,
                                    items : [{
                                    xtype: 'radiogroup',
                                    id:'auditResult',
                                    name : 'auditResult',
            //                        fieldLabel: '请选择类型',
                                    hideLabel : true,
                                    items: [
                                        {boxLabel: operationTypeIdGlo=="2"?'成功':'通过', name: 'rg', inputValue: 1,checked: true},
                                        {boxLabel: operationTypeIdGlo=="2"?'不成功':'不通过', name: 'rg', inputValue: 0}
                                    ],
                                    listeners : {
                                                change: function(radiofield,oldvalue) {
                                                        if(radiofield.getValue().inputValue == 0){
                                                           Ext.getCmp("approveOpinionEdit").setValue("");
                                                           Ext.getCmp("auditResultExecuteDepartmentTR").hide();
                                                           Ext.getCmp("auditResultExecuteDepartmentTR2").hide();
    //                                                       Ext.getCmp("auditResultExecutePersonTR").hide();
    //                                                       Ext.getCmp("auditResultExecutePersonTR2").hide();
                                                           Ext.getCmp('auditResultExecuteDepartment').allowBlank = true;
                                                        }else if(radiofield.getValue().inputValue == 1){
                                                           Ext.getCmp("approveOpinionEdit").setValue("同意");
                                                           if(cardOperationTypeIdGlo==3&&operationTypeIdGlo=="2"){//借用流程的执行环节
                                                            Ext.getCmp("approveOpinionEdit").setValue("成功");
                                                           }
                                                           if((cardOperationTypeIdGlo==5&&(operationTypeIdGlo==5||operationTypeIdGlo==3))
                                                           ||operationTypeIdGlo=="countersign"
                                                           ||(cardOperationTypeIdGlo==3&&(operationTypeIdGlo=="2"))
                                                           ||(cardOperationTypeIdGlo==6)){//报废流程，第二审核环节 或者会签回单 或者借用流程的执行环节 清查流程 则不用选执行单位
                                                            
                                                           }else{
                                                            Ext.getCmp("auditResultExecuteDepartmentTR").show();
                                                           Ext.getCmp("auditResultExecuteDepartmentTR2").show();
    //                                                       Ext.getCmp("auditResultExecutePersonTR").show();
    //                                                       Ext.getCmp("auditResultExecutePersonTR2").show();
                                                           Ext.getCmp('auditResultExecuteDepartment').allowBlank = false;
                                                           }
                                                           
                                                        }
                                                    
                                                }
                                            },
                                                        anchor:'100%'
                                                }]
                                },
                                
                                {
                                    colspan : 1,
                                    id:'auditResultExecuteDepartmentTR',
                                    hidden:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>执行对象'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardOrderDetailWidth*4/6*5,
                                    id:'auditResultExecuteDepartmentTR2',
                                    hidden:true,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.popupfield',
                                            hideLabel : true,
//                                            fieldLabel: '<font color="red">*</font>执行单位',
                                            name: 'auditResultExecuteDepartment',
                                            id: 'auditResultExecuteDepartment',
                                            valueFile : 'auditResultExecuteDepartmentId',
                                            allowBlank:false,
                                            readOnly: true,
                                            blankText:'请选择执行单位!',
                                            onPopup : function() {
                                            	var inputName = "auditResultExecuteDepartment,auditResultExecuteDepartmentId,auditResultExecutePersonId,auditResultExecutePersonAccountId";
                                            var requestData = "text,id,id,accountId";
                                            	new DetailWin().auditResultExecuteDepartmentOnPopup(inputName,requestData);
                                            	
                                            	
                                            
                                                    },
                                            anchor:'100%'
                                        },
                                        {
                                            xtype:'hidden',
                                            id:'auditResultExecuteDepartmentId',
                                            name:'auditResultExecuteDepartmentId'
                                        },
                                        {
                                            xtype:'hidden',
                                            id:'auditResultExecutePersonId',
                                            name:'auditResultExecutePersonId'
                                        },{
                                            xtype:'hidden',
                                            id:'auditResultExecutePersonAccountId',
                                            name:'auditResultExecutePersonAccountId'
                                        },{
                                            xtype:'hidden',
                                            id:'auditResultExecutePerson',
                                            name:'auditResultExecutePerson'
                                        }
                                    ]
                                },
//                                {
//                                    colspan : 1,
//                                    id:'auditResultExecutePersonTR',
//                                    hidden:true,
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        html : '执行人'
//                                    }
//                                },{
//                                    colspan : 2,
//                                    width:220,
//                                    id:'auditResultExecutePersonTR2',
//                                    hidden:true,
//                                    items : [
//                                        {
//                                            xtype:'ZTESOFT.popupfield',
//                                            hideLabel : true,
////                                            fieldLabel: '执行人',
//                                            name: 'auditResultExecutePerson',
//                                            id: 'auditResultExecutePerson',
//                                            valueFile : 'auditResultExecutePersonId',
//                                            onPopup : function() {
//                                                            //选择事件逻辑
//                                                            TreeOper.singleUserTree({
//                                                                onComplete: function(id,text,data){
//                                                                    Ext.getCmp('auditResultExecutePersonId').setValue(id);
//                                                                    Ext.getCmp('auditResultExecutePerson').setValue(text);
//                                                                    Ext.getCmp('auditResultExecutePersonAccountId').setValue(data.accountId);
//                                                                }
//                                                            });
//                                                    },
//                                            anchor:'100%'
//                                        },
//                                        {
//                                            xtype:'hidden',
//                                            id:'auditResultExecutePersonId',
//                                            name:'auditResultExecutePersonId'
//                                        },{
//                                            xtype:'hidden',
//                                            id:'auditResultExecutePersonAccountId',
//                                            name:'auditResultExecutePersonAccountId'
//                                        }
//                                    ]
//                                },
                                {
                                    colspan : 1,
                                    items : {
                                    	id:'approveOpinionEditLabel',
                                    	name:'approveOpinionEditLabel',
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>处理意见'
                                    }
                                },{
                                    colspan : 5,
                                    width:testCardOrderDetailWidth*4/6*5,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '<font color="red">*</font>审核意见',
                                            name: 'approveOpinionEdit',
                                            id: 'approveOpinionEdit',
                                            height:50,
                                            allowBlank:false,
                                            blankText:'请填写处理意见!',
                                            anchor:'100%'
                                        }
                                    ]
                                }
                ]
//                items: [
//                    {
//                    layout:'column',
//                    items:[
//                        {
//                        columnWidth:1,
//                        layout: 'form',
//                        id:'auditResultt',
//                        items: [{
//                                xtype:'radiogroup',
//                                fieldLabel : "审核结果",  
//                                id:'auditResult',
//                                items : [{  
//                                            boxLabel : '通过',  
//                                            inputValue : "1",  
//                                            name : "rg",  
//                                            checked : true  
//                                        }, {  
//                                            boxLabel : '不通过',  
//                                            name : "rg",  
//                                            inputValue : "0"  
//                                        }],
//                                        listeners : {
//                                                change: function(radiofield,oldvalue) {
//                                                	if(radiofield.getValue().inputValue == 0){
//                                                	   Ext.getCmp("approveOpinionEdit").setValue("");
//                                                	   Ext.getCmp("auditResultExecuteDepartmentTR").hide();
//                                                	   Ext.getCmp("auditResultExecuteDepartmentTR2").hide();
//                                                	   Ext.getCmp("auditResultExecutePersonTR").hide();
//                                                	   Ext.getCmp('auditResultExecuteDepartment').allowBlank = false;
//                                                	}else if(radiofield.getValue().inputValue == 1){
//                                                       Ext.getCmp("approveOpinionEdit").setValue("同意");
//                                                       Ext.getCmp("auditResultExecuteDepartmentTR").show();
//                                                       Ext.getCmp("auditResultExecuteDepartmentTR2").show();
//                                                       Ext.getCmp("auditResultExecutePersonTR").show();
//                                                       Ext.getCmp('auditResultExecuteDepartment').allowBlank = true;
//                                                    }
//                                                	
//                                                }
//                                            },
//                                anchor:'95%'
//                            }
//                            ]
//                        },{
//                        columnWidth:0.5,
//                        layout: 'form',
//                        id:'auditResultExecuteDepartmentTR',
//                        hidden:true,
//                        items: [{
//                            xtype:'ZTESOFT.popupfield',
//                                fieldLabel: '<font color="red">*</font>执行单位',
//                                name: 'auditResultExecuteDepartment',
//                                id: 'auditResultExecuteDepartment',
//                                valueFile : 'auditResultExecuteDepartmentId',
//                                allowBlank:false,
//                                blankText:'请选择执行单位!',
//                                anchor:'95%',
//                                onPopup : function() {
//                                                //选择事件逻辑
//                                                TreeOper.singleOrgTree({
//                                                    onComplete: function(id,text,data){
//                                                        Ext.getCmp('auditResultExecuteDepartmentId').setValue(id);
//                                                        Ext.getCmp('auditResultExecuteDepartment').setValue(text);
//                                                    }
//                                                });
//                                        }
//                        },{
//                            xtype:'hidden',
//                            id:'auditResultExecuteDepartmentId',
//                            name:'auditResultExecuteDepartmentId'
//                        }]
//                        },{
//                        columnWidth:0.5,
//                        layout: 'form',
//                        id:'auditResultExecutePersonTR',
//                        hidden:true,
//                        items: [{
//                            xtype:'ZTESOFT.popupfield',
//                                fieldLabel: '执行人',
//                                name: 'auditResultExecutePerson',
//                                id: 'auditResultExecutePerson',
//                                valueFile : 'auditResultExecutePersonId',
//                                anchor:'95%',
//                                onPopup : function() {
//                                                //选择事件逻辑
//                                                TreeOper.singleUserTree({
//                                                    onComplete: function(id,text,data){
//                                                        Ext.getCmp('auditResultExecutePersonId').setValue(id);
//                                                        Ext.getCmp('auditResultExecutePerson').setValue(text);
//                                                        Ext.getCmp('auditResultExecutePersonAccountId').setValue(data.accountId);
//                                                    }
//                                                });
//                                        }
//                        },{
//                            xtype:'hidden',
//                            id:'auditResultExecutePersonId',
//                            name:'auditResultExecutePersonId'
//                        },{
//                            xtype:'hidden',
//                            id:'auditResultExecutePersonAccountId',
//                            name:'auditResultExecutePersonAccountId'
//                        }]
//                        },{
//                        columnWidth:1,
//                        layout: 'form',
//                        items: [{
//                            xtype:'textarea',
//                                fieldLabel: '<font color="red">*</font>审核意见',
//                                name: 'approveOpinionEdit',
//                                id: 'approveOpinionEdit',
//                                allowBlank:false,
//                                blankText:'请填写审核意见!',
//                                anchor:'95%'
//                        }]
//                        }
//                   ]}
//            ]
            });
            
            return approveOpinionEditPanel;
        }
        
        this.getGrid = function(type) {
        var gridWidth = testCardOrderDetailWidth*4*0.9;
        
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
                        return '<a href=javascript:manager.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryAvailableNum")>' + value + '</a>';
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
                        return '<a href=javascript:manager.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryUnavailableNum")>' + value + '</a>';
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
                        return '<a href=javascript:manager.showNumDetail('+record.data.testobjectType+","+record.data.adminId+',"inventoryLendNum")>' + value + '</a>';
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
                    allowBlank: false
                })
            }, {
              header:'差异明细',dataIndex:'detail',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                if(record.data.inventoryAvailableNum!=(record.data.actualAvailableNum||0)
                            ||record.data.inventoryUnavailableNum!=(record.data.actualUnavailableNum||0)
                            ||record.data.inventoryLendNum!=(record.data.actualLendNum||0)){
                                
                                if(type=='add'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+Math.abs(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+Math.abs(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+Math.abs(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\",\"\",\""+type+"\",\""+record.data.adminName+"\")'>填写明细</a>";
                                }
                                if(type=='modify'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+Math.abs(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+Math.abs(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+Math.abs(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\","+record.data.checkListId+",\""+type+"\",\""+record.data.adminName+"\")'>查看明细</a>";
                                }
                                if(type=='detail'){
                        return "<a id='a_"+record.data.adminId+"' href='javascript: eo.differentDetail("+Math.abs(record.data.inventoryAvailableNum-record.data.actualAvailableNum)
                                +","+Math.abs(record.data.inventoryUnavailableNum-record.data.actualUnavailableNum)
                                +","+Math.abs(record.data.inventoryLendNum-record.data.actualLendNum)+",\""+record.data.adminId+"\","+record.data.checkListId+",\""+type+"\",\""+record.data.adminName+"\")'>查看明细</a>";
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
            width:testCardOrderDetailWidth*4+50,
            frame: true,
            clicksToEdit: 1,
            title:'清查记录列表',
            bodyStyle:'padding:0px;',
            listeners : {
                afteredit : function(val) {
                    
                    if(val.record.data.inventoryAvailableNum!=(val.record.data.actualAvailableNum||0)
                            ||val.record.data.inventoryUnavailableNum!=(val.record.data.actualUnavailableNum||0)
                            ||val.record.data.inventoryLendNum!=(val.record.data.actualLendNum||0)){
                        val.record.set("checkStatusName","需整改");
                        val.record.set("checkStatus","2");
                        
                        val.record.set("detail","<a id='a_"+val.record.data.adminId+"' href='javascript: eo.differentDetail("+Math.abs(val.record.data.inventoryAvailableNum-val.record.data.actualAvailableNum)
                                +","+Math.abs(val.record.data.inventoryUnavailableNum-val.record.data.actualUnavailableNum)
                                +","+Math.abs(val.record.data.inventoryLendNum-val.record.data.actualLendNum)+",\""+val.record.data.adminId+"\",\"\",\""+type+"\",\""+record.data.adminName+"\")'>填写明细</a>");
                        val.record.set("needFill","1");//需填写并未填写
                    }else{
                        val.record.set("needFill","0");//不需填写
                        val.record.set("checkStatus","1");
                        val.record.set("checkStatusName","正常");
                        val.record.set("detail","");
                    }
                }
            }
        });
        
        
        return grid;
    }
    
    //弹窗列出测试卡列表
    this.showNumDetail = function(testobjectType,adminId,fla){
        manager.initNumDetailWindow(testobjectType,adminId,fla);
    }  
    
    this.testCardOrderDetailDoViewDetail = function(typeId,value,attributionProvinceId){
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
        var param = manager.getNumDetailExportParam(typeId,adminId,fla);
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
                var pa = manager.getNumDetailExportParam(typeId,adminId,fla);
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
        
        this.initOrderInfoForm = function(){
            
            var formPanel = this.initFormPanel();
            var orderInfo = this.initOrderInfo();
            var checkGrid = this.getGrid(testOrderCheckFlag);//'detail'
//            var auditHisList = this.initAuditHisList();
//            var auditHisDetail = this.initAuditHisDetail();
            var testCardLendList = this.initTestCardLendList();
            var approveOpinionEditPanel = this.initApproveOpinionEditPanel();
            var dispatchCommitFormPn = this.getDispatchCommitFormPn();
            var orderInfoForm = new Ext.Panel({
                id:'orderInfoForm',
                labelAlign: 'left',
                align : 'center',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                title:'工单信息',
//                width:720,//Ext.getBody().getSize(),
//                height:800,
                bodyStyle:'overflow-x:hidden;overflow-y:auto;',//width:740px padding:0px 400px 0px 400px;
                labelWidth: 70,
                items: [formPanel,orderInfo,checkGrid,testCardLendList,approveOpinionEditPanel,dispatchCommitFormPn]//,auditHisDetail
            });
            
            return orderInfoForm;
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
//            if(testCardOrderDetailWoStatusEnumId!=""&&testCardOrderDetailWoStatusEnumId!=1){//草稿时不显示流程图
                obLis.push(p4);
//            }
            
            
            var tabs = new Ext.TabPanel({
                activeTab: 0,
                region: 'center',
                align : 'center',
                bodyStyle:'padding:0px;overflow-x:auto;overflow-y:auto;width:',//740px padding:0px;
                items: [obLis]//orderInfoForm
//                ,tab2,p3,p4]
            });
            
//            this.getOperateHisListData(cardSheetIdGlo);
            
            tabs.on('tabchange',function(){
             if(tabs.getActiveTab().id=='attachmentPanel'){
                 Ext.getCmp('attachmentInfo').store.removeAll();
                 Ext.getCmp('attachmentInfo').store.load({
                     params:{
                         start:0,
                         limit:Ext.getCmp('attachmentInfo').getPageSize(),
                         objectTable:'T_EOM_CARD_SHEET',
                         objectId:cardSheetIdGlo
                         }
                 });
             }
             
             if(tabs.getActiveTab().id=='approvalTabPn'){
                 manager.getOperateHisListData(cardSheetIdGlo);
             }
         });
        
        
         Ext.getCmp('attachmentInfo').store.on('beforeload', function(store) {
                 var param = new Object();
                 param.objectTable = 'T_EOM_CARD_SHEET';
                 param.objectId = cardSheetIdGlo;
                 Ext.getCmp('attachmentInfo').store.baseParams =param ;    
         });
         
         
         //            Ext.getCmp('attachmentInfo').store.load({
//                             params:{
//                                 start:0,
//                                 limit:Ext.getCmp('attachmentInfo').getPageSize(),
//                                 objectTable:'T_EOM_CARD_SHEET',
//                                 objectId:cardSheetIdGlo
//                                 }
//                         });
            
            return tabs;
        }
        
        //流程图
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
//         'src="'+PATH +'/processGraph.jsp"' +
//         		'/>' +
         		'</div>';
       }
       else{
        designHtml = '<div id=div_aa width="720" height="600">'+
         '<iframe id="f_" width="100%" height="600" '+
//         'src="'+PATH +'/MyJsp.jsp"/>' +
//         		'</div>';}
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
            return panel;
        }
        
        this.funDoc= function(rec){
            return '<a href="javascript:new DetailWin().download()">'+rec+'</a>'; 
        }
        
        this.download = function () {
            var selInfo = Ext.getCmp('attachmentInfo').getSelectionModel().getSelected();//alert(param.fileId+"|"+param.fileName);
            this.download2(selInfo.data.attachmentId,selInfo.data.attachmentName);
        }
        
        this.download2 = function(attachmentId,attachmentName){
        	var param = new Object();
            param.fileId = attachmentId;
            param.fileName =  attachmentName;
            new ZTESOFT.FileUtil().downloadFile(param);
        }
        
        this.initAttachmentGrid = function() {
            /**
             * 定义附件
             */
            var checkshow = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([  checkshow,new Ext.grid.RowNumberer({header:'序号',width:40}), {
                header : '附件ID',
                dataIndex : 'attachmentId',
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

            },{
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
                dataIndex : 'attachmentPurpose'//,
                ,width:gridWidth*0.15,
                hidden : true
                //hidden : true
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
    
    
        
        this.getOperateHisListData = function(cardSheetIdGlo){
            var param = new Object();
            param.processingObjectId = cardSheetIdGlo;
            param.accountId=session.logonAccount.accountId;
            param.accountName =session.logonAccount.userEmpName;
            param.password="000000";
            param.processInstId = processInstID;
            Ext.getCmp('approvalGrid').store.on('beforeload', function(store) {
                if (Ext.getCmp('approvalGrid').store.lastOptions != null) {
                    Ext.getCmp('approvalGrid').store.baseParams = param;
                }
            });
    //        Ext.getCmp('approvalGrid').store.removeAll();//先移除旧数据
            Ext.getCmp('approvalGrid').store.load({
                params : {
                    start : 0,// 开始索引
                    limit : Ext.getCmp('approvalGrid').getPageSize(),
                    deletedFlag : 0
                }
            });
            Ext.getCmp('approvalGrid').store.on('load', function() {
                //Ext.getCmp('approvalGrid').getSelectionModel().selectFirstRow();// 选中第一行
                var aa = new Array();
                var st = Ext.getCmp('approvalGrid').getStore();
                 //   var record = st.getAt(st.getCount()-1);
                var record = st.getAt(0);
                        aa.push(record);
                Ext.getCmp('approvalGrid').getSelectionModel().selectRecords(aa);
                
            });
 /*           Ext.getCmp('approvalGrid').getSelectionModel().addListener("rowselect",function(){
                var selectItem = Ext.getCmp('approvalGrid').getSelectionModel().getSelected();
                selectItem.data.operatorDtl = selectItem.data.operator;
                selectItem.data.operateDepDtl = selectItem.data.operatorDep;
                selectItem.data.operateTimeDtl = selectItem.data.operateTime;
                if(selectItem.data.operateType==11){//审核历史的操作类型   11代表审核
                    selectItem.data.operateResultDtl = selectItem.data.operateResult==1?"通过":"不通过";
                }else if(selectItem.data.operateType==12){//12代表执行
                    selectItem.data.operateResultDtl = selectItem.data.operateResult==1?"成功":"不成功";
                }else{
                    selectItem.data.operateResultDtl = selectItem.data.operateResult;
                }
//                selectItem.data.operateTypeDtl = selectItem.data.operateType;
                selectItem.data.operateTypeDtl = detailProcessingTypeMap.get(selectItem.data.operateType);//selectItem.data.operateTypeName;
                selectItem.data.operateContentDtl = selectItem.data.operateContent;
                selectItem.data.remarksDtl = selectItem.data.remarks;
                Ext.getCmp('approvalFormDtl').getForm().loadRecord(selectItem);
            });*/
            
            
        }
        
        this.getApprovalTabPn = function(){
            var approvalHisGrid= this.initApprovalHisGrid();
            var formPn = this.getApprovalDetailFormPn();
            var pn = new Ext.Panel({
//                title:"审批历史",
//                height:body_height*0.75,
//                plain:true,
//                autoScroll:true,
                id:"approvalTabPn",
                labelAlign: 'left',
//                layout: 'border',
                frame:true,
                autoScroll :true,
                title:'审核历史',
                width:testCardOrderDetailWidth*4+20+20,//Ext.getBody().getSize(),
//                height:body_height*0.75,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                labelWidth: 70,
                
                items: [approvalHisGrid,formPn]
            });
            return pn;
        }
        
        this.getApprovalDetailFormPn = function(){

        var  approvalDtlPn = new Ext.FormPanel({
            id:'approvalFormDtl',
            labelAlign : 'right',
//            labelWidth : 80,
            frame : true,
            title : '步骤详情',
            height : 250,//body_height*0.25,
            width: testCardOrderDetailWidth*4+20+20+10,//body_width*0.6,
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
                            width : testCardOrderDetailWidth,//最小是120，最大190
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
                                    width:testCardOrderDetailWidth*3,
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
                                    width:testCardOrderDetailWidth*3,
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
                                    width:testCardOrderDetailWidth*3,
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
        
        this.initApprovalHisGrid = function() {
        //创建列   
        var approvalGridWidth = body_width*0.6;
   //     var cm = new Ext.grid.CheckboxSelectionModel();
        var cm = new Ext.grid.RowSelectionModel({ 
            listeners : {
                rowselect : function(c, index, rec) { //处理数据选中 
                	var selectItem = Ext.getCmp('approvalGrid').getSelectionModel().getSelected();
                    selectItem.data.operatorDtl = selectItem.data.operator;
                    selectItem.data.operateDepDtl = selectItem.data.operatorDep;
                    selectItem.data.operateTimeDtl = selectItem.data.operateTime;
                    if(selectItem.data.operateType==11){//审核历史的操作类型   11代表审核
                        selectItem.data.operateResultDtl = selectItem.data.operateResult==1?"通过":"不通过";
                    }else if(selectItem.data.operateType==12){//12代表执行
                        selectItem.data.operateResultDtl = selectItem.data.operateResult==1?"成功":"不成功";
                    }else{
                        selectItem.data.operateResultDtl = selectItem.data.operateResult;
                    }
//                    selectItem.data.operateTypeDtl = selectItem.data.operateType;
                    selectItem.data.operateTypeDtl = detailProcessingTypeMap.get(selectItem.data.operateType);//selectItem.data.operateTypeName;
                    selectItem.data.operateContentDtl = selectItem.data.operateContent;
                    selectItem.data.remarksDtl = selectItem.data.remarks;
                    Ext.getCmp('approvalFormDtl').getForm().loadRecord(selectItem);
                 }             
             }
        });

        var column = new Ext.grid.ColumnModel(
                [
//                 cm,         
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
//                 {header:'操作类型',dataIndex:'operateTypeName',align:'center',width:720*0.2},
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
            width : testCardOrderDetailWidth*4+20+20+10,//approvalGridWidth,
//            title : '审批历史',
            cm : column,//列定义
            pageSize : 99,//页纪录数
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
        this.format = function(data){
            var names = data.operator;
            var ids = data.createdBy;
            var types =data.processingObjType;
            var text = '';
            if(names && ids && types){
                if(typeof names != "String"){
                    names = names.toString();
                }
                if(typeof ids != "String"){
                    ids = ids.toString();
                }
                if(typeof types != "String"){
                    types = types.toString();
                }
                var nameArr = names.split(",");
                var idArr = ids.split(",");
                var typeArr = types.split(",");
                for(var i=0;i<nameArr.length;i++){
                    text += '<a href=javascript:manager.initProcessingDtlWin('+idArr[i]+','+typeArr[i]+')>'+nameArr[i]+'</a>&nbsp;';
                }
            }
            return text;
    }
        
        this.initProcessingDtlWin = function(participantID,participantType){
            var panel = this.initProcessingDtlPn();
            var formWin = new Ext.Window({
                id:'processingDtlWin',
                title: '处理人详情',
                closable:true,
                modal:true,
                width: 610,
                height: 300,
                layout:'anchor',
                plain:true,
                items: [panel],
                buttonAlign:'center',
                buttons: [{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('processingDtlWin').close();
                    }
                }]
            });
            formWin.show();
            this.getProcessingObjData(participantID, participantType);
        }
        this.getProcessingObjData = function(participantID,participantType){
            var param = {
                    participantID:participantID,
                    participantType:participantType
            }
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardCommonAction.json?method=getProcessingObjData',
                    param,
                    function(response){
                        if (response && response.msg == "success") {                        
                            Ext.getCmp('processingDtlPn').getForm().loadRecord(response);
                            if(participantType =="3"){
                                Ext.getCmp('processingObjLabel').update("处理部门");
                                Ext.getCmp('processingOrgLabel').update("部门传真");
                            }
                            Ext.getCmp('processingDtlPn').getForm().items.eachKey(function(key,item){
                                item.setReadOnly(true);
                            });
                        }
                    });
        }
        this.initProcessingDtlPn = function(){
            var approvalPn = new Ext.FormPanel({
                id:'processingDtlPn',
                title : '处理人详情',
                frame : true,
                layoutConfig : {
                    columns : 2 * 2
                },
                layout : 'table',
                bodyStyle : 'padding:20px 10px 0px 10px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',//标签的对齐方式
                    hideLabel : true,
                    width : 140,//最小是120，最大190
                    height : 30
                },
                items: [{
                    colspan : 1,
                    items : {
                        id : 'processingObjLabel',
                        xtype : 'ZTESOFT.label',
                        html : '处理人'
                    }
                },{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'processingObj',
                        id: 'processingObj',
                        anchor : '100%'
                    }
                },{
                    colspan : 1,
                    items : {
                        id : 'processingOrgLabel',
                        xtype : 'ZTESOFT.label',
                        html : '所属部门'
                    }
                },{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'processingOrg',
                        id: 'processingOrg',
                        anchor : '100%'
                    }
                },{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '电话号码'
                    }
                },{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'telephoneNumber',
                        id: 'telephoneNumber',
                        anchor : '100%'
                    }
                },{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '邮箱'
                    }
                },{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'email',
                        id: 'email',
                        anchor : '100%'
                    }
                }]
            });
            return approvalPn;
        }


        this.initNextDealMan = function(actionFlag){
        	
        	TreeOper.singleUserTree({
                onComplete: function(id,text,data){
                	var tm = new Object();
                	tm.id = '1';
                	tm.text = '1';
                	var tempOb = new Object();
                	tempOb.targetPerson = data;//data;//tm;
                	manager.oper(actionFlag,tempOb);
//                    Ext.getCmp(val+"Id").setValue(id);
//                    Ext.getCmp(val).setValue(text);
//                    
//                    var aaqq = Ext.getCmp("selectedNextMan").getRootNode();
//                        if(aaqq.childNodes.length!=1){
//                            Ext.Msg.alert("提示","请选择一个处理人！");
//                            return;
//                        }
//                        var ob = new Object();
//                        ob.targetPerson = aaqq.childNodes[0];
////                        ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
//                        manager.oper(actionFlag,data);
                }
            });return;
            
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
                height: 320,
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
                                    id:'1',//'tiger',
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
                        var ob = new Object();
                        ob.targetPerson = aaqq.childNodes[0];
//                        ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
                        manager.oper(actionFlag,ob);
//                        nextDealManWin.close();
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
        
        this.oper = function(actionFlag,obj){
        	
            var ob = new Object();
            //存放部门地市
            	
            		 if(session.logonAccount.cityCompanyId){
                		 ob.storageCityId = session.logonAccount.cityCompanyId;
                		 ob.storageCityName = session.logonAccount.cityCompanyName;
                	 }else{
                		 ob.storageCityId = "null";
                		 ob.storageCityName = "null"; 
                	 }
                 ob.cardSheetId = Ext.getCmp("cardSheetId").getValue();
                 ob.sheetTheme = Ext.getCmp("sheetTheme").getValue();
                 ob.lendDepartmentId = session.logonAccount.cloudOrgId;//借出单位
                 ob.sheetType = Ext.getCmp("sheetType").getValue();
                 ob.expectedReturnTime = Ext.getCmp("expectedReturnTime").getValue();
                 ob.activityInsId = "1";//$("input[name='cardSheetId']").val();
                 ob.processInsId = "1";//$("input[name='cardSheetId']").val();
                 ob.operatorId = session.logonAccount.cloudUserId;//$("input[name='operatorId']").val();
                 ob.operateDepartmentId = session.logonAccount.cloudOrgId;//$("input[name='cardSheetId']").val();
//                 if(actionFlag==3){
//                 ob.operatorName = "李志敏";//$("input[name='operatorId']").val();
//                 ob.operateDepartmentName = "网络公司山东省分公司网络管理中心";//$("input[name='cardSheetId']").val();
//                 }else{
//                 ob.operatorName = "郭继磊";//$("input[name='operatorId']").val();
//                 ob.operateDepartmentName = "网络公司山东省分公司网络管理中心";//$("input[name='cardSheetId']").val();
//                 }
                 ob.operatorName = session.logonAccount.userEmpName;//'黄寿琴'$("input[name='operatorId']").val();
                 ob.operateDepartmentName = session.logonAccount.userDeptName;//"网络公司福建省分公司网络管理中心";
                 ob.operateType = actionFlag;//actionFlag 0为查看详情  3为审核  2为执行 4为接收 5为报废的接收人员审核
                 ob.dealState = "1";//$("input[name='cardSheetId']").val();
                 ob.dealAction = "1";
                 ob.createdBy = session.logonAccount.cloudUserId;//$("input[name='cardSheetId']").val();
                 ob.lastUpdatedBy = session.logonAccount.cloudUserId;//$("input[name='cardSheetId']").val();
                 ob.recordVersion = "1";//$("input[name='cardSheetId']").val();
                 ob.deletedFlag = "0";//$("input[name='cardSheetId']").val();
                 ob.marketingAreaId = session.logonAccount.marketingAreaId;//$("input[name='cardSheetId']").val();
                 ob.maintenanceAreaId = session.logonAccount.maintenanceAreaId;//$("input[name='cardSheetId']").val();
                 ob.orgId = session.logonAccount.cloudOrgId;//$("input[name='cardSheetId']").val();
                 ob.processingOrgId = session.logonAccount.cloudOrgId;//$("input[name='cardSheetId']").val();
                 ob.approveOpinion = Ext.getCmp("approveOpinionEdit").getValue();
                 ob.auditResult = Ext.getCmp("auditResult").getValue().inputValue;//审核结果
                 ob.timeOut = "0";
                 ob.operatorContactInfo = "1";
                 
                 if(Ext.getCmp("sheetType").getValue()=="5"&&actionFlag==3&&Ext.getCmp("auditResult").getValue().inputValue==1){//报废流程 第一审核环节 审核通过
                 	ob.goToAcceptAudit = Ext.getCmp("attribute1").getValue();
                 }
                 
                 if((Ext.getCmp("sheetType").getValue()=="1"||Ext.getCmp("sheetType").getValue()=="2"||Ext.getCmp("sheetType").getValue()=="4")&&actionFlag==4){//调拨、移交、归还流程 接收环节 保存勾选的已接收的卡
                    var testCL = Ext.getCmp("testCardList").getSelectionModel().getSelections();
                    var testCLAcceptL = new Array();
                    for(var i=0;i<testCL.length;i++){
                        testCLAcceptL.push(testCL[i].data);
                    }
                    ob.testCLAcceptL = Ext.encode(testCLAcceptL);
                 }
                 
                 if((Ext.getCmp("sheetType").getValue()=="3")&&actionFlag==4){//借用流程 接收环节 保存勾选的已接收的卡
                    var testCL = Ext.getCmp("testCardLendList").getSelectionModel().getSelections();
                    var testCLAcceptL = new Array();
                    for(var i=0;i<testCL.length;i++){
                        testCLAcceptL.push(testCL[i].data);
                    }
                    ob.testCLAcceptL = Ext.encode(testCLAcceptL);
                 }
                 
                 if(obj.targetPerson!=null){
                 	var targetPerson = obj.targetPerson;
                    ob.targetPerson = targetPerson.id;//targetPerson.id;
                    ob.targetPersonName = targetPerson.text;//targetPerson.text;
                    ob.targetPersonType = targetPerson.type;//targetPerson.text;
                 }
                 
                 ob.loginId = urlLoginId;//targetPerson.id;
                 ob.loginName = urlLoginId;//targetPerson.text;
                 ob.processInstanceId = processInstID;
                 ob.activityInstanceId = activityInstID;
                 ob.taskInstanceId = taskInstID;
//                 ob.nextActivityInsId = obj.nextActivityInsId;
                 ob.targetType = "1";
                 ob.checkListId = checkListId;
                 
                 var st = Ext.getCmp('testCardLendList').getStore();
                        var le = st.getCount();
                          var sheetCardList = new Array();
                        if(processModelId=="com.unicom.ucloud.eom.e19.lend"&&actionFlag==2&&Ext.getCmp("auditResult").getValue().inputValue==1){//借用流程 执行环节 执行成功
                        	if(Ext.getCmp('testCardLendList').getStore().data.items.length==0){
                                Ext.Msg.alert("提示","请选择测试卡借用列表！");
                                return;
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
                                 sheetCard.cardSheetId = Ext.getCmp('cardSheetId').getValue();
                                 sheetCardList.push(sheetCard);
                             }
                             
                         }
                             ob.testCardLendList = Ext.encode(sheetCardList);
                             ob.lendDepartmentName = session.logonAccount.userDeptName;//借用人单位名称
                             ob.lenderName = session.logonAccount.userEmpName;//借用人名称
                 
                 ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderAuditAction.json?method=addCardOrderAudit',
                                    ob,
                                    function(response){
                                    	
                                    	if(response.msg!=null&&response.msg=="warn"){
                                           Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被选择！");
                                           return;
                                        }
                                    	
                                        if(actionFlag==2)Ext.Msg.alert("提示","执行成功！",function(){
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        });
                                        if(actionFlag==3||actionFlag==5||actionFlag==7)Ext.Msg.alert("提示","审核成功！",function(){
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        });
                                        if(actionFlag==4)Ext.Msg.alert("提示","确认成功！",function(){//接收环节
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        }); 
                                        if(actionFlag==6)Ext.Msg.alert("提示","确认成功！",function(){//确认环节
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        }); 
                                        
                                        if(Ext.getCmp("nextDealMan")!=null){
                                            Ext.getCmp("nextDealMan").close();
                                        }
                                        Ext.getCmp("detailWin").close();
                                        if(Ext.getCmp('undoTaskGrid')!=null){
                                            var qryParam = myUndoTaskWholeParam;
                                            myUndoTask.qryListGrid(qryParam);
                                        }
                                    }
                            );
        }
        
        this.claimTask = function(){
        	var o = new Object();
            o.taskInstanceId = taskInstID;//Ext.getCmp("taskInstanceId").getValue();
            o.processInstanceId = processInstID ;
            o.activityInstanceId = activityInstID ;
            o.loginId = session.logonAccount.accountId;
            o.loginName = session.logonAccount.userEmpName;
            o.createdBy = session.logonAccount.cloudUserId;
            o.lastUpdatedBy = session.logonAccount.cloudUserId;
            o.cardSheetId = Ext.getCmp("cardSheetId").getValue();
            o.sheetTheme = Ext.getCmp("sheetTheme").getValue();
            o.operatorName = session.logonAccount.userEmpName;
            o.processingOrgId = session.logonAccount.cloudOrgId;
            o.operateDepartmentName = session.logonAccount.userDeptName;
            ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderAuditAction.json?method=addClaimTask',
                                    o,
                                    function(response){
                                    	if(response.msg!=null&&response.msg=="false"){
                                    	   Ext.Msg.alert("提示","该工单已进行过签收！");
                                    	   return;
                                    	}
                                        Ext.Msg.alert("提示","签收成功！");
//                                        Ext.getCmp("detailWin").close();
                                        if(Ext.getCmp('undoTaskGrid')!=null){
                                            var qryParam = myUndoTaskWholeParam;
                                            myUndoTask.qryListGrid(qryParam);
                                        }
                                        
                                        myUndoTaskCurrentState = 0;
                                        
                                        new DetailWin().initBtnVisible(new Object(),true);
                                        Ext.getCmp('myUndoTaskSign').hide();
                                        
//                                        if(Ext.getCmp('myUndoTaskSign')!=null){
//                                        	Ext.getCmp('myUndoTaskSign').hide();
//                                            
//                                        }
//                                        if(Ext.getCmp('testCardOrderDetailDispatchTask')!=null){
//                                            Ext.getCmp('testCardOrderDetailDispatchTask').show();
//                                            
//                                        }
//                                        if(Ext.getCmp('counterSign')!=null&&(operationTypeIdGlo==3||operationTypeIdGlo==5)){//3为审核 5为审核
//                                            Ext.getCmp('counterSign').show();
//                                            
//                                        }
//                                        if(Ext.getCmp('returnBut')!=null){
//                                            Ext.getCmp('returnBut').show();
//                                            
//                                        }
//                                        if(Ext.getCmp('dispatchTask')!=null&&(operationTypeIdGlo==2||operationTypeIdGlo=="dispatchCommit")){//2为执行 dispatchCommit为转派回单
//                                            Ext.getCmp('dispatchTask').show();
//                                            
//                                        }
                                        
                                    }
                            );
        }
        
        this.dispatchTask = function(){
        	
        	var formWin = new Ext.Window({
                id:'dispatchTaskWin',
                title: "转办",
                closable:true,
                width: testCardOrderDetailWidth*4+40,//body_width*0.65,
                height: 250,//body_height*0.7,
                layout: 'border',
                plain:true,
                modal:true,
                items: [new Ext.FormPanel({
                id:'dispatchTaskPanel',
                region: 'center',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
//                title:'工单信息',
                width:testCardOrderDetailWidth*4,//Ext.getBody().getSize(),
//                height:400,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
//                labelWidth: 80,
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
                            width : testCardOrderDetailWidth,//最小是120，最大190
                            height : 30
                        },
                items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>转办对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderDetailWidth*3,
                                    items : [
                                        {
                                        xtype:'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id: 'dispatchTaskObjName',
                                        name: 'dispatchTaskObjName',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
                                        blankText:'转办对象不能为空!',
                                        allowBlank: false,
                                        valueFile : 'dispatchTaskObjId',
//                                        editable : false ,
                                        readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                                var inputName = "dispatchTaskObjName,dispatchTaskObjId,dispatchTaskObjAccountId";
                                                var requestData = "text,id,accountId";
                                                var isUseful = [1,0,0];
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
                                                
                                                var searchObject = {
                                                        fuzzySearchType : 1//前台（0）或后台（1）查询，默认为0
                                                };
                                                var _cloudUserId = session.logonAccount.cloudUserId;
                                                var tree = new DeepTreeObj(inputName,requestData,"dispatchTaskObjTree",_orgId,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType,searchObject,null,_cloudUserId);
                                                
                                                tree.showTree(deeptreeUrl);
                                        }
                                    },{
                                        xtype:'hidden',
                                        name: 'dispatchTaskObjId',
                                        id: 'dispatchTaskObjId'
                                      },{
                                        xtype:'hidden',
                                        name: 'dispatchTaskObjAccountId',
                                        id: 'dispatchTaskObjAccountId'
                                      }
                                    ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '转办说明'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderDetailWidth*3,
                                    height:50,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '转办说明',
                                            name: 'dispatchTaskRemarks',
                                            id: 'dispatchTaskRemarks',
                                            maxLength:200,
                                            height : 50,
                                            maxLengthText:'转办说明不能超过200个字！',
                                            anchor:'100%'
                                        }
                                    ]
                                }
                ]
                
                })],
                buttonAlign:'center',
                buttons: [
                {
                    text: '转办',
                    xtype: 'ZTESOFT.Button',
                    aa:'bar',
                    onClick:function(){
                    	if(Ext.getCmp('dispatchTaskObjName').getValue()==""){
                    	   Ext.Msg.alert("提示","请选择转办对象！");
                    	   return;
                    	}
                    	if(!Ext.getCmp('dispatchTaskPanel').getForm().isValid()){
                           return;
                        }
          var o = new Object();
          if(Ext.getCmp('dispatchTaskObjAccountId').getValue()!=""){//说明是人员
          	if(Ext.getCmp('dispatchTaskObjAccountId').getValue()==session.logonAccount.accountId){
          	 Ext.Msg.alert("提示","不能转办给自己！");
          	 return;
          	}
                                                                        o.targetPersonType = 1;
                                                                        o.targetPerson = Ext.getCmp('dispatchTaskObjAccountId').getValue();
                                                                        
                                                                        
//                                                                        Ext.getCmp("auditResultExecuteDepartmentId").setValue(id);
//                                                                        Ext.getCmp("auditResultExecuteDepartment").setValue(text);
//                                                                        Ext.getCmp("auditResultExecutePersonAccountId").setValue("");
//                                                                        Ext.getCmp("auditResultExecutePersonId").setValue("");
                                                //                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
                                                                    }else{//说明是人员
                                                                        
                                                                        o.targetPerson = Ext.getCmp('dispatchTaskObjId').getValue();
                                                                        o.targetPersonType = 3;
                                                                        
//                                                                        Ext.getCmp("auditResultExecutePersonId").setValue(id);
//                                                                        Ext.getCmp("auditResultExecutePersonAccountId").setValue(data.accountId);
//                                                                        Ext.getCmp("auditResultExecuteDepartmentId").setValue("");
//                                                                        Ext.getCmp("auditResultExecuteDepartment").setValue(text);
                                                //                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
                                                                    }
                                                                    
                                                                    o.taskInstanceId = taskInstID;//alert(o.taskInstanceId);//Ext.getCmp("taskInstanceId").getValue();
            o.processInstanceId = processInstID ;
            o.activityInstanceId = activityInstID ;
            o.loginId = session.logonAccount.accountId;
            o.loginName = session.logonAccount.userEmpName;
            o.createdBy = session.logonAccount.cloudUserId;
            o.lastUpdatedBy = session.logonAccount.cloudUserId;
            o.cardSheetId = Ext.getCmp("cardSheetId").getValue();
            o.sheetTheme = Ext.getCmp("sheetTheme").getValue();
            o.operatorName = session.logonAccount.userEmpName;
            o.processingOrgId = session.logonAccount.cloudOrgId;
            o.operateDepartmentName = session.logonAccount.userDeptName;
            o.processingDesc = Ext.getCmp('dispatchTaskRemarks').getValue();
            ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderAuditAction.json?method=addDispatchTask',
                                    o,
                                    function(response){
                                        Ext.Msg.alert("提示","转办成功！");
                                        Ext.getCmp('dispatchTaskWin').close();
                                        Ext.getCmp("detailWin").close();
                                        if(Ext.getCmp('undoTaskGrid')!=null){
                                            var qryParam = myUndoTaskWholeParam;
                                            myUndoTask.qryListGrid(qryParam);
                                        }
                                    }
                            );
                            
                    }
                },
                    {
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    aa:'bar',
                    id:'close',
                    onClick:function(){
                        Ext.getCmp('dispatchTaskWin').close();
                    }
                }
                ]
            });
             formWin.show();
        	

        	
//        	var o = new Object();
        	
//        	TreeOper.orgAndUserByCon({
//                                                                parentId:'1',
//                                                                parentName:'中国联通',
//                                                                singleSelect:true,
//                                                                onComplete: function(id,text,data){
//                                                                    if(data.leaf==0){//说明是组织
//                                                                    	
//                                                                    	o.targetPerson = id;
//                                                                    	o.targetPersonType = 3;
//                                                                    	
////                                                                        Ext.getCmp("auditResultExecuteDepartmentId").setValue(id);
////                                                                        Ext.getCmp("auditResultExecuteDepartment").setValue(text);
////                                                                        Ext.getCmp("auditResultExecutePersonAccountId").setValue("");
////                                                                        Ext.getCmp("auditResultExecutePersonId").setValue("");
//                                                //                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                                                                    }else{//说明是人员
//                                                                    	
//                                                                    	o.targetPersonType = 1;
//                                                                    	o.targetPerson = data.accountId;
//                                                                    	
////                                                                        Ext.getCmp("auditResultExecutePersonId").setValue(id);
////                                                                        Ext.getCmp("auditResultExecutePersonAccountId").setValue(data.accountId);
////                                                                        Ext.getCmp("auditResultExecuteDepartmentId").setValue("");
////                                                                        Ext.getCmp("auditResultExecuteDepartment").setValue(text);
//                                                //                        Ext.getCmp(val+"IsLeaf").setValue(data.leaf);
//                                                                    }
//                                                                    
//                                                                    o.taskInstanceId = taskInstID;//alert(o.taskInstanceId);//Ext.getCmp("taskInstanceId").getValue();
//            o.processInstanceId = processInstID ;
//            o.activityInstanceId = activityInstID ;
//            o.loginId = session.logonAccount.accountId;
//            o.loginName = session.logonAccount.userEmpName;
//            o.createdBy = session.logonAccount.cloudUserId;
//            o.lastUpdatedBy = session.logonAccount.cloudUserId;
//            o.cardSheetId = Ext.getCmp("cardSheetId").getValue();
//            o.sheetTheme = Ext.getCmp("sheetTheme").getValue();
//            o.operatorName = session.logonAccount.userEmpName;
//            o.processingOrgId = session.logonAccount.cloudOrgId;
//            o.operateDepartmentName = session.logonAccount.userDeptName;
//            ZTESOFT.invokeAction(
//                                    PATH+'/e19/testCardOrderAuditAction.json?method=addDispatchTask',
//                                    o,
//                                    function(response){
//                                        Ext.Msg.alert("提示","转派成功！");
//                                        Ext.getCmp("detailWin").close();
//                                        if(Ext.getCmp('undoTaskGrid')!=null){
//                                            var qryParam = myUndoTaskWholeParam;
//                                            myUndoTask.qryListGrid(qryParam);
//                                        }
//                                    }
//                            );
//                                                                }
//                                                            });
        	
            
            
            
        }
        
        this.initWindowMyUndoTaskUnify = function(recordData,flag){
            var attNums = new Array();
            var attNames = new Array();
            var attIds = new Array();
            
            var tmpO = new Object();
            tmpO.start = 0;
            tmpO.limit = 10;
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
            
            testCardOrderDetailFileList.attNums = attNums;
            testCardOrderDetailFileList.attNames = attNames;
            testCardOrderDetailFileList.attIds = attIds;
            
//          ZTESOFT.invokeAction(
//                    PATH+'/e19/testCardCommonAction.json?method=qryAttachment',
//                    o,
//                    function(response){
//                        var rows = response.rows;
//                        var li = rows.length;
//                        var filesName = "";
//                        for(var i=0;i<li;i++){
////                            filesName = filesName+"<a href=\"javascript:new DetailWin().download2(\'"+rows[i].attachmentId+"\',\'"+rows[i].attachmentName+"\')\">["+rows[i].attachmentName+"]</a>";
////                            filesName = '<a href="javascript:new DetailWin().download()">'+rows[i].attachmentName+'</a>';
//                          filesName = '<a href="javascript:alert(2);">'+rows[i].attachmentName+'</a>';
////                           Ext.getCmp('valueListGrid').getStore().add(new Ext.data.Record(rows[i]));
//                        }
//                        
////                        Ext.DomQuery.selectNode('label[for=filesName]').html = filesName;
//                        Ext.getCmp('filesName').setValue('html',filesName);
////                        Ext.getCmp('filesTR1').doLayout();
//                        
//                    }
//            );
            
            if(recordData.woStatusEnumId!=null){
                testCardOrderDetailWoStatusEnumId = recordData.woStatusEnumId;
            }
            
        if(flag==0){
            testOrderCheckFlag = "detail";
        }    
        
            var tabPanel = this.initTabPanel();
            
//            if(recordData.data.currentNode == '1'){
//                this.winTitle = '申请';
//            }else if(recordData.data.currentNode == '2'){
//                this.winTitle = '执行';
//            }else if(recordData.data.currentNode == '3'){
//                this.winTitle = '审核';
//            }else if(recordData.data.currentNode == '4'){
//                this.winTitle = '接收';
//            }else{
//                this.winTitle = '详情';
//            }
            this.initUpdate(recordData);
//            var myUndoTaskCurrentStateTmp = 0;
//            if(myUndoTaskCurrentState=="undefined"){
//              
//            }else{
//                myUndoTaskCurrentStateTmp = myUndoTaskCurrentState;
//            }
            var commitButtonName = "提交";
            if(flag==3){
            	commitButtonName = "审核";
            }
            if(flag==2){
            	commitButtonName = "执行";
            }
            if(flag==4){
            //	commitButtonName = "接收";
            	commitButtonName = "确认";
            }
            if(flag==5){
            	commitButtonName = "审核";
            }
            if(flag==6){
                commitButtonName = "确认";
            }
            if(flag==7){
                commitButtonName = "审核";
            }
            
            var formWin = new Ext.Panel({
                id:'detailWinMyUndoTaskUnify',
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
//                modal:true,
                items: [tabPanel],
                buttonAlign:'center',
                buttons: [
                        
                            
                   {
                    text: '签收',
                    xtype: 'ZTESOFT.Button',
                    id:"myUndoTaskSign",
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?true:(myUndoTaskCurrentState==4?false:true),
                    hidden:true,
                    aa:'bar',
                    onClick:function(){
                        manager.claimTask();
                    }
                },
                {
                    text: '转办',
                    xtype: 'ZTESOFT.Button',
                    id:"testCardOrderDetailDispatchTask",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                        manager.dispatchTask();
                    }
                },
                {
                    text: '转派',
                    xtype: 'ZTESOFT.Button',
                    id:"dispatchTask",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                    	var rowData = new Object();
                        rowData.jobId = recordData.cardSheetId;
                        rowData.processInstID = processInstID;
                        rowData.activityInstID = activityInstID;
                        rowData.taskInstID = taskInstID;
                        tsOper.initWindow(rowData);
                    }
                },
                {
                    text: '转派回单',
                    xtype: 'ZTESOFT.Button',
                    id:"dispatchTaskCommit",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                        if (!Ext.getCmp('dispatchCommitForm').getForm().isValid()) {
                            return;
                        }
                        var param = Ext.getCmp('dispatchCommitForm').getForm().getValues();
                            param.orgId = session.logonAccount.cloudOrgId;
                            param.orgName = session.logonAccount.userDeptName;
                            param.shardingId = session.logonAccount.shardingId;
                            param.lastUpdatedBy = session.logonAccount.cloudUserId;
                            param.createdBy = session.logonAccount.cloudUserId;
                            param.createdByName = session.logonAccount.userEmpName;
                            param.processInstID = processInstID;
                            param.activityInstID = activityInstID;
                            param.taskInstID = taskInstID;
                            param.woInfoId = recordData.cardSheetId;
                            param.accountId = session.logonAccount.accountId;
                            
                            var attachmentInfo = getNewUplValue('replyAttachment');
                            param.fileStr = Ext.encode(attachmentInfo);
                            
                            var fileList = getNewUplValue('replyAttachment');
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
                             
                             fileList[i].activityInstanceId = activityInstID;
                             fileList[i].taskInstanceId = taskInstID;
                         }
                         param.fileList = Ext.encode(fileList);
                            
                            var url = PATH+'/e19/testCardCommonAction.json?method=saveTurnSend';
                           ZTESOFT.invokeAction(url, param, function(response) {
                               if (response.msg = 'success') {
                                   Ext.Msg.alert('操作提示', '操作成功！',function(){
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        });
                               } else {
                                   Ext.Msg.alert('操作提示', '操作失败，请检查！');
                               }
                               Ext.getCmp('detailWin').close();
                               var qryParam = myUndoTaskWholeParam;
                                myUndoTask.qryListGrid(qryParam);
                           });
                    }
                },
                {
                    text: '会签回单',
                    xtype: 'ZTESOFT.Button',
                    id:"sign",
                    aa:'bar',
//                    hidden:operationTypeIdGlo=="countersign"?false:true,//myUndoTaskCurrentState=4说明此单需要签收，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                    	if(Ext.getCmp("approveOpinionEdit").getValue()==""){
                               Ext.Msg.alert("提示","请填写会签意见！");
                           return;
                        }
                        var param = new Object();
                        param.orgId = session.logonAccount.cloudOrgId;
                        param.orgName = session.logonAccount.userDeptName;
                        param.shardingId = session.logonAccount.shardingId;
                        param.lastUpdatedBy = session.logonAccount.cloudUserId;
                        param.createdBy = session.logonAccount.cloudUserId;
                        param.createdByName = session.logonAccount.userEmpName;
                        param.processInstID = processInstID;
                        param.activityInstID = activityInstID;
                        param.taskInstID = taskInstID;
                        param.woInfoId = recordData.cardSheetId;
                        
                        param.auditOpinion = Ext.getCmp("approveOpinionEdit").getValue();
                        param.isPass = Ext.getCmp("auditResult").getValue().inputValue;
                        
                        param.accountId = session.logonAccount.accountId;
                        
                        ZTESOFT.invokeAction(PATH+'/e19/testCardCommonAction.json?method=addSign', param, function(response) {
                           if (response.msg = 'success') {
                               Ext.Msg.alert('操作提示', '会签成功！',function(){
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        });
                           } else {
                               Ext.Msg.alert('操作提示', '操作失败，请检查！');
                           }
                           Ext.getCmp('detailWin').close();
                           var qryParam = myUndoTaskWholeParam;
                           myUndoTask.qryListGrid(qryParam);
                       });
                    }
                },
                {
                    text: '会签',
                    xtype: 'ZTESOFT.Button',
                    id:"counterSign",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){                        
                        new DetailWin().initSignWindow(recordData);
                    }
                },
                {
                    text: '上级审核',
                    xtype: 'ZTESOFT.Button',
                    id:"higherAudit",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){                        
                        new DetailWin().initHigherAuditWindow(recordData,flag);
                    }
                },
                    {
                    text: commitButtonName,
                    xtype: 'ZTESOFT.Button',
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，提交按钮隐藏
                    hidden:true,
                    id:'returnBut',
                    onClick:function(){
                        
                        if(new DetailWin().isNeededSelectNextMan(flag,processModelId)&&(flag==3||flag==7)&&Ext.getCmp("auditResult").getValue().inputValue!=0){
                           if(Ext.getCmp("auditResultExecuteDepartment").getValue()==""){
                               Ext.Msg.alert("提示","请选择执行单位！");
                               return;
                           }
                        }
                        
                        if(Ext.getCmp("approveOpinionEdit").getValue()==""){
                            if(flag==3){
                               Ext.Msg.alert("提示","请填写审核意见！");
                            }
                            if(flag==2){
                               Ext.Msg.alert("提示","请填写执行意见！");
                            }
                            if(flag==4){
                               Ext.Msg.alert("提示","请填写接收意见！");
                            }
                            if(flag==5){
                               Ext.Msg.alert("提示","请填写审核意见！");
                            }
                            if(flag==6){
                               Ext.Msg.alert("提示","请填写意见！");
                            }
                           return;
                        }
                        
                        
                        var acceptedNumber = "";
                        if((Ext.getCmp("sheetType").getValue()=="3")&&flag==4){//借用流程 接收环节 保存勾选的已接收的卡
                            var testCL = Ext.getCmp("testCardLendList").getSelectionModel().getSelections();
                            
                            if(testCL.length!=0){
                                acceptedNumber = "已经接收到编号为：";
                                for(var i=0;i<testCL.length;i++){
                                    acceptedNumber = acceptedNumber + "["+testCL[i].data.numberTmp+"]";
                                }
                                acceptedNumber = acceptedNumber+"的测试卡？";
                            }else{
                                acceptedNumber = "确定没有接收的测试卡？（在测试卡列表内勾选测试卡的复选框表示已接收）";
                            }
                         }
                         
                         if((Ext.getCmp("sheetType").getValue()=="1"||Ext.getCmp("sheetType").getValue()=="2")&&flag==4){//移交流程 调拨流程 接收环节 保存勾选的已接收的卡
                            var testCL = Ext.getCmp("testCardList").getSelectionModel().getSelections();
                            
                            if(testCL.length!=0){
                                acceptedNumber = "已经接收到编号为：";
                                for(var i=0;i<testCL.length;i++){
                                    acceptedNumber = acceptedNumber + "["+testCL[i].data.numberTmp+"]";
                                }
                                acceptedNumber = acceptedNumber+"的测试卡？";
                            }else{
                                acceptedNumber = "确定没有接收的测试卡？（在测试卡列表内勾选测试卡的复选框表示已接收）";
                            }
                         }
                         
                         if(acceptedNumber!=""){
                                    
                                    if(!confirm(acceptedNumber)){
                                    
                                        return ;
                                    }
                             }
                         
                        if(new DetailWin().isNeededSelectNextMan(flag,processModelId)&&(flag==3||flag==7)&&Ext.getCmp("auditResult").getValue().inputValue!=0){//判断是否需要选择下一步执行人,审核的时候选了不通过也不需要下一步
//                            manager.initNextDealMan(flag);
                            var tm = new Object();
                            if(Ext.getCmp("auditResultExecutePersonAccountId").getValue()==""){//执行人为空则取执行单位
                               tm.text = Ext.getCmp("auditResultExecuteDepartment").getValue();
                               tm.id = Ext.getCmp("auditResultExecuteDepartmentId").getValue();
                               tm.type = 3;//部门
                            }else{
                               tm.id = Ext.getCmp("auditResultExecutePersonAccountId").getValue();
                               tm.text = Ext.getCmp("auditResultExecuteDepartment").getValue();
                               tm.type = 1;//用户
                            }
                    var tempOb = new Object();
                    tempOb.targetPerson = tm;
                            manager.oper(flag,tempOb);
                        }else{
//                          var targetPerson = new Object();
//                          targetPerson.id = 1;
//                          targetPerson.text = 1;
                            var ob = new Object();
//                            ob.targetPerson = targetPerson;
                            manager.oper(flag,ob);
                        }
                         //flag 0为查看详情  3为审核  2为执行 4为接收 5为报废的接收人员审核
                    }
                },
                    {
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    aa:'bar',
                    id:'close',
                    onClick:function(){
//                        Ext.getCmp('detailWin').close();
                    	window.close();
                    }
                }
                ]
            });
//             formWin.show();
            
            this.initBtnVisible(new Object(),true);
             Ext.getCmp('testCardLendPanel').hide();
//             this.setHideOrShow(flag,Ext.getCmp("sheetType").getValue());
             return formWin;
        }
        
        this.initHigherAuditWindow = function(recordData,flag){
                        var rowData = new Object();
                        rowData.jobId = recordData.cardSheetId;
                        rowData.processInstID = processInstID;
                        rowData.activityInstID = activityInstID;
                        rowData.taskInstID = taskInstID;
                        rowData.orderType = cardOperationTypeIdGlo;
                        supAuditKpiOper.initWindow(rowData,flag);
        }
        
        this.initSignWindow = function(recordData){
                        var rowData = new Object();
                        rowData.jobId = recordData.cardSheetId;
                        rowData.processInstID = processInstID;
                        rowData.activityInstID = activityInstID;
                        rowData.taskInstID = taskInstID;
                        rowData.orderType = cardOperationTypeIdGlo;
                        counterSign.initWindow(rowData);
        }
        
        this.initBtnVisible = function(rowData,flag){
        	if(taskInstID==""){//详情，只显示关闭按钮
        	   return;
        	}
            var param = {
                    taskInstID : taskInstID,
                    accountId : session.logonAccount.accountId,
                    accountName : session.logonAccount.userEmpName
            };
            var url = PATH+'/e19/testCardCommonAction.json?method=getExtendAttributes';
            var response = ZTESOFT.Synchronize(url,param);
            if(response && response.length && response.length > 0){
            	
            	if(typeof(myUndoTaskCurrentState)!="undefined"&&myUndoTaskCurrentState==4&&testCardOrderDetailIsUnify==0){//myUndoTaskCurrentState为4表明该工单必须签收才可以进行其他操作
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
        
        this.getDispatchCommitFormPn = function(){//转派回单FormPanel
       var approvalPn = new Ext.FormPanel({
           id : 'dispatchCommitForm',
           buttonAlign : 'right',
           frame : true,
           hidden:true,
           title : '转派回单信息',
           layoutConfig : {
               columns : 2 * 2
           },
           layout : 'table',
           width:testCardOrderDetailWidth*4+20+20,
           bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
           defaults : {
               border : false,
               bodyStyle : 'padding:0 0 0 0;',
               layout : 'form',
               frame : false,
               labelAlign : 'center',//标签的对齐方式


               hideLabel : true,
               width : testCardOrderDetailWidth,//最小是120，最大190
               height : 30
           },
           items : [
               {
                   colspan : 1,
                   items : {
                       xtype : 'ZTESOFT.label',
                       html : '<font color="red">*</font>回复信息'
                   }
               },
               {
                   colspan : 3,
                   width : testCardOrderDetailWidth*3,
                   height : 50,
                   items : [{
                       xtype : 'ZTESOFT.textarea',
                       hideLabel : true,
                       allowBlank : false,
                       name : 'replyMessage',
                       id : 'replyMessage',
                       anchor : '100%',
                       height : 50
                   }]
               },
               {
                   colspan : 1,
                   items : {
                       xtype : 'ZTESOFT.label',
                       text : '附件信息'
                   }
               }, {
                   colspan : 3,
                   width : testCardOrderDetailWidth*3,
                   height : 100,
                   items : [{
                       xtype : 'ZTESOFT.attachmentPanel',
                       id:'replyAttachment',
                       autoScroll:true,
                       fileTypes:null,//附件类型，默认(不填)或者值为null则为所有，即“*.*”

                       hideLabel : true,
                       anchor : '100%',
                       height : 100
                   }]
               }
           ]
       });
        return approvalPn;
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
            
            testCardOrderDetailFileList.attNums = attNums;
            testCardOrderDetailFileList.attNames = attNames;
            testCardOrderDetailFileList.attIds = attIds;
        	
//        	ZTESOFT.invokeAction(
//                    PATH+'/e19/testCardCommonAction.json?method=qryAttachment',
//                    o,
//                    function(response){
//                        var rows = response.rows;
//                        var li = rows.length;
//                        var filesName = "";
//                        for(var i=0;i<li;i++){
////                            filesName = filesName+"<a href=\"javascript:new DetailWin().download2(\'"+rows[i].attachmentId+"\',\'"+rows[i].attachmentName+"\')\">["+rows[i].attachmentName+"]</a>";
////                            filesName = '<a href="javascript:new DetailWin().download()">'+rows[i].attachmentName+'</a>';
//                          filesName = '<a href="javascript:alert(2);">'+rows[i].attachmentName+'</a>';
////                           Ext.getCmp('valueListGrid').getStore().add(new Ext.data.Record(rows[i]));
//                        }
//                        
////                        Ext.DomQuery.selectNode('label[for=filesName]').html = filesName;
//                        Ext.getCmp('filesName').setValue('html',filesName);
////                        Ext.getCmp('filesTR1').doLayout();
//                        
//                    }
//            );
        	
        	if(recordData.woStatusEnumId!=null){
                testCardOrderDetailWoStatusEnumId = recordData.woStatusEnumId;
            }
            
        if(flag==0){
            testOrderCheckFlag = "detail";
        }    
        
            var tabPanel = this.initTabPanel();
            
//            if(recordData.data.currentNode == '1'){
//                this.winTitle = '申请';
//            }else if(recordData.data.currentNode == '2'){
//                this.winTitle = '执行';
//            }else if(recordData.data.currentNode == '3'){
//                this.winTitle = '审核';
//            }else if(recordData.data.currentNode == '4'){
//                this.winTitle = '接收';
//            }else{
//                this.winTitle = '详情';
//            }
            this.initUpdate(recordData);
//            var myUndoTaskCurrentStateTmp = 0;
//            if(myUndoTaskCurrentState=="undefined"){
//            	
//            }else{
//                myUndoTaskCurrentStateTmp = myUndoTaskCurrentState;
//            }
            
            var commitButtonName = "提交";
            if(flag==3){
                commitButtonName = "审核";
            }
            if(flag==2){
                commitButtonName = "执行";
            }
            if(flag==4){
             //   commitButtonName = "接收";
            	commitButtonName = "确认";
            }
            if(flag==5){
                commitButtonName = "审核";
            }
            if(flag==6){
                commitButtonName = "确认";
            }
            if(flag==7){
                commitButtonName = "审核";
            }
            
            var formWin = new Ext.Window({
                id:'detailWin',
                title: this.winTitle,
                closable:true,
                width: 740,//body_width*0.65,
                height: 500,//body_height*0.7,
                layout: 'border',
                plain:true,
                modal:true,
                items: [tabPanel],
                buttonAlign:'center',
                buttons: [
                        
                            
                    {
                    text: '签收',
                    xtype: 'ZTESOFT.Button',
                    id:"myUndoTaskSign",
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?true:(myUndoTaskCurrentState==4?false:true),
                    hidden:true,
                    aa:'bar',
                    onClick:function(){
                        manager.claimTask();
                    }
                },
                {
                    text: '转办',
                    xtype: 'ZTESOFT.Button',
                    id:"testCardOrderDetailDispatchTask",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                        manager.dispatchTask();
                    }
                },
                {
                    text: '转派',
                    xtype: 'ZTESOFT.Button',
                    id:"dispatchTask",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                        var rowData = new Object();
                        rowData.jobId = recordData.cardSheetId;
                        rowData.processInstID = processInstID;
                        rowData.activityInstID = activityInstID;
                        rowData.taskInstID = taskInstID;
                        tsOper.initWindow(rowData);
                    }
                },
                {
                    text: '转派回单',
                    xtype: 'ZTESOFT.Button',
                    id:"dispatchTaskCommit",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                    	if (!Ext.getCmp('dispatchCommitForm').getForm().isValid()) {
                            return;
                        }
                        var param = Ext.getCmp('dispatchCommitForm').getForm().getValues();
                            param.orgId = session.logonAccount.cloudOrgId;
                            param.orgName = session.logonAccount.userDeptName;
                            param.shardingId = session.logonAccount.shardingId;
                            param.lastUpdatedBy = session.logonAccount.cloudUserId;
                            param.createdBy = session.logonAccount.cloudUserId;
                            param.createdByName = session.logonAccount.userEmpName;
                            param.processInstID = processInstID;
                            param.activityInstID = activityInstID;
                            param.taskInstID = taskInstID;
                            param.woInfoId = recordData.cardSheetId;
                            param.accountId = session.logonAccount.accountId;
                            
                            var attachmentInfo = getNewUplValue('replyAttachment');
                            param.fileStr = Ext.encode(attachmentInfo);
                            
                            var fileList = getNewUplValue('replyAttachment');
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
                             
                             fileList[i].activityInstanceId = activityInstID;
                             fileList[i].taskInstanceId = taskInstID;
                         }
                         param.fileList = Ext.encode(fileList);
                            
                            var url = PATH+'/e19/testCardCommonAction.json?method=saveTurnSend';
                           ZTESOFT.invokeAction(url, param, function(response) {
                               if (response.msg = 'success') {
                                   Ext.Msg.alert('操作提示', '操作成功！',function(){
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        });
                               } else {
                                   Ext.Msg.alert('操作提示', '操作失败，请检查！');
                               }
                               Ext.getCmp('detailWin').close();
                               var qryParam = myUndoTaskWholeParam;
                                myUndoTask.qryListGrid(qryParam);
                           });
                    }
                },
                {
                    text: '会签回单',
                    xtype: 'ZTESOFT.Button',
                    id:"sign",
                    aa:'bar',
//                    hidden:operationTypeIdGlo=="countersign"?false:true,//myUndoTaskCurrentState=4说明此单需要签收，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                    	if(Ext.getCmp("approveOpinionEdit").getValue()==""){
                               Ext.Msg.alert("提示","请填写会签意见！");
                           return;
                        }
                        var param = new Object();
                        param.orgId = session.logonAccount.cloudOrgId;
                        param.orgName = session.logonAccount.userDeptName;
                        param.shardingId = session.logonAccount.shardingId;
                        param.lastUpdatedBy = session.logonAccount.cloudUserId;
                        param.createdBy = session.logonAccount.cloudUserId;
                        param.createdByName = session.logonAccount.userEmpName;
                        param.processInstID = processInstID;
                        param.activityInstID = activityInstID;
                        param.taskInstID = taskInstID;
                        param.woInfoId = recordData.cardSheetId;
                        
                        param.auditOpinion = Ext.getCmp("approveOpinionEdit").getValue();
                        param.isPass = Ext.getCmp("auditResult").getValue().inputValue;
                        
                        param.accountId = session.logonAccount.accountId;
                        
                        ZTESOFT.invokeAction(PATH+'/e19/testCardCommonAction.json?method=addSign', param, function(response) {
                           if (response.msg = 'success') {
                               Ext.Msg.alert('操作提示', '会签成功！',function(){
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                                        });
                           } else {
                               Ext.Msg.alert('操作提示', '操作失败，请检查！');
                           }
                           Ext.getCmp('detailWin').close();
                           var qryParam = myUndoTaskWholeParam;
                           myUndoTask.qryListGrid(qryParam);
                       });
                    }
                },
                {
                    text: '会签',
                    xtype: 'ZTESOFT.Button',
                    id:"counterSign",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                    	new DetailWin().initSignWindow(recordData);
                    }
                },
                {
                    text: '上级审核',
                    xtype: 'ZTESOFT.Button',
                    id:"higherAudit",
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，转办按钮隐藏
                    hidden:true,
                    onClick:function(){
                    	new DetailWin().initHigherAuditWindow(recordData,flag);
                    }
                },
                	{
                    text: commitButtonName,
                    xtype: 'ZTESOFT.Button',
                    aa:'bar',
//                    hidden:typeof(myUndoTaskCurrentState)=="undefined"?false:(myUndoTaskCurrentState==4?true:(operationTypeIdGlo=="countersign"?true:false)),//myUndoTaskCurrentState=4说明此单需要签收，，或者operationTypeIdGlo="countersign"说明此时只能进行会签回单，提交按钮隐藏
                    hidden:true,
                    id:'returnBut',
                    onClick:function(){
                    	if(new DetailWin().isNeededSelectNextMan(flag,processModelId)&&(flag==3||flag==7)&&Ext.getCmp("auditResult").getValue().inputValue!=0){
                    	   if(Ext.getCmp("auditResultExecuteDepartment").getValue()==""){
                    	       Ext.Msg.alert("提示","请选择执行单位！");
                    	       return;
                    	   }
                    	}
                    	
                        if(Ext.getCmp("approveOpinionEdit").getValue()==""){
                            if(flag==3){
                               Ext.Msg.alert("提示","请填写审核意见！");
                            }
                            if(flag==2){
                               Ext.Msg.alert("提示","请填写执行意见！");
                            }
                            if(flag==4){
                               Ext.Msg.alert("提示","请填写接收意见！");
                            }
                            if(flag==5){
                               Ext.Msg.alert("提示","请填写审核意见！");
                            }
                            if(flag==6){
                               Ext.Msg.alert("提示","请填写意见！");
                            }
                           return;
                        }
                        
                        var acceptedNumber = "";
                        if((Ext.getCmp("sheetType").getValue()=="3")&&flag==4){//借用流程 接收环节 保存勾选的已接收的卡
                            var testCL = Ext.getCmp("testCardLendList").getSelectionModel().getSelections();
                            
                            if(testCL.length!=0){
                                acceptedNumber = "已经接收到编号为：";
                                for(var i=0;i<testCL.length;i++){
                                    acceptedNumber = acceptedNumber + "["+testCL[i].data.numberTmp+"]";
                                }
                                acceptedNumber = acceptedNumber+"的测试卡？";
                            }else{
                                acceptedNumber = "确定没有接收的测试卡？（在测试卡列表内勾选测试卡的复选框表示已接收）";
                            }
                         }
                         
                         if((Ext.getCmp("sheetType").getValue()=="1"||Ext.getCmp("sheetType").getValue()=="2"||Ext.getCmp("sheetType").getValue()=="4")&&flag==4){//移交流程 调拨流程 归还流程 接收环节 保存勾选的已接收的卡
                            var testCL = Ext.getCmp("testCardList").getSelectionModel().getSelections();
                            
                            if(testCL.length!=0){
                                acceptedNumber = "已经接收到编号为：";
                                for(var i=0;i<testCL.length;i++){
                                    acceptedNumber = acceptedNumber + "["+testCL[i].data.numberTmp+"]";
                                }
                                acceptedNumber = acceptedNumber+"的测试卡？";
                            }else{
                                acceptedNumber = "确定没有接收的测试卡？（在测试卡列表内勾选测试卡的复选框表示已接收）";
                            }
                         }
                         
                         if(acceptedNumber!=""){
                                    
                                    if(!confirm(acceptedNumber)){
                                    
                                        return ;
                                    }
                             }
                             
                        if(new DetailWin().isNeededSelectNextMan(flag,processModelId)&&(flag==3||flag==7)&&Ext.getCmp("auditResult").getValue().inputValue!=0){//判断是否需要选择下一步执行人,审核的时候选了不通过也不需要下一步
//                            manager.initNextDealMan(flag);
                        	var tm = new Object();
                        	if(Ext.getCmp("auditResultExecutePersonAccountId").getValue()==""){//执行人为空则取执行单位
                        	   tm.text = Ext.getCmp("auditResultExecuteDepartment").getValue();
                        	   tm.id = Ext.getCmp("auditResultExecuteDepartmentId").getValue();
                        	   tm.type = 3;//部门
                        	}else{
                        	   tm.id = Ext.getCmp("auditResultExecutePersonAccountId").getValue();
                               tm.text = Ext.getCmp("auditResultExecuteDepartment").getValue();
                               tm.type = 1;//用户
                        	}
                    var tempOb = new Object();
                    tempOb.targetPerson = tm;
                        	manager.oper(flag,tempOb);
                        }else{
//                        	var targetPerson = new Object();
//                        	targetPerson.id = 1;
//                        	targetPerson.text = 1;
                        	var ob = new Object();
//                            ob.targetPerson = targetPerson;
                            manager.oper(flag,ob);
                        }
                         //flag 0为查看详情  3为审核  2为执行 4为接收 5为报废的接收人员审核
                        
                    }
                },
                    {
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    aa:'bar',
                    id:'close',
                    onClick:function(){
                        Ext.getCmp('detailWin').close();
                    }
                }
                ]
            });
            this.initBtnVisible(new Object(),true);
             formWin.show();
             Ext.getCmp('testCardLendPanel').hide();
//             this.setHideOrShow(flag,Ext.getCmp("sheetType").getValue());
        }
        
        this.setHideOrShow = function(flag,sheetType){return;
        	
        	var a = Ext.getCmp("testCardList").getColumnModel();
                a.config[0].hidden = true;
        	
        	if(flag==4){//接收环节
        	   if(sheetType=1||sheetType==2){//调拨、移交
        	   	var a = Ext.getCmp("testCardList").getColumnModel();
        	   	a.config[0].hidden = false;
        	   	a.config[0].header = "已接收";
//                   Ext.getCmp("testCardList").columns[1].setVisible(true);
                }
        	}
        }
        
        
//        3为审核  2为执行 4为接收 5为报废的管理员审核环节
        this.isNeededSelectNextMan = function(flagTmp,processModelIdTmp){
        	switch(processModelIdTmp){
        	case 'com.unicom.ucloud.eom.e19.transfer':{//测试卡移交接收流程
        		switch(flagTmp){
        			case '3':return true;break;
        			case '4':return false;break;
        		  default:break;
        		}
        	   break;
        	}
        	case 'com.unicom.ucloud.eom.e19.dumping':{//测试卡报废流程
        		switch(flagTmp){
                    case '3':return false;break;
                    case '5':return false;break;
                  default:break;
                }
               break;
            }
        	case 'com.unicom.ucloud.eom.e19.lend':{//测试卡借用流程
        		switch(flagTmp){
        			case '2':return false;break;
                    case '3':return true;break;
                    case '4':return false;break;
                    case '7':return true;break;
                  default:break;
                }
               break;
            }
        	case 'com.unicom.ucloud.eom.e19.allot':{//测试卡调拨接收流程
        		switch(flagTmp){
                    case '3':return true;break;
                    case '4':return false;break;
                  default:break;
                }
               break;
            }
        	case 'com.unicom.ucloud.eom.e19.return':{//测试卡归还流程
        		switch(flagTmp){
                    case '4':return false;break;
                  default:break;
                }
               break;
            }
        	case 'com.unicom.ucloud.eom.e19.check':{//测试卡清单流程
        		switch(flagTmp){
                    case '3':return false;break;
                  default:break;
                }
               break;
            }
        	default:break;
        	}
//        	case 2:processDefName = "com.unicom.ucloud.eom.e19.transfer";break;//移交
//        case 5:processDefName = "com.unicom.ucloud.eom.e19.dumping";break;//报废
//        case 3:processDefName = "com.unicom.ucloud.eom.e19.lend";break;//借用
//        case 1:processDefName = "com.unicom.ucloud.eom.e19.allot";break;//调拨
//        case 4:processDefName = "com.unicom.ucloud.eom.e19.return";break;//归还
//        case 6:processDefName = "com.unicom.ucloud.eom.e19.check";break;//清查
            
        }
        
        //用于统一代办，返回panel
        this.showWinMyUndoTaskUnify = function(flag,cardSheetId){
            haveLoad = 0;
            var returnPanel = null;
            var ob = new Object();
//                ob.cardSheetId = cardSheetId;
//                ob.detailOnly = 1;
            var param  = new Object();
            if(cardSheetId!=null){
                param.cardSheetId = cardSheetId;
                param.ignoreDeletedDlag = 1;
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
                        if(response.rows[0].processInstanceId!=""&&processInstID==""){
                           processInstID = response.rows[0].processInstanceId;
                        }
                        cardOperationTypeIdGlo = response.rows[0].cardOperationTypeEnumId;
                        operationTypeIdGlo = flag;
                        
                        returnPanel = new DetailWin().initWindowMyUndoTaskUnify(response.rows[0],flag);
                        
                        new DetailWin().controlTestCardList(response.rows[0].cardOperationTypeEnumId);
                        new DetailWin().controlLendTestCardList(response.rows[0].cardOperationTypeEnumId,flag);
                        Ext.getCmp('sheetType').setValue(response.rows[0].sheetType);
                        
                        if(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"
                        ||response.rows[0].cardOperationTypeEnumId=="3"){//调拨移交借用流程修改草稿时如果有执行对象就查询调度表加载执行对象
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
                                            if(flag==3&&(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3")){//执行环节填充接收人 调拨和移交和借用流程
                                            Ext.getCmp('auditResultExecuteDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }
                                        }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员
                                            Ext.getCmp('executePersonId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('executeDepartmentName').setValue(disAssignObjectList[i].disAssignObjectName);
                                            if(flag==3&&(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3")){//执行环节填充接收人 调拨和移交和借用流程
                                            Ext.getCmp('auditResultExecutePersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
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
                                                Ext.getCmp('auditMyPersonId').setValue(disAssignObjectList[i].disAssignOpinion);
                                                Ext.getCmp('auditMyDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }
                                        }
                                        
                                        
                                    }
                                }
                                
                                if((response.rows[0].cardOperationTypeEnumId==3)&&(flag=="7")){//借用 本部门审核 将审核对象填入执行对象
//                                  executeDepartmentId executePersonId executeDepartmentName
//                                    auditPersonId auditDepartmentId
                                    if(Ext.getCmp('auditDepartmentId').getValue()!=""){//审核对象为组织
                                       Ext.getCmp('auditResultExecuteDepartmentId').setValue(Ext.getCmp('auditDepartmentId').getValue());
                                       Ext.getCmp('auditResultExecuteDepartment').setValue(Ext.getCmp('auditDepartmentName').getValue());
                                    }else if(Ext.getCmp('auditPersonId').getValue()!=""){//审核对象为人员
                                            var obb = new Object();
                                                obb.cloudUserId = Ext.getCmp('auditPersonId').getValue();
                                            var ooa = ZTESOFT.Synchronize(PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',obb);
                                            
                                       Ext.getCmp('auditResultExecutePersonAccountId').setValue(ooa.accountId);
                                       Ext.getCmp('auditResultExecuteDepartment').setValue(Ext.getCmp('auditDepartmentName').getValue());
                                    }
                                }
                                
                                
                       }
                        
//                        if(response.rows[0].sheetType==3){
//                           Ext.getCmp('testCardListTR').hide();
//                        }else{
                               ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderApplyAction.json?method=qryAtestCardOrderTestCard',
                                    param,
                                    function(response2){
                                        var ro = response2.rows;
                                        for(var i=0;i<ro.length;i++){
                                            if(response.rows[0].cardOperationTypeEnumId==3){
                                               Ext.getCmp('testCardLendList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡借用列表
                                            }else{
                                                Ext.getCmp('testCardList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡列表
                                            }
                                        }
                                            var aa = new Array();
                                            if((response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2||response.rows[0].cardOperationTypeEnumId==4)&&(flag=="4")){//调拨、移交、归还 （接收环节） 勾选所有卡表示都已经接收了，用户可以手动取消勾选表示未接收
                                                var st = Ext.getCmp('testCardList').getStore();
                                                for(var i=0;i<st.getCount();i++){
                                                        aa.push(st.getAt(i));
                                                }
                                                Ext.getCmp('testCardList').getSelectionModel().selectRecords(aa);
                                            }
                                            if((response.rows[0].cardOperationTypeEnumId==3)&&(flag=="4")){//借用 （接收环节） 勾选所有卡表示都已经接收了，用户可以手动取消勾选表示未接收
                                                var st = Ext.getCmp('testCardLendList').getStore();
                                                for(var i=0;i<st.getCount();i++){
                                                        aa.push(st.getAt(i));
                                                }
                                                Ext.getCmp('testCardLendList').getSelectionModel().selectRecords(aa);
                                            }
//                                            if((response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2)&&(flag=="6"||flag=="0")){//调拨、移交 （申请人确认环节或者详情） 勾选已接收的卡
//                                                var st = Ext.getCmp('testCardList').getStore();
//                                                for(var i=0;i<st.getCount();i++){
//                                                    var record = st.getAt(i);
//                                                    if(record.data.isAccepted=="accepted"){
//                                                        aa.push(record);
//                                                    }
//                                                }
//                                                Ext.getCmp('testCardList').getSelectionModel().selectRecords(aa);
//                                            }
//                                            if((response.rows[0].cardOperationTypeEnumId==3)&&(flag=="6"||flag=="0")){//借用 （申请人确认环节或者详情） 勾选已接收的卡
//                                                var st = Ext.getCmp('testCardLendList').getStore();
//                                                for(var i=0;i<st.getCount();i++){
//                                                    var record = st.getAt(i);
//                                                    if(record.data.isAccepted=="accepted"){
//                                                        aa.push(record);
//                                                    }
//                                                }
//                                                Ext.getCmp('testCardLendList').getSelectionModel().selectRecords(aa);
//                                            }
                                        
                                    }
                            );
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
                            
                            new DetailWin().controlShowAndHideDueFlag(flag,response);
                            
//                        if(flag==5){//报废第二审核环节
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                        }
//                        if(flag=="countersign"){//会签回单
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写会签意见");
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                        }
//                        if(flag==3){//审核
////                          Ext.getCmp("executeBut").hide();
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                            if(response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2
//                            ||response.rows[0].cardOperationTypeEnumId==3){
//                                Ext.getCmp("auditResultExecuteDepartmentTR").show();
//                                Ext.getCmp("auditResultExecuteDepartmentTR2").show();
//                                Ext.getCmp('auditResultExecuteDepartment').allowBlank = false;
////                                Ext.getCmp("auditResultExecutePersonTR").show();
////                                Ext.getCmp("auditResultExecutePersonTR2").show();
//                            }
//                            
//                        }
//                        if(flag==2){//执行
////                            Ext.getCmp("auditResultt").hide();
////                            Ext.getCmp("auditResultt2").hide();
//                        	Ext.getCmp("approveOpinionEdit").setValue("成功");
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写执行意见");
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
////                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
////                            document.getElementById("approveOpinionEditLabel").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
//                            
//                        }
//                        if(flag==4){//接收
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写接收意见");
//                            Ext.getCmp("auditResultt").hide();
//                            Ext.getCmp("auditResultt2").hide();
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
////                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
////                                document.getElementById("approveOpinionEditLabel").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
//                        }
//                        if(flag=="6"){//申请人确认
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写确认意见");
//                        }
//                        if(flag=="7"){//本部门审核
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                                Ext.getCmp("auditResultExecuteDepartmentTR").show();
//                                Ext.getCmp("auditResultExecuteDepartmentTR2").show();
//                                Ext.getCmp('auditResultExecuteDepartment').allowBlank = false;
//                        }
//                        if(flag=="dispatchCommit"){//转派回单
//                        	Ext.getCmp("approveOpinionEditPanel").hide();
//                        	Ext.getCmp("dispatchCommitForm").show();
//                        }
//                        if(flag==0){//详情 控制隐藏显示
//                            var buts = Ext.getCmp("detailWin").buttons;
//                            for(var i=0;i<buts.length;i++){
//                               if(buts[i].id==null||(buts[i].id!="close")){
//                                   buts[i].hide();
//                               }
//                            }
//                            Ext.getCmp("approveOpinionEditPanel").hide();
//                            
//                        }
                        
                    }
            );
            
            
            
//                this.initWindow(a[0]);
//                window.showModalDialog(PATH+'/e19/testCardOrderDetail.jsp', ob, "dialogWidth=700px;dialogHeight=700px");
              
            return returnPanel;
        }
        
        this.showWin = function(flag,cardSheetId){//与showWinMyUndoTaskUnify方法的业务逻辑保持一致
        	haveLoad = 0;
            var ob = new Object();
//                ob.cardSheetId = cardSheetId;
//                ob.detailOnly = 1;
            var param  = new Object();
            if(cardSheetId!=null){
                param.cardSheetId = cardSheetId;
                param.ignoreDeletedDlag = 1;
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
                    	if(response.rows[0].processInstanceId!=""&&processInstID==""){
                    	   processInstID = response.rows[0].processInstanceId;
                    	}
                    	cardOperationTypeIdGlo = response.rows[0].cardOperationTypeEnumId;
                    	operationTypeIdGlo = flag;//流程操作类型
                        new DetailWin().initWindow(response.rows[0],flag);
                        new DetailWin().controlTestCardList(response.rows[0].cardOperationTypeEnumId);
                        new DetailWin().controlLendTestCardList(response.rows[0].cardOperationTypeEnumId,flag);
                        Ext.getCmp('sheetType').setValue(response.rows[0].sheetType);
                        
                        if(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3"){//调拨移交借用流程修改草稿时如果有执行对象就查询调度表加载执行对象
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
                                            if(flag==3&&(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3")){//执行环节填充接收人 调拨 和移交和借用流程
                                            Ext.getCmp('auditResultExecuteDepartmentId').setValue(disAssignObjectList[i].disAssignObjectId);
                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }
                                        }else if(disAssignObjectList[i].disAssignObjectTypeEnumId==3){//3表示人员 //执行环节填充接收人
                                            Ext.getCmp('executePersonId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('executeDepartmentName').setValue(disAssignObjectList[i].disAssignObjectName);
                                            if(flag==3&&(response.rows[0].cardOperationTypeEnumId=="1"||response.rows[0].cardOperationTypeEnumId=="2"||response.rows[0].cardOperationTypeEnumId=="3")){//执行环节填充接收人 调拨 和移交和借用流程
                                            Ext.getCmp('auditResultExecutePersonAccountId').setValue(disAssignObjectList[i].disAssignOpinion);
                                            Ext.getCmp('auditResultExecuteDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
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
                                                Ext.getCmp('auditMyPersonId').setValue(disAssignObjectList[i].disAssignOpinion);
                                                Ext.getCmp('auditMyDepartment').setValue(disAssignObjectList[i].disAssignObjectName);
                                            }
                                        }
                                        
                                        
                                    }
                                }
                                
                                if((response.rows[0].cardOperationTypeEnumId==3)&&(flag=="7")){//借用 本部门审核 将审核对象填入执行对象
//                                  executeDepartmentId executePersonId executeDepartmentName
//                                    auditPersonId auditDepartmentId
                                    if(Ext.getCmp('auditDepartmentId').getValue()!=""){//审核对象为组织
                                       Ext.getCmp('auditResultExecuteDepartmentId').setValue(Ext.getCmp('auditDepartmentId').getValue());
                                       Ext.getCmp('auditResultExecuteDepartment').setValue(Ext.getCmp('auditDepartmentName').getValue());
                                    }else if(Ext.getCmp('auditPersonId').getValue()!=""){//审核对象为人员
                                            var obb = new Object();
                                                obb.cloudUserId = Ext.getCmp('auditPersonId').getValue();
                                            var ooa = ZTESOFT.Synchronize(PATH+'/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json',obb);
                                            
                                       Ext.getCmp('auditResultExecutePersonAccountId').setValue(ooa.accountId);
                                       Ext.getCmp('auditResultExecuteDepartment').setValue(Ext.getCmp('auditDepartmentName').getValue());
                                    }
                                }
                                
                                
                       }
                        
//                        if(response.rows[0].sheetType==3){
//                           Ext.getCmp('testCardListTR').hide();
//                        }else{
                               ZTESOFT.invokeAction(
                                    PATH+'/e19/testCardOrderApplyAction.json?method=qryAtestCardOrderTestCard',
                                    param,
                                    function(response2){
                                        var ro = response2.rows;
                                        
                                        for(var i=0;i<ro.length;i++){
                                        	if(response.rows[0].cardOperationTypeEnumId==3){
                                        	   Ext.getCmp('testCardLendList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡借用列表
                                            }else{
                                                Ext.getCmp('testCardList').getStore().add(new Ext.data.Record(ro[i]));//填充测试卡列表
                                            }
                                        }
                                        var aa = new Array();
                                        if((response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2||response.rows[0].cardOperationTypeEnumId==4)&&(flag=="4")){//调拨、移交、归还 （接收环节） 勾选所有卡表示都已经接收了，用户可以手动取消勾选表示未接收
                                                var st = Ext.getCmp('testCardList').getStore();
                                                for(var i=0;i<st.getCount();i++){
                                                        aa.push(st.getAt(i));
                                                }
                                                Ext.getCmp('testCardList').getSelectionModel().selectRecords(aa);
                                            }
                                            if((response.rows[0].cardOperationTypeEnumId==3)&&(flag=="4")){//借用 （接收环节） 勾选所有卡表示都已经接收了，用户可以手动取消勾选表示未接收
                                                var st = Ext.getCmp('testCardLendList').getStore();
                                                for(var i=0;i<st.getCount();i++){
                                                        aa.push(st.getAt(i));
                                                }
                                                Ext.getCmp('testCardLendList').getSelectionModel().selectRecords(aa);
                                            }
//                                        if((response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2)&&(flag=="6"||flag=="0")){//调拨、移交 （申请人确认环节或者详情） 勾选已接收的卡
//                                            var st = Ext.getCmp('testCardList').getStore();
//                                            for(var i=0;i<st.getCount();i++){
//                                                var record = st.getAt(i);
//                                                if(record.data.isAccepted=="accepted"){
//                                                    aa.push(record);
//                                                }
//                                            }
//                                            Ext.getCmp('testCardList').getSelectionModel().selectRecords(aa);
//                                        }
//                                        if((response.rows[0].cardOperationTypeEnumId==3)&&(flag=="6"||flag=="0")){//借用 （申请人确认环节或者详情） 勾选已接收的卡
//                                            var st = Ext.getCmp('testCardLendList').getStore();
//                                            for(var i=0;i<st.getCount();i++){
//                                                var record = st.getAt(i);
//                                                if(record.data.isAccepted=="accepted"){
//                                                    aa.push(record);
//                                                }
//                                            }
//                                            Ext.getCmp('testCardLendList').getSelectionModel().selectRecords(aa);
//                                        }
                                    }
                            );
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
                            
                            new DetailWin().controlShowAndHideDueFlag(flag,response);
                            
//                        if(flag==5){//报废第二审核环节
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                        }
//                        if(flag=="countersign"){//会签回单
//                        	Ext.getCmp("approveOpinionEditPanel").setTitle("填写会签意见");
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                        }
//                        if(flag==3){//审核
////                          Ext.getCmp("executeBut").hide();
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                            if(response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2
//                            ||response.rows[0].cardOperationTypeEnumId==3){
//                                Ext.getCmp("auditResultExecuteDepartmentTR").show();
//                                Ext.getCmp("auditResultExecuteDepartmentTR2").show();
//                                Ext.getCmp('auditResultExecuteDepartment').allowBlank = true;
////                                Ext.getCmp("auditResultExecutePersonTR").show();
////                                Ext.getCmp("auditResultExecutePersonTR2").show();
//                            }
//                            
//                        }
//                        if(flag==2){//执行
////                            Ext.getCmp("auditResultt").hide();
////                            Ext.getCmp("auditResultt2").hide();
//                        	Ext.getCmp("approveOpinionEdit").setValue("成功");
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写执行意见");
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
////                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
////                            document.getElementById("approveOpinionEditLabel").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
//                            
//                        }
//                        if(flag==4){//接收
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写接收意见");
//                            Ext.getCmp("auditResultt").hide();
//                            Ext.getCmp("auditResultt2").hide();
////                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
////                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
////                                document.getElementById("approveOpinionEditLabel").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
//                        }
//                        if(flag=="6"){//申请人确认
//                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写确认意见");
//                            Ext.getCmp("auditResultt").hide();
//                            Ext.getCmp("auditResultt2").hide();
//                        }
//                        if(flag=="7"){//本部门审核
//                            Ext.getCmp("approveOpinionEdit").setValue("同意");
//                        }
//                        if(flag=="dispatchCommit"){//转派回单
//                            Ext.getCmp("approveOpinionEditPanel").hide();
//                            Ext.getCmp("dispatchCommitForm").show();
//                        }
//                        if(flag==0){//详情 控制隐藏显示
//                            var buts = Ext.getCmp("detailWin").buttons;
//                            for(var i=0;i<buts.length;i++){
//                               if(buts[i].id==null||(buts[i].id!="close")){
//                                   buts[i].hide();
//                               }
//                            }
//                            Ext.getCmp("approveOpinionEditPanel").hide();
//                            
//                        }
                        
                        
//                        Ext.getCmp("filesTR1").hide();
//                        Ext.getCmp("filesTR2").hide();
//                        Ext.getCmp("filesTR3").hide();
                    }
            );
            
            
            
//                this.initWindow(a[0]);
//                window.showModalDialog(PATH+'/e19/testCardOrderDetail.jsp', ob, "dialogWidth=700px;dialogHeight=700px");
                
        }
        
        this.controlShowAndHideDueFlag = function(flag,response){
        	
        	
                        if(flag==5){//报废第二审核环节
                            Ext.getCmp("approveOpinionEdit").setValue("同意");
                        }
                        if(flag=="countersign"){//会签回单
                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写会签意见");
                            Ext.getCmp("approveOpinionEdit").setValue("同意");
                        }
                        if(flag==3){//审核
//                          Ext.getCmp("executeBut").hide();
                            Ext.getCmp("approveOpinionEdit").setValue("同意");
                            if(response.rows[0].cardOperationTypeEnumId==1||response.rows[0].cardOperationTypeEnumId==2
                            ||response.rows[0].cardOperationTypeEnumId==3){
                                Ext.getCmp("auditResultExecuteDepartmentTR").show();
                                Ext.getCmp("auditResultExecuteDepartmentTR2").show();
                                Ext.getCmp('auditResultExecuteDepartment').allowBlank = false;
//                                Ext.getCmp("auditResultExecutePersonTR").show();
//                                Ext.getCmp("auditResultExecutePersonTR2").show();
                            }
                            
                            
                        }
                        if(flag==2){//执行
//                            Ext.getCmp("auditResultt").hide();
//                            Ext.getCmp("auditResultt2").hide();
                            Ext.getCmp("approveOpinionEdit").setValue("成功");
                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写执行意见");
//                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
//                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
//                            document.getElementById("approveOpinionEditLabel").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>执行意见：";
                            
                        }
                        if(flag==4){//接收
                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写接收意见");
                            Ext.getCmp("auditResultt").hide();
                            Ext.getCmp("auditResultt2").hide();
//                            Ext.getCmp("approveOpinionEdit").fieldLabel = "执行意见：";
//                            document.getElementById("approveOpinionEdit").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
//                                document.getElementById("approveOpinionEditLabel").parentNode.previousSibling.innerHTML ="<font color='red'>*</font>接收意见：";
                        }
                        if(flag=="6"){//申请人确认
                            Ext.getCmp("approveOpinionEditPanel").setTitle("填写确认意见");
                            Ext.getCmp("auditResultt").hide();
                            Ext.getCmp("auditResultt2").hide();
                        }
                        if(flag=="7"){//本部门审核
                            Ext.getCmp("approveOpinionEdit").setValue("同意");
                                Ext.getCmp("auditResultExecuteDepartmentTR").show();
                                Ext.getCmp("auditResultExecuteDepartmentTR2").show();
                                Ext.getCmp('auditResultExecuteDepartment').allowBlank = false;
                        }
                        if(flag=="dispatchCommit"){//转派回单
                            Ext.getCmp("approveOpinionEditPanel").hide();
                            Ext.getCmp("dispatchCommitForm").show();
                        }
                        if(flag==0){//详情 控制隐藏显示
                            var buts = Ext.getCmp("detailWin").buttons;
                            for(var i=0;i<buts.length;i++){
                               if(buts[i].id==null||(buts[i].id!="close")){
                                   buts[i].hide();
                               }
                            }
                            Ext.getCmp("approveOpinionEditPanel").hide();
                            
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
                width:testCardOrderDetailWidth*4+20+20+10,//Ext.getBody().getSize(),
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
                            width : testCardOrderDetailWidth,//最小是120，最大190
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
                                    width:testCardOrderDetailWidth*3,
                                    items : [{
                                xtype:'ZTESOFT.textfield',
//                                fieldLabel:'工单流水号',
                                hideLabel : true,
                                name:'sheetSerialNumber',
                                id: 'sheetSerialNumber',
                                readOnly:true,
                                anchor:'100%'
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
    //                                    fieldLabel: '归属地',
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
                            },{
                                xtype:'hidden',
                                name: 'processInstanceId',
                                id: 'processInstanceId'
                            },{
                                xtype:'hidden',
                                name: 'activityInstanceId',
                                id: 'activityInstanceId'
                            },{
                                xtype:'hidden',
                                name: 'taskInstanceId',
                                id: 'taskInstanceId'
                            },{
                                xtype:'hidden',
                                name: 'sheetType',
                                id: 'sheetType'
                            },{
                                xtype:'hidden',
                                name: 'attribute1',
                                id: 'attribute1'//用于控制报废流程的流转
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
                                    items : [{
                                xtype:'ZTESOFT.textfield',
//                                fieldLabel:'建单人',
                                hideLabel : true,
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
//                                fieldLabel: '工单状态',
                                hideLabel : true,
                                name: 'sheetStatusName',
                                id: 'sheetStatusName',
                                readOnly:true,
                                anchor:'100%'
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
                                    items : [{
                                xtype:'ZTESOFT.textfield',
//                                fieldLabel: '建单时间',
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
                                    items : [{
                                xtype:'ZTESOFT.textfield',
                                hideLabel : true,
//                                fieldLabel: '派单时间',
                                name: 'dispatchDate',
                                id: 'dispatchDate',
                                readOnly:true,
                                anchor:'100%'
                            }]
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
//                                fieldLabel: '<font color="red">*</font>工单类型',
                                name: 'cardOperationTypeEnumId',
                                id: 'cardOperationTypeEnumId',
                                valueField: 'value',
                                displayField: 'text',
                                mode: 'local',
                                triggerAction: 'all',
                                readOnly:true,
                                store: this.sheetTypeStore,
                                anchor:'100%'
                            }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '缓急程度'
                                    }
                                },{
                                    colspan : 1,
                                    items : [{
                                xtype:'ZTESOFT.textfield',
//                                fieldLabel: '工单状态',
                                hideLabel : true,
                                name: 'urgencyLevel',
                                id: 'urgencyLevel',
                                readOnly:true,
                                anchor:'100%'
                            }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '建议完成时间'
                                    }
                                },{
                                	 colspan : 3,
                                     width:testCardOrderDetailWidth*3,
                                    items : [{
                                xtype:'ZTESOFT.datefield',
                                hideLabel : true,
//                                fieldLabel: '<font color="red">*</font>建议完成时间',
                                name: 'requiredFinishTime',
                                id: 'requiredFinishTime',
                                format:'Y-m-d h:i:s',
                                readOnly:true,
                                blankText:'建议完成时间不能为空!',
                                allowBlank: false,
                                anchor:'100%'
                            }]
                                },
                                {
                                    colspan : 1,
                                    id:"auditMyDepartmentIdTR",
                                    hidden:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '本部门审核对象'
                                    }
                                },{
                                    colspan : 3,
                                    hidden:true,
                                    width:testCardOrderDetailWidth*3,
                                    id:"auditMyDepartmentIdTR2",
                                    items : [{
                                        xtype:'ZTESOFT.textfield',
                                        hideLabel : true,
                                        id: 'auditMyDepartment',
                                        name: 'auditMyDepartment',
//                                        fieldLabel : '<font color="red">*</font>审核单位',
                                        blankText:'本部门审核单位不能为空!',
                                        valueFile : 'auditMyDepartmentId',
//                                        editable : false ,
                                        readOnly: true,
                                        anchor : '100%'
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
                                    id:'auditDepartmentIdTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '审核对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderDetailWidth*3,
                                    id:'auditDepartmentIdTR2',
                                    items : [{
                                xtype:'ZTESOFT.textfield',
                                hideLabel : true,
//                                fieldLabel: '<font color="red">*</font>审核单位',
                                name: 'auditDepartmentName',
                                id: 'auditDepartmentName',
                                readOnly:true,
                                blankText:'审核单位不能为空!',
                                anchor:'100%'
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
                                name: 'auditPersonName',
                                id: 'auditPersonName'
                            }]
                                },
//                                {
//                                    colspan : 1,
//                                    id:'auditPersonIdTR',
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '审核人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    id:'auditPersonIdTR2',
//                                    items : [{
//                                xtype:'ZTESOFT.textfield',
//                                hideLabel : true,
////                                fieldLabel: '审核人',
//                                name: 'auditPersonName',
//                                id: 'auditPersonName',
//                                disabled:true,
//                                blankText:'审核人不能为空!',
//                                anchor:'100%'
//                            },{
//                                xtype:'hidden',
//                                name: 'auditPersonId',
//                                id: 'auditPersonId'
//                            }]
//                                },
                                {
                                    colspan : 1,
                                    id:'executeDepartmentTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        id:'testCardOrderDetailExecutorLabel',
                                        html : '执行对象'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderDetailWidth*3,
                                    id:'executeDepartmentTR2',
                                    items : [{
                                xtype:'ZTESOFT.textfield',
                                hideLabel : true,
                                width:testCardOrderDetailWidth*3,
//                                fieldLabel: '<font color="red">*</font>执行单位',
                                name: 'executeDepartmentName',
                                id: 'executeDepartmentName',
                                readOnly:true,
                                blankText:'执行单位不能为空!',
                                anchor:'100%'
                            },{
                                xtype:'hidden',
                                name: 'executeDepartmentId',
                                id: 'executeDepartmentId'
                            },{
                                xtype:'hidden',
                                name: 'executePersonId',
                                id: 'executePersonId'
                            },{
                                xtype:'hidden',
                                name: 'executePersonName',
                                id: 'executePersonName'
                            }]
                                },
//                                {
//                                    colspan : 1,
//                                    id:'executePersonTR',
//                                    items : {
//                                        xtype : 'ZTESOFT.label',
//                                        text : '执行人'
//                                    }
//                                },{
//                                    colspan : 1,
//                                    id:'executePersonTR2',
//                                    items : [{
//                                xtype:'ZTESOFT.textfield',
//                                hideLabel : true,
////                                fieldLabel: '执行人',
//                                name: 'executePersonName',
//                                id: 'executePersonName',
//                                disabled:true,
//                                blankText:'执行人不能为空!',
//                                anchor:'100%'
//                            },{
//                                xtype:'hidden',
//                                name: 'executePersonId',
//                                id: 'executePersonId'
//                            }]
//                                },
                                
                                {
                                    colspan : 1,
                                    id:'expectedReturnTimeTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '预计归还时间'
                                    }
                                },{
                                    colspan : 3,
                                    width:testCardOrderDetailWidth*3,
                                    id:'expectedReturnTimeTR2',
                                    items : [{
                                xtype:'ZTESOFT.datefield',
                                hideLabel : true,
//                                fieldLabel: '<font color="red">*</font>预计归还时间',
                                name: 'expectedReturnTime',
                                id: 'expectedReturnTime',
                                format:'Y-m-d h:i:s',
                                editable : false ,
                                readOnly:true,
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
//                                disabled:true,
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'cardSheetId',
//                                id: 'cardSheetId'
//                            },{
//                                xtype:'hidden',
//                                name: 'processInstanceId',
//                                id: 'processInstanceId'
//                            },{
//                                xtype:'hidden',
//                                name: 'activityInstanceId',
//                                id: 'activityInstanceId'
//                            },{
//                                xtype:'hidden',
//                                name: 'taskInstanceId',
//                                id: 'taskInstanceId'
//                            },{
//                                xtype:'hidden',
//                                name: 'sheetType',
//                                id: 'sheetType'
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
//                                disabled:true,
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
//                                disabled:true,
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
//                                disabled:true,
//                                anchor:'95%'
//                            }]
//                        },
//                        {
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '工单状态',
//                                name: 'sheetStatusName',
//                                id: 'sheetStatusName',
//                                disabled:true,
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
////                                disabled:true,
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
//                                disabled:true,
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
//                                disabled:true,
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
//                                disabled:true,
//                                store: this.sheetTypeStore,
//                                anchor:'95%'
//                            }]
//                        }
//                        
//                        ,{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '<font color="red">*</font>审核单位',
//                                name: 'auditDepartmentName',
//                                id: 'auditDepartmentName',
//                                disabled:true,
//                                blankText:'审核单位不能为空!',
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'auditDepartmentId',
//                                id: 'auditDepartmentId'
//                            }]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '审核人',
//                                name: 'auditPersonName',
//                                id: 'auditPersonName',
//                                disabled:true,
//                                blankText:'审核人不能为空!',
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'auditPersonId',
//                                id: 'auditPersonId'
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
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '<font color="red">*</font>执行单位',
//                                name: 'executeDepartmentName',
//                                id: 'executeDepartmentName',
//                                disabled:true,
//                                blankText:'执行单位不能为空!',
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'executeDepartmentId',
//                                id: 'executeDepartmentId'
//                            }]
//                        }
//                        ,{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'textfield',
//                                fieldLabel: '执行人',
//                                name: 'executePersonName',
//                                id: 'executePersonName',
//                                disabled:true,
//                                blankText:'执行人不能为空!',
//                                anchor:'95%'
//                            },{
//                                xtype:'hidden',
//                                name: 'executePersonId',
//                                id: 'executePersonId'
//                            }]
//                        },{
//                        columnWidth:.3,
//                        layout: 'form',
//                        items: [{
//                                xtype:'datefield',
//                                fieldLabel: '<font color="red">*</font>建议完成时间',
//                                name: 'requiredFinishTime',
//                                id: 'requiredFinishTime',
//                                format:'Y-m-d h:i:s',
//                                disabled:true,
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
//                                xtype:'datefield',
//                                fieldLabel: '<font color="red">*</font>预计归还时间',
//                                name: 'expectedReturnTime',
//                                id: 'expectedReturnTime',
//                                format:'Y-m-d h:i:s',
//                                editable : false ,
//                                disabled:true,
//                                blankText:'预计归还时间不能为空!',
//                                anchor:'95%'
//                            }]
//                        }
//                   ]}
//            ]
                });
            return infoPage;
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
            Ext.getCmp('urgencyLevel').setValue(rowData.urgencyLevel);
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
////                        	filesName = filesName+"<a href=\"javascript:new DetailWin().download2(\'"+rows[i].attachmentId+"\',\'"+rows[i].attachmentName+"\')\">["+rows[i].attachmentName+"]</a>";
////                        	filesName = '<a href="javascript:new DetailWin().download()">'+rows[i].attachmentName+'</a>';
//                        	filesName = '<a href="javascript:alert(2);">'+rows[i].attachmentName+'</a>';
////                           Ext.getCmp('valueListGrid').getStore().add(new Ext.data.Record(rows[i]));
//                        }
//                        
////                        Ext.DomQuery.selectNode('label[for=filesName]').html = filesName;
//                        Ext.getCmp('filesName').setValue('html',filesName);
////                        Ext.getCmp('filesTR1').doLayout();
//                        
//                    }
//            );
        }
    }
    
    
    function EdGridOper(){
    
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
            width: 800,//body_width*0.5,
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
          cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel(),
                                         new Ext.grid.RowNumberer({header:'序号',width:40}),
//                                         {header:'测试卡编号',dataIndex:'number',width:body_width*0.5*0.25},
                                         {header:'测试卡编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                                              return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail(cardType,'+record.data.cardId+',-1);">' + value + '</a>';
                                          },width:body_width*0.5*0.25},
                                         {header:'差异类型',dataIndex:'differenceTypeEnumName',width:body_width*0.5*0.25},
                                         {header:'差异详细',dataIndex:'differentDetail',width:body_width*0.5*0.3},
                                         {header:'差异备注',dataIndex:'differencesRemarks',width:body_width*0.5*0.3},
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
//                      //oper2.qryRule(rec.data.tacheId);
//                  }
//              }
//          })

      });
        return gri;
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
//                                    oper.doQry();
                                }
                            },
                            anchor : '95%',
                            disabled:true
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
//                                name: 'attributionProvinceIdQry',
//                                id: 'attributionProvinceIdQry',
//                            anchor : '95%'
//                            
//                        }]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype:'textfield',
//                                fieldLabel: '归属地市',
//                                name: 'attributionCityIdQry',
//                                id: 'attributionCityIdQry',
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
                if(it[i].inputValue==cardType){
                    it[i].checked = true;
                    Ext.getCmp('testcardTypeEnumId').setValue(cardType);
                }
            }
            
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
                    var fla = 0;
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
                            num = num+1;
                        }
                        fla = 0;
                    }
                    if(str!==""){
                 	   Ext.Msg.alert('操作提示','已成功添加'+num+'条记录,'+'编号为'+str+'的测试卡已经添加,不能重复添加');
                 }else{
                 	Ext.Msg.alert('操作提示','添加成功');
                 }
                }
            });//加这个符号，会在页面上添加一个竖线分隔符
            

            return tb;
        }
        
     this.initTestCardDetailQryResult = function(){
            
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
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.12},
               /* {header:'编号',dataIndex:'numberTmp',width:gridWidth*0.12},
                {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.12},*/
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.12},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:testCardOrderDetailWidth*4*0.12},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.07},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'testCardQryResult',
//                region : 'center',//在父容器里的位置
//                width: 800,
                height : 250,//默认宽度为自适应的，一般不用设置
                title : '查询结果',
//                region: 'center',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initTestCardQryResultToolsBar(),//工具条，用来放操作按键
                url:PATH+'/e19/testCardInfoAction.json?method=qryList',
                sm : new Ext.grid.CheckboxSelectionModel(
                    {
//                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                    listeners : {
                        //行选中事件
//                        rowselect : function(sm, row, rec) {
////                            oper.qryRule(rec.data.tacheId);
////                          Ext.getCmp('cardId').vlaue = rec.data.testCardId;
////                          Ext.getCmp('number').vlaue = rec.data.number;
//                            var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
//                            var numberTmp = "";
//                            var cardIdTmp = "";
//                            for(var i=0;i<a.length;i++){
//                               numberTmp = numberTmp+"["+a[i].data.numberTmp+"]";
//                               cardIdTmp = cardIdTmp+","+a[i].data.testobjectId;
//                            }
//                            Ext.getCmp('number').setValue(numberTmp);
//                            Ext.getCmp('cardId').setValue(cardIdTmp.substring(1));
////                            alert(Ext.getCmp('cardId').getValue());
//                            
////                          var a = Ext.getCmp(idtmp)
////                if(a.length==0){
////                    Ext.Msg.alert("提示","请选择要删除的行！");
////                    return;
////                }
////                for(var i=0;i<a.length;i++){
////                Ext.getCmp(idtmp).getStore().remove(a[i]);
////            }
//                            
////                            Ext.getCmp('number').setValue("["+rec.data.numberTmp+"]");
////                            Ext.getCmp('cardId').setValue(","+rec.data.testobjectId);
//                        },
//                        rowdeselect : function(sm, row, rec) {
////                            oper.qryRule(rec.data.tacheId);
////                          Ext.getCmp('cardId').vlaue = rec.data.testCardId;
////                          Ext.getCmp('number').vlaue = rec.data.number;
//                            var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
//                            var numberTmp = "";
//                            var cardIdTmp = "";
//                            for(var i=0;i<a.length;i++){
//                               numberTmp = numberTmp+"["+a[i].data.numberTmp+"]";
//                               cardIdTmp = cardIdTmp+","+a[i].data.testobjectId;
//                            }
//                            Ext.getCmp('number').setValue(numberTmp);
//                            Ext.getCmp('cardId').setValue(cardIdTmp.substring(1));
////                            alert(Ext.getCmp('cardId').getValue());
//                            
////                          var a = Ext.getCmp(idtmp)
////                if(a.length==0){
////                    Ext.Msg.alert("提示","请选择要删除的行！");
////                    return;
////                }
////                for(var i=0;i<a.length;i++){
////                Ext.getCmp(idtmp).getStore().remove(a[i]);
////            }
//                            
////                            Ext.getCmp('number').setValue("["+rec.data.numberTmp+"]");
////                            Ext.getCmp('cardId').setValue(","+rec.data.testobjectId);
//                        }
                    }
                }
                )
//                new Ext.grid.RowSelectionModel({
//                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
//                    listeners : {
//                        //行选中事件
//                        rowselect : function(sm, row, rec) {
////                            oper.qryRule(rec.data.tacheId);
////                          Ext.getCmp('cardId').vlaue = rec.data.testCardId;
////                          Ext.getCmp('number').vlaue = rec.data.number;
//                            Ext.getCmp('number').setValue(rec.data.numberTmp);
//                            Ext.getCmp('cardId').setValue(rec.data.testobjectId);
//                        }
//                    }
//                })

            });

            return grid;

        
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
                {header:'类型',dataIndex:'testobjectName',width:gridWidth*0.12},
//                {header:'编号',dataIndex:'numberTmp',width:gridWidth*0.12},
                {header:'编号',dataIndex:'numberTmp',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.12},
//                {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.12},
                {header:'卡号',dataIndex:'cardNo',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="manager.testCardOrderDetailDoViewDetail('+record.data.testobjectType+','+record.data.testobjectId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.12},
                {header:'状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.07},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.08},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'testobjectType',dataIndex:'testobjectType',hidden:true},
                {header:'testobjectId',dataIndex:'testobjectId',hidden:true},
                {header:'attributionProvinceId',dataIndex:'attributionProvinceId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'testCardQryResult',
//                region : 'center',//在父容器里的位置
//                width: 800,
                height : 250,//默认宽度为自适应的，一般不用设置
                title : '查询结果',
//                region: 'center',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
//                tbar : this.initTestCardQryResultToolsBar(idtmp),//工具条，用来放操作按键
                url:PATH+'/e19/testCardInfoAction.json?method=qryList',
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
////                          Ext.getCmp('cardId').vlaue = rec.data.testCardId;
////                          Ext.getCmp('number').vlaue = rec.data.number;
//                            Ext.getCmp('number').setValue(rec.data.numberTmp);
//                            Ext.getCmp('cardId').setValue(rec.data.testobjectId);
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
                width:720,//Ext.getBody().getSize(),
//                height:800,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
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
//                    bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;',
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
                            width : 170,//最小是120，最大190
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
                                    width:510,
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
                                    width:510,
                                    items : [{xtype:'ZTESOFT.enum',
                                    hideLabel : true,
//                                           fieldLabel : '<font color="red">*</font>差异类型',
                                        name : 'differenceTypeEnumId',
                                        id : 'differenceTypeEnumId',
                                        valueField: 'dataValue',
                                        displayField: 'dataName',
                                        mode: 'local',
                                        typeAhead : true,
                                        triggerAction: 'all',
                                        editable : false ,
                                        dict: true,
                                        dictType:'DIFFERENCE_TYPE',
                                        value: testCardOrderDetailDifferenceTypeEnumId,
//                                        store: sto,
                                        listeners:{
                                            'select':function(me,newValue,oldValue){
                                                 
                                                 eo.changeDifferenceTypeEnumId();   
                                            }
                                  
                                    },
                                    anchor : '100%'
                                }]
                                },
                                
                                //////////////////////////↓
                                {
                                    colspan : 1,
                                    id : 'personCurrentToIdTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>当前归属人'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    id : 'personCurrentToIdTR2',
                                    items : [
                                    	{xtype:'ZTESOFT.popupfield',
                                    hideLabel : true,
                                    id: 'personCurrentTo',
                                        name: 'personCurrentTo',
//                                        fieldLabel : '<font color="red">*</font>当前归属人',
                                        valueFile : 'personCurrentToId',
                                        readOnly: true,
//                                        editable : false ,
                                        onPopup : function() {
                                                //选择事件逻辑
                                                eo.selectPer('personCurrentTo');
                                        },
                                    anchor : '100%'
                                },{
                                        xtype:'hidden',
                                        name: 'personCurrentToId',
                                        id: 'personCurrentToId'
                                      },{
                                        xtype:'hidden',
                                        name: 'personCurrentToAccountId',
                                        id: 'personCurrentToAccountId'
                                      }]
                                },
                                
                                {
                                    colspan : 1,
                                    id : 'currentStatusTR',
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        html : '<font color="red">*</font>当前状态'
                                    }
                                },{
                                    colspan : 3,
                                    width:510,
                                    id : 'currentStatusTR2',
                                    items : [
                                        {xtype:'ZTESOFT.enum',
                                    hideLabel : true,
//                                           fieldLabel : '<font color="red">*</font>当前状态',
                                                name : 'currentStatus',
                                                id : 'currentStatus',
                                                valueField: 'dataValue',
                                                displayField: 'dataName',
                                                mode: 'local',
                                                triggerAction: 'all',
                                                editable : false ,
                                                typeAhead : true,
                                                value: testCardOrderDetailCurrentStatus,
                                                dict: true,
                                                dictType:'TESTCARD_STATUS',
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
                                      }]
                                },
                                //////////////////////////////↑
                                
                                //////////////////////////原代码↓
                                
//                                {
//                                    colspan : 1,
////                                    id : 'personCurrentToIdTR',
//                                    items : [{
//                                    	id : 'personCurrentToIdTR',
//                                        xtype : 'ZTESOFT.label',
//                                        hidden:true,
//                                        html : '<font color="red">*</font>当前归属人'
//                                    },{
//                                    	id : 'currentStatusTR',
//                                        xtype : 'ZTESOFT.label',
//                                        hidden:true,
//                                        html : '<font color="red">*</font>当前状态'
//                                    }]
//                                },{
//                                    colspan : 1,
//                                    id : 'personCurrentToIdTR2',
//                                    items : [{xtype:'ZTESOFT.popupfield',
//                                    hideLabel : true,
//                                    id: 'personCurrentTo',
//                                        name: 'personCurrentTo',
////                                        fieldLabel : '<font color="red">*</font>当前归属人',
//                                        valueFile : 'personCurrentToId',
//                                        readOnly: true,
//                                        hidden:true,
////                                        editable : false ,
//                                        onPopup : function() {
//                                                //选择事件逻辑
//                                                eo.selectPer('personCurrentTo');
//                                        },
//                                    anchor : '100%'
//                                },{
//                                        xtype:'hidden',
//                                        name: 'personCurrentToId',
//                                        id: 'personCurrentToId'
//                                      },{
//                                        xtype:'hidden',
//                                        name: 'personCurrentToAccountId',
//                                        id: 'personCurrentToAccountId'
//                                      },
//                                      	{xtype:'ZTESOFT.enum',
//                                    hideLabel : true,
//                                    hidden:true,
////                                           fieldLabel : '<font color="red">*</font>当前状态',
//                                                name : 'currentStatus',
//                                                id : 'currentStatus',
//                                                valueField: 'dataValue',
//                                                displayField: 'dataName',
//                                                mode: 'local',
//                                                triggerAction: 'all',
//                                                editable : false ,
//                                                typeAhead : true,
//                                                value: testCardOrderDetailCurrentStatus,
//                                                dict: true,
//                                                dictType:'TESTCARD_STATUS',
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
                                //////////////////////////////原代码↑
                                
                                
                                
                                
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
                                    width:510,
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
//                                                 eo.changeDifferenceTypeEnumId();   
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
//                                                eo.selectPer('personCurrentTo');
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
                    id:"detailWin2commitBut",
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
                },
                {
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    id:"detailWin2modBut",
                    hidden:true,
                    onClick:function(){
                        
//                        var a = Ext.getCmp('testCardQryResult').getSelectionModel().getSelections();
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
//                            for(var k=0;k<a.length;k++){
                                var p = new Ext.data.Record({"number":testCardOrderDetailNumberTmp,
                                "differenceTypeEnumId":Ext.getCmp('differenceTypeEnumId').getValue()
                                ,"differenceTypeEnumName":valusInfo.differenceTypeEnumId
                                ,"differentDetail":valusInfo.personCurrentTo
                                ,"personCurrentToId":valusInfo.personCurrentToId
                                ,"currentStatus":Ext.getCmp('currentStatus').getValue()
                                ,"cardId":testCardOrderDetailTestobjectId
                                ,"differencesRemarks":valusInfo.differencesRemarks});
                                
                                var st = Ext.getCmp(idtmp).getStore();
                                for(var j=0;j<st.data.items.length;j++){
                                    if(testCardOrderDetailNumberTmp==st.data.items[j].data.number){
                                    	
                                st.data.items[j].data.number = testCardOrderDetailNumberTmp;
                                st.data.items[j].data.differenceTypeEnumId = Ext.getCmp('differenceTypeEnumId').getValue();
                                st.data.items[j].data.differenceTypeEnumName = valusInfo.differenceTypeEnumId;
                                st.data.items[j].data.differentDetail = valusInfo.personCurrentTo;
                                st.data.items[j].data.personCurrentToId = valusInfo.personCurrentToId;
                                st.data.items[j].data.currentStatus = Ext.getCmp('currentStatus').getValue();
                                st.data.items[j].data.cardId = testCardOrderDetailTestobjectId;
                                st.data.items[j].data.differencesRemarks = valusInfo.differencesRemarks;
                                    	
//                                    	Ext.getCmp(idtmp).getStore().remove(st.data.items[j]);
                                               break;
                                    }}
//                                Ext.getCmp(idtmp).getStore().add(p);
                                Ext.getCmp(idtmp).getView().refresh();
//                            }
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
//                            for(var k=0;k<a.length;k++){
                            var p = new Ext.data.Record({"number":testCardOrderDetailNumberTmp,
                                "differenceTypeEnumId":Ext.getCmp('differenceTypeEnumId').getValue()
                                ,"differenceTypeEnumName":valusInfo.differenceTypeEnumId
                                ,"differentDetail":Ext.getCmp('currentStatus').getRawValue()
                                ,"personCurrentToId":valusInfo.personCurrentToId
                                ,"currentStatus":Ext.getCmp('currentStatus').getValue()
                                ,"cardId":testCardOrderDetailTestobjectId
                                ,"differencesRemarks":valusInfo.differencesRemarks});
                            var st = Ext.getCmp(idtmp).getStore();
                        for(var j=0;j<st.data.items.length;j++){
                            if(testCardOrderDetailNumberTmp==st.data.items[j].data.number){
                            	
                            	st.data.items[j].data.number = testCardOrderDetailNumberTmp;
                            	st.data.items[j].data.differenceTypeEnumId = Ext.getCmp('differenceTypeEnumId').getValue();
                            	st.data.items[j].data.differenceTypeEnumName = valusInfo.differenceTypeEnumId;
                            	st.data.items[j].data.differentDetail = Ext.getCmp('currentStatus').getRawValue();
                            	st.data.items[j].data.personCurrentToId = valusInfo.personCurrentToId;
                            	st.data.items[j].data.currentStatus = Ext.getCmp('currentStatus').getValue();
                            	st.data.items[j].data.cardId = testCardOrderDetailTestobjectId;
                            	st.data.items[j].data.differencesRemarks = valusInfo.differencesRemarks;
                            	
//                            	Ext.getCmp(idtmp).getStore().remove(st.data.items[j]);
                                       break;
                            }}
//                            Ext.getCmp(idtmp).getStore().add(p);
                            Ext.getCmp(idtmp).getView().refresh();
//                            }
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
            
            eo.changeDifferenceTypeEnumId();   
            
             formwin.show();
             
             Ext.getCmp('personCurrentToIdTR').hide();
             Ext.getCmp('personCurrentToIdTR2').hide();
             Ext.getCmp('currentStatusTR').hide();
             Ext.getCmp('currentStatusTR2').hide();
             //personCurrentToIdTR personCurrentToIdTR2 currentStatusTR currentStatusTR2
//             if(cardType == 1){ 
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
    
    //选择人
    this.selectPer = function(val){
    	
    	var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                      //  var _orgId = session.logonAccount.provinceCompanyId;
                                        var _orgId = null;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1"+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp(val+"Id").setValue(data.id);
                                            Ext.getCmp(val).setValue(data.text);
                                            Ext.getCmp(val+"AccountId").setValue(data.accountId);
                                        });
//    	TreeOper.singleUserTree({
//                onComplete: function(id,text,data){
//                    Ext.getCmp(val+"Id").setValue(id);
//                    Ext.getCmp(val+"AccountId").setValue(data.accountId);
//                    Ext.getCmp(val).setValue(text);
//                }
//            });
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
//                {
//                    columnWidth : 1,
//                    layout : 'form',
//                    labelWidth:150,
//                    items : [{
//                        xtype: 'combo',
//                        fieldLabel : '<font color="red">*</font>请选择下一步环节',
//                        name : 'nextActivityInsId',
//                        id : 'nextActivityInsId',
//                        valueField: 'value',
//                        displayField: 'text',
//                        allowBlank:false,
//                        blankText:'请选择下一环节!',
//                        mode: 'local',
//                        triggerAction: 'all',
//                        editable : false ,
//                        value: '',
//                        store: nextActivityInsIdStore,
//                        anchor : '95%'
//                        
//                    }]
//                },
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
//                        listeners: {
//                            click: function(n) {
//                                Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
//                            }
//                        }
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
//                        listeners: {
//                            click: function(n) {
//                                Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
//                            }
//                        }
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
//                                for(var i=0;i<a.length;i++){
//                                    
//                                }
//                                alert(a.length);
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
//                    var ob = new Object();
//                    ob.targetPerson = aaqq.childNodes[0];
//                    ob.nextActivityInsId = Ext.getCmp("nextActivityInsId").getValue();
                    //alert(aaqq.childNodes[0].id+"|"+val);
                    
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
    
    this.changeDifferenceTypeEnumId = function(){
        var val = Ext.getCmp("differenceTypeEnumId").getValue();
        if(val==1||val==3||val==4){
//            Ext.getCmp('personCurrentToIdTR').show();
//            Ext.getCmp('personCurrentTo').show();
//            Ext.getCmp('currentStatusTR').hide();
//            Ext.getCmp('currentStatus').hide();
        	
        	Ext.getCmp('personCurrentToIdTR').show();
            Ext.getCmp('personCurrentToIdTR2').show();
            Ext.getCmp('currentStatusTR').hide();
            Ext.getCmp('currentStatusTR2').hide();
            
            
            //personCurrentToIdTR personCurrentToIdTR2 currentStatusTR currentStatusTR2
        }
        if(val==2){
//            Ext.getCmp('currentStatusTR').show();
//            Ext.getCmp('currentStatus').show();
//            Ext.getCmp('personCurrentToIdTR').hide();
//            Ext.getCmp('personCurrentTo').hide();
        	
        	Ext.getCmp('currentStatusTR').show();
            Ext.getCmp('currentStatusTR2').show();
            Ext.getCmp('personCurrentToIdTR').hide();
            Ext.getCmp('personCurrentToIdTR2').hide();
        }
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
            
            eo.initAvailableNumGridToolsBarAdd(idtmp);
            
            }
        },"-");//加这个符号，会在页面上添加一个竖线分隔符
        if(operType=='modify'){
            tb.add({
            text : '修改',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
            	var a = Ext.getCmp(idtmp).getSelectionModel().getSelections();
            	if(a.length!=1){
                    Ext.Msg.alert("提示","请选择一条记录");
                    return;
                }
            testCardOrderDetailDifferenceTypeEnumId = a[0].data.differenceTypeEnumId;
            testCardOrderDetailCurrentStatus = a[0].data.currentStatus;
            eo.initAvailableNumGridToolsBarAdd(idtmp);
            Ext.getCmp("detailWin2modBut").setVisible(true);
            Ext.getCmp("detailWin2commitBut").setVisible(false);
            Ext.getCmp("testCardQryResult").setVisible(false);
            Ext.getCmp("tesetCardQueryToolbar").setVisible(false);
            
            Ext.getCmp("numberCheck").setValue("["+a[0].data.number+"]");
            Ext.getCmp("cardId").setValue(a[0].data.cardId);
            
            testCardOrderDetailNumberTmp = a[0].data.number;
            testCardOrderDetailTestobjectId = a[0].data.cardId;
            
            Ext.getCmp("differencesRemarks").setValue(a[0].data.differencesRemarks);
            if(a[0].data.differenceTypeEnumId!=2){//除状态变更
                Ext.getCmp("personCurrentTo").setValue(a[0].data.differentDetail);
            }
            Ext.getCmp("personCurrentToId").setValue(a[0].data.personCurrentToId);
            Ext.getCmp("differencesRemarks").setValue(a[0].data.differencesRemarks);
            eo.changeDifferenceTypeEnumId();   
            testCardOrderDetailCurrentStatus = "";//清空，避免下次点添加时有默认值
            testCardOrderDetailDifferenceTypeEnumId = "";//清空，避免下次点添加时有默认值
//            number cardId differenceTypeEnumId personCurrentTo personCurrentToId personCurrentToAccountId currentStatus differencesRemarks
            
//            {header:'测试卡编号',dataIndex:'number',width:body_width*0.5*0.25},
//                                         {header:'差异类型',dataIndex:'differenceTypeEnumName',width:body_width*0.5*0.25},
//                                         {header:'差异详细',dataIndex:'differentDetail',width:body_width*0.5*0.3},
//                                         {header:'差异备注',dataIndex:'differencesRemarks',width:body_width*0.5*0.3},
//                                         {header:'',dataIndex:'cardId',hidden:true},
//                                         {header:'',dataIndex:'differenceTypeEnumId',hidden:true},
//                                         {header:'',dataIndex:'personCurrentToId',hidden:true},
//                                         {header:'',dataIndex:'currentStatus',hidden:true}
            
            
            }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
        }
        tb.add({
            text : '删除',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                var a = Ext.getCmp(idtmp).getSelectionModel().getSelections();
                for(var i=0;i<a.length;i++){
                Ext.getCmp(idtmp).getStore().remove(a[i]);
            }
                Ext.getCmp(idtmp).getView().refresh();
            }
        });

        return tb;
    }
    
    //差异明细window
    this.differentDetail = function(AvailableNum,UnavailableNum,LendNum,aId,checkListId,type,aName){
    	if(cardType==""){
    		if(testCardChecktestobjectType!=null&&testCardChecktestobjectType!=""){
    		  cardType = testCardChecktestobjectType;
    		}
    	}
        operType = type;
        var differentFormPanel = this.initDifferentFormPanel(aName);
        
        var differentPanel = new Ext.Panel({
            id:'differentPanel',
            labelAlign: 'left',
            region: 'center',
//            layout: 'border',
            frame:true,
            autoScroll :true,
            width:720,//Ext.getBody().getSize(),
//            height:800,
//            bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
            labelWidth: 70,
            items: [differentFormPanel,
                    eo.initDifferentDetailGrid('AvailableNumGrid',AvailableNum>0?('库存可用数量比实际可用数量多<font color="red"><U>'+AvailableNum+'</U></font>'):(AvailableNum==0?('库存可用数量与实际可用数量相同'):('库存可用数量比实际可用数量少<font color="red"><U>'+Math.abs(AvailableNum)+'</U></font>')))
                    ,
                    eo.initDifferentDetailGrid('UnavailableNumGrid',UnavailableNum>0?('库存不可用数量比实际不可用数量多<font color="red"><U>'+UnavailableNum+'</U></font>'):(UnavailableNum==0?('库存不可用数量与实际不可用数量相同'):('库存不可用数量比实际不可用数量少<font color="red"><U>'+Math.abs(UnavailableNum)+'</U></font>')))
                    ,
                    eo.initDifferentDetailGrid('LendNumGrid',LendNum>0?('库存借出数量比实际借出数量多<font color="red"><U>'+LendNum+'</U></font>'):(LendNum==0?('库存借出数量与实际借出数量相同'):('库存借出数量比实际借出数量少<font color="red"><U>'+Math.abs(LendNum)+'</U></font>')))] 
        });
        var AvailableNum = Math.abs(AvailableNum);
		var UnavailableNum = Math.abs(UnavailableNum);
		var LendNum = Math.abs(LendNum);
        
        if(checkListId!=""&&haveLoad==0){
            
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
//                      var ro = response.rows;
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
            modal:true,
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
                        ob.personCurrentToId = AvailableNumSto.data.items[i].data.personCurrentToId;
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
                    haveLoad = 1;
                    hadModifyDefferenceList = 1;
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
}