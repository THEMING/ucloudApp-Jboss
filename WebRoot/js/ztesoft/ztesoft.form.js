Ext.ns("ZTESOFT");

//强制window控制在viewport中
Ext.override(Ext.Window, {
    constrain:true
});

ZTESOFT.Label = Ext.extend(Ext.form.Label, {
    constructor:function(config){
        this.style= 'font-size:12px;text-align:center;';
        this.cls = 'zs-x-label';
        this.autoWidth = true;
       ZTESOFT.Label.superclass.constructor.apply(this, arguments);
   }
});
Ext.reg('ZTESOFT.label', ZTESOFT.Label);

ZTESOFT.Textfield = Ext.extend(Ext.form.TextField, {
    initComponent : function(){
        //x-form-text zs-x-form-field x-form-focus
        this.focusClass = "x-form-focus";
        //this.fieldClass = "zs-x-form-field";
        this.cls= 'x-form-text-height-26px x-form-border-0px';
        this.triggerClass = 'x-form-trigger-height-26px x-form-border-0px';
        this.listeners = {
            render:function(field){
                field.getEl().on('mouseover', function(){
                    if(field.getValue()){
                        var componentWidth = field.getWidth();//控件宽度
                        var contentWidth = field.el.getTextWidth(field.getValue())+10;//控件内容宽度+10px，其中10px是内容和边框之间的宽度
                        if(contentWidth >= componentWidth){
                            Ext.QuickTips.enable();
                            Ext.QuickTips.register({
                                target: field.el,
                                text: field.getValue()
                            })
                        }else{
                            Ext.QuickTips.disable();
                        }
                    }
                });
             }
        };
        Ext.form.TextField.superclass.initComponent.call(this);
        this.addEvents(
            
            'autosize',

            
            'keydown',
            
            'keyup',
            
            'keypress'
        );
    },
    onRender : function(ct, position){
        if(!this.el){
            var cfg = this.getAutoCreate();

            if(!cfg.name){
                cfg.name = this.name || this.id;
            }
            if(this.inputType){
                cfg.type = this.inputType;
            }
            this.autoEl = cfg;
        }
        Ext.form.Field.superclass.onRender.call(this, ct, position);
        if(this.submitValue === false){
            this.el.dom.removeAttribute('name');
        }
        var type = this.el.dom.type;
        if(type){
            if(type == 'password'){
                type = 'text';
            }
            this.el.addClass('zs-x-form-'+type);
        }
        if(this.readOnly){
            this.setReadOnly(true);
        }
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        this.el.addClass([this.triggerClass, this.cls]);
    }
});
Ext.reg('ZTESOFT.textfield', ZTESOFT.Textfield);

ZTESOFT.Numberfield = Ext.extend(Ext.form.NumberField , {
    initComponent : function(){
        //x-form-text zs-x-form-field x-form-focus
        this.cls= 'x-form-text-height-26px x-form-border-0px';
        this.fieldClass = 'x-form-trigger-height-26px x-form-border-0px';
        this.listeners = {
                render:function(field){
                    field.getEl().on('mouseover', function(){
                        if(field.getValue()){
                            var componentWidth = field.getWidth();//控件宽度
                            var contentWidth = field.el.getTextWidth(field.getValue())+10;//控件内容宽度+10px，其中10px是内容和边框之间的宽度
                            if(contentWidth >= componentWidth){
                                Ext.QuickTips.enable();
                                Ext.QuickTips.register({
                                    target: field.el,
                                    text: field.getValue()
                                })
                            }else{
                                Ext.QuickTips.disable();
                            }
                        }
                    });
                 }
            };
        Ext.form.NumberField.superclass.initComponent.call(this);
        this.addEvents(
            
            'autosize',

            
            'keydown',
            
            'keyup',
            
            'keypress'
        );
    },
    onRender : function(ct, position){
        if(!this.el){
            var cfg = this.getAutoCreate();

            if(!cfg.name){
                cfg.name = this.name || this.id;
            }
            if(this.inputType){
                cfg.type = this.inputType;
            }
            this.autoEl = cfg;
        }
        Ext.form.Field.superclass.onRender.call(this, ct, position);
        if(this.submitValue === false){
            this.el.dom.removeAttribute('name');
        }
        var type = this.el.dom.type;
        if(type){
            if(type == 'password'){
                type = 'text';
            }
            this.el.addClass('zs-x-form-'+type);
        }
        if(this.readOnly){
            this.setReadOnly(true);
        }
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }

        this.el.addClass([this.fieldClass, this.cls]);
    }
});
Ext.reg('ZTESOFT.numberfield', ZTESOFT.Numberfield);

ZTESOFT.EmunField = Ext.extend(ZTESOFT.Combobox, {
    constructor:function(config){
        /*this.fieldClass = 'zs-x-form-field';*/
        this.cls= 'x-form-text-height-26px x-form-border-0px';
        this.triggerClass = 'x-form-trigger-height-26px x-form-border-0px';
        this.emptyText='--请选择--';
        this.listeners = {
                render:function(field){
                    field.getEl().on('mouseover', function(){
                        if(field.getValue()){
                            var componentWidth = field.getWidth();//控件宽度
                            var contentWidth = field.el.getTextWidth(field.getRawValue())+10;//控件内容宽度+10px，其中10px是内容和边框之间的宽度
                            if(contentWidth >= componentWidth){
                                Ext.QuickTips.enable();
                                Ext.QuickTips.register({
                                    target: field.el,
                                    text: field.getRawValue()
                                })
                            }else{
                                Ext.QuickTips.disable();
                            }
                        }
                    });
                 }
            };
        ZTESOFT.EmunField.superclass.constructor.apply(this, arguments);
    },
    onRender : function(ct, position) {
        if (!this.el) {
            var cfg = this.getAutoCreate();

            if (!cfg.name) {
                cfg.name = this.name || this.id;
            }
            if (this.inputType) {
                cfg.type = this.inputType;
            }
            this.autoEl = cfg;
        }
        Ext.form.Field.superclass.onRender.call(this, ct, position);
        if (this.submitValue === false) {
            this.el.dom.removeAttribute('name');
        }
        var type = this.el.dom.type;
        if (type) {
            if (type == 'password') {
                type = 'text';
            }
            this.el.addClass('zs-x-form-' + type);
        }
        if (this.readOnly) {
            this.setReadOnly(true);
        }
        if (this.tabIndex !== undefined) {
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }

        this.el.addClass([ this.triggerClass, this.cls ]);
        
        ZTESOFT.EmunField.superclass.onRender.apply(this, arguments);
    }
}); 
Ext.reg('ZTESOFT.enum', ZTESOFT.EmunField);

ZTESOFT.combofield = Ext.extend(Ext.form.ComboBox, {
    constructor:function(config){
        //this.fieldClass = 'zs-x-form-field';
        this.cls= 'x-form-text-height-26px x-form-border-0px';
        this.triggerClass = 'x-form-trigger-height-26px x-form-border-0px';
        this.emptyText='--请选择--';
        this.listeners = {
                render:function(field){
                    field.getEl().on('mouseover', function(){
                        if(field.getValue()){
                            var componentWidth = field.getWidth();//控件宽度
                            var contentWidth = field.el.getTextWidth(field.getRawValue())+10;//控件内容宽度+10px，其中10px是内容和边框之间的宽度
                            if(contentWidth >= componentWidth){
                                Ext.QuickTips.enable();
                                Ext.QuickTips.register({
                                    target: field.el,
                                    text: field.getRawValue()
                                })
                            }else{
                                Ext.QuickTips.disable();
                            }
                        }
                    });
                 }
            };
        ZTESOFT.combofield.superclass.constructor.apply(this, arguments);
    },
    onRender : function(ct, position) {
        if (!this.el) {
            var cfg = this.getAutoCreate();

            if (!cfg.name) {
                cfg.name = this.name || this.id;
            }
            if (this.inputType) {
                cfg.type = this.inputType;
            }
            this.autoEl = cfg;
        }
        Ext.form.Field.superclass.onRender.call(this, ct, position);
        if (this.submitValue === false) {
            this.el.dom.removeAttribute('name');
        }
        var type = this.el.dom.type;
        if (type) {
            if (type == 'password') {
                type = 'text';
            }
            this.el.addClass('zs-x-form-' + type);
        }
        if (this.readOnly) {
            this.setReadOnly(true);
        }
        if (this.tabIndex !== undefined) {
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }

        this.el.addClass([ this.triggerClass, this.cls ]);
        
        ZTESOFT.combofield.superclass.onRender.apply(this, arguments);
    }
});
Ext.reg('ZTESOFT.combofield', ZTESOFT.combofield);

ZTESOFT.popupfield = Ext.extend(ZTESOFT.Popup , {
    constructor:function(config){
      //  this.fieldClass = 'zs-x-form-field';
        this.cls= 'x-form-text-height-26px x-form-border-0px';
        this.triggerClass = 'x-form-trigger-height-26px x-form-border-0px';
        this.listeners = {
                render:function(field){
                    field.getEl().on('mouseover', function(){
                        if(field.getValue()){
                            var componentWidth = field.getWidth();//控件宽度
                            var contentWidth = field.el.getTextWidth(field.getValue())+10;//控件内容宽度+10px，其中10px是内容和边框之间的宽度
                            if(contentWidth >= componentWidth){
                                Ext.QuickTips.enable();
                                Ext.QuickTips.register({
                                    target: field.el,
                                    text: field.getValue()
                                })
                            }else{
                                Ext.QuickTips.disable();
                            }
                        }
                    });
                 }
            };
        ZTESOFT.popupfield.superclass.constructor.apply(this, arguments);
    },
    onRender : function(ct, position) {
        if (!this.el) {
            var cfg = this.getAutoCreate();

            if (!cfg.name) {
                cfg.name = this.name || this.id;
            }
            if (this.inputType) {
                cfg.type = this.inputType;
            }
            this.autoEl = cfg;
        }
        Ext.form.Field.superclass.onRender.call(this, ct, position);
        if (this.submitValue === false) {
            this.el.dom.removeAttribute('name');
        }
        var type = this.el.dom.type;
        if (type) {
            if (type == 'password') {
                type = 'text';
            }
            this.el.addClass('zs-x-form-' + type);
        }
        if (this.readOnly) {
            this.setReadOnly(true);
        }
        if (this.tabIndex !== undefined) {
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }

        this.el.addClass([ this.fieldClass, this.cls ]);
        
        ZTESOFT.popupfield.superclass.onRender.apply(this, arguments);
    }
});
Ext.reg('ZTESOFT.popupfield', ZTESOFT.popupfield);

ZTESOFT.Checkbox = Ext.extend(Ext.form.Checkbox , {
    
});
Ext.reg('ZTESOFT.checkbox', ZTESOFT.Checkbox);

/**附件详情自定义控件

 * create by stephen zhou 2013-5-27
 * **/
ZTESOFT.AttachmentPanel = Ext.extend(Ext.Panel,{
    constructor:function(config){
        this.align = "left";
        this.cls = "zs-attachment";
        ZTESOFT.AttachmentPanel.superclass.constructor.apply(this,arguments);
    },
    onRender:function(ct,postion){
        var htmlText = "";
        if(this.operType=='DETAIL'){
            if(this.detailValues==null){
                htmlText = '<div id="_att_upl_Div_'+this.id+'"  style="line-height:15px;height:100px;margin:10px;">已上传<font color="#d7191f">'+
                0+'</font>份文件</br></div>'+
                '<div id="_att_uplFiles_Div_'+this.id+'" style="display:none;"></div>'+
                '<div id="_att_removeFiles_Div_'+this.id+'" style="display:none;"></div>'+
                '<div id="_att_files_info_Div_'+this.id+'" style="line-height:15px;">';
            }else{
                var detailValues = this.detailValues;
                var attNums = new Array();
                var attNames = new Array();
                var attIds = new Array();
                attNums = detailValues.attNums;//库表ID
                attNames = detailValues.attNames;//文件名

                attIds = detailValues.attIds;//文件Id
                var checkAllDataText = "checkAllData('"+this.id+"')";
                htmlText = '<div id="_att_upl_Div_'+this.id+'"  style="line-height:15px;margin:10px;">已上传<font color="#d7191f">'+
                attIds.length+'</font>份文件[ <a href="javascript:void(0);" class="zs-link-all" filesNums=\''+attIds.length+'\''+
                ' onclick="'+checkAllDataText+'" fileLimit="'+this.fileLimit+'" fileTypes="'+this.fileTypes+'"'+
                '>查看所有</a> ]</br></div>'+
                '<div id="_att_uplFiles_Div_'+this.id+'"  style="line-height:15px;display:none;"></div>'+
                '<div id="_att_removeFiles_Div_'+this.id+'"  style="line-height:15px;display:none;"></div>'+
                '<div id="_att_files_info_Div_'+this.id+'" style="line-height:15px;">';
                for(var v=0; v< attIds.length; v++ ){
                    var attNum = v+ 1;
                    var attName = attNames[v];
                    var attId = attIds[v];
                    var removeText = "removeFile(this.attributes['spanId'].nodeValue,this.attributes['from'].nodeValue,'"
                        +this.id+"','"+this.fileLimit+"','"+this.fileTypes+"')";
                    var downText = "downloadFile(this.attributes['fileId'].nodeValue,this.attributes['fileName'].nodeValue)";
                    htmlText +='<span id="'+this.id+'_span_db_'+v+' " style="margin:10px" attId="'+attId+'" attName="'+attName+'">'+ attNum+'、 '+attName + '[<a href="javascript:void(0);" fileId="'+attId+'" fileName="'+attName+
                    '" class="zs-link-all" onclick="'+downText+
                    '">'
                    +'下载</a>]</span><br/>';
                }
            }
        }else{
            if( this.detailValues!=null){
                var detailValues = this.detailValues;
                var attNums = new Array();
                var attNames = new Array();
                var attIds = new Array();
                //alert(this.id);
                attNums = detailValues.attNums;//库表ID
                attNames = detailValues.attNames;//文件名

                attIds = detailValues.attIds;//文件Id
                var uploadText = "uploadFiles(this.attributes['filesNums'].nodeValue,this.attributes['fileLimit'].nodeValue,this.attributes['fileTypes'].nodeValue,'"+this.id+"')";
                var checkAllDataText = "checkAllData('"+this.id+"')";
                //var jsonstr = JSON.stringify(this.detailValues);
                htmlText = '<div id="_att_upl_Div_'+this.id+'" style="line-height:15px;margin:10px;">已上传<font color="#d7191f">'+attIds.length+
                '</font>份文件[ <a href="javascript:void(0);" class="zs-link-all" filesNums=\''+attIds.length+'\''+
                ' onclick="'+checkAllDataText+'" fileLimit="'+this.fileLimit+'" fileTypes="'+this.fileTypes+'"'+
                '>查看所有</a> ][ <a href="javascript:void(0);" class="zs-link-all" filesNums=\''+attIds.length+'\''+
                ' onclick="'+uploadText+'" fileLimit="'+this.fileLimit+'" fileTypes="'+this.fileTypes+'"'+
                '>上传附件 </a> ]</br></div> '+
                '<div id="_att_removeFiles_Div_'+this.id+'" style="line-height:15px;display:none;"></div>'+
                '<div id="_att_uplFiles_Div_'+this.id+'" style="line-height:15px;display:none;"></div>'+
                '<div id="_att_files_info_Div_'+this.id+'" style="line-height:15px;" >';
                for(var v=0; v< attIds.length; v++ ){
                    var attNum = attNums[v];
                    var attName = attNames[v];
                    var attId = attIds[v];
                    var attSeq = v+1;
                    var removeText = "removeFile(this.attributes['spanId'].nodeValue,this.attributes['from'].nodeValue,this.attributes['attNum'].nodeValue,'"
                        +this.id+"','"+this.fileLimit+"','"+this.fileTypes+"')";
                    var downText = "downloadFile(this.attributes['fileId'].nodeValue,this.attributes['fileName'].nodeValue)";
                    htmlText +='<span id="'+this.id+'_span_db_'+v+'" style="margin:10px" attId="'+attId+'" attName="'+attName+'">'+ attSeq+'、 '+attName + '[<a href="javascript:void(0);" fileId="'+attId+'" fileName="'+attName+
                    '" class="zs-link-all" onclick="'+downText+
                    '">'
                    +'下载</a>]'+
                    '[<a href="javascript:void(0);" from="db" fileId="'+attId+'" fileName="'+attName+
                    '" class="zs-link-all" attNum="'+attNum+'"  spanId="'+this.id+'_span_db_'+v+'" onclick="'+removeText+
                    '">'
                    +'移除</a>]</span><br/>';
            }
            htmlText+='</div>';
            //htmlText+='<div id="_att_removeFiles_Div_'+this.id+'"></div>';
            htmlText+='<div id="_hidden_db_Div_'+this.id+'" >';
            for(var v=0; v< attIds.length; v++ ){
                //var attNum = v+ 1;
                var attNum = attNums[v];
                var attName = attNames[v];
                var attId = attIds[v];
                htmlText+='<input type="hidden" id="'+this.id+'_div_input_'+attNum+'" value="'+attNum+'\\'+attName+'\\'+attId+'"/>';
            }
            htmlText+='</div>';
        }else{
            //var jsonstr = JSON.stringify(this.detailValues);
            var uploadText = "uploadFiles(this.attributes['filesNums'].nodeValue,this.attributes['fileLimit'].nodeValue,this.attributes['fileTypes'].nodeValue,'"+this.id+"')";
            htmlText = '<div id="_att_upl_Div_'+this.id+'" style="line-height:15px;height:100px;margin:10px;">已上传<font color="#d7191f">0</font>份文件  '+
            '[<a href="javascript:void(0);" class="zs-link-all" filesNums=0 '+
            ' fileLimit='+this.fileLimit+' fileTypes='+this.fileTypes+''+
            ' onclick="'+uploadText+'" >上传附件</a>]</br> </div>'+
            '<div id="_att_removeFiles_Div_'+this.id+'" style="display:none;"></div>'+
            '<div id="_att_uplFiles_Div_'+this.id+'" style="line-height:15px;display:none;" ></div>'+
            '<div id="_hidden_db_Div_'+this.id+'" style="line-height:15px;" ></div>'+
            '<div id="_att_files_info_Div_'+this.id+'"  style="line-height:15px;"></div>';
        }
        }
        this.html = htmlText;
        ZTESOFT.AttachmentPanel.superclass.onRender.apply(this,arguments);
    }
});
Ext.reg('ZTESOFT.attachmentPanel',ZTESOFT.AttachmentPanel);

ZTESOFT.Textarea = Ext.extend(Ext.form.TextArea, {
    initComponent : function(){
        this.fieldClass = "zs-x-form-textarea";
        ZTESOFT.Textarea.superclass.initComponent.call(this);
    }
});
Ext.reg('ZTESOFT.textarea', ZTESOFT.Textarea);

/**气泡方法重写*/

Ext.override(Ext.form.Field, {
    oldMsg : '',
    markInvalid : function(errors) {
        var me = this;
        errors=errors||this.invalidText;
        
        if (this.ownerCt
                && (this.ownerCt.$className === 'Ext.grid.CellEditor' || this.ownerCt.$className === 'Ext.grid.RowEditor'))
        {
            this.callParent(arguments);
        }
        else if (true) {
            try {
                //.el.dom.parentElement.parentElement.parentElement.parentElement
                if(this.xtype=='ZTESOFT.datefield'||this.xtype=='ZTESOFT.combofield'
                    ||this.xtype=='ZTESOFT.popupfield'||this.xtype=='ZTESOFT.enum'){
                    /**add by stephen zhou 2013-6-19
                     *  use: 具有多个验证的情况下，验证下一个

                     *  俾下面啦，我真系史蒂芬周个老友来噶
                     * **/
                    var thisObj = this.getEl().dom.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(document.getElementById(thisObj.id+"_error")!=null||document.getElementById(thisObj.id+"_error")!=undefined){
                        var childDiv =document.getElementById(thisObj.id+"_error"); 
                        childDiv.removeNode(true);
                    }
                    /*************end**************/
                    setRmInputError_df(this.getEl().dom.parentElement.parentElement.parentElement.parentElement.parentElement);
                    writeValidateInfoAfterObject_df(errors, this.getEl().dom.parentElement.parentElement.parentElement.parentElement);
                }
                else{
                    /**add by stephen zhou 2013-6-19
                     *  use: 具有多个验证的情况下，验证下一个

                     *  史蒂芬周最后一次在UCloud项目写下滴代码

                     *  good bye Beijing!!!good bye ztesoft！！！

                     * **/
                    var thisObj = this.getEl().dom.parentElement.parentElement.parentElement;
                    if(document.getElementById(thisObj.id+"_error")!=null||document.getElementById(thisObj.id+"_error")!=undefined){
                        var childDiv =document.getElementById(thisObj.id+"_error"); 
                        childDiv.removeNode(true);
                    }
                    if(thisObj.className != "x-grid3-viewport" && thisObj.className != "x-grid3-scroller"){//可编辑gird，无须弹出气泡验证
                        setRmInputError_df(this.getEl().dom.parentElement.parentElement.parentElement.parentElement);
                        writeValidateInfoAfterObject_df(errors, this.getEl().dom.parentElement.parentElement.parentElement);
                    }
                    /*************end**************/
                }
                this.oldMsg = errors;
            } catch (e) {
                this.callParent(arguments);
            }
        }
    },
    clearInvalid : function() {
        if (this.ownerCt
                && (this.ownerCt.$className === 'Ext.grid.CellEditor' || this.ownerCt.$className === 'Ext.grid.RowEditor'))
            this.callParent(arguments);
        else {
            try {
                if(this.xtype=='ZTESOFT.datefield'||this.xtype=='ZTESOFT.combofield'
                    ||this.xtype=='ZTESOFT.popupfield'||this.xtype=='ZTESOFT.enum'){
                    hideValidateInfo_df(this.el.dom.parentElement.parentElement.parentElement.parentElement);
                    hideValidateInfo_df(this.el.dom.parentElement.parentElement.parentElement.parentElement.parentElement);
                }
                else{
                    hideValidateInfo_df(this.el.dom.parentElement.parentElement.parentElement);
                    hideValidateInfo_df(this.el.dom.parentElement.parentElement.parentElement.parentElement);
                }
                this.oldMsg = '';
            } catch (e) {
                this.callParent(arguments);
            }   
        }
    }
});
