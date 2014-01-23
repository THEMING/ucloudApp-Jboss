<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>历史工单查询</title>
<!-- 树目录用到的引入 -->
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.treedata.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>
<!-- 上传下载用到的引入 -->
<link type="text/css" rel="stylesheet" href="<%=path%>/common/udf/js/icon.css" />
<script type="text/javascript" src="<%=path%>/common/udf/js/swfupload.js"></script>
<script type="text/javascript" src="<%=path%>/common/udf/js/uploaderPanel.js"></script>
<script type="text/javascript" src="<%=path%>/common/udf/js/ztesoft.file.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.map.js"></script>
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.attachmentutil.js"></script>
</head>
<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script language="javascript" src="./js/jsonStroe.js" ></script>    
<script language="javascript" src="./js/testCardManageMod.js" ></script>
<script language="javascript" src="./js/testCardOrderDetail.js"></script>
<script language="javascript" src="./js/jsonStroe.js" ></script>    
<script type="text/javascript">
var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var qryPnHeight = 120;
var qryPnWidth = 680;
var gridPnHeight = body_height - qryPnHeight;
var gridWidth = body_width;
var cnt = 15; 

var oper = new PageOper();
var impOper = new ImportOper();
var manager = new DetailWin();
var stroe = new jsonStroe();
var woStatusMap = null;

var qryParams = new Object();

Ext.onReady(function() {
	woStatusMap = getMap("WO_STATUS");
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';

    oper.init();
    var param = {};
    param.woStatusEnumId = 6;//完成
    qryParams = param;
    oper.doQuery();
 });
 
function getMap(value){
        var oo = new Object();
        oo.dictType = value;
        return initEnumMap(oo);
    }

function PageOper() {
    
    this.init = function() {
        var mainPanel = this.initMainPanel();
        var viewport = new Ext.Viewport({
            el : 'content',
            layout : 'border',
            margins : '5 5 5 5',
            items : [ mainPanel ]
        });
    }

    this.initMainPanel = function() {
        var tbar = this.initGridToolsBar();
        var listPanel = this.initListGrid();

        var mainPanel = new Ext.Panel({
            region : 'center',
            layout : 'border',
            items : [ tbar,listPanel ]
        });
        return mainPanel;
    }
    
    this.initGridToolsBar = function() {
        var tb = new Ext.Toolbar({region : 'north'});
        tb.add({
            text : '高级检索',
            xtype: 'ZTESOFT.Button',
            onClick : function() {
                oper.initQryWin();
            }
        });
        tb.add("->");
        
        /*
        tb.add({
            text : '导入模板下载',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.downModel();
            }
        },"-");
        tb.add({
            text : '批量导入',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.importData();
            }
        },"-");
        */
        tb.add({
            text : '导出',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.exportData();
            }
        });
        return tb;
    }
    
    this.initQryWin = function(){
        var qryFrom = this.initQryPn();
         new Ext.Window({
             id:'qryWin',
             title: '高级检索',
             closable:true,
             width: 700,
             height: 240,
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
					 if(Ext.getCmp('creationStartDate').getValue()!=""&&Ext.getCmp('creationEndDate').getValue()!=""&&new Date(Date.parse(Ext.getCmp('creationStartDate').getValue()))>new Date(Date.parse(Ext.getCmp('creationEndDate').getValue()))){
                          	 Ext.Msg.alert("提示","开始时间不能晚于结束时间！");
                          	 return;
                          	}
                         oper.winQuery();
                         
                         Ext.getCmp('qryWin').close();
                     }
                 }
             },{
                 text: '重置',
                 id : 'reset',
                 xtype: 'ZTESOFT.Button',
                 onClick:function(){
                     Ext.getCmp('qryForm').getForm().reset();
                 }
             },{
                 text : '关闭',
                 xtype: 'ZTESOFT.Button',
                 listeners : {
                     "click" : function() {
                         Ext.getCmp('qryWin').close();
                     }
                 }
             }]
         }).show();
		 var oo = new Object();
		 oo.data = qryParams;
		 Ext.getCmp('qryForm').getForm().loadRecord(oo);
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
            bodyStyle : 'padding:12px;overflow-x:hidden;overflow-y:auto;',
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',
                hideLabel : true,
                width : 160,
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '工单号'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype:'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'sheetSerialNumberQry',
                        id : 'sheetSerialNumberQry',
                        anchor : '100%'
                    }
                },
                 {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '工单主题'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype:'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'sheetThemeQry',
                        id : 'sheetThemeQry',
                        anchor : '100%'
                    }
                },
                 {
                       colspan : 1,
                       items : {
                           xtype : 'ZTESOFT.label',
                           text : '工单类型'
                       }
                   },{
                       colspan : 1,
                       items : [{
                           xtype:'ZTESOFT.combofield',
                           hideLabel : true,
//                           fieldLabel: '<font color="red">*</font>工单类型',
                           name: 'cardOperationTypeEnumIdQry',
                           id: 'cardOperationTypeEnumIdQry',
                           valueField: 'value',
                           displayField: 'text',
                           mode: 'local',
                           triggerAction: 'all',
                           store: this.sheetTypeStore,
                           editable : false ,
                           value: '',
                           anchor:'100%'
                       }]
                   },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '创建组织'
                    }
                },
                {
                    colspan : 1,
                    items : [{
                        xtype: 'ZTESOFT.popupfield',
                        id: 'orgName',
                        name: 'orgName',
                        hideLabel : true,
                        valueFile : 'orgId',
                        readOnly: true,
                        anchor : '100%',
                        onPopup : function() {
                            TreeOper.singleOrgTree({
                                onComplete: function(id,text,data){
                                    Ext.getCmp('orgId').setValue(id);
                                    Ext.getCmp('orgName').setValue(text);
                                }
                            });
                        }
                    },{
                        xtype : 'hidden',
                        name : 'orgId',
                        id : 'orgId'
                    }]
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '开始时间'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype:'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'creationStartDate',
                        id : 'creationStartDate',
                        format:'Y-m-d h:i:s',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '结束时间'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype:'ZTESOFT.datefield',
                        hideLabel : true,
                        name : 'creationEndDate',
                        id : 'creationEndDate',
                        format:'Y-m-d h:i:s',
                        anchor : '100%'
                    }
                }
            ]
        });
        return qryForm;
    };
    
    this.winQuery = function(){
//        var param = {};
//        param.sheetSerialNumberQry = Ext.getCmp('sheetSerialNumberQry').getValue();
//        param.creationStartDate = Ext.getCmp('creationStartDate').getValue();
//        param.creationEndDate = Ext.getCmp('creationEndDate').getValue();
//        param.orgId = Ext.getCmp('orgId').getValue();
		var param = Ext.getCmp('qryForm').getForm().getValues();
        param.woStatusEnumId = 6;//完成
        param.cardOperationTypeEnumIdQry = Ext.getCmp('cardOperationTypeEnumIdQry').getValue();
        qryParams = param;
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
        Ext.getCmp(gridName).store.on('load', function() {
            Ext.getCmp(gridName).getSelectionModel().selectFirstRow();//选中第一行
        });
    }
	this.sheetTypeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['2','移交'],
                ['5','报废'],
                ['3','借用'],
                ['1','调拨'],
                ['4','归还'],
				['6','清查']
            ]
        });
    this.getsheetTypeName = function(value){
        var name = "";
        if(value == 1){
            name = "测试卡移交";
        }else if(value == 2){
            name = "测试卡报废";
        }else if(value == 3){
            name = "测试卡借用";
        }else if(value == 4){
            name = "测试卡调拨";
        }else if(value == 5){
            name = "测试卡归还";
        }else if(value == 6){
            name = "测试卡清查";
        }
        return name;
    }

    this.initListGrid = function() {
        //创建列   
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel([
            cm,
            new Ext.grid.RowNumberer({header:'序号',width:40}),
            {header:'工单状态',dataIndex:'sheetStatus',hidden:true},
            {header:'id',dataIndex:'cardSheetId',hidden:true},
            {header:'工单主题',dataIndex:'sheetTheme',width:gridWidth*0.1},
            {header:'工单类型ID',dataIndex:'sheetType',width:gridWidth*0.1,hidden:true},
            {header:'工单流水号',dataIndex:'sheetSerialNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href=javascript:manager.showWin(0,'+record.data.cardSheetId+')>' + value + '</a>';
            },width:gridWidth*0.15},
            {header:'工单类型',dataIndex:'sheetTypeName',width:gridWidth*0.1},
            {header:'工单状态',dataIndex:'sheetStatusName',width:gridWidth*0.1,hidden:true},
			{header:'工单状态',dataIndex:'woStatusEnumId',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return woStatusMap.get(value);
                    },
                    width:gridWidth*0.1},
            {header:'缓急程度',dataIndex:'urgencyLevel',width:gridWidth*0.1},       
            {header:'创建人',dataIndex:'createdByName',width:gridWidth*0.1},
            {header:'创建时间',dataIndex:'creationDate',width:gridWidth*0.15},
            {header:'建议完成时间',dataIndex:'requiredFinishTime',width:gridWidth*0.15},
            {header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.15}
        ]);
                    
                    
        //人员信息
        var grid = new ZTESOFT.Grid({
            id : 'listGrid',
            region : 'center',
            height : gridPnHeight,
            title : '测试卡历史工单列表',
            cm : column,
            pageSize : cnt,
            paging : true,
//            collapsible : true,
            url:PATH+'/e19/testCardOrderApplyAction.json?method=qryEomCardSheetPage',
            sm : cm
        });
        return grid;
    }

    this.downModel = function(){
        window.open("tableTemplate/HIS_ORDER_MODEL.xls",null,null);
    }
    
    this.importData = function(){
        var param = new Object();
        
        param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ReadHisOrderServiceImpl';

        new ZTESOFT.FileUtil().uploadExcel(param,function(retVal){
            impOper.initWindow();
            Ext.getCmp('hisOrderGrid').store.removeAll();
            Ext.getCmp('hisOrderGrid').store.loadData(retVal);
        });  
    }
  
    this.exportData = function(){
        var param = qryParams;
        param.start = 0;//Ext.getCmp('listGrid').getStart();
        param.limit = 5000;//Ext.getCmp('listGrid').getPageSize();
        
        param.serviceClass = 'com.unicom.ucloud.eom.e19.service.ExpHisOrderServiceImpl';
		
		var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if(selinfo.length!=0){
                    var selectIds = selinfo[0].data.cardSheetId;
                    for(var i=1;i<selinfo.length;i++){
                        selectIds = selectIds+","+selinfo[i].data.cardSheetId;
                    }
                    param.selectIds = selectIds;
                }else{
                    param.selectIds = null;
                }
		
        new ZTESOFT.FileUtil().exportData(param);
    }
}

function ImportOper(){
    
    this.winTitle = '批量导入';
    this.initWindow = function(){
        var formPanel = this.initGrid();
    
        var formWin = new Ext.Window({
            id:'hisOrderWin',
            title: this.winTitle,
            closable:true,
            width: body_width*0.9,
            height: body_height*0.9,
            layout: 'anchor',
            plain:true,
            items: [formPanel],
            buttonAlign:'center',
            buttons: [{
                text: '保存',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    impOper.save();
                }
            },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('hisOrderWin').close();
                }
            }]
        });
         formWin.show();
         
    }
    
    this.getColumn = function(){
        var  cardOpeStore = stroe.cardOpeStore;

        var colMArray = [
            new Ext.grid.CheckboxSelectionModel(),
            new Ext.grid.RowNumberer({header:'序号',width:40}),
            {
                header:'工单流水号',dataIndex:'sheetSerialNumber',width:gridWidth*0.1,
                  editor: new Ext.form.TextField({
                      allowBlank: false
                  })
            },
            {
                header:'工单主题',dataIndex:'sheetTheme',width:gridWidth*0.1,
                  editor: new Ext.form.TextField({
                      allowBlank: false
                  })
            },
            {
                header:'归属地',dataIndex:'localeId',width:gridWidth*0.1,
                  editor: new Ext.form.NumberField({
                      allowBlank: false
                  })
            },
            {
                header:'创建组织',dataIndex:'orgId',width:gridWidth*0.1,
                  editor: new Ext.form.NumberField({
                      allowBlank: false
                  })
            },
            {
                header:'创建人',dataIndex:'createdBy',width:gridWidth*0.1,
                  editor: new Ext.form.NumberField({
                      allowBlank: false
                  })
            },
            {
                header:'创建人',dataIndex:'createdByName',
                hidden:true,
                width:gridWidth*0.1
            },
            {
                header:'单位ID',dataIndex:'companyId',width:gridWidth*0.1,
                hidden : true,
                  editor: new Ext.form.NumberField({
                      allowBlank: false
                  })
            },
            {
                header:'单位名称',dataIndex:'companyName',width:gridWidth*0.1,
                  editor: new Ext.form.TextField({
                      allowBlank: false
                  })
            },
            {
                header:'派单时间',dataIndex:'dispatchDate',width:gridWidth*0.1,
                  editor: new Ext.ux.form.DateTimeField({
                      allowBlank: false,
                      format: 'Y-m-d H:i:s'
                  }),
                  renderer: formatDate
            },
            {
                header:'要求完成时间',dataIndex:'requiredFinishTime',width:gridWidth*0.1,
                  editor: new Ext.ux.form.DateTimeField({
                      allowBlank: false,
                      format: 'Y-m-d H:i:s'
                  }),
                  renderer: formatDate
            },
            {header:'测试卡操作类型',dataIndex:'cardOperationTypeEnumId',width:gridWidth*0.1,
                editor: new Ext.form.ComboBox({
                    valueField: 'value',
                    displayField: 'text',
                    mode: 'local',
                    triggerAction: 'all',
                    editable : true ,
                    allowBlank: false,
                    value: '',
                    store: cardOpeStore
                }),
                renderer: function(value,metadata,record){
                    var index = cardOpeStore.find('value',value);
                    if(index!=-1){
                        return cardOpeStore.getAt(index).data.text;
                    }
                    return value;
                }
            },
            {
                header:'内容',dataIndex:'content',width:gridWidth*0.1,
                  editor: new Ext.form.TextField({
                      allowBlank: true
                  })
            },
            {
                header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.1,
                  editor: new Ext.ux.form.DateTimeField({
                      allowBlank: false,
                      format: 'Y-m-d H:i:s'
                  }),
                  renderer: formatDate
            },
            {
                header:'创建时间',dataIndex:'creationDate',width:gridWidth*0.1,
                  editor: new Ext.ux.form.DateTimeField({
                      allowBlank: false,
                      format: 'Y-m-d H:i:s'
                  }),
                  renderer: formatDate
            }
        ];
          return colMArray;
    }
    
    this.initGrid = function(colMArray) {
        
        var cm = new Ext.grid.CheckboxSelectionModel();
        var colMArray = impOper.getColumn();
        
        var column = new Ext.grid.ColumnModel(colMArray);
        
        var fields = new Array();  
        for(var i=0;i<column.getColumnCount();i++){
            fields.push({name:column.getDataIndex(i)});
        }

        var store = ZTESOFT.createGridStore({
            id:'testStore',
            fields: fields,
            url:null
        }); 
        
        var grid = new ZTESOFT.EditorGridPanel({
            id:'hisOrderGrid',
            store: store,
            cm: column,
            sm :cm,
            height: body_height*0.7,
            frame: false,
            clicksToEdit: 1,
            bodyStyle:'padding:0px;',
            tbar: this.inittbar(),
            title : '历史工单列表'
        });
        return grid;
    }
  
    this.inittbar = function () {
        var tb = new Ext.Toolbar();
        tb.add({
            text : '删除',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                impOper.doDel();
            }
        });
        
        return tb;
    }
    
    this.doDel = function(){
        var selItems = Ext.getCmp('hisOrderGrid').getSelectionModel().getSelections();
        if(selItems && selItems.length && selItems.length > 0){
            Ext.Msg.confirm("操作提示","确认删除?",function(btn){
                if(btn=="yes"){
                    Ext.getCmp('hisOrderGrid').getStore().remove(selItems);
                }
            });
        }else{
            Ext.Msg.alert('操作提示','请先选择要删除的行');
            return;
        }
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
                    var value = record.data[name];//单元格的数值
                    var colIndex = cm.findColumnIndex(name);//列号
                    var rowIndex = store.indexOfId(record.id);//行号
                    var header = cm.getColumnHeader(colIndex);
                    var cellEditor = cm.getCellEditor(colIndex);
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
    
    this.save = function(){
        var selItems = Ext.getCmp('hisOrderGrid').getSelectionModel().getSelections();
        if(selItems && selItems.length && selItems.length > 0){
            if(!this.editGridValidate('hisOrderGrid')){
                return;
            }
            
            var dataArray = new Array();
            var now = new Date();
            for(var i=0;i<selItems.length;i++){
                selItems[i].data.woStatusEnumId = 2;//已经完成
                selItems[i].data.archiveBaseDate = selItems[i].data.creationDate;
                selItems[i].data.lastUpdatedBy = selItems[i].data.createdBy;
                selItems[i].data.lastUpdateDate = selItems[i].data.creationDate;
                selItems[i].data.recordVersion = 1;
                selItems[i].data.deletedFlag = false;
                selItems[i].data.marketingAreaId = 1;
                selItems[i].data.maintenanceAreaId = 1;
                
                selItems[i].data.sheetCardList = null;
                dataArray.push(selItems[i].data);
            }
            var param = {};
            param.dataArray = Ext.encode(dataArray);
            ZTESOFT.invokeAction(
                    PATH+'/e19/testCardOrderApplyAction.json?method=addTestCardOrderBatch',
                    param,
                    function(response){
                        if(response.msg && response.msg == "success"){
                            Ext.Msg.alert('操作提示','导入成功');
                            Ext.getCmp('hisOrderWin').close();
                            oper.doQuery();
                        }else{
                            Ext.Msg.alert('操作提示','导入失败');
                        }
                    }
            );
        }else{
            Ext.Msg.alert('操作提示','请先选择要导入的行');
            return;
        }
    }
}
function formatDate(value){
    if(value instanceof Date){
        return value ? value.dateFormat('Y-m-d H:i:s') : '';
    }else{
        return value; 
    } 
}
</script>