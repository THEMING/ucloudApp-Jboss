var counterSign = new CounterSignOper();

function CounterSignOper() {
    // 主窗口
    this.winTitle = '会签面板';
    this.initWindow = function(rowData) {
        var formPanel = this.initFormPanel(rowData);

        var formWin = new Ext.Window({
            id : 'countSignWin',
            title : this.winTitle,
            closable : true,
            modal : true,
            width : 520,
            height : 300,
            layout : 'anchor',
            plain : true,
            items : [ formPanel ],
            buttonAlign : 'center',
            buttons : [ {
                text : '会签',
                id : 'btn1',
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    counterSign.commit(rowData);
                }
            }, {
                text : '关闭',
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    Ext.getCmp('countSignWin').close();
                }
            } ]
        });
        formWin.show();
    }

    this.initFormPanel = function(rowData) {
        var infoPage = new Ext.FormPanel(
                {
                    id : 'infoPage',
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
                        labelAlign : 'center',// 标签的对齐方式                        hideLabel : true,
                        width : 120,// 最小是120，最大190
                        height : 30
                    },
                    items : [
                            {
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    html : '<font color="red">*</font>会签对象'
                                }
                            },
                            {
                                colspan : 3,
                                width : 330,
                                items : [
                                        {
                                            xtype : 'ZTESOFT.popupfield',
                                            hideLabel : true,
                                            id : 'actorUser',
                                            name : 'actorUser',
                                            valueFile : 'actorUserId',
                                            allowBlank : false,// 是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                                            blankText : '不能为空!',
                                            readOnly : true,
                                            anchor : '100%',
                                            onPopup : function() {
//                                                var inputName = "actorUser,actorUserId,actorType,actorId";
//                                                var requestData = "text,id,leaf,accountId,accountName,parentId";
//                                                var win_id = "win10";
//                                                var isUseful = [ 1, 0, 0 ];
//                                                var _nodeRelationType = "noRelation";
//                                                var _isOnlyLeaf = "1";
//                                                var _inputType = "checkbox";
//                                                var _orgId = session.logonAccount.provinceCompanyId;
//                                                //var _orgId = 23727;
//                                                var tree = new DeepTreeObj(inputName,
//                                                        requestData, win_id, _orgId, isUseful,
//                                                        _nodeRelationType, _isOnlyLeaf,
//                                                        _inputType,null);
//                                                tree.showTree(deeptreeUrl);
                                                
//                                                ====================================
                                            
                                            var inputName = "actorUser,actorUserId,actorType,actorId,thisType";
                                                var requestData = "text,id,leaf,accountId,thisType,accountName,parentId";
                                            
                                            var isUseful = [1,0,0];
                                            var _nodeRelationType="noRelation";
                                            var _isOnlyLeaf="0";
                                            
                                            var _inputType="checkbox";
                                            
                                            
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
                                            
                                            var _qryType="assignTree";
                                            var _cloudUserId =  session.logonAccount.cloudUserId;
                                            var _roleArray =  null;//角色列表
                                            var _treeType =  3;//1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
                                                
                                                var roleIDArray = new Array();
            
                                                var processModelName = "";
                                                
                                                if(rowData.orderType==1){//调拨
                                                   processModelName = "com.unicom.ucloud.eom.e19.allot";
                                                }else if(rowData.orderType==2){//移交
                                                   processModelName = "com.unicom.ucloud.eom.e19.transfer";
                                                }else if(rowData.orderType==3){//借用
                                                   processModelName = "com.unicom.ucloud.eom.e19.lend";
                                                }else if(rowData.orderType==4){//归还
                                                   processModelName = "com.unicom.ucloud.eom.e19.return";
                                                }else if(rowData.orderType==5){//报废
                                                   processModelName = "com.unicom.ucloud.eom.e19.dumping";
                                                }else if(rowData.orderType==6){//清查
                                                    processModelName = "com.unicom.ucloud.eom.e19.check";
                                                }
                                                
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
                                                param.activityDefId = 'countersignChildFlow';//每个流程的起始环节

                                        
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
                                                _roleArray = roleIDArray;  
                                                
                                                var searchObject = {
                                                        fuzzySearchType : 0//前台（0）或后台（1）查询，默认为0
                                                };
                                            
                                            var tree = new DeepTreeObj(inputName,requestData,"nextExecutorDeepTreeObj"+new Date().getTime(),null,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType,searchObject,_qryType,_cloudUserId,_roleArray,_treeType);
                                            
                                            tree.showTree(deeptreeUrl);
                                            }
                                        }, {
                                            xtype : 'hidden',
                                            name : 'actorUserId',
                                            id : 'actorUserId'
                                        }, {
                                            xtype : 'hidden',
                                            name : 'actorId',
                                            id : 'actorId'
                                        }, {
                                            xtype : 'hidden',
                                            name : 'actorType',
                                            id : 'actorType'
                                        }, {
                                            xtype : 'hidden',
                                            name : 'thisType',
                                            id : 'thisType'
                                        } ]
                            }, {
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    html : '<font color="red">*</font>会签说明'
                                }
                            }, {
                                colspan : 3,
                                height : 120,
                                width : 330,
                                items : {
                                    xtype : 'ZTESOFT.textarea',
                                    hideLabel : true,
                                    name : 'forwardDesc',
                                    id : 'forwardDesc',
                                    allowBlank : false,
                                    blankText : '不能为空!',
                                    maxLength : 120,
                                    height : 150,
                                    anchor : '100%'
                                }
                            } ]
                });

        return infoPage;
    }

    // 提交会签
    this.commit = function(rowData) {
        var flag = false;
        Ext.each(Ext.getCmp('infoPage').getForm().items.items, function(item) {
            if (!item.isValid()) {
                item.focus();
                flag = true;
                return false;
            }
        });
        if (flag) {
            return;
        }
        var param = Ext.getCmp('infoPage').getForm().getValues();
        param.workOrderId = rowData.jobId;
        param.processInstId = rowData.processInstID;
        param.activityInstId = rowData.activityInstID;
        param.taskId = rowData.taskInstID;
        param.actorType = Ext.getCmp('actorType').getValue();
        param.auditName = Ext.getCmp('actorUser').getValue();
        param.isCountSign = 1;
        param.type = 1;
        param.auditId = Ext.getCmp('actorId').getValue();
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
        ZTESOFT.invokeAction(
                PATH+'/e19/testCardCommonAction.json?method=addCounterSign',
                param, function(response) {
                    if (response.msg = "success") {
                        Ext.Msg.alert("操作提示", "会签成功", function() {
                        	if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                            Ext.getCmp('countSignWin').close();
                            if(Ext.getCmp('detailWin')){
                                Ext.getCmp('detailWin').close();
                            }
                            if(Ext.getCmp('undoTaskGrid')){
                                var qryParam = myUndoTaskWholeParam;
                                myUndoTask.qryListGrid(qryParam);
                            }
                        });
                    } else {
                        Ext.Msg.alert("会签失败,请正确选择会签参与人!"); 
                    }
                });
    }
}