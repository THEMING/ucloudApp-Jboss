Ext.ns("ZTESOFT");

ZTESOFT.Link = Ext.extend(Ext.Button, {
    onMouseOver : function(e){
        if(!this.disabled){
            var internal = e.within(this.el,  true);
            if(!internal){
                this.btnEl.addClass('zs-link-over');
            }
        }
        ZTESOFT.Link.superclass.onMouseOver.apply(this, arguments);
    },
    onMouseOut : function(e){
        this.btnEl.removeClass('zs-link-over');
        ZTESOFT.Link.superclass.onMouseOut.apply(this, arguments);
    }

});
Ext.reg('ZTESOFT.Link', ZTESOFT.Link);


ZTESOFT.Button = Ext.extend(Ext.Button, {
  
    constructor:function(config){
        this.btn_text = 'zs-btn-text';
        this.width = 82;
        
        if(config.disabled){
            if(config.text.length <=2){
                this.cls = 'graybutton';
                this.btn_text = 'zs-btn-gray-text';
            }else{
                this.cls = 'disabledbutton';
                this.btn_text = 'zs-btn-gray-text'; 
            }
            
        }else if(config.color){
            if(config.color =='gray'){
                this.cls = 'graybutton';
                this.btn_text = 'zs-btn-gray-text';
            }else if(config.color =='red'){
                this.cls = 'redbutton';
            }else{
                this.cls = 'bluebutton';
            }
            
        }else if(config.text =='取消' || config.text =='关闭' || config.text =='重置'){
            this.cls = 'graybutton';
            this.btn_text = 'zs-btn-gray-text';
        }else if(config.text.length <=2){
            this.cls = 'redbutton';
        }else if(config.text =='高级检索'){
            this.cls = 'bluebutton';
        }else if(config.text.length == 3){
            this.cls = 'graybutton';
            this.btn_text = 'zs-btn-gray-text';
        }else if(config.text.length >= 4){
            this.cls = 'graybuttonB4';
            this.btn_text = 'zs-btn-gray-text';
        }
        
        ZTESOFT.Button.superclass.constructor.apply(this, arguments);
    },
    setIconClass : function(cls){
        this.iconCls = cls;
        if(this.el){
            this.btnEl.dom.className = '';
            this.btnEl.addClass([this.btn_text, cls || '']);//x-btn-text 
            this.setButtonClass();
        }
        return this;
    }

});
Ext.reg('ZTESOFT.Button', ZTESOFT.Button);