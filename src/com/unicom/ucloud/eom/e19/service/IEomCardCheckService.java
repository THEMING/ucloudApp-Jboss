package com.unicom.ucloud.eom.e19.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.IBaseService;

public interface IEomCardCheckService extends IBaseService{

    /**
     * 按部门查询属于不同管理员的测试卡状况
     * @param jsonObj
     * @return
     * @throws JSONException
     * @see
     * @since
     */
    public List<Map<String, Object>> qryEomCheckCardListByParam(JSONObject jsonObj) throws JSONException;
    public void insertEomCardCheck(JSONArray dataArray) throws JSONException, Exception;
    public void insertEomCardCheckDetail(JSONArray cdArray, Long checkListId) throws JSONException;
    /**
     * 查询测试卡清查单记录
     * @param jsonObj
     * @return
     * @see
     * @since
     */
    public List<Map<String, Object>> qryTestCardCheckListByParam(JSONObject jsonObj);
    public void deleteEomCardCheckList(JSONObject jsonObj) throws JSONException;
    /**
     * 按部门查询属于不同管理员的测试卡状况 带分页
     * @param jsonObj
     * @return
     * @throws JSONException
     * @see
     * @since
     */
    public Page qryEomCheckCardListPage(JSONObject jsonObj) throws Exception ;
    /**
     * 查询测试卡清查单记录 带分页
     * @param jsonObj
     * @return
     * @see
     * @since
     */
    public Page qryTestCardCheckListPage(JSONObject jsonObj) throws Exception;
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception; 
    public void updateEomCardCheck(JSONArray dataArray) throws JSONException, Exception;
    public void updateCardCheckDetial(JSONObject jsonObj) throws JSONException;
    
    /**
     * 查询测试卡信息
     * @param jsonObj
     * @return
     * @see
     * @since
     */
    public List<Map<String, Object>> qryEomCheckCardInfo(JSONObject jsonObj) throws Exception;
    
    /**
     * 删除清查详细表By 清查单ID
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void deleteByCheckListId(JSONObject jsonObj) throws Exception;
    
    /**
     * 更新测试卡清查单 通用(用不了)
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void updateEomCardCheckByParam(JSONObject jsonObj) throws Exception;
    
    /**
     * 更新测试卡清查单对应的工单ID和清查单状态
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void updateSheetIdAndStutes(JSONObject jsonObj) throws Exception;
    public void addAuditBatch(JSONObject jsonObj) throws Exception;
}
