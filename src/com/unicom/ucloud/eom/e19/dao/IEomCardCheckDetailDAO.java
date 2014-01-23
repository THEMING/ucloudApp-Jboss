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
 * @author Jerry
 */ 
public interface IEomCardCheckDetailDAO extends IBaseDAO {

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
     * @param checkListId 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void save(JSONObject jsonObj) throws Exception; 

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
     * 删除清查详细表By 清查单ID
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public void deleteByCheckListId(JSONObject jsonObj) throws Exception;

    public void saveBath(JSONArray jsonArray, Long checkListId) throws Exception;

    public void deleteBatchByCheckListId(JSONArray jsonArray) throws Exception;

}
