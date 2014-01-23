package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 测试数据库层实现类 
 * @version 1.0
 * @date 2013-03-01
 * @author jerry
 */ 
@Repository
public class TciPriAttValueInfoDAOImpl extends BaseDAOImpl implements ITciPriAttValueInfoDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.VALUE_INFO_ID as valueInfoId ")
            .append(",A.TESTOBJECT_ID as testobjectId ")
            .append(",A.TESTOBJECT_TYPE as testobjectType ")
            .append(",A.TEMPLATE_DETAIL_ID as templateDetailId ")
            .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
            .append(",A.COLUMN1 as column1 ")
            .append(",A.COLUMN2 as column2 ")
            .append(",A.COLUMN3 as column3 ")
            .append(",A.COLUMN4 as column4 ")
            .append(",A.COLUMN5 as column5 ")
            .append(",A.COLUMN6 as column6 ")
            .append(",A.COLUMN7 as column7 ")
            .append(",A.COLUMN8 as column8 ")
            .append(",A.COLUMN9 as column9 ")
            .append(",A.COLUMN10 as column10 ")
            .append(",A.COLUMN11 as column11 ")
            .append(",A.COLUMN12 as column12 ")
            .append(",A.COLUMN13 as column13 ")
            .append(",A.COLUMN14 as column14 ")
            .append(",A.COLUMN15 as column15 ")
            .append(",A.COLUMN16 as column16 ")
            .append(",A.COLUMN17 as column17 ")
            .append(",A.COLUMN18 as column18 ")
            .append(",A.COLUMN19 as column19 ")
            .append(",A.COLUMN20 as column20 ")
            .append(",A.COLUMN21 as column21 ")
            .append(",A.COLUMN22 as column22 ")
            .append(",A.COLUMN23 as column23 ")
            .append(",A.COLUMN24 as column24 ")
            .append(",A.COLUMN25 as column25 ")
            .append(",A.COLUMN26 as column26 ")
            .append(",A.COLUMN27 as column27 ")
            .append(",A.COLUMN28 as column28 ")
            .append(",A.COLUMN29 as column29 ")
            .append(",A.COLUMN30 as column30 ")
            .append(",A.CREATED_BY as createdBy ")
            .append(",A.CREATION_DATE as creationDate ")
            .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
            .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
            .append(",A.RECORD_VERSION as recordVersion ")
            .append(",A.DELETION_DATE as deletionDate ")
            .append(",A.DELETED_BY as deletedBy ")
            .append(",A.DELETED_FLAG as deletedFlag ")
            .append(",A.MARKETING_AREA_ID as marketingAreaId ")
            .append(",A.MAINTENANCE_AREA_ID as maintenanceAreaId ")
            .append(",A.ORG_ID as orgId ")
            .append(",A.ATTRIBUTE1 as attribute1 ")
            .append(",A.ATTRIBUTE2 as attribute2 ")
            .append(",A.ATTRIBUTE3 as attribute3 ")
            .append(",A.ATTRIBUTE4 as attribute4 ")
            .append(",A.ATTRIBUTE5 as attribute5 ");
        sqlBuf.append(" from T_EOM_TCI_PRI_ATT_VALUE_INFO A ")
            .append(" where A.DELETED_FLAG = 0 ");
      
        if (JsonUtil.getString(jsonObj, "valueInfoId") != null
                && JsonUtil.getString(jsonObj, "valueInfoId").length() > 0) {
            sqlBuf.append(" AND A.VALUE_INFO_ID =").append(
                    JsonUtil.get(jsonObj, "valueInfoId"));
        }
        if (JsonUtil.getString(jsonObj, "testobjectId") != null
                && JsonUtil.getString(jsonObj, "testobjectId").length() > 0) {
            sqlBuf.append(" AND A.TESTOBJECT_ID =").append(
                    JsonUtil.get(jsonObj, "testobjectId"));
        }
        if (JsonUtil.getString(jsonObj, "testobjectType") != null
                && JsonUtil.getString(jsonObj, "testobjectType").length() > 0) {
            sqlBuf.append(" AND A.TESTOBJECT_TYPE =").append(
                    JsonUtil.get(jsonObj, "testobjectType"));
        }
        if (JsonUtil.getString(jsonObj, "templateDetailId") != null
                && JsonUtil.getString(jsonObj, "templateDetailId").length() > 0) {
            sqlBuf.append(" AND A.TEMPLATE_DETAIL_ID =").append(
                    JsonUtil.get(jsonObj, "templateDetailId"));
        }
        if (JsonUtil.getString(jsonObj, "attributionProvinceId") != null
                && JsonUtil.getString(jsonObj, "attributionProvinceId").length() > 0) {
            sqlBuf.append(" AND A.ATTRIBUTION_PROVINCE_ID =").append(
                    JsonUtil.get(jsonObj, "attributionProvinceId"));
        }
        return super.queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        Long valueInfoId = 
                super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TCI_PRI_ATT_VALUE_INFO", "VALUE_INFO_ID");
        jsonObj.put("valueInfoId", valueInfoId);
                
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_TCI_PRI_ATT_VALUE_INFO(VALUE_INFO_ID,TESTOBJECT_ID ")
            .append(",TESTOBJECT_TYPE,TEMPLATE_DETAIL_ID,ATTRIBUTION_PROVINCE_ID,COLUMN1,COLUMN2 ")
            .append(",COLUMN3,COLUMN4,COLUMN5,COLUMN6,COLUMN7,COLUMN8,COLUMN9,COLUMN10,COLUMN11 ")
            .append(",COLUMN12,COLUMN13,COLUMN14,COLUMN15,COLUMN16,COLUMN17,COLUMN18,COLUMN19 ")
            .append(",COLUMN20,COLUMN21,COLUMN22,COLUMN23,COLUMN24,COLUMN25,COLUMN26,COLUMN27 ")
            .append(",COLUMN28,COLUMN29,COLUMN30,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY ")
            .append(",LAST_UPDATE_DATE,RECORD_VERSION,DELETION_DATE,DELETED_BY,DELETED_FLAG ")
            .append(",MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2 ")
            .append(",ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,")
            .append("?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "valueInfoId"),JsonUtil.get(jsonObj, "testobjectId"),
                JsonUtil.get(jsonObj, "testobjectType"),JsonUtil.get(jsonObj, "templateDetailId"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),JsonUtil.get(jsonObj, "column1"),
                JsonUtil.get(jsonObj, "column2"),JsonUtil.get(jsonObj, "column3"),
                JsonUtil.get(jsonObj, "column4"),JsonUtil.get(jsonObj, "column5"),
                JsonUtil.get(jsonObj, "column6"),JsonUtil.get(jsonObj, "column7"),
                JsonUtil.get(jsonObj, "column8"),JsonUtil.get(jsonObj, "column9"),
                JsonUtil.get(jsonObj, "column10"),JsonUtil.get(jsonObj, "column11"),
                JsonUtil.get(jsonObj, "column12"),JsonUtil.get(jsonObj, "column13"),
                JsonUtil.get(jsonObj, "column14"),JsonUtil.get(jsonObj, "column15"),
                JsonUtil.get(jsonObj, "column16"),JsonUtil.get(jsonObj, "column17"),
                JsonUtil.get(jsonObj, "column18"),JsonUtil.get(jsonObj, "column19"),
                JsonUtil.get(jsonObj, "column20"),JsonUtil.get(jsonObj, "column21"),
                JsonUtil.get(jsonObj, "column22"),JsonUtil.get(jsonObj, "column23"),
                JsonUtil.get(jsonObj, "column24"),JsonUtil.get(jsonObj, "column25"),
                JsonUtil.get(jsonObj, "column26"),JsonUtil.get(jsonObj, "column27"),
                JsonUtil.get(jsonObj, "column28"),JsonUtil.get(jsonObj, "column29"),
                JsonUtil.get(jsonObj, "column30"),JsonUtil.get(jsonObj, "createdBy"),
                JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),
                JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "recordVersion"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "deletedBy"),
                JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"),JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"),JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_VALUE_INFO SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  VALUE_INFO_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "valueInfoId")};
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_VALUE_INFO SET ");

        if (jsonObj.has("column1")) {
            updatePatten.append(", COLUMN1 = ?");
            list.add(JsonUtil.get(jsonObj, "column1"));
        }
        if (jsonObj.has("column2")) {
            updatePatten.append(", COLUMN2 = ?");
            list.add(JsonUtil.get(jsonObj, "column2"));
        }
        if (jsonObj.has("column3")) {
            updatePatten.append(", COLUMN3 = ?");
            list.add(JsonUtil.get(jsonObj, "column3"));
        }
        if (jsonObj.has("column4")) {
            updatePatten.append(", COLUMN4 = ?");
            list.add(JsonUtil.get(jsonObj, "column4"));
        }
        if (jsonObj.has("column5")) {
            updatePatten.append(", COLUMN5 = ?");
            list.add(JsonUtil.get(jsonObj, "column5"));
        }
        if (jsonObj.has("column6")) {
            updatePatten.append(", COLUMN6 = ?");
            list.add(JsonUtil.get(jsonObj, "column6"));
        }
        if (jsonObj.has("column7")) {
            updatePatten.append(", COLUMN7 = ?");
            list.add(JsonUtil.get(jsonObj, "column7"));
        }
        if (jsonObj.has("column8")) {
            updatePatten.append(", COLUMN8 = ?");
            list.add(JsonUtil.get(jsonObj, "column8"));
        }
        if (jsonObj.has("column9")) {
            updatePatten.append(", COLUMN9 = ?");
            list.add(JsonUtil.get(jsonObj, "column9"));
        }
        if (jsonObj.has("column10")) {
            updatePatten.append(", COLUMN10 = ?");
            list.add(JsonUtil.get(jsonObj, "column10"));
        } 
        if (jsonObj.has("column11")) {
            updatePatten.append(", COLUMN11 = ?");
            list.add(JsonUtil.get(jsonObj, "column11"));
        }
        if (jsonObj.has("column12")) {
            updatePatten.append(", COLUMN12 = ?");
            list.add(JsonUtil.get(jsonObj, "column12"));
        }
        if (jsonObj.has("column13")) {
            updatePatten.append(", COLUMN13 = ?");
            list.add(JsonUtil.get(jsonObj, "column13"));
        }
        if (jsonObj.has("column14")) {
            updatePatten.append(", COLUMN14 = ?");
            list.add(JsonUtil.get(jsonObj, "column14"));
        }
        if (jsonObj.has("column15")) {
            updatePatten.append(", COLUMN15 = ?");
            list.add(JsonUtil.get(jsonObj, "column15"));
        }
        if (jsonObj.has("column16")) {
            updatePatten.append(", COLUMN16 = ?");
            list.add(JsonUtil.get(jsonObj, "column16"));
        }
        if (jsonObj.has("column17")) {
            updatePatten.append(", COLUMN17 = ?");
            list.add(JsonUtil.get(jsonObj, "column17"));
        }
        if (jsonObj.has("column18")) {
            updatePatten.append(", COLUMN18 = ?");
            list.add(JsonUtil.get(jsonObj, "column18"));
        }
        if (jsonObj.has("column19")) {
            updatePatten.append(", COLUMN19 = ?");
            list.add(JsonUtil.get(jsonObj, "column19"));
        }
        if (jsonObj.has("column20")) {
            updatePatten.append(", COLUMN20 = ?");
            list.add(JsonUtil.get(jsonObj, "column20"));
        }
        if (jsonObj.has("column21")) {
            updatePatten.append(", COLUMN21 = ?");
            list.add(JsonUtil.get(jsonObj, "column21"));
        }
        if (jsonObj.has("column22")) {
            updatePatten.append(", COLUMN22 = ?");
            list.add(JsonUtil.get(jsonObj, "column22"));
        }
        if (jsonObj.has("column23")) {
            updatePatten.append(", COLUMN23 = ?");
            list.add(JsonUtil.get(jsonObj, "column23"));
        }
        if (jsonObj.has("column24")) {
            updatePatten.append(", COLUMN24 = ?");
            list.add(JsonUtil.get(jsonObj, "column24"));
        }
        if (jsonObj.has("column25")) {
            updatePatten.append(", COLUMN25 = ?");
            list.add(JsonUtil.get(jsonObj, "column25"));
        }
        if (jsonObj.has("column26")) {
            updatePatten.append(", COLUMN26 = ?");
            list.add(JsonUtil.get(jsonObj, "column26"));
        }
        if (jsonObj.has("column27")) {
            updatePatten.append(", COLUMN27 = ?");
            list.add(JsonUtil.get(jsonObj, "column27"));
        }
        if (jsonObj.has("column28")) {
            updatePatten.append(", COLUMN28 = ?");
            list.add(JsonUtil.get(jsonObj, "column28"));
        }
        if (jsonObj.has("column29")) {
            updatePatten.append(", COLUMN29 = ?");
            list.add(JsonUtil.get(jsonObj, "column29"));
        }
        if (jsonObj.has("column30")) {
            updatePatten.append(", COLUMN30 = ?");
            list.add(JsonUtil.get(jsonObj, "column30"));
        } 
        if (jsonObj.has("lastUpdatedBy")) {
            updatePatten.append(", LAST_UPDATED_BY = ?");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
        }
        if (jsonObj.has("lastUpdateDate")) {
            updatePatten.append(", LAST_UPDATE_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "lastUpdateDate"));
        }
        
        updatePatten.append(", RECORD_VERSION = RECORD_VERSION+1");
        sqlBuf.append(updatePatten.substring(1));

        sqlBuf.append(" WHERE TESTOBJECT_ID = ?");
        list.add(JsonUtil.get(jsonObj, "testobjectId"));
        if (jsonObj.has("testobjectType")) {
            sqlBuf.append(" AND TESTOBJECT_TYPE = ?");
            list.add(JsonUtil.get(jsonObj, "testobjectType"));
        }
        if (jsonObj.has("templateDetailId")) {
            sqlBuf.append(" AND TEMPLATE_DETAIL_ID = ?");
            list.add(JsonUtil.get(jsonObj, "templateDetailId"));
        }
        if (jsonObj.has("attributionProvinceId")) {
            sqlBuf.append(" AND ATTRIBUTION_PROVINCE_ID = ?");
            list.add(JsonUtil.get(jsonObj, "attributionProvinceId"));
        }
        super.update(sqlBuf.toString(), list.toArray());
    } 

}  

