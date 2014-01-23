<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../common/ztesoft-ext/include.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="../common/deeptree/include/rmGlobal.jsp" %>
<meta http-equiv="x-ua-compatible" content="ie=8"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>系统DEMO</title>
<!-- 树目录用到的引入 -->
<script type="text/javascript" language="javascript"
	src="<%=path%>/js/ztesoft/ztesoft.tree.js"></script>
<script type="text/javascript" language="javascript"
	src="<%=path%>/js/ztesoft/ztesoft.treedata.js"></script>
<script type="text/javascript"
	src="<%=path%>/js/ext/TreeFilter/PinyinFilter.js"></script>
<script type="text/javascript"
	src="<%=path%>/js/ext/TreeFilter/TreeFilter.js"></script>
<!-- 上传下载用到的引入 -->
<link type="text/css" rel="stylesheet"
	href="<%=path%>/common/udf/js/icon.css" />
 <script type="text/javascript"
	src="<%=path%>/common/udf/js/swfupload.js"></script> 
<script type="text/javascript"
	src="<%=path%>/common/udf/js/uploaderPanel.js"></script> 
<script type="text/javascript"
	src="<%=path%>/common/udf/js/ztesoft.file.js"></script>
<!-- 页面功能的引入 -->
<script type="text/javascript" src="js/audit.js"></script>
<script type="text/javascript" src="<%=path%>/js/ext/ux/CheckColumn.js"></script>
<script type="text/javascript" src="js/edit_grid.js"></script>

<!-- 派发树文件引入 -->
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/deeptree/css/deeptree.css"/>
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showDeeptreeWin.js"></script>
<!-- 组织树文件引入 -->
<script type="text/javascript" src="<%=path%>/common/deeptree/js/showFreetreeWin.js"></script>

<!-- 附件格式工具引入 -->
<script type="text/javascript" src="<%=path%>/js/ztesoft/ztesoft.attachmentutil.js"></script>

<!-- 
<script type="text/javascript" src="<%=path%>/js/common/calendar/calendar_ext321.js"></script>

<script type="text/javascript" src="<%=path%>/js/df.js"></script>
<script type="text/javascript"
	src="<%=path%>/js/calendar/calendar_ext321.js"></script>
 -->
 
 <!-- 日期控件引入文件 -->
<%--<link rel="stylesheet" type="text/css" href="<%=path%>/common/calendar/calendar.css" />
<script type="text/javascript" src="../common/calendar/extSpinner.js">
</script>
<script type="text/javascript" src="../common/calendar/extSpinnerField.js">
</script>
<script type="text/javascript" src="../common/calendar/extDateTimeField.js">
</script>
<script type="text/javascript" src="<%=path%>/js/jquery/jquery-1.7.min.js"></script>
<script type="text/javascript" src="<%=path%>/common/calendar/calendar_ext321.js"></script>

--%><!-- combo控件引入文件 -->
<%--<script type="text/javascript" src="<%=path%>/css/extselect3.css"></script>

--%><!-- 上传文件引入 -->
<!-- <link href="<%=path%>/css/common/df.css" rel="stylesheet" type="text/css" /> -->
<%--<script type="text/javascript" src="<%=path%>/js/common/df.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/fileupload.js"></script>

--%></head>

<body style="width: 100%; height: 100%; overflow: hidden ;">
	<div id="content"></div>
</body>
</html>
<script type="text/javascript">    
	/**派发树相关数据**/

	/********************/





    var body_height = Ext.getBody().getSize().height;
    var body_width = Ext.getBody().getSize().width;
    //var qryPnHeight = 370;
    var gridPnHeight = body_height - 35;
    var gridWidth = body_width;
    var cnt = 30; //列表每页显示多少条数据


    var oper = new PageOper();
    var manager = new ManagerOper();
    var eo = new EdGridOper();
    //定义全局的查询条件，因为form移出之后，不能再直接通过form去取得查询条件

    var qryParams = new Object();
    
    //session信息
    var logonAccount = session.logonAccount;
    
    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 

        oper.init();
        
        //alert(logonAccount.user.userId + ':' + logonAccount.user.userName);
        
        //alert(Ext.isIE9);
        
        var browser=navigator.appName 
        var b_version=navigator.appVersion 
        var version=b_version.split(";"); 
        var trim_Version=version[1].replace(/[ ]/g,""); 
        
        //alert(trim_Version);
        
        //debug;

    });
    	
    function PageOper() {

        this.demoStateStore = new Ext.data.ArrayStore({
            fields : [ 'value', 'text' ],
            data : [ [ 'ATTACHMENT_FORMAT', '附件格式' ], [ 'SPECIALITY', '专业域' ] ]
        });
        
        this.demoTimeStore = new Ext.data.ArrayStore({
            fields : [ 'value', 'text' ],
            data : [ [ '1', '峻工' ], [ '2', '归档' ] ]
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

        };

        this.initQryWin = function() {

            //qery
            var qryFrom = this.initQryPn();

            var qryWin = new Ext.Window({
                id : 'qryWin',
                title : '高级检索',
                closable : true,//724为最大值

                width : 686,//160*4=640 + 20(scroll)  = 660;
                height : 290,//30(cell-height)* 6 = 180 + 40(button-panel)+  50(textarea) +20 = 290
                //layout : 'border',
                autoScroll :true,
                plain : true,
                modal : true,
                items : [ qryFrom,new Ext.FormPanel({
                	height:400,
                	frame:true,
                	bodyStyle : 'padding:20px 10px 0px 10px;overflow-x:hidden;overflow-y:hidden;',
                	title:'测试formpanel标题',
                	items:[{
                		xtype:'textfield',
                		value:'eee'
                	}]
                }),{
                	xtype:'panel',
                	height:400,
                	frame:false,
                	title:'测试panel标题',
                	items:[{
                		xtype:'ZTESOFT.textfield',
                		value:'eee',
                		id:'t_eee'
                	},{
                		xtype:'button',
                		text:'组织树',
                		listeners:{
                			"click":function(){
                            	var _nodeRelationType="noRelation";
                            	var _isOnlyLeaf="0";
                            	var _inputType="checkbox";
                            	var _orgId = session.org.cloudOrgId;
                				var freeTreeObj = new FreeTreeObj("free_tree_1","22357",_nodeRelationType,_isOnlyLeaf,_inputType);
                				freeTreeObj.showTree(function(data){
                					Ext.getCmp('t_eee').setValue(data.text);
                				});
                			}
                		}
                	},{
                		xtype:'button',
                		text:'查询',
                		listeners:{
                			"click":function(){
                				/*alert(document.getElementById("_freeTreeDiv_thisType").value);
                				alert(document.getElementById("_freeTreeDiv_sex").value);
                				alert(document.getElementById("_freeTreeDiv_id").value);
                				alert(document.getElementById("_freeTreeDiv_text").value);
                				alert(document.getElementById("_freeTreeDiv_accountId").value);*/
                				var data = getFreeTreeObj();
                				alert(data.text);
                			}
                		}
                	}]
                }],
                buttonAlign : 'center',
                buttons : [ {
                    text : '查询',//两个字以内（包含两字）用红色，两个字以上用蓝色，特殊用灰色

                    id : 'qryBtn',
                    //disabled: true,
                    xtype : 'ZTESOFT.Button',
                    listeners : {
                        "click" : function() {
                        	
                        	/*var fileList =  getNewUplValue("panel1");
                        	for(var v = 0;v<fileList.length; v++){
                        		alert(fileList[v].fileId) ;
                        		alert(fileList[v].fileName) ;
                        		alert(fileList[v].attachmentFormatEnumId) ;
                        		alert(fileList[v].fileType) ;
                        	}*/
                        	/*var fileList =  getNewUplValue("panel2");
                        	for(var v = 0;v<fileList.length; v++){
                        		alert(fileList[v].fileId) ;
                        		alert(fileList[v].fileName) ;
                        		alert(fileList[v].attachmentFormatEnumId) ;
                        		alert(fileList[v].fileType) ;
                        	}
                        	
                        	var remove = getRemoveValue("panel1");
                        	alert(remove);*/
                            //获取查询参数
                            var param = Ext.getCmp('qryForm').getForm().getValues();
                            //注意：不可编辑的combox，不能通过form自动取值，而是要通过控件显式取值

                            param.com_test = Ext.getCmp('com_test').getValue();

                            //alert(param.pop_id_test);
                            //alert(param.com_test);
                            
                           // alert(Ext.getCmp('checkbox').getValue());//chekcgroup必须使用getCmp方法，通过value属性来取得值

                            param.checkbox = Ext.getCmp('checkbox').getValue();
                            
                           // alert(param.checkId);

                            oper.qryListGrid(param);

                            //根据name取值，一般建议使用ID
                            var el = Ext.get("num_test");
                            //使用选择器，匹配所有name属性以‘_test’结尾的元素，注意这里跟jquery一样，返回的是伪数组

                            //var e2 = Ext.query("*[name$=_test]");
                            var e2 = Ext.query("#qryForm input");
                            //alert(e2.length);
                            //将dom元素转化为ext的对象
                            Ext.each(e2, function() {
                                var e3 = Ext.get(this);
                                //接下来就可以使用所有ext对象的方法了。

                                //alert(e3.getValue());
                            });

                            //Ext.getCmp('qryWin').close();
                            //特别注意这里的处理

                            qryParams = param;

                        }
                    }
                }, {
                    text : '关闭',
                    xtype : 'ZTESOFT.Button',
                    //disabled: true,
                    //color: 'gray',//这里取消按钮比较特殊，用的是灰色底色，一般情况下都是红蓝
                    listeners : {
                        "click" : function() {
                        	alert(getUplCount('panel1'));
                        	Ext.getCmp('com_test_2').store.removeAt(0);
                            //Ext.getCmp('qryWin').close();
                            //Ext.Msg.alert('取消','close');
                        	//Ext.Msg.confirm('取消','close');
                        }
                    }
                } ]
            }).show();
            
            //Ext.getCmp('pop_test').hide();
            //Ext.getCmp('com_test').hide();
            //Ext.getCmp('date_time').hide();
          //Ext.getCmp('compositefield1').doLayout();
          /*
            $(document).ready(function(){ 
                $("img.x-form-trigger.x-form-date-trigger").live('click',function(){
                 
                    $("div.x-menu.x-menu-floating.x-layer.x-date-menu.x-menu-plain.x-menu-nosep").css('display','none');
                    $(".x-shadow").css('display','none');
                    $(".x-ie-shadow").css('display','none');
                    
                    var obj=$("#ContainerPanel");
                    var ss=obj.css("display");
                    
                    if(obj[0]==null||ss=='none'){
                        var caldiv=$(this).prev();
                        var id =caldiv.attr('id');
                        if(id=='date_test'){
                            SelectDate(this,'yyyy-MM-dd hh:mm:ss');
                        }else if(id=='caldate2'){
                            SelectDate(this,'yyyy-MM-dd','2013-04-1','2013-04-16');
                        }
                    }
                });
            });
          */
            
        }

        //初始化主面板

        this.initMainPanel = function() {//qery

            var tbar = this.initGridToolsBar();
            //列表
            var listPanel = this.initListGrid();
            //主面板

            var mainPanel = new Ext.Panel({
                region : 'center',
                layout : 'border',//这种布局方式类似地图，子元素按方位布局
                items : [ tbar, listPanel ]
            });
            return mainPanel;
        }

        this.initQryPn = function() {
        	var attNums = new Array();
			var attNames = new Array();
			var attIds = new Array();
			attNums.push(1);attNums.push(2);attNums.push(3);attNums.push(4);attNums.push(5);
			attNames.push("AnnounceTemplate.xls");attNames.push("财务.jpg");attNames.push("Change管理流程角色配置（中兴软创）.xlsx");
			attNames.push('111.txt');attNames.push('hhhh.txt');
			attIds.push("7d2b4b68-aefc-42f6-a25b-b719ade08f35");
			attIds.push("a23cbc7f-75dd-41bd-8349-9f46806eb4f6");
			attIds.push("1e315b86-a3c6-4070-862b-76abc9c106a2");
			attIds.push('dcfc6dfa-587c-41db-ae9e-258e79601262');
			attIds.push('8db09eb3-b5f5-4f39-881b-153e75eaff58');
			
			var attObj = new Object();
			attObj.attNums = attNums;
			attObj.attNames = attNames;
			attObj.attIds = attIds;
            var qryForm = new Ext.FormPanel(
                    {
                        id : 'qryForm',
                       // region : 'center',//在父容器中的位置，按地图方位布局，只有一个元素时用center
                       height:642,
                        buttonAlign : 'right',
                        frame : true,
                        //collapsible : true,//是否可收缩
                        title : '查询条件',
                        //bodyStyle : 'padding:10px',
                        //height : qryPnHeight,//因为ext的panel自适应能力差，最好这个查询面板的高度是固定的
                        //width : body_width,
                        layoutConfig : {
                            columns : 2 * 2
                        //总共三列，但一列包括lable和field两项，所以为6
                        },
                        layout : 'table',
                        bodyStyle : 'padding:20px 10px 0px 10px;overflow-x:hidden;overflow-y:hidden;',
                        defaults : {
                            border : false,
                            bodyStyle : 'padding:0 0 0 0;',
                            layout : 'form',
                            frame : false,
                            labelAlign : 'center',//标签的对齐方式

                            hideLabel : true,
                            width : 154,//最小是120，最大190
                            height : 30
                        },
                        items : [
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '名称'
                                    }
                                },
                                {
                                	colspan:1,
                                	items:[{
                                        xtype : 'ZTESOFT.textfield',
                                        hideLabel : true,
                                        //fieldLabel : '名称',
                                        name : 'dataNameQry',
                                        id : 'dataNameQry',
                                      //  value:'empty',
                                        allowBlank : false,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                                        blankText : '名称不能为空!',//空白时在字段旁边显示的提示信息，有默认值，可不设
                                        minLength :3,
                                        maxLength :5,
                                        anchor : '100%'//大概意思是表示这个textfield控件，占整个列宽的比例
                                        }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '值'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.textfield',
                                        //fieldLabel : '值',
                                        hideLabel : true,
                                        name : 'dataValueQry',
                                        id : 'dataValueQry',
                                        anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '选择'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : [ {
                                        xtype : 'ZTESOFT.popupfield',
                                        hideLabel : true,
                                        id : 'pop_test',
                                        name : 'pop_test',
                                        //fieldLabel : '选择',
                                        valueFile : 'pop_id_test',
                                        readOnly : true,
                                        allowBlank:false,
                                        maxLength:1,
                                        //disabled:true,
                                        //editable: false,
                                        anchor : '100%',
                                        //value:'pop-defualt',
                                        onPopup : function() {
                                            //选择事件逻辑
                                            TreeOper.provinceTree({
                                                onComplete : function(id, text, data) {
                                                    Ext.getCmp('pop_id_test').setValue(id);
                                                    Ext.getCmp('pop_test').setValue(text);
                                                }
                                            });
                                        }
                                    }, {
                                        xtype : 'hidden',
                                        name : 'pop_id_test',
                                        id : 'pop_id_test'

                                    } ]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '下拉列表'
                                    }
                                },
                                {
                                	
                                    colspan : 1,
                                    items : {
                                    	colspan:1,
                                    	items:[{
                                        xtype : 'ZTESOFT.enum',
                                        hideLabel : true,
                                        //fieldLabel : '下拉列表',
                                        triggerAction : 'all',
                                        name : 'com_test',
                                        id : 'com_test',
                                        mode : 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                                        typeAhead : true,//自动匹配
                                        editable : true,
                                        dict : true,//此值为ture，则使用默认的字典表来赋值
                                        dictType : 'ACCESS_INTERNET_P',//只需指定类型值。
                                        hasBlank : true,//为true表示加一个空白选项，只对字典对象有效
                                        //dict为false时，需要告知combox访问后台的地址
                                        //url:PATH+'/demo/fun1/demoAction.json?method=tree',
                                        valueField: 'dataValue',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置
                                        displayField: 'dataName',
                                        //baseParams : {node:1},//查询数据时传递给后台的参数

                                        value : 1,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中。

                                        //当页面初始化完成之后，才可以通过setValue方法赋值。

                                        anchor : '100%'
                                    	}]
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '时间'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.timefield',
                                        //fieldLabel : '时间',
                                        hideLabel : true,
                                        
                                        name : 'date_time',
                                        id : 'date_time',
                                        format : 'Y-m-d h:i:s',
                                        editable: false,
                                        anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '日期'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.datefield',
                                        //fieldLabel : '日期',
                                        hideLabel : true,
                                        name : 'date_test',
                                        id : 'date_test',
                                        allowBlank:false,
                                        format : 'Y-m-d',
                                        anchor : '100%'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '数字'
                                    }
                                },
                                {
                                	colspan:1,
                                	items:[{
                                        xtype : 'ZTESOFT.numberfield',
                                        hideLabel : true,
                                        //fieldLabel : '数字',
                                        name : 'num_test',
                                        allowBlank:false,
                                        id : 'num_test',
                                        anchor : '100%'
                                        }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '提示CO'
                                    }
                                },
                                {
                                	colspan:1,
                                	items:[{
                                        xtype : 'ZTESOFT.enum',//
                                        hideLabel : true,
                                        //fieldLabel : '提示CO',
                                        name : 'com_test_2',
                                        id : 'com_test_2',
                                        valueField : 'dataValue',
                                        displayField : 'dataName',
                                        mode : 'remote',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                                        typeAhead : true,
                                        triggerAction : 'all',
                                        editable : true,
                                        hasBlank:true,
                                        listeners : {
                                            "click" : function() {
                                            	Ext.getCmp('com_test_2').store.removeAt(0);}
                                            },
                                        //value : '',
                                        //store : this.demoStateStore,
                                        allowBlank:false,
                                        anchor : '100%',
                                        dict:true,
                                        dictType:'WO_STATUS'
                                	}]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '级联1'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                    	colspan:1,
                                    	items:[{
                                        xtype : 'ZTESOFT.combofield',
                                        //fieldLabel : '级联1',
                                        hideLabel : true,
                                        name : 'com_test_31',
                                        id : 'com_test_31',
                                        valueField : 'value',
                                        displayField : 'text',
                                        mode : 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                                        //typeAhead : true,
                                        triggerAction : 'all',
                                        editable : false,
                                        value : '',
                                        store : this.demoStateStore,
                                        anchor : '100%',
                                        listeners : {
                                            select : function(combo, record, index) {
                                                var twoCombo = Ext.getCmp('com_test_32');
                                                twoCombo.clearValue();
                                                twoCombo.getStore().proxy = new Ext.data.HttpProxy(
                                                        {
                                                            url : PATH
                                                                    + '/commondata/commonDataAction.json?method=qryDictData&dictType='
                                                                    + combo.value,
                                                            method : 'get'
                                                        });
                                                twoCombo.getStore().load();
                                            }
                                        }
                                    	}]
                                    }
                                }, {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '级联2'
                                    }
                                }, {
                                	colspan:1,
                                	items:[{
                                        xtype : 'ZTESOFT.combofield',
                                        //fieldLabel : '级联2',
                                        hideLabel : true,
                                        name : 'com_test_32',
                                        id : 'com_test_32',
                                        valueField : 'dataValue',
                                        displayField : 'dataName',
                                        mode : 'remote',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                                        //typeAhead : true,
                                        triggerAction : 'all',
                                        editable : false,
                                       // value : '',
                                        allowBlank:false,
                                        value:2,
                                        store : ZTESOFT.createComboStore({
                                            dict : true,//此值为ture，则使用默认的字典表来赋值

                                            dictType : '1',//只需指定类型值。

                                            hasBlank : true
                                        //为true表示加一个空白选择项，只对字典对象有效
                                        }),
                                        anchor : '100%'
                                	}]
                                }, {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : 'blank'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.datefield',
                                        //fieldLabel : '日期',
                                        hideLabel : true,
                                        name : 'date_test12',
                                        id : 'date_test12',
                                        format : 'Y-m-d',
                                        anchor : '100%'
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : 'check'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.checkbox',
                                        hideLabel : true,
                                        name : 'checkbox',
                                        id : 'checkbox',
                                        allowBlank : false,//是否允许空白，ext提供了一些常用的验证，请参考api，也可以再自定义扩展
                                        anchor : '100%'//大概意思是表示这个textfield控件，占整个列宽的比例

                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : 'radio'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype:'radiogroup',
                                        hideLabel : true,
                                        name : 'radio1',
                                        id : 'radio1',
                                        anchor : '100%',//大概意思是表示这个textfield控件，占整个列宽的比例

                                        items: [           
                                                {boxLabel:'是',width: 20, name: 'radioId', inputValue: '1', checked: true},   
                                                {boxLabel:'否',width: 20, name: 'radioId', inputValue: '0'}
                                        ]
                                    }
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : 'CHECKBOXGROUP'
                                    }
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype:'checkboxgroup',
                                        hideLabel : true,
                                        name : 'checkgroup1',
                                        id : 'checkgroup1',
                                        anchor : '100%',//大概意思是表示这个textfield控件，占整个列宽的比例

                                        items: [           
                                                {boxLabel:'ATM', width: 20, name: 'checkId', inputValue: 'ATM', checked: true},   
                                                //{boxLabel:'DDN',width: 20, name: 'checkId', inputValue: 'DDN'},
                                                {boxLabel:'VPN',width: 20, name: 'checkId', inputValue: 'VPN'}
                                        ]
                                    }
                                }, 
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '复合'
                                    }
                                }, {
                                    colspan : 3,
                                    width : 460,//160*3 = 480-20
                                    //xtype:'panel',
                                    layout : 'column',
                                    items : [ {
                                        xtype : 'ZTESOFT.combofield',
                                        width:80,
                                        name : 'com_test_38',
                                        id : 'com_test_38',
                                        valueField : 'value',
                                        displayField : 'text',
                                        mode : 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                                        //typeAhead : true,
                                        triggerAction : 'all',
                                        editable : false,
                                        emptyText:'emptyText',//combox在没有输入情况下的文字，跟默认值不一样
                                        allowBlank:false,
                                        //value : '',
                                        store : this.demoTimeStore
                                    }, {
                                        xtype : 'ZTESOFT.label',
                                        allowBlank:false,
                                        width:80,
                                        text : '开始时间：'
                                    },{
                                        xtype : 'ZTESOFT.timefield',
                                        format : 'Y-m-d',
                                        id : 'beginDate',
                                        name : 'beginDate',
                                        allowBlank:false,
                                        width : 100
                                    }, {
                                        xtype : 'ZTESOFT.label',
                                        width:40,
                                        text : '至'
                                    }, {
                                        xtype : 'ZTESOFT.timefield',
                                        format : 'Y-m-d',
                                        name : 'endDate',
                                        allowBlank:false,
                                        width : 100
                                    }]
                                },{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : 'textarea'
                                    }
                                }, {
                                    colspan : 3,
                                    width : 460,//160*3 = 480-20=460;
                                    height : 50,
                                    items : [{
                                        xtype : 'ZTESOFT.textarea',
                                        id:'textarea11',
                                        hideLabel : true,
                                        anchor : '100%',
                                        height : 50,
                                        allowBlank:false
                                    }]
                                } ,{
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '附件信息'
                                    }
                                }, {
                                    colspan : 3,
                                    width : 460,//160*3 = 480-20=460;
                                    height : 100,
                                    items : [{
                                        xtype : 'ZTESOFT.attachmentPanel',
                                        id:'panel1',
                                        autoScroll:true,
                                        detailValues:attObj,//已有的附件数据（从数据库读出），格式为一个object，里面包含数组
                                        //operType:"DETAIL",//操作类型，如果为DETAIL则只是查询详情，不提供上传功能
                                        fileTypes:null,//附件类型，默认(不填)或者值为null则为所有，即“*.*”
                                        fileLimit:8,//同时上传的最大数目，默认(不填)或者值为null则为10
                                        hideLabel : true,
                                        anchor : '90%',
                                        bodyStyle:'padding:10px',
                                        height : 100
                                    }]
                                },
                                {
                                    colspan : 1,
                                    items : {
                                        xtype : 'ZTESOFT.label',
                                        text : '附件信息2'
                                    }
                                }, {
                                    colspan : 3,
                                    width : 460,//160*3 = 480-20=460;
                                    height : 100,
                                    items : [{
                                        xtype : 'ZTESOFT.attachmentPanel',
                                        id:'panel2',
                                        autoScroll:true,
                                        //detailValues:attObj,//已有的附件数据（从数据库读出），格式为一个object，里面包含数组
                                        //operType:"DETAIL",//操作类型，如果为DETAIL则只是查询详情，不提供上传功能
                                        fileTypes:null,//附件类型，默认(不填)或者值为null则为所有，即“*.*”
                                        //fileLimit:1,//同时上传的最大数目，默认(不填)或者值为null则为10
                                        hideLabel : true,
                                        anchor : '100%',
                                        bodyStyle:'margin:10px',
                                        height : 100
                                    }]
                                },
                                {
                                	colspan:1,
                                	items:[{
                                		xtype : 'ZTESOFT.label',
                                        text : '派发树'
                                	}]
                                },
                                {
                                    colspan : 3,
                                    items : [{
                                        xtype: 'ZTESOFT.popupfield',
                                        id: 'pop_test2',
                                        name: 'pop_test2',
                                        hideLabel:true,
                                        valueFile : 'pop_id_test2',
                                        //readOnly: true,
                                        anchor : '100%',
                                        onPopup : function() {
                                        	var inputName = "pop_test2,pop_id_test2,pop_id_test3,pop_id_test4,pop_id_test5,pop_id_test6";
                                        	var requestData = "text,id,leaf,accountId,accountName,parentId,thi";
                                        	var isUseful = [1,1,1];
                                        	var _nodeRelationType="hasRelation";
                                        	var _isOnlyLeaf="0";
                                        	var _inputType="radio";
                                        	var _orgId = session.org.cloudOrgId;
                                        	//alert(_orgId);
                                        	/*
                                        	*树对象有6个配置参数，1、2个为必输项，其余4个为选填，如果填请按照顺序配置
                                        	*第1个参数--字符串，用逗号截开，控件名称
                                        	*第2个参数--字符串，orgId,null表示整个联通集团，传入组织id表示该组织以下人员或组织
                                        	*第3个参数--字符串，定义本JSP内唯一标识作为派发树窗口 的唯一ID
                                        	*第4个参数--字符串，用逗号截开，对应树节点属性
                                        	*第5个参数--数组：配置派发、送审、抄送按钮，用数组表示，1代表启用，0代表不启用
                                        	*第6个参数--字符串，hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
                                        	*第7个参数--字符串，是否联动：1代表只回传叶子节点，0代表回传父子节点
                                        	*第8个参数--字符串，输入类型：checkbox代表复选框，radio代表单选框
                                        	*/
                                        	var tree = new DeepTreeObj(inputName,requestData,"test1_1_pop",22357,isUseful,_nodeRelationType,_isOnlyLeaf,_inputType,null);
                                        	
                							tree.showTree(deeptreeUrl);
                							//alert(retSubmitStringArray[0]["busType"]);
                                            //选择事件逻辑
                                           /* TreeOper.userTree({
                                                onComplete: function(id,text,data){
                                                    Ext.getCmp('pop_id_test2').setValue(id);
                                                    Ext.getCmp('pop_test2').setValue(text);
                                                }
                                            });*/
                                        }

                                    },{
                                      xtype: 'hidden',
                                      name: 'pop_id_test2',
                                      id: 'pop_id_test2'
                                    
                                 }]
                                },{ 
                                	colspan:1,
                                	items:[{
                                    xtype: 'ZTESOFT.textfield',
                                    name: 'pop_id_test3',
                                    id: 'pop_id_test3'}]
                                  
                               },{
                            	   colspan:1,
                            	   items:[{
                                   xtype: 'ZTESOFT.textfield',
                                   name: 'pop_id_test4',
                                   id: 'pop_id_test4'}]
                                 
                              },{ 
                              	colspan:1,
                            	items:[{
                                xtype: 'ZTESOFT.textfield',
                                name: 'pop_id_test5',
                                id: 'pop_id_test5'}]
                              
                           },{
                        	   colspan:1,
                        	   items:[{
                               xtype: 'ZTESOFT.textfield',
                               name: 'pop_id_test6',
                               id: 'pop_id_test6'}]
                             
                          }]

                    });
            var rrr = qryForm;
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

                    limit : Ext.getCmp('listGrid').getPageSize()
                //步数
                }
            });
            //load数据后自动选择第一行数据,load事件为加载数据完成后触发
            Ext.getCmp('listGrid').store.on('load', function() {
                Ext.getCmp('listGrid').getSelectionModel().selectFirstRow();//选中第一行

            });

        }

        function changeColumn(value, cellmeta, record, rowIndex, columnIndex, store) {
            //value ：这个单元格的值；
            //cellmeta.cellId： 这个单元格的配置
            //cellmeta.id：  id
            //record ：这个单元格对应的行数据集 
            //rowIndex 行索引

            //columnIndex列索引

            //store 这个表格对应的Ext.data.Store

            var fileds = record.fields;
            var fieldName = fileds.get(columnIndex).name;

            var str = "行索引:" + rowIndex + " 列索引:" + columnIndex + " 列ID:" + fieldName;
            var url = "<a href='#' onclick=\"alert('" + str + "')\">" + value + "</a>";
            return url;

        }
        
        function onbur(value, metadata, record, rowIndex, columnIndex, store){
            var fileds = record.fields;
            var fieldName = fileds.get(columnIndex).name;
            var str = "行索引:" + rowIndex + " 列索引:" + columnIndex + " 列ID:" + fieldName+ " 内容:" + value;
            
            metadata.attr = ' ext:qtip="' + str + '"';    
            return value;
        }

        this.initListGrid = function() {
            //创建列   
            var cm = new Ext.grid.CheckboxSelectionModel({});
            var column = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
                header : '序号',
                width : 40
            }), cm, {
                header : 'ID',
                dataIndex : 'dictId',
                hidden : true
            }, {
                header : '类型ID',
                dataIndex : 'dataType',
                hidden : true
            }, {
                header : '名称',
                dataIndex : 'dataName',
                width : gridWidth * 0.1,
                renderer : changeColumn
            }, {
                header : '值',
                dataIndex : 'dataValue',
                width : gridWidth * 0.1,
                renderer : onbur,
                align : 'right'
            }, {
                header : '类型',
                dataIndex : 'dataTypeName',
                width : gridWidth * 0.1
            }, {
                header : '顺序',
                dataIndex : 'orderIndex',
                sortable : true,
                width : gridWidth * 0.1
            },//本地排序加sortable:true属性

            {
                header : '扩展字段1',
                dataIndex : 'extCol1',
                sortable : true,
                width : gridWidth * 0.1
            }, {
                header : '扩展字段2',
                dataIndex : 'extCol2',
                width : gridWidth * 0.1
            }, {
                header : '扩展字段3',
                dataIndex : 'extCol3',
                width : gridWidth * 0.1
            }, {
                header : '扩展字段4',
                dataIndex : 'extCol3',
                width : gridWidth * 0.1
            }, {
                header : '扩展字段5',
                dataIndex : 'extCol3',
                width : gridWidth * 0.1
            } ]);
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

                url : PATH + '/demo/fun1/demoAction.json?method=qryPageByParam',//访问读取后台数据的地址
                sm : cm
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
            var tb = new Ext.Toolbar({
                region : 'north'
            });

            tb.add({
                text : '高级检索',
                //disabled: true,
                xtype : 'ZTESOFT.Button',
                onClick : function() {
                    //alert('高级检索');
                    oper.initQryWin();
                    /*
                    var param = new Object();
                    param.orgId = 3849;
                    
                    ZTESOFT.invokeAction(
                            PATH+'/demo/fun1/demoAction.json?method=inquiryAreaListByOrgId',
                            param,
                            function(response){
                                alert(response.orgId);
                            }
                    );*/

                }

            });

            tb.add("->");//加这个符号可以使在此之后的按键靠右对齐


            tb.add({
                text : '增加',
                xtype : 'ZTESOFT.Link',
                //disabled: true,
                onClick : function() {
                    oper.detail('add');
                }
            }, "-");//加这个符号，会在页面上添加一个竖线分隔符
            tb.add({
                text : '修改',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.detail('mod');
                }
            }, "-");
            tb.add({
                text : '删除',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.del();
                }
            }, "-");
            tb.add({
                text : '批量导入',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.importData();
                }
            }, "-");
            tb.add({
                text : '导出',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.exportData();
                }
            }, "-");

            tb.add({
                text : '上传附件',
                id : 'test_upload',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.upload();
                }
            }, "-");
            tb.add({
                text : '派发树',
                id : 'test_upload',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                	var tree = new DeepTreeObj();
                	tree.showTree(deeptreeUrl);
                }
            }, "-");
            tb.add({
                text : '下载附件',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.download();
                }
            }, "-");
            tb.add({
                text : '编辑gird',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.editGrid();
                }
            }, "-");
            tb.add({
                text : '审核demo',
                xtype : 'ZTESOFT.Link',
                onClick : function() {
                    oper.audit();
                }
            });

            return tb;
        }

        this.detail = function(operStr) {

            //alert(selNode.id);
            var param = new Object();
            if (operStr == 'mod') {
                var selinfo = Ext.getCmp('listGrid').getSelectionModel().getSelections();
                if (selinfo.length != 1) {
                	
                    Ext.Msg.alert('操作提示', '请先选择您要修改的行');
                    return;
                }
                //var rec = Ext.getCmp('listGrid').getSelectionModel().getSelected();
                var rec = selinfo[0];
                if (rec == null) {
                    Ext.Msg.alert('操作提示', '请先选择您要修改的行');
                    return;
                }
                param = rec;
            }

            manager.initWindow(operStr, param);
            //alert(rec.data.tacheId);
        }

        this.del = function() {
            var records = Ext.getCmp('listGrid').getSelectionModel().getSelections();

            /*
            if(records.length<=1){
                Ext.Msg.alert('操作提示','请先选择您要修改的行');
                return;
            }
            
            Ext.Msg.confirm("操作提示","确定删除所选的数据？",function(btn){
              if(btn=="yes"){
                  //删除选中的全部记录

              }
            });
             */
            for ( var i = 0, len = records.length; i < len; i++) {
                Ext.getCmp('listGrid').store.remove(records[i]);
            }
            Ext.getCmp('listGrid').store.commitChanges();

        }

        this.upload = function() {
            //new_win(width,height,win_ico,win_name,win_id,win_body,need_shade,isCenter);
            //upload_win(400,445,PATH + '/images/df/upload_ico.gif','添加附件','win','url:win/win-upload.jsp',true,true);
            /*
            var url = 'url:' + PATH + '/common/udf/win/win-upload.jsp';
            var width = 450;
            var height = 470;
            new_win(width, height, PATH + '/images/df/upload_ico.gif', '添加附件', 'win', url, true,
                    true);
            */
            var param = new Object();
            //对文件类型进行限制，多个类型用半角分号(;)分隔.
           // param.fileTypes = "*.txt;*.java";
            param.fileUploadLimit=10;
            new ZTESOFT.FileUtil().uploadFile(param,function(fileList){
                //回调方法，返回列表[{fileId,fileName}]
                _uploadText = fileList[0].fileType;
                
            });
        }

        this.download = function() {
            var param = new Object();
            //文件ID
            //param.fileId = "a23cbc7f-75dd-41bd-8349-9f46806eb4f6";
            param.fileId ='<%=request.getParameter("fileId") %>';
            //文件名
            alert(param.fileId);
            param.fileName = '<%=request.getParameter("fileName") %>';
            //param.userid = 'fy';

            new ZTESOFT.FileUtil().downloadFile(param);
        }

        this.importData = function() {
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

            new ZTESOFT.FileUtil().uploadExcel(param, function(retVal) {
                //导入成功时，会返回列表数据，格式跟读取DB的一样

                Ext.getCmp('listGrid').store.removeAll();
                Ext.getCmp('listGrid').store.loadData(retVal);
            });

        }

        this.exportData = function() {
            //这是页面参数，跟普通查询一样，如果有分页需求的，也一起写上

            //获取查询参数
            var param = qryParams;

            //分页参数
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

        this.audit = function() {
            var ap = new AuditOper();
            ap.init();
        }

        this.editGrid = function() {

            eo.init();
        }
    }

    function ManagerOper() {
        //主窗口

        this.winTitle = '增加';
        this.initWindow = function(operStr, rowData) {
            var formPanel = this.initFormPanel(rowData);

            if (operStr == 'add') {
                this.winTitle = '增加';
            } else if (operStr == 'mod') {
                this.winTitle = '修改';
                this.initUpdate(rowData);
            }

            var formWin = new Ext.Window({
                id : 'detailWin',
                title : this.winTitle,
                closable : true,
                width : 660,
                height : 320,
                layout : 'border',
                plain : true,
                modal : true,
                items : [ formPanel ],
                buttonAlign : 'center',
                autoScroll:true,
                buttons : [ {
                    text : '确定',
                    xtype : 'ZTESOFT.Button',
                    onClick : function() {
                        if (operStr == 'add') {
                            manager.addCommit();
                        } else {
                            manager.updateCommit(rowData);
                        }
                    }
                }, {
                    text : '关闭',
                    xtype : 'ZTESOFT.Button',
                    //color: 'gray',
                    onClick : function() {
                        Ext.getCmp('detailWin').close();

                    }
                } ]
            });
            formWin.show();

        }

        this.initFormPanel = function(rowData) {
            var dataValue = '';
            if (rowData && rowData.data) {
                //当更新时，将combox的初始值设定

                dataValue = rowData.data.dataValue;
            }
            var infoPage = new Ext.FormPanel({
                id : 'infoPage',
                region : 'center',
                labelAlign : 'left',
                frame : true,
                autoScroll : true,
                width : Ext.getBody().getSize(),
                bodyStyle : 'padding:5px;overflow-x:hidden;overflow-y:auto;line-height:200%;',
                buttonAlign : 'center',
                labelWidth : 70,
                items : [ {
                    layout : 'column',
                    items : [ {
                        columnWidth : .5,
                        layout : 'form',
                        items : [ {
                            xtype : 'textfield',
                            fieldLabel : '名称',
                            name : 'dataName',
                            id : 'dataName',
                            allowBlank : false,
                            anchor : '95%'
                        }, {
                            xtype : 'hidden',
                            name : 'dicId',
                            id : 'dicId'

                        } ]
                    }, {
                        columnWidth : .5,
                        layout : 'form',
                        items : [ {
                            xtype : 'ZTESOFT.Combobox',
                            fieldLabel : '下拉列表',
                            triggerAction : 'all',
                            name : 'dataValue',
                            id : 'dataValue',
                            mode : 'local',//注意当editable为true，应该将此值设置为local，以使用自动匹配功能
                            typeAhead : true,
                            editable : true,
                            dict : true,//此值为ture，则使用默认的字典表来赋值
                            
                            dictType : '1',//只需指定类型值。

                            hasBlank : true,//为true表示加一个空白选择项，只对字典对象有效
                            //dict为false时，需要告知combox访问后台的地址
                            //url:PATH+'/demo/fun1/demoAction.json?method=tree',
                            //valueField: 'id',//如果返回的结果集ID不是默认的dataValue，dataName，需要自己重新设置

                            //displayField: 'text',
                            //baseParams : {node:1},//查询数据时传递给后台的参数

                            value : dataValue,//注意这里，因为数据是异步加载的，所以要在这里设定初始值才能在初始化时选中。

                            anchor : '95%'
                        } ]
                    }, {
                        columnWidth : .5,
                        layout : 'form',
                        items : [ {
                            xtype : 'textfield',
                            fieldLabel : '类型',
                            name : 'dataTypeName',
                            id : 'dataTypeName',
                            allowBlank : false,
                            anchor : '95%'
                        } ]
                    }, {
                        columnWidth : .5,
                        layout : 'form',
                        items : [ {
                            xtype : 'numberfield',
                            fieldLabel : '类型值',
                            name : 'dataType',
                            id : 'numberfield',
                            allowBlank : false,
                            anchor : '95%'
                        } ]
                    }, {
                        columnWidth : .5,
                        layout : 'form',
                        items : [ {
                            xtype : 'textfield',
                            fieldLabel : '顺序',
                            name : 'orderIndex',
                            id : 'orderIndex',
                            anchor : '95%'
                        } ]
                    }, {
                        columnWidth : .5,
                        layout : 'form',
                        items : [ {
                            xtype : 'textfield',
                            fieldLabel : '',
                            anchor : '95%'
                        } ]
                    }, {
                        columnWidth : 1,
                        layout : 'form',
                        items : [ {
                            fieldLabel : '描述',
                            xtype : "textarea",
                            id : "extCol2",
                            name : "extCol2",
                            height : 100,
                            //width: 120
                            anchor : '95%'
                        } ]
                    } ]
                } ]
            });
            return infoPage;
        }

        //增加任务提交
        this.addCommit = function() {
            if (!Ext.getCmp('infoPage').getForm().isValid()) {
                return;
            }
            var param = Ext.getCmp('infoPage').getForm().getValues();
            param.dataValue = Ext.getCmp('dataValue').getValue();

            ZTESOFT.invokeAction(PATH + '/demo/fun1/demoAction.json?method=save', param, function(
                    response) {
                Ext.Msg.confirm("操作提示", "新增成功", function(btn) {
                    if (btn == "yes") {
                        Ext.getCmp('detailWin').close();
                        Ext.getCmp('listGrid').store.load({
                            params : {
                                start : 0,
                                limit : Ext.getCmp('listGrid').getPageSize()
                            }
                        });
                    }
                });
            });

        }
        //修改任务提交
        this.updateCommit = function(rowData) {
            if (!Ext.getCmp('infoPage').getForm().isValid()) {
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
            var url = PATH + '/demo/fun1/demoAction.json?method=update';
            var result = ZTESOFT.Synchronize(url, param);
            alert(result.msg);
        }

        this.del = function(dicId) {

        }
        //修改初始化


        this.initUpdate = function(rowData) {
            Ext.getCmp('infoPage').getForm().loadRecord(rowData);

        }
    }

    function test() {
        alert(22);
    }
</script>
