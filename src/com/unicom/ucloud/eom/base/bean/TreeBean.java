package com.unicom.ucloud.eom.base.bean;

import java.util.HashSet;
import java.util.Set;

public class TreeBean {
    private Long id;
    private String text;
    private String state;
    private Long parentId;
    private Set<TreeBean> children;
    public void addChildern(TreeBean treeBean){
        if(null == this.children)
            this.children = new HashSet<TreeBean>();
        this.children.add(treeBean);
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public Set<TreeBean> getChildren() {
        return children;
    }
    public void setChildren(Set<TreeBean> children) {
        this.children = children;
    }
    public Long getParentId() {
        return parentId;
    }
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
}
