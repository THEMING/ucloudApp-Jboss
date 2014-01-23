 var testCardManageAddWinId = "testCardManageAddDetailWin";
 var testCardManageAddWinIdOld = "";
 
 function TestCardAddOper(){
        //主窗口
        this.winTitle = '';
        var formWidth = 750;
        var now = new Date();
        this.initWindow = function(colMArray,items,addTestobjectTypeEnumId){
            var typeId = addTestobjectTypeEnumId;
                        
            var tmpform;
            var tmpgrid;
            var tmpHeight = body_height*0.9;
            
                if(typeId == testCardEnum){
                    tmpform = this.getTestPn(items);
                    tmpgrid = this.initTestGrid(colMArray);
                    
                    this.winTitle = '测试卡登记新增';
                    testStatusEnumStore.load();
                }else if (typeId == teleCardEnum){
                    tmpform = this.getTelePn(items);
                    tmpgrid = this.initImsGrid(colMArray);
                    
                    this.winTitle = '固定电话登记新增';
                    telePhoneTypeEnumStore.load();
                }else if (typeId == terminalEnum){
                    tmpform = this.getTermiPn(items);
                    tmpgrid = this.initTerminalGrid(colMArray);
                    
                    this.winTitle = '测试终端登记新增';
                    moblieTypeEnumStore.load();
                }else if (typeId == rechCardEnum){
                    
                    tmpform = this.getRechPn(items);
                    tmpgrid = this.initRechCardGrid(colMArray);
                    
                    this.winTitle = '充值卡登记新增';
                    rechTypeStore.load();
                }
                
//            var cardTypeItem = {
//                        colspan : 1,
//                        items : {
//                            xtype : 'ZTESOFT.label',
//                            text : '测试卡类型'
//                        }
//                    },
//                    {
//                        colspan : 5,
//                        width : 110*5,
//                        items : {
//                            xtype: 'radiogroup',
//                            hideLabel : true,
//                            id : 'cardType',
//                            name : 'cardType',
//                            anchor : '100%',
//                            items: [
//                                    {boxLabel: '测试卡', name: 'testobjectTypeEnumId', inputValue: 1},
//                                    {boxLabel: '测试终端', name: 'testobjectTypeEnumId', inputValue: 2},
//                                    {boxLabel: '固定电话', name: 'testobjectTypeEnumId', inputValue: 3},
//                                    {boxLabel: '充值卡', name: 'testobjectTypeEnumId', inputValue: 4}
//                            ],
//                            listeners : {
//                                change : function(radiofield,oldvalue){          
//                                    if(radiofield.getValue().inputValue == testCardEnum){ 
//                                        Ext.getCmp('testGrid').setVisible(true);
//                                        Ext.getCmp('teleGrid').setVisible(false);
//                                        Ext.getCmp('termiGrid').setVisible(false);
//                                        Ext.getCmp('rechGrid').setVisible(false);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(true);
//                                        Ext.getCmp('qryTeleForm').setVisible(false);
//                                        Ext.getCmp('qryTermiForm').setVisible(false);
//                                        Ext.getCmp('qryRechForm').setVisible(false);
//                                    }else if(radiofield.getValue().inputValue == teleCardEnum){
//                                        Ext.getCmp('testGrid').setVisible(false);
//                                        Ext.getCmp('teleGrid').setVisible(true);
//                                        Ext.getCmp('termiGrid').setVisible(false);
//                                        Ext.getCmp('rechGrid').setVisible(false);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(false);
//                                        Ext.getCmp('qryTeleForm').setVisible(true);
//                                        Ext.getCmp('qryTermiForm').setVisible(false);
//                                        Ext.getCmp('qryRechForm').setVisible(false);
//                                    }else if(radiofield.getValue().inputValue == terminalEnum){
//                                        Ext.getCmp('testGrid').setVisible(false);
//                                        Ext.getCmp('teleGrid').setVisible(false);
//                                        Ext.getCmp('termiGrid').setVisible(true);
//                                        Ext.getCmp('rechGrid').setVisible(false);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(false);
//                                        Ext.getCmp('qryTeleForm').setVisible(false);
//                                        Ext.getCmp('qryTermiForm').setVisible(true);
//                                        Ext.getCmp('qryRechForm').setVisible(false);
//                                    }else if(radiofield.getValue().inputValue == rechCardEnum){
//                                        Ext.getCmp('testGrid').setVisible(false);
//                                        Ext.getCmp('teleGrid').setVisible(false);
//                                        Ext.getCmp('termiGrid').setVisible(false);
//                                        Ext.getCmp('rechGrid').setVisible(true);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(false);
//                                        Ext.getCmp('qryTeleForm').setVisible(false);
//                                        Ext.getCmp('qryTermiForm').setVisible(false);
//                                        Ext.getCmp('qryRechForm').setVisible(true);
//                                    }
//                                }
//                            }
//                        }
//                    }
                
            var cardTypeItem = new TestCardAddOper().initTestCardManageAddCardTypePn(typeId);
                
            var formWin = new Ext.Window({
                id:testCardManageAddWinId,
                title: this.winTitle,
                closable:true,
                width: formWidth,
                height: tmpHeight,
                layout: 'anchor',
                plain:true,
                modal : true,
                bodyStyle :'overflow-x:hidden;overflow-y:scroll',
                items: [cardTypeItem,tmpform,tmpgrid],
                buttonAlign:'center',
                buttons: [{
                    text: '保存',
                    xtype: 'ZTESOFT.Button',
                    id : testCardManageAddWinId+'save',
                    onClick:function(){
                        addOper.saveWin(typeId);
                    }
                },{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    id :testCardManageAddWinId+'close',
                    onClick:function(){
                        Ext.getCmp(testCardManageAddWinId).close();
                    }
                }]
            });
            formWin.show();   
            
            Ext.getCmp(testCardManageAddWinId+'cardType').setValue(typeId);
        }
        
        this.initTestCardManageAddCardTypePn = function(typeId){
            var ctForm = new Ext.FormPanel({
                id : testCardManageAddWinId+'ctForm',
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
                            id : testCardManageAddWinId+'cardType',
                            name : testCardManageAddWinId+'cardType',
                            anchor : '100%',
                            items: [
                                    {boxLabel: '测试卡', name: 'testobjectTypeEnumId', inputValue: 1},
                                    {boxLabel: '测试终端', name: 'testobjectTypeEnumId', inputValue: 2},
                                    {boxLabel: '固定电话', name: 'testobjectTypeEnumId', inputValue: 3},
                                    {boxLabel: '充值卡', name: 'testobjectTypeEnumId', inputValue: 4}
                            ],
                            listeners : {
                                change : function(radiofield,oldvalue){  //alert(typeId+"|"+radiofield.getValue().inputValue+"|"+(typeId==radiofield.getValue().inputValue)+"|"+(!typeId==radiofield.getValue().inputValue));
                                	if(!(addTestobjectTypeEnumId==radiofield.getValue().inputValue)){
                                		
                                		//销毁组件
                                		if(addTestobjectTypeEnumId == testCardEnum){
                                			Ext.getCmp("testCardPage").destroy();
                                			Ext.getCmp("testEditGrid").destroy();
                                        }else if (addTestobjectTypeEnumId == teleCardEnum){
                                        	Ext.getCmp("teleCardPage").destroy();
                                            Ext.getCmp("teleEditGrid").destroy();
                                        }else if (addTestobjectTypeEnumId == terminalEnum){
                                        	Ext.getCmp("termiCardPage").destroy();
                                            Ext.getCmp("termiEditGrid").destroy();
                                        }else if (addTestobjectTypeEnumId == rechCardEnum){
                                            Ext.getCmp("rechCardPage").destroy();
                                            Ext.getCmp("rechEditGrid").destroy();
                                        }
                                		addTestobjectTypeEnumId = radiofield.getValue().inputValue;
                                		var colMArray = oper.baseCoumn(radiofield.getValue().inputValue);
                                        var pubItems = oper.getAddPubItems(radiofield.getValue().inputValue);
                                        var tmpform = null;
                                        var tmpgrid = null;
                                        
                                        if(radiofield.getValue().inputValue == testCardEnum){
                                            tmpform = new TestCardAddOper().getTestPn(pubItems);
                                            tmpgrid = new TestCardAddOper().initTestGrid(colMArray);
                                            
                                            Ext.getCmp(testCardManageAddWinId).setTitle('测试卡登记新增');
                                            testStatusEnumStore.load();
                                        }else if (radiofield.getValue().inputValue == teleCardEnum){
                                            tmpform = new TestCardAddOper().getTelePn(pubItems);
                                            tmpgrid = new TestCardAddOper().initImsGrid(colMArray);
                                            
                                            Ext.getCmp(testCardManageAddWinId).setTitle('固定电话登记新增');
                                            telePhoneTypeEnumStore.load();
                                        }else if (radiofield.getValue().inputValue == terminalEnum){
                                            tmpform = new TestCardAddOper().getTermiPn(pubItems);
                                            tmpgrid = new TestCardAddOper().initTerminalGrid(colMArray);
                                            
                                            Ext.getCmp(testCardManageAddWinId).setTitle('测试终端登记新增');
                                            moblieTypeEnumStore.load();
                                        }else if (radiofield.getValue().inputValue == rechCardEnum){
                                            
                                            tmpform = new TestCardAddOper().getRechPn(pubItems);
                                            tmpgrid = new TestCardAddOper().initRechCardGrid(colMArray);
                                            
                                            Ext.getCmp(testCardManageAddWinId).setTitle('充值卡登记新增');
                                            rechTypeStore.load();
                                        }
                                        
                                        Ext.getCmp(testCardManageAddWinId).add(tmpform);
                                        Ext.getCmp(testCardManageAddWinId).add(tmpgrid);
                                        addOper.initAttributionCityId();
                                        addOper.initStorageCityId();
                                        Ext.getCmp(testCardManageAddWinId).doLayout();
                                	}
                                	
//                                    if(radiofield.getValue().inputValue == testCardEnum){ 
//                                        Ext.getCmp('testGrid').setVisible(true);
//                                        Ext.getCmp('teleGrid').setVisible(false);
//                                        Ext.getCmp('termiGrid').setVisible(false);
//                                        Ext.getCmp('rechGrid').setVisible(false);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(true);
//                                        Ext.getCmp('qryTeleForm').setVisible(false);
//                                        Ext.getCmp('qryTermiForm').setVisible(false);
//                                        Ext.getCmp('qryRechForm').setVisible(false);
//                                    }else if(radiofield.getValue().inputValue == teleCardEnum){
//                                        Ext.getCmp('testGrid').setVisible(false);
//                                        Ext.getCmp('teleGrid').setVisible(true);
//                                        Ext.getCmp('termiGrid').setVisible(false);
//                                        Ext.getCmp('rechGrid').setVisible(false);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(false);
//                                        Ext.getCmp('qryTeleForm').setVisible(true);
//                                        Ext.getCmp('qryTermiForm').setVisible(false);
//                                        Ext.getCmp('qryRechForm').setVisible(false);
//                                    }else if(radiofield.getValue().inputValue == terminalEnum){
//                                        Ext.getCmp('testGrid').setVisible(false);
//                                        Ext.getCmp('teleGrid').setVisible(false);
//                                        Ext.getCmp('termiGrid').setVisible(true);
//                                        Ext.getCmp('rechGrid').setVisible(false);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(false);
//                                        Ext.getCmp('qryTeleForm').setVisible(false);
//                                        Ext.getCmp('qryTermiForm').setVisible(true);
//                                        Ext.getCmp('qryRechForm').setVisible(false);
//                                    }else if(radiofield.getValue().inputValue == rechCardEnum){
//                                        Ext.getCmp('testGrid').setVisible(false);
//                                        Ext.getCmp('teleGrid').setVisible(false);
//                                        Ext.getCmp('termiGrid').setVisible(false);
//                                        Ext.getCmp('rechGrid').setVisible(true);
//                                        
//                                        Ext.getCmp('qryTestForm').setVisible(false);
//                                        Ext.getCmp('qryTeleForm').setVisible(false);
//                                        Ext.getCmp('qryTermiForm').setVisible(false);
//                                        Ext.getCmp('qryRechForm').setVisible(true);
//                                    }
                                }
                            }
                        }
                    }
                ]
            });
            return ctForm;
        }
       
        this.saveWin = function(typeId){
        	var typeIdd = addTestobjectTypeEnumId;
            if(typeIdd == testCardEnum){
                addOper.saveTestCard(typeIdd);
            }else if(typeIdd == teleCardEnum){
                addOper.saveIms(typeIdd);
            }else if(typeIdd == terminalEnum){
                addOper.saveTerminal(typeIdd);
            }else if(typeIdd == rechCardEnum){
                addOper.saveRechCard(typeIdd);
            }
        }
        
        //获取对应省份的测试卡私有属性模板明细
        this.getPriDetail = function(typeId){
            var param = {};
            param.testobjectType = typeId;
            param.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
            
            var url = PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList'; 
            var response = ZTESOFT.Synchronize(url,param);
            if(response && response.rows && response.rows.length > 0){
                return response.rows;
            }else{
                return null;
            }
        }
        
        //私有属性校验
        this.priInfoValidate = function(priDetList,data,index){
            if(priDetList){
                for(var i=0;i<priDetList.length;i++){
                    if(!priDetList[i].isNull){//非空字段
                        if(!data[priDetList[i].columnNumber]){
                            Ext.Msg.alert('操作提示','私有属性第'+(index+1)+'行'+priDetList[i].columnName+'不能为空!');
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        
        //新增 测试卡
        this.saveTestCard = function(typeId){
            if(!oper.formValid(typeId)){
                return;
            }
            
            var obj = Ext.getCmp('testCardPage').getForm().getValues();
            
            var effectiveDate = StringToDate(obj.effectiveDate+" 23:59:59");
            if(effectiveDate < now){
                Ext.Msg.alert('操作提示','生效日期不能小于当前日期!');
                return;
            }
            
            if(obj.cancelDate){
                if(StringToDate(obj.cancelDate) < StringToDate(obj.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            
            Ext.getCmp('testEditGrid').getSelectionModel().selectAll();
            var selItems = Ext.getCmp('testEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('testEditGrid',false)){
                    return;
                }
                if(!this.checkUniqueTest(selItems)){
                    return;
                }
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                    selItems[i].data.testobjectTypeEnumId = typeId;
                    selItems[i].data.testcardTypeEnumId = Ext.getCmp('testcardTypeEnumId').getValue();
                    selItems[i].data.operatorEnumId = Ext.getCmp('operatorEnumId').getValue();
                    selItems[i].data.cardNetworkTypeEnumId = Ext.getCmp('cardNetworkTypeEnumId').getValue();
                    selItems[i].data.attributionCountryEnumId = Ext.getCmp('attributionCountryEnumId').getValue();
                    selItems[i].data.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
                    selItems[i].data.attributionCityId = Ext.getCmp('attributionCityId').getValue();
                    selItems[i].data.attributionScp = obj.attributionScp;
                    selItems[i].data.scpManufacturer = obj.scpManufacturer;                    
                    selItems[i].data.effectiveDate = obj.effectiveDate;
                    selItems[i].data.attributionHlr = obj.attributionHlr;
                    selItems[i].data.hlrManufacturer = obj.hlrManufacturer;
                    selItems[i].data.cancelDate = obj.cancelDate;
                    selItems[i].data.pin1 = obj.pin1;
                    selItems[i].data.pin2 = obj.pin2;
                    selItems[i].data.lastTestDate = obj.lastTestDate;
                    selItems[i].data.puk1 = obj.puk1;                    
                    selItems[i].data.puk2 = obj.puk2;
                    selItems[i].data.wareManId = obj.wareManId;
                    selItems[i].data.packageTypeEnumId = Ext.getCmp('packageTypeEnumId').getValue();
                    selItems[i].data.attchPackageEnumId = Ext.getCmp('attchPackageEnumId').getValue();
                    selItems[i].data.storageDepartmentId = obj.storageDepartmentId;
                    selItems[i].data.monthGrants = obj.monthGrants;
                    selItems[i].data.whetherPrepaid = Ext.getCmp('whetherPrepaid').getValue();
                    selItems[i].data.adminId = obj.adminId; 
                    selItems[i].data.storagePlace = obj.storagePlace;
                    selItems[i].data.cardUse = obj.cardUse;
                    selItems[i].data.remarks = obj.remarks;
                    
                    selItems[i].data.attributionProvinceName = Ext.getCmp('attributionProvinceName').getValue();//obj.attributionProvinceId;
                    selItems[i].data.attributionCityName = Ext.getCmp('attributionCityName').getValue();//obj.attributionCityId;
                    selItems[i].data.storageDepartmentName = obj.storageDepartmentName;
                    selItems[i].data.adminName = obj.adminName;
                    selItems[i].data.storageCityId = obj.storageCityId;
                    selItems[i].data.storageCityName = obj.storageCityName;
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = 0;
                    selItems[i].data.marketingAreaId = session.logonAccount.marketingAreaId;
                    selItems[i].data.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                    selItems[i].data.orgId = session.logonAccount.cloudOrgId;
                    dataArray.push(selItems[i].data);
                }
                var param = {};
                param.dataArray = Ext.encode(dataArray);
                ZTESOFT.invokeAction(
                        PATH+'/e19/testCardRegisterAction.json?method=insertTestCardInfoBatch',
                        param,
                        function(response){
                            Ext.Msg.alert('操作提示','新建成功!');
                            Ext.getCmp(testCardManageAddWinId).close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','私有属性不能为空!');
                return;
            }
        }
        
      //新增 固定电话
        this.saveIms = function(typeId){
            if(!oper.formValid(typeId)){
                return;
            }
            var obj = Ext.getCmp('teleCardPage').getForm().getValues();
            var effectiveDate = StringToDate(obj.effectiveDate+" 23:59:59");
            if(effectiveDate < now){
                Ext.Msg.alert('操作提示','生效日期不能小于当前日期!');
                return;
            }
            if(obj.cancelDate){
                if(StringToDate(obj.cancelDate) < StringToDate(obj.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            
            Ext.getCmp('teleEditGrid').getSelectionModel().selectAll();
            var selItems = Ext.getCmp('teleEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('teleEditGrid',false)){
                    return;
                }
                if(!this.checkUniqueTele(selItems)){
                    return;
                }
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                        
                    selItems[i].data.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
                    selItems[i].data.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
                    selItems[i].data.attributionCityId = Ext.getCmp('attributionCityId').getValue();
                    
                    selItems[i].data.testobjectTypeEnumId = typeId; 
                    selItems[i].data.effectiveDate = obj.effectiveDate;
                    selItems[i].data.cancelDate = obj.cancelDate;
                    selItems[i].data.wareManId = obj.wareManId;
                    selItems[i].data.storageDepartmentId = obj.storageDepartmentId;
                    selItems[i].data.adminId = obj.adminId;
                    selItems[i].data.storagePlace = obj.storagePlace;
                    selItems[i].data.cardUse = obj.cardUse;
                    selItems[i].data.remarks = obj.remarks;
                    
                    selItems[i].data.attributionProvinceName = Ext.getCmp('attributionProvinceName').getValue();//obj.attributionProvinceId;
                    selItems[i].data.attributionCityName = Ext.getCmp('attributionCityName').getValue();//obj.attributionCityId;
                    selItems[i].data.storageDepartmentName = obj.storageDepartmentName;
                    selItems[i].data.adminName = obj.adminName;
                    selItems[i].data.storageCityId = obj.storageCityId;
                    selItems[i].data.storageCityName = obj.storageCityName;
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = 0;
                    selItems[i].data.marketingAreaId = session.logonAccount.marketingAreaId;
                    selItems[i].data.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                    selItems[i].data.orgId = session.logonAccount.cloudOrgId;
                    dataArray.push(selItems[i].data);
                }
                var param = {};
                param.dataArray = Ext.encode(dataArray);
                ZTESOFT.invokeAction(
                        PATH+'/e19/testCardRegisterAction.json?method=addImsInfoBatch',
                        param,
                        function(response){
                            Ext.Msg.alert('操作提示','新建成功!');
                            Ext.getCmp(testCardManageAddWinId).close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','私有属性不能为空!');
                return;
            }
        }
        
      //新增 测试终端
        this.saveTerminal = function(typeId){
            if(!oper.formValid(typeId)){
                return;
            }
            var obj = Ext.getCmp('termiCardPage').getForm().getValues();
            var effectiveDate = StringToDate(obj.effectiveDate+" 23:59:59");
            if(effectiveDate < now){
                Ext.Msg.alert('操作提示','生效日期不能小于当前日期!');
                return;
            }
            if(obj.cancelDate){
                if(StringToDate(obj.cancelDate) < StringToDate(obj.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            
            Ext.getCmp('termiEditGrid').getSelectionModel().selectAll();
            var selItems = Ext.getCmp('termiEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('termiEditGrid',false)){
                    return;
                }
                if(!this.checkUniqueTermi(selItems)){
                    return;
                }
                
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                    selItems[i].data.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
                    selItems[i].data.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
                    selItems[i].data.attributionCityId = Ext.getCmp('attributionCityId').getValue();
                    selItems[i].data.testobjectTypeEnumId = typeId; 
                    selItems[i].data.effectiveDate = obj.effectiveDate;
                    selItems[i].data.cancelDate = obj.cancelDate;
                    selItems[i].data.wareManId = obj.wareManId;
                    selItems[i].data.storageDepartmentId = obj.storageDepartmentId;
                    selItems[i].data.adminId = obj.adminId;
                    selItems[i].data.storagePlace = obj.storagePlace;
                    selItems[i].data.cardUse = obj.cardUse;
                    selItems[i].data.remarks = obj.remarks;
                    
                    selItems[i].data.attributionProvinceName = Ext.getCmp('attributionProvinceName').getValue();//obj.attributionProvinceId;
                    selItems[i].data.attributionCityName = Ext.getCmp('attributionCityName').getValue();//obj.attributionCityId;
                    selItems[i].data.storageDepartmentName = obj.storageDepartmentName;
                    selItems[i].data.adminName = obj.adminName;
                    selItems[i].data.storageCityId = obj.storageCityId;
                    selItems[i].data.storageCityName = obj.storageCityName;
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = 0;
                    selItems[i].data.marketingAreaId = session.logonAccount.marketingAreaId;
                    selItems[i].data.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                    selItems[i].data.orgId = session.logonAccount.cloudOrgId;
                    dataArray.push(selItems[i].data);
                }
                var param = {};
                param.dataArray = Ext.encode(dataArray);
                ZTESOFT.invokeAction(
                        PATH+'/e19/terminalRegisterAction.json?method=addBatch',
                        param,
                        function(response){
                            Ext.Msg.alert('操作提示','新建成功!');
                            Ext.getCmp(testCardManageAddWinId).close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','私有属性不能为空!');
                return;
            }
        }
  
      //新增 充值卡  
        this.saveRechCard = function(typeId){
            if(!oper.formValid(typeId)){
                return;
            }
            
            var obj = Ext.getCmp('rechCardPage').getForm().getValues();
            var effectiveDate = StringToDate(obj.effectiveDate+" 23:59:59");
            if(effectiveDate < now){
                Ext.Msg.alert('操作提示','生效日期不能小于当前日期!');
                return;
            }
            if(obj.cancelDate){
                if(StringToDate(obj.cancelDate) < StringToDate(obj.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            
            Ext.getCmp('rechEditGrid').getSelectionModel().selectAll();
            var selItems = Ext.getCmp('rechEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('rechEditGrid',false)){
                    return;
                }
                if(!this.checkUniqueRech(selItems)){
                    return;
                }
                
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                    selItems[i].data.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
                    selItems[i].data.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
                    selItems[i].data.attributionCityId = Ext.getCmp('attributionCityId').getValue();
                    
                    selItems[i].data.testobjectTypeEnumId = typeId; 
                    selItems[i].data.effectiveDate = obj.effectiveDate;
                    selItems[i].data.cancelDate = obj.cancelDate;
                    selItems[i].data.wareManId = obj.wareManId;
                    selItems[i].data.storageDepartmentId = obj.storageDepartmentId;
                    selItems[i].data.adminId = obj.adminId;
                    selItems[i].data.storagePlace = obj.storagePlace;
                    selItems[i].data.cardUse = obj.cardUse;
                    selItems[i].data.remarks = obj.remarks;
                    
                    selItems[i].data.attributionProvinceName = Ext.getCmp('attributionProvinceName').getValue();//obj.attributionProvinceId;
                    selItems[i].data.attributionCityName = Ext.getCmp('attributionCityName').getValue();//obj.attributionCityId;
                    selItems[i].data.storageDepartmentName = obj.storageDepartmentName;
                    selItems[i].data.adminName = obj.adminName;
                    selItems[i].data.storageCityId = obj.storageCityId;
                    selItems[i].data.storageCityName = obj.storageCityName;
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = 0;
                    selItems[i].data.marketingAreaId = session.logonAccount.marketingAreaId;
                    selItems[i].data.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                    selItems[i].data.orgId = session.logonAccount.cloudOrgId;
                    
                    dataArray.push(selItems[i].data);
                }
                var param = {};
                param.dataArray = Ext.encode(dataArray);
                ZTESOFT.invokeAction(
                        PATH+'/e19/rechCardRegisterAction.json?method=addBatch',
                        param,
                        function(response){
                            Ext.Msg.alert('操作提示','新建成功!');
                            Ext.getCmp(testCardManageAddWinId).close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','私有属性不能为空!');
                return;
            }
        }
        
        this.checkUniqueTest = function(dataArray){
            var flag = true;
            for(var i=0;i<dataArray.length;i++){
                var cardNo = dataArray[i].data.cardNo;
                var imsi = dataArray[i].data.imsi;
                var number = dataArray[i].data.number;
                for(var j=i+1;j<dataArray.length;j++){
                    if(cardNo == dataArray[j].data.cardNo){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行卡号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                    if(imsi == dataArray[j].data.imsi){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行imsi和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                    if(number == dataArray[j].data.number){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行编号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                }
            }
            return flag;
        }
        
        this.checkUniqueTele = function(dataArray){
            var flag = true;
            for(var i=0;i<dataArray.length;i++){
                var phoneNumber = dataArray[i].data.phoneNumber;
                var number = dataArray[i].data.number;
                for(var j=i+1;j<dataArray.length;j++){
                    if(phoneNumber == dataArray[j].data.phoneNumber){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行电话号码和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                    if(number == dataArray[j].data.number){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行编号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                }
            }
            return flag;
        }
        
        this.checkUniqueTermi = function(dataArray){
            var flag = true;
            for(var i=0;i<dataArray.length;i++){
                var imei = dataArray[i].data.imei;
                var number = dataArray[i].data.number;
                for(var j=i+1;j<dataArray.length;j++){
                    if(imei == dataArray[j].data.imei){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行手机串号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                    if(number == dataArray[j].data.number){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行编号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                }
            }
            return flag;
        }
        
        this.checkUniqueRech = function(dataArray){
            var flag = true;
            for(var i=0;i<dataArray.length;i++){
                var cardNo = dataArray[i].data.cardNo;
                var cardNumber = dataArray[i].data.cardNumber;
                for(var j=i+1;j<dataArray.length;j++){
                    if(cardNo == dataArray[j].data.cardNo){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行卡号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                    if(cardNumber == dataArray[j].data.cardNumber){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行编号和第'+(j+1)+'行相同!');
                        return flag=false;
                    }
                }
            }
            return flag;
        }
        
        //初始化测试卡详情页面
        this.getTestPn = function(items){
            
            var  testPn = new Ext.FormPanel({
                id : 'testCardPage',
                region : 'north',
                buttonAlign : 'right',
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
                    width : 110,
                    height : 30
                },
                items : items
            });
            
            return testPn;
            
        }        
        
        this.doAdd = function(){
            var typeId = addTestobjectTypeEnumId;
            
            var grid = null;
            var p = null;
            if(typeId == testCardEnum){
              //新插入一行
                grid = Ext.getCmp('testEditGrid');
                //获得store的record定义
                var Plant = grid.getStore().recordType;
                //创建一个record
                p = new Plant({
                    testcardStatusEnumId: 1,
                    balance:0
                    
                });                
            }else if(typeId == teleCardEnum){
                grid = Ext.getCmp('teleEditGrid');
                var Plant = grid.getStore().recordType;
                p = new Plant({
                    fixedPhoneTypeEnumId: 1
                });                
            }else if(typeId == terminalEnum){
                grid = Ext.getCmp('termiEditGrid');
                var Plant = grid.getStore().recordType;
                p = new Plant({
                    moblieTypeEnumId: 1
                });                
            }else if(typeId == rechCardEnum){
                grid = Ext.getCmp('rechEditGrid');
                var Plant = grid.getStore().recordType;
                p = new Plant({
                    parValue: 1,
                    rechCardTypeEnumId: 1
                });                
            }
            
          //选停止监听编辑事件
            grid.stopEditing();
            //插入行
            grid.getStore().insert(0, p);
            //恢复监听
            grid.startEditing(0, 0);
        }
        
        this.doDel = function(){
            var typeId = addTestobjectTypeEnumId;
            
            var gridName = '';
            if(typeId == testCardEnum){
                gridName = 'testEditGrid';                
            }else if(typeId == teleCardEnum){
                gridName = 'teleEditGrid';
            }else if(typeId == terminalEnum){
                gridName = 'termiEditGrid';
            }else if(typeId == rechCardEnum){
                gridName = 'rechEditGrid';
            }
            
            var selItems = Ext.getCmp(gridName).getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                    if(btn=="yes"){
                        Ext.getCmp(gridName).getStore().remove(selItems);
                    }
                });
            }else{
                Ext.Msg.alert('操作提示','请先选择要删除的行');
                return;
            }
        }
        
        //初始化固定电话详情页面
        this.getTelePn = function(items){
            
            var  telePn = new Ext.FormPanel({
                id : 'teleCardPage',
                region : 'north',
                buttonAlign : 'right',
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
                    width : 110,
                    height : 30
                },
                items : items
                });
            
            return telePn;
            
        }
        
        this.initTestGrid = function(colMArray) {
            
            var cm = new Ext.grid.CheckboxSelectionModel();
            
            var column = new Ext.grid.ColumnModel(colMArray);
            
            var fields = new Array();  
            for(var i=0;i<column.getColumnCount();i++){
                fields.push({name:column.getDataIndex(i)});
            }

            var store = ZTESOFT.createGridStore({
                id:'testStore',
                fields: fields,
                url:null
            }); 
            
            var grid = new ZTESOFT.EditorGridPanel({
                id:'testEditGrid',
                store: store,
                cm: column,
                sm :cm,
                anchor:'98%',
                height: body_height*0.4,
                clicksToEdit: 1,
                frame:true,
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                title : '测试卡私有属性'
            });
            return grid;
        }

        this.inittbar = function () {
            var tb = new Ext.Toolbar({
                anchor:'98%'
            });
            tb.add({
                text : '增加',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    addOper.doAdd();
                }
            },"-");
            tb.add({
                text : '删除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    addOper.doDel();
                }
            });
            
            return tb;
        }
        this.initImsGrid = function(colMArray) {
            
            var cm = new Ext.grid.CheckboxSelectionModel();
            
            var column = new Ext.grid.ColumnModel(colMArray);
            
            var fields = new Array();  
            for(var i=0;i<column.getColumnCount();i++){
                fields.push({name:column.getDataIndex(i)});
            }

            var store = ZTESOFT.createGridStore({
                id:'teleStore',
                fields: fields,
                url:null
            }); 
            
            var grid = new ZTESOFT.EditorGridPanel({
                id:'teleEditGrid',
                store: store,
                cm: column,
                sm :cm,
                anchor:'98%',
                frame:true,
                height: body_height*0.5,
                clicksToEdit: 1,
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                title : '固定电话私有属性'
            });
            return grid;
        }
      
      //初始化测试终端详情页面
        this.getTermiPn = function(items){
            var  termiPn = new Ext.FormPanel({
                id : 'termiCardPage',
                region : 'north',
                buttonAlign : 'right',
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
                    width : 110,
                    height : 30
                },
                items : items
            });
            
            return termiPn;
            
        }
        this.initTerminalGrid = function(colMArray) {
            
            var cm = new Ext.grid.CheckboxSelectionModel();
            
            var column = new Ext.grid.ColumnModel(colMArray);
            
            var fields = new Array();  
            for(var i=0;i<column.getColumnCount();i++){
                fields.push({name:column.getDataIndex(i)});
            }

            var store = ZTESOFT.createGridStore({
                id:'termiStore',
                fields: fields,
                url:null
            }); 
            
            var grid = new ZTESOFT.EditorGridPanel({
                id:'termiEditGrid',
                store: store,
                cm: column,
                sm :cm,
                anchor:'98%',
                height: body_height*0.5,
                frame: true,
                clicksToEdit: 1,
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                title : '测试终端私有属性'
            });
            return grid;
        }
       
        //初始化充值卡详情页面
        this.getRechPn = function(items){
            
            var  rechPn = new Ext.FormPanel({
                id : 'rechCardPage',
                region : 'north',
                buttonAlign : 'right',
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
                    width : 110,
                    height : 30
                },
                items: items
            });
            
            return rechPn;
            
        }
       
        this.initRechCardGrid = function(colMArray) {
           
            var cm = new Ext.grid.CheckboxSelectionModel();
            
            var column = new Ext.grid.ColumnModel(colMArray);
            
            var fields = new Array();  
            for(var i=0;i<column.getColumnCount();i++){
                fields.push({name:column.getDataIndex(i)});
            }

            var store = ZTESOFT.createGridStore({
                id:'rechStore',
                fields: fields,
                url:null
            }); 

            var grid = new ZTESOFT.EditorGridPanel({
                id:'rechEditGrid',
                store: store,
                cm: column,
                sm :cm,
                anchor:'98%',
                height: body_height*0.5,
                frame: true,
                clicksToEdit: 1,
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                title : '充值卡私有属性'
            });
            
            return grid;
        }
        
      this.reConfigCol = function(provinceID){
          var param = {};
          param.attributionProvinceId = provinceID; 
          param.testobjectType = addTestobjectTypeEnumId;//qryParams.testobjectTypeEnumId;
          var gridName = '';
          if(param.testobjectType == testCardEnum){
            gridName ='testEditGrid';
          }else if(param.testobjectType == teleCardEnum){
            gridName ='teleEditGrid';
          }else if(param.testobjectType == terminalEnum){
            gridName ='termiEditGrid';
          }else if(param.testobjectType == rechCardEnum){
            gridName ='rechEditGrid';
          }
          var colMArray = oper.baseCoumn(param.testobjectType);
          
          ZTESOFT.invokeAction(
                  PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList',
                  param,
                  function(response){
                      if(response && response.rows && response.rows.length > 0){
                          oper.autoSetItem(response.rows,colMArray,gridName);
                      }
                      addOper.reConfig(colMArray,param.testobjectType);
                  }
          );
      }
      
      this.reConfig = function(colMArray,typeId){
          var cm = new Ext.grid.ColumnModel(colMArray);
           cm.defaultSortable = true;

           var fields = new Array();  
           for(var i=0;i<cm.getColumnCount();i++){
               fields.push({name:cm.getDataIndex(i)});
           }
           var itemStore = new Ext.data.JsonStore({
               root : 'Body',
               totalProperty : 'totalCount',
               remoteSort : true,
               fields : fields,
               proxy : new Ext.data.HttpProxy({
                   url : null
               })
           });
           var gridName = '';
           if(typeId == testCardEnum){
               gridName = 'testEditGrid';
           }else if(typeId == teleCardEnum){
               gridName = 'teleEditGrid';
           }else if(typeId == terminalEnum){
               gridName = 'termiEditGrid';
           }else if(typeId == rechCardEnum){
               gridName = 'rechEditGrid';
           }
           Ext.getCmp(gridName).reconfigure(itemStore, cm);
      }

      //测试卡 公有属性ITEMS
        this.pubTestItems = function(){
            var items = [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>测试卡类别'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'testcardTypeEnumId',
                        id : 'testcardTypeEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'TESTCARD_TYPE',
//                        value: '',
//                        store: stroe.testCardObjectStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>运营商'
                    }
                },
                {
                    colspan : 1,
//                    width:330,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'operatorEnumId',
                        id : 'operatorEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'PROMOTE_OPERATOR',
//                        value: '',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>网络类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'cardNetworkTypeEnumId',
                        id : 'cardNetworkTypeEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        typeAhead : true,
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'CARD_NETWORK_TYPE',
//                        value: '',
                        anchor : '100%'
                    }
                },
   
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>归属省分'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : [{
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        triggerAction: 'all',
//                        name : 'attributionProvinceId',
//                        id : 'attributionProvinceId',
//                        mode: 'local',
//                        dict: false,
//                        allowBlank : false,
//                        forceSelect : true,
//                        editable : true,
//                        url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                        valueField: 'id',
//                        displayField: 'text',
//                        baseParams : {node:1},

                            xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'attributionProvinceName',
                            id : 'attributionProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            allowBlank : false,
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'text',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: session.logonAccount.provinceCompanyName,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%',

//                        value: '',
                        listeners:{
                            select: function(combo, record, index){
                                var cityCombo = Ext.getCmp('attributionCityName');
                                cityCombo.clearValue();
                                cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+record.id,
                                    method:'post'
                                });
                                cityCombo.getStore().load();
                                addOper.reConfigCol(record.id);
                                Ext.getCmp('attributionProvinceId').setValue(record.id);
                                var storageCityCombo = Ext.getCmp('storageCityName');
                              //  storageCityCombo.clearValue();
                               /* storageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+record.id,
                                    method:'post'
                                });*/
                                storageCityCombo.getStore().load();
                               
                            }
                        },
                        anchor : '100%'
                    },{
                          xtype : 'hidden',
                          value:session.logonAccount.provinceCompanyId,
                          name : 'attributionProvinceId',
                          id : 'attributionProvinceId'
                      }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>归属地市'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : [{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'attributionCityName',
                        id : 'attributionCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                        allowBlank : false,
                        forceSelect : true,
//                        readOnly:true,
                        editable : false,
                        value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('attributionCityId').setValue(record.data.id);
                            }
                        },
                        anchor : '100%'
                    },{
                          xtype : 'hidden',
                          value:session.logonAccount.cityCompanyId,
                          name : 'attributionCityId',
                          id : 'attributionCityId'
                      }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>归属国家'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'attributionCountryEnumId',
                        id : 'attributionCountryEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'ATTRIBUTION_COUNTRY',
                        value: '1',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '归属SCP'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'attributionScp',
                        id: 'attributionScp',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : 'SCP厂家'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'scpManufacturer',
                        name:'scpManufacturer',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>生效日期'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'effectiveDate',
                        id : 'effectiveDate',         
                        format : 'Y-m-d',
                        editable:false,
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '归属HLR'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'attributionHlr',
                        id: 'attributionHlr',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : 'HLR厂家'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'hlrManufacturer',
                        name:'hlrManufacturer',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>失效日期'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'cancelDate',
                        id : 'cancelDate',         
                        format : 'Y-m-d',
                        editable:false,
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : 'PIN1'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'pin1',
                        id: 'pin1',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : 'PIN2'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'pin2',
                        name:'pin2',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '最后测试日期'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'lastTestDate',
                        id : 'lastTestDate',         
                        format : 'Y-m-d',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : 'PUK1'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'puk1',
                        id: 'puk1',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : 'PUK2'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'puk2',
                        name:'puk2',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>入库人'
                    }
                },
                {
                    colspan : 1,
                    items : [
//                    	{
//                        xtype: 'ZTESOFT.popupfield',
//                        id: 'wareManName',
//                        name: 'wareManName',
//                        hideLabel : true,
//                        valueFile : 'wareManId',
//                        readOnly: true,
//                        allowBlank : false,
//                        value:session.logonAccount.userEmpName,
//                        anchor : '100%',
//                        onPopup : function() {
//                            TreeOper.singleUserTree({
//                                onComplete: function(id,text,data){
//                                    Ext.getCmp('wareManId').setValue(id);
//                                    Ext.getCmp('wareManName').setValue(text);
//                                }
//                            });
//                        }
//                    },
                    {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly:true,
                        value:session.logonAccount.userEmpName,
                        id:'wareManName',
                        name:'wareManName',
                        anchor : '100%'
                    },
                    	{
                        xtype : 'hidden',
                        name : 'wareManId',
                        value:session.logonAccount.cloudUserId,
                        id : 'wareManId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '套餐类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'packageTypeEnumId',
                        id: 'packageTypeEnumId',
                        anchor : '100%'
                    }
//                    items : 
//                    {
//                                        xtype:'ZTESOFT.combofield',
//                                        hideLabel : true,
////                                        fieldLabel: '<font color="red">*</font>工单类型',
//                                        name: 'packageTypeEnumId',
//                                        id: 'packageTypeEnumId',
//                                        valueField: 'value',
//                                        displayField: 'text',
//                                        editable:false,
//                                        mode: 'local',
//                                        triggerAction: 'all',
//                                        store: new Ext.data.ArrayStore({
//                                            fields: ['value','text'],
//                                            data:[
//                                                ['1','A套餐'],
//                                                ['2','B套餐'],
//                                                ['3','C套餐'],
//                                                ['4','D套餐'],
//                                                ['5','E套餐']
//                                            ]
//                                        }),
//                                        value:'',
//                                        anchor:'100%'
//                                    }
//                    	{
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        name : 'packageTypeEnumId',
//                        id : 'packageTypeEnumId',
//                        valueField: 'dataValue',
//                        displayField: 'dataName',                        
//                        mode: 'local',
//                        triggerAction: 'all',
//                        typeAhead : true,
//                        editable : false ,
//                        dict: true,
//                        dictType:'PACKAGE_TYPE',
////                        value: '',
////                        store: stroe.packageTypeStore,
//                        anchor : '100%'
//                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '附属套餐'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'attchPackageEnumId',
                        id: 'attchPackageEnumId',
                        anchor : '100%'
                    }
//                    items : 
//                    {
//                                        xtype:'ZTESOFT.combofield',
//                                        hideLabel : true,
////                                        fieldLabel: '<font color="red">*</font>工单类型',
//                                        name: 'attchPackageEnumId',
//                                        id: 'attchPackageEnumId',
//                                        valueField: 'value',
//                                        displayField: 'text',
//                                        mode: 'local',
//                                        editable:false,
//                                        triggerAction: 'all',
//                                        store: new Ext.data.ArrayStore({
//                                            fields: ['value','text'],
//                                            data:[
//                                                ['1','A套餐'],
//                                                ['2','B套餐'],
//                                                ['3','C套餐'],
//                                                ['4','D套餐'],
//                                                ['5','E套餐']
//                                            ]
//                                        }),
//                                        value:'',
//                                        anchor:'100%'
//                                    }
//                    	{
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        name : 'attchPackageEnumId',
//                        id : 'attchPackageEnumId',
//                        valueField: 'dataValue',
//                        displayField: 'dataName',
//                        mode: 'local',
//                        triggerAction: 'all',
//                        typeAhead : true,
//                        editable : false ,
//                        dict: true,
//                        dictType:'ATTCH_PACKAGE',
////                        value: '',
////                        store: stroe.attchPackageStore,
//                        anchor : '100%'
//                    }
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
                        name : 'storageCityName',
                        id : 'storageCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                       // allowBlank : false,
                        forceSelect : true,
                        editable : false,
                        emptyText:'',
                        value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('storageCityId').setValue(record.data.id);
                                Ext.getCmp('storageDepartmentId').setValue('');
                                Ext.getCmp('storageDepartmentName').setValue('');
                                Ext.getCmp('adminId').setValue('');
                                Ext.getCmp('adminName').setValue('');
                                
                            }
                        },
                        anchor : '100%'
                    },{
                          xtype : 'hidden',
                          value:session.logonAccount.cityCompanyId,
                          name : 'storageCityId',
                          id : 'storageCityId'
                      }]
                }
                ,{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>存放部门'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : [
                    {
                        xtype : 'ZTESOFT.popupfield',
                        hideLabel : true,
                        readOnly:true,
                        value:session.logonAccount.userDeptName,
                        id:'storageDepartmentName',
                        name:'storageDepartmentName',
                        anchor : '100%',
                        onPopup:function(){
                        	var _nodeRelationType="noRelation";
                        	var _isOnlyLeaf = '0';
                        	var _inputType = 'radio';
                        	var _orgId = null;
                        	if(Ext.getCmp('storageCityId').getValue()){
                        		_orgId = Ext.getCmp('storageCityId').getValue();
                        		
                        	}else{
                        		_orgId = session.logonAccount.provinceCompanyId;
                        	}
                        	var freeTreeObj = new FreeTreeObj('testStorageDepartmentNameT'+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                        	 freeTreeObj.showTree(function(data){
                                 Ext.getCmp('storageDepartmentName').setValue(data.text);
                                 Ext.getCmp('storageDepartmentId').setValue(data.id);
                                 Ext.getCmp('adminId').setValue('');
                                 Ext.getCmp('adminName').setValue('');
                                
                                });
                        	 
                        }
                    },
//                    	{
//                        xtype: 'ZTESOFT.popupfield',
//                        id: 'storageDepartmentName',
//                        name: 'storageDepartmentName',
//                        hideLabel : true,
//                        valueFile : 'storageDepartmentId',
//                        readOnly: true,
//                        allowBlank : false,
//                        anchor : '100%',
//                        onPopup : function() {
//                            TreeOper.singleOrgTree({
//                                onComplete: function(id,text,data){
//                                    Ext.getCmp('storageDepartmentId').setValue(id);
//                                    Ext.getCmp('storageDepartmentName').setValue(text);
//                                }
//                            });
//                        }
//                    },
                    	{
                        xtype : 'hidden',
                        name : 'storageDepartmentId',
                        value:session.logonAccount.cloudOrgId,
                        id : 'storageDepartmentId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '月赠款'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.numberfield',
                        hideLabel : true,
                        name: 'monthGrants',
                        id: 'monthGrants',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>是否预付费'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'whetherPrepaid',
                        id : 'whetherPrepaid',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
//                        value: '',
                        store: stroe.isNotStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>管理员'
                    }
                },
                {
                    colspan : 1,
                    items : [
//                    {
//                        xtype : 'ZTESOFT.textfield',
//                        hideLabel : true,
//                        readOnly:true,
//                        value:session.logonAccount.userEmpName,
//                        id:'adminName',
//                        name:'adminName',
//                        anchor : '100%'
//                    },
//                    {
//                        xtype: 'ZTESOFT.popupfield',
//                        id: 'wareManName',
//                        name: 'wareManName',
//                        hideLabel : true,
//                        valueFile : 'wareManId',
//                        readOnly: true,
//                        allowBlank : false,
//                        value:session.logonAccount.userEmpName,
//                        anchor : '100%',
//                        onPopup : function() {
//                            TreeOper.singleUserTree({
//                                onComplete: function(id,text,data){
//                                    Ext.getCmp('wareManId').setValue(id);
//                                    Ext.getCmp('wareManName').setValue(text);
//                                }
//                            });
//                        }
//                    },
                    	{
                        xtype: 'ZTESOFT.popupfield',
                        id: 'adminName',
                        name: 'adminName',
                        hideLabel : true,
                        valueFile : 'adminId',
                        readOnly: true,
                   //     allowBlank : false,
                        anchor : '100%',
                        value:session.logonAccount.userEmpName,
                        onPopup : function() {
                            var orgId = null;
                            var orgName = null;
                            if(Ext.getCmp('storageDepartmentId').getValue()){
                                orgId = Ext.getCmp('storageDepartmentId').getValue();
                                orgName = Ext.getCmp('storageDepartmentName').getValue();
                            }else{
                                Ext.Msg.alert('操作提示','请先选择存放部门!');
                                return;
                            }
                            TreeOper.orgAndUserByCon({
                                parentId :orgId ,
                                parentName : orgName,
                                singleSelect : true,
                                onComplete: function(id,text,data){
                                	if(data.accountId==null){
                                	   Ext.Msg.alert("操作提示","请选择人员");
                                	   return;
                                	}
                                    Ext.getCmp('adminId').setValue(id);
                                    Ext.getCmp('adminName').setValue(text);
                                }
                            });
                        }
                    },
                    	{
                        xtype : 'hidden',
                        name : 'adminId',
                        value:session.logonAccount.cloudUserId,
                        id : 'adminId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '存放位置'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'storagePlace',
                        name:'storagePlace',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '用途'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'cardUse',
                        name:'cardUse',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '备注'
                    }
                },
                {
                    colspan : 5,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'remarks',
                        name:'remarks',
                        anchor : '100%'
                    }
                }
            ];
            
            return items;
        }
        
        this.initAttributionCityId = function(){
            var cityCombo = Ext.getCmp('attributionCityName');
//                                cityCombo.clearValue();
                                cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                    method:'post'
                                });
                                cityCombo.getStore().load();
                                addOper.reConfigCol(session.logonAccount.provinceCompanyId);
        }
        //初始化存放地市ID
        this.initStorageCityId = function(){
            var storageCityCombo = Ext.getCmp('storageCityName');
//                                cityCombo.clearValue();
            						storageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                                    method:'post'
                                });
            					storageCityCombo.getStore().load();
                            //    addOper.reConfigCol(session.logonAccount.provinceCompanyId);
            				 if(typeof(session.logonAccount.cityCompanyId) != 'undefined'){
            					 storageCityCombo.getStore().on('load', function(){
            						 Ext.getCmp('storageCityId').setValue(session.logonAccount.cityCompanyId);
            						 storageCityCombo.getStore().purgeListeners();
            		                });
            					
            				}
        }
        //充值卡，测试终端，固定电话 公有属性ITEMS
        this.pubItems = function(fieldLabel){
            var items = [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : fieldLabel
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'testcardStatusEnumId',
                        id : 'testcardStatusEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'TESTCARD_STATUS',
//                        value: '',
//                        store: stroe.testStatusEnumStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>生效日期'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'effectiveDate',
                        id : 'effectiveDate',         
                        format : 'Y-m-d',
                        editable:false,
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>失效日期'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'cancelDate',
                        id : 'cancelDate',         
                        format : 'Y-m-d',
                        editable:false,
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>归属省分'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : [{
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        triggerAction: 'all',
//                        name : 'attributionProvinceId',
//                        id : 'attributionProvinceId',
//                        mode: 'local',
//                        dict: false,
//                        allowBlank : false,
//                        forceSelect : true,
//                        editable : true,
//                        url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                        valueField: 'id',
//                        displayField: 'text',
//                        baseParams : {node:1},
////                        value: '',
//                        anchor : '100%',

                            xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'attributionProvinceName',
                            id : 'attributionProvinceName',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            allowBlank : false,
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'text',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: session.logonAccount.provinceCompanyName,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%',

                        listeners:{
                            select: function(combo, record, index){
                                var cityCombo = Ext.getCmp('attributionCityName');
                                cityCombo.clearValue();
                                cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+record.id,
                                    method:'post'
                                });
                                cityCombo.getStore().load();
                                addOper.reConfigCol(record.id);
                                Ext.getCmp('attributionProvinceId').setValue(record.id);
                                var storageCityCombo = Ext.getCmp('storageCityName');
                               // storageCityCombo.clearValue();
                             /*   storageCityCombo.getStore().proxy = new Ext.data.HttpProxy({
                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+record.id,
                                    method:'post'
                                });*/
                                storageCityCombo.getStore().load();
                            }
                        }
                    },{
                          xtype : 'hidden',
                          value:session.logonAccount.provinceCompanyId,
                          name : 'attributionProvinceId',
                          id : 'attributionProvinceId'
                      }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>归属地市'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : [{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'attributionCityName',
                        id : 'attributionCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                        allowBlank : false,
                        forceSelect : true,
                        editable : false,
                        value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('attributionCityId').setValue(record.data.id);
                            }
                        },
                        anchor : '100%'
                    },{
                          xtype : 'hidden',
                          value:session.logonAccount.cityCompanyId,
                          name : 'attributionCityId',
                          id : 'attributionCityId'
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
                    colspan : 2,
                    width:220,
                    items : [{
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'storageCityName',
                        id : 'storageCityName',
                        valueField : 'text',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                    //    allowBlank : false,
                        forceSelect : true,
                        editable : false,
                        emptyText:'',
                        value :session.logonAccount.cityCompanyName,
                        store : new Ext.data.JsonStore({
                            remoteSort: true,
                            fields: ['id', 'text']
                        }),
                        listeners:{
                            select: function(combo, record, index){
                                Ext.getCmp('storageCityId').setValue(record.data.id);
                                Ext.getCmp('storageDepartmentId').setValue('');
                                Ext.getCmp('storageDepartmentName').setValue('');
                                Ext.getCmp('adminId').setValue('');
                                Ext.getCmp('adminName').setValue('');
                            }
                        },
                        anchor : '100%'
                    },{
                          xtype : 'hidden',
                          value:session.logonAccount.cityCompanyId,
                          name : 'storageCityId',
                          id : 'storageCityId'
                      }]
                }
                ,{
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>存放部门'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : [
                    {
                        xtype : 'ZTESOFT.popupfield',
                        hideLabel : true,
                        readOnly:true,
                        value:session.logonAccount.userDeptName,
                        id:'storageDepartmentName',
                        name:'storageDepartmentName',
                        anchor : '100%',
                        onPopup:function(){
                        	var _nodeRelationType="noRelation";
                        	var _isOnlyLeaf = '0';
                        	var _inputType = 'radio';
                        	var _orgId = null;
                        	if(Ext.getCmp('storageCityId').getValue()){
                        		_orgId = Ext.getCmp('storageCityId').getValue();
                        	}else{
                        		_orgId = session.logonAccount.provinceCompanyId;
                        	}
                        	var freeTreeObj = new FreeTreeObj('storageDepartmentNameT'+new Date().getTime(),_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,"ORG");
                        	 freeTreeObj.showTree(function(data){
                                 Ext.getCmp('storageDepartmentName').setValue(data.text);
                                 Ext.getCmp('storageDepartmentId').setValue(data.id);
                                 Ext.getCmp('adminId').setValue('');
                                 Ext.getCmp('adminName').setValue('');
                                });
                        }
                    },
//                    	{
//                        xtype: 'ZTESOFT.popupfield',
//                        id: 'storageDepartmentName',
//                        name: 'storageDepartmentName',
//                        hideLabel : true,
//                        valueFile : 'storageDepartmentId',
//                        readOnly: true,
//                        allowBlank : false,
//                        anchor : '100%',
//                        onPopup : function() {
//                            TreeOper.singleOrgTree({
//                                onComplete: function(id,text,data){
//                                    Ext.getCmp('storageDepartmentId').setValue(id);
//                                    Ext.getCmp('storageDepartmentName').setValue(text);
//                                }
//                            });
//                        }
//                    },
                    	{
                        xtype : 'hidden',
                        name : 'storageDepartmentId',
                        value:session.logonAccount.cloudOrgId,
                        id : 'storageDepartmentId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>管理员'
                    }
                },
                {
                    colspan : 1,
                    items : [
//                    {
//                        xtype : 'ZTESOFT.textfield',
//                        hideLabel : true,
//                        readOnly:true,
//                        value:session.logonAccount.userEmpName,
//                        id:'adminName',
//                        name:'adminName',
//                        anchor : '100%'
//                    },
//                    	{
//                        xtype: 'ZTESOFT.popupfield',
//                        id: 'adminName',
//                        name: 'adminName',
//                        hideLabel : true,
//                        valueFile : 'adminId',
//                        readOnly: true,
//                        allowBlank : false,
//                        anchor : '100%',
//                        onPopup : function() {
//                            var orgId = null;
//                            var orgName = null;
//                            if(Ext.getCmp('storageDepartmentId').getValue()){
//                                orgId = Ext.getCmp('storageDepartmentId').getValue();
//                                orgName = Ext.getCmp('storageDepartmentName').getValue();
//                            }else{
//                                Ext.Msg.alert('操作提示','请先选择存放部门!');
//                                return;
//                            }
//                            TreeOper.orgAndUserByCon({
//                                parentId :orgId ,
//                                parentName : orgName,
//                                singleSelect : true,
//                                onComplete: function(id,text,data){
//                                    Ext.getCmp('adminId').setValue(id);
//                                    Ext.getCmp('adminName').setValue(text);
//                                }
//                            });
//                        }
//                    },
                    {
                        xtype: 'ZTESOFT.popupfield',
                        id: 'adminName',
                        name: 'adminName',
                        hideLabel : true,
                        valueFile : 'adminId',
                        value:session.logonAccount.userEmpName,
                        readOnly: true,
                     //   allowBlank : false,
                        anchor : '100%',
                        onPopup : function() {
                            var orgId = null;
                            var orgName = null;
                            if(Ext.getCmp('storageDepartmentId').getValue()){
                                orgId = Ext.getCmp('storageDepartmentId').getValue();
                                orgName = Ext.getCmp('storageDepartmentName').getValue();
                            }else{
                                Ext.Msg.alert('操作提示','请先选择存放部门!');
                                return;
                            }
                            TreeOper.orgAndUserByCon({
                                parentId :orgId ,
                                parentName : orgName,
                                singleSelect : true,
                                onComplete: function(id,text,data){
                                    if(data.accountId==null){
                                       Ext.Msg.alert("操作提示","请选择人员");
                                       return;
                                    }
                                    Ext.getCmp('adminId').setValue(id);
                                    Ext.getCmp('adminName').setValue(text);
                                   
                                }
                            });
                        }
                    },
                    	{
                        xtype : 'hidden',
                        name : 'adminId',
                        value:session.logonAccount.cloudUserId,
                        id : 'adminId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>入库人'
                    }
                },
                {
                    colspan : 1,
                    items : [
//                    	{
//                        xtype: 'ZTESOFT.popupfield',
//                        id: 'wareManName',
//                        name: 'wareManName',
//                        hideLabel : true,
//                        valueFile : 'wareManId',
//                        readOnly: true,
//                        value:session.logonAccount.userEmpName,
//                        allowBlank : false,
//                        anchor : '100%',
//                        onPopup : function() {
//                            TreeOper.singleUserTree({
//                                onComplete: function(id,text,data){
//                                    Ext.getCmp('wareManId').setValue(id);
//                                    Ext.getCmp('wareManName').setValue(text);
//                                }
//                            });
//                        }
//                    },
                    {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly:true,
                        id:'wareManName',
                        name:'wareManName',
                        value:session.logonAccount.userEmpName,
                        anchor : '100%'
                    },
                    	{
                        xtype : 'hidden',
                        name : 'wareManId',
                        value:session.logonAccount.cloudUserId,
                        id : 'wareManId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '存放位置'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'storagePlace',
                        name:'storagePlace',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '用途'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'cardUse',
                        name:'cardUse',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '备注'
                    }
                },
                {
                    colspan : 2,
                    width:220,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'remarks',
                        name:'remarks',
                        anchor : '100%'
                    }
                }
            ];
            return items;
        }
}
 
 function StringToDate(s){
     if(s&&typeof(s)=="string"){
         var s = s.substring(0,19);
         var aD=s.split(/[\/\-: ]/);
         if(aD.length<3){
             return null;
         }
         if(aD.length<4){
             aD[3]=aD[4]=aD[5]="00";
         }
         var d=new Date(aD[0],parseInt(aD[1]-1,10),aD[2],aD[3],aD[4],aD[5]);
         if(isNaN(d)){
             return null;
         }
         return d;
     }else {
         return null;
     }
 };