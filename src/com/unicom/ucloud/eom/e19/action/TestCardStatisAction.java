package com.unicom.ucloud.eom.e19.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.e19.service.ITciPriAttTemDetService;
import com.unicom.ucloud.eom.e19.service.ITestCardRegService;
import com.unicom.ucloud.eom.e19.service.ITestCardStatisService;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;

@Controller
@RequestMapping("/e19")
public class TestCardStatisAction extends BaseAction{

    public TestCardStatisAction(){}
    
    @Autowired
    private ITestCardStatisService testCardStatisService;
    @Autowired
    private ITestCardRegService testCardRegService;
    @Autowired
    private ITciPriAttTemDetService tciPriAttTemDetService;
    
    private String prefix = "e19/";
    
    /**
     * 测试卡统计
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardStatisAction.json", params="method=getTestCardStatisInfo")
    @ResponseBody
    public String getTestCardStatisInfo(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = testCardStatisService.getTestCardStatisInfo(jsonObj);
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");

        return json.toString();
    }
    
    /**
     * 查询测试卡(4种类型)信息列表，分页查询
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardStatisAction.json", params="method=getTestCardListPage")
    @ResponseBody
    public String getTestCardListPage(HttpServletRequest request) throws Exception{
        JSONObject jsonObj = getParam(request);
        Page page = new Page();
        Integer testobjectType = JsonUtil.getInt(jsonObj, "testobjectTypeEnumId");
        if(testobjectType == ConstantUtil.TEST_CARD_ENUM){
            page = testCardRegService.qryTestCardPageByParam(jsonObj);
        }else if(testobjectType == ConstantUtil.TELE_CARD_ENUM){
            page = testCardRegService.qryImsPageByParam(jsonObj);
        }else if(testobjectType == ConstantUtil.TERMINAL_CARD_ENUM){
            page = testCardRegService.qryTerminalPageByParam(jsonObj);
        }else if(testobjectType == ConstantUtil.RECH_CARD_ENUM){
            page = testCardRegService.qryRechCardPageByParam(jsonObj);
        }
        
        JSONObject json = new JSONObject();
        json.put("rows", page.getData());
        json.put("total", page.getTotalCount());
        json.put("msg", "success");
        return json.toString();
       
    }
    
    /**
     * 查询测试卡(4种类型)信息列表，包括私有属性
     * @param request
     * @return 
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/testCardStatisAction.json", params="method=getCardInfoByParam")
    @ResponseBody
    public String getCardInfoByParam(HttpServletRequest request) throws Exception{
        
        JSONObject jsonObj = getParam(request);
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Long testobjectId = Long.valueOf(-1);
        Integer testobjectType = JsonUtil.getInt(jsonObj, "testobjectTypeEnumId");
        if(testobjectType != null){
            if(testobjectType.intValue() == ConstantUtil.TEST_CARD_ENUM){
                list = testCardRegService.qryTestCardListByParam(jsonObj);
                testobjectId = JsonUtil.getLong(jsonObj, "testCardId"); 
            }else if(testobjectType.intValue() == ConstantUtil.TELE_CARD_ENUM){
                list = testCardRegService.qryImsListByParam(jsonObj);
                testobjectId = JsonUtil.getLong(jsonObj, "fixedTelId"); 
            }else if(testobjectType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
                list = testCardRegService.qryTerminalListByParam(jsonObj);
                testobjectId = JsonUtil.getLong(jsonObj, "testTerminalId"); 
            }else if(testobjectType.intValue() == ConstantUtil.RECH_CARD_ENUM){
                list = testCardRegService.qryRechCardListByParam(jsonObj);
                testobjectId = JsonUtil.getLong(jsonObj, "rechCardId"); 
            }
        }
        
        /* 查询对应的私有属性值信息 */
        if(list != null){
            getPriInfo(list,testobjectId,testobjectType);
        }
        JSONObject json = new JSONObject();
        json.put("rows", list);
        json.put("total", list.size());
        json.put("msg", "success");
        return json.toString();
    }
    
    /**
     * 查询私有属性模板明细对应的值
     * @param list
     * @param testobjectId
     * @throws Exception
     * @see
     * @since
     */
    private void getPriInfo(List<Map<String, Object>> list,Long testobjectId,Integer testobjectType) 
            throws Exception{
        Map<String, Object> map = list.get(0);
        JSONObject qryJson = new JSONObject();
        qryJson.put("testobjectId",testobjectId);
        qryJson.put("testobjectType",testobjectType);
        List<Map<String, Object>> infoList = 
                tciPriAttTemDetService.qryDetailAndInfoListByParam(qryJson);
        if(infoList != null && infoList.size() > 0){
            Map<String, Object> tmpMap = new HashMap<String, Object>();
            for(int i=0;i<infoList.size();i++){
                tmpMap = infoList.get(i);
                String displayNumber = MapUtils.getString(tmpMap, "displayNumber");
                map.put(MapUtils.getString(tmpMap, "columnNumber"), 
                        MapUtils.getString(tmpMap, "column"+displayNumber));
            }
        }
    }
}
