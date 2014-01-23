    var testCardEnum = 1;//测试卡枚举值

var terminalEnum = 2;//测试终端枚举值

var teleCardEnum = 3;//固定电话枚举值

var rechCardEnum = 4;//充值卡枚举值
function TestCardModOper(){
        //主窗口
        this.winTitle = '';
        this.id = '';
        var formWidth = 755;
        var formHeight = body_height*0.8;
        var oldFormObj = null;
        this.initWindow = function(oerpType,typeId,value,items){
            this.id = value;
            var tmpform;
            if(oerpType == 'detail'){
                if(typeId == testCardEnum){
                    tmpform = this.getTestPn(items);
                    this.winTitle = '测试卡登记详情';
                }else if (typeId == teleCardEnum){
                    tmpform = this.getTelePn(items);
                    this.winTitle = '固定电话登记详情';
                }else if (typeId == terminalEnum){
                    tmpform = this.getTermiPn(items);
                    this.winTitle = '测试终端登记详情';
                }else if (typeId == rechCardEnum){
                    tmpform = this.getRechPn(items);
                    this.winTitle = '充值卡登记详情';
                }
                this.initUpdate(typeId,value);
                modOper.setDisabled(typeId);
            }else if(oerpType == 'update'){
                if(typeId == testCardEnum){
                    tmpform = this.getTestPn(items);
                    this.winTitle = '测试卡登记修改';
                }else if (typeId == teleCardEnum){
                    tmpform = this.getTelePn(items);
                    this.winTitle = '固定电话登记修改';
                }else if (typeId == terminalEnum){
                    tmpform = this.getTermiPn(items);
                    this.winTitle = '测试终端登记修改';
                }else if (typeId == rechCardEnum){
                    tmpform = this.getRechPn(items);
                    this.winTitle = '充值卡登记修改';
                }
                this.initUpdate(typeId,value);
            }

            var formWin = new Ext.Window({
                id:typeof(isTestApplyOpenMod)=="undefined"?'detailWin':'testApplyMod',
                title: this.winTitle,
                closable:true,
                width: formWidth,
                height: formHeight,
                layout: 'anchor',
                plain:true,
                modal : true,
                bodyStyle :'overflow-x:hidden;overflow-y:scroll',
                items: [tmpform],
                buttonAlign:'center',
                buttons: [{
                    text: '保存',
                    id : 'save',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        modOper.saveWin(typeId);
                    }
                },{
                    text: '关闭',
                    id :'close',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                    	if(typeof(isTestApplyOpenMod)!="undefined"){
                    	   Ext.getCmp('testApplyMod').close();
                    	}else{
                            Ext.getCmp('detailWin').close();
                    	}
                    }
                }]
            });
            
            if(oerpType == 'update'&&typeof(testCardManageIsSameMan)!="undefined"&&testCardManageIsSameMan==false){
                if(typeId == testCardEnum){
                	Ext.getCmp('testCardPage').getForm().items.eachKey(function(key,item){
                        if(key=="cardNo"||key=="imsi"||key=="subscriberNumber"||key=="number"){
                            item.readOnly = true;
                        }
                         });
                }else if(typeId == teleCardEnum){
                	Ext.getCmp('teleCardPage').getForm().items.eachKey(function(key,item){
                        if(key=="number"||key=="phoneNumber"){
                            item.readOnly = true;
                        }
                         });
                }else if(typeId == terminalEnum){
                	Ext.getCmp('termiCardPage').getForm().items.eachKey(function(key,item){
                        if(key=="number"||key=="imei"){
                            item.readOnly = true;
                        }
                         });
                }else if(typeId == rechCardEnum){
                	Ext.getCmp('rechCardPage').getForm().items.eachKey(function(key,item){
                        if(key=="cardNumber"||key=="cardNo"){
                            item.readOnly = true;
                        }
                         });
                }
            }
            
            if(oerpType == 'detail'){                Ext.getCmp('save').setVisible(false);                if(typeId == testCardEnum){                	 Ext.getCmp('testCardPage').getForm().items.each(modOper.eachItem, this);                     Ext.getCmp('testCardPage').getForm().items.eachKey(function(key,item){  //alert(1);                     	  if(item.isXType('ZTESOFT.popupfield')){                     		  item.readOnly = false;                     		  item.editable = false;                     	  }else{                     		  item.editable = false;                     	  }                         });                }                if(typeId == teleCardEnum){               	 Ext.getCmp('teleCardPage').getForm().items.each(modOper.eachItem, this);                    Ext.getCmp('teleCardPage').getForm().items.eachKey(function(key,item){  //alert(1);                    	  if(item.isXType('ZTESOFT.popupfield')){                    		  item.readOnly = false;                    		  item.editable = false;                    	  }else{                    		  item.editable = false;                    	  }                        });               }                if(typeId == terminalEnum){               	 Ext.getCmp('termiCardPage').getForm().items.each(modOper.eachItem, this);                    Ext.getCmp('termiCardPage').getForm().items.eachKey(function(key,item){  //alert(1);                    	  if(item.isXType('ZTESOFT.popupfield')){                    		  item.readOnly = false;                    		  item.editable = false;                    	  }else{                    		  item.editable = false;                    	  }                        });               }                if(typeId == rechCardEnum){               	 Ext.getCmp('rechCardPage').getForm().items.each(modOper.eachItem, this);                    Ext.getCmp('rechCardPage').getForm().items.eachKey(function(key,item){  //alert(1);                    	  if(item.isXType('ZTESOFT.popupfield')){                    		  item.readOnly = false;                    		  item.editable = false;                    	  }else{                    		  item.editable = false;                    	  }                        });               }
            }
            formWin.show();
        }        this.eachItem = function(item,index,length){            if(item.isXType('ZTESOFT.textfield')){                item.readOnly = true;            }            if(item.isXType('ZTESOFT.numberfield')){                item.readOnly = true;            }            if(item.isXType('ZTESOFT.datefield')){                item.readOnly = true;            }            if(item.isXType('ZTESOFT.enum')){                item.readOnly = true;            }            if(item.isXType('ZTESOFT.combofield')){                item.readOnly = true;            }        }
        
        this.setDisabled = function(typeId){
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
        }
        
      //修改，详情初始化
        this.initUpdate = function(typeId,value){
            
            var param = {};
            param.testobjectTypeEnumId = typeId;
            if(typeId == testCardEnum){
                param.testCardId = value;
            }else if(typeId == teleCardEnum){
                param.fixedTelId = value;
            }else if(typeId == terminalEnum){
                param.testTerminalId = value;
            }else if(typeId == rechCardEnum){
                param.rechCardId = value;
            }
            
//            var response = ZTESOFT.Synchronize(PATH + '/e19/testCardStatisAction.json?method=getCardInfoByParam',param);
//            if(response && response.rows && response.rows.length){
//                            if(response.rows[0].cancelDate){
//                                response.rows[0].cancelDate = response.rows[0].cancelDate.substring(0,10);
//                            }
//                            if(response.rows[0].effectiveDate){
//                                response.rows[0].effectiveDate = response.rows[0].effectiveDate.substring(0,10);
//                            }
//                            if(response.rows[0].lastTestDate){
//                                response.rows[0].lastTestDate = response.rows[0].lastTestDate.substring(0,10);
//                            }
//                            var obj = new Object();
//                            obj.data = response.rows[0];
//                            oldFormObj = response.rows[0];
//                            obj.data.wareManName = modOper.getCloudUserName(response.rows[0].wareManId);
//                            if(typeId == testCardEnum){
//                                Ext.getCmp('testCardPage').getForm().loadRecord(obj);
//                            }else if(typeId == teleCardEnum){                               
//                                Ext.getCmp('teleCardPage').getForm().loadRecord(obj);
//                            }else if(typeId == terminalEnum){
//                                Ext.getCmp('termiCardPage').getForm().loadRecord(obj);                            
//                            }else if(typeId == rechCardEnum){
//                                Ext.getCmp('rechCardPage').getForm().loadRecord(obj);
//                            }
//                        }
            
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardStatisAction.json?method=getCardInfoByParam',
                    param,
                    function(response){
                        if(response && response.rows && response.rows.length){
                            if(response.rows[0].cancelDate){
                                response.rows[0].cancelDate = response.rows[0].cancelDate.substring(0,10);
                            }
                            if(response.rows[0].effectiveDate){
                                response.rows[0].effectiveDate = response.rows[0].effectiveDate.substring(0,10);
                            }
                            if(response.rows[0].lastTestDate){
                                response.rows[0].lastTestDate = response.rows[0].lastTestDate.substring(0,10);
                            }
                            var obj = new Object();
                            obj.data = response.rows[0];
                            oldFormObj = response.rows[0];
                            obj.data.wareManName = modOper.getCloudUserName(response.rows[0].wareManId);
                            if(typeId == testCardEnum){
                                Ext.getCmp('testCardPage').getForm().loadRecord(obj);
                            }else if(typeId == teleCardEnum){                               
                                Ext.getCmp('teleCardPage').getForm().loadRecord(obj);
                            }else if(typeId == terminalEnum){
                                Ext.getCmp('termiCardPage').getForm().loadRecord(obj);                            
                            }else if(typeId == rechCardEnum){
                                Ext.getCmp('rechCardPage').getForm().loadRecord(obj);
                            }
                        }
                    }
            );
        }
        
      //获取审核人acountId
        this.getCloudUserName = function(cloudUserId){
            var cloudUserName = '';
            var url = PATH + '/commonData/proxy4AUserAndOrg/findUserByCloudUserId.json';
            var obj = {
                    cloudUserId : cloudUserId
            };
            var response = ZTESOFT.Synchronize(url,obj);
            if(response){
                cloudUserName = response.cloudUserName;
            }
            return cloudUserName;
        }
        
      //编辑
        this.saveWin = function(typeId){
            var value = this.id;
            if(typeId == testCardEnum){
                this.saveTestCard(typeId,value);
            }else if(typeId == teleCardEnum){
                this.saveIms(typeId,value);
            }else if(typeId == terminalEnum){
                this.saveTerminal(typeId,value);
            }else if(typeId == rechCardEnum){
                this.saveRechCard(typeId,value);
            }
        }
        
        //编辑 测试卡
        this.saveTestCard = function(typeId,value){
            if(!oper.formValid(typeId)){
                return;
            }
            
            var param = Ext.getCmp('testCardPage').getForm().getValues();
            if(param.cancelDate){
                if(StringToDate(param.cancelDate) < StringToDate(param.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            if(!this.checkUnieqTest(param)){
                return;
            }
            param.testCardId = value;
            param.testobjectTypeEnumId = typeId;
            param.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
            param.testcardTypeEnumId = Ext.getCmp('testcardTypeEnumId').getValue();
            param.operatorEnumId = Ext.getCmp('operatorEnumId').getValue();
            param.cardNetworkTypeEnumId = Ext.getCmp('cardNetworkTypeEnumId').getValue();
            param.attributionCountryEnumId = Ext.getCmp('attributionCountryEnumId').getValue();
            param.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
            param.attributionCityId = Ext.getCmp('attributionCityId').getValue();
            param.packageTypeEnumId = Ext.getCmp('packageTypeEnumId').getValue();
            param.attchPackageEnumId = Ext.getCmp('attchPackageEnumId').getValue();
            param.whetherPrepaid = Ext.getCmp('whetherPrepaid').getValue() * 1;
            param.storageCityId = Ext.getCmp('storageCityId').getValue();
            param.storageCityName = Ext.getCmp('storageCityName').getValue();
            param.lastUpdatedBy = session.logonAccount.cloudUserId;
            param.createdBy = session.logonAccount.cloudUserId;
            param.marketingAreaId = session.logonAccount.marketingAreaId;
            param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
            param.orgId = session.logonAccount.cloudOrgId;
            
            this.getPrivateInfo(param);

            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardManageAction.json?method=modify',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示','修改成功');
                        Ext.getCmp('detailWin').close();
                        oper.doQry();
                    }
            );
        }
        
        this.checkUnieqTest = function(obj){
            var flag=true;
            var param = null;
            var url = null;
            if(oldFormObj.cardNo != obj.cardNo){
                param = {
                        cardNoEqual : obj.cardNo
                };
                url = PATH+'/e19/testCardRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','卡号:'+obj.cardNo+'已经存在!');
                    return flag=false;
                }
            }
            
            if(oldFormObj.imsi != obj.imsi){
                param = {
                        imsiEqual : obj.imsi
                };
                url = PATH+'/e19/testCardRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','IMSI:'+obj.imsi+'已经存在!');
                    return flag=false;
                }
            }
           
            if(oldFormObj.number != obj.number){
                param = {
                        numberEqual : obj.number
                };
                url = PATH+'/e19/testCardRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','编号:'+obj.number+'已经存在!');
                    return flag=false;
                }
            }
            return flag;
        }
        
        //编辑  固定电话
        this.saveIms = function(typeId,value){
            if(!oper.formValid(typeId)){
                return;
            }
            
            var param = Ext.getCmp('teleCardPage').getForm().getValues();
            if(param.cancelDate){
                if(StringToDate(param.cancelDate) < StringToDate(param.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            if(!this.checkUnieqTele(param)){
                return;
            }
            param.fixedTelId = value;
            param.testobjectTypeEnumId = typeId;
            param.fixedPhoneTypeEnumId = Ext.getCmp('fixedPhoneTypeEnumId').getValue();
            param.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
            param.attributionCityId = Ext.getCmp('attributionCityId').getValue();
            param.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
            
            param.lastUpdatedBy = session.logonAccount.cloudUserId;
            param.createdBy = session.logonAccount.cloudUserId;
            param.marketingAreaId = session.logonAccount.marketingAreaId;
            param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
            param.orgId = session.logonAccount.cloudOrgId;
            
            this.getPrivateInfo(param);

            ZTESOFT.invokeAction(
                    PATH+'/e19/imsManageAction.json?method=modify',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示','修改成功');
                        Ext.getCmp('detailWin').close();
                        oper.doQry();
                    }
            );
        }
        
        this.checkUnieqTele = function(obj){
            var flag=true;
            var param = null;
            var url = null;
            if(oldFormObj.phoneNumber != obj.phoneNumber){
                param = {
                        phoneNumberEqual : obj.phoneNumber
                };
                url = PATH+'/e19/imsRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','电话号码:'+obj.phoneNumber+'已经存在!');
                    return flag=false;
                }
            }
           
            if(oldFormObj.number != obj.number){
                param = {
                        numberEqual : obj.number
                };
                url = PATH+'/e19/imsRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','编号:'+obj.number+'已经存在!');
                    return flag=false;
                }
            }
            return flag;
        }
        
        //编辑   测试终端
        this.saveTerminal = function(typeId,value){
            if(!oper.formValid(typeId)){
                return;
            }
            
            var param = Ext.getCmp('termiCardPage').getForm().getValues();
            if(param.cancelDate){
                if(StringToDate(param.cancelDate) < StringToDate(param.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            if(!this.checkUnieqTermi(param)){
                return;
            }
            param.testTerminalId = value;
            param.testobjectTypeEnumId = typeId;
            param.moblieTypeEnumId = Ext.getCmp('moblieTypeEnumId').getValue();
            param.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
            param.attributionCityId = Ext.getCmp('attributionCityId').getValue();
            param.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
            
            param.lastUpdatedBy = session.logonAccount.cloudUserId;
            param.createdBy = session.logonAccount.cloudUserId;
            param.marketingAreaId = session.logonAccount.marketingAreaId;
            param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
            param.orgId = session.logonAccount.cloudOrgId;
            
            this.getPrivateInfo(param);

            ZTESOFT.invokeAction(
                    PATH+'/e19/terminalManageAction.json?method=modify',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示','修改成功');
                        Ext.getCmp('detailWin').close();
                        oper.doQry();
                    }
            );
        }
        
        this.checkUnieqTermi = function(obj){
            var flag=true;
            var param = null;
            var url = null;
            if(oldFormObj.imei != obj.imei){
                param = {
                        imeiEqual : obj.imei
                };
                url = PATH+'/e19/terminalRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','电话号码:'+obj.imei+'已经存在!');
                    return flag=false;
                }
            }
           
            if(oldFormObj.number != obj.number){
                param = {
                        numberEqual : obj.number
                };
                url = PATH+'/e19/terminalRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','编号:'+obj.number+'已经存在!');
                    return flag=false;
                }
            }
            return flag;
        }
        
        //编辑  充值卡  
        this.saveRechCard = function(typeId,value){
            if(!oper.formValid(typeId)){
                return;
            }
            
            var param = Ext.getCmp('rechCardPage').getForm().getValues();
            if(param.cancelDate){
                if(StringToDate(param.cancelDate) < StringToDate(param.effectiveDate)){
                    Ext.Msg.alert('操作提示','失效日期不能小于生效日期!');
                    return;
                }
            }
            if(!this.checkUnieqRech(param)){
                return;
            }
            param.rechCardId = value;
            param.testobjectTypeEnumId = typeId;
            param.parValue = Ext.getCmp('parValue').getValue();
            param.testcardStatusEnumId = Ext.getCmp('testcardStatusEnumId').getValue();
            param.rechCardTypeEnumId = Ext.getCmp('rechCardTypeEnumId').getValue();
            param.attributionCityId = Ext.getCmp('attributionCityId').getValue();
            param.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
            
            param.lastUpdatedBy = session.logonAccount.cloudUserId;
            param.createdBy = session.logonAccount.cloudUserId;
            param.marketingAreaId = session.logonAccount.marketingAreaId;
            param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
            param.orgId = session.logonAccount.cloudOrgId;
            
            this.getPrivateInfo(param);

            ZTESOFT.invokeAction(
                    PATH+'/e19/rechCardManageAction.json?method=modify',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示','修改成功');
                        Ext.getCmp('detailWin').close();
                        oper.doQry();
                    }
            );
        }
        
        this.checkUnieqRech = function(obj){
            var flag=true;
            var param = null;
            var url = null;
            if(oldFormObj.cardNo != obj.cardNo){
                param = {
                        cardNoEqual : obj.cardNo
                };
                url = PATH+'/e19/rechCardRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','卡号:'+obj.cardNo+'已经存在!');
                    return flag=false;
                }
            }
           
            if(oldFormObj.cardNumber != obj.cardNumber){
                param = {
                        cardNumberEqual : obj.cardNumber
                };
                url = PATH+'/e19/rechCardRegisterAction.json?method=qryList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','编号:'+obj.cardNumber+'已经存在!');
                    return flag=false;
                }
            }
            return flag;
        }

        //获取私有属性值
        this.getPrivateInfo = function(param){
          var obj = {};
          obj.testobjectType = param.testobjectTypeEnumId;
          obj.attributionProvinceId = param.attributionProvinceId;
          var url = PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList'; 
          var response = ZTESOFT.Synchronize(url,obj);
          if(response && response.rows && response.rows.length > 0){
              for(var i=0;i<response.rows.length;i++){
                  param[response.rows[i].columnNumber] = Ext.getCmp(response.rows[i].columnNumber).getValue();
              }
          }
        }
        
        //充值卡 私有属性ITEMS
        this.priRechItems = function(){
            var items = [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>编号'
                    }
                },
                {
                    colspan : 2,
                    width:226,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'cardNumber',
                        id: 'cardNumber',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>卡号'
                    }
                },
                {
                    colspan : 2,
                    width:226,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'cardNo',
                        id: 'cardNo',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>面值'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'parValue',
                        id : 'parValue',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
                        value: '',
                        store: stroe.rechStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>卡类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'rechCardTypeEnumId',
                        id : 'rechCardTypeEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'RECH_CARD_TYPE',
                        value: '',
                        anchor : '100%'
                    }
                }
            ];
            return items;
        }
        
        //固定电话 私有属性信息
        this.priTeleItems = function(){
            var items = [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>编号'
                    }
                },
                {
                    colspan : 2,
                    width:226,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'number',
                        id: 'number',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>电话号码'
                    }
                },
                {
                    colspan : 2,
                    width:226,
                    items : 
//                    	{
//                        xtype : 'ZTESOFT.numberfield',
//                        hideLabel : true,
//                        name: 'phoneNumber',
//                        id: 'phoneNumber',
//                        allowBlank : false,
//                        anchor : '100%'
//                    }
                    
                    {xtype:'ZTESOFT.textfield',
                    hideLabel : true,
                    name: 'phoneNumber',
                    id: 'phoneNumber',
                                regex :  /[^\u4e00-\u9fa5]$/,
                            regexText : "请输入正确的电话号码!",
                                allowBlank: false,
                                anchor : '100%'
                                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'fixedPhoneTypeEnumId',
                        id : 'fixedPhoneTypeEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        dict: true,
                        dictType:'FIXED_PHONE_TYPE',
                        allowBlank : false,
                        value: '',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>功能'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'teleFunction',
                        id: 'teleFunction',
                        allowBlank : false,
                        anchor : '100%'
                    }
                }
            ];
            return items;
        }
        //测试终端私有属性信息
      this.priTermiItems = function(){
          var items = [
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.label',
                      html : '<font color="red">*</font>编号'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.textfield',
                      hideLabel : true,
                      name: 'number',
                      id: 'number',
                      allowBlank : false,
                      anchor : '100%'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.label',
                      html : '<font color="red">*</font>手机串号'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.textfield',
                      hideLabel : true,
                      name: 'imei',
                      id: 'imei',
                      allowBlank : false,
                      anchor : '100%'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.label',
                      html : '<font color="red">*</font>手机类型'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.enum',
                      hideLabel : true,
                      name : 'moblieTypeEnumId',
                      id : 'moblieTypeEnumId',
                      valueField: 'dataValue',
                      displayField: 'dataName',
                      mode: 'local',
                      triggerAction: 'all',
                      editable : false ,
                      typeAhead : true,
                      dict: true,
                      dictType:'MOBILE_TYPE',
                      allowBlank : false,
                      value: '',
                      anchor : '100%'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.label',
                      html : '<font color="red">*</font>手机型号'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.textfield',
                      hideLabel : true,
                      name: 'phoneModel',
                      id: 'phoneModel',
                      allowBlank : false,
                      anchor : '100%'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.label',
                      html : '<font color="red">*</font>厂家'
                  }
              },
              {
                  colspan : 1,
                  items : {
                      xtype : 'ZTESOFT.textfield',
                      hideLabel : true,
                      name: 'manufacturerName',
                      id: 'manufacturerName',
                      allowBlank : false,
                      anchor : '100%'
                  }
              }
          ];
          return items;
      }
      
      //测试卡 私有属性ITEMS
        this.priTestItems = function(){
            var items = [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>卡号'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'cardNo',
                        id: 'cardNo',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>IMSI'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'imsi',
                        id: 'imsi',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>用户号码'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.numberfield',
                        hideLabel : true,
                        name: 'subscriberNumber',
                        id: 'subscriberNumber',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>测试卡编号'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name: 'number',
                        id: 'number',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>测试卡状态'
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
                        editable : false ,
                        typeAhead : true,
                        dict: true,
                        dictType:'TESTCARD_STATUS',
                        allowBlank : false,
                        value: '',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red"></font>余额'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.numberfield',
                        hideLabel : true,
                        name: 'balance',
                        id: 'balance',
                        maxValue: 1000000, 
                         minValue: 0,
                         value:0,
                        allowBlank : true,
                        anchor : '100%'
                    }
                }
            ];
            return items;
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
                        value: '',
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
                    width:226,
                    items : [
//                    {
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        triggerAction: 'all',
//                        name : 'attributionProvinceName',
//                        id : 'attributionProvinceName',
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
//                        listeners:{
//                            select: function(combo, record, index){
//                                var cityCombo = Ext.getCmp('attributionCityName');
//                                cityCombo.clearValue();
//                                cityCombo.getStore().proxy = new Ext.data.HttpProxy({
//                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
//                                    method:'post'
//                                });
//                                cityCombo.getStore().load();
//                                addOper.reConfigCol(combo.value);
//                                Ext.getCmp('attributionProvinceId').setValue(combo.value);
//                            }
//                        },
//                        anchor : '100%'
//                    }
                    	{
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly : true,
                        name : 'attributionProvinceName',
                        id : 'attributionProvinceName',
                        anchor : '100%'
                    }
                    ,{
                        xtype : 'hidden',
                        name : 'attributionProvinceId',
                        id : 'attributionProvinceId'
                    }
                    ]
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
                    width:226,
                    items : [
//                    {
//                        xtype : 'ZTESOFT.combofield',
//                        hideLabel : true,
//                        name : 'attributionCityName',
//                        id : 'attributionCityName',
//                        valueField : 'id',
//                        displayField : 'text',
//                        mode : 'local',
//                        triggerAction : 'all',
//                        allowBlank : false,
//                        forceSelect : true,
//                        editable : true,
////                        value : '',
//                        store : new Ext.data.JsonStore({
//                            remoteSort: true,
//                            fields: ['id', 'text']
//                        }),
//                        listeners:{
//                            select: function(combo, record, index){
//                                Ext.getCmp('attributionCityId').setValue(combo.value);
//                            }
//                        },
//                        anchor : '100%'
//                    }
                    	{
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly : true,
                        name : 'attributionCityName',
                        id : 'attributionCityName',
                        anchor : '100%'
                    }
                    ,{
                        xtype : 'hidden',
                        name : 'attributionCityId',
                        id : 'attributionCityId'
                    }
                    ]
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
                        anchor : '100%'
                    },
                    	{
                        xtype : 'hidden',
                        name : 'wareManId',
                        id : 'wareManId'
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
                    width:226,
                    items : [
//                    {
//                        xtype : 'ZTESOFT.combofield',
//                        hideLabel : true,
//                        name : 'attributionCityName',
//                        id : 'attributionCityName',
//                        valueField : 'id',
//                        displayField : 'text',
//                        mode : 'local',
//                        triggerAction : 'all',
//                        allowBlank : false,
//                        forceSelect : true,
//                        editable : true,
////                        value : '',
//                        store : new Ext.data.JsonStore({
//                            remoteSort: true,
//                            fields: ['id', 'text']
//                        }),
//                        listeners:{
//                            select: function(combo, record, index){
//                                Ext.getCmp('attributionCityId').setValue(combo.value);
//                            }
//                        },
//                        anchor : '100%'
//                    }
                    	{
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly : true,
                        name : 'storageCityName',
                        id : 'storageCityName',
                        anchor : '100%'
                    }
                    ,{
                        xtype : 'hidden',
                        name : 'storageCityId',
                        id : 'storageCityId'
                    }
                    ]
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
                    width:226,
                    items : [
                    {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly:true,
                        id:'storageDepartmentName',
                        name:'storageDepartmentName',
                        anchor : '100%'
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
//                        id:'adminName',
//                        name:'adminName',
//                        anchor : '100%'
//                    },
                    {
                        xtype: 'ZTESOFT.popupfield',
                        id: 'adminName',
                        name: 'adminName',
                        hideLabel : true,
                        valueFile : 'adminId',
                        readOnly: true,
                        allowBlank : false,
                        anchor : '100%',
                        onPopup : function() {return;
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
                        xtype : 'hidden',
                        name : 'adminId',
                        id : 'adminId'
                    }]
                }
                ,{
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
                    colspan : 1,
                    items : {
                        xtype:'ZTESOFT.textfield',
                        hideLabel : true,
                        id:'remarks',
                        name:'remarks',
                        anchor : '100%'
                    }
                }
            ];
            return items;
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
                          dict: true,
                          dictType:'TESTCARD_TYPE',
                          allowBlank : false,
                          value: '',
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
//                      width:330,
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
                          value: '',
                          anchor : '100%'
                      }
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
                          dict: true,
                          dictType:'ATTRIBUTION_COUNTRY',
                          allowBlank : false,
                          value: '',
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
                      width:226,
                      items : [
//                      {
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        triggerAction: 'all',
//                        name : 'attributionProvinceName',
//                        id : 'attributionProvinceName',
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
//                        listeners:{
//                            select: function(combo, record, index){
//                                var cityCombo = Ext.getCmp('attributionCityName');
//                                cityCombo.clearValue();
//                                cityCombo.getStore().proxy = new Ext.data.HttpProxy({
//                                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
//                                    method:'post'
//                                });
//                                cityCombo.getStore().load();
//                                addOper.reConfigCol(combo.value);
//                                Ext.getCmp('attributionProvinceId').setValue(combo.value);
//                            }
//                        },
//                        anchor : '100%'
//                    }
                      	{
                          xtype : 'ZTESOFT.textfield',
                          hideLabel : true,
                          readOnly : true,
                          name : 'attributionProvinceName',
                          id : 'attributionProvinceName',
                          anchor : '100%'
                      }
                      ,{
                          xtype : 'hidden',
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
                      width:226,
                      items : [
//                      {
//                        xtype : 'ZTESOFT.combofield',
//                        hideLabel : true,
//                        name : 'attributionCityName',
//                        id : 'attributionCityName',
//                        valueField : 'id',
//                        displayField : 'text',
//                        mode : 'local',
//                        triggerAction : 'all',
//                        allowBlank : false,
//                        forceSelect : true,
//                        editable : true,
////                        value : '',
//                        store : new Ext.data.JsonStore({
//                            remoteSort: true,
//                            fields: ['id', 'text']
//                        }),
//                        listeners:{
//                            select: function(combo, record, index){
//                                Ext.getCmp('attributionCityId').setValue(combo.value);
//                            }
//                        },
//                        anchor : '100%'
//                    }
                      	{
                          xtype : 'ZTESOFT.textfield',
                          hideLabel : true,
                          readOnly : true,
                          name : 'attributionCityName',
                          id : 'attributionCityName',
                          anchor : '100%'
                      }
                      ,{
                          xtype : 'hidden',
                          name : 'attributionCityId',
                          id : 'attributionCityId'
                      }]
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
                          mode: 'local',
                          triggerAction: 'all',
                          typeAhead : true,
                          editable : false ,
                          dict: true,
                          dictType:'CARD_NETWORK_TYPE',
                          allowBlank : false,
                          value: '',
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
                      {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly:true,
                        id:'wareManName',
                        name:'wareManName',
                        anchor : '100%'
                    },
//                      	{
//                          xtype: 'ZTESOFT.popupfield',
//                          id: 'wareManName',
//                          name: 'wareManName',
//                          hideLabel : true,
//                          valueFile : 'wareManId',
//                          readOnly: true,
//                          allowBlank : false,
//                          anchor : '100%',
//                          onPopup : function() {
//                              TreeOper.singleUserTree({
//                                  onComplete: function(id,text,data){
//                                      Ext.getCmp('wareManId').setValue(id);
//                                      Ext.getCmp('wareManName').setValue(text);
//                                  }
//                              });
//                          }
//                      },
                      	{
                          xtype : 'hidden',
                          name : 'wareManId',
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
//                      items : 
//                      {
//                                        xtype:'ZTESOFT.combofield',
//                                        hideLabel : true,
////                                        fieldLabel: '<font color="red">*</font>工单类型',
//                                        name: 'packageTypeEnumId',
//                                        id: 'packageTypeEnumId',
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
//                      	{
//                          xtype : 'ZTESOFT.enum',
//                          hideLabel : true,
//                          name : 'packageTypeEnumId',
//                          id : 'packageTypeEnumId',
//                          valueField: 'dataValue',
//                          displayField: 'dataName',
//                          mode: 'local',
//                          typeAhead : true,
//                          triggerAction: 'all',
//                          editable : false ,
//                          dict: true,
//                          dictType:'PACKAGE_TYPE',
//                          value: '',
//                          anchor : '100%'
//                      }
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
//                      items : 
//                      {
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
//                      	{
//                          xtype : 'ZTESOFT.enum',
//                          hideLabel : true,
//                          name : 'attchPackageEnumId',
//                          id : 'attchPackageEnumId',
//                          valueField: 'dataValue',
//                          displayField: 'dataName',
//                          mode: 'local',
//                          triggerAction: 'all',
//                          typeAhead : true,
//                          editable : false ,
//                          dict: true,
//                          dictType:'ATTCH_PACKAGE',
//                          value: '',
//                          anchor : '100%'
//                      }
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
                      width:226,
                      items : [
//                      {
//                        xtype : 'ZTESOFT.combofield',
//                        hideLabel : true,
//                        name : 'attributionCityName',
//                        id : 'attributionCityName',
//                        valueField : 'id',
//                        displayField : 'text',
//                        mode : 'local',
//                        triggerAction : 'all',
//                        allowBlank : false,
//                        forceSelect : true,
//                        editable : true,
////                        value : '',
//                        store : new Ext.data.JsonStore({
//                            remoteSort: true,
//                            fields: ['id', 'text']
//                        }),
//                        listeners:{
//                            select: function(combo, record, index){
//                                Ext.getCmp('attributionCityId').setValue(combo.value);
//                            }
//                        },
//                        anchor : '100%'
//                    }
                      	{
                          xtype : 'ZTESOFT.textfield',
                          hideLabel : true,
                          readOnly : true,
                          name : 'storageCityName',
                          id : 'storageCityName',
                          anchor : '100%'
                      }
                      ,{
                          xtype : 'hidden',
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
                      width:226,
                      items : [
                      {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly:true,
                        id:'storageDepartmentName',
                        name:'storageDepartmentName',
                        anchor : '100%'
                    },
//                      	{
//                          xtype: 'ZTESOFT.popupfield',
//                          id: 'storageDepartmentName',
//                          name: 'storageDepartmentName',
//                          hideLabel : true,
//                          valueFile : 'storageDepartmentId',
//                          readOnly: true,
//                          allowBlank : false,
//                          anchor : '100%',
//                          onPopup : function() {
//                              TreeOper.singleOrgTree({
//                                  onComplete: function(id,text,data){
//                                      Ext.getCmp('storageDepartmentId').setValue(id);
//                                      Ext.getCmp('storageDepartmentName').setValue(text);
//                                  }
//                              });
//                          }
//                      },
                      	{
                          xtype : 'hidden',
                          name : 'storageDepartmentId',
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
                          value: '',
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
//                      {
//                        xtype : 'ZTESOFT.textfield',
//                        hideLabel : true,
//                        readOnly:true,
//                        id:'adminName',
//                        name:'adminName',
//                        anchor : '100%'
//                    },
                    {
                        xtype: 'ZTESOFT.popupfield',
                        id: 'adminName',
                        name: 'adminName',
                        hideLabel : true,
                        valueFile : 'adminId',
                        readOnly: true,
                        allowBlank : false,
                        anchor : '100%',
                        onPopup : function() {return;
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
//                      	{
//                          xtype: 'ZTESOFT.popupfield',
//                          id: 'adminName',
//                          name: 'adminName',
//                          hideLabel : true,
//                          valueFile : 'adminId',
//                          readOnly: true,
//                          allowBlank : false,
//                          anchor : '100%',
//                          onPopup : function() {
//                              var orgId = null;
//                              var orgName = null;
//                              if(Ext.getCmp('storageDepartmentId').getValue()){
//                                  orgId = Ext.getCmp('storageDepartmentId').getValue();
//                                  orgName = Ext.getCmp('storageDepartmentName').getValue();
//                              }else{
//                                  Ext.Msg.alert('操作提示','请先选择存放部门!');
//                                  return;
//                              }
//                              TreeOper.orgAndUserByCon({
//                                  parentId :orgId ,
//                                  parentName : orgName,
//                                  singleSelect : true,
//                                  onComplete: function(id,text,data){
//                                      Ext.getCmp('adminId').setValue(id);
//                                      Ext.getCmp('adminName').setValue(text);
//                                  }
//                              });
//                          }
//                      },
                      	{
                          xtype : 'hidden',
                          name : 'adminId',
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
                      colspan : 1,
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
        
        //手动配置的 私有属性列
        this.autoSetItem = function(data,items){
            for(var i=0;i<data.length;i++){
                var xtype = 'ZTESOFT.textfield';
                var alBlank = true;
                var labelItem = null;
                var contentItem = null;
                var text = null;
                var format = null;
                var label = null;
                var len = 99;
                var regexStr = "";
                var regexTextStr = "";
                
                if(data[i].isNull == 0){//非空
                    alBlank = false;
                    label = '<font color="red">*</font>'+data[i].columnName;
                }else{
                    label = data[i].columnName;
                }
                
                labelItem = {
                        colspan : 1,
                        items : {
                            xtype : 'ZTESOFT.label',
                            html : label
                        }
                };
                
                if(data[i].isEnumType == 0){//不是枚举值
                    if(data[i].dataTypeEnumId == 1 ){//整型
                        xtype = 'ZTESOFT.numberfield';
                        len = data[i].dataLength;
                    }else if(data[i].dataTypeEnumId == 2){//小数
                        xtype = 'ZTESOFT.numberfield';
                        len = data[i].dataLength;
                    }else if(data[i].dataTypeEnumId == 3){//字符
                        xtype = 'ZTESOFT.textfield';
                        len = data[i].dataLength;
                    }else if(data[i].dataTypeEnumId == 4){//日期
                        xtype = 'ZTESOFT.datefield';
                        format = 'Y-m-d';
                    }else if(data[i].dataTypeEnumId == 5){//时间
                        xtype = 'ZTESOFT.datefield';
                        format = 'Y-m-d H:i:s';
                    }else if(data[i].dataTypeEnumId == 6){//布尔型
                        xtype = 'ZTESOFT.combofield';
                    }
                    
                    //布尔型的也需要用下拉框，其它不需要
                    if(data[i].dataTypeEnumId != 6&&data[i].dataTypeEnumId != 1&&data[i].dataTypeEnumId != 2){
                        contentItem = {
                            colspan : 1,
                            items : {
                                xtype : xtype,
                                hideLabel : true,
                                name : data[i].columnNumber,
                                id : data[i].columnNumber,
                                regex :regexStr,
                                regexText : regexTextStr,
                                allowBlank : alBlank,
                                maxLength:len,
                                format : format,
                                anchor : '100%'
                            }
                        };
                    }else if(data[i].dataTypeEnumId == 1){//整数
                        contentItem = {
                            colspan : 1,
                            items : {
                                xtype : xtype,
                                hideLabel : true,
                                name : data[i].columnNumber,
                                id : data[i].columnNumber,
                                regex :/^-?[1-9]\d*$/,
                                regexText : "请输入有效整数!",
                                allowBlank : alBlank,
                                maxLength:len,
                                format : format,
                                anchor : '100%'
                            }
                        };
                    
                    }else if(data[i].dataTypeEnumId == 2){//小数
                        contentItem = {
                            colspan : 1,
                            items : {
                                xtype : xtype,
                                hideLabel : true,
                                name : data[i].columnNumber,
                                id : data[i].columnNumber,
                                regex :/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/,
                                regexText : "请输入有效小数!",
                                allowBlank : alBlank,
                                maxLength:len,
                                format : format,
                                anchor : '100%'
                            }
                        };
                    
                    }else{
                        var store = new Ext.data.ArrayStore({
                            fields: ['enumValue','enumValueMeaning'],
                            data:[
                            ['','--请选择--'],
                                ['1','是'],
                                ['0','否']
                            ]
                        });
                        contentItem = {
                                colspan : 1,
                                items : {
                                    xtype : xtype,
                                    hideLabel : true,
                                    name : data[i].columnNumber,
                                    id : data[i].columnNumber,
                                    allowBlank : alBlank,
                                    valueField: 'enumValue',
                                    displayField: 'enumValueMeaning',
                                    mode: 'local',
                                    triggerAction: 'all',
                                    editable : false ,
                                    value: '',
                                    store: store,
                                    anchor : '100%'
                                }
                            };
                    }
                }else{//是枚举值，使用下拉框
                    xtype = 'ZTESOFT.combofield';
                    var store = new Ext.data.JsonStore({
                        remoteSort : false,
                        baseParams : {templateDetailId:data[i].templateDetailId},
                        fields : [ 'enumValue', 'enumValueMeaning' ],
                        proxy : new Ext.data.HttpProxy({
                            url:PATH+'/e19/tciPriAttTemplateAction.json?method=qryEnumValueListForCombox'
                        })
                    });
                    store.load();
                    contentItem = {
                            colspan : 1,
                            items : {
                                xtype : xtype,
                                hideLabel : true,
                                name : data[i].columnNumber,
                                id : data[i].columnNumber,
                                allowBlank : alBlank,
                                valueField: 'enumValue',
                                displayField: 'enumValueMeaning',
                                mode: 'local',
                                triggerAction: 'all',
                                editable : false ,
                                value: '',
                                store: store,
                                anchor : '100%'
                            }
                    };
                }
                items.push(labelItem);
                items.push(contentItem);
            }
        }

        this.getTestPn = function(items){
            
            var  formPn = new Ext.FormPanel({
                id : 'testCardPage',
                region : 'center',
                buttonAlign : 'right',
                frame : true,
                layoutConfig : {
                    columns : 6
                },
                layout : 'table',
                bodyStyle : 'padding:14px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 113,
                    height : 30
                },
                items : items
            });
            
            return formPn;
        }
        
        this.getTelePn = function(items){
            
            var  formPn = new Ext.FormPanel({
                id:'teleCardPage',
                region : 'center',
                buttonAlign : 'right',
                frame : true,
                layoutConfig : {
                    columns : 6
                },
                layout : 'table',
                bodyStyle : 'padding:14px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 113,
                    height : 30
                },
                items : items
            });
            
            return formPn;
        }

        this.getTermiPn = function(items){
            
            var  formPn = new Ext.FormPanel({
                id:'termiCardPage',
                region : 'center',
                buttonAlign : 'right',
                frame : true,
                layoutConfig : {
                    columns : 6
                },
                layout : 'table',
                bodyStyle : 'padding:14px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 113,
                    height : 30
                },
                items : items
            });
            
            return formPn;
        }
        
        this.getRechPn = function(items){
            
            var  formPn = new Ext.FormPanel({
                id:'rechCardPage',
                region : 'center',
                buttonAlign : 'right',
                frame : true,
                layoutConfig : {
                    columns : 6
                },
                layout : 'table',
                bodyStyle : 'padding:14px;overflow-x:hidden;overflow-y:auto;',
                defaults : {
                    border : false,
                    bodyStyle : 'padding:0 0 0 0;',
                    layout : 'form',
                    frame : false,
                    labelAlign : 'center',
                    hideLabel : true,
                    width : 113,
                    height : 30
                },
                items : items
            });
            
            return formPn;
        }

        //获取私有属性items 编辑
        this.getPriItems = function(typeId){
            if(typeId == testCardEnum){
                return this.priTestItems();
            }else if(typeId == teleCardEnum){
                return this.priTeleItems();
            }else if(typeId == terminalEnum){
                return this.priTermiItems();
            }else if(typeId == rechCardEnum){
                return this.priRechItems();
            }
        }
      //获取公有属性items 编辑
        this.getPubItems = function(typeId){
            var fieldLabel = '';
            if(typeId == testCardEnum){
                return this.pubTestItems();
            }else if(typeId == teleCardEnum){
                fieldLabel = '固定电话状态';
                return this.pubItems(fieldLabel);
            }else if(typeId == terminalEnum){
                fieldLabel = '测试终端状态';
                return this.pubItems(fieldLabel);
            }else if(typeId == rechCardEnum){
                fieldLabel = '充值卡状态';
                return this.pubItems(fieldLabel);
            }
            
        }
    }