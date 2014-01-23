package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.bean.Page;

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.IFlowindObjProcInsRelDAO; 

/** 
 * 业务层实现类 
 * @version 1.0
 * @date 2013-03-08
 * @author MING
 */ 
@Service
public class FlowindObjProcInsRelServiceImpl extends BaseServiceImpl implements IFlowindObjProcInsRelService {

    @Autowired
    private IFlowindObjProcInsRelDAO flowindObjProcInsRelDAO;

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return flowindObjProcInsRelDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception{
        flowindObjProcInsRelDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        flowindObjProcInsRelDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        flowindObjProcInsRelDAO.update(jsonObj);
    }

    @Override
    public Page page(JSONObject jsonObj) throws Exception{
        return flowindObjProcInsRelDAO.page(jsonObj);
    }

}
