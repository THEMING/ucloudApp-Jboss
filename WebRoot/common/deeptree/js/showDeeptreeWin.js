/**
 * created by stephen zhou 2013/05/06
 * created constructor , need some params ,which first and second can not be null,others sort by order
 * @param input1--必填--控件名组合，逗号隔开
 * @param input2--必填--所要的结果组合，逗号隔开，个数、顺序都和input1一致
 * @param win_id--唯一的窗口ID
 * @param _orgId--根节点组织ID
 * @param _isUseful--选填，数组
 * @param _nodeRelationType--选填，字符串
 * @param _isOnlyLeaf--选填，字符串
 * @param _inputType--选填，字符串
 * @param _qryType--查询类型，PERSON为只查根节点下的人员，ORG为只查根节点下的组织
 * @param _cloudUserId--当前人员ID
 * @param _roleArray--抽象角色对应的角色列表
 * @param _treeType--派发树类别 1：集团派发树2：省分派发树 3：地市派发树4：省省派发树
 * @param _operGridId--gridID 用于在grid中使用派发树的情况
 * @returns {DeepTreeObj}
 */   
var roleArray = null;
function DeepTreeObj(input1,input2,win_id,_orgId,_isUseful,_nodeRelationType,
        _isOnlyLeaf,_inputType,searchObject,_qryType,_cloudUserId, _roleArray,_treeType,_operGridId){
    if(_roleArray && _roleArray.length){
        roleArray = _roleArray.join(",");
    }else{
        roleArray = new Array();
    }
    
		this.showTree = function(deeptreeUrl){
		    var isTabTree = "1";//1有页卡；0无页卡
		    
			var body_width = 300;
			var body_height = 500;
			var win_ico = "";
			var win_name = "派发树";
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
			var dataType = "json";
			
			var win_body = PATH+"/common/deeptree/distributetree.jsp?orgId="+_orgId+
			"&winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ queryCondition;
			
			var isOnlyLeaf1 = 1;
			if(inputType == "checkbox"){
			    nodeRelationType = "hasRelation";
			}else if(inputType == "radio"){
			    nodeRelationType = "noRelation";
            }
			var win_body1 = PATH+"/common/deeptree/distributetree.jsp?orgId=1&winId="+win_id+
			"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf1 + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ queryCondition;
			if(_orgId!=null){
				win_body += "&rootXmlSource="+deeptreeUrl+_orgId;
				win_body1 += "&rootXmlSource="+deeptreeUrl+_orgId;
			}
			else{
				win_body += "&rootXmlSource="+deeptreeUrl+1;
				win_body1 += "&rootXmlSource="+deeptreeUrl+1;
			}
			if(_qryType!=null){
				win_body+=deeptreeUrl2+_qryType;
			}
			win_body1+=deeptreeUrl2+"tabTree1";
			
			if(_cloudUserId!=null){
                win_body+=deeptreeUrl3+_cloudUserId;
                win_body1+=deeptreeUrl3+_cloudUserId;
            }
			if(_treeType!=null){
                win_body+=deeptreeUrl5+_treeType;
                win_body1+=deeptreeUrl5+_treeType;
            }
			var need_shade = true;
			var isCenter = true;
			var win_left = 100;
			var win_top = 100;
			//派发树三个按钮的可用状态
			var isUseful = new Array();
			if(_isUseful!=null){
				isUseful=_isUseful;
			}else{
				isUseful[0] = "1";//派发：1可用；0不可用
				isUseful[1] = "1";//送审：1可用；0不可用
				isUseful[2] = "1";//抄送：1可用；0不可用
			}
			
			
		var returnValue = new Array();
			for(var i=0;i<2;i++){			
				returnValue[i] = new Array();
			}
			
		     var fuzzySearchType = "0" //前台（0）或后台（1）查询，默认为0
		     fuzzySearchType = searchObject.fuzzySearchType;
		     var fuzzySearchDataType = "0"//前台查询时为0默认为0；后台查询时，查组织为1，查人员为2，默认为1
		     
		     var tabTree = new Array(); //页卡参数数组定义
		        for(var i=0;i<1;i++){           
		            tabTree[i] = new Array();
		        }
		        tabTree[0][0] = "常用群组"; //页卡2 name
		        tabTree[0][1] = win_body1;  //页卡2 url
		     
			new_distributetree(body_width,body_height,win_ico,win_name,win_id,
			        win_body,need_shade,isCenter,win_left,win_top,isUseful,input1,input2,
			        _operGridId,fuzzySearchType,fuzzySearchDataType,isTabTree,tabTree);
		}
		 
		  this.confirmReturnValue = function(submitStringArray){
			  var inputArray1 = input1.split(",");
			  var inputArray2 = input2.split(",");
			  
				//retSubmitStringArray = submitStringArray;
			  //根据输入框个数设置值
			  var _input = new Array(inputArray1.length);
			  for(var v = 0; v<inputArray1.length; v++  ){
				  _input[v]="";
				  for(var i = 0; i<submitStringArray.length; i++)
					  _input[v]+=submitStringArray[i][inputArray2[v]]+",";
			  }
			  for(var v = 0; v<inputArray1.length; v++  ){
				  if( _input[v].substr( _input[v].length-1)==","){
					  _input[v] =  _input[v].substr("",_input[v].length-1);
				  }
				  if(_operGridId!=null && _operGridId!='undefined' && _operGridId!='null'){
					  var selItems = Ext.getCmp(_operGridId).getSelectionModel().getSelections();
	                  Ext.each(selItems, function(item) { 
	                	  var grid = Ext.getCmp(_operGridId);
	                	  grid.store.getById(item.id).set(inputArray1[v],_input[v]);
	                  });
				  }else{
					  Ext.getCmp(inputArray1[v]).setValue(_input[v]);
				  }
			  }
			}
	}

    function toDoClickNextBus(obj,winId){
        document.getElementById('searchvalue1_iframe'+winId).value = obj["childName"];
        document.getElementById('hidserch_iframe'+winId).value = obj["childId"];
    }   
	
	/*确定事件*/
	function confirmReturnValue(submitStringArray){
		retSubmitStringArray = submitStringArray;
	}
	
	