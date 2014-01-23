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
 * @date 2013-02-28
 * @author jerry
 */ 
@Repository
public class TciPriAttEnumValDAOImpl extends BaseDAOImpl implements ITciPriAttEnumValDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.ENUM_VALUE_ID as enumValueId ")
            .append(",A.TEMPLATE_DETAIL_ID as templateDetailId ")
            .append(",A.ENUM_VALUE as enumValue ")
            .append(",A.ENUM_VALUE_MEANING as enumValueMeaning ")
            .append(",A.DESCRIPTION as description ")
            .append(",A.PARENT_ENUM_VALUE_ID as parentEnumValueId ")
            .append(",A.SORT_NUM as sortNum ")
            .append(",A.ENABLED_FLAG as enabledFlag ")
            .append(",A.START_ACTIVE_DATE as startActiveDate ")
            .append(",A.END_ACTIVE_DATE as endActiveDate ")
            .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
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
            .append(",A.ATTRIBUTE5 as attribute5 ");
        sqlBuf.append(" FROM T_EOM_TCI_PRI_ATT_ENUM_VALUE A ")
            .append(" WHERE A.DELETED_FLAG = 0 ");

        if (JsonUtil.getString(jsonObj, "enumValueId") != null
                && JsonUtil.getString(jsonObj, "enumValueId").length() > 0) {
            sqlBuf.append(" and A.ENUM_VALUE_ID ='" + JsonUtil.getString(jsonObj, "enumValueId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "templateDetailId") != null
                && JsonUtil.getString(jsonObj, "templateDetailId").length() > 0) {
            sqlBuf.append(" and A.TEMPLATE_DETAIL_ID ='"
                    + JsonUtil.getString(jsonObj, "templateDetailId") + "' ");
        }
        sqlBuf.append(" ORDER BY sortNum ASC ");
        return super.queryForList(sqlBuf.toString());
    } 
    
    /**
     * 查询私有属性枚举值对应的枚举含义
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public List<Map<String, Object>> qryEnumValueByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT B.ENUM_VALUE_ID as enumValueId ")
        .append(",B.ENUM_VALUE as enumValue ")
        .append(",B.ENUM_VALUE_MEANING as enumValueMeaning ")
        .append(",B.DESCRIPTION as description ")
        .append(",B.PARENT_ENUM_VALUE_ID as parentEnumValueId ")
        .append(",B.SORT_NUM as sortNum ");
        sqlBuf.append(" FROM T_EOM_TCI_PRI_ATT_VALUE_INFO A ");
        sqlBuf.append(" JOIN T_EOM_TCI_PRI_ATT_ENUM_VALUE B ");
        sqlBuf.append(" ON A.TEMPLATE_DETAIL_ID = B.TEMPLATE_DETAIL_ID ");
        sqlBuf.append(" AND A."+JsonUtil.getString(jsonObj, "columnN")+" = B.ENUM_VALUE ");
        sqlBuf.append(" WHERE A.DELETED_FLAG = 0 AND B.DELETED_FLAG = 0 ");
        sqlBuf.append(" and A.TEMPLATE_DETAIL_ID ='"+JsonUtil.getString(jsonObj, "templateDetailId")+"' ");
        sqlBuf.append(" and A.TESTOBJECT_ID ='"+JsonUtil.getString(jsonObj, "testobjectId")+"' ");
        return super.queryForList(sqlBuf.toString());
    }
    
    @Override
    public void save(JSONObject jsonObj) throws Exception {
        Long enumValueId = 
                super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TCI_PRI_ATT_ENUM_VALUE", "ENUM_VALUE_ID");
        jsonObj.put("enumValueId", enumValueId);
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_TCI_PRI_ATT_ENUM_VALUE(ENUM_VALUE_ID,TEMPLATE_DETAIL_ID ")
            .append(",ENUM_VALUE,ENUM_VALUE_MEANING,DESCRIPTION,PARENT_ENUM_VALUE_ID,SORT_NUM ")
            .append(",ENABLED_FLAG,START_ACTIVE_DATE,END_ACTIVE_DATE,ATTRIBUTION_PROVINCE_ID ")
            .append(",CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION ")
            .append(",DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID ")
            .append(",ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "enumValueId"),JsonUtil.get(jsonObj, "templateDetailId"),
                JsonUtil.get(jsonObj, "enumValue"),JsonUtil.get(jsonObj, "enumValueMeaning"),
                JsonUtil.get(jsonObj, "description"),JsonUtil.get(jsonObj, "parentEnumValueId"),
                JsonUtil.get(jsonObj, "sortNum"),JsonUtil.get(jsonObj, "enabledFlag"),
                JsonUtil.get(jsonObj, "startActiveDate"),JsonUtil.get(jsonObj, "endActiveDate"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),JsonUtil.get(jsonObj, "createdBy"),
                JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),
                JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "recordVersion"),
                JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletedBy"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"),JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"),JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_ENUM_VALUE SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  ENUM_VALUE_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "enumValueId")};
        super.update(sqlBuf.toString(), args);
    } 
    
    @Override
    public void deleteByTemplateDetailId(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("DELETE FROM T_EOM_TCI_PRI_ATT_ENUM_VALUE ")
            .append(" WHERE  TEMPLATE_DETAIL_ID = ? ");
        Object[] args = {JsonUtil.get(jsonObj, "templateDetailId")};
        super.update(sqlBuf.toString(), args);
    } 
    

    @Override
    public void update(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_ENUM_VALUE SET ");

        if (jsonObj.has("enumValue")) {
            updatePatten.append(", ENUM_VALUE = ?");
            list.add(JsonUtil.get(jsonObj, "enumValue"));
        }
        if (jsonObj.has("enumValueMeaning")) {
            updatePatten.append(", ENUM_VALUE_MEANING = ?");
            list.add(JsonUtil.get(jsonObj, "enumValueMeaning"));
        }
        if (jsonObj.has("description")) {
            updatePatten.append(", DESCRIPTION = ?");
            list.add(JsonUtil.get(jsonObj, "description"));
        }
        if (jsonObj.has("parentEnumValueId")) {
            updatePatten.append(", PARENT_ENUM_VALUE_ID = ?");
            list.add(JsonUtil.get(jsonObj, "parentEnumValueId"));
        }
        if (jsonObj.has("sortNum")) {
            updatePatten.append(", SORT_NUM = ?");
            list.add(JsonUtil.get(jsonObj, "sortNum"));
        }
        if (jsonObj.has("enabledFlag")) {
            updatePatten.append(", ENABLED_FLAG = ?");
            list.add(JsonUtil.get(jsonObj, "enabledFlag"));
        }
        if (jsonObj.has("startActiveDate")) {
            updatePatten.append(", START_ACTIVE_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "startActiveDate"));
        }
        if (jsonObj.has("endActiveDate")) {
            updatePatten.append(", END_ACTIVE_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "endActiveDate"));
        }
        if (jsonObj.has("attributionProvinceId")) {
            updatePatten.append(", ATTRIBUTION_PROVINCE_ID = ?");
            list.add(JsonUtil.get(jsonObj, "attributionProvinceId"));
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

        sqlBuf.append(" WHERE ENUM_VALUE_ID = ?");
        list.add(JsonUtil.get(jsonObj, "enumValueId"));
        
        super.update(sqlBuf.toString(), list.toArray());
    } 

}  

