package com.unicom.ucloud.eom.demo.fun1.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/**
 * 测试数据库层实现类
 * @version 1.0
 * @date 2013-1-10
 * @author guojinan
 */
@Repository
public class DemoDAOImpl extends BaseDAOImpl implements IDemoDAO {

    @Override
    public List<Map<String, Object>> queryTree(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT  TEST_CARD_ID AS id,TEST_CARD_ID AS text,")
            .append("ATTRIBUTE1 AS parentId,TEST_CARD_ID AS nodeCode,  ")
            .append("  (SELECT IF(COUNT(1)>0,0,1) AS CNT FROM t_eom_test_card_info P WHERE P.ATTRIBUTE1 = D.TEST_CARD_ID) AS leaf ")
            .append("  FROM t_eom_test_card_info D ")
            .append("WHERE ");
        if(CommonUtils.isNumeric(JsonUtil.get(jsonObj,"node"))){
            sqlBuf.append(" ATTRIBUTE1 = ").append(JsonUtil.getInt(jsonObj, "node"));
        }else{
            sqlBuf.append(" ATTRIBUTE1 = ''");
        }
        
        return getJdbcTemplate().queryForList(sqlBuf.toString());
    }
    
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select SOURCE_ID, SERVICE_NAME, SOURCE_TYPE")
            .append(" FROM t_eom_data_source")
            .append(" where 1=1");
        
        return super.queryForList(sqlBuf.toString());
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO T_EOM_DICT_DATA (DATA_NAME, DATA_VALUE, DATA_TYPE, DATA_TYPE_NAME,ORDER_INDEX, EXT_COL2)")
            .append(" VALUES (?, ?, ?, ?, ?, ?)");
        
        Object[] args = {JsonUtil.get(jsonObj, "dataName"), JsonUtil.get(jsonObj, "dataValue")
                , JsonUtil.get(jsonObj, "dataType"), JsonUtil.get(jsonObj, "dataTypeName")
                , JsonUtil.get(jsonObj, "orderIndex"), JsonUtil.get(jsonObj, "EXT_COL2")};
        getJdbcTemplate().update(sqlBuf.toString(), args);
    }
    
    @Override
    public void update(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_DICT_DATA SET DATA_NAME=?, DATA_VALUE=?, DATA_TYPE=?, DATA_TYPE_NAME=?, EXT_COL2=? WHERE DICT_ID=?");
        
        Object[] args = {JsonUtil.get(jsonObj, "dataName"), JsonUtil.get(jsonObj, "dataValue")
                , JsonUtil.get(jsonObj, "dataType"), JsonUtil.get(jsonObj, "dataTypeName")
                , JsonUtil.get(jsonObj, "EXT_COL2"), JsonUtil.get(jsonObj, "dicId")};
        getJdbcTemplate().update(sqlBuf.toString(), args);
        
//        int a = 1/0;
        //throw new Exception("111");
    }

    @Override
    public Page page(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        
        sqlBuf.append("SELECT a.DICT_ID as dictId, a.DATA_NAME as dataName, a.DATA_VALUE as dataValue")
            .append(", a.DATA_TYPE as dataType, a.DATA_TYPE_NAME as dataTypeName")
            .append(", a.EXT_COL1 as extCol1, a.EXT_COL2 as extCol2, a.EXT_COL3 as extCol3")
            .append(", a.ORDER_INDEX as orderIndex")
            .append(" FROM T_EOM_DICT_DATA a ")
            .append(" WHERE 1=1");
        
        
        if(!CommonUtils.isEmpty(JsonUtil.get(jsonObj,"dataNameQry"))){
            sqlBuf.append(" AND A.DATA_NAME like '%").append(JsonUtil.getString(jsonObj, "dataNameQry")).append("%'");
        }
        if(!CommonUtils.isEmpty(JsonUtil.get(jsonObj,"dataValueQry"))){
            sqlBuf.append(" AND A.DATA_VALUE = ").append(JsonUtil.getInt(jsonObj, "dataValueQry")).append("");
        }
        if(!CommonUtils.isEmpty(JsonUtil.get(jsonObj,"dataTypeQry"))){
            sqlBuf.append(" AND A.DATA_TYPE = ").append(JsonUtil.getInt(jsonObj, "dataTypeQry")).append("");
        }
       
        return super.getPageQuery(sqlBuf.toString(), jsonObj);
    }

}
