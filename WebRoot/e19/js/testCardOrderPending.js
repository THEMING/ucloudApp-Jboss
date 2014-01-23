var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var qryPnHeight = 120;
    var gridPnHeight = body_height - qryPnHeight;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据

    var oper = new PageOper();
    var manager = new DetailWin();

    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';

        oper.init();

    });

    function PageOper() {
        
        this.currentNodeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['','全部'],
                ['1','申请'],
                ['2','执行'],
                ['3','审核'],
                ['4','接收']
            ]
        });
        
        this.sheetStatusStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['','全部'],
                ['1','待派发'],
                ['2','待接收'],
                ['3','完成']
            ]
        });
        
        this.sheetTypeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['1','测试卡移交'],
                ['2','测试卡报废'],
                ['3','测试卡借用'],
                ['4','测试卡调拨'],
                ['5','测试卡归还']
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

        this.initMainPanel = function() {
            //qery
            var qryFrom = this.initQryPn();
            //列表
            var listPanel = this.initListGrid();
            //主面板
            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',//这种布局方式类似地图，子元素按方位布局
                items : [ qryFrom,listPanel ]
            });
            return mainPanel;
        }

        this.initQryPn = function() {
            var qryForm = new Ext.FormPanel({
                id : 'qryForm',
                region : 'north',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式
                labelWidth : 60,//标签宽度
                frame : true,
//                collapsible : true,//是否可收缩
                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : body_width,
                items : [{
                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉
                    items : [{
                        columnWidth : .3,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性
                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
                        items : [{
                            xtype : 'numberfield',
                            fieldLabel : '工单号',
                            name : 'sheetSerialNumberQry',
                            id : 'sheetSerialNumberQry',
                            allowBlank: true,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                            anchor : '90%'//大概意思是表示这个textfield控件，占整个列宽的比例
                        }]
                    }, {
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '环节',
                            name : 'currentNodeQry',
                            id : 'currentNodeQry',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.currentNodeStore,
                            anchor : '90%'
                            
                        }]
                    }, {
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype: 'combo',
                            fieldLabel : '工单状态',
                            name : 'sheetStatusQry',
                            id : 'sheetStatusQry',
                            valueField: 'value',
                            displayField: 'text',
                            mode: 'local',
                            triggerAction: 'all',
                            editable : false ,
                            value: '',
                            store: this.sheetStatusStore,
                            anchor : '90%'
                            
                        }]
                    }]
                },
                {
                    layout : 'column',
                    items : [{
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            fieldLabel : '开始时间',
                            name : 'creationStartDate',
                            id : 'creationStartDate',
                            format:'Y-m-d h:i:s',
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype : 'datetimefield',
                            fieldLabel : '结束时间',
                            name : 'creationEndDate',
                            id : 'creationEndDate',
                            format:'Y-m-d h:i:s',
                            anchor : '90%'
                            
                        }]
                    },{
                        columnWidth : .3,
                        layout : 'form',
                        items : [{
                            xtype: 'checkbox',
                            name : 'dealMan',
                            id : 'dealMan',
                            checked:true,
                            boxLabel:'本处理人',
                            anchor : '90%'
                            
                        }]
                    }]
                }],
                buttons : [{
                    text : '查询',
                    listeners : {
                        "click" : function() {
                            //获取查询参数
                            var param = Ext.getCmp('qryForm').getForm().getValues();
                            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值
                            param.currentNode = Ext.getCmp('currentNodeQry').getValue();
                            param.sheetStatus = Ext.getCmp('sheetStatusQry').getValue();
//                            alert(Ext.getCmp('dealMan').checked);
//                            param.dealMan = Ext.getCmp('dealMan').checked;
                            
                            oper.qryListGrid(param);

                        }
                    }
                }, {
                    text : '重置',
                    listeners : {
                        "click" : function() {
                            Ext.getCmp('qryForm').getForm().reset();
                        }
                    }
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
//                    Ext.getCmp('listGrid').store.baseParams = {jsonStr : JSON.stringify(param)};
                }
            });
            //Ext.getCmp('listGrid').store.removeAll();//先移除旧数据
            //加载数据，这里带的参数是分页的信息，会随底部工具条的操作而自动变化
            Ext.getCmp('listGrid').store.load({
                params : 
                    {
                    start : 0,//开始索引
                    limit : Ext.getCmp('listGrid').getPageSize()//步数
                }
            });
            //load数据后自动选择第一行数据,load事件为加载数据完成后触发
            Ext.getCmp('listGrid').store.on('load', function() {
                Ext.getCmp('listGrid').getSelectionModel().selectFirstRow();//选中第一行
            });

        }

        this.initListGrid = function() {
            //创建列   
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),    
                new Ext.grid.RowNumberer(),
                {header:'工单流水号',dataIndex:'sheetSerialNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:manager.showWin(0,'+record.data.cardSheetId+')>' + value + '</a>';
                    },width:gridWidth*0.1},
                {header:'工单类型',dataIndex:'sheetTypeName',width:gridWidth*0.1},
                {header:'当前环节',dataIndex:'currentNodeName',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return record.data.currentNode=="1"?"申请":(record.data.currentNode=="2"?"执行":(record.data.currentNode=="3"?"审核":"接收"));
                    },width:gridWidth*0.1},
                {header:'处理组',dataIndex:'dealGroup',width:gridWidth*0.1},
                {header:'处理人',dataIndex:'dealMan',width:gridWidth*0.1},
                {header:'要求完成时限',dataIndex:'requiredFinishTime',width:gridWidth*0.1},
                {header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.1},
                {header:'派发时间',dataIndex:'dispatchDate',width:gridWidth*0.1},
                {header:'工单状态',dataIndex:'sheetStatusName',width:gridWidth*0.1},
                
                {header:'当前环节',dataIndex:'currentNode',hidden:true},
                {header:'工单状态',dataIndex:'sheetStatus',hidden:true},
                {header:'工单类型',dataIndex:'sheetType',hidden:true},
                
                {header:'归属地',dataIndex:'localeId',hidden:true},
                {header:'单位名称',dataIndex:'companyName',hidden:true},
                {header:'建单人',dataIndex:'createdBy',hidden:true},
                {header:'建单时间',dataIndex:'creationDate',hidden:true},
                {header:'审核单位',dataIndex:'auditDepartmentId',hidden:true},
                {header:'审核人',dataIndex:'auditMan',hidden:true},
                
                {header:'执行单位',dataIndex:'executeDepartmentId',hidden:true},
                {header:'执行人',dataIndex:'executeMan',hidden:true},
                {header:'预计归还时间',dataIndex:'expectedReturnTime',hidden:true},
                {header:'备注',dataIndex:'remark',hidden:true},
                {header:'流程实例Id',dataIndex:'processInstanceId',hidden:true},
                {header:'id',dataIndex:'cardSheetId',hidden:true}
            ]);
                        
                        
            //人员信息
            var grid = new ZTESOFT.Grid({
                id : 'listGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试卡工单列表',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
//                collapsible : true,//是否可以收缩
                tbar : this.initGridToolsBar(),//工具条，用来放操作按键
                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryList',
                sm : new Ext.grid.RowSelectionModel({
                    singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                    listeners : {
                        //行选中事件
                        rowselect : function(sm, row, rec) {
                            //oper.qryRule(rec.data.tacheId);
                        }
                    }
                })

            });

            return grid;

        }

        this.initGridToolsBar = function() {
            var tb = new Ext.Toolbar();
            tb.add({
                text : '审核',
                onClick : function() {
                    oper.detail(3);
                }
            },"-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '执行',
                onClick : function() {
                    oper.detail(2);
                }
            },"-");
            tb.add({
                text : '接收',
                onClick : function() {
                    oper.detail(4);
                }
            });//,"-");
//            tb.add({
//                text : '批量导入',
//                onClick : function() {
//                    oper.del();
//                }
//            },"-");
//            tb.add({
//                text : '导出',
//                onClick : function() {
//                    oper.del();
//                }
//            });
//            tb.add('->');//加这个符号可以使在此之后的按键靠右对齐
//            tb.add({
//                text : '上传附件',
//                onClick : function() {
//                    oper.del();
//                }
//            },"-");
//            tb.add({
//                text : '下载附件',
//                onClick : function() {
//                    oper.del();
//                }
//            });

            return tb;
        }
        
        this.detail = function (operStr){
            
            //alert(selNode.id);
            var param = new Object();
//            if(operStr == 'mod'){
                var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if(selinfo.length!=1){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                }
                //var rec = Ext.getCmp('listGrid').getSelectionModel().getSelected();
                var rec = selinfo[0];
                if(rec==null){
                    Ext.Msg.alert('操作提示','请先选择您要修改的行');
                    return;
                }
                param = rec;
//            }
            manager.showWin(operStr,param.data.cardSheetId);
//            manager.initWindow(operStr,param);
            //alert(rec.data.tacheId);
        }
        
        this.del = function(){
            var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
            if(selinfo.length!=1){
                Ext.Msg.alert('操作提示','请先选择您要修改的行');
            }else{
                Ext.Msg.alert('操作提示',selinfo[0].data.dictId);
            }
        }
    }
    
    