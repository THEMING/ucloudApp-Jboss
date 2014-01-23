
package com.unicom.ucloud.eom.base.workflow;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.eos.das.entity.criteria.CriteriaType;
import com.eos.das.entity.criteria.ExprType;
import com.eos.das.entity.criteria.SelectType;
import com.eos.workflow.api.BPSServiceClientFactory;
import com.primeton.ucloud.workflow.factory.BPMServiceFactory;
import com.primeton.ucloud.workflow.impl.Global;
import com.primeton.workflow.api.WFServiceException;
import com.unicom.ucloud.util.Config;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.workflow.exceptions.WFException;
import com.unicom.ucloud.workflow.filters.JobFilter;
import com.unicom.ucloud.workflow.filters.NotificationFilter;
import com.unicom.ucloud.workflow.filters.TaskFilter;
import com.unicom.ucloud.workflow.interfaces.WorkflowObjectInterface;
import com.unicom.ucloud.workflow.objects.ActivityDef;
import com.unicom.ucloud.workflow.objects.ActivityInstance;
import com.unicom.ucloud.workflow.objects.NotificationInstance;
import com.unicom.ucloud.workflow.objects.PageCondition;
import com.unicom.ucloud.workflow.objects.Participant;
import com.unicom.ucloud.workflow.objects.ProcessInstance;
import com.unicom.ucloud.workflow.objects.ProcessModel;
import com.unicom.ucloud.workflow.objects.ProcessModelParams;
import com.unicom.ucloud.workflow.objects.TaskInstance;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.common.XmlTransformateHelper;
import com.unicom.ucloud.eom.base.dto.WorkFlowParamDto;

/**
 * 流程引擎公用方法
 * @version 1.0
 * @date 2013-4-22
 * @author lin.weiliang
 */
public class WorkflowMana {

    private BPMServiceFactory factory;
    private WorkflowObjectInterface workflow;

    private String appId = "";
    
    protected final Logger logger = Logger.getLogger(this.getClass());
    
    /**参与者类型--用户*/
    public static final String PERSION = "1";
    /**参与者类型--角色*/
    public static final String ROLE = "2";
    /**参与者类型--部门*/
    public static final String ORG = "3";
    
    /**任务类型--待办*/
    public static final String TASK_TYPE_TODO = "1";
    /**任务类型--已办*/
    public static final String TASK_TYPE_DONE = "2";
    /**任务类型--待阅*/
    public static final String TASK_TYPE_UNREAD = "3";
    /**任务类型--已阅*/
    public static final String TASK_TYPE_READ = "4";
    
    /**通知类型--已阅*/
    public static final String NOTIFY_TYPE_READ = "1";
    /**通知类型--待阅*/
    public static final String NOTIFY_TYPE_UNREAD = "2";
    
    /**流程实例/活动实例状态--运行中*/
    public static final String CURRENT_STATE_1 = "1";
    /**流程实例/活动实例状态--等待*/
    public static final String CURRENT_STATE_2 = "2";
    /**流程实例/活动实例状态--挂起*/
    public static final String CURRENT_STATE_3 = "3";
    /**流程实例/活动实例状态--完成*/
    public static final String CURRENT_STATE_4 = "4";
    /**流程实例/活动实例状态--终止*/
    public static final String CURRENT_STATE_5 = "5";
    /**流程实例/活动实例状态--异常*/
    public static final String CURRENT_STATE_6 = "6";
    
    /**任务状态--待办*/
    public static final String TASK_STATE_TODO = "1";
    /**任务状态--已办*/
    public static final String TASK_STATE_DONE = "2";
    /**任务状态--挂起*/
    public static final String TASK_STATE_HANGE = "3";
    /**任务状态--待领取*/
    public static final String TASK_STATE_WAIT_TAKE = "4";
    
    public WorkflowMana() {
        appId = Config.getProperty("appId");
    }

    /**
     * 初始化流程引擎的当前用户和租户ID
     * 
     * @param userName
     * @return
     * @throws WFException 
     * @throws BPSException
     * @throws Exception
     * @see
     * @since
     */
    public void init(WorkFlowParamDto paramDto) throws WFException  {

        factory = BPMServiceFactory.getInstance();
        BPSServiceClientFactory.getLoginManager().setCurrentUser(paramDto.getAccountId(),
                paramDto.getAccountName(), appId, paramDto.getAccountPassWord());
        workflow = factory.getWorkflowService(paramDto.getAccountId(),
                appId, paramDto.getAccountPassWord());
        logger.debug("===============workflow context init suscess!===============");

    }

    /**
     * 流程启动
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @throws JSONException
     * @see
     * @since
     */

    public String startWorkflow(WorkFlowParamDto paramDto) throws WFException, JSONException {
        Map<String, Object> bizMap = paramDto.getBizModleParams();

        
        ProcessModelParams processModelParams = new ProcessModelParams();
        String processInstDesc = paramDto.getProcessInstDesc();
        String processInstId = "";
        
        if(bizMap == null){//如果没有传入流程参数，新建一个
            bizMap = new HashMap<String, Object>();
        }
        init(paramDto);

        initBizMap(bizMap,paramDto);

        processModelParams.setProcessModelName(paramDto.getProcessDefName());
        processModelParams.setProcessInstName(paramDto.getProcessInstName());

        processInstId = workflow.startProcess(paramDto.getProcessModelId(),
                processModelParams, bizMap,
                paramDto.getStartParticipant(), processInstDesc);

        logger.debug("===============Flow instant start sucess,processInstId ID：" + processInstId+"===============");

        return processInstId;
    }
    
    /**
     * 暂停/挂起流程
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @throws JSONException
     * @see
     * @since
     */
    public void suspendProcessInstance(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        workflow.suspendProcessInstance(paramDto.getProcessInstId());       
    }
    
    /**
     * 恢复/激活流程
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @throws JSONException
     * @see
     * @since
     */
    public void resumeProcessInstance(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        workflow.resumeProcessInstance(paramDto.getProcessInstId());       
    }
    
    
    /**
     * 挂起活动 
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @throws JSONException
     * @see
     * @since
     */
    public void suspendActivityInstance(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        workflow.suspendActivityInstance(paramDto.getActivityInstId());       
    }
    
    /**
     * 激活活动 
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @throws JSONException
     * @see
     * @since
     */
    public void resumeActivityInstance(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        workflow.resumeActivityInstance(paramDto.getActivityInstId());       
    }
    
    /**
     * 完成待办任务
     * 
     * @param paramDto
     * @return
     * @throws WFException 
     * @throws Exception
     * @see
     * @since
     */
    public void submitTask(WorkFlowParamDto paramDto) throws WFException   {

        String taskId = paramDto.getTaskId();
        String processInstId = paramDto.getProcessInstId();
        init(paramDto);
        TaskInstance task = workflow.getTaskInstanceObject(taskId);

        logger.debug("===============undo Task Instance ID：" + taskId+"===============");
        if (paramDto.getRelativeDataMap() != null) {
            workflow.setRelativeData(processInstId, paramDto.getRelativeDataMap());
        }
        
        workflow.submitTask(task, paramDto.getParticipants()); 
    }
    
    /**
     * 通过当前环节实例ID，找到后继可能到达的活动定义
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since
     */
    public List<ActivityDef> getNextActivitiesMaybeArrived(WorkFlowParamDto paramDto) 
            throws WFException   {
        init(paramDto);
        List<ActivityDef> ls=workflow.getNextActivitiesMaybeArrived(paramDto.getActivityInstId());
        if(ls != null && ls.size()>0){
            logger.debug("===============Next maybe Activities number: "+ls.size()+"===============");
            logger.debug("===============Next maybe Activities ActivityID: "+ls.get(0).getActivityID()+"" +
            		",ActivityName: "+ls.get(0).getActivityName()+"===============");
        }
        return ls;
    }
  
    
    /**
     * 协办
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public void delegateTask(WorkFlowParamDto paramDto) throws Exception {
        init(paramDto);
        workflow.delegateTask(paramDto.getTaskId(), paramDto.getParticipants());
    }
    
    /**
     * 获取流程数据
     * 
     * @param paramDto
     * @return
     * @throws WFException 
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> getRelativeData(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        Map<String,Object> retMap = workflow.getRelativeData(paramDto.getProcessInstId(),paramDto.getKeys());
        logger.debug("===============ProcessInstId: "+paramDto.getProcessInstId()+" RelativeData is "+retMap+"===============");
        return retMap;
    }
    

    /**
     * 查询待办任务
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> queryMyTasks(WorkFlowParamDto paramDto) throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        TaskFilter filter = paramDto.getFilter();
        if(filter == null){
            filter = new TaskFilter();     
            PageCondition pageCon = new PageCondition();
            pageCon.setBegin(0);
            pageCon.setLength(30);
            pageCon.setIsCount(true);
            filter.setPageCondition(pageCon);
        }else{
            if(filter.getPageCondition() == null){
                PageCondition pageCon = new PageCondition();
                pageCon.setBegin(0);
                pageCon.setLength(30);
                pageCon.setIsCount(true);
                filter.setPageCondition(pageCon);
            }
        }
        filter.setTaskType(WorkflowMana.TASK_TYPE_TODO);
        init(paramDto);
        
        List<TaskInstance> instances = workflow.getMyWaitingTasks(filter);

        logger.debug("===============Current page have " + instances.size() + "undo Tasks.");
        
        int total = filter.getPageCondition().getCount();
        for (int i = 0; i < instances.size(); i++) {
            TaskInstance task = (TaskInstance) instances.get(i);
            logger.debug(" undo task i=" + (i+1) + ",TaskInstID=" + task.getTaskInstID()
                     + ",ProcessInstID="+task.getProcessInstID()+",JobTitle="+task.getJobTitle()
                     + ",EndDate="+task.getEndDate()+ ",ActivityInstName="+task.getActivityInstName()
                     + ",CreateDate="+task.getCreateDate()
                     + ",CompletionDate="+task.getCompletionDate()+",CurrentState="+task.getCurrentState());
        }
        
        
        logger.debug("current account is: "+paramDto.getAccountName()+" have " + total + "undo tasks!===============");
        retMap.put("resultList", instances);
        retMap.put("total", total);

        return retMap;
    }

    /**
     * 查询待办总数
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public int getTaskStatistics(WorkFlowParamDto paramDto) throws WFException {

        init(paramDto);
        int total = workflow.getTaskStatistics(paramDto.getFilter());
        logger.debug("current account is: "+paramDto.getAccountName()+" have " + total + "undo tasks!===============");
        return total;
    }
    
    /**
     * 查询已办任务
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> getMyCompletedTasks(WorkFlowParamDto paramDto) throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        TaskFilter filter = paramDto.getFilter();
        if(filter == null){
            filter = new TaskFilter();     
            PageCondition pageCon = new PageCondition();
            pageCon.setBegin(0);
            pageCon.setLength(30);
            pageCon.setIsCount(true);
            filter.setPageCondition(pageCon);
        }else{
            if(filter.getPageCondition() == null){
                PageCondition pageCon = new PageCondition();
                pageCon.setBegin(0);
                pageCon.setLength(30);
                pageCon.setIsCount(true);
                filter.setPageCondition(pageCon);
            }
        }
        filter.setTaskType(WorkflowMana.TASK_TYPE_DONE);
        init(paramDto);
     
        List<TaskInstance> instances = workflow.getMyCompletedTasks(filter);
        logger.debug("===============Current page have " + instances.size() + "finished Tasks.");
        
        int total = filter.getPageCondition().getCount();
        
        logger.debug("current account is: "+paramDto.getAccountName()+" have " + total + "finished tasks!===============");
        retMap.put("resultList", instances);
        retMap.put("total", total);

        return retMap;
    }

    /**
     * 查询子流程     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<ProcessInstance> getSubProcessInstance(WorkFlowParamDto paramDto)
            throws WFException {

        init(paramDto);
        List<ProcessInstance> instances = workflow.getSubProcessInstance(paramDto
                .getProcessInstId());
        logger.debug("===============current Process have " + instances.size() + "sub Process, sub ProcessInstanceId: ");
        for (ProcessInstance task : instances) {
            logger.debug(task.getProcessInstID());
        }
        logger.debug("===============");
        return instances;
    }

    /**
     * 查询流程实例流转过的活动
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<ActivityInstance> getActivityInstances(WorkFlowParamDto paramDto)
            throws WFException {

        init(paramDto);
        List<ActivityInstance> instances = workflow.getActivityInstances(paramDto
                .getProcessInstId());
        logger.debug("===============current Process have " + instances.size() + "ActivityInstances!");
        for (ActivityInstance itor : instances) {
            logger.debug("ActivityInstID : "+itor.getActivityInstID() + ",ActivityInstName: " + itor.getActivityInstName());
        }
        logger.debug("===============");
        return instances;
    }

    /**
     * 查询活动实例下的任务
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since
     */
    public List<TaskInstance> getTaskInstancesByActivityID(WorkFlowParamDto paramDto)
            throws WFException {

        init(paramDto);
        List<TaskInstance> instances = workflow.getTaskInstancesByActivityID(paramDto
                .getActivityInstId());
        logger.debug("===============current Activity have " + instances.size() + "Task instances!");
        for (TaskInstance itor : instances) {
            logger.debug("JobTitle: "+itor.getJobTitle() + ",TaskInstID: " + itor.getTaskInstID());
        }
        logger.debug("===============");
        return instances;
    }
    
    /**
     * 查询活动实例下的通知
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since
     */
    public List<NotificationInstance > getNotfInstancesByActivityID(WorkFlowParamDto paramDto)
            throws WFException {

        init(paramDto);
        List<NotificationInstance > instances = workflow.getNotfInstancesByActivityID(paramDto
                .getActivityInstId());
        logger.debug("===============current Activity have " + instances.size() + "Notification Instance!");
        for (NotificationInstance  itor : instances) {
            logger.debug("JobTitle: "+itor.getJobTitle() + ",NotificationInstID: " + itor.getNotificationInstID());
        }
        logger.debug("===============");
        return instances;
    }
    
    
    /**
     * 将任务/通知抄送其他人
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public void ccTask(WorkFlowParamDto paramDto) throws Exception {

        String taskId = paramDto.getTaskId();
        init(paramDto);     
        logger.debug("===============Copy send Task id: "+taskId+"===============");
        workflow.ccTask(taskId, paramDto.getParticipants()); 
    }
    
    /**
     * 更新指定待阅为已阅     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public void setNotificationToRead(WorkFlowParamDto paramDto) throws Exception {
        init(paramDto);     
        logger.debug("===============unRead Read Notification id: "+ paramDto.getNotificationInstId()+"===============");
        workflow.setNotificationToRead(paramDto.getNotificationInstId()); 
    }
    

    /**
     * 查询当前用户的待阅通知
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since
     */
    public Map<String,Object> getMyUnreadNotifications (WorkFlowParamDto paramDto)
            throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        NotificationFilter filter = paramDto.getNotificationFilter();
        if(filter == null){
            filter = new NotificationFilter();         
            PageCondition pageCon = new PageCondition();
            pageCon.setBegin(0);
            pageCon.setLength(30);
            pageCon.setIsCount(true);
            filter.setPageCondition(pageCon);
        }else{
            if(filter.getPageCondition() == null){
                PageCondition pageCon = new PageCondition();
                pageCon.setBegin(0);
                pageCon.setLength(30);
                pageCon.setIsCount(true);
                filter.setPageCondition(pageCon);
            }
        }
        init(paramDto);
        List<NotificationInstance> instances = workflow.getMyUnreadNotifications (
                paramDto.getNotificationFilter());
        logger.debug("===============Current acount is : "+ paramDto.getAccountName()+"===============");
        logger.debug("===============current page have " + instances.size() + " unRead Notification!");
        filter.setNotifyType(WorkflowMana.NOTIFY_TYPE_UNREAD);
        int total = filter.getPageCondition().getCount();
        retMap.put("resultList", instances);
        retMap.put("total", total);
        return retMap;
    }
    

    /**
     * 查询当前用户的已阅通知
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since
     */
    public Map<String,Object> getMyReadNotifications (WorkFlowParamDto paramDto)
            throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        NotificationFilter filter = paramDto.getNotificationFilter();
        if(filter == null){
            filter = new NotificationFilter();         
            PageCondition pageCon = new PageCondition();
            pageCon.setBegin(0);
            pageCon.setLength(30);
            pageCon.setIsCount(true);
            filter.setPageCondition(pageCon);
        }else{
            if(filter.getPageCondition() == null){
                PageCondition pageCon = new PageCondition();
                pageCon.setBegin(0);
                pageCon.setLength(30);
                pageCon.setIsCount(true);
                filter.setPageCondition(pageCon);
            }
        }
        filter.setNotifyType(WorkflowMana.NOTIFY_TYPE_READ);
        init(paramDto);
        List<NotificationInstance> instances = workflow.getMyReadNotifications (
                paramDto.getNotificationFilter());
        logger.debug("===============Current acount is : "+ paramDto.getAccountName()+"===============");
        logger.debug("===============current page have " + instances.size() + " Readed Notification!");
        int total = filter.getPageCondition().getCount();
        retMap.put("resultList", instances);
        retMap.put("total", total);
        return retMap;
    }
    
    /**
     * 启动流程 并完成第一个环节的回单
     * 
     * @param paramDto
     * @return
     * @throws WFServiceException
     *             , JSONException,WFException
     * @throws Exception
     * @see
     * @since
     */
    public JSONObject startAndFinishFirst(WorkFlowParamDto paramDto) throws WFServiceException,
            JSONException, WFServiceException, JSONException, WFException {

        logger.debug("===============startAndFinishFirst--start flow begin!===============");
        Map<String, Object> bizMap = paramDto.getBizModleParams();

        TaskFilter filter = new TaskFilter();
        JSONObject json = new JSONObject();
        String taskId = "";
        String activityInstId = "";
        String activityInstName = "";

        ProcessModelParams processModelParams = new ProcessModelParams();
        
        if(bizMap == null){//如果没有传入流程参数，新建一个
            bizMap = new HashMap<String, Object>();
        }
        init(paramDto);

        initBizMap(bizMap,paramDto);
        
        processModelParams.setProcessModelName(paramDto.getProcessDefName());
        processModelParams.setProcessInstName(paramDto.getProcessInstName());
        if(paramDto.getParams()!=null){
            Set<String> set = new HashSet<String>();
            Map<String, Object> map = paramDto.getParams();
            set= map.keySet();
            for (String key : set) {
             //循环取出了你map里面的值然后再调用你的sql方法想怎么存就怎么存
    
             processModelParams.setParameter(key, map.get(key));
            }    
        }

        String processInstId = workflow.startProcess(paramDto.getProcessDefName(),
                processModelParams, bizMap,paramDto.getStartParticipant(), paramDto.getProcessInstDesc());
        logger.debug("===============startAndFinishFirst--Process start Success!===============");
        logger.debug("===============startAndFinishFirst--processInstId : "+processInstId+"===============");
        logger.debug("===============startAndFinishFirst--Query the undoTask with current processInstId!===============");
        paramDto.setProcessInstId(processInstId);
        filter.setProcessInstID(processInstId);

        PageCondition pageCon = new PageCondition();
        pageCon.setBegin(0);
        pageCon.setLength(30);
        pageCon.setIsCount(true);
        filter.setPageCondition(pageCon);
        List<TaskInstance> instances = workflow.getMyWaitingTasks(filter);
        logger.debug("===============startAndFinishFirst--current acount have "+
                instances.size() +"undo tasks.");
        for (int i = 0; i < instances.size(); i++) {
            TaskInstance task = (TaskInstance) instances.get(i);
            logger.debug(" undo task i=" + (i+1) + ",TaskInstID : " + task.getTaskInstID());
        }
        logger.debug("===============");
        if (instances != null && instances.size() > 0) {
            TaskInstance task = (TaskInstance) instances.get(0);
            activityInstId = task.getActivityInstID();
            activityInstName = task.getActivityInstName();
            taskId = task.getTaskInstID();
            if (paramDto.getRelativeDataMap() != null) {
                workflow.setRelativeData(processInstId, paramDto.getRelativeDataMap());
            }
            try{
            	workflow.submitTask(task, paramDto.getParticipants());
            	  json.put("msg", "success");
                  json.put("processInstId", processInstId);
                  json.put("activityInstId", activityInstId);
                  json.put("activityInstName", activityInstName);
                  json.put("taskId", taskId);
            }catch (WFException e) {
                logger.debug("===============startAndFinishFirst--submitTask failed! Process terminating!===============");
		        terminateProcessInstance(paramDto);
		        json.put("msg", "error");
		        logger.debug("===============startAndFinishFirst--Process terminated!===============");
		        throw new WFException(e.getMessage());
			}
            
        }

        return json;
    }
    
    /**
     * 修改任务的预计完成时间     * 
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void resetTaskTimeOut(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        workflow.resetTaskTimeOut(paramDto.getTaskId(),paramDto.getEndDate());
    }

    /**
     * 终止某个流程实例
     * 
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void terminateProcessInstance(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        workflow.terminateProcessInstance(paramDto.getProcessInstId());
    }
    
    /**
     * 回退或追回任务
     * 
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void backActivity(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        workflow.backActivity(paramDto.getActivityInstId(),paramDto.getTargetActivityInstId());
    }
    

    /**
     * 转派
     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public void forwardTask(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);

        workflow.forwardTask(paramDto.getTaskId(), paramDto.getParticipants());
    }
    
    /**
     * 追派子流程     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public String addProcesInstance(WorkFlowParamDto paramDto) throws WFException {
        String processInstId = "";
        
        init(paramDto);
        processInstId = workflow.addProcesInstance(paramDto.getProcessInstId(),
                paramDto.getActivityInstId(),
                paramDto.getStartParticipant(), paramDto.getProcessModelParams());
        logger.debug("===============Add Proces Instance Success! processInstId: "+processInstId+"===============");
        return processInstId;
    }

    /**
     * 认领任务
     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public void claimTask(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        workflow.claimTask(paramDto.getTaskId());
    }

    /**
     * 取消认领任务
     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public void revokeClaimTask(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        workflow.revokeClaimTask(paramDto.getTaskId());
    }

    /**
     * 获取模块下所有流程模板     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public List<ProcessModel> getProcessModeLists(WorkFlowParamDto paramDto)
            throws WFException, WFServiceException {
        init(paramDto);
        List<ProcessModel> list = workflow.getProcessModeLists(appId);
        logger.debug("===============Process Mode Number: "+list.size());
        for (ProcessModel model : list) {
            logger.debug("Model Describe: "+model.getProcessModelDes() +",Model Name: "
                    +model.getProcessModelName() + ",Model ID: " + model.getProcessModelID());
        }
        logger.debug("===============");
        return list;
    }

    /**
     * 获取流程模板下所有环节定义     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public List<ActivityDef> getActivitDefLists(WorkFlowParamDto paramDto)
            throws WFException, WFServiceException {
        init(paramDto);
        List<ActivityDef> list = workflow.getActivitDefLists(paramDto.getProcessModelId());
        logger.debug("===============ActivityDef Number: "+list.size());
        for(int i=0; i<list.size(); i++){
            ActivityDef df = (ActivityDef) list.get(i);
            logger.debug("Activity Name: " + df.getActivityName()+ ",ActivityID: "+df.getActivityID());
        }
        logger.debug("===============");
        return list;
    }

    /**
     * 获取单任务详细信息     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public TaskInstance getTaskInstanceObject(WorkFlowParamDto paramDto)
            throws WFException, WFServiceException {
        init(paramDto);
        TaskInstance task = workflow.getTaskInstanceObject(paramDto.getTaskId());
        return task;
    }
    

    
    /**
     * 获取当前流程实例的信息     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public ProcessInstance getProcessInstance(WorkFlowParamDto paramDto)
            throws WFException, WFServiceException {
        init(paramDto);
        ProcessInstance instance = workflow.getProcessInstance(paramDto.getProcessInstId());
        return instance;
    }
    
    /**
     * 根据环节定义id返回该环节配置的扩展信息
     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public String getActivityExtendAttributes(WorkFlowParamDto paramDto)
            throws WFException, WFServiceException {
        init(paramDto);
        JSONArray jsonArray = new JSONArray();
        String  xml = workflow.getActivityExtendAttributes(paramDto.getProcessModelId(),
                paramDto.getActivityDefId());
        try {
            jsonArray = XmlTransformateHelper.xmlToJsonArray(xml);
        } catch (WFServiceException e) {
            logger.debug("===============xml transformate to JSONArray failed!===============");
            e.printStackTrace();
        }
        logger.debug("===============ActivityExtendAttributes info: " + xml+"===============");
        return jsonArray.toString();
    }
    
    /**
     * 任务id返回该环节配置的扩展信息
     * 
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public String getExtendAttributesByTaskId(WorkFlowParamDto paramDto)
            throws WFException, WFServiceException {
        init(paramDto);
        String  xml = workflow.getActivityExtendAttributes(paramDto.getTaskId());
        logger.debug("===============ActivityExtendAttributes info: " + xml+"===============");
        return xml;
    }
    
    /**
     * 获取后续任务项信息
     * 
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public List<TaskInstance> getNextTaskInstByFinTaskInstID(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        List<TaskInstance>  instances = workflow.getNextTaskInstByFinTaskInstID(paramDto.getTaskId());
        return instances;
    }
    
    /**
     * 给指定的流程实例中的某个活动定义指派参与者--2013-5-27更新的功能
     * @param paramDto 当前任务项的ID，所要指定的活动定义ID，指定的参与者
     * @throws WFException
     * @see
     * @since 2013-5-27
     * @author Stephen Zhou
     */
    public void appointActivityParticipant(WorkFlowParamDto paramDto) throws WFException{
    	init(paramDto);
    	logger.debug("===============appoint TaskId: "+paramDto.getTaskId()+" To "
    	        +paramDto.getParticipants().get(0).getParticipantID()+"===============");
    	workflow.appointActivityParticipant(paramDto.getTaskId(), paramDto.getActivityDefId(),
    			paramDto.getParticipants());
    	logger.debug("===============appoint Task Success!===============");
    }
    
    /**
     * 根据TaskInstID，查询活动扩展配置的相关信息
     * @param paramDto
     * @return 返回扩展配置列表
     * @throws WFException
     * @see
     * @since
     */
    public JSONArray getExtendAttributesArray(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        String  xml = workflow.getActivityExtendAttributes(paramDto.getTaskId());
        JSONArray jsonArray = new JSONArray();
        try {
            jsonArray = XmlTransformateHelper.xmlToJsonArray(xml);
        } catch (WFServiceException e) {
            logger.debug("===============xml Transformate to JSONArray failed!===============");
            e.printStackTrace();
        }
        return jsonArray;
    }
    
    /**
     * 根据应用、业务类型、产品、专业、组织信息查询流程模板
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public String findProcessModel(JSONObject jsonObj) throws Exception {
        String processModelName = "";
        JSONArray list = new JSONArray();
        if(list != null && list.length() > 0){
            JSONObject json = list.getJSONObject(0);
            processModelName = JsonUtil.getString(json, "templateId");
        }
        return processModelName;
    }
    
    /**
     * 根据流程实例ID更新工单标题 
     * @param jsonObj
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public void updateJobTitleInfo(WorkFlowParamDto paramDto,String title) throws Exception {
        init(paramDto);
        String processInstId = paramDto.getProcessInstId();
        if(processInstId == null || processInstId == ""){
            throw new Exception("===============processInstID is null! Please check!===============");
        }else{
            workflow.updateJobTitleInfo(processInstId, title);
        }
    }
    
    
    /**
     * 获取下一步可能的参与者
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since 2013-6-6
     * @author 
     * @throws JSONException 
     */
    public List<Participant> getProbableParticipants(WorkFlowParamDto paramDto,LinkedHashMap<String , Object> hashMap)
            throws WFException{
         init(paramDto);
        List<Participant> participants = workflow.getProbableParticipants(
                paramDto.getProcessInstId(),paramDto.getActivityInstId(), paramDto.getActivityDefId(),hashMap);
        logger.debug("===============Get next Probable Participants!===============");
        for(Participant participant:participants){
            logger.debug("Participant ID: "+participant.getParticipantID()+"   Participant Type: "+participant.getParticipantType());
        }
        logger.debug("===============");
        return participants;
    }
    
    /**
     * 设置相关数据
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void setRelativeData(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        logger.debug("ProcessInstId===="+paramDto.getProcessInstId()+"   getRelativeDataMap==="+paramDto.getRelativeDataMap());
        workflow.setRelativeData(paramDto.getProcessInstId(), paramDto.getRelativeDataMap());
    }
   
    /**
     * 删除某个后续活动已被指定参与者
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void clearAppointedActivityParticipants(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        logger.debug("workItemID===="+paramDto.getJobId()+"  ActivityDefId==="+paramDto.getActivityDefId());
        long workItemId = Long.parseLong(paramDto.getTaskId());
        workflow.clearAppointedActivityParticipants(workItemId, paramDto.getActivityDefId());
    }
    
    /**
     * 根据流程实例ID获取当前流程正在处理的工作项参与者
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public List<Participant> findDoingParticipant(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        logger.debug("Method: findDoingParticipant. processInstID===="+paramDto.getProcessInstId());
        return workflow.findDoingParticipant(paramDto.getProcessInstId());
    }
    
    /**
     * 增派--动态启并挂接 子流程到父流程
     * @param paramDto
     * @throws WFException
     * @throws WFServiceException
     * @see
     * @since
     */
    public String addAndStartProcessWithParentActivityInstID(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        String processInstName = workflow.addAndStartProcessWithParentActivityInstID(paramDto.getProcessDefName(),
                paramDto.getProcessInstName(),paramDto.getParentProcessInstId(),
                paramDto.getActInstId(), paramDto.getSubParams());
        logger.debug("增派--动态启并挂接 子流程到父流程! 流程实例名称processInstName: "+processInstName);
        return processInstName;
    }
    
    /**
     * 根据工作项ID查看当前工作项是否可拽回
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public boolean isDrawbackEnable(WorkFlowParamDto paramDto) throws WFException{
        init(paramDto);
        long workItemID = Long.parseLong(paramDto.getTaskId());
        logger.debug("Method: isDrawbackEnable. workItemID===="+workItemID);
        return workflow.isDrawbackEnable(workItemID);
    }
    
    /**
     * 根据工作项ID和是重启当前活动的所有工作荐(true)或重启第一个参数的工作项(false)，以及是否可拽回的判断拽回当前环节
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void  drawbackWorkItem(WorkFlowParamDto paramDto,boolean isRestartAllWI,boolean isCallRollbackEvent) throws WFException{
        init(paramDto);
        long workItemID = Long.parseLong(paramDto.getTaskId());
        logger.debug("Method: drawbackWorkItem. workItemID===="+workItemID);
        logger.debug("Method: drawbackWorkItem. isRestartAllWI===="+isRestartAllWI);
        logger.debug("Method: drawbackWorkItem. isCallRollbackEvent===="+isCallRollbackEvent);
        workflow.drawbackWorkItem(workItemID,isRestartAllWI,isCallRollbackEvent);
    }
    
    /**
     * 流程启动(单独启动子流程的情况)
     * 
     * @param paramDto
     * @return
     * @throws WFException
     * @throws JSONException
     * @see
     * @since
     */
    public String startChildWorkflow(WorkFlowParamDto paramDto) throws WFException, JSONException {
        Map<String, Object> bizMap = paramDto.getBizModleParams();
        
        ProcessModelParams processModelParams = new ProcessModelParams();
        String processInstDesc = paramDto.getProcessInstDesc();
        if(bizMap == null){//如果没有传入流程参数，新建一个
            bizMap = new HashMap<String, Object>();
        }
        init(paramDto);
        
        initBizMap(bizMap,paramDto);

        processModelParams.setProcessModelName(paramDto.getProcessDefName());
        processModelParams.setProcessInstName(paramDto.getProcessInstName());
        
        /*Set<String> keySet = paramDto.getParameters().keySet();
        for (Iterator<String> it = keySet.iterator(); it.hasNext();) {
            String key = it.next();
            processModelParams.setParameter(key,MapUtils.getString(paramDto.getParameters(),key));
        }  */
        
        processModelParams.setParameter("dimensionJson",MapUtils.getString(paramDto.getParameters(),"dimensionJson"));//传5个维度
        processModelParams.setParameter("isNeed",MapUtils.getString(paramDto.getParameters(),"isNeed"));
        processModelParams.setParameter("orgcode", MapUtils.getString(paramDto.getParameters(),"orgcode"));
        processModelParams.setParameter("productcode", "");
        processModelParams.setParameter("areacode", "");
        processModelParams.setParameter("roleclass", "100255");
        processModelParams.setParameter("majorcode", "");
        
        String processInstId = workflow.startProcess(paramDto.getProcessModelId(),
                processModelParams, bizMap,
                paramDto.getStartParticipant(), processInstDesc);
        logger.debug("===============Flow instant start sucess,processInstId ID：" + processInstId+"===============");

        return processInstId;
    }
    
    /**
     * 合并已办工作项查询
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> getMyCompletedTasksDistinctJobId(WorkFlowParamDto paramDto) throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        TaskFilter filter = paramDto.getFilter();
        if(filter == null){
            filter = new TaskFilter();         
        }

        filter.setTaskType(WorkflowMana.TASK_TYPE_DONE);
        init(paramDto);
        
        List<TaskInstance> instances = workflow.getMyCompletedTasksDistinctJobId(filter);

        logger.debug("===============Current page have " + instances.size() + " done Tasks.");
        
        int total = filter.getPageCondition().getCount();
        
        logger.debug("current account is: "+paramDto.getAccountName()+" have " + total + "done tasks!===============");
        retMap.put("resultList", instances);
        retMap.put("total", total);

        return retMap;
    }
    
    /**
     * 合并已办工作项查询(按照流程实例)
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> getMyCompletedTasksDistinctProinstanceId(WorkFlowParamDto paramDto) throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        TaskFilter filter = paramDto.getFilter();
        if(filter == null){
            filter = new TaskFilter();         
        }

        filter.setTaskType(WorkflowMana.TASK_TYPE_DONE);
        init(paramDto);
        
        List<TaskInstance> instances = workflow.getMyCompletedTasksDistinctProinstanceId(filter);

        logger.debug("===============Current page have " + instances.size() + " done Tasks.");
        
        int total = filter.getPageCondition().getCount();
        
        logger.debug("current account is: "+paramDto.getAccountName()+" have " + total + "done tasks!===============");
        retMap.put("resultList", instances);
        retMap.put("total", total);

        return retMap;
    }
    
    /**
     * 查询当前登录人合并待办接口，同一个工单ID只显示一个待办.
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> getMyWaitingTasksDistinctJobId(WorkFlowParamDto paramDto)
            throws WFException  {
        init(paramDto);
        Map<String,Object> retMap = new HashMap<String,Object>();
        JobFilter jobFilter = new JobFilter();
        
        CriteriaType criteriaType = CriteriaType.FACTORY.create();  
        SelectType selectType =  SelectType.FACTORY.create();
        List<String> fieldList = new ArrayList<String>();
        PageCondition pageCondition = new PageCondition();
        pageCondition.setIsCount(true);
        pageCondition.setBegin(0);
        pageCondition.setLength(3);
        jobFilter.setPageCondition(pageCondition);

        fieldList.add("workItemID");
        fieldList.add(Global.JOB_ID.toLowerCase());
        fieldList.add(Global.JOB_CODE.toLowerCase());
        fieldList.add(Global.JOB_TITLE.toLowerCase());
        fieldList.add("activityinstid");//活动实例id
        fieldList.add("processinstid");//流程实例id
        fieldList.add("processinstname");//流程实例名称
        fieldList.add("processdefname");//流程定义名称
        fieldList.add("processchname");//流程定义中文名
        fieldList.add("activitydefid");//活动定义id
        fieldList.add("activityinstname");//活动定义名称
        fieldList.add("istimeout");//是否超时
        fieldList.add("participanttype");//参与者类型
        fieldList.add("participant");//参与者id
        selectType.set_field(fieldList);
        
        criteriaType.set_select(selectType);
        criteriaType.set_distinct(true);
        
        //自定义过滤条件添加到过滤列表    
        List<ExprType> qryConditionList = new ArrayList<ExprType>();
        
        ExprType exprType  =ExprType.FACTORY.create();
        exprType.set_opEnum(ExprType.OP.LIKE);
        exprType.set_value("vvvv");//194681
        exprType.set_property(Global.JOB_TITLE.toLowerCase());
        
        qryConditionList.add(exprType);   
        //设置自定义查询过滤列表   
        criteriaType.set_expr(qryConditionList);
        //设置自定义查询到JobFilter 
        jobFilter.setObject(criteriaType);
        //自定义查询条件准备完毕，开始查询  
        List<TaskInstance> instances =workflow.getMyWaitingTasksDistinctJobId(jobFilter );

        int total = jobFilter.getPageCondition().getCount();
        retMap.put("resultList", instances);
        retMap.put("total", total);
        return retMap;
    }
    
    /**
     * 查询当前流程实例正在运行的环节
     * @param paramDto
     * @return
     * @throws WFException
     * @see
     * @since
     */
    public List<TaskInstance> getCurrentTaskInstance(WorkFlowParamDto paramDto)
            throws WFException {
        List<String> processIds = new ArrayList<String>();
        List<TaskInstance> taskInstances = new ArrayList<TaskInstance>();
        String rootProcessId = paramDto.getProcessInstId();
        init(paramDto);
        if(rootProcessId!=null && rootProcessId.length()!=0){
            ProcessInstance rootProcessInst = workflow.getProcessInstance(rootProcessId);
            logger.debug("=====流程实例状态："+rootProcessInst.getProcessInstStatus());
            if(rootProcessInst!=null 
                    && !CURRENT_STATE_5.equals(rootProcessInst.getProcessInstStatus()) //5表示流程实例终止、4表示流程实例完成
                    && !CURRENT_STATE_4.equals(rootProcessInst.getProcessInstStatus())){
                processIds.add(rootProcessId);
                getSubProcessId(processIds, rootProcessId);
            }
        }
        
        for (String processInstId : processIds) {
            List<ActivityInstance> activityInstances = workflow.getActivityInstances(processInstId);
            for(ActivityInstance activity:activityInstances){
                if(!"subflow".equals(activity.getActivityType()) && !CURRENT_STATE_4.equals(activity.getCurrentState())
                        && !CURRENT_STATE_5.equals(activity.getCurrentState())){// 4表示活动实例完成，5表示活动实例终止
                    List<TaskInstance> tempInstances = workflow.getTaskInstancesByActivityID(activity.getActivityInstID());
                    for(TaskInstance task:tempInstances){
                        if(task!=null && !TASK_TYPE_DONE.equals(task.getCurrentState())){
                            taskInstances.add(task);
                        }
                    }
                }
            }
        }
        return taskInstances;
    }
    
    /**
     * 递归方法获取当前流程实例下所有的子流程
     * @param processList
     * @param processId
     * @throws WFException
     * @see
     * @since
     */
    public void getSubProcessId(List<String> processList,String processId)
            throws WFException {
        List<ProcessInstance> processInstance = workflow.getSubProcessInstance(processId);
        if(processInstance!=null && processInstance.size()>0){
            for (ProcessInstance processInst : processInstance) {
                if(processInst!=null 
                        && !CURRENT_STATE_5.equals(processInst.getProcessInstStatus())
                        &&!CURRENT_STATE_4.equals(processInst.getProcessInstStatus())){
                    processList.add(processInst.getProcessInstID());
                    getSubProcessId(processList,processInst.getProcessInstID());
                }
            }
        }
    }
    
    /**
     * 设置业务冗余数据
     * @param bizMap
     * @param paramDto
     * @see
     * @since
     */
    private void initBizMap(Map<String, Object> bizMap,WorkFlowParamDto paramDto){
        bizMap.put("bizTableName", Global.BIZ_TABLE_NAME);// bizTableName 存 表名 目前固定为Job
        if(!CommonUtils.isEmpty(paramDto.getJobId())){
            bizMap.put(Global.JOB_ID, paramDto.getJobId());  //JobId  固定为工单ID
        }
        if(!CommonUtils.isEmpty(paramDto.getProcessInstName())){
            bizMap.put(Global.JOB_TITLE, paramDto.getProcessInstName()); // JobTitle 固定为标题
        }
        if(!CommonUtils.isEmpty(paramDto.getJobType())){
            bizMap.put(Global.JOB_TYPE, paramDto.getJobType());
        }
        if(!CommonUtils.isEmpty(paramDto.getJobCode())){
            bizMap.put(Global.JOB_CODE, paramDto.getJobCode());
        }
        if(!CommonUtils.isEmpty(paramDto.getJobStarttime())){
            bizMap.put(Global.JOB_STARTTIME, paramDto.getJobStarttime());
        }
        if(!CommonUtils.isEmpty(paramDto.getJobEndtime())){
            bizMap.put(Global.JOB_ENDTIME, paramDto.getJobEndtime());
        }
        if(!CommonUtils.isEmpty(paramDto.getReBacktime())){
            bizMap.put(Global.RE_BACKTIME, paramDto.getReBacktime());
        }
        if(!CommonUtils.isEmpty(paramDto.getShard())){
            bizMap.put(Global.SHARD, paramDto.getShard());
        }
        if(!CommonUtils.isEmpty(paramDto.getBusinessId())){
            bizMap.put(Global.BUSINESS_ID, paramDto.getBusinessId());
        }
        if(!CommonUtils.isEmpty(paramDto.getProductId())){
            bizMap.put(Global.PRODUCT_ID, paramDto.getProductId());
        }
        if(!CommonUtils.isEmpty(paramDto.getMajorId())){
            bizMap.put(Global.MAJOR_ID, paramDto.getMajorId());
        }
    }
    
    /**
     * 完成某个流程实例
     * 
     * @param paramDto
     * @throws WFException
     * @see
     * @since
     */
    public void finishActivityInstance(WorkFlowParamDto paramDto) throws WFException {
        init(paramDto);
        workflow.finishActivityInstance (paramDto.getActivityInstId());
    }
    
    /**
     * 查询挂起中的待办任务
     * 
     * @param paramDto
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String,Object> getSuspendTasks(WorkFlowParamDto paramDto) throws WFException {
        Map<String,Object> retMap = new HashMap<String,Object>();
        TaskFilter filter = paramDto.getFilter();
        if(filter == null){
            filter = new TaskFilter();     
            PageCondition pageCon = new PageCondition();
            pageCon.setBegin(0);
            pageCon.setLength(30);
            pageCon.setIsCount(true);
            filter.setPageCondition(pageCon);
        }else{
            if(filter.getPageCondition() == null){
                PageCondition pageCon = new PageCondition();
                pageCon.setBegin(0);
                pageCon.setLength(30);
                pageCon.setIsCount(true);
                filter.setPageCondition(pageCon);
            }
        }
        filter.setTaskType(WorkflowMana.TASK_STATE_HANGE);
        init(paramDto);
        
        List<TaskInstance> instances = workflow.getSuspendTasks(filter);

        logger.debug("===============Current page have " + instances.size() + "undo Tasks.");
        
        int total = filter.getPageCondition().getCount();
        for (int i = 0; i < instances.size(); i++) {
            TaskInstance task = (TaskInstance) instances.get(i);
            logger.debug(" undo task i=" + (i+1) + ",TaskInstID=" + task.getTaskInstID()
                     + ",ProcessInstID="+task.getProcessInstID()+",JobTitle="+task.getJobTitle()
                     + ",EndDate="+task.getEndDate()+ ",ActivityInstName="+task.getActivityInstName()
                     + ",CreateDate="+task.getCreateDate()
                     + ",CompletionDate="+task.getCompletionDate()+",CurrentState="+task.getCurrentState());
        }
        
        
        logger.debug("current account is: "+paramDto.getAccountName()+" have " + total + "undo tasks!===============");
        retMap.put("resultList", instances);
        retMap.put("total", total);

        return retMap;
    }
}