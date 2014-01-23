var testCardQueryAndSelectStroe = new jsonStroe();
var testCardQueryWholeCardType = null;
var testCardQueryLinkCode = "";
var testCardQueryCardOperationTypeEnumId = "";

function TestCardQueryAndSelect() {
	
	this.gridId = "";
	
	
	this.initTestCardQry = function(){
            
            var testCardQry = new Ext.FormPanel({
                id : 'testCardQryForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
                labelWidth : 70,//标签宽度
                frame : true,
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
        
    this.addQryAttribute = function(testCardQueryLinkCode,param){
        if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="apply"){//申请环节
               if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="1"){//调拨,查询所属组织下的卡
                   param.storageDepartmentId = session.logonAccount.cloudOrgId;
                   param.lendFlag = 0;
               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="2"){//移交,查询自己管理的卡
                   param.adminId = session.logonAccount.cloudUserId;
                   param.lendFlag = 0;
               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="5"){//报废,查询自己管理的卡,非报废的卡
                   param.adminId = session.logonAccount.cloudUserId;
                   param.lendFlag = 0;
                   if(param.testcardStatusEnumId==""||param.testcardStatusEnumId==null){
                        param.testcardStatusEnumId = "1','2','4','5','6";
                   }else if(param.testcardStatusEnumId=="3"){
                        Ext.Msg.alert("提示","报废申请单不能选择报废状态的卡");
                        return;
                   }
                   
               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="4"){//归还,查询自己借出的卡
                   param.lenderId = session.logonAccount.cloudUserId;
               }
               
            }else if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="modify"){//修改环节
               if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="1"){//调拨,查询所属组织下的卡
                   param.storageDepartmentId = session.logonAccount.cloudOrgId;
                   param.lendFlag = 0;
               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="2"){//移交,查询自己管理的卡
                   param.adminId = session.logonAccount.cloudUserId;
                   param.lendFlag = 0;
               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="5"){//报废,查询自己管理的卡
                   param.adminId = session.logonAccount.cloudUserId;
                   param.lendFlag = 0;
                   if(param.testcardStatusEnumId==""||param.testcardStatusEnumId==null){
                        param.testcardStatusEnumId = "1','2','4','5','6";
                   }else if(param.testcardStatusEnumId=="3"){
                        Ext.Msg.alert("提示","报废申请单不能选择报废状态的卡");
                        return;
                   }
               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="4"){//归还,查询自己借出的卡
                   param.lenderId = session.logonAccount.cloudUserId;
               }
               
            }else if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="execute"){//执行环节
               if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="3"){//借用,查询自己管理的卡,非报废非借出的卡

                   param.adminId = session.logonAccount.cloudUserId;
                   if(param.testcardStatusEnumId==""||param.testcardStatusEnumId==null){
                        param.testcardStatusEnumId = "1','2','4','5','6";
                   }else if(param.testcardStatusEnumId=="3"){
                        Ext.Msg.alert("提示","借用申请单不能选择报废状态的卡");
                        return;
                   }
                   param.lendFlag = 0;
               }
            }
            
            return param;
    }
	
	this.initTestCardOrderApplyQryWin = function(){
           
           var testCardQry = this.initTestCardQry();
           
           //测试卡查询form
            var qryTestFrom = this.initTestQryPn();
            //固定电话查询FORM
            var qryTeleForm = this.initTeleQryPn();
            //测试终端查询form
            var qryTermiForm = this.initTermiQryPn();
            //充值卡查询form
           var qryRechForm =  this.initRechQryPn();
		
            //qery
//              var qryFrom = testCardQueryAndSelectStroe.initQryPn();
              
              new Ext.Window({
                  id:'testCardQueryWin',
                  title: '高级检索',
                  closable:true,
                  width: 700,
                  height: 320,
//                  layout: 'border',
                  plain:true,
                  modal: true,
                  items: [testCardQry,qryTestFrom,qryTeleForm,qryTermiForm,qryRechForm],
                  buttonAlign:'center',
                  buttons : [{
                      
                      text : '查询',//两个字以内（包含两字）用红色，两个字以上用蓝色，特殊用灰色

                      id: 'qryBtn',
                      //disabled: true,
                      xtype: 'ZTESOFT.Button',
                      listeners : {
                          "click" : function() {
                              
                            new TestCardQueryAndSelect().doQry();
                              
                              Ext.getCmp('testCardQueryWin').close();

                          }
                      }
                  }, {
                      text : '导入测试卡',
                      xtype: 'ZTESOFT.Button',
                      hidden:testCardQueryCardOperationTypeEnumId=="1"?false:true,
                      //disabled: true,
                      //color: 'gray',//这里取消按钮比较特殊，用的是灰色底色，一般情况下都是红蓝
                      listeners : {
                          "click" : function() {
                          	
                          	var param = new Object();
                            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ReadTestCardApplyServiceImpl';
                            param.cardType = Ext.getCmp('testcardTypeEnumId').getValue().inputValue;
                            
                             var cardType = Ext.getCmp('testcardTypeEnumId').getValue().inputValue;
//                            var tmpgrid;
//                            if (1 == cardType){
//                                tmpgrid = "testEditGrid";
//                            }else if (3 == cardType){
//                                tmpgrid = "teleEditGrid";
//                            }else if (2 == cardType){
//                                tmpgrid = "termiEditGrid";
//                            }else if (4 == cardType){
//                                tmpgrid = "rechEditGrid";
//                            }            
                            new ZTESOFT.FileUtil().uploadExcel(param,function(retVal){
                            	var tmpO = new Object();
                            	tmpO.testobjectTypeEnumId = cardType;
                            	if(retVal.rows.length!=0){
                            		var uploadNumbers = "'"+retVal.rows[0].number+"'";
//                            		var uploadNumbers = "'"+retVal.rows[0].number+"'";
                            		
                            	   for(var i=1;i<retVal.rows.length;i++){
                            	   	   uploadNumbers = uploadNumbers + ",'" + retVal.rows[i].number+"'";
                            	   }
                            	   
                            	   if(uploadNumbers==""){
                            	       Ext.Msg.alert("提示","上传的模板内没有数据！");
                                        return;
                            	   }
                            	   
                            	   tmpO.uploadNumbers = uploadNumbers;
                            	}else{
                            	   Ext.Msg.alert("提示","上传的模板内没有数据！");
                            	   return;
                            	}
                            	tmpO.start = 0;
                            	tmpO.limit = 5000;
                            	
//                            	if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="apply"){//申请环节
//                                   if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="1"){//调拨,查询所属组织下的卡
//                                       tmpO.storageDepartmentId = session.logonAccount.cloudOrgId;
//                                   }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="2"){//移交,查询自己管理的卡
//                                       tmpO.adminId = session.logonAccount.cloudUserId;
//                                   }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="5"){//报废,查询自己管理的卡
//                                       tmpO.adminId = session.logonAccount.cloudUserId;
//                                   }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="4"){//归还,查询自己借出的卡
//                                       tmpO.lenderId = session.logonAccount.cloudUserId;
//                                   }
//                                   
//                                }else if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="modify"){//修改环节
//                                   if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="1"){//调拨,查询所属组织下的卡
//                                       tmpO.storageDepartmentId = session.logonAccount.cloudOrgId;
//                                   }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="2"){//移交,查询自己管理的卡
//                                       tmpO.adminId = session.logonAccount.cloudUserId;
//                                   }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="5"){//报废,查询自己管理的卡
//                                       tmpO.adminId = session.logonAccount.cloudUserId;
//                                   }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="4"){//归还,查询自己借出的卡
//                                       tmpO.lenderId = session.logonAccount.cloudUserId;
//                                   }
//                                   
//                                }
                                
                                tmpO = new TestCardQueryAndSelect().addQryAttribute(testCardQueryLinkCode,tmpO);
                            	
                            	var _ret = ZTESOFT.Synchronize(PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage',tmpO);
                                if(_ret.total!=null&&_ret.total!=0){
                                	var alMsg = "编号为";
                                	var flaa = 1;//此标记判断导入的所有测试卡编号是否全都找到了对应的测试卡，为1时找到，为0时没找到
                                	for(var i=0;i<retVal.rows.length;i++){
                                		var fla = 0;//此标记判断导入的测试卡编号是否找到对应测试卡，为1时找到，为0时没找到
                                		if(retVal.rows[i].number==""){
                                		  break;
                                		}
                                		for(var j=0;j<_ret.total;j++){
                                		  if(retVal.rows[i].number==_ret.rows[j].numberTmp){
                                		      fla = 1;break;
                                		  }
                                		}
                                		if(fla==0){
                                		  alMsg = alMsg + "["+retVal.rows[i].number +"]";
                                		  flaa = 0;
                                		}
                                		
                                		fla = 0;
                                	}
                                	
                                	if(flaa==0){//有些测试卡编号没找到对应的测试卡，需要提示
                                	   Ext.Msg.alert("提示",alMsg+"的测试卡编号没有查到对应的测试卡，请检查填入的编号是否正确");
                                	}
                                	
                                	Ext.getCmp("testCardQryResult").store.loadData(_ret);
                                	Ext.getCmp('testCardQueryWin').close();
//                                    var li = _ret.rows;
//                                   for(var i=0;i<_ret.total;i++){
//                                       attNums.push(li[i].attRelGenId);
//                                       attNames.push(li[i].attachmentName);
//                                       attIds.push(li[i].attachmentId);
//                                   }
                                }else{
                                        Ext.Msg.alert("提示","没有查到对应的测试卡，请检查填入的编号是否正确");
                                }
//                                var colMArray = loadOper.baseCoumn(cardType);
//                                var param = {};
//                                param.testobjectType = cardType;
//                                
//                                ZTESOFT.invokeAction(
//                                        PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList',
//                                        param,
//                                        function(response){
//                                            if(response && response.rows && response.rows.length > 0){
//                                                oper.autoSetItem(response.rows,colMArray,tmpgrid);
//                                            }
//                                            loadOper.initWindow(colMArray,cardType);
//                                            Ext.getCmp(tmpgrid).store.removeAll();
//                                            Ext.getCmp(tmpgrid).store.loadData(retVal);
//                                        }
//                                );
                            }); 
                          	
                              
                          }
                      }
                  }, {
                      text : '下载导入模板',
                      xtype: 'ZTESOFT.Button',
                      hidden:testCardQueryCardOperationTypeEnumId=="1"?false:true,
                      //disabled: true,
                      //color: 'gray',//这里取消按钮比较特殊，用的是灰色底色，一般情况下都是红蓝
                      listeners : {
                          "click" : function() {
                              var param = new Object();
                                param.serviceClass = 'com.unicom.ucloud.eom.e19.service.CreTestCardUploadServiImpl';
                    
                                param.fileType = 'EXCEL';
                                
                                param.exportType = 'ALL';

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
                      }
                  }, {
                      text : '关闭',
                      xtype: 'ZTESOFT.Button',
                      //disabled: true,
                      //color: 'gray',//这里取消按钮比较特殊，用的是灰色底色，一般情况下都是红蓝
                      listeners : {
                          "click" : function() {
                              Ext.getCmp('testCardQueryWin').close();
                          }
                      }
                  }]
              }).show();
              if(testCardQueryLinkCode=="apply"||testCardQueryLinkCode=="modify"||testCardQueryLinkCode=="execute"){
              	if(session.logonAccount.provinceCompanyId==null){//集团账号
              	     
              	
//              	if(session.logonAccount.orgCategory==3||session.logonAccount.orgCategory==4){//省份账号 归属省份设默认值并且只读，重新加载地市下拉框
              	}else if(session.logonAccount.cityCompanyId==null){//省份账号 归属省份设默认值并且只读，重新加载地市下拉框
              	    Ext.getCmp("testProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    Ext.getCmp("teleProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    Ext.getCmp("termiProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    Ext.getCmp("rechProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    
                   /* Ext.getCmp("testProvinceId").readOnly = true;
                    Ext.getCmp("teleProvinceId").readOnly = true;
                    Ext.getCmp("termiProvinceId").readOnly = true;
                    Ext.getCmp("rechProvinceId").readOnly = true;*/
                    
                    this.initCityCombo("testCityId",session.logonAccount.provinceCompanyId);
                    this.initCityCombo("teleCityId",session.logonAccount.provinceCompanyId);
                    this.initCityCombo("termiCityId",session.logonAccount.provinceCompanyId);
                    this.initCityCombo("rechCityId",session.logonAccount.provinceCompanyId);
//              	}else if(session.logonAccount.orgCategory==5||session.logonAccount.orgCategory==6){//地市账号 归属省份设默认值并且只读，归属地市设默认值并且只读
              	}else if(session.logonAccount.cityCompanyId!=null){//地市账号 归属省份设默认值并且只读，归属地市设默认值并且只读
              		Ext.getCmp("testProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    Ext.getCmp("teleProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    Ext.getCmp("termiProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    Ext.getCmp("rechProvinceId").setRawValue(session.logonAccount.provinceCompanyName);
                    
                    Ext.getCmp("testProvinceId").readOnly = true;
                    Ext.getCmp("teleProvinceId").readOnly = true;
                    Ext.getCmp("termiProvinceId").readOnly = true;
                    Ext.getCmp("rechProvinceId").readOnly = true;
                    
                    this.initCityCombo("testCityId",session.logonAccount.provinceCompanyId);
                    this.initCityCombo("teleCityId",session.logonAccount.provinceCompanyId);
                    this.initCityCombo("termiCityId",session.logonAccount.provinceCompanyId);
                    this.initCityCombo("rechCityId",session.logonAccount.provinceCompanyId);
              		
              	    Ext.getCmp("testCityId").setRawValue(session.logonAccount.cityCompanyName);
                    Ext.getCmp("teleCityId").setRawValue(session.logonAccount.cityCompanyName);
                    Ext.getCmp("termiCityId").setRawValue(session.logonAccount.cityCompanyName);
                    Ext.getCmp("rechCityId").setRawValue(session.logonAccount.cityCompanyName);
                    
                    Ext.getCmp("testCityId").readOnly = true;
                    Ext.getCmp("teleCityId").readOnly = true;
                    Ext.getCmp("termiCityId").readOnly = true;
                    Ext.getCmp("rechCityId").readOnly = true;
              	}
              }
              
                    Ext.getCmp('qryTestForm').setVisible(true);
                    Ext.getCmp('qryTeleForm').setVisible(false);
                    Ext.getCmp('qryTermiForm').setVisible(false);
                    Ext.getCmp('qryRechForm').setVisible(false);
              
              if(testCardQueryWholeCardType!=null){
                var it = Ext.getCmp('testcardTypeEnumId').items;
                for(var i=0;i<it.length;i++){
                    if(it.items[i].inputValue==testCardQueryWholeCardType){
                        it.items[i].checked = true;
                        Ext.getCmp('testcardTypeEnumId').setValue(testCardQueryWholeCardType);
                    }
                }
                
                if(testCardQueryWholeCardType == 1){ 
                    Ext.getCmp('qryTestForm').setVisible(true);
                    Ext.getCmp('qryTeleForm').setVisible(false);
                    Ext.getCmp('qryTermiForm').setVisible(false);
                    Ext.getCmp('qryRechForm').setVisible(false);
                }else if(testCardQueryWholeCardType == 2){
                    Ext.getCmp('qryTestForm').setVisible(false);
                    Ext.getCmp('qryTeleForm').setVisible(false);
                    Ext.getCmp('qryTermiForm').setVisible(true);
                    Ext.getCmp('qryRechForm').setVisible(false);
                    
                }else if(testCardQueryWholeCardType == 3){
                    Ext.getCmp('qryTestForm').setVisible(false);
                    Ext.getCmp('qryTeleForm').setVisible(true);
                    Ext.getCmp('qryTermiForm').setVisible(false);
                    Ext.getCmp('qryRechForm').setVisible(false);
                }else if(testCardQueryWholeCardType == 4){
                    Ext.getCmp('qryTestForm').setVisible(false);
                    Ext.getCmp('qryTeleForm').setVisible(false);
                    Ext.getCmp('qryTermiForm').setVisible(false);
                    Ext.getCmp('qryRechForm').setVisible(true);
                }
                Ext.getCmp('testcardTypeEnumId').setDisabled(true);
              }
              
          }
          
    this.initCityCombo = function(comboName,provinceId){
        var cityCombo = Ext.getCmp(comboName);
                cityCombo.clearValue();
                cityCombo.getStore().proxy = new Ext.data.HttpProxy({
                         url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+provinceId,
                         method:'post'
                });
                cityCombo.getStore().load();
    }
          
    //两参数，环节，测试卡工单类型，确定返回的
    this.initTestQryPnToolsBarTwo = function(linkCode,cardOperationTypeEnumId) {
    	
    	testCardQueryLinkCode = linkCode;
    	testCardQueryCardOperationTypeEnumId = cardOperationTypeEnumId;
    	
            var tb = new Ext.Toolbar({region : 'north'});
            
            tb.add({
                text : '高级检索',
                //disabled: true,
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                    //alert('高级检索');
                    new TestCardQueryAndSelect().initTestCardOrderApplyQryWin();
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

            return tb;
        }
	
	this.initTestQryPnToolsBar = function() {
            var tb = new Ext.Toolbar({region : 'north'});
            
            tb.add({
                text : '高级检索',
                //disabled: true,
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                    //alert('高级检索');
                    new TestCardQueryAndSelect().initTestCardOrderApplyQryWin();
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

            return tb;
        }
        
        this.initTestQryPnToolsBar = function(checkLinkCode,value) {
        	testCardQueryLinkCode = checkLinkCode;
        	testCardQueryWholeCardType = value;
            var tb = new Ext.Toolbar({region : 'north',id:"tesetCardQueryToolbar"});
            
            tb.add({
                text : '高级检索',
                //disabled: true,
                xtype: 'ZTESOFT.Button',
                onClick : function() {
                    //alert('高级检索');
                    new TestCardQueryAndSelect().initTestCardOrderApplyQryWin();
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

            return tb;
        }

//测试卡查询form
        this.initTestQryPn = function() {
            var qryTestForm = new Ext.FormPanel({
                id : 'qryTestForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式

//                labelWidth : 80,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩//                hidden:true,

//                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
//                height : 150,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
//                width : body_width,
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
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '归属省份'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
//                                        xtype : 'ZTESOFT.enum',
////                                       fieldLabel : '归属省份',
//                                        hideLabel : true,
//                                       triggerAction: 'all',
//                                       name : 'testProvinceId',
//                                       id : 'testProvinceId',
//                                       mode: 'local',
//                                       dict: false,
////                                       allowBlank : false,
//                                       forceSelect : true,
//                                       editable : true,
//                                       url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                                       valueField: 'id',
//                                       displayField: 'text',
//                                       baseParams : {node:1},
//                                       value: '',
//                                       anchor : '100%',

                                        xtype:'ZTESOFT.enum',
                                        hideLabel : true,
                                        triggerAction: 'all',
                                        name : 'testProvinceId',
                                        id : 'testProvinceId',
                                        //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                                        typeAhead : true,//自动匹配
                                        editable: false,
                                        dict: false,//此值为ture，则使用默认的字典表来赋值
                                        url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                                        valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                                        displayField: 'text',
                                        value:session.logonAccount.provinceCompanyId,
                                  //      value: '',//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                    //                           addOper.reConfigCol(combo.value);
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.combofield',
                                        hideLabel : true,
//                                       fieldLabel : '归属地市',
                                           name : 'testCityId',
                                           id : 'testCityId',
                                           valueField : 'id',
                                           displayField : 'text',
                                           mode : 'local',
                                           triggerAction : 'all',
//                                           allowBlank : false,
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '测试卡类别',
                                        name : 'testTypeEnumId',
                                        id : 'testTypeEnumId',
                                        valueField: 'dataValue',
                                        displayField: 'dataName',
                                        mode: 'local',
                                        triggerAction: 'all',
                                        typeAhead : true,
                                        editable : true ,
                                        dict: true,
                                        dictType:'TESTCARD_TYPE',
                                        value: '',
//                                        store: testCardQueryAndSelectStroe.testCardObjectStore, 
                                           anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '测试卡编号'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
//                                       fieldLabel : '测试卡编号',
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
//                                       fieldLabel : '用户号码',
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '测试卡状态',
                            name : 'testStatusEnumIdQry',
                            id : 'testStatusEnumIdQry',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : true ,
                            dict: true,
                            dictType:'TESTCARD_STATUS',
                            value: '',
//                            store: testCardQueryAndSelectStroe.testStatusEnumStore,
                                           anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '查询范围'
                                    }
                                },{
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
//                        fieldLabel : '查询范围',
                        name : 'testQryFromCity',
                        id : 'testQryFromCity',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
                        value: '0',
                        store: new Ext.data.ArrayStore({
                            fields: ['value','text'],
                            data:[
                                ['0','本人所属'],
                                ['1','本地市所属']
                            ]
                        }),
                        anchor : '100%'
                        }
                    }
                                
                ]
//                items : [{
//                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉//
//
//                    items : [{
//                        columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性//
//
//                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属省份',
////                            name : 'testProvinceId',
////                            id : 'testProvinceId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            allowBlank : false,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.provinceStore,
////                            anchor : '90%'
////                        }
//                        {
//                   xtype : 'ZTESOFT.Combobox',
//                   fieldLabel : '归属省份',
//                   triggerAction: 'all',
//                   name : 'testProvinceId',
//                   id : 'testProvinceId',
//                   mode: 'local',
//                   dict: false,
//                   allowBlank : false,
//                   forceSelect : true,
//                   editable : true,
//                   url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                   valueField: 'id',
//                   displayField: 'text',
//                   baseParams : {node:1},
//                   value: '',
//                   anchor : '95%',
//                   listeners:{
//                       select: function(combo, record, index){
//                           var cityCombo = Ext.getCmp('testCityId');
//                           cityCombo.clearValue();
//                           cityCombo.getStore().proxy = new Ext.data.HttpProxy({
//                               url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
//                               method:'post'
//                           });
//                           cityCombo.getStore().load();
////                           addOper.reConfigCol(combo.value);
//                       }
//                   }
//                 }
//                        ]
//                    }, 
//                    
//                    	{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属本地网',
////                            name : 'testCityId',
////                            id : 'testCityId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.cityStore,
////                            anchor : '90%'
////                        }
//                        {
//                       xtype : 'combo',
//                       fieldLabel : '归属地市',
//                       name : 'testCityId',
//                       id : 'testCityId',
//                       valueField : 'id',
//                       displayField : 'text',
//                       mode : 'local',
//                       triggerAction : 'all',
//                       allowBlank : false,
//                       forceSelect : true,
//                       editable : true,
//                       value : '',
//                       store : new Ext.data.JsonStore({
//                           remoteSort: true,
//                           fields: ['id', 'text']
//                       }),
//                       anchor : '95%'
//                       }
//                        ]
//                    }
//                    , {
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '测试卡类别',
//                            name : 'testTypeEnumId',
//                            id : 'testTypeEnumId',
//                            valueField: 'value',
//                            displayField: 'text',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : true ,
//                            value: '',
//                            store: testCardQueryAndSelectStroe.testCardObjectStore,
//                            anchor : '90%'
//                        }]
//                    }
////                    ,{
////                        columnWidth : .3,
////                        layout : 'form',
////                        items : [{
////                            xtype : 'textfield',
////                            fieldLabel : '测试卡编号',
////                            name : 'testNumber',
////                            id : 'testNumber',
////                            anchor : '90%'
////                        }]
////                    }
//                    ]
//                },
//                {
//                    layout : 'column',
//                    items : [{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '测试卡编号',
//                            name : 'testNumber',
//                            id : 'testNumber',
//                            anchor : '90%'
//                        }]
//                    },{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '用户号码',
//                            name : 'testSubscriberNumber',
//                            id : 'testSubscriberNumber',
//                            anchor : '90%'
//                        }]
//                    },{
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '测试卡状态',
//                            name : 'testStatusEnumIdQry',
//                            id : 'testStatusEnumIdQry',
//                            valueField: 'value',
//                            displayField: 'text',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : true ,
//                            value: '',
//                            store: testCardQueryAndSelectStroe.testStatusEnumStore,
//                            anchor : '90%'
//                        }]
//                    }]
//                }]
                ,
                buttons : [{
                    text : '查询',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            new TestCardQueryAndSelect().doQry();
                        }
                    }
                }, {
                    text : '重置',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            Ext.getCmp('qryTestForm').getForm().reset();
                        }
                    }
                }]
            });
            return qryTestForm;
        };

        //固定电话类型 查询FORM
        this.initTeleQryPn = function() {
            var qryTeleForm = new Ext.FormPanel({
                id : 'qryTeleForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式

//                labelWidth : 80,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩

//                hidden : true,
//                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
//                height : 150,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
//                width : body_width,
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
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '归属省份'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
//                                        xtype : 'ZTESOFT.enum',
//                                        hideLabel : true,
////                                       fieldLabel : '归属省份',
//                                       triggerAction: 'all',
//                                       name : 'teleProvinceId',
//                                       id : 'teleProvinceId',
//                                       mode: 'local',
//                                       dict: false,
////                                       allowBlank : false,
//                                       forceSelect : true,
//                                       editable : true,
//                                       url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                                       valueField: 'id',
//                                       displayField: 'text',
//                                       baseParams : {node:1},
//                                       value: '',
//                                       anchor : '100%',

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
                                        value:session.logonAccount.provinceCompanyId,
                                       // value: '',//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                    //                           addOper.reConfigCol(combo.value);
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.combofield',
                                        hideLabel : true,
//                                       fieldLabel : '归属地市',
                                       name : 'teleCityId',
                                       id : 'teleCityId',
                                       valueField : 'id',
                                       displayField : 'text',
                                       mode : 'local',
                                       triggerAction : 'all',
//                                       allowBlank : false,
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
                                        text : '电话号码'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
//                                       fieldLabel : '电话号码',
                                        name : 'telePhoneNumber',
                                        id : 'telePhoneNumber',
                                       anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '类型'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '类型',
                                        name : 'telePhoneTypeEnumId',
                                        id : 'telePhoneTypeEnumId',
                                        valueField: 'dataValue',
                                        displayField: 'dataName',
                                        mode: 'local',
                                        typeAhead : true,
                                        triggerAction: 'all',
                                        dict: true,
                                        dictType:'FIXED_PHONE_TYPE',
                                        editable : true ,
                                        value: '',
//                                        store: testCardQueryAndSelectStroe.telePhoneTypeEnumStore,
                                       anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '固话状态'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '测试卡状态',
                            name : 'teleStatusEnumIdQry',
                            id : 'teleStatusEnumIdQry',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : true ,
                            dict: true,
                            dictType:'TESTCARD_STATUS',
                            value: '',
//                            store: testCardQueryAndSelectStroe.testStatusEnumStore,
                                           anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '查询范围'
                                    }
                                },{
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
//                        fieldLabel : '查询范围',
                        name : 'teleQryFromCity',
                        id : 'teleQryFromCity',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
                        value: '0',
                        store: new Ext.data.ArrayStore({
                            fields: ['value','text'],
                            data:[
                                ['0','本人所属'],
                                ['1','本地市所属']
                            ]
                        }),
                        anchor : '100%'
                        }
                    }
                ]
//                items : [{
//                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉//
//
//                    items : [{
//                        columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性//
//
//                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属省份',
////                            name : 'teleProvinceId',
////                            id : 'teleProvinceId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.provinceStore,
////                            anchor : '90%'
////                        }
//                        {
//                   xtype : 'ZTESOFT.Combobox',
//                   fieldLabel : '归属省份',
//                   triggerAction: 'all',
//                   name : 'teleProvinceId',
//                   id : 'teleProvinceId',
//                   mode: 'local',
//                   dict: false,
//                   allowBlank : false,
//                   forceSelect : true,
//                   editable : true,
//                   url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                   valueField: 'id',
//                   displayField: 'text',
//                   baseParams : {node:1},
//                   value: '',
//                   anchor : '95%',
//                   listeners:{
//                       select: function(combo, record, index){
//                           var cityCombo = Ext.getCmp('teleCityId');
//                           cityCombo.clearValue();
//                           cityCombo.getStore().proxy = new Ext.data.HttpProxy({
//                               url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
//                               method:'post'
//                           });
//                           cityCombo.getStore().load();
////                           addOper.reConfigCol(combo.value);
//                       }
//                   }
//                 }
//                        
//                        ]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属本地网',
////                            name : 'teleCityId',
////                            id : 'teleCityId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.cityStore,
////                            anchor : '90%'
////                        }
//                        {
//                       xtype : 'combo',
//                       fieldLabel : '归属地市',
//                       name : 'teleCityId',
//                       id : 'teleCityId',
//                       valueField : 'id',
//                       displayField : 'text',
//                       mode : 'local',
//                       triggerAction : 'all',
//                       allowBlank : false,
//                       forceSelect : true,
//                       editable : true,
//                       value : '',
//                       store : new Ext.data.JsonStore({
//                           remoteSort: true,
//                           fields: ['id', 'text']
//                       }),
//                       anchor : '95%'
//                       }
//                        ]
//                    },{
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '电话号码',
//                            name : 'telePhoneNumber',
//                            id : 'telePhoneNumber',
//                            anchor : '90%'
//                        }]
//                    }]
//                },
//                {
//                    layout : 'column',
//                    items : [{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '类型',
//                            name : 'telePhoneTypeEnumId',
//                            id : 'telePhoneTypeEnumId',
//                            valueField: 'value',
//                            displayField: 'text',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : true ,
//                            value: '',
//                            store: testCardQueryAndSelectStroe.telePhoneTypeEnumStore,
//                            anchor : '90%'
//                        }]
//                    }]
//                }]
                ,
                buttons : [{
                    text : '查询',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            new TestCardQueryAndSelect().doQry();
                        }
                    }
                }, {
                    text : '重置',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            Ext.getCmp('qryTeleForm').getForm().reset();
                        }
                    }
                }]
            });
            return qryTeleForm;
        };
        
        //测试终端 查询FORM
        this.initTermiQryPn = function() {
            var qryTermiForm = new Ext.FormPanel({
                id : 'qryTermiForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式

//                labelWidth : 80,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩

//                hidden : true,
//                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
//                height : 150,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
//                width : body_width,
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
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '归属省份'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
//                                        xtype : 'ZTESOFT.enum',
//                                        hideLabel : true,
////                                       fieldLabel : '归属省份',
//                                       triggerAction: 'all',
//                                       name : 'termiProvinceId',
//                                       id : 'termiProvinceId',
//                                       mode: 'local',
//                                       dict: false,
////                                       allowBlank : false,
//                                       forceSelect : true,
//                                       editable : true,
//                                       url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                                       valueField: 'id',
//                                       displayField: 'text',
//                                       baseParams : {node:1},
//                                       value: '',
//                                       anchor : '100%',

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
                                        value:session.logonAccount.provinceCompanyId,
                                     //   value: '',//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                    //                           addOper.reConfigCol(combo.value);
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.combofield',
                                        hideLabel : true,
//                                       fieldLabel : '归属地市',
                                       name : 'termiCityId',
                                       id : 'termiCityId',
                                       valueField : 'id',
                                       displayField : 'text',
                                       mode : 'local',
                                       triggerAction : 'all',
//                                       allowBlank : false,
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
                                        text : '厂家'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
//                                       fieldLabel : '厂家',
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
//                                       fieldLabel : '编号',
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '手机类型',
                            name : 'termiMoblieTypeEnumId',
                            id : 'termiMoblieTypeEnumId',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            dict: true,
                            dictType:'MOBILE_TYPE',
                            typeAhead : true,
                            mode: 'local',
                            triggerAction: 'all',
                            editable : true ,
                            value: '',
//                            store: testCardQueryAndSelectStroe.moblieTypeEnumStore,
                                       anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '终端状态'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '测试卡状态',
                            name : 'termiStatusEnumIdQry',
                            id : 'termiStatusEnumIdQry',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : true ,
                            dict: true,
                            dictType:'TESTCARD_STATUS',
                            value: '',
//                            store: testCardQueryAndSelectStroe.testStatusEnumStore,
                                           anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '查询范围'
                                    }
                                },{
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
//                        fieldLabel : '查询范围',
                        name : 'termiQryFromCity',
                        id : 'termiQryFromCity',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
                        value: '0',
                        store: new Ext.data.ArrayStore({
                            fields: ['value','text'],
                            data:[
                                ['0','本人所属'],
                                ['1','本地市所属']
                            ]
                        }),
                        anchor : '100%'
                        }
                    }
                ]
//                items : [{
//                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉//
//
//                    items : [{
//                        columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性//
//
//                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属省份',
////                            name : 'termiProvinceId',
////                            id : 'termiProvinceId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.provinceStore,
////                            anchor : '90%'
////                        }
//                        {
//                   xtype : 'ZTESOFT.Combobox',
//                   fieldLabel : '归属省份',
//                   triggerAction: 'all',
//                   name : 'termiProvinceId',
//                   id : 'termiProvinceId',
//                   mode: 'local',
//                   dict: false,
//                   allowBlank : false,
//                   forceSelect : true,
//                   editable : true,
//                   url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                   valueField: 'id',
//                   displayField: 'text',
//                   baseParams : {node:1},
//                   value: '',
//                   anchor : '95%',
//                   listeners:{
//                       select: function(combo, record, index){
//                           var cityCombo = Ext.getCmp('termiCityId');
//                           cityCombo.clearValue();
//                           cityCombo.getStore().proxy = new Ext.data.HttpProxy({
//                               url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
//                               method:'post'
//                           });
//                           cityCombo.getStore().load();
////                           addOper.reConfigCol(combo.value);
//                       }
//                   }
//                 }
//                        ]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属本地网',
////                            name : 'termiCityId',
////                            id : 'termiCityId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.cityStore,
////                            anchor : '90%'
////                        }
//                        {
//                       xtype : 'combo',
//                       fieldLabel : '归属地市',
//                       name : 'termiCityId',
//                       id : 'termiCityId',
//                       valueField : 'id',
//                       displayField : 'text',
//                       mode : 'local',
//                       triggerAction : 'all',
//                       allowBlank : false,
//                       forceSelect : true,
//                       editable : true,
//                       value : '',
//                       store : new Ext.data.JsonStore({
//                           remoteSort: true,
//                           fields: ['id', 'text']
//                       }),
//                       anchor : '95%'
//                       }
//                        ]
//                    },{  
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '厂家',
//                            name : 'termiManufacturer',
//                            id : 'termiManufacturer',
//                            anchor : '90%'
//                        }]
//                    }]
//                },
//                {
//                    layout : 'column',
//                    items : [{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '编号',
//                            name : 'termiNumber',
//                            id : 'termiNumber',
//                            anchor : '90%'
//                        }]
//                    },{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '手机类型',
//                            name : 'termiMoblieTypeEnumId',
//                            id : 'termiMoblieTypeEnumId',
//                            valueField: 'value',
//                            displayField: 'text',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : true ,
//                            value: '',
//                            store: testCardQueryAndSelectStroe.moblieTypeEnumStore,
//                            anchor : '90%'
//                        }]
//                    }]
//                }]
                ,
                buttons : [{
                    text : '查询',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            new TestCardQueryAndSelect().doQry();
                        }
                    }
                }, {
                    text : '重置',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            Ext.getCmp('qryTermiForm').getForm().reset();
                        }
                    }
                }]
            });
            return qryTermiForm;
        };
        

        //充值卡 查询FORM
        this.initRechQryPn = function() {
            var qryRechForm = new Ext.FormPanel({
                id : 'qryRechForm',
//                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式

//                labelWidth : 80,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩

//                hidden : true,
//                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
//                height : 150,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
//                width : body_width,
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
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '归属省份'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
//                                        xtype : 'ZTESOFT.enum',
//                                        hideLabel : true,
//                    //                   fieldLabel : '归属省份',
//                                       triggerAction: 'all',
//                                       name : 'rechProvinceId',
//                                       id : 'rechProvinceId',
//                                       mode: 'local',
//                                       dict: false,
////                                       allowBlank : false,
//                                       forceSelect : true,
//                                       editable : true,
//                                       url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                                       valueField: 'id',
//                                       displayField: 'text',
//                                       baseParams : {node:1},
//                                       value: '',
//                                       anchor : '100%',

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
                                        value:session.logonAccount.provinceCompanyId,
                                 //       value: '',//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
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
                    //                           addOper.reConfigCol(combo.value);
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
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.combofield',
                                        hideLabel : true,
                    //                   fieldLabel : '归属地市',
                                       name : 'rechCityId',
                                       id : 'rechCityId',
                                       valueField : 'id',
                                       displayField : 'text',
                                       mode : 'local',
                                       triggerAction : 'all',
//                                       allowBlank : false,
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
                                        text : '卡号'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
                    //                   fieldLabel : '卡号',
                            name : 'rechCardNo',
                            id : 'rechCardNo',
                                       anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '面值'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.combofield',
                                        hideLabel : true,
                    //                   fieldLabel : '面值',
                            name : 'rechParValue',
                            id : 'rechParValue',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : true ,
                            value: '',
                            store: testCardQueryAndSelectStroe.rechStore,
                                       anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '充值卡状态'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
//                                       fieldLabel : '测试卡状态',
                            name : 'rechStatusEnumIdQry',
                            id : 'rechStatusEnumIdQry',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            typeAhead : true,
                            editable : true ,
                            dict: true,
                            dictType:'TESTCARD_STATUS',
                            value: '',
//                            store: testCardQueryAndSelectStroe.testStatusEnumStore,
                                           anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '查询范围'
                                    }
                                },{
                                    colspan : 1,
                                    hidden:testCardQueryCardOperationTypeEnumId=="5"?false:true,
                                    items : {
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
//                        fieldLabel : '查询范围',
                        name : 'rechQryFromCity',
                        id : 'rechQryFromCity',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
                        value: '0',
                        store: new Ext.data.ArrayStore({
                            fields: ['value','text'],
                            data:[
                                ['0','本人所属'],
                                ['1','本地市所属']
                            ]
                        }),
                        anchor : '100%'
                        }
                    }
                ]
//                items : [{
//                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉//
//
//                    items : [{
//                        columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性//
//
//                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属省份',
////                            name : 'rechProvinceId',
////                            id : 'rechProvinceId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.provinceStore,
////                            anchor : '90%'
////                        }
//                        
//                        {
//                   xtype : 'ZTESOFT.Combobox',
//                   fieldLabel : '归属省份',
//                   triggerAction: 'all',
//                   name : 'rechProvinceId',
//                   id : 'rechProvinceId',
//                   mode: 'local',
//                   dict: false,
//                   allowBlank : false,
//                   forceSelect : true,
//                   editable : true,
//                   url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                   valueField: 'id',
//                   displayField: 'text',
//                   baseParams : {node:1},
//                   value: '',
//                   anchor : '95%',
//                   listeners:{
//                       select: function(combo, record, index){
//                           var cityCombo = Ext.getCmp('rechCityId');
//                           cityCombo.clearValue();
//                           cityCombo.getStore().proxy = new Ext.data.HttpProxy({
//                               url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+combo.value,
//                               method:'post'
//                           });
//                           cityCombo.getStore().load();
////                           addOper.reConfigCol(combo.value);
//                       }
//                   }
//                 }
//                        ]
//                    }, {
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [
////                        	{
////                            xtype: 'combo',
////                            fieldLabel : '归属本地网',
////                            name : 'rechCityId',
////                            id : 'rechCityId',
////                            valueField: 'value',
////                            displayField: 'text',
////                            mode: 'local',
////                            triggerAction: 'all',
////                            editable : true ,
////                            value: '',
////                            store: testCardQueryAndSelectStroe.cityStore,
////                            anchor : '90%'
////                        }
//                        {
//                       xtype : 'combo',
//                       fieldLabel : '归属地市',
//                       name : 'rechCityId',
//                       id : 'rechCityId',
//                       valueField : 'id',
//                       displayField : 'text',
//                       mode : 'local',
//                       triggerAction : 'all',
//                       allowBlank : false,
//                       forceSelect : true,
//                       editable : true,
//                       value : '',
//                       store : new Ext.data.JsonStore({
//                           remoteSort: true,
//                           fields: ['id', 'text']
//                       }),
//                       anchor : '95%'
//                       }
//                        ]
//                    },{
//                        columnWidth : .4,
//                        layout : 'form',
//                        items : [{
//                            xtype : 'textfield',
//                            fieldLabel : '卡号',
//                            name : 'rechCardNo',
//                            id : 'rechCardNo',
//                            anchor : '90%'
//                        }]
//                    }]
//                },
//                {
//                    layout : 'column',
//                    items : [{
//                        columnWidth : .3,
//                        layout : 'form',
//                        items : [{
//                            xtype: 'combo',
//                            fieldLabel : '面值',
//                            name : 'rechParValue',
//                            id : 'rechParValue',
//                            valueField: 'value',
//                            displayField: 'text',
//                            mode: 'local',
//                            triggerAction: 'all',
//                            editable : true ,
//                            value: '',
//                            store: testCardQueryAndSelectStroe.rechStore,
//                            anchor : '90%'
//                        }]
//                    }]
//                }]
                ,
                buttons : [{
                    text : '查询',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            new TestCardQueryAndSelect().doQry();
                        }
                    }
                }, {
                    text : '重置',
                    hidden:true,
                    listeners : {
                        "click" : function() {
                            Ext.getCmp('qryRechForm').getForm().reset();
                        }
                    }
                }]
            });
            return qryRechForm;
        };
        
        this.doQry = function(){
//            var ctPara = Ext.getCmp('ctForm').getForm().getValues();
//            var testobjectType = ctPara.testobjectTypeEnumId;
            var testobjectType = Ext.getCmp('testcardTypeEnumId').getValue().inputValue;
//            alert("testobjectType="+testobjectType);
            var param = {};
            param.isOnLoad = 0;//判断是否有在途中的测试卡,0表示在途中的测试卡
            if(testobjectType == 1){
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('testProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('testCityId').getValue();
                param.testcardTypeEnumId = Ext.getCmp('testTypeEnumId').getValue();
                param.number = Ext.getCmp('testNumber').getValue();
                param.subscriberNumber = Ext.getCmp('testSubscriberNumber').getValue();
                param.testcardStatusEnumId = Ext.getCmp('testStatusEnumIdQry').getValue();
                if(Ext.getCmp('testQryFromCity').getValue()!==""&&Ext.getCmp('testQryFromCity').getValue()==1){
                	if(typeof(session.logonAccount.cityCompanyId)=="undefined"){//不存在地市则取省份
                	   param.belongProvinceId = session.logonAccount.provinceCompanyId;
                	}else{
                	   param.belongCityId = session.logonAccount.cityCompanyId;
                	}
                }else{
                	param.belongProvinceId = null;
                    param.belongCityId = null;
                }
//                oper.qryListGrid('testGrid',param);
            }else if(testobjectType == 2){    
            	param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('termiProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('termiCityId').getValue();
                param.manufacturerId = Ext.getCmp('termiManufacturer').getValue();
                param.number = Ext.getCmp('termiNumber').getValue();
                param.moblieTypeEnumId = Ext.getCmp('termiMoblieTypeEnumId').getValue();
                param.testcardStatusEnumId = Ext.getCmp('termiStatusEnumIdQry').getValue();
                if(Ext.getCmp('termiQryFromCity').getValue()!==""&&Ext.getCmp('termiQryFromCity').getValue()==1){
                    if(typeof(session.logonAccount.cityCompanyId)=="undefined"){//不存在地市则取省份
                       param.belongProvinceId = session.logonAccount.provinceCompanyId;
                    }else{
                       param.belongCityId = session.logonAccount.cityCompanyId;
                    }
                }else{
                	param.belongProvinceId = null;
                    param.belongCityId = null;
                }
//                oper.qryListGrid('termiGrid',param);
            }else if(testobjectType == 3){
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('teleProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('teleCityId').getValue();
                param.telePhoneNumber = Ext.getCmp('telePhoneNumber').getValue();
                param.fixedPhoneTypeEnumId = Ext.getCmp('telePhoneTypeEnumId').getValue();
                param.testcardStatusEnumId = Ext.getCmp('teleStatusEnumIdQry').getValue();
                if(Ext.getCmp('teleQryFromCity').getValue()!==""&&Ext.getCmp('teleQryFromCity').getValue()==1){
                    if(typeof(session.logonAccount.cityCompanyId)=="undefined"){//不存在地市则取省份
                       param.belongProvinceId = session.logonAccount.provinceCompanyId;
                    }else{
                       param.belongCityId = session.logonAccount.cityCompanyId;
                    }
                }else{
                	param.belongProvinceId = null;
                    param.belongCityId = null;
                }
//                oper.qryListGrid('teleGrid',param);
            }else if(testobjectType == 4){
                param.testobjectTypeEnumId = testobjectType;
                param.attributionProvinceId = Ext.getCmp('rechProvinceId').getValue();
                param.attributionCityId = Ext.getCmp('rechCityId').getValue();
                param.cardNo = Ext.getCmp('rechCardNo').getValue();
                param.parValue = Ext.getCmp('rechParValue').getValue();
                param.testcardStatusEnumId = Ext.getCmp('rechStatusEnumIdQry').getValue();
                if(Ext.getCmp('rechQryFromCity').getValue()!==""&&Ext.getCmp('rechQryFromCity').getValue()==1){
                    if(typeof(session.logonAccount.cityCompanyId)=="undefined"){//不存在地市则取省份
                       param.belongProvinceId = session.logonAccount.provinceCompanyId;
                    }else{
                       param.belongCityId = session.logonAccount.cityCompanyId;
                    }
                }else{
                	param.belongProvinceId = null;
                    param.belongCityId = null;
                }
//                oper.qryListGrid('rechGrid',param);
            }
            
//            if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="apply"){//申请环节
//               if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="1"){//调拨,查询所属组织下的卡
//                   param.storageDepartmentId = session.logonAccount.cloudOrgId;
//               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="2"){//移交,查询自己管理的卡
//                   param.adminId = session.logonAccount.cloudUserId;
//               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="5"){//报废,查询自己管理的卡
//                   param.adminId = session.logonAccount.cloudUserId;
//               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="4"){//归还,查询自己借出的卡
//                   param.lenderId = session.logonAccount.cloudUserId;
//               }
//               
//            }else if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="modify"){//修改环节
//               if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="1"){//调拨,查询所属组织下的卡
//                   param.storageDepartmentId = session.logonAccount.cloudOrgId;
//               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="2"){//移交,查询自己管理的卡
//                   param.adminId = session.logonAccount.cloudUserId;
//               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="5"){//报废,查询自己管理的卡
//                   param.adminId = session.logonAccount.cloudUserId;
//               }else if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="4"){//归还,查询自己借出的卡
//                   param.lenderId = session.logonAccount.cloudUserId;
//               }
//               
//            }else if(testCardQueryLinkCode!=""&&testCardQueryLinkCode=="execute"){//执行环节
//               if(testCardQueryCardOperationTypeEnumId!=""&&testCardQueryCardOperationTypeEnumId=="3"){//借用,查询自己管理的卡
//                   param.adminId = session.logonAccount.cloudUserId;
//                   if(param.testcardStatusEnumId==""||param.testcardStatusEnumId==null){
//                        param.testcardStatusEnumId = "1','2','4";
//                   }
//               }
//            }
            
            param = new TestCardQueryAndSelect().addQryAttribute(testCardQueryLinkCode,param);
            param.start = 0;
            param.limit = Ext.getCmp('testCardQryResult').getPageSize();
//            var urlString = new TestCardQueryAndSelect().getUrlString(param);
//            
////            Ext.getCmp('testCardQryResult').url = PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage'+urlString;
//            Ext.getCmp('testCardQryResult').store.proxy.setUrl(PATH+'/e19/testCardStatisAction.json?method=getTestCardListPage'+urlString);
//            Ext.getCmp('testCardQryResult').store.load();
            
//            alert(Ext.getCmp('testCardQryResult').url);
            
            Ext.getCmp('testCardQryResult').store.on('beforeload', function(store) {
                
                                if (Ext.getCmp('testCardQryResult').store.lastOptions != null) {
                                    //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变                                    Ext.getCmp('testCardQryResult').store.baseParams = param;
                //                    Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
                                }
                            });
                            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
                            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化//                            param.start = 0;
//                            param.limit = Ext.getCmp('testCardQryResult').getPageSize();
                            
                            Ext.getCmp('testCardQryResult').store.load({
                                params : param
//                                    {
//                                    start : 0,//开始索引
//
//                                    limit : Ext.getCmp('testCardQryResult').getPageSize()//步数
//                                }
                            });
            
        }
        
        this.getUrlString = function(retObj){
            //显示initObj所有属性值
            var props = "" ;
            for (var p in retObj){
                if (typeof(retObj[p]) == "function"){
                }else{
                props += "&"+p + "=" + retObj[p];
                }
            }
            return props;
//            alert ("retObj="+props) ;
        }
        
        
}