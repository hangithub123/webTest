package com.hwq.interceptors;

import org.apache.ibatis.plugin.Intercepts;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class MyRequestInterceptor extends HandlerInterceptorAdapter {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获取访问地址
        System.out.println("请求路径："+request.getRequestURL());
        System.out.println("请求参数："+request.getQueryString());
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           @Nullable ModelAndView modelAndView) throws Exception {
        if(modelAndView!=null)
        modelAndView.addObject("ctx",request.getContextPath());
    }
}
