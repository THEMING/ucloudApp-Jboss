package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.ExportSimpleElsService;
import com.unicom.ucloud.eom.e19.dao.IEomCardCheckDao;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

@Service
public class ExportCheckListServiceImpl extends ExportSimpleElsService{
    
    @Autowired
    private IEomCardCheckDao eomCardCheckDao;
    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
        
     // 字段名，结果集对应key，用“,”分隔，先后顺序与导出结果的列顺序一致。    
        String fields = "checkListNumber," +
                "checkFormStatusEnumName," +
                "checkPersonName," +
                "attributionDepartmentName," +
                "checkTime," +
                "actualAvailableNum," +
                "actualUnavailableNum," +
                "actualLendNum," +
                "checkStatusName," +
                "remarks";
        // 列名，excel中的显示名
        String columns = "清查记录编号," +
                "清查单状态," +
                "清查人," +
                "清查部门," +
                "清查时间," +
                "可用数量," +
                "不可用数量," +
                "借出数," +
                "清查状态," +
                "备注";

        String width = "20,20,20,20,20,20,20,20,20,25";
        
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&!"SELECTED".equals(JsonUtil.getString(param,"exportType"))){
            param.remove("selectIds");
        }
        
        Page page = eomCardCheckDao.qryTestCardCheckListPage(param);
        List<Map<String, Object>> dataList = page.getData();
        
        addFields(dataList);
        // 生成excel参数

        // excel里面的标题
        String title = "测试卡清查单";
        // excel里面sheet的名称
        String titleEn = "测试卡清查单sheet";

        String[] fieldsId = fields.split(",");
        String[] fieldsName = columns.split(",");
        String[] widths = width.split(",");

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
     * 把ID变为name
     * @param list
     * @see
     * @since
     */
    private void addFields(List list){
        if(list != null && list.size() > 0){
            Map map = null;
            String checkFormStatusEnumName = "";
            String checkStatusName = "";
            for(int i=0;i<list.size();i++){
                map = (Map)list.get(i);
                
                Long checkFormStatusEnum = MapUtils.getLong(map, "checkFormStatusEnumId");
                if(checkFormStatusEnum != null){
                    if(checkFormStatusEnum.longValue() == 4){
                        checkFormStatusEnumName = "审核不通过";
                    }else if(checkFormStatusEnum.longValue() == 1){
                        checkFormStatusEnumName = "草稿";
                    }else if(checkFormStatusEnum.longValue() == 2){
                        checkFormStatusEnumName = "未审批";
                    }else if(checkFormStatusEnum.longValue() == 3){
                        checkFormStatusEnumName = "完成";
                    }
                }
                map.put("checkFormStatusEnumName", checkFormStatusEnumName);
                Long checkStatus = MapUtils.getLong(map, "checkStatus");
                if(checkStatus != null){
                    if(checkStatus.longValue() == 1){
                        checkStatusName = "正常";
                    }else{
                        checkStatusName = "需整改";
                    }
                }
                map.put("checkStatusName", checkStatusName);
            }
        }
    }

}
