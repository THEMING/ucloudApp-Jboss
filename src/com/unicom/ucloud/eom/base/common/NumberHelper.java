package com.unicom.ucloud.eom.base.common;

import java.text.NumberFormat;

/**
 * 数字处理辅助类
 * 
 * @author feng.yang
 * @version 1.0
 */
public class NumberHelper {
    private NumberHelper() {
    }

    public static boolean isNumeric(Object obj) {

        String str = StringHelper.toString(obj);
        for (int i = str.length(); --i >= 0;) {
            if (!Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * 转换Object到Integer
     * 
     * @param obj
     *            Object
     * @return Integer
     */
    public static Integer integerValueOf(Object obj) {

        return (isNumeric(obj)) ? Integer.parseInt(StringHelper.toString(obj)) : null;

    }

    public static int parseInt(Integer i) {
        return (isNumeric(i)) ? i.intValue() : Integer.MAX_VALUE;

    }

    /**
     * 转换object到Long
     * 
     * @param obj
     *            Object
     * @return Long
     */
    public static Long longValueOf(Object obj) {
        return (isNumeric(obj)) ? Long.parseLong(String.valueOf(obj)) : null;

    }

    public static long parseLong(Long l) {
        return (isNumeric(l)) ? l.longValue() : Long.MAX_VALUE;

    }

    /**
     * 转换object到Double
     * 
     * @param obj
     *            Object
     * @return Double
     */
    public static Double doubleValueOf(Object obj) {
        return (isNumeric(obj)) ? Double.parseDouble(String.valueOf(obj)) : null;

    }

    public static double parseDouble(Double d) {
        return (isNumeric(d)) ? d.doubleValue() : Double.MAX_VALUE;

    }

    /**
     * 转换object到float
     * 
     * @param obj
     *            Object
     * @return Float
     */

    public static Float floatValueOf(Object obj) {
        return (isNumeric(obj)) ? Float.parseFloat(String.valueOf(obj)) : null;

    }

    public static float parseFloat(Float f) {
        return (isNumeric(f)) ? f.floatValue() : Float.MAX_VALUE;
    }

    /**
     * 获取简单计算的随机数
     * 
     * @param num
     *            int
     * @return String
     */
    public static String getSimplyRandom(int num) {

        double d = Math.random();

        int value = (int) (d * Math.pow(10, num));

        return StringHelper.toString(value);

    }

    /**
     * 格式化为百分比，保留2位小数
     * 
     * @param numdb
     * @return
     * @see
     * @since
     */
    public static String getPerForNum(double numdb) {
        NumberFormat num = NumberFormat.getPercentInstance();
        // num.setMaximumIntegerDigits(3);
        num.setMaximumFractionDigits(2);
        num.setMinimumFractionDigits(2);
        return num.format(numdb);
    }

    /**
     * 格式化为百分比
     * 
     * @param numdb
     * @param digit
     * @return
     * @see
     * @since
     */
    public static String getPerForNum(double numdb, int digit) {
        NumberFormat num = NumberFormat.getPercentInstance();
        // num.setMaximumIntegerDigits(3);
        num.setMaximumFractionDigits(digit);
        num.setMinimumFractionDigits(digit);
        return num.format(numdb);
    }

    public static String getDigitsForNum(double numdb, int digit) {
        NumberFormat num = NumberFormat.getNumberInstance();
        num.setMaximumFractionDigits(digit);
        return num.format(numdb);
    }

}
