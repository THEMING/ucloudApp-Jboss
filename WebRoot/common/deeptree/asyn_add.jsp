<%@page import = "com.unicom.ucloud.eom.commondata.action.Proxy4AUserAndOrgAction" %>
<%@page contentType="text/xml;charset=UTF-8" language="java" %>
<%
     	
		String id = request.getParameter("id");
		String qryType = request.getParameter("qryType");
		
		String jsonstr = "";
		
		if(id == null || "".equals(id)){
			response.sendRedirect("xmlData6.xml");
		}else{
			//json字符串
			/*if ("122".equals(id)){
			  jsonstr = 
			 	 "{\"TreeNode\":{\"@id\":\"1221\",\"@text\":\"中国\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"image/yg.png\",\"@statusFlag\":\"\",\"@title\":\"中国联通\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"image/yg.png\",\"@busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"@id\":\"12211\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"12212\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\","
				+	"\"TreeNode\":[{\"@id\":\"122121\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"122122\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"asyn_add.jsp\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			}else if ("122122".equals(id)){
				jsonstr = 
			 	 "{\"TreeNode\":{\"@id\":\"12213\",\"@text\":\"中国联通\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"image/yg.png\",\"@statusFlag\":\"\",\"@title\":\"中国联通\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"image/yg.png\",\"@busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"@id\":\"122113\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"122123\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\","
				+	"\"TreeNode\":[{\"@id\":\"1221213\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"1221223\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"asyn_add.jsp\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			}else if ("1221223".equals(id)){
				jsonstr = 
			 	 "{\"TreeNode\":{\"@id\":\"122135\",\"@text\":\"中国联通\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"image/yg.png\",\"@statusFlag\":\"\",\"@title\":\"中国联通\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"image/yg.png\",\"@busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"@id\":\"1221135\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"1221235\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\","
				+	"\"TreeNode\":[{\"@id\":\"12212135\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"12212235\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"asyn_add.jsp\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			} else {
				jsonstr = 
			 	 "{\"TreeNode\":{\"@id\":\"1221345\",\"@text\":\"中国联通\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"image/yg.png\",\"@statusFlag\":\"\",\"@title\":\"中国联通\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"image/yg.png\",\"@busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"@id\":\"12211345\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"12212345\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\","
				+	"\"TreeNode\":[{\"@id\":\"122121345\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
				+ "{\"@id\":\"122122345\",\"@text\":\"资源事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			}*/
			Proxy4AUserAndOrgAction proxy = new Proxy4AUserAndOrgAction();
   			org.json.JSONObject jsonObj = new org.json.JSONObject();
   			jsonObj.put("porgId", id);
   			jsonObj.put("isChild", true);
   			jsonObj.put("qryType",qryType);
   			
   			jsonstr =  proxy.findOrgAndUserForUIUE(jsonObj);
			
			JSON json = JSONObject.fromObject(jsonstr); 
			String xmlStr = RmXmlJsonConverter.jsonObjectToXmlFormat(json);
			out.clear();
	        out.print(xmlStr);
        }
%><%@page import="com.unicom.ucloud.df.tree.tool.RmXmlJsonConverter"%><%@page import="net.sf.json.JSON"%>
<%@page import="net.sf.json.JSONObject"%>
	