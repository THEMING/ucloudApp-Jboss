package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

public interface IEomCardCheckDao extends IBaseDAO{

    /**
     * 按部门查询属于不同管理员的测试卡状况
     * @param jsonObj
     * @return
     * @throws JSONException
     * @see
     * @since
     */
    public List<Map<String, Object>> qryEomCheckCardListByParam(JSONObject jsonObj) throws JSONException;
    public Long insertEomCardCheck(JSONObject jsonObj) throws JSONException;
    /**
     * 查询测试卡清查单记录
     * @param jsonObj
     * @return
     * @see
     * @since
     */
    public List<Map<String, Object>> qryTestCardCheckListByParam(JSONObject jsonObj);
    public void delEomCardCheckList(JSONObject jsonObj) throws JSONException;
    /**
     * 查询测试卡清查单记录 带分页
     * @param jsonObj
     * @return
     * @throws JSONException
     * @see
     * @since
     */
    public Page qryTestCardCheckListPage(JSONObject jsonObj) throws Exception ;
    
    /**
     * 按部门查询属于不同管理员的测试卡状况 带分页
     * @param jsonObj
     * @return
     * @throws JSONException
     * @see
     * @since
     */
    public Page qryEomCheckCardListPage(JSONObject jsonObj) throws Exception ;
    public Long updateEomCardCheck(JSONObject jsonObj) throws Exception;
    public void updateEomCardCheckByParam(JSONObject jsonObj) throws Exception;
    public void updateSheetIdAndStutes(JSONObject jsonObj) throws Exception;
}
