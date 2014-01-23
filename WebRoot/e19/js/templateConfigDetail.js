function TemplateDetail(){
    var oldFormObj = null;
    this.initWindow = function(type,obj){
    	var selItemss = null;
    	if(type == 'mod'){
            selItemss = Ext.getCmp('tdGrid').getSelectionModel().getSelections();
            if(selItemss.length > 1){
                    Ext.Msg.alert('操作提示','请选择一条明细');
                    return;
                }
                selItemss = selItemss[0];
    	}
        var formPanel = this.initFormPanel(selItemss);
        var gridPanel = this.initEnumGridPanel();
        var formWin = new Ext.Window({
            id:'temDetWin',
            title: '模板明细',
            closable:true,
            width: tciPriAttTemplateConfigWidth*4+20+20+25,
            height: body_height*0.9,
            layout: 'anchor',
            plain:true,
            modal : true,
            items: [formPanel,gridPanel],
            buttonAlign:'center',
            buttons: [{
                text: '保存',
                id : 'tdSave',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    tdOper.saveDetail();
                }
            },{
                text: '关闭',
                id :'close',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('temDetWin').close();
                }
            }]
        });
        tdOper.initData(type,obj);
        formWin.show();      
//        var dataTypeEnumIdStore = Ext.getCmp('dataTypeEnumId').getStore();alert(1);alert(dataTypeEnumIdStore.getCount());
//        for(var i=0;i<dataTypeEnumIdStore.getCount();i++){alert(1);
//            var record = dataTypeEnumIdStore.getAt(i);
//            if(record.data.dataValue==7){
//                dataTypeEnumIdStore.remove(record);
//            }
//        }
    }
    
    this.initData = function(type,obj){
        var param = {};
        if(type == 'mod'){
            var selItems = Ext.getCmp('tdGrid').getSelectionModel().getSelections();
            if(selItems && selItems.length && selItems.length > 0){
                if(selItems.length > 1){
                    Ext.Msg.alert('操作提示','请选择一条明细');
                    return;
                }else{
                    oldFormObj = selItems[0].data;
                    selItems[0].data.attributionProvinceId = obj.data.attributionProvinceId;
                    param = selItems[0];
                   tdOper.loadEnumGrid(selItems[0]);
               }
            }else{
                Ext.Msg.alert('操作提示','请选择模板');
                return;
            }
        }else if(type == 'add'){
            var data = {};
            data.tciPriAttTemplateId = obj.data.tciPriAttTemplateId;
            data.attributionProvinceId = obj.data.attributionProvinceId;
            data.testobjectType = obj.data.testobjectType;
            param.data = data;
        }
        Ext.getCmp('detPn').getForm().loadRecord(param);
        
    }
    
    this.loadEnumGrid = function(obj){
        if(obj.data.isEnumType == "1"){
            Ext.getCmp('EnumEditGrid').setVisible(true);
            var parm = {};
            parm.templateDetailId = obj.data.templateDetailId;
            Ext.getCmp('EnumEditGrid').store.load({
                params : parm
            });
        } 
    }

      //页面验证
        this.formValid = function(formName){
            var flag=true;
            Ext.each(Ext.getCmp(formName).getForm().items.items, function(item) { 
                if(!item.isValid()){
//                    Ext.Msg.alert("操作失败",item.fieldLabel+"  "+item.activeError);
//                    item.focus();
                    return flag = false;
                }
            });
            return flag;
        }
      

        //可编辑grid数据验证
        this.editGridValidate = function(gridName){
            var flag=true;
            var cm = Ext.getCmp(gridName).getColumnModel();
            var store = Ext.getCmp(gridName).getStore();
            var data =  Ext.getCmp(gridName).getSelectionModel().getSelections();
            for (var i = 0; i < data.length; i++) {
                var record = data[i];//获得被修改的每行数据
                var fields = record.fields.keys;//表示一共几行

                for (var j = 0; j < fields.length; j++) {
                    var name = fields[j];//列名
                    var colIndex = cm.findColumnIndex(name);//列号
                    var header = cm.getColumnHeader(colIndex);
                    var rowIndex = store.indexOfId(record.id);//行号
                    var cellEditor = cm.getCellEditor(colIndex,rowIndex);
                    var value = record.data[name];//单元格的数值
                    if(!cellEditor){
                        continue;
                    }
                    var editor = cellEditor.field;//colIndex使用的编辑器
                    if(!editor.allowBlank){//不能为空
                        if(!value){
                            Ext.Msg.alert('提示',header + " 该项为必填项", function(){
                                Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                            });
                            return flag=false;
                        }
                    }
                    if (!editor.validateValue(value)) {
                        Ext.Msg.alert('提示',header + " " +editor.activeError , function(){
                            Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                        });
                        return flag=false;
                    }
                }
            }
            return flag;
        }
    
        //属性编号唯一，而且不能和公有的私有属性一样
        this.nameUnique = function(obj){
            var flag=true;
            var param = null;
            var url = null;
            
            if(obj.templateDetailId){//修改
                if(oldFormObj.columnName != obj.columnName){
                    param = {
                            columnNameEqual : obj.columnName,
                            tciPriAttTemplateId : obj.tciPriAttTemplateId
                    };
                    url = PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateDetailList'; 
                    response = ZTESOFT.Synchronize(url,param);
                    if(response && response.rows && response.rows.length > 0){
                        Ext.Msg.alert('操作提示','属性名称:'+obj.columnName+'已经存在!');
                        return flag=false;
                    }
                }
            }else{//新增
                param = {
                        columnNameEqual : obj.columnName,
                        tciPriAttTemplateId : obj.tciPriAttTemplateId
                };
                url = PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateDetailList'; 
                response = ZTESOFT.Synchronize(url,param);
                if(response && response.rows && response.rows.length > 0){
                    Ext.Msg.alert('操作提示','属性名称:'+obj.columnName+'已经存在!');
                    return flag=false;
                }
            }
            
            return flag;
        }
        
    this.enumCheckUnique = function(dataArray){
        var flag = true;
            for(var i=0;i<dataArray.length;i++){
                var enumValue = dataArray[i].data.enumValue;
                var enumValueMeaning = dataArray[i].data.enumValueMeaning;
                for(var j=i+1;j<dataArray.length;j++){
                    if(enumValue == dataArray[j].data.enumValue){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行枚举值和第'+(j+1)+'行相同!');
                        return false;
                    }
                    if(enumValueMeaning == dataArray[j].data.enumValueMeaning){
                        Ext.Msg.alert('操作提示','第'+(i+1)+'行含义和第'+(j+1)+'行相同!');
                        return false;
                    }
                }
            }
            return flag;
    }
        
    this.saveDetail = function(){    
        var url = '';
        var selItems = null;
        var now = new Date();
        var param = Ext.getCmp('detPn').getForm().getValues();
        if(!tdOper.formValid('detPn')){
            return;
        }
        if(!this.nameUnique(param)){
            return;
        }
        param.dataTypeEnumId = Ext.getCmp('dataTypeEnumId').getValue();
        param.isEnumType = Ext.getCmp('isEnumType').getValue() * 1;
        param.isNull = Ext.getCmp('isNull').getValue() * 1;
        
        
        
        //修改
        if(param.templateDetailId){
            url = PATH+'/e19/tciPriAttTemplateAction.json?method=updateTemplateDetial';
        }else{//新增
            url = PATH+'/e19/tciPriAttTemplateAction.json?method=saveTemplateDetial';
        }
        
        Ext.getCmp('EnumEditGrid').getSelectionModel().selectAll();
        selItems = Ext.getCmp('EnumEditGrid').getSelectionModel().getSelections();
        
        if(param.isEnumType == 1&&!this.enumCheckUnique(selItems)){
            return;
        }
        
        if(selItems && selItems.length && selItems.length > 0){
            if(!tdOper.editGridValidate('EnumEditGrid')){
                return;
            }
            
            var dataArray = new Array();
            for(var i=0;i<selItems.length;i++){
                dataArray.push(selItems[i].data);
            }
            param.enumArray = Ext.encode(dataArray);
        }else{
            if(param.isEnumType == 1){
                Ext.Msg.alert('操作提示','枚举值列表为空!');
                return;
            }
        }
        
        param.createdBy = session.logonAccount.cloudUserId;
        param.lastUpdatedBy = session.logonAccount.cloudUserId;
        param.recordVersion = 1;
        param.deletedFlag = 0;
        param.marketingAreaId = session.logonAccount.marketingAreaId;
        param.maintenanceAreaId = session.logonAccount.maintenanceAreaId;
        param.orgId = session.logonAccount.cloudOrgId;
        
        ZTESOFT.invokeAction(
                url,
                param,
                function(response){
                    Ext.Msg.alert('操作提示','操作成功!');
                    Ext.getCmp('temDetWin').close();
                    tdOper.loadTdGridData();
                }
        );
    }
    
    /*重新加载 模块明细列表*/
    this.loadTdGridData = function(){
        var selItems = Ext.getCmp('listGrid').getSelectionModel().getSelections();
        var param = {};
        param.tciPriAttTemplateId = selItems[0].data.tciPriAttTemplateId;
        oper.qryListGrid('tdGrid',param);
    }
    
    this.initFormPanel = function(obj){
        var  detailPn = new Ext.FormPanel({
            id : 'detPn',
            region : 'north',
            buttonAlign : 'right',
            frame : true,
            layoutConfig : {
                columns : 3 * 2
            },
            layout : 'table',
            bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',
                hideLabel : true,
                width : tciPriAttTemplateConfigWidth*4/6,//最小是120，最大190
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>属性名称'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        fieldLabel : '属性名称',
                        name : 'columnName',
                        id : 'columnName',
                        maxLength:200,
                        maxLengthText:'属性名称不能超过200个字！',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>属性说明'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        fieldLabel : '属性说明',
                        name : 'description',
                        id : 'description',
                        maxLength:450,
                        maxLengthText:'属性说明不能超过450个字！',
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>数据类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype: 'ZTESOFT.enum',
                        hideLabel : true,
                        fieldLabel : '数据类型',
                        name : 'dataTypeEnumId',
                        id : 'dataTypeEnumId',
                        valueField: 'dataValue',
                        displayField: 'dataName',
                        mode: 'local',
                        triggerAction: 'all',
                        typeAhead : true,
                        editable : false ,
                        allowBlank : false,
                        dict: true,
                        dictType:'DATA_TYPE',
                        value: obj==null?"1":(obj.data.dataTypeEnumId||""),
                        listeners : {
                            select : function(combo,record,index){
                                tdOper.dataTypeSel(combo.value);
                            }
                        },
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>可否为空'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
                        fieldLabel : '可否为空',
                        name : 'isNull',
                        id : 'isNull',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
//                        value: '',
                        store: stroe.isNotStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>数据长度'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.numberfield',
                        hideLabel : true,
                        fieldLabel : '数据长度',
                        name : 'dataLength',
                        id : 'dataLength',
                        maxValue: 1000000, 
                         minValue: 1,
                         regex :/^[0-9]+$/,
                        regexText : "只能输入正整数!",
                        allowBlank : false,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>是否枚举类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype: 'ZTESOFT.combofield',
                        hideLabel : true,
                        fieldLabel : '是否枚举类型',
                        name : 'isEnumType',
                        id : 'isEnumType',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
                        allowBlank : false,
//                        value: '',
                        store: stroe.isNotStore,
                        anchor : '100%',
                        listeners : {
                            select : function(combo,record,index){
                                if(combo.getRawValue() == '是'){
                                    Ext.getCmp('EnumEditGrid').setVisible(true);
                                }else{
                                    Ext.getCmp('EnumEditGrid').setVisible(false);
                                }
                            }
                        }
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>显示序号'
                    }
                },
                {
                    colspan : 1,
                    items : [{
                        xtype : 'ZTESOFT.numberfield',
                        hideLabel : true,
                        fieldLabel : '显示序号',
                        name : 'displayNumber',
                        id : 'displayNumber',
                        regex :/^[0-9]+$/,
                        regexText : "只能输入正整数!",
                        allowBlank : false,
                        anchor : '100%'
                    },{
                        xtype : 'hidden',
                        name : 'templateDetailId',
                        id : 'templateDetailId'
                    },{
                        xtype : 'hidden',
                        name : 'tciPriAttTemplateId',
                        id : 'tciPriAttTemplateId'
                    },{
                        xtype : 'hidden',
                        name : 'attributionProvinceId',
                        id : 'attributionProvinceId'
                    },{
                        xtype : 'hidden',
                        name : 'testobjectType',
                        id : 'testobjectType'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : ''
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : ''
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : ''
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : ''
                    }
                }
            ]
        });
        
        
        return detailPn;
    }

    this.initEnumGridPanel = function() {
        var  gridWidth = 720;
        var cm = new Ext.grid.CheckboxSelectionModel();
        
        var column = new Ext.grid.ColumnModel([
                                               cm,    
                                               {
                                                   header:'ID',dataIndex:'enumValueId',hidden:true
                                               },
                                              {header:'枚举值',dataIndex:'enumValue',width:gridWidth*0.22,
                                                  editor: new Ext.form.TextField({
                                                      allowBlank: false
                                                  })
                                              },     
                                              {header:'含义',dataIndex:'enumValueMeaning',width:gridWidth*0.25,
                                                  editor: new Ext.form.TextField({
                                                      allowBlank: false
                                                  })
                                              },   
                                              {header:'说明',dataIndex:'description',width:gridWidth*0.22,
                                                  editor: new Ext.form.TextField({
                                                      allowBlank: true
                                                  })
                                              },   
                                              {header:'排序号',dataIndex:'sortNum',width:gridWidth*0.22,
                                                  editor: new Ext.form.NumberField({
                                                      allowNegative: false,
                                                      minValue:0,
                                                      allowBlank: false
                                                  })
                                              }
                                              ]);
        
        var fields = new Array();  
        for(var i=0;i<column.getColumnCount();i++){
            fields.push({name:column.getDataIndex(i)});
        }

        var store = ZTESOFT.createGridStore({
            id:'enumStore',
            fields: fields,
            url:PATH+'/e19/tciPriAttTemplateAction.json?method=qryEnumValueList'
        }); 

        var grid = new ZTESOFT.EditorGridPanel({
            id:'EnumEditGrid',
            store: store,
            cm: column,
            sm :cm,
            height: body_height*0.5,
            frame: false,
            clicksToEdit: 1,
            hidden : true,
            bodyStyle:'padding:0px;',
            tbar: this.initEnumGridToolsBar(),
            title : '枚举值列表'
        });
        return grid;
    }

    this.initEnumGridToolsBar = function() {
        var tb = new Ext.Toolbar();
        tb.add({
            text : '新增',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                tdOper.addEnum();
            }
        },"-");
        tb.add({
            text : '删除',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                tdOper.delEnum();
            }
        },"-");
        return tb;
    }
    this.addEnum = function(){
        var grid = Ext.getCmp('EnumEditGrid');
        var Plant = grid.getStore().recordType;
        var p = new Plant({
        });  
        grid.stopEditing();
        //插入行
        grid.getStore().insert(0, p);
        //恢复监听
        grid.startEditing(0, 0);
    }
    
    this.delEnum = function(){
        var selItems = Ext.getCmp('EnumEditGrid').getSelectionModel().getSelections();
        if(selItems && selItems.length && selItems.length > 0){
            Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                if(btn=="yes"){
                    Ext.getCmp('EnumEditGrid').getStore().remove(selItems);  
                }
            });
        }else{
            Ext.Msg.alert('操作提示','请先选择要删除的行');
            return;
        }
    }
    
    this.dataTypeSel = function(value){
        //数据类型 为字符，整型的可以选择是枚举值
        if(value == 1 || value == 3){
            Ext.getCmp('isEnumType').setValue('');
            Ext.getCmp('isEnumType').enable();
            
            
        }else{
            Ext.getCmp('isEnumType').setValue(0);
            Ext.getCmp('isEnumType').disable();
            Ext.getCmp('EnumEditGrid').hide();
        }
    }
}