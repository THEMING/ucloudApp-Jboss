Ext.ns("ZTESOFT");

ZTESOFT.TreeWin = Ext.extend(Ext.Window,{
    constructor:function(config){
        if(Ext.isEmpty(config.title)){
             this.title = '选择';
        }
        if(Ext.isEmpty(config.id)){
             this.id = '_TreeWin';
        }
        if(Ext.isEmpty(config.rootId)){
            config.rootId = '';
        }
        this.baseParams;
        if(config.baseParams){
            this.baseParams = config.baseParams
            
        }else{
            this.baseParams = new Object();
        }
        if(config.singleSelect){
            this.baseParams.singleSelect = true;
        }
        this.closable = true;
        this.width = Ext.getBody().getSize().width * 0.3;
        this.height = Ext.getBody().getSize().height*0.8;
        if(config.width){
            this.width = config.width;
        }
        if(config.height){
            this.height = config.height;
        }
        this.layout = 'border';
        this.buttonAlign = 'center';
        this.moduelTree = function(){
                
                var moduelTree = new Ext.tree.TreePanel({
                    id: 'moduelTree',
                    //title:'指标库目录',
                    region: 'center',
                    //tbar:new Ext.Toolbar(),
                    autoScroll:true,
                    loader: new Ext.tree.TreeLoader({
                        dataUrl: config.url,
                        baseParams :this.baseParams
                    }),
                    containerScroll: true,
                    border: false,
                    //floating :true,
                    shadowOffset :10,
                    rootVisible: config.rootVisible,
                    root: new Ext.tree.AsyncTreeNode({
                        id:config.rootId,
                        text:config.rootText
                    })
                 });
                 //moduelTree.expandAll();
                /*
                var filterFiled = new Ext.form.TextField({
                    width:150,
                    emptyText:'快速检索',
                    enableKeyEvents: true,
                    listeners:{
                        render: function(f){
                            this.filter = new QM.ux.TreeFilter(moduelTree,{
                                clearAction : 'expand'
                            });//初始化TreeFilter 
                        },
                        keyup: {//添加键盘点击监听
                            fn:function(t,e){
                              t.filter.filter(t.getValue());
                            },
                            buffer: 350
                        }
                    }
                });
               
                var tbar = moduelTree.getTopToolbar();
                tbar.add(filterFiled);
                tbar.doLayout();
                */
                
                 moduelTree.on('click', function(node){ //使节点可以单击展开收起，默认是双击的

                    if(node.leaf ==0){
                        if(node.expanded == false){
                            node.expand();//展开
                        }else{
                            node.collapse();//收起
                        } 
                    }
                });
                 
                 
                 moduelTree.on('checkchange', function(node, checked) {  
                     node.expand();  
                     node.attributes.checked = checked;  
                     node.eachChild(function(child) {  
                         child.ui.toggleCheck(checked);  
                         child.attributes.checked = checked;  
                         child.fireEvent('checkchange', child, checked);  
                     });  
                 }, moduelTree);
                 
                 moduelTree.getLoader().on('beforeload', function() {
                     this.baseParams = config.baseParams;
                 });
                 
                 moduelTree.getLoader().on('loadexception', function() {
                     Ext.Msg.alert('操作提示', '加载数据失败');
                 });
                 
                 
            return moduelTree;
        }
            
        this.buttons=[{
                        text:'确定',
                        xtype: 'ZTESOFT.Button',
                        onClick:function(){
                            var selNode;
                            if(config.singleSelect){
                                selNodes = Ext.getCmp('moduelTree').getSelectionModel().selNode;
                            }else{
                                selNodes = Ext.getCmp('moduelTree').getChecked();
                            }
                           
                            var id = '';
                            var text = '';
                            var data = new Array();
                            if(selNodes){
                                Ext.each(selNodes,function(){
                                    if(config.allLeaf || this.leaf ==1){
                                        if(id){
                                            id+=',';
                                            text+=',';
                                        }
                                        id += this.id;
                                        text += this.text;
                                        
                                        data.push(this.attributes);
                                        
                                    } 
                                });
                                if(config.singleSelect){
                                    //if(data.length    
                                    data = data[0];
                                }
                                config.onComplete.call(this,id,text,data);
                            }
                            Ext.getCmp('_TreeWin').close();
                            
                        }
                    },{
                        text:'取消',
                        xtype: 'ZTESOFT.Button',
                        color: 'gray',
                        onClick:function(){
                             Ext.getCmp('_TreeWin').close();
                        }
                    }];
        this.modal = true;
        this.items=[this.moduelTree()];
        ZTESOFT.TreeWin.superclass.constructor.apply(this, arguments);
         
    }
    
});

