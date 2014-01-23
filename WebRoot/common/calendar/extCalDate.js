/*
 * 日历输入框
 */

Ext.ns("Ext.CalDate.form")
Ext.CalDate.form.CalDateField = Ext.extend(Ext.form.DateField, {
			format : 'Y',
			onTriggerClick : function() {
				Ext.CalDate.form.CalDateField.superclass.onTriggerClick.call(this);
				
				if(this.defaultDate==null||this.defaultDate==''){
				    this.defaultDate=new Date();
				}
				this.menu.picker.setValue(this.getValue()||this.defaultDate); 
				Ext.apply(this.menu.picker, {
							input : this
						});
				//alert(this.);
				//$("div.x-menu.x-menu-floating.x-layer.x-date-menu.x-menu-plain.x-menu-nosep").css('display','none');
                //$(".x-shadow").css('display','none');
		        //$(".x-ie-shadow").css('display','none');
		        var calformat='yyyy-MM-dd';
		        if(this.format.indexOf('h')>0){
		            calformat='yyyy-MM-dd hh:mm:ss';
		        }
		        
		        //SelectDate(this,calformat,this.startDate,this.endDate);
		        //this.setValue(this.defaultDate); 
			}
		});
// 注册xtype
Ext.reg('CalDateField', Ext.CalDate.form.CalDateField);

                $(document).ready(function(){
                      var divinput=$('#'+this.id);
                      var divimg=$('#'+this.id).next('img');
                      var divobj=divinput.parent().parent().parent().parent().parent().parent();
                      ;
                });
