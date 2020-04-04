package com.hwq.util;

import org.apache.commons.beanutils.ConvertUtils;

public class ConvertUtil {
    public static Long strToLong(String str){
        return Long.parseLong(str);
    }
    public static String objToString(Object obj){
        Object res=ConvertUtils.convert(obj,String.class);
        if(res==null)
            return null;
        else
            return res.toString();
    }
}
