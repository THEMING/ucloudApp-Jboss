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
public class ExpTestCardStatServiceImpl extends ExportSimpleElsService{
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
	            fields.append("attributionProvinceName,")
	            .append("attributionCityName,")
	            .append("testcardTypeEnumName,")
                .append("number,")
	            .append("subscriberNumber,")
	            .append("cardNo,")
	            .append("imsi,")
	            .append("testcardStatusEnumName,")
	            .append("balance,")
	            .append("storageCityName,")
	            .append("storageDepartmentName,")
	            .append("adminName,")
	            .append("lendFlagName,")
	            .append("lendDepartmentName,")
	            .append("lenderName");
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
	            .append("35,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20");
	            columns.append("归属省份,").append("归属地市,").append("测试卡类别,")
	            .append("测试卡编号,")
//	            .append("测试卡类别,")
//	            .append("运营商,")
//	            .append("网络类型,")
	            .append("用户号码,")
	            .append("测试卡卡号,")
	            .append("IMSI,")
	            .append("测试卡状态,")
	            .append("余额,")
	            .append("存放地市,")
	            .append("存放部门,")
	            .append("管理员,")
	            .append("是否借出,")
	            .append("借用单位,")
	            .append("借用人");
	            dataList = testCardRegisterDAO.qryTestCardListByParam(param);
	            title = "测试卡";
	            titleEn = "测试卡sheet";
	        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
	            fields.append("attributionProvinceName,").append("attributionCityName,").append("number,")
	            .append("phoneNumber,")
	            .append("testcardStatusEnumName,")
	            .append("teleFunction,")
	            .append("fixedPhoneTypeEnumName,")
	            .append("storageCityName,")
	            .append("storageDepartmentName,")
	            .append("adminName,")
	            .append("lendFlagName,")
	            .append("lendDepartmentName,")
	            .append("lenderName");
	            columns.append("归属省份,").append("归属地市,").append("固定电话编号,")
	            .append("电话号码,")
	            .append("固定电话状态,")
	            .append("功能,")
	            .append("类型,")
	            .append("存放地市,")
	            .append("存放部门,")
	            .append("管理员,")
	            .append("是否借出,")
	            .append("借用单位,")
	            .append("借用人");
	            width.append("20,").append("20,").append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20");
	            dataList = testCardRegisterDAO.qryImsListByParam(param);
	            title = "固定电话";
	            titleEn = "固定电话sheet";
	        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
	            fields.append("attributionProvinceName,").append("attributionCityName,").append("number,")
	            .append("imei,")
	            .append("moblieTypeEnumName,")
	            .append("phoneModel,")
	            .append("testcardStatusEnumName,")
	            .append("manufacturerName,")
	            .append("storageCityName,")
	            .append("storageDepartmentName,")
	            .append("adminName,")
	            .append("lendFlagName,")
	            .append("lendDepartmentName,")
	            .append("lenderName");
	            columns.append("归属省份,").append("归属地市,").append("测试终端编号,")
	            .append("手机串号,")
	            .append("手机类型,")
	            .append("手机型号,")
	            .append("测试终端状态,")
	            .append("厂家,")
	            .append("存放地市,")
	            .append("存放部门,")
	            .append("管理员,")
	            .append("是否借出,")
	            .append("借用单位,")
	            .append("借用人");
	            width.append("20,").append("20,").append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20");
	            dataList = testCardRegisterDAO.qryTerminalListByParam(param);
	            title = "测试终端";
	            titleEn = "测试终端sheet";
	        }else if(null!=cardType && cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
	            fields.append("attributionProvinceName,").append("attributionCityName,").append("cardNumber,")
	            .append("cardNo,")
	            .append("parValueName,")
	            .append("rechCardTypeEnumName,")
	            .append("testcardStatusEnumName,")
	            .append("storageCityName,")
	            .append("storageDepartmentName,")
	            .append("adminName,")
	            .append("lendFlagName,")
	            .append("lendDepartmentName,")
	            .append("lenderName");
	            columns.append("归属省份,").append("归属地市,").append("充值卡编号,")
	            .append("卡号,")
	            .append("面值,")
	            .append("卡类型,")
	            .append("充值卡状态,")
	            .append("存放地市,")
	            .append("存放部门,")
	            .append("管理员,")
	            .append("是否借出,")
	            .append("借用单位,")
	            .append("借用人");
	            width.append("20,").append("20,").append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20,")
	            .append("20,")
	            .append("35,")
	            .append("20");
	            dataList = testCardRegisterDAO.qryRechCardListByParam(param);
	            title = "充值卡";
	            titleEn = "充值卡sheet";
	        }
	       
	        String[] fieldsId = fields.toString().split(",");
	        String[] fieldsName = columns.toString().split(",");
	        String[] widths = width.toString().split(",");

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

}
