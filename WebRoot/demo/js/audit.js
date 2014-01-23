function AuditOper() {

    this.width = 800;
    this.height = 600;
    this.gridHeight = 100;
    this.init = function() {

        var tabs = this.getTab();
        tabs.setActiveTab(1);
        new Ext.Window({
            id : 'auditWin',
            width : this.width,
            title : 'audit',
            height : this.height,
            layout : 'fit',
            items : [ tabs ],
            buttonAlign : 'center',
            buttons : [ {
                text : '确定',
                onClick : function() {

                }
            }, {
                text : '关闭',
                onClick : function() {
                    Ext.getCmp('auditWin').close();
                }
            } ]
        }).show();
        
        Ext.getCmp('grid11').getStore().load();
    }

    this.getTab = function() {
        var roleList = [{id:'grid2',title:'物资采购部分分管领导'}];
        var hisPanel = this.getPanle('companyId','公司:总部',roleList);
        
        var roleList2= [{id:'grid11',title:'拟稿'},
                        {id:'grid22',title:'物资采购部经理'}];
        var hisPanel2 = this.getPanle('companyId2','公司:北京分公司',roleList2);
           
        var tabs = new Ext.TabPanel({
            activeTab : 0,
            items : [ {
                title : '工单详情',
                html : 'A simple tab'
            }, {
                title : '申批历史',
                items : [ hisPanel ,hisPanel2]
            } ]
        });

        return tabs;

    }

    this.getPanle = function(id,title,roleList) {
        var panelHeight = (this.gridHeight + 20)*roleList.length + 20;
        
        var items = new Array();
        for(var i=0;i<roleList.length;i++){
            var grid = this.getGrid(roleList[i].id,  roleList[i].title);
            items.push(grid);
        }
        
        var qryPn = new Ext.Panel({
            title : title,
            id : id,
            region : 'center',
            height : panelHeight,
            border : true,// 边框
            //bodyStyle : 'padding:10px;',
            items : items
        });

        return qryPn;
    }

    this.getGrid = function(id , title) {
        var gridWidth = this.width-60;
        // 创建列
        var fields = new Array();
        var column = new Ext.grid.ColumnModel([
             new Ext.grid.RowNumberer({header:'序号',width:30}),                                  
            {header:'操作人',dataIndex:'dataName',width:gridWidth*0.15},
            {header:'操作时间',dataIndex:'dataValue',width:gridWidth*0.15},
            {header:'操作类型',dataIndex:'dataTypeName',width:gridWidth*0.15},
            {header:'申批意见',dataIndex:'orderIndex',width:gridWidth*0.5}
        ]);
        var grid = new ZTESOFT.Grid({
            id : id,
            region : 'center',//在父容器里的位置
            height : this.gridHeight,
            style  : 'margin:10px;',
            title : title,
            cm : column,//列定义
            paging : false,//是否分页
            url : PATH+'/demo/fun1/demoAction.json?method=page',//访问读取后台数据的地址
            sm : new Ext.grid.RowSelectionModel({
                singleSelect : false,//单选，如果有带checkbox的话，可以选择多选模式
                listeners : {
                    //行选中事件
                    rowselect : function(sm, row, rec) {
                    }
                }
            })
        });

        return grid;
    }

}