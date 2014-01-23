package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.dao.IBaseDAO;

/** 
 * 测试数据库层接口 
 * @version 1.0
 * @date 2013-02-28
 * @author jerry
 */ 
public interface ITciPriAttEnumValDAO extends IBaseDAO {

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
     * 查询私有属性枚举值对应的枚举含义
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<Map<String, Object>> qryEnumValueByParam(JSONObject jsonObj) throws Exception;
    /** 
     * 新增
     * @param jsonObj 
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
     * 按照明细ID删除枚举值
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void deleteByTemplateDetailId(JSONObject jsonObj) throws Exception;
    
    /** 
     * 更新
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void update(JSONObject jsonObj) throws Exception; 

}
