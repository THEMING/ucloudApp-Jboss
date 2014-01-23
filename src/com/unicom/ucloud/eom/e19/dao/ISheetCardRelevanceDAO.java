package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.dao.IBaseDAO;

/** 
 * 测试数据库层接口 
 * @version 1.0
 * @date 2013-01-15
 * @author guan.jianming
 */ 
public interface ISheetCardRelevanceDAO extends IBaseDAO {

    /** 
     * 据条件查询列表
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
    
    /** 
     * 批量新增
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void savebatch(JSONArray jsonArr) throws Exception; 


    /** 
     * 更新
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void update(JSONObject jsonObj) throws Exception;

    void delete(JSONObject jsonObject) throws Exception;

    void deleteBatch(JSONArray jsonArray) throws Exception;

    public List<Map<String, Object>> isAllowToSelectThisCards(JSONObject jj) throws Exception; 

}
