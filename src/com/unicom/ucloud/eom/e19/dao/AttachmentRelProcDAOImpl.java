package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;

/** 
 * 数据库层实现类 
 * @version 1.0
 * @date 2013-04-09
 * @author MING
 */ 
@Repository
public class AttachmentRelProcDAOImpl extends BaseDAOImpl implements IAttachmentRelProcDAO {

    /**
     * 构造函数
     */
    public AttachmentRelProcDAOImpl(){

    }

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.ATT_REL_PROC_ID as attRelProcId ")
            .append(",A.FLOWING_OBJECT_TABLE as flowingObjectTable ")
            .append(",A.FLOWING_OBJECT_ID as flowingObjectId ")
            .append(",A.ACTIVITY_INSTANCE_ID as activityInstanceId ")
            .append(",A.TASK_INSTANCE_ID as taskInstanceId ")
            .append(",A.ATTACHMENT_ID as attachmentId ")
            .append(",A.ATTACHMENT_NAME as attachmentName ")
            .append(",A.ATTACHMENT_TYPE_ENUM_ID as attachmentTypeEnumId ")
            .append(",A.ATTACHMENT_PURPOSE as attachmentPurpose ")
            .append(",A.ATTACHMENT_FORMAT_ENUM_ID as attachmentFormatEnumId ")
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
            .append(",A.ARCHIVE_BASE_DATE as archiveBaseDate ");
        sqlBuf.append(" from T_EOM_ATTACHMENT_REL_PROC A ")
            .append(" where 1=1");
      
        return super.getJdbcTemplate().queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_ATTACHMENT_REL_PROC(ATT_REL_PROC_ID ")
            .append(",FLOWING_OBJECT_TABLE,FLOWING_OBJECT_ID,ACTIVITY_INSTANCE_ID ")
            .append(",TASK_INSTANCE_ID,ATTACHMENT_ID,ATTACHMENT_NAME,ATTACHMENT_TYPE_ENUM_ID ")
            .append(",ATTACHMENT_PURPOSE,ATTACHMENT_FORMAT_ENUM_ID,REMARKS,CREATED_BY ")
            .append(",CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG ")
            .append(",DELETED_BY,DELETION_DATE,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4 ")
            .append(",ATTRIBUTE5,ARCHIVE_BASE_DATE ) ")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        Object[] args = {JsonUtil.get(jsonObj, "attRelProcId"),JsonUtil.get(jsonObj, "flowingObjectTable"),
                JsonUtil.get(jsonObj, "flowingObjectId"),JsonUtil.get(jsonObj, "activityInstanceId"),
                JsonUtil.get(jsonObj, "taskInstanceId"),JsonUtil.get(jsonObj, "attachmentId"),
                JsonUtil.get(jsonObj, "attachmentName"),JsonUtil.get(jsonObj, "attachmentTypeEnumId"),
                JsonUtil.get(jsonObj, "attachmentPurpose"),JsonUtil.get(jsonObj, "attachmentFormatEnumId"),
                JsonUtil.get(jsonObj, "remarks"),JsonUtil.get(jsonObj, "createdBy"),
                JsonUtil.get(jsonObj, "creationDate"),JsonUtil.get(jsonObj, "lastUpdatedBy"),
                JsonUtil.get(jsonObj, "lastUpdateDate"),JsonUtil.get(jsonObj, "recordVersion"),
                JsonUtil.get(jsonObj, "deletedFlag"),JsonUtil.get(jsonObj, "deletedBy"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "attribute1"),
                JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),
                JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5"),
                JsonUtil.get(jsonObj, "archiveBaseDate") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        List<Object> list = new ArrayList<Object>();
        sqlBuf.append("UPDATE T_EOM_ATTACHMENT_REL_PROC SET ")
            .append(" DELETED_FLAG = 1")
            .append(", DELETION_DATE = ?");
        list.add(new Date());
        if(jsonObj.has("deletedBy")){
            sqlBuf.append(",DELETED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"deletedBy"));
        }
        
        sqlBuf.append(" WHERE 1=1 ");
        
        if(jsonObj.has("objectId")){
            sqlBuf.append(" and FLOWING_OBJECT_ID = ? ");
            list.add(JsonUtil.get(jsonObj,"objectId"));
        }
        if(jsonObj.has("objectTable")){
            sqlBuf.append(" and FLOWING_OBJECT_TABLE = ? ");
            list.add(JsonUtil.get(jsonObj,"objectTable"));
        }
        if(jsonObj.has("attRelGenId")){
            sqlBuf.append(" and ATT_REL_PROC_ID = ? ");
            list.add(JsonUtil.get(jsonObj,"attRelGenId"));
        }
        

        super.update(sqlBuf.toString(), list.toArray());
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {

        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        StringBuffer updatePatten = new StringBuffer();
        sqlBuf.append("UPDATE  T_EOM_ATTACHMENT_REL_PROC SET ");
        if(jsonObj.has("attRelProcId")){
            updatePatten.append(",ATT_REL_PROC_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attRelProcId"));
        }
        if(jsonObj.has("flowingObjectTable")){
            updatePatten.append(",FLOWING_OBJECT_TABLE = ?");
            list.add(JsonUtil.get(jsonObj,"flowingObjectTable"));
        }
        if(jsonObj.has("flowingObjectId")){
            updatePatten.append(",FLOWING_OBJECT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"flowingObjectId"));
        }
        if(jsonObj.has("activityInstanceId")){
            updatePatten.append(",ACTIVITY_INSTANCE_ID = ?");
            list.add(JsonUtil.get(jsonObj,"activityInstanceId"));
        }
        if(jsonObj.has("taskInstanceId")){
            updatePatten.append(",TASK_INSTANCE_ID = ?");
            list.add(JsonUtil.get(jsonObj,"taskInstanceId"));
        }
        if(jsonObj.has("attachmentId")){
            updatePatten.append(",ATTACHMENT_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attachmentId"));
        }
        if(jsonObj.has("attachmentName")){
            updatePatten.append(",ATTACHMENT_NAME = ?");
            list.add(JsonUtil.get(jsonObj,"attachmentName"));
        }
        if(jsonObj.has("attachmentTypeEnumId")){
            updatePatten.append(",ATTACHMENT_TYPE_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attachmentTypeEnumId"));
        }
        if(jsonObj.has("attachmentPurpose")){
            updatePatten.append(",ATTACHMENT_PURPOSE = ?");
            list.add(JsonUtil.get(jsonObj,"attachmentPurpose"));
        }
        if(jsonObj.has("attachmentFormatEnumId")){
            updatePatten.append(",ATTACHMENT_FORMAT_ENUM_ID = ?");
            list.add(JsonUtil.get(jsonObj,"attachmentFormatEnumId"));
        }
        if(jsonObj.has("remarks")){
            updatePatten.append(",REMARKS = ?");
            list.add(JsonUtil.get(jsonObj,"remarks"));
        }
        if(jsonObj.has("createdBy")){
            updatePatten.append(",CREATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"createdBy"));
        }
        if(jsonObj.has("creationDate")){
            updatePatten.append(",CREATION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"creationDate"));
        }
        if(jsonObj.has("lastUpdatedBy")){
            updatePatten.append(",LAST_UPDATED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdatedBy"));
        }
        if(jsonObj.has("lastUpdateDate")){
            updatePatten.append(",LAST_UPDATE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"lastUpdateDate"));
        }
        if(jsonObj.has("recordVersion")){
            updatePatten.append(",RECORD_VERSION = ?");
            list.add(JsonUtil.get(jsonObj,"recordVersion"));
        }
        if(jsonObj.has("deletedFlag")){
            updatePatten.append(",DELETED_FLAG = ?");
            list.add(JsonUtil.get(jsonObj,"deletedFlag"));
        }
        if(jsonObj.has("deletedBy")){
            updatePatten.append(",DELETED_BY = ?");
            list.add(JsonUtil.get(jsonObj,"deletedBy"));
        }
        if(jsonObj.has("deletionDate")){
            updatePatten.append(",DELETION_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"deletionDate"));
        }
        if(jsonObj.has("attribute1")){
            updatePatten.append(",ATTRIBUTE1 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute1"));
        }
        if(jsonObj.has("attribute2")){
            updatePatten.append(",ATTRIBUTE2 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute2"));
        }
        if(jsonObj.has("attribute3")){
            updatePatten.append(",ATTRIBUTE3 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute3"));
        }
        if(jsonObj.has("attribute4")){
            updatePatten.append(",ATTRIBUTE4 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute4"));
        }
        if(jsonObj.has("attribute5")){
            updatePatten.append(",ATTRIBUTE5 = ?");
            list.add(JsonUtil.get(jsonObj,"attribute5"));
        }
        if(jsonObj.has("archiveBaseDate")){
            updatePatten.append(",ARCHIVE_BASE_DATE = ?");
            list.add(JsonUtil.get(jsonObj,"archiveBaseDate"));
        }
        updatePatten.append(", RECORD_VERSION = RECORD_VERSION+1");
        sqlBuf.append(updatePatten.substring(1));
        sqlBuf.append(" WHERE ATT_REL_PROC_ID = ?");
         list.add(JsonUtil.get(jsonObj, "attRelProcId"));
        super.update(sqlBuf.toString(), list.toArray());
    } 

    @Override
    public Page page(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.ATT_REL_PROC_ID as attRelProcId ")
            .append(",A.FLOWING_OBJECT_TABLE as flowingObjectTable ")
            .append(",A.FLOWING_OBJECT_ID as flowingObjectId ")
            .append(",A.ACTIVITY_INSTANCE_ID as activityInstanceId ")
            .append(",A.TASK_INSTANCE_ID as taskInstanceId ")
            .append(",A.ATTACHMENT_ID as attachmentId ")
            .append(",A.ATTACHMENT_NAME as attachmentName ")
            .append(",A.ATTACHMENT_TYPE_ENUM_ID as attachmentTypeEnumId ")
            .append(",A.ATTACHMENT_PURPOSE as attachmentPurpose ")
            .append(",A.ATTACHMENT_FORMAT_ENUM_ID as attachmentFormatEnumId ")
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
            .append(",A.ARCHIVE_BASE_DATE as archiveBaseDate ");
        sqlBuf.append(" from T_EOM_ATTACHMENT_REL_PROC A ")
            .append(" where 1=1");
      
        return super.getPageQuery(sqlBuf.toString(), jsonObj, list.toArray());
    } 
    
    @Override
    public void addBatch(JSONArray jsonArray,String tableName,Long tempId) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        List<Object[]> list = new ArrayList();
        JSONObject jsonObj;
        Long nextId = null;
        for(int i=0;i<jsonArray.length();i++){
            jsonObj = (JSONObject) jsonArray.get(i);
                    nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_ATTACHMENT_REL_PROC", "ATT_REL_PROC_ID");
//            Object obj[] = {nextId, tableName,
//                    tempId,JsonUtil.get(jsonObj, "attachmentId"),
//                    JsonUtil.get(jsonObj, "attachmentName"),JsonUtil.get(jsonObj, "attachmentTypeEnumId"),
//                    JsonUtil.get(jsonObj, "attachmentPurpose"),JsonUtil.get(jsonObj, "attachmentFormatEnumId"),
//                    JsonUtil.get(jsonObj, "remarks"),JsonUtil.get(jsonObj, "createdBy"),
//                    new Date(),JsonUtil.get(jsonObj, "lastUpdatedBy"),
//                    new Date(),1,
//                    0,JsonUtil.get(jsonObj, "deletedBy"),
//                    new Date(),JsonUtil.get(jsonObj, "attribute1"),
//                    JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),
//                    JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5")};
            
            Object[] obj = {nextId,tableName,
                    tempId,JsonUtil.get(jsonObj, "activityInstanceId"),
                    JsonUtil.get(jsonObj, "taskInstanceId"),JsonUtil.get(jsonObj, "attachmentId"),
                    JsonUtil.get(jsonObj, "attachmentName"),JsonUtil.get(jsonObj, "attachmentTypeEnumId"),
                    JsonUtil.get(jsonObj, "attachmentPurpose"),JsonUtil.get(jsonObj, "attachmentFormatEnumId"),
                    JsonUtil.get(jsonObj, "remarks"),JsonUtil.get(jsonObj, "createdBy"),
                    new Date(),JsonUtil.get(jsonObj, "lastUpdatedBy"),
                    new Date(),1,
                    0,JsonUtil.get(jsonObj, "deletedBy"),
                    new Date(),JsonUtil.get(jsonObj, "attribute1"),
                    JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),
                    JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5"),
                    JsonUtil.get(jsonObj, "uploadedByPersonId"),JsonUtil.get(jsonObj, "uploadedByPersonName"),
                    JsonUtil.get(jsonObj, "uploadedByOrgId"),JsonUtil.get(jsonObj, "uploadedByOrgName")};
            
            list.add(obj);
        }
        
//        sqlBuf.append("INSERT INTO  T_EOM_ATTACHMENT_REL_GEN(ATT_REL_GEN_ID,OBJECT_TABLE ")
//        .append(",OBJECT_ID,ATTACHMENT_ID,ATTACHMENT_NAME,ATTACHMENT_TYPE_ENUM_ID ")
//        .append(",ATTACHMENT_PURPOSE,ATTACHMENT_FORMAT_ENUM_ID,REMARKS,CREATED_BY ")
//        .append(",CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG ")
//        .append(",DELETED_BY,DELETION_DATE,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4 ")
//        .append(",ATTRIBUTE5 )")
//        .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        
        
        sqlBuf.append("INSERT INTO  T_EOM_ATTACHMENT_REL_PROC(ATT_REL_PROC_ID ")
        .append(",FLOWING_OBJECT_TABLE,FLOWING_OBJECT_ID,ACTIVITY_INSTANCE_ID ")
        .append(",TASK_INSTANCE_ID,ATTACHMENT_ID,ATTACHMENT_NAME,ATTACHMENT_TYPE_ENUM_ID ")
        .append(",ATTACHMENT_PURPOSE,ATTACHMENT_FORMAT_ENUM_ID,REMARKS,CREATED_BY ")
        .append(",CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG ")
        .append(",DELETED_BY,DELETION_DATE,ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4 ")
        .append(",ATTRIBUTE5,UPLOADED_BY_PERSON_ID,UPLOADED_BY_PERSON_NAME,UPLOADED_BY_ORG_ID,UPLOADED_BY_ORG_NAME ) ")
        .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    
        
        getJdbcTemplate().batchUpdate(sqlBuf.toString(), list);
        
    }

}  

