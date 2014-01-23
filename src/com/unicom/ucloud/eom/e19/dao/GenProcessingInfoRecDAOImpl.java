package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 数据库层实现类 
 * @version 1.0
 * @date 2013-03-08
 * @author MING
 */ 
@Repository
public class GenProcessingInfoRecDAOImpl extends BaseDAOImpl implements IGenProcessingInfoRecDAO {

    /**
     * 构造函数
     */
    public GenProcessingInfoRecDAOImpl(){

    }

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.GEN_PROCESSING_INFO_REC_ID as genProcessingInfoRecId ")
            .append(",A.PROCESS_INSTANCE_ID as processInstanceId ")
            .append(",A.ACTIVITY_INSTANCE_ID as activityInstanceId ")
            .append(",A.TASK_INSTANCE_ID as taskInstanceId ")
            .append(",A.PROCESSING_OBJECT_TABLE as processingObjectTable ")
            .append(",A.PROCESSING_OBJECT_ID as processingObjectId ")
            .append(",A.PROCESSING_SEQ_NUM as processingSeqNum ")
            .append(",A.PROCESSING_TYPE_ENUM_ID as processingTypeEnumId ")
            .append(",A.PROCESSING_REASON_TYPE as processingReasonType ")
            .append(",A.PROCESSING_REASON as processingReason ")
            .append(",A.PROCESSING_RESULT_OPINION as processingResultOpinion ")
            .append(",A.PROCESSING_DESC as processingDesc ")
            .append(",A.PROCESSING_EXPIRED_TIME as processingExpiredTime ")
            .append(",A.REMARKS as remarks ")
            .append(",A.CREATED_BY as createdBy ")
            .append(",A.CREATION_DATE as creationDate ")
            .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
            .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
            .append(",A.RECORD_VERSION as recordVersion ")
            .append(",A.DELETED_FLAG as deletedFlag ")
            .append(",A.DELETED_BY as deletedBy ")
            .append(",A.DELETION_DATE as deletionDate ")
            .append(",A.ATTRIBUTE1 as attribute1 ")
            .append(",A.ATTRIBUTE2 as attribute2 ")
            .append(",A.ATTRIBUTE3 as attribute3 ")
            .append(",A.ATTRIBUTE4 as attribute4 ")
            .append(",A.ATTRIBUTE5 as attribute5 ")
            .append(",A.PROCESSING_ORG_ID as processingOrgId ")
            .append(",A.ARCHIVE_BASE_DATE as archiveBaseDate ");
        sqlBuf.append(" from T_EOM_GEN_PROCESSING_INFO_REC A ")
            .append(" where 1=1");
      
        return super.getJdbcTemplate().queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_GEN_PROCESSING_INFO_REC(GEN_PROCESSING_INFO_REC_ID ")
            .append(",PROCESS_INSTANCE_ID,ACTIVITY_INSTANCE_ID,TASK_INSTANCE_ID ")
            .append(",PROCESSING_OBJECT_TABLE,PROCESSING_OBJECT_ID,PROCESSING_SEQ_NUM ")
            .append(",PROCESSING_TYPE_ENUM_ID,PROCESSING_REASON_TYPE,PROCESSING_REASON ")
            .append(",PROCESSING_RESULT_OPINION,PROCESSING_DESC,PROCESSING_EXPIRED_TIME,REMARKS ")
            .append(",CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION ")
            .append(",DELETED_FLAG,DELETED_BY,DELETION_DATE,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3 ")
            .append(",ATTRIBUTE4,ATTRIBUTE5,PROCESSING_ORG_ID,PROCESSING_ORG_NAME,CREATED_BY_NAME )")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        // 获取序列号
        Long nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_GEN_PROCESSING_INFO_REC", "GEN_PROCESSING_INFO_REC_ID");
        Object[] args = {nextId,JsonUtil.get(jsonObj, "processInstanceId"),
                JsonUtil.get(jsonObj, "activityInstanceId"),JsonUtil.get(jsonObj, "taskInstanceId"),
                JsonUtil.get(jsonObj, "processingObjectTable"),JsonUtil.get(jsonObj, "processingObjectId"),
                JsonUtil.get(jsonObj, "processingSeqNum"),JsonUtil.get(jsonObj, "processingTypeEnumId"),
                JsonUtil.get(jsonObj, "processingReasonType"),JsonUtil.get(jsonObj, "processingReason"),
                JsonUtil.get(jsonObj, "processingResultOpinion"),JsonUtil.get(jsonObj, "processingDesc"),
                new Date(),JsonUtil.get(jsonObj, "remarks"),
                JsonUtil.get(jsonObj, "createdBy"),new Date(),
                JsonUtil.get(jsonObj, "lastUpdatedBy"),new Date(),
                1,0,
                JsonUtil.get(jsonObj, "deletedBy"),new Date(),
                JsonUtil.get(jsonObj, "attribute1"),JsonUtil.get(jsonObj, "attribute2"),
                JsonUtil.get(jsonObj, "attribute3"),JsonUtil.get(jsonObj, "attribute4"),
                JsonUtil.get(jsonObj, "attribute5"),JsonUtil.get(jsonObj, "processingOrgId"),
                JsonUtil.get(jsonObj, "processingOrgName"),JsonUtil.get(jsonObj, "createdByName") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_GEN_PROCESSING_INFO_REC SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  GEN_PROCESSING_INFO_REC_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "genProcessingInfoRecId")};
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {

    } 

    @Override
    public Page page(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.GEN_PROCESSING_INFO_REC_ID as genProcessingInfoRecId ")
            .append(",A.PROCESS_INSTANCE_ID as processInstanceId ")
            .append(",A.ACTIVITY_INSTANCE_ID as activityInstanceId ")
            .append(",A.TASK_INSTANCE_ID as taskInstanceId ")
            .append(",A.PROCESSING_OBJECT_TABLE as processingObjectTable ")
            .append(",A.PROCESSING_OBJECT_ID as processingObjectId ")
            .append(",A.PROCESSING_SEQ_NUM as processingSeqNum ")
            .append(",A.PROCESSING_TYPE_ENUM_ID as processingTypeEnumId ")
            .append(",A.PROCESSING_REASON_TYPE as processingReasonType ")
            .append(",A.PROCESSING_REASON as processingReason ")
            .append(",A.PROCESSING_RESULT_OPINION as processingResultOpinion ")
            .append(",A.PROCESSING_DESC as processingDesc ")
            .append(",A.PROCESSING_EXPIRED_TIME as processingExpiredTime ")
            .append(",A.REMARKS as remarks ")
            .append(",A.CREATED_BY as createdBy ")
            .append(",A.CREATION_DATE as creationDate ")
            .append(",A.LAST_UPDATED_BY as lastUpdatedBy ")
            .append(",A.LAST_UPDATE_DATE as lastUpdateDate ")
            .append(",A.RECORD_VERSION as recordVersion ")
            .append(",A.DELETED_FLAG as deletedFlag ")
            .append(",A.DELETED_BY as deletedBy ")
            .append(",A.DELETION_DATE as deletionDate ")
            .append(",A.ATTRIBUTE1 as attribute1 ")
            .append(",A.ATTRIBUTE2 as attribute2 ")
            .append(",A.ATTRIBUTE3 as attribute3 ")
            .append(",A.ATTRIBUTE4 as attribute4 ")
            .append(",A.ATTRIBUTE5 as attribute5 ")
            .append(",A.PROCESSING_ORG_ID as processingOrgId ")
            .append(",A.ARCHIVE_BASE_DATE as archiveBaseDate ");
        sqlBuf.append(" from T_EOM_GEN_PROCESSING_INFO_REC A ")
            .append(" where 1=1");
      
        return super.getPageQuery(sqlBuf.toString(), jsonObj, list.toArray());
    } 

}  

