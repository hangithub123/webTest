package com.hwq.util;

import java.util.UUID;

public class StringUtil {
    public static String getUuid32(){
    return UUID.randomUUID().toString().replace("-","");
    }
}
