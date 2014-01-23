<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<%@ include file="../common/deeptree/include/rmGlobal.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.treedata.js"></script>
<!-- 组织树文件引入 -->
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showFreetreeWin.js"></script>
<link type="text/css" rel="stylesheet"
    href="<%=path%>/common/udf/js/icon.css" />
<script type="text/javascript"
    src="<%=path%>/common/udf/js/swfupload.js"></script>
<script type="text/javascript"
    src="<%=path%>/common/udf/js/uploaderPanel.js"></script>
    
<script type="text/javascript"
    src="<%=path%>/common/udf/js/ztesoft.file.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/deeptree/css/deeptree.css"/>
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showDeeptreeWin.js"></script>
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.attachmentutil.js"></script>
<script language="javascript" src="js/jsonStroe.js"> </script>
<script language="javascript" src="js/testCardManageMod.js"> </script>
<script language="javascript" src="js/testCardQuery.js"> </script>
<script language="javascript" src="js/testCardOrderDetail.js"> </script>
<script language="javascript" src="js/counterSignTask.js"> </script>
<script language="javascript" src="js/superiorsAuditKpi.js"> </script>
<script language="javascript" src="js/turnSendTask.js"> </script>
<script language="javascript" src="js/testCardOrderModify.js"> </script>
<script language="javascript" src="js/myUndoTaskUnify.js"> </script>
<title>我的代办-测试卡管理</title>


</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script type="text/javascript">
var oper = new MyUndoTaskUnify();
var myUndoTaskUnifyBody_height = Ext.getBody().getSize().height;
var myUndoTaskUnifyBody_width = Ext.getBody().getSize().width;
Ext.onReady(function() {
  Ext.QuickTips.init();
  Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 
  
 var obj = {
         formUrl : "<%=request.getParameter("formUrl").toString()%>",
         accountId : session.logonAccount.accountId,
         accountName : session.logonAccount.userEmpName,
         taskInstID : <%=request.getParameter("taskID")%>
 };
  oper.initTaskPanel(obj);
});
</script>