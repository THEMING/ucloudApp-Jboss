function AddOper(){
    this.initWindow = function(type,data){
        if(data){
            data.data.type = type;
        }
        var formPanel = this.initFormPanel(data);
        
        var formWin = new Ext.Window({
            id:'detailWin',
            title: '私有属性模板管理',
            closable:true,
            width: 720,
            height: body_height*0.6,
            layout: 'anchor',
            plain:true,
            modal : true,
            items: [formPanel],
            buttonAlign:'center',
            buttons: [{
                text: '保存',
                id : 'save',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    addOper.save();
                }
            },{
                text: '关闭',
                id :'close',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('detailWin').close();
                }
            }]
        });
        formWin.show();    
        if(type=='add'){
        	Ext.getCmp('attributionProvinceId').setValue(session.logonAccount.provinceCompanyId);
        	Ext.getCmp('attributionProvinceId').setRawValue(session.logonAccount.provinceCompanyName);
        }
        if(type == 'mod'){
            Ext.getCmp('templatePn').getForm().loadRecord(data);
            Ext.getCmp('attributionProvinceId').setReadOnly(true);
            Ext.getCmp('testobjectType').setReadOnly(true);
        }     
    }
    
    this.save = function(){
        var now = new Date();
        var param = Ext.getCmp('templatePn').getForm().getValues();
        /*通过getForm().getValues()方法拿到的是下拉框的text值*/
        param.attributionProvinceName = param.attributionProvinceId;
        param.testobjectType = Ext.getCmp('testobjectType').getValue();
        if(session.logonAccount.provinceCompanyId){
        	param.attributionProvinceId = session.logonAccount.provinceCompanyId;
        }
    //    param.attributionProvinceId = Ext.getCmp('attributionProvinceId').getValue();
        
        if(!tdOper.formValid('templatePn')){
            return;
        }
        
        if(param.tciPriAttTemplateId){//修改
            ZTESOFT.invokeAction(
                    PATH+'/e19/tciPriAttTemplateAction.json?method=updateTemplate',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示','修改成功!');
                        Ext.getCmp('detailWin').close();
                        oper.doQuery();
                    }
            );
        }else{//新增
            param.lendFlag = '0';
            param.overState = '0';
            param.createdBy = session.logonAccount.cloudUserId;
            param.lastUpdatedBy = session.logonAccount.cloudUserId;
            param.recordVersion = 1;
            param.deletedFlag = 0;
            param.marketingAreaId = session.logonAccount.marketingAreaId;
            param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
            param.orgId = session.logonAccount.cloudOrgId;
            
            var qryParam = {};
            qryParam.testobjectType = param.testobjectType;
            qryParam.attributionProvinceId = param.attributionProvinceId;
            ZTESOFT.invokeAction(
                    PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateList',
                    qryParam,
                    function(response){
                        if(response && response.total && response.total > 0){
                            Ext.Msg.alert('操作提示','该归属省份模板已经存在!');
                            return;
                        }else{
                            ZTESOFT.invokeAction(
                                    PATH+'/e19/tciPriAttTemplateAction.json?method=saveTemplate',
                                    param,
                                    function(response){
                                        Ext.Msg.alert('操作提示','新建成功!');
                                        Ext.getCmp('detailWin').close();
                                        oper.doQuery();
                                    }
                            );
                        }
                    }
            );
        }
    }
    
    this.initFormPanel = function(rowData){
        var provinceValue = '';
        var attributionProvinceIdItem = {xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'attributionProvinceId',
                            id : 'attributionProvinceId',
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值                            readOnly:true,
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                        //    value: provinceValue,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%'};
        if(rowData && rowData.data.type == "mod"){
            provinceValue = rowData.data.attributionProvinceId;
            attributionProvinceIdItem = [{
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        readOnly : true,
                        name : 'attributionProvinceName',
                        id : 'attributionProvinceName',
                        anchor : '100%'
                    },{
                        xtype : 'hidden',
                        name : 'attributionProvinceId',
                        id : 'attributionProvinceId'
                    }];
        }
        var  telePn = new Ext.FormPanel({
            id : 'templatePn',
            region : 'north',
            buttonAlign : 'right',
            frame : true,
            layoutConfig : {
                columns : 2 * 2
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
                width : 160,//最小是120，最大190
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>归属省份'
                    }
                },
                {
                    colspan : 1,
                    items : attributionProvinceIdItem
//                    	{
////                        xtype : 'ZTESOFT.enum',
////                        hideLabel : true,
////                        fieldLabel : '归属省份',
////                        triggerAction: 'all',
////                        name : 'attributionProvinceId',
////                        id : 'attributionProvinceId',
////                        mode: 'local',
////                        dict: false,
////                        allowBlank : false,
////                        forceSelect : true,
////                        editable : true,
////                        url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
////                        valueField: 'id',
////                        displayField: 'text',
////                        baseParams : {node:1},
////                        value: provinceValue,
////                        anchor : '100%'
//                        
//                        xtype:'ZTESOFT.enum',
//                            hideLabel : true,
//                            triggerAction: 'all',
//                            name : 'attributionProvinceId',
//                            id : 'attributionProvinceId',
//                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
//                            typeAhead : true,//自动匹配
//                            editable: false,
//                            dict: false,//此值为ture，则使用默认的字典表来赋值
//                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
//                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
//                            displayField: 'text',
//                            value: provinceValue,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
//                            anchor:'100%'
//                        
//                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>测试卡类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        fieldLabel : '测试卡类型',
                        name : 'testobjectType',
                        id : 'testobjectType',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
//                        value: "",
                        store: stroe.testCardStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>模板名称'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        fieldLabel : '模板名称',
                        name : 'templateName',
                        id : 'templateName',
                        maxLength:200,
                        maxLengthText:'模板名称不能超过200个字！',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html :'<font color="red">*</font>模板说明'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        fieldLabel : '模板说明',
                        name : 'templateDesc',
                        id : 'templateDesc',
                        maxLength:450,
                        maxLengthText:'模板说明不能超过450个字！',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html :'模板用途'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'templateUsed',
                        id : 'templateUsed',
                        maxLength:450,
                        maxLengthText:'模板用途不能超过450个字！',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html :'备注'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'remarks',
                        id : 'remarks',
                        maxLength:450,
                        maxLengthText:'备注不能超过450个字！',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    hidden : true,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'tciPriAttTemplateId',
                        id : 'tciPriAttTemplateId',
                        anchor : '100%'
                    }
                }
            ]
        });
        
        return telePn;
    }
}