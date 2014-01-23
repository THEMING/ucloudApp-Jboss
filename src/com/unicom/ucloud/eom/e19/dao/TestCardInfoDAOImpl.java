package com.unicom.ucloud.eom.e19.dao;

import java.util.List;

import java.util.Map;

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
public class TestCardInfoDAOImpl extends BaseDAOImpl implements ITestCardInfoDAO {

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT   TEST_CARD_ID AS testCardId,    " +
        		"TESTCARD_TYPE_ENUM_ID AS testcardTypeEnumId,  OPERATOR_ENUM_ID AS operatorEnumId,  " +
        		"CARD_NETWORK_TYPE_ENUM_ID AS cardNetworkTypeEnumId,  ATTRIBUTION_COUNTRY_ID AS attributionCountryId,  " +
        		"ATTRIBUTION_PROVINCE_ID AS attributionProvinceId,  ATTRIBUTION_CITY_ID AS attributionCityId,  ATTRIBUTION_SCP AS attributionScp, " +
        		" SCP_MANUFACTURER AS scpManufacturer,  EFFECTIVE_DATE AS effectiveDate,  ATTRIBUTION_HLR AS attributionHlr, " +
        		" HLR_MANUFACTURER AS hlrManufacturer,  CANCEL_DATE AS cancelDate,  PIN1 AS pin1,  PIN2 AS pin2,  LAST_TEST_DATE AS lastTestDate, " +
        		" PUK1 AS puk1,  PUK2 AS puk2,  WARE_MAN_ID AS wareManId,  PACKAGE_TYPE AS packageTypeEnumId, " +
        		" ATTCH_PACKAGE_TYPE AS attchPackageEnumId,  STORAGE_DEPARTMENT_ID AS storageDepartmentId,  MONTH_GRANTS AS monthGrants," +
        		"  WHETHER_PREPAID AS whetherPrepaid,  ADMIN_ID AS adminId,  STORAGE_PLACE AS storagePlace,  CARD_USE AS cardUse,  REMARKS AS remarks, " +
        		" CARD_NO AS cardNo,  IMSI AS imsi,  SUBSCRIBER_NUMBER AS subscriberNumber,  NUMBER AS number, " +
        		" TESTCARD_STATUS_ENUM_ID AS testcardStatusEnumId,  BALANCE AS balance,  LEND_FLAG AS lendFlag,  LEND_DEPARTMENT_ID AS lendDepartmentId, " +
        		" LENDER_ID AS lenderId,  LEND_TIME AS lendTime,  PLAN_RETURN_TIME AS planReturnTime,  SHEET_SERIAL_NUMBER AS sheetSerialNumber," +
        		"  OVER_STATE AS overState,  CREATED_BY AS createdBy,  CREATION_DATE AS creationDate,  LAST_UPDATED_BY AS lastUpdatedBy, " +
        		" LAST_UPDATE_DATE AS lastUpdateDate,  RECORD_VERSION AS recordVersion,  DELETED_FLAG AS deletedFlag,  DELETED_BY AS deletedBy, " +
        		" DELETION_DATE AS deletionDate,  MARKETING_AREA_ID AS marketingAreaId,  MAINTENANCE_AREA_ID AS maintenanceAreaId,  ORG_ID AS orgId, " +
        		" ATTRIBUTE1 AS attribute1,  ATTRIBUTE2 AS attribute2,  ATTRIBUTE3 AS attribute3,  ATTRIBUTE4 AS attribute4, " +
        		" ATTRIBUTE5 AS attribute5 FROM T_EOM_TEST_CARD_INFO where 1=1 ");
        try {
            if(JsonUtil.getString(jsonObj, "cardNo")!=null&&!"".equals(JsonUtil.getString(jsonObj, "cardNo"))){
                sqlBuf.append("and CARD_NO ='"+JsonUtil.getString(jsonObj, "cardNo")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "subscriberNumber")!=null&&!"".equals(JsonUtil.getString(jsonObj, "subscriberNumber"))){
                sqlBuf.append("and SUBSCRIBER_NUMBER ='"+JsonUtil.getString(jsonObj, "subscriberNumber")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "testcardStatusEnumId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "testcardStatusEnumId"))){
                sqlBuf.append("and TESTCARD_STATUS_ENUM_ID ='"+JsonUtil.getString(jsonObj, "testcardStatusEnumId")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "lendFlag")!=null&&!"".equals(JsonUtil.getString(jsonObj, "lendFlag"))){
                sqlBuf.append("and LEND_FLAG ='"+JsonUtil.getString(jsonObj, "lendFlag")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "attributionCountryId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "attributionCountryId"))){
                sqlBuf.append("and ATTRIBUTION_COUNTRY_ID ='"+JsonUtil.getString(jsonObj, "attributionCountryId")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "attributionProvinceId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "attributionProvinceId"))){
                sqlBuf.append("and ATTRIBUTION_PROVINCE_ID ='"+JsonUtil.getString(jsonObj, "attributionProvinceId")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "attributionCityId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "attributionCityId"))){
                sqlBuf.append("and ATTRIBUTION_CITY_ID ='"+JsonUtil.getString(jsonObj, "attributionCityId")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "operatorEnumId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "operatorEnumId"))){
                sqlBuf.append("and OPERATOR_ENUM_ID ='"+JsonUtil.getString(jsonObj, "operatorEnumId")+"' ");//operatingVendorEnumId
            }
            if(JsonUtil.getString(jsonObj, "whetherPrepaid")!=null&&!"".equals(JsonUtil.getString(jsonObj, "whetherPrepaid"))){
                sqlBuf.append("and WHETHER_PREPAID ='"+JsonUtil.getString(jsonObj, "whetherPrepaid")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId"))){
                sqlBuf.append("and CARD_NETWORK_TYPE_ENUM_ID ='"+JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "testcardTypeEnumId")!=null&&!"".equals(JsonUtil.getString(jsonObj, "testcardTypeEnumId"))){
                sqlBuf.append("and TESTCARD_TYPE_ENUM_ID ='"+JsonUtil.getString(jsonObj, "testcardTypeEnumId")+"' ");
            }
            if(JsonUtil.getString(jsonObj, "number")!=null&&!"".equals(JsonUtil.getString(jsonObj, "number"))){
                sqlBuf.append("and NUMBER ='"+JsonUtil.getString(jsonObj, "number")+"' ");
            }
            
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return getJdbcTemplate().queryForList(sqlBuf.toString());
    }
    
    @Override
    public Page qryListPageByParam(JSONObject jsonObj) throws Exception{
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT   TEST_CARD_ID AS testCardId,   " +
                "TESTCARD_TYPE_ENUM_ID AS testcardTypeEnumId,  OPERATOR_ENUM_ID AS operatorEnumId,  " +
                "CARD_NETWORK_TYPE_ENUM_ID AS cardNetworkTypeEnumId,  ATTRIBUTION_COUNTRY_ID AS attributionCountryId,  " +
                "ATTRIBUTION_PROVINCE_ID AS attributionProvinceId,  ATTRIBUTION_CITY_ID AS attributionCityId,  ATTRIBUTION_SCP AS attributionScp, " +
                " SCP_MANUFACTURER AS scpManufacturer,  EFFECTIVE_DATE AS effectiveDate,  ATTRIBUTION_HLR AS attributionHlr, " +
                " HLR_MANUFACTURER AS hlrManufacturer,  CANCEL_DATE AS cancelDate,  PIN1 AS pin1,  PIN2 AS pin2,  LAST_TEST_DATE AS lastTestDate, " +
                " PUK1 AS puk1,  PUK2 AS puk2,  WARE_MAN_ID AS wareManId,  PACKAGE_TYPE AS packageTypeEnumId, " +
                " ATTCH_PACKAGE_TYPE AS attchPackageEnumId,  STORAGE_DEPARTMENT_ID AS storageDepartmentId,  MONTH_GRANTS AS monthGrants," +
                "  WHETHER_PREPAID AS whetherPrepaid,  ADMIN_ID AS adminId,  STORAGE_PLACE AS storagePlace,  CARD_USE AS cardUse,  REMARKS AS remarks, " +
                " CARD_NO AS cardNo,  IMSI AS imsi,  SUBSCRIBER_NUMBER AS subscriberNumber,  NUMBER AS number, " +
                " TESTCARD_STATUS_ENUM_ID AS testcardStatusEnumId,  BALANCE AS balance,  LEND_FLAG AS lendFlag,  LEND_DEPARTMENT_ID AS lendDepartmentId, " +
                " LENDER_ID AS lenderId,  LEND_TIME AS lendTime,  PLAN_RETURN_TIME AS planReturnTime,  SHEET_SERIAL_NUMBER AS sheetSerialNumber," +
                "  OVER_STATE AS overState,  CREATED_BY AS createdBy,  CREATION_DATE AS creationDate,  LAST_UPDATED_BY AS lastUpdatedBy, " +
                " LAST_UPDATE_DATE AS lastUpdateDate,  RECORD_VERSION AS recordVersion,  DELETED_FLAG AS deletedFlag,  DELETED_BY AS deletedBy, " +
                " DELETION_DATE AS deletionDate,  MARKETING_AREA_ID AS marketingAreaId,  MAINTENANCE_AREA_ID AS maintenanceAreaId,  ORG_ID AS orgId, " +
                " ATTRIBUTE1 AS attribute1,  ATTRIBUTE2 AS attribute2,  ATTRIBUTE3 AS attribute3,  ATTRIBUTE4 AS attribute4, " +
                " ATTRIBUTE5 AS attribute5 FROM T_EOM_TEST_CARD_INFO where DELETED_FLAG='FALSE' ");
        try {
            if(JsonUtil.get(jsonObj, "cardNo")!=null){
                sqlBuf.append("and CARD_NO ='"+JsonUtil.getString(jsonObj, "cardNo")+"' ");
            }
            if(JsonUtil.get(jsonObj, "subscriberNumber")!=null){
                sqlBuf.append("and SUBSCRIBER_NUMBER ='"+JsonUtil.getString(jsonObj, "subscriberNumber")+"' ");
            }
           
            if(JsonUtil.get(jsonObj, "testcardStatusEnumId") != null){
                sqlBuf.append(" AND TESTCARD_STATUS_ENUM_ID =").append(JsonUtil.get(jsonObj, "testcardStatusEnumId"));
            }
            if(JsonUtil.get(jsonObj, "lendFlag") != null){
                sqlBuf.append(" AND LEND_FLAG =").append(JsonUtil.get(jsonObj, "lendFlag"));
            }
            
            if(JsonUtil.get(jsonObj, "attributionCountryId")!=null){
                sqlBuf.append("and ATTRIBUTION_COUNTRY_ID ='"+JsonUtil.getString(jsonObj, "attributionCountryId")+"' ");
            }
            if(JsonUtil.get(jsonObj, "attributionProvinceId")!=null){
                sqlBuf.append("and ATTRIBUTION_PROVINCE_ID ='"+JsonUtil.getString(jsonObj, "attributionProvinceId")+"' ");
            }
            if(JsonUtil.get(jsonObj, "attributionCityId")!=null){
                sqlBuf.append("and ATTRIBUTION_CITY_ID ='"+JsonUtil.getString(jsonObj, "attributionCityId")+"' ");
            }
            if(JsonUtil.get(jsonObj, "operatorEnumId")!=null){
                sqlBuf.append("and OPERATOR_ENUM_ID ='"+JsonUtil.getString(jsonObj, "operatorEnumId")+"' ");
            }
            if(JsonUtil.get(jsonObj, "whetherPrepaid")!=null){
                sqlBuf.append("and WHETHER_PREPAID ='"+JsonUtil.getString(jsonObj, "whetherPrepaid")+"' ");
            }
            if(JsonUtil.get(jsonObj, "cardNetworkTypeEnumId")!=null){
                sqlBuf.append("and CARD_NETWORK_TYPE_ENUM_ID ='"+JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId")+"' ");
            }
            if(JsonUtil.get(jsonObj, "testcardTypeEnumId")!=null){
                sqlBuf.append("and TESTCARD_TYPE_ENUM_ID ='"+JsonUtil.getString(jsonObj, "testcardTypeEnumId")+"' ");
            }
            if(JsonUtil.get(jsonObj, "number")!=null){
                sqlBuf.append("and NUMBER ='"+JsonUtil.getString(jsonObj, "number")+"' ");
            }
            
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return super.getPageQuery(sqlBuf.toString(), jsonObj);
    }

}
