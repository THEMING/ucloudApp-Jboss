package com.unicom.ucloud.eom.e19.action;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.service.IEomCardSheetService;
import com.unicom.ucloud.eom.e19.service.ITestCardOrderApplyService;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.workflow.exceptions.WFException;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
@Controller
@RequestMapping("/e19")
public class TestCardOrderApplyAction extends BaseAction {

    private  Calendar calendar = Calendar.getInstance();
    @Autowired
    private ITestCardOrderApplyService testCardOrderApplyService;
    @Autowired
    private IEomCardSheetService eomCardSheetService;
    protected final Logger logger = Logger.getLogger(this.getClass());
    /** 定位页面所在目录  */
    private String prefix = "e19/";
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryList")
    @ResponseBody
    public String qryList(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
//        List<Map<String, Object>> list = testCardOrderApplyService.qryListByParam(jsonObj);
//        
//        JSONObject json = new JSONObject();
//        json.put("rows", list);
//        json.put("total", list.size());
//        json.put("msg", "success");
//        return json.toString();
        
        Page page = testCardOrderApplyService.qryEomCardSheetPageByParam(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryMustReturnTestCard")
    @ResponseBody
    public String qryMustReturnTestCard(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = testCardOrderApplyService.qryMustReturnTestCard(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryUndoByCardSheetId")
    @ResponseBody
    public String qryUndoByCardSheetId(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        List<Map<String, Object>> list = testCardOrderApplyService.qryUndoByCardSheetId(jsonObj);
        // 封装分页对象
        //Map<String, Object> pageMap = new HashMap<String, Object>();
        //pageMap.put("rows", list);
        //pageMap.put("total", list.size());
        
        //JSONObject json = new JSONObject();
        //json.put("data", pageMap);
        //json.put("msg", "success");
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryAtestCardOrder")
    @ResponseBody
    public String qryAtestCardOrder(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = testCardOrderApplyService.qryAtestCardOrder(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }

    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryAtestCardOrderTestCard")
    @ResponseBody
    public String qryAtestCardOrderTestCard(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = testCardOrderApplyService.qryAtestCardOrderTestCard(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=addTestCardOrder")
    @ResponseBody
    public String addTestCardOrder(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        JSONObject json = new JSONObject();
        String re = "";
        try{
            re = testCardOrderApplyService.addTestCardOrderApply(jsonObj);
            if(!"".equals(re)){
                json.put("msg", "warn");
                json.put("ret", re);
                return json.toString();
            }
        }catch(Exception e){e.printStackTrace();
            logger.debug("==============="+e.getMessage()+"===============");
            json.put("msg", "error");
            return json.toString();
        }
        json.put("msg", "success");
        return json.toString();
    }
    

    /**
     * 批量插入工单
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=addTestCardOrderBatch")
    @ResponseBody
    public String addTestCardOrderBatch(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        testCardOrderApplyService.addTestCardOrderBatch(jsonObj);
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=updateTestCardOrder")
    @ResponseBody
    public String updateTestCardOrder(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        String ret = testCardOrderApplyService.updateTestCardOrder(jsonObj);
        
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
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=deleteTestCardOrder")
    @ResponseBody
    public String deleteTestCardOrder(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        testCardOrderApplyService.deleteTestCardOrder(jsonObj);
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=doUrgeTestCardOrder")
    @ResponseBody
    public String doUrgeTestCardOrder(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        
        testCardOrderApplyService.addUrgeTestCardOrder(jsonObj);
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardOrderApplyAction.do", params="method=init")
    public ModelAndView init(HttpServletRequest request) throws Exception{
        // 第二个参数时 带返回值到跳转后的页面
        Map a = new HashMap<String,String>();
        a.put("id", request.getParameter("id"));
        ModelAndView model = new ModelAndView(prefix + "testCardOrderApplyAdd", a );
        return model;
    }
    
    /**
     * 测试卡查询  调拔历史   by jiang.yean
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryForManage")
    @ResponseBody
    public String qryOrderDetailForTestCardManage(HttpServletRequest request) throws Exception{
        
        
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = testCardOrderApplyService.qryOrderDetailForTestCardManage(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询工单(分页)
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=qryEomCardSheetPage")
    @ResponseBody
    public String qryEomCardSheetPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        Page page = testCardOrderApplyService.qryEomCardSheetPageByParam(jsonObj);
 
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    
    /**
     * 自动生成单号，待修改
     * @return
     * @see
     * @since
     */
    public String getApplyCode() {
        StringBuffer tempCode = new StringBuffer(50);
        StringBuffer applyCode = new StringBuffer(50);
        tempCode.append("APPLYCODE_");
        tempCode.append(calendar.get(Calendar.YEAR));
        applyCode.append(calendar.get(Calendar.YEAR));
        int month = calendar.get(Calendar.MONTH) + 1;
        if (month < 10) {
            applyCode.append("0" + month);
        } else {
            applyCode.append(month);
        }
        applyCode.append(calendar.get(Calendar.DATE));

        String sequence = String.valueOf((int) (Math.random() * 1000));

        if (sequence != null && sequence.length() < 4) {
            for (int i = sequence.length(); i < 4; i++) {
                applyCode.append("0");
            }
        }
        applyCode.append(sequence);
        return applyCode.toString();
    }
    @RequestMapping(value="/testCardOrderApplyAction.json", params="method=findUserEntity")
    @ResponseBody
    public String findUserEntity(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        String adminName = JsonUtil.getString(jsonObj, "adminName");
        int orgId = JsonUtil.getInt(jsonObj, "orgId");
        AAAAService aaaa = new AAAAService();
        List<Object[]> li = aaaa.findUserEntityByCloudOrgIdAndEmpName(orgId, adminName);
        JSONObject json = new JSONObject();
        json.put("total", li.size());
        return json.toString();
    }
}
