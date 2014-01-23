package com.unicom.ucloud.eom.e19.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.ucloud.paas.proxy.aaaa.util.PaasAAAAException;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
public interface ITestCardOrderApplyService extends IBaseDAO {
    
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj);
    
    public String addTestCardOrderApply(JSONObject jsonObj) throws Exception;

    public void deleteTestCardOrder(JSONObject jsonObj) throws Exception;

    public List<Map<String, Object>> qryAtestCardOrder(JSONObject jsonObj) throws PaasAAAAException;

    public String updateTestCardOrder(JSONObject jsonObj) throws Exception;

    public List<Map<String, Object>> qryAtestCardOrderTestCard(JSONObject jsonObj);
    
    public List<Map<String, Object>> qryOrderDetailForTestCardManage(JSONObject jsonObj);
    
    public Page qryEomCardSheetPageByParam(JSONObject jsonObj) throws Exception;

    public void addTestCardOrderBatch(JSONObject jsonObj) throws Exception;

    public List<Map<String, Object>> qryUndoByCardSheetId(JSONObject jsonObj) throws Exception;

    public List qryMustReturnTestCard(JSONObject jsonObj) throws Exception;

    public void addUrgeTestCardOrder(JSONObject jsonObj) throws Exception;
    public String isAllowToSelectThisCards(JSONArray jsonObj) throws Exception;

}
