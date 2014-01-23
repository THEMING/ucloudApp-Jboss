package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


import org.apache.commons.collections.MapUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.util.JsonUtil;

@Repository
public class EomCardCheckDaoImpl  extends BaseDAOImpl implements IEomCardCheckDao{

    @Override
    public List<Map<String, Object>> qryEomCheckCardListByParam(JSONObject jsonObj) throws JSONException {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            list = super.queryForList(
                    getqryEomCheckCardSql(jsonObj).toString());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if(list != null && list.size() > 0){
            Map map = null;
            long inventoryAvailableNum =  0;
            long inventoryUnavailableNum =  0;
            for(int i=0;i<list.size();i++){
                map = (Map)list.get(i);
                inventoryAvailableNum = MapUtils.getLongValue(map, "normalNum")
                        - MapUtils.getLongValue(map, "inventoryLendNum");
                inventoryUnavailableNum = MapUtils.getLongValue(map, "faultNum")
                        + MapUtils.getLongValue(map, "scrapNum")
                        + MapUtils.getLongValue(map, "fiexedNum")
                        + MapUtils.getLongValue(map, "overDueNum")
                        + MapUtils.getLongValue(map, "failRegisterNum");

                map.put("inventoryAvailableNum", inventoryAvailableNum);
                map.put("inventoryUnavailableNum", inventoryUnavailableNum);
            }
        }
        
        return list;
    }

    private StringBuffer getqryEomCheckCardSql(JSONObject jsonObj) throws JSONException{
        StringBuffer sqlBuf = new StringBuffer();
        String tableName = "";
        sqlBuf.append("SELECT   A.ADMIN_ID AS adminId,")
        .append(" A.STORAGE_DEPARTMENT_ID AS attributionDepartmentId,")
        .append(" A.ADMIN_NAME AS adminName,")
        .append(" A.STORAGE_DEPARTMENT_NAME AS attributionDepartmentName,")
        .append(" NOW() AS checkTime,");
        if (JsonUtil.get(jsonObj, "testobjectType") != null) {
            sqlBuf.append(" '"+JsonUtil.getInt(jsonObj, "testobjectType")+"' AS testobjectType,");
        }
        sqlBuf.append(" SUM(A.TESTCARD_STATUS_ENUM_ID=1) AS normalNum ,")//正常
        .append(" SUM(A.TESTCARD_STATUS_ENUM_ID=2) AS faultNum ,")//故障
        .append(" SUM(A.TESTCARD_STATUS_ENUM_ID=3) AS scrapNum,")//报废
        .append(" SUM(A.TESTCARD_STATUS_ENUM_ID=4) AS fiexedNum ,")//送修
        .append(" SUM(A.TESTCARD_STATUS_ENUM_ID=5) AS overDueNum ,")//欠费停机
        .append(" SUM(A.TESTCARD_STATUS_ENUM_ID=6) AS failRegisterNum ,")//SIM卡注册失败
        .append(" SUM(A.LEND_FLAG=1 and A.TESTCARD_STATUS_ENUM_ID=1) AS inventoryLendNum")//借出数
        .append(" FROM ");
        
        if (JsonUtil.get(jsonObj, "testobjectType") != null) {
            if (JsonUtil.getInt(jsonObj, "testobjectType") == ConstantUtil.TEST_CARD_ENUM) {
                tableName = ConstantUtil.TEST_CARD_TBNAME;
            } else if (JsonUtil.getInt(jsonObj, "testobjectType") == ConstantUtil.TELE_CARD_ENUM) {
                tableName = ConstantUtil.TELE_CARD_TBNAME;
            } else if (JsonUtil.getInt(jsonObj, "testobjectType") == ConstantUtil.TERMINAL_CARD_ENUM) {
                tableName = ConstantUtil.TERMINAL_CARD_TBNAME;
            } else if (JsonUtil.getInt(jsonObj, "testobjectType") == ConstantUtil.RECH_CARD_ENUM) {
                tableName = ConstantUtil.RECH_CARD_TBNAME;
            }

            sqlBuf.append(tableName);
        }
        sqlBuf.append(" A WHERE  A.DELETED_FLAG = 0 AND (");

        if (JsonUtil.get(jsonObj, "attributionDepartmentId") != null
                && !"".equals(JsonUtil.get(jsonObj, "attributionDepartmentId"))) {
            sqlBuf.append("A.STORAGE_DEPARTMENT_ID in(").append(
                    JsonUtil.get(jsonObj, "attributionDepartmentId")+")");
        }
        if (JsonUtil.get(jsonObj, "adminId") != null
                && !"".equals(JsonUtil.get(jsonObj, "adminId"))) {
            if (JsonUtil.get(jsonObj, "attributionDepartmentId") != null
                    && !"".equals(JsonUtil.get(jsonObj, "attributionDepartmentId"))) {
                sqlBuf.append(" or A.ADMIN_ID in(").append(
                        JsonUtil.get(jsonObj, "adminId")+")");
            }else{
                sqlBuf.append(" A.ADMIN_ID in(").append(
                        JsonUtil.get(jsonObj, "adminId")+")");
            }
            
        }
        sqlBuf.append(")");
        sqlBuf.append(" GROUP BY adminId");
        return sqlBuf;
    }
    
    @Override
    public Page qryEomCheckCardListPage(JSONObject jsonObj) throws Exception {
        Page page = super.getPageQuery(getqryEomCheckCardSql(jsonObj).toString(), jsonObj);
        List list = page.getData();
        if (list != null && list.size() > 0) {
            Map map = null;
            long inventoryAvailableNum = 0;//库存可用数量
            long inventoryUnavailableNum = 0;//库存不可用数量
            for (int i = 0; i < list.size(); i++) {
                map = (Map) list.get(i);
                inventoryAvailableNum = MapUtils.getLongValue(map, "normalNum")
                        - MapUtils.getLongValue(map, "inventoryLendNum");
                inventoryUnavailableNum = MapUtils.getLongValue(map, "faultNum")
                        + MapUtils.getLongValue(map, "scrapNum")
                        + MapUtils.getLongValue(map, "fiexedNum")
                        + MapUtils.getLongValue(map, "overDueNum")
                        + MapUtils.getLongValue(map, "failRegisterNum");

                map.put("inventoryAvailableNum", inventoryAvailableNum);
                map.put("inventoryUnavailableNum", inventoryUnavailableNum);
            }
        }
        return page;
    }
    
    public Long insertEomCardCheck(JSONObject jsonObj) throws JSONException{
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_CARD_CHECK_LIST(CHECK_LIST_ID,CARD_SHEET_ID,CHECK_LIST_NUMBER,CHECK_PERSON_ID,TESTOBJECT_TYPE,CHECK_TIME,ADMIN_ID," +
        		"ATTRIBUTION_DEPARTMENT_ID,INVENTORY_AVAILABLE_NUM,ACTUAL_AVAILABLE_NUM,INVENTORY_UNAVAILABLE_NUM,ACTUAL_UNAVAILABLE_NUM," +
        		"INVENTORY_LEND_NUM,ACTUAL_LEND_NUM,CHECK_STATUS,REMARKS,CHECK_FORM_STATUS_ENUM_ID,CREATED_BY,CREATION_DATE," +
        		"LAST_UPDATED_BY,LAST_UPDATE_DATE,DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID," +
        		"ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5,ADMIN_NAME,ATTRIBUTION_DEPARTMENT_NAME,CHECK_PERSON_NAME) ")
        .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Long nextId = new Long(0);
        try {
            nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_CARD_CHECK_LIST", "CHECK_LIST_ID");
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        Object[] args = {nextId,JsonUtil.get(jsonObj, "cardSheetId"),JsonUtil.get(jsonObj, "checkListNumber"),
                JsonUtil.get(jsonObj, "checkPersonId"),JsonUtil.get(jsonObj, "testobjectType"),new Date(),JsonUtil.get(jsonObj, "adminId"),
                JsonUtil.get(jsonObj, "attributionDepartmentId"),JsonUtil.get(jsonObj, "inventoryAvailableNum"),
                JsonUtil.get(jsonObj, "actualAvailableNum"),JsonUtil.get(jsonObj, "inventoryUnavailableNum"),
                JsonUtil.get(jsonObj, "actualUnavailableNum"),JsonUtil.get(jsonObj, "inventoryLendNum"),JsonUtil.get(jsonObj, "actualLendNum"),
                JsonUtil.get(jsonObj, "checkStatus"),JsonUtil.get(jsonObj, "remarks"),JsonUtil.get(jsonObj, "checkFormStatusEnumId"),
                JsonUtil.get(jsonObj, "createdBy"),new Date(),
                JsonUtil.get(jsonObj, "lastUpdatedBy"),new Date(),
                new Date(),
                JsonUtil.get(jsonObj, "marketingAreaId"),JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"),JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),
                JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5"),
                JsonUtil.get(jsonObj, "adminName"),JsonUtil.get(jsonObj, "attributionDepartmentName"),JsonUtil.get(jsonObj, "checkPersonName")};
        try {
            super.update(sqlBuf.toString(), args);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
//        getJdbcTemplate().update(sqlBuf.toString(), args);
        return nextId;
    }


    @Override
    /**
     * 获取测试卡清查列表
     */
    public List<Map<String, Object>> qryTestCardCheckListByParam(JSONObject jsonObj) {
        return super.getJdbcTemplate().queryForList(getEomCardCheckListSql(jsonObj).toString());
    } 
    
    public Page qryTestCardCheckListPage(JSONObject jsonObj) throws Exception {
        
        return super.getPageQuery(getEomCardCheckListSql(jsonObj).toString(), jsonObj);
    } 
    
    private StringBuffer getEomCardCheckListSql(JSONObject jsonObj){
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.CHECK_LIST_ID as checkListId ")
        .append(",A.CARD_SHEET_ID as cardSheetId ")
        .append(",C.SHEET_THEME as sheetTheme ")
        .append(",B.PROCESS_INSTANCE_ID as processInstanceId ")
        .append(",A.CHECK_LIST_NUMBER as checkListNumber ")
        .append(",A.CHECK_PERSON_ID as checkPersonId ")
        .append(",A.CHECK_PERSON_NAME as checkPersonName ")
        .append(",A.CHECK_TIME as checkTime ")
        .append(",A.ADMIN_ID as adminId ")
        .append(",A.ADMIN_NAME as adminName ")
        .append(",A.TESTOBJECT_TYPE as testobjectType ")
        .append(",A.ATTRIBUTION_DEPARTMENT_ID as attributionDepartmentId ")
        .append(",A.ATTRIBUTION_DEPARTMENT_NAME as attributionDepartmentName ")
        .append(",A.INVENTORY_AVAILABLE_NUM as inventoryAvailableNum ")
        .append(",A.ACTUAL_AVAILABLE_NUM as actualAvailableNum ")
        .append(",A.INVENTORY_UNAVAILABLE_NUM as inventoryUnavailableNum ")
        .append(",A.ACTUAL_UNAVAILABLE_NUM as actualUnavailableNum ")
        .append(",A.INVENTORY_LEND_NUM as inventoryLendNum ")
        .append(",A.ACTUAL_LEND_NUM as actualLendNum ")
        .append(",A.CHECK_STATUS as checkStatus ")
        .append(",A.REMARKS as remarks ")
        .append(",A.CHECK_FORM_STATUS_ENUM_ID as checkFormStatusEnumId ")
//        .append(",A.ARCHIVE_BASE_DATE as archiveBaseDate ")
        .append(",A.CREATED_BY as createdBy ")
        .append(",A.CREATION_DATE as creationDate ")
        .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
        .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
        .append(",A.RECORD_VERSION as recordVersion ")
        .append(",A.DELETED_FLAG as deletedFlag ")
        .append(",A.DELETED_BY as deletedBy ")
        .append(",A.DELETION_DATE as deletionDate ")
        .append(",A.MARKETING_AREA_ID as marketingAreaId ")
        .append(",A.MAINTENANCE_AREA_ID as maintenanceAreaId ")
        .append(",A.ORG_ID as orgId ")
        .append(",A.ATTRIBUTE1 as attribute1 ")
        .append(",A.ATTRIBUTE2 as attribute2 ")
        .append(",A.ATTRIBUTE3 as attribute3 ")
        .append(",A.ATTRIBUTE4 as attribute4 ")
        .append(",A.ATTRIBUTE5 as attribute5 ")
        .append(" from T_EOM_CARD_CHECK_LIST A ")
        .append(" left join T_EOM_FLOWING_OBJ_PROC_INS_REL B on A.CARD_SHEET_ID = B.FLOWING_OBJECT_ID AND B.FLOWING_OBJECT_TABLE='T_EOM_CARD_SHEET' ")
        .append(" left join T_EOM_CARD_SHEET C on A.CARD_SHEET_ID = C.CARD_SHEET_ID")
        .append(" where A.DELETED_FLAG = 0 ");
        
        try {
            if(JsonUtil.getString(jsonObj,"selectIds")!=null&&!"".equals(JsonUtil.getString(jsonObj,"selectIds"))){
                sqlBuf.append(" and A.CHECK_LIST_ID in ("+JsonUtil.getString(jsonObj,"selectIds")+") ");
            }
            if (JsonUtil.get(jsonObj, "checkListId") != null
                    && !"".equals(JsonUtil.get(jsonObj, "checkListId"))) {
                sqlBuf.append(" AND A.CHECK_LIST_ID =")
                        .append(JsonUtil.get(jsonObj, "checkListId"));
            }
            if (JsonUtil.getString(jsonObj, "checkListNumber") != null
                    && !"".equals(JsonUtil.getString(jsonObj, "checkListNumber"))) {
                sqlBuf.append(" AND A.CHECK_LIST_NUMBER like '%"
                        + JsonUtil.getString(jsonObj, "checkListNumber") + "%' ");
            }
            if (JsonUtil.get(jsonObj, "checkListIds") != null
                    && !"".equals(JsonUtil.get(jsonObj, "checkListIds"))) {
                sqlBuf.append(" AND A.CHECK_LIST_ID  in(")
                        .append(JsonUtil.get(jsonObj, "checkListIds")).append(")");
            }
            if (JsonUtil.get(jsonObj, "testobjectTypeQry") != null
                    && !"".equals(JsonUtil.get(jsonObj, "testobjectTypeQry"))) {
                sqlBuf.append(" AND A.TESTOBJECT_TYPE  in(")
                        .append(JsonUtil.get(jsonObj, "testobjectTypeQry")).append(")");
            }
            if (JsonUtil.get(jsonObj, "cardSheetId") != null
                    && !"".equals(JsonUtil.get(jsonObj, "cardSheetId"))) {
                sqlBuf.append(" AND A.CARD_SHEET_ID =")
                        .append(JsonUtil.get(jsonObj, "cardSheetId"));
            }
            if (JsonUtil.get(jsonObj, "attributionDepartmentIdQry") != null
                    && !"".equals(JsonUtil.get(jsonObj, "attributionDepartmentIdQry"))) {
                sqlBuf.append(" AND A.ATTRIBUTION_DEPARTMENT_ID =")
                        .append(JsonUtil.get(jsonObj, "attributionDepartmentIdQry"));
            }
            if (JsonUtil.get(jsonObj, "checkPersonIdQry") != null
                    && !"".equals(JsonUtil.get(jsonObj, "checkPersonIdQry"))) {
                sqlBuf.append(" AND A.CHECK_PERSON_ID =")
                        .append(JsonUtil.get(jsonObj, "checkPersonIdQry"));
            }
            if (JsonUtil.get(jsonObj, "checkTimeBegin") != null
                    && !"".equals(JsonUtil.get(jsonObj, "checkTimeBegin"))) {
                sqlBuf.append(" AND UNIX_TIMESTAMP(A.CHECK_TIME) >UNIX_TIMESTAMP('"
                        + JsonUtil.getString(jsonObj, "checkTimeBegin") + "') ");
            }
            if (JsonUtil.get(jsonObj, "checkTimeEnd") != null
                    && !"".equals(JsonUtil.get(jsonObj, "checkTimeEnd"))) {
                sqlBuf.append(" AND UNIX_TIMESTAMP(A.CHECK_TIME) <UNIX_TIMESTAMP('"
                        + JsonUtil.getString(jsonObj, "checkTimeEnd") + "') ");
            }
            if (JsonUtil.get(jsonObj, "createdByQry") != null
                    && !"".equals(JsonUtil.get(jsonObj, "createdByQry"))) {
                sqlBuf.append(" AND A.CREATED_BY ="
                        + JsonUtil.getString(jsonObj, "createdByQry") + " ");
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        
        sqlBuf.append(" ORDER BY creationDate DESC");
        
        return sqlBuf;
    }
    
    @Override
    public void delEomCardCheckList(JSONObject jsonObj) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_CARD_CHECK_LIST SET DELETED_BY = ?")
                .append(", DELETED_FLAG = ?").append(", DELETION_DATE = ?")
                .append(" WHERE  CHECK_LIST_ID= ? ");
        Object[] args = { JsonUtil.get(jsonObj, "deletedBy"), JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"), JsonUtil.get(jsonObj, "checkListId") };
        getJdbcTemplate().update(sqlBuf.toString(), args);
    } 
    
    @Override
    public Long updateEomCardCheck(JSONObject jsonObj) throws Exception {        
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" update T_EOM_CARD_CHECK_LIST set  LAST_UPDATE_DATE = ?,RECORD_VERSION = RECORD_VERSION+1 ");
        
        List<Object> list = new ArrayList<Object>();
        
        list.add(new Date());
        
        if(jsonObj.has("checkPersonId")){
            sqlBuf.append(" , CHECK_PERSON_ID =? ");
            list.add(JsonUtil.get(jsonObj, "checkPersonId"));
        }
        if(jsonObj.has("checkTime")){
            sqlBuf.append(" , CHECK_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "checkTime"));
        }
        if(jsonObj.has("adminId")){
            sqlBuf.append(" , ADMIN_ID =? ");
            list.add(JsonUtil.get(jsonObj, "adminId"));
        }
        if(jsonObj.has("attributionDepartmentId")){
            sqlBuf.append(" , ATTRIBUTION_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "attributionDepartmentId"));
        }
        
        if(jsonObj.has("inventoryAvailableNum")){
            sqlBuf.append(" , INVENTORY_AVAILABLE_NUM =? ");
            list.add(JsonUtil.get(jsonObj, "inventoryAvailableNum"));
        }
        if(jsonObj.has("actualAvailableNum")){
            sqlBuf.append(" , ACTUAL_AVAILABLE_NUM =? ");
            list.add(JsonUtil.get(jsonObj, "actualAvailableNum"));
        }
        if(jsonObj.has("inventoryUnavailableNum")){
            sqlBuf.append(" , INVENTORY_UNAVAILABLE_NUM =? ");
            list.add(JsonUtil.get(jsonObj, "inventoryUnavailableNum"));
        }
        if(jsonObj.has("actualUnavailableNum")){
            sqlBuf.append(" , ACTUAL_UNAVAILABLE_NUM =? ");
            list.add(JsonUtil.get(jsonObj, "actualUnavailableNum"));
        }
        
        if(jsonObj.has("inventoryLendNum")){
            sqlBuf.append(" , INVENTORY_LEND_NUM =? ");
            list.add(JsonUtil.get(jsonObj, "inventoryLendNum"));
        }
        if(jsonObj.has("actualLendNum")){
            sqlBuf.append(" , ACTUAL_LEND_NUM =? ");
            list.add(JsonUtil.get(jsonObj, "actualLendNum"));
        }
        if(jsonObj.has("checkStatus")){
            sqlBuf.append(" , CHECK_STATUS =? ");
            list.add(JsonUtil.get(jsonObj, "checkStatus"));
        }
        if(jsonObj.has("remarks")){
            sqlBuf.append(" , REMARKS =? ");
            list.add(JsonUtil.get(jsonObj, "remarks"));
        }
        
        if(jsonObj.has("checkFormStatusEnumId")){
            sqlBuf.append(" , CHECK_FORM_STATUS_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "checkFormStatusEnumId"));
        }
        if(jsonObj.has("createdBy")){
            sqlBuf.append(" , CREATED_BY =? ");
            list.add(JsonUtil.get(jsonObj, "createdBy"));
        }
        if(jsonObj.has("lastUpdatedBy")){
            sqlBuf.append(" , LAST_UPDATED_BY =? ");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
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
        
        sqlBuf.append(" where CHECK_LIST_ID = ? ");
        Long checkListId = JsonUtil.getLong(jsonObj, "checkListId");
        list.add(checkListId);//必有
        
        super.update(sqlBuf.toString(), list.toArray());
        return checkListId;
    } 
      
    @Override
    public void updateSheetIdAndStutes(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE t_eom_card_check_list  SET  ").append(" CARD_SHEET_ID=?,")
                .append(" CHECK_FORM_STATUS_ENUM_ID=?");

        sqlBuf.append(" WHERE CHECK_LIST_ID=?");

        Object[] args = { JsonUtil.get(jsonObj, "cardSheetId"),
                JsonUtil.get(jsonObj, "checkFormStatusEnumId"),
                JsonUtil.get(jsonObj, "checkListId") };
        getJdbcTemplate().update(sqlBuf.toString(), args);
    }


    @Override
    public void updateEomCardCheckByParam(JSONObject jsonObj) throws Exception {
        // TODO Auto-generated method stub
        
    } 
}
