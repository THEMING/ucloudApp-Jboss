package com.unicom.ucloud.eom.e19.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.MapUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.e19.service.IFlowindObjProcInsRelService;
import com.unicom.ucloud.eom.e19.service.ITcmBpsService;
import com.unicom.ucloud.util.JsonUtil;

@Controller
@RequestMapping("/e19")
public class TcmBpsAction extends BaseAction {

    @Autowired
    private ITcmBpsService bps;
    @Autowired
    private IFlowindObjProcInsRelService flowindObjProcInsRelService;
    
    
//    @RequestMapping(value="/CnsBpsAction.json", params="method=startProcesss")
//    @ResponseBody
//    public String startProcesss(HttpServletRequest request)throws Exception{
//        JSONObject jsonObj = getParam(request);
//        jsonObj.put("accountId", "tiger");
//        jsonObj.put("processInstName", "ceshi");
//        jsonObj.put("processInstDesc", "ceshi");
//        String instanceId = bps.createAndStartProcessInst(jsonObj);
//        logger.debug(">>>>>>>request:"+jsonObj.toString());
//        JSONObject json = new JSONObject();
//        json.put("msg", "success");
//        json.put("data", instanceId);
//        return json.toString();        
//    }
    @RequestMapping(value="/tcmBpsAction.json", params="method=getMyUndoTasks")
    @ResponseBody
    public String getMyUndoTasks(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        Map<String, Object> ma = bps.queryMyUndoTasks(jsonObj);
        logger.debug(">>>>>>>request:"+jsonObj.toString());
        JSONObject json = new JSONObject();
        json.put("rows", (List)MapUtils.getObject(ma, "list"));
        json.put("total", MapUtils.getString(ma, "count"));
        json.put("msg", "success");
        return json.toString();        
    }
    
    @RequestMapping(value="/tcmBpsAction.json", params="method=getMyWorkedTasks")
    @ResponseBody
    public String getMyWorkedTasks(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
      //  Map<String, Object> ma = bps.getMyWorkedTasks(jsonObj);
        Map<String, Object> map = bps.getMyCompletedTasksDistinctProinstanceId(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", map.get("rows"));
        json.put("total", map.get("total"));
        json.put("msg","success");
        logger.debug(">>>>>>>request:"+jsonObj.toString());
       /* JSONObject json = new JSONObject();
        json.put("rows", (List)MapUtils.getObject(ma, "list"));
        json.put("total", MapUtils.getString(ma, "count"));
        json.put("msg", "success");*/
        return json.toString();        
    }
    
    @RequestMapping(value="/tcmBpsAction.json", params="method=getAllProccess")
    @ResponseBody
    public String getAllProccess(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = bps.getAllProcess(jsonObj);
        JSONArray jsonArray = new JSONArray(list);
        return jsonArray.toString();       
    }
    
    @RequestMapping(value="/tcmBpsAction.json", params="method=getCardSheetIdByProcessInstID")
    @ResponseBody
    public String getCardSheetIdByProcessInstID(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = flowindObjProcInsRelService.qryListByParam(jsonObj);
        JSONArray jsonArray = new JSONArray(list);
//        return jsonArray.toString();   
        if(list==null){
            JSONObject json = new JSONObject();
            json.put("rows", 0);
            json.put("total", 0);
            json.put("msg", "success");
            return json.toString();
        }
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/tcmBpsAction.json", params="method=getAllActivityByProcessId")
    @ResponseBody
    public String getAllActivityByProcessId(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = bps.getAllActivityByProcessId(jsonObj);
        JSONArray jsonArray = new JSONArray(list);
        return jsonArray.toString();       
    }
    
    /** 
     *根据流程模板名称和环节定义id返回该环节配置的扩展信息
     * @param jsonObj 
     * @throws Exception 
     * @see 
     * @since 
     */ 
    @RequestMapping(value = "/tcmBpsAction.json", params = "method=qryActivityExtendAttributes")
    @ResponseBody
    public String qryActivityExtendAttributes(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);

        String result = bps.getActivityExtendAttributes(jsonObj);
        return result;
    }
    
    
}
