package com.unicom.ucloud.eom.base.action;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.service.INoticeService;

@Controller
@RequestMapping("/notice")
public class NoticeAction extends BaseAction{

    public NoticeAction(){}
    
    @Autowired
    private INoticeService noticeService;
    
    /**
     * 通知
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value="/noticeAction.json", params="method=sendNotice")
    @ResponseBody
    public String sendNotice(HttpServletRequest request)throws Exception{
        JSONObject jsonObj = getParam(request);
        JSONObject json = new JSONObject();
        json.put("msg", noticeService.sendNotice(jsonObj));
        return json.toString();  
    }
}
