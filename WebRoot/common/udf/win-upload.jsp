<%@ page language="java" contentType="text/html; charset=utf-8"%>
 
      <head>
        <title>Upload</title>
 <!--装载文件-->
 	<script>
 	//window["sessionId"] = "<%=request.getSession().getId()%>";
 	</script>
        <link href="<%=request.getContextPath()%>/css/upload/uploadify.css" rel="stylesheet" type="text/css" />
        <link href="<%=request.getContextPath()%>/css/upload/df.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/jquery-1.7.min.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/swfobject.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/jquery.uploadify.v2.1.0.min.js"></script>
   <!--ready事件-->
<script type="text/javascript">
		var script = "<%=request.getParameter("script") %>";
		var fileDesc = "<%=request.getParameter("fileDesc") %>";
		var fileExt = "<%=request.getParameter("fileExt") %>";
		var sizeLimitK = <%=request.getParameter("sizeLimit") %>;
		var queueSizeLimit = <%=request.getParameter("queueSizeLimit") %>;
		var cloudUserId =  parent.session.logonAccount.cloudUserId;
		script =script +','+cloudUserId;
		jQuery(document).ready(function(){
			if(Boolean(sizeLimitK)){
				sizeLimit = Number(sizeLimitK)*1024*1024;
			}else{
				sizeLimit = 100*1024*1024;
				sizeLimitK = 100;
			}
			jQuery("#sizeLimitSpan").html(sizeLimitK);
			if(!Boolean(queueSizeLimit)){
				queueSizeLimit = "100";
			}
		});
		
		
        jQuery(document).ready(function() {
        	
            jQuery("#uploadify").uploadify({
                'uploader'       : '<%=request.getContextPath()%>/js/jquery/uploadify.swf',
                'script'         : script,//后台处理的请求

                'cancelImg'      : '<%=request.getContextPath()%>/resources/images/df/cancel.png',
                'folder'         : '<%=request.getContextPath()%>/uploads',//您想将文件保存到的路径

                'height' 		 : 26,
				'width'  		 : 82,
                'queueID'        : 'fileQueue',//与下面的id对应
                'fileDesc'       : fileDesc, 
            	'fileExt' 		 : fileExt, //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
            	//'buttonImg'      : '<%=request.getContextPath()%>/resources/images/df/fileupload.png',
                'buttonImg' :'',
            	'auto'           : true,
                'multi'          : true,
                'simUploadLimit' : 1,
                'queueSizeLimit' : queueSizeLimit,
                'buttonText'     : 'BROWSE',
                'sizeLimit' 	 : sizeLimit,
                onComplete: function (event, queueID, fileObj, response, data) {   
                    var ftype=fileObj.type.substring(1,fileObj.type.length).toLowerCase();
                    var params=eval(response);
                    var uuids=params[0].uuid;
                    var json={name:fileObj.name,size:fileObj.size,type:ftype,uuid:uuids};
                    
                    var fileName = fileObj.name;
                    var uploadinfo=combinjson(json,params[0]);
                    createItem(uploadinfo);
                },
                onAllComplete: function(even,data){
                	AllComplete();
                },
                onError: function(event, queueID, fileObj) {    
                    flag=0;
                },
                onQueueFull : function(event,queueSizeLimit){
                	alert("选择的文件个数超出了上传文件的最大数,只能上传"+queueSizeLimit+"个文件");
                },
                'onSelect'       : function (event, queueID, fileObj)
                {
                	uploadfileInfos=new Array();
    				counts=0;
                }
            });
        });
        
        var uploadfileInfos=new Array();
        var counts=0;
        var flag=1;
        
        function createItem(json){
        	uploadfileInfos[counts++]=json;
        }
        
        //取消上传操作
        function cancel(){
        	jQuery('#uploadify').uploadifyClearQueue();
        	var win_upload=parent.document.getElementById("<%=request.getParameter("win_id") %>");
        	win_upload.parentNode.removeChild(win_upload);
        }
        
        //合并Json对象
        function combinjson(jsonbject1, jsonbject2)  
        {  
            var resultJsonObject={};  
            for(var attr in jsonbject1){  
                resultJsonObject[attr]=jsonbject1[attr];  
            }  
            for(var attr in jsonbject2){  
                resultJsonObject[attr]=jsonbject2[attr];  
            }  
  
            return resultJsonObject;  
        };
        
        //上传完成后执行的操作
        function AllComplete(){
        	//将上传信息返回值父页面
        	parent.uploadfileInfo=uploadfileInfos;
        	parent.fileUploadCount=counts;
        	parent.uploadfinishfile=uploadfileInfos;
        	//
        	//处发父窗口事件 uploadfinish()为父窗口提供的一个接口函数

        	/*if(parent.uploadfinish()!=null){
        		parent.uploadfinish();
        	}*/
        	var files = new Array();
        	for(var v = 0; v<counts;v++ ){
            	//获取附件格式，并且转换为小写字母
            	var lowerType = uploadfileInfos[v].type.toLowerCase();
            	var attachmentFormatEnumId = 6;
            	//如果是word文档则其附件枚举值为1
                if(lowerType=='doc'||lowerType=='docx'){
                	attachmentFormatEnumId=1;
                }
                //如果为excel则其附件枚举值为2
                else if(lowerType=='xls'||lowerType=='xlsx'){
                	attachmentFormatEnumId=2;
                }
                //如果为pdf则其附件枚举值为3
                else if(lowerType=='pdf'){
                	attachmentFormatEnumId=3;
                }
                //图像文件则其附件枚举值为4
                else if(lowerType=='jpg'||lowerType=='bmp'||lowerType=='tiff'||lowerType=='gif'||
                		lowerType=='pcx'||lowerType=='tga'||lowerType=='exif'||lowerType=='fpx'||
                		lowerType=='svg'||lowerType=='psd'||lowerType=='cdr'||lowerType=='pcd'||
                		lowerType=='dxf'||lowerType=='ufo'||lowerType=='eps'||lowerType=='ai'||
                		lowerType=='raw'){
                	attachmentFormatEnumId=4;
                }
                //压缩文件附件枚举值为5
                else if(lowerType=='rar'||lowerType=='zip'||lowerType=='7z'){
                	attachmentFormatEnumId=5;
                }
                //否则为其他，即其附件枚举值为6
                else{
                	attachmentFormatEnumId=6;
                }
                if(uploadfileInfos[v].uuid){
                    var row = new Object();
                    row.fileId = uploadfileInfos[v].uuid ;
                    row.fileName = uploadfileInfos[v].name;
                    row.fileType = uploadfileInfos[v].type ;
                    row.attachmentFormatEnumId = attachmentFormatEnumId;
                    files.push(row);
                }
        	}
        	//parent.fileList = files;
        	
        	if(parent._callback){
        		//
        		parent._callback.call(this,files);
                //alert(files);
            }
        	
        }
        
        //初始化窗体对象

        function initFileQueue(fileLimit){
        	var queueID='fileQueue';
			var queueObj=document.getElementById(queueID);
			queueObj.innerHTML="";
			//加载已上传文件信息

            if(parent.uploadfinishfile!=null&&parent.uploadfinishfile.length>0){
            	uploadfileInfos=parent.uploadfinishfile;
            	counts=uploadfileInfos.length;
            	var filequeue="";
            	var files;
            	var fileKind = "Word";
            	var fileKindName="";
            	var fileName="";
            	for(var i=0;i<counts; i++){
					files=uploadfileInfos[i];
					fileKindName = files.name.substr(files.name.lastIndexOf(".")).substr(1);
					switch(fileKindName){
						case "doc":		fileKind = "Word";		break;
						case "docx":	fileKind = "Word";		break;
						case "xls":		fileKind = "Excel";		break;
						case "xlsx":	fileKind = "Excel";		break;
						case "ppt":		fileKind = "PPT";		break;
						case "pptx":	fileKind = "PPT";		break;
						case "txt":		fileKind = "Txt";		break;
						case "pdf":		fileKind = "PDF";		break;
						case "gif":		fileKind = "Img";		break;
						case "jpg":		fileKind = "Img";		break;
						case "png":		fileKind = "Img";		break;
						case "psd":		fileKind = "Img";		break;
						case "vsd":		fileKind = "Visio";		break;
						default:		fileKind = "Other";
					}
					
					fileName=files.name;
					if (fileName.length > 10) {
						fileName = fileName.substr(0,10) + "...";
					} 
					filequeue=	'<div id="' + files.uuid+ '" class="uploadifyQueueItem">'
								+ '<table style="font-size:12px;width:95%;" cellspacing="2px"><tr>'
								+	'<td width="9%"><div class="upload'+ fileKind +'" style="width:26px;height:26px;" ></div></td>'
								+   '<td width="85%">'
								+ 	'<span class="fileName">' + fileName + " </span><span style='color:#858585;'>(" + showFileSize(files.size) + ')</span><br/>'
								+ 	'<div class="uploadifyProgress" style="border: 0px none;">'
								+ 	  '已上传' + 	'</div>'
								+ 	'<div class="percentage" style="color:#858585;float:left;margin-top:6px;"></div>'
								+	'</td>' + 	'</tr></table>'    +'</div>';
					queueObj.innerHTML+=filequeue;
            	}
			}else{
				uploadfileInfos=new Array();
				counts=0;
			}
        }
        
        //标准化输出文件大小

        function showFileSize(filesize){
            var size=parseInt(filesize+"");
        	var k = Math.round(size / 1024 * 100) * 0.01;
        	var l = "KB";
        	if (k > 1000) {
        		k = Math.round(k * 0.001 * 100) * 0.01;
        		l = "MB";
        	}
        	var m = k.toString().split(".");

        	if (m.length > 1) {
        		k = m[0] + "." + m[1].substr(0,2);
        	} else {
        		k = m[0];
        	}
            return k+l;
        }
        
        jQuery(document).ready(function() {
        	initFileQueue(queueSizeLimit);
        });
</script>
</head>
    <body>
<div style="margin:20px;overflow-x:hidden;overflow-y:hidden;">
	<div class="upload_tit">温馨提示</div>
	<div class="upload_wz"><p>支持多文件同时上传。</p><p><span>单个文件最大为</span><span id="sizeLimitSpan"></span><span>M。</span></p></div>
	<div id="fileQueue" style="width:340px;height:250px;border:1px solid #bbbbbb;overflow-y:auto;overflow-x:hidden;"></div>
		<div class="dfuploadbuttondiv" style="">
			<table class="dfuploadbuttontable" style="margin: 0px;width: 100%">
				<tr>
					<td style="width:140px;*width:145px;text-align: right;">
						<div class="dfaddfilediv" style="margin-right: 19px;*margin-right: 18px;text-align: right;">
						<!-- <input name="" id="dfuploadaddfile" type="button" 
						style="margin-right:18px;*margin-right:17px;" class="graybutton" value="添加文件" /> -->
						<input type="file" name="uploadify" id="uploadify"/>
						</div>
					</td>
					<td style="width:82px;min-width:82px;max-width:82px;text-align:left;">
						<input name="" type="button" class="redbutton" value="确　定"
						style="width:82px;"
						onclick="cancel()" />
					</td>
					<td style="width:140px;*width:145px;">
						<input name="" type="button" class="graybutton"
						style="margin-left: 18px;*margin-left: 17px" 
						value="取　消" onclick="cancel()" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>
    </body>
