package com.unicom.ucloud.eom.e19.action;


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
import com.unicom.ucloud.eom.e19.service.ITciPriAttEnValService;
import com.unicom.ucloud.eom.e19.service.ITciPriAttTemDetService;
import com.unicom.ucloud.eom.e19.service.ITciPriAttTemService;

@Controller
@RequestMapping("/e19")
public class TciPriAttTemplateAction extends BaseAction{
    
    public TciPriAttTemplateAction(){       
    }
    /** 定位页面所在目录  */
    private String prefix = "e19/";
    @Autowired
    private ITciPriAttTemService tciPriAttTemService;
    @Autowired
    private ITciPriAttTemDetService tciPriAttTemDetService;
    @Autowired
    private ITciPriAttEnValService tciPriAttEnValService;
  
    /**
     * 查询私有属性模板 不分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryTemplateList")
    @ResponseBody
    public String qryTemplateList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = tciPriAttTemService.qryListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }
    /**
     * 查询私有属性模板 分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryTemplatePage")
    @ResponseBody
    public String qryTemplatePage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        Page page = tciPriAttTemService.qryPageByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    /**
     * 新增私有属性模板
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=saveTemplate")
    @ResponseBody
    public String saveTemplate(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        tciPriAttTemService.save(jsonObj);
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    /**
     * 修改私有属性模板
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=updateTemplate")
    @ResponseBody
    public String updateTemplate(HttpServletRequest request) throws Exception{
            JSONObject jsonObj = getParam(request);
            tciPriAttTemService.update(jsonObj);
             
            JSONObject json = new JSONObject();
            json.put("result", "success");
            return json.toString();
    }
    /**
     * 删除私有属性模板，把其所属的模板明细也删除
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=deleteTemplate")
    @ResponseBody
    public String deleteTemplate(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        tciPriAttTemService.delete(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    /**
     * 查询私有属性模板明细和私有属性模板信息
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryTemplateAndDetialList")
    @ResponseBody
    public String qryTemplateAndDetialList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = tciPriAttTemService.qryTemplateListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }

    /**
     * 查询模板明细 不分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryTemplateDetailList")
    @ResponseBody
    public String qryTemplateDetailList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        List<Map<String, Object>> list = tciPriAttTemDetService.qryListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }
    
    /**
     * 查询模板明细 分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryTemplateDetailPage")
    @ResponseBody
    public String qryTemplateDetailPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        Page page = tciPriAttTemDetService.qryPageByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
    }
    /**
     * 新增模板明细
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=saveTemplateDetial")
    @ResponseBody
    public String saveTemplateDetial(HttpServletRequest request) throws Exception{

        JSONObject jsonObj = getParam(request);
        tciPriAttTemDetService.save(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    /**
     * 修改模板明细
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=updateTemplateDetial")
    @ResponseBody
    public String updateTemplateDetial(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        tciPriAttTemDetService.update(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    /**
     * 删除模板明细
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=deleteTemplateDetial")
    @ResponseBody
    public String deleteTemplateDetial(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        tciPriAttTemDetService.delete(jsonObj);
        
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json.toString();
    }
    
    
    /**测试卡私有属性枚举值*/
    
    /**
     * 查询测试卡私有属性枚举值 不分页
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryEnumValueList")
    @ResponseBody
    public String qryEnumValueList(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = tciPriAttEnValService.qryListByParam(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }
    /**
     * 查询模板明细 不分页 返回jsonArray
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/tciPriAttTemplateAction.json", params="method=qryEnumValueListForCombox")
    @ResponseBody
    public String qryEnumValueListForCombox(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);

        List<Map<String, Object>> list = tciPriAttEnValService.qryListByParam(jsonObj);
        
        JSONArray jsonArray = new JSONArray(list);
        return jsonArray.toString();
    }
}
