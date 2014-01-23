package com.unicom.ucloud.eom.base.bean;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class Page implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 7848278308615785146L;

    private List<Map<String, Object>> data;

    private long totalCount; // 总记录数

    public Page() {

    }

    public Page(List<Map<String, Object>> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }
}
