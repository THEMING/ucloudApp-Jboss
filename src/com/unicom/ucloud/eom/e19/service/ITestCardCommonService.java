package com.unicom.ucloud.eom.e19.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.dao.IBaseDAO;
import com.unicom.ucloud.eom.base.bean.Page;

public interface ITestCardCommonService extends IBaseDAO{

    List<Map<String, Object>> qryOpearateHisList(JSONObject jsonObj) throws Exception;
    
    /**
     * 分页查询
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
        public Page queryByPage(JSONObject jsonObj) throws Exception;

    List<Map<String, Object>> qryDisAssignObjectListByParam(JSONObject jsonObj) throws Exception;

    /**
     * 会签
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public JSONObject addCounterSign(JSONObject jsonObj) throws Exception;
    
    public void superiorsAudit(JSONObject jsonObj) throws Exception;

    /**
     * 会签回单
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void addSign(JSONObject jsonObj) throws Exception;

    /**
     * 按照任务ID查询待办任务
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public Map<String, Object> queryTaskByTaskId(JSONObject jsonObj) throws Exception;

    /**
     * 查询活动扩展配置的相关信息

     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public JSONArray getExtendAttributesArray(JSONObject jsonObj) throws Exception;

    /**
     * 转派
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void saveTurnSendTask(JSONObject jsonObj) throws Exception;

    /**
     * 转派回单
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void saveTurnSend(JSONObject jsonObj) throws Exception;

    /** 
     * 查询下一环节参与者

     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public String qryNextPaticipants(JSONObject jsonObj) throws Exception;
    
    /**
     * 根据流程实例ID获取当前流程正在处理的工作项参与者

     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public JSONArray findDoingParticipant(JSONObject jsonObj) throws Exception;

	public Map<String, Object> getProcessingObjData(JSONObject jsonObj) throws Exception;

}
