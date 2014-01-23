package com.unicom.ucloud.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


public class ControllerInterceptor extends HandlerInterceptorAdapter
{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
//        if(handler instanceof UserController)
//        {
//        	UserInfo user = (UserInfo)request.getSession().getAttribute("USER");
//            ((UserController)handler).setUser(user);
//        }
        
        return true;
    }
}
