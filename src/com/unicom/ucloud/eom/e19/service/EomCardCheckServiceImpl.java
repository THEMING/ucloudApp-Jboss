package com.unicom.ucloud.eom.e19.service;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.primeton.ucloud.workflow.factory.BPMServiceFactory;
import com.primeton.ucloud.workflow.impl.Global;
import com.ucloud.paas.proxy.log.LogService;
import com.ucloud.paas.proxy.log.QueryParameterObject;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dto.WorkFlowParamDto;
import com.unicom.ucloud.eom.base.service.BaseServiceImpl;
import com.unicom.ucloud.eom.base.workflow.WorkflowMana;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelGenDAO;
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelProcDAO;
import com.unicom.ucloud.eom.e19.dao.IEomCardCheckDao;
import com.unicom.ucloud.eom.e19.dao.IEomCardCheckDetailDAO;
import com.unicom.ucloud.eom.e19.dao.IFlowindObjProcInsRelDAO;
import com.unicom.ucloud.eom.e19.dao.IGenProcessingInfoRecDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardInfoDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardOrderApplyDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.workflow.interfaces.WorkflowObjectInterface;
import com.unicom.ucloud.workflow.objects.ActivityInstance;
import com.unicom.ucloud.workflow.objects.Participant;
import com.unicom.ucloud.workflow.objects.ProcessModelParams;
import com.unicom.ucloud.workflow.objects.TaskInstance;

@Service
public class EomCardCheckServiceImpl extends BaseServiceImpl implements IEomCardCheckService{

    
    @Autowired
    private IEomCardCheckDao eomCardCheckDao;
    @Autowired
    private IEomCardCheckDetailDAO eomCardCheckDetailDAO;
    @Autowired
    private ITestCardInfoDAO testCardInfoDAO;
    @Autowired
    private ITestCardOrderApplyDAO testCardOrderApplyDAO;
    @Autowired
    private IFlowindObjProcInsRelDAO flowindObjProcInsRelDAO;
    @Autowired
    private IAttachmentRelGenDAO attachmentRelGenDAO;
    @Autowired
    private IAttachmentRelProcDAO attachmentRelProcDAO;
    @Autowired
    private IGenProcessingInfoRecDAO genProcessingInfoRecDAO;
    private final String RECEIPT = "4";//回单 
    private final String DRAFT_MAKE_DIS = "3";//草稿制定并派发
    
    
    @Override
    public List<Map<String, Object>> qryEomCheckCardListByParam(JSONObject jsonObj) throws JSONException{
       
        return eomCardCheckDao.qryEomCheckCardListByParam(jsonObj);
        
    }
    
    @Override
    public void insertEomCardCheck(JSONArray dataArray) throws Exception {
        
        JSONObject jsonObj = null;
        for(int i=0;i<dataArray.length();i++){
            jsonObj = (JSONObject) dataArray.get(i);
            
            System.out.println("checkList ====="+jsonObj);
//            Long checkListId = eomCardCheckService.insertEomCardCheck(dataArray);
            Long checkListId = eomCardCheckDao.insertEomCardCheck(jsonObj);
            
            if(JsonUtil.getString(jsonObj, "differentDetailObj")!=null){
                JSONObject cdObj = new JSONObject(JsonUtil.getString(jsonObj, "differentDetailObj"));
                JSONArray AvailableNumList = new  JSONArray(JsonUtil.getString(cdObj, "AvailableNumList"));
                JSONArray UnavailableNumList = new  JSONArray(JsonUtil.getString(cdObj, "UnavailableNumList"));
                JSONArray LendNumList = new  JSONArray(JsonUtil.getString(cdObj, "LendNumList"));
//                if(cdArray != null && cdArray.length() > 0){                
//                    for(int j=0;j<cdArray.length();j++){
//                        JSONObject jo = (JSONObject)cdArray.get(j);
//                        UnisequenceMana nm = new UnisequenceMana("e19","T_EOM_CARD_CHECK_DETAIL","CHECK_LIST_ID");
//                        jo.put("checkDetailId", nm.next());
//                        jo.put("checkListId", checkListId);
//                        jo.put("createdBy",JsonUtil.get(jsonObj, "createdBy"));
//                        jo.put("creationDate",JsonUtil.get(jsonObj, "creationDate"));
//                        jo.put("recordVersion",JsonUtil.get(jsonObj, "recordVersion"));
//                        jo.put("deletedFlag",JsonUtil.get(jsonObj, "deletedFlag"));
//                        jo.put("lastUpdatedBy",JsonUtil.get(jsonObj, "lastUpdatedBy"));                      
//                        jo.put("lastUpdateDate",JsonUtil.get(jsonObj, "lastUpdateDate"));
//                        jo.put("marketingAreaId",JsonUtil.get(jsonObj, "marketingAreaId"));
//                        jo.put("maintenanceAreaId",JsonUtil.get(jsonObj, "maintenanceAreaId"));
//                        jo.put("orgId",JsonUtil.get(jsonObj, "orgId"));
                        
//                        System.out.println("checkDetail  jo==============="+jo.toString());
                
                        eomCardCheckDetailDAO.saveBath(AvailableNumList,checkListId);
                        eomCardCheckDetailDAO.saveBath(UnavailableNumList,checkListId);
                        eomCardCheckDetailDAO.saveBath(LendNumList,checkListId);
                    
                
//                    }
//                }
            }
        }
        
    }


    @Override
    public void insertEomCardCheckDetail(JSONArray cdArray,Long checkListId) {
        
        try {
            
            eomCardCheckDetailDAO.saveBath(cdArray,checkListId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Map<String, Object>> qryTestCardCheckListByParam(JSONObject jsonObj) {
        return eomCardCheckDao.qryTestCardCheckListByParam(jsonObj);
    }

    @Override
    public void deleteEomCardCheckList(JSONObject jsonObj) throws JSONException {
        eomCardCheckDao.delEomCardCheckList(jsonObj);      
    }

    @Override
    public Page qryTestCardCheckListPage(JSONObject jsonObj) throws Exception {
        return eomCardCheckDao.qryTestCardCheckListPage(jsonObj);
    }

    @Override
    public Page qryEomCheckCardListPage(JSONObject jsonObj) throws Exception {
        return eomCardCheckDao.qryEomCheckCardListPage(jsonObj);
    }

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception {
        
        return eomCardCheckDetailDAO.qryListByParam(jsonObj);
    }
    
    @Override
    public void addAuditBatch(JSONObject jsonObj) throws Exception {
        
        JSONArray cardCheckList = new JSONArray(JsonUtil.getString(jsonObj, "cardCheckList"));
        JSONArray cardCheckListSheetSerialNumberList = new JSONArray(JsonUtil.getString(jsonObj, "cardCheckListSheetSerialNumber"));
        
        
         Calendar calendar = Calendar.getInstance();
        for(int i=0;i<cardCheckList.length();i++){
            jsonObj.put("sheetSerialNumber", cardCheckListSheetSerialNumberList.get(i).toString());//"TCMA000000001"+(calendar.getTimeInMillis()+i));
            Long tempId = testCardOrderApplyDAO.addTestCardOrderApply(jsonObj);
            
            JSONArray fileList =  new  JSONArray(JsonUtil.getString(jsonObj, "fileList"));
            if(fileList.length()!=0){
//                attachmentRelGenDAO.addBatch(fileList, "T_EOM_CARD_SHEET", tempId);
                attachmentRelProcDAO.addBatch(fileList, "T_EOM_CARD_SHEET", tempId);
            }
            
          //更新测试卡清查表工单信息、清查单状态(1为草稿，2为待审核，0为审核未通过，3为审核完成)
            JSONObject jsonO = new JSONObject();
            jsonO.put("checkListId", cardCheckList.get(i).toString());
            jsonO.put("cardSheetId", tempId);
            jsonO.put("checkFormStatusEnumId", new Integer(2));
            eomCardCheckDao.updateSheetIdAndStutes(jsonO);
//            eomCardCheckService.updateSheetIdAndStutes(jsonObj);
            
//            BPMServiceFactory factory = BPMServiceFactory.getInstance();
//
//            // 初始化//
//
//            String userID = "tiger";
//
//            String appID = "123";
//
//            String token = "321";
//
//            WorkflowObjectInterface workflow = factory.getWorkflowService(userID, appID, token);



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

//            String processDefName = "com.unicom.ucloud.eom.e19.allot";

//            ProcessModelParams processModelParams = new ProcessModelParams();
//
//            processModelParams.setProcessInstName("工单流水号："+JsonUtil.getString(jsonObj, "sheetSerialNumber")+" 的测试卡工单");

//            Participant participant = new Participant(); //下一步参与者       
//
//            participant.setAccountID("tiger");

//            String processInstDesc = "工单流水号："+JsonUtil.getString(jsonObj, "sheetSerialNumber")+" 的测试卡工单"; //流程实例描述
            
//            System.out.println("======================="+processDefName+"||"+processModelParams+"||"+participant+"||"+processInstDesc);

//            String processInstID = workflow.startProcess(processDefName, processModelParams, participant, processInstDesc);
            
            
            
            //启动流程↓
            // 启动流程 调用成功 下一环节参与者 设置具体看答疑问题14
            WorkflowMana workflow = new WorkflowMana();
            Map<String, Object> bizMap = new HashMap<String, Object>();
            WorkFlowParamDto paramDto = new WorkFlowParamDto();
            paramDto.setJobType(orderType);
            paramDto.setJobCode(JsonUtil.getString(jsonObj, "sheetSerialNumber"));
//            bizMap.put("jobType", orderType);//工单类型
//            bizMap.put("jobCode",JsonUtil.getString(jsonObj,"sheetSerialNumber"));
//            Participant participant;
            paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
            paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginName"));
            paramDto.setAccountPassWord("000000");
//            participant = new Participant();
//            participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
//            System.out.println("=========================="+JsonUtil.getString(jsonObj, "targetPerson"));
//            participant.setParticipantType(JsonUtil.getString(jsonObj, "targetType"));
            
            paramDto.setJobId(tempId.toString());        //设置业务表ID
//            bizMap = setBizMap(bizMap,jsonObj);
            paramDto = setParam(paramDto,jsonObj);
            paramDto.setBizModleParams(bizMap);
            
            Participant startParticipant = new Participant();
            startParticipant.setParticipantID(JsonUtil.getString(jsonObj, "loginId"));
            startParticipant.setParticipantType(WorkflowMana.PERSION);
            paramDto.setStartParticipant(startParticipant);
        //    paramDto.setProcessDefName(processDefName);
            //流程挂接
            String proDefName = "";
            proDefName = workflow.findProcessModel(jsonObj);
            if (proDefName != null&&proDefName != "") {
                paramDto.setProcessDefName(proDefName);
                processDefName = proDefName;
            } else {
            	paramDto.setProcessDefName(processDefName);
            }
//            List <Participant>  participants = new ArrayList<Participant>() ;
//            participants.add(participant);
//            paramDto.setParticipants(participants);
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
//                    paramDto.setRelativeDataMap(reDataMap);
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
            
            flowindObjProcInsRelDAO.save(flowObj);
            
            
//              String processInstanceId = processInstID;
//              JSONObject proObj = new JSONObject();
//              proObj.put("processInstanceId", processInstanceId);
//              
//              List<ActivityInstance> lis =  workflow.getActivityInstances(processInstanceId);
//              String activityInstID = "";
//              System.out.println("=========lis.size()================="+lis.size());
//              for(int j=0;j<lis.size();j++){
//                  ActivityInstance activityInstance = lis.get(j);
//                  System.out.println("=========activityInstance.getCurrentState()================"+activityInstance.getCurrentState());
//                  if("2".equals(activityInstance.getCurrentState())){
//                      activityInstID = activityInstance.getActivityInstID();
//                      System.out.println("=========已获取活动id====希望只出现一次==================");
//                      break;
//                  }
//              }
//              
//              proObj.put("activityInstanceId", activityInstID);
              
//              List<TaskInstance> lis2 = workflow.getTaskInstancesByActivityID(activityInstID);
//              if(lis2.size()==1){
//                  TaskInstance taskInstance = lis2.get(0);
//                  Participant participant2 = new Participant();
//                  participant2.setAccountID("fish");
//                  workflow.submitTask(taskInstance,participant2);//回单过申请环节
                  
                  JSONObject processingInfoRecObj = new JSONObject();
                  processingInfoRecObj.put("processInstanceId", processInstID);
                  processingInfoRecObj.put("activityInstanceId", 0);
                  processingInfoRecObj.put("taskInstanceId", 0);
                  
                  processingInfoRecObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
                  processingInfoRecObj.put("processingObjectId", tempId);
                  processingInfoRecObj.put("processingSeqNum", 1);
                  
                  Map<String,Object> map = new HashMap<String,Object>();
                  processingInfoRecObj.put("processingTypeEnumId", DRAFT_MAKE_DIS);
                  
                  processingInfoRecObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "createdByName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了草稿制定并派发");
//                  proObj.put("processingExpiredTime", new Date());
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
//              }
        }
       
    }
    
    private WorkFlowParamDto setParam(WorkFlowParamDto paramDto, JSONObject jsonObj) throws ParseException, JSONException {
//        Map<String, Object> mm = new LinkedHashMap<String, Object>();
//        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
//        
//        Date d = format.parse(JsonUtil.getString(jsonObj, "requiredFinishTime"));
//        mm.put(Global.DA_COLUMN1, d);
//        paramDto.setParams(mm);
        
        Map<String, Object> mm = new LinkedHashMap<String, Object>();
        if(JsonUtil.getString(jsonObj, "requiredFinishTime")!=null&&!"".equals(JsonUtil.getString(jsonObj, "requiredFinishTime"))){//要求完成时间
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
            
            Date d = format.parse(JsonUtil.getString(jsonObj, "requiredFinishTime"));
            mm.put(Global.DA_COLUMN1, d);
        }
        if(JsonUtil.getString(jsonObj, "sheetSerialNumber")!=null&&!"".equals(JsonUtil.getString(jsonObj, "sheetSerialNumber"))){//工单流水号
            mm.put(Global.BIZ_STRCOLUMN1, JsonUtil.getString(jsonObj, "sheetSerialNumber"));
        }
        if(JsonUtil.getString(jsonObj, "urgencyLevel")!=null&&!"".equals(JsonUtil.getString(jsonObj, "urgencyLevel"))){//缓急程度
            mm.put(Global.BIZ_NUMCOLUMN1, JsonUtil.getString(jsonObj, "urgencyLevel"));
        }
        paramDto.setParams(mm);
        return paramDto;
    }

    private Map<String, Object> setBizMap(Map<String, Object> bizMap, JSONObject jsonObj) throws JSONException {
        bizMap.put(Global.BIZ_ROOTVCCOLUMN1, JsonUtil.getString(jsonObj, "sheetSerialNumber"));
        bizMap.put(Global.BIZ_ROOTNMCOLUMN1, JsonUtil.getInt(jsonObj, "urgencyLevel"));//缓急程度
        return bizMap;
    }

    @Override
    public void updateEomCardCheck(JSONArray dataArray) throws Exception{
        
        //删除T_EOM_CARD_CHECK_DETAIL
        eomCardCheckDetailDAO.deleteBatchByCheckListId(dataArray);
        
        JSONObject jsonObj = null;
        for(int i=0;i<dataArray.length();i++){
            jsonObj = (JSONObject) dataArray.get(i);
            
            
            
            Long checkListId = eomCardCheckDao.updateEomCardCheck(jsonObj);
            
            if(JsonUtil.getString(jsonObj, "differentDetailObj")!=null){
                JSONObject cdObj = new JSONObject(JsonUtil.getString(jsonObj, "differentDetailObj"));
                JSONArray AvailableNumList = new  JSONArray(JsonUtil.getString(cdObj, "AvailableNumList"));
                JSONArray UnavailableNumList = new  JSONArray(JsonUtil.getString(cdObj, "UnavailableNumList"));
                JSONArray LendNumList = new  JSONArray(JsonUtil.getString(cdObj, "LendNumList"));
                
                        eomCardCheckDetailDAO.saveBath(AvailableNumList,checkListId);
                        eomCardCheckDetailDAO.saveBath(UnavailableNumList,checkListId);
                        eomCardCheckDetailDAO.saveBath(LendNumList,checkListId);
                    
                
            }
        }
        
    }

    @Override
    public void updateCardCheckDetial(JSONObject jsonObj) throws JSONException {
        try {
            eomCardCheckDetailDAO.update(jsonObj);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Map<String, Object>> qryEomCheckCardInfo(JSONObject jsonObj) throws Exception {
        return testCardInfoDAO.qryListByParam(jsonObj);
    }

    @Override
    public void deleteByCheckListId(JSONObject jsonObj) throws Exception {
        eomCardCheckDetailDAO.deleteByCheckListId(jsonObj);
    }

    @Override
    public void updateEomCardCheckByParam(JSONObject jsonObj) throws Exception {
        eomCardCheckDao.updateEomCardCheckByParam(jsonObj);
    }

    @Override
    public void updateSheetIdAndStutes(JSONObject jsonObj) throws Exception {
        eomCardCheckDao.updateSheetIdAndStutes(jsonObj);
    }

}
