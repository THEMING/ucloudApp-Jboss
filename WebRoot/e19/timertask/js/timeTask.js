
function Oper() {
    this.init = function() {
        var mainPanel = this.initMainPanel();
        var viewport = new Ext.Viewport({
            el : 'content',
            layout : 'border',
            margins : '5 5 5 5',
            items : [ mainPanel ]
        });
    }

    // 初始化主面板
    this.initMainPanel = function() {
        // 工具条
        var tbar = this.initGridToolsBar();
        // 列表
        var listPanel = this.initListGrid();

        // 主面板
        var mainPanel = new Ext.Panel({
            region : 'center',
            layout : 'border',// 这种布局方式类似地图，子元素按方位布局
            items : [ tbar, listPanel ]
        });
        return mainPanel;
    }
    
    this.initQryWin = function() {
        var qryFrom = this.initQryPn();
        new Ext.Window({
            id : 'qryWin',
            title : '高级检索',
            closable : true,
            width : 660,
            height : 230,
            plain : true,
            modal : true,
            items : [ qryFrom ],
            buttonAlign : 'center',
            buttons : [ {
                text : '查询',// 两个字以内（包含两字）用红色，两个字以上用蓝色，特殊用灰色
                id : 'qryBtn',
                xtype : 'ZTESOFT.Button',
                listeners : {
                    "click" : function() {
                        oper.beforeQuery();
                        Ext.getCmp('qryWin').close();
                    }
                }
            }, {
                text : '重置',
                xtype : 'ZTESOFT.Button',
                listeners : {
                    "click" : function() {
                        Ext.getCmp('qryForm').getForm().reset();
                    }
                }
            }, {
                text : '关闭',
                xtype : 'ZTESOFT.Button',
                listeners : {
                    "click" : function() {
                        Ext.getCmp('qryWin').close();
                    }
                }
            } ]
        }).show();
        
        //this.loadQryForm();
    };

    this.loadQryForm = function(){
        Ext.getCmp('checkLevelEnumIdQry').setValue(qryParams.checkLevelEnumId);
        Ext.getCmp('kpiCategoryEnumIdQry').setValue(qryParams.kpiCategoryEnumId);
        Ext.getCmp('kpiStatusQry').setValue(qryParams.kpiStatus);
        Ext.getCmp('kpiNameQry').setValue(qryParams.kpiName);
    }
    
    this.initQryPn = function() {
        var qryForm = new Ext.FormPanel({
            id : 'qryForm',
            buttonAlign : 'right',
            frame : true,
            layoutConfig : {
                columns : 2 * 2
            },
            layout : 'table',
            bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',//标签的对齐方式
                hideLabel : true,
                width : 150,//最小是120，最大190
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '指标名称'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'kpiNameQry',
                        id : 'kpiNameQry',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '考核级别'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'checkLevelEnumIdQry',
                        id : 'checkLevelEnumIdQry',
                        valueField : 'dataValue',
                        displayField : 'dataName',
                        emptyText : '请选择',
                        mode : 'local',
                        triggerAction : 'all',
                        editable : false,
                        forceSelection : true,
                        dict : true,
                        dictType : 'CHECK_LEVEL',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '指标种类'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        id : "kpiCategoryEnumIdQry",
                        name : "kpiCategoryEnumIdQry",
                        valueField : 'dataValue',
                        displayField : 'dataName',
                        emptyText : '请选择',
                        mode : 'local',
                        triggerAction : 'all',
                        editable : false,
                        forceSelection : true,
                        dict : true,
                        dictType : 'KPI_CATEGORY',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '指标状态'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.combofield',
                        hideLabel : true,
                        name : 'kpiStatusQry',
                        id : 'kpiStatusQry',
                        valueField : 'value',
                        displayField : 'text',
                        emptyText : '请选择',
                        mode : 'local',
                        triggerAction : 'all',
                        editable : false,
                        forceSelection : true,
                        store : kpiStatusStore,
                        anchor : '100%'
                    }
                }
            ]
        });
        return qryForm;
    };

    this.qryListGrid = function(gridName,param){
        Ext.getCmp(gridName).store.on('beforeload', function(store) {
            if (Ext.getCmp(gridName).store.lastOptions != null) {
                Ext.getCmp(gridName).store.baseParams = param;
            }
        });
        Ext.getCmp(gridName).store.load({
            params : {
                start : 0,//开始索引
                limit : Ext.getCmp(gridName).getPageSize()//步数
            }
        });
        Ext.getCmp(gridName).store.on('load', function() {
            Ext.getCmp(gridName).getSelectionModel().selectFirstRow();//选中第一行
        });
    }

    this.initListGrid = function() {
        // 创建列
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel([ cm,
        new Ext.grid.RowNumberer({header:'序号',width:40}),
       {
            header : '任务ID',
            dataIndex : 'taskId',
            hidden : true
        },{
            header : '执行状态',
            dataIndex : 'taskStatus',
            hidden : true
        }, {
            header : '任务名称',
            dataIndex:'taskName',
          /*  renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
                return '<a href="#" onclick="oper.doViewDetail('+rowIndex+');">' + value + '</a>';
            },*/
            width:gridWidth*0.2
        },{
            header : '执行IP',
            dataIndex : 'taskApplyIp',
            width : gridWidth * 0.12
        },{
            header : '执行计划',
            dataIndex : 'taskPlan',
            width : gridWidth * 0.12
        }, {
            header : '执行类名',
            dataIndex : 'taskClassName',
            width : gridWidth * 0.25
        }, {
            header : '执行状态',
            dataIndex : 'taskStatusName',
            width : gridWidth * 0.1,
            renderer : function(value, metadata, record) {
                var index = taskStatusStore.find('value', record.data.taskStatus);
                if (index != -1) {
                    return taskStatusStore.getAt(index).data.text;
                }
                return value;
            }
        }, {
            header : '暂停',
            dataIndex : 'pause',
            width : gridWidth * 0.1,
            renderer:oper.pauseTask
        }, {
            header : '继续',
            dataIndex : 'continue',
            width : gridWidth * 0.1,
            renderer:oper.resumeTask
        }, {
            header : '删除',
            dataIndex : 'delete',
            width : gridWidth * 0.1,
            renderer:oper.deleteTask
        }]);
        // 表格属性
        var grid = new ZTESOFT.Grid({
            id : 'listGrid',
            region : 'center',// 在父容器里的位置
            height : gridPnHeight,// 默认宽度为自适应的，一般不用设置
            title : '执行任务列表',
            cm : column,// 列定义
            pageSize : cnt,// 页纪录数
            paging : true,// 是否分页
            columnLines : true,
            url : PATH + '/e19/timertask/TimerManaAction.json?method=findTasks',
            sm : cm
        });

        return grid;
    }

    this.initGridToolsBar = function() {
        var tb = new Ext.Toolbar({
            region : 'north'
        });

        tb.add("->");
        
        tb.add({
            text : '注册',
            xtype: 'ZTESOFT.Link',
            onClick : function() {
                oper.initWindow();
            }
        }, "-");
        return tb;
    }
    
    //继续任务
    this.resumeTask = function(val, cellmeta, record){
        var retVal;   
        var taskId = record.data.taskId;
        var operType = 'resumeTask';
        retVal = '<a href ="javascript:oper.taskOper(\'' + taskId
             + '\',\''+operType+'\',\''+record.data.taskStatus+'\')">继续</a>';
        return retVal;
    }
    
    //暂停任务
    this.pauseTask = function(val, cellmeta, record){
        var retVal;   
        var taskId = record.data.taskId;
        var operType = 'pauseTask';
        retVal = '<a href ="javascript:oper.taskOper(\'' + taskId
             + '\',\''+operType+'\',\''+record.data.taskStatus+'\')">暂停</a>';
        return retVal;
    }
    
    //删除任务
    this.deleteTask = function(val, cellmeta, record){
        var retVal;   
        var taskId = record.data.taskId;
        var operType = 'deleteTask';
        retVal = '<a href ="javascript:oper.taskOper(\'' + taskId
             + '\',\''+operType+'\',\''+record.data.taskStatus+'\')">删除</a>';
        return retVal;
    }
    
    this.taskOper = function(taskId,operType,taskStatus){
            var param = new Object();
            param.TaskId = taskId;
            var methodStr;
         
              if(operType =='deleteTask'){
                 
                 methodStr ='deleteTask';
              }else if(operType =='resumeTask'){
                  if(taskStatus == "1"){
                      Ext.Msg.alert('操作提示','任务已在运行中');
                      return;
                  }
                  methodStr ='resumeTask';
              }else if(operType =='pauseTask'){
                  if(taskStatus == "0"){
                      Ext.Msg.alert('操作提示','任务已在暂停中');
                      return;
                  }
                 methodStr = 'pauseTask';
              }else{
                  Ext.Msg.alert('操作提示','配置错误!请查看');
                  return;
              }
     
             if( methodStr =='deleteTask'){
                 Ext.Msg.confirm("操作提示", "确定删除?", function(btn) {
                     if (btn != "yes") {
                         return ;
                     }else{
                         ZTESOFT.invokeAction(
                                 PATH + '/e19/timertask/TimerManaAction.json?method='+methodStr,
                                 param, 
                                 function(response) {
                                     if(response.flag=='success'){
                                         Ext.Msg.alert('操作提示',response.msg);
                                         oper.qryListGrid('listGrid',null);
                                     }else{
                                         Ext.Msg.alert('操作提示',response.msg);
                                     }     
                       });       
                     }
                 });
             }else{
                 ZTESOFT.invokeAction(
                         PATH + '/e19/timertask/TimerManaAction.json?method='+methodStr,
                         param, 
                         function(response) {
                             if(response.flag=='success'){
                                 Ext.Msg.alert('操作提示',response.msg);
                                 oper.qryListGrid('listGrid',null);
                             }else{
                                 Ext.Msg.alert('操作提示',response.msg);
                             }     
              });
   
             }
             
            
      
         
         
      }
    
    this.register = function(param){
        if (!Ext.getCmp('registeForm').getForm().isValid()) {
            return;
        }
        ZTESOFT.invokeAction(
                   PATH + '/e19/timertask/TimerManaAction.json?method=registerTask',
                   param, 
                   function(response) {
                           if (response.msg == 'success') {
                               Ext.Msg.alert('操作提示','注册成功!');
                               Ext.getCmp('detailWin').close();
                               oper.qryListGrid('listGrid',null);
                            } else {
                                Ext.Msg.alert('操作提示','注删失败!');
                            }
                   });
       
       }
    
    this.initWindow = function() {
        var formPanel = this.initFormPanel();
        var formWin = new Ext.Window({
            id : 'detailWin',
            title : '注册',
            closable : true,
            width : dtlWidth,
            height : dtlHeight,
            layout : 'anchor',
            plain : true,
            modal : true,
            items : [ formPanel ],
            buttonAlign : 'center',
            buttons : [ {
                text : '注册',
                xtype : 'ZTESOFT.Button',
                listeners : {
                    "click" : function() {
                        var param = Ext.getCmp('registeForm').getForm().getValues();
                        param.registerClassName = Ext.getCmp('registerClassName').value;   
                        oper.register(param);
                    }
                }
            }, {
                text : '关闭',
                xtype : 'ZTESOFT.Button',
                listeners : {
                    "click" : function() {
                        Ext.getCmp('detailWin').close();
                    }
                }
            } ]
        });
        formWin.show();
    }
    
    this.initFormPanel = function() {
         
        this.taskStore = new Ext.data.ArrayStore({
            fields : [ 'value', 'text' ],
            data : [ 
             ['com.unicom.ucloud.eom.e19.timertask.EomTCMTaskImpl', 'com.unicom.ucloud.eom.e19.timertask.EomTCMTaskImpl']
           ]
        });
        
        var qryForm = new Ext.FormPanel({
            id : 'registeForm',
            buttonAlign : 'right',
            frame : true,
            layoutConfig : {
                columns : 2 * 2
            },
            layout : 'table',
            bodyStyle : 'padding:20px;overflow-x:hidden;overflow-y:auto;',
            defaults : {
                border : false,
                bodyStyle : 'padding:0 0 0 0;',
                layout : 'form',
                frame : false,
                labelAlign : 'center',//标签的对齐方式
                hideLabel : true,
                width : 150,//最小是120，最大190
                height : 30
            },
            items : [
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>任务名称'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        allowBlank : false,
                        name : 'taskName',
                        id : 'taskName',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>执行IP'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        allowBlank : false,
                     //   regex : /^[0-9]*[.][0-9]*[.][0-9]*[.][0-9]+$/,
                        regex:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                        regexText : "ip正确格式：255.255.255.1",        
                        name : 'taskIP',
                        id : 'taskIP',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>执行计划'
                    }
                },
                {
                    colspan : 3,
                    width : 150*3,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        allowBlank : false,
                   //     value : '* * * * * *',
                        name : 'taskPlan',
                        id : 'taskPlan',
                        regex:/^(([1-5][0-9]|[0-9])|[*])\s(([1-2][0-3]|[1-9])|[*])\s((([1-2][0-9])|([3][0-1])|[1-9])|[*])\s(([1][0-2]|[1-9])|[*])\s(([0-6])|[*])\s(([1][9][7-9][0-9]|[2][0][0-9][0-9])|[*])$/,
                        regexText:'正确格式:分钟  小时  日期  月份  星期  年份 ([0-59] [1-23] [1-31] [1-12] [0-6] [1970-2099]),也可以用*代表任意 ',
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>任务参数'
                    }
                },
                {
                    colspan : 3,
                    width : 150*3,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'taskParmeter',
                        id : 'taskParmeter',
                        value:'key1:value1;key2:value2;key3:value3',
                        readOnly:true,
                        anchor : '100%'
                    }
                },
                 
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '<font color="red">*</font>注册类名称'
                    }
                }/*,{
                    colspan : 3,
                    width : 150*3,
                    items : 
                    {
                        xtype : 'ZTESOFT.enum',
                        hideLabel : true,
                        name : 'registerClassName',
                        id : 'registerClassName',
                        valueField : 'value',
                        displayField : 'text',
                        mode : 'local',
                        triggerAction : 'all',
                        editable : false,
                        value : '',
                        store : this.taskStore,
                        anchor : '95%'
                    } 
                    
                },*/,
                {
                    colspan : 3,
                    width : 150*3,
                    items : {
                        xtype : 'ZTESOFT.textfield',
                        hideLabel : true,
                        name : 'registerClassName',
                        id : 'registerClassName',
                        value:'com.unicom.ucloud.eom.e19.timertask.EomTCMTaskImpl',
                        readOnly:true,
                        anchor : '100%'
                    }
                },
                {
                    colspan : 1,
                    items : {
                        xtype : 'ZTESOFT.label',
                        html : '任务描述'
                    }
                },
                {
                    colspan : 3,
                    width : 150*3,
                    height : 50,
                    items : {
                        xtype : 'ZTESOFT.textarea',
                        hideLabel : true,
                        name : 'taskDesc',
                        id : 'taskDesc',
                        value:'',
                        height : 50,
                        anchor : '100%'
                    }
                }
            ]
        });
        return qryForm;
    }
};