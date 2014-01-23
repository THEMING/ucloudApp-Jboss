package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;

@Repository
public class TestCardStatisDAOImpl extends BaseDAOImpl implements ITestCardStatisDAO{
    private static String tableName = ConstantUtil.TEST_CARD_TBNAME;
    
    @Override
    public List<Map<String, Object>> statisTestCardList(JSONObject jsonObj) throws Exception {
        return super.queryForList(getStatisTestCardSql(jsonObj).toString());
    }
    
    private StringBuffer getStatisTestCardSql(JSONObject jsonObj) throws JSONException{
        Integer testobjectType = JsonUtil.getInt(jsonObj, "testTypeEnumId");
        StringBuffer sqlBuf = new StringBuffer();
        
        sqlBuf.append(" SELECT").append(" IFNULL(COUNT(1),0) AS totalCardNum,")
                .append(" IFNULL(SUM(TESTCARD_STATUS_ENUM_ID=1),0) AS normalCardNum,")
                .append(" IFNULL(SUM(TESTCARD_STATUS_ENUM_ID=2),0) AS faultCardNum,")
                .append(" IFNULL(SUM(TESTCARD_STATUS_ENUM_ID=3),0) AS unUsedCardNum,")
                .append(" IFNULL(SUM(TESTCARD_STATUS_ENUM_ID=4),0) AS fixingCardNum,")
                .append(" IFNULL(SUM(TESTCARD_STATUS_ENUM_ID=5),0) AS overDueNum,")
                .append(" IFNULL(SUM(TESTCARD_STATUS_ENUM_ID=6),0) AS failRegisterNum,")
                .append(" IFNULL(SUM(LEND_FLAG=1),0) AS lendCardNum,");

        if (testobjectType != null) {
            if (testobjectType == ConstantUtil.TEST_CARD_ENUM) {
                tableName = ConstantUtil.TEST_CARD_TBNAME;
                sqlBuf.append(" 1 AS testobjectTypeEnumId ");
                sqlBuf.append(" ,'测试卡' AS testobjectTypeEnumName ");
            } else if (testobjectType == ConstantUtil.TELE_CARD_ENUM) {
                tableName = ConstantUtil.TELE_CARD_TBNAME;
                sqlBuf.append(" 3 AS testobjectTypeEnumId ");
                sqlBuf.append(" ,'固定电话' AS testobjectTypeEnumName ");
            } else if (testobjectType == ConstantUtil.TERMINAL_CARD_ENUM) {
                tableName = ConstantUtil.TERMINAL_CARD_TBNAME;
                sqlBuf.append(" 2 AS testobjectTypeEnumId ");
                sqlBuf.append(" ,'测试终端' AS testobjectTypeEnumName ");
            } else if (testobjectType == ConstantUtil.RECH_CARD_ENUM) {
                tableName = ConstantUtil.RECH_CARD_TBNAME;
                sqlBuf.append(" 4 AS testobjectTypeEnumId ");
                sqlBuf.append(" ,'充值卡' AS testobjectTypeEnumName ");
            }
            sqlBuf.append(" FROM  ");
            sqlBuf.append(tableName);
        }
        sqlBuf.append("     WHERE DELETED_FLAG = 0 ");
        if (JsonUtil.getString(jsonObj, "testProvinceId") != null
                && JsonUtil.getString(jsonObj, "testProvinceId").length() > 0) {
            sqlBuf.append(" AND ATTRIBUTION_PROVINCE_ID =").append(
                    JsonUtil.get(jsonObj, "testProvinceId"));
        }
        if (JsonUtil.getString(jsonObj, "testCityId") != null
                && JsonUtil.getString(jsonObj, "testCityId").length() > 0) {
            sqlBuf.append(" AND ATTRIBUTION_CITY_ID =").append(
                    JsonUtil.get(jsonObj, "testCityId"));
        }
        if(JsonUtil.getString(jsonObj, "storageDepartmentId") !=null && !"".equals(JsonUtil.get(jsonObj,"storageDepartmentId"))){
        	sqlBuf.append(" AND STORAGE_DEPARTMENT_ID =").append(JsonUtil.get(jsonObj,"storageDepartmentId"));
        }
        if (JsonUtil.get(jsonObj, "creationStartDate") != null
                && !"".equals(JsonUtil.get(jsonObj, "creationStartDate"))) {
            sqlBuf.append(" AND UNIX_TIMESTAMP(CREATION_DATE) >UNIX_TIMESTAMP('"
                    + JsonUtil.getString(jsonObj, "creationStartDate") + "') ");
        }
        if (JsonUtil.get(jsonObj, "creationEndDate") != null
                && !"".equals(JsonUtil.get(jsonObj, "creationEndDate"))) {
            sqlBuf.append(" AND UNIX_TIMESTAMP(CREATION_DATE) <UNIX_TIMESTAMP('"
                    + JsonUtil.getString(jsonObj, "creationEndDate") + "') ");
        }
        return sqlBuf;
    }
    
    @Override
    public Map<String, Object> statisTestCardMap(JSONObject jsonObj) throws Exception {      
        return super.queryForMap(getStatisTestCardSql(jsonObj).toString());
    }
}
