package com.unicom.ucloud.util;

import java.util.Properties;
import java.io.*;

/**
 * @author ruantb
 * @version 1.0.0 2012.08.24
 */
public class Config {
    private static String CONFIG_FILENAME = "config.properties";
    private static Properties prop = null;

    public Config() {
        if (prop == null) {
            loadProperties();
        }
    };

    private synchronized static void loadProperties() {
        try {
            // Open the props file
            InputStream is = Config.class.getResourceAsStream("/" + CONFIG_FILENAME);
            prop = new Properties();
            // Read in the stored properties
            prop.load(is);
        } catch (Exception e) {
            System.err.println("读取配置文件失败！！！");
            prop = null;
            e.printStackTrace();
        }
    }

    public static String getProperty(String key) {
        if (prop == null) {
            loadProperties();
        }
        return prop.getProperty(key);
    }

    public static String getProperty(String key, String defaultValue) {
        if (prop == null) {
            loadProperties();
        }
        return prop.getProperty(key, defaultValue);
    }

    public static void main(String[] args) {
        String tt = Config.getProperty("refresh_time");
        System.out.println("tt=======" + tt);

    }

}
