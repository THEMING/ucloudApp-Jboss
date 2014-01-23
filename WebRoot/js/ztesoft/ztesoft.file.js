Ext.ns("ZTESOFT");

ZTESOFT.uploadFile = function(param) {

};
var win_width = 500;
var win_height = 400;
function FileUploadManager() {
    // 主窗口
    this.winTitle = '增加';
    this.initWindow = function(param) {
        var formPanel = this.initFormPanel();

        var formWin = new Ext.Window({
            id : 'detailWin',
            title : '',
            closable : true,
            width : win_width,
            height : win_height,
            layout : 'border',
            plain : true,
            items : [ formPanel ],
            buttonAlign : 'center',
            buttons : [ {
                text : '确定',
                onClick : function() {
                    manager.addCommit();
                }
            }, {
                text : '关闭',
                onClick : function() {
                    Ext.getCmp('detailWin').close();
                }
            } ]
        });
        formWin.show();

    }

    this.initFormPanel = function() {
        var infoPage = new Ext.FormPanel({
            id : 'infoPage',
            region : 'center',
            labelAlign : 'left',
            frame : true,
            autoScroll : true,
            fileUpload : true,
            width : Ext.getBody().getSize(),
            bodyStyle : 'padding:5px;overflow-x:hidden;overflow-y:auto;',
            buttonAlign : 'center',
            labelWidth : 70,
            items : [ {
                layout : 'column',
                items : [ {
                    columnWidth : .5,
                    layout : 'form',
                    items : [ {
                        id : 'excelUpload',
                        anchor : '90%',
                        height : 30,
                        width : 350,
                        name : 'file',
                        inputType : 'file',
                        fieldLabel : '文件选择'
                    } ]
                } ]
            } ]
        });
        return infoPage;
    }

    // 增加任务提交
    this.addCommit = function() {
        var excelName = Ext.getCmp('excelUpload').getRawValue();// 上传文件名称的路径
        if (excelName == "") {
            Ext.Msg.show({
                title : '提示',
                msg : '请选择文件!',
                buttons : Ext.Msg.OK,
                icon : Ext.MessageBox.INFOR
            });
            return;
        } else {
            var array = new Array();
            array = excelName.split("\\");
            var length = array.length;
            var fileName = "";
            var index = 0;
            for (index = 0; index < length; index++) {
                if (fileName == "") {
                    fileName = array[index];
                } else {
                    fileName = fileName + "/" + array[index];
                }
            }
            formPanel.getForm().submit({
                url : 'http://localhost:8080/pro/upload.json',
                method : 'POST',
                waitMsg : '数据上传中, 请稍等...',
                success : function(form, action, o) {
                    Ext.MessageBox.alert("提示信息", action.result.mess);
                },
                failure : function(form, action) {
                    Ext.MessageBox.alert("提示信息", "请求失败,文件上传失败");
                }
            });
        }

    }

}
