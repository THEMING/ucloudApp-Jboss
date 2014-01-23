package com.unicom.ucloud.eom.e19.service;

import org.json.JSONObject;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.service.IBaseService; 

/** 
 * 代码说明 
 * @version 1.0
 * @date 2013-01-31
 * @author jiang.yean
 */ 
public interface ITestCardManService extends IBaseService {
    
    
    public void modifyTestCardInfo(JSONObject jsonObj) throws Exception; 
    
    public void modifyImsInfo(JSONObject jsonObj) throws Exception; 
    
    public void modifyTerminalInfo(JSONObject jsonObj) throws Exception;
    
    public void modifyRechCardInfo(JSONObject jsonObj) throws Exception;
    
    
    public Page qryOrderPageForTestCardManage(JSONObject jsonObj) throws Exception;
}
