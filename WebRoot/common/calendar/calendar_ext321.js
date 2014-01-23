/*========= 日期控件 ===========*/
//确保日历容器节点在 body 最后，否则 FireFox 中不能出现在最上方   
//调用说明：SelectDate(this,"日期格式(yyyy-MM-dd hh:mm:ss/yyyy-MM-dd)","区间始","区间止")
var calendarTimeChange = "calendarHour";  
var dateFormat;
var dfCalenderShowStatus = false;
function InitContainerPanel() //初始化容器   
{   
    var str = '<div id="calendarPanel" style="position: absolute;display: none;z-index:9999; background-color: #FFFFFF;border: 0px solid #CCCCCC;width:230px;font-size:12px;"></div>';   
    if(document.all)   
    {   
        str += '<iframe style="position:absolute;z-index:2000;width:expression(this.previousSibling.offsetWidth);';   
        str += 'height:expression(this.previousSibling.offsetHeight);';   
        str += 'left:expression(this.previousSibling.offsetLeft);top:expression(this.previousSibling.offsetTop);';   
        str += 'display:expression(this.previousSibling.style.display);" scrolling="no" frameborder="no"></iframe>';   
    }   
    var div = document.createElement("div");   
    div.innerHTML = str;
    div.id = "ContainerPanel";   
    div.style.display ="none";   
    document.body.appendChild(div);  
     
}//调用calendar.show(dateControl, popControl);   
//-->  

var cal;
var isFocus=false; //是否为焦点
var pickMode ={
    "second":1,
    "minute":2,
    "hour":3,
    "day":4,
    "month":5,
    "year":6  };
    
var topY=0,leftX=0;  //自定义定位偏移量 2007-02-11 由 www.ttkc.net添加
//选择日期 → 由 www.ttkc.net 2007-06-10 添加，通过 ID 来选日期
function SelectDateById(id,strFormat,x,y)
{
 var obj = document.getElementById(id);
 if(obj == null){return false;}
 obj.focus();
 if(obj.onclick != null){obj.onclick();}
 else if(obj.click != null){obj.click();}
 else{SelectDate(obj,strFormat,x,y)}
} 

var sDate,eDate;//限定日期区间，可以选择日期为大于等于sdate,小于等于edate,日期格式串
//选择日期 → 由 www.ttkc.net 2006-06-25 添加
function SelectDate(obj,strFormat,startDate,endDate)
{
    //获取input对象
    //var obj=$('#'+objs.id)[0];//$(objs).prev()[0];
    jQuery(obj).focus();
    sDate = (startDate!="" && startDate!=undefined) ? startDate:"";
    eDate = (endDate!="" && endDate!=undefined) ? endDate:"";
 	strFormat = (strFormat==null)? "yyyy-MM-dd hh:mm:ss":strFormat;
	x = 0;
	y = 0;
 leftX =(x == null) ? leftX : x;
 topY  =(y == null) ? topY : y;//自定义定位偏移量 2007-02-11 由 www.ttkc.net添加 
 if(document.getElementById("ContainerPanel")==null){InitContainerPanel();}
    var date = new Date();
    var by = date.getFullYear()-50;  //最小值 → 50 年前
    var ey = date.getFullYear()+50;  //最大值 → 50 年后
    //cal = new Calendar(by, ey,1,strFormat);    //初始化英文版，0 为中文版
    cal = (cal==null) ? new Calendar(by, ey, 0) : cal;    //不用每次都初始化 2006-12-03 修正
    cal.DateMode =pickMode["second"]; //复位
      if(strFormat.indexOf('s')< 0) {cal.DateMode =pickMode["minute"];}//精度为分
      if(strFormat.indexOf('m')< 0) {cal.DateMode =pickMode["hour"];}//精度为时
      if(strFormat.indexOf('h')< 0) {cal.DateMode =pickMode["day"];}//精度为日
      if(strFormat.indexOf('d')< 0) {cal.DateMode =pickMode["month"];}//精度为月
      if(strFormat.indexOf('M')< 0) {cal.DateMode =pickMode["year"];}//精度为年
      if(strFormat.indexOf('y')< 0) {cal.DateMode =pickMode["second"];}//默认精度为秒
	  dateFormat=strFormat;
    cal.dateFormatStyleOld = cal.dateFormatStyle;
    cal.dateFormatStyle = strFormat;
    cal.show(obj);
    var calenderObjs = document.getElementById("ContainerPanel");
    var msgObjs = document.getElementById('calendarPanel');
    var bgObj = addPanel(msgObjs);
    cal.bgObjName = bgObj.name;
    
}
/**//**//**//**//**//**//**//**
 * 返回日期
 * @param d the delimiter
 * @param p the pattern of your date
 2006-06-25 由 www.ttkc.net 修改为根据用户指定的 style 来确定；
 */
String.prototype.toDate = function(style) {
  var y = this.substring(style.indexOf('y'),style.lastIndexOf('y')+1);//年
  var M = this.substring(style.indexOf('M'),style.lastIndexOf('M')+1);//月
  var d = this.substring(style.indexOf('d'),style.lastIndexOf('d')+1);//日
  var h = this.substring(style.indexOf('h'),style.lastIndexOf('h')+1);//时
  var m = this.substring(style.indexOf('m'),style.lastIndexOf('m')+1);//分
  var s = this.substring(style.indexOf('s'),style.lastIndexOf('s')+1);//秒

  if(s == null ||s == "" || isNaN(s)) {s = new Date().getSeconds();}
  if(m == null ||m == "" || isNaN(m)) {m = new Date().getMinutes();}
  if(h == null ||h == "" || isNaN(h)) {h = new Date().getHours();}
  if(d == null ||d == "" || isNaN(d)) {d = new Date().getDate();}
  if(M == null ||M == "" || isNaN(M)) {M = new Date().getMonth()+1;}
  if(y == null ||y == "" || isNaN(y)) {y = new Date().getFullYear();}
  var dt ;
  eval ("dt = new Date('"+ y+"', '"+(M-1)+"','"+ d+"','"+ h+"','"+ m+"','"+ s +"')");
  return dt;
}

/**//**//**//**//**//**//**//**
 * 格式化日期
 * @param   d the delimiter
 * @param   p the pattern of your date
 * @author  meizz
 */
Date.prototype.format = function(style) {
  var o = {
    "M+" : this.getMonth() + 1, //month
    "d+" : this.getDate(),      //day
    "h+" : this.getHours(),     //hour
    "m+" : this.getMinutes(),   //minute
    "s+" : this.getSeconds(),   //second
    "w+" : "天一二三四五六".charAt(this.getDay()),   //week
    "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S"  : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(style)) {
    style = style.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(style)){
      style = style.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return style;
}

//2007-09-14  由www.ttkc.net添加返回所选日期
Calendar.prototype.ReturnDate = function(dt) {
    if (this.dateControl != null){
        this.dateControl.value = dt;
        
        //显示输入框的文字
        var claClassName= this.dateControl.className;//+=" calenderInputHidden";
        claClassName = claClassName.replace("calenderInputHidden","");
        this.dateControl.className=claClassName;
        this.dateControl =null;
        }
    calendar.hide();
 if(this.dateControl==null || this.dateControl.onchange == null){return;} 
 //将 onchange 转成其它函数，以免触发验证事件
    var ev = this.dateControl.onchange.toString(); //找出函数的字串
    ev = ev.substring(
   ((ev.indexOf("ValidatorOnChange();")> 0) ? ev.indexOf("ValidatorOnChange();") + 20 : ev.indexOf("{") + 1)
    , ev.lastIndexOf("}"));//去除验证函数 ValidatorOnChange();
 var fun = new Function(ev);  //重新定义函数
 this.dateControl.changeEvent = fun; 
    this.dateControl.changeEvent();//触发自定义 changeEvent 函数
}

/**//**//**//**//**//**//**//**
 * 日历类
 * @param   beginYear 1990
 * @param   endYear   2010
 * @param   lang      0(中文)|1(英语) 可自由扩充
 * @param   dateFormatStyle  "yyyy-MM-dd";
 * @version 2006-04-01
 * @author  KimSoft (jinqinghua [at] gmail.com)
 * @update
 */
function Calendar(beginYear, endYear, lang, dateFormatStyle) {
  this.beginYear = 1950;
  this.endYear = 2050;
  this.lang = 0;            //0(中文) | 1(英文)
  this.dateFormatStyle = "yyyy-MM-dd hh:mm:ss";

  if (beginYear != null && endYear != null){
    this.beginYear = beginYear;
    this.endYear = endYear;
  }
  if (lang != null){
    this.lang = lang
  }

  if (dateFormatStyle != null){
    this.dateFormatStyle = dateFormatStyle
  }

  this.dateControl = null;
  this.panel = this.getElementById("calendarPanel");
  this.container = this.getElementById("ContainerPanel");
  this.form  = null;

  this.date = new Date();
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  
  this.day = this.date.getDate();
  this.hour = this.date.getHours();
  this.minute = this.date.getMinutes();
  this.second = this.date.getSeconds();

this.colors = {
  "cur_word"      : "#FFFFFF",  // 当日日期文字颜色
  "cur_bg"        : "#a9a9a9",  // 当日日期单元格背影色
  "sel_bg"        : "#e13840",  // 已被选择的日期单元格背影色 2006-12-03 www.ttkc.net添加
  "sun_word"      : "#ef1314",  // 星期六和星期天文字颜色
  "td_word_light" : "#333333",  // 单元格文字颜色
  "td_word_dark"  : "#CCCCCC",  // 单元格文字暗色
  "td_bg_out"     : "#EFEFEF",  // 单元格背影色
  "td_bg_over"    : "#e13840",  // 单元格背影色
  "tr_word"       : "#FFFFFF",  // 日历头文字颜色
  "tr_bg"         : "#666666",  // 日历头背影色
  "input_border"  : "#CCCCCC",  // input控件的边框颜色
  "input_bg"      : "#EFEFEF"   // input控件的背影色
  }

this.TimeInputOldValue = ""; //wangsy 加，用于当时间输入有误时还原
this.TimeHInputError = 0;//wangsy 加，用于当时间输入有误时禁止提交
this.TimeMInputError = 0;
this.TimeSInputError = 0;

/* //2008-01-29 放到了 show ，因为要做 pickMode 判断
  this.draw();
  this.bindYear();
  this.bindMonth();
  */
  //this.changeSelect();
  //this.bindData(); //2006-12-30 由民工.砖家注释
}

/**//**//**//**//**//**//**//**
 * 日历类属性（语言包，可自由扩展）
 */
Calendar.language = {
  "year"   : [[""], [""]],
  "months" : [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
         ],
  "weeks"  : [["日","一","二","三","四","五","六"],
        ["SUN","MON","TUR","WED","THU","FRI","SAT"]
         ],
  "hour"  : [["时"], ["H"]],
  "minute"  : [["分"], ["M"]],
  "second"  : [["秒"], ["S"]],
  "clear"  : [["清空"], ["CLS"]],
  "today"  : [["今天"], ["TODAY"]],
  "pickTxt"  : [["确定"], ["OK"]],//pickMode 精确到年、月时把今天变成“确定”
  "close"  : [["关闭"], ["CLOSE"]]
}

Calendar.prototype.draw = function() {
  calendar = this;

  var mvAry = [];
  //mvAry[mvAry.length]  = '  <form name="calendarForm" style="margin: 0px;">'; //因 <form> 不能嵌套， 2006-12-01 由www.ttkc.net改用 Div
  mvAry[mvAry.length]  = '<div class="calendar"><div class="calendardiv_alpha"></div><div class="calendardiv">';
  mvAry[mvAry.length]  = ' <span class="calendardivspan">添加日期与时间</span><i id="buttunClose">&nbsp;&nbsp;</i>';
  mvAry[mvAry.length]  = '<div class="calendardiv_nr">';
  mvAry[mvAry.length]  = ' ';
  mvAry[mvAry.length]  = '  <div name="calendarForm" style="border:1px solid #CCCCCC;margin: 2px;background:#d3d3d3;">';
  mvAry[mvAry.length]  = '    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:12px;">';
  mvAry[mvAry.length]  = '      <tr class="calendarTitleDiv" style="height:30px;">';
  mvAry[mvAry.length]  = '				<th align="left" width="1%"><input class="calendarPrevYear" name="prevYear" type="button" id="prevYear" /></th>';
  mvAry[mvAry.length]  = '        <th align="left" width="1%"><input class="calendarPrevMonth" name="prevMonth" type="button" id="prevMonth" /></th>';
  mvAry[mvAry.length]  = '        <th align="center" width="96%" nowrap="nowrap"><select name="calendarYear" id="calendarYear" style="font-size:12px;"></select><select name="calendarMonth" id="calendarMonth" style="font-size:12px;';
  if(calendar.DateMode > pickMode["month"]){mvAry[mvAry.length]  = 'display:none;';}//pickMode 精确到年时隐藏“月”
  mvAry[mvAry.length]  = '"></select></th>';
  mvAry[mvAry.length]  = '        <th align="right" width="1%"><input class="calendarNextMonth" name="nextMonth" type="button" id="nextMonth" /></th>';
  mvAry[mvAry.length]  = '				<th align="left" width="1%"><input class="calendarNextYear" name="nextYear" type="button" id="nextYear" /></th>';
  mvAry[mvAry.length]  = '      </tr>';
  mvAry[mvAry.length]  = '    </table>';
  
    //calendarTitle 日期控件头  weeks "日","一","二","三","四","五","六"
  mvAry[mvAry.length]  = '    <table id="calendarTitle" class="calendarTitleDiv" width="100%" style="border:0px solid #CCCCCC;font-size:12px;height:20px;';
  mvAry[mvAry.length]  = '" border="0" cellpadding="3" cellspacing="1" >';  
  mvAry[mvAry.length]  = '<tr>';
  for(var i = 0; i < 7; i++) {
	  if(i==0||i==6){
		  mvAry[mvAry.length]  = '<td align="center" style="color:#FF0000">';  
		  mvAry[mvAry.length]  =  Calendar.language["weeks"][this.lang][i];	 
		  mvAry[mvAry.length]  = '';
		  mvAry[mvAry.length]  = '</td>'; 
	  }else{
		  mvAry[mvAry.length]  = '<td align="center">';  
		  mvAry[mvAry.length]  =  Calendar.language["weeks"][this.lang][i];	 
		  mvAry[mvAry.length]  = '';
		  mvAry[mvAry.length]  = '</td>';  
	  }
  }
  mvAry[mvAry.length]  = '</tr>';
  mvAry[mvAry.length]  = '</table>';
  //calendarTitle
  
  //calendarTable 日期控件体   
  mvAry[mvAry.length]  = '    <table id="calendarTable"  class="caltable"  width="100%" style="border:0px solid #CCCCCC;background-color:#FFFFFF;font-size:12px;';
  if(calendar.DateMode >= pickMode["month"]){mvAry[mvAry.length]  = 'display:none;';}//pickMode 精确到年、月时隐藏“天”
  mvAry[mvAry.length]  = '" border="0" cellpadding="3" cellspacing="1">';
 
  for(var i = 0; i < 6;i++){
    mvAry[mvAry.length]  = '    <tr align="center">';
    for(var j = 0; j < 7; j++) {
      if (j == 0){
        mvAry[mvAry.length]  = '  <td style="cursor:default;width:23;height:21px;*+height:17px;color:' + calendar.colors["sun_word"] + ';"></td>';
      } else if(j == 6) {
        mvAry[mvAry.length]  = '  <td style="cursor:default;width:23;height:21px;*+height:17px;color:' + calendar.colors["sun_word"] + ';"></td>';
      } else {
        mvAry[mvAry.length]  = '  <td style="cursor:default;width:23;height:21px;*+height:17px;"></td>';
      }
    }
    mvAry[mvAry.length]  = '    </tr>';
   
  }

//2009-03-03 添加的代码，放置时间的行
  mvAry[mvAry.length]  = '      <tr style="" class="calendarTitleDiv" ';
//  if(calendar.DateMode >= pickMode["day"]){mvAry[mvAry.length]  = 'display:none;';}//pickMode 精确到时日隐藏“时间”
    mvAry[mvAry.length]  = '><td align="center" colspan="7" style="height:23px;">';
  mvAry[mvAry.length]  = '      <input type="text" name="calendarHour" id="calendarHour" style="font-size:12px;width:14px;height:20px;width:19px;*+width:15px;*+height:14px; _width:18px;_height:18px;margin-left:3px;margin-right:3px;" class="dfcalendarhms dfcalendarh dfNumberInput dfCalendarTimeInput"><font style="color:#333333;">:</font>';
  
  mvAry[mvAry.length]  = '<span style="'
//  if(calendar.DateMode >= pickMode["hour"]){mvAry[mvAry.length]  = 'display:none;';}//pickMode 精确到小时时隐藏“分”
  mvAry[mvAry.length]  = '"><input type="text" name="calendarMinute" id="calendarMinute" style="font-size:12px;width:14px;height:20px;width:19px;*+width:15px;*+height:14px; _width:18px;_height:18px;margin-left:3px;margin-right:3px;" class="dfcalendarhms dfcalendarm dfNumberInput dfCalendarTimeInput"><font style="color:#333333;">:</font>'+'</span>';
    
    mvAry[mvAry.length]  = '<span style="'
//  if(calendar.DateMode >= pickMode["minute"]){mvAry[mvAry.length]  = 'display:none;';}//pickMode 精确到小时、分时隐藏“秒”
   mvAry[mvAry.length]  = '"><input type="text" name="calendarSecond" id="calendarSecond" style="font-size:12px;width:14px;height:20px;width:19px;*+width:15px;*+height:14px;_width:18px;_height:18px; margin-left:3px;margin-right:3px;" class="dfcalendarhms dfcalendars dfNumberInput dfCalendarTimeInput">'+'</span>';
  
  mvAry[mvAry.length]  = '<span style="background:#ffffff;margin-left:3px;width:28px;height:14px;border:0px;"><input type="button" name="calendarTimeUp" id="calendarTimeUp" class="calendarTimeUp" >'
  mvAry[mvAry.length]  = '<input type="button" name="calendarTimeDown" id="calendarTimeDown" class="calendarTimeDown"> </span>'
  
  mvAry[mvAry.length]  = '      </td></tr>';
  
  mvAry[mvAry.length]  = '    </table>';
  //mvAry[mvAry.length]  = '  </from>';
  mvAry[mvAry.length]  = '      <div align="center"   class="calDivOnEvent"  style="padding:12px 4px 4px 4px;background-color:#ffffff;border:0px;">';
  mvAry[mvAry.length]  = '        <input name="calendarToday" type="button" id="calendarToday" value="现 在" class="calendarRedButton"/>';
  mvAry[mvAry.length]  = '        <input name="calendarSubmit" type="button" id="calendarSubmit" value="确 定" class="calendarGrayButton" />';
  mvAry[mvAry.length]  = '        <input name="calendarClear" type="button" id="calendarClear" value="重 置" class="calendarGrayButton" />';
  mvAry[mvAry.length]  = '        <input name="calendarClose" type="button" id="calendarClose" value="取 消" class="calendarGrayButton" />';
  mvAry[mvAry.length]  = '      </div>';
  
  mvAry[mvAry.length]  = '  </div>';
  mvAry[mvAry.length]  = '</div></div></div>';
  
  this.panel.innerHTML = mvAry.join("");
  
  	//calendarHour	//精度为日
	if(dateFormat.indexOf('h')< 0) {
		document.getElementById("calendarHour").className="calendarFormInput";
		document.getElementById("calendarMinute").className="calendarFormInput";
		document.getElementById("calendarSecond").className="calendarFormInput";
		jQuery('#calendarHour').attr('readonly','readonly');
		jQuery('#calendarMinute').attr('readonly','readonly');
		jQuery('#calendarSecond').attr('readonly','readonly');
	}
  
  /**//**//**//******** 以下代码由www.ttkc.net 2006-12-01 添加 **********/
  var obj = this.getElementById("prevYear");
  obj.onclick = function () {calendar.goPrevYear(calendar);}
  obj.onblur = function () {calendar.onblur();}
  this.prevYear= obj;
  
  obj = this.getElementById("nextYear");
  obj.onclick = function () {calendar.goNextYear(calendar);}
  obj.onblur = function () {calendar.onblur();}
  this.nextYear= obj;
  
  var obj = this.getElementById("prevMonth");
  obj.onclick = function () {calendar.goPrevMonth(calendar);}
  obj.onblur = function () {calendar.onblur();}
  this.prevMonth= obj;
  
  obj = this.getElementById("nextMonth");
  obj.onclick = function () {calendar.goNextMonth(calendar);}
  obj.onblur = function () {calendar.onblur();}
  this.nextMonth= obj;

  obj = this.getElementById("calendarClear");
//modified by wangsy 2013-04-18 for 方法移至日期控件本身属性
  obj.onclick = function () { calendar.goReset(calendar);}
  this.calendarClear = obj;
  
  obj = this.getElementById("calendarClose");
  obj.onclick = function () {calendar.ReturnDate(""); }
//  obj.onclick = function () {calendar.hide();}
  this.calendarClose = obj;
  
  obj = this.getElementById("buttunClose");
  obj.onclick = function () {calendar.hide();}
  this.calendarClose = obj;
  
  var documentBody = document.body;

  
  obj = this.getElementById("calendarYear");
  obj.onchange = function () {calendar.update(calendar);}
  obj.onblur = function () {calendar.onblur();}
  this.calendarYear = obj;
  
  obj = this.getElementById("calendarMonth");
  with(obj)
  {
    onchange = function () {calendar.update(calendar);}
    onblur = function () {calendar.onblur();}
  }this.calendarMonth = obj;
  
  obj = this.getElementById("calendarHour");
  if(this.hour != ""){ 
  		obj.value = this.hour;
  		if(obj.value.length == 1){
  			obj.value = "0" + obj.value;
  		}
  	}else if(this.hour == 0){
  		obj.value = "00";
  	}
  obj.onchange = function () {calendar.hour = obj.value;}
  obj.onfocus = function(){ calendarTimeChange = "calendarHour"; }
//  obj.onblur = function () {calendar.onblur();}
  this.calendarHour = obj;
   
  obj = this.getElementById("calendarMinute");
  if(this.minute != ""){ 
  		obj.value = this.minute;
  		if(obj.value.length == 1){
  			obj.value = "0" + obj.value;
  		}
  	}else if(this.minute == 0){
  		obj.value = "00";
  	}
  obj.onchange = function () {calendar.minute = obj.value;}
  obj.onfocus = function(){ calendarTimeChange = "calendarMinute"; }
//  obj.onblur = function () {calendar.onblur();}
  this.calendarMinute = obj;
  
  obj = this.getElementById("calendarSecond");
  if(this.second != ""){ 
  		obj.value = this.second;
  		if(obj.value.length == 1){
  			obj.value = "0" + obj.value;
  		}
  	}else if(this.second == 0){
  		obj.value = "00";
  	}
  obj.onchange = function () {calendar.second = obj.value;}
  obj.onfocus = function(){ calendarTimeChange = "calendarSecond"; }
//  obj.onblur = function () {calendar.onblur();}
  this.calendarSecond = obj;

  obj = this.getElementById("calendarToday");
//modified by wangsy 2013-04-18 for 方法移至日期控件本身属性
  obj.onclick = function () {calendar.goToday(calendar);}
  this.calendarToday = obj;

  obj = this.getElementById("calendarSubmit");
//modified by wangsy 2013-04-18 for 方法移至日期控件本身属性
  obj.onclick = function () {calendar.goSubmit(calendar);}
  this.calendarToday = obj;
  
  obj1 = this;
  if(dateFormat.indexOf('h')>= 0) {
  obj = this.getElementById("calendarTimeUp");
  obj.onclick = function () {
  	objchange = obj1.getElementById(calendarTimeChange);
  	objchangevalue = Number(objchange.value) + 1;
  	if(calendarTimeChange == "calendarHour" && objchangevalue == 24){
  		objchange.value = "00";
  		objchangevalue = 0;
  	}else if(objchangevalue == 60){
  		objchange.value = "00";
  		objchangevalue = 0;
  	}else {
  		objchange.value = objchangevalue;
  		if(objchange.value.length == 1){
	  		objchange.value = "0"+objchangevalue;
	  	}
  	}
  	if(calendarTimeChange == "calendarHour"){
  		obj1.hour = objchangevalue;
  	}else if(calendarTimeChange == "calendarMinute"){
  		obj1.minute = objchangevalue;
  	}else if(calendarTimeChange == "calendarSecond"){
  		obj1.second = objchangevalue;
  	}
  }
 
  
  obj = this.getElementById("calendarTimeDown");
  obj.onclick = function () {
  	objchange = obj1.getElementById(calendarTimeChange);
  	objchangevalue = Number(objchange.value) - 1;
  	if(calendarTimeChange == "calendarHour" && objchangevalue == -1){
  		objchange.value = "23";
  		objchangevalue = 23;
  	}else if(objchangevalue == -1){
  		objchange.value = "59";
  		objchangevalue = 59;
  	}else {
  		objchange.value = objchangevalue;
	  	if(objchange.value.length == 1){
	  		objchange.value = "0"+objchangevalue;
	  	}
  	}
  	if(calendarTimeChange == "calendarHour"){
  		obj1.hour = objchangevalue;
  	}else if(calendarTimeChange == "calendarMinute"){
  		obj1.minute = objchangevalue;
  	}else if(calendarTimeChange == "calendarSecond"){
  		obj1.second = objchangevalue;
  	}
  } }
}

//年份下拉框绑定数据
Calendar.prototype.bindYear = function() {
  var cy = this.calendarYear;//2006-12-01 由www.ttkc.net修改
  cy.length = 0;
  for (var i = this.beginYear; i <= this.endYear; i++){
    cy.options[cy.length] = new Option(i + Calendar.language["year"][this.lang], i);
  }
}

//月份下拉框绑定数据
Calendar.prototype.bindMonth = function() {
  var cm = this.calendarMonth;//2006-12-01 由www.ttkc.net修改
  cm.length = 0;
  for (var i = 0; i < 12; i++){
    cm.options[cm.length] = new Option(Calendar.language["months"][this.lang][i], i);
  }
}

//小时下拉框绑定数据
//Calendar.prototype.bindHour = function() {
//  var ch = this.calendarHour;
//  if(ch.length > 0){return;}//2009-03-03 不需要重新绑定，提高性能
//  //ch.length = 0;
//  var h;
//  for (var i = 0; i < 24; i++){
//    h = ("00" + i +"").substr(("" + i).length);
//    ch.options[ch.length] = new Option(h, h);
//  }
//}

//分钟下拉框绑定数据
//Calendar.prototype.bindMinute = function() {
//  var cM = this.calendarMinute;
//  if(cM.length > 0){return;}//2009-03-03 不需要重新绑定，提高性能
//  //cM.length = 0;
//  var M;
//  for (var i = 0; i < 60; i++){
//    M = ("00" + i +"").substr(("" + i).length);
//    cM.options[cM.length] = new Option(M, M);
//  }
//}

//秒钟下拉框绑定数据
//Calendar.prototype.bindSecond = function() {
//  var cs = this.calendarSecond;
//  if(cs.length > 0){return;}//2009-03-03 不需要重新绑定，提高性能
//  //cs.length = 0;
//  var s;
//  for (var i = 0; i < 60; i++){
//    s = ("00" + i +"").substr(("" + i).length);
//    cs.options[cs.length] = new Option(s, s);
//  }
//}

//向前一年
Calendar.prototype.goPrevYear = function(e){
  this.year--;
  this.date = new Date(this.year, this.month, 1);
  this.changeSelect();
  this.bindData();
}

//向后一年
Calendar.prototype.goNextYear = function(e){
  this.year++;
  this.date = new Date(this.year, this.month, 1);
  this.changeSelect();
  this.bindData();
}

//向前一月
Calendar.prototype.goPrevMonth = function(e){
  if (this.year == this.beginYear && this.month == 0){return;}
  this.month--;
  if (this.month == -1) {
    this.year--;
    this.month = 11;
  }
  this.date = new Date(this.year, this.month, 1);
  this.changeSelect();
  this.bindData();
}

//向后一月
Calendar.prototype.goNextMonth = function(e){
  if (this.year == this.endYear && this.month == 11){return;}
  this.month++;
  if (this.month == 12) {
    this.year++;
    this.month = 0;
  }
  this.date = new Date(this.year, this.month, 1);
  this.changeSelect();
  this.bindData();
}

//modified by wangsy 2013-04-18 for 日期控件按钮事件移至日期控件本身属性
//“现在”按钮事件
Calendar.prototype.goToday = function(e){
	
	var today = new Date();
	//modified by wangsy 2013-04-15 for “确定 ”按钮支持日期区间
	if(compareDate(today.format(this.dateFormatStyle),sDate)<0||compareDate(today.format(this.dateFormatStyle),eDate)>0){//早于起止日期，晚于结束日期
		return;
	}
this.ReturnDate(today.format(this.dateFormatStyle));
}
//“确定”按钮事件
Calendar.prototype.goSubmit = function(e){

	//zouqh 2013-09-09  当日期格式为yyyy-MM,月份为2,而天数为30时。new date(2013,1,30,0,0,0)的值为2013年3月份。
	//实际所选的值为2013年2月份，是由于2月份只有28或29天，而天数30,月就会加1变成了三月份。
	//所以，当日期格式为yyyy-MM时，为了避免类似情况发生，将天数均设置为1.
	if(cal.dateFormatStyle=='yyyy-MM'){
		this.day=1;
	}
	
	//当日期所选的天数大于每个月的最大天数的时，默认将日设置为1
	var year = parseInt(this.year);
	var month = parseInt(this.month)+1;
	var daysOfMonth = new Date(year,month,0).getDate();
	if(this.day>daysOfMonth){
		this.day=1;
	}
	
	if(this.TimeHInputError==1 || this.TimeMInputError==1 || this.TimeSInputError ==1){
		return false;
	}
	
	var today = new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);
	//modified by wangsy 2013-04-15 for “确定 ”按钮支持日期区间
	if(compareDate(today.format(this.dateFormatStyle),sDate)<0||compareDate(today.format(this.dateFormatStyle),eDate)>0){//早于起止日期，晚于结束日期
		return;
	}
this.ReturnDate(today.format(this.dateFormatStyle));
}
//“重置”按钮事件
Calendar.prototype.goReset = function(e){
	
	jQuery(".dfcalendarh").css("border","");
	jQuery(".dfcalendarm").css("border","");
	jQuery(".dfcalendars").css("border","");
	
	//calendar.ReturnDate(""); 
	//modified by wangsy 2013-04-15 for “重置”按钮支持日期区间
	nowdate = new Date();
	if(compareDate(nowdate.format(this.dateFormatStyle),sDate)<0||compareDate(nowdate.format(this.dateFormatStyle),eDate)>0){//早于起止日期，晚于结束日期
		return;
	}else{
		this.year = nowdate.getFullYear();
		this.month = nowdate.getMonth();
		this.day = nowdate.getDate();
		this.hour = nowdate.getHours();
		this.minute = nowdate.getMinutes();
		this.second = nowdate.getSeconds();
		this.date = new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);
 		this.TimeHInputError =0; 
 		this.TimeMInputError =0;
 		this.TimeSInputError =0;
		this.dateControl.value = nowdate.format(this.dateFormatStyle);
		this.changeSelect();
		this.bindData();
	}
}
//“取消”按钮事件直接使用返回ReturnDate("")

//改变SELECT选中状态
Calendar.prototype.changeSelect = function() {
  var cy = this.calendarYear;//2006-12-01 由www.ttkc.net修改
  var cm = this.calendarMonth;
  var ch = this.calendarHour;
  var cM = this.calendarMinute;
  var cs = this.calendarSecond;
//2006-12-30 由民工.砖家修改，减少运算次数
  cy[this.date.getFullYear()-this.beginYear].selected = true;
  cm[this.date.getMonth()].selected =true;
  
//2009-03-03 添加，初始化时间的值
//modified by wangsy 2013-04-16 update for 时间的初始化
//ch[this.hour].selected =true;
//cM[this.minute].selected =true;
//cs[this.second].selected =true;
this.calendarHour.value = (this.hour<10)?"0"+this.hour:this.hour;
this.calendarMinute.value = (this.minute<10)?"0"+this.minute:this.minute;
this.calendarSecond.value = (this.second<10)?"0"+this.second:this.second;
}

//更新年、月
Calendar.prototype.update = function (e){
  this.year  = e.calendarYear.options[e.calendarYear.selectedIndex].value;//2006-12-01 由www.ttkc.net修改
  this.month = e.calendarMonth.options[e.calendarMonth.selectedIndex].value;
  this.date = new Date(this.year, this.month, 1);
  //this.changeSelect();
  this.bindData();
}

    var selectcolor;
    var selectfontcolor;
	
//绑定数据到月视图
Calendar.prototype.bindData = function () {
  var calendar = this;
  var currDate;
 if(calendar.DateMode >= pickMode["month"]){return;}//2008-01-29
 // var dateArray = this.getMonthViewArray(this.date.getYear(), this.date.getMonth());
  //2006-12-30 由民工.砖家修改 在Firefox 下年份错误
  var dateArray = this.getMonthViewArray(this.date.getFullYear(), this.date.getMonth());
 var tds = this.getElementById("calendarTable").getElementsByTagName("td");
  for(var i = 0; i < tds.length; i++) {
  	tds[i].style.backgroundColor = calendar.colors["td_bg_out"];
  	if(i%7 ==0 || i%7 ==6){
  		tds[i].style.color = calendar.colors["sun_word"];
  	}else{
  		tds[i].style.color = "#333333";
  	}
  	
    tds[i].onclick = function () {return;}
    tds[i].onmouseover = function () {return;}
    tds[i].onmouseout = function () {return;}
    if (i > dateArray.length - 1) break;
    tds[i].innerHTML = dateArray[i];
    if (dateArray[i] != "&nbsp;"){
    	 currDate=this.year+"-"+(parseInt(this.month)+1)+"-"+dateArray[i];
//      tds[i].bgColorTxt = "td_bg_out"; //2009-03-03 保存背景色的class
        var cur = new Date();
        tds[i].isToday = false;
      if (cur.getFullYear() == calendar.date.getFullYear() && cur.getMonth() == calendar.date.getMonth() && cur.getDate() == dateArray[i]) {
      //是今天的单元格
        tds[i].style.backgroundColor = calendar.colors["cur_bg"];
		//tds[i].style.backgroundColor ="#a9a9a9";
        tds[i].bgColorTxt = "cur_bg";
		tds[i].style.color = "#ffffff";
        tds[i].isToday = true;
        }
    if(calendar.dateControl != null )
    {
      cur = calendar.dateControl.value.toDate(calendar.dateFormatStyle);
      if (cur.getFullYear() == calendar.date.getFullYear() && cur.getMonth() == calendar.date.getMonth()&& cur.getDate() == dateArray[i]) {
      //是已被选中的单元格
        calendar.selectedDayTD = tds[i];
        tds[i].style.backgroundColor = calendar.colors["sel_bg"];
        tds[i].bgColorTxt = "sel_bg";
      }
    }

      tds[i].onclick = function () {
            /*if(calendar.DateMode == pickMode["day"]) // 2009-03-03
														// 当选择日期时，点击格子即返回值
            {
                calendar.ReturnDate(new Date(calendar.date.getFullYear(),
                                                    calendar.date.getMonth(),
                                                    this.innerHTML).format(calendar.dateFormatStyle));
            }
            else
            {*/
                if(calendar.selectedDayTD != null) // 2009-03-03 清除已选中的背景色
                {
                    calendar.selectedDayTD.style.backgroundColor =(calendar.selectedDayTD.isToday)? calendar.colors["cur_bg"] : calendar.colors["td_bg_out"];
                    calendar.selectedDayTD.style.color = selectfontcolor;
                }
                this.style.backgroundColor = calendar.colors["sel_bg"];
                selectfontcolor = this.style.color;
                this.style.color = "#ffffff";
                
                
                selectcolor = calendar.colors["sel_bg"];
                calendar.day = this.innerHTML;
                calendar.selectedDayTD = this; // 2009-03-03 记录已选中的日子
            /*}*/
          }
      tds[i].style.cursor ="pointer"; // 2007-08-06 由www.ttkc.net添加，鼠标变成手指状
     
      tds[i].onmouseover = function () {   
    		selectcolor=this.style.backgroundColor;
        this.style.backgroundColor = calendar.colors["td_bg_over"];
      }
      tds[i].onmouseout = function () {
//        if(calendar.selectedDayTD != this) {
//        this.style.backgroundColor = calendar.colors[this.bgColorTxt];
//        }
    	  this.style.backgroundColor =selectcolor;
      }
      tds[i].onblur = function () {calendar.onblur();}
      //TODO wangjian add 
        if(compareDate(currDate,sDate)<0||compareDate(currDate,eDate)>0){//早于起止日期，晚于结束日期
   		 this.setReadOnly(tds[i]);
    	}else{
    		
    	}
    }
  }
}

//根据年、月得到月视图数据(数组形式)
Calendar.prototype.getMonthViewArray = function (y, m) {
  var mvArray = [];
  var dayOfFirstDay = new Date(y, m, 1).getDay();
  var daysOfMonth = new Date(y, m + 1, 0).getDate();
  for (var i = 0; i < 42; i++) {
    mvArray[i] = "&nbsp;";
  }
  for (var i = 0; i < daysOfMonth; i++){
    mvArray[i + dayOfFirstDay] = i + 1;
  }
  return mvArray;
}

//扩展 document.getElementById(id) 多浏览器兼容性 from meizz tree source
Calendar.prototype.getElementById = function(id){
  if (typeof(id) != "string" || id == "") return null;
  if (document.getElementById) return document.getElementById(id);
  if (document.all) return document.all(id);
  try {return eval(id);} catch(e){ return null;}
}

//扩展 object.getElementsByTagName(tagName)
Calendar.prototype.getElementsByTagName = function(object, tagName){
  if (document.getElementsByTagName) return document.getElementsByTagName(tagName);
  if (document.all) return document.all.tags(tagName);
}

//取得HTML控件绝对位置
Calendar.prototype.getAbsPoint = function (e){
  var x = e.offsetLeft;
  var y = e.offsetTop;
  while(e = e.offsetParent){
    //x += e.offsetLeft;
	x += e.offsetLeft-e.scrollLeft;
    //y += e.offsetTop;//;-e.scrollTop;
    y += e.offsetTop-e.scrollTop;
  }
  return {"x": x, "y": y};
};

//显示日历
Calendar.prototype.show = function (dateObj, popControl) {
  if (dateObj == null){
    throw new Error("arguments[0] is necessary");
  };
  this.dateControl = dateObj;
  var now =  new Date();
  this.date = (dateObj.value.length > 0) ? new Date(dateObj.value.toDate(this.dateFormatStyle)) : now.format(this.dateFormatStyle).toDate(this.dateFormatStyle) ;//2008-01-29 www.ttkc.net添加 → 若为空则根据dateFormatStyle初始化日期

  if(this.panel.innerHTML==""||cal.dateFormatStyleOld != cal.dateFormatStyle)//2008-01-29 把构造表格放在此处，2009-03-03 若请示的样式改变，则重新初始化
  {
 this.draw();
 this.bindYear();
 this.bindMonth();
// this.bindHour();
// this.bindMinute();
// this.bindSecond();
  }
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  this.day = this.date.getDate();
  this.hour = this.date.getHours();
  this.minute = this.date.getMinutes();
  this.second = this.date.getSeconds();
  this.changeSelect();
  this.bindData();

  if (popControl == null){
    popControl = dateObj;
  }
  
//日历控件出现位置，默认出现在输入框的下方 zouqh --2013-09-22
  var xy = this.getAbsPoint(popControl);
  this.panel.style.left = (xy.x + leftX)+ "px"; //由www.ttkc.net 2007-02-11 修改 → 加入自定义偏移量
  this.panel.style.top = (xy.y + topY + dateObj.offsetHeight) +3+ "px";

  var pos = getCalenderPosY(this.panel); //获取日历高度信息
  var calObjHeight = pos.height; 
  calObjHeight = (calObjHeight==null||calObjHeight==0)?320:calObjHeight; //日历的高度默认为320px

  var calObjToTop = xy.y - pos.bgTop; //日历输入框距离浏览器顶部的距离
  var calObjToBottom = pos.bgHeight + pos.bgTop - xy.y - 30; //日历输入框距离浏览器底部的距离
  if(calObjToBottom < calObjHeight&& calObjHeight < calObjToTop){
  	//日历距离浏览器底部距离小于日历高度，距离浏览器顶部距离大于日历高度，显示在输入框上方
  	this.panel.style.top = (xy.y + topY + dateObj.offsetHeight) - calObjHeight - 33 + "px";
  	
  }else if(calObjToBottom < calObjHeight&& calObjHeight > calObjToTop){
  	//日历距离浏览器底部距离小于日历高度，距离浏览器顶部距离小于日历高度，日历在垂直方向（Y）居中
  	if(calObjHeight>pos.bgHeight){
  		//浏览器可视高度小于日历高度，日历距离浏览器顶部3px
  		this.panel.style.top = pos.bgTop + 3 + "px";
  	}else{
  		//浏览器可视高度大于等于日历高度时，日历向垂直方向（Y）居中
  		this.panel.style.top = pos.bgTop+Math.round((pos.bgHeight - calObjHeight)/2) + "px"; //msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);
  	}
  }
  
  //由www.ttkc.net 2006-06-25 修改 → 把 visibility 变为 display，并添加失去焦点的事件  //this.setDisplayStyle("select", "hidden");
  //this.panel.style.visibility = "visible";
  //this.container.style.visibility = "visible";
  this.panel.style.display = "";
  this.container.style.display = "";
  
  if( !this.dateControl.isTransEvent)
  {
 this.dateControl.isTransEvent = true;
 /* 已写在返回值的时候  ReturnDate 函数中，去除验证事件的函数
 this.dateControl.changeEvent = this.dateControl.onchange;//将 onchange 转成其它函数，以免触发验证事件
 this.dateControl.onchange = function()
 {if(typeof(this.changeEvent) =='function'){this.changeEvent();}}*/
 if(this.dateControl.onblur != null){
 this.dateControl.blurEvent = this.dateControl.onblur;}//2007-09-14 保存主文本框的 onblur ，使其原本的事件不被覆盖
 this.dateControl.onblur = function()
 {calendar.onblur();if(typeof(this.blurEvent) =='function'){this.blurEvent();}
 }
  }
  
  this.container.onmouseover = function(){isFocus=true;}
  this.container.onmouseout = function(){isFocus=false;}
}

//隐藏日历
Calendar.prototype.hide = function() {
  //this.setDisplayStyle("select", "visible");
  //this.panel.style.visibility = "hidden";
  //this.container.style.visibility = "hidden";
  this.panel.style.display = "none";
  this.container.style.display = "none";
  isFocus=false;
  //移除日历面板以及日历对象
  jQuery(this.container).remove();
  if(cal!=null){
	  if (this.dateControl != null){
        //显示输入框的文字
        var claClassName= this.dateControl.className;//+=" calenderInputHidden";
        if(claClassName.indexOf('calenderInputHidden')>0){
        	 this.dateControl.value = '';
	         claClassName = claClassName.replace("calenderInputHidden","");
		     this.dateControl.className=claClassName;
        }
	  }
	  var bgObjName = cal.bgObjName;
	  //alert(bgObjName);
	  var bgObjs = jQuery('.'+bgObjName);
	  bgObjs.remove();  
  }
  cal = null;
};

//焦点转移时隐藏日历 → 由www.ttkc.net 2006-06-25 添加
Calendar.prototype.onblur = function() {
    if(!isFocus){
		if(calendar.selectedDayTD != null) // 2009-03-03 清除已选中的背景色
                {
                    calendar.selectedDayTD.style.backgroundColor =(calendar.selectedDayTD.isToday)? calendar.colors["cur_bg"] : calendar.colors["td_bg_out"];
                    calendar.selectedDayTD.style.color = selectfontcolor;
                }
				this.hide();
	}
};

//以下由www.ttkc.net 2007-07-26 修改 → 确保日历容器节点在 body 最后，否则 FireFox 中不能出现在最上方
function InitContainerPanel() //初始化容器
{
 var str = '<div id="calendarPanel" style="position: absolute;display: none;z-index:9999; background-color: #FFFFFF;border: 0px solid #CCCCCC;width:230px;font-size:12px;"></div>';
 if(document.all)
 {
  str += '<iframe style="position:absolute;z-index:2000;width:expression(this.previousSibling.offsetWidth);';
  str += 'height:expression(this.previousSibling.offsetHeight);';
  str += 'left:expression(this.previousSibling.offsetLeft);top:expression(this.previousSibling.offsetTop);';
  str += 'display:expression(this.previousSibling.style.display);" scrolling="no" frameborder="no"></iframe>';
 }
 var div = document.createElement("div");
 div.innerHTML = str;
 div.id = "ContainerPanel";
 div.style.display ="none";
 document.body.appendChild(div);
}//调用calendar.show(dateControl, popControl);


/*增加遮罩层Panel*/
function addPanel(obj){
    var bgObj = document.createElement("div");
    var ch=document.documentElement.clientHeight || document.body.clientHeight || 0;
    var ct=window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop || 0; 
    bgObj.name='calenderbgObj';
    bgObj.className = 'calenderbgObj';
    bgObj.style.position = "absolute";
    bgObj.style.top        = 0+"px";  
    bgObj.style.left       = 0+"px";  
    bgObj.style.width      = "100%";  
    bgObj.style.height     = ch +ct+ "px";  
    bgObj.style.zIndex     = obj.style.zIndex-10;  
    //bgObj.style.background = "#777";
    bgObj.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0,finishOpacity=0);";  
    bgObj.style.opacity    = "0"; 
    document.body.appendChild(bgObj);
    return bgObj;
}

/**
 * 设置限定日期区间解析成限定年、月、日、
 * @author:wangjian
 * @param obj 需要设置element对象
 * @param value 需要设置状态值
 */
Calendar.prototype.setReadOnly = function(obj){
	//obj.disabled="disabled";
    obj.style.color="gray";
   	obj.onclick = null;
}


/**
 * 设置日期比较
 * @author:wangjian
 * @param fDate 日期格式字符串 例如:2012-07-01 13:58:12
 * @param sDate 日期格式字符串 例如:2012-08-01 13:58:12
 */
function compareDate(fDate,sDate){
	  if(fDate==''||fDate==undefined) return 0;  
	  if(sDate==''||sDate==undefined) return 0;
      var fd = new Date(fDate.replace(/\-/g, "\/"));
      var sd = new Date(sDate.replace(/\-/g, "\/"));
      return fd-sd;
}

/*增加遮罩层Panel*/
function addPanel(obj){
    var bgObj = document.createElement("div");
    var ch=document.documentElement.clientHeight || document.body.clientHeight || 0;
    var ct=window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop || 0; 
    bgObj.name='calenderbgObj';
    bgObj.className = 'calenderbgObj';
    bgObj.style.position = "absolute";
    bgObj.style.top        = 0+"px";  
    bgObj.style.left       = 0+"px";  
    bgObj.style.width      = "100%";  
    bgObj.style.height     = ch +ct+ "px";  
    bgObj.style.zIndex     = obj.style.zIndex-10;  
    //bgObj.style.background = "#777";
    bgObj.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0,finishOpacity=0);";  
    bgObj.style.opacity    = "0"; 
    document.body.appendChild(bgObj);
    return bgObj;
}

//数字输入框
jQuery(".dfNumberInput").live("keydown",function(event){
	//alert(event.keyCode);//48-57数字键 8删除键 46delete键 116 F5键 37-40方向键
	if(!((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=37 && event.keyCode<=40) || event.keyCode==8 || event.keyCode==46 || event.keyCode==116 )){
		return false;
	}
});

//设置时间输入框校验
jQuery(".dfCalendarTimeInput").live("focus",function(){
	cal.TimeInputOldValue = jQuery(this).val();
});
jQuery(".dfCalendarTimeInput").live("blur",function(){
	var inputValue = Number(jQuery(this).val());
	var maxValue = null;
	if(jQuery(this).hasClass("dfcalendarh")){
		maxValue = 23;
	}else{
		maxValue = 59;
	}

	if(inputValue<0 || inputValue>maxValue || ((!Number(inputValue))&&inputValue!=0)){
		jQuery(this).css("border","2px solid #f7d1d2");
		if(jQuery(this).hasClass("dfcalendarh")){
			cal.TimeHInputError = 1;
		}else if(jQuery(this).hasClass("dfcalendarm")){
			cal.TimeMInputError = 1;
		}else if(jQuery(this).hasClass("dfcalendars")){
			cal.TimeSInputError = 1;
		}
		
	}else{
		jQuery(this).css("border","");
		if(inputValue<10){
			jQuery(this).val("0"+inputValue);
		}
		if(jQuery(this).hasClass("dfcalendarh")){
			cal.hour = inputValue;
			cal.TimeHInputError = 0;
		}else if(jQuery(this).hasClass("dfcalendarm")){
			cal.minute = inputValue;
			cal.TimeMInputError = 0;
		}else if(jQuery(this).hasClass("dfcalendars")){
			cal.second = inputValue;
			cal.TimeSInputError = 0;
		}
	}
});

//获取对象垂直高度相关信息
function getCalenderPosY(msgObj){
    var msgHeight= msgObj.scrollHeight;  
    var bgTop=window.pageYOffset   
            || document.documentElement.scrollTop   
            || document.body.scrollTop || 0;  
    var bgHeight=document.documentElement.clientHeight   
            || document.body.clientHeight || 0;   
    return {height:msgHeight,bgTop:bgTop,bgHeight:bgHeight};
}