package com.unicom.ucloud.eom.e19.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.ITciPriAttTempDAO;
import com.unicom.ucloud.eom.e19.dao.ITciPriAttValueInfoDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardManageDAO;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-01-17
 * @author jiang.yean
 */ 
@Service
public class TestCardManServiceImpl extends BaseServiceImpl implements ITestCardManService {
    
    @Autowired
    private ITestCardManageDAO testCardManageDAO;
    @Autowired
    private ITciPriAttTempDAO tciPriAttTemplateDAO;
    @Autowired
    private ITciPriAttValueInfoDAO tciPriAttValueInfoDAO;
    
    @Override
    public void modifyTestCardInfo(JSONObject jsonObj) throws Exception{
        jsonObj.put("lastUpdateDate", new Date());
        testCardManageDAO.modifyTestCardInfo(jsonObj);

        Long testCardId = JsonUtil.getLong(jsonObj, "testCardId");
        updatePriAttValueInfo(jsonObj,testCardId);
    }
    
    @Override
    public void modifyImsInfo(JSONObject jsonObj) throws Exception{
        jsonObj.put("lastUpdateDate", new Date());
        testCardManageDAO.modifyImsInfo(jsonObj);
        
        Long fixedTelId = JsonUtil.getLong(jsonObj, "fixedTelId");
        updatePriAttValueInfo(jsonObj,fixedTelId);
    }
    
    @Override
    public void modifyTerminalInfo(JSONObject jsonObj) throws Exception{
        jsonObj.put("lastUpdateDate", new Date());
        testCardManageDAO.modifyTerminalInfo(jsonObj);
        
        Long testTerminalId = JsonUtil.getLong(jsonObj, "testTerminalId");
        updatePriAttValueInfo(jsonObj,testTerminalId);
    }
    
    @Override
    public void modifyRechCardInfo(JSONObject jsonObj) throws Exception{
        jsonObj.put("lastUpdateDate", new Date());
        testCardManageDAO.modifyRechCardInfo(jsonObj);

        Long rechCardId = JsonUtil.getLong(jsonObj, "rechCardId");
        updatePriAttValueInfo(jsonObj,rechCardId);
    }
   
    @Override
    public Page qryOrderPageForTestCardManage(JSONObject jsonObj) throws Exception {
        return testCardManageDAO.qryOrderPageForTestCardManage(jsonObj);
    }

    /**
     * 修改私有属性值
     * @param jsonObj
     * @param testobjectId
     * @throws Exception
     * @see
     * @since
     */
    private void updatePriAttValueInfo(JSONObject jsonObj,Long testobjectId) throws Exception{
         final long DATA_TYPE_FOUR = 4; 
         final long DATA_TYPE_FIVE = 5; 
         
        JSONObject JSon = new JSONObject();
        JSon.put("attributionProvinceId", JsonUtil.get(jsonObj, "attributionProvinceId"));
        JSon.put("testobjectType", JsonUtil.get(jsonObj, "testobjectTypeEnumId"));
        List<Map<String, Object>> list = tciPriAttTemplateDAO.qryTemplateListByParam(JSon);
        
        if(list != null && list.size() > 0){
            Map<String, Object> map = new HashMap<String, Object>();
            JSONObject json = new JSONObject();
            for(int i=0;i<list.size();i++){
                json = new JSONObject();
                map = list.get(i);
                
                json.put("testobjectId", testobjectId);
                json.put("testobjectType", JsonUtil.get(jsonObj, "testobjectTypeEnumId"));
                json.put("attributionProvinceId", JsonUtil.get(jsonObj, "attributionProvinceId"));
                json.put("templateDetailId", MapUtils.getString(map, "templateDetailId"));
                
                json.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
                json.put("lastUpdateDate", new Date());
                
                String column = "column"+MapUtils.getString(map, "displayNumber");
                Long dataType = MapUtils.getLong(map, "dataTypeEnumId");
                if(dataType != null){
                    /** 日期和时间的，需要转换为相对于的格式。日期YYYY-MM-DD;时间YYYY-MM-DD HH:MI:SS **/
                    String oldValue = null;
                    if(jsonObj.has(MapUtils.getString(map, "columnNumber"))){
                        oldValue = JsonUtil.getString(jsonObj, MapUtils.getString(map, "columnNumber"));
                    }
                    if(dataType.longValue() == DATA_TYPE_FOUR){//日期
                        String date = oldValue.substring(0,10);
                        json.put(column, date);
                    }else if(dataType.longValue() == DATA_TYPE_FIVE){//时间
                        String date = oldValue.replace('T', ' ');
                        json.put(column, date);
                    }else{
                        json.put(column, oldValue);
                    }
                }
                
                /*修改的时候，如果之前有插入的就修改，没有的就新增*/
                List<Map<String, Object>> valueList = tciPriAttValueInfoDAO.qryListByParam(json);
                if(valueList != null && valueList.size() > 0){
                    tciPriAttValueInfoDAO.update(json);
                }else{
                    json.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
                    json.put("creationDate", new Date());
                    json.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
                    json.put("lastUpdateDate", JsonUtil.get(jsonObj, "lastUpdateDate"));
                    json.put("recordVersion", Integer.valueOf(1));
                    json.put("deletedFlag", Boolean.valueOf(false));
                    json.put("marketingAreaId", JsonUtil.get(jsonObj, "marketingAreaId"));
                    json.put("maintenanceAreaId", JsonUtil.get(jsonObj, "maintenanceAreaId"));
                    json.put("orgId", JsonUtil.get(jsonObj, "orgId"));
                    
                    tciPriAttValueInfoDAO.save(json);
                }
            }
        }
    }
}
