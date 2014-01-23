function jsonStroe(){
    
    this.testCardStore = new Ext.data.ArrayStore({
        fields: ['value','text'],
        data:[
            ['1','测试卡'],
            ['2','测试终端'],
            ['3','固定电话'],
            ['4','充值卡']
        ]
    });
    
    this.dataTypeEnumStore = new Ext.data.ArrayStore({
        fields: ['value','text'],
        data:[
            ['1','字符'],
            ['2','整型'],
            ['3','浮点型'],
            ['4','日期'],
            ['5','时间'],
            ['6','布尔']
        ]
    });
    
    this.isNotStore = new Ext.data.ArrayStore({
        fields: ['value','text'],
        data:[
            ['1','是'],
            ['0','否']
        ]
    });
    
  //充值卡面值
    this.rechStore = new Ext.data.ArrayStore({
        fields: ['value','text'],
        data:[
            ['1','30'],
            ['2','50'],
            ['3','100']
        ]
    });
    
    //套餐类型
    this.packageTypeStore = new Ext.data.ArrayStore({
        fields: ['value','text'],
        data:[
            ['1','A套餐'],
            ['2','B套餐']
        ]
    });

    //附属套餐
    this.attchPackageStore = new Ext.data.ArrayStore({
        fields: ['value','text'],
        data:[
            ['1','附属A套餐'],
            ['2','附属B套餐']
        ]
    });
    
    this.cardOpeStore = new Ext.data.ArrayStore({
            fields: ['value','text'],
            data:[
                ['1','移交'],
                ['2','报废'],
                ['3','借用'],
                ['4','调拨'],
                ['5','归还'],
                ['6','清查']
            ]
        });
}
