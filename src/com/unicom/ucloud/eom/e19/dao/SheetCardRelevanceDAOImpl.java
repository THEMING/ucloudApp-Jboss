package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 测试数据库层实现类 
 * @version 1.0
 * @date 2013-01-15
 * @author guan.jianming
 */ 
@Repository
public class SheetCardRelevanceDAOImpl extends BaseDAOImpl implements ISheetCardRelevanceDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.SHEET_CARD_RELEVANCE_ID as sheetCardRelevanceId,A.CARD_SHEET_ID as cardSheetId,A.TESTOBJECT_TYPE as testobjectType,A.TESTOBJECT_ID as testobjectId,A.ARCHIVE_BASE_DATE as archiveBaseDate,A.CREATED_BY as createdBy,A.CREATION_DATE as creationDate,A.LAST_UPDATED_BY as lastUpdatedBy,A.LAST_UPDATE_DATE as lastUpdateDate,A.RECORD_VERSION as recordVersion,A.DELETED_FLAG as deletedFlag,A.DELETED_BY as deletedBy,A.DELETION_DATE as deletionDate,A.MARKETING_AREA_ID as marketingAreaId,A.MAINTENANCE_AREA_ID as maintenanceAreaId,A.ORG_ID as orgId,A.ATTRIBUTE1 as attribute1,A.ATTRIBUTE2 as attribute2,A.ATTRIBUTE3 as attribute3,A.ATTRIBUTE4 as attribute4,A.ATTRIBUTE5 as attribute5 ");
        sqlBuf.append(" from T_EOM_SHEET_CARD_RELEVANCE A ")
            .append(" where 1=1");
      
        return getJdbcTemplate().queryForList(sqlBuf.toString());
    } 
    
    @Override
    public List<Map<String, Object>> isAllowToSelectThisCards(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select scr.TESTOBJECT_ID as testobjectId,scr.TESTOBJECT_TYPE as testobjectType," +
        		"case scr.TESTOBJECT_TYPE when 1 then tci.NUMBER when 2 then tti.NUMBER when 3 then fti.NUMBER when 4 then rci.CARD_NUMBER end as number " +
        		" from T_EOM_SHEET_CARD_RELEVANCE scr " +
        		" left JOIN T_EOM_CARD_SHEET cs ON scr.CARD_SHEET_ID = cs.CARD_SHEET_ID " +
        		" left join T_EOM_TEST_CARD_INFO tci on scr.TESTOBJECT_ID=tci.TEST_CARD_ID " +
        		" left join T_EOM_RECH_CARD_INFO rci on scr.TESTOBJECT_ID=rci.RECH_CARD_ID " +
        		" left join T_EOM_FIXED_TELEPHON_INFO fti on scr.TESTOBJECT_ID=fti.FIXED_TEL_ID " +
        		" left join T_EOM_TEST_TERMINAL_INFO tti on scr.TESTOBJECT_ID=tti.TEST_TERMINAL_ID " +
        		" where cs.WO_STATUS_ENUM_ID in(2,5) and scr.DELETED_FLAG = 0 and cs.DELETED_FLAG = 0 ");
        
        if(jsonObj.has("idAndTypeLi")){
            JSONArray idAndTypeLi = (JSONArray) JsonUtil.get(jsonObj, "idAndTypeLi");
            JSONObject mm = new JSONObject();
            sqlBuf.append(" and( ");
            mm = (JSONObject) idAndTypeLi.get(0);
            sqlBuf.append(" (scr.TESTOBJECT_ID = "+JsonUtil.getString(mm, "id")+" and scr.TESTOBJECT_TYPE = "+JsonUtil.getString(mm, "type")+")  ");
            
            for(int i=1;i<idAndTypeLi.length();i++){
                mm = (JSONObject) idAndTypeLi.get(i);
                sqlBuf.append("or (scr.TESTOBJECT_ID = "+JsonUtil.getString(mm, "id")+" and scr.TESTOBJECT_TYPE = "+JsonUtil.getString(mm, "type")+")  ");
            }
            sqlBuf.append(" ) ");
//            AND ((scr.TESTOBJECT_ID IN (200067) and scr.TESTOBJECT_TYPE in(4)
//                    ) OR
//                    (scr.TESTOBJECT_ID IN (200067) and scr.TESTOBJECT_TYPE in(1)
//                    ))
            
//            sqlBuf.append(" and scr.TESTOBJECT_ID in("+JsonUtil.getString(jsonObj, "testobjectIds")+") ");
        }
        
        sqlBuf.append(" GROUP BY scr.TESTOBJECT_ID,scr.TESTOBJECT_TYPE ");
      
        return super.queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_SHEET_CARD_RELEVANCE(SHEET_CARD_RELEVANCE_ID,CARD_SHEET_ID,TESTOBJECT_TYPE,TESTOBJECT_ID,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?)");
        Long nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_SHEET_CARD_RELEVANCE", "SHEET_CARD_RELEVANCE_ID");
        Object[] args = {nextId,JsonUtil.get(jsonObj, "cardSheetId"),JsonUtil.get(jsonObj, "testobjectType"),JsonUtil.get(jsonObj, "testobjectId"),JsonUtil.get(jsonObj, "createdBy"),JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "marketingAreaId"),JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId") };
        super.update(sqlBuf.toString(), args);
    } 
    
    @Override
    public void savebatch(JSONArray sheetCardList) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jso;
        for(int i=0;i<sheetCardList.length();i++){
            jso = (JSONObject) sheetCardList.get(i);
            Long nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_SHEET_CARD_RELEVANCE", "SHEET_CARD_RELEVANCE_ID");
            Object obj[] = {nextId,JsonUtil.get(jso, "cardSheetId"),JsonUtil.get(jso, "testobjectType"),JsonUtil.get(jso, "testobjectId")
                    ,JsonUtil.get(jso, "archiveBaseDate"),JsonUtil.get(jso, "createdBy"),JsonUtil.get(jso, "creationDate")
                    ,JsonUtil.get(jso, "lastUpdatedBy"),JsonUtil.get(jso, "lastUpdateDate"),JsonUtil.get(jso, "marketingAreaId")
                    ,JsonUtil.get(jso, "maintenanceAreaId"),JsonUtil.get(jso, "orgId")};
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO  T_EOM_SHEET_CARD_RELEVANCE(SHEET_CARD_RELEVANCE_ID,CARD_SHEET_ID,TESTOBJECT_TYPE,TESTOBJECT_ID,ARCHIVE_BASE_DATE," +
        		"CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?)");
        
        getJdbcTemplate().batchUpdate(sqlBuf.toString(), list);
    }
    
    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_SHEET_CARD_RELEVANCE SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  CARD_SHEET_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),1,new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
        
        super.update(sqlBuf.toString(), args);
    }

    @Override
    public void deleteBatch(JSONArray jsonArray) throws Exception {
//        StringBuffer sqlBuf = new StringBuffer();
//        sqlBuf.append("UPDATE T_EOM_SHEET_CARD_RELEVANCE SET DELETED_BY = ?")
//            .append(", DELETED_FLAG = ?")
//            .append(", DELETION_DATE = ?")
//            .append(" WHERE  CARD_SHEET_ID= ? ");
//        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),1,new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
//        
//        super.update(sqlBuf.toString(), args);
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
            Object obj[] = {JsonUtil.get(jsonObj, "deletedBy"),1,new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
            
            list.add(obj);
        }
        
        sqlBuf.append("UPDATE T_EOM_SHEET_CARD_RELEVANCE SET DELETED_BY = ?")
        .append(", DELETED_FLAG = ?")
        .append(", DELETION_DATE = ?")
        .append(" WHERE  CARD_SHEET_ID= ? ");
        
        getJdbcTemplate().batchUpdate(sqlBuf.toString(), list);
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_SHEET_CARD_RELEVANCE SET LAST_UPDATE_DATE=now(),RECORD_VERSION=RECORD_VERSION+1 ");
        List<Object> list = new ArrayList<Object>();
        if(jsonObj.has("attribute1")){
            sqlBuf.append(" , ATTRIBUTE1 =? ");
            list.add(JsonUtil.get(jsonObj, "attribute1"));
        }
        
        sqlBuf.append(" where 1=1 ");
        if(jsonObj.has("cardSheetId")){
            sqlBuf.append(" and CARD_SHEET_ID =? ");
            list.add(JsonUtil.get(jsonObj, "cardSheetId"));
        }
        
        if(jsonObj.has("testobjectType")){
            sqlBuf.append(" and TESTOBJECT_TYPE =? ");
            list.add(JsonUtil.get(jsonObj, "testobjectType"));
        }
        
        if(jsonObj.has("testobjectId")){
            sqlBuf.append(" and TESTOBJECT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "testobjectId"));
        }
        
        
//        try {
            super.update(sqlBuf.toString(), list.toArray());
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
    } 

}  

