<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>定时任务管理</title>
</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<!--  
<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.map.js"></script>
-->
<script type="text/javascript" language="javascript" src="js/timeTask.js"></script>

<script type="text/javascript">
<!--
    var tree_width = 150;
    var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width - tree_width;
    var qryPnHeight = 120;
    var gridPnHeight = body_height - qryPnHeight;
    var gridWidth = body_width;
    var dtlWidth = 670;
    var dtlHeight = 340;
    var cnt =15;
    
    var oper = new Oper();

    
    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 
        oper.init();
        oper.qryListGrid('listGrid',null);
    });
    
    var taskStatusStore = new Ext.data.ArrayStore({
        fields : [ 'value', 'text' ],
        data : [ [ 1, '运行中' ], [ 0, '暂停' ] ]
    });
//-->
</script>

