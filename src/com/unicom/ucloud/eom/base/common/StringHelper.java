package com.unicom.ucloud.eom.base.common;

import java.util.LinkedList;

/**
 * 字符串处理辅助类
 * 
 * @author feng.yang
 * @version 1.0
 */
public class StringHelper {
    private StringHelper() {
    }

    /**
     * 判断对象是否为空(null)，包括空白("")
     * 
     * @param obj
     * @return
     * @see
     * @since
     */
    public static boolean isNull(Object obj) {

        if (obj == null)
            return true;

        if (obj instanceof String) {
            if (String.valueOf(obj).trim().length() == 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * 将对象转换成String
     * 
     * @param val
     *            Object
     * @return String
     */
    public static final String toString(Object val) {
        if (val == null) {
            return "";
        }
        return val.toString();
    }

    /**
     * 将对象数组转换成String
     * 
     * @param objs
     *            Object[]
     * @return String
     */
    public static final String toString(Object[] objs) {
        if (objs != null && objs.length > 0) {
            StringBuffer buff = new StringBuffer();
            for (int i = 0; i < objs.length; i++) {
                buff.append("\nItem[").append(i).append("]\n").append(objs[i]);
            }
            return buff.toString();
        } else {
            return "";
        }
    }

    /**
     * 将int值转换成String
     * 
     * @param val
     *            int
     * @return String
     */
    public static final String toString(int val) {
        return Integer.toString(val);
    }

    /**
     * 将float值转换成String
     * 
     * @param val
     *            float
     * @return String
     */
    public static final String toString(float val) {
        return Float.toString(val);
    }

    /**
     * 将double值转换成String
     * 
     * @param val
     *            double
     * @return String
     */
    public static final String toString(double val) {
        return Double.toString(val);
    }

    /**
     * 将long值转换成String
     * 
     * @param val
     *            long
     * @return String
     */
    public static final String toString(long val) {
        return Long.toString(val);
    }

    /**
     * 将short值转换成String
     * 
     * @param val
     *            short
     * @return String
     */
    public static final String toString(short val) {
        return Short.toString(val);
    }

    /**
     * 将boolean值转换成String
     * 
     * @param val
     *            boolean
     * @return String
     */
    public static final String toString(boolean val) {
        return Boolean.toString(val);
    }

    /**
     * 替换null.
     * 
     * @param str
     *            String
     * @return String
     */

    public final static String replaceNull(String str) {

        return (str != null) ? str : "";

    }

    /**
     * split操作。
     * 
     * @param line
     *            String
     * @param separator
     *            String
     * @return String[]
     */
    public static final String[] split(String line, String separator) {
        LinkedList<String> list = new LinkedList<String>();
        if (line != null) {
            int start = 0;
            int end = 0;
            int separatorLen = separator.length();
            while ((end = line.indexOf(separator, start)) >= 0) {
                list.add(line.substring(start, end));
                start = end + separatorLen;
            }
            if (start < line.length()) {
                list.add(line.substring(start, line.length()));
            }
        }
        return (String[]) list.toArray(new String[list.size()]);
    }

    public static String substr(String source, int beginIndex, int endIndex) {

        return (!isNull(source)) ? source.substring(beginIndex, endIndex) : "";

    }

    public static String substr(String source, String begin, String end) {
        return (!isNull(source)) ? substr(source, source.indexOf(begin) + begin.length(),
                source.indexOf(end)) : "";

    }

    public static String substr(String source, String begin) {
        return (!isNull(source)) ? source.substring(source.indexOf(begin) + begin.length()) : "";

    }

}
