package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

/** 
 * 测试数据库层接口 
 * @version 1.0
 * @date 2013-02-22
 * @author jerry
 */ 
public interface ITciPriAttTempDAO extends IBaseDAO {

    /** 
     * 据条件查询列表
     * @param jsonObj 
     * @return
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception; 
    public Page qryPageByParam(JSONObject jsonObj) throws Exception;
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
     * 更新
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    public void update(JSONObject jsonObj) throws Exception; 
    /**
     * 查询私有属性模板明细和私有属性模板信息
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<Map<String, Object>> qryTemplateListByParam(JSONObject jsonObj) throws Exception;
}
