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
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

/**
 * 生成测试卡excle模板
 * @version 1.0
 * @date 2013-3-6
 * @author Jerry
 */
@Service
public class CreTestCardUploadServiImpl extends ExportSimpleElsService {

    @Autowired
    private ITciPriAttTemService tciPriAttTemplateService;
    
    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
        
        StringBuffer fields = new StringBuffer();
        StringBuffer columns = new StringBuffer();
        StringBuffer width = new StringBuffer();

        List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>() ;
        String title = "";
        String titleEn = "";
        
            fields.append("number");
            
            columns.append("测试卡编号");
            
            Map<String, Object> m =new HashMap();
            m.put("number", "112233445568444");
            dataList.add(m);

            width
            .append("60");

            title = "测试卡导入";
            titleEn = "测试卡sheet";

        SimpleExportParameter parameters = new SimpleExportParameter();
        
        parameters.setTitle(title);

        parameters.setTitleEn(titleEn);
        parameters.setFieldsId(fields.toString().split(","));
        parameters.setFieldsName(columns.toString().split(","));
        parameters.setWidths(width.toString().split(","));
        parameters.setDataList(dataList);

        return parameters;
    }
    
}

