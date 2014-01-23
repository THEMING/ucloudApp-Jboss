<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/ztesoft-ext/include.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统DEMO</title>
<link type="text/css" rel="stylesheet"
    href="<%=path%>/css/ztesoft-ext.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/df.css" />

</head>

<body onContextMenu="return false;"
    style="width: 100%; height: 100%; overflow: hidden ;">
    <div id="content"></div>
</body>
</html>
<script type="text/javascript">
<!--
    var body_height = 415;
    var body_width = 1000;
    var tree_width = 252;
    var main_width = body_width - tree_width;
    var bannerHeight = 100;
    var footHeight = 100;
    var mainHeight = body_height - bannerHeight - footHeight;

    var oper = new PageOper();

    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'qtip';//qtip，title，under，side 

        oper.init();

    });

    function PageOper() {

        this.init = function() {
            var banner = this.initBanner();

            var menu = this.initMemu();

            var page = this.initPage();

            var footer = this.initFooter();

            var viewport = new Ext.Viewport({
                //所有的页面元素最终都加入到这个显示容器中，并且添加到页面的ID为content的div中，
                //也可以单个元素直接加到页面dom元素，但不建议

                el : 'content',
                layout : 'border',
                margins : '10',
                height : body_height,
                items : [ banner, menu, page, footer ]
            });

        }

        this.initBanner = function() {//qery
            var html = '<div style={width:100%;height:10px;background-color:#333333;}><img src="images/frame/banner_01.png"/></div>'
                    + '<div style={width:100%;height:50px;background-color:#da0b0c;}><img src="images/frame/banner_02.png"/></div>'
                    + '<div style={width:100%;height:30px;background-color:#a70909;}><img src="images/frame/banner_03.jpg"/></div>';

            //主面板

            var banner = new Ext.Panel({
                region : 'north',
                width : body_width,
                height : bannerHeight,
                html : html
            });
            return banner;
        }

        this.initFooter = function() {//qery

            //主面板

            var footer = new Ext.Panel(
                    {
                        region : 'south',
                        width : body_width,
                        height : footHeight,//background:url(images/frame/bottom.jpg);
                        html : '<div style={width:100%;height:10px;background-color:#5e0000;}></div>'
                                + '<div style={width:100%;height:70px;background-color:#333333;}><img src="images/frame/bottom.jpg"/></div>'
                    });
            return footer;
        }

        //初始化主面板

        this.initPage = function() {
            //主面板

            var page = new Ext.Panel({
                        region : 'center',
                        width : main_width,
                        height : mainHeight,
                        margins : '10 10 10 0',
                        html : '<div><IFRAME ID=\"pageFrame\" width = \"100%\" height = \"100%\" SRC=\"demo/ext_demo.jsp\"></IFRAME> </div>'
                    });
            return page;
        }
        
        var btn = new Ext.Button({
            id:'chgubtn',
            text:"当前用户："+session.logonAccount.userEmpName+'||切换',
            onClick:function(){
                var treew = oper.initUsersWin();
                treew.show();
            }
         });

        var utreeData ;
        this.initUsersWin = function(){
            var utree = new Ext.tree.TreePanel({
                        id :"utree",
                        collapsible : true,
                        region : 'west',
                        autoScroll : true,
                        dataUrl: 'get-nodes.php',
                        root: {
                            nodeType: 'async',
                            text: '常用用户',
                            draggable: false,
                            id: 'source',
                            children: [{
                                text: '叶青',
                                leaf: true,
                                cloudUserId:422925
                            },{
                                text: '总部-胡广金',
                                leaf: true,
                                cloudUserId:158832
                            }, {
                                text: '总部-曹克疆',
                                leaf: true,
                                cloudUserId:17544
                            }, {
                                text: '福建-蔡月花',
                                leaf: true,
                                cloudUserId:16544
                            }, {
                                text: '福建-黄寿琴',
                                leaf: true,
                                cloudUserId:156370
                            }, {
                                text: '山东-曹景镇',
                                leaf: true,
                                cloudUserId:17527
                            }, {
                                text: '山东-李志敏',
                                leaf: true,
                                cloudUserId:234705
                            },{
                                text: '济南-葛祥电',
                                leaf: true,
                                cloudUserId:71387
                            },{
                                text: '济南-董建平',
                                leaf: true,
                                cloudUserId:44801
                            },{
                                text: '青岛-闫博群',
                                leaf: true,
                                cloudUserId:408829
                            },{
                                text: '青岛-白学军',
                                leaf: true,
                                cloudUserId:4859
                            }]
                        }
                    });
                    
                utree.on('click', function(node) {
                    var param  = {};
                    if(!node.attributes.cloudUserId){
                        return;
                    }
                    param.cloudUserId= node.attributes.cloudUserId;
                    var url = PATH + '/fun1/menu/menu.json?method=chgUser';
                    var result = ZTESOFT.Synchronize(url,param);
                    if(result && result.msg=="success"){
                        Ext.Msg.alert("提示","切换成功!请刷新菜单或页面后重试");
                        var jstr = result.logonAccount;
                        var logonAccount = Ext.util.JSON.decode(jstr);
                        var userStr = result.userStr;
                        var user = Ext.util.JSON.decode(userStr);
                        var orgStr = result.orgStr;
                        var org = Ext.util.JSON.decode(orgStr);
                        window.session.logonAccount = logonAccount;
                        window.session.user = user;
                        window.session.org = org;
                        Ext.getCmp("chgubtn").setText ("当前用户："+session.logonAccount.userEmpName+"||切换");
                        Ext.getCmp("uwin").close();
                    }else{
                    }
                });
            var uwin = new Ext.Window({
                id:"uwin",
                title:'用户列表',
                width:250,
                height:420,
                layout: 'anchor',
                plain:true,
                autoScroll:true,
                modal: true,
                items:[utree],
                buttons: [{
                        text:"确定",
                        xtype:'ZTESOFT.Button',
                        onClick:function(){
                            Ext.Msg.alert("提示","选择");
                        }
                    },{
                        text: '关闭',
                        xtype: 'ZTESOFT.Button',
                        onClick:function(){
                            //this.close();
                            Ext.getCmp('uwin').close();
                        }
                    }]
            });
            return uwin;
        }
        
        this.initMemu = function() {
            var moduelTree = new Ext.tree.TreePanel({
                id : 'moduelTree',
                title : '目录',
                //collapsible : true,
                region : 'west',
                autoScroll : true,
                loader : new Ext.tree.TreeLoader({
                    dataUrl : PATH + '/fun1/menu/queryMenuByParentId.json',
                    baseParams : {
                        singleSelect : true
                    }
                }),
                //containerScroll : true,
                border : false,
                //floating : true,
                shadowOffset : 10,
                margins : '10',
                width : tree_width,
                //height : mainHeight,
                rootVisible : false,
                root : new Ext.tree.AsyncTreeNode({
                    id : ''
                }),
                buttons:[btn]
            });

            moduelTree.on('click', function(node) { //使节点可以单击展开收起，默认是双击的

                if (node.leaf == 0) {
                    if (node.expanded == false) {
                        node.expand();//展开
                    } else {
                        node.collapse();//收起
                    }
                } else {
                    document.getElementById('pageFrame').src = node.attributes.src;
                }
            });

            return moduelTree;
        }

    }
-->
</script>
