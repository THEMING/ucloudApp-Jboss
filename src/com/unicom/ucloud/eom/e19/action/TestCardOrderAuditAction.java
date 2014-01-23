package com.unicom.ucloud.eom.e19.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.e19.dao.IGenProcessingInfoRecDAO;
import com.unicom.ucloud.eom.e19.service.IGenProcessingInfoRecService;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
@Controller
@RequestMapping("/e19")
public class TestCardOrderAuditAction extends BaseAction {

    @Autowired
    private IGenProcessingInfoRecService genProcessingInfoRecService;
    
    
    /** 定位页面所在目录  */
    private String prefix = "e19/";
    
//    @RequestMapping(value="/testCardOrderAuditAction.json", params="method=qryAuditHistory")
//    @ResponseBody
//    public String qryAuditHistory(HttpServletRequest request) throws Exception{
//        // 从request获取参数(前台统一传json字符串jsonStr)
//        JSONObject jsonObj = getParam(request);
//        
////        List<Map<String, Object>> list = cardSheetActivityService.qryListByParam(jsonObj);
//        // 封装分页对象
//        //Map<String, Object> pageMap = new HashMap<String, Object>();
//        //pageMap.put("rows", list);
//        //pageMap.put("total", list.size());
//        
//        //JSONObject json = new JSONObject();
//        //json.put("data", pageMap);
//        //json.put("msg", "success");
//        
//        JSONObject json = new JSONObject();
//        json.put("rows", list);
//        json.put("total", list.size());
//        json.put("msg", "success");
//        return json.toString();
//    }
    
    @RequestMapping(value="/testCardOrderAuditAction.json", params="method=addCardOrderAudit")
    @ResponseBody
    public String addCardOrderAudit(HttpServletRequest request) throws Exception{
        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = getParam(request);
        String re = "";
        JSONObject json = new JSONObject();
        re = genProcessingInfoRecService.save(jsonObj);
        
        if(!"".equals(re)){
            json.put("msg", "warn");
            json.put("ret", re);
            return json.toString();
        }
//        cardSheetActivityService.save(jsonObj);
        // 封装分页对象
        //Map<String, Object> pageMap = new HashMap<String, Object>();
        //pageMap.put("rows", list);
        //pageMap.put("total", list.size());
        
        //JSONObject json = new JSONObject();
        //json.put("data", pageMap);
        //json.put("msg", "success");
        
        
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderAuditAction.json", params="method=addClaimTask")
    @ResponseBody
    public String addClaimTask(HttpServletRequest request) throws Exception{
        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = getParam(request);
        try{
            genProcessingInfoRecService.addClaimTask(jsonObj);
        }catch(Exception e){
            JSONObject json = new JSONObject();
            json.put("msg", "false");
            return json.toString();
        }
        
//        cardSheetActivityService.save(jsonObj);
        // 封装分页对象
        //Map<String, Object> pageMap = new HashMap<String, Object>();
        //pageMap.put("rows", list);
        //pageMap.put("total", list.size());
        
        //JSONObject json = new JSONObject();
        //json.put("data", pageMap);
        //json.put("msg", "success");
        
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderAuditAction.json", params="method=addDispatchTask")
    @ResponseBody
    public String addDispatchTask(HttpServletRequest request) throws Exception{
        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = getParam(request);
        genProcessingInfoRecService.addDispatchTask(jsonObj);
//        cardSheetActivityService.save(jsonObj);
        // 封装分页对象
        //Map<String, Object> pageMap = new HashMap<String, Object>();
        //pageMap.put("rows", list);
        //pageMap.put("total", list.size());
        
        //JSONObject json = new JSONObject();
        //json.put("data", pageMap);
        //json.put("msg", "success");
        
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }
    
    
}
