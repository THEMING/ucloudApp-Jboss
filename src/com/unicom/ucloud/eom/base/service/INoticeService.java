package com.unicom.ucloud.eom.base.service;

import org.json.JSONObject;

public interface INoticeService extends IBaseService{

    /**
     * 发送短信
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public String sendSmsService(JSONObject jsonObj) throws Exception;
    
    /**
     * 发送邮件
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public String sendEmailService(JSONObject jsonObj) throws Exception;
    
    /**
     * 催办通知
     * @param jsonObj
     * @throws Exception
     * @see
     * @since
     */
    public String sendNotice(JSONObject jsonObj) throws Exception;
}
