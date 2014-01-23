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
            
        }else if(config.color =='gray'){
            this.cls = 'graybutton';
            this.btn_text = 'zs-btn-gray-text';
        }else if(config.text.length <=2){
            this.cls = 'redbutton';
        }else{
            this.cls = 'bluebutton';
        }
        
        ZTESOFT.Button.superclass.constructor.apply(this, arguments);
    },
    setIconClass : function(cls){
        //ZTESOFT.Button.superclass.onMouseOut.apply(this, arguments);
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