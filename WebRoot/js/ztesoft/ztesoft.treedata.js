Ext.ns("ZTESOFT");
ZTESOFT.TreeOper = function(){
    this.default_org_root = 1;
    
    this.default_org_name = '中国联通';
    
    this.default_prv_root = 1;
    
    this.default_prv_name = '中国联通';
    
    
};

var TreeOper = new ZTESOFT.TreeOper();
/**
 * 单选组织 */
ZTESOFT.TreeOper.prototype.singleOrgTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择组织',
        rootId: this.default_org_root,// 根节点 0000
        rootVisible: true,
        rootText: this.default_org_name,
        allLeaf: true,// 是否使用目录结点
        singleSelect: true,// 是否单选        
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',// findOrgAndUser
                                                                            // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 复选组织 */
ZTESOFT.TreeOper.prototype.orgTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择组织',
        rootId: this.default_org_root,// 根节点 0000
        rootVisible: true,
        rootText: this.default_org_name,
        allLeaf: true,// 是否使用目录结点
        singleSelect: false,// 是否单选        
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgListByParentid.json',// findOrgAndUser
                                                                            // findOrgListByParentid
        baseParams : new Object(), // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}



/**
 * 单选组织+人员
 */
ZTESOFT.TreeOper.prototype.singleOrgUserTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择成员',
        rootId: this.default_org_root,// 根节点 0000
        rootVisible: true,
        rootText: this.default_org_name,
        allLeaf: true,// 是否使用目录结点
        singleSelect: true,// 是否单选        
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgAndUser.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 复选组织+人员
 */
ZTESOFT.TreeOper.prototype.orgUserTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择成员',
        rootId: this.default_org_root,// 根节点 0000
        rootVisible: true,
        rootText: this.default_org_name,
        allLeaf: true,// 是否使用目录结点
        singleSelect: false,// 是否单选        
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgAndUser.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}


/**
 * 单选人员 */
ZTESOFT.TreeOper.prototype.singleUserTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择员工',
        rootId: this.default_org_root,// 根节点 0000
        rootVisible: true,
        rootText: this.default_org_name,
        allLeaf: false,// 是否使用目录结点
        singleSelect: true,// 是否单选        
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgAndUser.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 复选人员 */
ZTESOFT.TreeOper.prototype.userTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择员工',
        rootId: this.default_org_root,// 根节点 0000
        rootVisible: true,
        rootText: this.default_org_name,
        allLeaf: false,// 是否使用目录结点
        singleSelect: false,// 是否单选        
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgAndUser.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}
/**
 * 单选省份 */
ZTESOFT.TreeOper.prototype.singleProvinceTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择省份',
        rootId: this.default_prv_root,// 根节点 0000
        rootVisible: false,
        rootText: this.default_prv_name,
        allLeaf: true,// 是否使用目录结点
        singleSelect: true,// 是否单选       
        url:PATH+'/commonData/proxy4AArea/findProvinceByParentId.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 复选省份 */
ZTESOFT.TreeOper.prototype.provinceTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择省份',
        rootId: this.default_prv_root,// 根节点 0000
        rootVisible: false,
        rootText: this.default_prv_name,
        allLeaf: true,// 是否使用目录结点
        singleSelect: false,// 是否单选       
        url:PATH+'/commonData/proxy4AArea/findProvinceByParentId.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 单选地市 */
ZTESOFT.TreeOper.prototype.singleCityTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择地市',
        rootId: this.default_prv_root,// 根节点 0000
        rootVisible: false,
        rootText: this.default_prv_name,
        allLeaf: false,// 是否使用目录结点
        singleSelect: true,// 是否单选       
        url:PATH+'/commonData/proxy4AArea/findCityByParentId.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 复选地市 */
ZTESOFT.TreeOper.prototype.cityTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择地市',
        rootId: this.default_prv_root,// 根节点 0000
        rootVisible: false,
        rootText: this.default_prv_name,
        allLeaf: false,// 是否使用目录结点
        singleSelect: false,// 是否单选        
        url:PATH+'/commonData/proxy4AArea/findCityByParentId.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}



/**
 * 单选区县 */
ZTESOFT.TreeOper.prototype.singleCountryTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择地市',
        rootId: this.default_prv_root,// 根节点 0000
        rootVisible: false,
        rootText: this.default_prv_name,
        allLeaf: false,// 是否使用目录结点
        singleSelect: true,// 是否单选       
        url:PATH+'/commonData/proxy4AArea/findCountryByParentId.json',// findOrgAndUser
                                                                        // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}


/**
 * 根据传入父成员选组织+人员
 */
ZTESOFT.TreeOper.prototype.orgAndUserByCon = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择人员',
        rootId: param.parentId,// 根节点 0000
        rootVisible: true,
        rootText:  param.parentName,
        allLeaf: true,// 是否使用目录结点
        singleSelect: param.singleSelect,// 是否单选
        url:PATH+'/commonData/proxy4AUserAndOrg/findOrgAndUser.json',// findOrgAndUser                                                // findOrgListByParentid
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 复选专业 */
ZTESOFT.TreeOper.prototype.specialityTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:'选择专业',
        rootId: this.default_prv_root,// 根节点 0000
        rootVisible: false,
        rootText: this.default_prv_name,
        allLeaf: false,// 是否使用目录结点
        singleSelect: param.singleSelect,// 是否单选       
        url:PATH+'/commondata/commonDataAction.json?method=findSpecialityEnum',   
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}

/**
 * 枚举选择树 */
ZTESOFT.TreeOper.prototype.enumSelectTree = function(param){
    
    new ZTESOFT.TreeWin({
        title:param.title,
        rootId: 1,// 根节点 枚举复选不需要rootId
        rootVisible: false,
        rootText: param.rootText,// 根节点 枚举复选不需要rootText
        allLeaf: false,// 是否使用目录结点
        width : param.width,
        height : param.height,
        singleSelect: param.singleSelect,// 是否单选       
        url:PATH+'/commondata/commonDataAction.json?method=findEnumForTree&dictType='+param.dictType,   
        baseParams : new Object(),  // 传递给后台的参数，默认还会传递node参数，即结点ID
        onComplete: param.onComplete
    }).show();
}