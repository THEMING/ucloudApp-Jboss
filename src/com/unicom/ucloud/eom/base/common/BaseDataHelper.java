package com.unicom.ucloud.eom.base.common;

import java.io.File;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * @author ruantb
 * @version 1.0.0 2012.08.24
 */
public class BaseDataHelper {
    private static String ENUM_FILENAME = "enum.xml";
    private static Document document = null;

    public BaseDataHelper() {
        if (document == null) {
            loadProperties();
        }
    };

    private synchronized static void loadProperties() {
        try {
            SAXReader reader = new SAXReader();

            Resource uploadprop = new ClassPathResource(ENUM_FILENAME);

            File file = uploadprop.getFile();
            if (file.exists()) {
                document = reader.read(file);// 读取XML文件
            }
        } catch (Exception e) {
            System.err.println("读取配置文件失败！！！");
            document = null;
            e.printStackTrace();
        }
    }

    public static JSONArray getEnumList(String enumCode) throws JSONException {
        if (document == null) {
            loadProperties();
        }

        String path = "//enumItem[@enumItemCode='" + enumCode + "']";
        Element parentElement = (Element) document.selectSingleNode(path);
        JSONArray dataList = new JSONArray();
        List<?> chilren = parentElement.elements();
        if (chilren != null) {
            for (int i = 0; i < chilren.size(); i++) {
                JSONObject noce = new JSONObject();
                // <enumValue id="EOM_1" enumValueId="1" enumValueCode="DRAFT"
                // enumValueName="起草"></enumValue>
                Element elemet = (Element) chilren.get(i);
                noce.put("dataValue", elemet.attributeValue("enumValueId"));
                noce.put("dataName", elemet.attributeValue("enumValueName"));

                dataList.put(noce);
            }
        }
        return dataList;
    }

    public static void main(String[] args) throws JSONException {
        JSONArray s = BaseDataHelper.getEnumList("WO_STATUS");
        System.out.println(s.toString());
    }

}
