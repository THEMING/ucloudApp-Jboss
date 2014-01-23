<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<%@ include file="../common/deeptree/include/rmGlobal.jsp" %>
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

<!-- 组织树文件引入 -->
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showFreetreeWin.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/deeptree/css/deeptree.css"/>
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showDeeptreeWin.js"></script>

<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>

<script language="javascript" src="./js/testCardReadHistory.js" ></script>
<script language="javascript" src="./js/testCardManageUpLoad.js" ></script>
<script language="javascript" src="./js/testCardManageDelete.js" ></script>
<script language="javascript" src="./js/testCardManageAdd.js" ></script>
<script language="javascript" src="./js/testCardManageMod.js" ></script>
<script language="javascript" src="./js/jsonStroe.js" ></script>    
<script language="javascript" src="./js/testCardOrderDetail.js"></script>
<script language="javascript" src="./js/testCardManage.js"></script>
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.map.js"></script>
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.mulCombox.js"></script>
<title>测试卡管理</title>
</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script language="javascript">
var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var ctPnHeight = 80;
var qryPnHeight = 150;
var qryPnWidth = 720;
var gridPnHeight = body_height - 35;
var gridWidth = body_width;
var cnt = 15; 

/*初始化查询测试卡信息*/
var qryParams = {
		unUsedCard:0,//默认不查报废的卡
        testobjectTypeEnumId:1,
        gridName:'testGrid',
        adminId : session.logonAccount.cloudUserId,
        lenderIdM : session.logonAccount.cloudUserId
};

var oper = new PageOper();
var manager = new ManagerOper();

var hisOper = new TestCardHistoryOper();
var loadOper = new upLoadList();
var deleteOper = new deleteOrderInfo();
var addOper = new TestCardAddOper();
var modOper = new TestCardModOper();
var stroe = new jsonStroe();
var orderDet = new DetailWin();

var testCardEnum = 1;//测试卡枚举值

var terminalEnum = 2;//测试终端枚举值

var teleCardEnum = 3;//固定电话枚举值

var rechCardEnum = 4;//充值卡枚举值
var testcardStatusMap = null;


Ext.onReady(function() {
	testcardStatusMap = getMap("TESTCARD_STATUS");
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 
    oper.init();
    oper.doQry();
}); 

function getMap(value){
        var oo = new Object();
        oo.dictType = value;
        return initEnumMap(oo);
    }

//测试卡状态TESTCARD_STATUS
var testStatusEnumStore = new Ext.data.JsonStore({
    remoteSort: true,
    fields: ['dataValue', 'dataName'],
    proxy: new Ext.data.HttpProxy({
        url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=TESTCARD_STATUS',
        method : 'get'
    })
});
//测试终端 手机类型MOBILE_TYPE
var moblieTypeEnumStore = new Ext.data.JsonStore({
    remoteSort: true,
    fields: ['dataValue', 'dataName'],
    proxy: new Ext.data.HttpProxy({
        url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=MOBILE_TYPE',
        method : 'get'
    })
});
//充值卡类型RECH_CARD_TYPE
var rechTypeStore = new Ext.data.JsonStore({
    remoteSort: true,
    fields: ['dataValue', 'dataName'],
    proxy: new Ext.data.HttpProxy({
        url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=RECH_CARD_TYPE',
        method : 'get'
    })
});
//固定电话类型FIXED_PHONE_TYPE
var telePhoneTypeEnumStore = new Ext.data.JsonStore({
    remoteSort: true,
    fields: ['dataValue', 'dataName'],
    proxy: new Ext.data.HttpProxy({
        url : PATH+ '/commondata/commonDataAction.json?method=qryDictData&dictType=FIXED_PHONE_TYPE',
        method : 'get'
    })
});
</script>