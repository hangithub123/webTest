package com.hwq.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;


public class PropertiesUtil {
	/**
	 * 根据配置变量实时获取配置文件中的值
	 * @param key 配置名
	 * @param filePath 配置文件路径名，例如：test.properties
	 * @return 配置值
	 */
	public static String getCurrentPropertiesValue(String key,String filePath){
		String value="";
		Properties p = new Properties();
		try {
			//非实时动态获取
			//p.load(new InputStreamReader(this.class.getClassLoader().getResourceAsStream(filePath), "UTF-8"));
			//下面为动态获取
			String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
			InputStream is = new FileInputStream(path +File.separator+ filePath);
			p.load(is);
			value=p.getProperty(key);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return value;
	}

	public static String getCurrentPropertiesValue(String key) {
		return getCurrentPropertiesValue(key,"com/hwq/properties/global.properties");
	}
}
