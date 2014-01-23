<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统DEMO</title>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.button.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>

<link type="text/css" rel="stylesheet"
    href="<%=path%>/common/udf/js/icon.css" />
<link type="text/css" rel="stylesheet"
    href="<%=path%>/css/ztesoft-ext.css" />    
    
<script type="text/javascript"
    src="<%=path%>/common/udf/js/swfupload.js"></script>
<script type="text/javascript"
    src="<%=path%>/common/udf/js/uploaderPanel.js"></script>
    
<script type="text/javascript"
    src="<%=path%>/common/udf/js/ztesoft.file.js"></script>

<script type="text/javascript" src="js/audit.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>
<script type="text/javascript" src="js/edit_grid.js"></script>  
<style>
a:link {
    text-decoration: none;
    color: #3f3f3f;
    vertical-align: bottom;
    font-size: 12px;
}
a:visited {
    text-decoration: none;
    color: #3f3f3f;
}
a:hover {
    text-decoration: none;/*underline*/
    color: #d7191f;
}
a:active {
    text-decoration: none;
    color: #3f3f3f;
}
</style>
</head>

<body onContextMenu="return false;"
	style="width: 100%; height: 100%; overflow: hidden ;">
	<div id="content" ></div>
</body>
</html>
<script type="text/javascript">
<!--
    var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var qryPnHeight = 130;
    var gridPnHeight = body_height - qryPnHeight - 35;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据 

    
    var oper = new PageOper();
    var manager = new ManagerOper();
    var eo = new EdGridOper();
    
    var param;

    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 

        oper.init();

    });

    function PageOper() {
        
        this.demoStateStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['1','集团'],
                ['2','省分']
            ]
        });

        this.init = function() {
            var mainPanel = this.initMainPanel();
            var viewport = new Ext.Viewport({
                //所有的页面元素最终都加入到这个显示容器中，并且添加到页面的ID为content的div中，
                //也可以单个元素直接加到页面dom元素，但不建议
                el : 'content',
                layout : 'border',
                margins : '5 5 5 5',
                items : [ mainPanel ]
            });
            
        }

        //初始化主面板

        this.initMainPanel = function() {//qery
            
            //qery
            var qryTb = this.initQryTool();
        
            //列表
            var listPanel = this.initListGrid();
            //主面板
            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',//这种布局方式类似地图，子元素按方位布局
                items : [qryTb,listPanel]
            });
            return mainPanel;
        }
        
        this.initQryTool = function(){
            var topPn = new Ext.Panel({   
                id : "qryPn", 
                region: 'north', 
                //width : mianWidth,    
                //height : 20,   
                border : false,//边框   
                margins : '0 0 0 0',//边缘   
                tbar : this.initGridToolsBar()//工具条，用来放操作按键  
              });

              return topPn;
        }
        
        this.showQry = function(){
            
            //qery
            var qryFrom = this.initQryPn();
            
            var formWin = new Ext.Window({
                id:'queryWin',
                title: '高级检索',
                closable:true,
                modal : true,
                width: 700,
                height: 170,
                layout: 'border',
                plain:true,
                items: [qryFrom],
                buttonAlign:'center',
                buttons : [{
                    text : '确定',
                    id: 'qryBtn',
                    cls : 'redbutton',
                    width:82,
                    listeners : {
                        "click" : function() {
                            //获取查询参数
                            param = Ext.getCmp('qryForm').getForm().getValues();
                            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
                            param.com_test = Ext.getCmp('com_test').getValue();
                            
                            //alert(param.pop_id_test);
                            //alert(param.com_test);
                            
                            oper.qryListGrid(param);
                            
                            //根据name取值，一般建议使用ID
                            var el = Ext.get("num_test"); 
                            //使用选择器，匹配所有name属性以‘_test’结尾的元素，注意这里跟jquery一样，返回的是伪数组
                            var e2 = Ext.query("*[name$=_test]"); 
                            //将dom元素转化为ext的对象
                            Ext.each(e2,function(){
                                var e3 = Ext.get(this);
                                //接下来就可以使用所有ext对象的方法了。
                                //alert(e3.getValue());
                            });
                            
                            formWin.close();

                        }
                    }
                }, {
                    text : '取消',
                    cls : 'graybutton',
                    width:82,
                    listeners : {
                        "click" : function() {
                            formWin.close();
                        }
                    }
                }]
            });
             formWin.show();
             
        }

        this.initQryPn = function() {
            var qryForm = new Ext.FormPanel({
                id : 'qryForm',
                region : 'center',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
                buttonAlign :'center',
                labelWidth : 60,//标签宽度
                frame : true,
                //collapsible : true,//是否可收缩
                //title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : body_width,
                //cls : 'x-table-button',
                items : [{
                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉
                    items : [{
                        columnWidth : .25,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性
                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
                        items : [{
                            xtype : 'textfield',
                            fieldLabel : '名称',
                            name : 'dataNameQry',
                            id : 'dataNameQry',
                            allowBlank: false,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                            blankText:'名称不能为空!',//空白时在字段旁边显示的提示信息，有默认值，可不设
                            anchor : '100%'//大概意思是表示这个textfield控件，占整个列宽的比例
                        }]
                    }, {
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype : 'textfield',
                            fieldLabel : '值',
                            name : 'dataValueQry',
                            id : 'dataValueQry',
                            anchor : '100%'
                        }]
                    }, {
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype : 'textfield',
                            fieldLabel : '类型',
                            name : 'dataTypeQry',
                            id : 'dataTypeQry',
                            anchor : '100%'
                        }]
                    },{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test',
                            name: 'pop_test',
                            fieldLabel : '选择',
                            valueFile : 'pop_id_test',
                            readOnly: true,
                            //editable: false,
                            anchor : '100%',
                            onPopup : function() {
                                    //选择事件逻辑
                                    oper.openWin();
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test',
                            id: 'pop_id_test'
                          
                       }]
                    }]
                },
                {
                    layout : 'column',
                    items : [/*{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '下拉列表',
                            name : 'com_test',
                            id : 'com_test',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.demoStateStore,
                            anchor : '100%'
                            
                        }]
                    }*/{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype : 'ZTESOFT.Combobox',
                            fieldLabel : '下拉列表',
                            triggerAction: 'all',
                            name : 'com_test',
                            id : 'com_test',
                            mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,//自动匹配
                            editable : true ,
                            dict: true,//此值为ture，则使用默认的字典表来赋值
                            dictType: '1',//只需指定类型值。
                            hasBlank: true,//为true表示加一个空白选项，只对字典对象有效
                            //dict为false时，需要告知combox访问后台的地址
                            //url:PATH+'/demo/fun1/demoAction.json?method=tree',
                            //valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                            //displayField: 'text',
                            //baseParams : {node:1},//查询数据时传递给后台的参数
                            value: 1,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中。
                            //当页面初始化完成之后，才可以通过setValue方法赋值。
                            anchor : '100%'
                        }]
                    },{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            fieldLabel : '时间',
                            name : 'date_time',
                            id : 'date_time',
                            format:'Y-m-d h:i:s',
                            anchor : '100%'
                            
                        }]
                    },{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype : 'datefield',
                            fieldLabel : '日期',
                            name : 'date_test',
                            id : 'date_test',
                            format:'Y-m-d',
                            anchor : '100%'
                            
                        }]
                    },{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype : 'numberfield',
                            fieldLabel : '数字',
                            name : 'num_test',
                            id : 'num_test',
                            anchor : '100%'
                        }]
                    }]
                },{
                    layout : 'column',
                    items : [{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '下拉2',
                            name : 'com_test_2',
                            id : 'com_test_2',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,
                            triggerAction: 'all',
                            editable : true ,
                            value: '',
                            store: this.demoStateStore,
                            anchor : '100%'
                            
                        }]
                    },{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '级联1',
                            name : 'com_test_31',
                            id : 'com_test_31',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            //typeAhead : true,
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.demoStateStore,
                            anchor : '100%',
                            listeners:{
                                select: function(combo, record, index){
                                    var twoCombo = Ext.getCmp('com_test_32');
	                                twoCombo.clearValue();
	                                twoCombo.getStore().proxy = new Ext.data.HttpProxy({
	                                    url:PATH + '/commondata/commonDataAction.json?method=qryDictData&dictType=' + combo.value, 
	                                    method:'get'
	                                });
	                                twoCombo.getStore().load();
	                            }
                            }
                        }]
                    },{
                        columnWidth : .25,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '级联2',
                            name : 'com_test_32',
                            id : 'com_test_32',
                            valueField: 'dataValue',
                            displayField: 'dataName',
                            mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            //typeAhead : true,
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: ZTESOFT.createComboStore({
                                dict: true,//此值为ture，则使用默认的字典表来赋值
                                dictType: '1',//只需指定类型值。
                                hasBlank: true//为true表示加一个空白选择项，只对字典对象有效
                            }),
                            anchor : '100%'
                            
                        }]
                    }]
                }]
            });
            return qryForm;
        };

        //查询列表
        this.qryListGrid = function(param) {
            
            //绑定发送请求参数
            Ext.getCmp('listGrid').store.on('beforeload', function(store) {

                if (Ext.getCmp('listGrid').store.lastOptions != null) {
                    //绑定列表的查询参数，此参数除非重置，不会因为分页码变化而改变
                    Ext.getCmp('listGrid').store.baseParams = param;
                    //Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
                }
            });
            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
            Ext.getCmp('listGrid').store.load({
                params : {
                    start : 0,//开始索引
                    limit : Ext.getCmp('listGrid').getPageSize()//步数
                }
            });
            //load数据后自动选择第一行数据,load事件为加载数据完成后触发
            Ext.getCmp('listGrid').store.on('load', function() {
                Ext.getCmp('listGrid').getSelectionModel().selectFirstRow();//选中第一行
            });

        }

        function changeColumn(value, cellmeta, record, rowIndex, columnIndex, store){
            //value ：这个单元格的值；
            //cellmeta.cellId： 这个单元格的配置
            //cellmeta.id：  id
            //record ：这个单元格对应的行数据集 
            //rowIndex 行索引
            //columnIndex列索引
            //store 这个表格对应的Ext.data.Store
            
            var fileds = record.fields;
            var fieldName =fileds.get(columnIndex).name;
            
            var str = "行索引:"+rowIndex+ " 列索引:" + columnIndex+ " 列ID:" + fieldName;
            var url =  "<a href='#' onclick=\"alert('"+str+ "')\">"+ value + "</a>";
            return url;

        }
        this.initListGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel({});
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.RowNumberer({header:'序号',width:40}),                                   
                cm,                                 
                {header:'ID',dataIndex:'dictId',hidden:true},
                {header:'类型ID',dataIndex:'dataType',hidden:true},
                {header:'名称',dataIndex:'dataName',width:gridWidth*0.15,renderer: changeColumn},
	            {header:'值',dataIndex:'dataValue',width:gridWidth*0.1,align:'right'},
	            {header:'类型',dataIndex:'dataTypeName',width:gridWidth*0.15},
	            {header:'顺序',dataIndex:'orderIndex',sortable:true,width:gridWidth*0.1},//本地排序加sortable:true属性
	            {header:'扩展字段1',dataIndex:'extCol1',sortable:true,width:gridWidth*0.1},
	            {header:'扩展字段2',dataIndex:'extCol2',width:gridWidth*0.1},
	            {header:'扩展字段3',dataIndex:'extCol3',width:gridWidth*0.1}
            ]);
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'listGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试演示列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
                //collapsible : true,//是否可以收缩
                //tbar : this.initGridToolsBar(),//工具条，用来放操作按键
                url : PATH+'/demo/fun1/demoAction.json?method=page',//访问读取后台数据的地址
                sm :cm        
                /*        
                sm : new Ext.grid.RowSelectionModel({
                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                    listeners : {
                        //行选中事件
                        rowselect : function(sm, row, rec) {
                            //oper.qryRule(rec.data.tacheId);
                        }
                    }
                })*/
            });

            return grid;

        }

        this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar({height:30});
            
            tb.add({
                text : '高级检索',
                cls : 'bluebutton',
                width: 82,
                onClick : function() {
                    oper.showQry();
                }
            });//加这个符号，会在页面上添加一个竖线分隔符
            
            tb.add('->',"-");//加这个符号可以使在此之后的按键靠右对齐
            
            //tb.add('<a href="#">超连接</a>');
            var t = new ZTESOFT.Link({
                text : 'XXX',
                onClick : function(){
                    alert('onClick');
                }
            });
            t.on('click',function(){
                alert('onClick');
            });
            
            tb.add(t);
            
            tb.add("-",{
                text : '增加',
                onClick : function() {
                    oper.detail('add');
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '修改',
                onClick : function() {
                    oper.detail('mod');
                }
            },"-");
            tb.add({
                text : '删除',
                onClick : function() {
                    oper.del();
                }
            },"-");
            tb.add({
                text : '批量导入',
                onClick : function() {
                    oper.importData();
                }
            },"-");
            tb.add({
                text : '导出',
                onClick : function() {
                    oper.exportData();
                }
            },"-");
            
            tb.add({
                text : '上传附件',
                onClick : function() {
                    oper.upload();
                }
            },"-");
            tb.add({
                text : '下载附件',
                onClick : function() {
                    oper.download();
                }
            },"-");
            tb.add({
                text : '编辑gird',
                onClick : function() {
                    oper.editGrid();
                }
            },"-");
            tb.add({
                text : '审核demo',
                onClick : function() {
                    oper.audit();
                }
            });

            return tb;
        }
        
        this.detail = function (operStr){
            
            //alert(selNode.id);
            var param = new Object();
            if(operStr == 'mod'){
                var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if(selinfo.length!=1){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                //var rec = Ext.getCmp('listGrid').getSelectionModel().getSelected();
                var rec = selinfo[0];
                if(rec==null){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                param = rec;
            }
            
            manager.initWindow(operStr,param);
            //alert(rec.data.tacheId);
        }
        
        this.del = function(){
            var records = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            /*
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length!=1){
                Ext.Msg.alert('操作提示','请先选择您要修改的行');
            }else{
                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
            }
            */
            for(var i = 0,len = records.length;i<len;i++ ){
                Ext.getCmp('listGrid').store.remove(records[i]);
            }
            Ext.getCmp('listGrid').store.commitChanges();
        }
        
        this.openWin = function(){
            new ZTESOFT.TreeWin({
                title:'tree-demo',
                url:PATH+'/demo/fun1/demoAction.json?method=tree',
                baseParams : {test:1},  // 传递给后台的参数，默认还会传递node参数，即结点ID     
                onComplete: function(id,text,data){

                    Ext.getCmp('pop_id_test').setValue(id);
                    Ext.getCmp('pop_test').setValue(text);
                }
            }).show();
        }
        
        this.upload = function(){
            new ZTESOFT.FileUtil().uploadFile(null,function(fileList){
                //回调方法，返回列表[{fileId,fileName}]
                alert(fileList.length);
            });
            
        }
        
        this.download = function () {
            var param = new Object();
            //文件ID
            param.fileId = 10001;
            //文件名
            param.fileName = '测试文本.txt';

            //param.userid = 'fy';

            
            new ZTESOFT.FileUtil().downloadFile(param);
        }
        
        this.importData = function(){
            //传递给导出页面的参数，在后台仍使用getParam()方法可以获得
            var param = new Object();
            //param.userid = 'fy';
            //param.pageId = 'excel_demo';
            

            /*这个为后台实现类，请写全路名，简单的列表可以参考ReadDemoServiceImpl,继承
            com.unicom.ucloud.eom.base.service.ReadSimpleElsService类.并实现其中的抽象方法。
                         复杂的逻辑请继承原有的
            com.unicom.ucloud.eom.base.service.BaseServiceImpl类，并实现
            com.unicom.ucloud.eom.base.service.IReadElsService接口

             */
            param.serviceClass = 'com.unicom.ucloud.eom.demo.fun1.service.ReadDemoServiceImpl';

            new ZTESOFT.FileUtil().uploadExcel(param,function(retVal){
                //导入成功时，会返回列表数据，格式跟读取DB的一样
                Ext.getCmp('listGrid').store.removeAll();
                Ext.getCmp('listGrid').store.loadData(retVal);
            });

            
        }
        
        this.exportData = function(){
            //这是页面参数，跟普通查询一样，如果有分页需求的，也一起写上
            //获取查询参数
            //var param = Ext.getCmp('qryForm').getForm().getValues();
            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
            //param.com_test = Ext.getCmp('com_test').getValue();
            
            //分页参数
            if(!param){
                param = new Object();
            }
            param.start = Ext.getCmp('listGrid').getStart();
            param.limit = Ext.getCmp('listGrid').getPageSize();//步数
            
            //alert(param.start + ':' + param.limit);

            /*这个为后台实现类，请写全路名，简单的列表可以参考ExportDemoServiceImpl,继承
            com.unicom.ucloud.eom.base.service.ExportSimpleElsService类.并实现其中的抽象方法。
                         复杂的逻辑请继承原有的
            com.unicom.ucloud.eom.base.service.BaseServiceImpl类，并实现
            com.unicom.ucloud.eom.base.service.IExportElsService接口
                        传递的参数除了自己的查询条件及分页参数之外，增加了以下两个：
            fileType(导出类型):excle,word,pdf
            exportType(数据量):ALL(全量)，PAGE(当前页)

             */
            param.serviceClass = 'com.unicom.ucloud.eom.demo.fun1.service.ExportDemoServiceImpl';

            //param.userid = 'fy';

            new ZTESOFT.FileUtil().exportData(param);
        }
        
        this.audit = function(){
            var ap = new AuditOper();
            ap.init();
        }
        
        this.editGrid = function(){
            
            eo.init();
        }
    }
    
    

    function ManagerOper(){
        //主窗口
        this.winTitle = '增加';
        this.initWindow = function(operStr,rowData){
            var formPanel = this.initFormPanel(rowData);
            
            if(operStr == 'add'){
                this.winTitle = '增加';
            }else if(operStr == 'mod'){
                this.winTitle = '修改';
                this.initUpdate(rowData);
            }
        
            var formWin = new Ext.Window({
                id:'detailWin',
                title: this.winTitle,
                closable:true,
                width: body_width*0.6,
                height: body_height*0.5,
                layout: 'border',
                plain:true,
                items: [formPanel],
                buttonAlign:'center',
                buttons: [{
                    text: '确定',
                    cls : 'redbutton',
                    width:82,
                    onClick:function(){
                        if(operStr=='add'){
                            manager.addCommit();
                        }else{
                            manager.updateCommit(rowData);
                        }
                    }
                },{
                    text: '关闭',
                    cls : 'graybutton',
                    width:82,
                    onClick:function(){
                        Ext.getCmp('detailWin').close();
                        
                    }
                }]
            });
             formWin.show();
             
        }
        
        this.initFormPanel = function(rowData){
            var dataValue = '1';
            if(rowData && rowData.data){
                //当更新时，将combox的初始值设定
                dataValue = rowData.data.dataValue;
            }
            var infoPage = new Ext.FormPanel({
                id:'infoPage',
                region: 'center',
                labelAlign: 'left',
                frame:true,
                autoScroll :true,
                width:Ext.getBody().getSize(),
                bodyStyle:'padding:5px;overflow-x:hidden;overflow-y:auto;',
                buttonAlign: 'center',
                labelWidth: 70,
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel: '名称',
                                name: 'dataName',
                                id: 'dataName',
                                allowBlank:false, 
                                anchor:'95%'
                            },{
                                xtype: 'hidden',
                                name: 'dicId',
                                id: 'dicId'
                              
                           }]
                        },
                        {
                         columnWidth:.5,
                         layout: 'form',
                         items: [{
	                             xtype : 'ZTESOFT.Combobox',
	                             fieldLabel : '下拉列表',
	                             triggerAction: 'all',
	                             name : 'dataValue',
	                             id : 'dataValue',
	                             mode: 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
	                             typeAhead : true,
	                             editable : true ,
	                             dict: true,//此值为ture，则使用默认的字典表来赋值
	                             dictType: '1',//只需指定类型值。
	                             hasBlank: true,//为true表示加一个空白选择项，只对字典对象有效
	                             //dict为false时，需要告知combox访问后台的地址
	                             //url:PATH+'/demo/fun1/demoAction.json?method=tree',
	                             //valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
	                             //displayField: 'text',
	                             //baseParams : {node:1},//查询数据时传递给后台的参数
	                             value: dataValue,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中。
	                             anchor : '90%'
                           }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'textfield',
                                fieldLabel:'类型',
                                name:'dataTypeName',
                                id: 'dataTypeName',
                                allowBlank:false, 
                                anchor:'95%'
                            }]
                        },
                        {
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'numberfield',
                                fieldLabel: '类型值',
                                name: 'dataType',
                                id: 'numberfield',
                                allowBlank:false, 
                                anchor:'95%'
                            }]
                        },{
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                                xtype:'numberfield',
                                fieldLabel: '顺序',
                                name: 'orderIndex',
                                id: 'orderIndex',
                                allowBlank:false, 
                                anchor:'95%'
                            }]
                        },{
                        columnWidth:1,
                        layout: 'form',
                        items: [{
                                fieldLabel: '描述',
                                xtype:"textarea",
                                id:"extCol2",
                                name:"extCol2",
                                height: 100,
                                anchor:'97%'
                            }]
                        }
                   ]}
            ]});
            return infoPage;
        }
        
        //增加任务提交
        this.addCommit = function(){
            if(!Ext.getCmp('infoPage').getForm().isValid()){
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            param.dataValue = Ext.getCmp('dataValue').getValue();
            
            ZTESOFT.invokeAction(
                    PATH+'/demo/fun1/demoAction.json?method=save',
                    param,
                    function(response){
						Ext.Msg.confirm("操作提示","新增成功",function(btn){
							if(btn=="yes"){
							    Ext.getCmp('detailWin').close();
							    Ext.getCmp('listGrid').store.load({params:{start:0, limit:Ext.getCmp('listGrid').getPageSize()}});
							}
						});
                    }
            );
            
        }
        //修改任务提交
        this.updateCommit = function(rowData){
            if(!Ext.getCmp('infoPage').getForm().isValid()){
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            /*
            ZTESOFT.invokeAction(
                    PATH+'/demo/fun1/demoAction.json?method=update',
                    param,
                    function(response){
                        Ext.Msg.alert('操作提示', response.msg);
                    }
            );*/
            var url = PATH+'/demo/fun1/demoAction.json?method=update';
            var result = ZTESOFT.Synchronize(url,param);
            alert(result.msg);
        }
        
        this.del = function(dicId){
            
        }
        //修改初始化

        this.initUpdate = function(rowData){
            Ext.getCmp('infoPage').getForm().loadRecord(rowData);
            
        }
    }

   


//-->
</script>
