package com.unicom.ucloud.eom.base.common;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

import org.json.JSONObject;

/**
 * 公共辅助工具类
 * 
 * @version 1.0
 * @date 2013-1-13
 * @author feng.yang
 */
public class CommonUtils {

	public CommonUtils(){
		
	}
    /**
     * 判断对象是否为空值，目前支持String，Map，Collection,org.json.JSONObject及其子对象，如果单纯要判断是否空指针(NULL)，请使直接使用obj==
     * null。<BR>
     * 当String 为NULL或者trim()之后仍为空白("")，返回true；<BR>
     * 当Map为NULL或者或者元素个数为0时，返回true； <BR>
     * 当Collection为NULL或者元素个数为0时，返回true<BR>
     * 当JSONObject为NULL或者元素个数为0时，返回true<BR>
     * 
     * @param obj
     * @return
     * @see
     * @author feng.yang
     * @since
     */
    @SuppressWarnings("rawtypes")
    public static boolean isEmpty(Object obj) {

        // 为空或者为空白
        if (obj == null) {
            return true;
        } else if (obj instanceof Map) {
            // Map 元素为空
            Map m = (Map) obj;
            if (m.isEmpty() || m.keySet().size() == 0) {
                return true;
            }
        } else if (obj instanceof JSONObject) {
            // org.json.JSONObject
            JSONObject j = (JSONObject) obj;
            if (j.length() == 0) {
                return true;
            }

        } else if (obj instanceof Collection) {
            Collection c = (Collection) obj;
            if (c.isEmpty() || c.size() == 0) {
                return true;
            }
        } else if (obj.toString().trim().length() == 0) {
            return true;
        }

        return false;

    }

    /**
     * 判断是否数值,更多数值处理的方法，请参考 NumberHelper
     * 
     * @param obj
     * @return
     * @see NumberHelper
     * @since
     */
    public static boolean isNumeric(Object obj) {
        return NumberHelper.isNumeric(obj);
    }

    /**
     * 将对象转换为日期，默认pattern为yyyy-MM-dd,更多日期处理的方法，请参考CalendarHelper
     * 
     * @param obj
     * @return
     * @throws ParseException
     * @see CalendarHelper
     * @since
     */
    public static Date parseDate(Object obj) throws ParseException {
        if (obj == null) {
            return null;
        } else if (obj instanceof java.util.Date) {
            return (Date) obj;
        } else if (obj instanceof java.util.Calendar) {
            Calendar c = (Calendar) obj;
            return c.getTime();
        } else {
            return CalendarHelper.parseDate(StringHelper.toString(obj));
        }
    }

    /**
     * 格式化日期,默认pattern为yyyy-MM-dd hh:mm:ss，更多日期处理的方法，请参考CalendarHelper
     * 
     * @param date
     * @return yyyy-MM-dd hh:mm:ss
     * @see CalendarHelper
     * @since
     */
    public static String formatDate(Date date) {
        return CalendarHelper.formatDatetime(date);
    }

}
