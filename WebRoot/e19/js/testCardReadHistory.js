function TestCardHistoryOper(){
        
        var title = '';
        this.initHistory = function(typeId,value){
            
            var formPanel = hisOper.initHistoryGrid(typeId);
            if(typeId == testCardEnum){
                title = '测试卡变动历史';
            }else if(typeId == teleCardEnum){
                title = '固定电话变动历史';
            }else if(typeId == terminalEnum){
                title = '测试终端变动历史';
            }else if(typeId == rechCardEnum){
                title = '充值卡变动历史';
            }

            var formWin = new Ext.Window({
                id:'historyWin',
                title: title,
                closable:true,
                width: 700,
                height: body_height*0.9,
                layout: 'border',
                plain:true,
                items: [formPanel],
                buttonAlign:'center',
                buttons: [{
                    text: '关闭',
                    xtype: 'ZTESOFT.Button',
                    onClick:function(){
                        Ext.getCmp('historyWin').close();
                    }
                }]
            });
             formWin.show();
             hisOper.loadDataForHistory(typeId,value);
        }
        
        this.initHistoryGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel();
            var column = new Ext.grid.ColumnModel([
                cm,         
                new Ext.grid.RowNumberer({header:'序号',width:40}),
                {header:'ID',dataIndex:'cardSheetId',hidden:true},
                {header:'工单流水号',dataIndex:'sheetSerialNumber',renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                    return '<a href=javascript:orderDet.showWin(0,'+record.data.cardSheetId+')>' + value + '</a>';
                },width:gridWidth*0.15},
                {header:'工单类型',dataIndex:'sheetTypeName',width:gridWidth*0.08},
                {header:'工单状态',dataIndex:'sheetStatusName',width:gridWidth*0.08},
                {header:'工单主题',dataIndex:'sheetTheme',width:gridWidth*0.08},
                {header:'创建人',dataIndex:'createdByName',width:gridWidth*0.08},
                {header:'创建时间',dataIndex:'creationDate',width:gridWidth*0.1},
                {header:'要求完成时限',dataIndex:'requiredFinishTime',width:gridWidth*0.1},
                {header:'完成时间',dataIndex:'finishTime',width:gridWidth*0.1}
            ]);
            //测试卡信息
            var historyGrid = new ZTESOFT.Grid({
                id : 'historyGrid',
                region : 'center',
                title : '变动历史记录',
                cm : column,
                pageSize : 10,
                paging : true,
//                collapsible : true,
                url:PATH+'/e19/testCardOrderApplyAction.json?method=qryEomCardSheetPage',
                sm :cm        
            }); 
            return historyGrid;
        }
        
        this.initHistoryGridToolsBar = function(){
            var tb = new Ext.Toolbar();
            tb.add({
                text : '导出',
                onClick : function() {
                    hisOper.expData();
                }
            });
            return tb;
        }
        
        this.expData = function(){
            
        }
        
      this.loadDataForHistory = function(typeId,value){
            var param = {};
            param.cardId = value;
            param.testobjectTypeEnumId = typeId;
            
            oper.qryListGrid('historyGrid',param);
        }
    }