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
 * @date 2013-02-23
 * @author jerry
 */ 
@Repository
public class TciPriAttTempDetDAOImpl extends BaseDAOImpl implements ITciPriAttTempDetDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        
        return super.queryForList(getQrySql(jsonObj).toString());
    } 

    @Override
    public Page qryPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(getQrySql(jsonObj).toString(), jsonObj);
    }
    public StringBuffer getQrySql(JSONObject jsonObj) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.TEMPLATE_DETAIL_ID as templateDetailId ")
            .append(",A.COLUMN_NUMBER as columnNumber ")
            .append(",A.COLUMN_NAME as columnName ")
            .append(",A.DESCRIPTION as description ")
            .append(",A.DATA_TYPE_ENUM_ID as dataTypeEnumId ")
            .append(",A.DATA_LENGTH as dataLength ")
            .append(",A.IS_NULL as isNull ")
            .append(",A.DISPLAY_NUMBER as displayNumber ")
            .append(",A.IS_ENUM_TYPE as isEnumType ")
            .append(",A.TCI_PRI_ATT_TEMPLATE_ID as tciPriAttTemplateId ")
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
        sqlBuf.append(" from T_EOM_TCI_PRI_ATT_TEMPLAT_D A ")
            .append(" where A.DELETED_FLAG = 0 ");

        if (JsonUtil.getString(jsonObj, "templateDetailId") != null
                && JsonUtil.getString(jsonObj, "templateDetailId").length() > 0) {
            sqlBuf.append(" and A.TEMPLATE_DETAIL_ID ='"
                    + JsonUtil.getString(jsonObj, "templateDetailId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "tciPriAttTemplateId") != null
                && JsonUtil.getString(jsonObj, "tciPriAttTemplateId").length() > 0) {
            sqlBuf.append(" and A.TCI_PRI_ATT_TEMPLATE_ID ='"
                    + JsonUtil.getString(jsonObj, "tciPriAttTemplateId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "columnNumberEqual") != null
                && JsonUtil.getString(jsonObj, "columnNumberEqual").length() > 0) {
            sqlBuf.append(" and A.COLUMN_NUMBER ='"
                    + JsonUtil.getString(jsonObj, "columnNumberEqual") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "columnNameEqual") != null
                && JsonUtil.getString(jsonObj, "columnNameEqual").length() > 0) {
            sqlBuf.append(" and A.COLUMN_NAME ='"
                    + JsonUtil.getString(jsonObj, "columnNameEqual") + "' ");
        }
        sqlBuf.append(" ORDER BY templateDetailId DESC ");
        return sqlBuf;
    }
    
    /**
     * 查询 私有属性明细和测试卡私有属性值信息
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public List<Map<String, Object>> qryDetailAndInfoListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.TEMPLATE_DETAIL_ID as templateDetailId ")
            .append(",A.COLUMN_NUMBER as columnNumber ")
            .append(",A.COLUMN_NAME as columnName ")
            .append(",A.DESCRIPTION as description ")
            .append(",A.DATA_TYPE_ENUM_ID as dataTypeEnumId ")
            .append(",A.DATA_LENGTH as dataLength ")
            .append(",A.IS_NULL as isNull ")
            .append(",A.DISPLAY_NUMBER as displayNumber ")
            .append(",A.IS_ENUM_TYPE as isEnumType ")
            .append(",B.VALUE_INFO_ID as valueInfoId ")
            .append(",B.TESTOBJECT_ID as testobjectId ")
            .append(",B.TESTOBJECT_TYPE as testobjectType ")
            .append(",B.COLUMN1 as column1 ")
            .append(",B.COLUMN2 as column2 ")
            .append(",B.COLUMN3 as column3 ")
            .append(",B.COLUMN4 as column4 ")
            .append(",B.COLUMN5 as column5 ")
            .append(",B.COLUMN6 as column6 ")
            .append(",B.COLUMN7 as column7 ")
            .append(",B.COLUMN8 as column8 ")
            .append(",B.COLUMN9 as column9 ")
            .append(",B.COLUMN10 as column10 ")
            .append(",B.COLUMN11 as column11 ")
            .append(",B.COLUMN12 as column12 ")
            .append(",B.COLUMN13 as column13 ")
            .append(",B.COLUMN14 as column14 ")
            .append(",B.COLUMN15 as column15 ")
            .append(",B.COLUMN16 as column16 ")
            .append(",B.COLUMN17 as column17 ")
            .append(",B.COLUMN18 as column18 ")
            .append(",B.COLUMN19 as column19 ")
            .append(",B.COLUMN20 as column20 ")
            .append(",B.COLUMN21 as column21 ")
            .append(",B.COLUMN22 as column22 ")
            .append(",B.COLUMN23 as column23 ")
            .append(",B.COLUMN24 as column24 ")
            .append(",B.COLUMN25 as column25 ")
            .append(",B.COLUMN26 as column26 ")
            .append(",B.COLUMN27 as column27 ")
            .append(",B.COLUMN28 as column28 ")
            .append(",B.COLUMN29 as column29 ")
            .append(",B.COLUMN30 as column30 ")
            .append(" FROM T_EOM_TCI_PRI_ATT_TEMPLAT_D A ")
            .append(" JOIN T_EOM_TCI_PRI_ATT_VALUE_INFO B ")
            .append(" ON B.TEMPLATE_DETAIL_ID = A.TEMPLATE_DETAIL_ID ")
            .append(" WHERE A.DELETED_FLAG=0 AND B.DELETED_FLAG=0 ");
        if (JsonUtil.getString(jsonObj, "templateDetailId") != null
                && JsonUtil.getString(jsonObj, "templateDetailId").length() > 0) {
            sqlBuf.append("and A.TEMPLATE_DETAIL_ID ='" + JsonUtil.getString(jsonObj, "templateDetailId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testobjectId") != null
                && JsonUtil.getString(jsonObj, "testobjectId").length() > 0) {
            sqlBuf.append("and B.TESTOBJECT_ID ='" + JsonUtil.getString(jsonObj, "testobjectId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testobjectType") != null
                && JsonUtil.getString(jsonObj, "testobjectType").length() > 0) {
            sqlBuf.append("and B.TESTOBJECT_TYPE ='" + JsonUtil.getString(jsonObj, "testobjectType")
                    + "' ");
        }
        sqlBuf.append(" ORDER BY displayNumber ASC ");
        return super.queryForList(sqlBuf.toString());     
    }  
        
    @Override
    public void save(JSONObject jsonObj) throws Exception {
        Long templateDetailId = 
                super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TCI_PRI_ATT_TEMPLATE", "TCI_PRI_ATT_TEMPLATE_ID");
        jsonObj.put("templateDetailId", templateDetailId);
                
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_TCI_PRI_ATT_TEMPLAT_D(TEMPLATE_DETAIL_ID,COLUMN_NUMBER ")
            .append(",COLUMN_NAME,DESCRIPTION,DATA_TYPE_ENUM_ID,DATA_LENGTH,IS_NULL ")
            .append(",DISPLAY_NUMBER,IS_ENUM_TYPE,TCI_PRI_ATT_TEMPLATE_ID,CREATED_BY ")
            .append(",CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETION_DATE ")
            .append(",DELETED_BY,DELETED_FLAG,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID ")
            .append(",ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "templateDetailId"),JsonUtil.get(jsonObj, "columnNumber"),
                JsonUtil.get(jsonObj, "columnName"),JsonUtil.get(jsonObj, "description"),
                JsonUtil.get(jsonObj, "dataTypeEnumId"),JsonUtil.get(jsonObj, "dataLength"),
                JsonUtil.get(jsonObj, "isNull"),JsonUtil.get(jsonObj, "displayNumber"),
                JsonUtil.get(jsonObj, "isEnumType"),JsonUtil.get(jsonObj, "tciPriAttTemplateId"),
                JsonUtil.get(jsonObj, "createdBy"),JsonUtil.get(jsonObj, "creationDate"),
                JsonUtil.get(jsonObj, "lastUpdatedBy"),JsonUtil.get(jsonObj, "lastUpdateDate"),
                JsonUtil.get(jsonObj, "recordVersion"),JsonUtil.get(jsonObj, "deletionDate"),
                JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "marketingAreaId"),JsonUtil.get(jsonObj, "maintenanceAreaId"),
                JsonUtil.get(jsonObj, "orgId"),JsonUtil.get(jsonObj, "attribute1"),
                JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),
                JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_TEMPLAT_D SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  TEMPLATE_DETAIL_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "templateDetailId")};
        super.update(sqlBuf.toString(), args);
    } 
    
    @Override
    public void deleteByTemplateId(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_TEMPLAT_D SET DELETED_BY = ?")
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
        sqlBuf.append("UPDATE T_EOM_TCI_PRI_ATT_TEMPLAT_D SET ");
        sqlBuf.append(" COLUMN_NAME = ?");
        sqlBuf.append(", DESCRIPTION = ?");
        sqlBuf.append(", DATA_TYPE_ENUM_ID = ?");
        sqlBuf.append(", DATA_LENGTH = ?");
        sqlBuf.append(", IS_NULL = ?");
        sqlBuf.append(", DISPLAY_NUMBER = ?");
        sqlBuf.append(", IS_ENUM_TYPE = ?");
        sqlBuf.append(" WHERE  TEMPLATE_DETAIL_ID= ? ");
        Object[] args = {
                JsonUtil.get(jsonObj, "columnName"),
                JsonUtil.get(jsonObj, "description"),
                JsonUtil.get(jsonObj, "dataTypeEnumId"),
                JsonUtil.get(jsonObj, "dataLength"),
                JsonUtil.get(jsonObj, "isNull"),
                JsonUtil.get(jsonObj, "displayNumber"),
                JsonUtil.get(jsonObj, "isEnumType"),
                JsonUtil.get(jsonObj, "templateDetailId")
        };
        super.update(sqlBuf.toString(), args);
    } 

}  

