Ext.form.Image = Ext.extend(Ext.BoxComponent, {
	initComponent : function() {
		Ext.form.Image.superclass.initComponent.call(this);
		this.addEvents('click');

	},
	onRender : function(ct, position) {
		if (!this.el) {
			this.el = document.createElement('img');
			this.el.src = this.src;
			if (this.forId) {
				this.el.setAttribute('htmlFor', this.forId);
			}
		}

		Ext.form.Label.superclass.onRender.call(this, ct, position);
	},
	afterRender : function() {
		Ext.form.Image.superclass.afterRender.call(this);		
		 this.el.on("click", this.onClick, this);
	},
	onClick : function() {
		if (this.handler === true)
			this.el.dom.src = this.src + '?date=' + new Date();
		else if (Ext.type(this.handler) == 'function')
			this.handler(this);
		this.fireEvent("click", this);
	}

});
Ext.reg('image', Ext.form.Image);
