package com.unicom.ucloud.eom.e19.service;

import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.primeton.workflow.api.WFServiceException;
import com.unicom.ucloud.eom.base.service.IBaseService;
import com.unicom.ucloud.workflow.exceptions.WFException;
import com.unicom.ucloud.workflow.objects.TaskInstance;

public interface ITcmBpsService extends IBaseService{
    
//    public String createAndStartProcessInst(JSONObject jsonObj) throws Exception;
    
    public Map<String, Object> queryMyUndoTasks(JSONObject jsonObj) throws WFException, JSONException, Exception;
    
//    public TaskInstance queryMyUndoTask(JSONObject jsonObj) throws WFException, JSONException;
//    
//    public void applyTask(JSONObject jsonObj) throws WFException, JSONException;
//    
//    public void approvalTask(JSONObject jsonObj) throws WFException, JSONException, Exception;
//    
//    public void upperApprovalTask(JSONObject jsonObj) throws WFException, JSONException, Exception;
//    
//    public void executeTask(JSONObject jsonObj) throws WFException, JSONException, Exception;
//    
//    public void collectTask(JSONObject jsonObj) throws WFException, JSONException, Exception;
//    
    public List<Map<String, Object>> getAllProcess(JSONObject jsonObj) throws WFException, WFServiceException, JSONException;
//    
    public List<Map<String, Object>> getAllActivityByProcessId(JSONObject jsonObj) throws WFException, WFServiceException, JSONException;

    public Map<String, Object> getMyWorkedTasks(JSONObject jsonObj) throws WFException, JSONException, Exception;
    
    /** 
     *根据流程模板名称和环节定义id返回该环节配置的扩展信息
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public String getActivityExtendAttributes(JSONObject jsonObj) throws Exception;
/**
 * 查询已办合并
 * @param jsonObj
 * @return
 */
	public Map<String, Object> getMyCompletedTasksDistinctProinstanceId(JSONObject jsonObj) throws Exception;
}
