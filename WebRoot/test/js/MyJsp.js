var body_height = Ext.getBody().getSize().height;
var body_width = Ext.getBody().getSize().width;
var qryPnHeight = 120;
var gridPnHeight = body_height - qryPnHeight;
var gridWidth = body_width;
var cnt = 30; //列表每页显示多少条数据
var myjsp = new MyJsp();

Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';
        myjsp.init();
    });


    function MyJsp() {
    	this.init = function() {
            var mainPanel = this.initMainPanel();
            var viewport = new Ext.Viewport({
                el : 'content',
                layout : 'border',
                margins : '5 5 5 5',
                items : [ mainPanel ]
            });            
        }
        
        this.initMainPanel = function(){
            var listPanel = this.initListGrid();
            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',
                items : [ 
                          listPanel ]
            });
            return mainPanel;
        }
        
        this.initListGrid = function(){
            var column = new Ext.grid.ColumnModel([
                new Ext.grid.CheckboxSelectionModel(),   
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'工单流水号',dataIndex:'sheetSerialNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return '<a href=javascript:manager.showWin(0,'+record.data.cardSheetId+')>' + value + '</a>';
                    },width:gridWidth*0.15},
                {header:'工单类型',dataIndex:'sheetTypeName',
                    width:gridWidth*0.1},
                {header:'工单主题',dataIndex:'sheetTheme',width:gridWidth*0.1},  
                {header:'缓急程度',dataIndex:'urgencyLevel',width:gridWidth*0.1},
                {header:'处理组',dataIndex:'dealGroup',width:gridWidth*0.1,hidden:true},
                {header:'处理人',dataIndex:'dealMan',width:gridWidth*0.1,hidden:true},
                {header:'建议完成时间',dataIndex:'requiredFinishTime',width:gridWidth*0.15},
                {header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.15},
                {header:'创建时间',dataIndex:'creationDate',width:gridWidth*0.15,sortable:true,defaultSortable:true},
                {header:'工单状态',dataIndex:'woStatusEnumId',
                renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                        return woStatusMap.get(value);
                    },
                    width:gridWidth*0.1},
                {header:'工单状态',dataIndex:'sheetStatusName',
                    width:gridWidth*0.1,hidden:true},
                
                {header:'当前环节',dataIndex:'currentNode',hidden:true},
                {header:'工单状态',dataIndex:'woStatusEnumId',hidden:true},
                {header:'工单类型',dataIndex:'cardOperationTypeEnumId',hidden:true},
                {header:'归属地',dataIndex:'localeId',hidden:true},
                {header:'单位名称',dataIndex:'companyName',hidden:true},
                {header:'建单人',dataIndex:'createdBy',hidden:true},
                {header:'派发时间',dataIndex:'dispatchDate',hidden:true},
                {header:'建单时间',dataIndex:'creationDate',hidden:true},
                {header:'审核单位',dataIndex:'auditDepartmentId',hidden:true},
                {header:'审核人',dataIndex:'auditPersonId',hidden:true},
                {header:'执行单位',dataIndex:'executeDepartmentId',hidden:true},
                {header:'执行人',dataIndex:'executePersonId',hidden:true},
                {header:'预计归还时间',dataIndex:'expectedReturnTime',hidden:true},
                {header:'工单标题',dataIndex:'sheetTheme',hidden:true},
                
                {header:'id',dataIndex:'cardSheetId',hidden:true},
                {header:'processInstanceId',dataIndex:'processInstanceId',hidden:true}
            ]);
            var grid = new ZTESOFT.Grid({
                id : 'listGrid',
                region : 'center',//在父容器里的位置
                height : gridPnHeight,//默认宽度为自适应的，一般不用设置
                title : '测试',
                cm : column,//列定义
                pageSize : cnt,//页纪录数
                paging : true,//是否分页
                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryList',
                sm : new Ext.grid.CheckboxSelectionModel()
            });

            return grid;
        }
    }
