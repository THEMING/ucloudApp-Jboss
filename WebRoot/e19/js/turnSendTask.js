var tsOper = new TurnSendOper();

function TurnSendOper() {
    // 主窗口

    this.winTitle = '转派面板';
    this.initWindow = function(rowData) {
        var formPanel = this.initFormPanel();

        var formWin = new Ext.Window({
            id : 'turnSendWin',
            title : this.winTitle,
            closable : true,
            modal : true,
            width : 640,
            height : 450,
            layout : 'anchor',
            plain : true,
            items : [ formPanel ],
            buttonAlign : 'center',
            buttons : [ {
                text : '提交',
                id : 'btn1',
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    tsOper.commit(rowData);
                }
            }, {
                text : '关闭',
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    Ext.getCmp('turnSendWin').close();
                }
            } ]
        });
        formWin.show();
    }

    this.initFormPanel = function() {
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
                        labelAlign : 'center',// 标签的对齐方式
                        hideLabel : true,
                        width : 120,// 最小是120，最大190
                        height : 30
                    },
                    items : [
                            {
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    html : '<font color="red">*</font>转派对象'
                                }
                            },
                            {
                                colspan : 3,
                                width : 150 * 3,
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
                                                var inputName = "actorUser,actorUserId,actorType,actorId";
                                                var requestData = "text,id,leaf,accountId,accountName,parentId";
                                                var win_id = "win10";
                                                var isUseful = [ 1, 0, 0 ];
                                                var _nodeRelationType = "noRelation";
                                                var _isOnlyLeaf = "0";
                                                var _inputType = "checkbox";
                                                var _orgId = session.logonAccount.provinceCompanyId;
                                                
                                                var searchObject = {
                                                        fuzzySearchType : 1//前台（0）或后台（1）查询，默认为0
                                                };
                                                var _cloudUserId = session.logonAccount.cloudUserId;
                                                var tree = new DeepTreeObj(inputName,
                                                        requestData, win_id, _orgId, isUseful,
                                                        _nodeRelationType, _isOnlyLeaf,
                                                        _inputType,searchObject,null,_cloudUserId);
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
                                        } ]
                            }, {
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    html :  '<font color="red">*</font>转派时限'
                                }
                            },{
                                colspan : 3,
                                width : 150 * 3,
                                items : {
                                    xtype : 'ZTESOFT.datefield',
                                    hideLabel : true,
                                    allowBlank : false,
                                    editable:false,
                                    name : 'tsLimiteTime',
                                    id : 'tsLimiteTime',
                                    format : 'Y-m-d h:i:s',
                                    anchor : '100%'
                                }
                            },{
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    html : '<font color="red">*</font>转派说明'
                                }
                            }, {
                                colspan : 3,
                                height : 120,
                                width : 150 * 3,
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
                            },{
                                colspan : 1,
                                items : {
                                    xtype : 'ZTESOFT.label',
                                    text : '附件信息'
                                }
                            }, {
                                colspan : 3,
                                width : 150*3,
                                height : 100,
                                items : [{
                                    xtype : 'ZTESOFT.attachmentPanel',
                                    id:'attachments',
                                    autoScroll:true,
                                    fileTypes:null,//附件类型，默认(不填)或者值为null则为所有，即“*.*”
                                    hideLabel : true,
                                    anchor : '100%',
                                    height : 100
                                }]
                            } ]
                });

        return infoPage;
    }

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
//        param.actorType = Ext.getCmp('actorType').getValue();
//        param.auditName = Ext.getCmp('actorUser').getValue();
//        param.auditId = Ext.getCmp('actorId').getValue();
        param.createdBy = session.logonAccount.cloudUserId;
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
        var now = new Date();
        var timeLimite = Ext.getCmp('tsLimiteTime').getValue();
        if(timeLimite < now){
            Ext.Msg.alert('操作提示', '转派时限不能小于当前时间！');
            return;
        }
        
        var yu = Math.floor(((timeLimite - now)/1000/60)%60);
                            var zheng = Math.floor((timeLimite - now)/1000/60/60);
                            var resu = zheng+"."+yu;
//                            alert(yu+"|"+zheng+"|"+resu);return;
                            param.diff = resu;//(timeLimite - now)/1000/60/60;
        
//        param.diff = (timeLimite - now)/1000/60/60;
        
        var fileList = getNewUplValue('attachments');
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
                             
                             fileList[i].activityInstanceId = rowData.activityInstID;
                             fileList[i].taskInstanceId = rowData.taskInstID;
                         }
                         param.fileList = Ext.encode(fileList);
        
        ZTESOFT.invokeAction(
                PATH+'/e19/testCardCommonAction.json?method=saveTurnSendTask',
                param, function(response) {
                    if (response && response.msg == "success") {
                        Ext.Msg.alert("操作提示", "操作成功", function() {
                            Ext.getCmp('turnSendWin').close();
                                            if(testCardOrderDetailIsUnify==1){
                                                window.close();
                                            }
                            if(Ext.getCmp('detailWin')){
                                Ext.getCmp('detailWin').close();
                            }
                            if(Ext.getCmp('undoTaskGrid')){
                            	var qryParam = myUndoTaskWholeParam;
                                myUndoTask.qryListGrid(qryParam);
                            }
                        });
                    } else {
                        Ext.Msg.alert("操作失败,请检查!"); 
                    }
                });
    }
}