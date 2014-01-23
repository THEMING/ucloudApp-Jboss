package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.IBaseService; 

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-01-17
 * @author jiang.yean
 */ 
public interface ITestCardRegService extends IBaseService {
    

    /** 
     * 根据条件查询列表
     * @param jsonObj 
     * @return
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public List<Map<String, Object>> qryTestCardListByParam(JSONObject jsonObj) throws Exception; 

    /** 
     * 新增
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void saveTestCardInfoBatch(JSONObject jsonObj) throws Exception;
    /** 
     * 删除
     * @param jsonObj 
     * @return 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public String deleteTestCardInfo(JSONObject jsonObj) throws Exception; 

    /** 
     * 根据条件查询列表
     * @param jsonObj 
     * @return
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public List<Map<String, Object>> qryImsListByParam(JSONObject jsonObj) throws Exception; 

    /** 
     * 新增
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void saveImsInfoBatch(JSONObject jsonObj) throws Exception;
    
    /** 
     * 删除
     * @param jsonObj 
     * @return 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public String deleteImsInfo(JSONObject jsonObj) throws Exception; 
    
    /** 
     * 根据条件查询列表
     * @param jsonObj 
     * @return
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public List<Map<String, Object>> qryTerminalListByParam(JSONObject jsonObj) throws Exception; 

    /** 
     * 新增
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void saveTerminalInfoBatch(JSONObject jsonObj) throws Exception;
    /** 
     * 删除
     * @param jsonObj 
     * @return 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public String deleteTerminalInfo(JSONObject jsonObj) throws Exception; 
    
    
    /** 
     * 根据条件查询列表
     * @param jsonObj 
     * @return
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public List<Map<String, Object>> qryRechCardListByParam(JSONObject jsonObj) throws Exception; 

    /** 
     * 新增
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void saveRechCardInfoBatch(JSONObject jsonObj) throws Exception;
    /** 
     * 删除
     * @param jsonObj 
     * @return 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public String deleteRechCardInfo(JSONObject jsonObj) throws Exception; 
    
    public Page qryImsPageByParam(JSONObject jsonObj) throws Exception;
    public Page qryTerminalPageByParam(JSONObject jsonObj) throws Exception;
    public Page qryRechCardPageByParam(JSONObject jsonObj) throws Exception;
    public Page qryTestCardPageByParam(JSONObject jsonObj) throws Exception;

}
