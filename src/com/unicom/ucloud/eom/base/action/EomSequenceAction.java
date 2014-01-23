package com.unicom.ucloud.eom.base.action;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.service.IEomSequenceService;

@Controller
@RequestMapping("/eomSequence")
public class EomSequenceAction extends BaseAction{
    
    public EomSequenceAction(){
        
    }
    
    @Autowired
    private IEomSequenceService eomSequenceService;
    
    /**
     * 获取工单编码然后更新最新的序列
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/eomSequenceAction.json", params="method=queryEomWoNo")
    @ResponseBody
    public String queryEomWoNo(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        JSONObject json = new JSONObject();
        json.put("woNo", eomSequenceService.updateMySequence(jsonObj));
        return json.toString();  
    }
}
