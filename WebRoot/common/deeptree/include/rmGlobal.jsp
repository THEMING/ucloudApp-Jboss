<%@page import="com.unicom.ucloud.df.tree.tool.RmStringHelper"%>
<script type="text/javascript">
var deeptreeUrl = "<%=RmStringHelper.encodeUrl(request.getContextPath() + "/common/deeptree/deeptree_data.jsp?dataType=json&orgId=")%>";
var deeptreeUrl2 = "<%=RmStringHelper.encodeUrl("&qryType=")%>";
var deeptreeUrl3 = "<%=RmStringHelper.encodeUrl("&cloudUserId=")%>";
var deeptreeUrl4 = "<%=RmStringHelper.encodeUrl("&roleArray=")%>";
var deeptreeUrl5 = "<%=RmStringHelper.encodeUrl("&treeType=")%>";
var freetreeUrl = "<%=RmStringHelper.encodeUrl(request.getContextPath() + "/common/deeptree/deeptree_data.jsp?dataType=json&orgId=")%>";
var freetreeUrl2 = "<%=RmStringHelper.encodeUrl("&isOnlyChild=")%>";
var _callback ;
var retSubmitStringArray = new Array();

</script>

<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/jquery/jquery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/jquery/jquery.form.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/rm/rm-tools.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/rm/rm-behavior.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/deeptree_ucdf.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/jquery/jquery.transform.js"></script>