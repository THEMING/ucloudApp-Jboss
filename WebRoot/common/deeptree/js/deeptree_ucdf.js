var dfChangeSelectByKeyDownFlag = 0;//modify for 上下键选择
/*树形结构*/
function new_tree(body_width,body_height,win_ico,win_name,win_id,win_body,win_body1,dept_value,need_shade,isCenter,win_left,win_top,paramArray,dtConfirmFun,isSearchBox,fuzzySearchType,fuzzySearchDataType,isTabTree){
    if(document.getElementById(win_id)){
        if(dept_value!=null&&dept_value!=""){
            document.getElementById(win_id).style.display = "";
        }else{
            fuzzySearchType = fuzzySearchType==null?0:fuzzySearchType;
            if(fuzzySearchType==0){
                fuzzySearchDataType = 0;
            }else{
                if(fuzzySearchDataType==null || fuzzySearchDataType==0){
                    fuzzySearchDataType = 1;
                }
            }
            //window.frames["iframe"+win_id].location.reload();
            //document.getElementById(win_id).style.display = "";
            //解决右键清空后页面没有清空的问题
            var divId = document.getElementById(win_id);
            divId.parentNode.removeChild(divId);
            
            var win_height = body_height + 36 ;
            var win_width = body_width  ;
            
            var head_width = win_width - 2;
            
            var win_margin_top = -win_height/2;
            var win_margin_left = -win_width/2;
            var quirks_width = win_width + 15;
            var quirks_height = win_height - 5;
        
            var win_style = "";
            if(isCenter){
                win_style = "width:"+win_width+"px; height:"+win_height+"px;top:0px;left:0px;position:absolute;z-index:9999;";
            }else{
                win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;z-index:9999;";
            }
            
            var win_html = "";
            if(need_shade){
                shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth)-30;
                shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
                win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
            }
            win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">';
            if(document.documentMode < 7){
                win_html +='<div class="lightbox" style="width:'+quirks_width+'px; height:'+quirks_height+'px; "></div>';
            }else{
                win_html +='<div class="lightbox" style="width:'+win_width+'px; height:'+win_height+'px; "></div>';
            }
            win_html += '<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
            +       '<span class="win_name" style="background:url('+win_ico+') no-repeat; " >'+win_name+'</span>'
            +       '<span class="win_cancel" style="width:12px;height:12px;" onclick="win_close('+"'"+win_id+"'"+')"></span>'
            +   '</div>';
            if(isSearchBox == "1"){
                win_html += '<div class="searchhead" style="width:'+body_width+'px;padding-left:0px;height:55px;border-bottom:1px solid #eeeeee;">'
                +   '<div class="select_type" style="width:285px;">'
                +       '<div style="float:left;width:62px;">查找范围：</div>'
                +       '<input type="text" id="searchvalue1_iframe'+win_id+'" name="searchvalue1_iframe'+win_id+'" value="" readOnly="true"/><input type="hidden" id="hidserch_iframe'+win_id+'" name="hidserch"/>'
                +   '</div>'
                +   '<div class="inputKey" style="width:285px;">'
                +       '<div class="tree_sel_wrap" style="width: 60px;border: 1px solid #BBBBBB;margin-top:1px;float:left;">';
                
                if(fuzzySearchType==0){
                    win_html +='<span class="selectspan" >查全部</span>'
                        +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">'
                        +         '<option value="0">查全部</option>';
                }else{
                    if(fuzzySearchDataType==1){
                        win_html +='<span class="selectspan" >查组织</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        win_html +='<option value="1" selected>查组织</option>';
                        //win_html +='<option value="2">查人员</option>';
                    }else if(fuzzySearchDataType==2){
                        win_html +='<span class="selectspan" >查人员</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        //win_html +='<option value="1">查组织</option>';
                        win_html +='<option value="2" selected>查人员</option>';
                    }else if(fuzzySearchDataType==3){
                        win_html +='<span class="selectspan" >查组织</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        win_html +='<option value="1" selected>查组织</option>';
                        win_html +='<option value="2" >查人员</option>';
                    }else {
                        win_html +='<span class="selectspan" >查组织</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        win_html +='<option value="1" selected>查组织</option>';
                        win_html +='<option value="2" >查人员</option>';
                    }
                }
                win_html += '</select>'
                +       '</div>'
                +       '<input type="text" id="searchvalue_iframe'+win_id+'" name="searchname" value="" style="float:left;" onkeydown="showcontentByEnter(event,'+"'iframe"+win_id+"','" +win_body+"'"+',this,'+fuzzySearchType+','+fuzzySearchDataType+')"/><div class="searchbtn" style="margin-left:10px" onClick="showcontent('+"'iframe"+win_id+"','" +win_body+"'"+','+fuzzySearchType+','+fuzzySearchDataType+')"><span class="characters1">查找</span></div></div>'
                +   '</div>'
                +   '<div class="searchtab" id="searchtab_iframe'+win_id+'" style="display:none;top:100px;left:40px;width:250px">'
                +     '<div class="div_table_ser" style="width:250px;">'
                +       '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table_ser" id="table_ser_iframe'+win_id+'" align="center" fuzzySearchType="'+fuzzySearchType+'" fuzzySearchDataType="'+fuzzySearchDataType+'" win_id="iframe'+win_id+'">'
                //+         '<TR><TH WIDTH="40%">人员</TH><TH WIDTH="60%">所属组织</TH></TR>'
                +       '</table>'
                +     '</div>'
                +       '<div class="searchbtn1" onClick="showcontent1('+fuzzySearchType+','+fuzzySearchDataType+','+"'iframe"+win_id+"'"+')"><span class="characters1">选择</span></div>'
                +       '<div class="searchbtn2" onClick="closecontent1('+"'iframe"+win_id+"'"+')"><span class="characters1">取消</span></div>'
                +   '</div>';
                if(isTabTree==1){
                    //页卡begin
                    win_html +='<div class="treedfWinTabHead" style="width:'+(body_width-2)+'px">'
                    +           '<table class="treedfWinTabTable">'
                    +               '<tr><td class="treedfWinTabHead2"><div class="treeHeadSetLeft"></div><div class="treeHeadSet">组织树</div><div class="treeHeadSetRight"></div></td>'
                    +                   '<td class="treedfWinTabHead1" dfTabUrl="'+win_body1+'"><div class="treeHeadSetLeft"></div><div class="treeHeadSet">常用群组</div><div class="treeHeadSetRight"></div></td>'
                    +               '</tr>'
                    +           '</table></div>';
                    //页卡end
                }   
                win_html += '<div class="win_body" style="width:'+body_width+'px;height:'+(body_height-140)+'px;"><div style="width:100%;height:100%">';
            }else{
                win_html += '<div class="win_body" style="width:'+body_width+'px;height:'+(body_height-66)+'px;"><div style="width:100%;height:100%">'
            }               
            win_html += '<iframe src="'+win_body+'" style="width:100%;height:100%;border:0;" id="iframe'+win_id+'"  name="iframe'+win_id+'" marginwidth="0" frameborder="0" marginheight="0"></iframe>'
            +   '</div></div>';
            win_html += '<div class="win_body" style="width:'+body_width+'px;height:'+(body_height-140)+'px;display:none;"><div style="width:100%;height:100%">';
            win_html += '<iframe src="" style="width:100%;height:100%;border:0;" id="iframe'+win_id+'_tab2"  name="iframe'+win_id+'_tab2" marginwidth="0" frameborder="0" marginheight="0"></iframe>'
            +   '</div></div>';
            if(isTabTree==1){
                win_html += '<div align="center" style="background:#fff;height:33px;padding-top:7px;width:'+body_width+'px">'
                +       '<input type="button" value="确定" class="redbutton" onClick="returnValueNameTree('+"'iframe"+win_id+"','"+paramArray+"','"+dtConfirmFun+"'"+')">&nbsp;&nbsp;<input type="button" value="取消" class="graybutton" onClick="win_close('+"'"+win_id+"'"+')">'
                +   '</div>';   
            }else{
                win_html += '<div align="center" style="background:#fff;height:51px;padding-top:25px;width:'+body_width+'px">'
                +       '<input type="button" value="确定" class="redbutton" onClick="returnValueNameTree('+"'iframe"+win_id+"','"+paramArray+"','"+dtConfirmFun+"'"+')">&nbsp;&nbsp;<input type="button" value="取消" class="graybutton" onClick="win_close('+"'"+win_id+"'"+')">'
                +   '</div>';
            }           
            win_html += '</div>';
            
            var div = document.createElement("div");
            div.id = win_id;
            div.innerHTML = win_html;
            div.style.zIndex = '9999';
            document.body.appendChild(div);
            document.getElementById(win_id).style.display = "";
            win_border_obj = jQuery("#win_border_"+win_id);
            
            setObjMiddleX(win_border_obj[0]);
            setObjMiddleY(win_border_obj[0]);
            drag(win_border_obj[0], win_border_obj.children()[1]);
        }
    } else{
            fuzzySearchType = fuzzySearchType==null?0:fuzzySearchType;
            if(fuzzySearchType==0){
                fuzzySearchDataType = 0;
            }else{
                if(fuzzySearchDataType==null || fuzzySearchDataType==0){
                    fuzzySearchDataType = 1;
                }
            }
            if(isTabTree==null){
                isTabTree=0;
            }
            var win_height = body_height + 36 ;
            var win_width = body_width ;
            
            var head_width = win_width - 2;
            
            var win_margin_top = -win_height/2;
            var win_margin_left = -win_width/2;
            
            var quirks_width = win_width + 15;
            var quirks_height = win_height - 5;
        
            var win_style = "";
            if(isCenter){
                win_style = "width:"+win_width+"px; height:"+win_height+"px;top:0px;left:0px;position:absolute;z-index:9999;";
            }else{
                win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;z-index:9999;";
            }
            
            var win_html = "";
            if(need_shade){
                shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth)-30;
                shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
                win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
            }
            win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">';
            if(document.documentMode < 7){
                win_html +='<div class="lightbox" style="width:'+quirks_width+'px; height:'+quirks_height+'px; "></div>';
            }else{
                win_html +='<div class="lightbox" style="width:'+win_width+'px; height:'+win_height+'px; "></div>';
            }
            win_html += '<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
            +       '<span class="win_name" style="background:url('+win_ico+') no-repeat; " >'+win_name+'</span>'
            +       '<span class="win_cancel" style="width:12px;height:12px;" onclick="win_close('+"'"+win_id+"'"+')"></span>'
            +   '</div>';
            if(isSearchBox == "1"){
                win_html += '<div class="searchhead" style="width:'+body_width+'px;padding-left:0px;height:55px;border-bottom:1px solid #eeeeee;">'
                +   '<div class="select_type" style="width:285px;">'
                +       '<div style="float:left;width:62px;">查找范围：</div>'
                +       '<input type="text" id="searchvalue1_iframe'+win_id+'" name="searchname1" value="" readOnly="true"/><input type="hidden" id="hidserch_iframe'+win_id+'" name="hidserch"/>'
                +   '</div>'
                +   '<div class="inputKey" style="width:285px;">'
                +       '<div class="tree_sel_wrap" style="width: 60px;border: 1px solid #BBBBBB;margin-top:1px;float:left;">';
                
                if(fuzzySearchType==0){
                    win_html +='<span class="selectspan" >查全部</span>'
                        +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">'
                        +         '<option value="0">查全部</option>';
                }else{
                    if(fuzzySearchDataType==1){
                        win_html +='<span class="selectspan" >查组织</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        win_html +='<option value="1" selected>查组织</option>';
                        //win_html +='<option value="2">查人员</option>';
                    }else if(fuzzySearchDataType==2){
                        win_html +='<span class="selectspan" >查人员</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        //win_html +='<option value="1">查组织</option>';
                        win_html +='<option value="2" selected>查人员</option>';
                    }else if(fuzzySearchDataType==3){
                        win_html +='<span class="selectspan" >查组织</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        win_html +='<option value="1" selected>查组织</option>';
                        win_html +='<option value="2" >查人员</option>';
                    }else {
                        win_html +='<span class="selectspan" >查组织</span>'
                            +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                        win_html +='<option value="1" selected>查组织</option>';
                        win_html +='<option value="2" >查人员</option>';
                    }
                }
                win_html += '</select>'
                +   '</div>'
                +   '<input type="text" id="searchvalue_iframe'+win_id+'" name="searchname" value="" style="float:left;" onkeydown="showcontentByEnter(event,'+"'iframe"+win_id+"','" +win_body+"'"+',this,'+fuzzySearchType+','+fuzzySearchDataType+')"/><div class="searchbtn" style="margin-left:10px" onClick="showcontent('+"'iframe"+win_id+"','" +win_body+"'"+','+fuzzySearchType+','+fuzzySearchDataType+')"><span class="characters1">查找</span></div></div>'
                +   '</div>'
                +   '<div class="searchtab" id="searchtab_iframe'+win_id+'" style="display:none;top:100px;left:40px;width:250px">'
                +     '<div class="div_table_ser" style="width:250px;">'
                +       '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table_ser" id="table_ser_iframe'+win_id+'" align="center" fuzzySearchType="'+fuzzySearchType+'" fuzzySearchDataType="'+fuzzySearchDataType+'" win_id="iframe'+win_id+'">'
                //+         '<TR><TH WIDTH="40%">人员</TH><TH WIDTH="60%">所属组织</TH></TR>'
                +       '</table>'
                +     '</div>'
                +       '<div class="searchbtn1" onClick="showcontent1('+fuzzySearchType+','+fuzzySearchDataType+','+"'iframe"+win_id+"'"+')"><span class="characters1">选择</span></div>'
                +       '<div class="searchbtn2" onClick="closecontent1('+"'iframe"+win_id+"'"+')"><span class="characters1">取消</span></div>'
                +   '</div>';
                if(isTabTree==1){
                    //页卡begin
                    win_html +='<div class="treedfWinTabHead" style="width:'+(body_width-2)+'px">'
                    +           '<table class="treedfWinTabTable">'
                    +               '<tr><td class="treedfWinTabHead2" tabWinId="'+win_id+'"><div class="treeHeadSetLeft"></div><div class="treeHeadSet">组织树</div><div class="treeHeadSetRight"></div></td>'
                    +                   '<td class="treedfWinTabHead1" tabWinId="'+win_id+'_tab02" dfTabUrl="'+win_body1+'"><div class="treeHeadSetLeft"></div><div class="treeHeadSet">常用群组</div><div class="treeHeadSetRight"></div></td>'
                    +               '</tr>'
                    +           '</table></div>';
                    //页卡end
                }   
                win_html += '<div class="win_body" style="width:'+body_width+'px;height:'+(body_height-140)+'px;"><div style="width:100%;height:100%">';
            }else{
                win_html += '<div class="win_body" style="width:'+body_width+'px;height:'+(body_height-66)+'px;"><div style="width:100%;height:100%">'
            }               
            win_html += '<iframe src="'+win_body+'" style="width:100%;height:100%;border:0;" id="iframe'+win_id+'"  name="iframe'+win_id+'" marginwidth="0" frameborder="0" marginheight="0"></iframe>'
            +   '</div></div>';
            win_html += '<div class="win_body" style="width:'+body_width+'px;height:'+(body_height-140)+'px;display:none;"><div style="width:100%;height:100%">';
            win_html += '<iframe src="" style="width:100%;height:100%;border:0;" id="iframe'+win_id+'_tab2"  name="iframe'+win_id+'_tab2" marginwidth="0" frameborder="0" marginheight="0"></iframe>'
            +   '</div></div>';
            if(isTabTree==1){
                win_html += '<div align="center" style="background:#fff;height:33px;padding-top:7px;width:'+body_width+'px">'
                +       '<input type="button" value="确定" class="redbutton" onClick="returnValueNameTree('+"'iframe"+win_id+"','"+paramArray+"','"+dtConfirmFun+"'"+')">&nbsp;&nbsp;<input type="button" value="取消" class="graybutton" onClick="win_close('+"'"+win_id+"'"+')">'
                +   '</div>';   
            }else{
                win_html += '<div align="center" style="background:#fff;height:51px;padding-top:25px;width:'+body_width+'px">'
                +       '<input type="button" value="确定" class="redbutton" onClick="returnValueNameTree('+"'iframe"+win_id+"','"+paramArray+"','"+dtConfirmFun+"'"+')">&nbsp;&nbsp;<input type="button" value="取消" class="graybutton" onClick="win_close('+"'"+win_id+"'"+')">'
                +   '</div>';
            }           
            win_html += '</div>';
            var div = document.createElement("div");
            div.id = win_id;
            div.innerHTML = win_html;
            div.style.zIndex = '9999';
            document.body.appendChild(div);
            document.getElementById(win_id).style.display = "";
            win_border_obj = jQuery("#win_border_"+win_id);
            
            setObjMiddleX(win_border_obj[0]);
            setObjMiddleY(win_border_obj[0]);
            drag(win_border_obj[0], win_border_obj.children()[1]);
    }
}

/*派发树结构*/
function new_distributetree(body_width,body_height,win_ico,win_name,win_id,win_body,need_shade,isCenter,win_left,win_top,isUseful,input1,input2,_operGridId,fuzzySearchType,fuzzySearchDataType,isTabTree,tabTree,returnValue){
    if(document.getElementById(win_id)){
        document.getElementById(win_id).style.display = "";
    } else{
        //设置查询类型和查询数据类型的默认值
        fuzzySearchType = fuzzySearchType==null?0:fuzzySearchType;
        if(fuzzySearchType==0){
            fuzzySearchDataType = 0;
        }else{
            if(fuzzySearchDataType==null || fuzzySearchDataType==0){
                fuzzySearchDataType = 1;
            }
        }
        if(isTabTree==null){
            isTabTree=0;
        }
            var win_height = body_height + 76 ;
            var win_width = body_width + 42 ;
            
            var head_width = win_width - 2;
            
            var win_margin_top = document.body.scrollTop-win_height/2;
            var win_margin_left = document.body.scrollLeft-win_width/2;
            
            var isUsefulSum = eval(isUseful.join("+"));
            
            var win_style = "";
            if(isCenter){
                win_style = "width:"+win_width+"px; height:"+win_height+"px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: absolute;z-index:9999;";
            }else{
                win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;z-index:9999;";
            }
            
            var win_html = "";
            if(need_shade){
                shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth)-30;
                shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
                win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
            }
            win_html += '<div class="box" id="box'+win_id+'">';
            if(document.documentMode < 7){
                win_html +='<div class="distrilightbox" style="width:884px;height:487px; "></div>';
            }else{
                win_html +='<div class="distrilightbox" style="width:880px; height:480px; "></div>';
            }
            win_html += '<div class="item"><div class="delete" onclick="win_close('+"'"+win_id+"'"+')"></div>所有联系人</div>'
            +   '<div class="searchhead">'
            +   '<div class="select_type">'
            +       '<div style="float:left">查找范围：</div>'
            +       '<input type="text" id="searchvalue1_iframe'+win_id+'" name="searchname1" value="" readOnly="true"/><input type="hidden" id="hidserch_iframe'+win_id+'" name="hidserch"/>'
            +   '</div>'
            +   '<div class="inputKey">'
            +       '<div class="tree_sel_wrap" style="width: 60px;border: 1px solid #BBBBBB;margin-top:1px;float:left;">';
            
            if(fuzzySearchType==0){
                win_html +='<span class="selectspan" >查全部</span>'
                    +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">'
                    +         '<option value="0">查全部</option>';
            }else{
                if(fuzzySearchDataType==1){
                    win_html +='<span class="selectspan" >查组织</span>'
                        +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                    win_html +='<option value="1" selected>查组织</option>';
                    win_html +='<option value="2">查人员</option>';
                }else if(fuzzySearchDataType==2){
                    win_html +='<span class="selectspan" >查人员</span>'
                        +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                    win_html +='<option value="1">查组织</option>';
                    win_html +='<option value="2" selected>查人员</option>';
                }else if(fuzzySearchDataType==3){
                    win_html +='<span class="selectspan" >查组织</span>'
                        +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                    win_html +='<option value="1" selected>查组织</option>';
                }else {
                    win_html +='<span class="selectspan" >查人员</span>'
                        +      '<select class="inputselect"  id="treeSelw_iframe'+win_id+'">';
                    win_html +='<option value="2" selected>查人员</option>';
                }
            }
            
            win_html += '</select>'
            +       '</div>'
            +       '<input type="text" id="searchvalue_iframe'+win_id+'" name="searchname" value="" style="float:left;" onkeydown="showcontentByEnter(event,'+"'iframe"+win_id+"','" +win_body+"'"+',this,'+fuzzySearchType+','+fuzzySearchDataType+')" /><div class="searchbtn" onClick="showcontent('+"'iframe"+win_id+"','" +win_body+"'"+','+fuzzySearchType+','+fuzzySearchDataType+')"><span class="characters1">查找</span></div></div>'
            +   '</div>'
            +   '<div class="searchtab" id="searchtab_iframe'+win_id+'" style="display:none">'
            +     '<div class="div_table_ser">'
            +       '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table_ser" id="table_ser_iframe'+win_id+'" align="center" fuzzySearchType="'+fuzzySearchType+'" fuzzySearchDataType="'+fuzzySearchDataType+'" win_id="iframe'+win_id+'">'
            +       '</table>'
            +     '</div>'
            +       '<div class="searchbtn1" onClick="showcontent1('+fuzzySearchType+','+fuzzySearchDataType+','+"'iframe"+win_id+"'"+')"><span class="characters1">选择</span></div>'
            +       '<div class="searchbtn2" onClick="closecontent1('+"'iframe"+win_id+"'"+')"><span class="characters1">取消</span></div>'
            +   '</div>'
            +   '<div class="content">';
            var tabTreeWidth = 20;
            if(isTabTree==1){
                 tabTreeWidth = 7;
                //页卡begin
                win_html +='<div class="treedfWinTabHead">'
                +           '<table class="treedfWinTabTable">'
				+				'<tr><td class="treedfWinTabHead2"><div class="treeHeadSetLeft"></div><div class="treeHeadSet">组织树</div><div class="treeHeadSetRight"></div></td>';
				for(i=0; i<tabTree.length; i++){
					win_html +=		'<td class="treedfWinTabHead1" dfTabUrl="'+tabTree[i][1]+'"><div class="treeHeadSetLeft"></div><div class="treeHeadSet">'+tabTree[i][0]+'</div><div class="treeHeadSetRight"></div></td>';
				}
				win_html +=		'</tr>'
                +           '</table></div>';
                //页卡end
            }   
            win_html += '<div class="left">'
            +   '<div class="left_unit"><iframe src="'+win_body+'" style="width:100%;height:100%;border:0;" id="iframe'+win_id+'" name="iframe'+win_id+'" marginwidth="0" frameborder="0" marginheight="0"></iframe></div>'
			+	'</div>';
			if(isTabTree==1){
				for(i=0; i<tabTree.length; i++){
					win_html += '<div class="left" style="display:none;">'
						+		'<div class="left_unit"><iframe src="" style="width:100%;height:100%;border:0;" id="iframe'+win_id+'_tab'+(i+2)+'" name="iframe'+win_id+'_tab'+(i+2)+'" marginwidth="0" frameborder="0" marginheight="0"></iframe></div>'
						+	'</div>';
				}
			}
			win_html +=	'<div class="mid">'
			+	'<div class="btn01" onClick="contentdisplay(1,'+"'iframe"+win_id +"',"+isUseful+','+tabTree.length+')" ';
			if(isUseful[0] == 0){
				win_html +=	'style="display:none;"';
			}
			win_html +=	'><span class="characters1">派发</span></div><div class="btn02" onClick="contentdisplay(2,'+"'iframe"+win_id +"',"+isUseful+','+tabTree.length+')"';
			if(isUseful[1] == 0){
				win_html +=	'style="display:none;"';
			}			
			win_html += '><span class="characters1">送审</span></div><div class="btn03" onClick="contentdisplay(3,'+"'iframe"+win_id +"',"+isUseful+','+tabTree.length+')"';
			if(isUseful[2] == 0){
                win_html += 'style="display:none;"';
            }
            win_html += '><span class="characters1">抄送</span></div></div>'
                
            +   '<div class="right">'
            +   '<div class="right_scrol"></div>'
            +   '<div ';
            if(isUseful[0] == 0){
                win_html += 'style="display:none;"';
            }
            win_html += '><div class="tab"><span  style=" font-family:宋体; font-size:12px; font-weight:bold; width:30px; height:15px; margin-left:10px; margin-top:5px;   background-color:#FFF; border-top:1px solid #bbbbbb; border-left:1px solid #bbbbbb; border-right:1px solid #bbbbbb; float:left; line-height:15px; text-align:center;">派发</span></div>'
            +   '<div class="tabContent01" name="distdisplayiframe'+win_id+'" id="distdisplayiframe'+win_id+'"'
            if(isUseful[0] == 1 && isUsefulSum == 2){
                win_html += 'style="height:138px;"';
            }else if(isUseful[0] == 1 && isUsefulSum == 1){
                win_html += 'style="height:299px;"';
            }
            win_html += '></div></div>'
            +   '<div ';
            if(isUseful[1] == 0){
                win_html += 'style="display:none;"';
            }
            win_html += '><div class="tab"><span style=" font-family:宋体; font-size:12px; font-weight:bold; width:30px; height:15px; margin-left:10px; margin-top:5px;   background-color:#FFF; border-top:1px solid #bbbbbb; border-left:1px solid #bbbbbb; border-right:1px solid #bbbbbb; float:left; line-height:15px; text-align:center;">送审</span></div>'
            +   '<div class="tabContent02" name="senddisplayiframe'+win_id+'" id="senddisplayiframe'+win_id+'"';
            if(isUseful[1] == 1 && isUsefulSum == 2){
                win_html += 'style="height:138px;"';
            }else if(isUseful[1] == 1 && isUsefulSum == 1){
                win_html += 'style="height:299px;"';
            }
            win_html += '></div></div>'
            +   '<div ';
            if(isUseful[2] == 0){
                win_html += 'style="display:none;"';
            }
            win_html += '><div class="tab"><span style=" font-family:宋体; font-size:12px; font-weight:bold; width:30px; height:15px; margin-left:10px; margin-top:5px;   background-color:#FFF; border-top:1px solid #bbbbbb; border-left:1px solid #bbbbbb; border-right:1px solid #bbbbbb; float:left; line-height:15px; text-align:center;">抄送</span></div>'
            +   '<div class="tabContent02" name="copydisplayiframe'+win_id+'" id="copydisplayiframe'+win_id+'"';
            if(isUseful[2] == 1 && isUsefulSum == 2){
                win_html += 'style="height:138px;"';
            }else if(isUseful[2] == 1 && isUsefulSum == 1){
                win_html += 'style="height:299px;"';
            }
            win_html += '></div></div>'
            +   '</div>'
            +   '</div>'
			
			+	'<div class="foot">'
			+	'<div class="btn_yes" style="margin-top:'+tabTreeWidth+'px" onClick="returnValueName('+"'"+win_id+"','"+input1+"','"+input2+"','"+_operGridId+"'"+')"></div>'
			+	'<div class="btn_no" style="margin-top:'+tabTreeWidth+'px"  onclick="win_close('+"'"+win_id+"'"+')"></div>'
			+	'</div>'
			+	'</div>';
			
			var div = document.createElement("div");
			div.id = win_id;
			div.innerHTML = win_html;
			div.style.zIndex = '9999';
			document.body.appendChild(div);
			document.getElementById(win_id).style.display = "";
	         win_border_obj = jQuery("#box"+win_id);
	            
	            setObjMiddleX(win_border_obj[0]);
	            setObjMiddleY(win_border_obj[0]);
	            drag(win_border_obj[0], win_border_obj.children()[1]);
	}
	//tanjing add begin派发内容返回
	if(typeof(returnValue) != "undefined"){
	    var distreturnname = "distreturnnameiframe"+win_id;
        var sendreturnname = "sendreturnnameiframe"+win_id;
        var copyreturnname = "copyreturnnameiframe"+win_id;
        var distdisplayHtml = document.getElementById("distdisplayiframe"+win_id);
        var senddisplayHtml = document.getElementById("senddisplayiframe"+win_id);
        var copydisplayHtml = document.getElementById("copydisplayiframe"+win_id);
        var returnValueL = returnValue.length;
        for(var i=0;i<returnValueL;i++){
                var testdistid = document.getElementById("dist"+returnValue[i][1]+"iframe"+win_id);
                var testsendid = document.getElementById("send"+returnValue[i][1]+"iframe"+win_id);
                var testcopyid = document.getElementById("copy"+returnValue[i][1]+"iframe"+win_id);
                if(returnValue[i][0] == "1" && testdistid == null){
                    var displayhtml = "<table>";
                    displayhtml += "<tr id="+"'dist"+returnValue[i][1]+"iframe"+win_id+"'"+"><td><input type='hidden' value='"+returnValue[i][2]+","+returnValue[i][1]+","+returnValue[i][4]+","+returnValue[i][3]+"' name="+distreturnname+"><span>" + returnValue[i][2] + "</span></td><td><span>" + returnValue[i][3] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
                    displayhtml += "</table>";
                    distdisplayHtml.innerHTML += displayhtml;
                }else if (returnValue[i][0] == "2" && testsendid == null){
                    var displayhtml = "<table>";
                    displayhtml += "<tr id="+"'send"+returnValue[i][1]+"iframe"+win_id+"'"+"><td><input type='hidden' value='"+returnValue[i][2]+","+returnValue[i][1]+","+returnValue[i][4]+","+returnValue[i][3]+"' name="+distreturnname+"><span>" + returnValue[i][2] + "</span></td><td><span>" + returnValue[i][3] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
                    displayhtml += "</table>";
                    senddisplayHtml.innerHTML += displayhtml;
                }else if(returnValue[i][0] == "3" && testcopyid == null){
                    var displayhtml = "<table>";
                    displayhtml += "<tr id="+"'copy"+returnValue[i][1]+"iframe"+win_id+"'"+"><td><input type='hidden' value='"+returnValue[i][2]+","+returnValue[i][1]+","+returnValue[i][4]+","+returnValue[i][3]+"' name="+distreturnname+"><span>" + returnValue[i][2] + "</span></td><td><span>" + returnValue[i][3] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
                    displayhtml += "</table>";
                    copydisplayHtml.innerHTML += displayhtml;
                }
        }
	    /*
		var testdistid = document.getElementById("dist"+returnValue[0]+"iframe"+win_id);
		var testsendid = document.getElementById("send"+returnValue[0]+"iframe"+win_id);
		var testcopyid = document.getElementById("copy"+returnValue[0]+"iframe"+win_id);
		var distreturnname = "distreturnnameiframe"+win_id;
		var sendreturnname = "sendreturnnameiframe"+win_id;
		var copyreturnname = "copyreturnnameiframe"+win_id;
		var distdisplayHtml = document.getElementById("distdisplayiframe"+win_id);
		var senddisplayHtml = document.getElementById("senddisplayiframe"+win_id);
		var copydisplayHtml = document.getElementById("copydisplayiframe"+win_id);
		var returnValueL = returnValue.length;
		if(testdistid == null && testsendid == null && testcopyid == null && isUseful[0] == 1){
			for(var i=0;i<returnValueL;i++){
				if(returnValue[i][0] == "1"){
					var displayhtml = "<table>";
					displayhtml += "<tr id="+"'dist"+returnValue[i][1]+"iframe"+win_id+"'"+"><td><input type='hidden' value='"+returnValue[i][2]+","+returnValue[i][1]+","+returnValue[i][4]+","+returnValue[i][3]+"' name="+distreturnname+"><span>" + returnValue[i][2] + "</span></td><td><span>" + returnValue[i][3] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
					displayhtml += "</table>";
					distdisplayHtml.innerHTML += displayhtml;
				}else if (returnValue[i][0] == "2"){
					var displayhtml = "<table>";
					displayhtml += "<tr id="+"'send"+returnValue[i][1]+"iframe"+win_id+"'"+"><td><input type='hidden' value='"+returnValue[i][2]+","+returnValue[i][1]+","+returnValue[i][4]+","+returnValue[i][3]+"' name="+distreturnname+"><span>" + returnValue[i][2] + "</span></td><td><span>" + returnValue[i][3] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
					displayhtml += "</table>";
					senddisplayHtml.innerHTML += displayhtml;
				}else if(returnValue[i][0] == "3"){
					var displayhtml = "<table>";
					displayhtml += "<tr id="+"'copy"+returnValue[i][1]+"iframe"+win_id+"'"+"><td><input type='hidden' value='"+returnValue[i][2]+","+returnValue[i][1]+","+returnValue[i][4]+","+returnValue[i][3]+"' name="+distreturnname+"><span>" + returnValue[i][2] + "</span></td><td><span>" + returnValue[i][3] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
					displayhtml += "</table>";
					copydisplayHtml.innerHTML += displayhtml;
				}
			}			
		}
		*/
	}
	//end
}

//派发树查找
function showcontent(win_id,win_body,fuzzySearchType,fuzzySearchDataType){//fuzzySearchType:查询类型；fuzzySearchDataType:查询数据类型
    var servalue = document.getElementById('searchvalue_'+win_id).value;
    if(servalue.length<2){//modify for 至少2个字
        //win_alert("小提示","查询条件至少2个字");
        alert("查询条件至少2个字");
        jQuery("#searchvalue").focus();
        return false;
    }
    var serLimId = document.getElementById('hidserch_'+win_id).value;
    if(serLimId == 1){
        alert("查找范围不能为中国联通");
        return false;
    }
    fuzzySearchDataType = jQuery("#treeSelw_"+win_id).val();
    if(servalue!=""){
        if(fuzzySearchType==0){//前台查询
            document.getElementById("searchtab_"+win_id).style.display = "";
            var iframetree = jQuery("#"+win_id)[0].contentWindow;
            jQuery("#table_ser_"+win_id).empty();
            var num=0;
            var table=document.getElementById("table_ser_"+win_id);
            jQuery(table).append('<TR><TH WIDTH="40%">人员/组织</TH><TH WIDTH="60%">所属组织</TH></TR>')
            iframetree.jQuery(".TreeNode").each(function(){
                if(jQuery(this).attr('realid')== serLimId){
                    jQuery(this).next().find(".TreeNode").each(function(){
                        var divobj=jQuery(this);
                        var myregex = new RegExp(servalue);
                        var mytext = divobj.attr('text');
                        var ismatch = myregex.test(mytext);
                        var td="";
                        var text="";
                        var tr="";
                        var htmlid = divobj.attr('id');                 
                        if(ismatch && servalue != ""){
                            var tbody=table.childNodes[0];
                            var thisObj = iframetree.getObjectById(htmlid);
                            var parentObj = iframetree.getParentName(thisObj);
                            var tdvalue = new Array();
                            tdvalue[0] = divobj.attr('text');
                            tdvalue[1] = parentObj["parentName"];
                            num++;
                            if(num>0){
                                //modified by wangsy 2013-9-16 update for 点击事件兼容IE
                                var html = '<tr class="tr_ser" onclick="changeSelectTr(this)" >';
                                for(var i=0;i<tdvalue.length;i++){
                                    html += '<td class="td_ser">'+tdvalue[i]+'</td>';
                                }
                                html += '<td class="td_ser" style="display:none;">'+"<input type='hidden' id='hidid_"+win_id+"' name='hidid' value='"+htmlid+"'></input>"+'</td>';
                                html += '</tr>';
                                jQuery(tbody).append(html);
                            }
                        }
                    });
                }
            });
        }else{//后台查询
            var searchDataType=jQuery("#treeSelw_"+win_id).val();
            var url ='';
            if(searchDataType == 1){
                url = PATH+ '/commonData/proxy4AUserAndOrg/findOrgsByOrgIdAndName.json?method=POST';
            }else{
                url = PATH+ '/commonData/proxy4AUserAndOrg/findUserEntityByCloudOrgIdAndEmpName.json?method=POST';
            }
            jQuery.ajax({
                type: "post",
                url: url,
                dataType: "json",
                data: "searchScope="+serLimId+"&searchDataType="+searchDataType+"&searchText="+servalue+"&pageCount="+1+"&pageSize="+1,//查询数据类型、跳转页数、每页条数待完善
                async: false,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                beforeSend: function(XMLHttpRequest){
                },
                success: function(data, textStatus){
                    if(data && data.length > 0){
                        var table=document.getElementById("table_ser_"+win_id);
                        var html = "";
                        if(searchDataType ==1 || searchDataType ==3){
                            html += '<tr><th width="100%">组织名称</th></tr>';
                        }else{
                            html += '<tr><th width="40%">人员</th><th width="60%">所属组织</th></tr>';
                        }
                        for(var i=0;i<data.length;i++){
                            html += '<tr class="tr_ser" onclick="changeSelectTr(this)" cloudUserId="'+data[i].cloudUserId+'" cloudOrgId="'+data[i].cloudOrgId+'">';
                            if(fuzzySearchDataType==2){
                                html+= '<td class="td_ser">'+data[i].empName+'</td>';
                            }
                            html += '   <td class="td_ser">'+data[i].orgName+'</td>';
                            html += '</tr>';
                        }
                        jQuery(table).html(html);
                        jQuery("#searchtab_"+win_id).show();
                    }else{
                        alert("查询结果为空");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert("查询失败");
                }
            });
        }
        dfChangeSelectByKeyDownFlag=1;//modify for 上下键选择
    }
}

//派发树选择
function showcontent1(fuzzySearchType,fuzzySearchDataType,win_id){
    if(fuzzySearchType==0){//前台查询
        var dfChangeSelectByKeyDownFlag = 0;//modify for 上下键选择
        var iframetree = window.frames[win_id];
        //var iframetree = jQuery("#"+win_id)[0].contentWindow;
        var objNodeId = jQuery(".tr_ser.selected").find("#hidid_"+win_id).val();
        if(typeof(objNodeId) != "undefined"){
            var objNode = iframetree.window.document.getElementById(objNodeId);
            iframetree.treeExpandNode(objNode);
            iframetree.treeNodeSelcet(objNode);
            document.getElementById("searchtab_"+win_id).style.display = "none";
            var inputId = objNodeId.substring(iframetree.prefixDiv.length);
/*          if(nodeRelationType == "hasRelation") {
                if(objNode.getAttribute("type")=="parent"){
                    if(objNode.getAttribute("opened")=="true"){    //对于已经打开的，继续选择子节点
                        checkChild(RealObj, gradeMapChild[RealObj.id.substring(prefixCheckbox.length)], objNode.getAttribute("isSelected"));
                    }
                }
            }*/
        }else{
            alert("请选择一条查找结果")
        }
    }else{//后台查询
        var dfChangeSelectByKeyDownFlag = 0;//modify for 上下键选择
        var iframetree = window.frames[win_id];
        var serLimId = document.getElementById('hidserch_'+win_id).value;
        var selectTrObj = jQuery(".tr_ser.selected");
        if(selectTrObj[0]){
            var xsldoc = null;
            jQuery.ajax({
                type: "get",
                url: iframetree.xslPath,
                dataType: "text",
                async: false,
                beforeSend: function(XMLHttpRequest){
                },
                success: function(data, textStatus){
                    xsldoc = data;
                }
            });
            fuzzySearchDataType = jQuery("#treeSelw_"+win_id).val();
            var searchData = "fuzzySearchDataType="+fuzzySearchDataType+"&cloudOrgId="+selectTrObj.attr("cloudOrgId")+"&searchScope="+serLimId+"&searchDataType="+jQuery("#treeSelw_"+win_id).val();
            if(fuzzySearchDataType==2){
                searchData += "&cloudUserId="+selectTrObj.attr("cloudUserId");
            }
            jQuery.ajax({
                type: "post",
                url: PATH+ '/commonData/proxy4AUserAndOrg/findOrgAndUserEntityInSearch.json?method=POST',
                dataType: "text",
                data: searchData,
                async: false,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                beforeSend: function(XMLHttpRequest){
                },
                success: function(data, textStatus){
                    var Xmldoc = data;
                    var serchId = "";
                    //TODO data为返回的东西
                    var treeHTML = jQuery.transform({xmlstr:Xmldoc, xslstr:xsldoc});
                    iframetree.jQuery(".TreeNode").each(function(){
                        if(jQuery(this).attr('realid')== serLimId && jQuery(this).attr('type')=='parent'){
                            jQuery(this).attr('xmlsource','');
                            //jQuery(this).attr('open','true');
                            objNodeId = jQuery(this).attr('id');
                            var prefixDiv = "deeptree_div";
                            serchId = objNodeId.substring(prefixDiv.length);
                            var objNode = iframetree.window.document.getElementById(objNodeId);
                            objNode.setAttribute("open", "true");
                            objNode.setAttribute("opened", "true");
                            //jQuery(this).attr('open','1');
                            jQuery(this).next().attr('send','true');
                            jQuery(this).next().empty();
                            jQuery(this).next().html(treeHTML);
                            jQuery(this).next().css("display","block");
                            if(typeof(iframetree.toDoNodeAppend) == "function") {
                                iframetree.toDoNodeAppend();
                            }
                        }
                    });
                    //xml字符串转换为xml对象
                        if($.browser.msie) {
                            var x = $("<xml>")[0];
                            x.loadXML(Xmldoc);
                            var Xmlobj = x;
                        } else {
                            var parser = new DOMParser();
                            var Xmlobj = parser.parseFromString(Xmldoc,"text/xml");
                        };
                    
                    iframetree.addChildrenToId(Xmlobj,false,null);
                    
                    document.getElementById("searchtab_"+win_id).style.display = "none";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert("查询失败");
                }
            });
        }else{
            alert("请选择一条查找结果");
        }
    }
    
}

//搜索框取消
function closecontent1(win_id){
    document.getElementById("searchtab_"+win_id).style.display = "none";
}

//单击变色选中
/*jQuery(".tr_ser").live("click",function(){
    jQuery(".tr_ser").removeClass("selected");
    jQuery(this).addClass("selected");
});*/
function changeSelectTr(thisTr){
    jQuery(".tr_ser").removeClass("selected");
    jQuery(thisTr).addClass("selected");
}

//modify for 上下键选择
//回车快捷查询
function showcontentByEnter(event,win_id,win_body,thisObj,fuzzySearchType){
    //alert(event.keyCode);
    if(event.keyCode==13){
        showcontent(win_id,win_body,fuzzySearchType);
        event.cancelBubble=true;
        jQuery(thisObj).blur();
    }
}
//方向键控制结果选择
jQuery("body").live("keydown",function(event){//38上，40下 13回车
    if(dfChangeSelectByKeyDownFlag){
        selectedObj = jQuery(".selected");
        if(selectedObj[0]){
            if(event.keyCode==38){
                if(jQuery(selectedObj).prev().prev()[0]){
                    jQuery(".tr_ser").removeClass("selected");
                    jQuery(selectedObj).prev().addClass("selected");
                    return false;
                }
            }else if(event.keyCode==40){
                if(jQuery(selectedObj).next()[0]){
                    jQuery(".tr_ser").removeClass("selected");
                    jQuery(selectedObj).next().addClass("selected");
                    return false;
                }
            }
        }else if(event.keyCode==40){
            jQuery(jQuery(".tr_ser")[0]).addClass("selected");
            return false;
        }
        if(event.keyCode==13){
            showcontent1(jQuery(".table_ser").attr("fuzzySearchType"),jQuery(".table_ser").attr("fuzzySearchDataType"),jQuery(".table_ser").attr("win_id"));
        }
        //alert(event.keyCode+","+dfChangeSelectByKeyDownFlag);
    }
    
});

//派发树派发按钮function contentdisplay(params,win_id,submit1,submit2,submit3,tabNum){
	var distInputs = document.getElementsByName("distreturnname"+win_id);
	var sendInputs = document.getElementsByName("sendreturnname"+win_id); 
	var copyInputs = document.getElementsByName("copyreturnname"+win_id); 
		var checkedArray = new Array(0);		
		var submitStringArray = new Array(0);
		var submitObjectArray = new Array(0);
		var distreturnname = "distreturnname"+win_id;
		var sendreturnname = "sendreturnname"+win_id;
		var copyreturnname = "copyreturnname"+win_id;
		
		var obj = null;
		var thisIframe_id = win_id;
		var distdisplayHtml = document.getElementById("distdisplay"+win_id);
		var senddisplayHtml = document.getElementById("senddisplay"+win_id);
		var copydisplayHtml = document.getElementById("copydisplay"+win_id);

    for ( var j = 0; j < tabNum + 1; j++) {
        if (!jQuery("#" + thisIframe_id).attr("src")) {
            continue;
        }
        var iframetree = jQuery("#" + thisIframe_id)[0].contentWindow;
        var inputType = iframetree.inputType;
        var isOnlyLeaf = iframetree.isOnlyLeaf;

        if (inputType == "checkbox") {
            var prefixCheckbox = iframetree.prefixCheckbox;
            obj = iframetree.document.getElementsByName(prefixCheckbox);
            for (i = 0; i < obj.length; i++) {
                // 只返回leaf节点
                // begin
                if (isOnlyLeaf == "1") {
                    var objSpan = obj[i].parentNode;
                    if (objSpan.getAttribute("type") != "leaf") {
                        continue;
                    }
                }
                // end
                if (obj[i].checked) {
                    checkedArray.push(obj[i].id.substring(prefixCheckbox.length));
                }
            }
            var submitType = iframetree.submitType;

            if (submitType == "parentPriority") {
                submitStringArray = iframetree.clearChild(checkedArray); // 全面扫描checkedArray,把其中冗余的字节点信息去掉,Id列表放入submitStringArray
            } else {
                submitStringArray = iframetree.filterHidden(checkedArray);
            }
        } else if (inputType == "radio") {
            jQuery("#distdisplay" + win_id).empty();
            jQuery("#senddisplay" + win_id).empty();
            jQuery("#copydisplay" + win_id).empty();
            var prefixRadio = iframetree.prefixRadio;
            obj = iframetree.document.getElementsByName(prefixRadio);
            for (i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    checkedArray.push(obj[i].id.substring(prefixRadio.length));
                }
            }
            submitStringArray = checkedArray;
        }
        for ( var i = 0; i < submitStringArray.length; i++) { // 把要提交的checkbox属性填满放入submitObjectArray
            var tempObj = new Object();
            var prefixDiv = iframetree.prefixDiv;
            var thisObj = iframetree.getObjectById(prefixDiv + submitStringArray[i]);
            if(thisObj!=null){
                var parentObj = iframetree.getParentObject(thisObj);
                tempObj["childName"] = thisObj.getAttribute("text");
                tempObj["childId"] = thisObj.getAttribute("returnValue");
                tempObj["parentName"] = parentObj["parentName"];
                tempObj["thisType"] = thisObj.getAttribute("thisType");
                //tempObj["hasChild"] = thisObj.getAttribute("hasChild");
                /*新添加的属性开始*/
                tempObj["parentId"] = thisObj.getAttribute("parentId");
                tempObj["accountId"] = thisObj.getAttribute("accountId");
                tempObj["accountName"] = thisObj.getAttribute("accountName");
                tempObj["contractNumber"] = thisObj.getAttribute("contractNumber");
                tempObj["isLeaf"] = thisObj.getAttribute("isLeaf");
                /*新添加的属性结束*/

                submitObjectArray[submitObjectArray.length] = tempObj;
            }
        }
        thisIframe_id = win_id + "_tab" + (j + 2);
    }
    
		if(submitObjectArray.length == 0) {
			alert("请选择一条记录!");
			return false;
		}else if((distInputs.length>0 || sendInputs.length>0 || copyInputs.length>0) && inputType == "radio"){
			alert("已经选择，请删除后重新选择!");
			return false;			
		}else{
			var distdisplayHtml = document.getElementById("distdisplay"+win_id);
			var senddisplayHtml = document.getElementById("senddisplay"+win_id);
			var copydisplayHtml = document.getElementById("copydisplay"+win_id);
			
			if(params == "1"){
				var displayhtml = "<table>";
				for(var i=0; i<submitObjectArray.length; i++) {
					//如果已经添加到右边，自动过滤
					var testdistid = document.getElementById("dist"+submitObjectArray[i]['childId']+win_id);
					var testsendid = document.getElementById("send"+submitObjectArray[i]['childId']+win_id);
					var testcopyid = document.getElementById("copy"+submitObjectArray[i]['childId']+win_id);
					if(testdistid == null && testsendid == null && testcopyid == null && submit1 == 1)
						/*如果返回值需要新添加的属性，须修改这里*/
						displayhtml += "<tr id="+"'dist"+submitObjectArray[i]['childId']+win_id+"'"+"><td><input type='hidden' value='"+
						submitObjectArray[i]['childName']+","+submitObjectArray[i]['childId']+","+
						submitObjectArray[i]['thisType']+","+submitObjectArray[i]['parentId']+","+
						submitObjectArray[i]['accountId']+","+submitObjectArray[i]['accountName']+","+
						submitObjectArray[i]['contractNumber']+","+submitObjectArray[i]['isLeaf']+
						"' name="+distreturnname+"><span>" + submitObjectArray[i]['childName'] + "</span></td><td><span>" + submitObjectArray[i]['parentName'] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
				}
				displayhtml += "</table>";
				distdisplayHtml.innerHTML += displayhtml;
			}else if (params == "2"){
				var displayhtml = "<table>";
				for(var i=0; i<submitObjectArray.length; i++) {
					var testdistid = document.getElementById("dist"+submitObjectArray[i]['childId']+win_id);
					var testsendid = document.getElementById("send"+submitObjectArray[i]['childId']+win_id);
					var testcopyid = document.getElementById("copy"+submitObjectArray[i]['childId']+win_id);
					if(testdistid == null && testsendid == null && testcopyid == null && submit2 == 1)
						/*如果返回值需要新添加的属性，须修改这里*/
						displayhtml += "<tr id="+"'send"+submitObjectArray[i]['childId']+win_id+"'"+"><td><input type='hidden' value='"+
						submitObjectArray[i]['childName']+","+submitObjectArray[i]['childId']+","+
						submitObjectArray[i]['thisType']+","+submitObjectArray[i]['parentId']+","+
						submitObjectArray[i]['accountId']+","+submitObjectArray[i]['accountName']+","+
						submitObjectArray[i]['contractNumber']+","+submitObjectArray[i]['isLeaf']+
						"' name="+sendreturnname+"><span>" + submitObjectArray[i]['childName'] + "</span></td><td><span>" + submitObjectArray[i]['parentName'] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
				}
				displayhtml += "</table>";
				senddisplayHtml.innerHTML += displayhtml;
			}else{
				var displayhtml = "<table>";
				for(var i=0; i<submitObjectArray.length; i++) {
					var testdistid = document.getElementById("dist"+submitObjectArray[i]['childId']+win_id);
					var testsendid = document.getElementById("send"+submitObjectArray[i]['childId']+win_id);
					var testcopyid = document.getElementById("copy"+submitObjectArray[i]['childId']+win_id);
					if(testdistid == null && testsendid == null && testcopyid == null && submit3 == 1)
						/*如果返回值需要新添加的属性，须修改这里*/
						displayhtml += "<tr id="+"'copy"+submitObjectArray[i]['childId']+win_id+"'"+"><td><input type='hidden' value='"+
						submitObjectArray[i]['childName']+","+submitObjectArray[i]['childId']+","+
						submitObjectArray[i]['thisType']+","+submitObjectArray[i]['parentId']+","+
						submitObjectArray[i]['accountId']+","+submitObjectArray[i]['accountName']+","+
						submitObjectArray[i]['contractNumber']+","+submitObjectArray[i]['isLeaf']+
						"' name="+copyreturnname+"><span>" + submitObjectArray[i]['childName'] + "</span></td><td><span>" + submitObjectArray[i]['parentName'] + "</span></td><td><div class='del_image' onclick='deleteRow(this)'></div></td></tr>";
				}
				displayhtml += "</table>";
				copydisplayHtml.innerHTML += displayhtml;
			}
		}
}

//删除行
function deleteRow(obj){
	var tr = this.getRowObj(obj);
   	if(tr != null){
    	tr.parentNode.removeChild(tr);
   	}else{
    	throw new Error("The given object is not contained by the table");
   	}
}

//得到行对象
function getRowObj(obj)
{
   while(obj.tagName.toLowerCase() != "tr"){
    obj = obj.parentNode;
    if(obj.tagName.toLowerCase() == "table")
    	return null;
   }
   return obj;
}

//关闭div
function win_close(win_id){
	document.getElementById(win_id).style.display = "none";
}

//树形结构返回array
function returnValueNameTree(win_id, paramArrayStr,dtConfirmFun){
	
	var checkedArray = new Array(0);		
	var submitStringArray = new Array(0);
	var submitObjectArray = new Array(0);
			
	var obj = null;
	var thisIframe_id = win_id;
	for(var j=0;j<2;j++){			
		if(!jQuery("#"+thisIframe_id).attr("src")){
			continue;
		}
	//var iframetree = window.frames[win_id];
		var iframetree = jQuery("#"+thisIframe_id)[0].contentWindow;
	var inputType = iframetree.inputType;
	var prefixCheckbox = iframetree.prefixCheckbox;
	var submitType = iframetree.submitType;
	var isOnlyLeaf = iframetree.isOnlyLeaf;
	if(inputType == "checkbox") {
		obj = iframetree.document.getElementsByName(prefixCheckbox);
		for(i=0;i<obj.length;i++){
			//只返回leaf节点
			//begin
			if(isOnlyLeaf == "1"){
				var objSpan=obj[i].parentNode;
				if(objSpan.getAttribute("type") != "leaf"){
					continue;
				}
			}
			//end
			if(obj[i].checked){
				checkedArray.push(obj[i].id.substring(prefixCheckbox.length));
			}
		}
		if(submitType == "parentPriority") {
			submitStringArray = iframetree.clearChild(checkedArray);  //全面扫描checkedArray,把其中冗余的字节点信息去掉,Id列表放入submitStringArray
		} else {
			submitStringArray = iframetree.filterHidden(checkedArray);
		}
	} else if(inputType == "radio") {
		var prefixRadio = iframetree.prefixRadio ;
		obj = iframetree.document.getElementsByName(prefixRadio);
			for(var i=0;i<obj.length;i++){
				if(obj[i].checked){
					checkedArray.push(obj[i].id.substring(prefixRadio.length));
					break;
				}
			}
			if(submitType == "parentPriority") {
				submitStringArray = iframetree.clearChild(checkedArray);  //全面扫描checkedArray,把其中冗余的字节点信息去掉,Id列表放入submitStringArray
			}else {
				submitStringArray = iframetree.filterHidden(checkedArray);
			}
		}
	for(var i=0; i<submitStringArray.length; i++) {  //把要提交的checkbox属性填满放入submitObjectArray
		var tempObj = new Object();
		var thisObj = iframetree.getObjectById(iframetree.prefixDiv + submitStringArray[i]);
		var parentObj = iframetree.getParentObject(thisObj);
		tempObj["childName"] = thisObj.getAttribute("text");
		tempObj["childId"] = thisObj.getAttribute("returnValue");
		tempObj["parentName"] = parentObj["parentName"];
		tempObj["thisType"] = thisObj.getAttribute("thisType");
		/*新添加的属性开始*/
		tempObj["busContent"] = thisObj.getAttribute("busContent");
		tempObj["text"] = thisObj.getAttribute("text");
		tempObj["id"] = thisObj.getAttribute("returnValue");
		tempObj["parentId"] = thisObj.getAttribute("parentId");
		tempObj["accountId"] = thisObj.getAttribute("accountId");
		tempObj["accountName"] = thisObj.getAttribute("accountName");
		tempObj["contractNumber"] = thisObj.getAttribute("contractNumber");
		tempObj["email"] = thisObj.getAttribute("email");
		tempObj["sex"] = thisObj.getAttribute("sex");
		tempObj["leaf"] =  thisObj.getAttribute("isLeaf");
		/*新添加的属性结束*/
		
		submitObjectArray[submitObjectArray.length] = tempObj;
	}
	
		//回传参数测试样例
		//testReturnValueTree(submitObjectArray);
		

		//window.returnValue = submitObjectArray;
		//var deptValue = eval(assist_dept);
		//var deptName = eval(assist_dept_name);
		//var inputArray = new Array(deptValue,deptName);
		var paramArray = paramArrayStr.split(",");
		toDoWritePartyWindowTree(paramArray, submitObjectArray);
		thisIframe_id = win_id+"_tab2";
	}
	
	if(submitObjectArray.length == 0) {
		alert("请选择一条记录!");
		return false;
	}
	
	win_close(win_id.substring(6));
	try{
		if(typeof(eval(dtConfirmFun)) == "function") {
			eval(dtConfirmFun)(submitObjectArray);
		}
	}
	catch(e){								
	}
}
	
//回传参数测试样例
function testReturnValueTree(submitObjectArray){
	for(var i=0; i<submitObjectArray.length; i++) {
		alert(submitObjectArray[i]["returnValue"]);
		alert(submitObjectArray[i]["childName"]);
		alert(submitObjectArray[i]["busContent"]);
	}
}

//派发树返回array
function returnValueName(win_id,input1,input2,gridId) {
	var submitStringArray = new Array(0);
	//派发 值 1
	var distInputs = document.getElementsByName("distreturnnameiframe"+win_id); 
	if(distInputs != undefined && distInputs != null){
		for(var i=0; i<distInputs.length; i++){
			var distInputValue = distInputs[i].value;
			
			var strs = distInputValue.split(",");
			var tempObj = new Object();
			
			tempObj["busType"] = '1';
			tempObj["text"] = strs[0];
			tempObj["id"] = strs[1];
			tempObj["thisType"] = strs[2];
			tempObj["parentId"] = strs[3];
			tempObj["accountId"] = strs[4];
			tempObj["accountName"] = strs[5];
			tempObj["contractNumber"] = strs[6];
			tempObj["leaf"] = strs[7];
			/*if( strs[7]==1){
				tempObj["leaf"] = 0;
			}
			else{
				tempObj["leaf"] = 1;
			}*/
			
			/*新添加的属性开始*/
			//tempObj["busContent"] = strs[3];
			/*新添加的属性结束*/
			//tempObj["parentName"] = strs[4];
			submitStringArray[submitStringArray.length] = tempObj;
		}
	}
	
	//送审 值2
	var sendInputs = document.getElementsByName("sendreturnnameiframe"+win_id); 
	if(sendInputs != undefined && sendInputs != null){
	    
		for(var i=0; i<sendInputs.length; i++){
			var sendInputValue = sendInputs[i].value;
			
			var strs = sendInputValue.split(",");
			var tempObj = new Object();
			tempObj["busType"] = '2';
			tempObj["text"] = strs[0];
			tempObj["id"] = strs[1];
			tempObj["thisType"] = strs[2];
			tempObj["parentId"] = strs[3];
			tempObj["accountId"] = strs[4];
			tempObj["accountName"] = strs[5];
			tempObj["contractNumber"] = strs[6];
			tempObj["leaf"] = strs[7];
			
			/*新添加的属性开始*/
			//tempObj["busContent"] = strs[3];
			/*新添加的属性结束*/
			//tempObj["parentName"] = strs[4];
			submitStringArray[submitStringArray.length] = tempObj;
		}
	}
	
	//抄送 值3
	var copyInputs = document.getElementsByName("copyreturnnameiframe"+win_id); 
	if(copyInputs != undefined && copyInputs != null){
		for(var i=0; i<copyInputs.length; i++){
			var copyInputValue = copyInputs[i].value;
			var tempObj = new Object();
			var strs = copyInputValue.split(",");
			tempObj["busType"] = '3';
			tempObj["text"] = strs[0];
			tempObj["id"] = strs[1];
			tempObj["thisType"] = strs[2];
			tempObj["parentId"] = strs[3];
			tempObj["accountId"] = strs[4];
			tempObj["accountName"] = strs[5];
			tempObj["contractNumber"] = strs[6];
			tempObj["leaf"] = strs[7];
			/*新添加的属性开始*/
			//tempObj["busContent"] = strs[3];
			/*新添加的属性结束*/
			//tempObj["parentName"] = strs[4];
			submitStringArray[submitStringArray.length] = tempObj;
		}
	}
	//test
	//testReturnValue(submitStringArray);
	
	if(submitStringArray.length == 0) {
		alert('没有指定任何数据，请检查！');
		return false;
	}else{
		win_close(win_id);
		//return submitStringArray;
		//confirmReturnValue(submitStringArray);

		//var tree = new DeepTreeObj(input1,input2);
		var tree = new DeepTreeObj(input1,input2,win_id,null,null,null,null,null,null,null,null,null,gridId);
		tree.confirmReturnValue(submitStringArray);
		
	}
}
//test派发树返回值
function testReturnValue(submitStringArray){
	for(var i = 0; i<submitStringArray.length; i++){
		alert(submitStringArray[i]["busType"]);
		alert(submitStringArray[i]["childName"]);
		alert(submitStringArray[i]["childId"]);
		alert(submitStringArray[i]["thisType"]);
		
		/*新添加的属性开始*/
		alert(submitStringArray[i]["busContent"]);
		/*新添加的属性结束*/
	}
}

/*================居中显示对象==================*/
function setObjMiddleX(msgObj){
    var msgWidth = msgObj.scrollWidth;  
    var bgLeft=window.pageXOffset   
               || document.documentElement.scrollLeft   
               || document.body.scrollLeft || 0;  
    var bgWidth=document.documentElement.clientWidth   
               || document.body.clientWidth || 0;
    var msgLeft=0; 
    if(bgWidth>msgWidth){
        msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);
    }else{
        msgLeft=bgLeft+10;
    }
    msgObj.style.position = "absolute";  
    msgObj.style.left  = msgLeft+"px";  
}
function setObjMiddleY(msgObj,objHeight){
    var msgHeight= msgObj.scrollHeight;  
    if(objHeight){
        msgHeight = objHeight;
    }
    
    var bgTop=window.pageYOffset   
            || document.documentElement.scrollTop   
            || document.body.scrollTop || 0;  
    var bgHeight=document.documentElement.clientHeight   
            || document.body.clientHeight || 0;   
    var msgTop=0;  
    
    //通过父页面返高度的方法使窗口纵向居中
    /*var parentHeight = parent.getIframeScroll();
    if(parentHeight&&Number(parentHeight)&&parentHeight>0){
        bgTop += parentHeight;
        bgHeight = bgHeight-parentHeight;
    }*/
    
    if(bgHeight>msgHeight){
        msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);
    }else{
        msgTop=bgTop+10;
    }
    msgObj.style.position = "absolute";  
    msgObj.style.top      = msgTop+"px";  
}

/*-------------------------- +
拖拽函数
+-------------------------- */
function drag(oDrag, handle,cursor)
{
    var disX = dixY = 0;
    handle = handle || oDrag;
    //handle.style.cursor = "move";
    handle.onmousedown = function (event)
    {
        var event = event || window.event;
        
        var NS=navigator.appName=='Netscape';//当前浏览器的类型 Netscape ,Microsoft Internet Explorer
        if(event.button==2)  { //単鼠标右击是不拖动对象
            //alert(event.button);
            return;
        }
        
        handle.style.cursor =cursor||"move"; //鼠标移动对象时的样式
        disX = event.clientX - oDrag.offsetLeft;
        disY = event.clientY - oDrag.offsetTop;
        
        document.onmousemove = function (event)
        {
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            
            var bgLeft=window.pageXOffset   
                || document.documentElement.scrollLeft   
                || document.body.scrollLeft || 0;  
        
            var bgTop=window.pageYOffset   
                || document.documentElement.scrollTop   
                || document.body.scrollTop || 0;  
            
            if(document.documentMode!=null && typeof(document.documentMode)!="undefined" && document.documentMode<7){
                DOMwidth = document.documentElement.scrollWidth+bgLeft;
                DOMheight = document.documentElement.scrollHeight+bgTop;
            }else{
                DOMwidth = document.documentElement.clientWidth+bgLeft;
                DOMheight = document.documentElement.clientHeight+bgTop;
            }
            var maxL = DOMwidth - oDrag.offsetWidth;
            var maxT = DOMheight - oDrag.offsetHeight;
            
            iL >= maxL && (iL = maxL);
            iT >= maxT && (iT = maxT);
            iL <= bgLeft && (iL = bgLeft);
            iT <= bgTop && (iT = bgTop);
            
            oDrag.style.left = iL + "px";
            oDrag.style.top = iT + "px";
            
            return false
        };
        
        document.onmouseup = function ()
        {
            document.onmousemove = null;
            document.onmouseup = null;
            this.releaseCapture && this.releaseCapture()
            handle.style.cursor =""; //鼠标移动对象时的样式
        };
        this.setCapture && this.setCapture();
        return false
    };  
    /*//最大化按钮
    oMax.onclick = function ()
    {
        oDrag.style.top = oDrag.style.left = 0;
        oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
        oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
        this.style.display = "none";
        oRevert.style.display = "block";
    };
    //还原按钮
    oRevert.onclick = function ()
    {       
        oDrag.style.width = dragMinWidth + "px";
        oDrag.style.height = dragMinHeight + "px";
        oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
        oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
        this.style.display = "none";
        oMax.style.display = "block";
    };
    //最小化按钮
    oMin.onclick = oClose.onclick = function ()
    {
        oDrag.style.display = "none";
        var oA = document.createElement("a");
        oA.className = "open";
        oA.href = "javascript:;";
        oA.title = "还原";
        document.body.appendChild(oA);
        oA.onclick = function ()
        {
            oDrag.style.display = "block";
            document.body.removeChild(this);
            this.onclick = null;
        };
    };
    //阻止冒泡
    oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
    {
        this.onfocus = function () {this.blur()};
        (event || window.event).cancelBubble = true 
    };*/
}

//页卡功能
jQuery(".treedfWinTabHead1").live('click', function() {
    //获取最外层div
    var selectors=jQuery(this).parent().parent().parent();
    var seldiv="treedfWinTabTable";
    if(selectors.attr("class")==seldiv){
        
        //获取页卡头table的第一个tr
        var selcardtr=jQuery(this).parent();

        //获取页卡体对象table
        var selbodytable=selectors.parent().parent().children('.left');
        if(!selbodytable[0]){
            selbodytable=selectors.parent().parent().children('.win_body');
        }

        //获取页卡头table的第一个tr内的所有td
        var tb=selcardtr.children();

        //确定当前被选页卡的位置参数
        var n=0;

        //设置页卡头
        for(var i=0;i<tb.length;i++){
            tb[i].className="treedfWinTabHead1";
        }
        this.className="treedfWinTabHead2";
        url=jQuery(this).attr("dfTabUrl");
        tabWinId = jQuery(this).attr("tabWinId");
        
        //获取当前页卡位置
        for(var i=0;i<tb.length;i++){
            if(tb[i].className==this.className){
                n=i;
            }
        }

		//判断页卡是否有搜索
				if(n==1){
				    $(".win_body").height(function(n,c){
				        return c+63;
				        });
				    $(".searchhead").css('display','none');
				}else{
				    $(".win_body").height(function(n,c){
				        return c-63;
				        });
				    $(".searchhead").css('display','');
				}
		
        var tbh=selbodytable;

        //设置页卡体显示状态
        for(var i=0;i<tbh.length;i++){
            tbh[i].style.display = "none";
        }
        tbh[n].style.display = "block"; //设置当前页卡的图像
        var dfTabUrl = jQuery(tbh[n]).children().children("iframe").attr("src");
        if(dfTabUrl=="" || dfTabUrl==null || dfTabUrl=="undefined"){  //为当前页卡中的iframe设置url
            jQuery(tbh[n]).children().children("iframe").attr("src",url)
        }
    }
});
