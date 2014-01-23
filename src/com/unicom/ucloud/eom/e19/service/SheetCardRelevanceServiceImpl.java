package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.ISheetCardRelevanceDAO; 

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-01-15
 * @author guan.jianming
 */ 
@Service
public class SheetCardRelevanceServiceImpl extends BaseServiceImpl implements ISheetCardRelevanceService {

    @Autowired
    private ISheetCardRelevanceDAO sheetCardRelevanceDAO;

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return sheetCardRelevanceDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception{
        sheetCardRelevanceDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        sheetCardRelevanceDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        sheetCardRelevanceDAO.update(jsonObj);
    }

}
