
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/deeptree/css/deeptree.css"/>
<%@ include file="include/rmGlobal.jsp" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
</head>
<body>
<form name="form" method="post">
<div>
<table style="border: 1px solid #9EB4CD; border-spacing: 1px;padding: 1px;">
	<tr>		
        <td align="left">
    		<input type="button" value="选择" onClick="showTree()"/>
           	
        </td> 
	</tr>
	
</table>
</div>

</form>	
<script type="text/javascript">
	<% String dataType="json"; %>   //xml代表加载树的数据文件配置为xml格式，json代表加载树的数据文件配置为json格式
/*     var funClickArray = new Array();//单击事件自定义方法
    	funClickArray[0] ="fun1";
    	funClickArray[1] ="fun2";
	var funDbClickArray = new Array();//双击事件自定义方法
	    funDbClickArray[0] ="dbfun1";
	    funDbClickArray[1] ="dbfun2";
	var xmlArray = new Array();//单双击事件xml返回参数自定义
		xmlArray[0] = "test1";
		xmlArray[1] = "test2"; */
	function showTree(){
		var body_width = 300;
		var body_height = 500;
		var win_ico = "";
		var win_name = "派发树";
		var win_id = "treeDiv";
		var nodeRelationType = "noRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
		var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
		var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框
		var queryCondition = "assist_dept=1";	//异步查询条件

		var win_body = "<%=request.getContextPath()%>/common/deeptree/distributetree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+" '"+ queryCondition +"'";
		win_body += "&rootXmlSource=<%=RmStringHelper.encodeUrl(request.getContextPath() + "/common/deeptree/deeptree_data.jsp?dataType="+dataType)%>";

		var need_shade = true;
		var isCenter = true;
		var win_left = 100;
		var win_top = 100;
		
		//tanjing add begin派发内容返回
		var returnValue = new Array();
		for(var i=0;i<2;i++){			
			returnValue[i] = new Array();
		}	
	/*	//返回值一(顺序不能乱,与确定事件返回参数相对应)
		returnValue[0][0] = "1";//对应busType；1代表派发，2代表送审，3代表抄送
		returnValue[0][1] = "11";//对应childId；节点id
		returnValue[0][2] = "电信事业部";//对应childName；节点值
		returnValue[0][3] = "中国联通中国联通中国联通中国联通中国联通-->电信事业部";//对应parentName；节点对应父关系
		returnValue[0][4] = "Company";//对应thisType
		//返回值二
		returnValue[1][0] = "2";
		returnValue[1][1] = "121";
		returnValue[1][2] = "电信事业部";
		returnValue[1][3] = "中国联通中国联通中国联通中国联通中国联通-->资源事业部-->电信事业部";
		returnValue[1][4] = "Company";
		//end
		*/
		//派发树三个按钮的可用状态
		var isUseful = new Array();
		isUseful[0] = "1";//派发：1可用；0不可用
		isUseful[1] = "1";//送审：1可用；0不可用
		isUseful[2] = "1";//抄送：1可用；0不可用
		
		new_distributetree(body_width,body_height,win_ico,win_name,win_id,win_body,need_shade,isCenter,win_left,win_top,isUseful,returnValue);
	}
		
	//确定
	function confirmReturnValue(submitStringArray){
		for(var i = 0; i<submitStringArray.length; i++){
			alert(submitStringArray[i]["busType"]); //1代表派发，2代表送审，3代表抄送
			alert(submitStringArray[i]["childName"]);
			alert(submitStringArray[i]["childId"]);
			alert(submitStringArray[i]["thisType"]);
			alert(submitStringArray[i]["parentName"]);
			
			/*新添加的属性开始*/
			alert(submitStringArray[i]["busContent"]);
			/*新添加的属性结束*/
		}
	}

	
	//单击事件
	function fun1(obj,winId){
/* 		alert(winId);
			alert("单击1");
			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]);
			alert(obj[xmlArray[0]]);
			alert(obj[xmlArray[1]]); */
	}
	function fun2(obj,winId){
/* 		alert(winId);
			alert("单击2");
 			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]); */
	}
	//双击事件
	function dbfun1(obj,winId){
/* 		alert(winId);
			alert("双击1");
			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["busContent"]);
			alert(obj[xmlArray[0]]);
			alert(obj[xmlArray[1]]);  */
	}
	function dbfun2(obj,winId){
/* 		alert(winId);
			alert("双击2");
 			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["busContent"]); */ 
	}
</script>

</body>
</html>
