// 填充图片的本地引用
Ext.BLANK_IMAGE_URL = '../../images/default/s.gif';
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

function ShowDate() {
	todayDate = new Date();
	date = todayDate.getDate();
	month = todayDate.getMonth() + 1;
	year = todayDate.getYear();
	if (navigator.appName == "Netscape") {
		document.write(1900 + year);
		document.write("年");
		document.write(month);
		document.write("月");
		document.write(date);
		document.write("日");
	}
	if (navigator.appVersion.indexOf("MSIE") != -1) {
		document.write(year);
		document.write("年");
		document.write(month);
		document.write("月");
		document.write(date);
		document.write("日");
	}
}

function loadXML(xmlStr){ 
    if(!xmlStr)return null; //空串返回null
    var xmlDom = null;
    if (window.ActiveXObject){
       xmlDom =new ActiveXObject("Microsoft.XMLDOM");
    }else{
       if (document.implementation && document.implementation.createDocument){
       		xmlDom = document.implementation.createDocument("","",null);
			 }
		}           
    xmlDom.async = false;
    try{
       var lb_success = xmlDom.load(xmlStr)||xmlDom.loadXML(xmlStr);
       if(!lb_success){
       		alert(xmlDom.parseError.reason);
       }
    }catch(e){  //非IE浏览器
        var oParser=new DOMParser();
        xmlDom=oParser.parseFromString(xmlStr,"text/xml");
    }
    return xmlDom;
}