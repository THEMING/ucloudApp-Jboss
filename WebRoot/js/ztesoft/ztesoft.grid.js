Ext.ns("ZTESOFT");

var sort_hd_img = '<img class="zs-grid-header-sort" src="' + PATH + '/images/df/select_new.png" />';

ZTESOFT.Grid = Ext.extend(Ext.grid.GridPanel,{
    
    constructor:function(config){
         this.trackMouseOver = false;
         this.autoScroll =  true;
         this.loadMask = true;
         this.defaults = {checked:false};
         config.cm.defaultSortable = true; 
         this.stripeRows=true;
         this.enableHdMenu=false;
         this.columnLines=true;
         this.headerTextCls = "x-panel-header-text1";
         /*
         this.viewConfig =  new Ext.grid.GridView({
                                sortAscText:'升序',
                                sortDescText:'降序',
                                columnsText:'列名'
                            });*/
         this.viewConfig =  new ZTESOFT.GridView();
         
        
         for(var i=0;i<config.cm.getColumnCount();i++){
             if(!config.cm.isHidden(i) && config.cm.getColumnHeader(i)){
                 
                 if(config.cm.isSortable(i)){
                     config.cm.setColumnHeader(i,
                             config.cm.getColumnHeader(i)+ sort_hd_img);
                 }
             } 
         }
         
         
        var fileds = new Array();  
        for(var i=0;i<config.cm.getColumnCount();i++){
            fileds.push({name:config.cm.getDataIndex(i)});
        }   
        
        var storeCfgObj = {
                id:config.id+'Store',
                root : 'rows',
                totalProperty: 'total',
                remoteSort: false,
                fields: fileds,
                proxy: new Ext.data.HttpProxy({
                    url: config.url,
                    sync : false,
                    timeout : 300000
                })
        }
        
        if(!Ext.isEmpty(config.idProperty)){
            storeCfgObj.idProperty = config.idProperty
        }
        this.store = new Ext.data.JsonStore(storeCfgObj);
        
        this.store.on('loadexception', function() {
            Ext.Msg.alert('操作提示', '加载数据失败');
        });
        if(config.paging){
            this.bbar = new ZTESOFT.PagingToolbar({
                            pageSize: config.pageSize,
                            store: this.store,
                            displayInfo: true
                            //displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
                            //emptyMsg: "没有记录"
            });
        }
        
        this.getPageSize = function(){
            //return this.getBottomToolbar().pageSize;
            return config.pageSize;
        };
        
        this.getPageData = function(){
            return this.getBottomToolbar().getPageData(); 
        };
        
        this.getStart = function(){
            var limit = this.getPageSize();
            
            //分页对象
            var pd = this.getPageData();
            if(!pd || pd.total==0){
                return 0;
            }
            
            var activePage = pd.activePage;        
            //activePage  2   Number
            //pages   4   Number
            //total   7   Number
            var start = (activePage-1)* limit;
            
            return start;
        }
        
        ZTESOFT.Grid.superclass.constructor.apply(this, arguments);
         
    },
    createClasses : function(){
        this.headerCls = 'zs-panel-header';
        this.headerTextCls = 'zs-panel-header-text';
        this.bwrapCls = this.baseCls + '-bwrap';
        this.tbarCls = this.baseCls + '-tbar';
        this.bodyCls = this.baseCls + '-body';
        this.bbarCls = this.baseCls + '-bbar';
        this.footerCls = this.baseCls + '-footer';
    }
    
});

ZTESOFT.GridView = Ext.extend(Ext.grid.GridView,{
	/****************解决IE9下面云门户列表错位问题begin*******************/
	getColumnStyle : function(colIndex, isHeader) {
        var colModel  = this.cm,
             colConfig = colModel.config,
              style     = isHeader ? '' : colConfig[colIndex].css || '',
              align     = colConfig[colIndex].align;
          
          if(Ext.isChrome||(!(!Ext.isIE6&&(!Ext.isIE7)&&(!Ext.isIE8))&&Ext.isIE)){              
      	style += String.format("width: {0};", parseInt(this.getColumnWidth(colIndex))-2+'px');
         }else{
             style += String.format("width: {0};", this.getColumnWidth(colIndex));
         }
         
         if (colModel.isHidden(colIndex)) {
             style += 'display: none; ';
         }
         
         if (align) {
             style += String.format("text-align: {0};", align);
         }
         return style;
     },
     /*************************end****************************/
    constructor:function(config){
        //this.forceFit = true;
        ZTESOFT.GridView.superclass.constructor.apply(this, arguments);
    },
    initTemplates : function(){
        var ts = this.templates || {};
        if(!ts.master){
            ts.master = new Ext.Template(
                '<div class="x-grid3" hidefocus="true">',
                    '<div class="x-grid3-viewport">',
                        '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
                        '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
                    '</div>',
                    '<div class="x-grid3-resize-marker">&#160;</div>',
                    '<div class="x-grid3-resize-proxy">&#160;</div>',
                '</div>'
            );
        }

        if(!ts.header){
            ts.header = new Ext.Template(
                '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                '<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
                '</table>'
            );
        }
        
        if(!ts.hcell){//x-grid3-td-{id}
            ts.hcell = new Ext.Template(
                '<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css} " style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id} zs-gird-header" unselectable="on" style="{istyle}">', this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : '',
                '{value}',
                '</div></td>'
            );
        }

        if(!ts.body){
            ts.body = new Ext.Template('{rows}');
        }

        if(!ts.row){
            ts.row = new Ext.Template(
                '<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                '<tbody><tr>{cells}</tr>',
                (this.enableRowBody ? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>' : ''),
                '</tbody></table></div>'
            );
        }

        if(!ts.cell){
            ts.cell = new Ext.Template(
                    '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
                    '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
                    '</td>'
                    );
        }

        for(var k in ts){
            var t = ts[k];
            if(t && Ext.isFunction(t.compile) && !t.compiled){
                t.disableFormats = true;
                t.compile();
            }
        }

        this.templates = ts;
        this.colRe = new RegExp('x-grid3-td-([^\\s]+)', '');
    },
    updateSortIcon : function(col, dir){
        var sc = this.sortClasses;
        //var hds = this.mainHd.select('td').removeClass(sc);
        //hds.item(col).addClass(sc[dir == 'DESC' ? 1 : 0]);
        //hds.item(col).addClass(sc[1]);
    },
    updateHeaderSortState : function(){
        var state = this.ds.getSortState();
        if (!state) {
            return;
        }

        if (!this.sortState || (this.sortState.field != state.field || this.sortState.direction != state.direction)) {
            this.grid.fireEvent('sortchange', this.grid, state);
        }

        this.sortState = state;

        var sortColumn = this.cm.findColumnIndex(state.field);
        if (sortColumn != -1){
            var sortDir = state.direction;
            this.updateSortIcon(sortColumn, sortDir);
        }
        //ZTESOFT.GridView.superclass.updateHeaderSortState.apply(this, arguments);
    }
});

ZTESOFT.EditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel,{
    constructor:function(config){
        this.enableHdMenu=false;
        this.columnLines=true;
        this.store = config.store;
        this.trackMouseOver = false;
        this.autoScroll =  true;
        this.loadMask = true;
        this.defaults = {checked:false};
        config.cm.defaultSortable = true; 
        this.stripeRows=true;
        //this.enableHdMenu=false;
        this.columnLines=true;
        this.headerTextCls = "x-panel-header-text1";
        /*
        this.viewConfig =  new Ext.grid.GridView({
                               sortAscText:'升序',
                               sortDescText:'降序',
                               columnsText:'列名'
                           });*/
        this.viewConfig =  new ZTESOFT.GridView();
        
       
        for(var i=0;i<config.cm.getColumnCount();i++){
            if(!config.cm.isHidden(i) && config.cm.getColumnHeader(i)){
                
                if(config.cm.isSortable(i)){
                    config.cm.setColumnHeader(i,
                            config.cm.getColumnHeader(i)+ sort_hd_img);
                }
            } 
        }
        
        if(config.paging){
            this.bbar = new ZTESOFT.PagingToolbar({
                            pageSize: config.pageSize,
                            store: this.store,
                            displayInfo: true
                            //displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
                            //emptyMsg: "没有记录"
            });
        }
        
        this.getPageSize = function(){
            return this.getBottomToolbar().pageSize;
        };
        
        this.getPageData = function(){
            return this.getBottomToolbar().getPageData(); 
        };
        
        this.getStart = function(){
            var limit = this.getPageSize();
            
            //分页对象
            var pd = this.getPageData();
            if(!pd || pd.total==0){
                return 0;
            }
            
            var activePage = pd.activePage;        
            //activePage  2   Number
            //pages   4   Number
            //total   7   Number
            var start = (activePage-1)* limit;
            
            return start;
        }
        
        ZTESOFT.EditorGridPanel.superclass.constructor.apply(this, arguments);
    }
});


var T = Ext.Toolbar;

ZTESOFT.PagingToolbar = Ext.extend(Ext.PagingToolbar,{
    
    constructor:function(config){
         this.pageSize = config.pageSize;
         this.buttonAlign = 'center';
         this.displayMsg = "共<font class='zs-pagebar-size'> {0} </font>条信息，" + 
         "当前第<font class='zs-pagebar-size'> {1} </font>页/" +
         "共<font class='zs-pagebar-size'> {2} </font>页";
         this.emptyMsg = "没有记录";
         
         this.pageSizeInputItem = new Ext.form.NumberField({
                cls: 'x-tbar-page-number',
                allowDecimals: false,
                allowNegative: false,
                enableKeyEvents: true,
                selectOnFocus: true,
                submitValue: false,
                value:config.pageSize,
                width:50,
                listeners: {
                    scope: this,
                    blur: function(field, e){
                        var pageSize = field.getValue();
                        if(pageSize>0){
                            this.pageSize = pageSize;
                        }
                    },
                    keydown: function(field, e){
                        if (e.getKey() == e.ENTER) {   
                            var pageSize = field.getValue();
                            if(pageSize>0){
                                 var pageSize = field.getValue();
                                 this.pageSize = pageSize;
                                 this.doRefresh();
                            }
                        } 
                    }
                }
          });
        
        //this.items = ['&nbsp;&nbsp;每页显示：',this.pageSizeInputItem,'&nbsp;&nbsp;条：'];   
        ZTESOFT.PagingToolbar.superclass.constructor.apply(this, arguments);
        
        
    },
    doRefresh:function(){
        //var pageSize = this.pageSizeInputItem.getValue();
        //this.pageSize = pageSize;
        ZTESOFT.PagingToolbar.superclass.doRefresh.apply(this, arguments);
    },
    initComponent : function(){
        

        var pagingItems = [
         this.displayItem = new T.TextItem({}),                  
         this.first = new T.Button({
            //tooltip: this.firstText,
            text: '首页',
            overflowText: this.firstText,
            iconCls: 'x-tbar-page-first',
            disabled: true,
            handler: this.moveFirst,
            scope: this
        }), this.prev = new T.Button({
            //tooltip: this.prevText,
            overflowText: this.prevText,
            iconCls: 'x-tbar-page-prev',
            text: '<<上一页',
            disabled: true,
            handler: this.movePrevious,
            scope: this
        }), this.next = new T.Button({
            //tooltip: this.nextText,
            overflowText: this.nextText,
            text: '下一页>>',
            iconCls: 'x-tbar-page-next',
            disabled: true,
            handler: this.moveNext,
            scope: this
        }), this.last = new T.Button({
            //tooltip: this.lastText,
            overflowText: this.lastText,
            text: '尾页',
            iconCls: 'x-tbar-page-last',
            disabled: true,
            handler: this.moveLast,
            scope: this
        }), this.refresh = new T.Button({
            /*
            tooltip: this.refreshText,
            overflowText: this.refreshText,
            iconCls: 'x-tbar-loading',
            handler: this.doRefresh,
            scope: this
            */
        }), '转到第',
        this.inputItem = new Ext.form.NumberField({
            cls: 'x-tbar-page-number',
            allowDecimals: false,
            allowNegative: false,
            enableKeyEvents: true,
            selectOnFocus: true,
            submitValue: false,
            listeners: {
                scope: this,
                keydown: this.onPagingKeyDown
                //blur: this.onPagingBlur
            }
        }), this.afterTextItem = new T.TextItem({
            text: String.format(this.afterPageText, 1),
            hidden:true
        }),'页', this.goInc = new T.Button({
            iconCls: 'x-tbar-page-go',
            disabled: false,
            scope: this,
            listeners: {
                scope: this,
                click: function(field, e){
                    var count = this.store.getCount();
                    if(count==0){
                        return;
                    }
                    var page = this.inputItem.getValue();
                    if(page <=this.getPageData().pages){
                        this.changePage(page); 
                    }else{
                        this.onPagingBlur;
                    }
                    
                }
            }
        })
        ];


        var userItems = this.items || this.buttons || [];
        if (this.prependButtons) {
            this.items = userItems.concat(pagingItems);
        }else{
            this.items = pagingItems.concat(userItems);
        }
        delete this.buttons;
        if(this.displayInfo){
            //this.items.push('->');
            //this.items.push(this.displayItem = new T.TextItem({}));
        }
        Ext.PagingToolbar.superclass.initComponent.call(this);
        this.addEvents(
            
            'change',
            
            'beforechange'
        );
        this.on('afterlayout', this.onFirstLayout, this, {single: true});
        this.cursor = 0;
        this.bindStore(this.store, true);
    },
    updateInfo : function(){
        
        if(this.displayItem){
            
            /*
            var count = this.store.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.store.getTotalCount()
                );
                */
            
            var count = this.store.getCount();
            var msg = count == 0 ?
                    this.emptyMsg :
                    String.format(
                            this.displayMsg,
                            this.store.getTotalCount(), this.getPageData().activePage, this.getPageData().pages
                    );        
            this.displayItem.setText(msg);
        }
    }
}); 
