/***
 * 文件上传下载操作工具类

 * 2013-05-18
 * @param fileId
 * @param fileName
 */

    /*下载文件*/
    function downloadFile(fileId,fileName){
        var param = new Object();
        param.fileName = fileName;
        param.fileId = fileId;
        new ZTESOFT.FileUtil().downloadFile(param);
    }

/**
 * 
 * @param filesNums 初始化时已有的文件数量

 * @param fileLimit 同时上传的文件个数

 * @param fileTypes 可上传的文件类型
 * @param _panelId 所在面板 的ID
 */
     function uploadFiles(filesNums,fileLimit,fileTypes,_panelId){
        // var htmlText = '已上传<font color="#d7191f">'+attIds.length+'</font>份文件[ <a href="javascript:void(0);" class="zs-link-all" '+
         var param = new Object();
         //对文件类型进行限制，多个类型用半角分号(;)分隔.
         //param.fileTypes = "*.txt;*.java";
         // 默认不限制数量

         if(fileLimit=="undefined"||fileLimit=="null"){
             //param.fileUploadLimit=10;//默认最多传10个

         }else{
             var fileSpans = document.getElementById("_att_files_info_Div_"+_panelId).getElementsByTagName("SPAN");
             var uplSpans = document.getElementById("_att_upl_Div_"+_panelId).getElementsByTagName("SPAN");
             var allSpans = fileSpans.length+uplSpans.length;
             if(allSpans>=fileLimit){
                 Ext.Msg.alert('提示',"文件个数超过限制，最多只能上传"+fileLimit+"个文件");
                 return;
             }else{
                 param.fileUploadLimit = fileLimit-allSpans;
             }
             
         }
         if(fileTypes!="undefined"&&fileTypes!="null"){
             param.fileTypes = fileTypes;
         }
         
         var fileList1 = new Array();
         new ZTESOFT.FileUtil().uploadFile(param,function(fileList){
             //回调方法，返回列表[{fileId,fileName}]
              if(fileList.length>0){
                 // var len =filesNums + fileList.length;
                 var htmlText2 = "";
                     /*'已上传<font color="#d7191f">'+len+'</font>份文件[ <a href="javascript:void(0);" class="zs-link-all" '+
                'onclick="uploadFiles()"'+
                '>上传 </a> ]</br>';*/
                 //将上传的文件写进缓存input中

                for(var v=0; v< fileList.length; v++ ){
                    var inp = document.getElementById("_att_uplFiles_Div_"+_panelId).getElementsByTagName("INPUT");
                    var attNum = v+1;
                    var attName = fileList[v].fileName;
                    var attId = fileList[v].fileId;
                    var attType = fileList[v].fileType;
                    var attTypeId = fileList[v].attachmentFormatEnumId;
                    var inpSeq = inp.length+v;
                    htmlText2+='<input type="hidden" id="'+_panelId+'_div_file_input_'+
                    attId+'" value="'+attNum+'\\'+attName+'\\'+attId+'\\'+attTypeId+'\\'+attType+'"/>';
                    
                }
                //往新增文件DIV中保存数据

                document.getElementById("_att_uplFiles_Div_"+_panelId).innerHTML += htmlText2;
                applyDivFun(null,_panelId,fileLimit,fileTypes);
               }
         });
     }

     
     /**
      * 移除附件
      */
     function removeFile(_id,_type,_attNum,_panelId,fileLimit,fileTypes){
         var childNode = document.getElementById(_id);
         var htmlText2 = "";
         if(_type=="file"){
             document.getElementById("_att_upl_Div_"+_panelId).removeChild(childNode);
             var childNode1 = document.getElementById(_panelId+"_div_file_input_"+_attNum);
             document.getElementById("_att_uplFiles_Div_"+_panelId).removeChild(childNode1);
         }
         else{
             htmlText2+='<input type="hidden" id="'+_panelId+'_div_file_input_'+
             _attNum    +'" value="'+_attNum+'"/>';
             document.getElementById("_att_files_info_Div_"+_panelId).removeChild(childNode);
             var childNode1 = document.getElementById(_panelId+"_div_input_"+_attNum);
             document.getElementById("_hidden_db_Div_"+_panelId).removeChild(childNode1);
             document.getElementById("_att_removeFiles_Div_"+_panelId).innerHTML+=htmlText2;
         }
         applyDivFun(_type,_panelId,fileLimit,fileTypes);
     }
     
     /**
      * 渲染显示面板
      * 包括库表读出的和刚上传的
      */
     function applyDivFun(_type,_panelId,_limit,_types){
         //获取当前DIV下所有hidden input 的值

         var arr1 = new Array();//新增文件
         var arr2 = new Array();//库表读出文件
         
         var htmlText2 = "";
         var inputValue = document.getElementById("_att_uplFiles_Div_"+_panelId).getElementsByTagName("INPUT");
         var inputValue2 = document.getElementById("_hidden_db_Div_"+_panelId).getElementsByTagName("INPUT");
         for(var v = 0; v<inputValue.length; v++){
             arr1.push(inputValue[v].value);
         }
         for(var v = 0; v<inputValue2.length; v++){
             arr2.push(inputValue2[v].value);
         }
         var len = arr2.length+arr1.length;
         var htmlText = '已上传<font color="#d7191f">'+len+'</font>份文件[ <a href="javascript:void(0);" class="zs-link-all" '+
             'onclick="checkAllData(\''+_panelId+'\')"'+
             '>查看全部 </a> ][ <a href="javascript:void(0);" class="zs-link-all" '+
            'onclick="uploadFiles('+len+',\''+_limit+'\',\''+_types+'\',\''+_panelId+'\')"'+
            '>上传附件 </a> ]</br>';

            /**加载新上传的附件信息**/
            for(var v=0; v< arr1.length; v++ ){
                    var fileInfo = arr1[v].split('\\');
                    var attNum = v+1;
                    var attName = fileInfo[1];
                    var attId =  fileInfo[2];
                    //var inpSeq = inp.length+v;
                    var removeText = "removeFile(this.attributes['spanId'].nodeValue,this.attributes['from'].nodeValue,this.attributes['attId'].nodeValue,'"+
                    _panelId+"','"+_limit+"','"+_types+"')";
                    var downText = "downloadFile(this.attributes['fileId'].nodeValue,this.attributes['fileName'].nodeValue)";
                    htmlText += '<span id="'+_panelId+'_span_file_'+v+'" attId="'+attId+'" attName="'+attName+'">'+attNum+'、 '+attName + '[<a href="javascript:void(0);" fileId="'+
                    attId+'" fileName="'+attName+
                    '" class="zs-link-all" onclick="'+downText+
                    '">'+
                    '下载</a>]'+ 
                    '[<a href="javascript:void(0);" from="file" fileId="'+
                    attId+'" fileName="'+attName+'" spanId="'+_panelId+'_span_file_'+v+
                    '" class="zs-link-all" attId="'+attId+'" onclick="'+removeText+
                    '">'
                    +'移除</a>]</span><br/>';
                }
            /**加载原有附件信息**/
            for(var v=0; v< arr2.length; v++ ){
                var fileInfo = arr2[v].split('\\');
                var attName = fileInfo[1];
                var attId =  fileInfo[2];
                var attNum = fileInfo[0];
                var attSeq = v+ arr1.length+1;
                var removeText = "removeFile(this.attributes['spanId'].nodeValue,this.attributes['from'].nodeValue,this.attributes['attNum'].nodeValue,'"+
                _panelId+"','"+_limit+"','"+_types+"')";
                var downText = "downloadFile(this.attributes['fileId'].nodeValue,this.attributes['fileName'].nodeValue)";
                htmlText2 +='<span id="'+_panelId+'_span_db_'+v+'" style="margin:10px" attId="'+attId+'" attName="'+attName+'">'+ attSeq+'、 '+attName + '[<a href="javascript:void(0);" fileId="'+attId+'" fileName="'+attName+
                '" class="zs-link-all" onclick="'+downText+
                '">'
                +'下载</a>]'+
                '[<a href="javascript:void(0);" from="db" fileId="'+attId+'" fileName="'+attName+
                '" class="zs-link-all" attNum="'+attNum+'" spanId="'+_panelId+'_span_db_'+v+'" onclick="'+removeText+
                '">'
                +'移除</a>]</span><br/>';
            }
            //加载已上传的文件信息
         document.getElementById("_att_upl_Div_"+_panelId).innerHTML = htmlText;
         //加载原有的文件信息

         document.getElementById("_att_files_info_Div_"+_panelId).innerHTML = htmlText2;
     }
     
     //获取上传后的数据
     function getNewUplValue(panelId){
         var upl =  document.getElementById("_att_uplFiles_Div_"+panelId).getElementsByTagName('INPUT');
         var _return = new Array();
         for(var v=0; v<upl.length; v++){
             if(upl[v].id.indexOf("_div_file_input_")>-1){
                 var obj = new Object();
                 var uplValue = upl[v].value;
                 var uplArr = uplValue.split("\\");
                 obj.fileId = uplArr[2];
                 obj.fileName = uplArr[1];
                 obj.attachmentFormatEnumId = uplArr[3];
                 obj.fileType = uplArr[4];
                 _return.push(obj);
             }
         }
         return _return;
     }
     
     //获取移除掉的文件数据
     function getRemoveValue(panelId){
         var upl =  document.getElementById("_att_removeFiles_Div_"+panelId).getElementsByTagName('INPUT');
         var _return = new Array();
         for(var v=0; v<upl.length; v++){
                 var uplValue = upl[v].value;
                 _return.push(uplValue);// value="'+attNum+','+attName+','+attId+'"/>';对移除来说只有attNum
         }
         return _return;
     }
     
     function getUplCount(panelId){
         var html = document.getElementById("_att_upl_Div_"+panelId).innerHTML;
         var count = html.substring(html.indexOf(">")+1,html.indexOf(">")+2);
         return count;
     }
     
     
     /**
      *查看全部
      */
     function checkAllData(_panelId){
         var fileSpans = document.getElementById("_att_files_info_Div_"+_panelId).getElementsByTagName("SPAN");
         var uplSpans = document.getElementById("_att_upl_Div_"+_panelId).getElementsByTagName("SPAN");
         var array= new Array();
         for(var v=0; v<fileSpans.length; v++){
             var a1 = new Array();
             a1.push(fileSpans[v].attributes['attId'].nodeValue);
             a1.push(fileSpans[v].attributes['attName'].nodeValue);
             array.push(a1);
         }
         
         for(var z=0; z<uplSpans.length; z++){
             var a2 = new Array();
             a2.push(uplSpans[z].attributes['attId'].nodeValue);
             a2.push(uplSpans[z].attributes['attName'].nodeValue);
             array.push(a2);
         }
         
         var store = new Ext.data.ArrayStore({
             fields: ['attId','attName'],
             data:array
         });
         
         attachWindow(store);
     }
     
     function attachWindow(store) {
         var gridWidth = 640;
         
         var cm = new Ext.grid.CheckboxSelectionModel();
         var column = new Ext.grid.ColumnModel([
         new Ext.grid.RowNumberer({header:'序号',width:40}),
         {
             header : 'attId',
             dataIndex : 'attId',
             hidden : true
         }, {
             header : '附件名称',
             dataIndex : 'attName',
             width : gridWidth * 0.5
         },{
             header : '下载',
             dataIndex : 'download',
             width : gridWidth * 0.35,
             renderer:function(value, metadata, record) {
                 return '<a href="#" onclick="downloadFile(\''+record.data.attId+'\',\''+record.data.attName+'\');">下载</a>';
             }
         } ]);
         var grid = new ZTESOFT.Grid({
             id:'attachGrid',
             cm: column,
             sm : cm,
             height:300,
             store:store
         });

         var formWin = new Ext.Window({
             id : 'attachWindow',
             title : '附件详情',
             closable : true,
             modal : true,
             width : 640,
             height : 450,
             plain : true,
             items : [ grid ],
             buttonAlign : 'center',
             buttons : [{
                 text : '关闭',
                 xtype : 'ZTESOFT.Button',
                 onClick : function() {
                     Ext.getCmp('attachWindow').close();
                 }
             } ]
         });
         formWin.show();
     }