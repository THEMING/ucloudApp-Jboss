package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/**
 * 测试数据库层实现类
 * 
 * @version 1.0
 * @date 2013-01-17
 * @author jiang.yean
 */
@Repository
public class TestCardManageDAOImpl extends BaseDAOImpl implements ITestCardManageDAO {

    
    @Override
    public void modifyTestCardInfo(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TEST_CARD_INFO SET ");

        if (jsonObj.has("testCardId")) {
            updatePatten.append(", TEST_CARD_ID = ?");
            list.add(JsonUtil.get(jsonObj, "testCardId"));
        }
        if (jsonObj.has("testcardTypeEnumId")) {
            updatePatten.append(", TESTCARD_TYPE_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj, "testcardTypeEnumId"));
        }
        if (jsonObj.has("operatorEnumId")) {
            updatePatten.append(", OPERATOR_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj, "operatorEnumId"));
        }
        if (jsonObj.has("cardNetworkTypeEnumId")) {
            updatePatten.append(", CARD_NETWORK_TYPE_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj, "cardNetworkTypeEnumId"));
        }
        if (jsonObj.has("attributionCountryEnumId")) {
            updatePatten.append(", ATTRIBUTION_COUNTRY_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj, "attributionCountryEnumId"));
        }
        if (jsonObj.has("attributionProvinceId")) {
            updatePatten.append(", ATTRIBUTION_PROVINCE_ID = ?");
            list.add(JsonUtil.get(jsonObj, "attributionProvinceId"));
        }
        if (jsonObj.has("attributionCityId")) {
            updatePatten.append(", ATTRIBUTION_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj, "attributionCityId"));
        }
        if (jsonObj.has("attributionScp")) {
            updatePatten.append(", ATTRIBUTION_SCP = ?");
            list.add(JsonUtil.get(jsonObj, "attributionScp"));
        }
        if (jsonObj.has("scpManufacturer")) {
            updatePatten.append(", SCP_MANUFACTURER = ?");
            list.add(JsonUtil.get(jsonObj, "scpManufacturer"));
        }
        if (jsonObj.has("effectiveDate")) {
            updatePatten.append(", EFFECTIVE_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "effectiveDate"));
        }
        if (jsonObj.has("attributionHlr")) {
            updatePatten.append(", ATTRIBUTION_HLR = ?");
            list.add(JsonUtil.get(jsonObj, "attributionHlr"));
        }
        if (jsonObj.has("hlrManufacturer")) {
            updatePatten.append(", HLR_MANUFACTURER = ?");
            list.add(JsonUtil.get(jsonObj, "hlrManufacturer"));
        }
        if (jsonObj.has("cancelDate")) {
            updatePatten.append(", CANCEL_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "cancelDate"));
        }
        if (jsonObj.has("pin1")) {
            updatePatten.append(", PIN1 = ?");
            list.add(JsonUtil.get(jsonObj, "pin1"));
        } 
        if (jsonObj.has("pin2")) {
            updatePatten.append(", PIN2 = ?");
            list.add(JsonUtil.get(jsonObj, "pin2"));
        }
        if (jsonObj.has("lastTestDate")) {
            updatePatten.append(", LAST_TEST_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "lastTestDate"));
        }
        if (jsonObj.has("puk1")) {
            updatePatten.append(", PUK1 = ?");
            list.add(JsonUtil.get(jsonObj, "puk1"));
        }
        if (jsonObj.has("puk2")) {
            updatePatten.append(", PUK2 = ?");
            list.add(JsonUtil.get(jsonObj, "puk2"));
        }
        if (jsonObj.has("wareManId")) {
            updatePatten.append(", WARE_MAN_ID = ?");
            list.add(JsonUtil.get(jsonObj, "wareManId"));
        }
        if (jsonObj.has("packageTypeEnumId")) {
            updatePatten.append(", PACKAGE_TYPE = ?");
            list.add(JsonUtil.get(jsonObj, "packageTypeEnumId"));
        }
        if (jsonObj.has("attchPackageEnumId")) {
            updatePatten.append(", ATTCH_PACKAGE_TYPE = ?");
            list.add(JsonUtil.get(jsonObj, "attchPackageEnumId"));
        }
        if (jsonObj.has("storageDepartmentId")) {
            updatePatten.append(", STORAGE_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentId"));
        }
        if (jsonObj.has("monthGrants")) {
            updatePatten.append(", MONTH_GRANTS = ?");
            list.add(JsonUtil.get(jsonObj, "monthGrants"));
        }
        if (jsonObj.has("whetherPrepaid")) {
            updatePatten.append(", WHETHER_PREPAID = ?");
            list.add(JsonUtil.get(jsonObj, "whetherPrepaid"));
        }
        if (jsonObj.has("adminId")) {
            updatePatten.append(", ADMIN_ID = ?");
            list.add(JsonUtil.get(jsonObj, "adminId"));
        }
        if (jsonObj.has("storagePlace")) {
            updatePatten.append(", STORAGE_PLACE = ?");
            list.add(JsonUtil.get(jsonObj, "storagePlace"));
        }
        if (jsonObj.has("cardUse")) {
            updatePatten.append(", CARD_USE = ?");
            list.add(JsonUtil.get(jsonObj, "cardUse"));
        }
        if (jsonObj.has("remarks")) {
            updatePatten.append(", REMARKS = ?");
            list.add(JsonUtil.get(jsonObj, "remarks"));
        }
        if (jsonObj.has("cardNo")) {
            updatePatten.append(", CARD_NO = ?");
            list.add(JsonUtil.get(jsonObj, "cardNo"));
        }
        if (jsonObj.has("imsi")) {
            updatePatten.append(", IMSI = ?");
            list.add(JsonUtil.get(jsonObj, "imsi"));
        }
        if (jsonObj.has("subscriberNumber")) {
            updatePatten.append(", SUBSCRIBER_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj, "subscriberNumber"));
        }
        if (jsonObj.has("number")) {
            updatePatten.append(", NUMBER = ?");
            list.add(JsonUtil.get(jsonObj, "number"));
        }
        if (jsonObj.has("testcardStatusEnumId")) {
            updatePatten.append(", TESTCARD_STATUS_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj, "testcardStatusEnumId"));
        }
        if (jsonObj.has("balance")) {
            updatePatten.append(", BALANCE = ?");
            list.add(JsonUtil.get(jsonObj, "balance"));
        } 
        if (jsonObj.has("lendFlag")) {
            updatePatten.append(", LEND_FLAG = ?");
            list.add(JsonUtil.get(jsonObj, "lendFlag"));
        }
        if (jsonObj.has("lendDepartmentId")) {
            updatePatten.append(", LEND_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentId"));
        }
        if (jsonObj.has("lenderId")) {
            updatePatten.append(", LENDER_ID = ?");
            list.add(JsonUtil.get(jsonObj, "lenderId"));
        }
        if (jsonObj.has("lendTime")) {
            updatePatten.append(", LEND_TIME = ?");
            list.add(JsonUtil.get(jsonObj, "lendTime"));
        }
        if (jsonObj.has("planReturnTime")) {
            updatePatten.append(", PLAN_RETURN_TIME = ?");
            list.add(JsonUtil.get(jsonObj, "planReturnTime"));
        }
        if (jsonObj.has("sheetSerialNumber")) {
            updatePatten.append(", SHEET_SERIAL_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj, "sheetSerialNumber"));
        }
        if (jsonObj.has("overState")) {
            updatePatten.append(", OVER_STATE = ?");
            list.add(JsonUtil.get(jsonObj, "overState"));
        }
        if (jsonObj.has("createdBy")) {
            updatePatten.append(", CREATED_BY = ?");
            list.add(JsonUtil.get(jsonObj, "createdBy"));
        }
        if (jsonObj.has("creationDate")) {
            updatePatten.append(", CREATION_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "creationDate"));
        }
        if (jsonObj.has("lastUpdatedBy")) {
            updatePatten.append(", LAST_UPDATED_BY = ?");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
        } 
        if (jsonObj.has("lastUpdateDate")) {
            updatePatten.append(", LAST_UPDATE_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "lastUpdateDate"));
        }
        if (jsonObj.has("deletedFlag")) {
            updatePatten.append(", DELETED_FLAG = ?");
            list.add(JsonUtil.get(jsonObj, "deletedFlag"));
        }
        if (jsonObj.has("deletedBy")) {
            updatePatten.append(", DELETED_BY = ?");
            list.add(JsonUtil.get(jsonObj, "deletedBy"));
        }
        if (jsonObj.has("deletionDate")) {
            updatePatten.append(", DELETION_DATE = ?");
            list.add(JsonUtil.get(jsonObj, "deletionDate"));
        }
        if (jsonObj.has("marketingAreaId")) {
            updatePatten.append(", MARKETING_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj, "marketingAreaId"));
        }
        if (jsonObj.has("maintenanceAreaId")) {
            updatePatten.append(", MAINTENANCE_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj, "maintenanceAreaId"));
        }
        if (jsonObj.has("orgId")) {
            updatePatten.append(", ORG_ID = ?");
            list.add(JsonUtil.get(jsonObj, "orgId"));
        }
        if (jsonObj.has("attributionProvinceName")) {
            updatePatten.append(", ATTRIBUTION_PROVINCE_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "attributionProvinceName"));
        }
        if (jsonObj.has("attributionCityName")) {
            updatePatten.append(", ATTRIBUTION_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "attributionCityName"));
        }
        if (jsonObj.has("storageDepartmentName")) {
            updatePatten.append(", STORAGE_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentName"));
        }
        if (jsonObj.has("adminName")) {
            updatePatten.append(", ADMIN_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "adminName"));
        }
        if (jsonObj.has("lendDepartmentName")) {
            updatePatten.append(", LEND_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentName"));
        }
        if (jsonObj.has("lenderName")) {
            updatePatten.append(", LENDER_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "lenderName"));
        }
        if (jsonObj.has("storageCityId")) {
            updatePatten.append(", STORAGE_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityId"));
        }
        if (jsonObj.has("storageCityName")) {
            updatePatten.append(", STORAGE_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityName"));
        }
        updatePatten.append(", RECORD_VERSION = RECORD_VERSION+1");
        
        sqlBuf.append(updatePatten.substring(1));
        sqlBuf.append(" WHERE TEST_CARD_ID = ?");
        list.add(JsonUtil.get(jsonObj, "testCardId"));
        
        super.update(sqlBuf.toString(), list.toArray());
    }

    @Override
    public void modifyImsInfo(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE  T_EOM_FIXED_TELEPHON_INFO SET ");
        if(jsonObj.has("fixedTelId")){
            updatePatten.append(",FIXED_TEL_ID = ?");
            list.add(JsonUtil.get(jsonObj,"fixedTelId"));
        }
        if(jsonObj.has("attributionProvinceId")){
            updatePatten.append(",ATTRIBUTION_PROVINCE_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attributionProvinceId"));
        }
        if(jsonObj.has("attributionCityId")){
            updatePatten.append(",ATTRIBUTION_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attributionCityId"));
        }
        if(jsonObj.has("testcardStatusEnumId")){
            updatePatten.append(",TESTCARD_STATUS_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"testcardStatusEnumId"));
        }
        if(jsonObj.has("effectiveDate")){
            updatePatten.append(",EFFECTIVE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"effectiveDate"));
        }
        if(jsonObj.has("cancelDate")){
            updatePatten.append(",CANCEL_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"cancelDate"));
        }
        if(jsonObj.has("wareManId")){
            updatePatten.append(",WARE_MAN_ID = ?");
            list.add(JsonUtil.get(jsonObj,"wareManId"));
        }
        if(jsonObj.has("storageDepartmentId")){
            updatePatten.append(",STORAGE_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"storageDepartmentId"));
        }
        if(jsonObj.has("adminId")){
            updatePatten.append(",ADMIN_ID = ?");
            list.add(JsonUtil.get(jsonObj,"adminId"));
        }
        if(jsonObj.has("storagePlace")){
            updatePatten.append(",STORAGE_PLACE = ?");
            list.add(JsonUtil.get(jsonObj,"storagePlace"));
        }
        if(jsonObj.has("cardUse")){
            updatePatten.append(",CARD_USE = ?");
            list.add(JsonUtil.get(jsonObj,"cardUse"));
        }
        if(jsonObj.has("remarks")){
            updatePatten.append(",REMARKS = ?");
            list.add(JsonUtil.get(jsonObj,"remarks"));
        }
        if(jsonObj.has("phoneNumber")){
            updatePatten.append(",PHONE_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"phoneNumber"));
        }
        if(jsonObj.has("fixedPhoneTypeEnumId")){
            updatePatten.append(",FIXED_PHONE_TYPE_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"fixedPhoneTypeEnumId"));
        }
        if(jsonObj.has("teleFunction")){
            updatePatten.append(",TELE_FUNCTION = ?");
            list.add(JsonUtil.get(jsonObj,"teleFunction"));
        }
        if(jsonObj.has("number")){
            updatePatten.append(",NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"number"));
        }
        if(jsonObj.has("lendFlag")){
            updatePatten.append(",LEND_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"lendFlag"));
        }
        if(jsonObj.has("lendDepartmentId")){
            updatePatten.append(",LEND_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"lendDepartmentId"));
        }
        if(jsonObj.has("lenderId")){
            updatePatten.append(",LENDER_ID = ?");
            list.add(JsonUtil.get(jsonObj,"lenderId"));
        }
        if(jsonObj.has("lendTime")){
            updatePatten.append(",LEND_TIME = ?");
            list.add(JsonUtil.get(jsonObj,"lendTime"));
        }
        if(jsonObj.has("planReturnTime")){
            updatePatten.append(",PLAN_RETURN_TIME = ?");
            list.add(JsonUtil.get(jsonObj,"planReturnTime"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            updatePatten.append(",SHEET_SERIAL_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"sheetSerialNumber"));
        }
        if(jsonObj.has("overState")){
            updatePatten.append(",OVER_STATE = ?");
            list.add(JsonUtil.get(jsonObj,"overState"));
        }
        if(jsonObj.has("createdBy")){
            updatePatten.append(",CREATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"createdBy"));
        }
        if(jsonObj.has("creationDate")){
            updatePatten.append(",CREATION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"creationDate"));
        }
        if(jsonObj.has("lastUpdatedBy")){
            updatePatten.append(",LAST_UPDATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdatedBy"));
        }
        if(jsonObj.has("lastUpdateDate")){
            updatePatten.append(",LAST_UPDATE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdateDate"));
        }
        if(jsonObj.has("recordVersion")){
            updatePatten.append(",RECORD_VERSION = ?");
            list.add(JsonUtil.get(jsonObj,"recordVersion"));
        }
        if(jsonObj.has("deletedFlag")){
            updatePatten.append(",DELETED_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"deletedFlag"));
        }
        if(jsonObj.has("deletedBy")){
            updatePatten.append(",DELETED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"deletedBy"));
        }
        if(jsonObj.has("deletionDate")){
            updatePatten.append(",DELETION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"deletionDate"));
        }
        if(jsonObj.has("marketingAreaId")){
            updatePatten.append(",MARKETING_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj,"marketingAreaId"));
        }
        if(jsonObj.has("maintenanceAreaId")){
            updatePatten.append(",MAINTENANCE_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj,"maintenanceAreaId"));
        }
        if(jsonObj.has("orgId")){
            updatePatten.append(",ORG_ID = ?");
            list.add(JsonUtil.get(jsonObj,"orgId"));
        }
        if(jsonObj.has("attribute1")){
            updatePatten.append(",ATTRIBUTE1 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute1"));
        }
        if(jsonObj.has("attribute2")){
            updatePatten.append(",ATTRIBUTE2 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute2"));
        }
        if(jsonObj.has("attribute3")){
            updatePatten.append(",ATTRIBUTE3 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute3"));
        }
        if(jsonObj.has("attribute4")){
            updatePatten.append(",ATTRIBUTE4 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute4"));
        }
        if(jsonObj.has("attribute5")){
            updatePatten.append(",ATTRIBUTE5 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute5"));
        }
        if(jsonObj.has("attributionProvinceName")){
            updatePatten.append(",ATTRIBUTION_PROVINCE_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attributionProvinceName"));
        }
        if(jsonObj.has("attributionCityName")){
            updatePatten.append(",ATTRIBUTION_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attributionCityName"));
        }
        if(jsonObj.has("storageDepartmentName")){
            updatePatten.append(",STORAGE_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"storageDepartmentName"));
        }
        if(jsonObj.has("adminName")){
            updatePatten.append(",ADMIN_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"adminName"));
        }
        if(jsonObj.has("lendDepartmentName")){
            updatePatten.append(",LEND_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"lendDepartmentName"));
        }
        if(jsonObj.has("lenderName")){
            updatePatten.append(",LENDER_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"lenderName"));
        }
        if (jsonObj.has("storageCityId")) {
            updatePatten.append(", STORAGE_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityId"));
        }
        if (jsonObj.has("storageCityName")) {
            updatePatten.append(", STORAGE_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityName"));
        }
        updatePatten.append(", RECORD_VERSION = RECORD_VERSION+1");
        sqlBuf.append(updatePatten.substring(1));
        sqlBuf.append(" WHERE FIXED_TEL_ID = ?");
         list.add(JsonUtil.get(jsonObj, "fixedTelId"));
        super.update(sqlBuf.toString(), list.toArray());
    }
 
    @Override
    public void modifyTerminalInfo(JSONObject jsonObj) throws Exception {

        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE  T_EOM_TEST_TERMINAL_INFO SET ");
        if(jsonObj.has("testTerminalId")){
            updatePatten.append(",TEST_TERMINAL_ID = ?");
            list.add(JsonUtil.get(jsonObj,"testTerminalId"));
        }
        if(jsonObj.has("attributionProvinceId")){
            updatePatten.append(",ATTRIBUTION_PROVINCE_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attributionProvinceId"));
        }
        if(jsonObj.has("attributionCityId")){
            updatePatten.append(",ATTRIBUTION_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attributionCityId"));
        }
        if(jsonObj.has("storagePlace")){
            updatePatten.append(",STORAGE_PLACE = ?");
            list.add(JsonUtil.get(jsonObj,"storagePlace"));
        }
        if(jsonObj.has("cardUse")){
            updatePatten.append(",CARD_USE = ?");
            list.add(JsonUtil.get(jsonObj,"cardUse"));
        }
        if(jsonObj.has("remarks")){
            updatePatten.append(",REMARKS = ?");
            list.add(JsonUtil.get(jsonObj,"remarks"));
        }
        if(jsonObj.has("adminId")){
            updatePatten.append(",ADMIN_ID = ?");
            list.add(JsonUtil.get(jsonObj,"adminId"));
        }
        if(jsonObj.has("storageDepartmentId")){
            updatePatten.append(",STORAGE_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"storageDepartmentId"));
        }
        if(jsonObj.has("wareManId")){
            updatePatten.append(",WARE_MAN_ID = ?");
            list.add(JsonUtil.get(jsonObj,"wareManId"));
        }
        if(jsonObj.has("cancelDate")){
            updatePatten.append(",CANCEL_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"cancelDate"));
        }
        if(jsonObj.has("effectiveDate")){
            updatePatten.append(",EFFECTIVE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"effectiveDate"));
        }
        if(jsonObj.has("testcardStatusEnumId")){
            updatePatten.append(",TESTCARD_STATUS_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"testcardStatusEnumId"));
        }
        if(jsonObj.has("moblieTypeEnumId")){
            updatePatten.append(",MOBLIE_TYPE_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"moblieTypeEnumId"));
        }
        if(jsonObj.has("manufacturerName")){
            updatePatten.append(",MANUFACTURER_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"manufacturerName"));
        }
        if(jsonObj.has("phoneModel")){
            updatePatten.append(",PHONE_MODEL = ?");
            list.add(JsonUtil.get(jsonObj,"phoneModel"));
        }
        if(jsonObj.has("imei")){
            updatePatten.append(",IMEI = ?");
            list.add(JsonUtil.get(jsonObj,"imei"));
        }
        if(jsonObj.has("number")){
            updatePatten.append(",NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"number"));
        }
        if(jsonObj.has("lendFlag")){
            updatePatten.append(",LEND_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"lendFlag"));
        }
        if(jsonObj.has("lendDepartmentId")){
            updatePatten.append(",LEND_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"lendDepartmentId"));
        }
        if(jsonObj.has("lenderId")){
            updatePatten.append(",LENDER_ID = ?");
            list.add(JsonUtil.get(jsonObj,"lenderId"));
        }
        if(jsonObj.has("lendTime")){
            updatePatten.append(",LEND_TIME = ?");
            list.add(JsonUtil.get(jsonObj,"lendTime"));
        }
        if(jsonObj.has("planReturnTime")){
            updatePatten.append(",PLAN_RETURN_TIME = ?");
            list.add(JsonUtil.get(jsonObj,"planReturnTime"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            updatePatten.append(",SHEET_SERIAL_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"sheetSerialNumber"));
        }
        if(jsonObj.has("overState")){
            updatePatten.append(",OVER_STATE = ?");
            list.add(JsonUtil.get(jsonObj,"overState"));
        }
        if(jsonObj.has("createdBy")){
            updatePatten.append(",CREATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"createdBy"));
        }
        if(jsonObj.has("creationDate")){
            updatePatten.append(",CREATION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"creationDate"));
        }
        if(jsonObj.has("lastUpdatedBy")){
            updatePatten.append(",LAST_UPDATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdatedBy"));
        }
        if(jsonObj.has("lastUpdateDate")){
            updatePatten.append(",LAST_UPDATE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdateDate"));
        }
        if(jsonObj.has("recordVersion")){
            updatePatten.append(",RECORD_VERSION = ?");
            list.add(JsonUtil.get(jsonObj,"recordVersion"));
        }
        if(jsonObj.has("deletedFlag")){
            updatePatten.append(",DELETED_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"deletedFlag"));
        }
        if(jsonObj.has("deletedBy")){
            updatePatten.append(",DELETED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"deletedBy"));
        }
        if(jsonObj.has("deletionDate")){
            updatePatten.append(",DELETION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"deletionDate"));
        }
        if(jsonObj.has("marketingAreaId")){
            updatePatten.append(",MARKETING_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj,"marketingAreaId"));
        }
        if(jsonObj.has("maintenanceAreaId")){
            updatePatten.append(",MAINTENANCE_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj,"maintenanceAreaId"));
        }
        if(jsonObj.has("orgId")){
            updatePatten.append(",ORG_ID = ?");
            list.add(JsonUtil.get(jsonObj,"orgId"));
        }
        if(jsonObj.has("attribute1")){
            updatePatten.append(",ATTRIBUTE1 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute1"));
        }
        if(jsonObj.has("attribute2")){
            updatePatten.append(",ATTRIBUTE2 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute2"));
        }
        if(jsonObj.has("attribute3")){
            updatePatten.append(",ATTRIBUTE3 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute3"));
        }
        if(jsonObj.has("attribute4")){
            updatePatten.append(",ATTRIBUTE4 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute4"));
        }
        if(jsonObj.has("attribute5")){
            updatePatten.append(",ATTRIBUTE5 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute5"));
        }
        if(jsonObj.has("attributionProvinceName")){
            updatePatten.append(",ATTRIBUTION_PROVINCE_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attributionProvinceName"));
        }
        if(jsonObj.has("attributionCityName")){
            updatePatten.append(",ATTRIBUTION_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attributionCityName"));
        }
        if(jsonObj.has("storageDepartmentName")){
            updatePatten.append(",STORAGE_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"storageDepartmentName"));
        }
        if(jsonObj.has("adminName")){
            updatePatten.append(",ADMIN_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"adminName"));
        }
        if(jsonObj.has("lendDepartmentName")){
            updatePatten.append(",LEND_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"lendDepartmentName"));
        }
        if(jsonObj.has("lenderName")){
            updatePatten.append(",LENDER_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"lenderName"));
        }
        if (jsonObj.has("storageCityId")) {
            updatePatten.append(", STORAGE_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityId"));
        }
        if (jsonObj.has("storageCityName")) {
            updatePatten.append(", STORAGE_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityName"));
        }
        updatePatten.append(", RECORD_VERSION = RECORD_VERSION+1");
        sqlBuf.append(updatePatten.substring(1));
        sqlBuf.append(" WHERE TEST_TERMINAL_ID = ?");
         list.add(JsonUtil.get(jsonObj, "testTerminalId"));
        super.update(sqlBuf.toString(), list.toArray());
    } 
   
    @Override
    public void modifyRechCardInfo(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE  T_EOM_RECH_CARD_INFO SET ");
        if(jsonObj.has("rechCardId")){
            updatePatten.append(",RECH_CARD_ID = ?");
            list.add(JsonUtil.get(jsonObj,"rechCardId"));
        }
        if(jsonObj.has("attributionProvinceId")){
            updatePatten.append(",ATTRIBUTION_PROVINCE_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attributionProvinceId"));
        }
        if(jsonObj.has("attributionCityId")){
            updatePatten.append(",ATTRIBUTION_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attributionCityId"));
        }
        if(jsonObj.has("testcardStatusEnumId")){
            updatePatten.append(",TESTCARD_STATUS_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"testcardStatusEnumId"));
        }
        if(jsonObj.has("rechCardTypeEnumId")){
            updatePatten.append(",RECH_CARD_TYPE_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"rechCardTypeEnumId"));
        }
        if(jsonObj.has("effectiveDate")){
            updatePatten.append(",EFFECTIVE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"effectiveDate"));
        }
        if(jsonObj.has("cancelDate")){
            updatePatten.append(",CANCEL_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"cancelDate"));
        }
        if(jsonObj.has("wareManId")){
            updatePatten.append(",WARE_MAN_ID = ?");
            list.add(JsonUtil.get(jsonObj,"wareManId"));
        }
        if(jsonObj.has("storageDepartmentId")){
            updatePatten.append(",STORAGE_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"storageDepartmentId"));
        }
        if(jsonObj.has("adminId")){
            updatePatten.append(",ADMIN_ID = ?");
            list.add(JsonUtil.get(jsonObj,"adminId"));
        }
        if(jsonObj.has("storagePlace")){
            updatePatten.append(",STORAGE_PLACE = ?");
            list.add(JsonUtil.get(jsonObj,"storagePlace"));
        }
        if(jsonObj.has("cardUse")){
            updatePatten.append(",CARD_USE = ?");
            list.add(JsonUtil.get(jsonObj,"cardUse"));
        }
        if(jsonObj.has("remarks")){
            updatePatten.append(",REMARKS = ?");
            list.add(JsonUtil.get(jsonObj,"remarks"));
        }
        if(jsonObj.has("cardNo")){
            updatePatten.append(",CARD_NO = ?");
            list.add(JsonUtil.get(jsonObj,"cardNo"));
        }
        if(jsonObj.has("parValue")){
            updatePatten.append(",PAR_VALUE = ?");
            list.add(JsonUtil.get(jsonObj,"parValue"));
        }
        if(jsonObj.has("cardNumber")){
            updatePatten.append(",CARD_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"cardNumber"));
        }
        if(jsonObj.has("lendFlag")){
            updatePatten.append(",LEND_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"lendFlag"));
        }
        if(jsonObj.has("lendDepartmentId")){
            updatePatten.append(",LEND_DEPARTMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"lendDepartmentId"));
        }
        if(jsonObj.has("lenderId")){
            updatePatten.append(",LENDER_ID = ?");
            list.add(JsonUtil.get(jsonObj,"lenderId"));
        }
        if(jsonObj.has("lendTime")){
            updatePatten.append(",LEND_TIME = ?");
            list.add(JsonUtil.get(jsonObj,"lendTime"));
        }
        if(jsonObj.has("planReturnTime")){
            updatePatten.append(",PLAN_RETURN_TIME = ?");
            list.add(JsonUtil.get(jsonObj,"planReturnTime"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            updatePatten.append(",SHEET_SERIAL_NUMBER = ?");
            list.add(JsonUtil.get(jsonObj,"sheetSerialNumber"));
        }
        if(jsonObj.has("overState")){
            updatePatten.append(",OVER_STATE = ?");
            list.add(JsonUtil.get(jsonObj,"overState"));
        }
        if(jsonObj.has("createdBy")){
            updatePatten.append(",CREATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"createdBy"));
        }
        if(jsonObj.has("creationDate")){
            updatePatten.append(",CREATION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"creationDate"));
        }
        if(jsonObj.has("lastUpdatedBy")){
            updatePatten.append(",LAST_UPDATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdatedBy"));
        }
        if(jsonObj.has("lastUpdateDate")){
            updatePatten.append(",LAST_UPDATE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdateDate"));
        }
        if(jsonObj.has("recordVersion")){
            updatePatten.append(",RECORD_VERSION = ?");
            list.add(JsonUtil.get(jsonObj,"recordVersion"));
        }
        if(jsonObj.has("deletedFlag")){
            updatePatten.append(",DELETED_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"deletedFlag"));
        }
        if(jsonObj.has("deletedBy")){
            updatePatten.append(",DELETED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"deletedBy"));
        }
        if(jsonObj.has("deletionDate")){
            updatePatten.append(",DELETION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"deletionDate"));
        }
        if(jsonObj.has("marketingAreaId")){
            updatePatten.append(",MARKETING_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj,"marketingAreaId"));
        }
        if(jsonObj.has("maintenanceAreaId")){
            updatePatten.append(",MAINTENANCE_AREA_ID = ?");
            list.add(JsonUtil.get(jsonObj,"maintenanceAreaId"));
        }
        if(jsonObj.has("orgId")){
            updatePatten.append(",ORG_ID = ?");
            list.add(JsonUtil.get(jsonObj,"orgId"));
        }
        if(jsonObj.has("attribute1")){
            updatePatten.append(",ATTRIBUTE1 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute1"));
        }
        if(jsonObj.has("attribute2")){
            updatePatten.append(",ATTRIBUTE2 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute2"));
        }
        if(jsonObj.has("attribute3")){
            updatePatten.append(",ATTRIBUTE3 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute3"));
        }
        if(jsonObj.has("attribute4")){
            updatePatten.append(",ATTRIBUTE4 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute4"));
        }
        if(jsonObj.has("attribute5")){
            updatePatten.append(",ATTRIBUTE5 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute5"));
        }
        if(jsonObj.has("attributionProvinceName")){
            updatePatten.append(",ATTRIBUTION_PROVINCE_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attributionProvinceName"));
        }
        if(jsonObj.has("attributionCityName")){
            updatePatten.append(",ATTRIBUTION_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attributionCityName"));
        }
        if(jsonObj.has("storageDepartmentName")){
            updatePatten.append(",STORAGE_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"storageDepartmentName"));
        }
        if(jsonObj.has("adminName")){
            updatePatten.append(",ADMIN_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"adminName"));
        }
        if(jsonObj.has("lendDepartmentName")){
            updatePatten.append(",LEND_DEPARTMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"lendDepartmentName"));
        }
        if(jsonObj.has("lenderName")){
            updatePatten.append(",LENDER_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"lenderName"));
        }
        if (jsonObj.has("storageCityId")) {
            updatePatten.append(", STORAGE_CITY_ID = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityId"));
        }
        if (jsonObj.has("storageCityName")) {
            updatePatten.append(", STORAGE_CITY_NAME = ?");
            list.add(JsonUtil.get(jsonObj, "storageCityName"));
        }
        updatePatten.append(", RECORD_VERSION = RECORD_VERSION+1");
        sqlBuf.append(updatePatten.substring(1));
        sqlBuf.append(" WHERE RECH_CARD_ID = ?");
         list.add(JsonUtil.get(jsonObj, "rechCardId"));
        super.update(sqlBuf.toString(), list.toArray());
    } 

    @Override
    public Page qryOrderPageForTestCardManage(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT CARD_SHEET_ID as cardSheetId,SHEET_THEME as sheetTheme," +
                "SHEET_SERIAL_NUMBER as sheetSerialNumber," +
                "WO_STATUS_ENUM_ID as woStatusEnumId,LOCALE_ID as localeId," +
                "COMPANY_NAME as companyName,DISPATCH_DATE as dispatchDate," +
                "REQUIRED_FINISH_TIME as requiredFinishTime," +
                "CARD_OPERATION_TYPE_ENUM_ID as cardOperationTypeEnumId," +
                "EXPECTED_RETURN_TIME as expectedReturnTime," +
                "CONTENT as content,REMARKS as remarks,FINISH_TIME as finishTime," +
                "AUDIT_DEPARTMENT_ID as auditDepartmentId," +
                "AUDIT_PERSON_ID as auditPersonId," +
                "EXECUTE_DEPARTMENT_ID as executeDepartmentId," +
                "EXECUTE_PERSON_ID as executePersonId," +
                "ACCEPT_DEPARTMENT_ID as acceptDepartmentId," +
                "ACCEPT_PERSON_ID as acceptPersonId," +
                "IFNULL(DEAL_GROUP_ID,DEAL_MAN_ID) as dealGroupOrMan," +
                "DEAL_GROUP_ID as dealGroupId," +
                "DEAL_MAN_ID as dealManId,ARCHIVE_BASE_DATE as archiveBaseDate," +
                "CREATED_BY as createdBy,CREATION_DATE as creationDate," +
                "case CARD_OPERATION_TYPE_ENUM_ID when '2' then '测试卡移交' when '5' " +
                " then '测试卡报废' when '3' then '测试卡借用' when '1' then '测试卡调拨' when '4' " +
                " then '测试卡归还' when '6' then '测试卡清查' else '' end as sheetTypeName," +
                "case WO_STATUS_ENUM_ID when 1 then '待派发' " +
                " when 2 then '待接收' when 3 then '完成' else '' end as sheetStatusName " +
                "FROM T_EOM_CARD_SHEET where DELETED_FLAG = 0 ");
        sqlBuf.append(" and CARD_SHEET_ID IN ( ");
        sqlBuf.append(" SELECT CARD_SHEET_ID FROM T_EOM_SHEET_CARD_RELEVANCE SC ");
        sqlBuf.append(" WHERE SC.DELETED_FLAG = 0 ");
        if (JsonUtil.getString(jsonObj, "testobjectTypeEnumId") != null
                && jsonObj.getString("testobjectTypeEnumId").length() > 0) {
            sqlBuf.append("and SC.TESTOBJECT_TYPE='"
                    + JsonUtil.get(jsonObj, "testobjectTypeEnumId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "cardId") != null
                && jsonObj.getString("cardId").length() > 0) {
            sqlBuf.append("and SC.TESTOBJECT_ID ='" + JsonUtil.get(jsonObj, "cardId") + "'");
        }
        sqlBuf.append(" ) ");
        return super.getPageQuery(sqlBuf.toString(), jsonObj);
    }

}
