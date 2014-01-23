Ext.ns("ZTESOFT");

var fileList = new Array();
var _callback = null;
function uploadfinish(){
	//var fileList = new Array();
	//alert(uploadfileInfo+"   "+fileUploadCount +"  已完成"+uploadfinishfile);

}

ZTESOFT.FileUtil = function() {

    /**
     * 打开下载上传页面
     */
    this.uploadFile = function(param,callback) {
    	_callback = callback;
        var fileTypes = "*.*";
        var fileUploadLimit="30";
        var sizeLimit = 20;//最大文件大小,以M为单位
        if(param && !Ext.isEmpty(param.fileTypes)){
            fileTypes = param.fileTypes;
        }
        if(param && !Ext.isEmpty(param.fileUploadLimit)){
        	fileUploadLimit = param.fileUploadLimit;
        }
        clearFileList();
        upload_win(this,PATH+'/servlet/Upload?params='+'uploads,params1,params2',
        		'url:'+PATH+'/common/udf/win-upload.jsp','all file',fileTypes,sizeLimit,fileUploadLimit);
    }

    /**
     * 下载附件，目前只实现从文件夹读取文件并下载，对接paas之后，再实现从文件服务器读取
     */
    this.downloadFile = function(param) {

        var jsonStr = Ext.util.JSON.encode(param);
        
        if (!Ext.fly('downForm')) {

            var downForm = document.createElement('form');

            downForm.id = 'downForm';

            downForm.name = 'downForm';

            downForm.className = 'x-hidden';

            downForm.action = PATH + '/file/download.json';

            downForm.method = 'post';

            // downForm .target = '_blank'; //打开新的下载页面

            
            var data = document.createElement('input');

            data.type = 'hidden';// 隐藏域

            data.name = 'jsonStr';// form表单参数

            data.value = jsonStr;// form表单值

            downForm.appendChild(data);

            document.body.appendChild(downForm);

        }

        Ext.fly('downForm').dom.submit();

        if (Ext.fly('downForm')) {

            document.body.removeChild(downForm);

        }
    }

    /**
     * 打开导入excel页面
     */
    this.uploadExcel = function(param,callback) {
        
      //简单表格使用默认日处理类
        var action = PATH + '/excel/readExcel.json';
        if (param && param.action && param.action.length != 0) {
            action = param.action;
        }
        
        var btn = new ZTESOFT.Button({ 
            id : 'fileData', 
            text : '浏览', 
            listeners : { 
                   render : function() { 
                        var button_container = this.el.child("em"); 
                        button_container.position("relative"); 
                        this.input_file = Ext.DomHelper.append(button_container, { 
                            tag : "input", 
                            type : "file", 
                            size : 1, 
                            name : this.input_name || Ext.id(this.el), 
                            style : "z-index: 99999;position: absolute;display: block; border: none;cursor: pointer;"
                        }, true); 
                        this.input_file.setOpacity(0); 
                        this.input_file.on("click", function(e) { 
                            e.stopPropagation() 
                        }) 
                        this.input_file.on("change", function(e) { 
                            var value = this.input_file.dom.value; 
                            fileForm.getForm().findField('fileLabel').setValue(value); 
                        },this) 
                        btn_cont = this.el.child("em"); 
                        btn_box = btn_cont.getBox(); 
                        this.input_file.setStyle("font-size", (btn_box.width * 0.5) + "px"); 
                        inp_box = this.input_file.getBox(); 
                        adj = { 
                            x : 40, 
                            y : 3 
                        }; 
                        this.input_file.setLeft(btn_box.width - inp_box.width + adj.x+ "px"); 
                        this.input_file.setTop(btn_box.height - inp_box.height + adj.y  + "px") 
                } 
            } 
            }); 

        
        var fileForm = new Ext.FormPanel({
            id:'fileForm',
            region: 'center',
            labelAlign: 'left',
            fileUpload: true,
            frame:true,
            autoScroll :true,
            width:500,
            bodyStyle: 'padding:0px;overflow-x:hidden;overflow-y:auto;',
            buttonAlign: 'center',
            layout:'table',
            layoutConfig:{
            	columns:2
            },
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',//标签的对齐方式
                hideLabel : true,
                //width : 120,//最小是120，最大190
                height : 30
            },
            items: [{
            	cospan:1,
            	width:120,
            	items:[{
            	 xtype : 'ZTESOFT.label',
                 text : '文件'}]
            },{
            	cospan:1,
            	layout:'column',
            	width:350,
            	items:[{
            	       layout:'form',
            	       width:260,
            	       items:[
							{	
							    xtype:'ZTESOFT.textfield',
							    //fieldLabel: '文件',
							    hideLabel:true,
							    id: 'fileLabel',
							    name: 'fileLabel',
							    readOnly:true,
							    allowBlank:false,
							    anchor:'100%'
							}]},{
								layout:'form',
								items:[btn]
							}
            	       ]
            }
        ]});
        
        // 开打导入页面
        new Ext.Window({
            id : 'fileWin',
            width : 500,
            title : '文件上传',
            height : 160,
            modal: true,
            layout : 'fit',
            items : [fileForm],
            buttonAlign:'center',
            buttons:[{
                text:'开始上传',
                xtype: 'ZTESOFT.Button',
                type:'submit',
                handler:function(){
                    //验证表单填写的数据是否有效
                    if (!fileForm.getForm().isValid()) { 
                        return;
                    }
                    var filePath = Ext.getCmp('fileLabel').getValue();
                    var fileType=filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
                    
                    if(fileType==null || !(fileType=='.xls' || fileType=='.xlsx')){
                        Ext.Msg.alert('操作提示', "请选择excel格式的文件。");
                        return;
                    }

                    fileForm.form.submit({
                        url:action,
                        params: param,
                        waitMsg:'正在上传...',
                        method: 'post',
                        success:function(form, action){
                            var result = action.result;
                            if(callback){
                                callback.call(this,result);
                            }
                            Ext.getCmp('fileWin').close();
                        },
                        failure:function(form,action){
                            var result = action.result;
                            if(callback){
                                callback.call(this,result);
                            }else{
                                Ext.Msg.alert('操作提示',result.msg);
                            }
                            Ext.getCmp('fileWin').close();
                        }
                    })
                  }
                },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('fileWin').close();
                }
            }]
        }).show();
        
        //Ext.get('fileData').dom.click();
        
        
        // 打开导入页面
        /*
         * var retVal = window.showModalDialog(PATH + '/common/udf/excelRead.jsp', param,
         * "dialogWidth=500px;dialogHeight=300px");
         * 
         * return retVal;
         */

    }

    /**
     * 打开导出excel入页面
     */
    this.exportData = function(param) {
        
        var exportForm = new Ext.FormPanel({
            id:'exportForm',
            region: 'center',
            labelAlign: 'right',
            frame:true,
            autoScroll :true,
            width:500,
            bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;',
            buttonAlign: 'center',
            labelWidth: 70,
            items: [
               {
                   layout:'column',
                   items:[{
                       columnWidth:1,
                       layout: 'form',
                       items: [{
                               xtype:'radiogroup',
                               fieldLabel: '导出范围',
                               name: 'gexportType',
                               id: 'gexportType',
                               anchor:'95%',
                               height:30,
                               items: [           
                                       {boxLabel: '导出所选数据', width: 75, name: 'exportType', inputValue: 'SELECTED', checked: true},   
                                       {boxLabel: '导出所有数据', width: 75, name: 'exportType', inputValue: 'ALL'}
                               ]
                           }]
                       }
                  ]},
                  {
                      layout:'column',
                      items:[{
                          columnWidth:1,
                          layout: 'form',
                          items: [{
                              xtype:'radiogroup',
                              fieldLabel: '导出格式',
                              name: 'gfileType',
                              id: 'gfileType',
                              anchor:'95%',
                              height:30,
                              items: [           
                                      {boxLabel: 'EXCEL', width: 40, name: 'fileType', inputValue: 'EXCEL', checked: true}
                                      //{boxLabel: 'WORD', width: 60, name: 'fileType', inputValue: 'WORD'},
                                      //{boxLabel: '',hidden:true},
                                      //{boxLabel: '',hidden:true} 
                              ]
                              }]
                          }
                     ]}
        ]});
        
     // 打开导出页面
        new Ext.Window({
            id : 'exportWin',
            width : 400,
            modal: true,
            title : '导出',
            height : 220,
            layout : 'fit',
            items : [exportForm],
            buttonAlign:'center',
            buttons:[{
                text:'确定',
                xtype: 'ZTESOFT.Button',
                type:'submit',
                handler:function(){
                    //验证表单填写的数据是否有效
                    if (!exportForm.getForm().isValid()) { 
                        return;
                    }
                    
                    //param.fileName =  Ext.getCmp('fileName').getValue();
                    
                    param.fileType = Ext.getCmp('gfileType').getValue().inputValue;
                    
                    param.exportType =Ext.getCmp('gexportType').getValue().inputValue;
                    //param.exportType = 'ALL';
                    
                    // 导出
                    exportExcel(param);
                    Ext.getCmp('exportWin').close();
                  }
                },{
                text: '取消',
                xtype: 'ZTESOFT.Button',
                //color: 'gray',
                onClick:function(){
                    Ext.getCmp('exportWin').close();
                }
            }]
        }).show();

    }
};

/**
 * 导出excel文件
 */
function exportExcel(param) {

    var jsonStr = Ext.util.JSON.encode(param);
    
    if (!Ext.fly('downForm')) {

        var downForm = document.createElement('form');

        downForm.id = 'downForm';

        downForm.name = 'downForm';

        downForm.className = 'x-hidden';

        downForm.action = PATH + '/excel/exportExcel.do';

        downForm.method = 'post';
        
        var data = document.createElement('input');

        data.type = 'hidden';// 隐藏域

        data.name = 'jsonStr';// form表单参数

        data.value = jsonStr;// form表单值

        downForm.appendChild(data);

        document.body.appendChild(downForm);

    }

    Ext.fly('downForm').dom.submit();

    if (Ext.fly('downForm')) {

        document.body.removeChild(downForm);

    }
};