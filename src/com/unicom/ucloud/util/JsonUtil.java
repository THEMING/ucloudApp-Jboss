package com.unicom.ucloud.util;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.json.JSONException;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.common.CommonUtils;

public class JsonUtil {

    public static Object get(JSONObject json, String key) throws JSONException {
        if (json.has(key)) {
            Object value = json.get(key);
            if (CommonUtils.isEmpty(value)) {
                return null;
            }
            return value;
        }
        return null;
    }

    public static String getString(JSONObject json, String key) throws JSONException {
        Object value = JsonUtil.get(json, key);
        if (null != value) {
            return String.valueOf(value);
        }
        return null;
    }

    public static Integer getInt(JSONObject json, String key) throws JSONException {
        Object value = JsonUtil.get(json, key);
        if (null != value) {
            return Integer.valueOf(String.valueOf(value));
        }
        return null;
    }

    public static Long getLong(JSONObject json, String key) throws JSONException {
        Object value = JsonUtil.get(json, key);
        if (null != value) {
            return Long.valueOf(String.valueOf(value));
        }
        return null;
    }

    public static Double getDouble(JSONObject json, String key) throws JSONException {
        Object value = JsonUtil.get(json, key);
        if (null != value) {
            return Double.valueOf(String.valueOf(value));
        }
        return null;
    }

    public static Boolean getBoolean(JSONObject json, String key) throws JSONException {
        Object value = JsonUtil.get(json, key);
        if (null != value) {
            return Boolean.valueOf(String.valueOf(value));
        }
        return null;
    }

    /**
     * 将javaBean转换成JSONObject
     * 
     * @param bean
     *            javaBean
     * @return json对象
     * @author feng.yang
     * @throws JSONException
     */
    public static JSONObject convert(Object bean) throws JSONException {
        if (CommonUtils.isEmpty(bean)) {
            return new JSONObject();
        }
        Map<?, ?> beanMap = null;
        try {
            beanMap = convertBeanToMap(bean);
        } catch (NoSuchMethodException e) {
            throw new JSONException(e.getMessage());
        } catch (IllegalAccessException e) {
            throw new JSONException(e.getMessage());
        } catch (InvocationTargetException e) {
            throw new JSONException(e.getMessage());
        }
        net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(beanMap);
        if (json == null) {
            return new JSONObject();
        }
        return new JSONObject(json.toString());
    }

    /**
     * 将javaBean转换成Map
     * 
     * @param javaBean
     *            javaBean
     * @return Map对象
     * @author feng.yang
     * @throws NoSuchMethodException 
     * @throws InvocationTargetException 
     * @throws IllegalAccessException 
     */
    @SuppressWarnings("rawtypes")
    public static Map convertBeanToMap(Object javaBean) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        if(javaBean!=null && javaBean instanceof Map){
            return (Map) javaBean;
        }
        return BeanUtils.describe(javaBean);
    }

}
