/**
 * created by stephen zhou 2013/05/30
 * create constructor , need some params which first and second can not be null,others sort by order
 * @param win_id--唯一的窗口ID
 * @param _orgId--根节点组织ID
 * @param _nodeRelationType--选填，字符串
 * @param _isOnlyLeaf--选填，字符串
 * @param _inputType--选填，字符串
 * @param _qryType--查询类型，PERSON为只查根节点下的人员，ORG为只查根节点下的组织
 * @returns {DeepTreeObj}
 */   
function FreeTreeObj(win_id,_orgId,_nodeRelationType,_isOnlyLeaf,_inputType,_qryType,freeObj){
		this.showTree = function(cb){
			_callback = cb;
			 //是否有查询
            var isSearchBox = "1" ;//1为有查询；0为无查询
            
			document.getElementById("content").innerHTML+='<div id="freeTreeDiv">'+
			//text字符串，逗号隔开
			'<input type = "text" id="_freeTreeDiv_text" name="_freeTreeDiv_text"/>'+
			//id字符串，逗号隔开
			'<input type = "text" id="_freeTreeDiv_id" name="_freeTreeDiv_id"/>'+
			//电话号码字符串
			'<input type = "text" id="_freeTreeDiv_contractNumber" name="_freeTreeDiv_contractNumber"/>'+
			//邮件号码
			'<input type = "text" id="_freeTreeDiv_email" name="_freeTreeDiv_email"/>'+
			//性别
			'<input type = "text" id="_freeTreeDiv_sex" name="_freeTreeDiv_sex"/>'+
			//父ID
			'<input type = "text" id="_freeTreeDiv_parentId" name="_freeTreeDiv_parentId"/>'+
			//节点类型（组织、人员）
			'<input type = "text" id="_freeTreeDiv_thisType" name="_freeTreeDiv_thisType"/>'+
			//账户名
			'<input type = "text" id="_freeTreeDiv_accountId" name="_freeTreeDiv_accountId"/>'+
			//账户ID
			'<input type = "text" id="_freeTreeDiv_accountName" name="_freeTreeDiv_accountName"/>'+
			//是否叶子节点
			'<input type = "text" id="_freeTreeDiv_leaf" name="_freeTreeDiv_leaf"/>'+
			
			'</div>';
			var body_width = 300;
			var body_height = 500;
			var win_ico = "";
			var win_name = "组织树";
			var nodeRelationType = "hasRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
			var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
			var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框
			if(_nodeRelationType!=null){
				nodeRelationType = _nodeRelationType; 
			}
			if(_isOnlyLeaf!=null){
				isOnlyLeaf = _isOnlyLeaf; 
			}
			if(_inputType!=null){
				inputType = _inputType;
			}
			var queryCondition = "assist_dept=1";	//异步查询条件,如果没有查询条件请设置成""
			var dept_value = "1";//返回值，不能为空
			var win_body = PATH+"/common/deeptree/distributetree.jsp?orgId="+_orgId+"&winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ queryCondition;
			if(_orgId!=null){
				win_body += "&rootXmlSource="+freetreeUrl+_orgId;
			}else{
				win_body += "&rootXmlSource="+freetreeUrl;
			}
			if(freeObj){
			    if(freeObj.isOnlyChild){
			        win_body += freetreeUrl2+freeObj.isOnlyChild;
			    }else{
			        win_body += freetreeUrl2+false;
			    }
			    
			    isSearchBox = freeObj.isSearchBox;
            }
			if(_qryType!=null){
				win_body+=deeptreeUrl2+_qryType;
			}
			var need_shade = true;
			var isCenter = true;
			var win_left = "100";
			var win_top = "100";
			//返回参数的调用
			var paramArray = new Array();
			paramArray[0] = "_freeTreeDiv_text";
			paramArray[1] = "_freeTreeDiv_id";
			paramArray[2] = "_freeTreeDiv_contractNumber";
			paramArray[3] = "_freeTreeDiv_email";
			paramArray[4] = "_freeTreeDiv_sex";
			paramArray[5] = "_freeTreeDiv_parentId";
			paramArray[6] = "_freeTreeDiv_thisType";
			paramArray[7] = "_freeTreeDiv_accountId";
			paramArray[8] = "_freeTreeDiv_accountName";
			paramArray[9] = "_freeTreeDiv_leaf";
			//paramArray[2] = "form.assist_dept_com2";
			
			var dtConfirmFun = "";
		    
	        var fuzzySearchType = 1;//前台（0）或后台（1）查询，默认为0
	        var fuzzySearchDataType = 3;//前台查询时为0默认为0；后台查询时，查组织为1，查人员为2，查组织和人员3
			if(_qryType == "PERSON"){
			    fuzzySearchDataType = 2;
			}else if(_qryType == "ORG"){
                fuzzySearchDataType = 1;
            }else{
                fuzzySearchDataType = 3;
            }
			
	         //页卡相关参数
            //是否有页卡
        var isTabTree = "0";//1有页卡；0无页卡
            //页卡二的url
        var win_body1 = "";
			
			new_tree(body_width,body_height,win_ico,win_name,win_id,
			        win_body,win_body1,dept_value,need_shade,isCenter,win_left,win_top,paramArray,dtConfirmFun,isSearchBox,fuzzySearchType,fuzzySearchDataType,isTabTree);
		}
		
		//单击事件
		this.fun1 = function(obj,winId){}
		this.fun2 = function(obj,winId){}
		//双击事件
		this.dbfun1 = function (obj,winId){}
		this.dbfun2 = function (obj,winId){}

	this.confirmReturnValue = function(submitStringArray) {
        var inputArray1 = input1.split(",");
        var inputArray2 = input2.split(",");

        var _input = new Array(inputArray1.length);
        for ( var v = 0; v < inputArray1.length; v++) {
            _input[v] = "";
            for ( var i = 0; i < submitStringArray.length; i++)
                _input[v] += submitStringArray[i][inputArray2[v]] + ",";
        }
        for ( var v = 0; v < inputArray1.length; v++) {
            if (_input[v].substr(_input[v].length - 1) == ",") {
                _input[v] = _input[v].substr("", _input[v].length - 1);
            }
            Ext.getCmp(inputArray1[v]).setValue(_input[v]);
        }
    }
}
	
	/*确定事件*/
	function confirmReturnValue(submitStringArray){
		retSubmitStringArray = submitStringArray;
	}
	
	 function toDoClickNextBus(obj,winId){
	        document.getElementById('searchvalue1_iframe'+winId).value = obj["childName"];
	        document.getElementById('hidserch_iframe'+winId).value = obj["childId"];
	    }
	
	