package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;

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
public interface ITestCardInfoDAO extends IBaseDAO{

    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj);
    public Page qryListPageByParam(JSONObject jsonObj) throws Exception;
}
