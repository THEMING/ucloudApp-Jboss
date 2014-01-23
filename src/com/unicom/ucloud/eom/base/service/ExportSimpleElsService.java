package com.unicom.ucloud.eom.base.service;

import java.util.Map;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONObject;

import com.unicom.ucloud.util.execl.ExcelUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

/**
 * 实现简单模版下的excel导出
 * 
 * @version 1.0
 * @date 2013-1-22
 * @author feng.yang
 */
public abstract class ExportSimpleElsService extends BaseServiceImpl implements IExportElsService {

    @Override
    public Map<String, Object> exportExcel(JSONObject param, Workbook wwb) throws Exception {

        SimpleExportParameter parameters = getSimpleListOutputParameters(param);

        Sheet wsheet = wwb.createSheet(parameters.getTitleEn());

        ExcelUtil utils = new ExcelUtil();
        utils.simpleExport(wwb,wsheet, parameters);
        return null;

    }

    /**
     * 实现简单模版下的excel导出参数设置
     * 
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    protected abstract SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception;

}
