package com.unicom.ucloud.eom.commondata.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ucloud.paas.proxy.sysconfig.EnumConfigService;
import com.ucloud.paas.proxy.sysconfig.vo.EnumType;
import com.ucloud.paas.proxy.sysconfig.vo.EnumValue;
import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.util.JsonUtil;

@Controller
@RequestMapping("/commondata")
public class CommonDataAction extends BaseAction {


    @RequestMapping(value = "/commonDataAction.json", params = "method=qryDictData")
    @ResponseBody
    public String qryDictData(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取前台传来的dictType  
        JSONObject params = getParam(request);
        String enumItemCode = JsonUtil.getString(params, "dictType");
        if(enumItemCode==null){
            enumItemCode = "DATA_TYPE";
        }
        //调用枚举服务，通过枚举值编码来查询枚举对象
//        EnumConfigService enumConfigService = new EnumConfigService();
//        EnumType enumType = enumConfigService.getEnumType(enumItemCode, null, 1);
//        
//         if (CommonUtils.isEmpty(enumType)) {
//             return null;
//         }
//         
//         List<EnumValue> enumValues = enumType.getEnumValues();
         JSONArray enumList = new JSONArray();
//         //将值转化为json，命名为dataValue，dataName
//         for (EnumValue enumValue : enumValues) {
//             if("DATA_TYPE".equals(enumItemCode)&&"枚举".equals(enumValue.getEnumValueName())){
//                 continue;
//             }
//             JSONObject node = new JSONObject();
//             node.put("dataValue", enumValue.getEnumValueNum());    
//             node.put("dataName", enumValue.getEnumValueName());
//             node.put("enumValueId", enumValue.getEnumValueId());
//             enumList.put(node);
//         }
         JSONObject node = new JSONObject();
         node.put("dataValue", 1);    
         node.put("dataName", 1);
         node.put("enumValueId", 1);
         enumList.put(node);
        return enumList.toString();
    }
    
    /**
     * 查找子枚举类型的值
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/commonDataAction.json", params = "method=qryDictChildEnum")
    @ResponseBody
    public String qryDictChildEnum(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取前台传来的dictType  
        JSONObject params = getParam(request);
        String parentEnumValueCode = JsonUtil.getString(params, "enumType");
        Integer parentEnumValueId = JsonUtil.getInt(params, "enumValue");
        if (CommonUtils.isEmpty(parentEnumValueCode)) {
            return null;
        }
        if(parentEnumValueId == null){
            return null;
        }
       
         EnumConfigService enumConfigService = new EnumConfigService();
         List<EnumType> childTypes = enumConfigService.getFilterChildEnumType(parentEnumValueCode,parentEnumValueId,null,1);
         
         JSONArray enumList = new JSONArray();
         if(childTypes != null  && childTypes.size()>0){
             for(int i=0;i<childTypes.size();i++){
                 EnumType et = (EnumType)childTypes.get(i);
                 
                 List<EnumValue> enumValues = et.getEnumValues();
                 for (EnumValue enumValue : enumValues) {
                     JSONObject node = new JSONObject();
                     node.put("dataValue", enumValue.getEnumValueNum());    
                     node.put("dataName", enumValue.getEnumValueName());
                     enumList.put(node);
                 }
             }
         }
         
        return enumList.toString();
    }
    
    /**
     * 查找枚举值信息
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/commonDataAction.json", params = "method=qryEnumInfo")
    @ResponseBody
    public String qryEnumInfo(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取前台传来的dictType  
        JSONObject params = getParam(request);
        String enumItemCode = JsonUtil.getString(params, "dictType");
        Integer enumValueNum = JsonUtil.getInt(params, "enumNum");
        
        EnumConfigService enumConfigService = new EnumConfigService();
        EnumType enumType = enumConfigService.getEnumType(enumItemCode, null, 1);
        
         if (CommonUtils.isEmpty(enumType)) {
             return null;
         }
         
         List<EnumValue> enumValues = enumType.getEnumValues();
         JSONObject node = new JSONObject();
         for (EnumValue enumValue : enumValues) {
             if( enumValue.getEnumValueNum().intValue() == enumValueNum.intValue()){
                 node.put("dataValue", enumValue.getEnumValueNum()); 
                 node.put("dataName", enumValue.getEnumValueName());
                 node.put("enumValueId", enumValue.getEnumValueId());
                 node.put("enumValueCode", enumValue.getEnumValueCode());
             }
         }

        return node.toString();
    }
    
    /**
     * 查询专业
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/commonDataAction.json", params = "method=findSpecialityEnum")
    @ResponseBody
    public String findSpecialityEnum(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);
        String enumItemCode = "SPECIALITY_TYPE";
        
        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }
        
        //调用枚举服务，通过枚举值编码来查询枚举对象
        EnumConfigService enumConfigService = new EnumConfigService();
        EnumType enumType = enumConfigService.getEnumType(enumItemCode, null, 1);
        
         if (CommonUtils.isEmpty(enumType)) {
             return null;
         }
         JSONObject node = new JSONObject();
         //获取枚举对象里面的值
         List<EnumValue> enumValues = enumType.getEnumValues();
         JSONArray enumList = new JSONArray();
         
         for (EnumValue enumValue : enumValues) {
             node = new JSONObject();
             
             node.put("id", enumValue.getEnumValueNum());
             node.put("text", enumValue.getEnumValueName());
             node.put("parentId", "0000");
             if (!singleSelect) {
                 node.put("checked", false);
             }
             node.put("leaf", 1);
             enumList.put(node);
         }

        return enumList.toString();
    }
    
    /**
     * 根据应用、业务类型、产品、专业、组织信息查询流程模板
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/commonDataAction.json", params = "method=findProcessModel")
    @ResponseBody
    public String findProcessModel(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONArray list = new JSONArray();
        return list.toString();
    }
    
    /**
     * 查询枚举（tree win使用）
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/commonDataAction.json", params = "method=findEnumForTree")
    @ResponseBody
    public String findEnumForTree(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);
        String enumItemCode = "";
        
        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "dictType"))) {
            enumItemCode = JsonUtil.getString(jsonObj, "dictType");
        }else{
            throw new Exception("枚举类型为空!");
        }
        //调用枚举服务，通过枚举值编码来查询枚举对象
        EnumConfigService enumConfigService = new EnumConfigService();
        EnumType enumType = enumConfigService.getEnumType(enumItemCode, null, 1);
        
         if (CommonUtils.isEmpty(enumType)) {
             return null;
         }
         JSONObject node = new JSONObject();
         //获取枚举对象里面的值
         List<EnumValue> enumValues = enumType.getEnumValues();
         JSONArray enumList = new JSONArray();
         
         for (EnumValue enumValue : enumValues) {
             node = new JSONObject();
             
             node.put("id", enumValue.getEnumValueNum());
             node.put("text", enumValue.getEnumValueName());
             node.put("parentId", "1");
             if (!singleSelect) {
                 node.put("checked", false);
             }
             node.put("leaf", 1);
             enumList.put(node);
         }

        return enumList.toString();
    }
}
