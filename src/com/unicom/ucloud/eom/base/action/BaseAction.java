package com.unicom.ucloud.eom.base.action;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.unicom.ucloud.util.JsonUtil;

/**
 * action基类
 * 
 * @version 1.0
 * @date 2013-1-10
 * @author guojinan
 */
public class BaseAction {
    
    public static final String SESSION_KEY_LOGON_ACCOUNT = "LOGON_ACCOUNT";
    public static final String SESSION_KEY_LOGON_USER = "LOGON_USER";
    public static final String SESSION_KEY_LOGON_ORG = "LOGON_ORG";
    /**
     * 模块调试级别日志纪录类,调试用的代码，请尽量使用debug
     */
    protected Logger logger = Logger.getLogger(this.getClass());

    /**
     * 获取前台传入参数
     * 
     * @param request
     *            request对象
     * @return org.json.JSONObject
     * @throws Exception
     * @see
     * @since
     */
    public JSONObject getParam(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Enumeration<?> keys = request.getParameterNames();
        while (keys.hasMoreElements()) {
            Object key = keys.nextElement();
            if(key!=null){
            	if (key instanceof String) {
            		paramMap.put(key.toString(), request.getParameter(key.toString()));
				}
            }
            
        }

        JSONObject jsonObj = new JSONObject(paramMap);
        logger.debug("页面参数：" + jsonObj);
        return jsonObj;
    }

    /**
     * 取得session中account
     * 
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    public JSONObject getLogonAccount(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        Object account = request.getSession().getAttribute(SESSION_KEY_LOGON_ACCOUNT);
        if(account==null){
        	account = new Object();
        }
        
        return (JSONObject) account;
    }
    /**
     * 取得session中account
     * 
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    public JSONObject getLogonUcloudUser(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        Object account = request.getSession().getAttribute(SESSION_KEY_LOGON_USER);
        if(account==null){
        	account = new Object();
        }
        return (JSONObject) account;
    }
    
    /**
     * 取得session中account
     * 
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    public JSONObject getLogonUcloudOrg(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        Object account = request.getSession().getAttribute(SESSION_KEY_LOGON_ORG);
        if(account==null){
        	account = new Object();
        }
        return (JSONObject) account;
    }

}
