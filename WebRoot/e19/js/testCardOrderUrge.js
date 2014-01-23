var testCardOrderUrge = new DoHurryOper();

function DoHurryOper() {
    
    this.winTitle = '催办';
    var windowWidth = 600;
    var windowHeight = 420; 
    
    var hurryStore = new Ext.data.ArrayStore({
        fields: ['dataValue','dataName'],
        data:[
            ['1','短信'],
            ['2','邮件'],
            ['3','短信和邮件']
        ]
    });
    this.initWindow = function(dataArray,rowData){
        var grid = this.initGridPanel(dataArray);
        var formWin = new Ext.Window({
            id:'hurryWin',
            title: this.winTitle,
            closable:true,
            modal:true,
            width: windowWidth,
            height: windowHeight,
            plain:true,
            items: [grid],
            buttonAlign:'center',
            buttons: [{
                text: '确定',
                id:'btn1',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    testCardOrderUrge.doSubmit(rowData);
                }
            },{
                text: '关闭',
                xtype: 'ZTESOFT.Button',
                onClick:function(){
                    Ext.getCmp('hurryWin').close();
                }
            }]
        });
         formWin.show();
    }
    
    this.initGridPanel = function(dataArray){
        var array = new Array();
        for(var i=0;i<dataArray.length;i++){
            var tmpArray = new Array();
            tmpArray.push(dataArray[i].userId);
            tmpArray.push(dataArray[i].userName);
            tmpArray.push(dataArray[i].userMobileNumber);
            tmpArray.push(dataArray[i].userEmail);
            
            array.push(tmpArray);
        }
        var store = new Ext.data.ArrayStore({
            fields: ['userId','userName','userMobileNumber','userEmail'],
            data:array
        });
        var cm = new Ext.grid.CheckboxSelectionModel();
        var column = new Ext.grid.ColumnModel([
        cm,
        new Ext.grid.RowNumberer({header:'序号',width:40}),
        {
            header : '用户ID',
            dataIndex : 'userId',
            hidden : true
        },{
            header : '用户名称',
            dataIndex : 'userName',
            width : windowWidth * 0.2
        },{
            header : '用户电话',
            dataIndex : 'userMobileNumber',
            width : windowWidth * 0.2
        } ,{
            header : '邮件地址',
            dataIndex : 'userEmail',
            width : windowWidth * 0.25
        },{
            header : '通知类型',
            dataIndex : 'noticeType',
            width : windowWidth * 0.2,
            editor: new Ext.form.ComboBox({
                valueField: 'dataValue',
                displayField: 'dataName',
                mode: 'local',
                triggerAction: 'all',
                editable : true ,
                allowBlank: false,
                store: hurryStore
            }),
            renderer: function(value,metadata,record){
                var index = hurryStore.find('dataValue',value);
                if(index!=-1){
                    return hurryStore.getAt(index).data.dataName;
                }
                return value;
            }
        }  ]);
        var grid = new ZTESOFT.EditorGridPanel({
            id:'userInfoGrid',
            store: store,
            cm: column,
            sm :cm,
            height: 300,
            clicksToEdit: 1,
            bodyStyle:'padding:0px;',
            title : '催办对象列表'
        });
        return grid;
    }
    
    this.doSubmit = function(rowData){
        var selItems = Ext.getCmp('userInfoGrid').getSelectionModel().getSelections();
        if(selItems && selItems.length && selItems.length > 0){
        	Ext.getCmp('userInfoGrid').stopEditing();
            if(!this.editGridValidate('userInfoGrid')){
                return;
            }
        }else{
            Ext.Msg.alert('操作提示', '没有选择任何催办对象！');
            return;
        }
        var dataArray = new Array();
        for(var i=0;i<selItems.length;i++){
            dataArray.push(selItems[i].data);
        }
        var param = {};
        param.sourceAddress ="huqiang.dong@hp.com";// session.logonAccount.userMail;//源邮箱

        param.serviceToken = "1";//应用标识头

        param.noticeId = "1";//通知标识
        param.instanceId = "1";//通知标识
        param.noticeId = "1";//实例标识
        param.moduleId = "E19";//模块标识
        if(session.logonAccount.provinceCompanyId){
            param.provinceId = session.logonAccount.provinceCompanyId;//省份标识
        }else{
            param.provinceId = session.logonAccount.groupCompanyId;
        }

//        param.provinceId = session.logonAccount.provinceCompanyId;//省份标识
        param.userId = session.logonAccount.cloudUserId;//用户标识
        param.sendName = session.logonAccount.userEmpName;//发送人
        param.isServiceNum = 0;//是否是特服号
        param.sendContent = "请尽快处理工单："+rowData.jobTitle;//发送内容

        param.userArray = Ext.encode(dataArray);

        var url = PATH+'/notice/noticeAction.json?method=sendNotice';
        ZTESOFT.invokeAction(url, param, function(response) {
            if (response) {
                Ext.Msg.alert('操作提示', response.msg,function(response) {
                    Ext.getCmp('hurryWin').close();
                });
            } 
        });
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
                  var header = cm.getColumnHeader(colIndex);
                  var rowIndex = store.indexOfId(record.id);//行号
                  var cellEditor = cm.getCellEditor(colIndex,rowIndex);
                  if(!cellEditor){
                      continue;
                  }
                  var editor = cellEditor.field;//colIndex使用的编辑器
                  if(!editor.allowBlank){//不能为空
                      if(value != 0){
                          if(!value){
                              Ext.Msg.alert('提示',header + " 该项为必填项", function(){
                                  Ext.getCmp(gridName).startEditing(rowIndex, colIndex);
                              });
                              return flag=false;
                          }
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
      
}