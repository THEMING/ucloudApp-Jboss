package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.List;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONException;
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
public class TestCardRegisterDAOImpl extends BaseDAOImpl implements ITestCardRegisterDAO {

    @Override
    public List<Map<String, Object>> qryTestCardListByParam(JSONObject jsonObj) throws Exception {
        return super.queryForList(qryTestCardSql(jsonObj).toString());
    }

    @Override
    public Page qryTestCardPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(qryTestCardSql(jsonObj).toString(), jsonObj);
    }

    public StringBuffer qryTestCardSql(JSONObject jsonObj) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.TEST_CARD_ID as testCardId ")
                .append(",A.TESTCARD_TYPE_ENUM_ID as testcardTypeEnumId ")
                .append(",'测试卡' as testobjectName ")
                .append(",A.NUMBER as numberTmp ")
                .append(",A.CARD_NO as cardNo ")
                .append(",1 as testobjectType ")
                .append(",A.TEST_CARD_ID as testobjectId ")
                .append(",CASE A.TESTCARD_TYPE_ENUM_ID WHEN 1 THEN '国际漫入'  WHEN 2 THEN '国际漫出' ")
                .append(" WHEN 3 THEN '国内漫入' WHEN 4 THEN '国内漫出' WHEN 5 THEN '省内漫入' ")
                .append(" WHEN 6 THEN '省内漫出' WHEN 7 THEN '本地测试' ELSE '' END as testcardTypeEnumName ")
                .append(",A.OPERATOR_ENUM_ID as operatorEnumId ")
                .append(",CASE A.OPERATOR_ENUM_ID WHEN 1 THEN '联通'  WHEN 2 THEN '移动' ")
                .append(" WHEN 3 THEN '电信' ELSE '' END as operatorEnumName ")
                .append(",A.CARD_NETWORK_TYPE_ENUM_ID as cardNetworkTypeEnumId ")
                .append(",CASE A.CARD_NETWORK_TYPE_ENUM_ID WHEN 1 THEN 'GSM'  WHEN 2 THEN 'WCDMA' ")
                .append(" WHEN 3 THEN 'HSPA' WHEN 4 THEN 'IP' WHEN 5 THEN '其他' ")
                .append(" ELSE '' END as cardNetworkTypeEnumName ")
                .append(",A.ATTRIBUTION_COUNTRY_ENUM_ID as attributionCountryEnumId ")
                .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
                .append(",A.ATTRIBUTION_CITY_ID as attributionCityId ")
                .append(",A.ATTRIBUTION_SCP as attributionScp ")
                .append(",A.SCP_MANUFACTURER as scpManufacturer ")
                .append(",A.EFFECTIVE_DATE as effectiveDate ")
                .append(",A.ATTRIBUTION_HLR as attributionHlr ")
                .append(",A.HLR_MANUFACTURER as hlrManufacturer ")
                .append(",A.CANCEL_DATE as cancelDate ").append(",A.PIN1 as pin1 ")
                .append(",A.PIN2 as pin2 ").append(",A.LAST_TEST_DATE as lastTestDate ")
                .append(",A.PUK1 as puk1 ").append(",A.PUK2 as puk2 ")
                .append(",A.WARE_MAN_ID as wareManId ")
                .append(",A.PACKAGE_TYPE as packageTypeEnumId ")
                .append(",A.PACKAGE_TYPE ")
                .append("as packageTypeEnumName ")
                .append(",A.ATTCH_PACKAGE_TYPE as attchPackageEnumId ")
                 .append(",A.ATTCH_PACKAGE_TYPE ")
                .append(" as attchPackageEnumName ")
                .append(",A.STORAGE_DEPARTMENT_ID as storageDepartmentId ")
                .append(",A.MONTH_GRANTS as monthGrants ")
                .append(",A.WHETHER_PREPAID as whetherPrepaid ")
                 .append(",CASE A.WHETHER_PREPAID WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as whetherPrepaidName ")
                .append(",A.ADMIN_ID as adminId ")
                .append(",A.STORAGE_PLACE as storagePlace ").append(",A.CARD_USE as cardUse ")
                .append(",A.REMARKS as remarks ").append(",A.CARD_NO as cardNo ")
                .append(",A.IMSI as imsi ").append(",A.SUBSCRIBER_NUMBER as subscriberNumber ")
                .append(",A.NUMBER as number ")
                .append(",A.TESTCARD_STATUS_ENUM_ID as testcardStatusEnumId ")
                .append(",CASE A.TESTCARD_STATUS_ENUM_ID WHEN 1 THEN '正常'  WHEN 2 THEN '故障' ")
                .append(" WHEN 3 THEN '报废' WHEN 4 THEN '送修' WHEN 5 THEN '欠费停机' WHEN 6 THEN 'SIM卡注册失败' ")
                .append(" ELSE '' END as testcardStatusEnumName ")
                .append(",A.BALANCE as balance ")
                .append(",A.LEND_FLAG as lendFlag ")
                .append(",CASE A.LEND_FLAG WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as lendFlagName ")
                .append(",A.LEND_DEPARTMENT_ID as lendDepartmentId ")
                .append(",A.LENDER_ID as lenderId ").append(",A.LEND_TIME as lendTime ")
                .append(",A.PLAN_RETURN_TIME as planReturnTime ")
                .append(",A.SHEET_SERIAL_NUMBER as sheetSerialNumber ")
                .append(",A.OVER_STATE as overState ").append(",A.CREATED_BY as createdBy ")
                .append(",A.CREATION_DATE as creationDate ")
                .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
                .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
                .append(",A.RECORD_VERSION as recordVersion ")
                .append(",A.DELETED_FLAG as deletedFlag ").append(",A.DELETED_BY as deletedBy ")
                .append(",A.DELETION_DATE as deletionDate ")
                .append(",A.MARKETING_AREA_ID as marketingAreaId ")
                .append(",A.MAINTENANCE_AREA_ID as maintenanceAreaId ")
                .append(",A.ORG_ID as orgId ").append(",A.ATTRIBUTE1 as attribute1 ")
                .append(",A.ATTRIBUTE2 as attribute2 ").append(",A.ATTRIBUTE3 as attribute3 ")
                .append(",A.ATTRIBUTE4 as attribute4 ").append(",A.ATTRIBUTE5 as attribute5 ")
                .append(",A.ATTRIBUTION_PROVINCE_NAME AS attributionProvinceName ")
                .append(",A.ATTRIBUTION_CITY_NAME AS attributionCityName")
                .append(",A.STORAGE_DEPARTMENT_NAME AS storageDepartmentName")
                .append(",A.ADMIN_NAME AS adminName")
                .append(",A.LEND_DEPARTMENT_NAME AS lendDepartmentName")
                .append(",A.LENDER_NAME AS lenderName")
                .append(",A.STORAGE_CITY_ID as storageCityId")
                .append(",A.STORAGE_CITY_NAME as storageCityName ")
                .append(" from T_EOM_TEST_CARD_INFO A ");
                /**
                 * 判断测试卡是否在途中  
                 */
                if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
                        &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
                    sqlBuf.append("left JOIN ( "+
                        "select DISTINCT scr.TESTOBJECT_ID as id from T_EOM_SHEET_CARD_RELEVANCE scr  "+
                        "JOIN T_EOM_CARD_SHEET cs  "+
                        "ON scr.CARD_SHEET_ID = cs.CARD_SHEET_ID  "+
                        "where cs.WO_STATUS_ENUM_ID IN (2, 5) and cs.DELETED_FLAG = 0 "+
                        "and scr.DELETED_FLAG = 0 and scr.TESTOBJECT_TYPE = 1 "+
                        ") B on A.TEST_CARD_ID=B.id ");
                }
        
                sqlBuf.append(" where  A.DELETED_FLAG = 0 ");
			        /**
			         * 判断测试卡是否在途中  
			         */
				if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
			        &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
					sqlBuf.append("and B.id is null ");
				}
                if(JsonUtil.getString(jsonObj,"testCancelDateStartQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"testCancelDateStartQry"))){
                    sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) >UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"testCancelDateStartQry")+"') ");
                }
                if(JsonUtil.getString(jsonObj,"testCancelDateEndQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"testCancelDateEndQry"))){
                    sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) <UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"testCancelDateEndQry")+"') ");
                }

            if(JsonUtil.getString(jsonObj,"selectIds")!=null&&!"".equals(JsonUtil.getString(jsonObj,"selectIds"))){
                sqlBuf.append(" and A.TEST_CARD_ID in ("+JsonUtil.getString(jsonObj,"selectIds")+") ");
            }
        
            if (JsonUtil.getString(jsonObj, "testCardId") != null
                    && JsonUtil.getString(jsonObj, "testCardId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testCardId"))) {
                sqlBuf.append(" and A.TEST_CARD_ID ='" + JsonUtil.getString(jsonObj, "testCardId")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "cardNo") != null
                    && JsonUtil.getString(jsonObj, "cardNo").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "cardNo"))) {
                sqlBuf.append(" and A.CARD_NO like '%" + JsonUtil.getString(jsonObj, "cardNo")
                        + "%' ");
            }
            if (JsonUtil.getString(jsonObj, "subscriberNumber") != null
                    && JsonUtil.getString(jsonObj, "subscriberNumber").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "subscriberNumber"))) {
                sqlBuf.append(" and A.SUBSCRIBER_NUMBER like '%"
                        + JsonUtil.getString(jsonObj, "subscriberNumber") + "%' ");
            }
            if (JsonUtil.getString(jsonObj, "testcardStatusEnumId") != null
                    && JsonUtil.getString(jsonObj, "testcardStatusEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testcardStatusEnumId"))) {
                sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in('"
                        + JsonUtil.getString(jsonObj, "testcardStatusEnumId") + "') ");
            }
            if (JsonUtil.getString(jsonObj, "testStatusEnumId") != null
                    && JsonUtil.getString(jsonObj, "testStatusEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testStatusEnumId"))) {
                sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in("
                        + JsonUtil.getString(jsonObj, "testStatusEnumId") + ") ");
            }
            if(JsonUtil.getString(jsonObj,"unUsedCard")!=null&&!"".equals(JsonUtil.getString(jsonObj,"unUsedCard"))
                    &&"0".equals(JsonUtil.getString(jsonObj,"unUsedCard"))){//如果为0,不需要查报废的卡
            	sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID not in("
                        + 3 + ") ");
            }
            if (JsonUtil.getString(jsonObj, "lendFlag") != null
                    && JsonUtil.getString(jsonObj, "lendFlag").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "lendFlag"))) {
                sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "lendFlag")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "testIsLend") != null
                    && JsonUtil.getString(jsonObj, "testIsLend").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testIsLend"))) {
                sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "testIsLend")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "attributionCountryEnumId") != null
                    && JsonUtil.getString(jsonObj, "attributionCountryEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "attributionCountryEnumId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_COUNTRY_ENUM_ID ='"
                        + JsonUtil.getString(jsonObj, "attributionCountryEnumId") + "' ");
            }
            if (JsonUtil.get(jsonObj, "attributionProvinceId") != null
                    && !"".equals(JsonUtil.get(jsonObj, "attributionProvinceId"))&& !"null".equals(JsonUtil.getString(jsonObj, "attributionProvinceId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                        + JsonUtil.getString(jsonObj, "attributionProvinceId") + "' ");
            }
            if (JsonUtil.get(jsonObj, "testProvinceId") != null
                    && !"".equals(JsonUtil.get(jsonObj, "testProvinceId"))&& !"null".equals(JsonUtil.getString(jsonObj, "testProvinceId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                        + JsonUtil.getString(jsonObj, "testProvinceId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "attributionCityId") != null
                    && JsonUtil.getString(jsonObj, "attributionCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "attributionCityId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                        + JsonUtil.getString(jsonObj, "attributionCityId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "testCityId") != null
                    && JsonUtil.getString(jsonObj, "testCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testCityId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                        + JsonUtil.getString(jsonObj, "testCityId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "operatingVendorEnumId") != null
                    && JsonUtil.getString(jsonObj, "operatingVendorEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "operatingVendorEnumId"))) {
                sqlBuf.append(" and A.OPERATING_VENDOR_ENUM_ID ='"
                        + JsonUtil.getString(jsonObj, "operatingVendorEnumId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "whetherPrepaid") != null
                    && JsonUtil.getString(jsonObj, "whetherPrepaid").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "whetherPrepaid"))) {
                sqlBuf.append(" and A.WHETHER_PREPAID ='"
                        + JsonUtil.getString(jsonObj, "whetherPrepaid") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId") != null
                    && JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId"))) {
                sqlBuf.append(" and A.CARD_NETWORK_TYPE_ENUM_ID ='"
                        + JsonUtil.getString(jsonObj, "cardNetworkTypeEnumId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "testcardTypeEnumId") != null
                    && JsonUtil.getString(jsonObj, "testcardTypeEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testcardTypeEnumId"))) {
                sqlBuf.append(" and A.TESTCARD_TYPE_ENUM_ID ='"
                        + JsonUtil.getString(jsonObj, "testcardTypeEnumId") + "' ");
            }
        /*    if (JsonUtil.getString(jsonObj, "testobjectTypeEnumId") != null
                    && JsonUtil.getString(jsonObj, "testobjectTypeEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testobjectTypeEnumId"))) {
                sqlBuf.append(" and A.TESTCARD_TYPE_ENUM_ID ='"
                        + JsonUtil.getString(jsonObj, "testobjectTypeEnumId") + "' ");
            }*/
            if (JsonUtil.getString(jsonObj, "uploadNumbers") != null
                    && JsonUtil.getString(jsonObj, "uploadNumbers").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "uploadNumbers"))) {
                sqlBuf.append(" and A.NUMBER in(" + JsonUtil.getString(jsonObj, "uploadNumbers")
                        + ") ");
            }
            if (JsonUtil.getString(jsonObj, "number") != null
                    && JsonUtil.getString(jsonObj, "number").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "number"))) {
                sqlBuf.append(" and A.NUMBER like '%" + JsonUtil.getString(jsonObj, "number")
                        + "%' ");
            }
            if (JsonUtil.getString(jsonObj, "adminId") != null
                    && JsonUtil.getString(jsonObj, "adminId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "adminId"))) {
                sqlBuf.append(" and (A.ADMIN_ID ='" + JsonUtil.getString(jsonObj, "adminId") + "' ");
                
                if(JsonUtil.getString(jsonObj, "lenderIdM") != null
                        && JsonUtil.getString(jsonObj, "lenderIdM").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "lenderIdM"))){
                    sqlBuf.append(" or A.LENDER_ID ='" + JsonUtil.getString(jsonObj, "lenderIdM") + "') ");
                }else if(JsonUtil.getString(jsonObj, "belongCityId") != null
                        && JsonUtil.getString(jsonObj, "belongCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongCityId"))){
                    sqlBuf.append(" or A.ATTRIBUTION_CITY_ID ='" + JsonUtil.getString(jsonObj, "belongCityId") + "') ");
                }else if(JsonUtil.getString(jsonObj, "belongProvinceId") != null
                        && JsonUtil.getString(jsonObj, "belongProvinceId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongProvinceId"))){
                    sqlBuf.append(" or A.ATTRIBUTION_PROVINCE_ID ='" + JsonUtil.getString(jsonObj, "belongProvinceId") + "') ");
                }else{
                    sqlBuf.append(" ) ");
                }
            }
            if (JsonUtil.getString(jsonObj, "cardNoEqual") != null
                    && JsonUtil.getString(jsonObj, "cardNoEqual").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "cardNoEqual"))) {
                sqlBuf.append(" and A.CARD_NO = '" + JsonUtil.getString(jsonObj, "cardNoEqual")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "imsiEqual") != null
                    && JsonUtil.getString(jsonObj, "imsiEqual").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "imsiEqual"))) {
                sqlBuf.append(" and A.IMSI = '" + JsonUtil.getString(jsonObj, "imsiEqual")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "numberEqual") != null
                    && JsonUtil.getString(jsonObj, "numberEqual").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "numberEqual"))) {
                sqlBuf.append(" and A.NUMBER = '" + JsonUtil.getString(jsonObj, "numberEqual")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "storageDepartmentId") != null
                    && JsonUtil.getString(jsonObj, "storageDepartmentId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "storageDepartmentId"))) {
                sqlBuf.append(" and A.STORAGE_DEPARTMENT_ID = '" + JsonUtil.getString(jsonObj, "storageDepartmentId")
                        + "' ");
            }
          
            if (JsonUtil.getString(jsonObj, "storageCityId") != null
                    && JsonUtil.getString(jsonObj, "storageCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "storageCityId"))) {
                sqlBuf.append(" and A.STORAGE_CITY_ID = '" + JsonUtil.getString(jsonObj, "storageCityId")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "lenderId") != null
                    && JsonUtil.getString(jsonObj, "lenderId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "lenderId"))) {
                sqlBuf.append(" and A.LENDER_ID = '" + JsonUtil.getString(jsonObj, "lenderId")
                        + "' ");
            }
        sqlBuf.append(" ORDER BY A.CREATION_DATE DESC ");
        return sqlBuf;
    }

    @Override
    public void saveTestCardInfo(JSONObject jsonObj) throws Exception {
        Long testCardId = 
                super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TEST_CARD_INFO", "TEST_CARD_ID");
        jsonObj.put("testCardId", testCardId);
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_TEST_CARD_INFO(TEST_CARD_ID,TESTCARD_TYPE_ENUM_ID ")
                .append(",OPERATOR_ENUM_ID,CARD_NETWORK_TYPE_ENUM_ID,ATTRIBUTION_COUNTRY_ENUM_ID ")
                .append(",ATTRIBUTION_PROVINCE_ID,ATTRIBUTION_CITY_ID,ATTRIBUTION_SCP ")
                .append(",SCP_MANUFACTURER,EFFECTIVE_DATE,ATTRIBUTION_HLR,HLR_MANUFACTURER ")
                .append(",CANCEL_DATE,PIN1,PIN2,LAST_TEST_DATE,PUK1,PUK2,WARE_MAN_ID ")
                .append(",PACKAGE_TYPE,ATTCH_PACKAGE_TYPE,STORAGE_DEPARTMENT_ID ")
                .append(",MONTH_GRANTS,WHETHER_PREPAID,ADMIN_ID,STORAGE_PLACE,CARD_USE,REMARKS ")
                .append(",CARD_NO,IMSI,SUBSCRIBER_NUMBER,NUMBER,TESTCARD_STATUS_ENUM_ID,BALANCE ")
                .append(",LEND_FLAG,LEND_DEPARTMENT_ID,LENDER_ID,LEND_TIME,PLAN_RETURN_TIME ")
                .append(",SHEET_SERIAL_NUMBER,OVER_STATE, ")
                .append("CREATED_BY,CREATION_DATE,LAST_UPDATED_BY")
                .append(",LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE ")
                .append(",MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2 ")
                .append(",ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5")
                .append(",ATTRIBUTION_PROVINCE_NAME")
                .append(",ATTRIBUTION_CITY_NAME")
                .append(",STORAGE_DEPARTMENT_NAME")
                .append(",ADMIN_NAME")
                .append(",LEND_DEPARTMENT_NAME")
                .append(",LENDER_NAME")
                .append(",STORAGE_CITY_ID")
                .append(",STORAGE_CITY_NAME)")
                .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
                .append(",?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = { JsonUtil.get(jsonObj, "testCardId"),
                JsonUtil.get(jsonObj, "testcardTypeEnumId"),
                JsonUtil.get(jsonObj, "operatorEnumId"),
                JsonUtil.get(jsonObj, "cardNetworkTypeEnumId"),
                JsonUtil.get(jsonObj, "attributionCountryEnumId"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),
                JsonUtil.get(jsonObj, "attributionCityId"),
                JsonUtil.get(jsonObj, "attributionScp"), JsonUtil.get(jsonObj, "scpManufacturer"),
                JsonUtil.get(jsonObj, "effectiveDate"), JsonUtil.get(jsonObj, "attributionHlr"),
                JsonUtil.get(jsonObj, "hlrManufacturer"), JsonUtil.get(jsonObj, "cancelDate"),
                JsonUtil.get(jsonObj, "pin1"), JsonUtil.get(jsonObj, "pin2"),
                JsonUtil.get(jsonObj, "lastTestDate"), JsonUtil.get(jsonObj, "puk1"),
                JsonUtil.get(jsonObj, "puk2"), JsonUtil.get(jsonObj, "wareManId"),
                JsonUtil.get(jsonObj, "packageTypeEnumId"),
                JsonUtil.get(jsonObj, "attchPackageEnumId"),
                JsonUtil.get(jsonObj, "storageDepartmentId"), JsonUtil.get(jsonObj, "monthGrants"),
                JsonUtil.get(jsonObj, "whetherPrepaid"), JsonUtil.get(jsonObj, "adminId"),
                JsonUtil.get(jsonObj, "storagePlace"), JsonUtil.get(jsonObj, "cardUse"),
                JsonUtil.get(jsonObj, "remarks"), JsonUtil.get(jsonObj, "cardNo"),
                JsonUtil.get(jsonObj, "imsi"), JsonUtil.get(jsonObj, "subscriberNumber"),
                JsonUtil.get(jsonObj, "number"), JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                JsonUtil.get(jsonObj, "balance"), JsonUtil.get(jsonObj, "lendFlag"),
                JsonUtil.get(jsonObj, "lendDepartmentId"), JsonUtil.get(jsonObj, "lenderId"),
                JsonUtil.get(jsonObj, "lendTime"), JsonUtil.get(jsonObj, "planReturnTime"),
                JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                JsonUtil.get(jsonObj, "createdBy"), JsonUtil.get(jsonObj, "creationDate"),
                JsonUtil.get(jsonObj, "lastUpdatedBy"), JsonUtil.get(jsonObj, "lastUpdateDate"),
                JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletedBy"), JsonUtil.get(jsonObj, "deletionDate"),
                JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5"), 
                JsonUtil.get(jsonObj, "attributionProvinceName"),
                JsonUtil.get(jsonObj, "attributionCityName"),
                JsonUtil.get(jsonObj, "storageDepartmentName"),
                JsonUtil.get(jsonObj, "adminName"),
                JsonUtil.get(jsonObj, "lendDepartmentName"),
                JsonUtil.get(jsonObj, "lenderName"),
                JsonUtil.get(jsonObj, "storageCityId"),
                JsonUtil.get(jsonObj,"storageCityName")
        };
        super.update(sqlBuf.toString(), args);
    }
    
    @Override
    public void saveTestCardInfoBatch(JSONArray jsonArray) throws Exception {
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        Long nextId = null;
        
        StringBuffer buf = new StringBuffer();
        buf.append("SELECT SEQ_EOM_TCM_ADB_T_EOM_TEST_CARD_INFO_TEST_CARD_ID.NEXTVAL "+jsonArray.length());
        Map<String, Object> map = getJdbcTemplate().queryForMap(buf.toString().toUpperCase());
        String value = MapUtils.getString(map, "value");// 目前返回的数据格式是  val,step
        String tempStr = null;
        if (null == value || value.indexOf(",") < 0) {
            throw new Exception("获取序列异常，返回字段名不是value或者值没有 , 分割");
        } else {
            tempStr = value.substring(0, value.indexOf(","));
        }
        if (null == tempStr || tempStr.trim().length() == 0) {
            throw new Exception("获取序列异常，返回的value为空");
        }
        Long ret = Long.valueOf(tempStr);
        
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
//                    nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TEST_CARD_INFO", "TEST_CARD_ID");
            Object obj[] = {//nextId,
                    (ret-i),
                    JsonUtil.get(jsonObj, "testcardTypeEnumId"),
                    JsonUtil.get(jsonObj, "operatorEnumId"),
                    JsonUtil.get(jsonObj, "cardNetworkTypeEnumId"),
                    JsonUtil.get(jsonObj, "attributionCountryEnumId"),
                    JsonUtil.get(jsonObj, "attributionProvinceId"),
                    JsonUtil.get(jsonObj, "attributionCityId"),
                    JsonUtil.get(jsonObj, "attributionScp"), JsonUtil.get(jsonObj, "scpManufacturer"),
                    JsonUtil.get(jsonObj, "effectiveDate"), JsonUtil.get(jsonObj, "attributionHlr"),
                    JsonUtil.get(jsonObj, "hlrManufacturer"), JsonUtil.get(jsonObj, "cancelDate"),
                    JsonUtil.get(jsonObj, "pin1"), JsonUtil.get(jsonObj, "pin2"),
                    JsonUtil.get(jsonObj, "lastTestDate"), JsonUtil.get(jsonObj, "puk1"),
                    JsonUtil.get(jsonObj, "puk2"), JsonUtil.get(jsonObj, "wareManId"),
                    JsonUtil.get(jsonObj, "packageTypeEnumId"),
                    JsonUtil.get(jsonObj, "attchPackageEnumId"),
                    JsonUtil.get(jsonObj, "storageDepartmentId"), JsonUtil.get(jsonObj, "monthGrants"),
                    JsonUtil.get(jsonObj, "whetherPrepaid"), JsonUtil.get(jsonObj, "adminId"),
                    JsonUtil.get(jsonObj, "storagePlace"), JsonUtil.get(jsonObj, "cardUse"),
                    JsonUtil.get(jsonObj, "remarks"), JsonUtil.get(jsonObj, "cardNo"),
                    JsonUtil.get(jsonObj, "imsi"), JsonUtil.get(jsonObj, "subscriberNumber"),
                    JsonUtil.get(jsonObj, "number"), JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                    JsonUtil.get(jsonObj, "balance"), JsonUtil.get(jsonObj, "lendFlag"),
                    JsonUtil.get(jsonObj, "lendDepartmentId"), JsonUtil.get(jsonObj, "lenderId"),
                    JsonUtil.get(jsonObj, "lendTime"), JsonUtil.get(jsonObj, "planReturnTime"),
                    JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                    JsonUtil.get(jsonObj, "createdBy"), new Date(),//JsonUtil.get(jsonObj, "creationDate"),
                    JsonUtil.get(jsonObj, "lastUpdatedBy"), new Date(),//JsonUtil.get(jsonObj, "lastUpdateDate"),
                    JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                    JsonUtil.get(jsonObj, "deletedBy"), new Date(),//JsonUtil.get(jsonObj, "deletionDate"),
                    JsonUtil.get(jsonObj, "marketingAreaId"),
                    JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                    JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                    JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                    JsonUtil.get(jsonObj, "attribute5"), 
                    JsonUtil.get(jsonObj, "attributionProvinceName"),
                    JsonUtil.get(jsonObj, "attributionCityName"),
                    JsonUtil.get(jsonObj, "storageDepartmentName"),
                    JsonUtil.get(jsonObj, "adminName"),
                    JsonUtil.get(jsonObj, "lendDepartmentName"),
                    JsonUtil.get(jsonObj, "lenderName"),
                    JsonUtil.get(jsonObj, "storageCityId"),
                    JsonUtil.get(jsonObj, "storageCityName")};
            
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO  T_EOM_TEST_CARD_INFO(TEST_CARD_ID,TESTCARD_TYPE_ENUM_ID ")
        .append(",OPERATOR_ENUM_ID,CARD_NETWORK_TYPE_ENUM_ID,ATTRIBUTION_COUNTRY_ENUM_ID ")
        .append(",ATTRIBUTION_PROVINCE_ID,ATTRIBUTION_CITY_ID,ATTRIBUTION_SCP ")
        .append(",SCP_MANUFACTURER,EFFECTIVE_DATE,ATTRIBUTION_HLR,HLR_MANUFACTURER ")
        .append(",CANCEL_DATE,PIN1,PIN2,LAST_TEST_DATE,PUK1,PUK2,WARE_MAN_ID ")
        .append(",PACKAGE_TYPE,ATTCH_PACKAGE_TYPE,STORAGE_DEPARTMENT_ID ")
        .append(",MONTH_GRANTS,WHETHER_PREPAID,ADMIN_ID,STORAGE_PLACE,CARD_USE,REMARKS ")
        .append(",CARD_NO,IMSI,SUBSCRIBER_NUMBER,NUMBER,TESTCARD_STATUS_ENUM_ID,BALANCE ")
        .append(",LEND_FLAG,LEND_DEPARTMENT_ID,LENDER_ID,LEND_TIME,PLAN_RETURN_TIME ")
        .append(",SHEET_SERIAL_NUMBER,OVER_STATE, ")
        .append("CREATED_BY,CREATION_DATE,LAST_UPDATED_BY")
        .append(",LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE ")
        .append(",MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2 ")
        .append(",ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5")
        .append(",ATTRIBUTION_PROVINCE_NAME")
        .append(",ATTRIBUTION_CITY_NAME")
        .append(",STORAGE_DEPARTMENT_NAME")
        .append(",ADMIN_NAME")
        .append(",LEND_DEPARTMENT_NAME")
        .append(",LENDER_NAME")
        .append(",STORAGE_CITY_ID")
        .append(",STORAGE_CITY_NAME)")
        .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
        .append(",?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        
        super.batchUpdate(sqlBuf.toString(), list);
        
    }

    @Override
    public void deleteTestCardInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TEST_CARD_INFO SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  TEST_CARD_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "testobjectId")};
        super.update(sqlBuf.toString(), args);
    } 
	
	@Override
    public void deleteTestCardInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TEST_CARD_INFO SET DELETED_BY = ?")
                .append(", DELETED_FLAG = ?").append(", DELETION_DATE = ?")
                .append(" WHERE  TEST_CARD_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);
    }

    @Override
    public void updateTestCardInfoLendInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TEST_CARD_INFO SET LEND_FLAG = ?")
                .append(", LEND_DEPARTMENT_ID = ?").append(", LENDER_ID = ?")
                .append(", LEND_TIME = ?").append(", PLAN_RETURN_TIME = ?")
                .append(", SHEET_SERIAL_NUMBER = ?").append(", LAST_UPDATED_BY = ?")
                .append(", LAST_UPDATE_DATE = ?").append(" WHERE  TEST_CARD_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);
    }
	
	
    @Override
    public void updateTestCardInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_TEST_CARD_INFO SET LAST_UPDATE_DATE = now()");
        
        sqlBuf.append(", NUMBER = ?");
        sqlBuf.append(", CARD_NO = ?");
        sqlBuf.append(", SUBSCRIBER_NUMBER = ?");
        sqlBuf.append(", IMSI = ?");
        sqlBuf.append(", PIN1 = ?");
        sqlBuf.append(", PIN2 = ?");
        sqlBuf.append(", PUK1 = ?");
        sqlBuf.append(", PUK2 = ?");
        sqlBuf.append(", EFFECTIVE_DATE = ?");
        sqlBuf.append(", CANCEL_DATE = ?");
        sqlBuf.append(", CARD_USE = ?");
        sqlBuf.append(", TESTOBJECT_TYPE_ENUM_ID = ?");
        sqlBuf.append(", TESTCARD_TYPE_ENUM_ID = ?");
        sqlBuf.append(", ATTRIBUTION_SCP = ?");
        sqlBuf.append(", ATTRIBUTION_HLR = ?");
        sqlBuf.append(", ADMIN_ID = ?");
        sqlBuf.append(", ORG_ID = ?");
        sqlBuf.append(" WHERE  TEST_CARD_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);

    }
    
    public void updateATestCardInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" update T_EOM_TEST_CARD_INFO set  LAST_UPDATE_DATE = now()");
        List<Object> list = new ArrayList<Object>();
        if(jsonObj.has("lastUpdatedBy")){
            sqlBuf.append(" , LAST_UPDATED_BY =? ");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
        }
        if(jsonObj.has("adminId")){
            sqlBuf.append(" , ADMIN_ID =? ");
            list.add(JsonUtil.get(jsonObj, "adminId"));
        }
        if(jsonObj.has("storageDepartmentId")){
            sqlBuf.append(" , STORAGE_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentId"));
        }
        if(jsonObj.has("storageDepartmentName")){
            sqlBuf.append(" , STORAGE_DEPARTMENT_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentName"));
        }
        if(jsonObj.has("storageCityId")){
            if("null".equals(JsonUtil.get(jsonObj, "storageCityId"))){
                sqlBuf.append(" , STORAGE_CITY_ID =null ");
            }else{
                sqlBuf.append(" , STORAGE_CITY_ID =? ");
                list.add(JsonUtil.get(jsonObj, "storageCityId"));
            }
        }
        if(jsonObj.has("storageCityName")){
            if("null".equals(JsonUtil.get(jsonObj, "storageCityName"))){
                sqlBuf.append(" , STORAGE_CITY_NAME =null ");
            }else{
                sqlBuf.append(" , STORAGE_CITY_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "storageCityName"));
            }
        }
        if(jsonObj.has("adminName")){
            sqlBuf.append(" , ADMIN_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "adminName"));
        }
        if(jsonObj.has("testcardStatusEnumId")){
            sqlBuf.append(" , TESTCARD_STATUS_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "testcardStatusEnumId"));
        }
        
        if(jsonObj.has("lendDepartmentId")){
            sqlBuf.append(" , LEND_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentId"));
        }
        if(jsonObj.has("lenderId")){
            sqlBuf.append(" , LENDER_ID =? ");
            list.add(JsonUtil.get(jsonObj, "lenderId"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            sqlBuf.append(" , SHEET_SERIAL_NUMBER =? ");
            list.add(JsonUtil.get(jsonObj, "sheetSerialNumber"));
        }
        if(jsonObj.has("planReturnTime")){
            sqlBuf.append(" , PLAN_RETURN_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "planReturnTime"));
        }
        if(jsonObj.has("lendFlag")){
            sqlBuf.append(" , LEND_FLAG =? ");
            list.add(JsonUtil.get(jsonObj, "lendFlag"));
        }
        if(jsonObj.has("lendTime")){
            sqlBuf.append(" , LEND_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "lendTime"));
        }
        if(jsonObj.has("lendDepartmentName")){
            sqlBuf.append(" , LEND_DEPARTMENT_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentName"));
        }
        if(jsonObj.has("lenderName")){
            sqlBuf.append(" , LENDER_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "lenderName"));
        }
        
        
        sqlBuf.append(" where 1=1 ");
        
        if(jsonObj.has("testCardId")){
            sqlBuf.append(" AND TEST_CARD_ID =? ");
            list.add(JsonUtil.get(jsonObj, "testCardId"));
        }
        
        super.update(sqlBuf.toString(), list.toArray());
    }

    // //////// IMS

    @Override
    public List<Map<String, Object>> qryImsListByParam(JSONObject jsonObj) throws Exception {
        return super.queryForList(qryImsSql(jsonObj).toString());
    }

    @Override
    public Page qryImsPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(qryImsSql(jsonObj).toString(), jsonObj);
    }

    public StringBuffer qryImsSql(JSONObject jsonObj) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.FIXED_TEL_ID as fixedTelId ")
                .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
                .append(",'固定电话' as testobjectName ")
                .append(",A.NUMBER as numberTmp ")
                .append(",3 as testobjectType ")
                .append(",A.FIXED_TEL_ID as testobjectId ")
                .append(",A.ATTRIBUTION_CITY_ID as attributionCityId ")
                .append(",A.TESTCARD_STATUS_ENUM_ID as testcardStatusEnumId ")
                .append(",CASE A.TESTCARD_STATUS_ENUM_ID WHEN 1 THEN '正常'  WHEN 2 THEN '故障' ")
                .append(" WHEN 3 THEN '报废' WHEN 4 THEN '送修' WHEN 5 THEN '欠费停机' WHEN 6 THEN 'SIM卡注册失败' ")
                .append(" ELSE '' END as testcardStatusEnumName ")
                .append(",A.EFFECTIVE_DATE as effectiveDate ")
                .append(",A.CANCEL_DATE as cancelDate ")
                .append(",A.WARE_MAN_ID as wareManId ")
                .append(",A.STORAGE_DEPARTMENT_ID as storageDepartmentId ")
                .append(",A.ADMIN_ID as adminId ").append(",A.STORAGE_PLACE as storagePlace ")
                .append(",A.CARD_USE as cardUse ").append(",A.REMARKS as remarks ")
                .append(",A.PHONE_NUMBER as phoneNumber ")
                .append(",A.FIXED_PHONE_TYPE_ENUM_ID as fixedPhoneTypeEnumId ")
                .append(",CASE A.FIXED_PHONE_TYPE_ENUM_ID WHEN 1 THEN '直线电话'  ")
                .append(" WHEN 2 THEN '传真'  WHEN 3 THEN 'Modem' ")
                .append(" ELSE '' END as fixedPhoneTypeEnumName ")
                .append(",A.TELE_FUNCTION as teleFunction ").append(",A.NUMBER as number ")
                .append(",A.LEND_FLAG as lendFlag ")
                .append(",CASE A.LEND_FLAG WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as lendFlagName ")
                .append(",A.LEND_DEPARTMENT_ID as lendDepartmentId ")
                .append(",A.LENDER_ID as lenderId ").append(",A.LEND_TIME as lendTime ")
                .append(",A.PLAN_RETURN_TIME as planReturnTime ")
                .append(",A.SHEET_SERIAL_NUMBER as sheetSerialNumber ")
                .append(",A.OVER_STATE as overState ")
                 .append(",CASE A.OVER_STATE WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as overStateName ")
                .append(",A.CREATED_BY as createdBy ")
                .append(",A.CREATION_DATE as creationDate ")
                .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
                .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
                .append(",A.RECORD_VERSION as recordVersion ")
                .append(",A.DELETED_FLAG as deletedFlag ").append(",A.DELETED_BY as deletedBy ")
                .append(",A.DELETION_DATE as deletionDate ")
                .append(",A.MARKETING_AREA_ID as marketingAreaId ")
                .append(",A.MAINTENANCE_AREA_ID as maintenanceAreaId ")
                .append(",A.ORG_ID as orgId ").append(",A.ATTRIBUTE1 as attribute1 ")
                .append(",A.ATTRIBUTE2 as attribute2 ").append(",A.ATTRIBUTE3 as attribute3 ")
                .append(",A.ATTRIBUTE4 as attribute4 ").append(",A.ATTRIBUTE5 as attribute5 ")
                .append(",A.ATTRIBUTION_PROVINCE_NAME AS attributionProvinceName ")
                .append(",A.ATTRIBUTION_CITY_NAME AS attributionCityName")
                .append(",A.STORAGE_DEPARTMENT_NAME AS storageDepartmentName")
                .append(",A.ADMIN_NAME AS adminName")
                .append(",A.LEND_DEPARTMENT_NAME AS lendDepartmentName")
                .append(",A.LENDER_NAME AS lenderName")
                .append(",A.STORAGE_CITY_ID as storageCityId")
                .append(",A.STORAGE_CITY_NAME as storageCityName")
                .append(" from T_EOM_FIXED_TELEPHON_INFO A ");
                /**
                 * 判断测试卡是否在途中  
                 */
                if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
                        &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
                    sqlBuf.append("left JOIN ( "+
                        "select DISTINCT scr.TESTOBJECT_ID as id from T_EOM_SHEET_CARD_RELEVANCE scr  "+
                        "JOIN T_EOM_CARD_SHEET cs  "+
                        "ON scr.CARD_SHEET_ID = cs.CARD_SHEET_ID  "+
                        "where cs.WO_STATUS_ENUM_ID IN (2, 5) and cs.DELETED_FLAG = 0 "+
                        "and scr.DELETED_FLAG = 0 and scr.TESTOBJECT_TYPE = 3 "+
                        ") B on A.FIXED_TEL_ID=B.id ");
                }
                sqlBuf.append(" where A.DELETED_FLAG = 0 ");
        /**
         * 判断固定电话是否在途中
         */
    	if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
                &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
        		sqlBuf.append("and B.id is null ");
        	}
        
        if (JsonUtil.getString(jsonObj, "testcardStatusEnumId") != null
                && JsonUtil.getString(jsonObj, "testcardStatusEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "testcardStatusEnumId"))) {
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in('"
                    + JsonUtil.getString(jsonObj, "testcardStatusEnumId") + "') ");
        }
        if (JsonUtil.getString(jsonObj, "teleStatusEnumId") != null
                && JsonUtil.getString(jsonObj, "teleStatusEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "teleStatusEnumId"))) {
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in("
                    + JsonUtil.getString(jsonObj, "teleStatusEnumId") + ") ");
        }
        if(JsonUtil.getString(jsonObj,"unUsedCard")!=null&&!"".equals(JsonUtil.getString(jsonObj,"unUsedCard"))
                &&"0".equals(JsonUtil.getString(jsonObj,"unUsedCard"))){//如果为0,不需要查报废的卡
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID not in("
                    + 3 + ") ");
        }
        if(JsonUtil.getString(jsonObj,"teleCancelDateStartQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"teleCancelDateStartQry"))){
            sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) >UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"teleCancelDateStartQry")+"') ");
        }
        if(JsonUtil.getString(jsonObj,"teleCancelDateEndQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"teleCancelDateEndQry"))){
            sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) <UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"teleCancelDateEndQry")+"') ");
        }

            if(JsonUtil.getString(jsonObj,"selectIds")!=null&&!"".equals(JsonUtil.getString(jsonObj,"selectIds"))){
                sqlBuf.append(" and A.FIXED_TEL_ID in ("+JsonUtil.getString(jsonObj,"selectIds")+") ");
            }
        
            if (JsonUtil.getString(jsonObj, "fixedTelId") != null
                    && JsonUtil.getString(jsonObj, "fixedTelId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "fixedTelId"))) {
                sqlBuf.append(" and A.FIXED_TEL_ID ='" + JsonUtil.getString(jsonObj, "fixedTelId")
                        + "' ");
            }
          
            if (JsonUtil.getString(jsonObj, "lendFlag") != null
                    && JsonUtil.getString(jsonObj, "lendFlag").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lendFlag"))) {
                sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "lendFlag")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "teleIsLend") != null
                    && JsonUtil.getString(jsonObj, "teleIsLend").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "teleIsLend"))) {
                sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "teleIsLend")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "attributionProvinceId") != null
                    && JsonUtil.getString(jsonObj, "attributionProvinceId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "attributionProvinceId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                        + JsonUtil.getString(jsonObj, "attributionProvinceId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "testProvinceId") != null
                    && JsonUtil.getString(jsonObj, "testProvinceId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testProvinceId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                        + JsonUtil.getString(jsonObj, "testProvinceId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "attributionCityId") != null
                    && JsonUtil.getString(jsonObj, "attributionCityId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "attributionCityId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                        + JsonUtil.getString(jsonObj, "attributionCityId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "testCityId") != null
                    && JsonUtil.getString(jsonObj, "testCityId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testCityId"))) {
                sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                        + JsonUtil.getString(jsonObj, "testCityId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "uploadNumbers") != null
                    && JsonUtil.getString(jsonObj, "uploadNumbers").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "uploadNumbers"))) {
                sqlBuf.append(" and A.NUMBER in(" + JsonUtil.getString(jsonObj, "uploadNumbers")
                        + ") ");
            }
            if (JsonUtil.getString(jsonObj, "number") != null
                    && JsonUtil.getString(jsonObj, "number").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "number"))) {
                sqlBuf.append(" and A.NUMBER ='" + JsonUtil.getString(jsonObj, "number") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "adminId") != null
                    && JsonUtil.getString(jsonObj, "adminId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "adminId"))) {
                sqlBuf.append(" and (A.ADMIN_ID ='" + JsonUtil.getString(jsonObj, "adminId") + "' ");
                
                if(JsonUtil.getString(jsonObj, "lenderIdM") != null
                        && JsonUtil.getString(jsonObj, "lenderIdM").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lenderIdM"))){
                    sqlBuf.append(" or A.LENDER_ID ='" + JsonUtil.getString(jsonObj, "lenderIdM") + "') ");
                }else if(JsonUtil.getString(jsonObj, "belongCityId") != null
                        && JsonUtil.getString(jsonObj, "belongCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongCityId"))){
                    sqlBuf.append(" or A.ATTRIBUTION_CITY_ID ='" + JsonUtil.getString(jsonObj, "belongCityId") + "') ");
                }else if(JsonUtil.getString(jsonObj, "belongProvinceId") != null
                        && JsonUtil.getString(jsonObj, "belongProvinceId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongProvinceId"))){
                    sqlBuf.append(" or A.ATTRIBUTION_PROVINCE_ID ='" + JsonUtil.getString(jsonObj, "belongProvinceId") + "') ");
                }else{
                    sqlBuf.append(" ) ");
                }
            }
            if (JsonUtil.getString(jsonObj, "phoneNumber") != null
                    && JsonUtil.getString(jsonObj, "phoneNumber").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "phoneNumber"))) {
                sqlBuf.append(" and A.PHONE_NUMBER like '%"
                        + JsonUtil.getString(jsonObj, "phoneNumber") + "%' ");
            }
            if (JsonUtil.getString(jsonObj, "telePhoneNumber") != null
                    && JsonUtil.getString(jsonObj, "telePhoneNumber").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "telePhoneNumber"))) {
                sqlBuf.append(" and A.PHONE_NUMBER like '%"
                        + JsonUtil.getString(jsonObj, "telePhoneNumber") + "%' ");
            }
            if (JsonUtil.getString(jsonObj, "fixedPhoneTypeEnumId") != null
                    && JsonUtil.getString(jsonObj, "fixedPhoneTypeEnumId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "fixedPhoneTypeEnumId"))) {
                sqlBuf.append(" and A.FIXED_PHONE_TYPE_ENUM_ID ='"
                        + JsonUtil.getString(jsonObj, "fixedPhoneTypeEnumId") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "phoneNumberEqual") != null
                    && JsonUtil.getString(jsonObj, "phoneNumberEqual").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "phoneNumberEqual"))) {
                sqlBuf.append(" and A.PHONE_NUMBER = '" + 
                    JsonUtil.getString(jsonObj, "phoneNumberEqual") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "numberEqual") != null
                    && JsonUtil.getString(jsonObj, "numberEqual").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "numberEqual"))) {
                sqlBuf.append(" and A.NUMBER = '" + 
                    JsonUtil.getString(jsonObj, "numberEqual") + "' ");
            }
            if (JsonUtil.getString(jsonObj, "storageDepartmentId") != null
                    && JsonUtil.getString(jsonObj, "storageDepartmentId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "storageDepartmentId"))) {
                sqlBuf.append(" and A.STORAGE_DEPARTMENT_ID = '" + JsonUtil.getString(jsonObj, "storageDepartmentId")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "storageCityId") != null
                    && JsonUtil.getString(jsonObj, "storageCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "storageCityId"))) {
                sqlBuf.append(" and A.STORAGE_CITY_ID = '" + JsonUtil.getString(jsonObj, "storageCityId")
                        + "' ");
            }
            if (JsonUtil.getString(jsonObj, "lenderId") != null
                    && JsonUtil.getString(jsonObj, "lenderId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lenderId"))) {
                sqlBuf.append(" and A.LENDER_ID = '" + JsonUtil.getString(jsonObj, "lenderId")
                        + "' ");
            }
        sqlBuf.append(" ORDER BY A.CREATION_DATE DESC ");
        return sqlBuf;
    }

    @Override
    public void saveImsInfo(JSONObject jsonObj) throws Exception {
        Long fixedTelId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_FIXED_TELEPHON_INFO", "FIXED_TEL_ID");
        jsonObj.put("fixedTelId", fixedTelId);
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_FIXED_TELEPHON_INFO(FIXED_TEL_ID ")
                .append(",ATTRIBUTION_PROVINCE_ID,ATTRIBUTION_CITY_ID,TESTCARD_STATUS_ENUM_ID ")
                .append(",EFFECTIVE_DATE,CANCEL_DATE,WARE_MAN_ID,STORAGE_DEPARTMENT_ID,ADMIN_ID ")
                .append(",STORAGE_PLACE,CARD_USE,REMARKS,PHONE_NUMBER,FIXED_PHONE_TYPE_ENUM_ID ")
                .append(",TELE_FUNCTION,NUMBER,LEND_FLAG,LEND_DEPARTMENT_ID,LENDER_ID,LEND_TIME ")
                .append(",PLAN_RETURN_TIME,SHEET_SERIAL_NUMBER,OVER_STATE,CREATED_BY,CREATION_DATE ")
                .append(",LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY ")
                .append(",DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1 ")
                .append(",ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5")
                .append(",ATTRIBUTION_PROVINCE_NAME")
                .append(",ATTRIBUTION_CITY_NAME")
                .append(",STORAGE_DEPARTMENT_NAME")
                .append(",ADMIN_NAME")
                .append(",LEND_DEPARTMENT_NAME")
                .append(",LENDER_NAME")
                .append(",STORAGE_CITY_ID")
                .append(",STORAGE_CITY_NAME)")
                .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
                .append(",?,?,?,?,?,?,?,?)");
        Object[] args = { JsonUtil.get(jsonObj, "fixedTelId"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),
                JsonUtil.get(jsonObj, "attributionCityId"),
                JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                JsonUtil.get(jsonObj, "effectiveDate"), JsonUtil.get(jsonObj, "cancelDate"),
                JsonUtil.get(jsonObj, "wareManId"), JsonUtil.get(jsonObj, "storageDepartmentId"),
                JsonUtil.get(jsonObj, "adminId"), JsonUtil.get(jsonObj, "storagePlace"),
                JsonUtil.get(jsonObj, "cardUse"), JsonUtil.get(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "phoneNumber"),
                JsonUtil.get(jsonObj, "fixedPhoneTypeEnumId"), JsonUtil.get(jsonObj, "teleFunction"),
                JsonUtil.get(jsonObj, "number"), JsonUtil.get(jsonObj, "lendFlag"),
                JsonUtil.get(jsonObj, "lendDepartmentId"), JsonUtil.get(jsonObj, "lenderId"),
                JsonUtil.get(jsonObj, "lendTime"), JsonUtil.get(jsonObj, "planReturnTime"),
                JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                JsonUtil.get(jsonObj, "createdBy"), JsonUtil.get(jsonObj, "creationDate"),
                JsonUtil.get(jsonObj, "lastUpdatedBy"), JsonUtil.get(jsonObj, "lastUpdateDate"),
                JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletedBy"), JsonUtil.get(jsonObj, "deletionDate"),
                JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5") ,
                JsonUtil.get(jsonObj, "attributionProvinceName"),
                JsonUtil.get(jsonObj, "attributionCityName"),
                JsonUtil.get(jsonObj, "storageDepartmentName"),
                JsonUtil.get(jsonObj, "adminName"),
                JsonUtil.get(jsonObj, "lendDepartmentName"),
                JsonUtil.get(jsonObj, "lenderName"),
                JsonUtil.get(jsonObj, "storageCityId"),
                JsonUtil.get(jsonObj, "storageCityName")
                };
        super.update(sqlBuf.toString(), args);
    }
    
    @Override
    public void saveImsInfoBatch(JSONArray jsonArray) throws Exception {
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        Long nextId = null;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
                    nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_FIXED_TELEPHON_INFO", "FIXED_TEL_ID");
            Object obj[] = {nextId,
                    JsonUtil.get(jsonObj, "attributionProvinceId"),
                    JsonUtil.get(jsonObj, "attributionCityId"),
                    JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                    JsonUtil.get(jsonObj, "effectiveDate"), JsonUtil.get(jsonObj, "cancelDate"),
                    JsonUtil.get(jsonObj, "wareManId"), JsonUtil.get(jsonObj, "storageDepartmentId"),
                    JsonUtil.get(jsonObj, "adminId"), JsonUtil.get(jsonObj, "storagePlace"),
                    JsonUtil.get(jsonObj, "cardUse"), JsonUtil.get(jsonObj, "remarks"),
                    JsonUtil.get(jsonObj, "phoneNumber"),
                    JsonUtil.get(jsonObj, "fixedPhoneTypeEnumId"), JsonUtil.get(jsonObj, "teleFunction"),
                    JsonUtil.get(jsonObj, "number"), JsonUtil.get(jsonObj, "lendFlag"),
                    JsonUtil.get(jsonObj, "lendDepartmentId"), JsonUtil.get(jsonObj, "lenderId"),
                    JsonUtil.get(jsonObj, "lendTime"), JsonUtil.get(jsonObj, "planReturnTime"),
                    JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                    JsonUtil.get(jsonObj, "createdBy"), new Date(),//JsonUtil.get(jsonObj, "creationDate"),
                    JsonUtil.get(jsonObj, "lastUpdatedBy"), new Date(),//JsonUtil.get(jsonObj, "lastUpdateDate"),
                    JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                    JsonUtil.get(jsonObj, "deletedBy"), new Date(),//JsonUtil.get(jsonObj, "deletionDate"),
                    JsonUtil.get(jsonObj, "marketingAreaId"),
                    JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                    JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                    JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                    JsonUtil.get(jsonObj, "attribute5") ,
                    JsonUtil.get(jsonObj, "attributionProvinceName"),
                    JsonUtil.get(jsonObj, "attributionCityName"),
                    JsonUtil.get(jsonObj, "storageDepartmentName"),
                    JsonUtil.get(jsonObj, "adminName"),
                    JsonUtil.get(jsonObj, "lendDepartmentName"),
                    JsonUtil.get(jsonObj, "lenderName"),
                    JsonUtil.get(jsonObj, "storageCityId"),
                    JsonUtil.get(jsonObj, "storageCityName")};
            
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO  T_EOM_FIXED_TELEPHON_INFO(FIXED_TEL_ID ")
        .append(",ATTRIBUTION_PROVINCE_ID,ATTRIBUTION_CITY_ID,TESTCARD_STATUS_ENUM_ID ")
        .append(",EFFECTIVE_DATE,CANCEL_DATE,WARE_MAN_ID,STORAGE_DEPARTMENT_ID,ADMIN_ID ")
        .append(",STORAGE_PLACE,CARD_USE,REMARKS,PHONE_NUMBER,FIXED_PHONE_TYPE_ENUM_ID ")
        .append(",TELE_FUNCTION,NUMBER,LEND_FLAG,LEND_DEPARTMENT_ID,LENDER_ID,LEND_TIME ")
        .append(",PLAN_RETURN_TIME,SHEET_SERIAL_NUMBER,OVER_STATE,CREATED_BY,CREATION_DATE ")
        .append(",LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY ")
        .append(",DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1 ")
        .append(",ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5")
        .append(",ATTRIBUTION_PROVINCE_NAME")
        .append(",ATTRIBUTION_CITY_NAME")
        .append(",STORAGE_DEPARTMENT_NAME")
        .append(",ADMIN_NAME")
        .append(",LEND_DEPARTMENT_NAME")
        .append(",LENDER_NAME")
        .append(",STORAGE_CITY_ID")
        .append(",STORAGE_CITY_NAME)")
        .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
        .append(",?,?,?,?,?,?,?,?)");
        
        super.batchUpdate(sqlBuf.toString(), list);
        
        
    }

    @Override
    public void deleteImsInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_FIXED_TELEPHON_INFO SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  FIXED_TEL_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "testobjectId")};
        super.update(sqlBuf.toString(), args);
    } 
	
	@Override
    public void deleteImsInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_FIXED_TELEPHON_INFO SET DELETED_BY = ?")
                .append(", DELETED_FLAG = ? ").append(", DELETION_DATE = ? ")
                .append(" WHERE  FIXED_TEL_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);
    }
    
@Override
    public void updateImsInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_FIXED_TELEPHON_INFO SET NUMBER = ?");
        sqlBuf.append(", PHONE_NUMBER = ? ");
        sqlBuf.append(", FIXED_PHONE_TYPE_ENUM_ID = ? ");
        sqlBuf.append(", FUNCTION = ? ");
        sqlBuf.append(", ORG_ID = ? ");
        sqlBuf.append(", ADMIN_ID = ? ");
        sqlBuf.append(", TESTCARD_STATUS_ENUM_ID = ? ");
        sqlBuf.append(", CREATION_DATE = ? ");
        sqlBuf.append(" WHERE  FIXED_TEL_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);

    }

        public void updateAImsInfo(JSONObject jsonObj) throws Exception {
            StringBuffer sqlBuf = new StringBuffer();
            sqlBuf.append(" update T_EOM_FIXED_TELEPHON_INFO set RECORD_VERSION = RECORD_VERSION+1, LAST_UPDATE_DATE =  now()");
            List<Object> list = new ArrayList<Object>();
            if(jsonObj.has("lastUpdatedBy")){
                sqlBuf.append(" , LAST_UPDATED_BY =? ");
                list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
            }
            if(jsonObj.has("adminId")){
                sqlBuf.append(" , ADMIN_ID =? ");
                list.add(JsonUtil.get(jsonObj, "adminId"));
            }
            if(jsonObj.has("adminName")){
                sqlBuf.append(" , ADMIN_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "adminName"));
            }
            if(jsonObj.has("storageCityId")){
                if("null".equals(JsonUtil.get(jsonObj, "storageCityId"))){
                    sqlBuf.append(" , STORAGE_CITY_ID =null ");
                }else{
                    sqlBuf.append(" , STORAGE_CITY_ID =? ");
                    list.add(JsonUtil.get(jsonObj, "storageCityId"));
                }
            }
            if(jsonObj.has("storageCityName")){
                if("null".equals(JsonUtil.get(jsonObj, "storageCityName"))){
                    sqlBuf.append(" , STORAGE_CITY_NAME =null ");
                }else{
                    sqlBuf.append(" , STORAGE_CITY_NAME =? ");
                    list.add(JsonUtil.get(jsonObj, "storageCityName"));
                }
            }
            if(jsonObj.has("storageDepartmentId")){
                sqlBuf.append(" , STORAGE_DEPARTMENT_ID =? ");
                list.add(JsonUtil.get(jsonObj, "storageDepartmentId"));
            }
            if(jsonObj.has("storageDepartmentName")){
                sqlBuf.append(" , STORAGE_DEPARTMENT_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "storageDepartmentName"));
            }
            
            if(jsonObj.has("testcardStatusEnumId")){
                sqlBuf.append(" , TESTCARD_STATUS_ENUM_ID =? ");
                list.add(JsonUtil.get(jsonObj, "testcardStatusEnumId"));
            }
            
            if(jsonObj.has("lendDepartmentId")){
                sqlBuf.append(" , LEND_DEPARTMENT_ID =? ");
                list.add(JsonUtil.get(jsonObj, "lendDepartmentId"));
            }
            if(jsonObj.has("lenderId")){
                sqlBuf.append(" , LENDER_ID =? ");
                list.add(JsonUtil.get(jsonObj, "lenderId"));
            }
            if(jsonObj.has("sheetSerialNumber")){
                sqlBuf.append(" , SHEET_SERIAL_NUMBER =? ");
                list.add(JsonUtil.get(jsonObj, "sheetSerialNumber"));
            }
            if(jsonObj.has("planReturnTime")){
                sqlBuf.append(" , PLAN_RETURN_TIME =? ");
                list.add(JsonUtil.get(jsonObj, "planReturnTime"));
            }
            if(jsonObj.has("lendFlag")){
                sqlBuf.append(" , LEND_FLAG =? ");
                list.add(JsonUtil.get(jsonObj, "lendFlag"));
            }
            if(jsonObj.has("lendTime")){
                sqlBuf.append(" , LEND_TIME =? ");
                list.add(JsonUtil.get(jsonObj, "lendTime"));
            }
            if(jsonObj.has("lendDepartmentName")){
                sqlBuf.append(" , LEND_DEPARTMENT_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "lendDepartmentName"));
            }
            if(jsonObj.has("lenderName")){
                sqlBuf.append(" , LENDER_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "lenderName"));
            }
            
            sqlBuf.append(" where 1=1 ");
            
            if(jsonObj.has("fixedTelId")){
                sqlBuf.append(" AND FIXED_TEL_ID =? ");
                list.add(JsonUtil.get(jsonObj, "fixedTelId"));
            }
            
            super.update(sqlBuf.toString(), list.toArray());
        }
    // //////// 测试终端

    @Override
    public List<Map<String, Object>> qryTerminalListByParam(JSONObject jsonObj) throws Exception {
        return super.queryForList(qryTerminalSql(jsonObj).toString());
    }

    @Override
    public Page qryTerminalPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(qryTerminalSql(jsonObj).toString(), jsonObj);
    }

    public StringBuffer qryTerminalSql(JSONObject jsonObj) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.TEST_TERMINAL_ID as testTerminalId ")
                .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
                .append(",'测试终端' as testobjectName ")
                .append(",A.NUMBER as numberTmp ")
                .append(",2 as testobjectType ")
                .append(",A.TEST_TERMINAL_ID as testobjectId ")
                .append(",A.ATTRIBUTION_CITY_ID as attributionCityId ")
                .append(",A.STORAGE_PLACE as storagePlace ").append(",A.CARD_USE as cardUse ")
                .append(",A.REMARKS as remarks ").append(",A.ADMIN_ID as adminId ")
                .append(",A.STORAGE_DEPARTMENT_ID as storageDepartmentId ")
                .append(",A.WARE_MAN_ID as wareManId ")
                .append(",A.CANCEL_DATE as cancelDate ")
                .append(",A.EFFECTIVE_DATE as effectiveDate ")
                .append(",A.TESTCARD_STATUS_ENUM_ID as testcardStatusEnumId ")
                .append(",CASE A.TESTCARD_STATUS_ENUM_ID WHEN 1 THEN '正常'  WHEN 2 THEN '故障' ")
                 .append(" WHEN 3 THEN '报废' WHEN 4 THEN '送修' WHEN 5 THEN '欠费停机' WHEN 6 THEN 'SIM卡注册失败' ")
                .append(" ELSE '' END as testcardStatusEnumName ")
                .append(",A.MOBLIE_TYPE_ENUM_ID as moblieTypeEnumId ")
                .append(",CASE A.MOBLIE_TYPE_ENUM_ID WHEN 1 THEN 'GSM' ")
                .append(" WHEN 2 THEN 'CDMA'  WHEN 3 THEN '双模' ")
                .append(" ELSE '' END as moblieTypeEnumName ")
                .append(",A.MANUFACTURER_NAME as manufacturerName ")
                .append(",A.PHONE_MODEL as phoneModel ").append(",A.IMEI as imei ")
                .append(",A.NUMBER as number ")
                .append(",A.LEND_FLAG as lendFlag ")
                .append(",CASE A.LEND_FLAG WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as lendFlagName ")
                .append(",A.LEND_DEPARTMENT_ID as lendDepartmentId ")
                .append(",A.LENDER_ID as lenderId ").append(",A.LEND_TIME as lendTime ")
                .append(",A.PLAN_RETURN_TIME as planReturnTime ")
                .append(",A.SHEET_SERIAL_NUMBER as sheetSerialNumber ")
                .append(",A.OVER_STATE as overState ")
                .append(",CASE A.OVER_STATE WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as overStateName ")
                .append(",A.CREATED_BY as createdBy ")
                .append(",A.CREATION_DATE as creationDate ")
                .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
                .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
                .append(",A.RECORD_VERSION as recordVersion ")
                .append(",A.DELETED_FLAG as deletedFlag ").append(",A.DELETED_BY as deletedBy ")
                .append(",A.DELETION_DATE as deletionDate ")
                .append(",A.MARKETING_AREA_ID as marketingAreaId ")
                .append(",A.MAINTENANCE_AREA_ID as maintenanceAreaId ")
                .append(",A.ORG_ID as orgId ").append(",A.ATTRIBUTE1 as attribute1 ")
                .append(",A.ATTRIBUTE2 as attribute2 ").append(",A.ATTRIBUTE3 as attribute3 ")
                .append(",A.ATTRIBUTE4 as attribute4 ").append(",A.ATTRIBUTE5 as attribute5 ")
                .append(",A.ATTRIBUTION_PROVINCE_NAME AS attributionProvinceName ")
                .append(",A.ATTRIBUTION_CITY_NAME AS attributionCityName")
                .append(",A.STORAGE_DEPARTMENT_NAME AS storageDepartmentName")
                .append(",A.ADMIN_NAME AS adminName")
                .append(",A.LEND_DEPARTMENT_NAME AS lendDepartmentName")
                .append(",A.LENDER_NAME AS lenderName")
                .append(",STORAGE_CITY_ID AS storageCityId")
                .append(",A.STORAGE_CITY_NAME AS storageCityName")
                .append(" from T_EOM_TEST_TERMINAL_INFO A ");
                /**
                 * 判断测试卡是否在途中  
                 */
                if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
                        &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
                    sqlBuf.append("left JOIN ( "+
                        "select DISTINCT scr.TESTOBJECT_ID as id from T_EOM_SHEET_CARD_RELEVANCE scr  "+
                        "JOIN T_EOM_CARD_SHEET cs  "+
                        "ON scr.CARD_SHEET_ID = cs.CARD_SHEET_ID  "+
                        "where cs.WO_STATUS_ENUM_ID IN (2, 5) and cs.DELETED_FLAG = 0 "+
                        "and scr.DELETED_FLAG = 0 and scr.TESTOBJECT_TYPE = 2 "+
                        ") B on A.TEST_TERMINAL_ID=B.id ");
                }
                sqlBuf.append(" where A.DELETED_FLAG = 0 ");
        /**
         * 判断测试终端是否在途中
         */
    	if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
                &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
        		sqlBuf.append("and B.id is null ");
        	}
        if(JsonUtil.getString(jsonObj,"termiCancelDateStartQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"termiCancelDateStartQry"))){
            sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) >UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"termiCancelDateStartQry")+"') ");
        }
        if(JsonUtil.getString(jsonObj,"termiCancelDateEndQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"termiCancelDateEndQry"))){
            sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) <UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"termiCancelDateEndQry")+"') ");
        }

        if(JsonUtil.getString(jsonObj,"selectIds")!=null&&!"".equals(JsonUtil.getString(jsonObj,"selectIds"))){
            sqlBuf.append(" and A.TEST_TERMINAL_ID in ("+JsonUtil.getString(jsonObj,"selectIds")+") ");
        }
        
        if (JsonUtil.getString(jsonObj, "testTerminalId") != null
                && JsonUtil.getString(jsonObj, "testTerminalId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testTerminalId"))) {
            sqlBuf.append(" and A.TEST_TERMINAL_ID ='"
                    + JsonUtil.getString(jsonObj, "testTerminalId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testcardStatusEnumId") != null
                && JsonUtil.getString(jsonObj, "testcardStatusEnumId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testcardStatusEnumId"))) {
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in('").append(
                    JsonUtil.getString(jsonObj, "testcardStatusEnumId")+"') ");
        }
        if (JsonUtil.getString(jsonObj, "termiStatusEnumId") != null
                && JsonUtil.getString(jsonObj, "termiStatusEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "termiStatusEnumId"))) {
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in("
                    + JsonUtil.getString(jsonObj, "termiStatusEnumId") + ") ");
        }
        if(JsonUtil.getString(jsonObj,"unUsedCard")!=null&&!"".equals(JsonUtil.getString(jsonObj,"unUsedCard"))
                &&"0".equals(JsonUtil.getString(jsonObj,"unUsedCard"))){//如果为0,不需要查报废的卡
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID not in("
                    + 3 + ") ");
        }
        if (JsonUtil.getString(jsonObj, "lendFlag") != null
                && JsonUtil.getString(jsonObj, "lendFlag").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lendFlag"))) {
            sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "lendFlag") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "termiIsLend") != null
                && JsonUtil.getString(jsonObj, "termiIsLend").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "termiIsLend"))) {
            sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "termiIsLend")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "attributionProvinceId") != null
                && JsonUtil.getString(jsonObj, "attributionProvinceId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "attributionProvinceId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                    + JsonUtil.getString(jsonObj, "attributionProvinceId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testProvinceId") != null
                && JsonUtil.getString(jsonObj, "testProvinceId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testProvinceId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                    + JsonUtil.getString(jsonObj, "testProvinceId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "attributionCityId") != null
                && JsonUtil.getString(jsonObj, "attributionCityId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "attributionCityId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                    + JsonUtil.getString(jsonObj, "attributionCityId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testCityId") != null
                && JsonUtil.getString(jsonObj, "testCityId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testCityId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                    + JsonUtil.getString(jsonObj, "testCityId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "uploadNumbers") != null
                && JsonUtil.getString(jsonObj, "uploadNumbers").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "uploadNumbers"))) {
            sqlBuf.append(" and A.NUMBER in(" + JsonUtil.getString(jsonObj, "uploadNumbers")
                    + ") ");
        }
        if (JsonUtil.getString(jsonObj, "number") != null
                && JsonUtil.getString(jsonObj, "number").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "number"))) {
            sqlBuf.append(" and A.NUMBER like '%" + JsonUtil.getString(jsonObj, "number") + "%' ");
        }
        if (JsonUtil.getString(jsonObj, "moblieTypeEnumId") != null
                && JsonUtil.getString(jsonObj, "moblieTypeEnumId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "moblieTypeEnumId"))) {
            sqlBuf.append(" and A.MOBLIE_TYPE_ENUM_ID ='"
                    + JsonUtil.getString(jsonObj, "moblieTypeEnumId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "manufacturerName") != null
                && JsonUtil.getString(jsonObj, "manufacturerName").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "manufacturerName"))) {
            sqlBuf.append(" and A.MANUFACTURER_NAME like '%"
                    + JsonUtil.getString(jsonObj, "manufacturerName") + "%' ");
        }
        if (JsonUtil.getString(jsonObj, "imeiEqual") != null
                && JsonUtil.getString(jsonObj, "imeiEqual").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "imeiEqual"))) {
            sqlBuf.append(" and A.IMEI = '" + 
                JsonUtil.getString(jsonObj, "imeiEqual") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "numberEqual") != null
                && JsonUtil.getString(jsonObj, "numberEqual").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "numberEqual"))) {
            sqlBuf.append(" and A.NUMBER = '" + 
                JsonUtil.getString(jsonObj, "numberEqual") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "storageDepartmentId") != null
                && JsonUtil.getString(jsonObj, "storageDepartmentId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "storageDepartmentId"))) {
            sqlBuf.append(" and A.STORAGE_DEPARTMENT_ID = '" + JsonUtil.getString(jsonObj, "storageDepartmentId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "storageCityId") != null
                && JsonUtil.getString(jsonObj, "storageCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "storageCityId"))) {
            sqlBuf.append(" and A.STORAGE_CITY_ID = '" + JsonUtil.getString(jsonObj, "storageCityId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "lenderId") != null
                && JsonUtil.getString(jsonObj, "lenderId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lenderId"))) {
            sqlBuf.append(" and A.LENDER_ID = '" + JsonUtil.getString(jsonObj, "lenderId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "adminId") != null
                && JsonUtil.getString(jsonObj, "adminId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "adminId"))) {
            sqlBuf.append(" and (A.ADMIN_ID ='" + JsonUtil.getString(jsonObj, "adminId") + "' ");
            
            if(JsonUtil.getString(jsonObj, "lenderIdM") != null
                    && JsonUtil.getString(jsonObj, "lenderIdM").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lenderIdM"))){
                sqlBuf.append(" or A.LENDER_ID ='" + JsonUtil.getString(jsonObj, "lenderIdM") + "') ");
            }else if(JsonUtil.getString(jsonObj, "belongCityId") != null
                    && JsonUtil.getString(jsonObj, "belongCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongCityId"))){
                sqlBuf.append(" or A.ATTRIBUTION_CITY_ID ='" + JsonUtil.getString(jsonObj, "belongCityId") + "') ");
            }else if(JsonUtil.getString(jsonObj, "belongProvinceId") != null
                    && JsonUtil.getString(jsonObj, "belongProvinceId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongProvinceId"))){
                sqlBuf.append(" or A.ATTRIBUTION_PROVINCE_ID ='" + JsonUtil.getString(jsonObj, "belongProvinceId") + "') ");
            }else{
                sqlBuf.append(" ) ");
            }
        }
        sqlBuf.append(" ORDER BY A.CREATION_DATE DESC ");
        return sqlBuf;
    }

    @Override
    public void saveTerminalInfoNoBatch(JSONObject jsonObj) throws Exception {
        Long testTerminalId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TEST_TERMINAL_INFO", "TEST_TERMINAL_ID");
        jsonObj.put("testTerminalId", testTerminalId);
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_TEST_TERMINAL_INFO(TEST_TERMINAL_ID ")
                .append(",ATTRIBUTION_PROVINCE_ID,ATTRIBUTION_CITY_ID,STORAGE_PLACE,CARD_USE,REMARKS ")
                .append(",ADMIN_ID,STORAGE_DEPARTMENT_ID,WARE_MAN_ID,CANCEL_DATE,EFFECTIVE_DATE ")
                .append(",TESTCARD_STATUS_ENUM_ID,MOBLIE_TYPE_ENUM_ID  ")
                .append(",MANUFACTURER_NAME,PHONE_MODEL,IMEI,NUMBER,LEND_FLAG,LEND_DEPARTMENT_ID ")
                .append(",LENDER_ID,LEND_TIME,PLAN_RETURN_TIME,SHEET_SERIAL_NUMBER,OVER_STATE ")
                .append(",CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION ")
                .append(",DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID ")
                .append(",ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5 ")
                .append(",ATTRIBUTION_PROVINCE_NAME")
                .append(",ATTRIBUTION_CITY_NAME")
                .append(",STORAGE_DEPARTMENT_NAME")
                .append(",ADMIN_NAME")
                .append(",LEND_DEPARTMENT_NAME")
                .append(",LENDER_NAME")
                .append(",STORAGE_CITY_ID")
                .append(",STORAGE_CITY_NAME)")
                .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
                .append(",?,?,?,?,?,?,?,?)");
        Object[] args = { JsonUtil.get(jsonObj, "testTerminalId"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),
                JsonUtil.get(jsonObj, "attributionCityId"), JsonUtil.get(jsonObj, "storagePlace"),
                JsonUtil.get(jsonObj, "cardUse"), JsonUtil.get(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "adminId"), JsonUtil.get(jsonObj, "storageDepartmentId"),
                JsonUtil.get(jsonObj, "wareManId"), JsonUtil.get(jsonObj, "cancelDate"),
                JsonUtil.get(jsonObj, "effectiveDate"),
                JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                JsonUtil.get(jsonObj, "moblieTypeEnumId"), 
                JsonUtil.get(jsonObj, "manufacturerName"), JsonUtil.get(jsonObj, "phoneModel"),
                JsonUtil.get(jsonObj, "imei"), JsonUtil.get(jsonObj, "number"),
                JsonUtil.get(jsonObj, "lendFlag"), JsonUtil.get(jsonObj, "lendDepartmentId"),
                JsonUtil.get(jsonObj, "lenderId"), JsonUtil.get(jsonObj, "lendTime"),
                JsonUtil.get(jsonObj, "planReturnTime"),
                JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                JsonUtil.get(jsonObj, "createdBy"), JsonUtil.get(jsonObj, "creationDate"),
                JsonUtil.get(jsonObj, "lastUpdatedBy"), JsonUtil.get(jsonObj, "lastUpdateDate"),
                JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletedBy"), JsonUtil.get(jsonObj, "deletionDate"),
                JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5"),
                JsonUtil.get(jsonObj, "attributionProvinceName"),
                JsonUtil.get(jsonObj, "attributionCityName"),
                JsonUtil.get(jsonObj, "storageDepartmentName"),
                JsonUtil.get(jsonObj, "adminName"),
                JsonUtil.get(jsonObj, "lendDepartmentName"),
                JsonUtil.get(jsonObj, "lenderName"),
                JsonUtil.get(jsonObj, "storageCityId"),
                JsonUtil.get(jsonObj, "storageCityName")
                };
        super.update(sqlBuf.toString(), args);
    }
    
    @Override
    public void saveTerminalInfoBatch(JSONArray jsonArray) throws Exception {
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        Long nextId = null;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
                    nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_TEST_TERMINAL_INFO", "TEST_TERMINAL_ID");
            Object obj[] = {nextId,
                    JsonUtil.get(jsonObj, "attributionProvinceId"),
                    JsonUtil.get(jsonObj, "attributionCityId"), JsonUtil.get(jsonObj, "storagePlace"),
                    JsonUtil.get(jsonObj, "cardUse"), JsonUtil.get(jsonObj, "remarks"),
                    JsonUtil.get(jsonObj, "adminId"), JsonUtil.get(jsonObj, "storageDepartmentId"),
                    JsonUtil.get(jsonObj, "wareManId"), JsonUtil.get(jsonObj, "cancelDate"),
                    JsonUtil.get(jsonObj, "effectiveDate"),
                    JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                    JsonUtil.get(jsonObj, "moblieTypeEnumId"), 
                    JsonUtil.get(jsonObj, "manufacturerName"), JsonUtil.get(jsonObj, "phoneModel"),
                    JsonUtil.get(jsonObj, "imei"), JsonUtil.get(jsonObj, "number"),
                    JsonUtil.get(jsonObj, "lendFlag"), JsonUtil.get(jsonObj, "lendDepartmentId"),
                    JsonUtil.get(jsonObj, "lenderId"), JsonUtil.get(jsonObj, "lendTime"),
                    JsonUtil.get(jsonObj, "planReturnTime"),
                    JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                    JsonUtil.get(jsonObj, "createdBy"), new Date(),//JsonUtil.get(jsonObj, "creationDate"),
                    JsonUtil.get(jsonObj, "lastUpdatedBy"), new Date(),//JsonUtil.get(jsonObj, "lastUpdateDate"),
                    JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                    JsonUtil.get(jsonObj, "deletedBy"), new Date(),//JsonUtil.get(jsonObj, "deletionDate"),
                    JsonUtil.get(jsonObj, "marketingAreaId"),
                    JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                    JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                    JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                    JsonUtil.get(jsonObj, "attribute5"),
                    JsonUtil.get(jsonObj, "attributionProvinceName"),
                    JsonUtil.get(jsonObj, "attributionCityName"),
                    JsonUtil.get(jsonObj, "storageDepartmentName"),
                    JsonUtil.get(jsonObj, "adminName"),
                    JsonUtil.get(jsonObj, "lendDepartmentName"),
                    JsonUtil.get(jsonObj, "lenderName"),
                    JsonUtil.get(jsonObj, "storageCityId"),
                    JsonUtil.get(jsonObj, "storageCityName")};
            
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO  T_EOM_TEST_TERMINAL_INFO(TEST_TERMINAL_ID ")
        .append(",ATTRIBUTION_PROVINCE_ID,ATTRIBUTION_CITY_ID,STORAGE_PLACE,CARD_USE,REMARKS ")
        .append(",ADMIN_ID,STORAGE_DEPARTMENT_ID,WARE_MAN_ID,CANCEL_DATE,EFFECTIVE_DATE ")
        .append(",TESTCARD_STATUS_ENUM_ID,MOBLIE_TYPE_ENUM_ID  ")
        .append(",MANUFACTURER_NAME,PHONE_MODEL,IMEI,NUMBER,LEND_FLAG,LEND_DEPARTMENT_ID ")
        .append(",LENDER_ID,LEND_TIME,PLAN_RETURN_TIME,SHEET_SERIAL_NUMBER,OVER_STATE ")
        .append(",CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION ")
        .append(",DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID,MAINTENANCE_AREA_ID ")
        .append(",ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5 ")
        .append(",ATTRIBUTION_PROVINCE_NAME")
        .append(",ATTRIBUTION_CITY_NAME")
        .append(",STORAGE_DEPARTMENT_NAME")
        .append(",ADMIN_NAME")
        .append(",LEND_DEPARTMENT_NAME")
        .append(",LENDER_NAME")
        .append(",STORAGE_CITY_ID")
        .append(",STORAGE_CITY_NAME)")
        .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
        .append(",?,?,?,?,?,?,?,?)");
        
        super.batchUpdate(sqlBuf.toString(), list);
        
        
    }

    @Override
    public void deleteTerminalInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE t_eom_test_terminal_info SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  TEST_TERMINAL_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "testobjectId")};
        super.update(sqlBuf.toString(), args);
    } 
	
	@Override
    public void deleteTerminalInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE t_eom_test_terminal_info SET DELETED_BY = ?")
                .append(", DELETED_FLAG = ? ").append(", DELETION_DATE = ? ")
                .append(" WHERE  TEST_TERMINAL_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);
    }
	
	@Override
    public void updateTerminalInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE t_eom_test_terminal_info SET NUMBER = ?");
        sqlBuf.append(", MOBLIE_TYPE_ENUM_ID = ? ");
        sqlBuf.append(", MANUFACTURER = ? ");
        sqlBuf.append(", PHONE_MODEL = ? ");
        sqlBuf.append(", TESTCARD_STATUS_ENUM_ID = ? ");
        sqlBuf.append(", IMEI = ? ");
        sqlBuf.append(", ORG_ID = ? ");
        sqlBuf.append(", ADMIN_ID = ? ");
        sqlBuf.append(", CREATION_DATE = ? ");
        sqlBuf.append(" WHERE  TEST_TERMINAL_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);

    }
	
	public void updateATerminalInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" update t_eom_test_terminal_info set RECORD_VERSION = RECORD_VERSION+1, LAST_UPDATE_DATE = now()");
        List<Object> list = new ArrayList<Object>();
        if(jsonObj.has("lastUpdatedBy")){
            sqlBuf.append(" , LAST_UPDATED_BY =? ");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
        }
        if(jsonObj.has("adminId")){
            sqlBuf.append(" , ADMIN_ID =? ");
            list.add(JsonUtil.get(jsonObj, "adminId"));
        }
        if(jsonObj.has("adminName")){
            sqlBuf.append(" , ADMIN_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "adminName"));
        }
        if(jsonObj.has("testcardStatusEnumId")){
            sqlBuf.append(" , TESTCARD_STATUS_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "testcardStatusEnumId"));
        }
       
        if(jsonObj.has("storageCityId")){
            if("null".equals(JsonUtil.get(jsonObj, "storageCityId"))){
                sqlBuf.append(" , STORAGE_CITY_ID =null ");
            }else{
                sqlBuf.append(" , STORAGE_CITY_ID =? ");
                list.add(JsonUtil.get(jsonObj, "storageCityId"));
            }
        }
        if(jsonObj.has("storageCityName")){
            if("null".equals(JsonUtil.get(jsonObj, "storageCityName"))){
                sqlBuf.append(" , STORAGE_CITY_NAME =null ");
            }else{
                sqlBuf.append(" , STORAGE_CITY_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "storageCityName"));
            }
        }
        if(jsonObj.has("storageDepartmentId")){
            sqlBuf.append(" , STORAGE_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentId"));
        }
        if(jsonObj.has("storageDepartmentName")){
            sqlBuf.append(" , STORAGE_DEPARTMENT_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentName"));
        }
        if(jsonObj.has("lendDepartmentId")){
            sqlBuf.append(" , LEND_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentId"));
        }
        if(jsonObj.has("lenderId")){
            sqlBuf.append(" , LENDER_ID =? ");
            list.add(JsonUtil.get(jsonObj, "lenderId"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            sqlBuf.append(" , SHEET_SERIAL_NUMBER =? ");
            list.add(JsonUtil.get(jsonObj, "sheetSerialNumber"));
        }
        if(jsonObj.has("planReturnTime")){
            sqlBuf.append(" , PLAN_RETURN_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "planReturnTime"));
        }
        if(jsonObj.has("lendFlag")){
            sqlBuf.append(" , LEND_FLAG =? ");
            list.add(JsonUtil.get(jsonObj, "lendFlag"));
        }
        if(jsonObj.has("lendTime")){
            sqlBuf.append(" , LEND_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "lendTime"));
        }
        if(jsonObj.has("lendDepartmentName")){
            sqlBuf.append(" , LEND_DEPARTMENT_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentName"));
        }
        if(jsonObj.has("lenderName")){
            sqlBuf.append(" , LENDER_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "lenderName"));
        }
        
        sqlBuf.append(" where 1=1 ");
        
        if(jsonObj.has("testTerminalId")){
            sqlBuf.append(" AND TEST_TERMINAL_ID =? ");
            list.add(JsonUtil.get(jsonObj, "testTerminalId"));
        }
        
        super.update(sqlBuf.toString(), list.toArray());
    }

    @Override
    public List<Map<String, Object>> qryRechCardListByParam(JSONObject jsonObj) throws Exception {
        return super.queryForList(qryRechCardSql(jsonObj).toString());
    }

    @Override
    public Page qryRechCardPageByParam(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(qryRechCardSql(jsonObj).toString(), jsonObj);
    }

    public StringBuffer qryRechCardSql(JSONObject jsonObj) throws JSONException {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.RECH_CARD_ID as rechCardId ")
                .append(",A.ATTRIBUTION_PROVINCE_ID as attributionProvinceId ")
                .append(",'充值卡' as testobjectName ")
                .append(",A.CARD_NUMBER as numberTmp ")
                .append(",A.CARD_NO as cardNo ")
                .append(",4 as testobjectType ")
                .append(",A.RECH_CARD_ID as testobjectId ")
                .append(",A.ATTRIBUTION_CITY_ID as attributionCityId ")
                .append(",A.TESTCARD_STATUS_ENUM_ID as testcardStatusEnumId ")
                .append(",CASE A.TESTCARD_STATUS_ENUM_ID WHEN 1 THEN '正常'  WHEN 2 THEN '故障' ")
                .append(" WHEN 3 THEN '报废' WHEN 4 THEN '送修' WHEN 5 THEN '欠费停机' WHEN 6 THEN 'SIM卡注册失败' ")
                .append(" ELSE '' END as testcardStatusEnumName ")
                .append(",A.RECH_CARD_TYPE_ENUM_ID as rechCardTypeEnumId ")
                 .append(",CASE A.RECH_CARD_TYPE_ENUM_ID WHEN 1 THEN '未充'  WHEN 2 THEN '已充' ")
                .append(" ELSE '' END as rechCardTypeEnumName ")
                .append(",A.EFFECTIVE_DATE as effectiveDate ")
                .append(",A.CANCEL_DATE as cancelDate ")
                .append(",A.WARE_MAN_ID as wareManId ")
                .append(",A.STORAGE_DEPARTMENT_ID as storageDepartmentId ")
                .append(",A.ADMIN_ID as adminId ").append(",A.STORAGE_PLACE as storagePlace ")
                .append(",A.CARD_USE as cardUse ").append(",A.REMARKS as remarks ")
                .append(",A.CARD_NO as cardNo ")
                .append(",A.PAR_VALUE as parValue ")
                .append(",CASE A.PAR_VALUE WHEN 1 THEN '30'  WHEN 2 THEN '50' ")
                .append(" WHEN 3 THEN '100' ELSE '' END as parValueName ")
                .append(",A.CARD_NUMBER as cardNumber ")
                .append(",A.LEND_FLAG as lendFlag ")
                 .append(",CASE A.LEND_FLAG WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as lendFlagName ")
                .append(",A.LEND_DEPARTMENT_ID as lendDepartmentId ")
                .append(",A.LENDER_ID as lenderId ").append(",A.LEND_TIME as lendTime ")
                .append(",A.PLAN_RETURN_TIME as planReturnTime ")
                .append(",A.SHEET_SERIAL_NUMBER as sheetSerialNumber ")
                .append(",A.OVER_STATE as overState ")
                 .append(",CASE A.OVER_STATE WHEN 1 THEN '是'  WHEN 0 THEN '否' ")
                .append(" ELSE '' END as overStateName ")
                .append(",A.CREATED_BY as createdBy ")
                .append(",A.CREATION_DATE as creationDate ")
                .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
                .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
                .append(",A.RECORD_VERSION as recordVersion ")
                .append(",A.DELETED_FLAG as deletedFlag ").append(",A.DELETED_BY as deletedBy ")
                .append(",A.DELETION_DATE as deletionDate ")
                .append(",A.MARKETING_AREA_ID as marketingAreaId ")
                .append(",A.MAINTENANCE_AREA_ID as maintenanceAreaId ")
                .append(",A.ORG_ID as orgId ").append(",A.ATTRIBUTE1 as attribute1 ")
                .append(",A.ATTRIBUTE2 as attribute2 ").append(",A.ATTRIBUTE3 as attribute3 ")
                .append(",A.ATTRIBUTE4 as attribute4 ").append(",A.ATTRIBUTE5 as attribute5 ")
                 .append(",A.ATTRIBUTION_PROVINCE_NAME AS attributionProvinceName ")
                .append(",A.ATTRIBUTION_CITY_NAME AS attributionCityName")
                .append(",A.STORAGE_DEPARTMENT_NAME AS storageDepartmentName")
                .append(",A.ADMIN_NAME AS adminName")
                .append(",A.LEND_DEPARTMENT_NAME AS lendDepartmentName")
                .append(",A.LENDER_NAME AS lenderName")
                .append(",A.STORAGE_CITY_ID AS storageCityId")
                .append(",A.STORAGE_CITY_NAME AS storageCityName")
                .append(" from T_EOM_RECH_CARD_INFO A ");
                /**
                 * 判断测试卡是否在途中  
                 */
                if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
                        &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
                    sqlBuf.append("left JOIN ( "+
                        "select DISTINCT scr.TESTOBJECT_ID as id from T_EOM_SHEET_CARD_RELEVANCE scr  "+
                        "JOIN T_EOM_CARD_SHEET cs  "+
                        "ON scr.CARD_SHEET_ID = cs.CARD_SHEET_ID  "+
                        "where cs.WO_STATUS_ENUM_ID IN (2, 5) and cs.DELETED_FLAG = 0 "+
                        "and scr.DELETED_FLAG = 0 and scr.TESTOBJECT_TYPE = 4 "+
                        ") B on A.RECH_CARD_ID=B.id ");
                }
                sqlBuf.append(" where A.DELETED_FLAG = 0 ");
	        /**
	         * 判断充值卡是否在途中  
	         */
		if(JsonUtil.getString(jsonObj,"isOnLoad")!=null&&!"".equals(JsonUtil.getString(jsonObj,"isOnLoad"))
	        &&"0".equals(JsonUtil.getString(jsonObj,"isOnLoad"))){
			sqlBuf.append("and B.id is null ");
		}
        if(JsonUtil.getString(jsonObj,"rechCancelDateStartQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"rechCancelDateStartQry"))){
            sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) >UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"rechCancelDateStartQry")+"') ");
        }
        if(JsonUtil.getString(jsonObj,"rechCancelDateEndQry")!=null&&!"".equals(JsonUtil.getString(jsonObj,"rechCancelDateEndQry"))){
            sqlBuf.append(" and UNIX_TIMESTAMP(A.CANCEL_DATE) <UNIX_TIMESTAMP('"+JsonUtil.getString(jsonObj,"rechCancelDateEndQry")+"') ");
        }

        if(JsonUtil.getString(jsonObj,"selectIds")!=null&&!"".equals(JsonUtil.getString(jsonObj,"selectIds"))){
            sqlBuf.append(" and A.RECH_CARD_ID in ("+JsonUtil.getString(jsonObj,"selectIds")+") ");
        }
        
        if (JsonUtil.getString(jsonObj, "rechCardId") != null
                && JsonUtil.getString(jsonObj, "rechCardId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "rechCardId"))) {
            sqlBuf.append("and A.RECH_CARD_ID ='" + JsonUtil.getString(jsonObj, "rechCardId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testcardStatusEnumId") != null
                && JsonUtil.getString(jsonObj, "testcardStatusEnumId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testcardStatusEnumId"))) {
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in('").append(
                    JsonUtil.getString(jsonObj, "testcardStatusEnumId")+"') ");
        }
        if (JsonUtil.getString(jsonObj, "rechStatusEnumId") != null
                && JsonUtil.getString(jsonObj, "rechStatusEnumId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "rechStatusEnumId"))) {
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID in("
                    + JsonUtil.getString(jsonObj, "rechStatusEnumId") + ") ");
        }
        if(JsonUtil.getString(jsonObj,"unUsedCard")!=null&&!"".equals(JsonUtil.getString(jsonObj,"unUsedCard"))
                &&"0".equals(JsonUtil.getString(jsonObj,"unUsedCard"))){//如果为0,不需要查报废的卡
            sqlBuf.append(" and A.TESTCARD_STATUS_ENUM_ID not in("
                    + 3 + ") ");
        }
        if (JsonUtil.getString(jsonObj, "lendFlag") != null
                && JsonUtil.getString(jsonObj, "lendFlag").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lendFlag"))) {
            sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "lendFlag") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "rechIsLend") != null
                && JsonUtil.getString(jsonObj, "rechIsLend").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "rechIsLend"))) {
            sqlBuf.append(" and A.LEND_FLAG ='" + JsonUtil.getString(jsonObj, "rechIsLend")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "attributionProvinceId") != null
                && JsonUtil.getString(jsonObj, "attributionProvinceId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "attributionProvinceId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                    + JsonUtil.getString(jsonObj, "attributionProvinceId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testProvinceId") != null
                && JsonUtil.getString(jsonObj, "testProvinceId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testProvinceId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_PROVINCE_ID ='"
                    + JsonUtil.getString(jsonObj, "testProvinceId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "attributionCityId") != null
                && JsonUtil.getString(jsonObj, "attributionCityId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "attributionCityId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                    + JsonUtil.getString(jsonObj, "attributionCityId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "testCityId") != null
                && JsonUtil.getString(jsonObj, "testCityId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "testCityId"))) {
            sqlBuf.append(" and A.ATTRIBUTION_CITY_ID ='"
                    + JsonUtil.getString(jsonObj, "testCityId") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "uploadNumbers") != null
                && JsonUtil.getString(jsonObj, "uploadNumbers").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "uploadNumbers"))) {
            sqlBuf.append(" and A.CARD_NUMBER in(" + JsonUtil.getString(jsonObj, "uploadNumbers")
                    + ") ");
        }
        if (JsonUtil.getString(jsonObj, "cardNumber") != null
                && JsonUtil.getString(jsonObj, "cardNumber").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "cardNumber"))) {
            sqlBuf.append(" and A.CARD_NUMBER like '%"
                    + JsonUtil.getString(jsonObj, "cardNumber") + "%' ");
        }
        if (JsonUtil.getString(jsonObj, "adminId") != null
                && JsonUtil.getString(jsonObj, "adminId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "adminId"))) {
            sqlBuf.append(" and (A.ADMIN_ID ='" + JsonUtil.getString(jsonObj, "adminId") + "' ");
            
            if(JsonUtil.getString(jsonObj, "lenderIdM") != null
                    && JsonUtil.getString(jsonObj, "lenderIdM").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lenderIdM"))){
                sqlBuf.append(" or A.LENDER_ID ='" + JsonUtil.getString(jsonObj, "lenderIdM") + "') ");
            }else if(JsonUtil.getString(jsonObj, "belongCityId") != null
                    && JsonUtil.getString(jsonObj, "belongCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongCityId"))){
                sqlBuf.append(" or A.ATTRIBUTION_CITY_ID ='" + JsonUtil.getString(jsonObj, "belongCityId") + "') ");
            }else if(JsonUtil.getString(jsonObj, "belongProvinceId") != null
                    && JsonUtil.getString(jsonObj, "belongProvinceId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "belongProvinceId"))){
                sqlBuf.append(" or A.ATTRIBUTION_PROVINCE_ID ='" + JsonUtil.getString(jsonObj, "belongProvinceId") + "') ");
            }else{
                sqlBuf.append(" ) ");
            }
        }
        if (JsonUtil.getString(jsonObj, "parValue") != null
                && JsonUtil.getString(jsonObj, "parValue").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "parValue"))) {
            sqlBuf.append(" and A.PAR_VALUE ='" + JsonUtil.getString(jsonObj, "parValue") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "cardNo") != null
                && JsonUtil.getString(jsonObj, "cardNo").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "cardNo"))) {
            sqlBuf.append(" and A.CARD_NO like '%" + JsonUtil.getString(jsonObj, "cardNo")
                    + "%' ");
        }
        if (JsonUtil.getString(jsonObj, "cardNoEqual") != null
                && JsonUtil.getString(jsonObj, "cardNoEqual").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "cardNoEqual"))) {
            sqlBuf.append(" and A.CARD_NO = '" + JsonUtil.getString(jsonObj, "cardNoEqual")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "cardNumberEqual") != null
                && JsonUtil.getString(jsonObj, "cardNumberEqual").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "cardNumberEqual"))) {
            sqlBuf.append(" and A.CARD_NUMBER = '" +
                JsonUtil.getString(jsonObj, "cardNumberEqual") + "' ");
        }
        if (JsonUtil.getString(jsonObj, "storageDepartmentId") != null
                && JsonUtil.getString(jsonObj, "storageDepartmentId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "storageDepartmentId"))) {
            sqlBuf.append(" and A.STORAGE_DEPARTMENT_ID = '" + JsonUtil.getString(jsonObj, "storageDepartmentId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "storageCityId") != null
                && JsonUtil.getString(jsonObj, "storageCityId").length() > 0&& !"null".equals(JsonUtil.getString(jsonObj, "storageCityId"))) {
            sqlBuf.append(" and A.STORAGE_CITY_ID = '" + JsonUtil.getString(jsonObj, "storageCityId")
                    + "' ");
        }
        if (JsonUtil.getString(jsonObj, "lenderId") != null
                && JsonUtil.getString(jsonObj, "lenderId").length() > 0&&!"null".equals(JsonUtil.getString(jsonObj, "lenderId"))) {
            sqlBuf.append(" and A.LENDER_ID = '" + JsonUtil.getString(jsonObj, "lenderId")
                    + "' ");
        }
        sqlBuf.append(" ORDER BY A.CREATION_DATE DESC ");
        return sqlBuf;
    }

    @Override
    public void saveRechCardInfo(JSONObject jsonObj) throws Exception {
        Long rechCardId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_RECH_CARD_INFO", "RECH_CARD_ID");
        jsonObj.put("rechCardId", rechCardId);
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_RECH_CARD_INFO(RECH_CARD_ID,ATTRIBUTION_PROVINCE_ID ")
                .append(",ATTRIBUTION_CITY_ID,TESTCARD_STATUS_ENUM_ID,RECH_CARD_TYPE_ENUM_ID ")
                .append(",EFFECTIVE_DATE,CANCEL_DATE,WARE_MAN_ID,STORAGE_DEPARTMENT_ID,ADMIN_ID ")
                .append(",STORAGE_PLACE,CARD_USE,REMARKS,CARD_NO,PAR_VALUE,CARD_NUMBER,LEND_FLAG ")
                .append(",LEND_DEPARTMENT_ID,LENDER_ID,LEND_TIME,PLAN_RETURN_TIME,SHEET_SERIAL_NUMBER ")
                .append(",OVER_STATE,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE ")
                .append(",RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID ")
                .append(",MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4 ")
                .append(",ATTRIBUTE5")
                .append(",ATTRIBUTION_PROVINCE_NAME")
                .append(",ATTRIBUTION_CITY_NAME")
                .append(",STORAGE_DEPARTMENT_NAME")
                .append(",ADMIN_NAME")
                .append(",LEND_DEPARTMENT_NAME")
                .append(",LENDER_NAME")
                .append(",STORAGE_CITY_ID")
                .append(",STORAGE_CITY_NAME)")
                .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
                .append(",?,?,?,?,?,?,?,?)");
        Object[] args = { 
                JsonUtil.get(jsonObj, "rechCardId"),
                JsonUtil.get(jsonObj, "attributionProvinceId"),
                JsonUtil.get(jsonObj, "attributionCityId"),
                JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                JsonUtil.get(jsonObj, "rechCardTypeEnumId"),
                JsonUtil.get(jsonObj, "effectiveDate"), JsonUtil.get(jsonObj, "cancelDate"),
                JsonUtil.get(jsonObj, "wareManId"), JsonUtil.get(jsonObj, "storageDepartmentId"),
                JsonUtil.get(jsonObj, "adminId"), JsonUtil.get(jsonObj, "storagePlace"),
                JsonUtil.get(jsonObj, "cardUse"), JsonUtil.get(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "cardNo"), JsonUtil.get(jsonObj, "parValue"),
                JsonUtil.get(jsonObj, "cardNumber"), JsonUtil.get(jsonObj, "lendFlag"),
                JsonUtil.get(jsonObj, "lendDepartmentId"), JsonUtil.get(jsonObj, "lenderId"),
                JsonUtil.get(jsonObj, "lendTime"), JsonUtil.get(jsonObj, "planReturnTime"),
                JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                JsonUtil.get(jsonObj, "createdBy"), JsonUtil.get(jsonObj, "creationDate"),
                JsonUtil.get(jsonObj, "lastUpdatedBy"), JsonUtil.get(jsonObj, "lastUpdateDate"),
                JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletedBy"), JsonUtil.get(jsonObj, "deletionDate"),
                JsonUtil.get(jsonObj, "marketingAreaId"),
                JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5"),
                JsonUtil.get(jsonObj, "attributionProvinceName"),
                JsonUtil.get(jsonObj, "attributionCityName"),
                JsonUtil.get(jsonObj, "storageDepartmentName"),
                JsonUtil.get(jsonObj, "adminName"),
                JsonUtil.get(jsonObj, "lendDepartmentName"),
                JsonUtil.get(jsonObj, "lenderName"),
                JsonUtil.get(jsonObj, "storageCityId"),
                JsonUtil.get(jsonObj, "storageCityName")
                };
        super.update(sqlBuf.toString(), args);
    }
    
    @Override
    public void saveRechCardInfoBatch(JSONArray jsonArray) throws Exception {
        
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        Long nextId = null;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
                    nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_RECH_CARD_INFO", "RECH_CARD_ID");
            Object obj[] = {nextId,
                    JsonUtil.get(jsonObj, "attributionProvinceId"),
                    JsonUtil.get(jsonObj, "attributionCityId"),
                    JsonUtil.get(jsonObj, "testcardStatusEnumId"),
                    JsonUtil.get(jsonObj, "rechCardTypeEnumId"),
                    JsonUtil.get(jsonObj, "effectiveDate"), JsonUtil.get(jsonObj, "cancelDate"),
                    JsonUtil.get(jsonObj, "wareManId"), JsonUtil.get(jsonObj, "storageDepartmentId"),
                    JsonUtil.get(jsonObj, "adminId"), JsonUtil.get(jsonObj, "storagePlace"),
                    JsonUtil.get(jsonObj, "cardUse"), JsonUtil.get(jsonObj, "remarks"),
                    JsonUtil.get(jsonObj, "cardNo"), JsonUtil.get(jsonObj, "parValue"),
                    JsonUtil.get(jsonObj, "cardNumber"), JsonUtil.get(jsonObj, "lendFlag"),
                    JsonUtil.get(jsonObj, "lendDepartmentId"), JsonUtil.get(jsonObj, "lenderId"),
                    JsonUtil.get(jsonObj, "lendTime"), JsonUtil.get(jsonObj, "planReturnTime"),
                    JsonUtil.get(jsonObj, "sheetSerialNumber"), JsonUtil.get(jsonObj, "overState"),
                    JsonUtil.get(jsonObj, "createdBy"), new Date(),//JsonUtil.get(jsonObj, "creationDate"),
                    JsonUtil.get(jsonObj, "lastUpdatedBy"), new Date(),//JsonUtil.get(jsonObj, "lastUpdateDate"),
                    JsonUtil.get(jsonObj, "recordVersion"), JsonUtil.get(jsonObj, "deletedFlag"),
                    JsonUtil.get(jsonObj, "deletedBy"), new Date(),//JsonUtil.get(jsonObj, "deletionDate"),
                    JsonUtil.get(jsonObj, "marketingAreaId"),
                    JsonUtil.get(jsonObj, "maintenanceAreaId"), JsonUtil.get(jsonObj, "orgId"),
                    JsonUtil.get(jsonObj, "attribute1"), JsonUtil.get(jsonObj, "attribute2"),
                    JsonUtil.get(jsonObj, "attribute3"), JsonUtil.get(jsonObj, "attribute4"),
                    JsonUtil.get(jsonObj, "attribute5"),
                    JsonUtil.get(jsonObj, "attributionProvinceName"),
                    JsonUtil.get(jsonObj, "attributionCityName"),
                    JsonUtil.get(jsonObj, "storageDepartmentName"),
                    JsonUtil.get(jsonObj, "adminName"),
                    JsonUtil.get(jsonObj, "lendDepartmentName"),
                    JsonUtil.get(jsonObj, "lenderName"),
                    JsonUtil.get(jsonObj, "storageCityId"),
                    JsonUtil.get(jsonObj, "storageCityName")};
            
            list.add(obj);
        }
        
        sqlBuf.append("INSERT INTO  T_EOM_RECH_CARD_INFO(RECH_CARD_ID,ATTRIBUTION_PROVINCE_ID ")
        .append(",ATTRIBUTION_CITY_ID,TESTCARD_STATUS_ENUM_ID,RECH_CARD_TYPE_ENUM_ID ")
        .append(",EFFECTIVE_DATE,CANCEL_DATE,WARE_MAN_ID,STORAGE_DEPARTMENT_ID,ADMIN_ID ")
        .append(",STORAGE_PLACE,CARD_USE,REMARKS,CARD_NO,PAR_VALUE,CARD_NUMBER,LEND_FLAG ")
        .append(",LEND_DEPARTMENT_ID,LENDER_ID,LEND_TIME,PLAN_RETURN_TIME,SHEET_SERIAL_NUMBER ")
        .append(",OVER_STATE,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE ")
        .append(",RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE,MARKETING_AREA_ID ")
        .append(",MAINTENANCE_AREA_ID,ORG_ID,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4 ")
        .append(",ATTRIBUTE5")
        .append(",ATTRIBUTION_PROVINCE_NAME")
        .append(",ATTRIBUTION_CITY_NAME")
        .append(",STORAGE_DEPARTMENT_NAME")
        .append(",ADMIN_NAME")
        .append(",LEND_DEPARTMENT_NAME")
        .append(",LENDER_NAME")
        .append(",STORAGE_CITY_ID")
        .append(",STORAGE_CITY_NAME)")
        .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?")
        .append(",?,?,?,?,?,?,?,?)");
        
        super.batchUpdate(sqlBuf.toString(), list);
        
        
    }

    @Override
    public void deleteRechCardInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_RECH_CARD_INFO SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  RECH_CARD_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "testobjectId")};
        super.update(sqlBuf.toString(), args);
    } 
	
	@Override
    public void deleteRechCardInfo(List list) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_RECH_CARD_INFO SET DELETED_BY = ?")
                .append(", DELETED_FLAG = ? ").append(", DELETION_DATE = ? ")
                .append(" WHERE  RECH_CARD_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);
    }
	
	@Override
    public void updateRechCardInfo(List list) throws Exception {

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_RECH_CARD_INFO SET CARD_NUMBER = ?");
        sqlBuf.append(", CARD_NO = ? ");
        sqlBuf.append(", PAR_VALUE = ? ");
        sqlBuf.append(", ORG_ID = ? ");
        sqlBuf.append(", ADMIN_ID = ? ");
        sqlBuf.append(", TESTCARD_STATUS_ENUM_ID = ? ");
        sqlBuf.append(", CREATION_DATE = ? ");
        sqlBuf.append(" WHERE  RECH_CARD_ID= ? ");

        super.batchUpdate(sqlBuf.toString(), list);

    }
	
	public void updateARechCardInfo(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" update T_EOM_RECH_CARD_INFO set RECORD_VERSION = RECORD_VERSION+1, LAST_UPDATE_DATE = now()");
        List<Object> list = new ArrayList<Object>();
        if(jsonObj.has("lastUpdatedBy")){
            sqlBuf.append(" , LAST_UPDATED_BY =? ");
            list.add(JsonUtil.get(jsonObj, "lastUpdatedBy"));
        }
        if(jsonObj.has("adminId")){
            sqlBuf.append(" , ADMIN_ID =? ");
            list.add(JsonUtil.get(jsonObj, "adminId"));
        }
        if(jsonObj.has("adminName")){
            sqlBuf.append(" , ADMIN_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "adminName"));
        }
        if(jsonObj.has("storageCityId")){
            if("null".equals(JsonUtil.get(jsonObj, "storageCityId"))){
                sqlBuf.append(" , STORAGE_CITY_ID =null ");
            }else{
                sqlBuf.append(" , STORAGE_CITY_ID =? ");
                list.add(JsonUtil.get(jsonObj, "storageCityId"));
            }
        }
        if(jsonObj.has("storageCityName")){
            if("null".equals(JsonUtil.get(jsonObj, "storageCityName"))){
                sqlBuf.append(" , STORAGE_CITY_NAME =null ");
            }else{
                sqlBuf.append(" , STORAGE_CITY_NAME =? ");
                list.add(JsonUtil.get(jsonObj, "storageCityName"));
            }
        }
        if(jsonObj.has("storageDepartmentId")){
            sqlBuf.append(" , STORAGE_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentId"));
        }
        if(jsonObj.has("storageDepartmentName")){
            sqlBuf.append(" , STORAGE_DEPARTMENT_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "storageDepartmentName"));
        }
        if(jsonObj.has("testcardStatusEnumId")){
            sqlBuf.append(" , TESTCARD_STATUS_ENUM_ID =? ");
            list.add(JsonUtil.get(jsonObj, "testcardStatusEnumId"));
        }
        
        
        if(jsonObj.has("lendDepartmentId")){
            sqlBuf.append(" , LEND_DEPARTMENT_ID =? ");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentId"));
        }
        if(jsonObj.has("lenderId")){
            sqlBuf.append(" , LENDER_ID =? ");
            list.add(JsonUtil.get(jsonObj, "lenderId"));
        }
        if(jsonObj.has("sheetSerialNumber")){
            sqlBuf.append(" , SHEET_SERIAL_NUMBER =? ");
            list.add(JsonUtil.get(jsonObj, "sheetSerialNumber"));
        }
        if(jsonObj.has("planReturnTime")){
            sqlBuf.append(" , PLAN_RETURN_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "planReturnTime"));
        }
        if(jsonObj.has("lendFlag")){
            sqlBuf.append(" , LEND_FLAG =? ");
            list.add(JsonUtil.get(jsonObj, "lendFlag"));
        }
        if(jsonObj.has("lendTime")){
            sqlBuf.append(" , LEND_TIME =? ");
            list.add(JsonUtil.get(jsonObj, "lendTime"));
        }
        if(jsonObj.has("lendDepartmentName")){
            sqlBuf.append(" , LEND_DEPARTMENT_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "lendDepartmentName"));
        }
        if(jsonObj.has("lenderName")){
            sqlBuf.append(" , LENDER_NAME =? ");
            list.add(JsonUtil.get(jsonObj, "lenderName"));
        }
        
        sqlBuf.append(" where 1=1 ");
        
        if(jsonObj.has("rechCardId")){
            sqlBuf.append(" AND RECH_CARD_ID =? ");
            list.add(JsonUtil.get(jsonObj, "rechCardId"));
        }
        
        super.update(sqlBuf.toString(), list.toArray());
    }
}
