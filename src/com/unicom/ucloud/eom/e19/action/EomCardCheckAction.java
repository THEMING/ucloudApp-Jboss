package com.unicom.ucloud.eom.e19.action;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.service.IEomCardCheckService;
import com.unicom.ucloud.eom.e19.service.IEomCardSheetService;
import com.unicom.ucloud.eom.e19.service.ITestCardOrderApplyService;
import com.unicom.ucloud.util.JsonUtil;

/**
 * 
 * @version 1.0
 * @date 2013-1-13
 * @author Jerry
 */


@Controller
@RequestMapping("/e19")
public class EomCardCheckAction extends BaseAction{
    private  Calendar calendar = Calendar.getInstance();
    public EomCardCheckAction(){        
    }
    
    @Autowired
    private IEomCardCheckService eomCardCheckService;
    @Autowired
    private IEomCardSheetService eomCardSheetService;
    @Autowired
    private ITestCardOrderApplyService testCardOrderApplyService;
    
    /** 定位页面所在目录  */
    private String prefix = "e19/";
    
    /**
     * 查询测试卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=qryEomCheckCardInfo")
    @ResponseBody
    public String qryEomCheckCardInfo(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        List<Map<String, Object>> list = eomCardCheckService.qryEomCheckCardInfo(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }
    
    /**
     * 查询该部门拥有测试卡的所有人员及测试卡数量(有分页功能)
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=qryEomCheckCardInfoPage")
    @ResponseBody
    public String qryEomCheckCardInfoPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        Page page = eomCardCheckService.qryEomCheckCardListPage(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询该部门拥有测试卡的所有人员及测试卡数量(不分页)
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=qryEomCheckCardInfoList")
    @ResponseBody
    public String qryEomCheckCardInfoList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = eomCardCheckService.qryEomCheckCardListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 插入测试库检查列表库
     * @param request
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=insertEomCardCheck")
    @ResponseBody
    public String insertEomCardCheck(HttpServletRequest request) throws Exception{
        JSONObject jsObj = getParam(request);
        JSONArray dataArray = new  JSONArray(JsonUtil.getString(jsObj, "dataArray"));
        eomCardCheckService.insertEomCardCheck(dataArray);
        
//        JSONObject jsonObj = null;
//        for(int i=0;i<dataArray.length();i++){
//            jsonObj = (JSONObject) dataArray.get(i);
//            
//            System.out.println("checkList ====="+jsonObj);
//            Long checkListId = eomCardCheckService.insertEomCardCheck(dataArray);
//            
//            if(JsonUtil.getString(jsonObj, "differentDetailObj")!=null){
//                JSONObject cdObj = new JSONObject(JsonUtil.getString(jsonObj, "differentDetailObj"));
//                JSONArray AvailableNumList = new  JSONArray(JsonUtil.getString(cdObj, "AvailableNumList"));
//                JSONArray UnavailableNumList = new  JSONArray(JsonUtil.getString(cdObj, "UnavailableNumList"));
//                JSONArray LendNumList = new  JSONArray(JsonUtil.getString(cdObj, "LendNumList"));
////                if(cdArray != null && cdArray.length() > 0){                
////                    for(int j=0;j<cdArray.length();j++){
////                        JSONObject jo = (JSONObject)cdArray.get(j);
////                        UnisequenceMana nm = new UnisequenceMana("e19","T_EOM_CARD_CHECK_DETAIL","CHECK_LIST_ID");
////                        jo.put("checkDetailId", nm.next());
////                        jo.put("checkListId", checkListId);
////                        jo.put("createdBy",JsonUtil.get(jsonObj, "createdBy"));
////                        jo.put("creationDate",JsonUtil.get(jsonObj, "creationDate"));
////                        jo.put("recordVersion",JsonUtil.get(jsonObj, "recordVersion"));
////                        jo.put("deletedFlag",JsonUtil.get(jsonObj, "deletedFlag"));
////                        jo.put("lastUpdatedBy",JsonUtil.get(jsonObj, "lastUpdatedBy"));                      
////                        jo.put("lastUpdateDate",JsonUtil.get(jsonObj, "lastUpdateDate"));
////                        jo.put("marketingAreaId",JsonUtil.get(jsonObj, "marketingAreaId"));
////                        jo.put("maintenanceAreaId",JsonUtil.get(jsonObj, "maintenanceAreaId"));
////                        jo.put("orgId",JsonUtil.get(jsonObj, "orgId"));
//                        
////                        System.out.println("checkDetail  jo==============="+jo.toString());
//                        eomCardCheckService.insertEomCardCheckDetail(AvailableNumList,checkListId);
//                        eomCardCheckService.insertEomCardCheckDetail(UnavailableNumList,checkListId);
//                        eomCardCheckService.insertEomCardCheckDetail(LendNumList,checkListId);
////                    }
////                }
//            }
//        }

        JSONObject jso = new JSONObject();
        jso.put("result", "SUCCESS");
        return jso.toString();
    }
    
    /**
     * 修改测试卡清查单
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=updateEomCardCheck")
    @ResponseBody
    public String updateEomCardCheck(HttpServletRequest request) throws Exception{
        JSONObject jsObj = getParam(request);
        JSONArray dataArray = new  JSONArray(JsonUtil.getString(jsObj, "dataArray"));
        JSONObject jsonObj = null;
        eomCardCheckService.updateEomCardCheck(dataArray);
//        UnisequenceMana nm = new UnisequenceMana("e19","t_eom_card_check_list","CHECK_LIST_ID");
//        
//        for(int i=0;i<dataArray.length();i++){
//            
//            jsonObj = (JSONObject) dataArray.get(i);
//            jsonObj.put("lastUpdateDate",new Date());
//            
//            
//            JSONObject cdObj = (JSONObject)JsonUtil.get(jsonObj, "checkDetailList");
//            if(cdObj != null){
//                
//                JSONArray cdArray = cdObj.getJSONArray("dataArray");
//                if(cdArray != null && cdArray.length() > 0){       
//                    //更新时，如果前台有清查明细的，把旧的数据删掉，插入新的
//                    JSONObject delJo = new JSONObject();
//                    delJo.put("checkListId",JsonUtil.get(jsonObj, "checkListId"));
//                    delJo.put("deletedBy", JsonUtil.get(jsonObj, "deletedBy"));
//                    delJo.put("deletedFlag",new Boolean(true));
//                    delJo.put("deletionDate", new Date());
//
//                    eomCardCheckService.deleteByCheckListId(delJo);
//                    
//                    for(int j=0;j<cdArray.length();j++){
//                        JSONObject jo = (JSONObject)cdArray.get(j);
//                        
//                        jo.put("checkDetailId", nm.next());
//                        jo.put("checkListId", JsonUtil.get(jsonObj, "checkListId"));
//                        
//                        eomCardCheckService.insertEomCardCheckDetail(cdArray,new Long(0));
//                    }
//                }
//            }
//        }

        JSONObject jso = new JSONObject();
        jso.put("result", "SUCCESS");
        return jso.toString();
    }
    
    /**
     * 查询测试卡清查记录列表
     * @param request
     * @return返回json对象
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=qryEomCardCheckList")
    @ResponseBody
    public String qryEomCardCheckList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        List<Map<String, Object>> list = eomCardCheckService.qryTestCardCheckListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }
    
    /**
     * 查询测试卡清查记录 无清查详细记录
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=qryEomCardCheckInfoPage")
    @ResponseBody
    public String qryEomCardCheckInfoPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        Page page = eomCardCheckService.qryTestCardCheckListPage(jsonObj);
 
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
   
    /**
     * 删除测试卡清查记录
     * @param request
     * @return 返回成功/失败信息
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=delCheckListBatch")
    @ResponseBody
    public String delCheckListBatch(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        String checkListIds = JsonUtil.getString(jsonObj, "checkListIds");
        if(checkListIds != null){
            for(int i=0;i<checkListIds.split(",").length;i++){
                JSONObject jo = new JSONObject();
                jo.put("checkListId", checkListIds.split(",")[i]);
                jo.put("deletedBy", JsonUtil.get(jsonObj, "deletedBy"));
                jo.put("deletedFlag",1);
                jo.put("deletionDate", new Date());
                eomCardCheckService.deleteEomCardCheckList(jo);
                
                eomCardCheckService.deleteByCheckListId(jo);
            }
        }

        JSONObject json = new JSONObject();
        json.put("data", "success");

        return json.toString();
    }
    
    /**
     * 查看清查详情列表
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomCardCheckAction.json", params="method=getCardCheckDetailList")
    @ResponseBody
    public String getCardCheckDetailList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

//        List<Map<String, Object>>  resultList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = null;
//        JSONObject jo  = new JSONObject();
//        jo.put("checkListId", JsonUtil.get(jsonObj, "checkListId"));
//        jo.put("differencesSort", new Integer(1));
//        
//        //添加可用数量差异列表       
//        list = eomCardCheckService.qryListByParam(jo);      
//        resultList.add((Map<String, Object>) list);
//        
//       //添加不可用数量差异列表
//        jo.put("differencesSort", new Integer(2));
//        list = eomCardCheckService.qryListByParam(jo);
//        resultList.add((Map<String, Object>) list);
//        
//        //添加借出数量差异列表
//        jo.put("differencesSort", new Integer(3));
//        list = eomCardCheckService.qryListByParam(jo);
//        resultList.add((Map<String, Object>) list);
        
        list = eomCardCheckService.qryListByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        
        if(list!=null){
            json.put("rows", list);
            json.put("total", list.size());
            json.put("msg", "success");
        }else{
            json.put("rows", "");
            json.put("total", 0);
            json.put("msg", "success");
        }
        
        

        return json.toString();
    }
    
    
    @RequestMapping(value="/eomCardCheckAction.json", params="method=sendAuditBatch")
    @ResponseBody
    public String sendAuditBatch(HttpServletRequest request) throws Exception{
        JSONObject jsObj = getParam(request);
        
        JSONObject json = new JSONObject();
        try{
            eomCardCheckService.addAuditBatch(jsObj);
        }catch(Exception e){e.printStackTrace();
        logger.debug("==============="+e.getMessage()+"===============");
            json.put("msg", "error");
            return json.toString();
        }
//        JSONArray dataArray = new JSONArray(JsonUtil.getString(jsObj, "list"));
//        JSONObject jsonObj = null;
//        JSONObject sheetActivObj = null;
//        UnisequenceMana nm = new UnisequenceMana("e19","T_EOM_CARD_SHEET","CARD_SHEET_ID");
//        
//        JSONObject sheetJo = null;
//        for(int i=0;i<dataArray.length();i++){
//            jsonObj = (JSONObject) dataArray.get(i);
//            
//            Long cardSheetId = nm.next();
//            //生成工单信息
//            sheetJo = (JSONObject)JsonUtil.get(jsonObj, "sheetObj");
//            sheetJo.put("cardSheetId", cardSheetId);
//            sheetJo.put("sheetSerialNumber", getApplyCode());            
//            eomCardSheetService.save(sheetJo);
//                       
//            sheetActivObj = (JSONObject)JsonUtil.get(jsonObj, "sheetActivObj");
//            sheetActivObj.put("sheetActivityId", nm.next());
//            sheetActivObj.put("cardSheetId", cardSheetId);
//            eomCardSheetActivityService.save(sheetActivObj);
//            
//            //更新测试卡清查表工单信息、清查单状态(1为草稿，2为待审核，0为审核未通过，3为审核完成)
//            jsonObj.put("cardSheetId", cardSheetId);
//            jsonObj.put("checkFormStatusEnumId", new Integer(2));
//            eomCardCheckService.updateSheetIdAndStutes(jsonObj);
//        }
        
        
        json.put("data", "success");

        return json.toString();
    }
   /**
    * 自动生成单号，待修改
    * @return
    * @see
    * @since
    */
public  String getApplyCode()  {
    StringBuffer tempCode = new StringBuffer(50);
    StringBuffer applyCode = new StringBuffer(50);
    tempCode.append("APPLYCODE_");
    tempCode.append(calendar.get(Calendar.YEAR));
    applyCode.append(calendar.get(Calendar.YEAR));
    int month = calendar.get(Calendar.MONTH)+1;
    if(month < 10){
        applyCode.append("0"+month);
    }else{
        applyCode.append(month);
    }
    applyCode.append(calendar.get(Calendar.DATE));
    
    String sequence = String.valueOf((int)(Math.random()*1000));


    if (sequence != null && sequence.length() < 4) {
        for (int i = sequence.length(); i < 4; i++) {
            applyCode.append("0");
        }
    }
    applyCode.append(sequence);
    return applyCode.toString();
}

}

