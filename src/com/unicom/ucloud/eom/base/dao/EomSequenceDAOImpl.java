package com.unicom.ucloud.eom.base.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.util.JsonUtil;

@Repository
public class EomSequenceDAOImpl extends BaseDAOImpl implements IEomSequenceDAO{
    
    public EomSequenceDAOImpl(){
        
    }
    
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        return super.queryForList(getSql(jsonObj).toString());
    }
    
    @Override
    public Page page(JSONObject jsonObj) throws Exception {
        return super.getPageQuery(getSql(jsonObj).toString(), jsonObj);
    } 
    
    private StringBuffer getSql(JSONObject jsonObj) throws JSONException{
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" SELECT ")
        .append(" SEQUENCE_ID AS sequenceId, ")
        .append(" SEQUENCE_TYPE AS sequenceType, ")
        .append(" WO_TYPE AS woType, ")
        .append(" ORG_IDENTIFIER AS orgIdentifier, ")
        .append(" PERIOD_IDENTIFIER AS periodIdentifier, ")
        .append(" CURRENT_NUM AS currentNum, ")
        .append(" REMARKS AS remarks, ")
        .append(" CREATED_BY AS createdBy, ")
        .append(" CREATION_DATE AS creationDate, ")
        .append(" LAST_UPDATED_BY AS lastUpdatedBy, ")
        .append(" LAST_UPDATE_DATE AS lastUpdateDate, ")
        .append(" DELETED_FLAG AS deletedFlag, ")
        .append(" DELETED_BY AS deletedBy, ")
        .append(" DELETION_DATE AS deletionDate, ")
        .append(" RECORD_VERSION AS recordVersion ")
        .append(" FROM T_EOM_SEQUENCE  ")
        .append(" WHERE DELETED_FLAG = 0 ");

        if (null != JsonUtil.get(jsonObj, "sequenceId")) {
            sqlBuf.append(" AND SEQUENCE_ID = '").append(
                    JsonUtil.get(jsonObj, "sequenceId")).append("'");
        }
        if (null != JsonUtil.get(jsonObj, "sequenceType")) {
            sqlBuf.append(" AND SEQUENCE_TYPE = '").append(
                    JsonUtil.get(jsonObj, "sequenceType")).append("'");
        }
        if (null != JsonUtil.get(jsonObj, "woType")) {
            sqlBuf.append(" AND WO_TYPE = '").append(
                    JsonUtil.get(jsonObj, "woType")).append("'");
        }
        if (null != JsonUtil.get(jsonObj, "periodIdentifier")) {
            sqlBuf.append(" AND PERIOD_IDENTIFIER = '").append(
                    JsonUtil.get(jsonObj, "periodIdentifier")).append("'");
        }
        if (null != JsonUtil.get(jsonObj, "orgIdentifier")) {
            sqlBuf.append(" AND ORG_IDENTIFIER = '").append(
                    JsonUtil.get(jsonObj, "orgIdentifier")).append("'");
        }
        return sqlBuf;
    }
    
    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO T_EOM_SEQUENCE(SEQUENCE_ID")
                .append(",SEQUENCE_TYPE")
                .append(",WO_TYPE")
                .append(",ORG_IDENTIFIER")
                .append(",PERIOD_IDENTIFIER")
                .append(",CURRENT_NUM")
                .append(",REMARKS")
                .append(",CREATED_BY")
                .append(",CREATION_DATE")
                .append(",LAST_UPDATED_BY")
                .append(",LAST_UPDATE_DATE")
                .append(",DELETED_FLAG")
                .append(",DELETED_BY")
                .append(",DELETION_DATE")
                .append(",RECORD_VERSION")
                .append(")")
                .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"); 
        // 获取序列号
        Long nextId = super.getNextUnisequence(JsonUtil.getString(jsonObj, "modelCode"), 
                "T_EOM_SEQUENCE","SEQUENCE_ID");
        jsonObj.put("sequenceId", nextId);

        Object[] args = { nextId, 
                JsonUtil.get(jsonObj, "sequenceType"),
                JsonUtil.get(jsonObj, "woType"),
                JsonUtil.get(jsonObj, "orgIdentifier"),
                JsonUtil.get(jsonObj, "periodIdentifier"), 
                JsonUtil.get(jsonObj, "currentNum"),
                JsonUtil.getInt(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "createdBy"), 
                JsonUtil.get(jsonObj, "creationDate"),
                JsonUtil.get(jsonObj, "lastUpdatedBy"),
                JsonUtil.get(jsonObj, "lastUpdateDate"),
                JsonUtil.get(jsonObj, "deletedFlag"), 
                JsonUtil.get(jsonObj, "deletedBy"),
                JsonUtil.get(jsonObj, "deletionDate"),
                JsonUtil.get(jsonObj, "recordVersion")
        };
        super.update(sqlBuf.toString(), args);
    }

    @Override
    public void updateCurrentNum(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE  T_EOM_SEQUENCE SET CURRENT_NUM = ?");
        sqlBuf.append(",LAST_UPDATED_BY=?");
        sqlBuf.append(",LAST_UPDATE_DATE=?");
        sqlBuf.append(", RECORD_VERSION = RECORD_VERSION+1");
        sqlBuf.append(" WHERE SEQUENCE_ID = ?");
        list.add(JsonUtil.get(jsonObj,"currentNum"));
        list.add(JsonUtil.get(jsonObj,"lastUpdatedBy"));
        list.add(new Date());
        list.add(JsonUtil.get(jsonObj, "sequenceId"));
        super.update(sqlBuf.toString(), list.toArray());
    }
}
