package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 测试数据库层实现类 
 * @version 1.0
 * @date 2013-01-17
 * @author Jerry
 */ 
@Repository
public class EomCardSheetDAOImpl extends BaseDAOImpl implements IEomCardSheetDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.CARD_SHEET_ID as cardSheetId,A.SHEET_THEME as sheetTheme,A.SHEET_SERIAL_NUMBER as sheetSerialNumber,A.SHEET_STATUS as sheetStatus,A.LOCALE_ID as localeId,A.COMPANY_NAME_ID as companyNameId,A.DISPATCH_DATE as dispatchDate,A.REQUIRED_FINISH_TIME as requiredFinishTime,A.SHEET_TYPE as sheetType,A.EXPECTED_RETURN_TIME as expectedReturnTime,A.CONTENT as content,A.REMARK as remark,A.PROCESS_INS_ID as processInsId,A.FINISH_TIME as finishTime,A.CURRENT_NODE as currentNode,A.AUDIT_DEPARTMENT_ID as auditDepartmentId,A.AUDIT_MAN as auditMan,A.EXECUTE_DEPARTMENT_ID as executeDepartmentId,A.EXECUTE_MAN as executeMan,A.ACCEPT_DEPARTMENT_ID as acceptDepartmentId,A.ACCEPT_MAN as acceptMan,A.DEAL_GROUP_ID as dealGroupId,A.DEAL_MAN_ID as dealManId,A.ARCHIVE_BASE_DATE as archiveBaseDate,A.CREATED_BY as createdBy,A.CREATION_DATE as creationDate,A.LAST_UPDATED_BY as lastUpdatedBy,A.LAST_UPDATE_DATE as lastUpdateDate,A.RECORD_VERSION as recordVersion,A.DELETED_FLAG as deletedFlag,A.DELETED_BY as deletedBy,A.DELETION_DATE as deletionDate,A.MARKETING_AREA_ID as marketingAreaId,A.MAINTENANCE_AREA_ID as maintenanceAreaId,A.ORG_ID as orgId,A.ATTRIBUTE1 as attribute1,A.ATTRIBUTE2 as attribute2,A.ATTRIBUTE3 as attribute3,A.ATTRIBUTE4 as attribute4,A.ATTRIBUTE5 as attribute5 ");
        sqlBuf.append(" from T_EOM_CARD_SHEET A ")
            .append(" where 1=1");
      
        return getJdbcTemplate().queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_CARD_SHEET(CARD_SHEET_ID,SHEET_THEME,SHEET_SERIAL_NUMBER,SHEET_STATUS,LOCALE_ID,COMPANY_NAME_ID,DISPATCH_DATE,REQUIRED_FINISH_TIME,SHEET_TYPE,EXPECTED_RETURN_TIME,CONTENT,REMARK,PROCESS_INS_ID,FINISH_TIME,CURRENT_NODE,AUDIT_DEPARTMENT_ID,AUDIT_MAN,EXECUTE_DEPARTMENT_ID,EXECUTE_MAN,ACCEPT_DEPARTMENT_ID,ACCEPT_MAN,DEAL_GROUP_ID,DEAL_MAN_ID,ARCHIVE_BASE_DATE,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "cardSheetId"),JsonUtil.get(jsonObj, "sheetTheme"),JsonUtil.get(jsonObj, "sheetSerialNumber"),JsonUtil.get(jsonObj, "sheetStatus"),JsonUtil.get(jsonObj, "localeId"),JsonUtil.get(jsonObj, "companyNameId"),JsonUtil.get(jsonObj, "dispatchDate"),JsonUtil.get(jsonObj, "requiredFinishTime"),JsonUtil.get(jsonObj, "sheetType"),JsonUtil.get(jsonObj, "expectedReturnTime"),JsonUtil.get(jsonObj, "content"),JsonUtil.get(jsonObj, "remark"),JsonUtil.get(jsonObj, "processInsId"),JsonUtil.get(jsonObj, "finishTime"),JsonUtil.get(jsonObj, "currentNode"),JsonUtil.get(jsonObj, "auditDepartmentId"),JsonUtil.get(jsonObj, "auditMan"),JsonUtil.get(jsonObj, "executeDepartmentId"),JsonUtil.get(jsonObj, "executeMan"),JsonUtil.get(jsonObj, "acceptDepartmentId"),JsonUtil.get(jsonObj, "acceptMan"),JsonUtil.get(jsonObj, "dealGroupId"),JsonUtil.get(jsonObj, "dealManId"),JsonUtil.get(jsonObj, "archiveBaseDate"),JsonUtil.get(jsonObj, "createdBy"),JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "recordVersion"),JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "marketingAreaId"),JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId"),JsonUtil.get(jsonObj, "attribute1"),JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_SHEET SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?,")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  CARD_SHEET_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "cardSheetId")};
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {

    } 

}  

