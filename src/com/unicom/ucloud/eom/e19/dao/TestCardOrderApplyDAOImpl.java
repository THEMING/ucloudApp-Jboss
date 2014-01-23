package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
@Repository
public class TestCardOrderApplyDAOImpl extends BaseDAOImpl implements ITestCardOrderApplyDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) {
        try {
            return super.queryForList(getEomCardSheetSql(jsonObj).toString());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ArrayList();
    }

    public Page qryEomCardSheetPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(getEomCardSheetSql(jsonObj).toString(),jsonObj);
    }
    
    public List qryMustReturnTestCard(JSONObject jsonObj) throws Exception {
        
        StringBuffer sqlBuf = new StringBuffer();//,DELETION_DATE as deletionDate，SHEET_STATUS，sheetStatus，SHEET_TYPE,sheetType,AUDIT_MAN,auditMan，EXECUTE_MAN，executeMan,ACCEPT_MAN，acceptMan
        sqlBuf.append("select '测试卡' as testobjectName," +
        		"NUMBER as number," +
        		"1 as testobjectType," +
        		"ATTRIBUTION_PROVINCE_ID as attributionProvinceId," +
        		"ATTRIBUTION_PROVINCE_NAME as attributionProvinceName," +
        		"ADMIN_ID as adminId," +
        		"TEST_CARD_ID as testobjectId," +
        		"PLAN_RETURN_TIME as planReturnTime," +
        		"ADMIN_NAME AS adminName  from t_eom_test_card_info" +
        		" where DELETED_FLAG=0 ");
        
        if(JsonUtil.getString(jsonObj,"lenderId")!=null&&!"".equals(JsonUtil.getString(jsonObj,"lenderId"))){
            sqlBuf.append(" and LENDER_ID in ("+JsonUtil.getString(jsonObj,"lenderId")+") ");
        }
        
        sqlBuf.append("UNION select '测试终端' as testobjectName," +
                "NUMBER as number," +
                "2 as testobjectType," +
                "ATTRIBUTION_PROVINCE_ID as attributionProvinceId," +
                "ATTRIBUTION_PROVINCE_NAME as attributionProvinceName," +
                "ADMIN_ID as adminId," +
                "TEST_TERMINAL_ID as testobjectId," +
                "PLAN_RETURN_TIME as planReturnTime," +
                "ADMIN_NAME AS adminName  from t_eom_test_terminal_info" +
                " where DELETED_FLAG=0 ");
        
        if(JsonUtil.getString(jsonObj,"lenderId")!=null&&!"".equals(JsonUtil.getString(jsonObj,"lenderId"))){
            sqlBuf.append(" and LENDER_ID in ("+JsonUtil.getString(jsonObj,"lenderId")+") ");
        }
        
        sqlBuf.append("UNION select '固定电话' as testobjectName," +
                "NUMBER as number," +
                "3 as testobjectType," +
                "ATTRIBUTION_PROVINCE_ID as attributionProvinceId," +
                "ATTRIBUTION_PROVINCE_NAME as attributionProvinceName," +
                "ADMIN_ID as adminId," +
                "FIXED_TEL_ID as testobjectId," +
                "PLAN_RETURN_TIME as planReturnTime," +
                "ADMIN_NAME AS adminName  from t_eom_fixed_telephon_info" +
                " where DELETED_FLAG=0 ");
        
        if(JsonUtil.getString(jsonObj,"lenderId")!=null&&!"".equals(JsonUtil.getString(jsonObj,"lenderId"))){
            sqlBuf.append(" and LENDER_ID in ("+JsonUtil.getString(jsonObj,"lenderId")+") ");
        }
        
        sqlBuf.append("UNION select '充值卡' as testobjectName," +
                "CARD_NUMBER as number," +
                "4 as testobjectType," +
                "ATTRIBUTION_PROVINCE_ID as attributionProvinceId," +
                "ATTRIBUTION_PROVINCE_NAME as attributionProvinceName," +
                "ADMIN_ID as adminId," +
                "RECH_CARD_ID as testobjectId," +
                "PLAN_RETURN_TIME as planReturnTime," +
                "ADMIN_NAME AS adminName  from t_eom_rech_card_info" +
                " where DELETED_FLAG=0 ");
        
        if(JsonUtil.getString(jsonObj,"lenderId")!=null&&!"".equals(JsonUtil.getString(jsonObj,"lenderId"))){
            sqlBuf.append(" and LENDER_ID in ("+JsonUtil.getString(jsonObj,"lenderId")+") ");
        }
        
        return super.queryForList(sqlBuf.toString());
    }
    
    public StringBuffer getEomCardSheetSql(JSONObject jsonObj) {
        StringBuffer sqlBuf = new StringBuffer();//,DELETION_DATE as deletionDate，SHEET_STATUS，sheetStatus，SHEET_TYPE,sheetType,AUDIT_MAN,auditMan，EXECUTE_MAN，executeMan,ACCEPT_MAN，acceptMan
        sqlBuf.append("SELECT A.CARD_SHEET_ID as cardSheetId,B.PROCESS_INSTANCE_ID as processInstanceId,A.SHEET_THEME as sheetTheme,A.SHEET_SERIAL_NUMBER as sheetSerialNumber," +//fopir.PROCESS_INSTANCE_ID as processInstanceId,
                "A.WO_STATUS_ENUM_ID as woStatusEnumId,A.LOCALE_ID as localeId,A.COMPANY_NAME as companyName,A.DISPATCH_DATE as dispatchDate," +
                "A.REQUIRED_FINISH_TIME as requiredFinishTime,A.CARD_OPERATION_TYPE_ENUM_ID as cardOperationTypeEnumId,A.EXPECTED_RETURN_TIME as expectedReturnTime," +
                "A.CONTENT as content,A.REMARKS as remarks,A.FINISH_TIME as finishTime," +
                "A.AUDIT_DEPARTMENT_ID as auditDepartmentId,A.AUDIT_PERSON_ID as auditPersonId,A.EXECUTE_DEPARTMENT_ID as executeDepartmentId," +
                "A.EXECUTE_PERSON_ID as executePersonId,A.ACCEPT_DEPARTMENT_ID as acceptDepartmentId,A.ACCEPT_PERSON_ID as acceptPersonId,IFNULL(A.DEAL_GROUP_ID,A.DEAL_MAN_ID) as dealGroupOrMan,A.DEAL_GROUP_ID as dealGroupId," +
                "A.DEAL_MAN_ID as dealManId,A.CREATED_BY as createdBy,A.CREATED_BY_NAME as createdByName,A.CREATION_DATE as creationDate," +//,A.ARCHIVE_BASE_DATE as archiveBaseDate
                "A.LAST_UPDATED_BY as lastUpdatedBy,A.LAST_UPDATE_DATE as lastUpdateDate,A.RECORD_VERSION as recordVersion,A.DELETED_FLAG as deletedFlag," +
                "A.DELETED_BY as deletedBy,A.MARKETING_AREA_ID as marketingAreaId,A.MAINTENANCE_AREA_ID as maintenanceAreaId," +
                "A.ORG_ID as orgId,A.ATTRIBUTE1 as attribute1,A.ATTRIBUTE2 as attribute2,A.ATTRIBUTE3 as attribute3,A.ATTRIBUTE4 as attribute4," +
                "A.ATTRIBUTE5 as attribute5,A.CARD_OPERATION_TYPE_ENUM_ID as sheetType," +
                "case A.CARD_OPERATION_TYPE_ENUM_ID when '2' then '移交' when '5' then '报废' when '3' then '借用' when '1' then '调拨' when '4' then '归还' when '6' then '清查' else '' end as sheetTypeName," +
//                "case CURRENT_NODE when 1 then '申请' when 2 then '执行' when 3 then '审核' when 4 then '接收' else '' end as currentNodeName," +
                "case A.WO_STATUS_ENUM_ID when 1 then '草稿' when 2 then '处理中' when 3 then '已撤销' when 4 then '已挂起' when 5 then '已驳回' when 6 then '已完成' when 7 then '已归档' else '' end as sheetStatusName, " +
//                "case A.CARD_OPERATION_TYPE_ENUM_ID when '2' then '测试卡移交' when '5' then '测试卡报废' when '3' then '测试卡借用' when '1' then '测试卡调拨' when '4' then '测试卡归还' when '6' then '测试卡清查' else '' end as sheetTypeName," +
//              "case CURRENT_NODE when 1 then '申请' when 2 then '执行' when 3 then '审核' when 4 then '接收' else '' end as currentNodeName," +
              "case A.WO_STATUS_ENUM_ID when 1 then '草稿' when 2 then '处理中' when 3 then '已撤销' when 4 then '已挂起' when 5 then '已驳回' when 6 then '已完成' when 7 then '已归档' else '' end as woStatusEnumName, " +
              "case A.URGENCY_LEVEL_ENUM_ID when 1 then '一般' when 3 then '特急' when 2 then '紧急' else '' end as urgencyLevel, " +
              "A.URGENCY_LEVEL_ENUM_ID as urgencyLevelId " +
                "FROM T_EOM_CARD_SHEET A " +
                " left join T_EOM_FLOWING_OBJ_PROC_INS_REL B on A.CARD_SHEET_ID = B.FLOWING_OBJECT_ID AND B.FLOWING_OBJECT_TABLE='T_EOM_CARD_SHEET' AND B.DELETED_FLAG = 0" +
                " where 1=1 ");// left join T_EOM_FLOWING_OBJ_PROC_INS_REL fopir on T_EOM_CARD_SHEET.CARD_SHEET_ID=fopir.FLOWING_OBJECT_ID and fopir.FLOWING_OBJECT_TABLE='T_EOM_CARD_SHEET'
        try {
            if(JsonUtil.getString(jsonObj,"ignoreDeletedDlag")!=null&&!"".equals(JsonUtil.getString(jsonObj,"ignoreDeletedDlag"))&&"1".equals(JsonUtil.getString(jsonObj,"ignoreDeletedDlag"))){
                
            }else{
                sqlBuf.append(" and A.DELETED_FLAG = 0  ");
            }
            if(JsonUtil.getString(jsonObj,"selectIds")!=null&&!"".equals(JsonUtil.getString(jsonObj,"selectIds"))){
                sqlBuf.append(" and A.CARD_SHEET_ID in ("+JsonUtil.getString(jsonObj,"selectIds")+") ");
            }
            if(JsonUtil.getString(jsonObj,"sheetSerialNumberQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"sheetSerialNumberQry"))){
                sqlBuf.append(" and A.SHEET_SERIAL_NUMBER like '%"+JsonUtil.getString(jsonObj,"sheetSerialNumberQry")+"%' ");
            }
            if(JsonUtil.getString(jsonObj,"sheetThemeQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"sheetThemeQry"))){
                sqlBuf.append(" and A.SHEET_THEME like '%"+JsonUtil.getString(jsonObj,"sheetThemeQry")+"%' ");
            }
            if(JsonUtil.getString(jsonObj,"cardOperationTypeEnumIdQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"cardOperationTypeEnumIdQry"))){
                sqlBuf.append(" and A.CARD_OPERATION_TYPE_ENUM_ID ='"+JsonUtil.getString(jsonObj,"cardOperationTypeEnumIdQry")+"' ");
            }
            if(JsonUtil.getString(jsonObj,"currentNode")!=null&&!"".equals(JsonUtil.getString(jsonObj,"currentNode"))){
                sqlBuf.append(" and A.CURRENT_NODE ='"+JsonUtil.getString(jsonObj,"currentNode")+"' ");
            }
            if(JsonUtil.getString(jsonObj,"woStatusEnumId")!=null&&!"".equals(JsonUtil.getString(jsonObj,"woStatusEnumId"))){
                sqlBuf.append(" and A.WO_STATUS_ENUM_ID ='"+JsonUtil.getString(jsonObj,"woStatusEnumId")+"' ");
            }
            if(JsonUtil.getString(jsonObj,"creationStartDate")!=null&&!"".equals(JsonUtil.getString(jsonObj,"creationStartDate"))){
                sqlBuf.append(" and UNIX_TIMESTAMP(A.CREATION_DATE) >UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"creationStartDate")+"') ");
            }
            if(JsonUtil.getString(jsonObj,"creationEndDate")!=null&&!"".equals(JsonUtil.getString(jsonObj,"creationEndDate"))){
                sqlBuf.append(" and UNIX_TIMESTAMP(A.CREATION_DATE) <UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"creationEndDate")+"') ");
            }
            if(JsonUtil.getString(jsonObj,"dealMan")!=null&&!"".equals(JsonUtil.getString(jsonObj,"dealMan"))){
                sqlBuf.append(" and A.DEAL_MAN_ID ='"+JsonUtil.getString(jsonObj,"dealMan")+"' ");
            }
            if(JsonUtil.get(jsonObj,"cardSheetId")!=null && !"".equals(JsonUtil.get(jsonObj,"cardSheetId"))){
                sqlBuf.append(" and A.CARD_SHEET_ID ='"+JsonUtil.getLong(jsonObj,"cardSheetId")+"' ");
            }
            if(JsonUtil.getString(jsonObj,"orgId")!=null&&!"".equals(JsonUtil.getString(jsonObj,"orgId"))){
                sqlBuf.append(" and A.ORG_ID ='"+JsonUtil.getString(jsonObj,"orgId")+"' ");
            }
            if(JsonUtil.getString(jsonObj,"createdBy")!=null&&!"".equals(JsonUtil.getString(jsonObj,"createdBy"))){
                sqlBuf.append(" and A.CREATED_BY ='"+JsonUtil.getString(jsonObj,"createdBy")+"' ");
            }
            if(JsonUtil.getString(jsonObj,"createdByQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"createdByQry"))){
                sqlBuf.append(" and A.CREATED_BY ='"+JsonUtil.getString(jsonObj,"createdByQry")+"' ");
            }
            /*用于测试卡调拨历史查询*/
            if (JsonUtil.getString(jsonObj, "testobjectTypeEnumId") != null
                    && jsonObj.getString("testobjectTypeEnumId").length() > 0) {
                sqlBuf.append(" and A.CARD_SHEET_ID IN ( ");
                sqlBuf.append(" SELECT CARD_SHEET_ID FROM T_EOM_SHEET_CARD_RELEVANCE SC ");
                sqlBuf.append(" WHERE SC.DELETED_FLAG = 0 ");
                sqlBuf.append(" and SC.TESTOBJECT_TYPE='"
                        + JsonUtil.get(jsonObj, "testobjectTypeEnumId") + "' ");
                sqlBuf.append(" and SC.TESTOBJECT_ID ='" + JsonUtil.get(jsonObj, "cardId") + "'");
                sqlBuf.append(" ) ");
            }
            sqlBuf.append(" ORDER BY creationDate DESC");
            
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return sqlBuf;
    }

    @Override
    public Long addTestCardOrderApply(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO T_EOM_CARD_SHEET(CARD_SHEET_ID, SHEET_THEME, SHEET_SERIAL_NUMBER, WO_STATUS_ENUM_ID, LOCALE_ID, COMPANY_ID,COMPANY_NAME, " +
                "DISPATCH_DATE, REQUIRED_FINISH_TIME, CARD_OPERATION_TYPE_ENUM_ID, EXPECTED_RETURN_TIME, CONTENT, REMARKS,   AUDIT_DEPARTMENT_ID, " +
                "AUDIT_PERSON_ID, EXECUTE_DEPARTMENT_ID, EXECUTE_PERSON_ID,   CREATED_BY, CREATED_BY_NAME,CREATION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID," +
                "LAST_UPDATED_BY,ARCHIVE_BASE_DATE,LAST_UPDATE_DATE,FINISH_TIME,ATTRIBUTE1,URGENCY_LEVEL_ENUM_ID) ")
            .append(" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ? ,?,?,?,?,?)");
        Long nextId = null;
        
            nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_CARD_SHEET", "CARD_SHEET_ID");
        
        Object[] args = {nextId, JsonUtil.getString(jsonObj, "sheetTheme")==null?"":JsonUtil.getString(jsonObj, "sheetTheme"),JsonUtil.getString(jsonObj, "sheetSerialNumber")
                ,JsonUtil.getString(jsonObj, "woStatusEnumId"),JsonUtil.getString(jsonObj, "localeId"),JsonUtil.getString(jsonObj, "companyId"),JsonUtil.getString(jsonObj, "companyName")
                ,JsonUtil.getString(jsonObj, "dispatchDate"),JsonUtil.getString(jsonObj, "requiredFinishTime"),JsonUtil.getString(jsonObj, "cardOperationTypeEnumId")
                ,JsonUtil.getString(jsonObj, "expectedReturnTime"),JsonUtil.getString(jsonObj, "content")==null?"":JsonUtil.getString(jsonObj, "content"),JsonUtil.getString(jsonObj, "remarks")
                ,JsonUtil.getString(jsonObj, "auditDepartmentId"),JsonUtil.getString(jsonObj, "auditPersonId")
                ,JsonUtil.getString(jsonObj, "executeDepartmentId"),JsonUtil.getString(jsonObj, "executePersonId"),JsonUtil.getString(jsonObj, "createdBy")
                ,JsonUtil.getString(jsonObj, "createdByName")
                ,JsonUtil.getString(jsonObj, "creationDate"),JsonUtil.getString(jsonObj, "marketingAreaId"),JsonUtil.getString(jsonObj, "maintenanceAreaId")
                ,JsonUtil.getString(jsonObj, "orgId"),JsonUtil.getString(jsonObj, "lastUpdatedBy"),new Date()
                ,new Date(),JsonUtil.getString(jsonObj, "finishTime"),JsonUtil.getString(jsonObj, "attribute1")==null?"":JsonUtil.getString(jsonObj, "attribute1")
                ,JsonUtil.getString(jsonObj, "urgencyLevel")==null?"":JsonUtil.getString(jsonObj, "urgencyLevel")};
        
            super.update(sqlBuf.toString(), args);
       
        return nextId;
        
    }
    
    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET DELETED_BY = ?")
            .append(", DELETED_FLAG = 1")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  CARD_SHEET_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
        
        super.update(sqlBuf.toString(), args);
    }
    
    @Override
    public void deleteBatch(JSONArray jsonArray) throws Exception {
//        StringBuffer sqlBuf = new StringBuffer();
//        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET DELETED_BY = ?")
//            .append(", DELETED_FLAG = 1")
//            .append(", DELETION_DATE = ?")
//            .append(" WHERE  CARD_SHEET_ID= ? ");
//        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
//        
//        super.update(sqlBuf.toString(), args);
        
        
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj = null;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
            Object obj[] = {JsonUtil.get(jsonObj, "cardSheetId")};
//            Object obj[] = {JsonUtil.get(jsonObj, "deletedBy"),new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
            list.add(obj);
        }
        
//        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET DELETED_BY = ? ")
        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET ")
        .append(" WO_STATUS_ENUM_ID = 1");
        if(JsonUtil.get(jsonObj, "deletedFlag")!=null&&JsonUtil.getString(jsonObj, "deletedFlag").length()!=0){
            sqlBuf.append(", DELETED_FLAG = 1 ");
        }
     //   .append(", DELETED_FLAG = 1")
     //   .append(", DELETION_DATE = ?")
            sqlBuf.append(" WHERE  CARD_SHEET_ID= ? ");
        
        getJdbcTemplate().batchUpdate(sqlBuf.toString(), list);
        
    }

    @Override
    public List<Map<String, Object>> qryAtestCardOrder(JSONObject jsonObj) {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT CARD_SHEET_ID as cardSheetId,SHEET_SERIAL_NUMBER as sheetSerialNumber," +
                "SHEET_TYPE as sheetType,IFNULL(DEAL_GROUP_ID,DEAL_MAN_ID) as dealGroupOrMan,DEAL_GROUP_ID as dealGroup,DEAL_MAN_ID as dealMan,REQUIRED_FINISH_TIME as requiredFinishTime," +
                "FINISH_TIME as finishTime,DISPATCH_DATE as dispatchDate,SHEET_STATUS as sheetStatus " +
                "FROM T_EOM_CARD_SHEET where 1=1 and DELETED_FLAG = 0 ");
        try {
            if(jsonObj.getString("sheetSerialNumber")!=null&&!"".equals(jsonObj.getString("sheetSerialNumber"))){
                sqlBuf.append("and SHEET_SERIAL_NUMBER ='"+jsonObj.getString("sheetSerialNumber")+"' ");
            }
            if(jsonObj.getString("currentNode")!=null&&!"".equals(jsonObj.getString("currentNode"))){
                sqlBuf.append("and CURRENT_NODE ='"+jsonObj.getString("currentNode")+"' ");
            }
            if(jsonObj.getString("sheetStatus")!=null&&!"".equals(jsonObj.getString("sheetStatus"))){
                sqlBuf.append("and SHEET_STATUS ='"+jsonObj.getString("sheetStatus")+"' ");
            }
            if(jsonObj.getString("dispatchStartDate")!=null&&!"".equals(jsonObj.getString("dispatchStartDate"))){
                sqlBuf.append("and UNIX_TIMESTAMP(DISPATCH_DATE) >UNIX_TIMESTAMP('"+jsonObj.getString("dispatchStartDate")+"') ");
            }
            if(jsonObj.getString("dispatchEndDate")!=null&&!"".equals(jsonObj.getString("dispatchEndDate"))){
                sqlBuf.append("and UNIX_TIMESTAMP(DISPATCH_DATE) <UNIX_TIMESTAMP('"+jsonObj.getString("dispatchEndDate")+"') ");
            }
            if(jsonObj.getString("dealMan")!=null&&!"".equals(jsonObj.getString("dealMan"))){
                sqlBuf.append("and DEAL_MAN_ID ='"+jsonObj.getString("dealMan")+"' ");
            }
            
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return getJdbcTemplate().queryForList(sqlBuf.toString());
    }
    
    @Override
    public void updateTestCardOrder(JSONObject jsonObj) throws JSONException {
//        StringBuffer sqlBuf = new StringBuffer();
//        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET  EXPECTED_RETURN_TIME=?,SHEET_THEME=?,     " +
//                " REQUIRED_FINISH_TIME=?, CARD_OPERATION_TYPE_ENUM_ID=?,  CONTENT=?, REMARKS=?,   AUDIT_DEPARTMENT_ID=?, " +
//                "AUDIT_PERSON_ID=?, EXECUTE_DEPARTMENT_ID=?, EXECUTE_PERSON_ID=?,   MARKETING_AREA_ID=?,MAINTENANCE_AREA_ID=?,ORG_ID=?," +
//                "LAST_UPDATED_BY=? ,LAST_UPDATE_DATE=now() ,RECORD_VERSION=RECORD_VERSION+1 where CARD_SHEET_ID = ?");
//        Object[] args = {JsonUtil.getString(jsonObj, "expectedReturnTime"),JsonUtil.getString(jsonObj, "sheetTheme")
//                ,JsonUtil.getString(jsonObj, "requiredFinishTime"),JsonUtil.getString(jsonObj, "cardOperationTypeEnumId")
//                ,JsonUtil.getString(jsonObj, "content"),JsonUtil.getString(jsonObj, "remarks")
//                ,JsonUtil.getString(jsonObj, "auditDepartmentId"),JsonUtil.getString(jsonObj, "auditPersonId")
//                ,JsonUtil.getString(jsonObj, "executeDepartmentId"),JsonUtil.getString(jsonObj, "executePersonId")
//                ,JsonUtil.getString(jsonObj, "marketingAreaId"),JsonUtil.getString(jsonObj, "maintenanceAreaId")
//                ,JsonUtil.getString(jsonObj, "orgId"),JsonUtil.getString(jsonObj, "lastUpdatedBy")
//                ,JsonUtil.getLong(jsonObj, "cardSheetId")
//                };
//        try {
//            super.update(sqlBuf.toString(), args);
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
        
        System.out.println("=================dispatchDate==============="+JsonUtil.get(jsonObj, "dispatchDate"));
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET LAST_UPDATE_DATE=now(),RECORD_VERSION=RECORD_VERSION+1 ");
        List<Object> list = new ArrayList<Object>();
        if(jsonObj.has("expectedReturnTime")){
            sqlBuf.append(" , EXPECTED_RETURN_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "expectedReturnTime"));
        }
        if(jsonObj.has("dispatchDate")){
            sqlBuf.append(" , DISPATCH_DATE =? ");
            list.add(JsonUtil.get(jsonObj, "dispatchDate"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            sqlBuf.append(" , SHEET_SERIAL_NUMBER =? ");
            list.add(JsonUtil.get(jsonObj, "sheetSerialNumber"));
        }
        if(jsonObj.has("sheetTheme")){
            sqlBuf.append(" , SHEET_THEME =? ");
            list.add(JsonUtil.get(jsonObj, "sheetTheme")==null?"":JsonUtil.get(jsonObj, "sheetTheme"));
        }
        if(jsonObj.has("requiredFinishTime")){
            sqlBuf.append(" , REQUIRED_FINISH_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "requiredFinishTime"));
        }
        if(jsonObj.has("cardOperationTypeEnumId")){
            sqlBuf.append(" , CARD_OPERATION_TYPE_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "cardOperationTypeEnumId"));
        }
        if(jsonObj.has("woStatusEnumId")){
            sqlBuf.append(" , WO_STATUS_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "woStatusEnumId"));
        }
        if(jsonObj.has("content")){
            sqlBuf.append(" , CONTENT =? ");
            list.add(JsonUtil.get(jsonObj, "content")==null?"":JsonUtil.get(jsonObj, "content"));
        }
        if(jsonObj.has("remarks")){
            sqlBuf.append(" , REMARKS =? ");
            list.add(JsonUtil.get(jsonObj, "remarks"));
        }
        if(jsonObj.has("auditDepartmentId")){
            sqlBuf.append(" , AUDIT_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "auditDepartmentId"));
        }
        if(jsonObj.has("auditPersonId")){
            sqlBuf.append(" , AUDIT_PERSON_ID =? ");
            list.add(JsonUtil.get(jsonObj, "auditPersonId"));
        }
        if(jsonObj.has("executeDepartmentId")){
            sqlBuf.append(" , EXECUTE_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "executeDepartmentId"));
        }
        if(jsonObj.has("executePersonId")){
            sqlBuf.append(" , EXECUTE_PERSON_ID =? ");
            list.add(JsonUtil.get(jsonObj, "executePersonId"));
        }
        if(jsonObj.has("marketingAreaId")){
            sqlBuf.append(" , MARKETING_AREA_ID =? ");
            list.add(JsonUtil.get(jsonObj, "marketingAreaId"));
        }
        if(jsonObj.has("maintenanceAreaId")){
            sqlBuf.append(" , MAINTENANCE_AREA_ID =? ");
            list.add(JsonUtil.get(jsonObj, "maintenanceAreaId"));
        }
        if(jsonObj.has("orgId")){
            sqlBuf.append(" , ORG_ID =? ");
            list.add(JsonUtil.get(jsonObj, "orgId"));
        }
        if(jsonObj.has("lastUpdatedBy")){
            sqlBuf.append(" , LAST_UPDATED_BY =? ");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
        }
        if(jsonObj.has("finishTime")){
            sqlBuf.append(" , FINISH_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "finishTime"));
        }
        if(jsonObj.has("attribute1")){
            sqlBuf.append(" , ATTRIBUTE1 =? ");
            list.add(JsonUtil.get(jsonObj, "attribute1"));
        }
        if(jsonObj.has("urgencyLevel")){
            sqlBuf.append(" , URGENCY_LEVEL_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "urgencyLevel"));
        }
        
        sqlBuf.append(" where 1=1 ");
        if(jsonObj.has("cardSheetId")){
            sqlBuf.append(" and CARD_SHEET_ID =? ");
            list.add(JsonUtil.get(jsonObj, "cardSheetId"));
        }
        try {
            super.update(sqlBuf.toString(), list.toArray());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }

    @Override
    public List<Map<String, Object>> qryAtestCardOrderTestCard(JSONObject jsonObj) {
        StringBuffer sqlBuf = new StringBuffer();
//        sqlBuf.append("select TEST_CARD_ID AS testCardId,  TESTCARD_TYPE_ENUM_ID AS testcardTypeEnumId,  " +
//                "  OPERATOR_ENUM_ID AS operatorEnumId,  " +
//                "CARD_NETWORK_TYPE_ENUM_ID AS cardNetworkTypeEnumId,  ATTRIBUTION_COUNTRY_ID AS attributionCountryId,  " +
//                "ATTRIBUTION_PROVINCE_ID AS attributionProvinceId,  ATTRIBUTION_CITY_ID AS attributionCityId,  ATTRIBUTION_SCP AS attributionScp, " +
//                " SCP_MANUFACTURER AS scpManufacturer,  EFFECTIVE_DATE AS effectiveDate,  ATTRIBUTION_HLR AS attributionHlr, " +
//                " HLR_MANUFACTURER AS hlrManufacturer,  CANCEL_DATE AS cancelDate,  PIN1 AS pin1,  PIN2 AS pin2,  LAST_TEST_DATE AS lastTestDate, " +
//                " PUK1 AS puk1,  PUK2 AS puk2,  WARE_MAN_ID AS wareManId,  PACKAGE_TYPE_ENUM_ID AS packageTypeEnumId, " +
//                " ATTCH_PACKAGE_ENUM_ID AS attchPackageEnumId,  STORAGE_DEPARTMENT_ID AS storageDepartmentId,  MONTH_GRANTS AS monthGrants," +
//                "  WHETHER_PREPAID AS whetherPrepaid,  ADMIN_ID AS adminId,  STORAGE_PLACE AS storagePlace,  CARD_USE AS cardUse,  REMARKS AS remarks, " +
//                " CARD_NO AS cardNo,  IMSI AS imsi,  SUBSCRIBER_NUMBER AS subscriberNumber,  NUMBER AS number, " +
//                " TESTCARD_STATUS_ENUM_ID AS testcardStatusEnumId,  BALANCE AS balance,  LEND_FLAG AS lendFlag,  LEND_DEPARTMENT_ID AS lendDepartmentId, " +
//                " LENDER_ID AS lenderId,  LEND_TIME AS lendTime,  PLAN_RETURN_TIME AS planReturnTime,  SHEET_SERIAL_NUMBER AS sheetSerialNumber," +
//                "  OVER_STATE AS overState,  CREATED_BY AS createdBy,  CREATION_DATE AS creationDate,  LAST_UPDATED_BY AS lastUpdatedBy, " +
//                " LAST_UPDATE_DATE AS lastUpdateDate,  RECORD_VERSION AS recordVersion,  DELETED_FLAG AS deletedFlag,  DELETED_BY AS deletedBy, " +
//                " DELETION_DATE AS deletionDate,  MARKETING_AREA_ID AS marketingAreaId,  MAINTENANCE_AREA_ID AS maintenanceAreaId,  ORG_ID AS orgId, " +
//                " ATTRIBUTE1 AS attribute1,  ATTRIBUTE2 AS attribute2,  ATTRIBUTE3 AS attribute3,  ATTRIBUTE4 AS attribute4, " +
//                " ATTRIBUTE5 AS attribute5 from t_eom_test_card_info " +
//                "where TEST_CARD_ID in(select TESTOBJECT_ID from t_eom_sheet_card_relevance where DELETED_FLAG=0 ");
        
        sqlBuf.append("select scr.CARD_SHEET_ID as cardSheetId,scr.TESTOBJECT_ID as testobjectId,scr.TESTOBJECT_TYPE as testobjectType,case scr.TESTOBJECT_TYPE when 1 then '测试卡' when 2 then '测试终端' when 3 then '固定电话' when 4 then '充值卡' end as testobjectName, " +
        		" case scr.TESTOBJECT_TYPE when 1 then tci.ATTRIBUTION_PROVINCE_ID when 2 then tti.ATTRIBUTION_PROVINCE_ID when 3 then fti.ATTRIBUTION_PROVINCE_ID when 4 then rci.ATTRIBUTION_PROVINCE_ID end as attributionProvinceId, " +
        		" case scr.TESTOBJECT_TYPE when 1 then tci.NUMBER when 2 then tti.NUMBER when 3 then fti.NUMBER when 4 then rci.CARD_NUMBER end as number, " +
        		" case scr.TESTOBJECT_TYPE when 1 then tci.NUMBER when 2 then tti.NUMBER when 3 then fti.NUMBER when 4 then rci.CARD_NUMBER end as numberTmp, " + 
        		" case scr.TESTOBJECT_TYPE when 1 then tci.CARD_NO  when 2 then '' when 3 then '' when 4 then rci.CARD_NO end as cardNo, " + 
        		" case scr.TESTOBJECT_TYPE when 1 then (case tci.TESTCARD_STATUS_ENUM_ID when 1 then '正常' when 2 then '故障' when 3 then '报废' when 4 then '送修' when 5 then '欠费停机' when 6 then 'SIM卡注册失败' end) " +
        		" when 2 then (case tti.TESTCARD_STATUS_ENUM_ID when 1 then '正常' when 2 then '故障' when 3 then '报废' when 4 then '送修' when 5 then '欠费停机' when 6 then 'SIM卡注册失败' end) " +
        		" when 3 then (case fti.TESTCARD_STATUS_ENUM_ID when 1 then '正常' when 2 then '故障' when 3 then '报废' when 4 then '送修' when 5 then '欠费停机' when 6 then 'SIM卡注册失败' end) " +
        		" when 4 then (case rci.TESTCARD_STATUS_ENUM_ID when 1 then '正常' when 2 then '故障' when 3 then '报废' when 4 then '送修' when 5 then '欠费停机' when 6 then 'SIM卡注册失败' end) end as testcardStatusEnumName, " +
        		" case scr.TESTOBJECT_TYPE when 1 then (case tci.LEND_FLAG when 1 then '是' when 0 then '否' end) " +
        		" when 2 then (case tti.LEND_FLAG when 1 then '是' when 0 then '否' end) " +
        		" when 3 then (case fti.LEND_FLAG when 1 then '是' when 0 then '否' end) " +
        		" when 4 then (case rci.LEND_FLAG when 1 then '是' when 0 then '否' end) end as lendFlagName, " +
        		" case scr.TESTOBJECT_TYPE when 1 then tci.ADMIN_NAME " +
                " when 2 then tti.ADMIN_NAME  " +
                " when 3 then fti.ADMIN_NAME  " +
                " when 4 then rci.ADMIN_NAME  end as adminName, " +
                " case scr.TESTOBJECT_TYPE when 1 then tci.ADMIN_ID " +
                " when 2 then tti.ADMIN_ID  " +
                " when 3 then fti.ADMIN_ID  " +
                " when 4 then rci.ADMIN_ID  end as adminId, " +
                " scr.ATTRIBUTE1 as isAccepted "+
        		" from t_eom_sheet_card_relevance scr " +
        		" left join T_EOM_TEST_CARD_INFO tci on scr.TESTOBJECT_ID=tci.TEST_CARD_ID " +
        		" left join T_EOM_RECH_CARD_INFO rci on scr.TESTOBJECT_ID=rci.RECH_CARD_ID " +
        		" left join T_EOM_FIXED_TELEPHON_INFO fti on scr.TESTOBJECT_ID=fti.FIXED_TEL_ID " +
        		" left join T_EOM_TEST_TERMINAL_INFO tti on scr.TESTOBJECT_ID=tti.TEST_TERMINAL_ID " +
        		" where scr.DELETED_FLAG=0 ");
        
        try {
            if(JsonUtil.getLong(jsonObj, "cardSheetId")!=null){
                sqlBuf.append("and scr.CARD_SHEET_ID ='"+JsonUtil.getLong(jsonObj, "cardSheetId")+"' ");
            }
            
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return getJdbcTemplate().queryForList(sqlBuf.toString());
    }
    

    @Override
    public void addBatchTestCardOrderApply(JSONArray jsonArray) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
            Long nextId = null;
            try {
                nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_CARD_SHEET", "CARD_SHEET_ID");
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            Object obj[] = {nextId, JsonUtil.getString(jsonObj, "sheetTheme"),JsonUtil.getString(jsonObj, "sheetSerialNumber")
                    ,JsonUtil.getString(jsonObj, "sheetStatus"),JsonUtil.getString(jsonObj, "localeId"),JsonUtil.getString(jsonObj, "companyName")
                    ,JsonUtil.getString(jsonObj, "dispatchDate"),JsonUtil.getString(jsonObj, "requiredFinishTime"),JsonUtil.getString(jsonObj, "sheetType")
                    ,JsonUtil.getString(jsonObj, "expectedReturnTime"),JsonUtil.getString(jsonObj, "content"),JsonUtil.getString(jsonObj, "remark")
                    ,JsonUtil.getString(jsonObj, "auditDepartmentId"),JsonUtil.getString(jsonObj, "auditMan")
                    ,JsonUtil.getString(jsonObj, "executeDepartmentId"),JsonUtil.getString(jsonObj, "executeMan"),JsonUtil.getString(jsonObj, "createdBy")
                    ,JsonUtil.getString(jsonObj, "creationDate"),JsonUtil.getString(jsonObj, "marketingAreaId"),JsonUtil.getString(jsonObj, "maintenanceAreaId")
                    ,JsonUtil.getString(jsonObj, "orgId"),JsonUtil.getString(jsonObj, "lastUpdatedBy"),JsonUtil.getString(jsonObj, "archiveBaseDate")
                    ,new Date(),new Date()};
            
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO T_EOM_CARD_SHEET(CARD_SHEET_ID, SHEET_THEME, SHEET_SERIAL_NUMBER, SHEET_STATUS, LOCALE_ID, COMPANY_NAME, " +
                "DISPATCH_DATE, REQUIRED_FINISH_TIME, SHEET_TYPE, EXPECTED_RETURN_TIME, CONTENT, REMARK,   AUDIT_DEPARTMENT_ID, " +
                "AUDIT_MAN, EXECUTE_DEPARTMENT_ID, EXECUTE_MAN,   CREATED_BY, CREATION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID," +
                "LAST_UPDATED_BY,ARCHIVE_BASE_DATE,LAST_UPDATE_DATE,LAST_UPDATE_DATE) ")
            .append(" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ? ,?)");
        
        getJdbcTemplate().batchUpdate(sqlBuf.toString(), list);
        
    }
    
    @Override
    public List<Map<String, Object>> qryOrderDetailForTestCardManage(JSONObject jsonObj) {
            
        try {
            System.out.println("进入查询DAO IMPL************");
            System.out.println("进入查询DAO IMPL************  testobjectTypeEnumId =="+JsonUtil.get(jsonObj, "testobjectTypeEnumId").toString());
            System.out.println("进入查询DAO IMPL************  cardId == "+JsonUtil.get(jsonObj, "cardId").toString());
        } catch (Exception e) {
            // TODO: handle exception
        }
            
        
            StringBuffer sqlBuf = new StringBuffer();
            sqlBuf.append("SELECT CARD_SHEET_ID as cardSheetId,SHEET_SERIAL_NUMBER as sheetSerialNumber," );
            sqlBuf.append("SHEET_TYPE as sheetType,DEAL_GROUP_ID as dealGroup,DEAL_MAN_ID as dealMan," );
            sqlBuf.append("REQUIRED_FINISH_TIME as requiredFinishTime," );
            sqlBuf.append("FINISH_TIME as finishTime,DISPATCH_DATE as dispatchDate,SHEET_STATUS as sheetStatus,SHEET_THEME as sheetTheme,CREATED_BY as createdBy " );
            sqlBuf.append("FROM T_EOM_CARD_SHEET where 1=1 and DELETED_FLAG = 0 and CARD_SHEET_ID = ( ");
            sqlBuf.append("SELECT CARD_SHEET_ID FROM T_EOM_SHEET_CARD_RELEVANCE SC WHERE 1 = 1 ");
            
            try {
                
                    if(JsonUtil.get(jsonObj,"testobjectTypeEnumId")!=null && !"".equals(jsonObj.getString("testobjectTypeEnumId"))){
                        sqlBuf.append("and SC.TESTOBJECT_TYPE_ENUM_ID='"+JsonUtil.get(jsonObj, "testobjectTypeEnumId").toString()+"' ");
                    }
                    if(JsonUtil.get(jsonObj,"cardId")!=null && !"".equals(jsonObj.getString("cardId"))){
                        sqlBuf.append("and SC.CARD_ID ='"+JsonUtil.get(jsonObj, "cardId").toString()+"'");
                    }
                    
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            
            sqlBuf.append(" ) ");
            
            System.out.println("查询的SQL==="+sqlBuf.toString());
            
            return getJdbcTemplate().queryForList(sqlBuf.toString());
    }

}
