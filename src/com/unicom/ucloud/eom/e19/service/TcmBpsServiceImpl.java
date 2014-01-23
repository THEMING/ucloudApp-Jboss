package com.unicom.ucloud.eom.e19.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eos.das.entity.criteria.ExprType;
import com.eos.workflow.api.BPSServiceClientFactory;
import com.eos.workflow.api.IBPSServiceClient;
import com.eos.workflow.api.IWFDefinitionQueryManager;
import com.eos.workflow.data.WFActivityDefine;
import com.eos.workflow.data.WFProcessDefine;
import com.primeton.ucloud.workflow.factory.BPMServiceFactory;
import com.primeton.ucloud.workflow.impl.Global;
import com.primeton.workflow.api.PageCond;
import com.primeton.workflow.api.WFServiceException;
import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.dto.WorkFlowParamDto;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl;
import com.unicom.ucloud.eom.base.workflow.WorkflowMana;
import com.unicom.ucloud.eom.e19.dao.IGenProcessingInfoRecDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.workflow.exceptions.WFException;
import com.unicom.ucloud.workflow.filters.TaskFilter;
import com.unicom.ucloud.workflow.interfaces.WorkflowObjectInterface;
import com.unicom.ucloud.workflow.objects.ActivityDef;
import com.unicom.ucloud.workflow.objects.PageCondition;
import com.unicom.ucloud.workflow.objects.Participant;
import com.unicom.ucloud.workflow.objects.ProcessModel;
import com.unicom.ucloud.workflow.objects.ProcessModelParams;
import com.unicom.ucloud.workflow.objects.TaskInstance;

@Service
public class TcmBpsServiceImpl extends BaseServiceImpl implements ITcmBpsService {
//    private static final String processDefName="com.unicom.ucloud.eom.e22.managerSetting";
//    @Autowired
//    private static BPMServiceFactory factory;
//    @Autowired
//    private static WorkflowObjectInterface workflow;
    @Autowired
    private IGenProcessingInfoRecDAO infoRecDao;


//    private String processInstId;
//    public void init(String loginId) {
//        factory = BPMServiceFactory.getInstance();
//        try {
//            workflow = factory.getWorkflowService(loginId, "tenancy_id", null);
//            System.out.println("workflow context 初始化成功");
//       race();
//            System.out.println("workflow context 初始化失败");
//        }
//    }

//    /**
//     * 创建并启动流程
//     * @throws Exception 
//     */
//    @Override
//    public String createAndStartProcessInst(JSONObject jsonObj) throws Exception{
//        init();
//        ProcessModelParams processModelParams = new ProcessModelParams();
//        Participant participant = new Participant();
//        participant.setAccountID(JsonUtil.getString(jsonObj, "accountId"));
//        processModelParams.setProcessModelName(processDefName);
//        processModelParams.setProcessInstName(JsonUtil.getString(jsonObj, "processInstName"));
//        String processInstDesc = JsonUtil.getString(jsonObj, "processInstDesc");
//        processInstId = workflow.startProcess(processDefName, processModelParams, participant, processInstDesc);
//        logger.debug("流程实例启动成功，流程实例ID："+processInstId);
//        return processInstId;
//    }
//
    /**
     * 查询我的待办
     * @throws Exception 
     */
    @Override
    public Map<String,Object> queryMyUndoTasks(JSONObject jsonObj) throws Exception{
        
//        init(JsonUtil.getString(jsonObj, "loginId"));
        //Page p  = new Page();
        PageCondition page = new PageCondition();
        page.setBegin(JsonUtil.getInt(jsonObj, "start"));
        page.setLength(JsonUtil.getInt(jsonObj, "limit"));
        page.setIsCount(true);
        String startTime = JsonUtil.getString(jsonObj, "startTime");
        String endTime = JsonUtil.getString(jsonObj, "endTime");
        String processDefId = JsonUtil.getString(jsonObj, "processDefId");
        String activityDefId = JsonUtil.getString(jsonObj, "activityDefId");
        String jobTitle = JsonUtil.getString(jsonObj, "jobTitle");
        String senderId = JsonUtil.getString(jsonObj, "sendPersonId");
        TaskFilter filter = new TaskFilter();
        List<Object> l = new ArrayList<Object>();
        if(JsonUtil.getString(jsonObj, "woNoQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "woNoQry"))){System.out.println("222");
          //扩展字段查询↓
            ExprType ll =ExprType.FACTORY.create();
            ll.set_opEnum(ExprType.OP.LIKE);
            ll.set_likeRuleEnum(ExprType.LIKERULE.ALL);
            ll.set_value(JsonUtil.getString(jsonObj, "woNoQry"));//194681
            ll.set_property(Global.BIZ_STRCOLUMN1.toLowerCase());
            l.add(ll);
          //扩展字段查询↑
        }
        if(JsonUtil.getString(jsonObj, "flowExecutorQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "flowExecutorQry"))){
            //扩展字段查询↓
              ExprType ll =ExprType.FACTORY.create();
              ll.set_opEnum(ExprType.OP.EQ);
              ll.set_value(JsonUtil.getString(jsonObj, "flowExecutorQry"));//194681
              ll.set_property(Global.BIZ_STRCOLUMN2.toLowerCase());
              l.add(ll);
            //扩展字段查询↑
          }
        if(JsonUtil.getString(jsonObj, "urgencyLevelQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "urgencyLevelQry"))){
            //扩展字段查询↓
              ExprType ll =ExprType.FACTORY.create();
              ll.set_opEnum(ExprType.OP.EQ);
              ll.set_value(JsonUtil.getString(jsonObj, "urgencyLevelQry"));//194681
              ll.set_property(Global.BIZ_NUMCOLUMN1.toLowerCase());
              l.add(ll);
            //扩展字段查询↑
          }
        if(JsonUtil.getString(jsonObj, "requiredFinishTimeStartQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTimeStartQry"))
                &&JsonUtil.getString(jsonObj, "requiredFinishTimeEndQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTimeEndQry"))){
            //扩展字段查询↓
            String patter = "yyyy-MM-dd HH:mm:ss";
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
            SimpleDateFormat sdf = new SimpleDateFormat(patter);
            ExprType ll =ExprType.FACTORY.create();
            ll.set_opEnum(ExprType.OP.BETWEEN);
            ll.set_property(Global.DA_COLUMN1.toLowerCase());
            ll.set_pattern(patter);
            ll.set_max(JsonUtil.getString(jsonObj, "requiredFinishTimeEndQry"));
            ll.set_min(JsonUtil.getString(jsonObj, "requiredFinishTimeStartQry"));
            l.add(ll);
            //扩展字段查询↑
          }
        filter.setBizExprDataObject(l);
        if(processDefId != null && processDefId.toString().trim().length()>0){
            filter.setProcessModelName(processDefId.toString().trim());//setProcessModelID
            if(activityDefId != null && activityDefId.trim().length()>0){
//                filter.setActivityID(activityDefId.trim());
                filter.setActivityDefId(activityDefId.trim());
            }
        }
        if(jobTitle != null && jobTitle.trim().length()>0){
            filter.setJobTitle(jobTitle);
        }
        if(senderId != null && senderId.trim().length()>0){
            filter.setSenderID(senderId.trim());
        }
        if(startTime != null && startTime.trim().length()>0){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Date date = (Date) sdf.parse(startTime);
                filter.setBeginStartDate(date);
            } catch (ParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        if(endTime != null && endTime.trim().length()>0){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Date date = (Date) sdf.parse(endTime);
                filter.setEndStartDate(date);
            } catch (ParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        //filter.setPageCondition(page);
//        List<TaskInstance> tasks = workflow.getMyWaitingTasks(filter);
        
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginId"));
        // paramDto.setAccountPassWord("passWord");
        // filter.setProcessModelID("com.unicom.ucloud.eom.eo4.agentstaff.staffAudit");

        filter.setPageCondition(page);
        paramDto.setFilter(filter);
        WorkflowMana wf = new WorkflowMana();
        Map<String,Object> m = wf.queryMyTasks(paramDto);
        List<TaskInstance> tasks = (List<TaskInstance>) MapUtils.getObject(m, "resultList");
        
        
        
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(TaskInstance t:tasks){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("taskInstID", t.getTaskInstID());
            map.put("jobTitle", t.getJobTitle());
            map.put("processModelId", t.getProcessModelId());
            map.put("flowType", t.getProcessModelCNName());
            map.put("processModelName", t.getProcessModelName());
            map.put("processInstID", t.getProcessInstID());
            map.put("activityInstName", t.getActivityInstName());
            map.put("activityInstID", t.getActivityInstID());
            map.put("formUrl", t.getFormURL());
            map.put("senderID", t.getSenderID());
            map.put("endDate", t.getEndDate()==null?"":sdf.format(t.getEndDate()));
            map.put("createDate", t.getCreateDate()==null?"":sdf.format(t.getCreateDate()));
            map.put("currentState",t.getCurrentState());
            map.put("workOrderId",t.getJobID());
            
            map.put("jobCode", t.getJobCode());//工单编码
            map.put("jobStarttime", t.getJobStarttime() == null ? "" : sdf.format(t.getJobStarttime()));
            map.put("jobEndtime", t.getJobEndtime() == null ? "" : sdf.format(t.getJobEndtime()));
            map.put("reBacktime", t.getReBacktime() == null ? "" : sdf.format(t.getReBacktime()));
            map.put("taskWarning", t.getTaskWarning());//是否超时，1超时0不超时

            list.add(map);
        }
        
        
        Map ma = new HashMap();
        ma.put("list", list);
        ma.put("count", MapUtils.getString(m, "total"));
        return ma;
    }
    
    /**
     * 查询我的已办
     * @throws Exception 
     */
    @Override
    public Map<String,Object> getMyWorkedTasks(JSONObject jsonObj) throws Exception{
        
//        init(JsonUtil.getString(jsonObj, "loginId"));
        //Page p  = new Page();
        PageCondition page = new PageCondition();
        page.setBegin(JsonUtil.getInt(jsonObj, "start"));
        page.setLength(JsonUtil.getInt(jsonObj, "limit"));
        page.setIsCount(true);
        String startTime = JsonUtil.getString(jsonObj, "startTime");
        String endTime = JsonUtil.getString(jsonObj, "endTime");
        String processDefId = JsonUtil.getString(jsonObj, "processDefId");
        String activityDefId = JsonUtil.getString(jsonObj, "activityDefId");
        String jobTitle = JsonUtil.getString(jsonObj, "jobTitle");
        String senderId = JsonUtil.getString(jsonObj, "sendPersonId");
        TaskFilter filter = new TaskFilter();
        List<Object> l = new ArrayList<Object>();
        if(JsonUtil.getString(jsonObj, "woNoQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "woNoQry"))){
            //扩展字段查询↓
              ExprType ll =ExprType.FACTORY.create();
              ll.set_opEnum(ExprType.OP.LIKE);
              ll.set_likeRuleEnum(ExprType.LIKERULE.ALL);
              ll.set_value(JsonUtil.getString(jsonObj, "woNoQry"));//194681
              ll.set_property(Global.BIZ_STRCOLUMN1.toLowerCase());
              l.add(ll);
            //扩展字段查询↑
          }
        if(JsonUtil.getString(jsonObj, "flowExecutorQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "flowExecutorQry"))){
            //扩展字段查询↓
              ExprType ll =ExprType.FACTORY.create();
              ll.set_opEnum(ExprType.OP.EQ);
              ll.set_value(JsonUtil.getString(jsonObj, "flowExecutorQry"));//194681
              ll.set_property(Global.BIZ_STRCOLUMN2.toLowerCase());
              l.add(ll);
            //扩展字段查询↑
          }
        if(JsonUtil.getString(jsonObj, "urgencyLevelQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "urgencyLevelQry"))){
            //扩展字段查询↓
              ExprType ll =ExprType.FACTORY.create();
              ll.set_opEnum(ExprType.OP.EQ);
              ll.set_value(JsonUtil.getString(jsonObj, "urgencyLevelQry"));//194681
              ll.set_property(Global.BIZ_NUMCOLUMN1.toLowerCase());
              l.add(ll);
            //扩展字段查询↑
          }
        if(JsonUtil.getString(jsonObj, "requiredFinishTimeStartQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTimeStartQry"))
                &&JsonUtil.getString(jsonObj, "requiredFinishTimeEndQry")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTimeEndQry"))){
            //扩展字段查询↓
            String patter = "yyyy-MM-dd HH:mm:ss";
            SimpleDateFormat sdf = new SimpleDateFormat(patter);
            ExprType ll =ExprType.FACTORY.create();
            ll.set_opEnum(ExprType.OP.BETWEEN);
            ll.set_property(Global.DA_COLUMN1.toLowerCase());
            ll.set_pattern(patter);
            ll.set_max(JsonUtil.getString(jsonObj, "requiredFinishTimeEndQry"));
            ll.set_min(JsonUtil.getString(jsonObj, "requiredFinishTimeStartQry"));
            l.add(ll);
            //扩展字段查询↑
          }
        filter.setBizExprDataObject(l);
        if(processDefId != null && processDefId.toString().trim().length()>0){
            filter.setProcessModelName(processDefId.toString().trim());//setProcessModelID
            if(activityDefId != null && activityDefId.trim().length()>0){
//                filter.setActivityID(activityDefId.trim());
                filter.setActivityDefId(activityDefId.trim());
            }
        }
        if(jobTitle != null && jobTitle.trim().length()>0){
            filter.setJobTitle(jobTitle);
        }
        if(senderId != null && senderId.trim().length()>0){
            filter.setSenderID(senderId.trim());
        }
        if(startTime != null && startTime.trim().length()>0){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Date date = (Date) sdf.parse(startTime);
                filter.setBeginStartDate(date);
            } catch (ParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        if(endTime != null && endTime.trim().length()>0){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Date date = (Date) sdf.parse(endTime);
                filter.setEndStartDate(date);
            } catch (ParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        //filter.setPageCondition(page);
//        List<TaskInstance> tasks = workflow.getMyWaitingTasks(filter);
        
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginId"));
        // paramDto.setAccountPassWord("passWord");
        // filter.setProcessModelID("com.unicom.ucloud.eom.eo4.agentstaff.staffAudit");

        filter.setPageCondition(page);
        paramDto.setFilter(filter);
        WorkflowMana wf = new WorkflowMana();
        Map<String,Object> m = wf.getMyCompletedTasks(paramDto);
        List<TaskInstance> tasks = (List<TaskInstance>) MapUtils.getObject(m, "resultList");
        
        
        
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(TaskInstance t:tasks){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("taskInstID", t.getTaskInstID());
            map.put("jobTitle", t.getJobTitle());
            map.put("jobId", t.getJobID());
            map.put("processModelId", t.getProcessModelId());
            map.put("flowType", t.getProcessModelCNName());
            map.put("processModelName", t.getProcessModelName());
            map.put("processInstID", t.getProcessInstID());
            map.put("activityInstName", t.getActivityInstName());
            map.put("activityInstID", t.getActivityInstID());
            map.put("formUrl", t.getFormURL());
            map.put("senderID", t.getSenderID());
            map.put("endDate", t.getEndDate()==null?"":sdf.format(t.getEndDate()));
            map.put("createDate", t.getCreateDate()==null?"":sdf.format(t.getCreateDate()));
            map.put("currentState",t.getCurrentState());
            map.put("workOrderId",t.getJobID());
            map.put("jobCode", t.getJobCode());
            list.add(map);
        }
        
        
        Map ma = new HashMap();
        ma.put("list", list);
        ma.put("count", MapUtils.getString(m, "total"));
        return ma;
    }
//
//    /**
//     * 申请环节回单
//     * @throws WFException
//     * @throws JSONException 
//     */
//    @Override
//    public void applyTask(JSONObject jsonObj) throws WFException, JSONException{
//        init();
//        String undoTaskId = JsonUtil.getString(jsonObj, "undoTaskId");
//        TaskInstance task = workflow.getTaskInstanceObject(undoTaskId);
//        Participant participant = new Participant();
//        workflow.submitTask(task, participant);
//    }
//    /**
//     * 审核环节回单
//     * @throws Exception 
//     */
//    @Override
//    public void approvalTask(JSONObject jsonObj) throws Exception{
//        init();
//        String processInstId = JsonUtil.getString(jsonObj, "processInstanceId");
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("isAgree", JsonUtil.getInt(jsonObj, "isAgree")==1?true:false);
//        map.put("isNeedUpperApproval", JsonUtil.getInt(jsonObj, "isNeedUpperApproval")==1?true:false);
//        workflow.setRelativeData(processInstId, map);
//        String undoTaskId = JsonUtil.getString(jsonObj, "taskInstID");
//        TaskInstance task = workflow.getTaskInstanceObject(undoTaskId);
//        Participant participant = new Participant();
//        workflow.submitTask(task, participant);
//        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String date = sdf.format(new Date());
//
//        ///jsonObj.put("processInstanceId", processInstId);
//        //jsonObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstID"));
//        jsonObj.put("processingObjectTable", "T_EOM_WORK_ORDER");
//        jsonObj.put("processingObjectId",JsonUtil.get(jsonObj, "workOrderId"));
//        jsonObj.put("processingSeqNum", 12);
//        jsonObj.put("processingTypeEnumId", 1);
//        jsonObj.put("processingReason", "");
//        jsonObj.put("processingResultOption", JsonUtil.get(jsonObj, "isAgree"));
//        jsonObj.put("processingDesc", JsonUtil.get(jsonObj, "approvalContent"));
//        jsonObj.put("remarks", "");
//        jsonObj.put("genProcesssingTime", date);
//        jsonObj.put("archiveBaseDate", "2099-12-31");
//        jsonObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
//        jsonObj.put("creationDate", date);
//        jsonObj.put("lastUpdateDate", date);
//        jsonObj.put("recordVersion", 1);
//        jsonObj.put("deletedFlag", 0);
//        jsonObj.put("deletedBy", "");
//        jsonObj.put("deletionDate", "");
//        jsonObj.put("attribute1", "");
//        jsonObj.put("attribute2", "");
//        jsonObj.put("attribute3", "");
//        jsonObj.put("attribute4", "");
//        jsonObj.put("attribute5", "");
//        jsonObj.put("processingReasonType", "");
//        infoRecDao.insertGenProcessingInfoRec(jsonObj);
//    }
//    /**
//     * 审批环节回单
//     * @throws Exception 
//     */
//    @Override
//    public void upperApprovalTask(JSONObject jsonObj) throws Exception {
//        init();
//        String processInstId = JsonUtil.getString(jsonObj, "processInstId");
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("isUpAgree", JsonUtil.get(jsonObj, "isUpAgree"));
//        workflow.setRelativeData(processInstId, map);
//        String undoTaskId = JsonUtil.getString(jsonObj, "undoTaskId");
//        TaskInstance task = workflow.getTaskInstanceObject(undoTaskId);
//        Participant participant = new Participant();
//        workflow.submitTask(task, participant);
//        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String date = sdf.format(new Date());
//
//        jsonObj.put("processInstanceId", processInstId);
//        jsonObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstID"));
//        jsonObj.put("processingObjectTable", "T_EOM_WORK_ORDER");
//        jsonObj.put("processingObjectId",JsonUtil.get(jsonObj, "workOrderId"));
//        jsonObj.put("processingSeqNum", 12);
//        jsonObj.put("processingTypeEnumId", 1);
//        jsonObj.put("processingReason", "");
//        jsonObj.put("processingResultOption", JsonUtil.get(jsonObj, "isUpperAgree"));
//        jsonObj.put("processingDesc", JsonUtil.get(jsonObj, "upperApprovalContent"));
//        jsonObj.put("remarks", "");
//        jsonObj.put("genProcesssingTime", date);
//        jsonObj.put("archiveBaseDate", "2099-12-31");
//        jsonObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
//        jsonObj.put("creationDate", date);
//        jsonObj.put("lastUpdateDate", date);
//        jsonObj.put("recordVersion", 1);
//        jsonObj.put("deletedFlag", 0);
//        jsonObj.put("deletedBy", "");
//        jsonObj.put("deletionDate", "");
//        jsonObj.put("attribute1", "");
//        jsonObj.put("attribute2", "");
//        jsonObj.put("attribute3", "");
//        jsonObj.put("attribute4", "");
//        jsonObj.put("attribute5", "");
//        jsonObj.put("processingReasonType", "");
//        infoRecDao.insertGenProcessingInfoRec(jsonObj);
//    }
//    /**
//     * 执行环节回单
//     * @throws Exception 
//     */
//    @Override
//    public void executeTask(JSONObject jsonObj) throws Exception {
//        init();
//        String undoTaskId = JsonUtil.getString(jsonObj, "undoTaskId");
//        TaskInstance task = workflow.getTaskInstanceObject(undoTaskId);
//        Participant participant = new Participant();
//        workflow.submitTask(task, participant);
//        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String date = sdf.format(new Date());
//
//        jsonObj.put("processInstanceId", processInstId);
//        jsonObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstID"));
//        jsonObj.put("processingObjectTable", "T_EOM_WORK_ORDER");
//        jsonObj.put("processingObjectId",JsonUtil.get(jsonObj, "workOrderId"));
//        jsonObj.put("processingSeqNum", 12);
//        jsonObj.put("processingTypeEnumId", 1);
//        jsonObj.put("processingReason", "");
//        jsonObj.put("processingResultOption", "");
//        jsonObj.put("processingDesc", JsonUtil.get(jsonObj, "executeContent"));
//        jsonObj.put("remarks", "");
//        jsonObj.put("genProcesssingTime", date);
//        jsonObj.put("archiveBaseDate", "2099-12-31");
//        jsonObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
//        jsonObj.put("creationDate", date);
//        jsonObj.put("lastUpdateDate", date);
//        jsonObj.put("recordVersion", 1);
//        jsonObj.put("deletedFlag", 0);
//        jsonObj.put("deletedBy", "");
//        jsonObj.put("deletionDate", "");
//        jsonObj.put("attribute1", "");
//        jsonObj.put("attribute2", "");
//        jsonObj.put("attribute3", "");
//        jsonObj.put("attribute4", "");
//        jsonObj.put("attribute5", "");
//        jsonObj.put("processingReasonType", "");
//        infoRecDao.insertGenProcessingInfoRec(jsonObj);
//    }
//    /**
//     * 汇总环节回单
//     * @throws Exception 
//     */
//    @Override
//    public void collectTask(JSONObject jsonObj) throws Exception {
//        init();
//        String undoTaskId = JsonUtil.getString(jsonObj, "undoTaskId");
//        TaskInstance task = workflow.getTaskInstanceObject(undoTaskId);
//        Participant participant = new Participant();
//        workflow.submitTask(task, participant);  
//        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String date = sdf.format(new Date());
//
//        jsonObj.put("processInstanceId", processInstId);
//        jsonObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstID"));
//        jsonObj.put("processingObjectTable", "T_EOM_WORK_ORDER");
//        jsonObj.put("processingObjectId",JsonUtil.get(jsonObj, "workOrderId"));
//        jsonObj.put("processingSeqNum", 12);
//        jsonObj.put("processingTypeEnumId", 1);
//        jsonObj.put("processingReason", "");
//        jsonObj.put("processingResultOption", "");
//        jsonObj.put("processingDesc", JsonUtil.get(jsonObj, "executeContent"));
//        jsonObj.put("remarks", "");
//        jsonObj.put("genProcesssingTime", date);
//        jsonObj.put("archiveBaseDate", "2099-12-31");
//        jsonObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
//        jsonObj.put("creationDate", date);
//        jsonObj.put("lastUpdateDate", date);
//        jsonObj.put("recordVersion", 1);
//        jsonObj.put("deletedFlag", 0);
//        jsonObj.put("deletedBy", "");
//        jsonObj.put("deletionDate", "");
//        jsonObj.put("attribute1", "");
//        jsonObj.put("attribute2", "");
//        jsonObj.put("attribute3", "");
//        jsonObj.put("attribute4", "");
//        jsonObj.put("attribute5", "");
//        jsonObj.put("processingReasonType", "");
//        infoRecDao.insertGenProcessingInfoRec(jsonObj);
//    }
//
//    @Override
//    public TaskInstance queryMyUndoTask(JSONObject jsonObj) throws WFException, JSONException {
//        init();
//        TaskFilter filter = new TaskFilter();
//        filter.setProcessInstID(JsonUtil.getString(jsonObj, "processInstanceId"));
//        //filter.setProcessModelID(processDefName);
//        List<TaskInstance> tasks = workflow.getMyWaitingTasks(filter);
//        return tasks.get(0);
//    }
    
    /**
     * 查询所有发布的流程实例
     * @throws JSONException 
     */
    @Override
    public List<Map<String, Object>> getAllProcess(JSONObject jsonObj) throws WFException, WFServiceException, JSONException {
        List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
        WorkflowMana workflow = new WorkflowMana();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
            paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
            paramDto.setAccountName("");
            paramDto.setAccountPassWord(JsonUtil.getString(jsonObj, "password"));
        
        List<ProcessModel> processList = workflow.getProcessModeLists(paramDto);
        for(ProcessModel model:processList){
            if(model.getProcessModelName().indexOf(".e19")>-1){
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("processDefId", model.getProcessModelID()+"$$$$"+model.getProcessModelName());
                map.put("processChName", model.getProcessModelDes());
                list.add(map);
            }
        }
        return list;
    }
    
//    /**
//     * 查询所有发布的流程实例
//     */
//    @Override
//    public List<Map<String, Object>> getAllProcess(JSONObject jsonObj) throws WFException, WFServiceException {
//        try {
//            BPSServiceClientFactory.getLoginManager().setCurrentUser(JsonUtil.getString(jsonObj, "accountId"), JsonUtil.getString(jsonObj, "password"));
//        } catch (JSONException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }//web应用中，建议将该步调用写入Filter中tiger
//
//        IBPSServiceClient client = BPSServiceClientFactory.getDefaultClient();
//        //PageCond page = new PageCond();
//        List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
//        List<WFProcessDefine> processList = client.getDefinitionQueryManager().queryPublishedProcesses(null);
//        for(WFProcessDefine p:processList){
//            Map<String, Object> map = new HashMap<String, Object>();
//            map.put("processDefId", p.getProcessDefID()+"$$$$"+p.getProcessDefName());
//            //map.put("processDefName", p.getProcessDefName());
//            map.put("processChName", p.getProcessChName());
//            list.add(map);
//        }
//        return list;
//    }


    @Override
    public List<Map<String, Object>> getAllActivityByProcessId(JSONObject jsonObj) throws WFException, WFServiceException, JSONException {
        List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
        WorkflowMana workflow = new WorkflowMana();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        String proccessDefId = JsonUtil.getString(jsonObj, "processDefId");
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName("");
        paramDto.setAccountPassWord(JsonUtil.getString(jsonObj, "password"));
        paramDto.setProcessModelId(proccessDefId);
        List<ActivityDef> activities = workflow.getActivitDefLists(paramDto);
        for(ActivityDef df:activities){
            if(!"startActivity".equals(df.getActivityID()) 
                    && !"finishActivity".equals(df.getActivityID()) 
                    && !(df.getActivityID().indexOf("ApplyActivity")>-1)){
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("activityId", df.getActivityID());
                map.put("activityName", df.getActivityName());
                list.add(map);
            }
        }
        return list;
    }
    
    /** 
     *根据流程模板名称和环节定义id返回该环节配置的扩展信息
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    @Override
    public String getActivityExtendAttributes(JSONObject jsonObj) throws Exception {
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setProcessModelId(JsonUtil.getString(jsonObj, "processModelId"));
        paramDto.setActivityDefId(JsonUtil.getString(jsonObj, "activityDefId"));
        WorkflowMana wf = new WorkflowMana();
        return wf.getActivityExtendAttributes(paramDto);
    }
/**
 * 查询已办合并
 */
	@Override
	public Map<String, Object> getMyCompletedTasksDistinctProinstanceId(JSONObject jsonObj) throws Exception {
		 AAAAService aaaa = new AAAAService();
	        WorkflowMana wf = new WorkflowMana();
	        WorkFlowParamDto paramDto = new WorkFlowParamDto();
	        TaskFilter filter = new TaskFilter();
	        paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));

	        String jobCode = JsonUtil.getString(jsonObj, "jobCode");
	        String jobTitle = JsonUtil.getString(jsonObj, "jobTitle");
	        if(jobCode != null && jobCode.trim().length() >0){
	            filter.setJobCode(jobCode);
	        }
	        if (jobTitle != null && jobTitle.trim().length() > 0) {
	            filter.setJobTitle(jobTitle);
	        }
	     // 设置分页
	        PageCondition pageCon = new PageCondition();
	        pageCon.setBegin(JsonUtil.getInt(jsonObj, "start"));
	        pageCon.setLength(JsonUtil.getInt(jsonObj, "limit"));
	        pageCon.setIsCount(true);

	        filter.setPageCondition(pageCon);
	        paramDto.setFilter(filter);
	        Map<String, Object> m = wf.getMyCompletedTasksDistinctProinstanceId(paramDto);
	        List<TaskInstance> tasks = (List<TaskInstance>) MapUtils.getObject(m, "resultList");
	        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        for (TaskInstance t : tasks) {
	            Map<String, Object> map = new HashMap<String, Object>();
	            map.put("taskInstID", t.getTaskInstID());
	            map.put("jobTitle", t.getJobTitle());
	            map.put("jobCode", t.getJobCode());
	            map.put("jobId", t.getJobID());
	            
	            paramDto.setTaskId(t.getTaskInstID());
	            TaskInstance task = wf.getTaskInstanceObject(paramDto);
	            if (!CommonUtils.isEmpty(task)) {
	                map.put("processInstID", task.getProcessInstID());
	                map.put("processModelCNName", task.getProcessModelCNName());
	                map.put("formUrl", task.getFormURL());
	                map.put("processModelId", task.getProcessModelId());
	                map.put("processModelName", task.getProcessModelName());
	                map.put("createDate", task.getCreateDate() == null ? "" : sdf.format(task.getCreateDate()));
	                
	                UserEntity userEntity = aaaa.findUserByPortalAccountId(task.getSenderID());
	                if (!CommonUtils.isEmpty(userEntity)) {
	                    map.put("senderName", userEntity.getEmpName());
	                }
	            }
	            
	            list.add(map);
	        }
	        Map<String, Object> ma = new HashMap<String, Object>();
	        ma.put("rows", list);
	        ma.put("total", MapUtils.getString(m, "total"));
	        return ma;


	}
    
//    @Override
//    public List<Map<String, Object>> getAllActivityByProcessId(long processDefId) throws WFException, WFServiceException {
//        BPSServiceClientFactory.getLoginManager().setCurrentUser("1", "000000");//web应用中，建议将该步调用写入Filter中tiger
//
//        IBPSServiceClient client = BPSServiceClientFactory.getDefaultClient();
//        List<WFActivityDefine> activities = client.getDefinitionQueryManager().queryActivitiesOfProcess(processDefId);//获取该业务流程下所有活动的列表
//        logger.debug(">>>>>>>>size="+activities.size());
//        List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
//        for(WFActivityDefine a:activities){
//            if(!"start".equals(a.getType()) && !"finish".equals(a.getType())){
//                Map<String, Object> map = new HashMap<String, Object>();
//                map.put("activityId", a.getId());
//                map.put("activityName", a.getName());
//                list.add(map);
//            }
//        }
//        return list;
//    }

}