function deleteOrderInfo(){
    
    var delOper = new deleteOper();
    
    this.deleteData = function(){
        delOper.deleteOrder(qryParams.testobjectTypeEnumId);
    }
    
    function deleteOper(){
        
        this.deleteOrder = function(typeId){
            if(typeId == testCardEnum){
                this.deleteTestCard(typeId);
            }else if(typeId == teleCardEnum){
                this.deleteIms(typeId);
            }else if(typeId == terminalEnum){
                this.deleteTerminal(typeId);
            }else if(typeId == rechCardEnum){
                this.deleteRechCard(typeId);
            }
        }
        
       this.deleteTestCard = function(typeId){
            var param = {};
            var selItems = Ext.getCmp('testGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                	if(selItems[i].data.adminId!=session.logonAccount.cloudUserId){
                	   Ext.Msg.alert("提示","测试卡编号为["+selItems[i].data.number+"]的管理员不是当前登录者，不能删除！");
                	   return;
                	}
                    var obj = {};
                    obj.testobjectId = selItems[i].data.testCardId;
                    obj.deletedBy = session.logonAccount.cloudUserId;
                    obj.testobjectType = typeId;
                    dataArray.push(obj);
                }
                param.dataArray = Ext.encode(dataArray);
                Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                    if(btn=="yes"){
                        ZTESOFT.invokeAction(
                                PATH+'/e19/testCardRegisterAction.json?method=del',
                                param,
                                function(response){
                                	if(response.msg!=null&&response.msg=="warn"){
                                        Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被删除！");
                                        return;
                                     }
                                    oper.doQry();
                                }
                        );
                    }
                });
            }else{
                Ext.Msg.alert('操作提示','请先选择要删除的行');
                return;
            }
        }

        this.deleteIms = function(typeId){
            var param = {};
            var selItems = Ext.getCmp('teleGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                	if(selItems[i].data.adminId!=session.logonAccount.cloudUserId){
                       Ext.Msg.alert("提示","电话号码为["+selItems[i].data.phoneNumber+"]的管理员不是当前登录者，不能删除！");
                       return;
                    }
                    var obj = {};
                    obj.testobjectId = selItems[i].data.fixedTelId;
                    obj.deletedBy = session.logonAccount.cloudUserId;
                    obj.testobjectType = typeId;
                    dataArray.push(obj);
                }
                param.dataArray = Ext.encode(dataArray);
                Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                    if(btn=="yes"){
                        ZTESOFT.invokeAction(
                                PATH+'/e19/imsRegisterAction.json?method=del',
                                param,
                                function(response){
                                	if(response.msg!=null&&response.msg=="warn"){
                                        Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被删除！");
                                        return;
                                     }
                                    oper.doQry();
                                }
                        );
                    }
                });
            }else{
                Ext.Msg.alert('操作提示','请先选择要删除的行');
                return;
            }
        }
        
        this.deleteTerminal = function(typeId){
            var param = {};
            var selItems = Ext.getCmp('termiGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                	if(selItems[i].data.adminId!=session.logonAccount.cloudUserId){
                       Ext.Msg.alert("提示","测试终端编号为["+selItems[i].data.number+"]的管理员不是当前登录者，不能删除！");
                       return;
                    }
                    var obj = {};
                    obj.testobjectType = typeId;
                    obj.testobjectId = selItems[i].data.testTerminalId;
                    obj.deletedBy = session.logonAccount.cloudUserId;;
                    dataArray.push(obj);
                }
                
                param.dataArray = Ext.encode(dataArray);
                Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                    if(btn=="yes"){
                        ZTESOFT.invokeAction(
                                PATH+'/e19/terminalRegisterAction.json?method=del',
                                param,
                                function(response){
                                	if(response.msg!=null&&response.msg=="warn"){
                                        Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被删除！");
                                        return;
                                     }
                                    oper.doQry();
                                }
                        );
                    }
                });
            }else{
                Ext.Msg.alert('操作提示','请先选择要删除的行');
                return;
            }
        }
        
        this.deleteRechCard = function(typeId){
            var param = {};
            var selItems = Ext.getCmp('rechGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                var dataArray = new Array();
                for(var i=0;i<selItems.length;i++){
                	if(selItems[i].data.adminId!=session.logonAccount.cloudUserId){
                       Ext.Msg.alert("提示","充值卡卡号为["+selItems[i].data.cardNo+"]的管理员不是当前登录者，不能删除！");
                       return;
                    }
                    var obj = {};
                    obj.testobjectType = typeId;
                    obj.testobjectId = selItems[i].data.rechCardId;
                    obj.deletedBy = session.logonAccount.cloudUserId;;
                    dataArray.push(obj);
                }
                param.dataArray = Ext.encode(dataArray);
                Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                    if(btn=="yes"){
                        ZTESOFT.invokeAction(
                                PATH+'/e19/rechCardRegisterAction.json?method=del',
                                param,
                                function(response){
                                	if(response.msg!=null&&response.msg=="warn"){
                                        Ext.Msg.alert("操作提示","测试卡:"+response.ret+"正处于未结束的工单中，不能被删除！");
                                        return;
                                     }
                                    oper.doQry();
                                }
                        );
                    }
                });
            }else{
                Ext.Msg.alert('操作提示','请先选择要删除的行');
                return;
            }
        }
        
    }
}