Ext.ns("App");

function $ImportJs(viewName,callback,param) {
	var evalJs='new ' + viewName + '('+param+')';
	var b = document.getElementById(viewName+'-hiden');
	if (b != null) {
		var view = eval(evalJs);
		callback.call(this, view);
	} else {
		var jsArr = eval('App.importJs.' + viewName);
		if(jsArr==undefined){
			var view = eval(evalJs);
			callback.call(this, view);
			return ;
		}
		ScriptMgr.load({
					scripts : jsArr,
					callback : function() {
						Ext.DomHelper.append(document.body,"<div id='"
												+ viewName
												+ "-hiden' style='display:none'></div>");
						var view = eval(evalJs);
						callback.call(this, view);
					}
		});
	}
}

/**
 * 取得中间的内容面板
 * @return {}
 */
App.getContentPanel=function(){
	var tabs = Ext.getCmp('centerTabPanel');
	return tabs;
};

/**
 * 创建上传的对话框
 * @param {} config
 * @return {}
 */
App.createUploadDialog=function(config){
	var defaultConfig={
		file_cat:'others',
		url:__ctxPath+'/file-upload',
		reset_on_hide: false,
		upload_autostart:false,
		modal : true
	};
	Ext.apply(defaultConfig,config);			
	var	dialog = new Ext.ux.UploadDialog.Dialog(defaultConfig);
	return dialog;
};
/**
 * 把数组中的重复元素去掉
 * @param {} data 传入一个数组
 * @return {}　返回一个元素唯一的数组
 */
function uniqueArray(data) {
	data = data || [];
	var a = {};
	for (var i = 0; i < data.length; i++) {
		var v = data[i];
		if (typeof(a[v]) == 'undefined') {
			a[v] = 1;
		}
	};
	data.length = 0;
	for (var i in a) {
		data[data.length] = i;
	}
	return data;
};

/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/*This function is used to get cookies */
function getCookie(name) {
	var prefix = name + "=" 
	var start = document.cookie.indexOf(prefix); 
	
	if (start==-1) {
		return null;
	}
	
	var end = document.cookie.indexOf(";", start+prefix.length);
	if (end==-1) {
		end=document.cookie.length;
	}

	var value=document.cookie.substring(start+prefix.length, end) ;
	return unescape(value);
}

/* This function is used to delete cookies */
function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
/**
 * 封装请求
 * @param {} config
 */
function $request(config){
		Ext.Ajax.request({
			url:config.url,
			params:config.params,
			method:config.method==null?'POST':config.method,
			success:function(response,options){
				if(config.success!=null){
					config.success.call(this,response,options);
				}
			},
			failure:function(response,options){
				Ext.MessageBox.show({
					title : '操作信息',
					msg : '操作出错，请联系管理员！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				if(config.success!=null){
					config.failure.call(this,response,options);
				}
			}
		});
}
