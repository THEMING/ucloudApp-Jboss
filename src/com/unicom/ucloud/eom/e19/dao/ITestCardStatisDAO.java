package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

public interface ITestCardStatisDAO extends IBaseDAO{
    public List<Map<String, Object>> statisTestCardList(JSONObject jsonObj) throws Exception;
    public Map<String, Object> statisTestCardMap(JSONObject jsonObj) throws Exception;
}
