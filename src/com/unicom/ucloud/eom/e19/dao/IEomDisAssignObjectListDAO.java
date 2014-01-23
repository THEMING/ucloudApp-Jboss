package com.unicom.ucloud.eom.e19.dao;


import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.dao.IBaseDAO;

public interface IEomDisAssignObjectListDAO extends IBaseDAO {
    
    public void saveDisAssignObject(JSONObject jsonObj) throws Exception;

    public List<Map<String, Object>> qryDisAssignObjectListByParam(JSONObject jsonObj) throws Exception;

    public void update(JSONObject jsonObj) throws Exception;
    

}
