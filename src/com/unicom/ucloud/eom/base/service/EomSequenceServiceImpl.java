package com.unicom.ucloud.eom.base.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.dao.IEomSequenceDAO;
import com.unicom.ucloud.util.JsonUtil;

@Service
public class EomSequenceServiceImpl extends BaseServiceImpl implements IEomSequenceService{
    
    public EomSequenceServiceImpl(){
        
    }
    
    @Autowired
    private IEomSequenceDAO eomSequenceDAO;
    
    @Override
    public String updateMySequence(JSONObject jsonObj) throws Exception {
        StringBuffer woNo = new StringBuffer();
        int currentNum = 1;//序列号
        
        String orgIdentifier = JsonUtil.getString(jsonObj, "provinceOrgShortName");
        if(JsonUtil.get(jsonObj, "cityOrgShortName") != null){
            orgIdentifier += "/";
            orgIdentifier += JsonUtil.getString(jsonObj, "cityOrgShortName");
        }
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        JSONObject qryJson = new JSONObject();
        qryJson.put("woType", JsonUtil.get(jsonObj, "woType"));
        qryJson.put("periodIdentifier", sdf.format(new Date()));
        qryJson.put("orgIdentifier", orgIdentifier);
        List<Map<String, Object>> list = eomSequenceDAO.qryListByParam(qryJson);
        if(list != null && list.size() > 0){
            Map<String, Object> map = list.get(0);
            currentNum = MapUtils.getIntValue(map, "currentNum")+1;
            woNo.append(MapUtils.getString(map, "orgIdentifier")).append("-");
            woNo.append(MapUtils.getString(map, "woType")).append("-");
            woNo.append(MapUtils.getString(map, "periodIdentifier")).append("-");
            woNo.append(getTotalSequence(jsonObj,currentNum));
            
            JSONObject modJson = new JSONObject();
            modJson.put("sequenceId", MapUtils.getLong(map, "sequenceId"));
            modJson.put("currentNum", currentNum);
            modJson.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
            eomSequenceDAO.updateCurrentNum(modJson);
        }else{
            JSONObject addJson = new JSONObject();
            
            woNo.append(orgIdentifier);
            
            woNo.append("-");
            woNo.append(JsonUtil.get(jsonObj, "woType"));
            woNo.append("-");
            woNo.append(sdf.format(new Date()));
            woNo.append("-");
            woNo.append(getTotalSequence(jsonObj,1));
            
            
            addJson.put("sequenceType", "W");
            addJson.put("orgIdentifier", orgIdentifier);
            addJson.put("woType", JsonUtil.get(jsonObj, "woType"));
            addJson.put("periodIdentifier", sdf.format(new Date()));
            addJson.put("currentNum", 1);
            addJson.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
            addJson.put("creationDate", new Date());
            addJson.put("lastUpdatedBy", JsonUtil.get(jsonObj, "createdBy"));
            addJson.put("lastUpdateDate", new Date());
            addJson.put("deletedFlag", 0);
            addJson.put("deletionDate", new Date());
            addJson.put("recordVersion", 1);
            addJson.put("modelCode", JsonUtil.get(jsonObj, "modelCode"));
            eomSequenceDAO.save(addJson);
        }
        return woNo.toString();
    }
    
    
    /**
     * 获取补全的序列号
     * 对于组织为集团或省分且”专业编码/业务代码”字段为空的工单，序列号为8位
     * 对于组织为地市且”专业编码/业务代码”字段为空的工单，序列号为6位
     * @param jsonObj
     * @param sequenceNum
     * @return
     * @throws JSONException 
     * @see
     * @since
     */
    private String getTotalSequence(JSONObject jsonObj, int sequenceNum) throws JSONException{
        Integer cityCompanyId = JsonUtil.getInt(jsonObj, "cityCompanyId");
        String sequence = "";
        int cityNum = 6;
        if(cityCompanyId == null){//集团、省份8位
            cityNum = 8;
        }
        int num = cityNum - String.valueOf(sequenceNum).length();
        for(int i=0;i<num;i++){
            sequence += "0";
        }
        sequence += String.valueOf(sequenceNum);
        return sequence;
    }

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        return eomSequenceDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        eomSequenceDAO.save(jsonObj);
    }

}
