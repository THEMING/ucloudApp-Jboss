package com.unicom.ucloud.eom.base.common;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.primeton.workflow.api.WFServiceException;
import java.io.IOException;
import java.io.InputStream;
import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import com.unicom.ucloud.workflow.exceptions.WFException;

public class XmlTransformateHelper {
    
    public XmlTransformateHelper(){
        
    }
    
    public static JSONArray xmlToJsonArray(String xml) throws WFServiceException, WFException{
        JSONArray jsonArray = new JSONArray();
        InputStream isInputStream;
        try {
            isInputStream = new ByteArrayInputStream(xml.getBytes("UTF-8"));
            DocumentBuilderFactory factory =  DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            org.w3c.dom.Document document = builder.parse(isInputStream);
            Element root = document.getDocumentElement();
            NodeList nodeList =root.getChildNodes();
            jsonArray = new JSONArray();
            for(int i=0;i<nodeList.getLength();i++){
                Node node = nodeList.item(i);
                NodeList nodeList2 = node.getChildNodes();
                if(node instanceof Element){
                    Map<String, Object> map = new HashMap<String, Object>();
                    for(int j=0;j<nodeList2.getLength();j++){
                        Node node2 = nodeList2.item(j);
                        if(node2 instanceof Element){
                            map.put(node2.getNodeName(), node2.getTextContent());
                        }
                    }
                    jsonArray.put(map);
                }
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new WFException();
        }catch (ParserConfigurationException e) {
            e.printStackTrace();
            throw new WFException();
        }catch (SAXException e) {
            e.printStackTrace();
            throw new WFException();
        }catch (IOException e) {
            e.printStackTrace();
            throw new WFException();
        }
        return jsonArray;
    }

}
