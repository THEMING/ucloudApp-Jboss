Ext.ns("ZTESOFT");

ZTESOFT.invokeAction = function(action,param,successHandle){
    Ext.Ajax.request({ 
        url : action,
        method : 'post',
        sync : false,
        params : param , 
        success: function(response, options) { 
            if(successHandle){
                var responseArray = Ext.util.JSON.decode(response.responseText);
                successHandle.call(this,responseArray);
            }
        },
        failure : function(response, options) { 
            //var responseArray = Ext.util.JSON.decode(response.responseText); 
            Ext.Msg.alert('操作提示', '操作失败');
        }

    });

};

ZTESOFT.Synchronize = function(url,param) {
    var conn = new XMLHttpRequest();;  
    //conn[0]
    conn.open("post",url,false); 
    conn.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    conn.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    var data = '';
    for (prop in param) {
        if (param.hasOwnProperty(prop)) {
            data += encodeURIComponent(prop) + '=' + encodeURIComponent(param[prop]) + '&';
        }
    }
    data.substr(0, data.length - 1);
    conn.send(data);  
    
    if (conn.status == "200") { 
        var responseArray = Ext.util.JSON.decode(conn.responseText);
        return responseArray;
    }else{
        Ext.Msg.alert('操作提示', '操作失败');
    }
    
};


ZTESOFT.createGridStore = function(config){
    
    var store = new Ext.data.JsonStore({
        id:config.id,
        root : 'rows',
        totalProperty: 'total',
        remoteSort: false,
        fields: config.fields,
        proxy : new Ext.data.HttpProxy({
            url : config.url
        })
    }); 
    
    store.on('loadexception', function() {
        Ext.Msg.alert('操作提示', '加载数据失败');
    });
    
    
    return store;
};

ZTESOFT.createComboStore = function(config){
    var url = PATH + '/commondata/commonDataAction.json?method=qryDictData&dictType=';
    var valueField = 'dataValue';
    var displayField = 'dataName';
    var hasBlank = true;
    
    if (config.dict) {
        url += config.dictType;
        if (config.hasBlank) {
            url += '&hasBlank=true';
        } else {
            url += '&hasBlank=false';
        }

    } else {
        url = config.url;
        if (config.valueField) {
            valueField = config.valueField;
        }
        if (config.displayField) {
            displayField = config.displayField;
        }
    }
    
    var store = new Ext.data.JsonStore({
        remoteSort : false,
        baseParams : config.baseParams,
        fields : [ valueField, displayField ],
        proxy : new Ext.data.HttpProxy({
            url : url
        })
    });

    store.on('loadexception', function() {
        Ext.Msg.alert('操作提示', '加载数据失败');
    });
    
    return store;
};
