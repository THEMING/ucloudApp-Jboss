<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统DEMO</title>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.treedata.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>
<script type="text/javascript" language="javascript" src="<%=path%>/js/ztesoft/ztesoft.button.js"></script>

</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden">
    <div id="content"></div>
</body>
</html>
<script type="text/javascript">
<!--
    var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    var qryPnHeight = 120;
    var gridPnHeight = body_height - qryPnHeight;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据


    var oper = new PageOper();
    //session信息
    var logonAccount = session.logonAccount;
    
    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 

        oper.init();
        
        alert(logonAccount.userId);

    });

    function PageOper() {
        

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
            //主面板

            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',//这种布局方式类似地图，子元素按方位布局
                items : [ qryFrom ]
            });
            return mainPanel;
        }

        this.initQryPn = function() {
            var qryForm = new Ext.FormPanel({
                id : 'qryForm',
                region : 'center',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                labelAlign : 'right',//按键的对齐方式

                labelWidth : 80,//标签宽度
                frame : true,
                collapsible : true,//是否可收缩

                title : '查询条件',
                //bodyStyle : 'padding:5px 5px 5px 5px',
                height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                width : body_width,
                items : [{
                    layout : 'column',//按列的方式布局，即这个面板里在相当于一个table，按行和列交叉

                    items : [{
                        columnWidth : .2,//列宽的比例，表示0.2，即20%，这里也可以合并列，使用colspan属性

                        layout : 'form',//表示列的内容是普通的表单布局，这样会自动把一下行的列内容对齐
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test1',
                            name: 'pop_test1',
                            fieldLabel : '单选人员',
                            valueFile : 'pop_id_test1',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.singleUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test1').setValue(id);
                                        Ext.getCmp('pop_test1').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test1',
                            id: 'pop_id_test1'
                          
                       }]
                    }, {
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test2',
                            name: 'pop_test2',
                            fieldLabel : '复选人员',
                            valueFile : 'pop_id_test2',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.userTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test2').setValue(id);
                                        Ext.getCmp('pop_test2').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test2',
                            id: 'pop_id_test2'
                          
                       }]
                    }, {
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test3',
                            name: 'pop_test3',
                            fieldLabel : '单选组织',
                            valueFile : 'pop_id_test3',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.singleOrgTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test3').setValue(id);
                                        Ext.getCmp('pop_test3').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test3',
                            id: 'pop_id_test3'
                          
                       }]
                    },{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test',
                            name: 'pop_test',
                            fieldLabel : '复选组织',
                            valueFile : 'pop_id_test',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.orgTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test').setValue(id);
                                        Ext.getCmp('pop_test').setValue(text);
                                    }
                                });
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
                    items : [{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test4',
                            name: 'pop_test4',
                            fieldLabel : '单组织/人员',
                            valueFile : 'pop_id_test4',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.singleOrgUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test4').setValue(id);
                                        Ext.getCmp('pop_test4').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test4',
                            id: 'pop_id_test4'
                          
                       }]
                    },{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test5',
                            name: 'pop_test5',
                            fieldLabel : '复组织/人员',
                            valueFile : 'pop_id_test5',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.orgUserTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test5').setValue(id);
                                        Ext.getCmp('pop_test5').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test5',
                            id: 'pop_id_test5'
                          
                       }]
                    },{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test6',
                            name: 'pop_test6',
                            fieldLabel : '单选省份',
                            valueFile : 'pop_id_test6',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.singleProvinceTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test6').setValue(id);
                                        Ext.getCmp('pop_test6').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test6',
                            id: 'pop_id_test6'
                          
                       }]
                    },{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test7',
                            name: 'pop_test57',
                            fieldLabel : '复选省份',
                            valueFile : 'pop_id_test7',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.provinceTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test7').setValue(id);
                                        Ext.getCmp('pop_test7').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test7',
                            id: 'pop_id_test7'
                          
                       }]
                    }]
                },
                {
                    layout : 'column',
                    items : [{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test8',
                            name: 'pop_test8',
                            fieldLabel : '单选地市',
                            valueFile : 'pop_id_test8',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.singleCityTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test8').setValue(id);
                                        Ext.getCmp('pop_test8').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test8',
                            id: 'pop_id_test8'
                          
                       }]
                    },{
                        columnWidth : .2,
                        layout : 'form',
                        items : [{
                            xtype: 'ZTESOFT.Popup',
                            id: 'pop_test9',
                            name: 'pop_test9',
                            fieldLabel : '单选地市',
                            valueFile : 'pop_id_test9',
                            //readOnly: true,
                            anchor : '100%',
                            onPopup : function() {
                                //选择事件逻辑
                                TreeOper.cityTree({
                                    onComplete: function(id,text,data){
                                        Ext.getCmp('pop_id_test9').setValue(id);
                                        Ext.getCmp('pop_test9').setValue(text);
                                    }
                                });
                            }

                        },{
                            xtype: 'hidden',
                            name: 'pop_id_test9',
                            id: 'pop_id_test9'
                          
                       }]
                    },{
                    	columnWidth : .2,
                        layout : 'form',
    	                items:[
    	                       {
    			                    xtype: 'ZTESOFT.Popup',
    			                    id: 'pop_test10',
    			                    name: 'pop_test10',
    			                    fieldLabel : '父节点下属部门人员',
    			                    valueFile : 'pop_id_test10',
    			                    //readOnly: true,
    			                    anchor : '100%',
    			                    onPopup : function() {
    			                        //选择事件逻辑
    			                        TreeOper.orgAndUserByCon({
    			                        	parentId:logonAccount.cloudOrgId,
    			                        	parentName:logonAccount.userDeptName,
    			                        	singleSelect:false,
    			                            onComplete: function(id,text,data){
    			                                Ext.getCmp('pop_id_test10').setValue(id);
    			                                Ext.getCmp('pop_test10').setValue(text);
    			                            }
    			                        });
    			                    }
    	                       },{
    	                    	   xtype: 'hidden',
    	                            name: 'pop_id_test10',
    	                            id: 'pop_id_test10'
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

                            alert(Ext.getCmp('pop_id_test3').getValue());
                            
                            //根据name取值，一般建议使用ID
                            //使用选择器，匹配所有name属性以‘_test’结尾的元素，注意这里跟jquery一样，返回的是伪数组

                            var e2 = Ext.query("*[name$=pop_test]"); 
                            //将dom元素转化为ext的对象

                            Ext.each(e2,function(){
                                var e3 = Ext.get(this);
                                //接下来就可以使用所有ext对象的方法了。

                               // alert(e3.getValue());
                            });
                            

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

    }

   


//-->
</script>
