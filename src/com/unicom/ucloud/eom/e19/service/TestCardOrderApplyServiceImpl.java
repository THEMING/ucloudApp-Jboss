package com.unicom.ucloud.eom.e19.service;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eos.workflow.api.BPSServiceClientFactory;
import com.primeton.ucloud.workflow.factory.BPMServiceFactory;
import com.primeton.ucloud.workflow.impl.Global;
import com.sdicons.json.validator.impl.predicates.Int;
import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.ucloud.paas.proxy.aaaa.util.PaasAAAAException;
import com.ucloud.paas.proxy.log.LogService;
import com.ucloud.paas.proxy.log.QueryParameterObject;
import com.ucloud.paas.proxy.notification.sms.SmsService;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dto.WorkFlowParamDto;
import com.unicom.ucloud.eom.base.service.ExportSimpleElsService;
import com.unicom.ucloud.eom.base.workflow.WorkflowMana;
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelGenDAO;
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelProcDAO;
import com.unicom.ucloud.eom.e19.dao.IEomCardCheckDao;
import com.unicom.ucloud.eom.e19.dao.IEomDisAssignObjectListDAO;
import com.unicom.ucloud.eom.e19.dao.IFlowindObjProcInsRelDAO;
import com.unicom.ucloud.eom.e19.dao.IGenProcessingInfoRecDAO;
import com.unicom.ucloud.eom.e19.dao.ISheetCardRelevanceDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardOrderApplyDAO;
import com.unicom.ucloud.util.Config;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;
import com.unicom.ucloud.workflow.exceptions.WFException;
import com.unicom.ucloud.workflow.filters.TaskFilter;
import com.unicom.ucloud.workflow.interfaces.WorkflowObjectInterface;
import com.unicom.ucloud.workflow.objects.ActivityDef;
import com.unicom.ucloud.workflow.objects.ActivityInstance;
import com.unicom.ucloud.workflow.objects.PageCondition;
import com.unicom.ucloud.workflow.objects.Participant;
import com.unicom.ucloud.workflow.objects.ProcessModelParams;
import com.unicom.ucloud.workflow.objects.TaskInstance;

import freemarker.template.SimpleDate;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
@Service
public class TestCardOrderApplyServiceImpl extends ExportSimpleElsService implements ITestCardOrderApplyService {

    @Autowired
    private ITestCardOrderApplyDAO testCardOrderApplyDAO;
    @Autowired
    private IEomCardCheckService eomCardCheckService;
    @Autowired
    private ISheetCardRelevanceDAO sheetCardRelevanceDAO;
    @Autowired
    private IFlowindObjProcInsRelDAO flowindObjProcInsRelDAO;
    @Autowired
    private IGenProcessingInfoRecDAO genProcessingInfoRecDAO;
    @Autowired
    private IAttachmentRelGenDAO attachmentRelGenDAO;
    @Autowired
    private IAttachmentRelProcDAO attachmentRelProcDAO;
    @Autowired
    private IEomDisAssignObjectListDAO eomDisAssignObjectListDAO;
    @Autowired
    private IEomCardCheckDao cardCheckDao;
    @Autowired
    private static BPMServiceFactory factory;
    @Autowired
    private static WorkflowObjectInterface workflow;
    
    private final String MODIFY = "5";//修改
    private final String CANCEL = "10";//撤单 
    private final String RECEIPT = "4";//回单 
    private final String DRAFT_MAKE_DIS = "3";//草稿制定并派发
    private final String URGE = "9";//催办
    
    public void init(String loginId,String loginName) {
        factory = BPMServiceFactory.getInstance();
        BPSServiceClientFactory.getLoginManager().setCurrentUser(loginId,
                loginName, "BM_D0FD24A1C09C4DDF8C88D57CEFF4188C", "111111");
        try {
            workflow = factory.getWorkflowService(loginId,
                    "BM_D0FD24A1C09C4DDF8C88D57CEFF4188C", "111111");
        } catch (WFException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        logger.debug("workflow context 初始化成功");
    }
    
    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) {

        return testCardOrderApplyDAO.qryListByParam(jsonObj);
    }
    
    @Override
    public List<Map<String, Object>> qryUndoByCardSheetId(JSONObject jsonObj) throws Exception {
        init(JsonUtil.getString(jsonObj, "loginId"),JsonUtil.getString(jsonObj, "loginName"));
        //Page p  = new Page();
       PageCondition page = new PageCondition();
       /* page.setBegin(JsonUtil.getInt(jsonObj, "start"));
        page.setLength(JsonUtil.getInt(jsonObj, "limit"));*/
        page.setBegin(0);
        page.setLength(2);
        page.setIsCount(true);
//        String startTime = JsonUtil.getString(jsonObj, "startTime");
//        String endTime = JsonUtil.getString(jsonObj, "endTime");
//        Long processDefId = JsonUtil.getLong(jsonObj, "processDefId");
//        String activityDefId = JsonUtil.getString(jsonObj, "activityDefId");
//        String jobTitle = JsonUtil.getString(jsonObj, "jobTitle");
//        String senderId = JsonUtil.getString(jsonObj, "sendPersonId");
        String processInstID = JsonUtil.getString(jsonObj, "processInstID");
        TaskFilter filter = new TaskFilter();
        filter.setProcessInstID(processInstID);
//        if(processDefId != null && processDefId.toString().trim().length()>0){
//            filter.setProcessModelID(processDefId.toString().trim());
//            if(activityDefId != null && activityDefId.trim().length()>0){
//                filter.setActivityID(activityDefId.trim());
//            }
//        }
//        if(jobTitle != null && jobTitle.trim().length()>0){
//            filter.setJobTitle(jobTitle);
//        }
//        if(senderId != null && senderId.trim().length()>0){
//            filter.setSenderID(senderId.trim());
//        }
        filter.setPageCondition(page);
        List<TaskInstance> tasks = workflow.getMyWaitingTasks(filter);
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(TaskInstance t:tasks){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("taskInstID", t.getTaskInstID());
            map.put("jobTitle", t.getJobTitle());
            map.put("processModelId", t.getProcessModelId());
            map.put("processInstID", t.getProcessInstID());
            map.put("activityInstName", t.getActivityInstName());
            map.put("activityInstID", t.getActivityInstID());
            map.put("formUrl", t.getFormURL());
            map.put("senderID", t.getSenderID());
            map.put("endDate", t.getEndDate()==null?"":sdf.format(t.getEndDate()));
            map.put("createDate", t.getCreateDate()==null?"":sdf.format(t.getCreateDate()));
            list.add(map);
        }
        return list;
    }
    
    @Override
    public String addTestCardOrderApply(JSONObject jsonObj) throws Exception {
        
        JSONArray sheetCardList =  new  JSONArray(JsonUtil.getString(jsonObj, "sheetCardList"));
        
        Integer cardOperationTypeEnumId = JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId");
        if(sheetCardList!=null&&sheetCardList.length()!=0){
            if((cardOperationTypeEnumId==1||cardOperationTypeEnumId==2||cardOperationTypeEnumId==3||cardOperationTypeEnumId==4||cardOperationTypeEnumId==5)
                    &&JsonUtil.getString(jsonObj, "doFlag")!=null
                    &&!("draft".equals(JsonUtil.getString(jsonObj, "doFlag")))){//如果是移交、调拨、借用、归还、报废的非起草稿，而是提交流程，验证选择的测试卡的在途性，如果有别的移交、调拨、借用工单同样选到了这张卡就返回不允许选择的提示 放在最前面，避免回滚不了
                
                String ret = isAllowToSelectThisCards(sheetCardList);
                if(!"".equals(ret)){
                    return ret;
                }
            }
        }

        Long tempId = testCardOrderApplyDAO.addTestCardOrderApply(jsonObj);
        
        JSONArray fileList =  new  JSONArray(JsonUtil.getString(jsonObj, "fileList"));
        if(fileList.length()!=0){
//            attachmentRelGenDAO.addBatch(fileList, "T_EOM_CARD_SHEET", tempId);
            attachmentRelProcDAO.addBatch(fileList, "T_EOM_CARD_SHEET", tempId);
        }
        
        if(sheetCardList!=null){
            
        for(int i=0;i<sheetCardList.length();i++){
            ((JSONObject) sheetCardList.get(i)).put("cardSheetId", tempId);
            sheetCardRelevanceDAO.save((JSONObject)sheetCardList.get(i));
        }
        
        if((JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==1||JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==2||JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==3)&&JsonUtil.getInt(jsonObj, "acceptObjectType")!=null){//调拨移交借用
          //插入调度选派对象列表
            JSONObject disAssignObject = new JSONObject();
            disAssignObject.put("processInstId", 0);//如果是0表示是草稿选了审核对象
            disAssignObject.put("activityDefId", 0);
            disAssignObject.put("activityInstanceId", 0);
            disAssignObject.put("taskInstanceId", 0);
            disAssignObject.put("workOrderId", tempId);
            disAssignObject.put("disAssignTypeEnumId", 2);
            disAssignObject.put("disAssignObjectTypeEnumId", JsonUtil.getInt(jsonObj, "acceptObjectType"));
            
            if(1==JsonUtil.getInt(jsonObj, "acceptObjectType")){//组织，则targetPerson为数字，可插入disAssignObjectId字段
                disAssignObject.put("disAssignObjectId", JsonUtil.getString(jsonObj, "acceptObjectId"));
            }else if(3==JsonUtil.getInt(jsonObj, "acceptObjectType")){//人员，则targetPerson为字符，只能插入disAssignOpinion字段，disAssignObjectId字段为必填，添加临时值
                disAssignObject.put("disAssignObjectId", 1);
                disAssignObject.put("disAssignOpinion", JsonUtil.getString(jsonObj, "acceptObjectId"));
            }
            
            disAssignObject.put("disAssignObjectName", JsonUtil.getString(jsonObj, "acceptObjectName"));
            disAssignObject.put("createdBy", JsonUtil.getString(jsonObj, "createdBy"));
            disAssignObject.put("creationDate", new Date());
            disAssignObject.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "createdBy"));
            disAssignObject.put("lastUpdateDate", new Date());
            disAssignObject.put("deletionDate", new Date());
            eomDisAssignObjectListDAO.saveDisAssignObject(disAssignObject);
            
            
        }
        
        if(JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==3&&JsonUtil.getInt(jsonObj, "auditMyObjectType")!=null){//借用流程 插入调度选派对象列表 保存本部门审核对象
            //插入调度选派对象列表
            JSONObject disAssignObject = new JSONObject();
              disAssignObject.put("processInstId", -1);//如果是-1表示是借用流程的本部门审核对象
              disAssignObject.put("activityDefId", -1);
              disAssignObject.put("activityInstanceId", -1);
              disAssignObject.put("taskInstanceId", -1);
              disAssignObject.put("workOrderId", tempId);
              disAssignObject.put("disAssignTypeEnumId", 2);
              disAssignObject.put("disAssignObjectTypeEnumId", JsonUtil.getInt(jsonObj, "auditMyObjectType"));
              
              if(1==JsonUtil.getInt(jsonObj, "auditMyObjectType")){//组织，则targetPerson为数字，可插入disAssignObjectId字段
                  disAssignObject.put("disAssignObjectId", JsonUtil.getString(jsonObj, "auditMyObjectId"));
              }else if(3==JsonUtil.getInt(jsonObj, "auditMyObjectType")){//人员，则targetPerson为字符，只能插入disAssignOpinion字段，disAssignObjectId字段为必填，添加临时值
                  disAssignObject.put("disAssignObjectId", 1);
                  disAssignObject.put("disAssignOpinion", JsonUtil.getString(jsonObj, "auditMyObjectId"));
              }
              
              disAssignObject.put("disAssignObjectName", JsonUtil.getString(jsonObj, "auditMyObjectName"));
              disAssignObject.put("createdBy", JsonUtil.getString(jsonObj, "createdBy"));
              disAssignObject.put("creationDate", new Date());
              disAssignObject.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "createdBy"));
              disAssignObject.put("lastUpdateDate", new Date());
              disAssignObject.put("deletionDate", new Date());
              eomDisAssignObjectListDAO.saveDisAssignObject(disAssignObject);
          }

            if(JsonUtil.getString(jsonObj, "doFlag")!=null&&"draft".equals(JsonUtil.getString(jsonObj, "doFlag"))){
                return "";
            }

            startWorkFlow(jsonObj,tempId);
            return "";
        }
        return "";
    }
    
    void startWorkFlow(JSONObject jsonObj,Long tempId) throws Exception{
     // 启动流程
        Integer cardOperationTypeEnumId = JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId");
        String processDefName = "";
        String orderType = "";
        switch(cardOperationTypeEnumId)
        {
        case 2:processDefName = "com.unicom.ucloud.eom.e19.transfer";orderType = "测试卡移交申请单";break;//移交
        case 5:processDefName = "com.unicom.ucloud.eom.e19.dumping";orderType = "测试卡报废申请单";break;//报废
        case 3:processDefName = "com.unicom.ucloud.eom.e19.lend";orderType = "测试卡借用申请单";break;//借用
        case 1:processDefName = "com.unicom.ucloud.eom.e19.allot";orderType = "测试卡调拨申请单";break;//调拨
        case 4:processDefName = "com.unicom.ucloud.eom.e19.return";orderType = "测试卡归还申请单";break;//归还
        case 6:processDefName = "com.unicom.ucloud.eom.e19.check";orderType = "测试卡清查申请单";break;//清查
        default:;
        }
        System.out.println("==================cardOperationTypeEnumId=================="+cardOperationTypeEnumId);
//        String processDefName = "com.unicom.ucloud.eom.e19.allot";

//        ProcessModelParams processModelParams = new ProcessModelParams();
//
//        processModelParams.setProcessInstName("工单流水号："+JsonUtil.getString(jsonObj, "sheetSerialNumber")+" 的测试卡工单");
//
//        Participant participant = new Participant(); //下一步参与者       
//
//        participant.setAccountID("tiger");
//
//        String processInstDesc = "工单流水号："+JsonUtil.getString(jsonObj, "sheetSerialNumber")+" 的测试卡工单"; //流程实例描述
        
//        System.out.println("======================="+processDefName+"||"+processModelParams+"||"+participant+"||"+processInstDesc);
//
//        String processInstID = workflow.startProcess(processDefName, processModelParams, participant, processInstDesc);
        
        
        
//          String processInstanceId = processInstID;
//          JSONObject proObj = new JSONObject();
//          proObj.put("processInstanceId", processInstanceId);
          
//          List<ActivityInstance> lis =  workflow.getActivityInstances(processInstanceId);
//          String activityInstID = "";
//          System.out.println("=========lis.size()================="+lis.size());
//          for(int i=0;i<lis.size();i++){
//              ActivityInstance activityInstance = lis.get(i);
//              System.out.println("=========activityInstance.getCurrentState()================"+activityInstance.getCurrentState());
//              if("2".equals(activityInstance.getCurrentState())){
//                  activityInstID = activityInstance.getActivityInstID();
//                  System.out.println("=========已获取活动id====希望只出现一次==================");
//                  break;
//              }
//          }
//          
//          proObj.put("activityInstanceId", activityInstID);
          
//          List<TaskInstance> lis2 = workflow.getTaskInstancesByActivityID(activityInstID);
//          if(lis2.size()==1){
//              TaskInstance taskInstance = lis2.get(0);
//              Participant participant2 = new Participant();
//              participant2.setAccountID("fish");
//              workflow.submitTask(taskInstance,participant2);//回单过申请环节
              
      //启动流程↓
        // 启动流程 调用成功 下一环节参与者 设置具体看答疑问题14
        WorkflowMana workflow = new WorkflowMana();
        Map<String, Object> bizMap = new HashMap<String, Object>();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
  
       // bizMap.put("jobType", orderType);//工单类型
        //工单编码
     //   bizMap.put("jobCode", JsonUtil.getString(jsonObj, "woNo"));
        paramDto.setJobType(orderType);
        paramDto.setJobCode(JsonUtil.getString(jsonObj, "woNo"));
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginName"));
        paramDto.setAccountPassWord("000000");
        
        Participant startParticipant = new Participant();
        startParticipant.setParticipantID(JsonUtil.getString(jsonObj, "loginId"));
        startParticipant.setParticipantType(WorkflowMana.PERSION);
        paramDto.setStartParticipant(startParticipant);
        
        paramDto.setJobId(tempId.toString());        //设置业务表ID
//        bizMap = setBizMap(bizMap,jsonObj);
        paramDto = setParam(paramDto,jsonObj);
//        bizMap.put("", value)jsonObj
        paramDto.setBizModleParams(bizMap);
       // paramDto.setProcessDefName(processDefName);
        //流程挂接
        String proDefName = "";
        proDefName = workflow.findProcessModel(jsonObj);
        if (proDefName != null&&proDefName != "") {
            paramDto.setProcessDefName(proDefName);
            processDefName = proDefName;
        } else {
        	paramDto.setProcessDefName(processDefName);
        }
        Map<String, Object> reDataMap = new HashMap<String, Object>();
        if(JsonUtil.getString(jsonObj, "targetType")!=null&&!"".equals(JsonUtil.getString(jsonObj, "targetType"))){
            if("1".equals(JsonUtil.getString(jsonObj, "targetType"))){//人员
                Participant participant;
                participant = new Participant();
                participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
                participant.setParticipantType(JsonUtil.getString(jsonObj, "targetType"));
                System.out.println("=========================="+JsonUtil.getString(jsonObj, "targetPerson"));
                List <Participant>  participants = new ArrayList<Participant>() ;
                participants.add(participant);
                paramDto.setParticipants(participants);
            }else{//组织
                
                reDataMap.put("orgcode",JsonUtil.getString(jsonObj, "targetPerson"));
                reDataMap.put("productcode","");
                reDataMap.put("areacode","");
                reDataMap.put("roleclass","");
                reDataMap.put("majorcode","");
                
            }
        }
        
        //建议完成时间 设定时限
        DecimalFormat num = new DecimalFormat("00.00");
        String timeDiff = num.format(JsonUtil.getDouble(jsonObj, "flowTimeLimit"));
        reDataMap.put("flowTimeLimit", timeDiff);
        paramDto.setRelativeDataMap(reDataMap);
        //paramDto.setProcessModelId("2");
        // paramDto.setProcessDefName("com.unicom.ucloud.eom.e23.emergencyDrill");
        paramDto.setProcessInstName(JsonUtil.getString(jsonObj, "sheetTheme"));
        paramDto.setProcessInstDesc(JsonUtil.getString(jsonObj, "sheetTheme"));  
        JSONObject json = workflow.startAndFinishFirst(paramDto);//startWorkflow(paramDto); 
        //启动流程↑
              String processInstID = "";
              if("success".equals(JsonUtil.getString(json, "msg"))){
                  processInstID = JsonUtil.getString(json, "processInstId");
              }

              JSONObject flowObj = new JSONObject();
              flowObj.put("flowingObjectTable", "T_EOM_CARD_SHEET");
              flowObj.put("flowingObjectId", tempId);
              flowObj.put("processInstanceId", processInstID);
              flowObj.put("createdBy", JsonUtil.getString(jsonObj, "createdBy"));
              flowObj.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "lastUpdatedBy"));
              
              flowindObjProcInsRelDAO.save(flowObj);//流转对象与流程实例关联表
              
              
              JSONObject processingInfoRecObj = new JSONObject();
              processingInfoRecObj.put("processInstanceId", processInstID);
              processingInfoRecObj.put("activityInstanceId", 0);
              processingInfoRecObj.put("taskInstanceId", 0);
              
              processingInfoRecObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
              processingInfoRecObj.put("processingObjectId", tempId);
              processingInfoRecObj.put("processingSeqNum", 1);//处理序号
              
              Map<String,Object> map = new HashMap<String,Object>();
              processingInfoRecObj.put("processingTypeEnumId", DRAFT_MAKE_DIS);//处理类型
              
              processingInfoRecObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "createdByName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了草稿制定并派发");
//              proObj.put("processingExpiredTime", new Date());
              processingInfoRecObj.put("createdBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
              processingInfoRecObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
              processingInfoRecObj.put("processingOrgId", JsonUtil.get(jsonObj, "processingOrgId"));
              processingInfoRecObj.put("processingOrgName", JsonUtil.get(jsonObj, "operateDepartmentName"));
              processingInfoRecObj.put("createdByName", JsonUtil.get(jsonObj, "operatorName"));
              
              genProcessingInfoRecDAO.save(processingInfoRecObj);//插入通用表
              
              LogService service = new LogService();
              QueryParameterObject queryParameterObject = new QueryParameterObject();
              queryParameterObject.setAppGroupId("20130308");
              queryParameterObject.setAppId("BM_D0FD24A1C09C4DDF8C88D57CEFF4188C");
              queryParameterObject.setOrgId(JsonUtil.getString(jsonObj, "processingOrgId"));
              queryParameterObject.setUserId(JsonUtil.getString(jsonObj, "lastUpdatedBy"));
              queryParameterObject.setOpDateTime(new Date());
              queryParameterObject.setOperType("测试卡工单");
              queryParameterObject.setLogLevel("INFO");
              queryParameterObject.setLogContent("["+JsonUtil.get(jsonObj, "createdByName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了草稿制定并派发");//和通用信息相同
              queryParameterObject.setOperObjSubType("1");
              queryParameterObject.setOperObjId("1");
              queryParameterObject.setOperObjType("1");
              queryParameterObject.setOperObjSubType("1");
              service.writeLogService(queryParameterObject);//日志服务，插入日志

              
//          }
    }
    
    private WorkFlowParamDto setParam(WorkFlowParamDto paramDto, JSONObject jsonObj) throws ParseException, JSONException {
        Map<String, Object> mm = new LinkedHashMap<String, Object>();
        if(JsonUtil.getString(jsonObj, "requiredFinishTime")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTime"))){//要求完成时间
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
            
            Date d = format.parse(JsonUtil.getString(jsonObj, "requiredFinishTime"));
            mm.put(Global.DA_COLUMN1, d);
        }
        if(JsonUtil.getString(jsonObj, "woNo")!=null&&!"".equals(JsonUtil.getString(jsonObj, "woNo"))){//工单流水号
            mm.put(Global.BIZ_STRCOLUMN1, JsonUtil.getString(jsonObj, "woNo"));
        }
        if(JsonUtil.getString(jsonObj, "flowExecutor")!=null&&!"".equals(JsonUtil.getString(jsonObj, "flowExecutor"))){//执行对象
            mm.put(Global.BIZ_STRCOLUMN2, JsonUtil.getString(jsonObj, "flowExecutor"));
        }
        if(JsonUtil.getString(jsonObj, "urgencyLevel")!=null&&!"".equals(JsonUtil.getString(jsonObj, "urgencyLevel"))){//缓急程度
            mm.put(Global.BIZ_NUMCOLUMN1, JsonUtil.getString(jsonObj, "urgencyLevel"));
        }
        paramDto.setParams(mm);
        return paramDto;
    }

    private Map<String, Object> setBizMap(Map<String, Object> bizMap, JSONObject jsonObj) throws JSONException {
        if(JsonUtil.getString(jsonObj, "woNo")!=null&&!"".equals(JsonUtil.getString(jsonObj, "woNo"))){
            bizMap.put(Global.BIZ_ROOTVCCOLUMN1, JsonUtil.getString(jsonObj, "woNo"));//工单流水号
        }
        if(JsonUtil.getString(jsonObj, "flowExecutor")!=null&&!"".equals(JsonUtil.getString(jsonObj, "flowExecutor"))){
            bizMap.put(Global.BIZ_ROOTVCCOLUMN2, JsonUtil.getString(jsonObj, "flowExecutor"));//执行对象
        }
        if(JsonUtil.getString(jsonObj, "urgencyLevel")!=null&&!"".equals(JsonUtil.getString(jsonObj, "urgencyLevel"))){
            bizMap.put(Global.BIZ_ROOTNMCOLUMN1, JsonUtil.getInt(jsonObj, "urgencyLevel"));//缓急程度
        }
        return bizMap;
    }

    /**
     * 批量导入历史工单（插入在途表，以后会更改插入表）
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public void addTestCardOrderBatch(JSONObject jsonObj) throws Exception {
        
        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsonObj, "dataArray"));
        if(dataArray != null && dataArray.length() > 0){
            JSONObject sheetJo = null;
            for(int i=0;i<dataArray.length();i++){
                sheetJo = (JSONObject) dataArray.get(i);
                testCardOrderApplyDAO.addTestCardOrderApply(sheetJo);
            }
        }
    }


    @Override
    public void deleteTestCardOrder(JSONObject jsonObj) throws Exception {
        
        JSONArray sheetList =  new JSONArray(jsonObj.getString("sheetList"));
        
        if(JsonUtil.getString(jsonObj, "deleteDraft")!=null&&JsonUtil.getString(jsonObj, "deleteDraft").length()!=0&&"1".equals(JsonUtil.getString(jsonObj, "deleteDraft"))){//说明是草稿删除操作，把T_EOM_CARD_SHEET表的DELETED_FLAG变成1
            testCardOrderApplyDAO.deleteBatch(sheetList);
            sheetCardRelevanceDAO.deleteBatch(sheetList);
        }else{//否则是撤单操作，不用设置T_EOM_CARD_SHEET表的DELETED_FLAG变成1，但是要清楚流程相关表的记录
            testCardOrderApplyDAO.deleteBatch(sheetList);
            flowindObjProcInsRelDAO.deleteBatch(sheetList);
        }
        
            
            if(JsonUtil.getString(jsonObj, "deleteDraft")!=null&&JsonUtil.getString(jsonObj, "deleteDraft").length()!=0&&"1".equals(JsonUtil.getString(jsonObj, "deleteDraft"))){
                return;
            }
            
            
            init(JsonUtil.getString(jsonObj, "loginId"),JsonUtil.getString(jsonObj, "loginName"));//初始化workflow对象
            
            for(int i=0;i<sheetList.length();i++){
                JSONObject jso= sheetList.getJSONObject(i);
                
                JSONObject proObj = new JSONObject();
                proObj.put("processInstanceId", JsonUtil.getString(jso, "processInstanceId"));
                proObj.put("activityInstanceId", 0);
                proObj.put("taskInstanceId", 0);
                
                proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
                proObj.put("processingObjectId", JsonUtil.getString(jso, "cardSheetId"));
                proObj.put("processingSeqNum", 1);
                
                Map<String,Object> map = new HashMap<String,Object>();
                proObj.put("processingTypeEnumId", CANCEL);
                proObj.put("createdByName", JsonUtil.get(jso, "operatorName"));
                proObj.put("processingResultOpinion", "["+JsonUtil.get(jso, "lastUpdatedBy")+"]修改了工单标题为["+JsonUtil.get(jso, "sheetTheme")+"]的工单");
//                proObj.put("processingExpiredTime", new Date());
                proObj.put("createdBy", JsonUtil.get(jso, "lastUpdatedBy"));
                proObj.put("lastUpdatedBy", JsonUtil.get(jso, "lastUpdatedBy"));
                proObj.put("processingOrgId", JsonUtil.get(jso, "processingOrgId"));
                proObj.put("processingOrgName", JsonUtil.get(jso, "operateDepartmentName"));
                genProcessingInfoRecDAO.save(proObj);//插入通用表
                
                
                workflow.terminateProcessInstance(JsonUtil.getString(jso, "processInstanceId"));   
            }
    }
    
    @Override
    public void addUrgeTestCardOrder(JSONObject jso) throws Exception {
                
                JSONObject proObj = new JSONObject();
                proObj.put("processInstanceId", JsonUtil.getString(jso, "processInstanceId"));
                proObj.put("activityInstanceId", 0);
                proObj.put("taskInstanceId", 0);
                
                proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
                proObj.put("processingObjectId", JsonUtil.getString(jso, "cardSheetId"));
                proObj.put("processingSeqNum", 1);
                
                Map<String,Object> map = new HashMap<String,Object>();
                proObj.put("processingTypeEnumId", URGE);
                
                proObj.put("processingResultOpinion", "["+JsonUtil.get(jso, "staffName")+"]对工单标题为["+JsonUtil.get(jso, "sheetTheme")+"]的工单进行了催单");
//                proObj.put("processingExpiredTime", new Date());
                proObj.put("createdBy", JsonUtil.get(jso, "lastUpdatedBy"));
                proObj.put("lastUpdatedBy", JsonUtil.get(jso, "lastUpdatedBy"));
                proObj.put("processingOrgId", JsonUtil.get(jso, "processingOrgId"));
                proObj.put("processingOrgName", JsonUtil.get(jso, "orgName"));
                proObj.put("createdByName", JsonUtil.get(jso, "staffName"));
                proObj.put("processingDesc", JsonUtil.getString(jso, "contents"));
                
                genProcessingInfoRecDAO.save(proObj);//插入通用表
            
            String appId = Config.getProperty("appId");//"BM_5C2F1E177F3A41F7A42B138C053FC379";
            String serviceToken = "E19";
            String noticeId = "催单";
            String instanceId = "E19";
            String provinceId = JsonUtil.getString(jso, "provinceId");
            String userId = JsonUtil.getString(jso, "userId");
            String receiveNumber = JsonUtil.getString(jso, "receiveNumber");
            String sendName = JsonUtil.getString(jso, "sendName");
            String isServiceNum = "0";
            String sendContent = JsonUtil.getString(jso, "sendContent");
            Date requestTime = null;
            String moduleId = "123";

            SmsService service = new SmsService();
            String smsResult = service.sendSmsService(serviceToken, appId, noticeId, instanceId,
                    provinceId, userId, receiveNumber, sendName, isServiceNum, sendContent,
                    requestTime, moduleId);
            logger.info("---发送短信----" + smsResult);
    }

    @Override
    public List<Map<String, Object>> qryAtestCardOrder(JSONObject jsonObj) throws PaasAAAAException {
        List li = testCardOrderApplyDAO.qryListByParam(jsonObj);
        if(li.size()==1){
            Map ma = (Map) li.get(0);
            if(ma.get("auditDepartmentId")!=null&&ma.get("auditDepartmentId").toString().length()!=0){//审核单位
                AAAAService aaaa = new AAAAService();
                OrgEntity orgBean = aaaa.findOrgByOrgID(MapUtils.getIntValue(ma, "auditDepartmentId"));
                ma.put("auditDepartmentName", orgBean.getOrgName());
                ma.put("auditDepartment", orgBean.getOrgName());
            }
            if(ma.get("executeDepartmentId")!=null&&ma.get("executeDepartmentId").toString().length()!=0){//执行单位
                AAAAService aaaa = new AAAAService();
                OrgEntity orgBean = aaaa.findOrgByOrgID(MapUtils.getIntValue(ma, "executeDepartmentId"));
                ma.put("executeDepartmentName", orgBean.getOrgName());
                ma.put("executeDepartment", orgBean.getOrgName());
            }
            if(ma.get("executePersonId")!=null&&ma.get("executePersonId").toString().length()!=0){
                AAAAService aaaa = new AAAAService();
                UserEntity userBean = aaaa.findUserbyUserID(MapUtils.getIntValue(ma, "executePersonId"));
                ma.put("executePersonName", userBean.getEmpName());
//                ma.put("auditPerson", userBean.getEmpName());
                ma.put("executeDepartmentName", userBean.getEmpName());
                ma.put("executeDepartment", userBean.getEmpName());
            }
            if(ma.get("auditPersonId")!=null&&ma.get("auditPersonId").toString().length()!=0){
                AAAAService aaaa = new AAAAService();
                UserEntity userBean = aaaa.findUserbyUserID(MapUtils.getIntValue(ma, "auditPersonId"));
                ma.put("auditPersonName", userBean.getEmpName());
//                ma.put("executePerson", userBean.getEmpName());
                ma.put("auditDepartmentName", userBean.getEmpName());
                ma.put("auditDepartment", userBean.getEmpName());
            }
            List lis = new ArrayList();
            lis.add(ma);
            return lis;
        }
        
        return li;
    }
    
    public String isAllowToSelectThisCards(JSONArray sheetCardList) throws Exception{
        List idAndTypeLi = new ArrayList();
        Map mm = new HashMap();
        List idli = new ArrayList();
        List typeli = new ArrayList();
        mm.put("id", JsonUtil.getString((JSONObject)sheetCardList.get(0), "testobjectId"));
        mm.put("type", JsonUtil.getString((JSONObject)sheetCardList.get(0), "testobjectType"));
        idAndTypeLi.add(mm);
        for(int i=1;i<sheetCardList.length();i++){
            mm = new HashMap();
            mm.put("id", JsonUtil.getString((JSONObject)sheetCardList.get(i), "testobjectId"));
            mm.put("type", JsonUtil.getString((JSONObject)sheetCardList.get(i), "testobjectType"));
            idAndTypeLi.add(mm);
        }
        JSONObject jj = new JSONObject();
        jj.put("idAndTypeLi", idAndTypeLi);
        List<Map<String, Object>> li = sheetCardRelevanceDAO.isAllowToSelectThisCards(jj);
        if(li.size()!=0){
            String ret = "";
            ret = "["+MapUtils.getString((Map)li.get(0), "number")+"]";
            for(int i=1;i<li.size();i++){
                ret = ret+",["+MapUtils.getString((Map)li.get(i), "number")+"]";
            }
            return ret;
        }

        return "";
    }

    @Override
    public String updateTestCardOrder(JSONObject jsonObj) throws Exception {
        
        Integer cardOperationTypeEnumId = JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId");
        JSONArray sheetCardList =  new JSONArray(JsonUtil.getString(jsonObj, "sheetCardList"));
        if(JsonUtil.getString(jsonObj, "doFlag")!=null&&JsonUtil.getString(jsonObj, "doFlag").length()!=0&&!"draft".equals(JsonUtil.getString(jsonObj, "doFlag"))){//起流程或修改环节回单
            if(sheetCardList!=null&&sheetCardList.length()!=0){
                if((cardOperationTypeEnumId==1||cardOperationTypeEnumId==2||cardOperationTypeEnumId==3||cardOperationTypeEnumId==4||cardOperationTypeEnumId==5)
                        &&JsonUtil.getString(jsonObj, "doFlag")!=null
                        &&!("draft".equals(JsonUtil.getString(jsonObj, "doFlag")))){//如果是移交、调拨、借用、归还、报废的非起草稿，而是提交流程，验证选择的测试卡的在途性，如果有别的移交、调拨、借用工单同样选到了这张卡就返回不允许选择的提示 放在最前面，避免回滚不了
                    
                    String ret = isAllowToSelectThisCards(sheetCardList);
                    if(!"".equals(ret)){
                        return ret;
                    }
                }
            }
        }
        
        testCardOrderApplyDAO.updateTestCardOrder(jsonObj);
        
        JSONArray fileList =  new  JSONArray(JsonUtil.getString(jsonObj, "fileList"));//添加附件表处理
        if(fileList.length()!=0){
            
//            attachmentRelProcDAO.delete(fileList.getJSONObject(0));//删除
            attachmentRelProcDAO.addBatch(fileList, "T_EOM_CARD_SHEET", JsonUtil.getLong(jsonObj, "cardSheetId"));//添加
        }
        
        JSONArray removeFileList =  new  JSONArray(JsonUtil.getString(jsonObj, "removeFileList"));//删除附件表处理
        
        if(removeFileList.length()!=0){
          for(int i=0;i<removeFileList.length();i++){
              attachmentRelProcDAO.delete((JSONObject) removeFileList.get(i));//删除
          }
          
        }
        
        JSONObject sheetCardObj =  new JSONObject( JsonUtil.getString(jsonObj, "sheetCardObj"));//关联测试卡处理，删除
        sheetCardRelevanceDAO.delete(sheetCardObj);
        
        if(JsonUtil.getString(jsonObj, "checkArray")!=null&&JsonUtil.getString(jsonObj, "hadModifyDefferenceList")!=null&&"1".equals(JsonUtil.getString(jsonObj, "hadModifyDefferenceList"))){//清查修改
            JSONArray dataArray = new  JSONArray(JsonUtil.getString(jsonObj, "checkArray"));
            eomCardCheckService.updateEomCardCheck(dataArray);
        }
        
        if(JsonUtil.getString(jsonObj, "checkListId")!=null&&JsonUtil.getString(jsonObj, "checkListId").length()!=0){
            JSONObject oob2 = new JSONObject();
            oob2.put("checkListId", JsonUtil.getString(jsonObj, "checkListId"));
            oob2.put("checkFormStatusEnumId", 2);//清查单状态审核不通过
            oob2.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "lastUpdatedBy"));
            
            cardCheckDao.updateEomCardCheck(oob2);
        }
        
        if(sheetCardList!=null){
        
        sheetCardRelevanceDAO.savebatch(sheetCardList);
        
        }
        
        if((JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==1||JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==2||JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==3)&&JsonUtil.getInt(jsonObj, "acceptObjectType")!=null){//调拨 移交 修改接收人 借用修改执行人
            
            JSONObject dele = new JSONObject();//先删除调度记录
            dele.put("workOrderId", JsonUtil.getLong(jsonObj, "cardSheetId"));
            dele.put("deletedFlag", 1);
            dele.put("activityId", 0);
            eomDisAssignObjectListDAO.update(dele);
            
            //插入调度选派对象列表
              JSONObject disAssignObject = new JSONObject();
              disAssignObject.put("processInstId", 0);//如果是0表示是草稿选了审核对象
              disAssignObject.put("activityDefId", 0);
              disAssignObject.put("activityInstanceId", 0);
              disAssignObject.put("taskInstanceId", 0);
              disAssignObject.put("workOrderId", JsonUtil.getLong(jsonObj, "cardSheetId"));
              disAssignObject.put("disAssignTypeEnumId", 2);
              disAssignObject.put("disAssignObjectTypeEnumId", JsonUtil.getInt(jsonObj, "acceptObjectType"));
              
              if(1==JsonUtil.getInt(jsonObj, "acceptObjectType")){//组织，则targetPerson为数字，可插入disAssignObjectId字段
                  disAssignObject.put("disAssignObjectId", JsonUtil.getString(jsonObj, "acceptObjectId"));
              }else if(3==JsonUtil.getInt(jsonObj, "acceptObjectType")){//人员，则targetPerson为字符，只能插入disAssignOpinion字段，disAssignObjectId字段为必填，添加临时值
                  disAssignObject.put("disAssignObjectId", 1);
                  disAssignObject.put("disAssignOpinion", JsonUtil.getString(jsonObj, "acceptObjectId"));
              }
              
              disAssignObject.put("disAssignObjectName", JsonUtil.getString(jsonObj, "acceptObjectName"));
              disAssignObject.put("createdBy", JsonUtil.getString(jsonObj, "createdBy"));
              disAssignObject.put("creationDate", new Date());
              disAssignObject.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "createdBy"));
              disAssignObject.put("lastUpdateDate", new Date());
              disAssignObject.put("deletionDate", new Date());
              eomDisAssignObjectListDAO.saveDisAssignObject(disAssignObject);
          }
        
        if((JsonUtil.getInt(jsonObj, "cardOperationTypeEnumId")==3)&&JsonUtil.getInt(jsonObj, "auditMyObjectType")!=null){//借用修改本部门审核对象
            
            JSONObject dele = new JSONObject();//先删除调度记录
            dele.put("workOrderId", JsonUtil.getLong(jsonObj, "cardSheetId"));
            dele.put("deletedFlag", 1);
            dele.put("activityId", -1);
            eomDisAssignObjectListDAO.update(dele);
            
            //插入调度选派对象列表
              JSONObject disAssignObject = new JSONObject();
              disAssignObject.put("processInstId", -1);//如果是0表示是草稿选了审核对象
              disAssignObject.put("activityDefId", -1);
              disAssignObject.put("activityInstanceId", -1);
              disAssignObject.put("taskInstanceId", -1);
              disAssignObject.put("workOrderId", JsonUtil.getLong(jsonObj, "cardSheetId"));
              disAssignObject.put("disAssignTypeEnumId", 2);
              disAssignObject.put("disAssignObjectTypeEnumId", JsonUtil.getInt(jsonObj, "auditMyObjectType"));
              
              if(1==JsonUtil.getInt(jsonObj, "auditMyObjectType")){//组织，则targetPerson为数字，可插入disAssignObjectId字段
                  disAssignObject.put("disAssignObjectId", JsonUtil.getString(jsonObj, "auditMyObjectId"));
              }else if(3==JsonUtil.getInt(jsonObj, "auditMyObjectType")){//人员，则targetPerson为字符，只能插入disAssignOpinion字段，disAssignObjectId字段为必填，添加临时值
                  disAssignObject.put("disAssignObjectId", 1);
                  disAssignObject.put("disAssignOpinion", JsonUtil.getString(jsonObj, "auditMyObjectId"));
              }
              
              disAssignObject.put("disAssignObjectName", JsonUtil.getString(jsonObj, "auditMyObjectName"));
              disAssignObject.put("createdBy", JsonUtil.getString(jsonObj, "createdBy"));
              disAssignObject.put("creationDate", new Date());
              disAssignObject.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "createdBy"));
              disAssignObject.put("lastUpdateDate", new Date());
              disAssignObject.put("deletionDate", new Date());
              eomDisAssignObjectListDAO.saveDisAssignObject(disAssignObject);
          }
        
        if(JsonUtil.getString(jsonObj, "doFlag")!=null&&JsonUtil.getString(jsonObj, "doFlag").length()!=0&&"draft".equals(JsonUtil.getString(jsonObj, "doFlag"))){
            return "";
        }
        
        if(JsonUtil.getString(jsonObj, "doFlag")!=null&&JsonUtil.getString(jsonObj, "doFlag").length()!=0&&"submit".equals(JsonUtil.getString(jsonObj, "doFlag"))){
            startWorkFlow(jsonObj,JsonUtil.getLong(jsonObj, "cardSheetId"));
            return "";
        }
        
        //以下为流程流转等处理
        String processInstanceId = JsonUtil.getString(jsonObj, "processInstanceId");
        String activityInstanceId = JsonUtil.getString(jsonObj, "activityInstanceId");
        String taskInstanceId = JsonUtil.getString(jsonObj, "taskInstanceId");
        
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", processInstanceId);
        proObj.put("activityInstanceId", activityInstanceId);
        proObj.put("taskInstanceId", taskInstanceId);
        
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "cardSheetId"));
        proObj.put("processingSeqNum", 1);
        
//        ProcessConditionMessages processConditionMessage = new ProcessConditionMessages();//流程参数对象
        Map<String,Object> map = new HashMap<String,Object>();
        proObj.put("processingTypeEnumId", MODIFY);
        
        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "operatorName")+"]修改了工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单");
//        proObj.put("processingExpiredTime", new Date());
        proObj.put("createdBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "processingOrgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "operateDepartmentName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "operatorName"));
        
        genProcessingInfoRecDAO.save(proObj);//插入通用表
        
        LogService service = new LogService();
        QueryParameterObject queryParameterObject = new QueryParameterObject();
        queryParameterObject.setAppGroupId("20130308");
        queryParameterObject.setAppId("BM_D0FD24A1C09C4DDF8C88D57CEFF4188C");
        queryParameterObject.setOrgId(JsonUtil.getString(jsonObj, "processingOrgId"));
        queryParameterObject.setUserId(JsonUtil.getString(jsonObj, "lastUpdatedBy"));
        queryParameterObject.setOpDateTime(new Date());
        queryParameterObject.setOperType("测试卡工单");
        queryParameterObject.setLogLevel("INFO");
        queryParameterObject.setLogContent("["+JsonUtil.get(jsonObj, "lastUpdatedBy")+"]修改了工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单");//和通用信息相同
        queryParameterObject.setOperObjSubType("1");
        queryParameterObject.setOperObjId("1");
        queryParameterObject.setOperObjType("1");
        queryParameterObject.setOperObjSubType("1");
        service.writeLogService(queryParameterObject);//日志服务，插入日志
        
//        BPMServiceFactory factory = BPMServiceFactory.getInstance();
        // 初始化
        
//        String userID = JsonUtil.getString(jsonObj, "targetPersonName");
//        String appID = "123";
//        String token = "321";
//        WorkflowObjectInterface workflow = factory.getWorkflowService(userID, appID, token);
//        workflow.setRelativeData(processInstanceId, map);

//        Participant participant1 = new Participant(); //下一步参与者
//        participant1.setAccountID("goose");
//        TaskInstance taskInstance = workflow.getTaskInstanceObject(taskInstanceId);
//        workflow.submitTask(taskInstance, participant1);
        
     // 待办回单↓
        WorkflowMana wf = new WorkflowMana();
        
//        List <Participant>  participants = new ArrayList<Participant>() ;
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
//        Participant participant;
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginName"));
        paramDto.setAccountPassWord("passWord");
//        Participant participant = new Participant();  
//        participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
//        participant.setParticipantType(JsonUtil.getString(jsonObj, "targetType"));
//        List <Participant>  participants = new ArrayList<Participant>() ;
//        participants.add(participant);
//        paramDto.setParticipants(participants);
        
      
        
        paramDto.setTaskId(taskInstanceId);
        paramDto.setProcessInstId(processInstanceId);
        paramDto.setActivityInstId(activityInstanceId);
       // Map<String, Object> map = new HashMap<String, Object>();
       // map.put("isPass", 0);
//         paramDto.setRelativeDataMap(map);
        
        List<ActivityDef> l = wf.getNextActivitiesMaybeArrived(paramDto);
        if(l.size()!=0){
            ActivityDef aa = l.get(0);
            paramDto.setActivityDefId(aa.getActivityID());
            wf.clearAppointedActivityParticipants(paramDto);
        }
        
        wf.updateJobTitleInfo(paramDto,JsonUtil.getString(jsonObj, "sheetTheme"));//修改流程引擎的工单标题
        
        Map<String, Object> reDataMap = new HashMap<String, Object>();
      //修改时修改流程扩展信息↓
//        Map<String, Object> bizMap = new HashMap<String, Object>();
//        bizMap = setBizMap(bizMap,jsonObj);
//        paramDto = setParam(paramDto,jsonObj);
//        paramDto.setBizModleParams(bizMap);
        reDataMap = setRelativeDataMapAtMod(reDataMap,jsonObj);
      //修改时修改流程扩展信息↑
        
        if(JsonUtil.getString(jsonObj, "targetType")!=null&&!"".equals(JsonUtil.getString(jsonObj, "targetType"))){
            if("1".equals(JsonUtil.getString(jsonObj, "targetType"))){//人员
                System.out.println("=========人员==================");
                Participant participant;
                participant = new Participant();
                participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
                participant.setParticipantType(JsonUtil.getString(jsonObj, "targetType"));
                System.out.println("=========================="+JsonUtil.getString(jsonObj, "targetPerson"));
                List <Participant>  participants = new ArrayList<Participant>() ;
                participants.add(participant);
                paramDto.setParticipants(participants);
            }else{//组织
                System.out.println("=========组织==================");
//                Map<String, Object> reDataMap = new HashMap<String, Object>();
                reDataMap.put("orgcode",JsonUtil.getString(jsonObj, "targetPerson"));
                reDataMap.put("productcode","");
                reDataMap.put("areacode","");
                reDataMap.put("roleclass","");
                reDataMap.put("majorcode","");
//                paramDto.setRelativeDataMap(reDataMap);

                
//                Participant participant;
//                participant = new Participant();
//                participant.setParticipantID(JsonUtil.getString(jsonObj,"targetPerson"));
//                participant.setParticipantType(WorkflowMana.ORG);  
//                List <Participant>  participants = new ArrayList<Participant>() ;
//                participants.add(participant);
//                paramDto.setParticipants(participants);
            }
        }
        
      
        
      //建议完成时间 设定时限
        
        DecimalFormat num = new DecimalFormat("00.00");
        String timeDiff = num.format(JsonUtil.getDouble(jsonObj, "flowTimeLimit"));
        reDataMap.put("flowTimeLimit", timeDiff);
        paramDto.setRelativeDataMap(reDataMap);
        
        wf.submitTask(paramDto);
     // 待办回单↑
        return "";
    }

    private Map<String, Object> setRelativeDataMapAtMod(Map<String, Object> reDataMap,
            JSONObject jsonObj) throws ParseException, JSONException {
        if(JsonUtil.getString(jsonObj, "requiredFinishTime")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTime"))){//建议完成时间
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
            
            Date d = format.parse(JsonUtil.getString(jsonObj, "requiredFinishTime"));
            reDataMap.put(Global.DA_COLUMN1, d);
        }
        if(JsonUtil.getString(jsonObj, "woNo")!=null&&!"".equals(JsonUtil.getString(jsonObj, "woNo"))){//工单流水号
            reDataMap.put(Global.BIZ_STRCOLUMN1, JsonUtil.getString(jsonObj, "woNo"));
        }
        if(JsonUtil.getString(jsonObj, "flowExecutor")!=null&&!"".equals(JsonUtil.getString(jsonObj, "flowExecutor"))){//执行对象
            reDataMap.put(Global.BIZ_STRCOLUMN2, JsonUtil.getString(jsonObj, "flowExecutor"));
        }
        if(JsonUtil.getString(jsonObj, "urgencyLevel")!=null&&!"".equals(JsonUtil.getString(jsonObj, "urgencyLevel"))){//缓急程度
            reDataMap.put(Global.BIZ_NUMCOLUMN1, JsonUtil.getString(jsonObj, "urgencyLevel"));
        }
        return reDataMap;
    }

    @Override
    public List<Map<String, Object>> qryAtestCardOrderTestCard(JSONObject jsonObj) {
        
        return testCardOrderApplyDAO.qryAtestCardOrderTestCard(jsonObj);
    }
    
    /**
     * by jiang.yean
     */
    @Override
    public List<Map<String, Object>> qryOrderDetailForTestCardManage(JSONObject jsonObj) {

        return testCardOrderApplyDAO.qryOrderDetailForTestCardManage(jsonObj);
    }

    @Override
    public Page qryEomCardSheetPageByParam(JSONObject jsonObj) throws Exception {
        return testCardOrderApplyDAO.qryEomCardSheetPageByParam(jsonObj);
    }
    
    @Override
    public List qryMustReturnTestCard(JSONObject jsonObj) throws Exception {
        return testCardOrderApplyDAO.qryMustReturnTestCard(jsonObj);
    }

    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
     // 字段名，结果集对应key，用“,”分隔，先后顺序与导出结果的列顺序一致。
        String fields = "sheetSerialNumber,sheetTypeName,sheetTheme,urgencyLevel,requiredFinishTime,finishTime,dispatchDate,sheetStatusName";
        // 列名，excel中的显示名
        String columns = "工单流水号,工单类型,工单主题,缓急程度,建议完成时间,完成时间,创建时间,工单状态";
        // 列宽，excel中的列宽，该值为空则使用默认的每列20
        String width = "20,20,20,20,20,20,20,20";
        // {dictId=2, dataName=国内X电路, dataValue=2, dataType=1, dataTypeName=电路类型, extCol1=null,
        // extCol2=null, extCol3=null, orderIndex=3}
        System.out.println("==================JsonUtil.getString(param,exportType)=================="+JsonUtil.getString(param,"exportType"));
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&!"SELECTED".equals(JsonUtil.getString(param,"exportType"))){
            param.remove("selectIds");
        }
        
        // 列表数据
        Page page = testCardOrderApplyDAO.qryEomCardSheetPageByParam(param);
        List<Map<String, Object>> dataList = page.getData();

        // 生成excel参数

        // excel里面的标题
        String title = "测试卡工单列表";
        // excel里面sheet的名称
        String titleEn = "测试卡工单列表";

        String[] fieldsId = fields.split(",");
        String[] fieldsName = columns.split(",");
        String[] widths = width.split(",");

        SimpleExportParameter parameters = new SimpleExportParameter();
        
        parameters.setTitle(title);

        parameters.setTitleEn(titleEn);
        parameters.setFieldsId(fieldsId);
        parameters.setFieldsName(fieldsName);
        parameters.setWidths(widths);
        
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&"SELECTED".equals(JsonUtil.getString(param,"exportType"))
                &&JsonUtil.getString(param,"selectIds")==null){//如果导出选中但是没有选中任何记录，就导出空白列表
            parameters.setDataList(new ArrayList());
        }else{
            parameters.setDataList(dataList);
        }

        return parameters;
    }



}
