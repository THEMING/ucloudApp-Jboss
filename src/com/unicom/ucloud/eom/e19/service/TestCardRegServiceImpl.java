package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.apache.commons.collections.MapUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.ISheetCardRelevanceDAO;
import com.unicom.ucloud.eom.e19.dao.ITciPriAttTempDAO;
import com.unicom.ucloud.eom.e19.dao.ITciPriAttValueInfoDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardOrderApplyDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardRegisterDAO; 
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-01-17
 * @author jiang.yean
 */ 
@Service
public class TestCardRegServiceImpl extends BaseServiceImpl implements ITestCardRegService {
    
    @Autowired
    private ITestCardRegisterDAO testCardRegisterDAO;
    @Autowired
    private ITciPriAttTempDAO tciPriAttTemplateDAO;
    @Autowired
    private ITestCardOrderApplyService testCardOrderApplyService;
    @Autowired
    private ITciPriAttValueInfoDAO tciPriAttValueInfoDAO;
    @Autowired
    private ISheetCardRelevanceDAO sheetCardRelevanceDAO;
    @Override
    public List<Map<String, Object>> qryTestCardListByParam(JSONObject jsonObj) throws Exception{ 
        return testCardRegisterDAO.qryTestCardListByParam(jsonObj);
    }

    @Override
    public void saveTestCardInfoBatch(JSONObject jsonObj) throws Exception{
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        
        //用于性能测试，不插入私有属性
//        testCardRegisterDAO.saveTestCardInfoBatch(dataArray);
        
      //用于功能实现，插入私有属性
        if (dataArray != null && dataArray.length() > 0) {
            Date now = new Date();
            for (int i = 0; i < dataArray.length(); i++) {
                JSONObject jsObj = (JSONObject) dataArray.get(i);
                jsObj.put("creationDate", now);
                jsObj.put("lastUpdateDate", now);
                jsObj.put("deletionDate", now);
                testCardRegisterDAO.saveTestCardInfo(jsObj);
                
                Long testCardId = JsonUtil.getLong(jsObj, "testCardId");
                savePriAttValueInfo(jsObj,testCardId);
            }
        }
    }
    
    /**
     *  测试卡私有属性值信息 新增
     * @param jsonObj 测试卡信息
     * @param testobjectId 测试卡ID
     * @throws Exception
     * @see
     * @since
     */
    private void savePriAttValueInfo(JSONObject jsonObj,Long testobjectId) throws Exception{
        final long DATA_TYPE_FOUR = 4; 
        final long DATA_TYPE_FIVE = 5; 
        
        JSONObject JSon = new JSONObject();
        JSon.put("attributionProvinceId", JsonUtil.get(jsonObj, "attributionProvinceId"));
        JSon.put("testobjectType", JsonUtil.get(jsonObj, "testobjectTypeEnumId"));
        List<Map<String, Object>> list = tciPriAttTemplateDAO.qryTemplateListByParam(JSon);
        if(list != null && list.size() > 0){
            Map<String, Object> map = new HashMap<String, Object>();
            JSONObject json = null;
            for(int i=0;i<list.size();i++){
                json = new JSONObject();
                map = list.get(i);

                json.put("testobjectId", testobjectId);
                json.put("testobjectType", JsonUtil.get(jsonObj, "testobjectTypeEnumId"));
                json.put("attributionProvinceId", JsonUtil.get(jsonObj, "attributionProvinceId"));
                json.put("templateDetailId", MapUtils.getString(map, "templateDetailId"));
                
                String column = "column"+MapUtils.getString(map, "displayNumber");
                Long dataType = MapUtils.getLong(map, "dataTypeEnumId");
                
                if(dataType != null){
                    /* 日期和时间的，需要转换为相对于的格式。日期YYYY-MM-DD;时间YYYY-MM-DD HH:MI:SS */
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
                        json.put(column,oldValue);
                    }
                }

                json.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
                json.put("creationDate", JsonUtil.get(jsonObj, "creationDate"));
                json.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
                json.put("lastUpdateDate", JsonUtil.get(jsonObj, "lastUpdateDate"));
                json.put("recordVersion", JsonUtil.get(jsonObj, "recordVersion"));
                json.put("deletedFlag", JsonUtil.get(jsonObj, "deletedFlag"));
                json.put("deletionDate", JsonUtil.get(jsonObj, "deletionDate"));
                json.put("marketingAreaId", JsonUtil.get(jsonObj, "marketingAreaId"));
                json.put("maintenanceAreaId", JsonUtil.get(jsonObj, "maintenanceAreaId"));
                json.put("orgId", JsonUtil.get(jsonObj, "orgId"));
                
                tciPriAttValueInfoDAO.save(json);
            }
        }
    }
    
    @Override
    public String deleteTestCardInfo(JSONObject jsonObj) throws Exception{
    	
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        if(dataArray !=null && dataArray.length()!=0){
        	String ret = testCardOrderApplyService.isAllowToSelectThisCards(dataArray);
        	if(!"".equals(ret)){
        		return ret;
        	}else{
        		 JSONObject jsObj = null;
                 for (int i = 0; i < dataArray.length(); i++) {
                     jsObj = (JSONObject) dataArray.get(i);
                     jsObj.put("deletedFlag",new Boolean(true));
                     jsObj.put("deletionDate", new Date());
                     testCardRegisterDAO.deleteTestCardInfo(jsObj);
                 }
                
        	}
        }
       
        return "";
    }
    @Override
    public List<Map<String, Object>> qryImsListByParam(JSONObject jsonObj) throws Exception{ 
        return testCardRegisterDAO.qryImsListByParam(jsonObj);
    }

    /**
     * 批量导入固定电话信息
     */
    @Override
    public void saveImsInfoBatch(JSONObject jsonObj) throws Exception{
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
      //用于性能测试，不插入私有属性
//        testCardRegisterDAO.saveImsInfoBatch(dataArray);
      //用于功能实现，插入私有属性
        if (dataArray != null && dataArray.length() > 0) {
            Date now = new Date();
            for (int i = 0; i < dataArray.length(); i++) {
                JSONObject jsObj = (JSONObject) dataArray.get(i);
                jsObj.put("creationDate", now);
                jsObj.put("lastUpdateDate", now);
                jsObj.put("deletionDate", now);
                testCardRegisterDAO.saveImsInfo(jsObj);
                
                Long fixedTelId = JsonUtil.getLong(jsObj, "fixedTelId");
                savePriAttValueInfo(jsObj,fixedTelId);
            }
        }
    }

    @Override
    public String deleteImsInfo(JSONObject jsonObj) throws Exception{
        /*JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        if (dataArray != null && dataArray.length() > 0) {
            JSONObject jsObj = null;
            
            for (int i = 0; i < dataArray.length(); i++) {
                jsObj = (JSONObject) dataArray.get(i);
                jsObj.put("deletedFlag",new Boolean(true));
                jsObj.put("deletionDate", new Date());
                testCardRegisterDAO.deleteImsInfo(jsObj);
            }
        }*/
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        if(dataArray !=null && dataArray.length()!=0){
        	String ret = testCardOrderApplyService.isAllowToSelectThisCards(dataArray);
        	if(!"".equals(ret)){
        		return ret;
        	}else{
        		 JSONObject jsObj = null;
                 for (int i = 0; i < dataArray.length(); i++) {
                     jsObj = (JSONObject) dataArray.get(i);
                     jsObj.put("deletedFlag",new Boolean(true));
                     jsObj.put("deletionDate", new Date());
                     testCardRegisterDAO.deleteImsInfo(jsObj);
                 }
                
        	}
        }
       
        return "";
    }
    @Override
    public List<Map<String, Object>> qryTerminalListByParam(JSONObject jsonObj) throws Exception{ 
        return testCardRegisterDAO.qryTerminalListByParam(jsonObj);
    }

    /**
     * 批量导入测试终端信息
     */
    @Override
    public void saveTerminalInfoBatch(JSONObject jsonObj) throws Exception{
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
      //用于性能测试，不插入私有属性
//        testCardRegisterDAO.saveTerminalInfoBatch(dataArray);
      //用于功能实现，插入私有属性
        if (dataArray != null && dataArray.length() > 0) {
            Date now = new Date();
            for (int i = 0; i < dataArray.length(); i++) {
                JSONObject jsObj = (JSONObject) dataArray.get(i);
                jsObj.put("creationDate", now);
                jsObj.put("lastUpdateDate", now);
                jsObj.put("deletionDate", now);
                testCardRegisterDAO.saveTerminalInfoNoBatch(jsObj);
                
                Long testTerminalId = JsonUtil.getLong(jsObj, "testTerminalId");
                savePriAttValueInfo(jsObj,testTerminalId);
            }
        }
    }
    
    @Override
    public String deleteTerminalInfo(JSONObject jsonObj) throws Exception{
    	       JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        if(dataArray !=null && dataArray.length()!=0){
        	String ret = testCardOrderApplyService.isAllowToSelectThisCards(dataArray);
        	if(!"".equals(ret)){
        		return ret;
        	}else{
        		 JSONObject jsObj = null;
                 for (int i = 0; i < dataArray.length(); i++) {
                     jsObj = (JSONObject) dataArray.get(i);
                     jsObj.put("deletedFlag",new Boolean(true));
                     jsObj.put("deletionDate", new Date());
                     testCardRegisterDAO.deleteTerminalInfo(jsObj);
                 }
                
        	}
        }
       
        return "";
    	
    }

    @Override
    public List<Map<String, Object>> qryRechCardListByParam(JSONObject jsonObj) throws Exception{ 
        return testCardRegisterDAO.qryRechCardListByParam(jsonObj);
    }

    /**
     * 批量导入充值卡信息
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public void saveRechCardInfoBatch(JSONObject jsonObj) throws Exception{
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
      //用于性能测试，不插入私有属性
//        testCardRegisterDAO.saveRechCardInfoBatch(dataArray);
      //用于功能实现，插入私有属性
        if (dataArray != null && dataArray.length() > 0) {
            Date now = new Date();
            for (int i = 0; i < dataArray.length(); i++) {
                JSONObject jsObj = (JSONObject) dataArray.get(i);
                jsObj.put("creationDate", now);
                jsObj.put("lastUpdateDate", now);
                jsObj.put("deletionDate", now);
                testCardRegisterDAO.saveRechCardInfo(jsObj);
                
                Long rechCardId = JsonUtil.getLong(jsObj, "rechCardId");
                savePriAttValueInfo(jsObj,rechCardId);
            }
        }
    }
    
    @Override
    public String deleteRechCardInfo(JSONObject jsonObj) throws Exception{
	       JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
	       if(dataArray !=null && dataArray.length()!=0){
		 	String ret = testCardOrderApplyService.isAllowToSelectThisCards(dataArray);
		 	if(!"".equals(ret)){
		 		return ret;
		 	}else{
		 		 JSONObject jsObj = null;
		          for (int i = 0; i < dataArray.length(); i++) {
		              jsObj = (JSONObject) dataArray.get(i);
		              jsObj.put("deletedFlag",new Boolean(true));
		              jsObj.put("deletionDate", new Date());
		              testCardRegisterDAO.deleteRechCardInfo(jsObj);
		          }
		         
		 	}
		 }
		
		 return "";
       
    }

    @Override
    public Page qryImsPageByParam(JSONObject jsonObj) throws Exception {
        return testCardRegisterDAO.qryImsPageByParam(jsonObj);
    }

    @Override
    public Page qryTerminalPageByParam(JSONObject jsonObj) throws Exception {
        return testCardRegisterDAO.qryTerminalPageByParam(jsonObj);
    }

    @Override
    public Page qryRechCardPageByParam(JSONObject jsonObj) throws Exception {
        return testCardRegisterDAO.qryRechCardPageByParam(jsonObj);
    }

    @Override
    public Page qryTestCardPageByParam(JSONObject jsonObj) throws Exception {
        return testCardRegisterDAO.qryTestCardPageByParam(jsonObj);
    }

}
