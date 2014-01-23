var browserName=navigator.appName;
var browserVersion=navigator.appVersion;
function browser(){
    alert(browserName);
}
function browserversion(){
    alert(browserVersion);
}
/*=============== 控件 ================*/
//参数为相应输入框的id
$(document).ready(function(){
/* ========= 下拉输入框 =========== */ 
$(document).ready(function(){   
    $(".inputselect").live('click',function(){
        var selectspan = $(this).prev();
        while(true){
            if(selectspan.attr("class") == "selectspan"){
                var selectchildren = $(this).children();
                for(var i=0; i<selectchildren.length ; i++){
                    if(selectchildren[i].selected){
                        selectspan.text(selectchildren[i].innerHTML);
                    }
                }
                break;
            }else{
                selectspan = selectspan.prev();
                if(selectspan.length == 0){
                    break;
                }
            }
        }
    });
});



        
/*========= 复选框 ===========*/ 
$('.firerift-style').live('click', function() {
    checkboxID      = '#' + $(this).attr('rel');
    if($(checkboxID)[0].checked == false) {
        $(checkboxID)[0].checked = true;
        $(this).removeClass('off').addClass('on');
    } else {
        $(checkboxID)[0].checked = false;
        $(this).removeClass('on').addClass('off');
    }
});
        
$('.firerift-style-checkbox').each(function() {
    thisID      = $(this).attr('id');
    thisClass   = $(this).attr('class');

    switch(thisClass) {
        case "firerift-style-checkbox": setClass = "firerift-style";
        break;
    }
            
    $(this).addClass('hidden');
            
    if($(this)[0].checked == true)
        $(this).after('<div class="'+ setClass +' on" rel="'+ thisID +'">&nbsp;</div>');
    else
        $(this).after('<div class="'+ setClass +' off" rel="'+ thisID +'">&nbsp;</div>');
});

/*========= 圆型复选框 ===========*/ 
    $('.firerift-style-o').live('click', function() {
    
        checkboxID      = '#' + $(this).attr('rel');

        if($(checkboxID)[0].checked == false) {
        
            $(checkboxID)[0].checked = true;
            $(this).removeClass('off').addClass('on');
            
        } else {
            
            $(checkboxID)[0].checked = false;
            $(this).removeClass('on').addClass('off');
            
        }
    });
    
    $('.firerift-style-checkbox-o').each(function() {
        
        thisID      = $(this).attr('id');
        thisClass   = $(this).attr('class');

        switch(thisClass) {

            case "firerift-style-checkbox-o":
                setClass = "firerift-style-o";
            break;
        }
        
        $(this).addClass('hidden');
        
        if($(this)[0].checked == true)
            $(this).after('<div class="'+ setClass +' on" rel="'+ thisID +'">&nbsp;</div>');
        else
            $(this).after('<div class="'+ setClass +' off" rel="'+ thisID +'">&nbsp;</div>');
    });
/*========= 方型复选框 ===========*/ 
    $('.firerift-style-f').live('click', function() {
        
        checkboxID      = '#' + $(this).attr('rel');

        if($(checkboxID)[0].checked == false) {
        
            $(checkboxID)[0].checked = true;
            $(this).removeClass('off').addClass('on');
            
        } else {
            
            $(checkboxID)[0].checked = false;
            $(this).removeClass('on').addClass('off');
            
        }
    });
    
    $('.firerift-style-checkbox-f').each(function() {
        
        thisID      = $(this).attr('id');
        thisClass   = $(this).attr('class');

        switch(thisClass) {

            case "firerift-style-checkbox-f":
                setClass = "firerift-style-f";
            break;
        }
        
        $(this).addClass('hidden');
        
        if($(this)[0].checked == true)
            $(this).after('<div class="'+ setClass +' on" rel="'+ thisID +'">&nbsp;</div>');
        else
            $(this).after('<div class="'+ setClass +' off" rel="'+ thisID +'">&nbsp;</div>');
    });

/*========= 收放条 ===========*/ 
$(".function_line_hiddenButton").live('click',function(){
    $(this).removeClass('function_line_hiddenButton').addClass('function_line_showButton');
});

$(".function_line_showButton").live('click',function(){
    $(this).removeClass('function_line_showButton').addClass('function_line_hiddenButton');
});

/*========= 折叠菜单 ===========*/ 

$("li.parentMenu").click(function(){
    if($(this).siblings(".childMenu").css("display") == "block"){
        $(this).removeClass("parentMenu");
        $(this).addClass("parentMenuOpen");
    }else{
        $(this).removeClass("parentMenuOpen");
        $(this).addClass("parentMenu");
    }
    $(this).siblings(".childMenu").slideToggle(500);
});

/*========= 列表 ===========*/
$(".table tr:even").css("background","#ffffff");
$(".table tr:odd").css("background","#f4f4f4");
$(".table tr").live('click',function(){
    $(".table tr:even").css("background","#ffffff");
    $(".table tr:odd").css("background","#f4f4f4");
    $(this).css("background","#fff1f1");
});

/*========= 进度条 ===========*/
var progress1=document.getElementById("all-progress");
var progress2=document.getElementById("in-progress");
var progress3=document.getElementById("ratio");
if(progress1!=null || progress2!=null || progress3!=null ){
var width=(progress2.offsetWidth-1)/progress1.offsetWidth*100;
progress3.innerHTML=Math.round(width)+"%";
}
});
/*========= 下载附件 ===========*/
//$("#btn1").live("click", function(){
//          
//  $(".left_conDiv>b").each(function()
//      {
//          if($(this).find("input").attr("checked"))
//          {
//              $(this).find("a")[0].click();
//          }
//              
//      });
//
//  });


///**
// * 获取文件类型
// * @param file
// * @returns
// */
//function getFileType(file){
//  var fileindex=file.lastIndexOf('.');
//  var filetype=file.substring(fileindex+1,file.length);
//    filetype=filetype.toLowerCase();
//    //alert(filetype);
//  switch (filetype) {
//  case "doc":             break;
//  case "docx":            break;
//  case "xls":             break;
//  case "xlsx":            break;
//  case "ppt":             break;
//  case "pptx":            break;
//  case "txt":             break;
//  case "pdf":             break;
//  case "gif":             break;
//  case "jpg":             break;
//  case "png":             break;
//  case "psd":             break;
//  case "vsd":             break;
//  default: 
//      filetype = "Other";
//  }
//  
//  return filetype;
//}
//
///**
// * 
// * 参数
// * obj 下载列表，
// * url 源文件路径，
// * filename 下载文件名，
// * idv 复选框div的ID ，id
// * imgtype 下载文件的类名 className
// * 
// */
//function addloadfile(obj,url,filename,idv,imgtype){
//
//  
//  /*
//      添加的结构
//      <b id=''> 
//      <font> 
//      <input name='ckk'
//              type='checkbox' id=''
//              class='firerift-style-checkbox-o hidden' />
//      <div class="firerift-style-o off" id=""></div>
//      </font> 
//      <a href='' name='' target='_black'></a> 
//  */
//  //创建文件对象结构
//  var downItem=document.createElement("b");
//  var downItemFont=document.createElement("font");
//  var downItemInput=document.createElement("input");
//  var downItemDiv=document.createElement("div");
//  var downItemA=document.createElement("a");
//  
//  //设置对象样式
//  downItem.className=imgtype;
//  //downItem.style.backgroundImage="url(../images/df/fileExcel.gif)";
//  var fname=filename.toString();
//  var sn=6;
//  if(fname.length>sn){
//      var fileindex=fname.lastIndexOf('.');
//      var filetype=fname.substring(fileindex+1,fname.length);
//        filetype=filetype.toLowerCase();
//      fname=filename.substring(0,sn)+"***."+filetype;
//  }
//  downItem.innerHTML=fname+" ("+url+")";
//  
//  downItemInput.type="checkbox";
//  downItemInput.name="ckk";
//  downItemInput.className="firerift-style-checkbox-o hidden";
//  downItemInput.id="sample-checkbox-o-"+idv;
//  downItemInput.value=filename;
//  downItemDiv.className="firerift-style-o off";
//  downItemDiv.rel=downItemInput.id;
//  //downItemA.href=url;
//  //downItemA.target="_black";
//  
//  //加载对象
//  downItemFont.appendChild(downItemInput);
//  downItemFont.appendChild(downItemDiv);
//  downItem.appendChild(downItemFont);
//  downItem.appendChild(downItemA);
//  obj.appendChild(downItem);
//}
//
//function downloadfile(id,urls,filenames){
//  var obj=document.getElementById(id);
//  if(obj==null){
//      return null;
//  }
//  while(obj.firstChild!=null){
//      obj.removeChild(obj.firstChild);
//  }
//  
//  //var urls=['http://www.baidu.com','http://www.qq.com'];
//  //var filenames=['概要设计.doc','日志文件.ppt'];
//  
//  var idv;
//  var imgtype;
//  for(var i=0;i<urls.length;i++){
//      idv=Math.floor(Math.random()*10000);
//      imgtype="listIcon_"+getFileType(filenames[i]);
//      addloadfile(obj,urls[i],filenames[i],idv,imgtype);
//  }
//}



/* =============== 容器 ================ */
/* ========= 页签 =========== */  
/* =n-当前要切换的页签号，m-页签总数= */
$(document).ready(function() {
    $("td").live('click', function() {
        
        //获取最外层div
        var selectors=$(this).parent().parent().parent();
        var seldiv="dfpcttable";
        if(selectors.attr("class")==seldiv){
            
            //获取页卡头table的第一个tr
            var selcardtr=$(this).parent();
    
            //获取页卡体对象table
            var selbodytable=selectors.parent().children('div');
    
            //获取页卡头table的第一个tr内的所有td
            var tb=selcardtr.children();
    
            //确定当前被选页卡的位置参数
            var n=0;
    
            //设置页卡头
            for(var i=0;i<tb.length;i++){
                tb[i].className="sec1";
            }
            this.className="sec2";  
    
            //获取当前页卡位置
            for(var i=0;i<tb.length;i++){
                if(tb[i].className==this.className){
                    n=i;
                }
            }
    
            //获取页卡体内的所有div对象
            var tbh=selbodytable;
    
            //设置页卡体显示状态
            for(var i=0;i<tbh.length;i++){
                tbh[i].style.display = "none";
            }
            tbh[n].style.display = "block";
        }
    });
});
/* ========= 高级页签 =========== */ 
var new_tab_count=0;
$(function() {
    // 关闭(删除)tab
    $(".tabTitle>ul>li>label").live(
            "click",
            function() {
            var pId=$(this).parent().parent().parent().parent().attr('id');
                var objTitle = $("#"+pId+">div>ul>li");
                if (objTitle.length == 2
                        && $("#"+pId+">div>ul>li:last-child").html().toLowerCase()
                                .indexOf("label>") < 0) {
                    return;
                }
                if (objTitle.length == 1) {
                    return;
                }
                var li = $(this).parent();
                var index = objTitle.index(li);
                if (li.attr("id")=="tabSelect"){
                li.removeAttr("id");
                if(li.prev()){
                    li.prev().attr("id","tabSelect");
                    $("#"+pId+">div[class='tab_content']").eq(index-1).show();
                }else{
                    li.next().attr("id","tabSelect");
                    $("#"+pId+">div[class='tab_content']").eq(index+1).show();
                }
                li.remove();
                $("#"+pId+">div[class='tab_content']").eq(index).remove();
                }
                else{
                li.remove();
                $("#"+pId+">div[class='tab_content']").eq(index).remove();
                }
            });
    // tab切换、新建
    $(".tabTitle>ul>li").live(
            "click",
            function() {
                var pId=$(this).parent().parent().parent().attr('id');
                var index = $("#"+pId+">div>ul>li").index(this);
                if ((index + 1) == $("#"+pId+">div>ul>li").length
                        && $(this).text().replace(" ", "") == "*") {
                    new_tab_count++;
                    AddTab("新增" + new_tab_count, "content" + new_tab_count, pId);
                }
                for(var i=0; i<$("#"+pId+">div>ul>li").length; i++){
                    var liId=$("#"+pId).find("li")[i].id;
                    if(liId){break;}
                    }
                if ($("#"+pId+">div[class='tabTitle']>ul>li[id='tabSelect']").children().length > 0) {
                    $("#"+pId+">div[class='tabTitle']>ul>li[id='tabSelect']").children()[0].className = "tab_close";
                }
                $("#"+pId+">div[class='tabTitle']>ul>li[id='"+liId+"']").removeAttr("id");
                $(this).attr("id", "tabSelect");
                if ($(this).children().length > 0) {
                    $(this).children()[0].className = "tab_close1";
                }
                $("#"+pId+">div[class='tab_content']").hide();
                
                $("#"+pId+">div[class='tab_content']").eq(index).show();// 显示当前
            });
    // tab滚动
    $(".ScrollBtn").click(function() {
        var pId=$(this).parent().attr('id');
        if ($(this).index() == 0)// 左
        {
            var currentPosition = $("#"+pId+">div[class='tabTitle']").scrollLeft();
            $("#"+pId+">div[class='tabTitle']").get(0).scrollLeft = currentPosition - 50;
        } else {
            var currentPosition = $("#"+pId+">div[class='tabTitle']").scrollLeft();
            var maxLeft = $("#"+pId+">div[class='tabTitle']>ul>li:last-child").offset().left;
            if (maxLeft > $("#"+pId+">div[class='tabTitle']>ul>li:last-child").width() + 20) {
                $("#"+pId+">div[class='tabTitle']").get(0).scrollLeft = currentPosition + 50;
            }
        }
    });
});
// 添加tab
function AddTab(title, content, pID, isClose) {
    var needAdd = true;
    $("#"+pID+">div>ul>li").each(
            function() {
                if ($(this).text() == title) {
                    var index = $("#"+pID+">div>ul>li").index(this);
                    if ($("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").children().length > 0) {
                        $("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").children()[0].className = "tab_close";
                    }
                    $("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").removeAttr("id");
                    $(this).attr("id", "tabSelect");
                    if ($(this).children().length > 0) {
                        $(this).children()[0].className = "tab_close1";
                    }
                    $("#"+pID+">div[class='tab_content']").hide();// 全部隐藏
                    $("#"+pID+">div[class='tab_content']").eq(index).show();// 显示当前
                    needAdd = false;
                }
            });
    if (needAdd) {
        // 添加标题
        var tabTitleHtml = "";
        if (isClose == true)// 是否带有关闭按钮
        {
            tabTitleHtml = "<li>" + title
                    + "<label class='tab_close'></label></li>";
        } else {
            tabTitleHtml = "<li>" + title + "</li>";
        }
        if ($("#"+pID+">div>ul>li").length > 100) {
            alert("最多只能添加100个tab");
            return;
        }
        if ($("#"+pID+">div>ul>li:last-child").text().replace(" ", "") == "*") {
            $("#"+pID+">div>ul>li:last-child").html(
                    tabTitleHtml.replace("<li>", "").replace("</li>", ""));
            $("#"+pID+">div>ul").append("<li>*</li>");
        } else {
            $("#"+pID+">div>ul").append(tabTitleHtml);
        }
        // 添加内容
        var ContentHtml = "<div class='tab_content' style='display:none'>";
        if(content.substr(0,3)=="url"){
        ContentHtml += "<iframe src='"+content.substr(4)+ "' frameborder='0' width='100%' height='100%' ></iframe></div>";
        $("#"+pID).append(ContentHtml);
        }
        else{
        ContentHtml += content+ "</div>";
        $("#"+pID).append(ContentHtml);     
        }
        // 判断滚动条的出现
        if ($("#"+pID+">div>ul>li:last-child").offset().left > $(".tabTitle")
                .width()) {
            if ($(".ScrollBtn").css("display") == "block")
                return;
            $(".ScrollBtn").css("display", "block");
            var titleWidth = $(".tabTitle").width() - $(".ScrollBtn").width()
                    * 2;
            $(".tabTitle").css("width", titleWidth + "px");
        }
    }

}

// 按钮事件处理(测试用)
function TabAdd() {
    var title = $("#txtTabName").val();
    var content = $("#txtContent").val();
    var ID = $("#txtTabID").val();
    AddTab(title, content, ID, true);
}


//modified by wangsy2 2013-04-09 for add 获取层级方法  begin.
//本方法用于获取此元素的z-index，没有返回0
function getZIndex(thisObj){
    zIndex = null;
    zIndexObj = thisObj;

    while(true){
        if(zIndexObj.style.zIndex==""){
            if(zIndexObj.parentNode.localName != null){
                zIndexObj = zIndexObj.parentNode;
            }else{
                zIndex = 0;
                break;
            }
        }else{
            zIndex = zIndexObj.style.zIndex - 0 + 1;
            break;
        }
    }
    return zIndex;
}
function getDfZIndex(){
    zIndex = null;
    if(document.getElementById("dfZIndex")){
        zIndex = jQuery("#dfZIndex").attr("dfmaxzIndex");
    }else{
        zIndex = 1;
        var divZIndex = document.createElement("div");
        divZIndex.id = "dfZIndex";
        jQuery("body").append(divZIndex);
    }
    zzIndex = zIndex-0+1;
    jQuery("#dfZIndex").attr("dfmaxzIndex",zzIndex);
    return zIndex;
}
//modified by wangsy2 2013-04-09 for add 获取层级方法 end.

//本方法用于生成一个动态id，16位长度
//modified by wangsy2 2013-04-09 for add getNewId function begin.
function getNewId(){
    var newId = "";
    for(var i=0;i<4;i++){
        var ids = parseInt(String(Math.random()*10000));
        newId += String(ids);
    }
    return newId;
    
}
//modified by wangsy2 2013-04-09 for add getNewId function end.

/* ========= 弹出框事件 =========== */ 
/* 参数说明：new_win(触发点击事件的对象(this,用于存放窗口id),窗体宽度(number),窗体高度(number),"窗口名称","窗口内容(如想要内容以iframe的方式嵌入一个其它页面时，格式为“url:xxx.xxx”，如"url:http://www.baidu.com"；如果以非iframe的方式时，格式为“load:xxx.xxx”)",是否带遮罩层(boolean),是否居中(boolean),窗口横坐标(number),窗口纵坐标(number)) */
function new_win(thisObj,body_width,body_height,win_name,win_body,need_shade,isCenter,win_left,win_top){
    /*获取窗口id*/
    if(jQuery(thisObj).attr("dfWinId")){
        win_id = jQuery(thisObj).attr("dfWinId");
    }else{
        win_id = getNewId();
        jQuery(thisObj).attr("dfWinId",win_id);
    }
    /*判断窗口是否已生成*/
    if(document.getElementById(win_id)){
        document.getElementById(win_id).style.display = "";
    }else{
        /*获取窗口层级*/
        var win_z_index = getDfZIndex();
        
        if(win_body.substr(0,3) == "url" || win_body.substr(0,4) == "load"){
            var win_height = body_height + 36 ;
            var win_width = body_width + 2 ;
        }else{
            var win_height = body_height + 76 ;
            var win_width = body_width + 42 ;
        }
        var head_width = win_width - 2;
        
        var win_margin_top = document.body.scrollTop - win_height/2;
        var win_margin_left = document.body.scrollLeft - win_width/2;
    
        var win_style = "";
        if(isCenter){
            win_style = "width:"+win_width+"px; height:"+win_height+"px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: absolute;z-index:"+win_z_index+";";
        }else{
            win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;z-index:"+win_z_index+";";
        }
        
        var win_html = "";
        if(need_shade){
            shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth)+14;
            shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+10;
            win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=30);opacity:0.3;position: absolute;top:0px;left:0px;z-index:'+win_z_index+';"></div>'
        }
        
        win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">'
        +   '<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
        +       '<span class="win_name" style="" >'+win_name+'</span>'
        +       '<span class="win_cancel" style="width:12px;height:12px;" onclick="win_close('+"'"+win_id+"'"+')"></span>'
        +   '</div>'
        +   '<div class="win_body" style="width:'+body_width+'px;height:'+body_height+'px;';
        if(win_body.substr(0,3) == "url"){
            win_html += '" ><iframe id="'+win_id+'_iframe" src="'+win_body.substr(4)+'" style="width:100%;height:100%;border:0;"></iframe>';
        }else if(win_body.substr(0,4) == "load"){
            win_html += 'position: absolute;overflow:auto;"  id="loadDiv_'+win_id+'" >';
        }else{
            win_html += 'padding:20px;" >'+win_body;
        }
        win_html += '</div></div>';
        
        
        
        var div = document.createElement("div");
        div.id = win_id;
        div.innerHTML = win_html;
        div.style.zIndex = win_z_index;
        document.body.appendChild(div);
        if(win_body.substr(0,4) == "load"){
            jQuery("#loadDiv_"+win_id).load(win_body.substr(5));
        }
    }
}
/*导出*/
function export_win(body_width,body_height,win_name,win_id,win_body,need_shade,isCenter,win_left,win_top){
    if(document.getElementById(win_id)){
        document.getElementById(win_id).style.display = "";
    }else{
        if(win_body.substr(0,3) == "url"){
            var win_height = body_height + 36 ;
            var win_width = body_width + 2 ;
        }else{
            var win_height = body_height + 76 ;
            var win_width = body_width + 42 ;
        }
        var head_width = win_width - 2;
        
        var win_margin_top = document.body.scrollTop-win_height/2;
        var win_margin_left = document.body.scrollLeft-win_width/2;
    
        var win_style = "";
        if(isCenter){
            win_style = "width:"+win_width+"px; height:"+win_height+"px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: absolute;";
        }else{
            win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;";
        }
        
        var win_html = "";
        if(need_shade){
            shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth)+14;
            shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+10;
            win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
        }
        win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">'
        +   '<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
        +       '<span class="win_name" style="" >'+win_name+'</span>'
        +       '<span class="win_cancel" style="width:12px;height:12px;" onclick="win_close('+"'"+win_id+"'"+')"></span>'
        +   '</div>'
        +   '<div class="win_body" style="width:'+body_width+'px;height:'+body_height+'px;';
        if(win_body.substr(0,3) == "url"){
            win_html += '" ><iframe src="'+win_body.substr(4)+'?win_id='+win_id+'" style="width:100%;height:100%;border:0;" scrolling="no"></iframe>';
        }else{
            win_html += 'padding:20px;" >'+win_body;
        }
        win_html += '</div></div>';
        var div = document.createElement("div");
        div.id = win_id;
        div.style.zIndex = "9999";
        div.innerHTML = win_html;
        document.body.appendChild(div);
    }
}

//关闭div
function win_close(win_id){
    document.getElementById(win_id).style.display = "none";
}

//modified by jiangqx 2013-04-09 for 在导出点击取消时销毁窗口
function win_remove(win_id){
    jQuery("#"+win_id).remove();
}

//派发树返回array
/*function returnValueName(win_id) {
    var submitStringArray = new Array(0);
    //派发 值 1
    var distInputs = document.getElementsByName("distreturnname"); 
    if(distInputs != undefined && distInputs != null){
        for(var i=0; i<distInputs.length; i++){
            var distInputValue = distInputs[i].value;
            
            var strs = distInputValue.split(",");
            var tempObj = new Object();
            tempObj["busType"] = '1';
            tempObj["childName"] = strs[0];
            tempObj["childId"] = strs[1];
            tempObj["thisType"] = strs[2];
            submitStringArray[submitStringArray.length] = tempObj;
        }
    }
    //送审 值2
    var sendInputs = document.getElementsByName("sendreturnname"); 
    if(sendInputs != undefined && sendInputs != null){
        for(var i=0; i<sendInputs.length; i++){
            var sendInputValue = sendInputs[i].value;
            
            var strs = sendInputValue.split(",");
            var tempObj = new Object();
            tempObj["busType"] = '2';
            tempObj["childName"] = strs[0];
            tempObj["childId"] = strs[1];
            tempObj["thisType"] = strs[2];
            submitStringArray[submitStringArray.length] = tempObj;
        }
    }
    
    //抄送 值3
    var copyInputs = document.getElementsByName("copyreturnname"); 
    if(copyInputs != undefined && copyInputs != null){
        for(var i=0; i<copyInputs.length; i++){
            var copyInputValue = copyInputs[i].value;
            
            var strs = copyInputValue.split(",");
            var tempObj = new Object();
            tempObj["busType"] = '3';
            tempObj["childName"] = strs[0];
            tempObj["childId"] = strs[1];
            tempObj["thisType"] = strs[2];
            submitStringArray[submitStringArray.length] = tempObj;
        }
    }
    //test
    for(var i = 0; i<submitStringArray.length; i++){
        alert(submitStringArray[i]["busType"]);
        alert(submitStringArray[i]["childName"]);
        alert(submitStringArray[i]["childId"]);
        alert(submitStringArray[i]["thisType"]);
    }
    if(submitStringArray.length == 0) {
        alert("没有进行派发，请点击取消关闭！");
        return false;
    }else{
        win_close(win_id);
        return submitStringArray;
    }
}*/


function win_alert(win_name,win_body){
    shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
    var win_html = '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
    +   '<div class="win_border" style="top:30%;left:30%;position: absolute;">'
    +   '<div class="win_header" style="height:34px;" >'
    +       '<span class="win_name_alert" style="">'+win_name+'</span>'
    +       '<span class="win_cancel" style="width:12px;height:12px;" onclick="win_cancel_alert(this)"></span>'
    +   '</div>'
    +   '<div class="win_body" style="padding:20px;padding-bottom:10px;">'
    +   '   <div class="win_body_title">温馨提示</div>'
    +   '   <div style="font-size:12px;color:#3f3f3f;margin:30px;">'+win_body+'</div>'
    +   '   <div><table align="center" cellspacing=10px; border=0px;><tr><td><input type="button" value="确定" class="redbutton" onclick="win_close_alert(this)" /></td></tr></table></div>'
    +   '</div>'
    +  '</div>';
    
    var div = document.createElement("div");
    div.id = "win_alert";
    div.innerHTML = win_html;
    document.body.appendChild(div);
}

function win_close_alert(win_cancel){
    win_cancel.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
}
function win_cancel_alert(win_cancel){
    win_cancel.parentNode.parentNode.parentNode.style.display = "none";
}

/*参数说明：触发点击事件的对象(this,用于存放窗口id),后台处理的请求(String,必填),上传子页面(win-upload,必填),上传文件类型描述(String,仅支持英文,与fileExt同时存在),上传文件类型后缀名(String,与fileDesc同时存在),文件大小(Number,单位为KB,默认为100KB),上传文件数量(Number,默认为100)*/
function upload_win(thisObj,script,winUpload,fileDesc,fileExt,sizeLimit,queueSizeLimit){
    /*获取窗口id*/
    if(jQuery(thisObj).attr("dfWinId")){
        win_id = jQuery(thisObj).attr("dfWinId");
    }else{
        win_id = getNewId();
        jQuery(thisObj).attr("dfWinId",win_id);
    }
    body_width = 405;
    body_height = 445;
    win_name = '添加附件';
    if(winUpload!=null){
        win_body = winUpload;
    }else{
        alert("请配置上传子页面");
    }
    need_shade = true;
    isCenter = true;
    if(document.getElementById(win_id)){
        document.getElementById(win_id).style.display = "";
    }else{
        if(win_body.substr(0,3) == "url"){
            var win_height = body_height + 36 ;
            var win_width = body_width + 2 ;
            var win_width_ie7 = win_width + 10;
        }else{
            var win_height = body_height + 76 ;
            var win_width = body_width + 42 ;
        }
        var head_width = win_width - 2;
        var head_width_ie7 = win_width_ie7 - 2;
        
        var body_width_ie7 = body_width + 10;
        
        
        var win_margin_top = document.body.scrollTop-win_height/2;
        var win_margin_left = document.body.scrollLeft-win_width/2;
    
        var win_style = "";
        if(isCenter){
            win_style = "width:"+win_width+"px;*+width:"+win_width_ie7+"px; height:"+win_height+"px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: absolute;z-index:9999;";
        }else{
            win_style = "width:"+win_width+"px;*+width:"+win_width_ie7+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;";
        }
        
        var win_html = "";
        if(need_shade){
            shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth)+14;
            shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+10;
            win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
        }
        win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">'
        +   '<div class="win_header" style="width:'+head_width+'px;*+width:'+head_width_ie7+'px;height:34px;" >'
        +       '<span class="win_name" style=" " >'+win_name+'</span>'
        +       '<span class="win_cancel" style="width:12px;height:12px;" onclick="win_close('+"'"+win_id+"'"+')"></span>'
        +   '</div>'
        +   '<div class="win_body" style="width:'+body_width+'px;*+width:'+body_width_ie7+'px;height:'+body_height+'px;';
        
        win_html += '" ><iframe src="'+win_body.substr(4)+'?script='+script+'&fileDesc='+fileDesc+'&fileExt='+fileExt+'&sizeLimit='+sizeLimit+'&queueSizeLimit='+queueSizeLimit+'&win_id='+win_id+'" style="width:100%;height:100%;border:0;overflow:hidden;" scrolling="no"></iframe>';
        win_html += '</div></div>';
        var div = document.createElement("div");
        div.id = win_id;
        div.innerHTML = win_html;
        div.style.zIndex = '9999';
        document.body.appendChild(div);
    }
}

/* ========= 收缩域事件 =========== */ 
function div_hide(div_id){
    $("#"+div_id).hide(500);
}
function div_show(div_id){
    $("#"+div_id).show(500);
}
function div_toggle(div_id){
    $("#"+div_id).toggle(500);
}
//--> 