<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- 树目录用到的引入 -->
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.treedata.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>
<!-- 上传下载用到的引入 -->
<link type="text/css" rel="stylesheet" href="<%=path%>/common/udf/js/icon.css" />
<script type="text/javascript" src="<%=path%>/common/udf/js/swfupload.js"></script>
<script type="text/javascript" src="<%=path%>/common/udf/js/uploaderPanel.js"></script>
<script type="text/javascript" src="<%=path%>/common/udf/js/ztesoft.file.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>
<script language="javascript" src="./js/jsonStroe.js" ></script>    
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.map.js"></script>

<script language="javascript" src="./js/templateConfigDetail.js" ></script>    
<script language="javascript" src="./js/templateConfigEdit.js" ></script>    
<script language="javascript" src="./js/templateConfigOper.js" ></script>    

<title>私有属性模板配置</title>
</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script type="text/javascript">
var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var gridPnHeight = body_height - 35;
var qryPnHeight = body_height * 0.1;
var gridPn1Height = gridPnHeight * 0.5;
var gridPn2Height = gridPnHeight * 0.5-35;
var gridWidth = body_width;
var tciPriAttTemplateConfigWidth = 160;
var cnt = 10;

var oper = new PageOper();
var addOper = new AddOper();
var tdOper = new TemplateDetail();
var stroe = new jsonStroe();
var dataTypeMap = null;

var qryParams = new Object();
qryParams.attributionProvinceId = session.logonAccount.provinceCompanyId==null?"":session.logonAccount.provinceCompanyId;

Ext.onReady(function() {

	dataTypeMap = getMap("DATA_TYPE");
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';

    oper.init();
    temOperQryWin.show();
	if(session.logonAccount.provinceCompanyId!=null){
            Ext.getCmp('attributionProvinceIdQry').setRawValue(session.logonAccount.provinceCompanyName);
        }
    temOperQryWin.hide();
 });
 
function getMap(value){
    var oo = new Object();
    oo.dictType = value;
    return initEnumMap(oo);
}
</script>