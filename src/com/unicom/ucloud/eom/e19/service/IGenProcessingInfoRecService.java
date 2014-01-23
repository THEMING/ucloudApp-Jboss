package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;

import com.unicom.ucloud.eom.base.service.IBaseService; 

/** 
 * 业务层接口 
 * @version 1.0
 * @date 2013-03-08
 * @author MING
 */ 
public interface IGenProcessingInfoRecService extends IBaseService {

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
    public String save(JSONObject jsonObj) throws Exception; 

    /** 
     * 删除
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void delete(JSONObject jsonObj) throws Exception; 

    /** 
     * 更新
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void update(JSONObject jsonObj) throws Exception; 

    /** 
     * 分页查询
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public Page page(JSONObject jsonObj) throws Exception;

    void addClaimTask(JSONObject jsonObj) throws Exception;

    void addDispatchTask(JSONObject jsonObj) throws Exception; 

}
