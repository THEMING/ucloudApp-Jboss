Ext.ns("UCDF");

/*UCDF.Link = Ext.extend(Ext.Button, {
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
Ext.reg('UCDF.Link', UCDF.Link);*/


UCDF.Button = Ext.extend(Ext.Button, {
	
	    onRender : function(ct, position){
        if(!this.template){
            if(!Ext.Button.buttonTemplate){
                
                Ext.Button.buttonTemplate = new Ext.Template(
                    '<table>',
                    '<tr><td><button type="{0}"></button></td></tr>',
                    '</table>');
                Ext.Button.buttonTemplate.compile();
            }
            this.template = Ext.Button.buttonTemplate;
        }

        var btn, targs = this.getTemplateArgs();

        if(position){
            btn = this.template.insertBefore(position, targs, true);
        }else{
            btn = this.template.append(ct, targs, true);
        }
        
        this.btnEl = btn.child(this.buttonSelector);
        this.mon(this.btnEl, {
            scope: this,
            focus: this.onFocus,
            blur: this.onBlur
        });

        this.initButtonEl(btn, this.btnEl);

        Ext.ButtonToggleMgr.register(this);
    },
    	
   	setIconClass : function(cls){
        this.iconCls = cls;
        if(this.el){
            this.btnEl.dom.className = '';
            this.btnEl.addClass(['Manage_operation_button', cls || '']);
            this.setButtonClass();
        }
        return this;
    }
  
    //constructor:function(config){
        //this.btn_text = 'ucdf-btn-text';
        //this.cls = 'Manage_operation_button';
        
        /*this.width = 82;
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
        }*/
        
        //UCDF.Button.superclass.constructor.apply(this, arguments);
   // }

});
Ext.reg('UCDF.Button', UCDF.Button);
