Ext.ns("ZTESOFT");

ZTESOFT.Popup = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        ZTESOFT.Popup.superclass.initComponent.call(this);
        
        /*
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
        */
    },

    //重载方法，处理当设置readonly等属性时的显示

    updateEditState: function(){
        if(this.rendered){
            if (this.readOnly) {
                this.el.dom.readOnly = true;
                this.el.addClass('x-trigger-noedit');
                this.mun(this.el, 'click', this.onTriggerClick, this);
                //this.trigger.setDisplayed(false);
            } else {
                if (!this.editable) {
                    this.el.dom.readOnly = true;
                    this.el.addClass('x-trigger-noedit');
                    this.mon(this.el, 'click', this.onTriggerClick, this);
                    
                    this.trigger.setDisplayed(false);
                } else {
                    this.el.dom.readOnly = false;
                    this.el.removeClass('x-trigger-noedit');
                    this.mun(this.el, 'click', this.onTriggerClick, this);
                    
                    this.trigger.setDisplayed(true);
                }
                //this.trigger.setDisplayed(!this.hideTrigger);
            }
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    
    validationEvent:true,
    validateOnBlur:true,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',
    
    valueFile : '',
    
    onPopup : function(){
    },
    
    onTrigger1Click : function(){
        this.setValue('');
        if(!Ext.isEmpty(this.valueFile))
            Ext.getCmp(this.valueFile).setValue('');
    },

    onTrigger2Click : function(){
        this.onPopup();
    }
    
    
});
Ext.reg('ZTESOFT.Popup',ZTESOFT.Popup);

ZTESOFT.Date = Ext.extend(Ext.form.TextField, {
    // 隐藏的存放返回ID值的hidden field的ID,用于清除操作.
    constructor : function(config) {
        ZTESOFT.Popup.superclass.constructor.apply(this, arguments);
        this.on('render', function(f, e) {
            this.getEl().on('click', function(p) {
                // 处理点击事件代码
                SelectDate(Ext.getDom(config.id));
            });
        }, this);
    },
    initComponent : function() {
        ZTESOFT.Date.superclass.initComponent.call(this);
        this.addEvents('autosize', 'keydown', 'keyup', 'keypress', 'dblclick','click');
    },
    onRender : function(ct, position){
        ZTESOFT.Date.superclass.onRender.apply(this, arguments);
        this.el.addClass('zs-date-x-form-text x-form-focus');
    }
    

});
Ext.reg('ZTESOFT.date', ZTESOFT.Date);