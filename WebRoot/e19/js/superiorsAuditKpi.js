var supAuditKpiOper = new SuperiorsAuditKpi();

function SuperiorsAuditKpi() {
 
    this.initWindow = function(rowData,flag) {
        var formPanel = supAuditKpiOper.initFormPanel();

        var formWin = new Ext.Window({
            id : 'submitApprovalWin',
            title : '提交审核',
            closable : true,
            modal : true,
            width : 680,
            height : 300,
            layout : 'anchor',
            plain : true,
            items : [ formPanel ],
            buttonAlign : 'center',
            buttons : [ {
                text : '提交',
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    supAuditKpiOper.commit(rowData,flag);
                }
            }, {
                text : '关闭',
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    Ext.getCmp('submitApprovalWin').close();
                }
            } ]
        });
        formWin.show();
    }
    

    this.initFormPanel = function() {
        var approvalInfoPage = new Ext.FormPanel(
                {
                    id : 'superiorsAuditPage',
                    region : 'center',
                    frame : true,
                    buttonAlign : 'center',
                    layoutConfig : {
                        columns : 2 * 2
                    },
                    layout : 'table',
                    bodyStyle : 'padding:20px 20px 0px 20px;overflow-x:hidden;overflow-y:auto;',
                    defaults : {
                        border : false,
                        bodyStyle : 'padding:0 0 0 0;',
                        layout : 'form',
                        frame : false,
                        labelAlign : 'center',// 标签的对齐方式

                        hideLabel : true,
                        width : 150,// 最小是120，最大190
                        height : 30
                    },
                    items : [
                            {
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    html : '<font color="red">*</font>审核对象'
                                }
                            },
                            {
                                colspan : 3,
                                width : 150*3,
                                items : [{
                                    xtype: 'ZTESOFT.popupfield',
                                    id: 'superiorsAuditName',
                                    name: 'superiorsAuditName',
                                    hideLabel : true,
                                    allowBlank : false,
                                    valueFile : 'superiorsAuditId',
                                    readOnly: true,
                                    anchor : '100%',
                                    onPopup : function() {
//                                    	var inputName = "superiorsAuditName,superiorsAuditId,superiorsAcountId,superiorsAuditType";
//                                        var requestData = "text,id,accountId,thisType,accountName,parentId";
//                                    	new DetailWin().auditResultExecuteDepartmentOnPopup(inputName,requestData);
                                    	
                                        var inputName = "superiorsAuditName,superiorsAuditId,superiorsAcountId,superiorsAuditType";
                                        var requestData = "text,id,accountId,thisType,accountName,parentId";
                                        var win_id = "superiorsAuditWin";
                                        var _orgId = session.logonAccount.cloudOrgId;
                                        var isUseful = [0,1,0];
                                        var _nodeRelationType="noRelation";
                                        var _isOnlyLeaf="0";
                                        var _inputType="radio";
                                        var _qryType="assignTree";
                                        var _cloudUserId =  session.logonAccount.cloudUserId;
                                        var _roleArray =  supAuditKpiOper.getRoleIdList();//角色列表
                                        var _treeType =  3;//1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
                                        var searchObject = {
                                                fuzzySearchType : 0//前台（0）或后台（1）查询，默认为0
                                        };
                                        var tree = new DeepTreeObj(inputName,requestData,win_id+new Date().getTime(),_orgId,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType,searchObject,_qryType,_cloudUserId,_roleArray,_treeType);
                                        tree.showTree(deeptreeUrl);
                                    }
                                },{
                                    xtype : 'hidden',
                                    name : 'superiorsAuditId',
                                    id : 'superiorsAuditId'
                                },{
                                    xtype : 'hidden',
                                    name : 'superiorsAcountId',
                                    id : 'superiorsAcountId'
                                },{
                                    xtype : 'hidden',
                                    name : 'superiorsAuditType',
                                    id : 'superiorsAuditType'
                                }]
                            }]
                });

        return approvalInfoPage;
    }
    
    this.commit = function(rowData,flag){
    	if (!Ext.getCmp('superiorsAuditPage').getForm().isValid()) {
            return;
        }
        if(Ext.getCmp('superiorsAcountId').getValue()==session.logonAccount.accountId){
            Ext.Msg.alert("提示","不能选择自己审核！");
            return;
        }
        
        var param = new Object();//Ext.getCmp('kpiForm').getForm().getValues();
        param.workOrderId = rowData.jobId;
        param.processInstId = rowData.processInstID;
        param.activityInstId = rowData.activityInstID;
        param.taskId = rowData.taskInstID;
        
        param.superiorsAuditName = Ext.getCmp('superiorsAuditName').getValue();
        param.superiorsAuditId = Ext.getCmp('superiorsAuditId').getValue();
        param.superiorsAcountId = Ext.getCmp('superiorsAcountId').getValue();
        param.superiorsAuditType = Ext.getCmp('superiorsAuditType').getValue();
        
        
        param.staffId = session.logonAccount.cloudUserId;
        param.accountId = session.logonAccount.accountId;
        param.staffName = session.logonAccount.userEmpName;
        param.staffDepId = session.logonAccount.cloudOrgId;
        param.staffDepName = session.logonAccount.userDeptName;
        param.marketingAreaId = session.logonAccount.marketingAreaId;
        param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
        param.orgId = session.logonAccount.cloudOrgId;
        param.orgName = session.logonAccount.userDeptName;
        param.shardingId = session.logonAccount.shardingId;
        
        cardOperationTypeIdGlo = rowData.orderType;
        operationTypeIdGlo = flag;
        if(cardOperationTypeIdGlo==1 && operationTypeIdGlo==3){
        	param.activityDefId = 'allotApprovalActivity';
        }
        if(cardOperationTypeIdGlo==2 && operationTypeIdGlo==3){
        	param.activityDefId = 'transAuditActivity';
        }
        if(cardOperationTypeIdGlo==3){
        	if(operationTypeIdGlo==3){
        		param.activityDefId = 'lendAuditActivity';
        	}
        	if(operationTypeIdGlo==7){
        		param.activityDefId = 'depLendAuditActivity';
        	}
        	
        }
        if(cardOperationTypeIdGlo==5 && operationTypeIdGlo==3){
        	param.activityDefId = 'dumpAuditActivity';
        }
        if(cardOperationTypeIdGlo==6 && operationTypeIdGlo==3){
        	param.activityDefId = 'checkAuditActivity';
        }
        ZTESOFT.invokeAction(
                PATH+'/e19/testCardCommonAction.json?method=superiorsAudit',
                param, function(response) {
                    if (response.msg = "success") {
                        Ext.Msg.alert("操作提示", "上级审核成功", function() {
                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                            Ext.getCmp('submitApprovalWin').close();
                            if(Ext.getCmp('detailWin')){
                                Ext.getCmp('detailWin').close();
                            }
                            if(Ext.getCmp('undoTaskGrid')){
                                var qryParam = myUndoTaskWholeParam;
                                myUndoTask.qryListGrid(qryParam);
                            }
                        });
                    } else {
                        Ext.Msg.alert("上级审核失败,请正确选择参与人!"); 
                    }
                });
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
//        if (!Ext.getCmp('superiorsAuditPage').getForm().isValid()) {
//            return;
//        }
//        var param = Ext.getCmp('kpiForm').getForm().getValues();
//        param.orgId = session.logonAccount.cloudOrgId;
//        param.orgName = session.logonAccount.userDeptName;
//        param.shardingId = session.logonAccount.shardingId;
//        param.lastUpdatedBy = session.logonAccount.cloudUserId;
//        param.createdBy = session.logonAccount.cloudUserId;
//        param.createdByName = session.logonAccount.userEmpName;
//        param.auditOpinion = Ext.getCmp('processingDesc').getValue();
//        param.isPass = Ext.getCmp('isPass').getValue().inputValue;
//        param.accountId = session.logonAccount.accountId;
//        
//        param.superiorsAuditName = Ext.getCmp('superiorsAuditName').getValue();
//        param.superiorsAuditId = Ext.getCmp('superiorsAuditId').getValue();
//        param.superiorsAcountId = Ext.getCmp('superiorsAcountId').getValue();
//        param.superiorsAuditType = Ext.getCmp('superiorsAuditType').getValue();
//        
//        param.isSuperiorsAudit = true;
//        var url = PATH + '/e18/kpi/evaKpiAction.json?method=updateAudit';
//        ZTESOFT.invokeAction(url, param, function(response) {
//            if (response.msg = 'success') {
//                Ext.Msg.alert('操作提示', '操作成功！',function(response) {
//                    if(rowData.unifiedFlag){//统一待办中的上级审核
//                        Ext.getCmp('submitApprovalWin').close();
//                        window.close();
//                    }else{
//                        Ext.getCmp('submitApprovalWin').close();
//                        Ext.getCmp('detailWin').close();
//                        oper.qryListGrid('undoTaskGrid',baseParam);
//                    }
//                });
//            } else {
//                Ext.Msg.alert('操作提示', '操作失败，请检查！');
//            }
//        });
    }
    
    this.getRoleIdList = function(){
        var roleIDArray = new Array();
        var abstractRoleId = "";
//        var processModelName = "com.unicom.ucloud.eom.e18.kpiAuditFlow";
//        //获取流程挂接后的模板名称
//        var param = new Object();
//        param.modelId = 'E18';
//        param.businessCode = 'E183';
//        param.orgCode = session.logonAccount.provinceCompanyId;
//        url = PATH+ '/commondata/commonDataAction.json?method=findProcessModel';
//        response = ZTESOFT.Synchronize(url,param);
//        if(response && response.length && response.length > 0){
//            processModelName = response[0].templateId;
//        }
//        
//        //通过模板名称和起始环节获取下一个环节的抽象角色ID
//        param = new Object();
//        param.accountId = session.logonAccount.accountId;
//        param.processModelId = processModelName;
//        param.activityDefId = 'kpiToAudit';//每个流程的起始环节
//
//
//        url = PATH+ '/e18/common/CnsBpsAction.json?method=qryActivityExtendAttributes';
//        response = ZTESOFT.Synchronize(url,param);
//        if(response && response.length && response.length > 0){
//            if(response[0].key == "nextAbstractRoleId"){
//                abstractRoleId = response[0].value;
//            }
//        }

        switch(cardOperationTypeIdGlo){
                       case 1:{//调拨
                        switch(operationTypeIdGlo){
                           case "3":abstractRoleId = 10017;break;//审核
                        }
                        break;
                       }
                       case 2:{//移交
                        switch(operationTypeIdGlo){
                           case "3":abstractRoleId = 10019;break;//审核
                        }
                        break;
                       }
                       case 3:{//借用
                        switch(operationTypeIdGlo){
                           case "3":abstractRoleId = 10021;break;//审核
                           case "7":abstractRoleId = 2020006;break;//本部门审核
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
                        	case "3":abstractRoleId = 10024;break;//审核
                        }
                        break;
                       }
                       case 6:{//清查
                        switch(operationTypeIdGlo){
                        	case "3":abstractRoleId = 10026;break;//审核
                        }
                        break;
                       }
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

}