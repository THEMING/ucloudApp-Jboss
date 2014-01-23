Ext.ns("ZTESOFT");

ZTESOFT.Combobox = Ext.extend(Ext.form.ComboBox, {
/*    dict : false,
    url : null,
    valueField : 'dataValue',
    displayField : 'dataName',
    hasBlank : true,*/
    //typeAhead : true,
    //forceSelection:true,
    //mode: 'local',
    //triggerAction : 'all',

    constructor : function(config) {
    	if (config.valueField) {
            this.valueField = config.valueField;
        }
        if (config.displayField) {
            this.displayField = config.displayField;
        }
        if (config.dict) {
            this.url = PATH + '/commondata/commonDataAction.json?method=qryDictData&dictType='
                    + config.dictType;
            if (config.hasBlank) {
                this.url += '&hasBlank=true';
            } else {
                this.url += '&hasBlank=false';
            }

        } else {
            this.url = config.url;
            
        }

        // url:PATH+'/commondata/commonDataAction.json?method=qryDictData&dictType=2',

        this.store = new Ext.data.JsonStore({
            remoteSort : true,
            baseParams : config.baseParams,
            fields : [ this.valueField, this.displayField ],
            proxy : new Ext.data.HttpProxy({
                url : this.url
            }),
            listeners : {
                'load' : function() {
                    if(config.value!=null){
                        Ext.getCmp(config.id).setValue(config.value);
                    }
                    
                }
            }
        });

        this.store.on('loadexception', function() {
            //Ext.Msg.alert('操作提示', '加载数据失败');
        });

        this.store.load();
        

        // this.setValue('');
        // this.setRawValue('全部');
        ZTESOFT.Combobox.superclass.constructor.apply(this, arguments);

    }

});
Ext.reg('ZTESOFT.Combobox', ZTESOFT.Combobox);
