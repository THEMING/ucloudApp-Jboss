<%@page contentType="text/xml;charset=UTF-8" language="java" %>
<%@page import="com.unicom.ucloud.eom.commondata.action.Proxy4AUserAndOrgAction"%>
<%@page import="com.unicom.ucloud.df.tree.DeepTreeVo"%>
<%@page import="com.unicom.ucloud.df.tree.DeepTreeXmlHandler"%>
<%@page import="com.unicom.ucloud.df.tree.tool.DFXmlJsonConverter"%>
<%@page import="net.sf.json.JSON"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.xml.XMLSerializer"%>
<%@ page import="org.apache.log4j.Logger"%>
<%
        Logger logger = Logger.getLogger(this.getClass());

        logger.debug("===============deeptree_data.jsp!===============");

        DeepTreeXmlHandler dt = new DeepTreeXmlHandler();
        String dataType = request.getParameter("dataType");
        String xmlFile=null;
        if(dataType.equals("json")){
            Proxy4AUserAndOrgAction proxy = new Proxy4AUserAndOrgAction();
            org.json.JSONObject jsonObj = new org.json.JSONObject();
            jsonObj.put("porgId", request.getParameter("orgId"));
            jsonObj.put("qryType", request.getParameter("qryType"));
            
            jsonObj.put("cloudUserId", request.getParameter("cloudUserId"));
            jsonObj.put("roleArray", request.getParameter("roleArray"));
            jsonObj.put("treeType", request.getParameter("treeType"));
            jsonObj.put("isOnlyChild", request.getParameter("isOnlyChild"));
            
            String qryType = request.getParameter("qryType");
            String xmlFormat = null;
            if("assignTree".equals(qryType)){
                logger.debug("===============deeptree_data.jsp 有过滤的派发树 执行开始!===============");
                xmlFormat =  proxy.findOrgAndUserForAssignTree(jsonObj);
                logger.debug("===============deeptree_data.jsp 有过滤的派发树 执行结束!===============");
            }else if("tabTree1".equals(qryType)){
                logger.debug("===============deeptree_data.jsp 派发树页卡2 执行开始!===============");
                xmlFormat =  proxy.findFavoriteGroupAndMember(jsonObj);
                logger.debug("===============deeptree_data.jsp 派发树页卡2  执行结束!===============");
            }else{
                logger.debug("===============deeptree_data.jsp 无过滤的派发树 执行开始!===============");
                String jsonstr =  proxy.findOrgAndUserForUIUE(jsonObj);
                
                JSONObject json = JSONObject.fromObject(jsonstr);
                xmlFormat=DFXmlJsonConverter.dfJson2XmlFormat(json);
                logger.debug("===============deeptree_data.jsp 无过滤的派发树 执行结束!===============");
            }
            out.clear();
            out.print(xmlFormat); 
            return;
        }else if(dataType.equals("xml")){   
            xmlFile= "xmlData.xml";
        }
%>
    