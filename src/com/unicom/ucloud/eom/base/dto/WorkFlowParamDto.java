package com.unicom.ucloud.eom.base.dto;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;
import java.util.Date;

import com.unicom.ucloud.workflow.filters.JobFilter;
import com.unicom.ucloud.workflow.filters.NotificationFilter;
import com.unicom.ucloud.workflow.filters.TaskFilter;
import com.unicom.ucloud.workflow.objects.Participant;
import com.unicom.ucloud.workflow.objects.ProcessModelParams;

public class WorkFlowParamDto {

    public WorkFlowParamDto() {

    }

    private String accountId;   //当前用户ID
    private String accountName;   //当前用户名称
    private String accountPassWord;         // 用户对于4A登陆验证信息
    private Participant startParticipant;                 //启动流程参与者
    private List <Participant> participants;                 //下一环节参与者
    private String processDefName;                   //流程模板定义名称
    private String processModelId;                   //流程模板定义ID
    private String processInstName;                  //流程实例名称 即申请单标题
    private String processInstDesc;                  //任务描述
    private String taskId;                           //待办任务ID
    private String processInstId;                    //流程实例ID
    private String activityInstId;                   //活动实例ID
    private String activityDefId;                   //环节定义ID
    private String targetActivityInstId;             //目标活动实例ID
    private String jobId;                            //业务单ID
    private String notificationInstId;               //通知对象实例ID
    private String parentProcessInstId;               //父流程实例ID
    private String actInstId;                         //父流程环节实例ID
    private Date endDate;                            //任务预计完成时间
    private ProcessModelParams processModelParams;   //流程启动参数
    private Map<String,Object> bizModleParams;       //业务参数
    private Map<String,Object> relativeDataMap;      //流程相关数据
    private TaskFilter filter;                       //任务查询与过滤条件实体
    private JobFilter jobFilter;                       //任务查询与过滤条件实体
    private NotificationFilter notificationFilter;   //通知查询过滤条件对象
    private List <String> keys;                      //关键字数组
    private LinkedHashMap<String, Object> subParams; //
    private Map<String, Object> Params; //
    private String jobTitle;                            //工单标题
    private String jobType;                            //工单类型
    private String jobCode;                            //工单编码
    private String jobStarttime;                            //工单开始时间
    private String jobEndtime;                            //工单结束时间
    private String reBacktime;                            //反馈时间
    private String shard;                            //应用数据分片
    private String businessId;                            //工单涉及的业务
    private String productId;                            //产品ID
    private String majorId;                            //专业ID
    
    private Map<String,String> parameters = new LinkedHashMap<String,String>();
    
    public Map<String, Object> getParams() {
        return Params;
    }

    public void setParams(Map<String, Object> parameters) {
        this.Params = parameters;
    }
    
    public Map<String, String> getParameters() {
		return parameters;
	}

	public void setParameters(Map<String, String> parameters) {
		this.parameters = parameters;
	}

    public LinkedHashMap<String, Object> getSubParams() {
        return subParams;
    }

    public void setSubParams(LinkedHashMap<String, Object> subParams) {
        this.subParams = subParams;
    }

    public String getParentProcessInstId() {
        return parentProcessInstId;
    }

    public void setParentProcessInstId(String parentProcessInstId) {
        this.parentProcessInstId = parentProcessInstId;
    }

    public String getActInstId() {
        return actInstId;
    }

    public void setActInstId(String actInstId) {
        this.actInstId = actInstId;
    }
      
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountPassWord() {
        return accountPassWord;
    }

    public void setAccountPassWord(String accountPassWord) {
        this.accountPassWord = accountPassWord;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
 
    public String getProcessInstId() {
        return processInstId;
    }

    public void setProcessInstId(String processInstId) {
        this.processInstId = processInstId;
    }
    
    public Participant getStartParticipant() {
        return startParticipant;
    }

    public void setStartParticipant(Participant startParticipant) {
        this.startParticipant = startParticipant;
    }

    public List<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }

    public String getProcessDefName() {
        return processDefName;
    }

    public void setProcessDefName(String processDefName) {
        this.processDefName = processDefName;
    }

    public String getProcessInstName() {
        return processInstName;
    }

    public void setProcessInstName(String processInstName) {
        this.processInstName = processInstName;
    }

    public String getProcessInstDesc() {
        return processInstDesc;
    }

    public void setProcessInstDesc(String processInstDesc) {
        this.processInstDesc = processInstDesc;
    }

    public Map<String, Object> getRelativeDataMap() {
        return relativeDataMap;
    }

    public void setRelativeDataMap(Map<String, Object> relativeDataMap) {
        this.relativeDataMap = relativeDataMap;
    }
    
    public TaskFilter getFilter() {
        return filter;
    }

    public void setFilter(TaskFilter filter) {
        this.filter = filter;
    }

    public String getActivityInstId() {
        return activityInstId;
    }

    public void setActivityInstId(String activityInstId) {
        this.activityInstId = activityInstId;
    }
    
    
    public String getActivityDefId() {
        return activityDefId;
    }

    public void setActivityDefId(String activityDefId) {
        this.activityDefId = activityDefId;
    }

    public String getTargetActivityInstId() {
        return targetActivityInstId;
    }

    public void setTargetActivityInstId(String targetActivityInstId) {
        this.targetActivityInstId = targetActivityInstId;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getProcessModelId() {
        return processModelId;
    }

    public void setProcessModelId(String processModelId) {
        this.processModelId = processModelId;
    }

    public Map<String, Object> getBizModleParams() {
        return bizModleParams;
    }

    public void setBizModleParams(Map<String, Object> bizModleParams) {
        this.bizModleParams = bizModleParams;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }
    
    public String getNotificationInstId() {
        return notificationInstId;
    }

    public void setNotificationInstId(String notificationInstId) {
        this.notificationInstId = notificationInstId;
    }

    public List<String> getKeys() {
        return keys;
    }

    public void setKeys(List<String> keys) {
        this.keys = keys;
    }

    public NotificationFilter getNotificationFilter() {
        return notificationFilter;
    }

    public void setNotificationFilter(NotificationFilter notificationFilter) {
        this.notificationFilter = notificationFilter;
    }

    public ProcessModelParams getProcessModelParams() {
        return processModelParams;
    }

    public void setProcessModelParams(ProcessModelParams processModelParams) {
        this.processModelParams = processModelParams;
    }

    public JobFilter getJobFilter() {
        return jobFilter;
    }

    public void setJobFilter(JobFilter jobFilter) {
        this.jobFilter = jobFilter;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getJobCode() {
        return jobCode;
    }

    public void setJobCode(String jobCode) {
        this.jobCode = jobCode;
    }

    public String getJobStarttime() {
        return jobStarttime;
    }

    public void setJobStarttime(String jobStarttime) {
        this.jobStarttime = jobStarttime;
    }

    public String getJobEndtime() {
        return jobEndtime;
    }

    public void setJobEndtime(String jobEndtime) {
        this.jobEndtime = jobEndtime;
    }

    public String getReBacktime() {
        return reBacktime;
    }

    public void setReBacktime(String reBacktime) {
        this.reBacktime = reBacktime;
    }

    public String getShard() {
        return shard;
    }

    public void setShard(String shard) {
        this.shard = shard;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getMajorId() {
        return majorId;
    }

    public void setMajorId(String majorId) {
        this.majorId = majorId;
    }
    
}