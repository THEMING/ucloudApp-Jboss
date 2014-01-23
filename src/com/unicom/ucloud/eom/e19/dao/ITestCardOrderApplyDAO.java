package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
public interface ITestCardOrderApplyDAO extends IBaseDAO{

    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj);
    
    public Long addTestCardOrderApply(JSONObject jsonObj) throws Exception;

    public List<Map<String, Object>> qryAtestCardOrder(JSONObject jsonObj);

    public void updateTestCardOrder(JSONObject jsonObj) throws JSONException;

    public List<Map<String, Object>> qryAtestCardOrderTestCard(JSONObject jsonObj);

    public void addBatchTestCardOrderApply(JSONArray jsonArray) throws JSONException;
    
    public List<Map<String, Object>> qryOrderDetailForTestCardManage(JSONObject jsonObj);
    
    public Page qryEomCardSheetPageByParam(JSONObject jsonObj) throws Exception;

    void delete(JSONObject jsonObject) throws Exception;

    void deleteBatch(JSONArray jsonArray) throws Exception;

    public List qryMustReturnTestCard(JSONObject jsonObj) throws Exception;
 

}
