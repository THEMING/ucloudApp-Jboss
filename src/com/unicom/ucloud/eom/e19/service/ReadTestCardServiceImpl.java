package com.unicom.ucloud.eom.e19.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucloud.paas.agent.PaasException;
import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.AccountEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.ucloud.paas.proxy.aaaa.util.PaasAAAAException;
import com.ucloud.paas.proxy.common.Pagination;
import com.ucloud.paas.proxy.common.SortDirectionEnum;
import com.ucloud.paas.proxy.sysconfig.EnumConfigService;
import com.ucloud.paas.proxy.sysconfig.vo.EnumType;
import com.ucloud.paas.proxy.sysconfig.vo.EnumValue;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.service.ReadSimpleElsService;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.eom.e19.dao.ITestCardRegisterDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleReadParameter;

/**
 * 读取批量导入测试卡excel数据的类
 * 
 * @version 1.0
 * @date 2013-3-6
 * @author Jerry
 */
@Service
public class ReadTestCardServiceImpl extends ReadSimpleElsService {

    @Autowired
    private ITciPriAttTemService tciPriAttTemplateService;
    @Autowired
    private ITestCardRegisterDAO testCardRegisterDAO;
    @Autowired
    private ITestCardRegService testCardRegService;
    EnumConfigService enumConfigService = new EnumConfigService();
    AAAAService aaaa = new AAAAService();
    private Map goobleMap = new HashMap();//全局map，用于记录组织名称对应的id，一旦用findOrgEntityByParams方法查出对应关系，就放入此map，下次查询前先查询此map，有就直接用，提高效率

    @Override
    protected SimpleReadParameter getSimpleReadParameters(JSONObject param) throws Exception {
        SimpleReadParameter parameter = new SimpleReadParameter();

        StringBuffer fields = new StringBuffer();
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
            .append("adminId,")
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
            .append("adminId,")
            .append("adminName,")
            .append("phoneNumber,")
            .append("fixedPhoneTypeEnumId,")
            .append("fixedPhoneTypeEnumName,")
            .append("teleFunction,")
            .append("number,")
            .append("effectiveDate,")
            .append("cancelDate");
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
            .append("adminId,")
            .append("adminName,")
            .append("moblieTypeEnumId,")
            .append("moblieTypeEnumName,")
            .append("manufacturerName,")
            .append("phoneModel,")
            .append("imei,")
            .append("number,")
            .append("effectiveDate,")
            .append("cancelDate");
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
            .append("adminId,")
            .append("adminName,")
            .append("cardNo,")
            .append("parValue,")
            .append("parValueName,")
            .append("cardNumber,")
            .append("rechCardTypeEnumId,")
            .append("rechCardTypeEnumName,")
            .append("effectiveDate,")
            .append("cancelDate");
        }
        //用于功能实现，插入私有属性
//        JSONObject jsObj = addPriAttTemDetailInfo(param, fields.toString());
//
//        String[] fieldsId = JsonUtil.getString(jsObj, "fields").split(",");
      //用于性能测试，不插入私有属性
//        JSONObject jsObj = addPriAttTemDetailInfo(param, fields.toString());

        String[] fieldsId = fields.toString().split(",");
        parameter.setFieldsId(fieldsId);
        parameter.setStartIndex(2);

        return parameter;
    }

    /**
     * 按照省ID和测试卡类型ID 查找私有属性模板明细
     * 
     * @param param
     * @param fields
     * @return
     * @throws Exception
     * @see
     * @since
     */
    private JSONObject addPriAttTemDetailInfo(JSONObject param, String fields) throws Exception {

        JSONObject qryJson = new JSONObject();
        qryJson.put("testobjectType", JsonUtil.get(param, "cardType"));
        qryJson.put("attributionProvinceId", JsonUtil.get(param, "attributionProvinceId"));

        List<Map<String, Object>> list = tciPriAttTemplateService.qryTemplateListByParam(qryJson);
        if (list != null && list.size() > 0) {
            Map<String, Object> map = new HashMap<String, Object>();
            for (int i = 0; i < list.size(); i++) {
                map = list.get(i);

                fields += "," + MapUtils.getString(map, "columnNumber");
            }
        }
        JSONObject json = new JSONObject();
        json.put("fields", fields);

        return json;
    }
    
    public String saveImportData(JSONObject param, List<Map<String, Object>> data) throws Exception{
        
        Integer cardType = JsonUtil.getInt(param, "cardType");
            Date now = new Date();
            String attributionProvinceId = JsonUtil.getString(param, "attributionProvinceId");
            String testobjectTypeEnumId = JsonUtil.getString(param, "testobjectTypeEnumId");
            String lendFlag = JsonUtil.getString(param, "lendFlag");
            String overState = JsonUtil.getString(param, "overState");
            String createdBy = JsonUtil.getString(param, "createdBy");
            String lastUpdatedBy = JsonUtil.getString(param, "lastUpdatedBy");
            String recordVersion = JsonUtil.getString(param, "recordVersion");
            String deletedFlag = JsonUtil.getString(param, "deletedFlag");
            String marketingAreaId = JsonUtil.getString(param, "marketingAreaId");
            String maintenanceAreaId = JsonUtil.getString(param, "maintenanceAreaId");
            String orgId = JsonUtil.getString(param, "orgId");
            
            JSONArray jsonArray = new JSONArray();
            
            for(int i=0;i<data.size();i++){
                Map m = data.get(i);
                JSONObject jsObj = new JSONObject();
                Set<String> set = new HashSet<String>();
                set= m.keySet();
                for (String key : set) {
                 //循环取出了你map里面的值然后再调用你的sql方法想怎么存就怎么存
//                 System.out.print(key+" = "+m.get(key));
                    m=isNeedRemovePointZero(key,m);
                 if(key.equals("adminId")){
                	 Integer cloudUserId = getCloudUserId((String) m.get(key));
                	 jsObj.put(key,cloudUserId);
                 } else if(key.equals("wareManId")){
                	 Integer cloudUserId = getCloudUserId((String) m.get(key));
                	 jsObj.put(key,cloudUserId);
                 } else if(key.equals("attributionProvinceName")){
                     Integer cloudId = getCloudIdFromName((String) m.get(key));
                     jsObj.put("attributionProvinceId",cloudId);//省份id
                     jsObj.put("attributionProvinceName",m.get(key));//省份名称
                 } else if(key.equals("attributionCityName")){
                     Integer cloudId = getCloudIdFromName((String) m.get(key));
                     jsObj.put("attributionCityId",cloudId);//归属地市id
                     jsObj.put("attributionCityName",m.get(key));//归属地市名称
                 } else if(key.equals("storageCityName")&&!"".equals(m.get(key))){
                     Integer cloudId = getCloudIdFromName((String) m.get(key));
                     jsObj.put("storageCityId",cloudId);//存放地市id
                     jsObj.put("storageCityName",m.get(key));//存放地市名称
                 } else if(key.equals("storageDepartmentName")){
                     Integer cloudId = getCloudIdFromName((String) m.get(key));
                     jsObj.put("storageDepartmentId",cloudId);//存放部门id
                     jsObj.put("storageDepartmentName",m.get(key));//存放部门名称
                 }else{
                	  jsObj.put(key, m.get(key));
                 }
                }
                
                jsObj.put("creationDate", now);
                jsObj.put("lastUpdateDate", now);
                jsObj.put("deletionDate", now);
                
                jsObj.put("deletionDate", now);
                
//                jsObj.put("attributionProvinceId", attributionProvinceId);
                jsObj.put("testobjectTypeEnumId", testobjectTypeEnumId);
                jsObj.put("lendFlag", lendFlag);
                jsObj.put("overState", overState);
                jsObj.put("createdBy", createdBy);
                jsObj.put("lastUpdatedBy",lastUpdatedBy);
                jsObj.put("recordVersion", recordVersion);
                jsObj.put("deletedFlag", deletedFlag);
                jsObj.put("marketingAreaId", marketingAreaId);
                jsObj.put("maintenanceAreaId", maintenanceAreaId);
                jsObj.put("orgId", orgId);
                
                jsonArray.put(jsObj);
                
//                testCardRegisterDAO.saveTestCardInfo(jsObj);
                
//                Long testCardId = JsonUtil.getLong(jsObj, "testCardId");
//                TestCardRegServiceImpl tcrsi = new TestCardRegServiceImpl();
//                tcrsi.savePriAttValueInfo(jsObj,testCardId);
            }
            try{
            if(null != cardType && cardType.intValue() == ConstantUtil.TEST_CARD_ENUM){
                testCardRegisterDAO.saveTestCardInfoBatch(jsonArray);
            }else if(null != cardType && cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
                testCardRegisterDAO.saveImsInfoBatch(jsonArray);
            }else if(null != cardType && cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
                testCardRegisterDAO.saveTerminalInfoBatch(jsonArray);
            }else if(null != cardType && cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
                testCardRegisterDAO.saveRechCardInfoBatch(jsonArray);
            }
            }catch(Exception e){
                return e.toString();
            }
        
        
        
//        logger.debug(data.size());
//        Date now = new Date();
//        String attributionProvinceId = JsonUtil.getString(param, "attributionProvinceId");
//        String testobjectTypeEnumId = JsonUtil.getString(param, "testobjectTypeEnumId");
//        String lendFlag = JsonUtil.getString(param, "lendFlag");
//        String overState = JsonUtil.getString(param, "overState");
//        String createdBy = JsonUtil.getString(param, "createdBy");
//        String lastUpdatedBy = JsonUtil.getString(param, "lastUpdatedBy");
//        String recordVersion = JsonUtil.getString(param, "recordVersion");
//        String deletedFlag = JsonUtil.getString(param, "deletedFlag");
//        String marketingAreaId = JsonUtil.getString(param, "marketingAreaId");
//        String maintenanceAreaId = JsonUtil.getString(param, "maintenanceAreaId");
//        String orgId = JsonUtil.getString(param, "orgId");
//        
////        param.attributionProvinceId = attributionProvinceId;
////        param.testobjectTypeEnumId = qryParams.testobjectTypeEnumId;
////        
////        param.lendFlag = '0';
////        param.overState = '0';
////        param.createdBy = session.logonAccount.cloudUserId;
////        param.lastUpdatedBy = session.logonAccount.cloudUserId;
////        param.recordVersion = 1;
////        param.deletedFlag = false;
////        param.marketingAreaId = session.logonAccount.marketingAreaId;
////        param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
////        param.orgId = session.logonAccount.cloudOrgId;
//        
//        
//        
//        JSONArray jsonArray = new JSONArray();
//        
//        for(int i=0;i<data.size();i++){
//            JSONObject jsObj = (JSONObject) data.get(i);
//            
//            jsObj.put("creationDate", now);
//            jsObj.put("lastUpdateDate", now);
//            jsObj.put("deletionDate", now);
//            
//            jsObj.put("deletionDate", now);
//            
//            jsObj.put("attributionProvinceId", attributionProvinceId);
//            jsObj.put("testobjectTypeEnumId", testobjectTypeEnumId);
//            jsObj.put("lendFlag", lendFlag);
//            jsObj.put("overState", overState);
//            jsObj.put("createdBy", createdBy);
//            jsObj.put("lastUpdatedBy",lastUpdatedBy);
//            jsObj.put("recordVersion", recordVersion);
//            jsObj.put("deletedFlag", deletedFlag);
//            jsObj.put("marketingAreaId", marketingAreaId);
//            jsObj.put("maintenanceAreaId", maintenanceAreaId);
//            jsObj.put("orgId", orgId);
//            
//            jsonArray.put(jsObj);
//            
////            testCardRegisterDAO.saveTestCardInfo(jsObj);
//            
////            Long testCardId = JsonUtil.getLong(jsObj, "testCardId");
////            TestCardRegServiceImpl tcrsi = new TestCardRegServiceImpl();
////            tcrsi.savePriAttValueInfo(jsObj,testCardId);
//        }
//        
//        testCardRegisterDAO.saveTestCardInfoBatch(jsonArray);
        
//        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
//        if (dataArray != null && dataArray.length() > 0) {
//            Date now = new Date();
//            for (int i = 0; i < dataArray.length(); i++) {
//                JSONObject jsObj = (JSONObject) dataArray.get(i);
//                jsObj.put("creationDate", now);
//                jsObj.put("lastUpdateDate", now);
//                jsObj.put("deletionDate", now);
//                testCardRegisterDAO.saveTestCardInfo(jsObj);
//                
//                Long testCardId = JsonUtil.getLong(jsObj, "testCardId");
//                savePriAttValueInfo(jsObj,testCardId);
//            }
//        }
        
        return "导入成功"; 
    }
    
    private Map isNeedRemovePointZero(String na,Map mm){
        if(na.equals("cardNo")||na.equals("imsi")||na.equals("subscriberNumber")||na.equals("number")||na.equals("phoneModel")
                ||na.equals("imei")||na.equals("phoneNumber")||na.equals("cardNumber")){
            Object o = removeThePointZero(MapUtils.getObject(mm,na));
            mm.put(na,o.toString());
        }
        return mm;
    }

    public String validate(JSONObject param, List<Map<String, Object>> data) throws Exception {
        SimpleReadParameter parameters = getSimpleReadParameters(param);
        // 开始索引，默认为2，因为第一行是表头，第二行是列名，所以索引从2开始

        int startIndex = parameters.getStartIndex()+1;
        

//        String msg = "";
        StringBuffer msgSB = new StringBuffer();
        if (CommonUtils.isEmpty(data)) {
            return "没有读取到数据";
        }
        try{
        Integer cardType = JsonUtil.getInt(param, "cardType");
        if(null != cardType && cardType.intValue() == ConstantUtil.TEST_CARD_ENUM){
            List testCardTypeEnum = getEnumValueList("TESTCARD_TYPE");//测试卡类别    
            List operatorEnum = getEnumValueList("PROMOTE_OPERATOR");//运营商
            List cardNetworkTypeEnum = getEnumValueList("CARD_NETWORK_TYPE");//网络类型
            List attributionCountryEnum = getEnumValueList("ATTRIBUTION_COUNTRY");//归属国家
            List citys = new ArrayList();//getCityValueList(JsonUtil.getInt(param, "attributionProvinceId"));//归属省份
            List whetherPrepaidLi = new ArrayList();//是否预付费
            whetherPrepaidLi.add((int)1);
            whetherPrepaidLi.add((int)0);
            List testcardStatusEnum = getEnumValueList("TESTCARD_STATUS");//测试卡状态编码
            
            for (int i = 0; i < data.size(); i++) {
                Map<String, Object> row = data.get(i);
                StringBuffer msg = new StringBuffer("");
                Object dictId = row.get("testcardTypeEnumId");//测试卡类别编码
                msg.append(valiEnum(dictId,"测试卡类别编码",(startIndex + i),testCardTypeEnum));
                
                Object operatorEnumId = row.get("operatorEnumId");//运营商编码
                msg.append(valiEnum(operatorEnumId,"运营商编码",(startIndex + i),operatorEnum));
                
                Object cardNetworkTypeEnumId = row.get("cardNetworkTypeEnumId");//网络类型编码
                msg.append(valiEnum(cardNetworkTypeEnumId,"网络类型编码",(startIndex + i),cardNetworkTypeEnum));
                
                Object attributionCountryEnumId = row.get("attributionCountryEnumId");//归属国家编码
                msg.append(valiEnum(attributionCountryEnumId,"归属国家编码",(startIndex + i),attributionCountryEnum));
                
                Object attributionProvinceName = row.get("attributionProvinceName");//归属省份名称
                String attributionProvinceNameMsg = isNullOrgName(attributionProvinceName,"归属省分公司名称",(startIndex + i));
                Object attributionCityName = row.get("attributionCityName");//归属地市
                String attributionCityNameMsg = isNullOrgName(attributionCityName,"归属地市公司名称",(startIndex + i));
                Integer attributionProvinceId = null;
                if("".equals(attributionProvinceNameMsg)){
                    
//                    int pageNum = 1;
//                    int pageSize = 2;
//                    String sortColumn = null;
//                    SortDirectionEnum sortDirection =null;
//                    Map<String, String> params = new HashMap<String, String>();
//                    params.put("orgName", attributionProvinceName.toString());
//                    
//                    Pagination list =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                    OrgEntity re = (OrgEntity)list.getResult().get(0);
//                    attributionProvinceId = re.getCloudOrgId();
                    attributionProvinceId = getCloudIdFromName(attributionProvinceName.toString());
                    
                    if("".equals(attributionCityNameMsg)){
                        
//                        params.put("orgName", attributionCityName.toString());
//                        
//                        Pagination list2 =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                        OrgEntity re2 = (OrgEntity)list2.getResult().get(0);
                        
//                      citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市
                        citys = getCityValueList(attributionProvinceId);//归属省份下所有地市

//                        Object attributionCityId = row.get("attributionCityId");//归属地市编码
//                        Object attributionCityId = re2.getCloudOrgId();
                        Object attributionCityId = getCloudIdFromName(attributionCityName.toString());
//                        msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                        msg.append(valiCityFromName(attributionCityId,"归属地市公司名称",(startIndex + i),citys,row.get("attributionProvinceName").toString(),attributionCityName));
                    }
                    
                }else{
                    msg.append(attributionProvinceNameMsg);
                }
                
                msg.append(attributionCityNameMsg);
                

			//	Object wareManId = getCloudUserId(JsonUtil.getString(param, "wareManId"));
              //  Object wareManId = row.get("wareManId");//入库人编码
                Object wareMan = row.get("wareManId");
                if(isNullUserId(wareMan,"入库人账号",(startIndex + i)).equals("")){
                	Object wareManId = getCloudUserId((String) wareMan);
                    msg.append(isNullAndNumber(wareManId,"入库人账号",(startIndex + i)));
                }else{
                	msg.append(isNullUserId(wareMan,"入库人账号",(startIndex + i)));
                }
//                Object storageCityId = row.get("storageCityId");//存放地市编码
//                msg.append(isNullAndNumber(storageCityId,"存放地市编码",(startIndex + i)));
                Object storageCityId = new Object();
                Object storageCityName = row.get("storageCityName");//存放地市
                String storageCityNameMsg = isNullOrgName(storageCityName,"存放地市",(startIndex + i));
                if(!"".equals(storageCityNameMsg)){
                    msg.append(storageCityNameMsg);
                }else{
//                    System.out.println("=========storageCityName============"+storageCityName+"============"+(storageCityName!=null)+"=="+(!"".equals(storageCityName))+"=="+(!"null".equals(storageCityName)));
                    if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
//                	if(!CommonUtils.isEmpty(storageCityName)){
                		 storageCityId = getCloudIdFromName(storageCityName.toString());
                	}
                   
                }
//                msg.append(isNullOrgName(storageCityName,"存放地市",(startIndex + i)));
                
//                Object storageDepartmentId = row.get("storageDepartmentId");//存放部门编码
//                msg.append(isNullAndNumber(storageDepartmentId,"存放部门编码",(startIndex + i)));
                Object storageDepartmentId = new Object();
                Object storageDepartmentName = row.get("storageDepartmentName");//存放部门
                String storageDepartmentNameMsg = isNullOrgName(storageDepartmentName,"存放部门",(startIndex + i));
                if(!"".equals(storageDepartmentNameMsg)){
                    msg.append(storageDepartmentNameMsg);
                }else{
                    storageDepartmentId = getCloudIdFromName(storageDepartmentName.toString());
                }
                
                if("".equals(storageCityNameMsg)&&"".equals(storageDepartmentNameMsg)){
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 msg.append(areFamily(storageCityId,storageDepartmentId,storageCityName,storageDepartmentName,(startIndex + i)));//判断存放地市与存放部门的关系
                	}
                   
                }
                
                Object whetherPrepaid = row.get("whetherPrepaid");//是否预付费
                msg.append(valiEnum(whetherPrepaid,"是否预付费",(startIndex + i),whetherPrepaidLi));
                
                Object admin = row.get("adminId");
                if(isNullUserId(admin,"管理员账号",(startIndex + i)).equals("")){
                    if("".equals(storageDepartmentNameMsg)){//存放部门验证通过才进行部门与人员的关系验证                        Object adminId = getCloudUserId((String) admin);
                        msg.append(valiAdminFromName(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()),storageDepartmentName,admin));
                    }
                }else{
                	msg.append(isNullUserId(admin,"管理员账号",(startIndex + i)));
                }
              //  Object adminId = row.get("adminId");//管理员编码            //验证管理员账号和入库人账号是否一致,一致可以导入,不一致不能导入
             //   msg.append(isSameAccount(wareMan,admin,(startIndex + i)));
                Object cardNo = row.get("cardNo");//卡号
                cardNo = removeThePointZero(cardNo);
                row.put("cardNo", cardNo);
                msg.append(valiUnique(cardNo,"卡号",(startIndex + i)));
                
                Object imsi = row.get("imsi");//imsi
                imsi = removeThePointZero(imsi);
                row.put("imsi", imsi);
                msg.append(valiUnique(imsi,"imsi",(startIndex + i)));
                
                Object subscriberNumber = row.get("subscriberNumber");//用户号码
                subscriberNumber = removeThePointZero(subscriberNumber);
                row.put("subscriberNumber", subscriberNumber);
                msg.append(isNullAndNumber(subscriberNumber,"用户号码",(startIndex + i)));
                
                Object number = row.get("number");//编号
                number = removeThePointZero(number);
                row.put("number", number);
                msg.append(valiUnique(number,"编号",(startIndex + i)));
                
                Object testcardStatusEnumId = row.get("testcardStatusEnumId");//测试卡状态编码
                msg.append(valiEnum(testcardStatusEnumId,"测试卡状态编码",(startIndex + i),testcardStatusEnum));
                
                Object balance = row.get("balance");//余额
                msg.append(isNullAndNumber(balance,"余额",(startIndex + i)));
                
                Object effectiveDate = row.get("effectiveDate");//生效日期
                Object cancelDate = row.get("cancelDate");//失效日期
                msg.append(valiTwoDate(effectiveDate,cancelDate,(startIndex + i)));
                
                if(!"".equals(msg.toString())){
                    msg.append("<BR>");
                    msgSB.append(msg.toString());
                }
                
                data.set(i, row);
            }
            
            for(int i=0;i<data.size(); i++){//验证两行之间值是否相同
                Map<String, Object> row = data.get(i);
                
                Object cardNo = row.get("cardNo");//卡号
                
                Object imsi = row.get("imsi");//imsi
                
                Object number = row.get("number");//编号
                
                for(int j=i+1;j<data.size(); j++){
                    Map<String, Object> row2 = data.get(j);
                    
                    Object cardNo2 = row2.get("cardNo");//卡号
                    
                    Object imsi2 = row2.get("imsi");//imsi
                    
                    Object number2 = row2.get("number");//编号
                    StringBuffer msg = new StringBuffer("");
                    msg.append(areSame(cardNo,cardNo2,(startIndex + i),(startIndex + j),"卡号"));
                    msg.append(areSame(imsi,imsi2,(startIndex + i),(startIndex + j),"imsi"));
                    msg.append(areSame(number,number2,(startIndex + i),(startIndex + j),"编号"));
                    
                    if(!"".equals(msg.toString())){
                        msg.append("<BR>");
                        msgSB.append(msg.toString());
                    }
                }
            }
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
            List citys = new ArrayList();//getCityValueList(JsonUtil.getInt(param, "attributionProvinceId"));//归属省份
            List testcardStatusEnum = getEnumValueList("TESTCARD_STATUS");//测试卡状态编码
            List moblieTypeEnum = getEnumValueList("MOBILE_TYPE");//手机类型编码
            
            for (int i = 0; i < data.size(); i++) {
                Map<String, Object> row = data.get(i);
                StringBuffer msg = new StringBuffer();
                
//                citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市//
//                Object attributionCityId = row.get("attributionCityId");//归属地市编码
//                msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                
                Object attributionProvinceName = row.get("attributionProvinceName");//归属省份名称
                String attributionProvinceNameMsg = isNullOrgName(attributionProvinceName,"归属省分公司名称",(startIndex + i));
                Object attributionCityName = row.get("attributionCityName");//归属地市
                String attributionCityNameMsg = isNullOrgName(attributionCityName,"归属地市公司名称",(startIndex + i));
                Integer attributionProvinceId = null;
                if("".equals(attributionProvinceNameMsg)){
                    
//                    int pageNum = 1;
//                    int pageSize = 2;
//                    String sortColumn = null;
//                    SortDirectionEnum sortDirection =null;
//                    Map<String, String> params = new HashMap<String, String>();
//                    params.put("orgName", attributionProvinceName.toString());
//                    
//                    Pagination list =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                    OrgEntity re = (OrgEntity)list.getResult().get(0);
                    attributionProvinceId = getCloudIdFromName(attributionProvinceName.toString());//re.getCloudOrgId();
                    
                    if("".equals(attributionCityNameMsg)){
                        
//                        params.put("orgName", attributionCityName.toString());
//                        
//                        Pagination list2 =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                        OrgEntity re2 = (OrgEntity)list2.getResult().get(0);
                        
//                      citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市
                        citys = getCityValueList(attributionProvinceId);//归属省份下所有地市

//                        Object attributionCityId = row.get("attributionCityId");//归属地市编码
                        Object attributionCityId = getCloudIdFromName(attributionCityName.toString());//re2.getCloudOrgId();
//                        msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                        msg.append(valiCityFromName(attributionCityId,"归属地市公司名称",(startIndex + i),citys,row.get("attributionProvinceName").toString(),attributionCityName));
                    }
                    
                }else{
                    msg.append(attributionProvinceNameMsg);
                }
                
                msg.append(attributionCityNameMsg);
                
                Object testcardStatusEnumId = row.get("testcardStatusEnumId");//测试终端状态编码
                msg.append(valiEnum(testcardStatusEnumId,"测试终端状态编码",(startIndex + i),testcardStatusEnum));
               /* Object wareManId = row.get("wareManId");//入库人编码
                msg.append(isNullAndNumber(wareManId,"入库人编码",(startIndex + i)));*/
                Object wareMan = row.get("wareManId");
                if(isNullUserId(wareMan,"入库人账号",(startIndex + i)).equals("")){
                	Object wareManId = getCloudUserId((String) wareMan);
                    msg.append(isNullAndNumber(wareManId,"入库人账号",(startIndex + i)));
                }else{
                	msg.append(isNullUserId(wareMan,"入库人账号",(startIndex + i)));
                }
//                Object storageCityId = row.get("storageCityId");//存放地市编码
//                msg.append(isNullAndNumber(storageCityId,"存放地市编码",(startIndex + i)));
                Object storageCityId = new Object();
                Object storageCityName = row.get("storageCityName");//存放地市
                String storageCityNameMsg = isNullOrgName(storageCityName,"存放地市",(startIndex + i));
                if(!"".equals(storageCityNameMsg)){
                    msg.append(storageCityNameMsg);
                }else{
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 storageCityId = getCloudIdFromName(storageCityName.toString());
                	}
                   
                }
//                Object storageDepartmentId = row.get("storageDepartmentId");//存放部门编码
//                msg.append(isNullAndNumber(storageDepartmentId,"存放部门编码",(startIndex + i)));
                Object storageDepartmentId = new Object();
                Object storageDepartmentName = row.get("storageDepartmentName");//存放部门
                String storageDepartmentNameMsg = isNullOrgName(storageDepartmentName,"存放部门",(startIndex + i));
                if(!"".equals(storageDepartmentNameMsg)){
                    msg.append(storageDepartmentNameMsg);
                }else{
                    storageDepartmentId = getCloudIdFromName(storageDepartmentName.toString());
                }
                if("".equals(storageCityNameMsg)&&"".equals(storageDepartmentNameMsg)){
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 msg.append(areFamily(storageCityId,storageDepartmentId,storageCityName,storageDepartmentName,(startIndex + i)));//判断存放地市与存放部门的关系
                	}
                   
                }
                
                /*Object adminId = row.get("adminId");//管理员编码
                msg.append(valiAdmin(adminId,"管理员编码",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()) ));*/
                Object admin = row.get("adminId");
                if(isNullUserId(admin,"管理员账号",(startIndex + i)).equals("")){
                    if("".equals(storageDepartmentNameMsg)){//存放部门验证通过才进行部门与人员的关系验证
                    	Object adminId = getCloudUserId((String) admin);
//                    	msg.append(valiAdmin(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString())));
                    	msg.append(valiAdminFromName(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()),storageDepartmentName,admin));
                    }
                }else{
                	msg.append(isNullUserId(admin,"管理员账号",(startIndex + i)));
                }
            //    msg.append(isSameAccount(wareMan,admin,(startIndex + i)));
                Object moblieTypeEnumId = row.get("moblieTypeEnumId");//手机类型编码
                msg.append(valiEnum(moblieTypeEnumId,"手机类型编码",(startIndex + i),moblieTypeEnum));
                Object manufacturerName = row.get("manufacturerName");//厂家
                msg.append(isNullReturnNotNull(manufacturerName,"厂家",(startIndex + i)));
                Object phoneModel = row.get("phoneModel");//手机型号
                phoneModel = removeThePointZero(phoneModel);
                row.put("phoneModel", phoneModel);
                msg.append(isNullReturnNotNull(phoneModel,"手机型号",(startIndex + i)));
                Object imei = row.get("imei");//手机串号
                imei = removeThePointZero(imei);
                row.put("imei", imei);
                msg.append(valiUnique(imei,"手机串号",(startIndex + i)));
                Object number = row.get("number");//编号
                number = removeThePointZero(number);
                row.put("number", number);
                msg.append(valiUnique(number,"终端编号",(startIndex + i)));
                Object effectiveDate = row.get("effectiveDate");//生效日期
                Object cancelDate = row.get("cancelDate");//失效日期
                msg.append(valiTwoDate(effectiveDate,cancelDate,(startIndex + i)));
                
                if(!"".equals(msg.toString())){
                    msg.append("<BR>");
                    msgSB.append(msg.toString());
                }
                
                data.set(i,row);
            }
            
            for(int i=0;i<data.size(); i++){
                Map<String, Object> row = data.get(i);
                
                Object imei = row.get("imei");//手机串号
                
                Object number = row.get("number");//编号
                
                for(int j=i+1;j<data.size(); j++){
                    Map<String, Object> row2 = data.get(j);
                    
                    Object imei2 = row2.get("imei");//手机串号
                    
                    Object number2 = row2.get("number");//编号
                    StringBuffer msg = new StringBuffer();
                    msg.append(areSame(imei,imei2,(startIndex + i),(startIndex + j),"手机串号"));
                    msg.append(areSame(number,number2,(startIndex + i),(startIndex + j),"终端编号"));
                    
                    if(!"".equals(msg.toString())){
                        msg.append("<BR>");
                        msgSB.append(msg.toString());
                    }
                }
            }
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
            List citys = new ArrayList();//getCityValueList(JsonUtil.getInt(param, "attributionProvinceId"));//归属省份
            List testcardStatusEnum = getEnumValueList("TESTCARD_STATUS");//测试卡状态编码
            List fixedPhoneTypeEnum = getEnumValueList("FIXED_PHONE_TYPE");//类型编码
            for (int i = 0; i < data.size(); i++) {
                Map<String, Object> row = data.get(i);
                StringBuffer msg = new StringBuffer();
                
//                citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市//
//                Object attributionCityId = row.get("attributionCityId");//归属地市编码
//                msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                
                Object attributionProvinceName = row.get("attributionProvinceName");//归属省份名称
                String attributionProvinceNameMsg = isNullOrgName(attributionProvinceName,"归属省分公司名称",(startIndex + i));
                Object attributionCityName = row.get("attributionCityName");//归属地市
                String attributionCityNameMsg = isNullOrgName(attributionCityName,"归属地市公司名称",(startIndex + i));
                Integer attributionProvinceId = null;
                if("".equals(attributionProvinceNameMsg)){
                    
//                    int pageNum = 1;
//                    int pageSize = 2;
//                    String sortColumn = null;
//                    SortDirectionEnum sortDirection =null;
//                    Map<String, String> params = new HashMap<String, String>();
//                    params.put("orgName", attributionProvinceName.toString());
//                    
//                    Pagination list =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                    OrgEntity re = (OrgEntity)list.getResult().get(0);
                    attributionProvinceId = getCloudIdFromName(attributionProvinceName.toString());//re.getCloudOrgId();
                    
                    if("".equals(attributionCityNameMsg)){
                        
//                        params.put("orgName", attributionCityName.toString());
//                        
//                        Pagination list2 =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                        OrgEntity re2 = (OrgEntity)list2.getResult().get(0);
                        
//                      citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市
                        citys = getCityValueList(attributionProvinceId);//归属省份下所有地市

//                        Object attributionCityId = row.get("attributionCityId");//归属地市编码
                        Object attributionCityId = getCloudIdFromName(attributionCityName.toString());//re2.getCloudOrgId();
//                        msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                        msg.append(valiCityFromName(attributionCityId,"归属地市公司名称",(startIndex + i),citys,row.get("attributionProvinceName").toString(),attributionCityName));
                    }
                    
                }else{
                    msg.append(attributionProvinceNameMsg);
                }
                
                msg.append(attributionCityNameMsg);
                
                Object testcardStatusEnumId = row.get("testcardStatusEnumId");//固定电话状态编码
                msg.append(valiEnum(testcardStatusEnumId,"固定电话状态编码",(startIndex + i),testcardStatusEnum));
                
                /*Object wareManId = row.get("wareManId");//入库人编码
                msg.append(isNullAndNumber(wareManId,"入库人编码",(startIndex + i)));*/
                Object wareMan = row.get("wareManId");
                if(isNullUserId(wareMan,"入库人账号",(startIndex + i)).equals("")){
                	Object wareManId = getCloudUserId((String) wareMan);
                    msg.append(isNullAndNumber(wareManId,"入库人账号",(startIndex + i)));
                }else{
                	msg.append(isNullUserId(wareMan,"入库人账号",(startIndex + i)));
                }
                
//                Object storageCityId = row.get("storageCityId");//存放地市编码
//                msg.append(isNullAndNumber(storageCityId,"存放地市编码",(startIndex + i)));
                Object storageCityId = new Object();
                Object storageCityName = row.get("storageCityName");//存放地市
                String storageCityNameMsg = isNullOrgName(storageCityName,"存放地市",(startIndex + i));
                if(!"".equals(storageCityNameMsg)){
                    msg.append(storageCityNameMsg);
                }else{
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 storageCityId = getCloudIdFromName(storageCityName.toString());
                	}
                   
                }
                
//                Object storageDepartmentId = row.get("storageDepartmentId");//存放部门编码
//                msg.append(isNullAndNumber(storageDepartmentId,"存放部门编码",(startIndex + i)));
                Object storageDepartmentId = new Object();
                Object storageDepartmentName = row.get("storageDepartmentName");//存放部门
                String storageDepartmentNameMsg = isNullOrgName(storageDepartmentName,"存放部门",(startIndex + i));
                if(!"".equals(storageDepartmentNameMsg)){
                    msg.append(storageDepartmentNameMsg);
                }else{
                    storageDepartmentId = getCloudIdFromName(storageDepartmentName.toString());
                }
                if("".equals(storageCityNameMsg)&&"".equals(storageDepartmentNameMsg)){
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 msg.append(areFamily(storageCityId,storageDepartmentId,storageCityName,storageDepartmentName,(startIndex + i)));//判断存放地市与存放部门的关系
                	}
                   
                }
               
                
                /*Object adminId = row.get("adminId");//管理员编码
                msg.append(valiAdmin(adminId,"管理员编码",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()) ));*/
                Object admin = row.get("adminId");
                if(isNullUserId(admin,"管理员账号",(startIndex + i)).equals("")){
                    if("".equals(storageDepartmentNameMsg)){//存放部门验证通过才进行部门与人员的关系验证
                    	Object adminId = getCloudUserId((String) admin);
//                    	msg.append(valiAdmin(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()) ));
                    	msg.append(valiAdminFromName(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()),storageDepartmentName,admin));
                    }
                }else{
                	msg.append(isNullUserId(admin,"管理员账号",(startIndex + i)));
                }
            //    msg.append(isSameAccount(wareMan,admin,(startIndex + i)));
                Object phoneNumber = row.get("phoneNumber");//电话号码
                phoneNumber = removeThePointZero(phoneNumber);
                row.put("phoneNumber", phoneNumber);
                msg.append(valiUnique(phoneNumber,"电话号码",(startIndex + i)));
                
                Object fixedPhoneTypeEnumId = row.get("fixedPhoneTypeEnumId");//类型编码
                msg.append(valiEnum(fixedPhoneTypeEnumId,"类型编码",(startIndex + i),fixedPhoneTypeEnum));
                
                Object teleFunction = row.get("teleFunction");//功能
                msg.append(isNullReturnNotNull(teleFunction,"功能",(startIndex + i)));
                
                Object number = row.get("number");//编号
                number = removeThePointZero(number);
                row.put("number", number);
                msg.append(valiUnique(number,"固定电话编号",(startIndex + i)));
                
                Object effectiveDate = row.get("effectiveDate");//生效日期
                Object cancelDate = row.get("cancelDate");//失效日期
                msg.append(valiTwoDate(effectiveDate,cancelDate,(startIndex + i)));
                
                if(!"".equals(msg.toString())){
                    msg.append("<BR>");
                    msgSB.append(msg.toString());
                }
                
                data.set(i,row);
            }
            
            for(int i=0;i<data.size(); i++){
                Map<String, Object> row = data.get(i);
                
                Object phoneNumber = row.get("phoneNumber");//电话号码
                
                Object number = row.get("number");//编号
                
                for(int j=i+1;j<data.size(); j++){
                    Map<String, Object> row2 = data.get(j);
                    
                    Object phoneNumber2 = row2.get("phoneNumber");//手机串号
                    
                    Object number2 = row2.get("number");//编号
                    StringBuffer msg = new StringBuffer();
                    msg.append(areSame(phoneNumber,phoneNumber2,(startIndex + i),(startIndex + j),"电话号码"));
                    msg.append(areSame(number,number2,(startIndex + i),(startIndex + j),"固定电话编号"));
                    
                    if(!"".equals(msg.toString())){
                        msg.append("<BR>");
                        msgSB.append(msg.toString());
                    }
                }
            }
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
            List citys = new ArrayList();//getCityValueList(JsonUtil.getInt(param, "attributionProvinceId"));//归属省份
            List testcardStatusEnum = getEnumValueList("TESTCARD_STATUS");//测试卡状态编码
            List parValueLi = new ArrayList();//面值
            parValueLi.add((int)1);
            parValueLi.add((int)2);
            parValueLi.add((int)3);
            List rechCardTypeEnum = getEnumValueList("RECH_CARD_TYPE");//卡类型编码
            for (int i = 0; i < data.size(); i++) {
                Map<String, Object> row = data.get(i);
                StringBuffer msg = new StringBuffer();
                
//                citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市//
//                Object attributionCityId = row.get("attributionCityId");//归属地市编码
//                msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                
                Object attributionProvinceName = row.get("attributionProvinceName");//归属省份名称
                String attributionProvinceNameMsg = isNullOrgName(attributionProvinceName,"归属省分公司名称",(startIndex + i));
                Object attributionCityName = row.get("attributionCityName");//归属地市
                String attributionCityNameMsg = isNullOrgName(attributionCityName,"归属地市公司名称",(startIndex + i));
                Integer attributionProvinceId = null;
                if("".equals(attributionProvinceNameMsg)){
                    
//                    int pageNum = 1;
//                    int pageSize = 2;
//                    String sortColumn = null;
//                    SortDirectionEnum sortDirection =null;
//                    Map<String, String> params = new HashMap<String, String>();
//                    params.put("orgName", attributionProvinceName.toString());
//                    
//                    Pagination list =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                    OrgEntity re = (OrgEntity)list.getResult().get(0);
                    attributionProvinceId = getCloudIdFromName(attributionProvinceName.toString());//re.getCloudOrgId();
                    
                    if("".equals(attributionCityNameMsg)){
                        
//                        params.put("orgName", attributionCityName.toString());
//                        
//                        Pagination list2 =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
//                        OrgEntity re2 = (OrgEntity)list2.getResult().get(0);
                        
//                      citys = getCityValueList(Integer.parseInt(row.get("attributionProvinceId").toString()));//归属省份下所有地市
                        citys = getCityValueList(attributionProvinceId);//归属省份下所有地市

//                        Object attributionCityId = row.get("attributionCityId");//归属地市编码
                        Object attributionCityId = getCloudIdFromName(attributionCityName.toString());//re2.getCloudOrgId();
//                        msg.append(valiCity(attributionCityId,"归属地市编码",(startIndex + i),citys,row.get("attributionProvinceName").toString()));
                        msg.append(valiCityFromName(attributionCityId,"归属地市公司名称",(startIndex + i),citys,row.get("attributionProvinceName").toString(),attributionCityName));
                    }
                    
                }else{
                    msg.append(attributionProvinceNameMsg);
                }
                
                msg.append(attributionCityNameMsg);
                
                Object testcardStatusEnumId = row.get("testcardStatusEnumId");//充值卡状态编码
                msg.append(valiEnum(testcardStatusEnumId,"充值卡状态编码",(startIndex + i),testcardStatusEnum));
                
                /*Object wareManId = row.get("wareManId");//入库人编码
                msg.append(isNullAndNumber(wareManId,"入库人编码",(startIndex + i)));*/
                Object wareMan = row.get("wareManId");
                if(isNullUserId(wareMan,"入库人账号",(startIndex + i)).equals("")){
                	Object wareManId = getCloudUserId((String) wareMan);
                    msg.append(isNullAndNumber(wareManId,"入库人账号",(startIndex + i)));
                }else{
                	msg.append(isNullUserId(wareMan,"入库人账号",(startIndex + i)));
                }
                
//                Object storageCityId = row.get("storageCityId");//存放地市编码
//                msg.append(isNullAndNumber(storageCityId,"存放地市编码",(startIndex + i)));
                Object storageCityId = new Object();
                Object storageCityName = row.get("storageCityName");//存放地市
                String storageCityNameMsg = isNullOrgName(storageCityName,"存放地市",(startIndex + i));
                if(!"".equals(storageCityNameMsg)){
                    msg.append(storageCityNameMsg);
                }else{
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 storageCityId = getCloudIdFromName(storageCityName.toString());
                	}
                   
                }
//                Object storageDepartmentId = row.get("storageDepartmentId");//存放部门编码
//                msg.append(isNullAndNumber(storageDepartmentId,"存放部门编码",(startIndex + i)));
                Object storageDepartmentId = new Object();
                Object storageDepartmentName = row.get("storageDepartmentName");//存放部门
                String storageDepartmentNameMsg = isNullOrgName(storageDepartmentName,"存放部门",(startIndex + i));
                if(!"".equals(storageDepartmentNameMsg)){
                    msg.append(storageDepartmentNameMsg);
                }else{
                    storageDepartmentId = getCloudIdFromName(storageDepartmentName.toString());
                }
                if("".equals(storageCityNameMsg)&&"".equals(storageDepartmentNameMsg)){
                	if(storageCityName!=null&&!"".equals(storageCityName)&&!"null".equals(storageCityName)){
                		 msg.append(areFamily(storageCityId,storageDepartmentId,storageCityName,storageDepartmentName,(startIndex + i)));//判断存放地市与存放部门的关系
                	}
                   
                }
                
                /*Object adminId = row.get("adminId");//管理员编码
                msg.append(valiAdmin(adminId,"管理员编码",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()) ));*/
                Object admin = row.get("adminId");
                if(isNullUserId(admin,"管理员账号",(startIndex + i)).equals("")){
                    if("".equals(storageDepartmentNameMsg)){//存放部门验证通过才进行部门与人员的关系验证
                    	Object adminId = getCloudUserId((String) admin);
//                    	msg.append(valiAdmin(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()) ));
                    	msg.append(valiAdminFromName(adminId,"管理员账号",(startIndex + i),Integer.parseInt(storageDepartmentId.toString()),storageDepartmentName,admin));
                    }
                }else{
                	msg.append(isNullUserId(admin,"管理员账号",(startIndex + i)));
                }
            //    msg.append(isSameAccount(wareMan,admin,(startIndex + i)));
                Object cardNo = row.get("cardNo");//卡号
                cardNo = removeThePointZero(cardNo);
                row.put("cardNo", cardNo);
                msg.append(valiUnique(cardNo,"充值卡卡号",(startIndex + i)));
                
                Object parValue = row.get("parValue");//面值
                msg.append(valiEnum(parValue,"面值",(startIndex + i),parValueLi));
                
                Object cardNumber = row.get("cardNumber");//编号
                cardNumber = removeThePointZero(cardNumber);
                row.put("cardNumber", cardNumber);
                msg.append(valiUnique(cardNumber,"充值卡编号",(startIndex + i)));
                
                Object rechCardTypeEnumId = row.get("rechCardTypeEnumId");//卡类型编码
                msg.append(valiEnum(rechCardTypeEnumId,"卡类型编码",(startIndex + i),rechCardTypeEnum));
                
                Object effectiveDate = row.get("effectiveDate");//生效日期
                Object cancelDate = row.get("cancelDate");//失效日期
                msg.append(valiTwoDate(effectiveDate,cancelDate,(startIndex + i)));
                
                if(!"".equals(msg.toString())){
                    msg.append("<BR>");
                    msgSB.append(msg.toString());
                }
                
                data.set(i,row);
            }
            
            for(int i=0;i<data.size(); i++){
                Map<String, Object> row = data.get(i);
                
                Object cardNo = row.get("cardNo");//卡号
                
                Object cardNumber = row.get("cardNumber");//编号
                
                for(int j=i+1;j<data.size(); j++){
                    Map<String, Object> row2 = data.get(j);
                    
                    Object cardNo2 = row2.get("cardNo");//卡号
                    
                    Object cardNumber2 = row2.get("cardNumber");//编号
                    StringBuffer msg = new StringBuffer();
                    msg.append(areSame(cardNo,cardNo2,(startIndex + i),(startIndex + j),"卡号"));
                    msg.append(areSame(cardNumber,cardNumber2,(startIndex + i),(startIndex + j),"充值卡编号"));
                    
                    if(!"".equals(msg.toString())){
                        msg.append("<BR>");
                        msgSB.append(msg.toString());
                    }
                }
            }
        }
        }catch(Exception e){
            e.printStackTrace();
            return "请检查导入模板是否正确！";
        }
        
        if(msgSB.toString().length()>200){
            return msgSB.toString().replaceAll("<BR>", "\n");
        }else{
            return msgSB.toString();
        }
        
    }
    

	private Object areFamily(Object storageCityId, Object storageDepartmentId, Object storageCityName, Object storageDepartmentName, int rowNum1) {
//	    System.out.println("==========================="+storageCityId.toString()+"==========="+storageDepartmentId.toString());
        if(storageDepartmentId.toString().indexOf(storageCityId.toString())==-1){
            return "第" + rowNum1 + "行:存放部门:"+storageDepartmentName.toString()+"不属于存放地市:"+storageCityName.toString()+";";
        }
        return "";
    }

    private Object removeThePointZero(Object oo){//去掉.0 因为excel里为纯数字时，读出来toString时会加上.0
    	if(CommonUtils.isEmpty(oo)){
    		return oo;
    	}else{
    		if(oo.toString().lastIndexOf(".0")!=-1){
                oo = oo.toString().substring(0, oo.toString().lastIndexOf(".0"));
            }
    		return oo;
    	}
    }
    
    private String areSame(Object o1,Object o2,int rowNum1,int rowNum2,String name) {
        if(o1==null||o2==null){
            return "";
        }
        if(o1.toString().equals(o2.toString())){
            return "第" + rowNum1 + "行:"+o1.toString()+"和第"+rowNum2+"行:"+o2.toString()+"的"+name+"重复;";
        }else{
            return "";
        }
    }
    
    private String valiTwoDate(Object effectiveDate,Object cancelDate,int rowNum) {
        String msg = "";
        if (isNull(effectiveDate,"生效日期",rowNum)==null) {
        }else{
            msg = msg+isNull(effectiveDate,"生效日期",rowNum);
        }
        if (isNull(cancelDate,"失效日期",rowNum)==null) {
        }else{
            msg = msg+isNull(cancelDate,"失效日期",rowNum);
        }
        
        if(msg.equals("")){
            
            DateFormat df=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date effectiveDated=null;
            Date cancelDated=null;
                try {
                    effectiveDated = df.parse( effectiveDate.toString());
//                    if(effectiveDated.before(new Date())){
//                        msg = msg+"第" + rowNum + "行,生效日期:"+effectiveDate.toString()+"不能早于当前时间;";
//                    }
                } catch (ParseException e) {
                    msg = msg+"第" + rowNum + "行,生效日期:"+effectiveDate.toString()+"格式不正确,正确格式为:2013-6-9 00:00:00;";
                }
                try {
                    cancelDated = df.parse( cancelDate.toString());
                    if(cancelDated.before(new Date())){
                        msg = msg+"第" + rowNum + "行,失效日期:"+cancelDate.toString()+"不能早于当前时间;";
                    }
                } catch (ParseException e) {
                    msg = msg+"第" + rowNum + "行,失效日期:"+cancelDate.toString()+"格式不正确,正确格式为:2013-6-9 00:00:00;";
                }
                
                if(msg.equals("")){
                    if(effectiveDated.after(cancelDated)){
                        msg = msg+"第" + rowNum + "行,失效日期:"+cancelDate.toString()+"不能早于生效日期:"+effectiveDate.toString()+";";
                    }
                }
            
        }
        
        return msg;
    }
    /*
     * 验证用户账号是否为空
     */
    	private String isNullUserId(Object o, String name, int rowNum) {
    		String msg = "";
    		UserEntity userEntity = null;
    		if(CommonUtils.isEmpty(o)){
    			msg = "第" + rowNum + "行,"+name+"不能为空;";
    		}else{
			try {
				userEntity = aaaa.findUserByPortalAccountId((String) o);
				if(CommonUtils.isEmpty(userEntity)){
					msg =  "第" + rowNum + "行,"+name+":"+o.toString()+"所查询的用户不存在;";
	    		}
			} catch (PaasAAAAException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    		}
    		
    		return msg;
    	}
    	/**
    	 * 验证入库人跟管理员是否一致
    	 */
    	private String isSameAccount(Object wareMan,Object admin,int rowNum){
    		String msg = "";
    		if(!CommonUtils.isEmpty(wareMan)&&!CommonUtils.isEmpty(admin)){
    			if(!wareMan.toString().equals(admin.toString())){
    				msg = "第"+rowNum+"行,"+"入库人账号"+wareMan+"与"+"管理员账号"+admin+"不一致,请核查;";
    			}
    			
    		}
    		return msg;
    	}
    	/**
    	/*
         * 验证组织名称是否为空
         */
            private String isNullOrgName(Object o, String name, int rowNum) {
                String msg = "";
                    if(CommonUtils.isEmpty(o)){
                    	if(name.equals("存放地市")){
                    		msg = "";
                    	}else{
                    		msg = "第" + rowNum + "行,"+name+"不能为空;";
                    	}
                        
                    }else{
                        try {
                            
                            if(MapUtils.getObject(goobleMap, o.toString())!=null&&!"".equals(MapUtils.getString(goobleMap, o.toString()))){//搜索goobleMap是否已有
//                                System.out.println("===============已找到========================"+o.toString());
                                return "";
                            }
                            
                            int pageNum = 1;
                            int pageSize = 2;
                            String sortColumn = null;
                            SortDirectionEnum sortDirection =null;
                            Map<String, String> params = new HashMap<String, String>();
                            params.put("orgName", o.toString());
                            
                            Pagination list =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);
                            if(list.getResult()==null||list.getResult().size()==0){//list.getResult().size()==0){
                                msg =  "第" + rowNum + "行,"+name+":"+o.toString()+"所查询的组织不存在;";
                            }else if(list.getResult()!=null&&list.getResult().size()!=1){
                                msg =  "第" + rowNum + "行,"+name+":"+o.toString()+"所查询的组织结果存在多个,建议手工新建该测试卡;";
                            }else if(list.getResult()!=null&&list.getResult().size()==1){
                                OrgEntity re = (OrgEntity)list.getResult().get(0);
                                Integer orgId = re.getCloudOrgId();
                                goobleMap.put(o.toString(),orgId);//加入goobleMap作为缓存
                            }
                        } catch (PaasAAAAException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                            msg =  "第" + rowNum + "行,"+name+":"+o.toString()+"所查询的组织不存在;";
                        } catch (PaasException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                            msg =  "第" + rowNum + "行,"+name+":"+o.toString()+"所查询的组织不存在;";
                        }
                    }
                return msg;
            }
    	
    private String valiUnique(Object o,String name,int rowNum) {
        if (isNull(o,name,rowNum)==null) {
            if(isUnique(o,name,rowNum)==null){
                return "";
            }else{
                return isUnique(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
    }

    private String isUnique(Object o,String name,int rowNum) {
        JSONObject jsonObj =  new JSONObject();
        if(name.equals("卡号")){
            try {
                jsonObj.put("cardNoEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryTestCardListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("imsi")){
            try {
                jsonObj.put("imsiEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryTestCardListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("编号")){
            try {
                jsonObj.put("numberEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryTestCardListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("手机串号")){
            try {
                jsonObj.put("imeiEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryTerminalListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("终端编号")){
            try {
                jsonObj.put("numberEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryTerminalListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("手机号码")){
            try {
                jsonObj.put("phoneNumberEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryImsListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("固定电话编号")){
            try {
                jsonObj.put("numberEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryImsListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("充值卡卡号")){
            try {
                jsonObj.put("cardNoEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryRechCardListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        if(name.equals("充值卡编号")){
            try {
                jsonObj.put("cardNumberEqual", o);
                List<Map<String, Object>> list = testCardRegService.qryRechCardListByParam(jsonObj);
                if(list.size()!=0){
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"已存在;";
                }
            } catch (Exception e) {
                return "第" + rowNum + "行,查询"+name+":"+o.toString()+"时出错:错误信息为"+e.getMessage()+";";
            }
        }
        return null;
    }
    
    private String isNullAndNumber(Object o,String name,int rowNum){
        if (isNull(o,name,rowNum)==null) {
            if(isNumber(o,name,rowNum)==null){
                return "";
            }else{
                return isNumber(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
        
    }

    private String valiAdmin(Object o,String name,int rowNum,int orgId){
        if (isNull(o,name,rowNum)==null) {
            if(isNumber(o,name,rowNum)==null){
                try {
                    if(!aaaa.checkUserIDAndOrgID(Integer.parseInt(o.toString()), orgId)){
                        return "第" + rowNum + "行,"+name+":"+o.toString()+"查询人员不存在该部门;";
                    }else{
                        return "";
                    }
                } catch (PaasAAAAException e) {
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"查询人员不存在该部门;";
                } catch (PaasException e) {
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"查询人员不存在该部门;";
                }
            }else{
                return isNumber(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
        
    }
    
    private String valiAdminFromName(Object o,String name,int rowNum,int orgId,Object depName,Object admin){
        if (isNull(o,name,rowNum)==null) {
            if(isNumber(o,name,rowNum)==null){
                try {
                    if(!aaaa.checkUserIDAndOrgID(Integer.parseInt(o.toString()), orgId)){
                        return "第" + rowNum + "行,"+name+":"+admin.toString()+"查询人员不存在该部门:"+depName+";";
                    }else{
                        return "";
                    }
                } catch (PaasAAAAException e) {
                    return "第" + rowNum + "行,"+name+":"+admin.toString()+"查询人员不存在该部门:"+depName+";";
                } catch (PaasException e) {
                    return "第" + rowNum + "行,"+name+":"+admin.toString()+"查询人员不存在该部门:"+depName+";";
                }
            }else{
                return isNumber(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
        
    }
    
    private String valiCity(Object o,String name,int rowNum,List li,String provinceName) {
        if (isNull(o,name,rowNum)==null) {
            if(isNumber(o,name,rowNum)==null){
                if (!li.contains((int)Double.parseDouble(o.toString()))) {
                    return "第" + rowNum + "行,"+name+":"+o.toString()+"不属于对应的省:"+provinceName+";";
                }else{
                    return "";
                }
            }else{
                return isNumber(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
    }
    
    private String valiCityFromName(Object o,String name,int rowNum,List li,String provinceName,Object cityName) {
        if (isNull(o,name,rowNum)==null) {
            if(isNumber(o,name,rowNum)==null){
                if (!li.contains((int)Double.parseDouble(o.toString()))) {
                    return "第" + rowNum + "行,"+name+":"+cityName.toString()+"不属于对应的省:"+provinceName+";";
                }else{
                    return "";
                }
            }else{
                return isNumber(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
    }

    private String valiEnum(Object o,String name,int rowNum,List li){
        if (isNull(o,name,rowNum)==null) {
            if(isNumber(o,name,rowNum)==null){
                if(isInEnum(o,name,rowNum,li)==null){
                    return "";
                }else{
                    return isInEnum(o,name,rowNum,li);
                }
            }else{
                return isNumber(o,name,rowNum);
            }
        }else{
            return isNull(o,name,rowNum);
        }
    }
    
    private String isNull(Object o,String name,int rowNum){
        if (CommonUtils.isEmpty(o)) {
            return "第" + rowNum + "行,"+name+"不能为空;";
        }else{
            return null;
        }
    }
    
    private String isNullReturnNotNull(Object o,String name,int rowNum){
        if (CommonUtils.isEmpty(o)) {
            return "第" + rowNum + "行,"+name+"不能为空;";
        }else{
            return "";
        }
    }
    
    private String isNumber(Object o,String name,int rowNum){
                
        try{
            Double.parseDouble(o.toString());
//            Integer.parseInt(o.toString());
           }catch(NumberFormatException e){
               return "第" + rowNum + "行,"+name+":"+o.toString()+"必须为数值;";
           }
        return null;

        
//        if (CommonUtils.isNumeric(o)) {
//            return "第" + rowNum + "行,"+name+"必须为数值;";
//        }else{
//            return null;
//        }
    }
    
    private String isInEnum(Object o,String name,int rowNum,List li){
        if (!li.contains((int)Double.parseDouble(o.toString()))) {
            return "第" + rowNum + "行,"+name+":"+o.toString()+"不在枚举范围内;";
        }else{
            return null;
        }
    }
    
    private List getEnumValueList(String enumName){
        EnumType enumType = null;
        try {
            enumType = enumConfigService.getEnumType(enumName, null, 1);
        } catch (PaasException e1) {
        }
        List<EnumValue> enumValues = new ArrayList();
        List li = new ArrayList();
        if (!CommonUtils.isEmpty(enumType)) {
            enumValues = enumType.getEnumValues();
        }
        for(EnumValue e:enumValues){
            li.add(e.getEnumValueNum());
        }
        return li;
    }
    
    private List getCityValueList(int orgid){
        EnumType enumType = null;
        
        List<OrgEntity> ls = null;
        try {
            ls = aaaa.findOrgListByParentID(orgid);
        } catch (PaasAAAAException e) {
        }
        List li = new ArrayList();
        if (!CommonUtils.isEmpty(ls)) {
            for(OrgEntity o:ls){
                li.add(o.getCloudOrgId());
            }
        }
        
        return li;
    }
    private Integer getCloudUserId(String accountId){
    	Integer accountUserId = null;
        try {
		UserEntity userEntity = aaaa.findUserByPortalAccountId(accountId);
		AccountEntity accountEntity = userEntity.getAccount();
		 accountUserId = accountEntity.getCloudUserId();
		
		} catch (PaasAAAAException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return accountUserId;
    }
    
    private Integer getCloudIdFromName(String name){
        
        if(MapUtils.getObject(goobleMap, name)!=null&&!"".equals(MapUtils.getString(goobleMap, name))){//搜索goobleMap是否已有
//            System.out.println("===============已找到========================"+name);
            return MapUtils.getInteger(goobleMap, name);
        }
        
        int pageNum = 1;
        int pageSize = 2;
        String sortColumn = null;
        SortDirectionEnum sortDirection =null;
        Integer orgId = null;
        Map<String, String> params = new HashMap<String, String>();
        params.put("orgName", name);
        try {
            Pagination list =  aaaa.findOrgEntityByParams(params, pageNum, pageSize, sortColumn, sortDirection);//根据名称查出对象
            OrgEntity re = (OrgEntity)list.getResult().get(0);
            orgId = re.getCloudOrgId();
        } catch (PaasAAAAException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        } catch (PaasException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        goobleMap.put(name,orgId);//加入goobleMap作为缓存
        return orgId;
    }
}
