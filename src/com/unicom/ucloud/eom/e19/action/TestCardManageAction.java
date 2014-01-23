package com.unicom.ucloud.eom.e19.action;

import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.service.ITestCardManService;
/**
 * 测试卡管理
 * @version 1.0
 * @date 2013-1-31
 * @author jiang.yean
 */
@Controller
@RequestMapping("/e19")
public class TestCardManageAction extends BaseAction {

    
    public TestCardManageAction(){               
    }
    
    @Autowired
    private ITestCardManService testCardManService;
    
    private String prefix = "e19/";
    
    /**
     * 修改测试卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardManageAction.json", params="method=modify")
    @ResponseBody
    public String updateTestCardInfo(HttpServletRequest request) throws Exception{
            JSONObject jsonObj = getParam(request);
            testCardManService.modifyTestCardInfo(jsonObj);
            JSONObject json = new JSONObject();
            json.put("msg", "success");
            return json.toString();
    }
    
    /**
     * 修改固定电话信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/imsManageAction.json", params="method=modify")
    @ResponseBody
    public String updateImsInfo(HttpServletRequest request) throws Exception{
            JSONObject jsonObj = getParam(request);
            testCardManService.modifyImsInfo(jsonObj);
            JSONObject json = new JSONObject();
            json.put("msg", "success");
            return json.toString();
    }
    
    /**
     * 修改测试终端信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/terminalManageAction.json", params="method=modify")
    @ResponseBody
    public String updateTerminalInfo(HttpServletRequest request) throws Exception{
            JSONObject jsonObj = getParam(request);
            testCardManService.modifyTerminalInfo(jsonObj);

            JSONObject json = new JSONObject();
            json.put("msg", "success");
            return json.toString();
    }
    
    /**
     * 修改充值卡信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/rechCardManageAction.json", params="method=modify")
    @ResponseBody
    public String updateRechCardInfo(HttpServletRequest request) throws Exception{
            JSONObject jsonObj = getParam(request);
            testCardManService.modifyRechCardInfo(jsonObj);
             
            JSONObject json = new JSONObject();
            json.put("msg", "success");
            return json.toString();
    }
    
    
    
    /**
     * 调拨历史查询
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardManageAction.json", params="method=getOrderPageForTestCardManage")
    @ResponseBody
    public String getOrderPageForTestCardManage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        
        Page page= testCardManService.qryOrderPageForTestCardManage(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
}
