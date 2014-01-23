package com.unicom.ucloud.eom.e19.dao;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.BaseDAOImpl;
import com.unicom.ucloud.eom.e19.action.TestCardCommonAction;
import com.unicom.ucloud.util.JsonUtil;
@Repository
public class TestCardCommonDAOImpl extends BaseDAOImpl implements ITestCardCommonDAO {
    private static Logger logger = Logger.getLogger(TestCardCommonDAOImpl.class);
    
    @Override
    public List<Map<String, Object>> qryOpearateHisList(JSONObject jsonObj) throws Exception {
        StringBuilder sql = new StringBuilder("SELECT CREATION_DATE operateTime,CREATED_BY_NAME operator,CREATED_BY createdBy,PROCESSING_ORG_NAME operatorDep," )
        .append(" PROCESSING_TYPE_ENUM_ID operateType,case PROCESSING_TYPE_ENUM_ID when 3 then '草稿制定并派发' when 4 then '回单处理' when 5 then '修改' when 6 then '签收' when 8 then '转办' when 10 then '撤单'" +
        		" when 11 then '审核' when 12 then '执行' when 13 then '接收' else '' end as operateTypeName2,PROCESSING_RESULT_OPINION operateResult,PROCESSING_DESC operateContent," )
//        .append(" REMARKS remarks FROM t_eom_gen_processing_info_rec where PROCESS_INSTANCE_ID =?");    
        .append(" REMARKS remarks, 1 processingObjType FROM t_eom_gen_processing_info_rec where PROCESSING_OBJECT_ID =? ORDER BY CREATION_DATE DESC");
        logger.debug(">>>>>qryOpearateHisList:"+sql.toString());
//        return super.queryForList(sql.toString(), JsonUtil.get(jsonObj, "processId"));
        return super.queryForList(sql.toString(), JsonUtil.get(jsonObj, "processingObjectId"));
    }
    
    @Override
    public Page queryByPage(JSONObject jsonObj) throws Exception {
        //List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.ATT_REL_GEN_ID as attRelGenId ")
            .append(",A.OBJECT_TABLE as objectTable ")
            .append(",A.OBJECT_ID as objectId ")
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
        sqlBuf.append(" from T_EOM_ATTACHMENT_REL_GEN A ")
            .append(" where DELETED_FLAG=0 ");
        if(JsonUtil.get(jsonObj,"objectTable")!=null&&!JsonUtil.get(jsonObj,"objectTable").equals("")){
        /*  sqlBuf.append(" AND A.OBJECT_TABLE=? ");
            list.add(JsonUtil.get(jsonObj,"objectTable"));*/
            sqlBuf.append(" AND A.OBJECT_TABLE='").append(jsonObj.get("objectTable")).append("'");
        }
        if(JsonUtil.get(jsonObj,"objectId")!=null&&!JsonUtil.get(jsonObj,"objectId").equals("")){
        /*  sqlBuf.append(" AND A.OBJECT_ID=? ");
            list.add(JsonUtil.get(jsonObj,"objectId"));*/
            sqlBuf.append(" AND A.OBJECT_ID='").append(jsonObj.get("objectId")).append("'");
        }
        //Object args = list.toArray();
       Page page = getPageQuery(sqlBuf.toString(), jsonObj);
       return page;
    }
    
    //附件刘晨个相关表
    @Override
    public Page queryByPageProc(JSONObject jsonObj) throws Exception {
        //List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.ATT_REL_PROC_ID as attRelGenId ")
            .append(",A.FLOWING_OBJECT_TABLE as objectTable ")
            .append(",A.FLOWING_OBJECT_ID as objectId ")
            .append(",A.ATTACHMENT_ID as attachmentId ")
            .append(",A.ATTACHMENT_NAME as attachmentName ")
            .append(",A.ATTACHMENT_TYPE_ENUM_ID as attachmentTypeEnumId ")
            .append(",A.ATTACHMENT_PURPOSE as attachmentPurpose ")
            .append(",A.ATTACHMENT_FORMAT_ENUM_ID as attachmentFormatEnumId ")
            .append(",A.REMARKS as remarks ")
            .append(",A.CREATED_BY as createdBy ")
            .append(",A.UPLOADED_BY_PERSON_ID as uploadedByPersonId ")
            .append(",A.UPLOADED_BY_PERSON_NAME as uploadedByPersonName ")
            .append(",A.UPLOADED_BY_ORG_ID as uploadedByOrgId ")
            .append(",A.UPLOADED_BY_ORG_NAME as uploadedByOrgName ")
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
            .append(",A.ATTRIBUTE5 as attribute5 ");
        sqlBuf.append(" from T_EOM_ATTACHMENT_REL_PROC A ")
            .append(" where DELETED_FLAG=0 ");
        if(JsonUtil.get(jsonObj,"objectTable")!=null&&!JsonUtil.get(jsonObj,"objectTable").equals("")){
        /*  sqlBuf.append(" AND A.OBJECT_TABLE=? ");
            list.add(JsonUtil.get(jsonObj,"objectTable"));*/
            sqlBuf.append(" AND A.FLOWING_OBJECT_TABLE='").append(jsonObj.get("objectTable")).append("'");
        }
        if(JsonUtil.get(jsonObj,"objectId")!=null&&!JsonUtil.get(jsonObj,"objectId").equals("")){
        /*  sqlBuf.append(" AND A.OBJECT_ID=? ");
            list.add(JsonUtil.get(jsonObj,"objectId"));*/
            sqlBuf.append(" AND A.FLOWING_OBJECT_ID='").append(jsonObj.get("objectId")).append("'");
        }
        if(JsonUtil.get(jsonObj,"activityInstanceId")!=null&&!JsonUtil.get(jsonObj,"activityInstanceId").equals("")){
            /*  sqlBuf.append(" AND A.OBJECT_ID=? ");
                list.add(JsonUtil.get(jsonObj,"objectId"));*/
                sqlBuf.append(" AND A.ACTIVITY_INSTANCE_ID='").append(jsonObj.get("activityInstanceId")).append("'");
            }
        if(JsonUtil.get(jsonObj,"taskInstanceId")!=null&&!JsonUtil.get(jsonObj,"taskInstanceId").equals("")){
            /*  sqlBuf.append(" AND A.OBJECT_ID=? ");
                list.add(JsonUtil.get(jsonObj,"objectId"));*/
                sqlBuf.append(" AND A.TASK_INSTANCE_ID='").append(jsonObj.get("taskInstanceId")).append("'");
            }
        //Object args = list.toArray();
       Page page = getPageQuery(sqlBuf.toString(), jsonObj);
       return page;
    }

}
