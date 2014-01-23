function StringBuffer(){
	var _b = [] ;
	var size = 0 ;

	// 追加字符串
	this.append = function(s){
		if(s != null ){
			_b.push(s);
			size++ ;
		}
		return this;
	}

	// 返回字符串
	this.toString = function(){
		return _b.join("");
	};

	// 清空
	this.clear = function(key){
		size = 0 ;
		_b = [] ;
	};

	// 返回数组大小
	this.size = function(){
		return size ;
	};

	// 返回数组
	this.toArray = function(){
		return _b ;
	};

	// 倒序返回字符串
	this.doReverse = function(){
		var str = _b.join('') ; 
		str = str.split('');  
		return str.reverse().join('');
	};
}

/**
 * 转成整数
 * @param obj 源对象
 * @returns
 */
function toIntNumber(obj){
    if(obj===""||!isFinite(obj)||isNaN(obj)||obj==null||obj==undefined){
        return null;
    }
    return parseInt(obj,10);
};

/**
 * 转成小数
 * @param obj 源对象
 * @param floatNum 小数位数
 * @returns
 */
function toNumber(obj,floatNum){
    if(obj === ""||obj == null) return null;
    var ret = Number(obj);
    if(isNaN(ret))
        return null;
    else if(floatNum>0) 
        return Number(ret.toFixed(floatNum));
    else
        return ret;
};


/**
 * 获取字符串真实长度(中文字符长度为2)
 * @param str
 * @returns
 * 用法："abc 都是".charlen()
 */
String.prototype.charlen = function() {
    var arr = this.match(/[^\x00-\xff]/ig);
    return this.length + (arr == null ? 0 : arr.length);
}

/**
 * 扩展基础类
 * 字符串首尾去空格
 * 用法："abc ".trim()
 **/
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 扩展基础类
 * 字符串首去空格
 * 用法："abc ".ltrim()
 **/
String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, "");
}

/**
 * 扩展基础类
 * 字符串尾去空格
 * 用法："abc ".rtrim()
 **/
String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, "");
}

$.fn.formToObject = function() {
    var z = this.serializeArray();
    var h={};
    var v,n;
    for(var i=0;i<z.length;i++){
        //var v = z[i].value == ""?null:z[i].value;
        h[z[i].name] = z[i].value;
    }
    return h;
}