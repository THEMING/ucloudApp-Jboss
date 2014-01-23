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
 * @date 2013-03-08
 * @author MING
 */ 
@Repository
public class FlowindObjProcInsRelDAOImpl extends BaseDAOImpl implements IFlowindObjProcInsRelDAO {

    /**
     * 构造函数
     */
    public FlowindObjProcInsRelDAOImpl(){

    }

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.RELATION_ID as relationId ")
            .append(",A.FLOWING_OBJECT_TABLE as flowingObjectTable ")
            .append(",A.FLOWING_OBJECT_ID as flowingObjectId ")
            .append(",A.PROCESS_INSTANCE_ID as processInstanceId ")
            .append(",A.PARENT_PROCESS_INSTANCE_ID as parentProcessInstanceId ")
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
        sqlBuf.append(" from T_EOM_FLOWING_OBJ_PROC_INS_REL A ")
            .append(" where 1=1");
        
        if(JsonUtil.getString(jsonObj,"processInstID")!=null&&!"".equals(JsonUtil.getString(jsonObj,"processInstID"))){
            sqlBuf.append(" and A.PROCESS_INSTANCE_ID = "+JsonUtil.getString(jsonObj,"processInstID")+" ");
        }
        
        sqlBuf.append(" order by relationId desc");
      
        return super.getJdbcTemplate().queryForList(sqlBuf.toString());
    } 

    @Override
    public void save(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("INSERT INTO  T_EOM_FLOWING_OBJ_PROC_INS_REL(RELATION_ID ")
            .append(",FLOWING_OBJECT_TABLE,FLOWING_OBJECT_ID,PROCESS_INSTANCE_ID ")
            .append(",PARENT_PROCESS_INSTANCE_ID,CREATED_BY,CREATION_DATE,LAST_UPDATED_BY ")
            .append(",LAST_UPDATE_DATE,RECORD_VERSION,DELETED_BY,DELETION_DATE ")
            .append(",ATTRIBUTE1,ATTRIBUTE2,ATTRIBUTE3,ATTRIBUTE4,ATTRIBUTE5 )")
            .append("VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        // 获取序列号
        Long nextId = super.getNextUnisequence("EOM_TCM_ADB", "T_EOM_FLOWING_OBJ_PROC_INS_REL", "RELATION_ID");
        Object[] args = {nextId,JsonUtil.get(jsonObj, "flowingObjectTable"),
                JsonUtil.get(jsonObj, "flowingObjectId"),JsonUtil.get(jsonObj, "processInstanceId"),
                JsonUtil.get(jsonObj, "parentProcessInstanceId"),JsonUtil.get(jsonObj, "createdBy"),
                new Date(),JsonUtil.get(jsonObj, "lastUpdatedBy"),
                new Date(),1,
                JsonUtil.get(jsonObj, "deletedBy"),
                new Date(),JsonUtil.get(jsonObj, "attribute1"),
                JsonUtil.get(jsonObj, "attribute2"),JsonUtil.get(jsonObj, "attribute3"),
                JsonUtil.get(jsonObj, "attribute4"),JsonUtil.get(jsonObj, "attribute5") };
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void delete(JSONObject jsonObj) throws Exception {
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("UPDATE T_EOM_FLOWING_OBJ_PROC_INS_REL SET DELETED_BY = ?")
            .append(", DELETED_FLAG = ?")
            .append(", DELETION_DATE = ?")
            .append(" WHERE  RELATION_ID= ? ");
        Object[] args = {JsonUtil.get(jsonObj, "deletedBy"),JsonUtil.get(jsonObj, "deletedFlag"),
                JsonUtil.get(jsonObj, "deletionDate"),JsonUtil.get(jsonObj, "relationId")};
        super.update(sqlBuf.toString(), args);
    } 

    @Override
    public void update(JSONObject jsonObj) throws Exception {

    } 

    @Override
    public Page page(JSONObject jsonObj) throws Exception {
        List<Object> list = new ArrayList<Object>();
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("SELECT A.RELATION_ID as relationId ")
            .append(",A.FLOWING_OBJECT_TABLE as flowingObjectTable ")
            .append(",A.FLOWING_OBJECT_ID as flowingObjectId ")
            .append(",A.PROCESS_INSTANCE_ID as processInstanceId ")
            .append(",A.PARENT_PROCESS_INSTANCE_ID as parentProcessInstanceId ")
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
        sqlBuf.append(" from T_EOM_FLOWING_OBJ_PROC_INS_REL A ")
            .append(" where 1=1");
      
        return super.getPageQuery(sqlBuf.toString(), jsonObj, list.toArray());
    }

	@Override
	public void deleteBatch(JSONArray sheetList) throws Exception {
		StringBuffer sqlBuf = new StringBuffer();
		List<Object[]> list = new ArrayList();
		JSONObject jsonObj;
		for(int i = 0;i<sheetList.length();i++){
			jsonObj = (JSONObject) sheetList.get(i);
			Object[] obj = {JsonUtil.get(jsonObj, "deletedBy"),new Date(),JsonUtil.get(jsonObj, "cardSheetId")};
			list.add(obj);
		}
		sqlBuf.append("UPDATE T_EOM_FLOWING_OBJ_PROC_INS_REL SET DELETED_BY = ?")
		.append(", DELETED_FLAG = 1")
		.append(", DELETION_DATE = ?")
		.append(" WHERE FLOWING_OBJECT_ID = ? ");
		getJdbcTemplate().batchUpdate(sqlBuf.toString(),list);
		
	}



}  

