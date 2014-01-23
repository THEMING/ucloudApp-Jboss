package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucloud.paas.agent.PaasException;
import com.ucloud.paas.proxy.sysconfig.EnumConfigService;
import com.ucloud.paas.proxy.sysconfig.vo.EnumType;
import com.ucloud.paas.proxy.sysconfig.vo.EnumValue;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.service.ExportSimpleElsService;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

/**
 * 生成测试卡excle模板
 * @version 1.0
 * @date 2013-3-6
 * @author Jerry
 */
@Service
public class CreTestCardTemServiImpl extends ExportSimpleElsService {

    @Autowired
    private ITciPriAttTemService tciPriAttTemplateService;
    EnumConfigService enumConfigService = new EnumConfigService();
    
    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
        
        StringBuffer fields = new StringBuffer();
        StringBuffer columns = new StringBuffer();
        StringBuffer width = new StringBuffer();

        List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>() ;
        String title = "";
        String titleEn = "";
        
        Integer cardType = JsonUtil.getInt(param, "cardType");
        if(null != cardType && cardType.intValue() == ConstantUtil.TEST_CARD_ENUM){
            fields.append("testcardTypeEnumId,")
            .append("testcardTypeEnumName,")
            .append("operatorEnumId,")
            .append("operatorEnumName,")
            .append("cardNetworkTypeEnumId,")
            .append("cardNetworkTypeEnumName,")
            .append("attributionCountryEnumId,")
            .append("attributionCountryName,")  
//            .append("attributionProvinceId,")  
            .append("attributionProvinceName,")  
//            .append("attributionCityId,")
            .append("attributionCityName,")
            .append("wareManId,")
            .append("wareManName,")
//            .append("storageCityId,")
            .append("storageCityName,")
//            .append("storageDepartmentId,")
            .append("storageDepartmentName,")
            .append("whetherPrepaid,")
            .append("accountId,")
            .append("adminName,")
            .append("cardNo,")
            .append("imsi,")
            .append("subscriberNumber,")
            .append("number,")
            .append("testcardStatusEnumId,")
            .append("testcardStatusEnumName,")
            .append("balance,")
            .append("effectiveDate,")
            .append("cancelDate");
            
            columns.append("测试卡类别编码(数字),")
            .append("测试卡类别名称(字符),")
            .append("运营商编码(数字),")
            .append("运营商名称(字符),")
            .append("网络类型编码(数字),")
            .append("网络类型名称(字符),")
            .append("归属国家编码(数字),")
            .append("归属国家名称(字符),")
//            .append("归属省份编码,")
            .append("归属省分公司名称(字符),")
//            .append("归属地市编码,")
            .append("归属地市公司名称(字符),")
            .append("入库人账号(数字或字母),")
            .append("入库人(字符),")
//            .append("存放地市编码,")
            .append("存放地市((字符)非必填),")
//            .append("存放部门编码,")
            .append("存放部门(字符),")
            .append("是否预付费(数字),")
            .append("管理员账号(数字或字母),")
            .append("管理员(字符),")
            .append("卡号(数字或字母),")
            .append("IMSI(数字或字母),")
            .append("用户号码(数字),")
            .append("编号(数字或字母),")
            .append("测试卡状态编码(数字),")
            .append("测试卡状态(字符),")
            .append("余额(数字),")
            .append("生效日期(时间),")
            .append("注销日期(时间)");
            
            Map<String, Object> m =new HashMap();
            m.put("testcardTypeEnumId", "4");
            m.put("testcardTypeEnumName",getEnumValue("TESTCARD_TYPE"));
            m.put("operatorEnumId","4");
            m.put("operatorEnumName",getEnumValue("PROMOTE_OPERATOR"));
            m.put("cardNetworkTypeEnumId","3");
            m.put("cardNetworkTypeEnumName",getEnumValue("CARD_NETWORK_TYPE"));
            m.put("attributionCountryEnumId","1");
            m.put("attributionCountryName",getEnumValue("ATTRIBUTION_COUNTRY"));
//            m.put("attributionProvinceId",JsonUtil.getString(param, "provinceCompanyId"));
            m.put("attributionProvinceName",JsonUtil.getString(param, "provinceCompanyName"));
            
//            m.put("attributionCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("attributionCityName",JsonUtil.getString(param, "cityCompanyName"));
            m.put("wareManId",JsonUtil.getString(param, "accountId"));
            m.put("wareManName",JsonUtil.getString(param, "userEmpName"));
//            m.put("storageCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("storageCityName",JsonUtil.getString(param, "cityCompanyName"));
//            m.put("storageDepartmentId",JsonUtil.getString(param, "cloudOrgId"));
            m.put("storageDepartmentName",JsonUtil.getString(param, "userDeptName"));
            m.put("whetherPrepaid","1(1:是;0:否)");
            m.put("accountId",JsonUtil.getString(param, "accountId"));
            m.put("adminName",JsonUtil.getString(param, "userEmpName"));
            m.put("cardNo","112233445568");
            m.put("imsi","112233445568");
            m.put("subscriberNumber","1");
            m.put("number","112233445568");
            m.put("testcardStatusEnumId","4");
            m.put("testcardStatusEnumName",getEnumValue("TESTCARD_STATUS"));
            m.put("balance","1");
            m.put("effectiveDate","2013-6-9 00:00:00");
            m.put("cancelDate","2015-6-9 00:00:00");
            dataList.add(m);

            width.append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35");

            title = "测试卡";
            titleEn = "测试卡sheet";
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
            fields.append("attributionProvinceName,")
//            .append("attributionProvinceId,") 
//            .append("attributionCityId,")
            .append("attributionCityName,")
            .append("testcardStatusEnumId,")
            .append("testcardStatusEnumName,")
            .append("wareManId,")
            .append("wareManName,")
//            .append("storageCityId,")
            .append("storageCityName,")
//            .append("storageDepartmentId,")
            .append("storageDepartmentName,")
            .append("accountId,")
            .append("adminName,")
            .append("phoneNumber,")
            .append("fixedPhoneTypeEnumId,")
            .append("fixedPhoneTypeEnumName,")
            .append("teleFunction,")
            .append("number,")
            .append("effectiveDate,")
            .append("cancelDate");
            
            columns.append("归属省分公司名称(字符),")
//            .append("归属省份编码,")
//            .append("归属地市编码,")
            .append("归属地市公司名称(字符),")
            .append("固定电话状态编码(数字),")
            .append("固定电话状态(字符),")
             .append("入库人账号(数字或字母),")
            .append("入库人(字符),")
//            .append("存放地市编码,")
            .append("存放地市((字符)非必填),")
//            .append("存放部门编码,")
            .append("存放部门(字符),")
            .append("管理员账号(数字或字母),")
            .append("管理员(字符),")
            .append("电话号码(数字),")
            .append("类型编码(数字),")
            .append("类型(字符),")
            .append("功能(字符),")
            .append("编号(数字或字母),")
            .append("生效日期(时间),")
            .append("注销日期(时间)");
            
            Map<String, Object> m =new HashMap();
//            m.put("attributionProvinceId",JsonUtil.getString(param, "provinceCompanyId"));
            m.put("attributionProvinceName",JsonUtil.getString(param, "provinceCompanyName"));
//            m.put("attributionCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("attributionCityName",JsonUtil.getString(param, "cityCompanyName"));
            m.put("testcardStatusEnumId","1");
            m.put("testcardStatusEnumName",getEnumValue("TESTCARD_STATUS"));
            m.put("wareManId",JsonUtil.getString(param, "accountId"));
            m.put("wareManName",JsonUtil.getString(param, "userEmpName"));
//            m.put("storageCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("storageCityName",JsonUtil.getString(param, "cityCompanyName"));
//            m.put("storageDepartmentId",JsonUtil.getString(param, "cloudOrgId"));
            m.put("storageDepartmentName",JsonUtil.getString(param, "userDeptName"));
            m.put("accountId",JsonUtil.getString(param, "accountId"));
            m.put("adminName",JsonUtil.getString(param, "userEmpName"));
            m.put("phoneNumber","13631432432");
            m.put("fixedPhoneTypeEnumId","2");
            m.put("fixedPhoneTypeEnumName",getEnumValue("FIXED_PHONE_TYPE"));
            m.put("teleFunction","通知");
            m.put("number","13631432432");
            m.put("effectiveDate","2013-6-8 00:00:00");
            m.put("cancelDate","2015-6-8 00:00:00");
            dataList.add(m);
            
            width.append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35");
            
            title = "固定电话";
            titleEn = "固定电话sheet";
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
            fields.append("attributionProvinceName,")
//            .append("attributionProvinceId,") 
//            .append("attributionCityId,")
            .append("attributionCityName,")
            .append("testcardStatusEnumId,")
            .append("testcardStatusEnumName,")
            .append("wareManId,")
            .append("wareManName,")
//            .append("storageCityId,")
            .append("storageCityName,")
//            .append("storageDepartmentId,")
            .append("storageDepartmentName,")
            .append("accountId,")
            .append("adminName,")
            .append("moblieTypeEnumId,")
            .append("moblieTypeEnumName,")
            .append("manufacturerName,")
            .append("phoneModel,")
            .append("imei,")
            .append("number,")
            .append("effectiveDate,")
            .append("cancelDate");
            
            columns.append("归属省分公司名称(字符),")
//            .append("归属省份编码,")
//            .append("归属地市编码,")
            .append("归属地市公司名称(字符),")
            .append("测试终端状态编码(数字),")
            .append("测试终端状态(字符),")
             .append("入库人账号(数字或字母),")
            .append("入库人(字符),")
//            .append("存放地市编码,")
            .append("存放地市((字符)非必填),")
//            .append("存放部门编码,")
            .append("存放部门(字符),")
            .append("管理员账号(数字或字母),")
            .append("管理员(字符),")
            .append("手机类型编码(数字),")
            .append("手机类型(字符),")
            .append("厂家(字符),")
            .append("手机型号(数字或字母),")
            .append("手机串号(数字或字母),")
            .append("编号(数字或字母),")
            .append("生效日期(时间),")
            .append("注销日期(时间)");
            
            Map<String, Object> m =new HashMap();
//            m.put("attributionProvinceId",JsonUtil.getString(param, "provinceCompanyId"));
            m.put("attributionProvinceName",JsonUtil.getString(param, "provinceCompanyName"));
//            m.put("attributionCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("attributionCityName",JsonUtil.getString(param, "cityCompanyName"));
            m.put("testcardStatusEnumId","1");
            m.put("testcardStatusEnumName",getEnumValue("TESTCARD_STATUS"));
            m.put("wareManId",JsonUtil.getString(param, "accountId"));
            m.put("wareManName",JsonUtil.getString(param, "userEmpName"));
//            m.put("storageCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("storageCityName",JsonUtil.getString(param, "cityCompanyName"));
//            m.put("storageDepartmentId",JsonUtil.getString(param, "cloudOrgId"));
            m.put("storageDepartmentName",JsonUtil.getString(param, "userDeptName"));
            m.put("accountId",JsonUtil.getString(param, "accountId"));
            m.put("adminName",JsonUtil.getString(param, "userEmpName"));
            m.put("moblieTypeEnumId","3");
            m.put("moblieTypeEnumName",getEnumValue("MOBILE_TYPE"));
            m.put("manufacturerName","中兴");
            m.put("phoneModel","v880");
            m.put("imei","3322114455");
            m.put("number","3322114455");
            m.put("effectiveDate","2013-6-7 00:00:00");
            m.put("cancelDate","2015-6-7 00:00:00");
            dataList.add(m);
            
            width.append("35,")
            .append("35,")
            .append("35,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35");

            title = "测试终端";
            titleEn = "测试终端sheet";
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
            fields.append("attributionProvinceName,")
//            .append("attributionProvinceId,") 
//            .append("attributionCityId,")
            .append("attributionCityName,")
            .append("testcardStatusEnumId,")
            .append("testcardStatusEnumName,")
            .append("wareManId,")
            .append("wareManName,")
//            .append("storageCityId,")
            .append("storageCityName,")
//            .append("storageDepartmentId,")
            .append("storageDepartmentName,")
            .append("accountId,")
            .append("adminName,")
            .append("cardNo,")
            .append("parValue,")
            .append("parValueName,")
            .append("cardNumber,")
            .append("rechCardTypeEnumId,")
            .append("rechCardTypeEnumName,")
            .append("effectiveDate,")
            .append("cancelDate");
            
            columns.append("归属省分公司名称(字符),")
//            .append("归属省份编码,")
//            .append("归属地市编码,")
            .append("归属地市公司名称(字符),")
            .append("充值卡状态编码(数字),")
            .append("充值卡状态(字符),")
             .append("入库人账号(数字或字母),")
            .append("入库人(字符),")
//            .append("存放地市编码,")
            .append("存放地市((字符)非必填),")
//            .append("存放部门编码,")
            .append("存放部门(字符),")
            .append("管理员账号(数字或字母),")
            .append("管理员(字符),")
            .append("卡号(数字或字母),")
            .append("面值编码(数字),")
            .append("面值(数字),")
            .append("编号(数字或字母),")
            .append("卡类型编码(数字),")
            .append("卡类型(字符),")
            .append("生效日期(时间),")
            .append("注销日期(时间)");
            
            Map<String, Object> m =new HashMap();
//            m.put("attributionProvinceId",JsonUtil.getString(param, "provinceCompanyId"));
            m.put("attributionProvinceName",JsonUtil.getString(param, "provinceCompanyName"));
//            m.put("attributionCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("attributionCityName",JsonUtil.getString(param, "cityCompanyName"));
            m.put("testcardStatusEnumId","1");
            m.put("testcardStatusEnumName",getEnumValue("TESTCARD_STATUS"));
            m.put("wareManId",JsonUtil.getString(param, "accountId"));
            m.put("wareManName",JsonUtil.getString(param, "userEmpName"));
//            m.put("storageCityId",JsonUtil.getString(param, "cityCompanyId"));
            m.put("storageCityName",JsonUtil.getString(param, "cityCompanyName"));
//            m.put("storageDepartmentId",JsonUtil.getString(param, "cloudOrgId"));
            m.put("storageDepartmentName",JsonUtil.getString(param, "userDeptName"));
            m.put("accountId",JsonUtil.getString(param, "accountId"));
            m.put("adminName",JsonUtil.getString(param, "userEmpName"));
            m.put("cardNo","112233445544");
            m.put("parValue","1");
            m.put("parValueName","1:35;2:50;3:100;");
            m.put("cardNumber","112233445544");
            m.put("rechCardTypeEnumId","1");
            m.put("rechCardTypeEnumName",getEnumValue("RECH_CARD_TYPE"));
            m.put("effectiveDate","2013-6-9 00:00:00");
            m.put("cancelDate","2015-6-9 00:00:00");
            dataList.add(m);
            
            width.append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
//            .append("20,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35,")
            .append("35");
            
            title = "充值卡";
            titleEn = "充值卡sheet";
        }
       
      /*  JSONObject jsObj = 
                addPriAttTemDetailInfo(param,fields.toString(),columns.toString(),width.toString());
        
        String[] fieldsId = JsonUtil.getString(jsObj,"fields").split(",");
        String[] fieldsName = JsonUtil.getString(jsObj,"columns").split(",");
        String[] widths = JsonUtil.getString(jsObj,"width").split(",");*/
        String[] fieldsId = fields.toString().split(",");
        String[] fieldsName = columns.toString().split(",");
        String[] widths = width.toString().split(",");
        SimpleExportParameter parameters = new SimpleExportParameter();
        
        parameters.setTitle(title);

        parameters.setTitleEn(titleEn);
        parameters.setFieldsId(fieldsId);
        parameters.setFieldsName(fieldsName);
        parameters.setWidths(widths);
        parameters.setDataList(dataList);

        return parameters;
    }
    
    /**
     * 按照省ID和测试卡类型ID 查找私有属性模板明细
     * @param param 前台传入的参数
     * @param fields 字段名称
     * @param columns excle显示的列名
     * @param width excle列宽度
     * @return
     * @throws Exception
     * @see
     * @since
     */
    private JSONObject addPriAttTemDetailInfo(JSONObject param,String fields,String columns,String width)
            throws Exception{
        
        JSONObject qryJson = new JSONObject();
        qryJson.put("testobjectType",JsonUtil.get(param,"cardType"));
        qryJson.put("attributionProvinceId",JsonUtil.get(param,"attributionProvinceId"));
        
        List<Map<String, Object>> list = 
                tciPriAttTemplateService.qryTemplateListByParam(qryJson);
        if(list != null && list.size() > 0){
            Map<String, Object> map = new HashMap<String, Object>();
            for(int i=0;i<list.size();i++){
                map = list.get(i);
                
                fields += ","+MapUtils.getString(map, "columnNumber");
                columns += ","+MapUtils.getString(map, "columnName");
                width += ",20";
            }
        }
        JSONObject json = new JSONObject();
        json.put("fields", fields);
        json.put("columns", columns);
        json.put("width", width);
      
        return json;
    }
    
    private String getEnumValue(String enumValue){
        
        EnumType enumType = null;
        try {
            enumType = enumConfigService.getEnumType(enumValue, null, 1);
        } catch (PaasException e1) {
        }
        List<EnumValue> enumValues = new ArrayList();
        StringBuffer re = new StringBuffer();
        if (!CommonUtils.isEmpty(enumType)) {
            enumValues = enumType.getEnumValues();
        }
        for(EnumValue e:enumValues){
            re.append(e.getEnumValueNum()+":"+e.getEnumValueName()+";");
        }
        return re.toString();
    }
}

