package com.unicom.ucloud.eom.base.service;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;

public interface IEomSequenceService extends IBaseService {
    
    /**
     * 获取工单编码
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public String updateMySequence(JSONObject jsonObj) throws Exception;
    
    /** 
     * 根据条件查询列表
     * @param jsonObj 
     * @return
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception; 

    /** 
     * 新增
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void save(JSONObject jsonObj) throws Exception; 
}
