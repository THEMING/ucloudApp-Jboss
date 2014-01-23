package com.unicom.ucloud.eom.base.service;

import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONObject;

/**
 * 读取excel数据接口
 * 
 * @version 1.0
 * @date 2013-1-22
 * @author feng.yang
 */
public interface IReadElsService {

    /**
     * 实现对excel列表数据读取
     * 
     * @param param
     * @param wwb
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<Map<String, Object>> readExcel(JSONObject param, Workbook wwb) throws Exception;
    
    public String validate(JSONObject param, List<Map<String, Object>> data) throws Exception;
    
    public String saveImportData(JSONObject param, List<Map<String, Object>> data) throws Exception;

}
