package com.unicom.ucloud.eom.e19.dao;

import java.util.Map;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dao.IBaseDAO;

/** 
 * 测试数据库层接口 
 * @version 1.0
 * @date 2013-01-17
 * @author jiang.yean
 */ 
public interface ITestCardRegisterDAO extends IBaseDAO {
     
    /** ******** 测试卡 类型 ****** */
    
    public List<Map<String, Object>> qryTestCardListByParam(JSONObject jsonObj) throws Exception; 
    public void updateTestCardInfo(List list) throws Exception;
    public void saveTestCardInfo(JSONObject jsonObj) throws Exception;
    public void deleteTestCardInfo(JSONObject jsonObj) throws Exception; 
    public void deleteTestCardInfo(List list) throws Exception;
    /** ******** 固定电话 类型 ****** */
    
    public List<Map<String, Object>> qryImsListByParam(JSONObject jsonObj) throws Exception; 
     
    public void saveImsInfo(JSONObject jsonObj) throws Exception;
    public void deleteImsInfo(JSONObject jsonObj) throws Exception; 
    public void updateImsInfo(List list) throws Exception;
    public void deleteImsInfo(List list) throws Exception;
    /** ******** 测试终端 类型 ****** */
    
    public List<Map<String, Object>> qryTerminalListByParam(JSONObject jsonObj) throws Exception; 

    public void saveTerminalInfoNoBatch(JSONObject jsonObj) throws Exception;
    public void updateTerminalInfo(List list) throws Exception;
    public void deleteTerminalInfo(JSONObject jsonObj) throws Exception; 
    public void deleteTerminalInfo(List list) throws Exception;
    /** ******** 充值卡 类型 ****** */
    
    public List<Map<String, Object>> qryRechCardListByParam(JSONObject jsonObj) throws Exception; 
    public void saveRechCardInfo(JSONObject jsonObj) throws Exception;
    public void deleteRechCardInfo(JSONObject jsonObj) throws Exception; 
    public void deleteRechCardInfo(List list) throws Exception;
    public void updateRechCardInfo(List list) throws Exception;
    /** ******** yu.yanwei ****** */
    
    public Page qryImsPageByParam(JSONObject jsonObj) throws Exception;
    
    public Page qryTerminalPageByParam(JSONObject jsonObj) throws Exception;
    
    public Page qryRechCardPageByParam(JSONObject jsonObj) throws Exception;
    
    public Page qryTestCardPageByParam(JSONObject jsonObj) throws Exception;

    /** ******** guan.jianming ****** */
    public void updateTestCardInfoLendInfo(List list) throws Exception;
    public void updateATestCardInfo(JSONObject ob) throws Exception;
    public void updateATerminalInfo(JSONObject ob) throws Exception;
    public void updateAImsInfo(JSONObject ob) throws Exception;
    public void updateARechCardInfo(JSONObject ob) throws Exception;
    void saveTestCardInfoBatch(JSONArray jsonArray) throws Exception;
    public void saveImsInfoBatch(JSONArray dataArray) throws Exception;
    public void saveTerminalInfoBatch(JSONArray dataArray) throws Exception;
    public void saveRechCardInfoBatch(JSONArray dataArray) throws Exception;
    
}
