package com.unicom.ucloud.eom.base.common;

public class TreeSearchEntity {
    
    public TreeSearchEntity(){}

    private Integer nodeId;//用户或组织id \节点 id
    private String name;//用户或组织名称 \节点名称
    private int noteType;//节点类型1组织 2人员
    private String portalId;//云门户节点id
    private String hrId;//HR CODE
    private String accountId;//当节点类型对用户时，组织时为空值。
    private String accountName;
    private Integer parentNodeId;//父级节点 id
    private Integer isSelect;//是否选中 1 选择 ，0 不选择
    private Integer defaultOpen;//是否继续自动展开本节点 1 自动打开 ，0 不
    private String email;//邮箱
    private String contanctNumber;//联系电话
    private String sex;//性别
    private String qryType;//查询类型
    
    public Integer getNodeId() {
        return nodeId;
    }
    public void setNodeId(Integer nodeId) {
        this.nodeId = nodeId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getNoteType() {
        return noteType;
    }
    public void setNoteType(int noteType) {
        this.noteType = noteType;
    }
    public String getPortalId() {
        return portalId;
    }
    public void setPortalId(String portalId) {
        this.portalId = portalId;
    }
    public String getHrId() {
        return hrId;
    }
    public void setHrId(String hrId) {
        this.hrId = hrId;
    }
    public String getAccountId() {
        return accountId;
    }
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }
    public Integer getParentNodeId() {
        return parentNodeId;
    }
    public void setParentNodeId(Integer parentNodeId) {
        this.parentNodeId = parentNodeId;
    }
    public Integer getIsSelect() {
        return isSelect;
    }
    public void setIsSelect(Integer isSelect) {
        this.isSelect = isSelect;
    }
    public Integer getDefaultOpen() {
        return defaultOpen;
    }
    public void setDefaultOpen(Integer defaultOpen) {
        this.defaultOpen = defaultOpen;
    }
    public String getAccountName() {
        return accountName;
    }
    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getContanctNumber() {
        return contanctNumber;
    }
    public void setContanctNumber(String contanctNumber) {
        this.contanctNumber = contanctNumber;
    }
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getQryType() {
        return qryType;
    }
    public void setQryType(String qryType) {
        this.qryType = qryType;
    }
    
}
