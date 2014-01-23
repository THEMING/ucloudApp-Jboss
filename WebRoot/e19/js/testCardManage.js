var testCardQryParams = null; 
var teleCardQryParams = null;
var terminalQryParams = null;
var rechCardQryParams = null;  
var testCardTestProvinceId = null;
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
var addTestobjectTypeEnumId = null;
var testCardManageIsSameMan = false;
var testCardManageQryWin = null;
function PageOper() {
        this.init = function() {
        	
        	
            var mainPanel = this.initMainPanel();
            var viewport = new Ext.Viewport({
                el : 'content',
                layout : 'border',
                margins : '5 5 5 5',
                items : [ mainPanel ]
            });
            this.initTestCardManageQryWin();
        }
        
        this.initTestCardManageQryWin = function(){
            testCardManageQryWin = oper.initQryWin();
            testCardManageQryWin.show();
//            Ext.getCmp('testStatusEnumQryName').setValue('3'); 
            Ext.getCmp('cardType').setValue(1);
            testCardManageQryWin.hide();
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
        
        this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar({region : 'north'});
            tb.add({
                text : '高级检索',
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                	testCardManageQryWin.show();
                	if(Ext.getCmp('testStatusEnumIdQry').getValue()){
                	   Ext.getCmp('testStatusEnumQryName').setValue(Ext.getCmp('testStatusEnumIdQry').getValue()); 
                	}
                	if(Ext.getCmp('teleStatusEnumIdQry').getValue()){
                       Ext.getCmp('teleStatusEnumQryName').setValue(Ext.getCmp('teleStatusEnumIdQry').getValue()); 
                    }
                    if(Ext.getCmp('termiStatusEnumIdQry').getValue()){
                       Ext.getCmp('termiStatusEnumQryName').setValue(Ext.getCmp('termiStatusEnumIdQry').getValue()); 
                    }
                    if(Ext.getCmp('rechStatusEnumIdQry').getValue()){
                       Ext.getCmp('rechStatusEnumQryName').setValue(Ext.getCmp('rechStatusEnumIdQry').getValue()); 
                    }
//                    oper.initQryWin();
                }
            });
            tb.add("->");

            tb.add({
                text : '延长归还时间',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.delayReturnTime();
                }
            },"-");
            tb.add({
                text : '手工新建',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.manuAdd();
                }
            },"-");
            tb.add({
                text : '编辑',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.doUpdate();
                }
            },"-");
            tb.add({
                text : '删除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    deleteOper.deleteData();
                }
            },"-");
            tb.add({
                text : '批量导入',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    loadOper.importData();
                }
            },"-");
            tb.add({
                text : '导出',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    manager.exportData();
                }
            },"-");
            tb.add({
                text : '下载模板',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    oper.downModel();
                }
            });

            return tb;
        }
        
        this.initQryWin = function(){
          //测试卡类型选择
            var ctForm = this.initCardTypePn();
            
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
               width: 720,
               height: 450,
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
                    	   var ctPara = Ext.getCmp('ctForm').getForm().getValues();
                           var typeId = ctPara.testobjectTypeEnumId;
                           if(typeId == testCardEnum){ 
                               Ext.getCmp('testGrid').setVisible(true);
                               Ext.getCmp('teleGrid').setVisible(false);
                               Ext.getCmp('termiGrid').setVisible(false);
                               Ext.getCmp('rechGrid').setVisible(false);
                        
                           }else if(typeId == teleCardEnum){
                               Ext.getCmp('testGrid').setVisible(false);
                               Ext.getCmp('teleGrid').setVisible(true);
                               Ext.getCmp('termiGrid').setVisible(false);
                               Ext.getCmp('rechGrid').setVisible(false);
                            
                           }else if(typeId == terminalEnum){
                               Ext.getCmp('testGrid').setVisible(false);
                               Ext.getCmp('teleGrid').setVisible(false);
                               Ext.getCmp('termiGrid').setVisible(true);
                               Ext.getCmp('rechGrid').setVisible(false);
                           
                           }else if(typeId == rechCardEnum){
                               Ext.getCmp('testGrid').setVisible(false);
                               Ext.getCmp('teleGrid').setVisible(false);
                               Ext.getCmp('termiGrid').setVisible(false);
                               Ext.getCmp('rechGrid').setVisible(true);
                           }
                           var ret = oper.winQuery();
                           if(ret==null&&ret!="notClose"){
//                            Ext.getCmp('qryWin').close();
                            testCardManageQryWin.hide();
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
//                           Ext.getCmp('qryWin').close();
                           testCardManageQryWin.hide();
                       }
                   }
               }]
           });//.show();
//           var ob = new Object();
//              ob.data = testCardQryParams;
//              Ext.getCmp('qryTestForm').getForm().loadRecord(ob);
//              ob.data = teleCardQryParams;
//              Ext.getCmp('qryTeleForm').getForm().loadRecord(ob);
//              ob.data = terminalQryParams;
//              Ext.getCmp('qryTermiForm').getForm().loadRecord(ob);
//              ob.data = rechCardQryParams;
//              Ext.getCmp('qryRechForm').getForm().loadRecord(ob);
//           this.loadQryWin();
        }
        
        
        this.resetWin = function(){
            var ctPara = Ext.getCmp('ctForm').getForm().getValues();
            var typeId = ctPara.testobjectTypeEnumId;
            if(typeId == testCardEnum){
                Ext.getCmp('qryTestForm').getForm().reset();
                Ext.getCmp('testProvinceId').setValue('');
                Ext.getCmp('testTypeEnumId').setValue('');
                Ext.getCmp('testStatusEnumIdQry').setValue('');
            }else if(typeId == teleCardEnum){
                Ext.getCmp('qryTeleForm').getForm().reset();
                Ext.getCmp('teleProvinceId').setValue('');
                Ext.getCmp('telePhoneTypeEnumId').setValue('');
                Ext.getCmp('teleStatusEnumIdQry').setValue('');
            }else if(typeId == terminalEnum){
                Ext.getCmp('qryTermiForm').getForm().reset();
                Ext.getCmp('termiProvinceId').setValue('');
                Ext.getCmp('termiMoblieTypeEnumId').setValue('');
                Ext.getCmp('termiStatusEnumIdQry').setValue('');
            }else if(typeId == rechCardEnum){
                Ext.getCmp('qryRechForm').getForm().reset();
                Ext.getCmp('rechProvinceId').setValue('');
                Ext.getCmp('rechStatusEnumIdQry').setValue('');
            }
        }
        
        this.loadQryWin = function(){
            var typeId = qryParams.testobjectTypeEnumId;
            Ext.getCmp('cardType').setValue(typeId);
        }
        
        this.winQuery = function(){
            var ctPara = Ext.getCmp('ctForm').getForm().getValues();
            var testobjectType = ctPara.testobjectTypeEnumId;
            var param = {};
            param.unUsedCard = 1;//报废状态,判断是否查询报废的卡,0为不查询报废的卡
            
            if(testobjectType == testCardEnum){
            	if(Ext.getCmp('testCancelDateStartQry').getValue()!=""&&Ext.getCmp('testCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('testCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('testCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
            	if(Ext.getCmp('testStatusEnumIdQry').getValue()){
                	param.testStatusEnumId =Ext.getCmp('testStatusEnumIdQry').getValue();
                	param.unUsedCard = 1;
                }
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('testProvinceId').getValue();
                param.attributionProvinceName = Ext.getCmp('testProvinceId').getRawValue();
                param.attributionCityId = Ext.getCmp('testCityId').getValue();
                param.testcardTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
                param.number = Ext.getCmp('testNumber').getValue();
                param.subscriberNumber = Ext.getCmp('testSubscriberNumber').getValue();
                param.gridName = 'testGrid';
                param.adminId = session.logonAccount.cloudUserId;
                param.lenderIdM = session.logonAccount.cloudUserId;
                param.testCancelDateStartQry = Ext.getCmp('testCancelDateStartQry').getValue();
                param.testCancelDateEndQry = Ext.getCmp('testCancelDateEndQry').getValue();
                param.storageDepartmentId = Ext.getCmp('testStorageDepartmentId').getValue();
                param.storageCityId = Ext.getCmp('testStorageCityId').getValue();
                param.testIsLend = Ext.getCmp('testIsLend').getValue();
               
                testCardTestProvinceId = Ext.getCmp('testProvinceId').getValue();
                testCardTestCityId = Ext.getCmp('testCityId').getValue();
                testCardTestTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
                testCardTestStatusEnumIdQry = Ext.getCmp('testStatusEnumIdQry').getValue();
                testCardQryParams = Ext.getCmp('qryTestForm').getForm().getValues();
                testCardQryParams.testProvinceId = null;
                testCardQryParams.testCityId = null;
                testCardQryParams.testTypeEnumId = null;
                testCardQryParams.testStatusEnumIdQry = null;
            //   testCardQryParams.testStorageCityId = null;
                testCardQryParams.testCancelDateStartQry = Ext.getCmp('testCancelDateStartQry').getValue();
                testCardQryParams.testCancelDateEndQry = Ext.getCmp('testCancelDateEndQry').getValue();
                testCardQryParams.testStorageDepartmentId = Ext.getCmp('testStorageDepartmentId').getValue();
                testCardQryParams.testStorageDepartmentName = Ext.getCmp('testStorageDepartmentName').getValue();
                testCardQryParams.testIsLend = Ext.getCmp('testIsLend').getValue();
                
            }else if(testobjectType == teleCardEnum){    
            	if(Ext.getCmp('teleCancelDateStartQry').getValue()!=""&&Ext.getCmp('teleCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('teleCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('teleCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
            	if(Ext.getCmp('teleStatusEnumIdQry').getValue()){
                    param.teleStatusEnumId =Ext.getCmp('teleStatusEnumIdQry').getValue();
                    param.unUsedCard = 1;
                }
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('teleProvinceId').getValue();
                param.attributionProvinceName = Ext.getCmp('teleProvinceId').getRawValue();
                param.attributionCityId = Ext.getCmp('teleCityId').getValue();
                param.phoneNumber = Ext.getCmp('telePhoneNumber').getValue();
                param.fixedPhoneTypeEnumId = Ext.getCmp('telePhoneTypeEnumId').getValue();
                param.gridName = 'teleGrid';
                param.adminId = session.logonAccount.cloudUserId;
                param.lenderIdM = session.logonAccount.cloudUserId;
                param.teleCancelDateStartQry = Ext.getCmp('teleCancelDateStartQry').getValue();
                param.teleCancelDateEndQry = Ext.getCmp('teleCancelDateEndQry').getValue();
                param.storageDepartmentId = Ext.getCmp('teleStorageDepartmentId').getValue();
                param.storageCityId = Ext.getCmp('teleStorageCityId').getValue();
                param.teleIsLend = Ext.getCmp('teleIsLend').getValue();
                
                teleCardTeleProvinceId = Ext.getCmp('teleProvinceId').getValue();
                teleCardTeleCityId = Ext.getCmp('teleCityId').getValue();
                teleCardTelePhoneTypeEnumId = Ext.getCmp('telePhoneTypeEnumId').getValue();
                teleCardQryParams = Ext.getCmp('qryTeleForm').getForm().getValues();
                teleCardQryParams.teleProvinceId = null;
                teleCardQryParams.teleCityId = null;
                teleCardQryParams.telePhoneTypeEnumId = null;
            //    teleCardQryParams.teleStorageCityId = null;
                teleCardQryParams.teleCancelDateStartQry = Ext.getCmp('teleCancelDateStartQry').getValue();
                teleCardQryParams.teleCancelDateEndQry = Ext.getCmp('teleCancelDateEndQry').getValue();
                teleCardQryParams.teleStorageDepartmentId = Ext.getCmp('teleStorageDepartmentId').getValue();
                teleCardQryParams.teleStorageDepartmentName = Ext.getCmp('teleStorageDepartmentName').getValue();
                teleCardQryParams.teleIsLend = Ext.getCmp('teleIsLend').getValue();
                
            }else if(testobjectType == terminalEnum){
            	if(Ext.getCmp('termiCancelDateStartQry').getValue()!=""&&Ext.getCmp('termiCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('termiCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('termiCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
                if(Ext.getCmp('termiStatusEnumIdQry').getValue()){
                    param.termiStatusEnumId =Ext.getCmp('termiStatusEnumIdQry').getValue();
                    param.unUsedCard = 1;
                }
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('termiProvinceId').getValue();
                param.attributionProvinceName = Ext.getCmp('termiProvinceId').getRawValue();
                param.attributionCityId = Ext.getCmp('termiCityId').getValue();
                param.manufacturerName = Ext.getCmp('termiManufacturer').getValue();
                param.number = Ext.getCmp('termiNumber').getValue();
                param.moblieTypeEnumId = Ext.getCmp('termiMoblieTypeEnumId').getValue();
                param.gridName = 'termiGrid';
                param.adminId = session.logonAccount.cloudUserId;
                param.lenderIdM = session.logonAccount.cloudUserId;
                param.termiCancelDateStartQry = Ext.getCmp('termiCancelDateStartQry').getValue();
                param.termiCancelDateEndQry = Ext.getCmp('termiCancelDateEndQry').getValue();
                param.storageDepartmentId = Ext.getCmp('termiStorageDepartmentId').getValue();
                param.storageCityId = Ext.getCmp('termiStorageCityId').getValue();
                param.termiIsLend = Ext.getCmp('termiIsLend').getValue();
                
                terminalTermiProvinceId = Ext.getCmp('termiProvinceId').getValue();
                terminalTermiCityId = Ext.getCmp('termiCityId').getValue();
                terminalTermiMoblieTypeEnumId = Ext.getCmp('termiMoblieTypeEnumId').getValue();
                terminalQryParams = Ext.getCmp('qryTermiForm').getForm().getValues();
                terminalQryParams.termiProvinceId = null;
                terminalQryParams.termiCityId = null;
                terminalQryParams.termiMoblieTypeEnumId = null;
            //    terminalQryParams.termiStorageCityId = null;
                terminalQryParams.termiCancelDateStartQry = Ext.getCmp('termiCancelDateStartQry').getValue();
                terminalQryParams.termiCancelDateEndQry = Ext.getCmp('termiCancelDateEndQry').getValue();
                terminalQryParams.termiStorageDepartmentId = Ext.getCmp('termiStorageDepartmentId').getValue();
                terminalQryParams.termiStorageDepartmentName = Ext.getCmp('termiStorageDepartmentName').getValue();
                terminalQryParams.termiIsLend = Ext.getCmp('termiIsLend').getValue();
                
            }else if(testobjectType == rechCardEnum){
            	if(Ext.getCmp('rechCancelDateStartQry').getValue()!=""&&Ext.getCmp('rechCancelDateEndQry').getValue()!=""&&new Date(Date.parse(Ext.getCmp('rechCancelDateStartQry').getValue()))>new Date(Date.parse(Ext.getCmp('rechCancelDateEndQry').getValue()))){
                             Ext.Msg.alert("提示","失效开始时间不能晚于失效结束时间！");
                             return "notClose";
                            }
                if(Ext.getCmp('rechStatusEnumIdQry').getValue()){
                    param.rechStatusEnumId =Ext.getCmp('rechStatusEnumIdQry').getValue();
                    param.unUsedCard = 1;
                }
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('rechProvinceId').getValue();
                param.attributionProvinceName = Ext.getCmp('rechProvinceId').getRawValue();
                param.attributionCityId = Ext.getCmp('rechCityId').getValue();
                param.cardNo = Ext.getCmp('rechCardNo').getValue();
                param.parValue = Ext.getCmp('rechParValue').getValue();
                param.gridName = 'rechGrid';
                param.adminId = session.logonAccount.cloudUserId;
                param.lenderIdM = session.logonAccount.cloudUserId;
                param.rechCancelDateStartQry = Ext.getCmp('rechCancelDateStartQry').getValue();
                param.rechCancelDateEndQry = Ext.getCmp('rechCancelDateEndQry').getValue();
                param.storageDepartmentId = Ext.getCmp('rechStorageDepartmentId').getValue();
                param.storageCityId = Ext.getCmp('rechStorageCityId').getValue();
                param.rechIsLend = Ext.getCmp('rechIsLend').getValue();
                
                rechCardRechProvinceId = Ext.getCmp('rechProvinceId').getValue();
                rechCardRechCityId = Ext.getCmp('rechCityId').getValue();
//                rechCardRechParValue = Ext.getCmp('rechParValue').getValue();
                rechCardQryParams = Ext.getCmp('qryRechForm').getForm().getValues();
                rechCardQryParams.rechProvinceId = null;
                rechCardQryParams.rechCityId = null;
             //   rechCardQryParams.rechStorageCityId = null;
                
                rechCardQryParams.rechParValue = Ext.getCmp('rechParValue').getValue();
                rechCardQryParams.rechCancelDateStartQry = Ext.getCmp('rechCancelDateStartQry').getValue();
                rechCardQryParams.rechCancelDateEndQry = Ext.getCmp('rechCancelDateEndQry').getValue();
                rechCardQryParams.rechStorageDepartmentId = Ext.getCmp('rechStorageDepartmentId').getValue();
                rechCardQryParams.rechStorageDepartmentName = Ext.getCmp('rechStorageDepartmentName').getValue();
                rechCardQryParams.rechIsLend = Ext.getCmp('rechIsLend').getValue();
                
            }
            
            qryParams = param;
            oper.doQry();
        }
        
        this.initCardTypePn = function(){
            var ctForm = new Ext.FormPanel({
                id : 'ctForm',
                region : 'north',
                buttonAlign : 'right',
                title : '测试卡类型',
                frame : true,
                layoutConfig : {
                    columns : 6
                },
                layout : 'table',
                bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 110,
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
                        width : 110*5,
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
                                      //  Ext.getCmp('testGrid').setVisible(true);
                                       // Ext.getCmp('teleGrid').setVisible(false);
                                      //  Ext.getCmp('termiGrid').setVisible(false);
                                    //    Ext.getCmp('rechGrid').setVisible(false);
                                        
                                        Ext.getCmp('qryTestForm').setVisible(true);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == teleCardEnum){
                                     //   Ext.getCmp('testGrid').setVisible(false);
                                       // Ext.getCmp('teleGrid').setVisible(true);
                                      //  Ext.getCmp('termiGrid').setVisible(false);
                                      //  Ext.getCmp('rechGrid').setVisible(false);
                                        
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(true);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == terminalEnum){
                                       // Ext.getCmp('testGrid').setVisible(false);
                                      //  Ext.getCmp('teleGrid').setVisible(false);
                                       // Ext.getCmp('termiGrid').setVisible(true);
                                      //  Ext.getCmp('rechGrid').setVisible(false);
                                        
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(true);
                                        Ext.getCmp('qryRechForm').setVisible(false);
                                    }else if(radiofield.getValue().inputValue == rechCardEnum){
                                      //  Ext.getCmp('testGrid').setVisible(false);
                                     //   Ext.getCmp('teleGrid').setVisible(false);
                                      //  Ext.getCmp('termiGrid').setVisible(false);
                                    //    Ext.getCmp('rechGrid').setVisible(true);
                                        
                                        Ext.getCmp('qryTestForm').setVisible(false);
                                        Ext.getCmp('qryTeleForm').setVisible(false);
                                        Ext.getCmp('qryTermiForm').setVisible(false);
                                        Ext.getCmp('qryRechForm').setVisible(true);
                                    }
                                }
                            }
         
                        }
                    }
                ]
            });
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
                bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 110,
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
                        colspan : 2,
                        width:220,
                        items : {
//                            xtype : 'ZTESOFT.enum',
//                            hideLabel : true,
//                            triggerAction: 'all',
//                            name : 'testProvinceId',
//                            id : 'testProvinceId',
//                            mode: 'local',
//                            dict: false,
//                            forceSelect : true,
//                            editable : true,
//                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
//                            valueField: 'id',
//                            displayField: 'text',
////                            baseParams : {node:1},
//                            value: testCardTestProvinceId,
//                            anchor : '100%',
                            
                            xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'testProvinceId',
                            id : 'testProvinceId',
//                            mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: testCardTestProvinceId,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                                    Ext.getCmp('testProvinceId').setValue(record.id);
                                    var testStorageCityCombo = Ext.getCmp('testStorageCityName');
                                  //  testStorageCityCombo.clearValue();
                                    /*testStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });*/
                                    testStorageCityCombo.getStore().load();
                                    
                                }
                            }
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '归属地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                            value : '',
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
                            xtype : 'ZTESOFT.numberfield',
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
                            text : '失效开始时间'
                        }
                    },
                    {
                    	colspan : 2,
                        width:220,
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
                        width:220,
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
                            html : '<font color="red"></font>存放地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
                        items : [{
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
                        },{
                              xtype : 'hidden',
                              value:session.logonAccount.cityCompanyId,
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
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'testStorageDepartmentName',
                            name: 'testStorageDepartmentName',
                            hideLabel : true,
                          //  valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                            var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("testStorageDepartmentNameT",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('testStorageDepartmentName').setValue(data.text);
                                             Ext.getCmp('testStorageDepartmentId').setValue(data.id);
                                            });
                            }
                        },{
                            xtype : 'hidden',
                            name : 'testStorageDepartmentId',
                            id : 'testStorageDepartmentId'
                        }]
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '测试卡状态'
                        }
                    },
             /*       {
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
                            value:testCardTestStatusEnumIdQry,
                            dictType:'TESTCARD_STATUS',
                            anchor : '100%'
                        }
                    },*/
                    {
                        colspan : 2,
                        width:220,
                        items : [
                        	{
                            xtype : 'ZTESOFT.mulComboboxField',
                            hideLabel : true,
                            id : 'testStatusEnumQryName',
                            name : 'testStatusEnumQryName',
                            hiddenField : 'testStatusEnumIdQry',
                            maxHeight:200,
                            store:testStatusEnumStore,
//                            value:"1",
                            triggerAction:'all',
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:"1,2,4,5,6",
                            name : 'testStatusEnumIdQry',
                            id : 'testStatusEnumIdQry'
                        }
                        ]
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '是否借出'
                        }
                    },                    
                    {
                        colspan : 2,
                        width:220,
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'testIsLend',
                            id : 'testIsLend',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: new Ext.data.ArrayStore({
                                fields: ['value','text'],
                                data:[
                                    ['','--请选择--'],
                                    ['1','是'],
                                    ['0','否']
                                ]
                            }),
                            anchor : '100%'
                        }
                    }
                    
                ]
            });
            if(session.logonAccount.provinceCompanyId){
                var testStorageCityCombo = Ext.getCmp('testStorageCityName');
                testStorageCityCombo.clearValue();
                testStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                testStorageCityCombo.getStore().load();
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
                bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 110,
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
                        colspan : 2,
                        width:220,
                        items : {
//                            xtype : 'ZTESOFT.enum',
//                            hideLabel : true,
//                            triggerAction: 'all',
//                            name : 'teleProvinceId',
//                            id : 'teleProvinceId',
//                            mode: 'local',
//                            dict: false,
//                            forceSelect : true,
//                            editable : true,
//                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                            valueField: 'id',
//                            displayField: 'text',
//                            baseParams : {node:1},
//                            value: teleCardTeleProvinceId,
//                            anchor : '100%',
                        	
                        	xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'teleProvinceId',
                            id : 'teleProvinceId',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: teleCardTeleProvinceId,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                                    var teleStorageCityCombo = Ext.getCmp('teleStorageCityName');
                                  //  teleStorageCityCombo.clearValue();
                                    /*teleStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });*/
                                    teleStorageCityCombo.getStore().load();
                                }
                            }
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '归属地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                            value : '',
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
                            text : '失效开始时间'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                        colspan :2,
                        width:220,
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
                            text : '存放地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
                        items : [{
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
                        },{
                          xtype : 'hidden',
                          value:session.logonAccount.cityCompanyId,
                          name : 'teleStorageCityId',
                          id : 'teleStorageCityId'
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
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'teleStorageDepartmentName',
                            name: 'teleStorageDepartmentName',
                            hideLabel : true,
                          //  valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                            var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("teleStorageDepartmentNameT",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('teleStorageDepartmentName').setValue(data.text);
                                             Ext.getCmp('teleStorageDepartmentId').setValue(data.id);
                                            });
                            }
                        },{
                            xtype : 'hidden',
                            name : 'teleStorageDepartmentId',
                            id : 'teleStorageDepartmentId'
                        }]
                    },          {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '类型'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                    }, {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '电话号码'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                            text : '是否借出'
                        }
                    },                    
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'teleIsLend',
                            id : 'teleIsLend',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: new Ext.data.ArrayStore({
                                fields: ['value','text'],
                                data:[
                                    ['','--请选择--'],
                                    ['1','是'],
                                    ['0','否']
                                ]
                            }),
                            anchor : '100%'
                        }
                    },
                    {
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
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:"1,2,4,5,6",
                            name : 'teleStatusEnumIdQry',
                            id : 'teleStatusEnumIdQry'
                        }]
                    }
                ]
            });
            if(session.logonAccount.provinceCompanyId){
                var teleStorageCityCombo = Ext.getCmp('teleStorageCityName');
                teleStorageCityCombo.clearValue();
                teleStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                teleStorageCityCombo.getStore().load();
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
                bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 110,
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
                        colspan : 2,
                        width:220,
                        items : {
//                            xtype : 'ZTESOFT.enum',
//                            hideLabel : true,
//                            triggerAction: 'all',
//                            name : 'termiProvinceId',
//                            id : 'termiProvinceId',
//                            mode: 'local',
//                            dict: false,
//                            forceSelect : true,
//                            editable : true,
//                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                            valueField: 'id',
//                            displayField: 'text',
//                            baseParams : {node:1},
//                            value: terminalTermiProvinceId,
//                            anchor : '100%',
                        	
                        	xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'termiProvinceId',
                            id : 'termiProvinceId',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: terminalTermiProvinceId,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                                    var termiStorageCityCombo = Ext.getCmp('termiStorageCityName');
                                  //  termiStorageCityCombo.clearValue();
                                 /*   termiStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });*/
                                    termiStorageCityCombo.getStore().load();
                                }
                            }
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '归属地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                            value : '',
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
                            text : '失效开始时间'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                        width:220,
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
                        items : [{
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
                        },{
                              xtype : 'hidden',
                              value:session.logonAccount.cityCompanyId,
                              name : 'termiStorageCityId',
                              id : 'termiStorageCityId'
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
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'termiStorageDepartmentName',
                            name: 'termiStorageDepartmentName',
                            hideLabel : true,
                          //  valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                            var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("termiStorageDepartmentNameT",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('termiStorageDepartmentName').setValue(data.text);
                                             Ext.getCmp('termiStorageDepartmentId').setValue(data.id);
                                            });
                            }
                        },{
                            xtype : 'hidden',
                            name : 'termiStorageDepartmentId',
                            id : 'termiStorageDepartmentId'
                        }
                  ]
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
                    },            {
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
                            text : '是否借出'
                        }
                    },                    
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'termiIsLend',
                            id : 'termiIsLend',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: new Ext.data.ArrayStore({
                                fields: ['value','text'],
                                data:[
                                    ['','--请选择--'],
                                    ['1','是'],
                                    ['0','否']
                                ]
                            }),
                            anchor : '100%'
                        }
                    },
                    {
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
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:"1,2,4,5,6",
                            name : 'termiStatusEnumIdQry',
                            id : 'termiStatusEnumIdQry'
                        }]
                    }
                ]
            });
            if(session.logonAccount.provinceCompanyId){
                var termiStorageCityCombo = Ext.getCmp('termiStorageCityName');
                termiStorageCityCombo.clearValue();
                termiStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                termiStorageCityCombo.getStore().load();
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
                bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 110,
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
                        colspan : 2,
                        width:220,
                        items : {
//                            xtype : 'ZTESOFT.enum',
//                            hideLabel : true,
//                            triggerAction: 'all',
//                            name : 'rechProvinceId',
//                            id : 'rechProvinceId',
//                            mode: 'local',
//                            dict: false,
//                            forceSelect : true,
//                            editable : true,
//                            url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                            valueField: 'id',
//                            displayField: 'text',
//                            baseParams : {node:1},
//                            value: rechCardRechProvinceId,
//                            anchor : '100%',
                        	
                        	xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'rechProvinceId',
                            id : 'rechProvinceId',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: rechCardRechProvinceId,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                                    var rechStorageCityCombo = Ext.getCmp('rechStorageCityName');
                                   // rechStorageCityCombo.clearValue();
                                   /* rechStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                        method:'post'
                                    });*/
                                    rechStorageCityCombo.getStore().load();
                                }
                            }
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '归属地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
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
                            value : '',
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
                            html : '<font color="red"></font>存放地市'
                        }
                    },
                    {
                        colspan : 2,
                        width:220,
                        items : [{
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
                        },{
                              xtype : 'hidden',
                              value:session.logonAccount.cityCompanyId,
                              name : 'rechStorageCityId',
                              id : 'rechStorageCityId'
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
                        colspan : 2,
                        width:220,
                        items : [{
                            xtype: 'ZTESOFT.popupfield',
                            id: 'rechStorageDepartmentName',
                            name: 'rechStorageDepartmentName',
                            hideLabel : true,
                          //  valueFile : 'attributionDepartmentId',
                            readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                            var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _orgId = session.logonAccount.provinceCompanyId;
                                        var freeTreeObj = new FreeTreeObj("rechStorageDepartmentNameT",_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                                        freeTreeObj.showTree(function(data){
                                             Ext.getCmp('rechStorageDepartmentName').setValue(data.text);
                                             Ext.getCmp('rechStorageDepartmentId').setValue(data.id);
                                            });
                            }
                        },{
                            xtype : 'hidden',
                            name : 'rechStorageDepartmentId',
                            id : 'rechStorageDepartmentId'
                        }]
                    },          {
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
                    },        {
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
                            value: '',
                            store: stroe.rechStore,
                            anchor : '100%'
                        }
                    },
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            text : '是否借出'
                        }
                    },                    
                    {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.combofield',
                            hideLabel : true,
                            name : 'rechIsLend',
                            id : 'rechIsLend',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: new Ext.data.ArrayStore({
                                fields: ['value','text'],
                                data:[
                                    ['','--请选择--'],
                                    ['1','是'],
                                    ['0','否']
                                ]
                            }),
                            anchor : '100%'
                        }
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
                            valueField:'dataValue',
                            displayField:'dataName',
                            mode:'local',
                            anchor : '100%'
                        },{
                            xtype : 'hidden',
                            value:"1,2,4,5,6",
                            name : 'rechStatusEnumIdQry',
                            id : 'rechStatusEnumIdQry'
                        }]
                    }
                ]
            });
            if(session.logonAccount.provinceCompanyId){
                var rechStorageCityCombo = Ext.getCmp('rechStorageCityName');
                rechStorageCityCombo.clearValue();
                rechStorageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                	url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method:'post'
                });
                rechStorageCityCombo.getStore().load();
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
                {header:'测试卡编号',dataIndex:'number',width:gridWidth*0.1,sortable:true,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                }},
                {header:'测试卡类型',dataIndex:'testobjectName',width:gridWidth*0.1},
                {header:'测试卡类别',dataIndex:'testcardTypeEnumName',width:gridWidth*0.1},
                {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1},
                {header:'用户号码',dataIndex:'subscriberNumber',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                    return '<a href="#" onclick="oper.doViewDetail(testCardEnum,'+record.data.testCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
//                },
                width:gridWidth*0.1},
                {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'管理员Id',dataIndex:'adminId',width:gridWidth*0.1,hidden:true},
                {header:'卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1,hidden:true},
                {header:'卡状态',dataIndex:'testcardStatusEnumId',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return testcardStatusMap.get(value);
                },width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.1},
                {header:'借用单位',dataIndex:'lendDepartmentName',width:gridWidth*0.1},
                {header:'借用人',dataIndex:'lenderName',width:gridWidth*0.05},
                {header:'登记时间',dataIndex:'creationDate',width:gridWidth*0.1},
                {header:'借出时间',dataIndex:'lendTime',width:gridWidth*0.1},
                {header:'预计归还时间',dataIndex:'planReturnTime',width:gridWidth*0.1},
                {header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1},
                {header:'创建人',dataIndex:'createdBy',width:gridWidth*0.1,hidden:true},
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

      //获取公有属性items 新增
        this.getAddPubItems = function(typeId){
            var fieldLabel = '';
            if(typeId == testCardEnum){
                return addOper.pubTestItems();
            }else if(typeId == teleCardEnum){
                fieldLabel = '<font color="red">*</font>固定电话状态';
                return addOper.pubItems(fieldLabel);
            }else if(typeId == terminalEnum){
                fieldLabel = '<font color="red">*</font>测试终端状态';
                return addOper.pubItems(fieldLabel);
            }else if(typeId == rechCardEnum){
                fieldLabel = '<font color="red">*</font>充值卡状态';
                return addOper.pubItems(fieldLabel);
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
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.1},
                {header:'ID',dataIndex:'fixedTelId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true},   
                {header:'测试卡类型',dataIndex:'testobjectName'},
                {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName'},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName'},
                {header:'电话号码',dataIndex:'phoneNumber'
//                ,renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                    return '<a href="#" onclick="oper.doViewDetail(teleCardEnum,'+record.data.fixedTelId+','+record.data.attributionProvinceId+');">' + value + '</a>';
//                }
                ,width:gridWidth*0.1},
                {header:'类型',dataIndex:'fixedPhoneTypeEnumName',width:gridWidth*0.1},
                {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'管理员Id',dataIndex:'adminId',width:gridWidth*0.1,hidden:true},
                {header:'电话状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.1},
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
                {header:'编号',dataIndex:'number',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(terminalEnum,'+record.data.testTerminalId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.1},
                {header:'ID',dataIndex:'testTerminalId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true},    
                {header:'测试卡类型',dataIndex:'testobjectName'},
                {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true},
                {header:'归属省份',dataIndex:'attributionProvinceName'},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName'},
                {header:'手机类型',dataIndex:'moblieTypeEnumName',width:gridWidth*0.1},
                {header:'厂家',dataIndex:'manufacturerName',width:gridWidth*0.1},
                {header:'手机型号',dataIndex:'phoneModel',width:gridWidth*0.1},
                {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'管理员Id',dataIndex:'adminId',width:gridWidth*0.1,hidden:true},
                {header:'终端状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.1},
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
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,         
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'编号',dataIndex:'cardNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href="#" onclick="oper.doViewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
                },width:gridWidth*0.1},
                {header:'ID',dataIndex:'rechCardId',hidden:true},
                {header:'测试卡类别ID',dataIndex:'testcardTypeEnumId',hidden:true},   
                {header:'测试卡类型',dataIndex:'testobjectName'},
                {header:'归属省份',dataIndex:'attributionProvinceId',hidden:true}, 
                {header:'归属省份',dataIndex:'attributionProvinceName'},
                {header:'归属地市',dataIndex:'attributionCityId',hidden:true},
                {header:'归属地市',dataIndex:'attributionCityName'},
                {header:'卡号',dataIndex:'cardNo',
//                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
//                    return '<a href="#" onclick="oper.doViewDetail(rechCardEnum,'+record.data.rechCardId+','+record.data.attributionProvinceId+');">' + value + '</a>';
//                },
                width:gridWidth*0.1},
                {header:'面值',dataIndex:'parValueName',width:gridWidth*0.1},
                {header:'存放地市',dataIndex:'storageCityName',width:gridWidth*0.1},
                {header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1},
                {header:'管理员',dataIndex:'adminName',width:gridWidth*0.1},
                {header:'管理员Id',dataIndex:'adminId',width:gridWidth*0.1,hidden:true},
                {header:'卡状态',dataIndex:'testcardStatusEnumName',width:gridWidth*0.1,hidden:true},
                {header:'卡状态',dataIndex:'testcardStatusEnumId',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return testcardStatusMap.get(value);
                },width:gridWidth*0.1},
                {header:'是否借出',dataIndex:'lendFlagName',width:gridWidth*0.1},
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

        this.delayReturnTime = function(){
            var typeId = qryParams.testobjectTypeEnumId;
            var gridName = '';
            if(typeId == testCardEnum){
                gridName = "testGrid";
            }else if(typeId == teleCardEnum){
                gridName = "teleGrid";
            }else if(typeId == terminalEnum){
                gridName = "termiGrid";
            }else if(typeId == rechCardEnum){
                gridName = "rechGrid";
            }
            
            var selinfo = Ext.getCmp(gridName).getSelectionModel().getSelections();
            if(selinfo.length == 0){           
                Ext.Msg.alert('操作提示','没有选择任何记录!');
                return;
            }else if(selinfo.length > 1){
                Ext.Msg.alert('操作提示','不能选择多行!');
                return;
            }
            if(selinfo[0].data.adminId!=session.logonAccount.cloudUserId){
                       Ext.Msg.alert("提示","该测试卡的管理员不是当前登录者，不能进行编辑！");
                       return;
                    }
            if(selinfo[0].data.lendFlagName == "否"){
            	Ext.Msg.alert('操作提示','只有借出的卡才能延长归还时间!');
            	return;
            }      
            var formWin = new Ext.Window({
                id:'delayReturnTimeWin',
                title: "延长归还时间",
                closable:true,
                width: 445,
                height: 220,
                plain:true,
                modal: true,
                items: [new Ext.FormPanel({
                id : 'delayReturnTimeForm',
                labelAlign : 'right',//按键的对齐方式
                frame : true,
                layoutConfig : {
                            columns : 2
                        //总共三列，但一列包括lable和field两项，所以为6
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
                            width : 200,//最小是120，最大190
                            height : 30
                        },
                items : [
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '已有预计归还时间'
                       }
                   },{
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.textfield',
                           hideLabel : true,
//                            fieldLabel : '工单号',
                            name : 'oldReturnTime',
                            id : 'oldReturnTime',//sheetSerialNumberQry
                            allowBlank: true,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                            readOnly:true,
                            anchor : '100%'//大概意思是表示这个textfield控件，占整个列宽的比例
                       }
                   },
                   {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           html : '<font color="red">*</font>新的预计归还时间'
                       }
                   },{
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.datefield',
                           hideLabel : true,
//                            fieldLabel : '工单号',
                            name : 'newReturnTime',
                            id : 'newReturnTime',//sheetSerialNumberQry
                            format:'Y-m-d h:i:s',
                            allowBlank: false,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                            anchor : '100%'//大概意思是表示这个textfield控件，占整个列宽的比例
                       }
                   }
                   ]})],
                buttonAlign:'center',
                buttons: [{
                    text: '确定',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                    	
                    	if(Ext.getCmp("newReturnTime").getValue()==""){
                    	   Ext.Msg.alert("提示","请选择新的预计归还时间！");
                    	   return;
                    	}
                    	
                    	if(new Date(Date.parse(Ext.getCmp('newReturnTime').getValue()))<new Date(Date.parse(Ext.getCmp('oldReturnTime').getValue().replace("-", "/")))){
                    	   Ext.Msg.alert("提示","新的预计归还时间必须晚于已有预计归还时间！");
                           return;
                    	}
                    	
                    	var param = new Object();
                    	param.lastUpdatedBy = session.logonAccount.cloudUserId;
                    	param.planReturnTime = Ext.getCmp("newReturnTime").getValue();
//                    	attributionProvinceId testobjectTypeEnumId createdBy lastUpdateDate marketingAreaId
//                    	attributionProvinceId testcardTypeEnumId
                    	
                    	param.testobjectTypeEnumId = selinfo[0].data.testcardTypeEnumId;
                    	param.attributionProvinceId = selinfo[0].data.attributionProvinceId;
                        param.createdBy = session.logonAccount.cloudUserId;
                        param.marketingAreaId = session.logonAccount.marketingAreaId;
                        param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                        param.orgId = session.logonAccount.cloudOrgId;
                    	
                    	
                    	var urll = PATH+'/e19/testCardManageAction.json?method=modify';
                    	if(typeId == testCardEnum){
                    		urll = PATH+'/e19/testCardManageAction.json?method=modify';
                    		param.testCardId = selinfo[0].data.testCardId;
                    	}else if(typeId == teleCardEnum){
                            urll = PATH+'/e19/imsManageAction.json?method=modify';
                            param.fixedTelId = selinfo[0].data.fixedTelId;
                        }else if(typeId == terminalEnum){
                            urll = PATH+'/e19/terminalManageAction.json?method=modify';
                            param.testTerminalId = selinfo[0].data.testTerminalId;
                        }else if(typeId == rechCardEnum){
                            urll = PATH+'/e19/rechCardManageAction.json?method=modify';
                            param.rechCardId = selinfo[0].data.rechCardId;
                        }
                    	
                    	ZTESOFT.invokeAction(
                                urll,
                                param,
                                function(response){
                                    Ext.Msg.alert('操作提示','修改成功');
                                    Ext.getCmp('delayReturnTimeWin').close();
                                    oper.doQry();
                                }
                        );
                    	
                    	
                    }
                },{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('delayReturnTimeWin').close();
                    }
                }]
            });
            
            Ext.getCmp("oldReturnTime").setValue(selinfo[0].data.planReturnTime);
             formWin.show();
        }
        
        this.manuAdd = function(){
            if(!qryParams.testobjectTypeEnumId){
                Ext.Msg.alert('操作提示','请先点开高级检索选择测试卡类型!');
                return;
            }
            addTestobjectTypeEnumId = qryParams.testobjectTypeEnumId;
            var colMArray = oper.baseCoumn(addTestobjectTypeEnumId);
            
            var pubItems = oper.getAddPubItems(addTestobjectTypeEnumId);
            addOper.initWindow(colMArray,pubItems,addTestobjectTypeEnumId);
            addOper.initAttributionCityId();
            addOper.initStorageCityId();
        }
        
        /*动态配置列*/
        this.autoSetItem = function(data,colMArray,gridName){
            var editer = new Ext.form.TextField({allowBlank: true });

            for(var i=0;i<data.length;i++){
                
                var render = null;
                var store = null;
               var isNull = false;
               if(data[i].isNull == 1){//可为空
                   isNull = true;
               }
                if(data[i].isEnumType == 0){//不是枚举值
                    if(data[i].dataTypeEnumId == 1 ){//1为整型
                        editer = new Ext.form.NumberField({
//                        	allowDecimals:false,
//                        	nanText:'请输入有效整数',
                        	regex :/^-?[1-9]\d*$/,
                            regexText : "请输入有效整数!",
                        	maxLength:data[i].dataLength,
                            allowBlank: isNull
                        });
                    }else if(data[i].dataTypeEnumId == 2){//2为小数
                        editer = new Ext.form.NumberField({
                            allowDecimals:true,
                            regex :/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/,
                            regexText : "请输入有效小数!",
                            maxLength:data[i].dataLength,
                            allowBlank: isNull
                        });
                    }else if(data[i].dataTypeEnumId == 3){//字符
                        editer = new Ext.form.TextField({
                        	maxLength:data[i].dataLength,
                            allowBlank: isNull
                        });
                    }else if(data[i].dataTypeEnumId == 4){//日期
                        editer = new Ext.form.DateField({
                            allowBlank: isNull,
                            format: 'Y-m-d'
                        });
                        render = function formatDate(value){
                            if(value instanceof Date){
                                return value ? value.dateFormat('Y-m-d') : '';
                            }else{
                                return value; 
                            } 
                        };
                    }else if(data[i].dataTypeEnumId == 5){//时间
                        editer = new Ext.ux.form.DateTimeField({
                            allowBlank: isNull,
                            format: 'Y-m-d H:i:s'
                        });
                        render = function formatDate2(value){
                            if(value instanceof Date){
                                return value ? value.dateFormat('Y-m-d H:i:s') : '';
                            }else{
                                return value; 
                            } 
                        };
                    }else if(data[i].dataTypeEnumId == 6){//布尔型
                        store = new Ext.data.ArrayStore({
                                fields: ['enumValue','enumValueMeaning'],
                                data:[
                                    ['1','是'],
                                    ['0','否']
                                ]
                         });
                        
                        editer = new Ext.form.ComboBox({
                            valueField: 'enumValue',
                            displayField: 'enumValueMeaning',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
//                            value: '',
                            allowBlank : isNull,
                            store: store
                            });
                        render = function(value,metadata,record){
                        	if(value==""){
                               return "--请选择--";
                            }
                        	if(value==0){
                        	   return "否";
                        	}
                        	if(value==1){
                               return "是";
                            }
                            return value;
//                            var index = store.find('enumValue',value);
//                            if(index!=-1){
//                                return store.getAt(index).data.enumValueMeaning;
//                            }
//                            return value;
                        };
                    }
                }else{//是枚举值，使用下拉框

                   var tempStore = new Ext.data.JsonStore({
                        remoteSort : false,
                        baseParams : {templateDetailId:data[i].templateDetailId},
                        fields : [ 'enumValue', 'enumValueMeaning' ],
                        proxy : new Ext.data.HttpProxy({
                            url:PATH+'/e19/tciPriAttTemplateAction.json?method=qryEnumValueListForCombox'
                        })
                    });
                   tempStore.load();
                    editer = new Ext.form.ComboBox({
                        valueField: 'enumValue',
                        displayField: 'enumValueMeaning',
                        mode: 'remote',
                        triggerAction: 'all',
                        editable : false ,
//                        value: '',
                        allowBlank : isNull,
                        store: tempStore
                   });
                    
                    render = function(value,metadata,record,rowIndex,columnIndex,store){
                        var s = Ext.getCmp(gridName).getColumnModel().getCellEditor(columnIndex,rowIndex).field.initialConfig.store;
                        var index = s.find('enumValue',value);
                        if(index!=-1){
                            return s.getAt(index).data.enumValueMeaning;
                        }
                        return value;
                    };
                }
                colMArray.push({header:data[i].columnName,dataIndex:data[i].columnNumber,width:gridWidth*0.1, editor: editer,renderer : render});
            }
        }
        
        /*原有配置列*/
        this.baseCoumn = function(testobjectType){
            if(testobjectType == testCardEnum){
                return oper.testBaseCoumn();
            }else if(testobjectType == teleCardEnum){
                return oper.teleBaseCoumn();
            }else if(testobjectType == terminalEnum){
                return oper.terimiBaseCoumn();
            }else if(testobjectType == rechCardEnum){
                return oper.rechBaseCoumn();
            }
        }
        /*测试卡 固定配置列*/
        this.testBaseCoumn = function(){
            var colMArray = [
                new Ext.grid.CheckboxSelectionModel(),
                {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.15,
                    editor: new Ext.form.TextField({
                    	regex :/^[A-Za-z0-9]+$/,
                    	regexText : "只能输入数字和字母!",
                        allowBlank: false
                    })
                }, 
               {header:'IMSI',dataIndex:'imsi',width:gridWidth*0.12,
                   editor: new Ext.form.TextField({
                   	regex :/^[A-Za-z0-9]+$/,
                   	regexText : "只能输入数字和字母!",
                       allowBlank: false
                   })
               }, 
              {header:'用户号码',dataIndex:'subscriberNumber',width:gridWidth*0.12,
                  editor: new Ext.form.NumberField({
                      allowBlank: false,
                      allowNegative: false
                  })
              },
              {
                  header:'编号',dataIndex:'number',width:gridWidth*0.12,
                    editor: new Ext.form.TextField({
                    	regex :/^[A-Za-z0-9]+$/,
                    	regexText : "只能输入数字和字母!",
                        allowBlank: false
                    })
              },
              {header:'测试卡状态',dataIndex:'testcardStatusEnumId',width:gridWidth*0.1,
                  editor: new Ext.form.ComboBox({
                      valueField: 'dataValue',
                      displayField: 'dataName',
                      mode: 'local',
                      triggerAction: 'all',
                      editable : false ,
                      allowBlank: false,
//                      value: '',
                      store: testStatusEnumStore
                  }),
                  renderer: function(value,metadata,record){
                      var index = testStatusEnumStore.find('dataValue',value);
                      if(index!=-1){
                          return testStatusEnumStore.getAt(index).data.dataName;
                      }
                      return value;
                  }
              },
              {
                  header:'ID',dataIndex:'testCardId',hidden:true
              },
              {
                  header:'余额',dataIndex:'balance',width:gridWidth*0.1,
                    editor: new Ext.form.NumberField({
                        allowBlank: true,
                         maxValue: 1000000, 
                         minValue: 0,
                         value: 0,
                        allowNegative: false
                    })
              }
            ];
            return colMArray;
        }
        /*固定电话 固定配置列*/
        this.teleBaseCoumn = function(){
            var colMArray = [
                new Ext.grid.CheckboxSelectionModel(),
                {
                    header:'ID',dataIndex:'fixedTelId',hidden:true
                },
               {header:'电话号码',dataIndex:'phoneNumber',width:gridWidth*0.15,
                   editor: 
//                   new Ext.form.NumberField({
//                       allowBlank: false,
//                       allowNegative: false
//                   })
                   {xtype:'ZTESOFT.textfield',
//                                            fieldLabel: '联系人电话',
                                regex :  /[^\u4e00-\u9fa5]$/,
                                regexText : "请输入正确的电话号码！",
                                allowBlank: false
                                    }
               },               
             {header:'类型',dataIndex:'fixedPhoneTypeEnumId',width:gridWidth*0.15,
                 editor: new Ext.form.ComboBox({
                     valueField: 'dataValue',
                     displayField: 'dataName',
                     mode: 'local',
                     triggerAction: 'all',
                     editable : false ,
                     allowBlank: false,
//                     value: '',
                     store: telePhoneTypeEnumStore
                 }),
                 renderer: function(value,metadata,record){
                     var index = telePhoneTypeEnumStore.find('dataValue',value);
                     if(index!=-1){
                         return telePhoneTypeEnumStore.getAt(index).data.dataName;
                     }
                     return value;
                 }
             },              
             {
                 header:'功能',dataIndex:'teleFunction',width:gridWidth*0.15,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
             },
             {
                 header:'编号',dataIndex:'number',width:gridWidth*0.15,
                   editor: new Ext.form.TextField({
                   	regex :/^[A-Za-z0-9]+$/,
                    regexText : "只能输入数字和字母!",
                       allowBlank: false
                   })
             }
            ];
             return colMArray;
        }
        /*测试终端 固定配置列*/
        this.terimiBaseCoumn = function(){
            var colMArray = [
                    new Ext.grid.CheckboxSelectionModel(),
                    {
                        header:'ID',dataIndex:'testTerminalId',hidden:true
                    },      
                 {header:'手机类型',dataIndex:'moblieTypeEnumId',width:gridWidth*0.1,
                     editor: new Ext.form.ComboBox({
                         valueField: 'dataValue',
                         displayField: 'dataName',
                         mode: 'local',
                         triggerAction: 'all',
                         editable : false ,
                         allowBlank: false,
//                         value: '',
                         store: moblieTypeEnumStore
                     }),
                     renderer: function(value,metadata,record){
                         var index = moblieTypeEnumStore.find('dataValue',value);
                         if(index!=-1){
                             return moblieTypeEnumStore.getAt(index).data.dataName;
                         }
                         return value;
                     }
                 },
                 {
                     header:'厂家',dataIndex:'manufacturerName',width:gridWidth*0.12,
                       editor: new Ext.form.TextField({
                           allowBlank: false
                       })
                 },
                 {
                     header:'手机型号',dataIndex:'phoneModel',width:gridWidth*0.12,
                       editor: new Ext.form.TextField({
                       	regex :/^[A-Za-z0-9]+$/,
                        regexText : "只能输入数字和字母!",
                           allowBlank: false
                       })
                 },
                 {
                     header:'手机串号',dataIndex:'imei',width:gridWidth*0.14,
                       editor: new Ext.form.TextField({
                       	regex :/^[A-Za-z0-9]+$/,
                        regexText : "只能输入数字和字母!",
                           allowBlank: false
                       })
                 },
                 {
                     header:'编号',dataIndex:'number',width:gridWidth*0.12,
                       editor: new Ext.form.TextField({
                       	regex :/^[A-Za-z0-9]+$/,
                        regexText : "只能输入数字和字母!",
                           allowBlank: false
                       })
                 }
            ];
            return colMArray;
        }
        /*充值卡固定配置列*/
        this.rechBaseCoumn = function(){
            var  dicStore = stroe.rechStore;
            var colMArray = [
                new Ext.grid.CheckboxSelectionModel(),
                {
                    header:'ID',dataIndex:'rechCardId',hidden:true
                },
               {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.15,
                   editor: new Ext.form.TextField({
                       maxLength: 30,
                       regex :/^[A-Za-z0-9]+$/,
                        regexText : "只能输入数字和字母!",
                       allowBlank: false
                   })
               },               
             {header:'面值',dataIndex:'parValue',width:gridWidth*0.1,
                 editor: new Ext.form.ComboBox({
                     valueField: 'value',
                     displayField: 'text',
                     mode: 'local',
                     triggerAction: 'all',
                     editable : false ,
                     allowBlank: false,
//                     value: '',
                     store: dicStore
                 }),
                 renderer: function(value,metadata,record){
                     var index = dicStore.find('value',value);
                     if(index!=-1){
                         return dicStore.getAt(index).data.text;
                     }
                     return value;
                 }
             },              
             {
                 header:'编号',dataIndex:'cardNumber',width:gridWidth*0.15,
                   editor: new Ext.form.TextField({
                       maxLength: 30,
                       regex :/^[A-Za-z0-9]+$/,
                        regexText : "只能输入数字和字母!",
                       allowBlank: false
                   })
             },
             {header:'卡类型',dataIndex:'rechCardTypeEnumId',width:gridWidth*0.1,
                 editor: new Ext.form.ComboBox({
                     valueField: 'dataValue',
                     displayField: 'dataName',
                     mode: 'local',
                     triggerAction: 'all',
                     editable : false ,
                     allowBlank: false,
//                     value: '',
                     store: rechTypeStore
                 }),
                 renderer: function(value,metadata,record){
                     var index = rechTypeStore.find('dataValue',value);
                     if(index!=-1){
                         return rechTypeStore.getAt(index).data.dataName;
                     }
                     return value;
                 }
             }
            ];
              return colMArray;
        }
        //编辑
        this.doUpdate = function(){
            var typeId = qryParams.testobjectTypeEnumId;
            var gridName = '';
            if(typeId == testCardEnum){
                gridName = "testGrid";
            }else if(typeId == teleCardEnum){
                gridName = "teleGrid";
            }else if(typeId == terminalEnum){
                gridName = "termiGrid";
            }else if(typeId == rechCardEnum){
                gridName = "rechGrid";
            }
            
            var selinfo = Ext.getCmp(gridName).getSelectionModel().getSelections();
            if(selinfo.length == 0){           
                Ext.Msg.alert('操作提示','没有选择任何记录!');
                return;
            }else if(selinfo.length > 1){
                Ext.Msg.alert('操作提示','不能选择多行!');
                return;
            }
            
            if(selinfo[0].data.adminId!=session.logonAccount.cloudUserId){
                       Ext.Msg.alert("提示","该测试卡的管理员不是当前登录者，不能进行编辑！");
                       return;
                    }
                    
            if(selinfo[0].data.createdBy!=session.logonAccount.cloudUserId){
                       testCardManageIsSameMan = false;
                    }else{
                        testCardManageIsSameMan = true;
                    }

            var cardId = '';
            if(typeId == testCardEnum){
                cardId = selinfo[0].data.testCardId;
            }else if(typeId == teleCardEnum){
                cardId = selinfo[0].data.fixedTelId;
            }else if(typeId == terminalEnum){
                cardId = selinfo[0].data.testTerminalId;
            }else if(typeId == rechCardEnum){
                cardId = selinfo[0].data.rechCardId;
            }  
            
            var items = [];
            var param = {};
            param.attributionProvinceId = selinfo[0].data.attributionProvinceId; 
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
                        modOper.initWindow('update',typeId,cardId,items);
                    }
            );
        }
        
        this.del = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length!=1){
                Ext.Msg.alert('操作提示','请先选择您要修改的行');
            }else{
                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
            }
        }
       
        //下载模板
        this.downModel = function(){
            var cardType = qryParams.testobjectTypeEnumId;
            var provinceName = "";//qryParams.attributionProvinceName;
            provinceName = session.logonAccount.provinceCompanyName;
//                qryParams.attributionProvinceId = session.logonAccount.provinceCompanyId;
//            if(!qryParams.attributionProvinceId){
//            	provinceName = session.logonAccount.provinceCompanyName;
//                qryParams.attributionProvinceId = session.logonAccount.provinceCompanyId;
//                return;
//            }
            var param = new Object();//qryParams;
            param.testobjectTypeEnumId = qryParams.testobjectTypeEnumId;
            param.attributionProvinceName = session.logonAccount.provinceCompanyName;
            param.attributionProvinceId = session.logonAccount.provinceCompanyId;
            if(cardType == testCardEnum){
                param.fileName =  '测试卡模板';
//                param.fileName =  provinceName+'-测试卡模板';
            }else if(cardType == teleCardEnum){
                param.fileName = '固定电话模板';
//                param.fileName = provinceName+ '-固定电话模板';
            }else if(cardType == terminalEnum){
                param.fileName =  '测试终端模板';
//                param.fileName =  provinceName+'-测试终端模板';
            }else if(cardType == rechCardEnum){
                param.fileName =  '充值卡模板';
//                param.fileName =  provinceName+'-充值卡模板';
            }
            
            param.accountId = session.logonAccount.accountId;
            param.cloudUserId = session.logonAccount.cloudUserId;
            param.userEmpName = session.logonAccount.userEmpName;
            param.userDeptName = session.logonAccount.userDeptName;
            param.cloudOrgId = session.logonAccount.cloudOrgId;
            param.provinceCompanyId = session.logonAccount.provinceCompanyId;
            param.provinceCompanyName = session.logonAccount.provinceCompanyName;
            param.cityCompanyId = session.logonAccount.cityCompanyId;
            param.cityCompanyName = session.logonAccount.cityCompanyName;
            
            param.cardType = cardType;
            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.CreTestCardTemServiImpl';

            param.fileType = 'EXCEL';
            
            param.exportType = 'ALL';
            this.exportExcel(param);
        }
        
        //导出excle
        this.exportExcel = function(param){
            var jsonStr = Ext.util.JSON.encode(param);
            
            if (!Ext.fly('downForm')) {

                var downForm = document.createElement('form');

                downForm.id = 'downForm';

                downForm.name = 'downForm';

                downForm.className = 'x-hidden';

                downForm.action = PATH + '/excel/exportExcel.do';

                downForm.method = 'post';
                
                var data = document.createElement('input');

                data.type = 'hidden';// 隐藏域

                data.name = 'jsonStr';// form表单参数

                data.value = jsonStr;// form表单值

                downForm.appendChild(data);

                document.body.appendChild(downForm);

            }

            Ext.fly('downForm').dom.submit();

            if (Ext.fly('downForm')) {

                document.body.removeChild(downForm);

            }
        }
        
        /**数据验证BEGIN**/     
        //页面panel验证
        this.formValid = function(typeId){
            var formName = '';
            if(typeId == testCardEnum){
                formName = 'testCardPage';
            }else if(typeId == teleCardEnum){
                formName = 'teleCardPage';
            }else if(typeId == terminalEnum){
                formName = 'termiCardPage';
            }else if(typeId == rechCardEnum){
                formName = 'rechCardPage';
            }
            var flag=true;
            Ext.each(Ext.getCmp(formName).getForm().items.items, function(item) { 
                if(!item.isValid()){
                    //Ext.Msg.alert("提示",item.fieldLabel+"  "+item.activeError);
                    item.focus();
                    return flag = false;
                }
            });
            return flag;
        }
        
      //可编辑grid数据验证
        this.editGridValidate = function(gridName,isUpload){
            var flag=true;
            var cm = Ext.getCmp(gridName).getColumnModel();
            var store = Ext.getCmp(gridName).getStore();
            var data =  Ext.getCmp(gridName).getSelectionModel().getSelections();
            for (var i = 0; i < data.length; i++) {
                var record = data[i];//获得每行数据
                var fields = record.fields.keys;//获取列名

                for (var j = 0; j < fields.length; j++) {
                    var name = fields[j];//列名
                    var value = record.data[name];//单元格的数值
                    var colIndex = cm.findColumnIndex(name);//列号
                    var header = cm.getColumnHeader(colIndex);
                    var rowIndex = store.indexOfId(record.id);//行号
                    var cellEditor = cm.getCellEditor(colIndex,rowIndex);
                    if(!cellEditor){
                        continue;
                    }                    
                    var editor = cellEditor.field;//colIndex使用的编辑器
                    if(!editor.allowBlank){//不能为空
                        if((value+"")==""||value==null){//!value){
                            Ext.Msg.alert('提示',header + " 该项为必填项", function(){
                                Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                            });
                            return flag=false;
                        }
                    }
                    if(!((value+"")==""||value==null||value=="undefined")){
                    	  if (!editor.validateValue(value+"")) {
                              var alStr = "";
                              if(editor.activeError==null){
                                  alStr = editor.regexText;
                              }else{
                                  alStr = editor.activeError;
                              }
                              Ext.Msg.alert('提示',header + " " +alStr , function(){
                                  Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                              });
                              return flag=false;
                          }
                    }
                    //批量导入还需要验人员，组织
                    if(isUpload){
                        var orgId = parseInt(record.data['storageDepartmentId']);
                        var param = {};
                        var response = null;
                        if(name == 'storageDepartmentId'){
                            param = {
                                    orgId : parseInt(value)
                            };
                            url = PATH+'/commonData/proxy4AUserAndOrg/findOrgbyOrgId.json';
                            response = ZTESOFT.Synchronize(url,param);
                            if(!response){
                                Ext.Msg.alert('提示',"组织:"+value + " 不存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        
                        if(name == 'wareManId' || name == 'adminId'){
                           param = {
                                    orgId : orgId,
                                    userId : parseInt(value)
                            };
                            url = PATH+'/commonData/proxy4AUserAndOrg/checkUserIDAndOrgID.json';
                            response = ZTESOFT.Synchronize(url,param);
                            if(!response.flag){
                                Ext.Msg.alert('提示',"人员:"+value + " 不存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        
                    }
                    if(gridName == 'testEditGrid'){
                        var param = {};
                        var response = null;
                        if(name == 'cardNo'){
                            param = {
                                    cardNoEqual : value
                            };
                            url = PATH+'/e19/testCardRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        if(name == 'imsi'){
                            param = {
                                    imsiEqual : value
                            };
                            url = PATH+'/e19/testCardRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        if(name == 'number'){
                            param = {
                                    numberEqual : value
                            };
                            url = PATH+'/e19/testCardRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                    }else if(gridName == 'teleEditGrid'){
                        var param = {};
                        var response = null;
                        if(name == 'phoneNumber'){
                            param = {
                                    phoneNumberEqual : value
                            };
                            url = PATH+'/e19/imsRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        if(name == 'number'){
                            param = {
                                    numberEqual : value
                            };
                            url = PATH+'/e19/imsRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                    }else if(gridName == 'termiEditGrid'){
                        var param = {};
                        var response = null;
                        if(name == 'imei'){
                            param = {
                                    imeiEqual : value
                            };
                            url = PATH+'/e19/terminalRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        if(name == 'number'){
                            param = {
                                    numberEqual : value
                            };
                            url = PATH+'/e19/terminalRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                    }else if(gridName == 'rechEditGrid'){
                        var param = {};
                        var response = null;
                        if(name == 'cardNo'){
                            param = {
                                    cardNoEqual : value
                            };
                            url = PATH+'/e19/rechCardRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                        if(name == 'cardNumber'){
                            param = {
                                    cardNumberEqual : value
                            };
                            url = PATH+'/e19/rechCardRegisterAction.json?method=qryList'; 
                            response = ZTESOFT.Synchronize(url,param);
                            if(response && response.rows && response.rows.length > 0){
                                Ext.Msg.alert('提示',header +"["+value+"]"+ "已经存在!", function(){
                                    Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                                });
                                return flag=false;
                            }
                        }
                    }
                }
            }
            return flag;
        }
      
        /**数据验证END**/
    }
    

    function ManagerOper(){
        this.exportData = function(){
            
            var param = qryParams;
            param.cardType = qryParams.testobjectTypeEnumId;
            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ExpTestCardManaServiImpl';
            param.isNeedPrivate = 0;
            if(param.attributionProvinceId != null){
            	param.isNeedPrivate = 1;
//                Ext.Msg.alert('操作提示','请点开高级检索选择归属省份');
//                return;
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