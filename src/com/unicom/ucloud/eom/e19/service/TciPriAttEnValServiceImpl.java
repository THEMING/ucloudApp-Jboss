package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.ITciPriAttEnumValDAO; 

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-02-28
 * @author jerry
 */ 
@Service
public class TciPriAttEnValServiceImpl extends BaseServiceImpl implements ITciPriAttEnValService {

    @Autowired
    private ITciPriAttEnumValDAO tciPriAttEnumValueDAO;

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return tciPriAttEnumValueDAO.qryListByParam(jsonObj);
    }
    /**
     * 查询私有属性枚举值对应的枚举含义
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public List<Map<String, Object>> qryEnumValueByParam(JSONObject jsonObj) throws Exception{
        return tciPriAttEnumValueDAO.qryEnumValueByParam(jsonObj);
    }
    
    @Override
    public void save(JSONObject jsonObj) throws Exception{
        tciPriAttEnumValueDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        tciPriAttEnumValueDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        tciPriAttEnumValueDAO.update(jsonObj);
    }

}
