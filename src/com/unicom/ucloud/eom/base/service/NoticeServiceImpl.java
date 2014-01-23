package com.unicom.ucloud.eom.base.service;

import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.ucloud.paas.proxy.notification.email.EmailService;
import com.ucloud.paas.proxy.notification.sms.SmsService;
import com.unicom.ucloud.util.Config;
import com.unicom.ucloud.util.JsonUtil;

@Service
public class NoticeServiceImpl extends BaseServiceImpl implements INoticeService {

    private String appId = "";
    
    public NoticeServiceImpl(){
        appId = Config.getProperty("appId");
    }
    
    @Override
    public String sendNotice(JSONObject jsonObj) throws Exception{
        StringBuffer msg = new StringBuffer();
        JSONArray userArray = new JSONArray(JsonUtil.getString(jsonObj, "userArray"));
        if (userArray != null && userArray.length() > 0) {
            JSONObject userJson = new JSONObject();
            for (int i = 0; i < userArray.length(); i++) {
                userJson = userArray.getJSONObject(i);
                String userMobileNumber = JsonUtil.getString(userJson, "userMobileNumber");
                String userEmail = JsonUtil.getString(userJson, "userEmail");
                String noticeType = JsonUtil.getString(userJson, "noticeType");
                
                jsonObj.put("appId", appId);
                jsonObj.put("receiveNumber", userMobileNumber);
                jsonObj.put("receiveAddress", userEmail);
                String userName = JsonUtil.getString(userJson, "userName");
                
                if("1".equals(noticeType)){//短信
                    if(userMobileNumber == null || "".equals(userMobileNumber)){
                        msg.append(userName+"' 的手机号码为空,无法发送.<br>");
                    }else{
                        try{
                            sendSmsService(jsonObj);
                            msg.append("发送给 '"+userName+"' 的短信成功.<br>");
                        }catch(Exception e){
                            msg.append("发送给 '"+userName+"' 的短信失败.<br>");
                            e.printStackTrace();
                        }
                    }
                }else if("2".equals(noticeType)){//邮件
                    if(userEmail == null || "".equals(userEmail)){
                        msg.append(userName+"' 的邮件为空,无法发送.<br>");
                    }else{
                        try{
                            sendEmailService(jsonObj);
                            msg.append("发送给 '"+userName+"' 的邮件成功.<br>");
                        }catch(Exception e){
                            msg.append("发送给 '"+userName+"' 的邮件失败.<br>");
                            e.printStackTrace();
                        }
                    }
                }else if("3".equals(noticeType)){//短信+邮件
                    try{
                        sendSmsService(jsonObj);
                        msg.append("发送给 '"+userName+"' 的短信成功.<br>");
                    }catch(Exception e){
                        msg.append("发送给 '"+userName+"' 的短信失败.<br>");
                        e.printStackTrace();
                    }
                    
                    try{
                        sendEmailService(jsonObj);
                        msg.append("发送给 '"+userName+"' 的邮件成功.<br>");
                    }catch(Exception e){
                        msg.append("发送给 '"+userName+"' 的邮件失败.<br>");
                        e.printStackTrace();
                    }
                }else{
                    msg.append("通知 '"+userName+"' 通知类型为空.<br>");
                }
            }
        }
        return msg.toString();
    }
    
    @Override
    public String sendSmsService(JSONObject jsonObj) throws Exception {
        SmsService sms = new SmsService();
        String smsResult = sms.sendSmsService(JsonUtil.getString(jsonObj, "serviceToken"), JsonUtil.getString(jsonObj, "appId"), 
                JsonUtil.getString(jsonObj, "noticeId"), JsonUtil.getString(jsonObj, "instanceId"), JsonUtil.getString(jsonObj, "provinceId"),
                JsonUtil.getString(jsonObj, "userId"), JsonUtil.getString(jsonObj, "receiveNumber"), JsonUtil.getString(jsonObj, "sendName"),
                JsonUtil.getString(jsonObj, "isServiceNum"), JsonUtil.getString(jsonObj, "sendContent"), new Date(), 
                JsonUtil.getString(jsonObj, "moduleId"));
        return smsResult;
    }

    @Override
    public String sendEmailService(JSONObject jsonObj) throws Exception {
        EmailService email = new EmailService();
        String emailResult = email.sendEmailService(JsonUtil.getString(jsonObj, "serviceToken"), JsonUtil.getString(jsonObj, "appId"), 
                JsonUtil.getString(jsonObj, "moduleId"), JsonUtil.getString(jsonObj, "instanceId"), 
                JsonUtil.getString(jsonObj, "sourceAddress"), JsonUtil.getString(jsonObj, "receiveAddress"), 
                JsonUtil.getString(jsonObj, "sendName"),JsonUtil.getString(jsonObj, "sendContent"), new Date());
        return emailResult;
    }
}
