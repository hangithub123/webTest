package com.hwq.po;

import java.io.Serializable;

public  abstract class BasePO implements Serializable {
    //valueNotNull, true: 获取有值的属性名称数组,false:获取所有的属性名称数组
    public abstract String getAttributes(boolean allAttributes);
    //valueNotNull true 获取有值的属性值数组, false:获取所有的属性值数组
    public abstract String getValues(boolean valueNotNull);
    //表名
    public abstract String getTableName();
    //主键名
    public abstract String getKeyName();
}
