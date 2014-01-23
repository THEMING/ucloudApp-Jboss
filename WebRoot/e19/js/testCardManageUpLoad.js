var testEditGridRowIndex = null;
var teleEditGridRowIndex = null;  
var termiEditGridRowIndex = null;
var rechEditGridRowIndex = null;

function upLoadList(){
        var attributionProvinceId = '';
        var gridHeight = body_height*0.6;
        var cardType = '';
        
        this.importData = function(){
////            if(!qryParams.attributionProvinceId){
////                Ext.Msg.alert('操作提示','请先点开高级检索选择归属省份!');
////                return;
////            }
            attributionProvinceId = session.logonAccount.provinceCompanyId;//qryParams.attributionProvinceId;
            
//            var param = qryParams;
//            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ReadTestCardServiceImpl';
//            param.cardType = qryParams.testobjectTypeEnumId;
//            
//            cardType = qryParams.testobjectTypeEnumId;
//            var tmpgrid;
//            if (testCardEnum == cardType){
//                tmpgrid = "testEditGrid";
//            }else if (teleCardEnum == cardType){
//                tmpgrid = "teleEditGrid";
//            }else if (terminalEnum == cardType){
//                tmpgrid = "termiEditGrid";
//            }else if (rechCardEnum == cardType){
//                tmpgrid = "rechEditGrid";
//            }            
//            new ZTESOFT.FileUtil().uploadExcel(param,function(retVal){
//                
//                var colMArray = loadOper.baseCoumn(cardType);
//                var param = {};
//                param.attributionProvinceId = attributionProvinceId; 
//                param.testobjectType = cardType;
//                
//                ZTESOFT.invokeAction(
//                        PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateAndDetialList',
//                        param,
//                        function(response){
//                            if(response && response.rows && response.rows.length > 0){
//                                oper.autoSetItem(response.rows,colMArray,tmpgrid);
//                            }
//                            loadOper.initWindow(colMArray,cardType);
//                            Ext.getCmp(tmpgrid).store.removeAll();
//                            Ext.getCmp(tmpgrid).store.loadData(retVal);
//                        }
//                );
//            });           
        	
            //以下为直接导入方式代码
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
            param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ReadTestCardServiceImpl';
            param.cardType = qryParams.testobjectTypeEnumId;
            param.isDirect = true;
            
                    param.attributionProvinceId = attributionProvinceId;
                    param.testobjectTypeEnumId = qryParams.testobjectTypeEnumId;
                    
                    param.lendFlag = '0';
                    param.overState = '0';
                    param.createdBy = session.logonAccount.cloudUserId;
                    param.lastUpdatedBy = session.logonAccount.cloudUserId;
                    param.recordVersion = 1;
                    param.deletedFlag = 0;
                    param.marketingAreaId = session.logonAccount.marketingAreaId;
                    param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
                    param.orgId = session.logonAccount.cloudOrgId;    
            

            new ZTESOFT.FileUtil().uploadExcel(param, function(retVal) {
                //导入成功时，会返回列表数据，格式跟读取DB的一样
            	if(typeof(retVal)=="undefined"){
            	   Ext.Msg.alert('操作提示', "后台操作花费时间过长，导入信息无法返回，尝试减少导入数据或者优化数据正确性！");
            	   return;
            	}

                if(retVal.msg.length>200){
//                	var mmsg = retVal.msg.replace(new RegExp("<BR>", "g"),"\n");
//                	mmsg.replace(/<br>/g,"\n");
                    loadOper.uploadAlertWin(retVal.msg);
                }else{
                    Ext.Msg.alert('操作提示', retVal.msg);
                }
                oper.doQry();
                /*
                这里写刷新主页面grid的代码

                */
            });
        	
        }
        
        this.uploadAlertWin = function(mmsg){
            new Ext.Window({
                id:'uploadAlertWin',
                title: "导入提示",
                closable:true,
                width: 720,
                height: 450,
                layout: 'border',
                plain:true,
                modal: true,
                items: [
                new Ext.FormPanel({
                id:'uploadAlertPanel',
                region: 'center',
                labelAlign: 'left',
                frame:true,
                autoScroll :false,
//                title:'工单信息',
                width:700,//Ext.getBody().getSize(),
//                height:400,
//                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;width:800px',
                buttonAlign: 'center',
//                labelWidth: 80,
                layoutConfig : {
                            columns : 7
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:0px;overflow-x:hidden;overflow-y:auto;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : 100,//最小是120，最大190
                            height : 30
                        },
                items : [
                	{
                                    colspan : 7,
                                    width:700,
                                    height:300,
                                    items : [
                                        {
                                            xtype:'ZTESOFT.textarea',
                                            hideLabel : true,
//                                            fieldLabel: '备注',
                                            /*name: 'remarks',
                                            id: 'remarks',*/
                                            name: 'uploadAlertMsg',
                                            id: 'uploadAlertMsg',
//                                            maxLength:500,
                                            height : 300,
                                            value:mmsg,
//                                            maxLengthText:'备注不能超过500个字！',
                                            anchor:'100%'
                                        }
                                    ]
                                }
                                ]})
                                ],
                buttonAlign:'center',
                buttons: [{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('uploadAlertWin').close();
                    }
                }]
            }).show();
        }
        
        this.winTitle = '批量导入';
        this.initWindow = function(colMArray,type){
            var formPanel ;
            
            if(testCardEnum == type){
                formPanel = this.initTestCardGrid(colMArray);
            }else if(teleCardEnum == type){
                formPanel = this.initImsGrid(colMArray);
            }else if(terminalEnum == type){
                formPanel = this.initTerminalGrid(colMArray);
            }else if(rechCardEnum == type){
                formPanel = this.initRechCardGrid(colMArray);
            }
            
        
            var formWin = new Ext.Window({
                id:'testLoadWin',
                title: this.winTitle,
                closable:true,
                width: 720,
                height: body_height*0.8,
                layout: 'anchor',
                plain:true,
                items: [formPanel],
                buttonAlign:'center',
                buttons: [{
                    text: '保存',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        loadOper.saveGrid(type);
                    }
                },{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('testLoadWin').close();
                    }
                }]
            });
             formWin.show();
             
        }
        
        /*原有配置列*/
        this.baseCoumn = function(testobjectType){
            if(testobjectType == testCardEnum){
                return loadOper.testCardBaseColumn();
            }else if(testobjectType == teleCardEnum){
                return loadOper.teleCardBaseColumn();
            }else if(testobjectType == terminalEnum){
                return loadOper.termiCardBaseColumn();
            }else if(testobjectType == rechCardEnum){
                return loadOper.rechCardBaseColumn();
            }
        }

        this.testCardBaseColumn = function(){
            var isNotStore = stroe.isNotStore;

            testStatusEnumStore.load();
            
            var operStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=PROMOTE_OPERATOR',
                    method : 'get'
                })
            });
            operStore.load();
            
            var netStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=CARD_NETWORK_TYPE',
                    method : 'get'
                })
            });
            netStore.load();
            
            var countryStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=ATTRIBUTION_COUNTRY',
                    method : 'get'
                })
            });
            countryStore.load();
            
            var tcObjStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['dataValue', 'dataName'],
                proxy: new Ext.data.HttpProxy({
                    url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=TESTCARD_TYPE',
                    method : 'get'
                })
            });
            tcObjStore.load();
            
            var provinceStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                    method : 'post'
                })
            });
            provinceStore.load();

            var cityStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+session.logonAccount.provinceCompanyId,
                    method : 'post'
                })
            });
            cityStore.load();
            
            var colMArray = [
                new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'测试卡类别',dataIndex:'testcardTypeEnumId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        store: tcObjStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = tcObjStore.find('dataValue',value);
                        if(index!=-1){
                            return tcObjStore.getAt(index).data.dataName;
                        }
                        return value;
                    }
                },
                {header:'运营商',dataIndex:'operatorEnumId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        store: operStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = operStore.find('dataValue',value);
                        if(index!=-1){
                            return operStore.getAt(index).data.dataName;
                        }
                        return value;
                    }
                },
                {header:'网络类型',dataIndex:'cardNetworkTypeEnumId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        store: netStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = netStore.find('dataValue',value);
                        if(index!=-1){
                            return netStore.getAt(index).data.dataName;
                        }
                        return value;
                    }
                },
                {header:'归属国家',dataIndex:'attributionCountryEnumId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        store: countryStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = countryStore.find('dataValue',value);
                        if(index!=-1){
                            return countryStore.getAt(index).data.dataName;
                        }
                        return value;
                    }
                },
                {header:'归属省份',dataIndex:'attributionProvinceId',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1,
                    editor: 
//                    new Ext.form.TextField({
//                          allowBlank: true
//                      })
                    new Ext.form.ComboBox({
                        valueField: 'text',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                select: function(combo, record, index){
                                                    Ext.getCmp('testEditGrid').getStore().data.items[testEditGridRowIndex].data.attributionProvinceId = record.id;
                                                    Ext.getCmp('testEditGrid').getStore().data.items[testEditGridRowIndex].data.attributionCityId = "";
                                                    Ext.getCmp('testEditGrid').getStore().data.items[testEditGridRowIndex].data.attributionCityName = "";
                                                }
                                                
                                            },
                        store: provinceStore
                    })
                },
                {header:'归属地市',dataIndex:'attributionCityId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'id',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                select: function(combo, record, index){
                                                Ext.getCmp('testEditGrid').getStore().data.items[testEditGridRowIndex].data.attributionCityName = record.data.text;
                                                },
                                                expand: function(combo, record, index){
                                                	var compo= Ext.getCmp('testEditGrid').getColumnModel().getCellEditor(8, testEditGridRowIndex).field.getStore(); 
                                                	
//                                                    var cityCombo = Ext.getCmp('testCityId');
//                                                    cityCombo.clearValue();
                                                    compo.proxy = new Ext.data.HttpProxy({
                                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+Ext.getCmp('testEditGrid').getStore().data.items[testEditGridRowIndex].data.attributionProvinceId,
                                                        method:'post'
                                                    });
                                                    compo.load();
                                                }
                                                
                                            },
                        store: cityStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = cityStore.find('id',value);
                        if(index!=-1){
                            return cityStore.getAt(index).data.text;
                        }
                        return value;
                    }
                },
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                {
                    header:'入库人编码',dataIndex:'wareManId',width:gridWidth*0.1,
                      editor: new Ext.form.NumberField({
                          allowBlank: false
                      })
                },
                {
                    header:'入库人',dataIndex:'wareManName',width:gridWidth*0.1,
                      editor: new Ext.form.TextField({
                          allowBlank: true
                      })
                },
                {
                    header:'存放部门编码',dataIndex:'storageDepartmentId',width:gridWidth*0.1,
                      editor: new Ext.form.NumberField({
                          allowBlank: false
                      })
                },
                {
                    header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1,
                      editor: new Ext.form.TextField({
                          allowBlank: true
                      })
                },
                {header:'是否预付费',dataIndex:'whetherPrepaid',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        store: isNotStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = isNotStore.find('value',value);
                        if(index!=-1){
                            return isNotStore.getAt(index).data.text;
                        }
                        return value;
                    }
               },
                {
                    header:'管理员编码',dataIndex:'adminId',width:gridWidth*0.1,
                      editor: new Ext.form.NumberField({
                          allowBlank: false
                      })
                },
                {
                    header:'管理员',dataIndex:'adminName',width:gridWidth*0.1,
                      editor: new Ext.form.TextField({
                          allowBlank: true
                      })
                },
                {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                        allowBlank: false
                    })
                }, 
               {header:'IMSI',dataIndex:'imsi',width:gridWidth*0.1,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
               }, 
              {header:'用户号码',dataIndex:'subscriberNumber',width:gridWidth*0.1,
                  editor: new Ext.form.TextField({
                      allowBlank: false
                  })
              },
              {
                  header:'编号',dataIndex:'number',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                        allowBlank: false
                    })
              },
              {header:'测试卡状态',dataIndex:'testcardStatusEnumId',width:gridWidth*0.1,
                  editor: new Ext.form.ComboBox({
                      valueField: 'dataValue',
                      displayField: 'dataName',
                      mode: 'local',
                      triggerAction: 'all',
                      editable : true ,
                      allowBlank: false,
                      value: '',
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
                        allowBlank: false,
                        allowNegative: false
                    })
              },
              {
                  header:'生效日期',dataIndex:'effectiveDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              },
              {
                  header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              }
            ];
            return colMArray;
        }

        this.teleCardBaseColumn = function(){
            telePhoneTypeEnumStore.load();
            testStatusEnumStore.load();
            
            var provinceStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                    method : 'post'
                })
            });
            provinceStore.load();
            
            var cityStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+attributionProvinceId,
                    method : 'post'
                })
            });
            cityStore.load();
            var colMArray = [
                new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {
                    header:'ID',dataIndex:'fixedTelId',hidden:true
                },
                {header:'归属省份',dataIndex:'attributionProvinceId',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1,
                    editor: 
//                    new Ext.form.TextField({
//                          allowBlank: true
//                      })
                    new Ext.form.ComboBox({
                        valueField: 'text',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                select: function(combo, record, index){
                                                    Ext.getCmp('teleEditGrid').getStore().data.items[teleEditGridRowIndex].data.attributionProvinceId = record.id;
                                                    Ext.getCmp('teleEditGrid').getStore().data.items[teleEditGridRowIndex].data.attributionCityId = "";
                                                    Ext.getCmp('teleEditGrid').getStore().data.items[teleEditGridRowIndex].data.attributionCityName = "";
                                                }
                                                
                                            },
                        store: provinceStore
                    })
                },
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                {header:'归属地市',dataIndex:'attributionCityId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'id',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                
                                                select: function(combo, record, index){
                                                Ext.getCmp('teleEditGrid').getStore().data.items[teleEditGridRowIndex].data.attributionCityName = record.data.text;
                                                },
                                                expand: function(combo, record, index){
                                                    var compo= Ext.getCmp('teleEditGrid').getColumnModel().getCellEditor(6, teleEditGridRowIndex).field.getStore(); 
                                                    
//                                                    var cityCombo = Ext.getCmp('testCityId');
//                                                    cityCombo.clearValue();
                                                    compo.proxy = new Ext.data.HttpProxy({
                                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+Ext.getCmp('teleEditGrid').getStore().data.items[teleEditGridRowIndex].data.attributionProvinceId,
                                                        method:'post'
                                                    });
                                                    compo.load();
                                                }
                                            },
                        store: cityStore
                    }),
                    
                    renderer: function(value,metadata,record){
                        var index = cityStore.find('id',value);
                        if(index!=-1){
                            return cityStore.getAt(index).data.text;
                        }
                        return value;
                    }
                },
                {header:'固定电话状态',dataIndex:'testcardStatusEnumId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
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
                   header:'入库人编码',dataIndex:'wareManId',width:gridWidth*0.1,
                     editor: new Ext.form.NumberField({
                         allowBlank: false
                     })
               },
               {
                   header:'入库人',dataIndex:'wareManName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
               {
                   header:'存放部门编码',dataIndex:'storageDepartmentId',width:gridWidth*0.1,
                     editor: new Ext.form.NumberField({
                         allowBlank: false
                     })
               },
               {
                   header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
               {
                   header:'管理员编码',dataIndex:'adminId',width:gridWidth*0.1,
                     editor: new Ext.form.NumberField({
                         allowBlank: false
                     })
               },
               {
                   header:'管理员',dataIndex:'adminName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
               {header:'电话号码',dataIndex:'phoneNumber',width:gridWidth*0.1,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
               },               
             {header:'类型',dataIndex:'fixedPhoneTypeEnumId',width:gridWidth*0.1,
                 editor: new Ext.form.ComboBox({
                     valueField: 'dataValue',
                     displayField: 'dataName',
                     mode: 'local',
                     triggerAction: 'all',
                     editable : true ,
                     allowBlank: false,
                     value: '',
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
                 header:'功能',dataIndex:'teleFunction',width:gridWidth*0.1,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
             },
             {
                 header:'编号',dataIndex:'number',width:gridWidth*0.1,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
             },
             {
                  header:'生效日期',dataIndex:'effectiveDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              },
              {
                  header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              }
            ];
             return colMArray;
        }

        this.termiCardBaseColumn = function(){
            moblieTypeEnumStore.load();
            testStatusEnumStore.load();
            
            var provinceStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                    method : 'post'
                })
            });
            provinceStore.load();
            
            var cityStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+attributionProvinceId,
                    method : 'post'
                })
            });
            cityStore.load();
            var colMArray = [
                    new Ext.grid.CheckboxSelectionModel(),
                    new Ext.grid.RowNumberer({header:'序号',width:40}),
                    {
                        header:'ID',dataIndex:'testTerminalId',hidden:true
                    },   
                    {header:'归属省份',dataIndex:'attributionProvinceId',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                    {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1,
                    editor: 
//                    new Ext.form.TextField({
//                          allowBlank: true
//                      })
                    new Ext.form.ComboBox({
                        valueField: 'text',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                select: function(combo, record, index){
                                                    Ext.getCmp('termiEditGrid').getStore().data.items[termiEditGridRowIndex].data.attributionProvinceId = record.id;
                                                    Ext.getCmp('termiEditGrid').getStore().data.items[termiEditGridRowIndex].data.attributionCityId = "";
                                                    Ext.getCmp('termiEditGrid').getStore().data.items[termiEditGridRowIndex].data.attributionCityName = "";
                                                }
                                                
                                            },
                        store: provinceStore
                    })
                },
                    {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                    {header:'归属地市',dataIndex:'attributionCityId',width:gridWidth*0.1,
                        editor: new Ext.form.ComboBox({
                            valueField: 'id',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : true ,
                            allowBlank: false,
                            value: '',
                            listeners : {
                                                
                                                select: function(combo, record, index){
                                                Ext.getCmp('termiEditGrid').getStore().data.items[termiEditGridRowIndex].data.attributionCityName = record.data.text;
                                                },
                                                expand: function(combo, record, index){
                                                    var compo= Ext.getCmp('termiEditGrid').getColumnModel().getCellEditor(6, termiEditGridRowIndex).field.getStore(); 
                                                    
//                                                    var cityCombo = Ext.getCmp('testCityId');
//                                                    cityCombo.clearValue();
                                                    compo.proxy = new Ext.data.HttpProxy({
                                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+Ext.getCmp('termiEditGrid').getStore().data.items[termiEditGridRowIndex].data.attributionProvinceId,
                                                        method:'post'
                                                    });
                                                    compo.load();
                                                }
                                                
                                            },
                            store: cityStore
                        }),
                        renderer: function(value,metadata,record){
                            var index = cityStore.find('id',value);
                            if(index!=-1){
                                return cityStore.getAt(index).data.text;
                            }
                            return value;
                        }
                    },
                    {header:'测试终端状态',dataIndex:'testcardStatusEnumId',width:gridWidth*0.1,
                        editor: new Ext.form.ComboBox({
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : true ,
                            allowBlank: false,
                            value: '',
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
                       header:'入库人编码',dataIndex:'wareManId',width:gridWidth*0.1,
                         editor: new Ext.form.NumberField({
                             allowBlank: false
                         })
                   },
                   {
                   header:'入库人',dataIndex:'wareManName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
                   {
                       header:'存放部门编码',dataIndex:'storageDepartmentId',width:gridWidth*0.1,
                         editor: new Ext.form.NumberField({
                             allowBlank: false
                         })
                   },
                   {
                       header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1,
                         editor: new Ext.form.TextField({
                             allowBlank: true
                         })
                   },
                   {
                       header:'管理员编码',dataIndex:'adminId',width:gridWidth*0.1,
                         editor: new Ext.form.NumberField({
                             allowBlank: false
                         })
                   },
                   {
                       header:'管理员',dataIndex:'adminName',width:gridWidth*0.1,
                         editor: new Ext.form.TextField({
                             allowBlank: true
                         })
                   },
                 {header:'手机类型',dataIndex:'moblieTypeEnumId',width:gridWidth*0.1,
                     editor: new Ext.form.ComboBox({
                         valueField: 'dataValue',
                         displayField: 'dataName',
                         mode: 'local',
                         triggerAction: 'all',
                         editable : true ,
                         allowBlank: false,
                         value: '',
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
                     header:'厂家',dataIndex:'manufacturerName',width:gridWidth*0.1,
                       editor: new Ext.form.TextField({
                           allowBlank: false
                       })
                 },
                 {
                     header:'手机型号',dataIndex:'phoneModel',width:gridWidth*0.1,
                       editor: new Ext.form.TextField({
                           allowBlank: false
                       })
                 },
                 {
                     header:'手机串号',dataIndex:'imei',width:gridWidth*0.1,
                       editor: new Ext.form.TextField({
                           allowBlank: false
                       })
                 },
                 {
                     header:'编号',dataIndex:'number',width:gridWidth*0.1,
                       editor: new Ext.form.TextField({
                           allowBlank: false
                       })
                 },
                 {
                  header:'生效日期',dataIndex:'effectiveDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              },
              {
                  header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              }
            ];
            return colMArray;
        }

        this.rechCardBaseColumn = function(){
            var  dicStore = stroe.rechStore;
            rechTypeStore.load();
            testStatusEnumStore.load();
            
            var provinceStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                    method : 'post'
                })
            });
            provinceStore.load();
            
            var cityStore = new Ext.data.JsonStore({
                remoteSort: true,
                fields: ['id', 'text'],
                proxy: new Ext.data.HttpProxy({
                    url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+attributionProvinceId,
                    method : 'post'
                })
            });
            cityStore.load();
            var colMArray = [
                new Ext.grid.CheckboxSelectionModel(),
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {
                    header:'ID',dataIndex:'rechCardId',hidden:true
                },
                {header:'归属省份',dataIndex:'attributionProvinceId',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1,
                    editor: 
//                    new Ext.form.TextField({
//                          allowBlank: true
//                      })
                    new Ext.form.ComboBox({
                        valueField: 'text',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                select: function(combo, record, index){
                                                    Ext.getCmp('rechEditGrid').getStore().data.items[rechEditGridRowIndex].data.attributionProvinceId = record.id;
                                                    Ext.getCmp('rechEditGrid').getStore().data.items[rechEditGridRowIndex].data.attributionCityId = "";
                                                    Ext.getCmp('rechEditGrid').getStore().data.items[rechEditGridRowIndex].data.attributionCityName = "";
                                                }
                                                
                                            },
                        store: provinceStore
                    })
                },
                {header:'归属地市',dataIndex:'attributionCityId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'id',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
                        listeners : {
                                                
                                                select: function(combo, record, index){
                                                Ext.getCmp('rechEditGrid').getStore().data.items[rechEditGridRowIndex].data.attributionCityName = record.data.text;
                                                },
                                                expand: function(combo, record, index){
                                                    var compo= Ext.getCmp('rechEditGrid').getColumnModel().getCellEditor(5, rechEditGridRowIndex).field.getStore(); 
                                                    
//                                                    var cityCombo = Ext.getCmp('testCityId');
//                                                    cityCombo.clearValue();
                                                    compo.proxy = new Ext.data.HttpProxy({
                                                        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node='+Ext.getCmp('rechEditGrid').getStore().data.items[rechEditGridRowIndex].data.attributionProvinceId,
                                                        method:'post'
                                                    });
                                                    compo.load();
                                                }
                                                
                                            },
                        store: cityStore
                    }),
                    renderer: function(value,metadata,record){
                        var index = cityStore.find('id',value);
                        if(index!=-1){
                            return cityStore.getAt(index).data.text;
                        }
                        return value;
                    }
                },
                {header:'归属地市',dataIndex:'attributionCityName',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({
                          allowBlank: true
                      }),hidden:true
                },
                {header:'充值卡状态',dataIndex:'testcardStatusEnumId',width:gridWidth*0.1,
                    editor: new Ext.form.ComboBox({
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : true ,
                        allowBlank: false,
                        value: '',
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
                   header:'入库人编码',dataIndex:'wareManId',width:gridWidth*0.1,
                     editor: new Ext.form.NumberField({
                         allowBlank: false
                     })
               },
               {
                   header:'入库人',dataIndex:'wareManName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
               {
                   header:'存放部门编码',dataIndex:'storageDepartmentId',width:gridWidth*0.1,
                     editor: new Ext.form.NumberField({
                         allowBlank: false
                     })
               },
               {
                   header:'存放部门',dataIndex:'storageDepartmentName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
               {
                   header:'管理员编码',dataIndex:'adminId',width:gridWidth*0.1,
                     editor: new Ext.form.NumberField({
                         allowBlank: false
                     })
               },
               {
                   header:'管理员',dataIndex:'adminName',width:gridWidth*0.1,
                     editor: new Ext.form.TextField({
                         allowBlank: true
                     })
               },
               {header:'卡号',dataIndex:'cardNo',width:gridWidth*0.1,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
               },               
             {header:'面值',dataIndex:'parValue',width:gridWidth*0.1,
                 editor: new Ext.form.ComboBox({
                     valueField: 'value',
                     displayField: 'text',
                     mode: 'local',
                     triggerAction: 'all',
                     editable : true ,
                     allowBlank: false,
                     value: '',
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
                 header:'编号',dataIndex:'cardNumber',width:gridWidth*0.1,
                   editor: new Ext.form.TextField({
                       allowBlank: false
                   })
             },
             {header:'卡类型',dataIndex:'rechCardTypeEnumId',width:gridWidth*0.1,
                 editor: new Ext.form.ComboBox({
                     valueField: 'dataValue',
                     displayField: 'dataName',
                     mode: 'local',
                     triggerAction: 'all',
                     editable : true ,
                     allowBlank: false,
                     value: '',
                     store: rechTypeStore
                 }),
                 renderer: function(value,metadata,record){
                     var index = rechTypeStore.find('dataValue',value);
                     if(index!=-1){
                         return rechTypeStore.getAt(index).data.dataName;
                     }
                     return value;
                 }
             },
             {
                  header:'生效日期',dataIndex:'effectiveDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              },
              {
                  header:'失效日期',dataIndex:'cancelDate',width:gridWidth*0.1,
                    editor: new Ext.form.TextField({//new Ext.form.DateField({//new Ext.ux.form.DateTimeField({
                    	regex :/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))/,
                           regexText : "日期格式为2013-6-6 00:00:00!",
                           allowBlank: false//,
//                           format: 'Y-m-d h:i:s'
                    })
              }
            ];
              return colMArray;
        }
        
        this.initTestCardGrid = function(colMArray) {
            
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
                height: gridHeight,
                frame: false,
                clicksToEdit: 1,
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                listeners : {
                rowclick : function(grid,rowIndex,evt){
                                testEditGridRowIndex = rowIndex;     
                }
            },
                title : '测试卡信息列表'
            });
            return grid;
        }

        this.inittbar = function () {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '删除',
                xtype: 'ZTESOFT.Link',
                onClick : function() {
                    loadOper.doDel();
                }
            });
            
            return tb;
        }

        this.doDel = function(){
            var gridName = '';
            if(cardType == testCardEnum){
                gridName = 'testEditGrid';                
            }else if(cardType == teleCardEnum){
                gridName = 'teleEditGrid';
            }else if(cardType == terminalEnum){
                gridName = 'termiEditGrid';
            }else if(cardType == rechCardEnum){
                gridName = 'rechEditGrid';
            }
            
            var selItems = Ext.getCmp(gridName).getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                    if(btn=="yes"){
                        Ext.getCmp(gridName).getStore().remove(selItems);  
                        Ext.getCmp(gridName).getView().refresh();
                    }
                });
            }else{
                Ext.Msg.alert('操作提示','请先选择要删除的行');
                return;
            }
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
                height: gridHeight,
                frame: false,
                clicksToEdit: 1,//这里表明需要点击多次才能编辑单元格，默认是2，即双击
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                listeners : {
                rowclick : function(grid,rowIndex,evt){
                                teleEditGridRowIndex = rowIndex;     
                }
            },
                title : '固定电话信息列表'
            });
            return grid;
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
                height: gridHeight,
                frame: false,
                clicksToEdit: 1,//这里表明需要点击多次才能编辑单元格，默认是2，即双击
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                listeners : {
                rowclick : function(grid,rowIndex,evt){
                                termiEditGridRowIndex = rowIndex;     
                }
            },
                title : '测试终端信息列表'
            });
            return grid;
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
                height: gridHeight,
                frame: false,
                clicksToEdit: 1,
                bodyStyle:'padding:0px;',
                tbar: this.inittbar(),
                listeners : {
                rowclick : function(grid,rowIndex,evt){
                                rechEditGridRowIndex = rowIndex;     
                }
            },
                title : '充值卡信息列表'
            });
            
            return grid;
        }
        
        this.saveGrid = function(typeId){
            if(typeId == testCardEnum){
                this.saveTestCard(typeId);
            }else if(typeId == teleCardEnum){
                this.saveIms(typeId);
            }else if(typeId == terminalEnum){
                this.saveTerminal(typeId);
            }else if(typeId == rechCardEnum){
                this.saveRechCard(typeId);
            }
        }
        
//        this.uploadCheckUniqueTest = function(dataArray){
//            var flag = true;
//            for(var i=0;i<dataArray.length;i++){
//                var cardNo = dataArray[i].data.cardNo;
//                var imsi = dataArray[i].data.imsi;
//                var number = dataArray[i].data.number;
//                for(var j=i+1;j<dataArray.length;j++){
//                    if(cardNo == dataArray[j].data.cardNo){
//                        Ext.Msg.alert('操作提示','第'+(i+1)+'行卡号和第'+(j+1)+'行相同!');
//                        return flag=false;
//                    }
//                    if(imsi == dataArray[j].data.imsi){
//                        Ext.Msg.alert('操作提示','第'+(i+1)+'行imsi和第'+(j+1)+'行相同!');
//                        return flag=false;
//                    }
//                    if(number == dataArray[j].data.number){
//                        Ext.Msg.alert('操作提示','第'+(i+1)+'行编号和第'+(j+1)+'行相同!');
//                        return flag=false;
//                    }
//                }
//            }
//            return flag;
//        }
        
      //新增 测试卡
        this.saveTestCard = function(typeId){

            //Ext.getCmp('testEditGrid').getSelectionModel().selectAll();
            var selItems = Ext.getCmp('testEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('testEditGrid',true)){
                    return;
                }
                if(!new TestCardAddOper().checkUniqueTest(selItems)){
                    return;
                }
                
                var dataArray = new Array();
                var now = new Date();
                for(var i=0;i<selItems.length;i++){
                    
//                    selItems[i].data.effectiveDate = now;
                    selItems[i].data.attributionProvinceId = attributionProvinceId;
                    selItems[i].data.testobjectTypeEnumId = typeId;
                    
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = false;
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
                            Ext.Msg.alert('操作提示','导入成功!');
                            Ext.getCmp('testLoadWin').close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','请先选择要导入的行');
                return;
            }
        }        
        
      //新增 固定电话
        this.saveIms = function(typeId){
            var selItems = Ext.getCmp('teleEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('teleEditGrid',true)){
                    return;
                }
                if(!new TestCardAddOper().checkUniqueTele(selItems)){
                    return;
                }
                
                var dataArray = new Array();
                var now = new Date();
                for(var i=0;i<selItems.length;i++){
                    
//                    selItems[i].data.effectiveDate = now;
                    selItems[i].data.attributionProvinceId = attributionProvinceId;
                    selItems[i].data.testobjectTypeEnumId = typeId; 
                    
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = false;
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
                            Ext.Msg.alert('操作提示','导入成功!');
                            Ext.getCmp('testLoadWin').close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','请先选择要导入的行');
                return;
            }
        }

        //新增 测试终端
        this.saveTerminal = function(typeId){
            var selItems = Ext.getCmp('termiEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('termiEditGrid',true)){
                    return;
                }
                if(!new TestCardAddOper().checkUniqueTermi(selItems)){
                    return;
                }

                var dataArray = new Array();
                var now = new Date();
                for(var i=0;i<selItems.length;i++){
//                    selItems[i].data.effectiveDate = now;
                    selItems[i].data.attributionProvinceId = attributionProvinceId;
                    selItems[i].data.testobjectTypeEnumId = typeId; 
                    
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = false;
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
                            Ext.Msg.alert('操作提示','导入成功!');
                            Ext.getCmp('testLoadWin').close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','请先选择要导入的行');
                return;
            }
        }

      //新增 充值卡  
        this.saveRechCard = function(typeId){
            var selItems = Ext.getCmp('rechEditGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(!oper.editGridValidate('rechEditGrid',true)){
                    return;
                }
                if(!new TestCardAddOper().checkUniqueRech(selItems)){
                    return;
                }

                var dataArray = new Array();
                var now = new Date();
                for(var i=0;i<selItems.length;i++){
                    selItems[i].data.attributionProvinceId = attributionProvinceId;
                    selItems[i].data.testobjectTypeEnumId = typeId; 
//                    selItems[i].data.effectiveDate = now;
                    
                    selItems[i].data.lendFlag = '0';
                    selItems[i].data.overState = '0';
                    selItems[i].data.createdBy = session.logonAccount.cloudUserId;
                    selItems[i].data.lastUpdatedBy = session.logonAccount.cloudUserId;
                    selItems[i].data.recordVersion = 1;
                    selItems[i].data.deletedFlag = false;
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
                            Ext.Msg.alert('操作提示','导入成功!');
                            Ext.getCmp('testLoadWin').close();
                            oper.doQry();
                        }
                );
            }else{
                Ext.Msg.alert('操作提示','请先选择要导入的行');
                return;
            }
        }
        
    }