<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<%@ include file="../common/deeptree/include/rmGlobal.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>测试卡查询</title>

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
<script language="javascript" src="./js/jsonStroe.js" ></script>    
<script language="javascript" src="./js/testCardManageMod.js" ></script>
<script language="javascript" src="./js/testCardReadHistory.js"></script>
<script language="javascript" src="./js/testCardOrderDetail.js"></script>

<!-- 组织树文件引入 -->
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showFreetreeWin.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/deeptree/css/deeptree.css"/>
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showDeeptreeWin.js"></script>
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.mulCombox.js"></script>
</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script type="text/javascript">
    var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var ctPnHeight = 80;
    var qryPnHeight = 150;
    var qryPnWidth = 680;
    var gridPnHeight = body_height - 35;
    var gridWidth = body_width;
    var cnt = 15; //列表每页显示多少条数据
    var testCardQryWidth = 160;
	var testCardQryParams = null; 
	var teleCardQryParams = null;
	var terminalQryParams = null;
	var rechCardQryParams = null;  
	
	var testCardTestProvinceId = session.logonAccount.provinceCompanyId;
	var testCardTestCityId = null;
	var testCardTestTypeEnumId = null;
	var testCardTestStatusEnumIdQry = null;  
	var terminalTermiProvinceId = null;
	var terminalTermiCityId = null;
	var terminalTermiMoblieTypeEnumId = null;
	var teleCardTeleProvinceId = null;
	var teleCardTeleCityId = null;
	var teleCardTelePhoneTypeEnumId = null;
	var rechCardRechProvinceId = null;
	var rechCardRechCityId = null;
	var rechCardRechParValue = null; 
	var testCardQryProvinceCompanyIdGlo = null;//初始化的时候当前登录人的省id
	var testCardQryProvinceCompanyNameGlo = null;//初始化的时候当前登录人的省名称

    /*初始化查询测试卡信息*/
    var qryParams = {testobjectTypeEnumId:1,gridName:'testGrid',unUsedCard:0};

    var oper = new PageOper();
    var manager = new ManagerOper();
    var modOper = new TestCardModOper();
    var hisOper = new TestCardHistoryOper();
    var stroe = new jsonStroe();
    var orderDet = new DetailWin();
    
    var testCardEnum = 1;//测试卡枚举值
    var terminalEnum = 2;//测试终端枚举值
    var teleCardEnum = 3;//固定电话枚举值
    var rechCardEnum = 4;//充值卡枚举值
	var testCardQryQryWindow = null;
	
	var testCardQryIsNotGroupCompany = false;
    
    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 
		if(session.logonAccount.orgType!="GroupCompany"){
			testCardQryProvinceCompanyIdGlo = session.logonAccount.provinceCompanyId;
			testCardQryProvinceCompanyNameGlo = session.logonAccount.provinceCompanyName;
			qryParams.attributionProvinceId = session.logonAccount.provinceCompanyId;
			testCardQryIsNotGroupCompany=true;
		}

        oper.init();
		testCardQryQryWindow = oper.initQryWin();
        oper.doQry();
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

        //初始化主面板

        this.initMainPanel = function() {
           var tbar = this.initGridToolsBar();
           var listPanel = this.listPanel();
            //主面板
            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',
                items : [tbar,listPanel]
            });
            return mainPanel;
        }
        
        this.listPanel = function(){
          //测试卡grid
            var  testPanel = this.initTestGrid();
            //固定电话grid
            var telePanel = this.initTeleGrid();
          //测试终端grid
            var termiPanel = this.initTermiGrid();
          //充值卡grid
            var rechPanel = this.initRechGrid();
          
            var listPanel = new Ext.Panel({
                region : 'center',
                layout : 'anchor',
                items : [testPanel,telePanel,termiPanel,rechPanel]
            });
            return listPanel;
        }
        
        this.initQryWin = function(){
          //测试卡类型选择
            var ctForm = this.initCardTypePn();
			//查询方式选择
			//var queryTypePn = this.initQueryTypePn();
			
            //测试卡查询form
            var qryTestFrom = this.initTestQryPn();
			
            //固定电话查询FORM
            var qryTeleForm = this.initTeleQryPn();
			
            //测试终端查询form
            var qryTermiForm = this.initTermiQryPn();
			
            //充值卡查询form
           var qryRechForm =  this.initRechQryPn();
		   
            
           return new Ext.Window({
               id:'qryWin',
               title: '高级检索',
               closable:true,
               width: testCardQryWidth*4+20+20+10+35,
               height: 430,
               plain:true,
               modal: true,
               layout : 'anchor',
               items: [ctForm,qryTestFrom,qryTeleForm,qryTermiForm,qryRechForm],
               buttonAlign:'center',
               buttons : [{
                   text : '查询',
                   id: 'qryBtn',
                   xtype: 'ZTESOFT.Button',
                   listeners : {
                       "click" : function() {
                           var ret = oper.winQuery();
						   if(ret==null&&ret!="notClose"){
						   testCardQryQryWindow.hide();
                            //Ext.getCmp('qryWin').close();
                           }
                       }
                   }
               }, {
                   text: '重置',
                   id : 'reset',
                   xtype: 'ZTESOFT.Button',
                   onClick:function(){
                       oper.resetWin();
                   }
               },{
                   text : '关闭',
                   xtype: 'ZTESOFT.Button',
                   listeners : {
                       "click" : function() {
							testCardQryQryWindow.hide();
                           //Ext.getCmp('qryWin').close();
                       }
                   }
               }]
           });//.show();
		   /*var ob = new Object();
              ob.data = testCardQryParams;
              Ext.getCmp('qryTestForm').getForm().loadRecord(ob);
			  ob.data = teleCardQryParams;
              Ext.getCmp('qryTeleForm').getForm().loadRecord(ob);
			  ob.data = terminalQryParams;
              Ext.getCmp('qryTermiForm').getForm().loadRecord(ob);
			  ob.data = rechCardQryParams;
		   Ext.getCmp('qryRechForm').getForm().loadRecord(ob);
           this.loadQryWin();*/
        }
        
        this.resetWin = function(){
            var ctPara = Ext.getCmp('ctForm').getForm().getValues();
            var typeId = ctPara.testobjectTypeEnumId;
			var queryTypeName = ctPara.queryTypeName;
            if(typeId == testCardEnum){//测试卡
				//测试卡存放地查询条件
			var testStorageCityId = Ext.getCmp('testStorageCityId').getValue();
			var testStorageCityName = Ext.getCmp('testStorageCityName').getValue();
			var storageDepartmentName1 = Ext.getCmp('storageDepartmentName1').getValue();
			var storageDepartmentId1 = Ext.getCmp('storageDepartmentId1').getValue();
                Ext.getCmp('qryTestForm').getForm().reset();
				if(queryTypeName==1){
					
				}else if(queryTypeName==2){
					Ext.getCmp('testProvinceId').setValue('');
					Ext.getCmp('testProvinceName').setValue('');
					Ext.getCmp('testStorageCityId').setValue(testStorageCityId);
					Ext.getCmp('testStorageCityName').setValue(testStorageCityName);
					Ext.getCmp('storageDepartmentName1').setValue(storageDepartmentName1);
					Ext.getCmp('storageDepartmentId1').setValue(storageDepartmentId1);
				}
                //Ext.getCmp('testProvinceId').setValue('');
                Ext.getCmp('testTypeEnumId').setValue('');
                Ext.getCmp('testStatusEnumIdQry').setValue('');
                Ext.getCmp('testStatusEnumQryName').setValue('');
            }else if(typeId == teleCardEnum){//固话
			//固话存放地查询条件
			var teleStorageCityId = Ext.getCmp('teleStorageCityId').getValue();
			var teleStorageCityName = Ext.getCmp('teleStorageCityName').getValue();
			var storageDepartmentName2 = Ext.getCmp('storageDepartmentName2').getValue();
			var storageDepartmentId2 = Ext.getCmp('storageDepartmentId2').getValue();
                Ext.getCmp('qryTeleForm').getForm().reset();
				if(queryTypeName==1){
					
				}else if(queryTypeName==2){
					Ext.getCmp('teleProvinceId').setValue('');
					Ext.getCmp('teleProvinceName').setValue('');
					Ext.getCmp('teleStorageCityId').setValue(teleStorageCityId);
					Ext.getCmp('teleStorageCityName').setValue(teleStorageCityName);
					Ext.getCmp('storageDepartmentName2').setValue(storageDepartmentName2);
					Ext.getCmp('storageDepartmentId2').setValue(storageDepartmentId2);
				}
                //Ext.getCmp('teleProvinceId').setValue('');
                Ext.getCmp('telePhoneTypeEnumId').setValue('');
                Ext.getCmp('teleStatusEnumIdQry').setValue('');
                Ext.getCmp('teleStatusEnumQryName').setValue('');
            }else if(typeId == terminalEnum){//终端
			//终端存放地查询条件
			var termiStorageCityId = Ext.getCmp('termiStorageCityId').getValue();
			var termiStorageCityName = Ext.getCmp('termiStorageCityName').getValue();
			var storageDepartmentName3 = Ext.getCmp('storageDepartmentName3').getValue();
			var storageDepartmentId3 = Ext.getCmp('storageDepartmentId3').getValue();
                Ext.getCmp('qryTermiForm').getForm().reset();
				if(queryTypeName==1){
					
				}else if(queryTypeName==2){
					Ext.getCmp('termiProvinceId').setValue('');
					Ext.getCmp('termiProvinceName').setValue('');
					Ext.getCmp('termiStorageCityId').setValue(termiStorageCityId);
					Ext.getCmp('termiStorageCityName').setValue(termiStorageCityName);
					Ext.getCmp('storageDepartmentName3').setValue(storageDepartmentName3);
					Ext.getCmp('storageDepartmentId3').setValue(storageDepartmentId3);
				}
                //Ext.getCmp('termiProvinceId').setValue('');
                Ext.getCmp('termiMoblieTypeEnumId').setValue('');
                Ext.getCmp('termiStatusEnumIdQry').setValue('');
                Ext.getCmp('termiStatusEnumQryName').setValue('');
            }else if(typeId == rechCardEnum){//充值卡
			//充值卡存放地查询条件
			var rechStorageCityId = Ext.getCmp('rechStorageCityId').getValue();
			var rechStorageCityName = Ext.getCmp('rechStorageCityName').getValue();
			var storageDepartmentName4 = Ext.getCmp('storageDepartmentName4').getValue();
			var storageDepartmentId4 = Ext.getCmp('storageDepartmentId4').getValue();
                Ext.getCmp('qryRechForm').getForm().reset();
				if(queryTypeName==1){
					
				}else if(queryTypeName==2){
					Ext.getCmp('rechProvinceId').setValue('');
					Ext.getCmp('rechProvinceName').setValue('');
					Ext.getCmp('rechStorageCityId').setValue(rechStorageCityId);
					Ext.getCmp('rechStorageCityName').setValue(rechStorageCityName);
					Ext.getCmp('storageDepartmentName4').setValue(storageDepartmentName4);
					Ext.getCmp('storageDepartmentId4').setValue(storageDepartmentId4);
				}
				Ext.getCmp('rechStatusEnumIdQry').setValue('');
				Ext.getCmp('rechStatusEnumQryName').setValue('');
				//Ext.getCmp('rechProvinceId').setValue('');
            }
        }
        
        this.loadQryWin = function(){
            var typeId = qryParams.testobjectTypeEnumId;
            Ext.getCmp('cardType').setValue(typeId);
			//Ext.getCmp('queryType').setValue(1);
        }
        this.winQuery = function(){
            var ctPara = Ext.getCmp('ctForm').getForm().getValues();
            var testobjectType = ctPara.testobjectTypeEnumId;
			var queryTypeName = ctPara.queryTypeName;
            var param = {};
            param.unUsedCard = 1;//报废状态,判断是否查询报废的卡,0为不查询报废的卡
            if(testobjectType == testCardEnum){
            if(Ext.getCmp('testStatusEnumIdQry').getValue()){
                	param.testStatusEnumId =Ext.getCmp('testStatusEnumIdQry').getValue();
                	param.unUsedCard = 1;
                }
			if(Ext.getCmp('testCancelDateStartQry').getValue()!=""&&Ext.getCmp('testCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('testCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('testCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
			/*if(queryTypeName==1){
				if((Ext.getCmp('testProvinceId').getValue()==""||Ext.getCmp('testProvinceId').getValue()==null)
				&&(Ext.getCmp('testCityId').getValue()==""||Ext.getCmp('testCityId').getValue()==null)){
					Ext.Msg.alert("提示","查询模式为按归属地情况下，请选择归属省份或归属地市！");return "notClose";
				}
				param.attributionProvinceId = Ext.getCmp('testProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('testCityId').getValue();
			}else if(queryTypeName==2){
				if((Ext.getCmp('testStorageCityName').getValue()==""||Ext.getCmp('testStorageCityName').getValue()==null)
				&&(Ext.getCmp('storageDepartmentName1').getValue()==""||Ext.getCmp('storageDepartmentName1').getValue()==null)){
					Ext.Msg.alert("提示","查询模式为按存放地情况下，请选择存放地市或存放部门！");return "notClose";
				}
				param.storageCityId = Ext.getCmp('testStorageCityId').getValue();
                param.storageCityName = Ext.getCmp('testStorageCityName').getValue();
                param.storageDepartmentName =Ext.getCmp('storageDepartmentName1').getValue();
                param.storageDepartmentId = Ext.getCmp('storageDepartmentId1').getValue();
			}*/
							
                param.testobjectTypeEnumId = testobjectType;
                //存放地市
                param.storageCityId = Ext.getCmp('testStorageCityId').getValue();
                param.storageCityName = Ext.getCmp('testStorageCityName').getValue();
                param.storageDepartmentName =Ext.getCmp('storageDepartmentName1').getValue();
                param.storageDepartmentId = Ext.getCmp('storageDepartmentId1').getValue();
                param.attributionProvinceId = Ext.getCmp('testProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('testCityId').getValue();
                param.testcardTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
                param.number = Ext.getCmp('testNumber').getValue();
                param.subscriberNumber = Ext.getCmp('testSubscriberNumber').getValue();
              //  param.testcardStatusEnumId = Ext.getCmp('testStatusEnumIdQry').getValue();
                param.adminId = Ext.getCmp('testAdminId').getValue();
                param.gridName = 'testGrid';
				param.testCancelDateStartQry = Ext.getCmp('testCancelDateStartQry').getValue();
                param.testCancelDateEndQry = Ext.getCmp('testCancelDateEndQry').getValue();
				
				testCardTestProvinceId = Ext.getCmp('testProvinceId').getValue();
                testCardTestCityId = Ext.getCmp('testCityId').getValue();
                testCardTestTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
                testCardTestStatusEnumIdQry = Ext.getCmp('testStatusEnumIdQry').getValue();
                testCardQryParams = Ext.getCmp('qryTestForm').getForm().getValues();
                testCardQryParams.testProvinceId = null;
                testCardQryParams.testCityId = null;
                testCardQryParams.testTypeEnumId = null;
                testCardQryParams.testStatusEnumIdQry = null;
                testCardQryParams.testStorageCityId = null;
				testCardQryParams.testCancelDateStartQry = Ext.getCmp('testCancelDateStartQry').getValue();
                testCardQryParams.testCancelDateEndQry = Ext.getCmp('testCancelDateEndQry').getValue();
            }else if(testobjectType == teleCardEnum){       
				if(Ext.getCmp('teleCancelDateStartQry').getValue()!=""&&Ext.getCmp('teleCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('teleCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('teleCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
                    if(Ext.getCmp('teleStatusEnumIdQry').getValue()){
                    param.teleStatusEnumId =Ext.getCmp('teleStatusEnumIdQry').getValue();
                    param.unUsedCard = 1;
                }        
				/*if(queryTypeName==1){
					if((Ext.getCmp('teleProvinceId').getValue()==""||Ext.getCmp('teleProvinceId').getValue()==null)
					&&(Ext.getCmp('teleCityId').getValue()==""||Ext.getCmp('teleCityId').getValue()==null)){
						Ext.Msg.alert("提示","查询模式为按归属地情况下，请选择归属省份或归属地市！");return "notClose";
					}
					param.attributionProvinceId = Ext.getCmp('teleProvinceId').getValue();
					param.attributionCityId = Ext.getCmp('teleCityId').getValue();
				}else if(queryTypeName==2){
					if((Ext.getCmp('teleStorageCityName').getValue()==""||Ext.getCmp('teleStorageCityName').getValue()==null)
					&&(Ext.getCmp('storageDepartmentName2').getValue()==""||Ext.getCmp('storageDepartmentName2').getValue()==null)){
						Ext.Msg.alert("提示","查询模式为按存放地情况下，请选择存放地市或存放部门！");return "notClose";
					}
					param.storageCityId = Ext.getCmp('teleStorageCityId').getValue();
					param.storageCityName = Ext.getCmp('teleStorageCityName').getValue();
					param.storageDepartmentName =Ext.getCmp('storageDepartmentName2').getValue();
					param.storageDepartmentId = Ext.getCmp('storageDepartmentId2').getValue();
				}		*/	
                param.testobjectTypeEnumId = testobjectType;
                param.storageCityId = Ext.getCmp('teleStorageCityId').getValue();
                param.storageCityName = Ext.getCmp('teleStorageCityName').getValue();
                param.storageDepartmentName =Ext.getCmp('storageDepartmentName2').getValue();
                param.storageDepartmentId = Ext.getCmp('storageDepartmentId2').getValue();
                param.attributionProvinceId = Ext.getCmp('teleProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('teleCityId').getValue();
                param.phoneNumber = Ext.getCmp('telePhoneNumber').getValue();
                param.fixedPhoneTypeEnumId = Ext.getCmp('telePhoneTypeEnumId').getValue();
                param.adminId = Ext.getCmp('teleAdminId').getValue();
                param.gridName = 'teleGrid';
				param.teleCancelDateStartQry = Ext.getCmp('teleCancelDateStartQry').getValue();
                param.teleCancelDateEndQry = Ext.getCmp('teleCancelDateEndQry').getValue();
				
				teleCardTeleProvinceId = Ext.getCmp('teleProvinceId').getValue();
                teleCardTeleCityId = Ext.getCmp('teleCityId').getValue();
                teleCardTelePhoneTypeEnumId = Ext.getCmp('telePhoneTypeEnumId').getValue();
                teleCardQryParams = Ext.getCmp('qryTeleForm').getForm().getValues();
                teleCardQryParams.teleProvinceId = null;
                teleCardQryParams.teleCityId = null;
                teleCardQryParams.telePhoneTypeEnumId = null;
                teleCardQryParams.teleStorageCityId = null;
				teleCardQryParams.teleCancelDateStartQry = Ext.getCmp('teleCancelDateStartQry').getValue();
                teleCardQryParams.teleCancelDateEndQry = Ext.getCmp('teleCancelDateEndQry').getValue();
            }else if(testobjectType == terminalEnum){
			if(Ext.getCmp('termiCancelDateStartQry').getValue()!=""&&Ext.getCmp('termiCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('termiCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('termiCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
                  if(Ext.getCmp('termiStatusEnumIdQry').getValue()){
                    param.termiStatusEnumId =Ext.getCmp('termiStatusEnumIdQry').getValue();
                    param.unUsedCard = 1;
                }
				/*if(queryTypeName==1){
					if((Ext.getCmp('termiProvinceId').getValue()==""||Ext.getCmp('termiProvinceId').getValue()==null)
					&&(Ext.getCmp('termiCityId').getValue()==""||Ext.getCmp('termiCityId').getValue()==null)){
						Ext.Msg.alert("提示","查询模式为按归属地情况下，请选择归属省份或归属地市！");return "notClose";
					}
					param.attributionProvinceId = Ext.getCmp('termiProvinceId').getValue();
					param.attributionCityId = Ext.getCmp('termiCityId').getValue();
				}else if(queryTypeName==2){
					if((Ext.getCmp('termiStorageCityName').getValue()==""||Ext.getCmp('termiStorageCityName').getValue()==null)
					&&(Ext.getCmp('storageDepartmentName3').getValue()==""||Ext.getCmp('storageDepartmentName3').getValue()==null)){
						Ext.Msg.alert("提示","查询模式为按存放地情况下，请选择存放地市或存放部门！");return "notClose";
					}
					param.storageCityId = Ext.getCmp('termiStorageCityId').getValue();
					param.storageCityName = Ext.getCmp('termiStorageCityName').getValue();
					param.storageDepartmentName =Ext.getCmp('storageDepartmentName3').getValue();
					param.storageDepartmentId = Ext.getCmp('storageDepartmentId3').getValue();
				}		*/	
                param.testobjectTypeEnumId = testobjectType;
                param.storageCityId = Ext.getCmp('termiStorageCityId').getValue();
                param.storageCityName = Ext.getCmp('termiStorageCityName').getValue();
                param.storageDepartmentName =Ext.getCmp('storageDepartmentName3').getValue();
                param.storageDepartmentId = Ext.getCmp('storageDepartmentId3').getValue();
                param.attributionProvinceId = Ext.getCmp('termiProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('termiCityId').getValue();
                param.manufacturerName = Ext.getCmp('termiManufacturer').getValue();
                param.number = Ext.getCmp('termiNumber').getValue();
                param.moblieTypeEnumId = Ext.getCmp('termiMoblieTypeEnumId').getValue();
                param.adminId = Ext.getCmp('termiAdminId').getValue();
                param.gridName = 'termiGrid';
				param.termiCancelDateStartQry = Ext.getCmp('termiCancelDateStartQry').getValue();
                param.termiCancelDateEndQry = Ext.getCmp('termiCancelDateEndQry').getValue();
				
				terminalTermiProvinceId = Ext.getCmp('termiProvinceId').getValue();
                terminalTermiCityId = Ext.getCmp('termiCityId').getValue();
                terminalTermiMoblieTypeEnumId = Ext.getCmp('termiMoblieTypeEnumId').getValue();
                terminalQryParams = Ext.getCmp('qryTermiForm').getForm().getValues();
                terminalQryParams.termiProvinceId = null;
                terminalQryParams.termiCityId = null;
                terminalQryParams.termiMoblieTypeEnumId = null;
                terminalQryParams.termiStorageCityId = null;
				terminalQryParams.termiCancelDateStartQry = Ext.getCmp('termiCancelDateStartQry').getValue();
                terminalQryParams.termiCancelDateEndQry = Ext.getCmp('termiCancelDateEndQry').getValue();
            }else if(testobjectType == rechCardEnum){
			if(Ext.getCmp('rechCancelDateStartQry').getValue()!=""&&Ext.getCmp('rechCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('rechCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('rechCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
                 if(Ext.getCmp('rechStatusEnumIdQry').getValue()){
                    param.rechStatusEnumId =Ext.getCmp('rechStatusEnumIdQry').getValue();
                    param.unUsedCard = 1;
                }
				/*if(queryTypeName==1){
					if((Ext.getCmp('rechProvinceId').getValue()==""||Ext.getCmp('rechProvinceId').getValue()==null)
					&&(Ext.getCmp('rechCityId').getValue()==""||Ext.getCmp('rechCityId').getValue()==null)){
						Ext.Msg.alert("提示","查询模式为按归属地情况下，请选择归属省份或归属地市！");return "notClose";
					}
					param.attributionProvinceId = Ext.getCmp('rechProvinceId').getValue();
					param.attributionCityId = Ext.getCmp('rechCityId').getValue();
				}else if(queryTypeName==2){
					if((Ext.getCmp('rechStorageCityName').getValue()==""||Ext.getCmp('rechStorageCityName').getValue()==null)
					&&(Ext.getCmp('storageDepartmentName4').getValue()==""||Ext.getCmp('storageDepartmentName4').getValue()==null)){
						Ext.Msg.alert("提示","查询模式为按存放地情况下，请选择存放地市或存放部门！");return "notClose";
					}
					param.storageCityId = Ext.getCmp('rechStorageCityId').getValue();
					param.storageCityName = Ext.getCmp('rechStorageCityName').getValue();
					param.storageDepartmentName =Ext.getCmp('storageDepartmentName4').getValue();
					param.storageDepartmentId = Ext.getCmp('storageDepartmentId4').getValue();
				}	*/			
                param.testobjectTypeEnumId = testobjectType;
                param.storageCityId = Ext.getCmp('rechStorageCityId').getValue();
                param.storageCityName = Ext.getCmp('rechStorageCityName').getValue();
                param.storageDepartmentName =Ext.getCmp('storageDepartmentName4').getValue();
                param.storageDepartmentId = Ext.getCmp('storageDepartmentId4').getValue();
                param.attributionProvinceId = Ext.getCmp('rechProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('rechCityId').getValue();
                param.cardNo = Ext.getCmp('rechCardNo').getValue();
                param.parValue = Ext.getCmp('rechParValue').getValue();
                param.adminId = Ext.getCmp('rechAdminId').getValue();
                param.gridName = 'rechGrid';
				param.rechCancelDateStartQry = Ext.getCmp('rechCancelDateStartQry').getValue();
                param.rechCancelDateEndQry = Ext.getCmp('rechCancelDateEndQry').getValue();
				
				rechCardRechProvinceId = Ext.getCmp('rechProvinceId').getValue();
                rechCardRechCityId = Ext.getCmp('rechCityId').getValue();
//                rechCardRechParValue = Ext.getCmp('rechParValue').getValue();
                rechCardQryParams = Ext.getCmp('qryRechForm').getForm().getValues();
                rechCardQryParams.rechProvinceId = null;
                rechCardQryParams.rechCityId = null;
                rechCardQryParams.rechStorageCityId = null;
                rechCardQryParams.rechParValue = Ext.getCmp('rechParValue').getValue();
				rechCardQryParams.rechCancelDateStartQry = Ext.getCmp('rechCancelDateStartQry').getValue();
                rechCardQryParams.rechCancelDateEndQry = Ext.getCmp('rechCancelDateEndQry').getValue();
            }
            
            qryParams = param;
            
            oper.doQry();
        }
        
        this.initCardTypePn = function(){
            var ctForm = new Ext.FormPanel({
                id : 'ctForm',
                region : 'north',
                buttonAlign : 'right',
                //title : '测试卡类型',
                frame : true,
                layoutConfig : {
                    columns : 6
                },
                layout : 'table',
                bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : testCardQryWidth*4/6,
                    height : 30
                },
                items : [
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '测试卡类型'
                        }
                    },
                    {
                        colspan : 5,
                        width : testCardQryWidth*4/6*5,
                        items : {
                            xtype: 'radiogroup',
                            hideLabel : true,
                            id : 'cardType',
                            name : 'cardType',
                            anchor : '100%',
                            items: [
                                    {boxLabel: '测试卡', name: 'testobjectTypeEnumId', inputValue: 1},
                                    {boxLabel: '测试终端', name: 'testobjectTypeEnumId', inputValue: 2},
                                    {boxLabel: '固定电话', name: 'testobjectTypeEnumId', inputValue: 3},
                                    {boxLabel: '充值卡', name: 'testobjectTypeEnumId', inputValue: 4}
                            ],
                            listeners : {
                                change : function(radiofield,oldvalue){          
                                    if(radiofield.getValue().inputValue == testCardEnum){ 
                                        Ext.getCmp('testGrid').setVisible(true);
                                        Ext.getCmp('teleGrid').setVisible(false);
                                        Ext.getCmp('termiGrid').setVisible(false);
                                        Ext.getCmp('rechGrid').setVisible(false);
    
                                        Ext.getCmp('qryTestForm').setVisible(true);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == teleCardEnum){
                                        Ext.getCmp('testGrid').setVisible(false);
                                        Ext.getCmp('teleGrid').setVisible(true);
                                        Ext.getCmp('termiGrid').setVisible(false);
                                        Ext.getCmp('rechGrid').setVisible(false);
    
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(true);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == terminalEnum){
                                        Ext.getCmp('testGrid').setVisible(false);
                                        Ext.getCmp('teleGrid').setVisible(false);
                                        Ext.getCmp('termiGrid').setVisible(true);
                                        Ext.getCmp('rechGrid').setVisible(false);
    
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(true);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == rechCardEnum){
                                        Ext.getCmp('testGrid').setVisible(false);
                                        Ext.getCmp('teleGrid').setVisible(false);
                                        Ext.getCmp('termiGrid').setVisible(false);
                                        Ext.getCmp('rechGrid').setVisible(true);
    
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(true);
                                    }
                                }
                            }
                        }
                    },
					{
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '查询方式'
                        }
                    },
                    {
                        colspan : 5,
                        width : testCardQryWidth*4/6*5,
                        items : {
                            xtype: 'radiogroup',
                            hideLabel : true,
                            id : 'queryType',
                            name : 'queryType',
                            anchor : '100%',
                            items: [
                                    {boxLabel: '按归属地查询', name: 'queryTypeName', inputValue: 1},
                                    {boxLabel: '按存放地查询', name: 'queryTypeName', inputValue: 2}
                            ],
                            listeners : {
                                change : function(radiofield,oldvalue){          
                                    if(radiofield.getValue().inputValue==1){//按归属地查询，默认归属省份
										//测试卡
										Ext.getCmp("testProvinceName").setValue(testCardQryProvinceCompanyNameGlo);//默认归属省份，设为只读
										Ext.getCmp("testProvinceId").setValue(testCardQryProvinceCompanyIdGlo);
										Ext.getCmp("testProvinceName").setReadOnly(true);
										Ext.getCmp("testStorageCityName").setValue("");//清空存放地市，设为可用
										Ext.getCmp("testStorageCityId").setValue("");
										Ext.getCmp("testStorageCityName").setDisabled(false);
										Ext.getCmp("storageDepartmentName1").setValue("");//清空存放部门，设为可用
										Ext.getCmp("storageDepartmentId1").setValue("");
										Ext.getCmp("storageDepartmentName1").setDisabled(false);
										Ext.getCmp("testCityId").setValue("");//清空归属地市
										var cityCombo = Ext.getCmp('testCityId');//初始化归属地市下来列表
										cityCombo.clearValue();
										cityCombo.getStore().proxy = new Ext.data.HttpProxy({
											url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
											method:'post'
										});
										cityCombo.getStore().load();
										
										//固话
										Ext.getCmp("teleProvinceName").setValue(testCardQryProvinceCompanyNameGlo);//默认归属省份，设为只读
										Ext.getCmp("teleProvinceId").setValue(testCardQryProvinceCompanyIdGlo);
										Ext.getCmp("teleProvinceName").setReadOnly(true);
										Ext.getCmp("teleStorageCityName").setValue("");//清空存放地市，设为可用
										Ext.getCmp("teleStorageCityId").setValue("");
										Ext.getCmp("teleStorageCityName").setDisabled(false);
										Ext.getCmp("storageDepartmentName2").setValue("");//清空存放部门，设为可用
										Ext.getCmp("storageDepartmentId2").setValue("");
										Ext.getCmp("storageDepartmentName2").setDisabled(false);
										Ext.getCmp("teleCityId").setValue("");//清空归属地市
										var cityCombo = Ext.getCmp('teleCityId');//初始化归属地市下来列表
										cityCombo.clearValue();
										cityCombo.getStore().proxy = new Ext.data.HttpProxy({
											url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
											method:'post'
										});
										cityCombo.getStore().load();
										
										//终端
										Ext.getCmp("termiProvinceName").setValue(testCardQryProvinceCompanyNameGlo);//默认归属省份，设为只读
										Ext.getCmp("termiProvinceId").setValue(testCardQryProvinceCompanyIdGlo);
										Ext.getCmp("termiProvinceName").setReadOnly(true);
										Ext.getCmp("termiStorageCityName").setValue("");//清空存放地市，设为可用
										Ext.getCmp("termiStorageCityId").setValue("");
										Ext.getCmp("termiStorageCityName").setDisabled(false);
										Ext.getCmp("storageDepartmentName3").setValue("");//清空存放部门，设为可用
										Ext.getCmp("storageDepartmentId3").setValue("");
										Ext.getCmp("storageDepartmentName3").setDisabled(false);
										Ext.getCmp("termiCityId").setValue("");//清空归属地市
										var cityCombo = Ext.getCmp('termiCityId');//初始化归属地市下来列表
										cityCombo.clearValue();
										cityCombo.getStore().proxy = new Ext.data.HttpProxy({
											url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
											method:'post'
										});
										cityCombo.getStore().load();
										
										//充值卡
										Ext.getCmp("rechProvinceName").setValue(testCardQryProvinceCompanyNameGlo);//默认归属省份，设为只读
										Ext.getCmp("rechProvinceId").setValue(testCardQryProvinceCompanyIdGlo);
										Ext.getCmp("rechProvinceName").setReadOnly(true);
										Ext.getCmp("rechStorageCityName").setValue("");//清空存放地市，设为可用
										Ext.getCmp("rechStorageCityId").setValue("");
										Ext.getCmp("rechStorageCityName").setDisabled(false);
										Ext.getCmp("storageDepartmentName4").setValue("");//清空存放部门，设为可用
										Ext.getCmp("storageDepartmentId4").setValue("");
										Ext.getCmp("storageDepartmentName4").setDisabled(false);
										Ext.getCmp("rechCityId").setValue("");//清空归属地市
										var cityCombo = Ext.getCmp('rechCityId');//初始化归属地市下来列表
										cityCombo.clearValue();
										cityCombo.getStore().proxy = new Ext.data.HttpProxy({
											url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
											method:'post'
										});
										cityCombo.getStore().load();
									}else if(radiofield.getValue().inputValue==2){//按存放地查询，默认存放地市
										//测试卡
										if(session.logonAccount.orgType=="CityCompany"){//如果账号是地市账号，则设置存放地市
											Ext.getCmp("testStorageCityName").setValue(session.logonAccount.cityCompanyName);
											Ext.getCmp("testStorageCityId").setValue(session.logonAccount.cityCompanyId);
										}else{
											Ext.getCmp("testStorageCityName").setValue("");
											Ext.getCmp("testStorageCityId").setValue("");
										}
										Ext.getCmp("testProvinceName").setReadOnly(false);//归属省份可用
										Ext.getCmp("testStorageCityName").setDisabled(true);//存放地市不可用
										Ext.getCmp("storageDepartmentName1").setValue(session.logonAccount.userDeptName);//默认存放部门，设为不可用
										Ext.getCmp("storageDepartmentId1").setValue(session.logonAccount.cloudOrgId);
										Ext.getCmp("storageDepartmentName1").setDisabled(true);
										
										//固话
										if(session.logonAccount.orgType=="CityCompany"){//如果账号是地市账号，则设置存放地市
											Ext.getCmp("teleStorageCityName").setValue(session.logonAccount.cityCompanyName);
											Ext.getCmp("teleStorageCityId").setValue(session.logonAccount.cityCompanyId);
										}else{
											Ext.getCmp("teleStorageCityName").setValue("");
											Ext.getCmp("teleStorageCityId").setValue("");
										}
										Ext.getCmp("teleProvinceName").setReadOnly(false);//归属省份可用
										Ext.getCmp("teleStorageCityName").setDisabled(true);//存放地市不可用
										Ext.getCmp("storageDepartmentName2").setValue(session.logonAccount.userDeptName);//默认存放部门，设为不可用
										Ext.getCmp("storageDepartmentId2").setValue(session.logonAccount.cloudOrgId);
										Ext.getCmp("storageDepartmentName2").setDisabled(true);
										
										//终端
										if(session.logonAccount.orgType=="CityCompany"){//如果账号是地市账号，则设置存放地市
											Ext.getCmp("termiStorageCityName").setValue(session.logonAccount.cityCompanyName);
											Ext.getCmp("termiStorageCityId").setValue(session.logonAccount.cityCompanyId);
										}else{
											Ext.getCmp("termiStorageCityName").setValue("");
											Ext.getCmp("termiStorageCityId").setValue("");
										}
										Ext.getCmp("termiProvinceName").setReadOnly(false);//归属省份可用
										Ext.getCmp("termiStorageCityName").setDisabled(true);//存放地市不可用
										Ext.getCmp("storageDepartmentName3").setValue(session.logonAccount.userDeptName);//默认存放部门，设为不可用
										Ext.getCmp("storageDepartmentId3").setValue(session.logonAccount.cloudOrgId);
										Ext.getCmp("storageDepartmentName3").setDisabled(true);
										
										//充值卡
										if(session.logonAccount.orgType=="CityCompany"){//如果账号是地市账号，则设置存放地市
											Ext.getCmp("rechStorageCityName").setValue(session.logonAccount.cityCompanyName);
											Ext.getCmp("rechStorageCityId").setValue(session.logonAccount.cityCompanyId);
										}else{
											Ext.getCmp("rechStorageCityName").setValue("");
											Ext.getCmp("rechStorageCityId").setValue("");
										}
										Ext.getCmp("rechProvinceName").setReadOnly(false);//归属省份可用
										Ext.getCmp("rechStorageCityName").setDisabled(true);//存放地市不可用
										Ext.getCmp("storageDepartmentName4").setValue(session.logonAccount.userDeptName);//默认存放部门，设为不可用
										Ext.getCmp("storageDepartmentId4").setValue(session.logonAccount.cloudOrgId);
										Ext.getCmp("storageDepartmentName4").setDisabled(true);
									}
                                }
                            }
                        }
                    }
                ]
            });
			Ext.getCmp('queryType').setValue(1);
            return ctForm;
        };
        
        this.doQry = function(){
            oper.qryListGrid(qryParams.gridName,qryParams);
        }

        this.initTestQryPn = function() {
        	//测试卡状态TESTCARD_STATUS
        	var testStatusEnumStore = new Ext.data.JsonStore({
        	    remoteSort: true,
        	    fields: ['dataValue', 'dataName'],
        	    proxy: new Ext.data.HttpProxy({
        	        url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=TESTCARD_STATUS',
        	        method : 'get'
        	    })
        	});
        	testStatusEnumStore.load();
            var qryTestForm = new Ext.FormPanel({
                id : 'qryTestForm',
                region : 'center',
                buttonAlign : 'right',
                title : '查询条件',
                frame : true,
                layoutConfig : {
                    columns : 3*2
                },
                layout : 'table',
                bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : testCardQryWidth*4/6,
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
/*                            xtype : 'ZTESOFT.enum',
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
                            value: testCardTestProvinceId,
                            anchor : '100%',*/
							
							xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'testProvinceName',
                            id : 'testProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
							readOnly:testCardQryIsNotGroupCompany,
                            value: testCardQryProvinceCompanyNameGlo,//session.logonAccount.provinceCompanyName,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%',
							
                            listeners:{
                                select: function(combo, record, index){
                                    var cityCombo = Ext.getCmp('testCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
                                    /*var testStorageCityCombo = Ext.getCmp('testStorageCityName');
                                //    testStorageCityCombo.clearValue();
                                   	testStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    testStorageCityCombo.getStore().load();*/
                                    Ext.getCmp("testProvinceId").setValue(combo.value);
                                }
                            }
                        },{
                            xtype : 'hidden',
							value:testCardQryProvinceCompanyIdGlo,//session.logonAccount.provinceCompanyId,
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
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'testCityId',
                            id : 'testCityId',
                            valueField : 'id',
                            displayField : 'text',
                            mode : 'local',
                            triggerAction : 'all',
                            forceSelect : true,
                            editable : true,
//                            value : '',
                            store : new Ext.data.JsonStore({
                                remoteSort: true,
                                fields: ['id', 'text']
                            }),
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '测试卡类别'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            name : 'testTypeEnumId',
                            id : 'testTypeEnumId',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : false ,
                            dict: true,
                            dictType:'TESTCARD_TYPE',
                            value: testCardTestTypeEnumId,
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '测试卡编号'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.textfield',
                            hideLabel : true,
                            name : 'testNumber',
                            id : 'testNumber',
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '用户号码'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.textfield',
                            hideLabel : true,
                            name : 'testSubscriberNumber',
                            id : 'testSubscriberNumber',
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '测试卡状态'
                        }
                    },
                /*     {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            name : 'testStatusEnumIdQry',
                            id : 'testStatusEnumIdQry',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : false ,
                            dict: true,
                            dictType:'TESTCARD_STATUS',
                            value: testCardTestStatusEnumIdQry,
                            anchor : '100%'
                        }
                    }, */
                    {
                        colspan : 1,
                        items : [{
                            xtype : 'ZTESOFT.mulComboboxField',
                            hideLabel : true,
                            id : 'testStatusEnumQryName',
                            name : 'testStatusEnumQryName',
                            hiddenField : 'testStatusEnumIdQry',
                            maxHeight:200,
                            store:testStatusEnumStore,
                            triggerAction:'all',
                            valueField:'dataValue',
                            displayField:'dataName',
                            value:'1,2,4,5,6',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:'1,2,4,5,6',
                            name : 'testStatusEnumIdQry',
                            id : 'testStatusEnumIdQry'
                        }]
                    },
					{
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效开始时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'testCancelDateStartQry',
                            id : 'testCancelDateStartQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效结束时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'testCancelDateEndQry',
                            id : 'testCancelDateEndQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '管理员'
                        }
                    },
                    {
                        colspan : 1,
                        width : 110,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'testAdmin',
                            name: 'testAdmin',
                            hideLabel : true,
                            valueFile : 'testAdminId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp("testAdminId").setValue(data.id);
                                            Ext.getCmp("testAdmin").setValue(data.text);
											});
                                /*TreeOper.singleUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('testAdminId').setValue(id);
                                        Ext.getCmp('testAdmin').setValue(text);
                                    }
                                });*/
                            }
                        },{
                            xtype : 'hidden',
                            name : 'testAdminId',
                            id : 'testAdminId'
                        }]
                    },
                                    {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red"></font>存放地市'
                    }
                },
                {
                    colspan : 1,
                    items : [
					/*{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'testStorageCityName',
                        width : 110,
                        id : 'testStorageCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                      //  allowBlank : false,
                        forceSelect : true,
                        editable : false,
                     //   value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('testStorageCityId').setValue(record.data.id);
                            }
                        },
                        anchor : '100%'
                    }*/
					{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'testStorageCityName',
                            name: 'testStorageCityName',
                            hideLabel : true,
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
										var freeObj = {
											isSearchBox:0
										};
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_11",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"COMPANY",freeObj);
                                        freeTreeObj.showTree(function(data){
											Ext.getCmp('testStorageCityName').setValue(data.text);
                							Ext.getCmp('testStorageCityId').setValue(data.id);
											});
                            }
                        }
					,{
                          xtype : 'hidden',
                          value:"",//session.logonAccount.cityCompanyId,
                          name : 'testStorageCityId',
                          id : 'testStorageCityId'
                      }]
                }
                    
                    ,{
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '存放部门'
                        }
                    },
                    {
                        colspan : 1,
                        width : 110,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'storageDepartmentName1',
                            name: 'storageDepartmentName1',
                            hideLabel : true,
                         //   valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_1",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('storageDepartmentName1').setValue(data.text);
                							 Ext.getCmp('storageDepartmentId1').setValue(data.id);
											});
                            }
                        },{
                            xtype : 'hidden',
                            name : 'storageDepartmentId1',
                            id : 'storageDepartmentId1'
                        }]
                    }
                ]
            });
            /*if(session.logonAccount.provinceCompanyId){//初始化存放地市的下拉列表，当存放地市使用下拉列表的时候
                var testStorageCityCombo = Ext.getCmp('testStorageCityName');
                testStorageCityCombo.clearValue();
                testStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                testStorageCityCombo.getStore().load();
            }*/
			if(session.logonAccount.provinceCompanyId){				
				var cityCombo = Ext.getCmp('testCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
            }
            return qryTestForm;
        };

        //固定电话类型 查询FORM
        this.initTeleQryPn = function() {
        //固话状态TESTCARD_STATUS
            var teleStatusEnumStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=TESTCARD_STATUS',
                    method : 'get'
                })
            });
            teleStatusEnumStore.load();
            var qryTeleForm = new Ext.FormPanel({
                id : 'qryTeleForm',
                region : 'center',
                buttonAlign : 'right',
                title : '查询条件',
                frame : true,
                layoutConfig : {
                    columns : 3*2
                },
                layout : 'table',
                bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : testCardQryWidth*4/6,
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
/*                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'teleProvinceId',
                            id : 'teleProvinceId',
                            mode: 'local',
                            dict: false,
                            forceSelect : true,
                            editable : true,
                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
                            valueField: 'id',
                            displayField: 'text',
                            baseParams : {node:1},
                            value: teleCardTeleProvinceId,
                            anchor : '100%',*/
							
							xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'teleProvinceName',
                            id : 'teleProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
							readOnly:testCardQryIsNotGroupCompany,
                            value: testCardQryProvinceCompanyNameGlo,//session.logonAccount.provinceCompanyName,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%',
							
                            listeners:{
                                select: function(combo, record, index){
                                    var cityCombo = Ext.getCmp('teleCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
                                    /*var teleStorageCityCombo = Ext.getCmp('teleStorageCityName');
                                  //  teleStorageCityCombo.clearValue();
                                   	teleStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    teleStorageCityCombo.getStore().load();*/
									Ext.getCmp("teleProvinceId").setValue(combo.value);
                                }
                            }
                        },{
                            xtype : 'hidden',
							value:testCardQryProvinceCompanyIdGlo,//session.logonAccount.provinceCompanyId,
                            name : 'teleProvinceId',
                            id : 'teleProvinceId'
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
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'teleCityId',
                            id : 'teleCityId',
                            valueField : 'id',
                            displayField : 'text',
                            mode : 'local',
                            triggerAction : 'all',
                            forceSelect : true,
                            editable : true,
//                            value : '',
                            store : new Ext.data.JsonStore({
                                remoteSort: true,
                                fields: ['id', 'text']
                            }),
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '电话号码'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.textfield',
                            hideLabel : true,
                            name : 'telePhoneNumber',
                            id : 'telePhoneNumber',
                            anchor : '100%'
                        }
                    },
					{
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效开始时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'teleCancelDateStartQry',
                            id : 'teleCancelDateStartQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效结束时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'teleCancelDateEndQry',
                            id : 'teleCancelDateEndQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '类型'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            name : 'telePhoneTypeEnumId',
                            id : 'telePhoneTypeEnumId',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            typeAhead : true,
                            triggerAction: 'all',
                            dict: true,
                            dictType:'FIXED_PHONE_TYPE',
                            editable : false ,
                            value: teleCardTelePhoneTypeEnumId,
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '管理员'
                        }
                    },
                    {
                        colspan : 1,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'teleAdmin',
                            name: 'teleAdmin',
                            hideLabel : true,
                            valueFile : 'teleAdminId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp("teleAdminId").setValue(data.id);
                                            Ext.getCmp("teleAdmin").setValue(data.text);
											});
                                /*TreeOper.singleUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('teleAdminId').setValue(id);
                                        Ext.getCmp('teleAdmin').setValue(text);
                                    }
                                });*/
                            }
                        },{
                            xtype : 'hidden',
                            name : 'teleAdminId',
                            id : 'teleAdminId'
                        }]
                    },
                     {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '存放地市'
                        }
                    },
                    {
                        colspan : 1,
                        items : [
						/*{
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'teleStorageCityName',
                            id : 'teleStorageCityName',
                            valueField : 'id',
                            displayField : 'text',
                            mode : 'local',
                            triggerAction : 'all',
                            forceSelect : true,
                            editable :false,
//                            value : '',
                            store : new Ext.data.JsonStore({
                                remoteSort: true,
                                fields: ['id', 'text']
                            }),
                            listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('teleStorageCityId').setValue(record.data.id);
                            }
                        },
                            anchor : '100%'
                        }*/
						{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'teleStorageCityName',
                            name: 'teleStorageCityName',
                            hideLabel : true,
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
										var freeObj = {
											isSearchBox:0
										};
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_22",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"COMPANY",freeObj);
                                        freeTreeObj.showTree(function(data){
											Ext.getCmp('teleStorageCityName').setValue(data.text);
                							Ext.getCmp('teleStorageCityId').setValue(data.id);
											});
                            }
                        }
						,{
                          xtype : 'hidden',
                          value:"",//session.logonAccount.cityCompanyId,
                          name : 'teleStorageCityId',
                          id : 'teleStorageCityId'
                      }]
                    },
				 {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '存放部门'
                        }
                    },
                    {
                        colspan : 2,
                        width :220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'storageDepartmentName2',
                            name: 'storageDepartmentName2',
                            hideLabel : true,
                         //   valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_2",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('storageDepartmentName2').setValue(data.text);
                							 Ext.getCmp('storageDepartmentId2').setValue(data.id);
											});
                            }
                        },{
                            xtype : 'hidden',
                            name : 'storageDepartmentId2',
                            id : 'storageDepartmentId2'
                        }]
                    },      {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '固话状态'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype : 'ZTESOFT.mulComboboxField',
                            hideLabel : true,
                            id : 'teleStatusEnumQryName',
                            name : 'teleStatusEnumQryName',
                            hiddenField : 'teleStatusEnumIdQry',
                            maxHeight:200,
                            store:teleStatusEnumStore,
                            triggerAction:'all',
                            value:'1,2,4,5,6',
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:'1,2,4,5,6',
                            name : 'teleStatusEnumIdQry',
                            id : 'teleStatusEnumIdQry'
                        }]
                    }
                ]
            });
            /*if(session.logonAccount.provinceCompanyId){//初始化存放地市的下拉列表，当存放地市采用下拉列表时
                var teleStorageCityCombo = Ext.getCmp('teleStorageCityName');
                teleStorageCityCombo.clearValue();
                teleStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                teleStorageCityCombo.getStore().load();
            }*/
			if(session.logonAccount.provinceCompanyId){
				var cityCombo = Ext.getCmp('teleCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
			}
            return qryTeleForm;
        };
        
        //测试终端 查询FORM
        this.initTermiQryPn = function() {
        	//终端状态TESTCARD_STATUS
            var termiStatusEnumStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=TESTCARD_STATUS',
                    method : 'get'
                })
            });
            termiStatusEnumStore.load();
            var qryTermiForm = new Ext.FormPanel({
                id : 'qryTermiForm',
                region : 'center',
                buttonAlign : 'right',
                title : '查询条件',
                frame : true,
                layoutConfig : {
                    columns : 3*2
                },
                layout : 'table',
                bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : testCardQryWidth*4/6,
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
/*                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'termiProvinceId',
                            id : 'termiProvinceId',
                            mode: 'local',
                            dict: false,
                            forceSelect : true,
                            editable : true,
                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
                            valueField: 'id',
                            displayField: 'text',
                            baseParams : {node:1},
                            value: terminalTermiProvinceId,
                            anchor : '100%',*/
							
							xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'termiProvinceName',
                            id : 'termiProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
							readOnly:testCardQryIsNotGroupCompany,
                            value: testCardQryProvinceCompanyNameGlo,//session.logonAccount.provinceCompanyName,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%',
							
                            listeners:{
                                select: function(combo, record, index){
                                    var cityCombo = Ext.getCmp('termiCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
                                    /*var termiStorageCityCombo = Ext.getCmp('termiStorageCityName');
                                //    termiStorageCityCombo.clearValue();
                                   	termiStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    termiStorageCityCombo.getStore().load();*/
									Ext.getCmp("rechProvinceId").setValue(combo.value);
                                }
                            }
                        },{
                            xtype : 'hidden',
							value:testCardQryProvinceCompanyIdGlo,//session.logonAccount.provinceCompanyId,
                            name : 'termiProvinceId',
                            id : 'termiProvinceId'
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
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'termiCityId',
                            id : 'termiCityId',
                            valueField : 'id',
                            displayField : 'text',
                            mode : 'local',
                            triggerAction : 'all',
                            forceSelect : true,
                            editable : true,
//                            value : '',
                            store : new Ext.data.JsonStore({
                                remoteSort: true,
                                fields: ['id', 'text']
                            }),
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '厂家'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.textfield',
                            hideLabel : true,
                            name : 'termiManufacturer',
                            id : 'termiManufacturer',
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '编号'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.textfield',
                            hideLabel : true,
                            name : 'termiNumber',
                            id : 'termiNumber',
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '手机类型'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            name : 'termiMoblieTypeEnumId',
                            id : 'termiMoblieTypeEnumId',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : false ,
                            dict: true,
                            dictType:'MOBILE_TYPE',
                            value: terminalTermiMoblieTypeEnumId,
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '管理员'
                        }
                    },
                    {
                        colspan : 1,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'termiAdmin',
                            name: 'termiAdmin',
                            hideLabel : true,
                            valueFile : 'termiAdminId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp("termiAdminId").setValue(data.id);
                                            Ext.getCmp("termiAdmin").setValue(data.text);
											});
                                /*TreeOper.singleUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('termiAdminId').setValue(id);
                                        Ext.getCmp('termiAdmin').setValue(text);
                                    }
                                });*/
                            }
                        },{
                            xtype : 'hidden',
                            name : 'termiAdminId',
                            id : 'termiAdminId'
                        }]
                    },{
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效开始时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'termiCancelDateStartQry',
                            id : 'termiCancelDateStartQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效结束时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'termiCancelDateEndQry',
                            id : 'termiCancelDateEndQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                      {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red"></font>存放地市'
                    }
                },
                {
                    colspan : 2,
                    width : 220,
                    items : [
					/*{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'termiStorageCityName',
                        id : 'termiStorageCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                   //     allowBlank : false,
                        forceSelect : true,
                        editable : false,
                     //   value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('termiStorageCityId').setValue(record.data.id);
                            }
                        },
                        anchor : '100%'
                    }*/
					{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'termiStorageCityName',
                            name: 'termiStorageCityName',
                            hideLabel : true,
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
										var freeObj = {
											isSearchBox:0
										};
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_33",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"COMPANY",freeObj);
                                        freeTreeObj.showTree(function(data){
											Ext.getCmp('termiStorageCityName').setValue(data.text);
                							Ext.getCmp('termiStorageCityId').setValue(data.id);
											});
                            }
                        }
					,{
                          xtype : 'hidden',
                          value:"",//session.logonAccount.cityCompanyId,
                          name : 'termiStorageCityId',
                          id : 'termiStorageCityId'
                      }]
                },
                      {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '存放部门'
                        }
                    },
                    {
                        colspan :2,
                        width :220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'storageDepartmentName3',
                            name: 'storageDepartmentName3',
                            hideLabel : true,
                           // valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_3",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('storageDepartmentName3').setValue(data.text);
                							 Ext.getCmp('storageDepartmentId3').setValue(data.id);
											});
                            }
                        },{
                            xtype : 'hidden',
                            name : 'storageDepartmentId3',
                            id : 'storageDepartmentId3'
                        }]
                    },      {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '终端状态'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype : 'ZTESOFT.mulComboboxField',
                            hideLabel : true,
                            id : 'termiStatusEnumQryName',
                            name : 'termiStatusEnumQryName',
                            hiddenField : 'termiStatusEnumIdQry',
                            maxHeight:200,
                            store:termiStatusEnumStore,
                            triggerAction:'all',
                            value:'1,2,4,5,6',
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:'1,2,4,5,6',
                            name : 'termiStatusEnumIdQry',
                            id : 'termiStatusEnumIdQry'
                        }]
                    }
                ]
            });
             /*if(session.logonAccount.provinceCompanyId){//初始化存放地市的下拉列表，当存放地市使用下拉列表的时候
                var termiStorageCityCombo = Ext.getCmp('termiStorageCityName');
                termiStorageCityCombo.clearValue();
                termiStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                termiStorageCityCombo.getStore().load();
            }*/
			if(session.logonAccount.provinceCompanyId){
				var cityCombo = Ext.getCmp('termiCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
			}
            return qryTermiForm;
        };
        

        //充值卡 查询FORM
        this.initRechQryPn = function() {
        var rechStatusEnumStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=TESTCARD_STATUS',
                    method : 'get'
                })
            });
            rechStatusEnumStore.load();
            var qryRechForm = new Ext.FormPanel({
                id : 'qryRechForm',
                region : 'center',
                buttonAlign : 'right',
                title : '查询条件',
                frame : true,
                layoutConfig : {
                    columns : 3*2
                },
                layout : 'table',
                bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : testCardQryWidth*4/6,
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
/*                            xtype : 'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'rechProvinceId',
                            id : 'rechProvinceId',
                            mode: 'local',
                            dict: false,
                            forceSelect : true,
                            editable : true,
                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
                            valueField: 'id',
                            displayField: 'text',
                            baseParams : {node:1},
                            value: rechCardRechProvinceId,
                            anchor : '100%',*/
							
							xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'rechProvinceName',
                            id : 'rechProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
							readOnly:testCardQryIsNotGroupCompany,
                            value: testCardQryProvinceCompanyNameGlo,//session.logonAccount.provinceCompanyName,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%',
							
                            listeners:{
                                select: function(combo, record, index){
                                    var cityCombo = Ext.getCmp('rechCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
                                     /*var rechStorageCityCombo = Ext.getCmp('rechStorageCityName');
                                  //  rechStorageCityCombo.clearValue();
                                   	rechStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
                                        method:'post'
                                    });
                                    rechStorageCityCombo.getStore().load();*/
									Ext.getCmp("rechProvinceId").setValue(combo.value);
                                }
                            }
                        },{
                            xtype : 'hidden',
							value:testCardQryProvinceCompanyIdGlo,//session.logonAccount.provinceCompanyId,
                            name : 'rechProvinceId',
                            id : 'rechProvinceId'
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
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'rechCityId',
                            id : 'rechCityId',
                            valueField : 'id',
                            displayField : 'text',
                            mode : 'local',
                            triggerAction : 'all',
                            forceSelect : true,
                            editable : true,
//                            value : '',
                            store : new Ext.data.JsonStore({
                                remoteSort: true,
                                fields: ['id', 'text']
                            }),
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '卡号'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.textfield',
                            hideLabel : true,
                            name : 'rechCardNo',
                            id : 'rechCardNo',
                            anchor : '100%'
                        }
                    },
					{
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效开始时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'rechCancelDateStartQry',
                            id : 'rechCancelDateStartQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '失效结束时间'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '失效开始时间',
                            name : 'rechCancelDateEndQry',
                            id : 'rechCancelDateEndQry',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                       }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '面值'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'rechParValue',
                            id : 'rechParValue',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
//                            value: '',
                            store: stroe.rechStore,
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '管理员'
                        }
                    },
                    {
                        colspan : 1,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'rechAdmin',
                            name: 'rechAdmin',
                            hideLabel : true,
                            valueFile : 'rechAdminId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="1";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("free_tree_1",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        freeTreeObj.showTree(function(data){
                                            
                                            Ext.getCmp("rechAdminId").setValue(data.id);
                                            Ext.getCmp("rechAdmin").setValue(data.text);
											});
                                /*TreeOper.singleUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('rechAdminId').setValue(id);
                                        Ext.getCmp('rechAdmin').setValue(text);
                                    }
                                });*/
                            }
                        },{
                            xtype : 'hidden',
                            name : 'rechAdminId',
                            id : 'rechAdminId'
                        }]
                    },
                                    {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red"></font>存放地市'
                    }
                },
                {
                    colspan : 1,
                    items : [
					/*{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'rechStorageCityName',
                        id : 'rechStorageCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                   //     allowBlank : false,
                        forceSelect : true,
                        editable : false,
                 //       value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('rechStorageCityId').setValue(record.data.id);
                            }
                        },
                        anchor : '100%'
                    }*/
					{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'rechStorageCityName',
                            name: 'rechStorageCityName',
                            hideLabel : true,
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
										var freeObj = {
											isSearchBox:0
										};
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_44",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"COMPANY",freeObj);
                                        freeTreeObj.showTree(function(data){
											Ext.getCmp('rechStorageCityName').setValue(data.text);
                							Ext.getCmp('rechStorageCityId').setValue(data.id);
											});
                            }
                        }
					,{
                          xtype : 'hidden',
                          value:"",//session.logonAccount.cityCompanyId,
                          name : 'rechStorageCityId',
                          id : 'rechStorageCityId'
                      }]
                }
                  , {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '存放部门'
                        }
                    },
                    {
                        colspan : 2,
                        width : 220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'storageDepartmentName4',
                            name: 'storageDepartmentName4',
                            hideLabel : true,
                          //  valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
							if(this.disabled==true){
								return;
							}
							var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = null;//session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("storageDepartment_4",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('storageDepartmentName4').setValue(data.text);
                							 Ext.getCmp('storageDepartmentId4').setValue(data.id);
											});
                            }
                        },{
                            xtype : 'hidden',
                            name : 'storageDepartmentId4',
                            id : 'storageDepartmentId4'
                        }]
                    },
                                   {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '充值卡状态'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype : 'ZTESOFT.mulComboboxField',
                            hideLabel : true,
                            id : 'rechStatusEnumQryName',
                            name : 'rechStatusEnumQryName',
                            hiddenField : 'rechStatusEnumIdQry',
                            maxHeight:200,
                            store:rechStatusEnumStore,
                            triggerAction:'all',
                            value:'1,2,4,5,6',
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:'1,2,4,5,6',
                            name : 'rechStatusEnumIdQry',
                            id : 'rechStatusEnumIdQry'
                        }]
                    }
                ]
            });
            /*if(session.logonAccount.provinceCompanyId){//初始化存放地市的下拉列表，当存放地市使用下拉列表的时候
                var rechStorageCityCombo = Ext.getCmp('rechStorageCityName');
                rechStorageCityCombo.clearValue();
                rechStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                rechStorageCityCombo.getStore().load();
            }*/
			if(session.logonAccount.provinceCompanyId){
				var cityCombo = Ext.getCmp('rechCityId');
                                    cityCombo.clearValue();
                                    cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });
                                    cityCombo.getStore().load();
			}
            return qryRechForm;
        };
        
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
        
        this.initTestGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,         
                new Ext.grid.RowNumberer({header:'序号',width:40}),        
                {header:'ID',dataIndex:'testCardId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true},
                {header:'测试卡编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.15},
                {header:'测试卡类型',dataIndex:'testobjectName'},
				{header:'测试卡类别',dataIndex:'testcardTypeEnumName',width:gridWidth*0.1},
				{header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1},
                {header:'用户号码',dataIndex:'subscriberNumber'
				/*,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                }*/
				,width:gridWidth*0.1},
                {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.05},
                {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.05},
                {header:'登记时间',dataIndex:'creationDate',width:gridWidth*0.1},
                {header:'借出时间',dataIndex:'lendTime',width:gridWidth*0.1},
                {header:'预计归还时间',dataIndex:'planReturnTime',width:gridWidth*0.1},
				{header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1},
                {header:'变动历史',dataIndex:'overHis',width:gridWidth*0.1,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.readHistory(testCardEnum,'+record.data.testCardId+');">变动历史</a>';
                    }
                }
            ]);
            //测试卡信息
            var grid = new ZTESOFT.Grid({
                id : 'testGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试卡信息列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',
                sm :cm                       
            });

            return grid;

        }
        
      //调拔历史
        this.readHistory = function(typeId,value){
            hisOper.initHistory(typeId,value);
        }
        
        this.doViewDetail = function(typeId,value,attributionProvinceId){
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
                            modOper.autoSetItem(response.rows,priItems);
                        }
                        modOper.initWindow('detail',typeId,value,items);
                    }
            );
        }

          //获取私有属性items
        this.getPriItems = function(typeId){
            if(typeId == 1){
                return modOper.priTestItems();
            }else if(typeId == 2){
                return modOper.priTeleItems();
            }else if(typeId == 3){
                return modOper.priTermiItems();
            }else if(typeId == 4){
                return modOper.priRechItems();
            }
        }
      //获取公有属性items
        this.getPubItems = function(typeId){
            var fieldLabel = '';
            if(typeId == testCardEnum){
                return modOper.pubTestItems();
            }else if(typeId == teleCardEnum){
                fieldLabel = '固定电话状态';
                return modOper.pubItems(fieldLabel);
            }else if(typeId == terminalEnum){
                fieldLabel = '测试终端状态';
                return modOper.pubItems(fieldLabel);
            }else if(typeId == rechCardEnum){
                fieldLabel = '充值卡状态';
                return modOper.pubItems(fieldLabel);
            }
            
        }
        
      this.fixedPhoneTypeEnumName  = function(value){
          var name = "";
          if(value == 1){
              name = "直线电话";
          }else if(value == 2){
              name = "传真";
          } else if(value == 3){
              name = "Modem";
          }
          return name;
      }
      
        this.initTeleGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,         
                new Ext.grid.RowNumberer({header:'序号',width:40}),  
                {header:'ID',dataIndex:'fixedTelId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true}, 
				{header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.15},
                {header:'测试卡类型',dataIndex:'testobjectName'},               
				{header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1},
                {header:'电话号码',dataIndex:'phoneNumber'
				/*,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                }*/
				,width:gridWidth*0.1},
                {header:'类型',dataIndex:'fixedPhoneTypeEnumName',width:gridWidth*0.1},
                 {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'电话状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.05},
                {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.05},
                {header:'登记时间',dataIndex:'creationDate',width:gridWidth*0.1},
                {header:'借出时间',dataIndex:'lendTime',width:gridWidth*0.1},
                {header:'预计归还时间',dataIndex:'planReturnTime',width:gridWidth*0.1},
				{header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1},
                {header:'变动历史',dataIndex:'overHis',width:gridWidth*0.1,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.readHistory(teleCardEnum,'+record.data.fixedTelId+');">变动历史</a>';
                   }
                }
            ]);
            //测试卡信息
            var grid = new ZTESOFT.Grid({
                id : 'teleGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '固定电话信息列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                hidden : true,
                url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',
                sm :cm        
            });

            return grid;

        }
        
        this.moblieTypeEnumName  = function(value){
            var name = "";
            if(value == 1){
                name = "GSM";
            }else if(value == 2){
                name = "CDMA";
            } else if(value == 3){
                name = "双模";
            }
            return name;
        }
        
        this.initTermiGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,         
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'ID',dataIndex:'testTerminalId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(terminalEnum,'+record.data.testTerminalId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.1},
                {header:'测试卡类型',dataIndex:'testobjectName'},
				{header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1},
                {header:'手机类型',dataIndex:'moblieTypeEnumName',width:gridWidth*0.1},
                {header:'厂家',dataIndex:'manufacturerName',width:gridWidth*0.1},
                {header:'手机型号',dataIndex:'phoneModel',width:gridWidth*0.1},
                 {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'终端状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.05},
                {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.05},
                {header:'登记时间',dataIndex:'creationDate',width:gridWidth*0.1},
                {header:'借出时间',dataIndex:'lendTime',width:gridWidth*0.1},
                {header:'预计归还时间',dataIndex:'planReturnTime',width:gridWidth*0.1},
				{header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1},
                {header:'变动历史',dataIndex:'overHis',width:gridWidth*0.1,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.readHistory(terminalEnum,'+record.data.testTerminalId+');">变动历史</a>';
                   }
                }
            ]);
            //测试卡信息
            var grid = new ZTESOFT.Grid({
                id : 'termiGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试终端信息列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                hidden : true,
                url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',
                sm :cm        
                
            });

            return grid;

        }
        
        this.testcardStatusEnumName = function(value){
            var name = "";
            if(value == 1){
                name = "正常";
            }else if(value == 2){
                name = "故障";
            }else if(value == 3){
                name = "报废";
            }else if(value == 4){
                name = "送修";
            }
            return name;
        }
        
        this.isNotName = function(value){
            var name = "";
            if(value){
                name = "是";
            }else if(!value){
                name = "否";
            }
            return name;
        }
        
        this.initRechGrid = function() {
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,         
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'ID',dataIndex:'rechCardId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true}, 
				{header:'编号',dataIndex:'cardNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.1},
                {header:'测试卡类型',dataIndex:'testobjectName'},                
				{header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1},
                {header:'卡号',dataIndex:'cardNo'
				/*,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                }*/
				,width:gridWidth*0.1},
                {header:'面值',dataIndex:'parValueName',width:gridWidth*0.1},
                {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.05},
                {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.05},
                {header:'登记时间',dataIndex:'creationDate',width:gridWidth*0.1},
                {header:'借出时间',dataIndex:'lendTime',width:gridWidth*0.1},
                {header:'预计归还时间',dataIndex:'planReturnTime',width:gridWidth*0.1},
				{header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1},
                {header:'变动历史',dataIndex:'overHis',width:gridWidth*0.1,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.readHistory(rechCardEnum,'+record.data.rechCardId+');">变动历史</a>';
                   }
                }
            ]);
            //测试卡信息
            var grid = new ZTESOFT.Grid({
                id : 'rechGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '充值卡信息列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                hidden : true,
                url:PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',
                sm :cm        
                
            });

            return grid;

        }
        
        this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar({region : 'north'});
            tb.add({
                text : '高级检索',
                xtype: 'ZTESOFT.Button',
                onClick : function() {
					testCardQryQryWindow.show();oper.loadQryWin();
                    //oper.initQryWin();
                }
            });
            tb.add("->");
            
            tb.add({
                text : '导出',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    manager.exportData();
                }
            });
            return tb;
        }
        
        this.del = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length!=1){
                Ext.Msg.alert('操作提示','请先选择您要修改的行');
            }else{
                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
            }
        }
    }
    

    function ManagerOper(){
        this.exportData = function(){
            var param = qryParams;
            param.cardType = qryParams.testobjectTypeEnumId;
            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ExpTestCardManaServiImpl';
            param.isNeedPrivate = 0;
            if(param.attributionProvinceId !=null){
            	param.isNeedPrivate = 1;
            //    Ext.Msg.alert('操作提示','请点开高级检索选择归属省份');
             //   return;
            }
			
			if(qryParams.testobjectTypeEnumId == testCardEnum){
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
            }else if(qryParams.testobjectTypeEnumId == teleCardEnum){   
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
            }else if(qryParams.testobjectTypeEnumId == terminalEnum){
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
            }else if(qryParams.testobjectTypeEnumId == rechCardEnum){
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
    }
</script>
