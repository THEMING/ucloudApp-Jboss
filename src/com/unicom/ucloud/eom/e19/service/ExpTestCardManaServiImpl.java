package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.unicom.ucloud.eom.base.service.ExportSimpleElsService;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.eom.e19.dao.ITestCardRegisterDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

@Service
public class ExpTestCardManaServiImpl extends ExportSimpleElsService{

    @Autowired
    private ITestCardRegisterDAO testCardRegisterDAO;
    @Autowired
    private ITciPriAttTemDetService tciPriAttTemDetService;
    @Autowired
    private ITciPriAttTemService tciPriAttTemService;
    @Autowired
    private ITciPriAttEnValService tciPriAttEnValService;
    
    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
        StringBuffer fields = new StringBuffer();
        StringBuffer columns = new StringBuffer();
        StringBuffer width = new StringBuffer();

        List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>() ;
        String title = "";
        String titleEn = "";
        
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&!"SELECTED".equals(JsonUtil.getString(param,"exportType"))){
            param.remove("selectIds");
        }
        
        Integer cardType = JsonUtil.getInt(param, "cardType");
        if(null != cardType && cardType.intValue() == ConstantUtil.TEST_CARD_ENUM){
            fields.append("number,").append("testobjectName,").append("testcardTypeEnumName,").append("attributionProvinceName,").append("attributionCityName,")
            .append("subscriberNumber,")
//            .append("testcardTypeEnumName,")
//            .append("operatorEnumName,")
//            .append("cardNetworkTypeEnumName,")
            .append("storageCityName,")
            .append("storageDepartmentName,")
            .append("adminName,")
            .append("testcardStatusEnumName,")
            .append("lendFlagName,")
            .append("lendDepartmentName,")
            .append("lenderName,")
            .append("lendTime,")
            .append("creationDate,")
            .append("planReturnTime,")
            .append("cancelDate");
            
            width.append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20");
            
            columns.append("测试卡编号,").append("测试卡类型,").append("测试卡类别,").append("归属省份,").append("归属地市,")
            .append("用户号码,")
//            .append("测试卡类别,")
//            .append("运营商,")
            .append("存放地市,")
            .append("存放部门,")
            .append("管理员,")
            .append("卡状态,")
            .append("是否借出,")
            .append("借用单位,")
            .append("借用人,")
            .append("借出时间,")
            .append("登记时间,")
            .append("预计归还时间,")
            .append("失效日期");
            dataList = testCardRegisterDAO.qryTestCardListByParam(param);
            title = "测试卡";
            titleEn = "测试卡sheet";
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
            fields.append("number,").append("testobjectName,").append("phoneNumber,").append("attributionProvinceName,").append("attributionCityName,")
            .append("fixedPhoneTypeEnumName,")
            .append("storageCityName,")
            .append("storageDepartmentName,")
            .append("adminName,")
            .append("testcardStatusEnumName,")
            .append("lendFlagName,")
            .append("lendDepartmentName,")
            .append("lenderName,")
            .append("lendTime,")
            .append("creationDate,")
            .append("planReturnTime,")
            .append("cancelDate");
            
            columns.append("编号,").append("测试卡类型,").append("电话号码,").append("归属省份,").append("归属地市,")
            .append("类型,")
            .append("存放地市,")
            .append("存放部门,")
            .append("管理员,")
            .append("固定电话状态,")
            .append("是否借出,")
            .append("借用单位,")
            .append("借用人,")
            .append("借出时间,")
            .append("登记时间,")
            .append("预计归还时间,")
            .append("失效日期");
            
            width.append("20,").append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20");
            
            dataList = testCardRegisterDAO.qryImsListByParam(param);
            title = "固定电话";
            titleEn = "固定电话sheet";
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
            fields.append("number,").append("testobjectName,").append("attributionProvinceName,").append("attributionCityName,")
            .append("moblieTypeEnumName,")
            .append("manufacturerName,")
            .append("phoneModel,")
            .append("storageCityName,")
            .append("storageDepartmentName,")
            .append("adminName,")
            .append("testcardStatusEnumName,")
            .append("lendFlagName,")
            .append("lendDepartmentName,")
            .append("lenderName,")
            .append("lendTime,")
            .append("creationDate,")
            .append("planReturnTime,")
            .append("cancelDate");
            
            columns.append("编号,").append("测试卡类型,").append("归属省份,").append("归属地市,")
            .append("手机类型,")
            .append("厂家,")
            .append("手机型号,")
            .append("存放地市,")
            .append("存放部门,")
            .append("管理员,")
            .append("测试终端状态,")
            .append("是否借出,")
            .append("借用单位,")
            .append("借用人,")
            .append("借出时间,")
            .append("登记时间,")
            .append("预计归还时间,")
            .append("失效日期");
            
            width.append("20,").append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20");
            
            dataList = testCardRegisterDAO.qryTerminalListByParam(param);
            title = "测试终端";
            titleEn = "测试终端sheet";
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
            fields.append("cardNumber,").append("testobjectName,").append("attributionProvinceName,").append("attributionCityName,")
            .append("parValueName,")
            .append("cardNo,")
            .append("rechCardTypeEnumName,")
            .append("storageCityName,")
            .append("storageDepartmentName,")
            .append("adminName,")
            .append("testcardStatusEnumName,")
            .append("lendFlagName,")
            .append("lendDepartmentName,")
            .append("lenderName,")
            .append("lendTime,")
            .append("creationDate,")
            .append("planReturnTime,")
            .append("cancelDate");
            
            columns.append("编号,").append("测试卡类型,").append("归属省份,").append("归属地市,")
            .append("面值,")
            .append("卡号,")
            .append("卡类型,")
            .append("存放地市,")
           .append("存放部门,")
            .append("管理员,")
            .append("充值卡状态,")
            .append("是否借出,")
            .append("借用单位,")
            .append("借用人,")
            .append("借出时间,")
            .append("登记时间,")
            .append("预计归还时间,")
            .append("失效日期");
            
            width.append("20,").append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20,")
            .append("20");

            dataList = testCardRegisterDAO.qryRechCardListByParam(param);
            title = "充值卡";
            titleEn = "充值卡sheet";
        }
       
        JSONObject jsObj = 
                addPriAttTemDetailInfo(param,fields.toString(),columns.toString(),width.toString());
        
        String[] fieldsId = JsonUtil.getString(jsObj,"fields").split(",");
        String[] fieldsName = JsonUtil.getString(jsObj,"columns").split(",");
        String[] widths = JsonUtil.getString(jsObj,"width").split(",");

        if(JsonUtil.getString(param,"isNeedPrivate")!=null&&!"".equals(JsonUtil.getString(param,"isNeedPrivate"))
                &&"1".equals(JsonUtil.getString(param,"isNeedPrivate"))){//前台选了省份，需要私有属性
            addPrivateInfo(dataList,cardType);
        }

        SimpleExportParameter parameters = new SimpleExportParameter();
        
        parameters.setTitle(title);

        parameters.setTitleEn(titleEn);
        parameters.setFieldsId(fieldsId);
        parameters.setFieldsName(fieldsName);
        parameters.setWidths(widths);
        
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&"SELECTED".equals(JsonUtil.getString(param,"exportType"))
                &&JsonUtil.getString(param,"selectIds")==null){//如果导出选中但是没有选中任何记录，就导出空白列表
            parameters.setDataList(new ArrayList());
        }else{
            parameters.setDataList(dataList);
        }

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
        
        if(JsonUtil.getString(param,"isNeedPrivate")!=null&&!"".equals(JsonUtil.getString(param,"isNeedPrivate"))
                &&"1".equals(JsonUtil.getString(param,"isNeedPrivate"))){//前台选了省份，需要私有属性
            JSONObject qryJson = new JSONObject();
            qryJson.put("testobjectType",JsonUtil.get(param,"cardType"));
            qryJson.put("attributionProvinceId",JsonUtil.get(param,"attributionProvinceId"));
            
            List<Map<String, Object>> list = tciPriAttTemService.qryTemplateListByParam(qryJson);
            if(list != null && list.size() > 0){
                Map<String, Object> map = new HashMap<String, Object>();
                for(int i=0;i<list.size();i++){
                    map = list.get(i);
                    
                    fields += ","+MapUtils.getString(map, "columnNumber");
                    columns += ","+MapUtils.getString(map, "columnName");
                    width += ",20";
                }
            }
        }
        
        
        JSONObject json = new JSONObject();
        json.put("fields", fields);
        json.put("columns", columns);
        json.put("width", width);
      
        return json;
    }
    
  
    /**
     *  添加私有属性值
     * @param dataList 主数据
     * @param cardType 测试卡类型
     * @throws Exception
     * @see
     * @since
     */
    private void addPrivateInfo(List<Map<String, Object>> dataList,Integer cardType) 
            throws Exception{
        String DATA_TYPE_SIX = "6";
        
        if(dataList != null && dataList.size() > 0){
            Long testobjectId = null;
            String name = "testCardId";
            Map<String, Object> map = new HashMap<String, Object>();
            if(cardType.intValue() == ConstantUtil.TEST_CARD_ENUM){
                name = "testCardId";
            }else if(cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
                name = "fixedTelId";
            }else if(cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
                name = "testTerminalId";
            }else if(cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
                name = "rechCardId";
            }
            
            for(int i=0;i<dataList.size();i++){
                map = dataList.get(i);
                
                testobjectId = MapUtils.getLong(map, name);
                
                JSONObject qryJson = new JSONObject();
                qryJson.put("testobjectId",testobjectId);
                qryJson.put("testobjectType",cardType);
                
                List<Map<String, Object>> infoList = 
                        tciPriAttTemDetService.qryDetailAndInfoListByParam(qryJson);
                if(infoList != null && infoList.size() > 0){
                    Map<String, Object> tmpMap = new HashMap<String, Object>();
                    for(int j=0;j<infoList.size();j++){
                        tmpMap = infoList.get(j);

                        String displayNumber = MapUtils.getString(tmpMap, "displayNumber");
                        String isEnumType = MapUtils.getString(tmpMap, "isEnumType"); 
                        String dataTypeEnumId = MapUtils.getString(tmpMap, "dataTypeEnumId"); 
                        String columnN = "column"+displayNumber;
                        String enumValueMeaning = null;
                        if(isEnumType != null && Boolean.valueOf(isEnumType)){
                            JSONObject enumJson = new JSONObject();
                            enumJson.put("testobjectId",testobjectId);
                            enumJson.put("columnN",columnN);
                            enumJson.put("templateDetailId",MapUtils.getString(tmpMap, "templateDetailId"));
                            
                            //通过每个动态column 和 测试卡主键ID 和私有属性模板明细ID，查询私有属性枚举值对应的枚举含义
                            List<Map<String, Object>> enumList = 
                                    tciPriAttEnValService.qryEnumValueByParam(enumJson);
                            if(enumList != null && enumList.size() >0){
                                Map<String, Object> enumMap = enumList.get(0);
                                enumValueMeaning = MapUtils.getString(enumMap, "enumValueMeaning");
                            }
                            map.put(MapUtils.getString(tmpMap, "columnNumber"), enumValueMeaning);
                        }else{
                          //布尔型，值需要转换 1 为是 0为否
                            if(dataTypeEnumId != null && DATA_TYPE_SIX.equals(dataTypeEnumId)){
                                String value = MapUtils.getString(tmpMap, "column"+displayNumber);
                                if("1".equals(value)){
                                    map.put(MapUtils.getString(tmpMap, "columnNumber"), "是");
                                }else if("0".equals(value)){
                                    map.put(MapUtils.getString(tmpMap, "columnNumber"), "否");
                                }
                            }else{
                                map.put(MapUtils.getString(tmpMap, "columnNumber"), 
                                        MapUtils.getString(tmpMap, "column"+displayNumber));
                            }
                        }
                        
                    }
                }
            }
        }
    }
}

