package com.unicom.ucloud.eom.demo.fun1.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

/**
 * 测试数据库层接口
 * @version 1.0
 * @date 2013-1-10
 * @author guojinan
 */
public interface IDemoDAO extends IBaseDAO{
    /**
     * 分页查询
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Page page(JSONObject jsonObj) throws Exception;
    
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception;
    
    public void save(JSONObject jsonObj) throws Exception;
    
    public void update(JSONObject jsonObj) throws Exception;
    
    public List<Map<String, Object>> queryTree(JSONObject jsonObj) throws Exception;
    
}
