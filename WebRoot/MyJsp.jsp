<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-jquery/include.jspf"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'MyJsp.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	 <script language="javascript">
        function doOper() {
            alert(PATH);
            var obj = new Object();
           // $.post(PATH + '/demo/fun1/demoAction.json?method=qryList', obj, function(data) {
              //  var a = 1;
              //  alert(data);
           // });
            $.post(PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateDetailList', obj, function(data) {
                var a = 1;
                alert(data);
            });
        }
    </script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.min.js"></script>
  </head>
  
  <body>
  
    <input type="button" value="click222" onclick="doOper()">
  </body>
</html>
