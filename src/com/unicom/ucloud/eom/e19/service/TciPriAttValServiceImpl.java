package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.ITciPriAttValueInfoDAO; 

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-03-01
 * @author jerry
 */ 
@Service
public class TciPriAttValServiceImpl extends BaseServiceImpl implements ITciPriAttValService {

    @Autowired
    private ITciPriAttValueInfoDAO tciPriAttValueInfoDAO;

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return tciPriAttValueInfoDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception{
        tciPriAttValueInfoDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        tciPriAttValueInfoDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        tciPriAttValueInfoDAO.update(jsonObj);
    }

}
