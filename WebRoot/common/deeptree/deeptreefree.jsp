<%@page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
<title>rm-based architecture project</title>
<jsp:include page="include/globalDeepTree.jsp" />
<link href="<%=request.getContextPath()%>/css/common/df.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/deeptree/js/rm/rm-tools.js"></script>
<script type="text/javascript">
	//定义全局路径

	var treeImagePath = "image";  //树图标路径

	//wangsy 2013-0401 for lastNodeImage
	var lastNodeImagePath = "<%=request.getContextPath() %>/common/deeptree/image";
	
	if(typeof(parent.xmlArray) != "undefined"){
		var xmlArray = parent.xmlArray;//单双击事件xml返回参数自定义数组

		var xmlArrayL = parent.xmlArray.length; //单双击事件xml返回参数自定义数组长度

		var xslPath = "deeptree_xsl.jsp?inputType=" + inputType + "&treeImagePath=" + treeImagePath + "&returnTextType="+ returnTextType+ "&xmlArray="+ xmlArray+ "&xmlArrayL="+ xmlArrayL + "&isOnlyLeaf=" +isOnlyLeaf + "&winId=" + winId;  //xslt文件相对路径
	}else{
		var xslPath = "deeptree_xsl.jsp?inputType=" + inputType + "&treeImagePath=" + treeImagePath + "&returnTextType="+ returnTextType + "&isOnlyLeaf=" +isOnlyLeaf + "&winId=" + winId;  //xslt文件相对路径	
	}
	var returnTextType = "plugRoot"; //返回文本策略, 包括加上plugParent, self, plugRoot
	//var xslPath = "deeptree_xsl.jsp?inputType=" + inputType + "&treeImagePath=" + treeImagePath + "&returnTextType="+ returnTextType;  //xslt文件相对路径
	var defaultXmlUrlPath = "deeptree_data.jsp?rootnode=";  //xmlSourceType为nodeCode时有效, 默认xml主路径, 转义影射：&-->%26, =-->%3D
	var defaultNodeCodeGetCurrent = "&getcurrent=1";  //xmlSourceType为nodeCode时有效, 默认取节点本身数据参数标识：&-->%26, =-->%3D
	
	function toDoNodeAppend() {
		/* wangsy 2013-04-01 for line of last node */
		$('.TreeNode').each(function(){
			if($(this).attr("type") == 'leaf'){
				if(!$(this).next()[0]){
					$(this).children()[1].src = lastNodeImagePath + "/L.gif";
				}
			}else if($(this).attr("type") == 'parent'){
				if(!$(this).next()[0]){
					$(this).children()[1].src = lastNodeImagePath + "/Lz.gif";
				}else if(!$(this).next().next()[0]){
					if($(this).next()[0].style.display == "none"){
						$(this).children()[1].src = lastNodeImagePath + "/Lz.gif";
					}else{
						$(this).children()[1].src = lastNodeImagePath + "/Lv.gif";
					}
					$(this).next().css("background-image","");
				}
				
			}
		});

		$('.tree-firerift-style-checkbox-o').each(function() {
			
			thisID		= $(this).attr('id');
			thisClass	= $(this).attr('class');
			var isType = window.document.getElementById(thisID).type;
			if(isType == "radio"){
					setClass = ".tree-firerift-style-r";
			}else if(isType == "checkbox"){
					setClass = ".tree-firerift-style-o";
			}

			if($(this)[0].checked == true)
				$(this).next(setClass).addClass('on');
			else
				$(this).next(setClass).addClass('off');
			$(this).removeClass('tree-firerift-style-checkbox-o');
			
			$(this).addClass('hidden');
		});
	}
	//根据需要可以重写的方法
	function toDoMouseClick(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
		//alert("单击");
		if(inputType == "radio" || inputType == "checkbox" || inputType == "noInput") {
			var tempObj = new Object();
			//var submitObjectArray = new Array(0);
			var thisObj = getObjectById(prefixDiv + getMouseIdByEvent(obj.id));
			if(thisObj != null){
				tempObj["childName"] = thisObj.getAttribute("text");
				tempObj["childId"] = thisObj.getAttribute("returnValue");
				tempObj["returnValue"] = thisObj.getAttribute("returnValue");
				
				/*新添加的属性开始*/
				tempObj["busContent"] = thisObj.getAttribute("busContent");
				/*新添加的属性结束*/
				/*tanjing: xml新添加属性*/
				for(i=0; i<xmlArrayL; i++){
					tempObj[xmlArray[i]] = thisObj.getAttribute(xmlArray[i]);
				}				
				//单击事件
				if(typeof(funClickArray) != "undefined"){
					var toDoClickNextBus = funClickArray;
					var funClickArrayL = funClickArray.length;
					if(funClickArrayL>0){
						for(i=0; i<funClickArrayL; i++){
							eval(toDoClickNextBus[i])(tempObj,winId);
						}			
					}
				}
			}
		}
	}
	
	function toDoMouseDbClick(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
		//alert("双击");
		if(inputType == "radio" || inputType == "checkbox" || inputType == "noInput") {
			var tempObj = new Object();
			//var submitObjectArray = new Array(0);
			var thisObj = getObjectById(prefixDiv + getMouseIdByEvent(obj.id));
			if(thisObj != null){
				tempObj["childName"] = thisObj.getAttribute("text");
				tempObj["childId"] = thisObj.getAttribute("returnValue");
				tempObj["returnValue"] = thisObj.getAttribute("returnValue");
				
				/*新添加的属性开始*/
				tempObj["busContent"] = thisObj.getAttribute("busContent");
				/*新添加的属性结束*/
				/*tanjing: xml新添加属性*/
				for(i=0; i<xmlArrayL; i++){
					tempObj[xmlArray[i]] = thisObj.getAttribute(xmlArray[i]);
				}				
				//双击事件
				if(typeof(funDbClickArray) != "undefined"){
					var toDoDbClickNextBus = funDbClickArray;
					var funDbClickArrayL = funDbClickArray.length;
					if(funDbClickArrayL>0){
						for(i=0; i<funDbClickArrayL; i++){
							eval(toDoDbClickNextBus[i])(tempObj,winId);
						}			
					}
				}
			}
		}
	}
	
	function toDoMouseOver(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
	}
	
	function toDoMouseOut(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
	}

</script>
</head>
<body onLoad="doOnLoad()" topmargin=0 leftmargin=0 background="" >
<form name="formfree" method="post">
<div>
	<!--树开始-->
	<div name="deeptree" id="deeptree" class="deeptree" style="z-index: 1000px;"></div>
	<!--树结束-->
</div>
</form>
</body>
</html>
