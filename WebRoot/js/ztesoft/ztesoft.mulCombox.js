Ext.ns("ZTESOFT");

if('function' !== typeof RegExp.escape) {
    RegExp.escape = function(s) {
        if('string' !== typeof s) {
            return s;
        }
        return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    };
}

ZTESOFT.mulComboboxField = Ext.extend(Ext.form.ComboBox, {
    constructor:function(config){
        this.cls= 'x-form-text-height-26px x-form-border-0px';
        this.triggerClass = 'x-form-trigger-height-26px x-form-border-0px';
        this.emptyText='--请选择--';
        this. checkField = 'checked';
        this.separator = ',';
        this.hiddenField = '';
        
        if (config.valueField) {
            this.valueField = config.valueField;
        }
        if (config.displayField) {
            this.displayField = config.displayField;
        }
        if (config.hiddenField) {
            this.hiddenField = config.hiddenField;
        }
        if(!this.tpl) {
            this.tpl = 
                 '<tpl for=".">'
                +'<div class="x-combo-list-item">'
                +'<img '
                +'class="ux-multiplecombo-icon ux-multiplecombo-icon-'
                +'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
                +'<div class="ux-multiplecombo-item-text">{' + (this.displayField || 'text' )+ '}</div>'
                +'</div>'
                +'</tpl>'
            ;
        };
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
        ZTESOFT.mulComboboxField.superclass.constructor.apply(this, arguments);
        this.on({
            scope:this
           ,beforequery:this.onBeforeQuery
           ,blur:this.onRealBlur
       });

       // remove selection from input field
       this.onLoad = this.onLoad.createSequence(function() {
           if(this.el) {
               var v = this.el.dom.value;
               this.el.dom.value = '';
               this.el.dom.value = v;
           }
       });
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
        
        ZTESOFT.mulComboboxField.superclass.onRender.apply(this, arguments);
    },
    
    initEvents:function() {
        ZTESOFT.mulComboboxField.superclass.initEvents.apply(this, arguments);
        this.keyNav.tab = false;
    },
    
    clearValue:function() {
        this.value = '';
        this.setRawValue(this.value);
        this.store.clearFilter();
        this.store.each(function(r) {
            r.set(this.checkField, false);
        }, this);
        if(this.hiddenField) {
            Ext.getCmp(this.hiddenField).setValue(this.value);
        }
        this.applyEmptyText();
    }, 
    
    /**
     * @return {String} separator (plus space) separated list of selected displayFields
     * @private
     */
    getCheckedDisplay:function() {
        var re = new RegExp(this.separator, "g");
        return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
    },
    
    
    /**
     * @return {String} separator separated list of selected valueFields
     * @private
     */
    getCheckedValue:function(field) {
        field = field || this.valueField;
        var c = [];

        // store may be filtered so get all records
        var snapshot = this.store.snapshot || this.store.data;

        snapshot.each(function(r) {
            if(r.get(this.checkField)) {
                c.push(r.get(field));
            }
        }, this);

        return c.join(this.separator);
    },
    
    /**
     * beforequery event handler - handles multiple selections
     * @param {Object} qe query event
     * @private
     */
    onBeforeQuery:function(qe) {
        qe.query = qe.query.replace(new RegExp(this.getCheckedDisplay() + '[ ' + this.separator + ']*'), '');
    },
    
    /**
     * blur event handler - runs only when real blur event is fired
     */
    onRealBlur:function() {
        this.list.hide();
        var rv = this.getRawValue();
        var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
        var va = [];
        var snapshot = this.store.snapshot || this.store.data;

        // iterate through raw values and records and check/uncheck items
        Ext.each(rva, function(v) {
            snapshot.each(function(r) {
                if(v === r.get(this.displayField)) {
                    va.push(r.get(this.valueField));
                }
            }, this);
        }, this);
        this.setValue(va.join(this.separator));
        this.store.clearFilter();
    },
    
    /**
     * Combo's onSelect override
     * @private
     * @param {Ext.data.Record} record record that has been selected in the list
     * @param {Number} index index of selected (clicked) record
     */
    onSelect:function(record, index) {
        if(this.fireEvent('beforeselect', this, record, index) !== false){

            // toggle checked field
            record.set(this.checkField, !record.get(this.checkField));

            // display full list
            if(this.store.isFiltered()) {
                this.doQuery(this.allQuery);
            }

            // set (update) value and fire event
            this.setValue(this.getCheckedValue());
            this.fireEvent('select', this, record, index);
        }
    },
    
    /**
     * Sets the value of the LovCombo
     * @param {Mixed} v value
     */
    setValue:function(v) {
        if(v) {
            v = '' + v;
            if(this.valueField) {
                this.store.clearFilter();
                this.store.each(function(r) {
                    var checked = false;
                    if(r && r.data){
                        if(r.data.checked){//手动选择
                            checked = r.data.checked;
                        }else{//初始化
                            checked = !(!v.match(
                                    '(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))
                                   +'(' + this.separator + '|$)'));
                        }
                    }
                    r.set(this.checkField, checked);
                }, this);
                this.value = this.getCheckedValue();
                this.setRawValue(this.getCheckedDisplay());
                if(this.hiddenField) {
                    Ext.getCmp(this.hiddenField).setValue(this.value);
                    //document.getElementById(this.hiddenField).value = this.value;
                }
            }else {
                this.value = v;
                this.setRawValue(v);
                if(this.hiddenField) {
                    Ext.getCmp(this.hiddenField).setValue(v);
                }
            }
            if(this.el) {
                this.el.removeClass(this.emptyClass);
            }
        }else {
            this.clearValue();
        }
    },
    
    /**
     * Selects all items
     */
    selectAll:function() {
        this.store.each(function(record){
            // toggle checked field
            record.set(this.checkField, true);
        }, this);

        //display full list
        this.doQuery(this.allQuery);
        this.setValue(this.getCheckedValue());
    },
    
    /**
     * Deselects all items. Synonym for clearValue
     */
    deselectAll:function() {
        this.clearValue();
    }
});
Ext.reg('ZTESOFT.mulComboboxField', ZTESOFT.mulComboboxField);