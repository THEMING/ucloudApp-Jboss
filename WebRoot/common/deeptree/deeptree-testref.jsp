<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>

<link href="<%=request.getContextPath()%>/css/df.css" rel="stylesheet" type="text/css" />
<%@ include file="include/rmGlobal.jsp" %>
</head>
<body>
<form name="form" method="post">
<div>
<table style="border: 1px solid #9EB4CD; border-spacing: 1px;padding: 1px;">
	<tr>		
		<td align="right">选择部门</td>
        <td align="left">
            <input type="text" class="text_field_reference_readonly" name="assist_dept_name2" hiddenInputId="assist_dept2,assist_dept_name2" inputname="协办部门" maxlength="500"/><input type="hidden" name="assist_dept2"/><img class="refButtonClass" src="<%=request.getContextPath()%>/resources/images/df/09.gif" onClick="showTree()"/> 
        	<input type="button" value="自由树" onclick="deeptreefree()"/>
    		<input type="hidden" name="assist_dept_com2"/>
        </td> 
	</tr>
</table>
</div>
</form>	
<div id="loaddeeptree">

</div>
<script type="text/javascript">

    <% String dataType="xml"; %>   //xml代表加载树的数据文件配置为xml格式，json代表加载树的数据文件配置为json格式
    var funClickArray = new Array();//单击事件自定义方法
	    funClickArray[0] ="fun1";
	    funClickArray[1] ="fun2";
	var funDbClickArray = new Array();//双击事件自定义方法
	    funDbClickArray[0] ="dbfun1";
	    funDbClickArray[1] ="dbfun2";
	var xmlArray = new Array();//单双击事件xml返回参数自定义
		xmlArray[0] = "test1";
		xmlArray[1] = "test2";
	function showTree(){
		var body_width = 300;
		var body_height = 500;
		var win_ico = "";
		var win_name = "组织树";
		var win_id = "treeDiv";
		var nodeRelationType = "hasRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
		var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
		var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框，noInput代表无
		var queryCondition = "assist_dept=1";	//异步查询条件,如果没有查询条件请设置成""
		var dept_value = form.assist_dept2.value;
		var win_body = "<%=request.getContextPath()%>/common/deeptree/deeptree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType+ "&defaultSelectedNodesValue="+ dept_value+ "&queryCondition="+ queryCondition;
		win_body += "&rootXmlSource=<%=RmStringHelper.encodeUrl(request.getContextPath() + "/common/deeptree/deeptree_data.jsp?teststr=3&searchvalue=5&dataType="+dataType)%>";
		//win_body += "&rootXmlSource=../common/deeptree/deeptree_data.do?" + encodeURIComponent("teststr=3&searchvalue=5&dataType=xml");
		var need_shade = true;
		var isCenter = true;
		var win_left = "100";
		var win_top = "100";
		
		//返回参数的调用
		var paramArray = new Array();
		paramArray[0] = "form.assist_dept2";
		paramArray[1] = "form.assist_dept_name2";
		paramArray[2] = "form.assist_dept_com2";
		
		new_tree(body_width,body_height,win_ico,win_name,win_id,win_body,dept_value,need_shade,isCenter,win_left,win_top,paramArray);
	}
	
	//获取自由树
   	function deeptreefree(){
		var nodeRelationType = "hasRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
		var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
		var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框
		var queryCondition = "assist_dept=1";	//异步查询条件
		var win_id = "freeTree";
		var win_body = "<%=request.getContextPath()%>/common/deeptree/deeptreefree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType+ "&queryCondition="+"'"+ queryCondition +"'";
		win_body += "&rootXmlSource=<%=RmStringHelper.encodeUrl(request.getContextPath() + "/common/deeptree/deeptree_data.jsp?dataType="+dataType)%>";
		
		jQuery("#loaddeeptree").load(win_body);
	}
	//单击事件
	function fun1(obj,winId){
/*   		alert(winId);
			alert("单击1");
			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]); 
			alert(obj[xmlArray[0]]);
			alert(obj[xmlArray[1]]);  */
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
