package com.unicom.ucloud.eom.base.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;

public interface IEomSequenceDAO extends IBaseDAO{

    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception;
    
    public Page page(JSONObject jsonObj) throws Exception;
    
    public void save(JSONObject jsonObj) throws Exception;
    
    public void updateCurrentNum(JSONObject jsonObj) throws Exception;
}
