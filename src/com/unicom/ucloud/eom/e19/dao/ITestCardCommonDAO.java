package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

public interface ITestCardCommonDAO extends IBaseDAO{

    List<Map<String, Object>> qryOpearateHisList(JSONObject jsonObj) throws Exception;
    
    /**
     * 分页查询
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Page queryByPage(JSONObject jsonObj) throws Exception;

    public Page queryByPageProc(JSONObject jsonObj) throws Exception;

}
