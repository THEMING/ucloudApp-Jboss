var manager = new DetailWin();
var processModelId = "";
var myUndoTaskCurrentState = 0;
var urlLoginId = session.logonAccount.accountId;

function MyUndoTaskUnify(){
   
    this.initTaskPanel = function(obj){
        ZTESOFT.invokeAction(
                PATH + '/e19/testCardCommonAction.json?method=queryTaskByTaskId',
                obj,
                function(response){  
                    if(response && response.data){
                    	var panel = null;
                    	var param = new Object();
                        param=response.data;
                        myUndoTaskCurrentState = param.currentState;
                        processModelId = param.processModelName;
                        if(obj.formUrl=='0'){//清查以外修改环节
                //            oper.detail("mod");
                            testCardOrderModify.showWinPreMyUndoTaskUnify(param.processInstID,param.activityInstID,param.taskInstID,obj.formUrl);
                        }else if(obj.formUrl=='checkModify'){//清查修改环节
                            testCardOrderModify.showWinPreMyUndoTaskUnify(param.processInstID,param.activityInstID,param.taskInstID,obj.formUrl);
                //            manager.showWinPre(param.processInstID,param.activityInstID,param.taskInstID,param.formUrl);
                        }else{
                            panel = manager.showWinPreMyUndoTaskUnify(param.processInstID,param.activityInstID,param.taskInstID,obj.formUrl,param.jobId);
                        }
                        
//                        if(obj.formUrl == "kpiAudit"){
//                            panel = kpiAuditOper.initPanel(response.data);
//                        }else if(obj.formUrl == "kpiModify"){
//                            panel = kpiMod.initPanel(response.data);
//                        }
                        return panel;
                    }
                }
         );    
    }
}