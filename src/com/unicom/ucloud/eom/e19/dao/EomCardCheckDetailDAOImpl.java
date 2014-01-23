package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 测试数据库层实现类 
 * @version 1.0
 * @date 2013-01-15
 * @author Jerry
 */ 
@Repository
public class EomCardCheckDetailDAOImpl extends BaseDAOImpl implements IEomCardCheckDetailDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.CHECK_DETAIL_ID as checkDetailId,A.CHECK_LIST_ID as checkListId,A.CARD_ID as cardId,A.NUMBER as number," +
        		"A.TESTOBJECT_TYPE as testobjectType,A.DIFFERENCE_SORT_ENUM_Id as differenceSortEnumId," +
        		"A.DIFFERENCE_TYPE_ENUM_ID as differenceTypeEnumId,A.CURRENT_STATUS as currentStatus,A.PERSON_CURRENT_TO_ID as personCurrentToId," +
        		"A.DIFFERENCES_REMARKS as differencesRemarks,A.ARCHIVE_BASE_DATE as archiveBaseDate,A.CREATED_BY as createdBy," +
        		"A.CREATION_DATE as creationDate,A.LAST_UPDATED_BY as lastUpdatedBy,A.LAST_UPDATE_DATE as lastUpdateDate," +
        		"A.RECORD_VERSION as recordVersion,A.DELETED_FLAG as deletedFlag,A.DELETED_BY as deletedBy,A.DELETION_DATE as deletionDate," +
        		"A.MARKETING_AREA_ID as marketingAreaId,A.MAINTENANCE_AREA_ID as maintenanceAreaId,A.ORG_ID as orgId,A.ATTRIBUTE1 as attribute1," +
        		"case DIFFERENCE_TYPE_ENUM_ID when 1 then '所属权变更' when 2 then '状态变更' when 3 then '借出未登记' when 4 then '归还未登记' else ''" +
        		" end as differenceTypeEnumName,"+
        		"case when DIFFERENCE_TYPE_ENUM_ID in(2) then (case CURRENT_STATUS when 1 then '正常' when 2 then '故障' when 3 then '报废' when 4 then '送修' when 5 then '欠费停机' when 6 then 'SIM卡注册失败' else ''" +
        		" end) when DIFFERENCE_TYPE_ENUM_ID in(1,3,4) then ATTRIBUTE1 else '' end as differentDetail,"+
                "A.ATTRIBUTE2 as attribute2,A.ATTRIBUTE3 as attribute3,A.ATTRIBUTE4 as attribute4,A.ATTRIBUTE5 as attribute5 ");
        sqlBuf.append(" from T_EOM_CARD_CHECK_DETAIL A ")
            .append(" WHERE A.DELETED_FLAG = 0 ");
               
        if(JsonUtil.get(jsonObj, "checkDetailId") != null){
            sqlBuf.append(" AND A.CHECK_DETAIL_ID =").append(JsonUtil.get(jsonObj, "checkDetailId"));
        }
        if(JsonUtil.get(jsonObj, "checkListId") != null){
            sqlBuf.append(" AND A.CHECK_LIST_ID =").append(JsonUtil.get(jsonObj, "checkListId"));
        }
        if(JsonUtil.get(jsonObj, "differenceSortEnumId") != null){
            sqlBuf.append(" AND A.DIFFERENCE_SORT_ENUM_Id =").append(JsonUtil.get(jsonObj, "differenceSortEnumId"));
        }
        if(JsonUtil.get(jsonObj, "testobjectType") != null){
            sqlBuf.append(" AND A.TESTOBJECT_TYPE =").append(JsonUtil.get(jsonObj, "testobjectType"));
        }
        
        return super.queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_CARD_CHECK_DETAIL(CHECK_DETAIL_ID,CHECK_LIST_ID,CARD_ID,NUMBER,TESTOBJECT_TYPE,DIFFERENCES_SORT,DIFFERENCES_TYPE,CURRENT_STATUS,PERSON_CURRENT_TO_ID,DIFFERENCES_REMARKS,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "checkDetailId"),JsonUtil.get(jsonObj, "checkListId"),JsonUtil.get(jsonObj, "cardId"),JsonUtil.get(jsonObj, "number"),JsonUtil.get(jsonObj, "testobjectType"),JsonUtil.get(jsonObj, "differencesSort"),JsonUtil.get(jsonObj, "differencesType"),JsonUtil.get(jsonObj, "currentStatus"),JsonUtil.get(jsonObj, "personCurrentToId"),JsonUtil.get(jsonObj, "differencesRemarks"),JsonUtil.get(jsonObj, "createdBy"),JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "recordVersion"),JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "marketingAreaId"),JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId") };
        super.update(sqlBuf.toString(), args);
    } 
    
    @Override
    public void saveBath(JSONArray jsonArray,Long checkListId) throws Exception {
        
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        Long nextId = new Long(0);
        
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
            try {
                nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_CARD_CHECK_DETAIL", "CHECK_DETAIL_ID");
            } catch (Exception e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            Object[] obj = {nextId,checkListId,JsonUtil.get(jsonObj, "cardId"),
                    JsonUtil.get(jsonObj, "number"),JsonUtil.get(jsonObj, "testobjectType"),JsonUtil.get(jsonObj, "differenceSortEnumId"),
                    JsonUtil.get(jsonObj, "differenceTypeEnumId"),JsonUtil.get(jsonObj, "currentStatus"),JsonUtil.get(jsonObj, "personCurrentToId"),
                    JsonUtil.get(jsonObj, "differencesRemarks"),JsonUtil.get(jsonObj, "createdBy"),
                    new Date(),JsonUtil.get(jsonObj, "lastUpdatedBy"),new Date(),
                    new Date(),JsonUtil.get(jsonObj, "marketingAreaId"),JsonUtil.get(jsonObj, "maintenanceAreaId"),
                    JsonUtil.get(jsonObj, "orgId"),JsonUtil.get(jsonObj, "differentDetail"),JsonUtil.get(jsonObj, "attribute2"),
                    JsonUtil.get(jsonObj, "attribute3"),JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5") };
            
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO  T_EOM_CARD_CHECK_DETAIL(CHECK_DETAIL_ID,CHECK_LIST_ID,CARD_ID,NUMBER,TESTOBJECT_TYPE," +
        		"DIFFERENCE_SORT_ENUM_ID,DIFFERENCE_TYPE_ENUM_ID,CURRENT_STATUS,PERSON_CURRENT_TO_ID,DIFFERENCES_REMARKS," +
        		"CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,DELETION_DATE,MARKETING_AREA_ID," +
        		"MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5) ")
        .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        
        super.batchUpdate(sqlBuf.toString(), list);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_CHECK_DETAIL SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?,")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  CHECK_DETAIL_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "checkDetailId")};
        super.update(sqlBuf.toString(), args);
    } 
    
    @Override
    public void deleteByCheckListId(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_CHECK_DETAIL SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  CHECK_LIST_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "checkListId")};
        super.update(sqlBuf.toString(), args);
    } 
    
    @Override
    public void deleteBatchByCheckListId(JSONArray jsonArray) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
            Object obj[] = {JsonUtil.get(jsonObj, "deletedBy"),new Date(),JsonUtil.get(jsonObj, "checkListId")};
            
            list.add(obj);
        }
        
        sqlBuf.append("UPDATE T_EOM_CARD_CHECK_DETAIL SET DELETED_BY = ?")
        .append(", DELETED_FLAG = 1")
        .append(", DELETION_DATE = ?")
        .append(" WHERE  CHECK_LIST_ID= ? ");
        
        super.batchUpdate(sqlBuf.toString(), list);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_CHECK_DETAIL  SET  ")
        .append(" CARD_ID=?,")
        .append(" NUMBER=?,")
        .append(" DIFFERENCES_SORT=?,")
        .append(" DIFFERENCES_TYPE=?,")
        .append(" CURRENT_STATUS=?,")
        .append(" PERSON_CURRENT_TO_ID=?,")
        .append(" DIFFERENCES_REMARKS=?,")
        .append(" LAST_UPDATED_BY=?,")
        .append(" LAST_UPDATE_DATE=?");
        
        sqlBuf.append(" WHERE CHECK_DETAIL_ID=?");
        Object[] args ={
                JsonUtil.get(jsonObj, "cardId"),JsonUtil.get(jsonObj, "number"),JsonUtil.get(jsonObj, "differencesSort"),JsonUtil.get(jsonObj, "differencesType"),JsonUtil.get(jsonObj, "currentStatus"),JsonUtil.get(jsonObj, "personCurrentToId"),JsonUtil.get(jsonObj, "differencesRemarks"),JsonUtil.get(jsonObj, "lastUpdatedBy"),JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "checkDetailId")
        };
        super.update(sqlBuf.toString(), args);
    } 

}  

