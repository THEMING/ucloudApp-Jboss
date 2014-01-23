package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.AccountEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.ucloud.paas.proxy.log.LogService;
import com.ucloud.paas.proxy.log.QueryParameterObject;
import com.unicom.ucloud.workflow.objects.Participant;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.primeton.ucloud.workflow.factory.BPMServiceFactory;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.dto.WorkFlowParamDto;

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.base.workflow.WorkflowMana;
import com.unicom.ucloud.eom.e19.dao.IEomCardCheckDao;
import com.unicom.ucloud.eom.e19.dao.IEomCardCheckDetailDAO;
import com.unicom.ucloud.eom.e19.dao.IEomDisAssignObjectListDAO;
import com.unicom.ucloud.eom.e19.dao.IGenProcessingInfoRecDAO; 
import com.unicom.ucloud.eom.e19.dao.ISheetCardRelevanceDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardOrderApplyDAO;
import com.unicom.ucloud.eom.e19.dao.ITestCardRegisterDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.workflow.interfaces.WorkflowObjectInterface;
import com.unicom.ucloud.workflow.objects.ActivityDef;
import com.unicom.ucloud.workflow.objects.ActivityInstance;
import com.unicom.ucloud.workflow.objects.ProcessConditionMessages;
import com.unicom.ucloud.workflow.objects.TaskInstance;

/** 
 * 业务层实现类 
 * @version 1.0
 * @date 2013-03-08
 * @author MING
 */ 
@Service
public class GenProcessingInfoRecServiceImpl extends BaseServiceImpl implements IGenProcessingInfoRecService {

    @Autowired
    private IGenProcessingInfoRecDAO genProcessingInfoRecDAO;
    @Autowired
    private ITestCardRegisterDAO testCardRegisterDAO;
    @Autowired
    private ITestCardOrderApplyDAO testCardOrderApplyDAO;
    @Autowired
    private ISheetCardRelevanceDAO sheetCardRelevanceDAO;
    @Autowired
    private IEomCardCheckDetailDAO cardCheckDetailDAO;
    @Autowired
    private IEomCardCheckDao cardCheckDao;
    @Autowired
    private IEomDisAssignObjectListDAO eomDisAssignObjectListDAO;
    

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return genProcessingInfoRecDAO.qryListByParam(jsonObj);
    }
    
    private final String CHECK = "11";//审核
    private final String EXECUTE = "12";//执行
    private final String RECEIVE = "13";//接收
    private final String FINISHED = "6";//完成
    private final String DENIED = "5";//已驳回
    private final String CONFIRM = "19";//申请人确认
    private final String DEPAPPROVE = "11";//本部门审核
    private final String EXCUTE = "执行";//执行
    private final String ACCEPT = "接收";//接收
    private final String APPROVE = "审核";//审核
    private final String DEPAPPROVEE = "本部门审核";//审核
    private final String CLAIMTASK = "6";//签收
    private final String CLAIMTASKK = "签收";//签收
    private final String DISPATCH = "16";//转办
    private final String DISPATCHH = "转办";//转办
    private final String CONFIRMM = "申请人确认";//申请人确认
    
    void updateOperatorId(Map<String, Object> m,JSONObject jsonObj) throws Exception{
                System.out.println("=====================updateOperatorId====================");
        switch(MapUtils.getIntValue(m, "testobjectType")){
            case 1:{//测试卡更新
                JSONObject ob = new JSONObject();
                ob.put("adminId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("adminName", JsonUtil.get(jsonObj, "operatorName"));
                ob.put("storageCityId", JsonUtil.get(jsonObj, "storageCityId"));
                ob.put("storageCityName",JsonUtil.get(jsonObj, "storageCityName"));
                ob.put("storageDepartmentId", JsonUtil.get(jsonObj, "operateDepartmentId"));
                ob.put("storageDepartmentName", JsonUtil.get(jsonObj, "operateDepartmentName"));
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testCardId", MapUtils.getString(m, "testobjectId")); 
                testCardRegisterDAO.updateATestCardInfo(ob);break;
            }
            case 2:{//测试终端
                JSONObject ob = new JSONObject();
                ob.put("adminId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("adminName", JsonUtil.get(jsonObj, "operatorName"));
                ob.put("storageCityId", JsonUtil.get(jsonObj, "storageCityId"));
                ob.put("storageCityName",JsonUtil.get(jsonObj, "storageCityName"));
                ob.put("storageDepartmentId", JsonUtil.get(jsonObj, "operateDepartmentId"));
                ob.put("storageDepartmentName", JsonUtil.get(jsonObj, "operateDepartmentName"));
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testTerminalId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATerminalInfo(ob);break;
            }
            case 3:{//固定电话
                JSONObject ob = new JSONObject();
                ob.put("adminId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("adminName", JsonUtil.get(jsonObj, "operatorName"));
                ob.put("storageCityId", JsonUtil.get(jsonObj, "storageCityId"));
                ob.put("storageCityName",JsonUtil.get(jsonObj, "storageCityName"));
                ob.put("storageDepartmentId", JsonUtil.get(jsonObj, "operateDepartmentId"));
                ob.put("storageDepartmentName", JsonUtil.get(jsonObj, "operateDepartmentName"));
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("fixedTelId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateAImsInfo(ob);break;
            }
            case 4:{//充值卡
                JSONObject ob = new JSONObject();
                ob.put("adminId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("adminName", JsonUtil.get(jsonObj, "operatorName"));
                ob.put("storageCityId", JsonUtil.get(jsonObj, "storageCityId"));
                ob.put("storageCityName",JsonUtil.get(jsonObj, "storageCityName"));
                ob.put("storageDepartmentId", JsonUtil.get(jsonObj, "operateDepartmentId"));
                ob.put("storageDepartmentName", JsonUtil.get(jsonObj, "operateDepartmentName"));
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("rechCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateARechCardInfo(ob);break;
            }
        }
        
    }
    
    void deleteTestCard(Map<String, Object> m,JSONObject jsonObj) throws Exception{
        System.out.println("=====================deleteTestCard====================");
        switch(MapUtils.getIntValue(m, "testobjectType")){
            case 1:{//测试卡更新
                JSONObject ob = new JSONObject();
                ob.put("testcardStatusEnumId", 3);//报废
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATestCardInfo(ob);break;
            }
            case 2:{//测试终端
                JSONObject ob = new JSONObject();
                ob.put("testcardStatusEnumId", 3);//报废
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testTerminalId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATerminalInfo(ob);break;
            }
            case 3:{//固定电话
                JSONObject ob = new JSONObject();
                ob.put("testcardStatusEnumId", 3);//报废
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("fixedTelId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateAImsInfo(ob);break;
            }
            case 4:{//充值卡
                JSONObject ob = new JSONObject();
                ob.put("testcardStatusEnumId", 3);//报废
                ob.put("lastUpdatedBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("rechCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateARechCardInfo(ob);break;
            }
        }
        
    }
    
void updateLendFlag(Map<String, Object> m,JSONObject jsonObj) throws Exception{
    System.out.println("=====================updateLendFlag====================");
        switch(MapUtils.getIntValue(m, "testobjectType")){
            case 1:{//测试卡更新
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", JsonUtil.get(jsonObj, "lendDepartmentName"));
                ob.put("lenderName", JsonUtil.get(jsonObj, "lenderName"));
                ob.put("sheetSerialNumber", JsonUtil.get(jsonObj, "cardSheetId"));
                ob.put("planReturnTime", JsonUtil.get(jsonObj, "expectedReturnTime"));
                ob.put("lendFlag", 1);//借出 
                ob.put("lendTime", new Date());
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATestCardInfo(ob);break;
            }
            case 2:{//测试终端
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", JsonUtil.get(jsonObj, "lendDepartmentName"));
                ob.put("lenderName", JsonUtil.get(jsonObj, "lenderName"));
                ob.put("sheetSerialNumber", JsonUtil.get(jsonObj, "cardSheetId"));
                ob.put("planReturnTime", JsonUtil.get(jsonObj, "expectedReturnTime"));
                ob.put("lendFlag", 1);//借出 
                ob.put("lendTime", new Date());
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testTerminalId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATerminalInfo(ob);break;
            }
            case 3:{//固定电话
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", JsonUtil.get(jsonObj, "lendDepartmentName"));
                ob.put("lenderName", JsonUtil.get(jsonObj, "lenderName"));
                ob.put("sheetSerialNumber", JsonUtil.get(jsonObj, "cardSheetId"));
                ob.put("planReturnTime", JsonUtil.get(jsonObj, "expectedReturnTime"));
                ob.put("lendFlag", 1);//借出 
                ob.put("lendTime", new Date());
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("fixedTelId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateAImsInfo(ob);break;
            }
            case 4:{//充值卡
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", JsonUtil.get(jsonObj, "lendDepartmentName"));
                ob.put("lenderName", JsonUtil.get(jsonObj, "lenderName"));
                ob.put("sheetSerialNumber", JsonUtil.get(jsonObj, "cardSheetId"));
                ob.put("planReturnTime", JsonUtil.get(jsonObj, "expectedReturnTime"));
                ob.put("lendFlag", 1);//借出 
                ob.put("lendTime", new Date());
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("rechCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateARechCardInfo(ob);break;
            }
        }
        
    }
    
    void updateLendFlagReturn(Map<String, Object> m,JSONObject jsonObj) throws Exception{
        System.out.println("=====================updateLendFlagReturn====================");
        switch(MapUtils.getIntValue(m, "testobjectType")){
            case 1:{//测试卡更新
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", "");//JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", "");//JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", "");
                ob.put("lenderName", "");
                ob.put("sheetSerialNumber", "");
                ob.put("lendFlag", 0);//没借出 
                ob.put("lendTime", "");
                ob.put("planReturnTime", "");
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATestCardInfo(ob);break;
            }
            case 2:{//测试终端
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", "");//JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", "");//JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", "");
                ob.put("lenderName", "");
                ob.put("sheetSerialNumber", "");
                ob.put("lendFlag", 0);//没借出 
                ob.put("lendTime", "");
                ob.put("planReturnTime", "");
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("testTerminalId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateATerminalInfo(ob);break;
            }
            case 3:{//固定电话
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", "");//JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", "");//JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", "");
                ob.put("lenderName", "");
                ob.put("sheetSerialNumber", "");
                ob.put("lendFlag", 0);//没借出 
                ob.put("lendTime", "");
                ob.put("planReturnTime", "");
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("fixedTelId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateAImsInfo(ob);break;
            }
            case 4:{//充值卡
                JSONObject ob = new JSONObject();
                ob.put("lendDepartmentId", "");//JsonUtil.get(jsonObj, "lendDepartmentId"));
                ob.put("lenderId", "");//JsonUtil.get(jsonObj, "operatorId"));
                ob.put("lendDepartmentName", "");
                ob.put("lenderName", "");
                ob.put("sheetSerialNumber", "");
                ob.put("lendFlag", 0);//没借出 
                ob.put("lendTime", "");
                ob.put("planReturnTime", "");
                
                ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                ob.put("rechCardId", MapUtils.getString(m, "testobjectId"));
                testCardRegisterDAO.updateARechCardInfo(ob);break;
            }
        }
        
    }
    
    void updateCheckTestCardInfo(Map<String, Object> m,JSONObject jsonObj) throws Exception{
        System.out.println("=====================updateCheckTestCardInfo====================");
        switch(MapUtils.getIntValue(m, "testobjectType")){
            case 1:{//测试卡更新
                if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==3
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){//所属权变更，借出归还未登记
                    JSONObject ob = new JSONObject();
                    
                    
                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("adminId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("adminName", MapUtils.getString(m, "differentDetail"));
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        ob.put("storageDepartmentId",userEntity.getCloudOrgId());
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        System.out.println("========================userEntity.getHighDeptName()=============="+userEntity.getHighDeptName());
                        ob.put("storageDepartmentName",orgEntity.getOrgNameDisplay());//orgEntity.getOrgName());
                        ob.put("storageCityId","null");
                        ob.put("storageCityName","null");
                    } 
                        
                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==3){
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("lendFlag", 1);
                        ob.put("lenderName", MapUtils.getString(m, "differentDetail"));
                        ob.put("lendDepartmentName", orgEntity.getOrgName());
                        ob.put("lenderId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("lendDepartmentId",userEntity.getCloudOrgId()); 
                    }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("lendFlag", 0);
                        ob.put("lenderName", "");
                        ob.put("lendDepartmentName", "");
                        ob.put("lenderId", "");
                        ob.put("lendDepartmentId", ""); 
                        ob.put("lendTime", "");
                        ob.put("planReturnTime", "");
                    }
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("testCardId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateATestCardInfo(ob);break;
                }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==2){//状态变更
                    JSONObject ob = new JSONObject();
                    
                    ob.put("testcardStatusEnumId", MapUtils.getString(m, "currentStatus"));
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("testCardId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateATestCardInfo(ob);break;
                }
            }
            case 2:{//测试终端
                if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==3
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){//所属权变更，借出归还未登记
                    JSONObject ob = new JSONObject();
                    
                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("adminId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("adminName", MapUtils.getString(m, "differentDetail"));
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        ob.put("storageDepartmentId",userEntity.getCloudOrgId());
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("storageDepartmentName",orgEntity.getOrgNameDisplay());//orgEntity.getOrgName());
                        ob.put("storageCityId","null");
                        ob.put("storageCityName","null");
                    } 
                        
                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==3){
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("lendFlag", 1);
                        ob.put("lenderName", MapUtils.getString(m, "differentDetail"));
                        ob.put("lendDepartmentName", orgEntity.getOrgName());
                        ob.put("lenderId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("lendDepartmentId", userEntity.getCloudOrgId());
                    }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("lendFlag", 0);
                        ob.put("lenderName", "");
                        ob.put("lendDepartmentName", "");
                        ob.put("lenderId", "");
                        ob.put("lendDepartmentId", "");
                        ob.put("lendTime", "");
                        ob.put("planReturnTime", "");
                    }
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("testTerminalId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateATerminalInfo(ob);break;
                }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==2){//状态变更
                    JSONObject ob = new JSONObject();
                    ob.put("testcardStatusEnumId", MapUtils.getString(m, "currentStatus"));
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("testTerminalId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateATerminalInfo(ob);break;
                }
            }
            case 3:{//固定电话
                
                if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==3
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){//所属权变更，借出归还未登记
                    JSONObject ob = new JSONObject();
                    
                    
                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("adminId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("adminName", MapUtils.getString(m, "differentDetail"));
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        ob.put("storageDepartmentId",userEntity.getCloudOrgId());
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("storageDepartmentName",orgEntity.getOrgNameDisplay());//orgEntity.getOrgName());
                        ob.put("storageCityId","null");
                        ob.put("storageCityName","null");
                    }

                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==3){
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("lendFlag", 1);
                        ob.put("lenderName", MapUtils.getString(m, "differentDetail"));
                        ob.put("lendDepartmentName", orgEntity.getOrgName());
                        ob.put("lenderId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("lendDepartmentId", userEntity.getCloudOrgId());
                    }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("lendFlag", 0);
                        ob.put("lenderName", "");
                        ob.put("lendDepartmentName", "");
                        ob.put("lenderId", "");
                        ob.put("lendDepartmentId", "");
                        ob.put("lendTime", "");
                        ob.put("planReturnTime", "");
                    }
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("fixedTelId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateAImsInfo(ob);break;
                }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==2){//状态变更
                    JSONObject ob = new JSONObject();
                    
                    ob.put("testcardStatusEnumId", MapUtils.getString(m, "currentStatus"));
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("fixedTelId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateAImsInfo(ob);break;
                }
            }
            case 4:{//充值卡
                
                if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==3
                        ||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){//所属权变更，借出归还未登记
                    JSONObject ob = new JSONObject();
                    
                    
                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==1||MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("adminId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("adminName", MapUtils.getString(m, "differentDetail"));
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        ob.put("storageDepartmentId",userEntity.getCloudOrgId());
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("storageDepartmentName",orgEntity.getOrgNameDisplay());//orgEntity.getOrgName());
                        ob.put("storageCityId","null");
                        ob.put("storageCityName","null");
                    }

                    if(MapUtils.getIntValue(m, "differenceTypeEnumId")==3){
                        AAAAService aaaa = new AAAAService();
                        UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m, "personCurrentToId"));
                        OrgEntity orgEntity = aaaa.findOrgByOrgID(userEntity.getCloudOrgId());
                        ob.put("lendFlag", 1);
                        ob.put("lenderName", MapUtils.getString(m, "differentDetail"));
                        ob.put("lendDepartmentName", orgEntity.getOrgName());
                        ob.put("lenderId", MapUtils.getString(m, "personCurrentToId"));
                        ob.put("lendDepartmentId", userEntity.getCloudOrgId());
                    }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==4){
                        ob.put("lendFlag", 0);
                        ob.put("lenderName", "");
                        ob.put("lendDepartmentName", "");
                        ob.put("lenderId", "");
                        ob.put("lendDepartmentId", "");
                        ob.put("lendTime", "");
                        ob.put("planReturnTime", "");
                    }
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("rechCardId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateARechCardInfo(ob);break;
                }else if(MapUtils.getIntValue(m, "differenceTypeEnumId")==2){//状态变更
                    JSONObject ob = new JSONObject();
                    
                    ob.put("testcardStatusEnumId", MapUtils.getString(m, "currentStatus"));
                    
                    ob.put("lastUpdateBy", JsonUtil.get(jsonObj, "operatorId"));
                    ob.put("rechCardId", MapUtils.getString(m, "cardId"));
                    testCardRegisterDAO.updateARechCardInfo(ob);break;
                }
            }
        }
        
    }
    
    
    
    @Override
    public void addClaimTask(JSONObject jsonObj) throws Exception{
      
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", JsonUtil.getString(jsonObj, "processInstanceId"));
        proObj.put("activityInstanceId", JsonUtil.getString(jsonObj, "activityInstanceId"));
        proObj.put("taskInstanceId", JsonUtil.getString(jsonObj, "taskInstanceId"));
        
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "cardSheetId"));
        proObj.put("processingSeqNum", 1);
        Map<String,Object> map = new HashMap<String,Object>();
        proObj.put("processingTypeEnumId", CLAIMTASK);
            proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "operatorName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了"+CLAIMTASKK);
        
        proObj.put("processingDesc", "");
//        proObj.put("processingExpiredTime", new Date());
        proObj.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "processingOrgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "operateDepartmentName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "operatorName"));
        
        genProcessingInfoRecDAO.save(proObj);//插通用表
        
        LogService service = new LogService();
        QueryParameterObject queryParameterObject = new QueryParameterObject();
        queryParameterObject.setAppGroupId("20130308");
        queryParameterObject.setAppId("BM_D0FD24A1C09C4DDF8C88D57CEFF4188C");
        queryParameterObject.setOrgId(JsonUtil.getString(jsonObj, "processingOrgId"));
        queryParameterObject.setUserId(JsonUtil.getString(jsonObj, "lastUpdatedBy"));
        queryParameterObject.setOpDateTime(new Date());
        queryParameterObject.setOperType("测试卡工单");
        queryParameterObject.setLogLevel("INFO");
        queryParameterObject.setLogContent("["+JsonUtil.get(jsonObj, "operatorName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了"+CLAIMTASKK);//和通用信息相同
        queryParameterObject.setOperObjSubType("1");
        queryParameterObject.setOperObjId("1");
        queryParameterObject.setOperObjType("1");
        queryParameterObject.setOperObjSubType("1");
        service.writeLogService(queryParameterObject);//日志服务，插入日志
      
        
      //签收
      WorkflowMana wf = new WorkflowMana();
      WorkFlowParamDto paramDto = new WorkFlowParamDto();
      paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
      paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginName"));
      paramDto.setAccountPassWord("password");
      paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskInstanceId"));
      wf.claimTask(paramDto);
    }
    
    @Override
    public void addDispatchTask(JSONObject jsonObj) throws Exception{
      
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", JsonUtil.getString(jsonObj, "processInstanceId"));
        proObj.put("activityInstanceId", JsonUtil.getString(jsonObj, "activityInstanceId"));
        proObj.put("taskInstanceId", JsonUtil.getString(jsonObj, "taskInstanceId"));
        
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "cardSheetId"));
        proObj.put("processingSeqNum", 1);
        Map<String,Object> map = new HashMap<String,Object>();
        proObj.put("processingTypeEnumId", DISPATCH);
            proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "operatorName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了"+DISPATCHH);
        
        proObj.put("processingDesc", JsonUtil.getString(jsonObj, "processingDesc"));
//        proObj.put("processingExpiredTime", new Date());
        proObj.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "processingOrgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "operateDepartmentName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "operatorName"));
        
        genProcessingInfoRecDAO.save(proObj);//插通用表
        
        LogService service = new LogService();
        QueryParameterObject queryParameterObject = new QueryParameterObject();
        queryParameterObject.setAppGroupId("20130308");
        queryParameterObject.setAppId("BM_D0FD24A1C09C4DDF8C88D57CEFF4188C");
        queryParameterObject.setOrgId(JsonUtil.getString(jsonObj, "processingOrgId"));
        queryParameterObject.setUserId(JsonUtil.getString(jsonObj, "lastUpdatedBy"));
        queryParameterObject.setOpDateTime(new Date());
        queryParameterObject.setOperType("测试卡工单");
        queryParameterObject.setLogLevel("INFO");
        queryParameterObject.setLogContent("["+JsonUtil.get(jsonObj, "operatorName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了"+DISPATCHH);//和通用信息相同
        queryParameterObject.setOperObjSubType("1");
        queryParameterObject.setOperObjId("1");
        queryParameterObject.setOperObjType("1");
        queryParameterObject.setOperObjSubType("1");
        service.writeLogService(queryParameterObject);//日志服务，插入日志
      
        
      //转派
      WorkflowMana wf = new WorkflowMana();
      WorkFlowParamDto paramDto = new WorkFlowParamDto();
      paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
      paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginName"));
      paramDto.setAccountPassWord("password");
      paramDto.setTaskId(JsonUtil.getString(jsonObj, "taskInstanceId"));
      
      if(JsonUtil.getString(jsonObj, "targetPersonType")!=null&&!"".equals(JsonUtil.getString(jsonObj, "targetPersonType"))){
              Participant participant;
              participant = new Participant();
              participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
              participant.setParticipantType(JsonUtil.getString(jsonObj, "targetPersonType"));
              System.out.println("=========================="+JsonUtil.getString(jsonObj, "targetPerson"));
              List <Participant>  participants = new ArrayList<Participant>() ;
              participants.add(participant);
              paramDto.setParticipants(participants);
      }
      
      wf.forwardTask(paramDto);
    }
    
    public String isAllowToSelectThisCards(JSONArray sheetCardList) throws Exception{
        List idAndTypeLi = new ArrayList();
        Map mm = new HashMap();
        List idli = new ArrayList();
        List typeli = new ArrayList();
        mm.put("id", JsonUtil.getString((JSONObject)sheetCardList.get(0), "testobjectId"));
        mm.put("type", JsonUtil.getString((JSONObject)sheetCardList.get(0), "testobjectType"));
        idAndTypeLi.add(mm);
        for(int i=1;i<sheetCardList.length();i++){
        	mm = new HashMap();
            mm.put("id", JsonUtil.getString((JSONObject)sheetCardList.get(i), "testobjectId"));
            mm.put("type", JsonUtil.getString((JSONObject)sheetCardList.get(i), "testobjectType"));
            idAndTypeLi.add(mm);
        }
        System.out.println("======idAndTypeLi.size()==========="+idAndTypeLi.size());
        JSONObject jj = new JSONObject();
        jj.put("idAndTypeLi", idAndTypeLi);
        List<Map<String, Object>> li = sheetCardRelevanceDAO.isAllowToSelectThisCards(jj);
        if(li.size()!=0){
            String ret = "";
            ret = "["+MapUtils.getString((Map)li.get(0), "number")+"]";
            for(int i=1;i<li.size();i++){
                ret = ret+",["+MapUtils.getString((Map)li.get(i), "number")+"]";
            }
            return ret;
        }

        return "";
    }

    @Override
    public String save(JSONObject jsonObj) throws Exception{

        String processingTypeEnumId = "";
        List<Map<String, Object>> testCardList = new ArrayList();
        
        System.out.println("=====================sheetType====="+JsonUtil.getString(jsonObj, "sheetType")+"=======operateType===="+JsonUtil.getString(jsonObj, "operateType")+"=====");
        
        if(("3".equals(JsonUtil.getString(jsonObj, "sheetType")))
                &&"2".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))){//sheetType(3借用) operateType(2执行) 验证选择的卡是否有在途单
            
            
            JSONArray testCardLendList = new JSONArray(JsonUtil.getString(jsonObj, "testCardLendList"));
            
            if(testCardLendList!=null&&testCardLendList.length()!=0){
            
                String ret = isAllowToSelectThisCards(testCardLendList);
                if(!"".equals(ret)){
                    return ret;
                }
            }
        }
        
        if(JsonUtil.getString(jsonObj, "sheetType")!=null&&!"".equals(JsonUtil.getString(jsonObj, "sheetType"))
                &&!"".equals(JsonUtil.getString(jsonObj, "operateType"))&&!"".equals(JsonUtil.getString(jsonObj, "operateType"))){
            
            testCardList = testCardOrderApplyDAO.qryAtestCardOrderTestCard(jsonObj);//查询出与工单关联的测试卡
            org.json.JSONArray dataArray = new JSONArray();
            for(int i=0;i<testCardList.size();i++){
                JSONObject jo = JsonUtil.convert(testCardList.get(i));
                dataArray.put(jo);
            }
            
//            org.json.JSONArray dataArray = (JSONArray) testCardList;dataArray.put(jo)
            if(("2".equals(JsonUtil.getString(jsonObj, "sheetType"))||"1".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"4".equals(JsonUtil.getString(jsonObj, "operateType"))){//sheetType(2移交 1调拨) operateType(4接收)修改测试卡管理员
//                List<Map<String, Object>> testCLAcceptL = new ArrayList();
                if(JsonUtil.getString(jsonObj, "testCLAcceptL")!=null&&!"".equals(JsonUtil.getString(jsonObj, "testCLAcceptL"))){//判断前台有没有勾选到已接收测试卡
                    
                    JSONArray testCLAcceptL = new JSONArray(JsonUtil.getString(jsonObj, "testCLAcceptL"));
                    StringBuffer sbb = new StringBuffer();
                    
                    for(int i=0;i<testCLAcceptL.length();i++){//循环每个已勾选的测试卡修改卡信息
                        JSONObject j = (JSONObject)testCLAcceptL.get(i);
                        Map<String, Object> m = new HashMap();
                        m.put("testobjectType", j.get("testobjectType").toString());
                        m.put("testobjectId", j.get("testobjectId").toString());
//                        Map<String, Object> m = (JSONObject)testCLAcceptL.get(i);
                        updateOperatorId(m,jsonObj);
                        
                        JSONObject js = new JSONObject();
                        js.put("testobjectId", j.get("testobjectId").toString());
                        js.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                        js.put("testobjectType", j.get("testobjectType").toString());
                        js.put("attribute1", "accepted");
                        sheetCardRelevanceDAO.update(js);
                    }
                    
                }
                
//                for(int i=0;i<testCardList.size();i++){
//                    Map<String, Object> m = testCardList.get(i);
//                    updateOperatorId(m,jsonObj);
//                }
                
//                JSONObject oob = new JSONObject();
//                oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
//                oob.put("woStatusEnumId", FINISHED);//完成
//                oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
//                oob.put("finishTime", new Date());
//                
//                testCardOrderApplyDAO.updateTestCardOrder(oob);
                
            }
            if(("2".equals(JsonUtil.getString(jsonObj, "sheetType"))||"1".equals(JsonUtil.getString(jsonObj, "sheetType"))
                    ||"4".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"6".equals(JsonUtil.getString(jsonObj, "operateType"))){//移交、调拨、归还流程 申请人确认环节 修改工单状态为完成
              JSONObject oob = new JSONObject();
              oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
              oob.put("woStatusEnumId", FINISHED);//完成
              oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
              oob.put("finishTime", new Date());
              
              testCardOrderApplyDAO.updateTestCardOrder(oob);
            }
            if((("5".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"3".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))
                    &&JsonUtil.getString(jsonObj, "goToAcceptAudit")==null)||
                    (("5".equals(JsonUtil.getString(jsonObj, "sheetType")))
                            &&"5".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))
                            )){//sheetType(5报废) operateType(3审核)修改测试卡报废标记  报废流程在第一审核环节审核通过并且没有goToAcceptAudit变量  或者 报废流程在第二审核环节审核通过
                
                for(int i=0;i<testCardList.size();i++){
                    Map<String, Object> m = testCardList.get(i);
                    deleteTestCard(m,jsonObj);
//                    Object[] args = {
//                            
//                            deletedBy,
//                            deletedFlag,
//                            new Date(),
//                            JsonUtil.get((JSONObject)dataArray.get(i), "testCardId"),
//                                                    
//                            };
//                    
//                            list.add(args);
//                    testCardRegisterDAO.deleteTestCardInfo(list);
                }
                JSONObject oob = new JSONObject();
                oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                oob.put("woStatusEnumId", FINISHED);//完成
                oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
                oob.put("finishTime", new Date());
                
                testCardOrderApplyDAO.updateTestCardOrder(oob);
                
            }
            if(("3".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"4".equals(JsonUtil.getString(jsonObj, "operateType"))){//sheetType(3借用) operateType(4接收)修改测试卡借出标记
                
                if(JsonUtil.getString(jsonObj, "testCLAcceptL")!=null&&!"".equals(JsonUtil.getString(jsonObj, "testCLAcceptL"))){//判断前台有没有勾选到已接收测试卡
                    
                    JSONArray testCLAcceptL = new JSONArray(JsonUtil.getString(jsonObj, "testCLAcceptL"));
                    StringBuffer sbb = new StringBuffer();
                    
                    for(int i=0;i<testCLAcceptL.length();i++){//循环每个已勾选的测试卡修改卡信息
                        JSONObject j = (JSONObject)testCLAcceptL.get(i);
                        Map<String, Object> m = new HashMap();
                        m.put("testobjectType", j.get("testobjectType").toString());
                        m.put("testobjectId", j.get("testobjectId").toString());
//                        Map<String, Object> m = (JSONObject)testCLAcceptL.get(i);
                        updateLendFlag(m,jsonObj);
                        
                        JSONObject js = new JSONObject();
                        js.put("testobjectId", j.get("testobjectId").toString());
                        js.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                        js.put("testobjectType", j.get("testobjectType").toString());
                        js.put("attribute1", "accepted");
                        sheetCardRelevanceDAO.update(js);
                    }
                    
                }
                
//                for(int i=0;i<testCardList.size();i++){
//                    Map<String, Object> m = testCardList.get(i);
//                    updateLendFlag(m,jsonObj);
//                }
                
//                JSONObject oob = new JSONObject();
//                oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
//                oob.put("woStatusEnumId", FINISHED);//完成
//                oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
//                oob.put("finishTime", new Date());
//                
//                testCardOrderApplyDAO.updateTestCardOrder(oob);
            }
            if(("3".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"6".equals(JsonUtil.getString(jsonObj, "operateType"))){//借用流程 申请人确认环节 修改工单状态为完成
              JSONObject oob = new JSONObject();
              oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
              oob.put("woStatusEnumId", FINISHED);//完成
              oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
              oob.put("finishTime", new Date());
              
              testCardOrderApplyDAO.updateTestCardOrder(oob);
            }
            if(("4".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"4".equals(JsonUtil.getString(jsonObj, "operateType"))){//sheetType(4归还) operateType(4接收)修改测试卡借出标记
                
                if(JsonUtil.getString(jsonObj, "testCLAcceptL")!=null&&!"".equals(JsonUtil.getString(jsonObj, "testCLAcceptL"))){//判断前台有没有勾选到已接收测试卡
                    
                    JSONArray testCLAcceptL = new JSONArray(JsonUtil.getString(jsonObj, "testCLAcceptL"));
                    StringBuffer sbb = new StringBuffer();
                    
                    for(int i=0;i<testCLAcceptL.length();i++){//循环每个已勾选的测试卡修改卡信息
                        JSONObject j = (JSONObject)testCLAcceptL.get(i);
                        Map<String, Object> m = new HashMap();
                        m.put("testobjectType", j.get("testobjectType").toString());
                        m.put("testobjectId", j.get("testobjectId").toString());
//                        Map<String, Object> m = (JSONObject)testCLAcceptL.get(i);
                        updateLendFlagReturn(m,jsonObj);
                        
                        JSONObject js = new JSONObject();
                        js.put("testobjectId", j.get("testobjectId").toString());
                        js.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                        js.put("testobjectType", j.get("testobjectType").toString());
                        js.put("attribute1", "accepted");
                        sheetCardRelevanceDAO.update(js);
                    }
                    
                }
                
                
                
//                for(int i=0;i<testCardList.size();i++){
//                    Map<String, Object> m = testCardList.get(i);
//                    updateLendFlagReturn(m,jsonObj);
////                        Object[] args = {
////                                0,
////                                JsonUtil.get(jsonObj, "lendDepartmentId"),
////                                null,
////                                null,
////                                null,
////                                null,
////                                JsonUtil.get(jsonObj, "operatorId"),
////                                new Date(),
////                                JsonUtil.get((JSONObject)dataArray.get(i), "testCardId"),
////                                };
////                        
////                    
////                            list.add(args);
//                }
//                    testCardRegisterDAO.updateTestCardInfoLendInfo(list);
//                JSONObject oob = new JSONObject();
//                oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
//                oob.put("woStatusEnumId", FINISHED);//完成
//                oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
//                oob.put("finishTime", new Date());
//                
//                testCardOrderApplyDAO.updateTestCardOrder(oob);
            }
            if(("3".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"2".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))){//sheetType(3借用) operateType(2执行) 并且执行成功 保存测试卡借用列表
                
                
                JSONArray testCardLendList = new JSONArray(JsonUtil.getString(jsonObj, "testCardLendList"));
                
                if(testCardLendList!=null){
                
                    for(int i=0;i<testCardLendList.length();i++){
                        ((JSONObject) testCardLendList.get(i)).put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                        sheetCardRelevanceDAO.save((JSONObject)testCardLendList.get(i));
                    }
                }
            }
            if(("3".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"7".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))){//sheetType(3借用) operateType(7本部门审核) 并且审核成功 保存测试卡借用列表
                
                
                JSONArray testCardLendList = new JSONArray(JsonUtil.getString(jsonObj, "testCardLendList"));
                
                if(testCardLendList!=null){
                
                    for(int i=0;i<testCardLendList.length();i++){
                        ((JSONObject) testCardLendList.get(i)).put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                        sheetCardRelevanceDAO.save((JSONObject)testCardLendList.get(i));
                    }
                }
            }
            if(("6".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"3".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))){//sheetType(6清查) operateType(3审核)更新测试卡信息
                
                JSONObject objj = new JSONObject();
                objj.put("checkListId", JsonUtil.getString(jsonObj, "checkListId"));
                
                List<Map<String, Object>> lis = cardCheckDetailDAO.qryListByParam(objj);
                
                for(int i=0;i<lis.size();i++){
                    Map<String, Object> m = lis.get(i);
                    updateCheckTestCardInfo(m,jsonObj);
                }
                
                JSONObject oob = new JSONObject();
                oob.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
                oob.put("woStatusEnumId", FINISHED);//完成
                oob.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
                oob.put("finishTime", new Date());
                
                testCardOrderApplyDAO.updateTestCardOrder(oob);
                
                JSONObject oob2 = new JSONObject();
                oob2.put("checkListId", JsonUtil.getString(jsonObj, "checkListId"));
                oob2.put("checkFormStatusEnumId", 3);//清查单状态已完成
                oob2.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
                
                cardCheckDao.updateEomCardCheck(oob2);
            }
            
            if(("6".equals(JsonUtil.getString(jsonObj, "sheetType")))
                    &&"3".equals(JsonUtil.getString(jsonObj, "operateType"))&&"0".equals(JsonUtil.getString(jsonObj, "auditResult"))){//sheetType(6清查) operateType(3审核)审核不通过
                JSONObject oob2 = new JSONObject();
                oob2.put("checkListId", JsonUtil.getString(jsonObj, "checkListId"));
                oob2.put("checkFormStatusEnumId", 4);//清查单状态审核不通过
                oob2.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
                
                cardCheckDao.updateEomCardCheck(oob2);
            }
        }
        
        
        
        
        
        if("1".equals(JsonUtil.getString(jsonObj, "sheetType"))&&"3".equals(JsonUtil.getString(jsonObj, "operateType"))&&"1".equals(JsonUtil.getString(jsonObj, "auditResult"))){//调拨 审核环节 审核通过 修改执行对象 前台的回单会选择一个执行对象，不管有没有修改，都要更新一下工单的调度信息
                            
                JSONObject dele = new JSONObject();//先删除调度记录
                dele.put("workOrderId", JsonUtil.getLong(jsonObj, "cardSheetId"));
                dele.put("deletedFlag", 1);
                eomDisAssignObjectListDAO.update(dele);
                
                //插入调度选派对象列表
                  JSONObject disAssignObject = new JSONObject();
                  disAssignObject.put("processInstId", 0);//如果是0表示是草稿选了审核对象
                  disAssignObject.put("activityDefId", 0);
                  disAssignObject.put("activityInstanceId", 0);
                  disAssignObject.put("taskInstanceId", 0);
                  disAssignObject.put("workOrderId", JsonUtil.getLong(jsonObj, "cardSheetId"));
                  disAssignObject.put("disAssignTypeEnumId", 2);
                  disAssignObject.put("disAssignObjectTypeEnumId", JsonUtil.getInt(jsonObj, "targetPersonType"));
                  
                  if("3".equals(JsonUtil.getString(jsonObj, "targetPersonType"))){//组织，则targetPerson为数字，可插入disAssignObjectId字段
                      disAssignObject.put("disAssignObjectId", JsonUtil.getString(jsonObj, "targetPerson"));
                  }else if("1".equals(JsonUtil.getString(jsonObj, "targetPersonType"))){//人员，则targetPerson为字符，只能插入disAssignOpinion字段，disAssignObjectId字段为必填，添加临时值
                      disAssignObject.put("disAssignObjectId", 1);
                      disAssignObject.put("disAssignOpinion", JsonUtil.getString(jsonObj, "targetPerson"));
                  }
                  
                  disAssignObject.put("disAssignObjectName", JsonUtil.getString(jsonObj, "targetPersonName"));
                  disAssignObject.put("createdBy", JsonUtil.getString(jsonObj, "createdBy"));
                  disAssignObject.put("creationDate", new Date());
                  disAssignObject.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "createdBy"));
                  disAssignObject.put("lastUpdateDate", new Date());
                  disAssignObject.put("deletionDate", new Date());
                  eomDisAssignObjectListDAO.saveDisAssignObject(disAssignObject);
              
        }
        
        
//        cardSheetActivityDAO.save(jsonObj);
    
        

        
        
        String processInstanceId = JsonUtil.getString(jsonObj, "processInstanceId");
        String activityInstanceId = JsonUtil.getString(jsonObj, "activityInstanceId");
        String taskInstanceId = JsonUtil.getString(jsonObj, "taskInstanceId");
        
      //审核不通过时改状态为已驳回
        if(("3".equals(JsonUtil.getString(jsonObj, "operateType"))||"5".equals(JsonUtil.getString(jsonObj, "operateType"))||"7".equals(JsonUtil.getString(jsonObj, "operateType")))&&"0".equals(JsonUtil.getString(jsonObj, "auditResult"))){
            JSONObject oob33 = new JSONObject();
            oob33.put("cardSheetId", JsonUtil.getString(jsonObj, "cardSheetId"));
            oob33.put("woStatusEnumId", DENIED);//已驳回
            oob33.put("lastUpdatedBy", JsonUtil.getString(jsonObj, "operatorId"));
            
            testCardOrderApplyDAO.updateTestCardOrder(oob33);//审核不通过时改状态为已驳回
        }
        
        JSONObject proObj = new JSONObject();
        proObj.put("processInstanceId", processInstanceId);
        proObj.put("activityInstanceId", activityInstanceId);
        proObj.put("taskInstanceId", taskInstanceId);
        
        proObj.put("processingObjectTable", "T_EOM_CARD_SHEET");
        proObj.put("processingObjectId", JsonUtil.getString(jsonObj, "cardSheetId"));
        proObj.put("processingSeqNum", 1);
        
//        ProcessConditionMessages processConditionMessage = new ProcessConditionMessages();//流程参数对象
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("turnSendFlag", 99);//只要不是0跟1就行
        map.put("isNeedCountersign", 99);
        String operType = APPROVE;
        if(JsonUtil.get(jsonObj, "operateType")!=null&&JsonUtil.getString(jsonObj, "operateType").length()!=0){
            switch(JsonUtil.getInt(jsonObj, "operateType"))
            {
            case 2:processingTypeEnumId = EXECUTE;operType = EXCUTE;
            map.put("isPass", JsonUtil.get(jsonObj, "auditResult"));
            break;//执行 执行有执行成功和不成功
            case 3:{
                processingTypeEnumId = CHECK;
                if(JsonUtil.getString(jsonObj, "goToAcceptAudit")!=null&&!"".equals(JsonUtil.getString(jsonObj, "goToAcceptAudit"))&&"acceptAudit".equals(JsonUtil.getString(jsonObj, "goToAcceptAudit"))){//goToAcceptAudit为acceptAudit，表示报废流程，第一审核环节，审核通过，流程流转到接收者审核
                    map.put("isPass", 2);
                    Map<String, Object> m = testCardList.get(0);
                    MapUtils.getString(m,"adminId");
                    AAAAService aaaa = new AAAAService();
                    UserEntity userEntity = aaaa.findUserbyUserID(MapUtils.getIntValue(m,"adminId"));
                    AccountEntity acc = userEntity.getAccount();
                    jsonObj.put("targetPersonType","1");
                    jsonObj.put("targetPerson",acc.getAccountId());
                    jsonObj.put("targetType","1");
                }else{
                    map.put("isPass", JsonUtil.get(jsonObj, "auditResult"));//processConditionMessage.setCondition("isPass", JsonUtil.get(jsonObj, "auditResult"));//参数
                }
                break;//审核
            }
            case 4:processingTypeEnumId = RECEIVE;operType = ACCEPT;break;//接收
            case 5:processingTypeEnumId = CHECK;map.put("isPass", JsonUtil.get(jsonObj, "auditResult"));break;//报废流程的接收者审核环节
            case 6:processingTypeEnumId = CONFIRM;operType = CONFIRMM;break;//申请人确认
            case 7:processingTypeEnumId = DEPAPPROVE;operType = DEPAPPROVEE;map.put("isPass", JsonUtil.get(jsonObj, "auditResult"));break;//本部门审核
            default:;
            }
        }
        proObj.put("processingTypeEnumId", processingTypeEnumId);
        if(processingTypeEnumId==CHECK||processingTypeEnumId==DEPAPPROVE){
            proObj.put("processingResultOpinion", JsonUtil.get(jsonObj, "auditResult"));
        }else{
            proObj.put("processingResultOpinion", "["+JsonUtil.get(jsonObj, "operatorName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了"+operType);
        }
        
        proObj.put("processingDesc", JsonUtil.get(jsonObj, "approveOpinion"));
//        proObj.put("processingExpiredTime", new Date());
        proObj.put("createdBy", JsonUtil.get(jsonObj, "createdBy"));
        proObj.put("lastUpdatedBy", JsonUtil.get(jsonObj, "lastUpdatedBy"));
        proObj.put("processingOrgId", JsonUtil.get(jsonObj, "processingOrgId"));
        proObj.put("processingOrgName", JsonUtil.get(jsonObj, "operateDepartmentName"));
        proObj.put("createdByName", JsonUtil.get(jsonObj, "operatorName"));
        
        genProcessingInfoRecDAO.save(proObj);//插通用表
        
        LogService service = new LogService();
        QueryParameterObject queryParameterObject = new QueryParameterObject();
        queryParameterObject.setAppGroupId("20130308");
        queryParameterObject.setAppId("BM_D0FD24A1C09C4DDF8C88D57CEFF4188C");
        queryParameterObject.setOrgId(JsonUtil.getString(jsonObj, "processingOrgId"));
        queryParameterObject.setUserId(JsonUtil.getString(jsonObj, "lastUpdatedBy"));
        queryParameterObject.setOpDateTime(new Date());
        queryParameterObject.setOperType("测试卡工单");
        queryParameterObject.setLogLevel("INFO");
        queryParameterObject.setLogContent("["+JsonUtil.get(jsonObj, "operatorName")+"]对工单标题为["+JsonUtil.get(jsonObj, "sheetTheme")+"]的工单进行了"+operType);//和通用信息相同
        queryParameterObject.setOperObjSubType("1");
        queryParameterObject.setOperObjId("1");
        queryParameterObject.setOperObjType("1");
        queryParameterObject.setOperObjSubType("1");
        service.writeLogService(queryParameterObject);//日志服务，插入日志
        
//        BPMServiceFactory factory = BPMServiceFactory.getInstance();
        // 初始化
//        String userID = JsonUtil.getString(jsonObj, "targetPersonName");
//        String appID = "123";
//        String token = "321";
//        WorkflowObjectInterface workflow = factory.getWorkflowService(userID, appID, token);
//        workflow.setRelativeData(processInstanceId, map);

//        Participant participant1 = new Participant(); //下一步参与者
////        participant1.setAccountID("goose");
//        TaskInstance taskInstance = workflow.getTaskInstanceObject(taskInstanceId);
//        workflow.submitTask(taskInstance, participant1);
        
     // 待办回单↓
        WorkflowMana wf = new WorkflowMana();
//        List <Participant>  participants = new ArrayList<Participant>() ;
        Map<String, Object> bizMap = new HashMap<String, Object>();
        WorkFlowParamDto paramDto = new WorkFlowParamDto();
//        Participant participant;
        paramDto.setAccountId(JsonUtil.getString(jsonObj, "loginId"));
        paramDto.setAccountName(JsonUtil.getString(jsonObj, "loginName"));
        paramDto.setAccountPassWord("passWord");
        
//        if(JsonUtil.getString(jsonObj, "targetPerson")!=null&&JsonUtil.getString(jsonObj, "targetPerson").length()!=0){
//          participant = new Participant();  
//          participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
//          participant.setParticipantType(JsonUtil.getString(jsonObj, "targetPersonType"));
//          participants.add(participant);
//          paramDto.setParticipants(participants);
//        }
        
        if(JsonUtil.getString(jsonObj, "targetPersonType")!=null&&!"".equals(JsonUtil.getString(jsonObj, "targetPersonType"))){
            if("1".equals(JsonUtil.getString(jsonObj, "targetPersonType"))){//人员
                Participant participant;
                participant = new Participant();
                participant.setParticipantID(JsonUtil.getString(jsonObj, "targetPerson"));
                participant.setParticipantType(JsonUtil.getString(jsonObj, "targetType"));
                System.out.println("=========================="+JsonUtil.getString(jsonObj, "targetPerson"));
                List <Participant>  participants = new ArrayList<Participant>() ;
                participants.add(participant);
                paramDto.setParticipants(participants);
                paramDto.setRelativeDataMap(map);//设isPass变量
            }else{//组织
                System.out.println("=========================="+JsonUtil.getString(jsonObj, "targetPerson"));
//                Map<String, Object> reDataMap = new HashMap<String, Object>();
                map.put("orgcode",JsonUtil.getString(jsonObj, "targetPerson"));
                map.put("productcode","");
                map.put("areacode","");
                map.put("roleclass","");
                map.put("majorcode","");
                map.put("isPass",JsonUtil.get(jsonObj, "auditResult"));//设isPass变量
                paramDto.setRelativeDataMap(map);
            }
        }else{
            paramDto.setRelativeDataMap(map);
        }

        paramDto.setTaskId(taskInstanceId);
        paramDto.setProcessInstId(processInstanceId);
        paramDto.setActivityInstId(activityInstanceId);
        System.out.println("=============================="+taskInstanceId+"|"+processInstanceId+"|"+activityInstanceId);
       // Map<String, Object> map = new HashMap<String, Object>();
       // map.put("isPass", 0);
//         paramDto.setRelativeDataMap(map);
        
        //如果为借用的审核环节 则清除一下参与者  
        if(("3".equals(JsonUtil.getString(jsonObj, "operateType")))&&("3".equals(JsonUtil.getString(jsonObj, "sheetType")))){System.out.println("=2=");
            WorkFlowParamDto wfpd = new WorkFlowParamDto();
            wfpd.setTaskId(taskInstanceId);
                wfpd.setActivityDefId("lendExecActivity");
                wf.clearAppointedActivityParticipants(wfpd);
        }
        
        wf.submitTask(paramDto);
     // 待办回单↑
        
//        String processInstId = JsonUtil.getString(jsonObj, "processInstanceId");
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("isAgree", JsonUtil.getInt(jsonObj, "isAgree"));
//        //map.put("isAgree", 2);
//        workflow.setRelativeData(processInstId, map);
//        String undoTaskId = JsonUtil.getString(jsonObj, "taskInstID");
//        TaskInstance task = workflow.getTaskInstanceObject(undoTaskId);
//        Participant participant = new Participant();
//workflow.submitTask(task, participant);
        return "";
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        genProcessingInfoRecDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        genProcessingInfoRecDAO.update(jsonObj);
    }

    @Override
    public Page page(JSONObject jsonObj) throws Exception{
        return genProcessingInfoRecDAO.page(jsonObj);
    }

}
