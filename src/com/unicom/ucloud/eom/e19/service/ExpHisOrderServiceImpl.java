package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.ExportSimpleElsService;
import com.unicom.ucloud.eom.e19.dao.ITestCardOrderApplyDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

/**
 * 历史工单导出功能
 * @version 1.0
 * @date 2013-3-20
 * @author Jerry
 */
@Service
public class ExpHisOrderServiceImpl extends ExportSimpleElsService{

    public ExpHisOrderServiceImpl(){
    }
    
    @Autowired
    private ITestCardOrderApplyDAO testCardOrderApplyDAO;
    
    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
        StringBuffer fields = new StringBuffer();
        fields.append("sheetSerialNumber,")
        .append("sheetTypeName,")
        .append("sheetStatusName,")
        .append("urgencyLevel,")
        .append("createdByName,")
        .append("creationDate,")
        .append("requiredFinishTime,")
        .append("finishTime,")
        .append("content,")
        .append("remarks");
        
        StringBuffer columns = new StringBuffer();
        columns.append("工单流水号,")
        .append("工单类型,")
        .append("工单状态,")
        .append("缓急程度,")
        .append("创建人,")
        .append("创建时间,")
        .append("建议完成时间,")
        .append("完成时间,")
        .append("内容,")
        .append("备注");
        
        StringBuffer width = new StringBuffer();
        width.append("20,").append("20,").append("20,").append("20,")
        .append("20,").append("20,").append("20,").append("20,").append("20,")
        .append("20");
        
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&!"SELECTED".equals(JsonUtil.getString(param,"exportType"))){
            param.remove("selectIds");
        }
        
        Page page = testCardOrderApplyDAO.qryEomCardSheetPageByParam(param);
        List<Map<String, Object>> dataList = page.getData();

        String title = "测试卡历史工单列表";

        String titleEn = "测试卡历史工单列表";

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
