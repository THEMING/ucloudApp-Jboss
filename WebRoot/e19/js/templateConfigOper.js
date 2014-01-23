var templateConfigOperParam = new Object();
templateConfigOperParam.templateConfigOperAttributionProvinceIdQry = session.logonAccount.provinceCompanyId==null?"":session.logonAccount.provinceCompanyId;
var templateConfigOperAttributionProvinceIdQry = session.logonAccount.provinceCompanyId==null?"":session.logonAccount.provinceCompanyId;//null;

var temOperQryWin = null;

function PageOper() {
    
    this.init = function() {
        var mainPanel = this.initMainPanel();
        var viewport = new Ext.Viewport({
            el : 'content',
            layout : 'border',
            margins : '5 5 5 5',
            items : [ mainPanel ]
        });
        temOperQryWin = oper.initQryWin();
        oper.doQuery();
    }

    this.initMainPanel = function() {
        var tbar = this.initGridToolsBar();
        //列表
        var listPanel = this.initListGrid();
        
        var tdTbar = this.initTdGridToolsBar();
        var tdGridPanel = this.initTdGridPanel();
        //主面板
        var mainPanel = new Ext.Panel({
            region : 'center',
            layout : 'anchor',
            items : [ tbar,listPanel,tdTbar,tdGridPanel]
        });
        return mainPanel;
    }
    
    this.initQryWin = function(){
        var qryFrom = this.initQryPn();
        return new Ext.Window({
             id:'qryWin',
             title: '高级检索',
             closable:true,
             width : 740,
             height : 220,
             plain:true,
             modal: true,
//             layout : 'border',
             items: [qryFrom],
             buttonAlign:'center',
             buttons : [{
                 text : '查询',
                 id: 'qryBtn',
                 xtype: 'ZTESOFT.Button',
                 listeners : {
                     "click" : function() {
                         oper.winQuery();
                         temOperQryWin.hide();
//                         Ext.getCmp('qryWin').close();
                     }
                 }
             }, 
//             	{
//                 text : '重置',
//                 xtype: 'ZTESOFT.Button',
//                 listeners : {
//                     "click" : function() {
//                         Ext.getCmp('qryForm').getForm().reset();
//                         Ext.getCmp('attributionProvinceIdQry').setValue('');
//                     }
//                 }
//             }, 
             	{
                 text : '关闭',
                 xtype: 'ZTESOFT.Button',
                 listeners : {
                     "click" : function() {
//                         Ext.getCmp('qryWin').close();
                     	temOperQryWin.hide();
                     }
                 }
             }]
         })//.show();
         
//         var ob = new Object();
//         ob.data = templateConfigOperParam;
//         Ext.getCmp('qryForm').getForm().loadRecord(ob);
//         
//         if(session.logonAccount.provinceCompanyId!=null){
//            Ext.getCmp('attributionProvinceIdQry').setRawValue(session.logonAccount.provinceCompanyName);
//        }
      }

    this.initQryPn = function() {
        var qryForm = new Ext.FormPanel({
            id : 'qryForm',
//            region : 'center',
            buttonAlign : 'right',
            frame : true,
            layoutConfig : {
                columns : 4
            },
            layout : 'table',
            bodyStyle : 'padding:14px;overflow-x:hidden;overflow-y:auto;',
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',
                hideLabel : true,
                width : 170,
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '归属省分'
                    }
                },
                {
                    colspan : 1,
                    items : {
//                        xtype : 'ZTESOFT.enum',
//                        hideLabel : true,
//                        triggerAction: 'all',
//                        name : 'attributionProvinceIdQry',
//                        id : 'attributionProvinceIdQry',
//                        mode: 'local',
//                        dict: false,
//                        forceSelect : true,
//                        editable : true,
//                        url: PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',
//                        valueField: 'id',
//                        displayField: 'text',
//                        baseParams : {node:1},
//                        value: templateConfigOperAttributionProvinceIdQry,
//                        anchor : '100%'

                            xtype:'ZTESOFT.enum',
                            hideLabel : true,
                            triggerAction: 'all',
                            name : 'attributionProvinceIdQry',
                            id : 'attributionProvinceIdQry',
                            readOnly:session.logonAccount.provinceCompanyId==null?false:true,
                            //mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable: false,
                            dict: false,//此值为ture，则使用默认的字典表来赋值
                            url:PATH + '/commonData/proxy4AUserAndOrg/findOrgListByParentid.json?node=1',
                            valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            displayField: 'text',
                            value: templateConfigOperAttributionProvinceIdQry,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中
                            anchor:'100%'

                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '测试卡类型'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'testobjectTypeQry',
                        id : 'testobjectTypeQry',
                        valueField: 'value',
                        displayField: 'text',
                        mode: 'local',
                        triggerAction: 'all',
                        editable : false ,
//                        value: '',
                        store: stroe.testCardStore,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : '模板名称'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'templateNameQry',
                        id : 'templateNameQry',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : ''
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        text : ''
                    }
                }
            ]
        });
        return qryForm;
    };
    
    this.winQuery = function(){
        var param = {};
        param.attributionProvinceId = Ext.getCmp('attributionProvinceIdQry').getValue();
        param.testobjectType = Ext.getCmp('testobjectTypeQry').getValue();
        param.templateName = Ext.getCmp('templateNameQry').getValue();
        
        qryParams = param;
//        templateConfigOperParam = Ext.getCmp('qryForm').getForm().getValues();
//        templateConfigOperParam.attributionProvinceIdQry = null;
//        templateConfigOperParam.testobjectTypeQry = Ext.getCmp('testobjectTypeQry').getValue();
//        templateConfigOperAttributionProvinceIdQry = Ext.getCmp('attributionProvinceIdQry').getValue();
        oper.doQuery();
    }
    
    this.doQuery = function(){
        oper.qryListGrid('listGrid',qryParams);
    }

    this.qryListGrid = function(gridName,param){
        //绑定发送请求参数
        Ext.getCmp(gridName).store.on('beforeload', function(store) {
            if (Ext.getCmp(gridName).store.lastOptions != null) {
                //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变
                Ext.getCmp(gridName).store.baseParams = param;
            }
        });
        
        //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
        Ext.getCmp(gridName).store.load({
            params : {
                start : 0,//开始索引
                limit : Ext.getCmp(gridName).getPageSize()//步数
            }
        
        });

        //load数据后自动选择第一行数据,load事件为加载数据完成后触发
        Ext.getCmp(gridName).store.on('load', function(grid,dataArray) {
            Ext.getCmp(gridName).getSelectionModel().selectFirstRow();
            if(gridName == "listGrid"){
                if(dataArray.length && dataArray.length > 0){
                    oper.onRowClick(dataArray[0].data.tciPriAttTemplateId);
                }else{
                    Ext.getCmp('listGrid').setHeight(gridPnHeight);
                    Ext.getCmp('tdGrid').setVisible(true);
                }
            }
        });
    }
    
    this.initListGrid = function() {
        var cm = new Ext.grid.CheckboxSelectionModel();
        
        var column = new Ext.grid.ColumnModel([
            new Ext.grid.CheckboxSelectionModel(),    
            new Ext.grid.RowNumberer({header:'序号',width:40}),
            {header:'测试卡私有属性模板ID',dataIndex:'tciPriAttTemplateId',hidden:true},
            {header:'归属省份ID',dataIndex:'attributionProvinceId',hidden:true},
            {header:'测试卡类型',dataIndex:'testobjectType',hidden:true},
            {header:'测试卡类别',dataIndex:'testobjectTypeName',width:gridWidth*0.1},
            {header:'归属省份',dataIndex:'attributionProvinceName',width:gridWidth*0.1},
            {header:'名称',dataIndex:'templateName',width:gridWidth*0.15},
            {header:'模板说明',dataIndex:'templateDesc',width:gridWidth*0.15},
            {header:'创建时间',dataIndex:'creationDate',width:gridWidth*0.12},
            {header:'模板用途',dataIndex:'templateUsed',width:gridWidth*0.15},
            {header:'备注',dataIndex:'remarks',width:gridWidth*0.13}
        ]);
                    
        var grid = new ZTESOFT.Grid({
            id : 'listGrid',
            region : 'center',
            height : gridPnHeight,
            title : '私有属性模板列表',
            cm : column,
            pageSize : 5,
            paging : true,
//            collapsible : true,
            url:PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplatePage',
            sm :cm,
            listeners : {
                rowclick : function(grid,rowIndex,evt){
                	var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                	if(selinfo.length==1){
                		oper.onRowClick(selinfo[0].data.tciPriAttTemplateId);
                	}else{
                	   var data = grid.getStore().data.items[rowIndex].data;
                        oper.onRowClick(data.tciPriAttTemplateId);
                	}
                    
                }
            }
        });
        return grid;
    }

    this.initGridToolsBar = function() {
        var tb = new Ext.Toolbar({region : 'north'});
        tb.add({
            text : '高级检索',
            xtype: 'ZTESOFT.Button',
            onClick : function() {
//                oper.initQryWin();
                temOperQryWin.show();
            }
        });
        tb.add("->");
        
        tb.add({
            text : '新增模板',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.doAdd();
            }
        },"-");
        tb.add({
            text : '编辑模板',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.doEdit();
            }
        },"-");
        tb.add({
            text : '删除模板',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.doDele();
            }
        },"-");
        return tb;
    }
    
    this.onRowClick = function(value){
        var param = {};
        param.tciPriAttTemplateId = value;
        Ext.getCmp('listGrid').setHeight(gridPn1Height);
        Ext.getCmp('tdGrid').setVisible(true);
        Ext.getCmp('tdGrid').setHeight(gridPn2Height);
        oper.qryListGrid('tdGrid',param);
    }
    
    this.dataTypeEnumName = function(value){
        var name = "";
        if(value == 1){
            name = "字符";
        }else if(value == 2){
            name = "整型";
        }else if(value == 3){
            name = "浮点型";
        }else if(value == 4){
            name = "日期";
        }else if(value == 5){
            name = "时间";
        }else if(value == 6){
            name = "布尔";
        }
        return name;
    }
    
    this.initTdGridPanel = function() {
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel([
            new Ext.grid.CheckboxSelectionModel(),
            new Ext.grid.RowNumberer({header:'序号',width:40}),
            {header:'测试卡私有属性模板明细ID',dataIndex:'templateDetailId',hidden:true},
            {header:'测试卡私有属性模板ID',dataIndex:'tciPriAttTemplateId',hidden:true},
            {header:'可否为空',dataIndex:'isNull',hidden:true},
            {header:'属性编号',dataIndex:'columnNumber',align:'center',width:gridWidth*0.13},
            {header:'属性名称',dataIndex:'columnName',width:gridWidth*0.15},
            {header:'属性说明',dataIndex:'description',width:gridWidth*0.12},
            {header:'数据类型',dataIndex:'dataTypeEnumId',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return dataTypeMap.get(record.data.dataTypeEnumId);
            },width:gridWidth*0.1},
//            {header:'数据类型',dataIndex:'dataTypeEnumId',
////            renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
////                return oper.dataTypeEnumName(record.data.dataTypeEnumId);
////            },
//            width:gridWidth*0.1,hidden:true},
            {header:'可否为空',dataIndex:'isNullText',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return record.data.isNull=="1"?"是":"否";
            },width:gridWidth*0.1},
            {header:'数据长度',dataIndex:'dataLength',width:gridWidth*0.1},
            {header:'是否枚举类型',dataIndex:'isEnumTypeText',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return record.data.isEnumType=="1"?"是":"否";
            },width:gridWidth*0.1},
            {header:'是否枚举类型',dataIndex:'isEnumType',hidden:true},
            {header:'显示序号',dataIndex:'displayNumber',width:gridWidth*0.1}
        ]);
                                       
        var grid = new ZTESOFT.Grid({           
            id : 'tdGrid',
            region : 'center',
            title : '私有属性模板明细列表',
            cm : column,
            pageSize : cnt,
            paging : true,
            hidden : true,
            height: gridPn2Height,
            url:PATH+'/e19/tciPriAttTemplateAction.json?method=qryTemplateDetailPage',
            sm : cm,
            listeners : {
            }
        });

        return grid;

    }

    this.initTdGridToolsBar = function() {
        var tb = new Ext.Toolbar({region : 'north'});
        tb.add("->");
        tb.add({
            text : '新增模板明细',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.addTdDetail();
            }
        },"-");
        tb.add({
            text : '编辑模板明细',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.editTdDetail();
            }
        },"-");
        tb.add({
            text : '删除模板明细',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.delTdDetail();
            }
        },"-");
        return tb;
    }
    
   this.doAdd = function(){
       addOper.initWindow('add',null);
   }
   
   this.doEdit = function(){
       var selItems = Ext.getCmp('listGrid').getSelectionModel().getSelections();
       if(selItems && selItems.length && selItems.length > 0){
           if(selItems.length > 1){
               Ext.Msg.alert('操作提示','请选择一个模板');
               return;
           }else{
               addOper.initWindow('mod',selItems[0]);
           }
       }else{
           Ext.Msg.alert('操作提示','请选择模板');
           return;
       }
   }
   
   this.doDele = function(){
       var selItems = Ext.getCmp('listGrid').getSelectionModel().getSelections();
       if(selItems && selItems.length && selItems.length > 0){
           var dataArray = new Array();
           for(var i=0;i<selItems.length;i++){   
               var obj = {};
               obj.tciPriAttTemplateId = selItems[i].data.tciPriAttTemplateId;
               obj.deletedBy = session.logonAccount.cloudUserId;
               
               dataArray.push(obj);
           }
           var param = {};
           param.dataArray = Ext.encode(dataArray);
           Ext.Msg.confirm("操作提示","确认删除?",function(btn){
               if(btn=="yes"){
                   ZTESOFT.invokeAction(
                           PATH+'/e19/tciPriAttTemplateAction.json?method=deleteTemplate',
                           param,
                           function(response){
                               Ext.Msg.alert('操作提示','删除成功!');
                               oper.doQuery();
                               tdOper.loadTdGridData();
                           }
                   );
               }
           });
       }else{
           Ext.Msg.alert('操作提示','请选择模板');
           return;
       }
   }
   
   /* 模板明细新增*/
   this.addTdDetail = function(){
       var selItems = Ext.getCmp('listGrid').getSelectionModel().getSelections();
       if(selItems && selItems.length && selItems.length > 0){
           if(selItems.length > 1){
               Ext.Msg.alert('操作提示','请指定一个私有属性模板');
               return;
           }else{
               tdOper.initWindow('add',selItems[0]);
           }
       }else{
           Ext.Msg.alert('操作提示','请选择模板');
           return;
       }
   }
   /* 模板明细 修改*/
   this.editTdDetail = function(){
       var selItems = Ext.getCmp('listGrid').getSelectionModel().getSelections();
       if(selItems && selItems.length && selItems.length > 0){
           if(selItems.length > 1){
               Ext.Msg.alert('操作提示','请选择一个模板');
               return;
           }else{
               var selI = Ext.getCmp('tdGrid').getSelectionModel().getSelections();
               if(selI && selI.length && selI.length > 0){
                   if(selI.length > 1){
                       Ext.Msg.alert('操作提示','请选择一个模板明细');
                       return;
                   }else{
                       tdOper.initWindow('mod',selItems[0]);
                   }
               }else{
                   Ext.Msg.alert('操作提示','请选择模板明细');
                   return;
               }
           }
       }else{
           Ext.Msg.alert('操作提示','请选择模板');
           return;
       }
   }
   /* 模板明细 删除*/
   this.delTdDetail = function(){
       var selItems = Ext.getCmp('tdGrid').getSelectionModel().getSelections();
       if(selItems && selItems.length && selItems.length > 0){
           var dataArray = new Array();
           for(var i=0;i<selItems.length;i++){    
               var obj = {};
               obj.templateDetailId = selItems[i].data.templateDetailId;
               obj.deletedBy = session.logonAccount.cloudUserId;
               
               dataArray.push(obj);
           }
           var param = {};
           param.dataArray = Ext.encode(dataArray);
           Ext.Msg.confirm("操作提示","确认删除?",function(btn){
               if(btn=="yes"){
                   ZTESOFT.invokeAction(
                           PATH+'/e19/tciPriAttTemplateAction.json?method=deleteTemplateDetial',
                           param,
                           function(response){
                               Ext.Msg.alert('操作提示','删除成功!');
                               tdOper.loadTdGridData();
                           }
                   );
               }
           });
       }else{
           Ext.Msg.alert('操作提示','请选择模板明细');
           return;
       }
   }
}