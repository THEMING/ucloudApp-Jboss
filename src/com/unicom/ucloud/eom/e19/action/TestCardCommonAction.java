package com.unicom.ucloud.eom.e19.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.service.ITestCardCommonService;

@Controller
@RequestMapping("/e19")
public class TestCardCommonAction extends BaseAction {
    private static Logger logger = Logger.getLogger(TestCardCommonAction.class);
    @Autowired
    private ITestCardCommonService appService;
    
    /*
     * 获取session
     */
    @RequestMapping(value = "/testCardCommonAction.json", params = "method=getLogonAccount")
    @ResponseBody
    public String getLogonAccount(HttpServletRequest request) throws Exception {
        return super.getLogonAccount(request, null).toString();
    }
    
    @RequestMapping(value="/testCardCommonAction.json", params="method=getOperateHisList")
    @ResponseBody
    public String getOperateHisList(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = appService.qryOpearateHisList(jsonObj);
        logger.debug(">>>>>>>request:"+jsonObj.toString());
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        json.put("rows", list);
        json.put("total", list.size());
        return json.toString();        
    }
    
    /**
     * 查询下一环节参与者

     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/testCardCommonAction.json", params = "method=qryNextPaticipants")
    @ResponseBody
    public String qryNextPaticipants(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);

        String result = appService.qryNextPaticipants(jsonObj);
        return result;
    }
    
    /**
     * 查询活动扩展配置的相关信息

     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardCommonAction.json", params="method=getExtendAttributes")
    @ResponseBody
    public String getExtendAttributes(HttpServletRequest request)throws Exception{
         JSONObject jsonObj = getParam(request);
        JSONArray jsonArray = appService.getExtendAttributesArray(jsonObj);
        return jsonArray.toString();       
    }
    
    /**
     * 签发子流程

     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
     @RequestMapping(value = "/testCardCommonAction.json", params = "method=addCounterSign")
     @ResponseBody
     public String addCounterSign(HttpServletRequest request) throws Exception {
         JSONObject jsonObj = getParam(request);

         appService.addCounterSign(jsonObj);

         JSONObject json = new JSONObject();
         json.put("msg", "success");
         return json.toString();
     }
     
     /**
      * 上级审核

      * @param request
      * @return
      * @throws Exception
      * @see
      * @since
      */
      @RequestMapping(value = "/testCardCommonAction.json", params = "method=superiorsAudit")
      @ResponseBody
      public String superiorsAudit(HttpServletRequest request) throws Exception {
          JSONObject jsonObj = getParam(request);

          appService.superiorsAudit(jsonObj);

          JSONObject json = new JSONObject();
          json.put("msg", "success");
          return json.toString();
      }
     
     /**
      * 转派
      * @param request
      * @return
      * @throws Exception
      * @see
      * @since
      */
     @RequestMapping(value = "/testCardCommonAction.json", params = "method=saveTurnSendTask")
     @ResponseBody
     public String saveTurnSendTask(HttpServletRequest request) throws Exception {
         JSONObject jsonObj = getParam(request);

         appService.saveTurnSendTask(jsonObj);
         JSONObject json = new JSONObject();
         json.put("msg", "success");
         return json.toString();
     }
     
     /**
      * 转派回单
      * @param request
      * @return
      * @throws Exception
      * @see
      * @since
      */
     @RequestMapping(value = "/testCardCommonAction.json", params = "method=saveTurnSend")
     @ResponseBody
     public String saveTurnSend(HttpServletRequest request) throws Exception {
         JSONObject jsonObj = getParam(request);

         appService.saveTurnSend(jsonObj);
         JSONObject json = new JSONObject();
         json.put("msg", "success");
         return json.toString();
     }
     
     /**
      * 会签回单

      * @param request
      * @return
      * @throws Exception
      * @see
      * @since
      */
      @RequestMapping(value = "/testCardCommonAction.json", params = "method=addSign")
      @ResponseBody
      public String addSign(HttpServletRequest request) throws Exception {
          JSONObject jsonObj = getParam(request);

          appService.addSign(jsonObj);

          JSONObject json = new JSONObject();
          json.put("msg", "success");
          return json.toString();
      }
      
      /**
       * 根据TaskId查询Task
       * @param request
       * @return
       * @throws Exception
       * @see
       * @since
       */
      @RequestMapping(value = "/testCardCommonAction.json", params = "method=queryTaskByTaskId")
      @ResponseBody
      public String queryTaskByTaskId(HttpServletRequest request) throws Exception {
          // 从request获取参数(前台统一传json字符串jsonStr)
          JSONObject jsonObj = getParam(request);

          Map<String, Object> map = appService.queryTaskByTaskId(jsonObj);

          JSONObject json = new JSONObject();
          json.put("data", map);
          json.put("msg", "success");
          return json.toString();
      }
    
    /**
     * 附件查询
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardCommonAction.json", params="method=qryAttachment")
    @ResponseBody
    public String queryAttachment(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        JSONObject _return = new JSONObject();
        logger.info("acion_object-->"+jsonObj);
        Page page = appService.queryByPage(jsonObj);
        if(page.getData()!=null&&!page.getData().isEmpty()){
            _return.put("rows", page.getData());
            _return.put("total", page.getTotalCount());
            _return.put("msg", "success");
        }
        else {
            _return.put("rows","");
            _return.put("total", 0);
            _return.put("msg", "There are not any records...");
        }
        return _return.toString();
    }
    
    @RequestMapping(value="/testCardCommonAction.json", params="method=qryDisAssignObjectListByParam")
    @ResponseBody
    public String qryDisAssignObjectListByParam(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = appService.qryDisAssignObjectListByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 根据流程实例ID获取当前流程正在处理的工作项参与者

     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardCommonAction.json", params="method=findDoingParticipant")
    @ResponseBody
    public String findDoingParticipant(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        JSONArray jsonArray = appService.findDoingParticipant(jsonObj);
        return jsonArray.toString();
    }
    
//    @RequestMapping(value = "/testCardCommonAction.json", params = "method=findDoingParticipant")
//    @ResponseBody
//    public String findDoingParticipant(HttpServletRequest request) throws Exception {
//        JSONObject jsonObj = getParam(request);
//
//        JSONArray jsonArray = appService.findDoingParticipant(jsonObj);
//        return jsonArray.toString();
//    }
    @RequestMapping(value = "/testCardCommonAction.json", params = "method=getProcessingObjData")
    @ResponseBody
    public String getProcessingObjData(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);
        Map<String, Object> map = appService.getProcessingObjData(jsonObj);
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        json.put("data", map);
        return json.toString();
    }
    
}

