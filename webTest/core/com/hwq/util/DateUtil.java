package com.hwq.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
    public static Long getDateNum14(){
        Date dd=new Date();
        //格式化
        SimpleDateFormat sim=new SimpleDateFormat("yyyyMMddHHmmss");
        String time=sim.format(dd);
        return Long.parseLong(time);
    }
    public static Long getDateNum8(){
        Date dd=new Date();
        //格式化
        SimpleDateFormat sim=new SimpleDateFormat("yyyyMMdd");
        String time=sim.format(dd);
        return Long.parseLong(time);
    }
    public static String getDateFormat14(){
        Date dd=new Date();
        //格式化
        SimpleDateFormat sim=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String time=sim.format(dd);
        return time;
    }
    public static String getDateFormat14(long date){
        //格式化
        String t=String.valueOf(date);
        t=t.substring(0,4)+"/"+t.substring(4,6)+"/"+t.substring(6,8)+" "+t.substring(8,10)+":"+t.substring(10,12)+":"+t.substring(12,14);
        return t;
    }
    public static String getDateFormat8(){
        Date dd=new Date();
        //格式化
        SimpleDateFormat sim=new SimpleDateFormat("yyyy/MM/dd");
        String time=sim.format(dd);
        return time;
    }

}
