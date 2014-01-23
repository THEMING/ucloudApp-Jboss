package com.unicom.ucloud.eom.e19.service;

import java.util.Date;
import java.util.Map;
import java.util.List;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.ITciPriAttEnumValDAO;
import com.unicom.ucloud.eom.e19.dao.ITciPriAttTempDetDAO;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-02-23
 * @author jerry
 */ 
@Service
public class TciPriAttTemDetServiImpl extends BaseServiceImpl implements ITciPriAttTemDetService {

    @Autowired
    private ITciPriAttTempDetDAO tciPriAttTemplateDetailDAO;
    @Autowired
    private ITciPriAttEnumValDAO tciPriAttEnumValDAO;
    
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return tciPriAttTemplateDetailDAO.qryListByParam(jsonObj);
    }
    @Override
    public Page qryPageByParam(JSONObject jsonObj) throws Exception {
        return tciPriAttTemplateDetailDAO.qryPageByParam(jsonObj);
    }
    
    private int getColumnNumber(JSONObject jsonObj) throws Exception{
        int columnNumber = 1; 
        JSONObject qryJson = new JSONObject();
        qryJson.put("tciPriAttTemplateId", JsonUtil.get(jsonObj, "tciPriAttTemplateId"));
        List<Map<String, Object>> list = tciPriAttTemplateDetailDAO.qryListByParam(qryJson);
        if(list != null && list.size() > 0){
            columnNumber = MapUtils.getIntValue(list.get(0), "columnNumber")+1;
        }
        return columnNumber;
    }
    
    @Override
    public void save(JSONObject jsonObj) throws Exception{
        Date now = new Date();
        jsonObj.put("columnNumber", getColumnNumber(jsonObj));
        jsonObj.put("creationDate", now);
        jsonObj.put("lastUpdateDate", now);
        jsonObj.put("deletionDate", now);
        tciPriAttTemplateDetailDAO.save(jsonObj);
        
        Long templateDetailId =  JsonUtil.getLong(jsonObj, "templateDetailId");

        if(JsonUtil.get(jsonObj, "enumArray") != null){
            JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "enumArray"));
            if (dataArray != null && dataArray.length() > 0) {
                JSONObject jsObj = null;
                for (int i = 0; i < dataArray.length(); i++) {
                    jsObj = (JSONObject) dataArray.get(i);               
                    jsObj.put("templateDetailId", templateDetailId);
                    jsObj.put("enabledFlag", Boolean.valueOf(true));
                    jsObj.put("parentEnumValueId", Integer.valueOf(-1));
                    jsObj.put("attributionProvinceId", JsonUtil.get(jsonObj, "attributionProvinceId"));
                    jsObj.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
                    jsObj.put("creationDate", JsonUtil.get(jsonObj, "creationDate"));
                    jsObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
                    jsObj.put("lastUpdateDate", JsonUtil.get(jsonObj, "lastUpdateDate"));
                    jsObj.put("recordVersion", JsonUtil.get(jsonObj, "recordVersion"));
                    jsObj.put("deletedFlag", JsonUtil.get(jsonObj, "deletedFlag"));
                    jsObj.put("deletionDate", JsonUtil.get(jsonObj, "deletionDate"));
                    jsObj.put("marketingAreaId", JsonUtil.get(jsonObj, "marketingAreaId"));
                    jsObj.put("maintenanceAreaId", JsonUtil.get(jsonObj, "maintenanceAreaId"));
                    jsObj.put("orgId", JsonUtil.get(jsonObj, "orgId"));

                    tciPriAttEnumValDAO.save(jsObj);
                }
            }
        }
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
                tciPriAttTemplateDetailDAO.delete(jsObj);
            }
        }
    }
    @Override
    public void deleteByTemplateId(JSONObject jsonObj) throws Exception{
        tciPriAttTemplateDetailDAO.deleteByTemplateId(jsonObj);
    }
    
    @Override
    public void update(JSONObject jsonObj) throws Exception {
        tciPriAttTemplateDetailDAO.update(jsonObj);

        Long templateDetailId = JsonUtil.getLong(jsonObj, "templateDetailId");
        if (JsonUtil.get(jsonObj, "enumArray") != null) {
            JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "enumArray"));
            if (dataArray != null && dataArray.length() > 0) {
                // 先删掉原来有的枚举值，再插入新的
                tciPriAttEnumValDAO.deleteByTemplateDetailId(jsonObj);

                for (int i = 0; i < dataArray.length(); i++) {
                    JSONObject jsObj = (JSONObject) dataArray.get(i);

                    jsObj.put("templateDetailId", templateDetailId);
                    jsObj.put("enabledFlag", Boolean.valueOf(true));
                    jsObj.put("parentEnumValueId", Integer.valueOf(-1));
                    jsObj.put("attributionProvinceId",JsonUtil.get(jsonObj, "attributionProvinceId"));
                    jsObj.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
                    jsObj.put("creationDate", JsonUtil.get(jsonObj, "creationDate"));
                    jsObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
                    jsObj.put("lastUpdateDate", JsonUtil.get(jsonObj, "lastUpdateDate"));
                    jsObj.put("recordVersion", JsonUtil.get(jsonObj, "recordVersion"));
                    jsObj.put("deletedFlag", JsonUtil.get(jsonObj, "deletedFlag"));
                    jsObj.put("deletionDate", JsonUtil.get(jsonObj, "deletionDate"));
                    jsObj.put("marketingAreaId", JsonUtil.get(jsonObj, "marketingAreaId"));
                    jsObj.put("maintenanceAreaId", JsonUtil.get(jsonObj, "maintenanceAreaId"));
                    jsObj.put("orgId", JsonUtil.get(jsonObj, "orgId"));

                    tciPriAttEnumValDAO.save(jsObj);
                }
            }
        }

    }
    
    /**
     * 查询 私有属性明细和测试卡私有属性值信息
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public List<Map<String, Object>> qryDetailAndInfoListByParam(JSONObject jsonObj)
            throws Exception {      
        return tciPriAttTemplateDetailDAO.qryDetailAndInfoListByParam(jsonObj);
    }

    

}
