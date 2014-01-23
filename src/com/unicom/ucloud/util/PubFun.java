package com.unicom.ucloud.util;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 
 * 公用函数，静态调用
 * 
 */
public class PubFun {

	private static final DateFormat dateFormat = new SimpleDateFormat(
			"yyyy-MM-dd");

	public static final String SESSION_NAME = "session_object";
	
	public static final String FRONT_SESSION_NAME = "front_session_object";

	public static final String SESSION_AUTH_NAME = "session_auth";

	public static String BASEPATH; // 应用系统的根目录

	/**
	 * 对指定字符串做MD5加密算法，返回加密后字符串
	 */
	public final static String MD5(String s) {
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };
		try {
			byte[] strTemp = s.getBytes();
			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			mdTemp.update(strTemp);
			byte[] md = mdTemp.digest();
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(str);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 小写转大写
	 */
	public static String getNumberToRMB(String m) {
		String num = "零壹贰叁肆伍陆柒捌玖";
		String dw = "圆拾佰仟万亿";
		String mm[] = null;
		mm = m.split(".");
		String money = mm[0];

		String result = num.charAt(Integer.parseInt("" + mm[1].charAt(0)))
				+ "角" + num.charAt(Integer.parseInt("" + mm[1].charAt(1)))
				+ "分";

		for (int i = 0; i < money.length(); i++) {
			String str = "";
			int n = Integer.parseInt(money.substring(money.length() - i - 1,
					money.length() - i));
			str = str + num.charAt(n);
			if (i == 0) {
				str = str + dw.charAt(i);
			} else if ((i + 4) % 8 == 0) {
				str = str + dw.charAt(4);
			} else if (i % 8 == 0) {
				str = str + dw.charAt(5);
			} else {
				str = str + dw.charAt(i % 4);
			}
			result = str + result;
		}
		result = result.replaceAll("零([^亿万圆角分])", "零");
		result = result.replaceAll("亿零+万", "亿零");
		result = result.replaceAll("零+", "零");
		result = result.replaceAll("零([亿万圆])", "");
		result = result.replaceAll("壹拾", "拾");

		return result;
	}

	/**
	 * 将指定字符串转为UTF-8编码
	 */
	public static String toUtf8String(String s) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c >= 0 && c <= 255) {
				sb.append(c);
			} else {
				byte[] b;
				try {
					b = Character.toString(c).getBytes("utf-8");
				} catch (Exception ex) {
					System.out.println(ex);
					b = new byte[0];
				}
				for (int j = 0; j < b.length; j++) {
					int k = b[j];
					if (k < 0)
						k += 256;
					sb.append("%" + Integer.toHexString(k).toUpperCase());
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 取当前日期，返回固定格式字符串
	 */
	public static String getNow() {
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
	}

	/**
	 * 取当前日期，返回Date形式
	 */
	public static Date getNowDate() {
		return new Date();
	}

	/**
	 * 取Hashmap的value值，没有对应的返回空字符
	 * 
	 * @param map
	 * @param key
	 * @return
	 */
	public String getValue(HashMap map, String key) {
		String value = Constants.SPACE;

		if (map != null) {
			value = (String) map.get(key);
			if (value == null) {
				value = Constants.SPACE;
			}
		}
		return value;

	}

	/**
	 * 根据指定符号，拆分字符串 如果参数为空，返回空对象，解析异常异返回空对象
	 * 
	 * @param orgString
	 *            源字符串
	 * @param 指定符号
	 * @return 拆分后的数组
	 */
	public static String[] getStringArray(String orgString, String flag) {
		String[] returnValue = null;
		try {
			if (orgString != null && flag != null && !"".equals(orgString)) {
				returnValue = orgString.split(flag);
			}
		} catch (Exception e) {
		}
		return returnValue;
	}
	
	/**
	 * 根据指定符号，拆分字符串 如果参数为空，返回空对象，解析异常异返回空对象
	 * @author 龙宏海 Dec 21, 2008
	 * @param orgString
	 *            源字符串
	 * @param 指定符号
	 * @return 拆分后的数组
	 */
	public static Long[] getLongArray(String orgString, String flag) {
		Long[] returnValue = null;
		try {
			if (orgString != null && flag != null && !"".equals(orgString)) {
				String values[] = orgString.split(flag);
				returnValue = new Long[values.length];
				for(int i = 0; i < values.length; i++){
					returnValue[i] = Long.valueOf(values[i]);
				}
			}
		} catch (Exception e) {
		}
		return returnValue;
	}

	/**
	 * 生成流水编号
	 * 
	 * @author 鲁淳
	 * @param prefix
	 *            流水号前缀
	 * @param int
	 *            length 流水号长度 不包括前缀
	 * @return String 生成后的流水号
	 */
	public static String generateSequence(String prefix, int length) {
		if (prefix == null || length < 0) {
			return Constants.SPACE;
		}
		int preLen = prefix.length();

		StringBuilder sb = new StringBuilder();
		sb.append(prefix);
		Random r = new Random();
		if (length > 4) {
			Calendar c = Calendar.getInstance();
			sb.append(c.get(Calendar.MONTH));
			sb.append(c.get(Calendar.DAY_OF_MONTH));
		}
		while (sb.length() < length + preLen) {
			sb.append(r.nextInt(10000));
		}
		// sb.delete(length, sb.length() - length);

		return sb.toString().substring(0, length + preLen);
	}

	/**
	 * 生成8位序列号,加上前缀总共10位,不足补0
	 * 
	 * @author 彭振民
	 * @param prefix
	 * @param seqNumber
	 *            序列号
	 * @return
	 */
	public static String generateCode(String prefix, String seqNumber) {
		StringBuffer sb = new StringBuffer();
		sb.append(prefix);
		int len = seqNumber.length();
		int addZeorLen = 8 - len;
		if (addZeorLen < 0) {
			addZeorLen = 0;
		}

		for (int i = 0; i < addZeorLen; i++) {
			sb.append("0");
		}
		sb.append(seqNumber);
		return sb.toString();
	}
	/**
     * 生成日流水号
     * 
     * @param prefix
     *            前缀
     * @param seqNumber
     *            当前流水号
     * @param length
     *            日流水号长度
     * @return
     * @author 杨长鹏
     */
    public static String generateSeqCodeByDay(String prefix, String seqNumber,
            int length)
    {
        StringBuffer sb = new StringBuffer();
        sb.append(prefix);
        int len = seqNumber.length();
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String str = format.format(date);
        sb.append(str);
        int addZeorLen = length - len;
        if (addZeorLen < 0)
        {
            addZeorLen = 0;
        }
        for (int i = 0; i < addZeorLen; i++)
        {
            sb.append("0");
        }
        sb.append(seqNumber);
        return sb.toString();
    }

	/**
	 * 由指定格式转换字符串为时间格式，如果转换异常，则返回空对象
	 * 
	 * @param sDate
	 *            时间字符串格式
	 * @param format
	 *            格式format
	 * @return
	 */
	public static Date stringToDate(String sDate, String format) {
		Date date = null;
		if (sDate != null && format != null && !"".equals(sDate)) {
			SimpleDateFormat df = new SimpleDateFormat(format);
			try {
				date = df.parse(sDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return date;

	}

	/**
	 * 方法名称：dateToString 内容摘要：将一个日期转换成字符串，如：2008-08-18
	 * 
	 * @param Date
	 *            date 需要转换的日期
	 * @return String 返回一个字符串类型
	 */
	public static String dateToString(Date date) {
		if (date != null) {
			return dateFormat.format(date);
		} else {
			return "";
		}
	}

	/**
	 * 功能:把对象中属性值为空子串的转为null
	 * 
	 * @param obj
	 *            要转换的对象
	 * @return
	 */
	public static Object ConvertEmptyValueToNull(Object obj) {
		Class c = obj.getClass();
		try {
			Field[] fs = c.getDeclaredFields();
			for (int i = 0; i < fs.length; i++) {
				if (fs[i].getType().toString().equals(String.class.toString())) {
					String name = fs[i].getName();// 得到当前类中的字段名称,因为只有公有的才能访问
					String getname = "get"
							+ String.valueOf(name.charAt(0)).toUpperCase()
							+ name.substring(1);// 组合成get方法
					String setname = "set"
							+ String.valueOf(name.charAt(0)).toUpperCase()
							+ name.substring(1);// 组合成set方法
					Method getMethod = c.getDeclaredMethod(getname);// 得到该类中所有定义的方法
					String str = (String) getMethod.invoke(obj);// 取出方法中的返回值，也就是STRUTS把前台的入参放入BEAN中的值
					if (str != null && str.length() == 0) {
						Method setMethod = c.getDeclaredMethod(setname,
								String.class);// 得到set方法的实例
						setMethod.invoke(obj, new Object[] { null });// 设置set方法的值为null
					}
				}
			}
		} catch (Exception e) {
			return null;
		}
		return obj;
	}

	/**
	 * 提供精确的小数位四舍五入处理。
	 * 
	 * @param v
	 *            需要四舍五入的数字
	 * @param scale
	 *            小数点后保留几位
	 * @return 四舍五入后的结果
	 */
	public static double round(double v, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException(
					"The scale must be a positive integer or zero");
		}
		BigDecimal b = new BigDecimal(Double.toString(v));
		BigDecimal one = new BigDecimal("1");
		return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	public static List convertJSONList(Object jsonArray, Class c) {
		Iterator iterator = JSONArray.fromObject(jsonArray).iterator();
		List list = new ArrayList();
		while (iterator.hasNext()) {
			list.add(JSONObject.toBean((JSONObject) iterator.next(), c));
		}
		return list;
	}

	public static Object convertJSONObj(Object jsonObject, Class c) {
		JSONObject obj = JSONObject.fromObject(jsonObject);
		return JSONObject.toBean((JSONObject) obj, c);
	}

	public static Map convertJSONMap(Object jsonObject) {
		JSONObject obj = JSONObject.fromObject(jsonObject);
		Map map = (HashMap) JSONObject.toBean(obj, Map.class);
		return map;
	}

	/**
	 * 计算补考分数
	 * 
	 * @param passPoint
	 *            设定的补考分数
	 * @param paperPoint
	 *            试卷总分
	 * @return
	 */
	public static BigDecimal getPassPoint(BigDecimal passPoint,
			BigDecimal paperPoint) {
		BigDecimal passReuslt = BigDecimal.ZERO;// 设定默认分数为零
		if (passPoint != null) {
			passReuslt = passPoint;// 如果设定了补考分数 则返回原值
		} else if (paperPoint != null) {
			// DecimalFormat df = new DecimalFormat("0.00");
			// 如果没有设定补考分数则按试卷分数的0.6计算 都为空时 返回0
			passReuslt = paperPoint.multiply(BigDecimal.valueOf(0.60));
		}
		return passReuslt;
	}

	public static String nullToString(Object obj) {
		return obj != null ? obj.toString() : "";
	}

	/**
	 * 根据文件名 匹配类型
	 * 
	 * @param map(查询数据字典表)
	 * @param org
	 * @return
	 */
	public static String marchFileInfo(HashMap map, String org) {
		String result = "unMarchType";
		if (org != null && map != null) {
			int index = org.indexOf(Constants.DOT);
			if (index != -1) {
				org = org.substring(index + 1, org.length());
				String temp = (String) map.get(org.toLowerCase());
				if (temp != null) {
					result = temp;
				}
			}
		}
		return result;
	}

	/**
	 * 获区HIBERNATE的查询属性,方便多个查询,无需视图 如:select a.userName,b.sid,c.dd from InfoUser
	 * a,InfoDept b,sh c 输出为:[userName,sid,dd]
	 * 
	 * @param sql
	 * @return
	 */
	public static String[] getMetaData(String sql) {
		String[] source = sql.split("(?i)from")[0].split("select")[1]
				.split(",");
		String[] dest = new String[source.length];
		for (int i = 0; i < source.length; i++) {
			String[] tmp = source[i].trim().split("\\.")[source[i].trim()
					.split("\\.").length - 1].split(" ");
			dest[i] = tmp[tmp.length - 1];
		}
		return dest;
	}

	public static String encodeStrToUtf8(String orgStr) {
		String result = null;
		try {
			result = new String(orgStr.getBytes("GB2312"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return orgStr;
	}

	public static String parseList(List<String> list, String reg) {
		String result = null;
		if (list != null) {
			String temp;
			StringBuilder sb=new StringBuilder();
			for (int i = 0; i < list.size(); i++) {
				temp=list.get(i);
				if (sb.length()>0){
					sb.append(reg);
					sb.append(temp);
				}
				else {
					sb.append(temp);
				}
			}
			result=sb.toString();
		}
		return result;
	}
	
	/**
     * 按规则获取编号
     * 
     * @param seqStr
     * @return
     */
    public static String getCodeInfoStr(String headStr, int totalLen,
            String existCode)
    {
        String reItemCode = ""; // 返回的项目编号
        String tempItemStr = "";
        int initNum = 1;
        System.out.println("totalLen : " + totalLen);
        // 编号不存在
        if (null == existCode || "".equals(existCode))
        {
            for (int j = 0; j < totalLen - 1; j++)
            {
                tempItemStr = tempItemStr + "0";
            }
            reItemCode = headStr + tempItemStr + initNum;
        }
        // 编号存在
        else
        {
            String tempStr = "";
            Integer tempInt;
            int headStrLen;
            headStrLen = headStr.length();
            System.out.println("headStrLen : " + headStrLen);
            System.out.println("existCode.length() : " + existCode.length());
            tempStr = existCode.substring(headStrLen, existCode.length());
            System.out.println("tempStr : " + tempStr);
            tempInt = Integer.valueOf(tempStr);
            ++tempInt;
            int tempIntLen = (tempInt + "").length();
            int addLen = totalLen - tempIntLen;
            // 将编号前面加"0"填充至总长度
            if (addLen > 0)
            {
                for (int j = 0; j < addLen; j++)
                {
                    tempItemStr = tempItemStr + "0";
                }
                reItemCode = headStr + tempItemStr + tempInt;
            } else
            {
                reItemCode = headStr + tempInt;
            }
        }
        System.out.println("reItemCode : " + reItemCode);

        return reItemCode;
    }
    
    
    /**
     * 校验值是否为数字
     * 
     * @param string
     * @return
     */
    public static String checkValueIsNum(String string, String msg)
    {
        String message = "";
        if (null != string && !string.equals("") && (!string.matches("[0-9]*")))
        {
            message = "\"" + msg + "\"只能输入数字";
        } else
        {
            System.out.println("string.matches: " + string.matches("[0-9]*"));
        }
        return message;
    }
    
    
    /**
     * 校验值是否为日期
     * 
     * @param string
     * @return
     */
    public static String checkValueIsDate(String string, String msg)
    {
        String message = "";
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (null != string && !"".equals(string))
        {
            try
            {
                Date date = format.parse(string);
                // 添加校验：日期数据必须为数字,分隔符'-'必须存在
                String[] checkStrings = string.split("-");
                String subCheckString = null; // 日期截取字符串
                String subCheckMsg = "";
                if (checkStrings.length == 3)
                {
                    for (int i = 0; i < checkStrings.length; i++)
                    {
                        subCheckString = checkStrings[i];
                        if (null != checkStrings && !"".equals(checkStrings))
                        {
                            // 拆分日期校验是否为数据
                            subCheckMsg = PubFun.checkValueIsNum(
                                    subCheckString, "");
                            if ("".equals(subCheckMsg))
                            {
                                // 日期子字符串校验通过
                            } else
                            {
                                message = "\"" + string
                                        + "\"不符合日期格式\"yyyy-MM-dd\",请重新输入";
                            }
                        }
                        if (i == 2)
                        {
                            // 日期校验通过，返回空字符串
                        }
                    }
                } else
                {
                    message = "\"" + string + "\"不符合日期格式\"yyyy-MM-dd\",请重新输入";
                }

                System.out.println("checkValueIsDate-date : " + date);
            } catch (ParseException e)
            {
                message = "\"" + string + "\"不符合日期格式\"yyyy-MM-dd\",请重新输入";
                e.printStackTrace();
            }
        }
        return message;
    }
    /**
     * 将小写数字转换成大写数字
     * @param n
     * @return
     */
    public static String changeNumberToBigNum(Long n){
    	
    	String str[] =new String[]{"零","一","二","三","四","五","六","七","八","九"};
    	
    	if(n!=null)
    	{
    		String numStr = n.toString();
    		char[] numArr = numStr.toCharArray();
    		StringBuffer sourceStr = new StringBuffer();
    		for(int i=0;i<numArr.length;i++)
    		{
    			char index = numArr[i];
    			sourceStr.append(str[index-48]);
    		}
    		return sourceStr.toString();
    	}
    	else
    	{
    		return "";
    	}
    };
}
