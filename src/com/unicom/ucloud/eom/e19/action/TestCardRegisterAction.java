package com.unicom.ucloud.eom.e19.action;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.service.ITestCardRegService;

/**
 * 测试卡登记
 * @version 1.0
 * @date 2013-1-16
 * @author jiang.yean
 */
@Controller
@RequestMapping("/e19")
public class TestCardRegisterAction extends BaseAction {

    public TestCardRegisterAction(){
        
    }
    
    @Autowired
    private ITestCardRegService testCardRegService;

    private String prefix = "e19/";
    
    /**
     * 新增 测试卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardRegisterAction.json", params="method=insertTestCardInfoBatch")
    @ResponseBody
    public String insertTestCardInfoBatch(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        testCardRegService.saveTestCardInfoBatch(jsonObj);
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    /**
     * 查询测试卡信息 分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardRegisterAction.json", params="method=qryPage")
    @ResponseBody
    public String qryTestCardPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        Page page= testCardRegService.qryTestCardPageByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询测试卡信息 list
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardRegisterAction.json", params="method=qryList")
    @ResponseBody
    public String qryTestCardList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = testCardRegService.qryTestCardListByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 删除测试卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardRegisterAction.json", params="method=del")
    @ResponseBody
    public String deleteTestCardInfo(HttpServletRequest request) throws Exception{
       JSONObject jsonObj = getParam(request);
       String ret = testCardRegService.deleteTestCardInfo(jsonObj);
       if(!"".equals(ret)){
           JSONObject json = new JSONObject();
           json.put("msg", "warn");
           json.put("ret", ret);
           return json.toString();
       }
       JSONObject json = new JSONObject();
       json.put("msg", "success");
       return json.toString();
   }

    /**
     * 插入固定电话信息 批量
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardRegisterAction.json", params="method=addImsInfoBatch")
    @ResponseBody
    public String insertImsInfoBatch(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        testCardRegService.saveImsInfoBatch(jsonObj);
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    /**
     * 查询固定电话信息 分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/imsRegisterAction.json", params="method=qryPage")
    @ResponseBody
    public String qryImsPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        Page page = testCardRegService.qryImsPageByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询固定电话信息 list
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/imsRegisterAction.json", params="method=qryList")
    @ResponseBody
    public String qryImsList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = testCardRegService.qryImsListByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 删除固定电话信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/imsRegisterAction.json", params="method=del")
    @ResponseBody
    public String deleteImsInfo(HttpServletRequest request) throws Exception{
    	/**
    	 * JSONObject jsonObj = getParam(request);
        testCardRegService.deleteImsInfo(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    	 */
    	
    	JSONObject jsonObj = getParam(request);
       String ret = testCardRegService.deleteImsInfo(jsonObj);
       if(!"".equals(ret)){
           JSONObject json = new JSONObject();
           json.put("msg", "warn");
           json.put("ret", ret);
           return json.toString();
       }
       JSONObject json = new JSONObject();
       json.put("msg", "success");
       return json.toString();
    
    }
    
    /**
     * 插入测试终端信息 批量
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/terminalRegisterAction.json", params="method=addBatch")
    @ResponseBody
    public String insertTerminalInfoBatch(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        testCardRegService.saveTerminalInfoBatch(jsonObj);
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    /**
     * 查询测试终端信息 分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/terminalRegisterAction.json", params="method=qryPage")
    @ResponseBody
    public String qryTerminalPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        Page page = testCardRegService.qryTerminalPageByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询测试终端信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/terminalRegisterAction.json", params="method=qryList")
    @ResponseBody
    public String qryTerminalList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = testCardRegService.qryTerminalListByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 删除测试终端信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/terminalRegisterAction.json", params="method=del")
    @ResponseBody
    public String deleteTerminalInfo(HttpServletRequest request) throws Exception{
       JSONObject jsonObj = getParam(request);
       String ret = testCardRegService.deleteTerminalInfo(jsonObj);
       if(!"".equals(ret)){
           JSONObject json = new JSONObject();
           json.put("msg", "warn");
           json.put("ret", ret);
           return json.toString();
       }
       JSONObject json = new JSONObject();
       json.put("msg", "success");
       return json.toString();
    
    }
    
    /**
     * 新增充值卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/rechCardRegisterAction.json", params="method=addBatch")
    @ResponseBody
    public String insertRechCardInfoBatch(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        testCardRegService.saveRechCardInfoBatch(jsonObj);
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
   
    /**
     * 查询充值卡信息 分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/rechCardRegisterAction.json", params="method=qryPage")
    @ResponseBody
    public String qryRechCardPage(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        Page page = testCardRegService.qryRechCardPageByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询充值卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/rechCardRegisterAction.json", params="method=qryList")
    @ResponseBody
    public String qryRechCardList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = testCardRegService.qryRechCardListByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 删除充值卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/rechCardRegisterAction.json", params="method=del")
    @ResponseBody
    public String deleteRechCardInfo(HttpServletRequest request) throws Exception{
    	  JSONObject jsonObj = getParam(request);
          String ret = testCardRegService.deleteRechCardInfo(jsonObj);
          if(!"".equals(ret)){
              JSONObject json = new JSONObject();
              json.put("msg", "warn");
              json.put("ret", ret);
              return json.toString();
          }
          JSONObject json = new JSONObject();
          json.put("msg", "success");
          return json.toString();
        
    }
    
}
