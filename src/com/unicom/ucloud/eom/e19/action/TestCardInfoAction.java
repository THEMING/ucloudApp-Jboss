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
import org.springframework.web.servlet.ModelAndView;

import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.eom.e19.service.ITestCardInfoService;
import com.unicom.ucloud.eom.e19.service.ITestCardRegService;
import com.unicom.ucloud.util.JsonUtil;
/**
 * 
 * @version 1.0
 * @date 2013-1-11
 * @author MING
 */
@Controller
@RequestMapping("/e19")
public class TestCardInfoAction extends BaseAction {

    @Autowired
    private ITestCardInfoService testCardInfoService;
    @Autowired
    private ITestCardRegService testCardRegService;
    
    /** 定位页面所在目录  */
    private String prefix = "e19/";
    
    @RequestMapping(value="/testCardInfoAction.json", params="method=qryList")
    @ResponseBody
    public String qryList(HttpServletRequest request) throws Exception{
//        // 从request获取参数(前台统一传json字符串jsonStr)
//        JSONObject jsonObj = getParam(request);
//        
//        List<Map<String, Object>> list = testCardInfoService.qryListByParam(jsonObj);
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
        
        JSONObject jsonObj = getParam(request);
        Page page = null;
        
        if(JsonUtil.getInt(jsonObj, "testobjectTypeEnumId") == ConstantUtil.TEST_CARD_ENUM){
            page = testCardRegService.qryTestCardPageByParam(jsonObj);
        }else if(JsonUtil.getInt(jsonObj, "testobjectTypeEnumId") == ConstantUtil.TELE_CARD_ENUM){
            page = testCardRegService.qryImsPageByParam(jsonObj);
        }else if(JsonUtil.getInt(jsonObj, "testobjectTypeEnumId") == ConstantUtil.TERMINAL_CARD_ENUM){
            page = testCardRegService.qryTerminalPageByParam(jsonObj);
        }else if(JsonUtil.getInt(jsonObj, "testobjectTypeEnumId") == ConstantUtil.RECH_CARD_ENUM){
            page = testCardRegService.qryRechCardPageByParam(jsonObj);
        }
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    
    @RequestMapping(value="/testCardInfoAction.do", params="method=init")
    public ModelAndView init(HttpServletRequest request) throws Exception{
        // 第二个参数时 带返回值到跳转后的页面
        Map a = new HashMap<String,String>();
        a.put("id", request.getParameter("id"));
        ModelAndView model = new ModelAndView(prefix + "testCardOrderApplyAdd", a );
        return model;
    }
    
}
