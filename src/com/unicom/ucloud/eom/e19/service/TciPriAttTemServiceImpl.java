package com.unicom.ucloud.eom.e19.service;

import java.util.Date;
import java.util.Map;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl;  
import com.unicom.ucloud.eom.e19.dao.ITciPriAttTempDAO;
import com.unicom.ucloud.eom.e19.dao.ITciPriAttTempDetDAO;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-02-22
 * @author jerry
 */ 
@Service
public class TciPriAttTemServiceImpl extends BaseServiceImpl implements ITciPriAttTemService {

    @Autowired
    private ITciPriAttTempDAO tciPriAttTemplateDAO;
    @Autowired
    private ITciPriAttTempDetDAO tciPriAttTemplateDetailDAO;
    
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return tciPriAttTemplateDAO.qryListByParam(jsonObj);
    }
    public Page qryPageByParam(JSONObject jsonObj) throws Exception{
        return tciPriAttTemplateDAO.qryPageByParam(jsonObj);
    }
    @Override
    public void save(JSONObject jsonObj) throws Exception{
        Date now = new Date();
        jsonObj.put("creationDate", now);
        jsonObj.put("lastUpdateDate", now);
        jsonObj.put("deletionDate", now);
        tciPriAttTemplateDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        if (dataArray != null && dataArray.length() > 0) {
            JSONObject jsObj = null;
            
            for (int i = 0; i < dataArray.length(); i++) {
                jsObj = (JSONObject) dataArray.get(i);
                jsObj.put("deletedFlag",new Boolean(true));
                jsObj.put("deletionDate", new Date());
                tciPriAttTemplateDAO.delete(jsObj);
                
                tciPriAttTemplateDetailDAO.deleteByTemplateId(jsObj);
            }
        }
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        tciPriAttTemplateDAO.update(jsonObj);
    }
    /**
     * 查询私有属性模板明细和私有属性模板信息
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<Map<String, Object>> qryTemplateListByParam(JSONObject jsonObj) throws Exception{
        return tciPriAttTemplateDAO.qryTemplateListByParam(jsonObj);
    }
}
