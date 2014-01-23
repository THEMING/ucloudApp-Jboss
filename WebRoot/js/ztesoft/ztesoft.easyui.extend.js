/*
 * 验证扩展
 */
$.extend($.fn.validatebox.defaults.rules, {
    min: {
        validator: function(_1, _2){
            return _1.length >= _2[0];
        },
        message: '请输入至少{0}个字符'
    },
    range:{
    	validator: function(_1, _2){
    		var len=$.trim(_1).length;
    		return len>=_2[0]&&len<=_2[1];
        },
        message: '请输入{0}到{1}字符'
    }
});
