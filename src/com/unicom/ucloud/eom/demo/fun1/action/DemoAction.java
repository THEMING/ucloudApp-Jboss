package com.unicom.ucloud.eom.demo.fun1.action;

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
import com.unicom.ucloud.eom.demo.fun1.service.IDemoService;

/**
 * 测试类 类的RequestMapping采用"/模块包名/功能包名" 方法的RequestMapping的value采用类名，把类名首字母改成小写 ，若异步调用(要在方法前面加入
 * "@ResponseBody")，则采用.json方式 ，若同步调用，则采用.do方式 ；params采用方法名称
 * 
 * @version 1.0
 * @date 2013-1-10
 * @author guojinan
 */
@Controller
@RequestMapping("/demo/fun1")
public class DemoAction extends BaseAction {

    @Autowired
    private IDemoService demoService;

    /**
     * 查询列表
     * 
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/demoAction.json", params = "method=qryList")
    @ResponseBody
    public String qryList(HttpServletRequest request) throws Exception {
        System.out.println("1111111");
        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = new JSONObject();

        List<Map<String, Object>> list = demoService.qryListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }

    /**
     * 新增
     * 
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/demoAction.json", params = "method=save")
    @ResponseBody
    public String save(HttpServletRequest request) throws Exception {
        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = getParam(request);

        demoService.save(jsonObj);
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }

    /**
     * 带分页功能的查询
     * 
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/demoAction.json", params = "method=qryPageByParam")
    @ResponseBody
    public String qryPageByParam(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("start", 0);
        jsonObj.put("limit", 2);
        Page page = demoService.page(jsonObj);

        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }

    /**
     * 新增
     * 
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/demoAction.json", params = "method=inquiryAreaListByOrgId")
    @ResponseBody
    public String inquiryAreaListByOrgId(HttpServletRequest request) throws Exception {
        // 从request获取参数(前台统一传json字符串jsonStr)
        // JSONObject jsonObj = getParam(request);
//        ESBAPPAP1InquiryAreaListByOrgIdInfoSrv_ESBAPPAP1InquiryAreaListByOrgIdInfoSrvPort_Client
//                .inquiryAreaListByOrgId(1);
        JSONObject json = new JSONObject();
        json.put("msg", "success");
        return json.toString();
    }
}
