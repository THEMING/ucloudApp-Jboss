package com.unicom.ucloud.eom.e19.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.util.JsonUtil;
@Repository
public class EomDisAssignObjectListDAOImpl extends BaseDAOImpl implements IEomDisAssignObjectListDAO {

        @Override
        public void saveDisAssignObject(JSONObject jsonObj) throws Exception {
            StringBuffer sqlBuf = new StringBuffer();

            sqlBuf.append("INSERT INTO T_EOM_DIS_ASSIGN_OBJECT_LIST ")
                  .append("(DIS_ASSIGN_ORG_LIST_ID,PROCESS_INSTANCE_ID,")
                  .append("ACTIVITY_DEF_ID,ACTIVITY_INSTANCE_ID,TASK_INSTANCE_ID,")
                  .append("DIS_OBJECT_TABLE,DIS_OBJECT_ID,DIS_ASSIGN_TYPE_ENUM_ID,")
                  .append("DIS_ASSIGN_OBJECT_TYPE_ENUM_ID,DIS_ASSIGN_OBJECT_ID,")
                  .append("DIS_ASSIGN_OBJECT_NAME,DIS_ASSIGN_OPINION,DIS_ASSIGN_DESC,")
                  .append("REMARKS," )
                  .append("CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,")
                  .append("LAST_UPDATE_DATE,RECORD_VERSION,DELETED_FLAG,DELETED_BY,DELETION_DATE,")
                  .append("ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5)")
                  .append(" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

            Long disAssignOrgListId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_DIS_ASSIGN_OBJECT_LIST",
                    "DIS_ASSIGN_ORG_LIST_ID");
            Object[] args = {
                    disAssignOrgListId,
                    JsonUtil.get(jsonObj, "processInstId"),
                    JsonUtil.get(jsonObj, "activityDefId"),
                    JsonUtil.get(jsonObj, "activityInstanceId"),
                    JsonUtil.get(jsonObj, "taskInstanceId"),
                    "T_EOM_CARD_SHEET",
                    JsonUtil.get(jsonObj, "workOrderId"),
                    JsonUtil.get(jsonObj, "disAssignTypeEnumId"),
                    JsonUtil.get(jsonObj, "disAssignObjectTypeEnumId"),
                    JsonUtil.get(jsonObj, "disAssignObjectId"),
                    JsonUtil.get(jsonObj, "disAssignObjectName"),
                    JsonUtil.get(jsonObj, "disAssignOpinion"),
                    JsonUtil.get(jsonObj, "disAssignDesc"),
                    JsonUtil.get(jsonObj, "remarks"),
                    JsonUtil.get(jsonObj, "createdBy"),
                    JsonUtil.get(jsonObj, "creationDate"),
                    JsonUtil.get(jsonObj, "lastUpdatedBy"),
                    JsonUtil.get(jsonObj, "lastUpdateDate"),
                    1,// 版本号
                    0,// DELETED_FLAG
                    JsonUtil.get(jsonObj, "deletedBy"),
                    JsonUtil.get(jsonObj, "deletionDate"),
                    JsonUtil.getString(jsonObj, "attribute1"),
                    JsonUtil.getString(jsonObj, "attribute2"),
                    JsonUtil.getString(jsonObj, "attribute3"),
                    JsonUtil.getString(jsonObj, "attribute4"),
                    JsonUtil.getString(jsonObj, "attribute5") };

            super.update(sqlBuf.toString(), args);
            
        }
        
        @Override
        public List<Map<String, Object>> qryDisAssignObjectListByParam(JSONObject jsonObj) throws Exception {
            StringBuffer sqlBuf = new StringBuffer();
            sqlBuf.append("SELECT  a.DIS_ASSIGN_ORG_LIST_ID as disAssignOrgListId,")
                    .append(" a.DIS_ASSIGN_TYPE_ENUM_ID as disAssignTypeEnumId, ")
                    .append(" a.DIS_ASSIGN_OBJECT_TYPE_ENUM_ID as disAssignObjectTypeEnumId,")
                    .append(" a.DIS_ASSIGN_OBJECT_ID as disAssignObjectId,")
                    .append(" a.DIS_ASSIGN_OBJECT_NAME as disAssignObjectName,")
                    .append(" a.DIS_ASSIGN_OPINION as disAssignOpinion,")
                    .append(" a.DIS_ASSIGN_DESC as disAssignDesc ")
                    .append(" FROM  T_EOM_DIS_ASSIGN_OBJECT_LIST  a ")
                    .append("where 1=1 and DELETED_FLAG=0 ");

            if (JsonUtil.get(jsonObj, "workOrderId") != null
                    && JsonUtil.getLong(jsonObj, "workOrderId") != null) {
                sqlBuf.append(" and a.DIS_OBJECT_ID =").append(
                        JsonUtil.getLong(jsonObj, "workOrderId"));
            }
            if (JsonUtil.get(jsonObj, "processInstId") != null
                    && JsonUtil.getLong(jsonObj, "processInstId") != null) {
                sqlBuf.append(" and a.PROCESS_INSTANCE_ID =").append(
                        JsonUtil.getLong(jsonObj, "processInstId"));
            }
            if (JsonUtil.get(jsonObj, "activityId") != null
                    && JsonUtil.getLong(jsonObj, "activityId") != null) {
                sqlBuf.append(" and a.ACTIVITY_INSTANCE_ID =").append(
                        JsonUtil.getLong(jsonObj, "activityId"));
            }
            if (JsonUtil.get(jsonObj, "taskId") != null
                    && JsonUtil.getLong(jsonObj, "taskId") != null) {
                sqlBuf.append(" and a.TASK_INSTANCE_ID =").append(
                        JsonUtil.getLong(jsonObj, "taskId"));
            }
            logger.info("查询调度派发对象表" + sqlBuf);
            return super.queryForList(sqlBuf.toString());
        }

        @Override
        public void update(JSONObject jsonObj) throws Exception {
            StringBuffer sqlBuf = new StringBuffer();
            List li = new ArrayList();
            
            sqlBuf.append("UPDATE T_EOM_DIS_ASSIGN_OBJECT_LIST SET LAST_UPDATE_DATE = ? ");
            li.add(new Date());
            
            if (JsonUtil.get(jsonObj, "disAssignObjectTypeEnumId") != null
                    && JsonUtil.getLong(jsonObj, "disAssignObjectTypeEnumId") != null) {
                sqlBuf.append(" ,DIS_ASSIGN_OBJECT_TYPE_ENUM_ID = ? ");
                li.add(JsonUtil.getLong(jsonObj, "disAssignObjectTypeEnumId"));
            }
            if (JsonUtil.get(jsonObj, "disAssignObjectId") != null
                    && JsonUtil.getLong(jsonObj, "disAssignObjectId") != null) {
                sqlBuf.append(" ,DIS_ASSIGN_OBJECT_ID = ? ");
                li.add(JsonUtil.getLong(jsonObj, "disAssignObjectId"));
            }
            if (JsonUtil.get(jsonObj, "auditName") != null
                    && JsonUtil.getString(jsonObj, "auditName") != null) {
                sqlBuf.append(" ,DIS_ASSIGN_OBJECT_NAME = ? ");
                li.add(JsonUtil.getString(jsonObj, "auditName"));
            }
            if (JsonUtil.get(jsonObj, "staffId") != null
                    && JsonUtil.getLong(jsonObj, "staffId") != null) {
                sqlBuf.append(" ,LAST_UPDATED_BY = ? ");
                li.add(JsonUtil.get(jsonObj, "staffId"));
            }
            if (JsonUtil.get(jsonObj, "deletedFlag") != null
                    && JsonUtil.getLong(jsonObj, "deletedFlag") != null) {
                sqlBuf.append(" ,DELETED_FLAG = ? ");
                li.add(JsonUtil.get(jsonObj, "deletedFlag"));
            }
            
            sqlBuf.append(" WHERE 1=1 ");
            
            if (JsonUtil.get(jsonObj, "workOrderId") != null
                    && JsonUtil.getLong(jsonObj, "workOrderId") != null) {
                sqlBuf.append(" and DIS_OBJECT_ID = ? ");
                li.add(JsonUtil.get(jsonObj, "workOrderId"));
            }else{
                logger.info("没有传入限制条件，避免全表更新，不能进行更新操作");
                return;
            }
            
            if (JsonUtil.get(jsonObj, "activityId") != null
                    && JsonUtil.getLong(jsonObj, "activityId") != null) {
                sqlBuf.append(" and ACTIVITY_DEF_ID = ? ");
                li.add(JsonUtil.get(jsonObj, "activityId"));
            }
            
//            sqlBuf.append("UPDATE T_EOM_DIS_ASSIGN_OBJECT_LIST SET DIS_ASSIGN_OBJECT_TYPE_ENUM_ID = ?")
//                .append(", DIS_ASSIGN_OBJECT_ID = ?")
//                .append(", DIS_ASSIGN_OBJECT_NAME = ?")
//                .append(", LAST_UPDATE_DATE = ?")
//                .append(", LAST_UPDATED_BY = ?")
//                .append(" WHERE  DIS_OBJECT_ID= ? and TASK_INSTANCE_ID = 0");
//            Object[] args = {JsonUtil.get(jsonObj, "disAssignObjectTypeEnumId"),
//                    JsonUtil.get(jsonObj, "disAssignObjectId"),
//                    JsonUtil.get(jsonObj, "auditName"),
//                    new Date(),JsonUtil.get(jsonObj, "staffId"),
//                    JsonUtil.get(jsonObj, "workOrderId")};
            logger.info("更新调度派发对象表" + sqlBuf);
            super.update(sqlBuf.toString(), li.toArray());
            
        }
        
    

   
}
