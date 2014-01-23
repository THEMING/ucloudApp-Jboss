package com.unicom.ucloud.eom.e19.service;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.dao.ITestCardInfoDAO;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
@Service
public class TestCardInfoServiceImpl implements ITestCardInfoService {

    @Autowired
    private ITestCardInfoDAO testCardInfoDAO;
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        return testCardInfoDAO.qryListByParam(jsonObj);
    }
    @Override
    public Page qryListPageByParam(JSONObject jsonObj) throws Exception {
        return testCardInfoDAO.qryListPageByParam(jsonObj);
    }

}
