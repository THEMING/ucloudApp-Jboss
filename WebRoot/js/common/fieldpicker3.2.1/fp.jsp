<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title></title>
   <link rel="stylesheet" type="text/css" href="../ext3.2.1/resources/css/ext-all.css" />
    <!-- GC -->

	 	<script type="text/javascript" src="../ext3.2.1/adapter/ext/ext-base.js"></script>
	    <script type="text/javascript" src="../ext3.2.1/ext-all.js"></script>
    	<link rel="stylesheet" type="text/css" href="../ext3.2.1/shared/examples.css" />
		<script type="text/javascript" src="FieldPicker.js"></script>
    	<link rel="stylesheet" type="text/css" href="fieldpicker.css" />		
		<script type="text/javascript">
		Ext.onReady(function() {
		var form=new Ext.form.FormPanel({
		renderTo:Ext.getBody(),
		id:'form',
		height:500,
		width:500,
		items:[
		{xtype:'fieldpicker',dataUrl:'test.js',id:'ddd',name:'ddd',enableMultiSelect:true,winTitle:"地市选择"}
		],
		buttons:[
		{text:'sub',handler:function(){
		console.log(Ext.getCmp('form').getForm().getFieldValues());
		}}
		]});		
		});
	</script>
	</head>

	<body>
	</body>
</html>
