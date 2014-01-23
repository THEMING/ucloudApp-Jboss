package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 测试数据库层实现类 
 * @version 1.0
 * @date 2013-02-22
 * @author jerry
 */ 
@Repository
public class TciPriAttTempDAOImpl extends BaseDAOImpl implements ITciPriAttTempDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        return super.queryForList(getSql(jsonObj).toString());
    } 
    @Override
    public Page qryPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(getSql(jsonObj).toString(),jsonObj);
    } 
    private StringBuffer getSql(JSONObject jsonObj) throws JSONException{
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.TCI_PRI_ATT_TEMPLATE_ID as tciPriAttTemplateId ")
            .append(",A.TESTOBJECT_TYPE as testobjectType ")
             .append(",CASE A.TESTOBJECT_TYPE WHEN 1 THEN '测试卡'  WHEN 2 THEN '测试终端' ")
             .append(" WHEN 3 THEN '固定电话' WHEN 4 THEN '充值卡' ")
             .append(" ELSE '' END as testobjectTypeName ")
            .append(",A.TEMPLATE_NAME as templateName ")
            .append(",A.TEMPLATE_DESC as templateDesc ")
            .append(",A.TEMPLATE_USED as templateUsed ")
            .append(",A.REMARKS as remarks ")
            .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
            .append(",A.ATTRIBUTION_PROVINCE_NAME as attributionProvinceName ")
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
            .append(" from T_EOM_TCI_PRI_ATT_TEMPLATE A ")
            .append(" where A.DELETED_FLAG=0 ");

        if (JsonUtil.getString(jsonObj, "tciPriAttTemplateId") != null
                && JsonUtil.getString(jsonObj, "tciPriAttTemplateId").length() > 0) {
            sqlBuf.append(" and A.TCI_PRI_ATT_TEMPLATE_ID ='"
                    + JsonUtil.getString(jsonObj, "tciPriAttTemplateId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testobjectType") != null
                && JsonUtil.getString(jsonObj, "testobjectType").length() > 0) {
            sqlBuf.append(" and A.TESTOBJECT_TYPE ='"
                    + JsonUtil.getString(jsonObj, "testobjectType") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "attributionProvinceId") != null
                && JsonUtil.getString(jsonObj, "attributionProvinceId").length() > 0) {
            sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                    + JsonUtil.getString(jsonObj, "attributionProvinceId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "templateName") != null
                && JsonUtil.getString(jsonObj, "templateName").length() > 0) {
            sqlBuf.append(" and A.TEMPLATE_NAME like '%"
                    + JsonUtil.getString(jsonObj, "templateName") + "%' ");
        }
        return sqlBuf;
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        Long tciPriAttTemplateId = 
                super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TCI_PRI_ATT_TEMPLATE", "TCI_PRI_ATT_TEMPLATE_ID");
        jsonObj.put("tciPriAttTemplateId", tciPriAttTemplateId);
                
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_TCI_PRI_ATT_TEMPLATE(TCI_PRI_ATT_TEMPLATE_ID ")
            .append(",TESTOBJECT_TYPE,TEMPLATE_NAME,TEMPLATE_DESC,TEMPLATE_USED,REMARKS ")
            .append(",ATTRIBUTION_PROVINCE_ID,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY ")
            .append(",LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE ")
            .append(",MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2 ")
            .append(",ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5,ATTRIBUTION_PROVINCE_NAME) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "tciPriAttTemplateId"),JsonUtil.get(jsonObj, "testobjectType"),
                JsonUtil.get(jsonObj, "templateName"),JsonUtil.get(jsonObj, "templateDesc"),
                JsonUtil.get(jsonObj, "templateUsed"),JsonUtil.get(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),JsonUtil.get(jsonObj, "createdBy"),
                JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),
                JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "recordVersion"),
                JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletedBy"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"),JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"),JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"),JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5"),JsonUtil.get(jsonObj, "attributionProvinceName") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_TEMPLATE SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  TCI_PRI_ATT_TEMPLATE_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "tciPriAttTemplateId")};
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_TEMPLATE SET ");
        sqlBuf.append(" TEMPLATE_NAME = ?");
        sqlBuf.append(", TEMPLATE_DESC = ?");
        sqlBuf.append(", TEMPLATE_USED = ?");
        sqlBuf.append(", REMARKS = ?");
        sqlBuf.append(" WHERE  TCI_PRI_ATT_TEMPLATE_ID= ? ");
        Object[] args = {
                JsonUtil.get(jsonObj, "templateName"),
                JsonUtil.get(jsonObj, "templateDesc"),
                JsonUtil.get(jsonObj, "templateUsed"),
                JsonUtil.get(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "tciPriAttTemplateId")
        };
        super.update(sqlBuf.toString(), args);
    }

    /**
     * 查询私有属性模板明细和私有属性模板信息
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public List<Map<String, Object>> qryTemplateListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.TCI_PRI_ATT_TEMPLATE_ID as tciPriAttTemplateId ")
            .append(",A.TESTOBJECT_TYPE as testobjectType ")
            .append(",A.TEMPLATE_NAME as templateName ")
            .append(",A.TEMPLATE_DESC as templateDesc ")
            .append(",A.TEMPLATE_USED as templateUsed ")
            .append(",A.REMARKS as remarks ")
            .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
            .append(",B.TEMPLATE_DETAIL_ID as templateDetailId ")
            .append(",B.COLUMN_NUMBER as columnNumber ")
            .append(",B.COLUMN_NAME as columnName ")
            .append(",B.DESCRIPTION as description ")
            .append(",B.DATA_TYPE_ENUM_ID as dataTypeEnumId ")
            .append(",B.DATA_LENGTH as dataLength ")
            .append(",B.IS_NULL as isNull ")
            .append(",B.DISPLAY_NUMBER as displayNumber ")
            .append(",B.IS_ENUM_TYPE as isEnumType ")
            .append(" FROM T_EOM_TCI_PRI_ATT_TEMPLATE A ")
            .append(" LEFT JOIN T_EOM_TCI_PRI_ATT_TEMPLAT_D B ")
            .append(" ON A.TCI_PRI_ATT_TEMPLATE_ID = B.TCI_PRI_ATT_TEMPLATE_ID ")
            .append(" WHERE A.DELETED_FLAG=0 AND B.DELETED_FLAG=0 ");

        if (JsonUtil.getString(jsonObj, "tciPriAttTemplateId") != null
                && JsonUtil.getString(jsonObj, "tciPriAttTemplateId").length() > 0) {
            sqlBuf.append(" and A.TCI_PRI_ATT_TEMPLATE_ID ='"
                    + JsonUtil.getString(jsonObj, "tciPriAttTemplateId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testobjectType") != null
                && JsonUtil.getString(jsonObj, "testobjectType").length() > 0) {
            sqlBuf.append(" and A.TESTOBJECT_TYPE ='"
                    + JsonUtil.getString(jsonObj, "testobjectType") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "attributionProvinceId") != null
                && JsonUtil.getString(jsonObj, "attributionProvinceId").length() > 0) {
            sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                    + JsonUtil.getString(jsonObj, "attributionProvinceId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "templateDetailId") != null
                && JsonUtil.getString(jsonObj, "templateDetailId").length() > 0) {
            sqlBuf.append(" and B.TEMPLATE_DETAIL_ID ='"
                    + JsonUtil.getString(jsonObj, "templateDetailId") + "' ");
        }
        sqlBuf.append(" ORDER BY displayNumber ASC ");
        return super.queryForList(sqlBuf.toString());
    } 
}  

