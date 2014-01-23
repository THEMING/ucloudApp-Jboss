package com.unicom.ucloud.eom.base.service;

import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONObject;

/**
 * 导出数据接口
 * 
 * @version 1.0
 * @date 2013-1-22
 * @author feng.yang
 */
public interface IExportElsService {

    /**
     * 导出数据，在这里实现从DB读取数据并写入excel的工作表<br>
     * 有分页需求，在param里面，有exportType(数据量)参数,值为:ALL(全量)，PAGE(当前页),分页其它参数，请在js传参时自己设置
     * 
     * @param param
     * @param wwb
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String, Object> exportExcel(JSONObject param, Workbook wwb) throws Exception;

}
