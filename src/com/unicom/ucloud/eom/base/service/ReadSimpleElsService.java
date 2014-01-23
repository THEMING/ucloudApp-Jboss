package com.unicom.ucloud.eom.base.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.util.execl.ExcelUtil;
import com.unicom.ucloud.util.execl.SimpleReadParameter;

/**
 * 实现对简单的excel列表读取
 * 
 * @version 1.0
 * @date 2013-1-22
 * @author feng.yang
 */
public abstract class ReadSimpleElsService extends BaseServiceImpl implements IReadElsService {

    /**
     * 实现对简单的excel列表读取
     */
    @Override
    public List<Map<String, Object>> readExcel(JSONObject param, Workbook wwb) throws Exception {

        // 获取读取参数
        SimpleReadParameter parameters = getSimpleReadParameters(param);
        // 字段名，此值为返回列表中行数据的key
        String[] fields = parameters.getFieldsId();
        // 开始索引，默认为2，因为第一行是表头，第二行是列名，所以索引从2开始
        int startIndex = parameters.getStartIndex();

        ExcelUtil util = new ExcelUtil();
        List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();

        // 遍历多个sheet页
        for (int i = 0; i < wwb.getNumberOfSheets(); i++) {
            Sheet wsheet = wwb.getSheetAt(i);
            // 读取sheet数据
            List<Map<String, Object>> sheetData = util.readSimple(wsheet, startIndex, fields);
            if (!CommonUtils.isEmpty(sheetData)) {
                // 合并sheet数据
                data.addAll(sheetData);
            }
        }
        // 遍历多个sheet页

        return data;
    }

    public String validate(JSONObject param, List<Map<String, Object>> data) throws Exception {
        return null;
    }
    
    public String saveImportData(JSONObject param, List<Map<String, Object>> data) throws Exception{
        return null; 
    }

    /**
     * 实现简单模版下的excel读取参数设置
     * 
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    protected abstract SimpleReadParameter getSimpleReadParameters(JSONObject param)
            throws Exception;

}
