package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

public interface ITestCardManageDAO extends IBaseDAO {
     
    public void modifyTestCardInfo(JSONObject jsonObj) throws Exception; 
    
    public void modifyImsInfo(JSONObject jsonObj) throws Exception; 
    
    public void modifyTerminalInfo(JSONObject jsonObj) throws Exception;
    
    public void modifyRechCardInfo(JSONObject jsonObj) throws Exception;
    
    public Page qryOrderPageForTestCardManage(JSONObject jsonObj) throws Exception;
}
