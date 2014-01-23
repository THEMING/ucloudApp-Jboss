package com.unicom.ucloud.eom.e19.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.AccountEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dto.WorkFlowParamDto;
import com.unicom.ucloud.eom.base.workflow.WorkflowMana;
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelProcDAO;
import com.unicom.ucloud.eom.e19.dao.IEomDisAssignObjectListDAO;
import com.unicom.ucloud.eom.e19.dao.IGenProcessingInfoRecDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardCommonDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.workflow.filters.TaskFilter;
import com.unicom.ucloud.workflow.objects.ActivityDef;
import com.unicom.ucloud.workflow.objects.Participant;
import com.unicom.ucloud.workflow.objects.TaskInstance;
@Service
public class TestCardCommonServiceImpl implements ITestCardCommonService {
    
    private static final int COUNTERSIGN = 17;//会签处理类型
    private static final int COUNTERSIGNRETURN = 20;//会签回单处理类型
    private static final int DISPATCH = 8;//转派处理类型
    private static final int DISPATCHCOMMIT = 22;//转派回单处理类型
    private static final String TASK_TYPE_TODO = "1"; // 待办
    private final String CHECK = "11";//审核
    private final String HIGHERCHECK = "21";//上级审核
    private final String APPROVE = "审核";//审核

    @Autowired
    private ITestCardCommonDAO infoRecDao;
    @Autowired
    private IEomDisAssignObjectListDAO eomDisAssignObjectListDAO;
    @Autowired
    private IGenProcessingInfoRecDAO genProcessingInfoRecDAO;
    @Autowired
    private IAttachmentRelProcDAO attachmentRelProcDAO;
    private Logger logger = Logger.getLogger(this.getClass());
    
    @Override
    public List<Map<String, Object>> qryOpearateHisList(JSONObject jsonObj) throws Exception {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> participantMap = null;
        String participantType = null;
        String participantID = null;
        String participantStatus = null;//参与者执行状态 0未执行 1已执行
        UserEntity userEntity = null;
        OrgEntity orgEntity = null;
        List<AccountEntity> accounts = null;
        StringBuffer person = null;
        StringBuffer processingObj = null;
        StringBuffer processingObjID = null;
        StringBuffer processingObjType = null;
        AAAAService aaaaService = new AAAAService();
        WorkflowMana workflowMana = new WorkflowMana();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "accountName"));
        paramDto.setAccountPassWord(JsonUtil.getString(jsonObj, "password"));
        paramDto.setProcessInstId(JsonUtil.getString(jsonObj, "processInstId"));
        System.out.println(JsonUtil.getString(jsonObj, "processInstId")+"bbbbbbbb");
        List<TaskInstance> taskInstances = workflowMana.getCurrentTaskInstance(paramDto);
        List<Participant> participants = null;
        for(TaskInstance taskInst: taskInstances){
            processingObj = new StringBuffer();
            processingObjID = new StringBuffer();
            processingObjType = new StringBuffer();
            if(taskInst!=null){
                participants = taskInst.getParticipants();
            }
            if(participants!=null){
                logger.info("工作项ID:"+taskInst.getTaskInstID()+"参与者 size："+participants.size());
                for(Participant part:participants){
                    if(part !=null){
                        participantID = part.getParticipantID();
                        participantType = part.getParticipantType();
                        participantStatus = part.getParticipantStatus();
                        
                    }
                    if(participantType!=null && participantID!=null && "0".equals(participantStatus)){
                        if(participantType.equals(WorkflowMana.PERSION)){
                            userEntity = aaaaService.findUserByPortalAccountId(participantID);
                            if(userEntity != null){
                                processingObj.append(userEntity.getEmpName()).append(",");
                                processingObjID.append(userEntity.getCloudUserId()).append(",");
                                processingObjType.append("1,");
                            }
                        }else if(participantType.equals(WorkflowMana.ROLE)){
                            person = new StringBuffer();
                            accounts = aaaaService.findAccountListByRoleID(Integer.valueOf(participantID));
                            if(accounts !=null){
                            	   for(AccountEntity accout: accounts){
                                       if(accout!=null && accout.getCloudUserId()!=null){
                                           userEntity = aaaaService.findUserbyUserID(accout.getCloudUserId());
                                           if(userEntity != null){
                                               person.append(userEntity.getEmpName()).append(",");
                                               processingObjID.append(userEntity.getCloudUserId()).append(",");
                                               processingObjType.append("1,");
                                           }
                                       }
                                   }
                            }
                            if(person.length()>0){
                                person = new StringBuffer(person.substring(0, person.length()-1));
                            }
                            processingObj.append(person).append(",");
                        }else if(participantType.equals(WorkflowMana.ORG)){
                            orgEntity = aaaaService.findOrgByOrgID(Integer.valueOf(participantID));
                            if(orgEntity != null){
                                processingObj.append(orgEntity.getOrgName()).append(",");
                                processingObjID.append(orgEntity.getCloudOrgId()).append(",");
                                processingObjType.append("3,");
                            }
                        }
                    }
                }
            }
            if(processingObj.length()>0){
                processingObj = new StringBuffer(processingObj.substring(0, processingObj.length()-1));
            }
            if(processingObjID.length()>0){
                processingObjID = new StringBuffer(processingObjID.substring(0, processingObjID.length()-1));
            }
            if(processingObjType.length()>0){
                processingObjType = new StringBuffer(processingObjType.substring(0, processingObjType.length()-1));
            }
            logger.debug("=============="+processingObj.toString());
            participantMap = new HashMap<String, Object>();
            participantMap.put("operator", processingObj.toString());
            participantMap.put("createdBy", processingObjID.toString());
            participantMap.put("processingObjType", processingObjType.toString());
          //  participantMap.put("activityName", taskInst.getActivityInstName());
            participantMap.put("operateResult", "尚未处理");
            list.add(participantMap);
        }
    	
        List <Map<String, Object>> processingList =  infoRecDao.qryOpearateHisList(jsonObj);
        list.addAll(processingList);
        return list;
    }
    
    @Override
    public Page queryByPage(JSONObject jsonObj) throws Exception{
        return infoRecDao.queryByPageProc(jsonObj);
    }
    
    @Override
    public List<Map<String, Object>> qryDisAssignObjectListByParam(JSONObject jsonObj) throws Exception{
        
        return eomDisAssignObjectListDAO.qryDisAssignObjectListByParam(jsonObj);
    }
    
    /**
     *  查询活动扩展配置的相关信息

     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public JSONArray getExtendAttributesArray(JSONObject jsonObj) throws Exception {
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskInstID"));
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "accountName"));
        WorkflowMana wf = new WorkflowMana();
        JSONArray array = wf.getExtendAttributesArray(paramDto);
        return array;
    }
    
    /** 
     * 查询下一环节参与者

     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    @Override
    public String qryNextPaticipants(JSONObject jsonObj) throws Exception {
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        WorkflowMana wf = new WorkflowMana();
        AAAAService aaaaService = new AAAAService();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setProcessInstId(JsonUtil.getString(jsonObj, "processInstID"));
        paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskInstID"));
        paramDto.setActivityInstId(JsonUtil.getString(jsonObj, "activityInstID"));
//        List<ActivityDef> l = wf.getNextActivitiesMaybeArrived(paramDto);
//        if(l.size()!=0){System.out.println("===============qryNextPaticipants=");
//            ActivityDef aa = l.get(0);
//            paramDto.setActivityDefId(aa.getActivityID());
//            wf.clearAppointedActivityParticipants(paramDto);
//        }
        
        JSONArray roleList = new JSONArray();
        /*
        Parameters可包含的字段说明：

        productcode     产品
        areacode        区域
        majorcode        专业
        orgcode        组织
        roleclass        抽象角色
        */
        
        LinkedHashMap<String , Object> parameters = new LinkedHashMap<String , Object>();
        
        Map<String, Object> relativeDataMap = new HashMap<String, Object>();
        relativeDataMap.put("isPass", "1");//路由信息
        relativeDataMap.put("isNeedCountersign", "99");//路由信息
        relativeDataMap.put("turnSendFlag", "99");//路由信息
        
//        if(JsonUtil.get(jsonObj, "orgcode") != null){
//            relativeDataMap.put("orgcode",  JsonUtil.getString(jsonObj, "orgcode"));
//        }else{
//            relativeDataMap.put("orgcode",  "");
//        }
        
   /*     Integer orgcode = JsonUtil.getInt(jsonObj, "orgcode");
        StringBuffer orgIdArray = new StringBuffer();
        if(orgcode != null){
             //查出该组织的全路径
            List<OrgEntity> pathOrgList = aaaaService.getAsboluteOrgHierarchy(orgcode.intValue());
            if(pathOrgList != null && pathOrgList.size() > 0){
                for(int i=0;i<pathOrgList.size();i++){
                    OrgEntity org = pathOrgList.get(i);
                    orgIdArray.append(org.getCloudOrgId()).append(",");
                    if(pathOrgList.size() > 1){//获取前段传过来的组织的上级组织，组织路径长度必须大于1，即不是中国联通
                        int index = pathOrgList.size() - 2;//计算才上级组织的索引位置
                        org = pathOrgList.get(index);//获得上级组织的组织信息
                        List<OrgEntity> orgList = aaaaService.findOrgListByParentID(org.getCloudOrgId());
                        if(orgList != null && orgList.size() > 0){
                            for(int j=0;j<orgList.size();j++){
                                orgIdArray.append(orgList.get(j).getCloudOrgId()).append(",");
                            }
                        }
                    }
                }
            }
            if(orgIdArray.length() > 0){
                relativeDataMap.put("orgcode",  orgIdArray.substring(0, orgIdArray.lastIndexOf(",")));
            }else{
                relativeDataMap.put("orgcode",  "");
            }
        }else{
            relativeDataMap.put("orgcode",  "");
        }*/
        if(JsonUtil.get(jsonObj, "orgcode") != null){
            relativeDataMap.put("orgcode",  JsonUtil.getString(jsonObj, "orgcode"));
        }else{
            relativeDataMap.put("orgcode",  "");
        }

        
        if(JsonUtil.get(jsonObj, "productcode") != null){
            relativeDataMap.put("productcode",  JsonUtil.getString(jsonObj, "productcode"));
        }else{
            relativeDataMap.put("productcode",  "");
        }
        if(JsonUtil.get(jsonObj, "areacode") != null){
            relativeDataMap.put("areacode",  JsonUtil.getString(jsonObj, "areacode"));
        }else{
            relativeDataMap.put("areacode",  "");
        }
        if(JsonUtil.get(jsonObj, "majorcode") != null){
            relativeDataMap.put("majorcode",  JsonUtil.getString(jsonObj, "majorcode"));
        }else{
            relativeDataMap.put("majorcode",  "");
        }
        if(JsonUtil.get(jsonObj, "roleclass")!=null){
            relativeDataMap.put("roleclass",  JsonUtil.getString(jsonObj, "roleclass"));
        }else{
            relativeDataMap.put("roleclass",  "");
        }
        paramDto.setRelativeDataMap(relativeDataMap);
        
        wf.setRelativeData(paramDto);
        
        List<ActivityDef> activityList = wf.getNextActivitiesMaybeArrived(paramDto);
        if(activityList != null && activityList.size() > 0){
            for(int i=0;i<activityList.size();i++){
                ActivityDef activityDef = activityList.get(i);
                
                paramDto.setActivityDefId(activityDef.getActivityID());
                wf.clearAppointedActivityParticipants(paramDto);//先清除参与者
                List<Participant> participantList = wf.getProbableParticipants(paramDto, parameters);
                if(participantList != null && participantList.size() > 0){
                    for(int j=0;j<participantList.size();j++){
                        Participant partic = participantList.get(j);
                        
                        JSONObject particObj = new JSONObject();
                        particObj.put("participantType",partic.getParticipantType());
                        particObj.put("participantID",partic.getParticipantID());
                        particObj.put("participantName",partic.getParticipantName());
                        
                        roleList.put(particObj);
                    }
                }
            }
        }
        
        return roleList.toString();
    }
    
    /**
     * 转派
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public void saveTurnSendTask(JSONObject jsonObj) throws Exception {
        Date now = new Date();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "staffName"));
        paramDto.setAccountPassWord("password");

        String processInstId = JsonUtil.getString(jsonObj, "processInstId");

        Map<String, Object> map = new HashMap<String, Object>();

        map.put("turnSendFlag", "1");
        map.put("isPass", 99);
        map.put("isNeedCountersign", 99);

    //    DecimalFormat num = new DecimalFormat("00.00");
        double diff = JsonUtil.getDouble(jsonObj, "diff");
     //   String timeDiff = num.format(diff);
        map.put("timeLimite",String.valueOf(diff));
        
        
        // 查询流程启动下一步参与者

        Participant[] participants = null;
       
//        String auditId = jsonObj.getString("auditId");
//        String auditName = JsonUtil.getString(jsonObj, "auditName");
//        String[] actorTypes = JsonUtil.getString(jsonObj, "actorType").split(",");
//        String[] auditIdArr = auditId.split(",");
//
//        if (auditIdArr.length > 0) {
//            participants = new Participant[auditIdArr.length];
//            for (int i = 0; i < auditIdArr.length; i++) {
//                Participant partici = new Participant();
//                if("1".equals(actorTypes[i])){//person
//                    partici.setParticipantID(auditIdArr[i]);
//                    partici.setParticipantType(WorkflowMana.PERSION);
//                    participants[i] = partici;
//                }else if("0".equals(actorTypes[i])){//org
//                    partici.setParticipantID(auditIdArr[i]);
//                    partici.setParticipantType(WorkflowMana.ORG);
//                    participants[i] = partici;
//                }
//            }
//        }
        
        String auditName = JsonUtil.getString(jsonObj, "actorUser");
        String[] actorTypes = JsonUtil.getString(jsonObj, "actorType").split(",");//类型
        String[] actorUserIds = JsonUtil.getString(jsonObj, "actorUserId").split(",");//账号ID，int
        String[] actorIds = null;
        if(JsonUtil.getString(jsonObj, "actorId") != null){
            actorIds = JsonUtil.getString(jsonObj, "actorId").split(",");//accountId,字符类型，组织的话为空

        }

        if (actorUserIds.length > 0) {
            participants = new Participant[actorUserIds.length];
            for (int i = 0; i < actorUserIds.length; i++) {
                Participant partici = new Participant();
                if("1".equals(actorTypes[i])){//person
                    partici.setParticipantID(actorIds[i]);
                    partici.setParticipantType(WorkflowMana.PERSION);
                    participants[i] = partici;
                }else if("0".equals(actorTypes[i])){//org
                    partici.setParticipantID(actorUserIds[i]);
                    partici.setParticipantType(WorkflowMana.ORG);
                    participants[i] = partici;
                }
            }
        }
        
        JSONArray fileList =  new  JSONArray(JsonUtil.getString(jsonObj, "fileList"));
        if(fileList.length()!=0){
//            attachmentRelGenDAO.addBatch(fileList, "T_EOM_CARD_SHEET", tempId);
            attachmentRelProcDAO.addBatch(fileList, "T_EOM_CARD_SHEET", JsonUtil.getLong(jsonObj, "workOrderId"));
        }

        map.put("participants", participants);// 下一环节参与者


        paramDto.setRelativeDataMap(map);
        paramDto.setProcessInstId(processInstId);
        paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskId"));

        
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", JsonUtil.get(jsonObj, "processInstId"));
        proObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstId"));
        proObj.put("taskInstanceId", JsonUtil.get(jsonObj, "taskId"));
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "workOrderId"));
        proObj.put("processingSeqNum", 1);
        proObj.put("processingTypeEnumId", DISPATCH);
        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "staffName")+"]对工单发起了转派,派给如下对象："+auditName);
        proObj.put("processingDesc", JsonUtil.get(jsonObj, "forwardDesc"));
        proObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "staffId"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "orgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "orgName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "staffName"));
        genProcessingInfoRecDAO.save(proObj);//插入通用表
        WorkflowMana wf = new WorkflowMana();
        wf.submitTask(paramDto);
    }
    
    /** 
     * 转派回单
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    @Override
    public void saveTurnSend(JSONObject jsonObj) throws Exception {
        Date now = new Date();
        Integer lastUpdatedBy = JsonUtil.getInt(jsonObj, "lastUpdatedBy");
        Integer shardingId = JsonUtil.getInt(jsonObj, "shardingId");
        Integer orgId = JsonUtil.getInt(jsonObj, "orgId");
        String processInstID = JsonUtil.getString(jsonObj, "processInstID");
        String activityInstID = JsonUtil.getString(jsonObj, "activityInstID");
        String taskInstID = JsonUtil.getString(jsonObj, "taskInstID");
        String woInfoId = JsonUtil.getString(jsonObj, "woInfoId");
        
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setTaskId(taskInstID);
        paramDto.setProcessInstId(processInstID);
        
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("turnSendFlag", "0");
        paramDto.setRelativeDataMap(map);
        
        
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", processInstID);
        proObj.put("activityInstanceId", activityInstID);
        proObj.put("taskInstanceId", taskInstID);
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", woInfoId);
        proObj.put("processingSeqNum", 1);
        proObj.put("processingTypeEnumId", DISPATCHCOMMIT);
        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "createdByName")+"]对工单进行了转派回单");
        proObj.put("processingDesc", JsonUtil.get(jsonObj, "replyMessage"));
        proObj.put("createdBy", lastUpdatedBy);
        proObj.put("lastUpdatedBy", lastUpdatedBy);
        proObj.put("processingOrgId", orgId);
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "orgName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "createdByName"));
        genProcessingInfoRecDAO.save(proObj);//插入通用表
            
            JSONArray fileList =  new  JSONArray(JsonUtil.getString(jsonObj, "fileList"));
            if(fileList.length()!=0){
//                attachmentRelGenDAO.addBatch(fileList, "T_EOM_CARD_SHEET", tempId);
                attachmentRelProcDAO.addBatch(fileList, "T_EOM_CARD_SHEET", JsonUtil.getLong(jsonObj, "woInfoId"));
            }
        WorkflowMana wf = new WorkflowMana();
        wf.submitTask(paramDto);
    }
    
    /**会签
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public JSONObject addCounterSign(JSONObject jsonObj) throws Exception {
        Date now = new Date();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "staffName"));
        paramDto.setAccountPassWord("password");

        String processInstId = JsonUtil.getString(jsonObj, "processInstId");

        Map<String, Object> map = new HashMap<String, Object>();
        // 是否会签,否则进入下一步环节


        map.put("isNeedCountersign", JsonUtil.get(jsonObj, "isCountSign"));
        map.put("isPass", 99);//设为99，避免流程两边走

        // 查询流程启动下一步参与者

        Participant[] participants = null;
       
        String auditId = jsonObj.getString("auditId");
        String[] auditIdArr = auditId.split(",");

        if (auditIdArr.length > 0) {
            participants = new Participant[auditIdArr.length];
            for (int i = 0; i < auditIdArr.length; i++) {
                Participant partici = new Participant();
                partici.setParticipantID(auditIdArr[i]);
                partici.setParticipantType(WorkflowMana.PERSION);
                participants[i] = partici;
            }
        }

        map.put("participants", participants);// 下一环节参与者
        
        String orgCode="";
        String executorAccount = JsonUtil.getString(jsonObj, "actorId");
        String executorId = JsonUtil.getString(jsonObj, "actorUserId");
        String executorName = JsonUtil.getString(jsonObj, "actorUser");
        String excutorType = JsonUtil.getString(jsonObj, "thisType");
        String[] acceptType = excutorType.split(",");
        String[] acceptIdDep = executorId.split(",");
        String[] acceptAccountDep = null;
        if(executorAccount != null && !"".equals(executorAccount)){
            acceptAccountDep = executorAccount.split(",");
        }
        String[] acceptDepName = executorName.split(",");
        String[] objs = new String[acceptIdDep.length];
        for (int i = 0; i < objs.length; i++) {
            String participant="";
            if(acceptType[i].equals("Person")){ 
                participant="{\"participantID\":\""+acceptAccountDep[i]+"\",\"participantName\":\""+acceptDepName[i]+"\",\"participantType\":\""+1+"\"}";
            }else{
                orgCode=acceptIdDep[i];
            }
            objs[i] = "{\"areacode\":[\"\"],\"majorcode\":[\"\"],\"orgcode\":[\""
                    + orgCode + "\"],\"productcode\":[\"\"],\"participant\":["+participant+"]}";
            logger.debug("传入流程的JSON串参数objs[i]" + objs[i]);
        }
        
        map.put("objs", objs); 


        paramDto.setRelativeDataMap(map);
        paramDto.setProcessInstId(processInstId);
        paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskId"));
        WorkflowMana wf = new WorkflowMana();
        wf.submitTask(paramDto);
        
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", JsonUtil.get(jsonObj, "processInstId"));
        proObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstId"));
        proObj.put("taskInstanceId", JsonUtil.get(jsonObj, "taskId"));
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "workOrderId"));
        proObj.put("processingSeqNum", 1);
        proObj.put("processingTypeEnumId", COUNTERSIGN);
        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "staffName")+"]对工单发起了会签");
        proObj.put("processingDesc", JsonUtil.getString(jsonObj, "forwardDesc"));
        proObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "staffId"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "orgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "orgName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "staffName"));
        genProcessingInfoRecDAO.save(proObj);//插入通用表

        return jsonObj;
    }
    
    /**上级审核
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public void superiorsAudit(JSONObject jsonObj) throws Exception {
        String processInstanceId = JsonUtil.getString(jsonObj, "processInstId");
        String activityInstanceId = JsonUtil.getString(jsonObj, "activityInstId");
        String taskInstanceId = JsonUtil.getString(jsonObj, "taskId");
        
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", processInstanceId);
        proObj.put("activityInstanceId", activityInstanceId);
        proObj.put("taskInstanceId", taskInstanceId);
        
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "workOrderId"));
        proObj.put("processingSeqNum", 1);
        
        proObj.put("processingTypeEnumId", HIGHERCHECK);
        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "staffName")+"]对工单审核通过并发起了上级审核，审核人为:"+JsonUtil.getString(jsonObj, "superiorsAuditName"));
       
        proObj.put("processingDesc", "["+JsonUtil.get(jsonObj, "staffName")+"]对工单审核通过并发起了上级审核，审核人为:"+JsonUtil.getString(jsonObj, "superiorsAuditName"));
//        proObj.put("processingExpiredTime", new Date());
        proObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "staffId"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "orgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "orgName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "staffName"));
        
        genProcessingInfoRecDAO.save(proObj);//插通用表
        
      WorkFlowParamDto paramDto = new WorkFlowParamDto();
      Map<String, Object> reDataMap = new HashMap<String, Object>();
      if(JsonUtil.getString(jsonObj, "superiorsAuditType")!=null&&!"".equals(JsonUtil.getString(jsonObj, "superiorsAuditType"))){
          if("Person".equals(JsonUtil.getString(jsonObj, "superiorsAuditType"))){//人员
              System.out.println("=========人员==================");
              Participant participant;
              participant = new Participant();
              participant.setParticipantID(JsonUtil.getString(jsonObj, "superiorsAcountId"));
              participant.setParticipantType(WorkflowMana.PERSION);
              System.out.println("=========================="+JsonUtil.getString(jsonObj, "superiorsAcountId"));
              List <Participant>  participants = new ArrayList<Participant>() ;
              participants.add(participant);
              paramDto.setParticipants(participants);
          }else{//组织
              System.out.println("=========组织==================");
//              Map<String, Object> reDataMap = new HashMap<String, Object>();
              reDataMap.put("orgcode",JsonUtil.getString(jsonObj, "superiorsAuditId"));
              reDataMap.put("productcode","");
              reDataMap.put("areacode","");
              reDataMap.put("roleclass","");
              reDataMap.put("majorcode","");
//              paramDto.setRelativeDataMap(reDataMap);

              
//              Participant participant;
//              participant = new Participant();
//              participant.setParticipantID(JsonUtil.getString(jsonObj,"targetPerson"));
//              participant.setParticipantType(WorkflowMana.ORG);  
//              List <Participant>  participants = new ArrayList<Participant>() ;
//              participants.add(participant);
//              paramDto.setParticipants(participants);
          }
      }
 //     paramDto.setRelativeDataMap(reDataMap);
      paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
      paramDto.setAccountName(JsonUtil.getString(jsonObj, "staffName"));
      paramDto.setAccountPassWord("passWord");
      /*Participant participant;
      participant = new Participant();
      participant.setParticipantID(JsonUtil.getString(jsonObj, "superiorsAcountId"));
      participant.setParticipantType(WorkflowMana.PERSION);
      System.out.println("=========================="+JsonUtil.getString(jsonObj, "superiorsAcountId"));
      List <Participant>  participants = new ArrayList<Participant>() ;
      participants.add(participant);
      paramDto.setParticipants(participants);*/
  //    Map<String,Object> map = new HashMap<String,Object>();
      reDataMap.put("isPass",3);
      reDataMap.put("isNeedCountersign", 99);
      reDataMap.put("turnSendFlag", 99);
      paramDto.setRelativeDataMap(reDataMap);//设isPass变量
      paramDto.setTaskId(taskInstanceId);
      paramDto.setProcessInstId(processInstanceId);
      paramDto.setActivityInstId(activityInstanceId);
      WorkflowMana wf = new WorkflowMana();
      paramDto.setActivityDefId(JsonUtil.getString(jsonObj, "activityDefId"));
      System.out.println("=========================="+JsonUtil.getString(jsonObj, "activityDefId"));
      wf.clearAppointedActivityParticipants(paramDto);
      wf.submitTask(paramDto);//回单
        
        
        
        
        
        
        
        
//        param.workOrderId = rowData.jobId;
//        param.processInstId = rowData.processInstID;
//        param.activityInstId = rowData.activityInstID;
//        param.taskId = rowData.taskInstID;
        
        
        
        
        
        
        
        
        
//        Date now = new Date();
//        WorkFlowParamDto paramDto = new WorkFlowParamDto();
//        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
//        paramDto.setAccountName(JsonUtil.getString(jsonObj, "staffName"));
//        paramDto.setAccountPassWord("password");
//
//        String processInstId = JsonUtil.getString(jsonObj, "processInstId");
//
//        Map<String, Object> map = new HashMap<String, Object>();
//        // 是否会签,否则进入下一步环节
//
//
//        map.put("isNeedCountersign", JsonUtil.get(jsonObj, "isCountSign"));
//        map.put("isPass", 99);//设为99，避免流程两边走
//
//        // 查询流程启动下一步参与者
//
//        Participant[] participants = null;
//       
//        String auditId = jsonObj.getString("auditId");
//        String[] auditIdArr = auditId.split(",");
//
//        if (auditIdArr.length > 0) {
//            participants = new Participant[auditIdArr.length];
//            for (int i = 0; i < auditIdArr.length; i++) {
//                Participant partici = new Participant();
//                partici.setParticipantID(auditIdArr[i]);
//                partici.setParticipantType(WorkflowMana.PERSION);
//                participants[i] = partici;
//            }
//        }
//
//        map.put("participants", participants);// 下一环节参与者
//        
//        String orgCode="";
//        String executorAccount = JsonUtil.getString(jsonObj, "actorId");
//        String executorId = JsonUtil.getString(jsonObj, "actorUserId");
//        String executorName = JsonUtil.getString(jsonObj, "actorUser");
//        String excutorType = JsonUtil.getString(jsonObj, "thisType");
//        String[] acceptType = excutorType.split(",");
//        String[] acceptIdDep = executorId.split(",");
//        String[] acceptAccountDep = null;
//        if(executorAccount != null && !"".equals(executorAccount)){
//            acceptAccountDep = executorAccount.split(",");
//        }
//        String[] acceptDepName = executorName.split(",");
//        String[] objs = new String[acceptIdDep.length];
//        for (int i = 0; i < objs.length; i++) {
//            String participant="";
//            if(acceptType[i].equals("Person")){ 
//                participant="{\"participantID\":\""+acceptAccountDep[i]+"\",\"participantName\":\""+acceptDepName[i]+"\",\"participantType\":\""+1+"\"}";
//            }else{
//                orgCode=acceptIdDep[i];
//            }
//            objs[i] = "{\"areacode\":[\"\"],\"majorcode\":[\"\"],\"orgcode\":[\""
//                    + orgCode + "\"],\"productcode\":[\"\"],\"participant\":["+participant+"]}";
//            logger.debug("传入流程的JSON串参数objs[i]" + objs[i]);
//        }
//        
//        map.put("objs", objs); 
//
//
//        paramDto.setRelativeDataMap(map);
//        paramDto.setProcessInstId(processInstId);
//        paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskId"));
//        WorkflowMana wf = new WorkflowMana();
//        wf.submitTask(paramDto);
//        
//        JSONObject proObj = new JSONObject();
//        proObj.put("processInstanceId", JsonUtil.get(jsonObj, "processInstId"));
//        proObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstId"));
//        proObj.put("taskInstanceId", JsonUtil.get(jsonObj, "taskId"));
//        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
//        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "workOrderId"));
//        proObj.put("processingSeqNum", 1);
//        proObj.put("processingTypeEnumId", COUNTERSIGN);
//        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "staffName")+"]对工单发起了会签");
//        proObj.put("processingDesc", JsonUtil.getString(jsonObj, "forwardDesc"));
//        proObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
//        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "staffId"));
//        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "orgId"));
//        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "orgName"));
//        proObj.put("createdByName", JsonUtil.get(jsonObj, "staffName"));
//        genProcessingInfoRecDAO.save(proObj);//插入通用表

    }
    
    /**
     * 按照任务ID查询待办任务
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    @Override
    public Map<String, Object> queryTaskByTaskId(JSONObject jsonObj) throws Exception {
/*        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        TaskFilter filter = new TaskFilter();
        Map<String, Object> myTasksMap = null;
        Map<String, Object> map = new HashMap<String, Object>();
        List<TaskInstance> tasks = null;
        
        String taskInstID = JsonUtil.getString(jsonObj, "taskInstID");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "accountName"));
       
        // 设置查询条件
        filter.setTaskType(TASK_TYPE_TODO);
        filter.setTaskInstID(taskInstID);
        
        paramDto.setFilter(filter);
        WorkflowMana wf = new WorkflowMana();
        myTasksMap = wf.queryMyTasks(paramDto);
        tasks = (List<TaskInstance>) MapUtils.getObject(myTasksMap, "resultList");
        
        for (TaskInstance ta : tasks) {
            map.put("taskInstID", ta.getTaskInstID());
            map.put("formUrl", ta.getFormURL());
            map.put("jobId", ta.getJobID());
            map.put("jobTitle", ta.getJobTitle());
            map.put("processModelId", ta.getProcessModelId());
            map.put("processModelName", ta.getProcessModelName());
            map.put("processInstID", ta.getProcessInstID());
            map.put("activityInstName", ta.getActivityInstName());
            map.put("activityInstID", ta.getActivityInstID());
            map.put("activityDefID", ta.getActivityDefID());
            map.put("senderID", ta.getSenderID());
            map.put("currentState", ta.getCurrentState());

            map.put("endDate", ta.getEndDate() == null ? "" : sdf.format(ta.getEndDate()));
            map.put("createDate",
                    ta.getCreateDate() == null ? "" : sdf.format(ta.getCreateDate()));
        }
        return map;*/
      	WorkflowMana wf = new WorkflowMana();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        Map<String, Object> map = new HashMap<String, Object>();
        String taskInstID = JsonUtil.getString(jsonObj, "taskInstID");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "accountName"));
        paramDto.setTaskId(taskInstID);
        TaskInstance ta = wf.getTaskInstanceObject(paramDto);
    	if(ta == null){
			throw new Exception("获取单任务详细信息");
			}else{
			map.put("taskInstID", ta.getTaskInstID());
			map.put("formUrl", ta.getFormURL());
			map.put("jobId", ta.getJobID());
			map.put("jobTitle", ta.getJobTitle());
			map.put("processModelId", ta.getProcessModelId());
			map.put("processModelName", ta.getProcessModelName());
			map.put("processInstID", ta.getProcessInstID());
			map.put("activityInstName", ta.getActivityInstName());
			map.put("activityInstID", ta.getActivityInstID());
			map.put("activityDefID", ta.getActivityDefID());
			map.put("senderID", ta.getSenderID());
			map.put("currentState", ta.getCurrentState());
			
			map.put("endDate", ta.getEndDate() == null ? "" :sdf.format(ta.getEndDate()));
			map.put("createDate",
			ta.getCreateDate() == null ? "" :sdf.format(ta.getCreateDate()));
			        }
			return map;
        
    }
    
    /** 
     * 会签回单
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    @Override
    public void addSign(JSONObject jsonObj) throws Exception {
        Date now = new Date();
        Integer lastUpdatedBy = JsonUtil.getInt(jsonObj, "lastUpdatedBy");
        Integer shardingId = JsonUtil.getInt(jsonObj, "shardingId");
        Integer orgId = JsonUtil.getInt(jsonObj, "orgId");
        int isPass = JsonUtil.getInt(jsonObj, "isPass").intValue();
        String auditOpinion = JsonUtil.getString(jsonObj, "auditOpinion");
        String processInstID = JsonUtil.getString(jsonObj, "processInstID");
        String activityInstID = JsonUtil.getString(jsonObj, "activityInstID");
        String taskInstID = JsonUtil.getString(jsonObj, "taskInstID");
        String woInfoId = JsonUtil.getString(jsonObj, "woInfoId");
        
        String processingResultOpinion = "";
        if (isPass == 1) {
            processingResultOpinion += JsonUtil.getString(jsonObj, "createdByName") + "会签通过";
        } else {
            processingResultOpinion += JsonUtil.getString(jsonObj, "createdByName") + "会签不通过";
        }

        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        WorkflowMana wf = new WorkflowMana();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isNeedCountersign", 0);//是否会签参数设回0，使得返回原始环节时不会同时满足两个流转条件
        paramDto.setRelativeDataMap(map);
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setTaskId(taskInstID);
        paramDto.setProcessInstId(processInstID);
        wf.submitTask(paramDto);
        
//        JSONObject proObj = new JSONObject();
//        proObj.put("processInstanceId", JsonUtil.get(jsonObj, "processInstId"));
//        proObj.put("activityInstanceId", JsonUtil.get(jsonObj, "activityInstId"));
//        proObj.put("taskInstanceId", JsonUtil.get(jsonObj, "taskId"));
//        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
//        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "workOrderId"));
//        proObj.put("processingSeqNum", 1);
//        proObj.put("processingTypeEnumId", COUNTERSIGN);
//        proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "staffName")+"]对工单进行了会签");
//        proObj.put("createdBy", JsonUtil.get(jsonObj, "staffId"));
//        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "staffId"));
//        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "orgId"));
//        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "orgName"));
//        proObj.put("createdByName", JsonUtil.get(jsonObj, "staffName"));
//        genProcessingInfoRecDAO.save(proObj);//插入通用表
        
        // 插入通用回单信息
        JSONObject infoRecJson = new JSONObject();
        infoRecJson.put("processInstanceId", processInstID);
        infoRecJson.put("activityInstanceId", activityInstID);
        infoRecJson.put("taskInstanceId", taskInstID);
        infoRecJson.put("processingObjectTable", "T_EOM_CARD_SHEET");
        infoRecJson.put("processingObjectId", woInfoId);
        infoRecJson.put("processingOrgId", orgId);
        infoRecJson.put("processingOrgName",  JsonUtil.get(jsonObj, "orgName"));
        infoRecJson.put("processingSeqNum", 1);
        infoRecJson.put("processingTypeEnumId", COUNTERSIGNRETURN);
        infoRecJson.put("processingResultOpinion", processingResultOpinion);
        infoRecJson.put("processingDesc", auditOpinion);
//        infoRecJson.put("shardingId", shardingId);
        infoRecJson.put("createdBy", lastUpdatedBy);
        infoRecJson.put("createdByName", JsonUtil.get(jsonObj, "createdByName"));
//        infoRecJson.put("creationDate", now);
        infoRecJson.put("lastUpdatedBy", lastUpdatedBy);
//        infoRecJson.put("lastUpdateDate", now);
//        infoRecJson.put("recordVersion", 1);
//        infoRecJson.put("processingObjectShardingId", shardingId);
        genProcessingInfoRecDAO.save(infoRecJson);
    }
    
    /** 
     *根据流程实例ID获取当前流程正在处理的工作项参与者

     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    @Override
    public JSONArray findDoingParticipant(JSONObject jsonObj) throws Exception {
        WorkflowMana wf = new WorkflowMana();
        JSONArray roleList = new JSONArray();
        AAAAService aaaa = new AAAAService();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "accountId"));
        paramDto.setProcessInstId(JsonUtil.getString(jsonObj, "processInstID"));
        List<Participant> participantList = wf.findDoingParticipant(paramDto);
        if(participantList != null && participantList.size() > 0){
            for(int j=0;j<participantList.size();j++){
                Participant partic = participantList.get(j);
                
                JSONObject particObj = new JSONObject();
                particObj.put("participantType",partic.getParticipantType());
                particObj.put("participantID",partic.getParticipantID());
                particObj.put("participantName",partic.getParticipantName());
                
                UserEntity userEntity = aaaa.findUserByPortalAccountId(partic.getParticipantID());
                if(userEntity != null){
                    particObj.put("userId",userEntity.getCloudUserId());
                    particObj.put("userName",userEntity.getEmpName());
                    particObj.put("userMobileNumber",userEntity.getMobTel());
                    particObj.put("userEmail",userEntity.getMainMailAddress());
                }
                roleList.put(particObj);
            }
        }
        return roleList;
    }

	@Override
	public Map<String, Object> getProcessingObjData(JSONObject jsonObj)
			throws Exception {
        UserEntity userEntity = null;
        OrgEntity orgEntity = null;
        AAAAService aaaaService = new AAAAService();
        Map<String, Object> map = null;
        Integer participantID = JsonUtil.getInt(jsonObj, "participantID");
        String participantType = JsonUtil.getString(jsonObj, "participantType");
        if(participantID!=null && participantType!=null){
            map = new HashMap<String, Object>();
            map.put("participantType", participantType);
            map.put("participantID", participantID);
            if(participantType.equals(WorkflowMana.ORG)){
                orgEntity = aaaaService.findOrgByOrgID(participantID);
                if(orgEntity!=null){
                    map.put("processingObj", orgEntity.getOrgName());
                    map.put("processingOrg", orgEntity.getFaxNumber());
                    map.put("telephoneNumber", orgEntity.getTelephoneNumber());
                    map.put("email", orgEntity.getOrgEmail());
                }
            }else if(participantType.equals(WorkflowMana.PERSION)){
                userEntity = aaaaService.findUserbyUserID(participantID);
                System.out.println(userEntity+"aaaaaaaaa");
                if(userEntity != null){
                    map.put("processingObj", userEntity.getEmpName());
                    if(userEntity.getMobTel()!=null && userEntity.getMobTel().length()!=0){
                        map.put("telephoneNumber", userEntity.getMobTel());
                    }else{
                        map.put("telephoneNumber", userEntity.getOfficeTel());
                    }
                    map.put("email", userEntity.getMainMailAddress());
                    map.put("processingOrgId", userEntity.getCloudOrgId());
                    if(userEntity.getCloudOrgId()!=null){
                        orgEntity = aaaaService.findOrgByOrgID(userEntity.getCloudOrgId());
                    }
                    if(orgEntity != null){
                        map.put("processingOrg", orgEntity.getOrgName());
                    }
                }
            }
        }
        return map;
	}

}
