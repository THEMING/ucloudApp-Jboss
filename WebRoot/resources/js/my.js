var scrollPos;
var gotClick = function(url,action){
  scrollPos = $('body').scrollTop();
  $("#loadingmask").css("top",scrollPos);
  $('body').css("overflow-y","hidden");
  $("#loadingmask").show();
  var options = { 
  	target:'#'+action, //��̨���Ѵ��ݹ�����ֵ������Ԫ��
    url:url, //�ύ���ĸ�ִ��
    type:'POST', 
    success: function(data){
    			processResponse(data);
    		}
    }; 
    $('#form1').ajaxSubmit(options);

};
      
var processResponse = function(request){
	$('body').scrollTop(scrollPos);
	$('#loadingmask').hide();
	$('body').css("overflow-y","auto");
};
	
var gotReset = function(){
	$('#form1').resetForm();
	$('.div').html('');
};
