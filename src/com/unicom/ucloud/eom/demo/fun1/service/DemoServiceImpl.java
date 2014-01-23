package com.unicom.ucloud.eom.demo.fun1.service;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl;
import com.unicom.ucloud.eom.demo.fun1.dao.IDemoDAO;

/**
 * 测试业务层实现类
 * @version 1.0
 * @date 2013-1-10
 * @author guojinan
 */
@Service
public class DemoServiceImpl extends BaseServiceImpl implements IDemoService {

    @Autowired
    private IDemoDAO demoDAO;
    
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj)  throws Exception{
        
        return demoDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        demoDAO.save(jsonObj);
    }
    
    @Override
    public void update(JSONObject jsonObj) throws Exception {
        demoDAO.update(jsonObj);
    }

    @Override
    public Page page(JSONObject jsonObj) throws Exception {
        return demoDAO.page(jsonObj);
    }
    
    @Override
    public List<Map<String, Object>> queryTree(JSONObject jsonObj) throws Exception {
        
        return demoDAO.queryTree(jsonObj);
    }

}
