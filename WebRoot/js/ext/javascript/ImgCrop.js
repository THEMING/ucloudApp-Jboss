Ext.ns("Ext.ux");
Ext.ux.ImgCrop = Ext.extend(Ext.BoxComponent, {
	width : 300,
	height : 400,
	onRender : function(ct, position) {
		Ext.ux.ImgCrop.superclass.onRender.call(this, ct, position);
		this.createEl(ct);
	},
	afterRender : function() {
		Ext.ux.ImgCrop.superclass.afterRender.apply(this, arguments);
		this.drawImage(this.url);
		this.initResize();
	},
	createEl : function(ct) {
		!this.el ? this.el = ct.createChild() : '';
		this.el = Ext.get(this.el); // 传入el配置项
		this.el.setSize(this.width, this.height);
		this.el.position();
		this.el.unselectable();
		this.el.setOverflow("hidden");
	},
	createUnderImg : function() {
		if (!this.underImg) {
			this.underImg = Ext.get(this.el).createChild( {
				tag : 'img'
			});
		}
		this.underImg.position("absolute", 100);
		this.underImg.setLeftTop(0, 0);
		this.underImg.unselectable();

	},
	createMask : function() {
		if (!this.mask) {
			this.mask = this.el.createChild();
			this.mask.setStyle('backgroundColor', '#FFFFFF');
			this.mask.setSize(this.width, this.height);
			this.mask.setOpacity(.5);
			this.mask.unselectable();
			this.mask.position("absolute", 101);// 在底层图片上面
			this.mask.setLeftTop(0, 0);// 相对于this.el进行本地定位。
		}
	},
	createoverImg : function() {
		if (!this.overImg) {
			this.overImg = Ext.get(this.el).createChild( {
				tag : 'img'
			});
		}
		this.overImg.position("absolute", 200);
		this.overImg.setLeftTop(0, 0);
		this.overImg.unselectable();
		this.overImg.on('load', this.showSelection, this);

	},
	preImage : function() {
		if (this.url) {/* image缓存，第二载入相同图片时，不会执行setImgSize */
			var img = new Image();
			img.src = this.url;
			Ext.get(img).on('load', this.setImgSize, this, {
				img : img
			});
			this.overImg.dom.src = this.url;
			this.underImg.dom.src = this.url;
			this.setPreview(this.view, this.viewWidth, this.viewHeight);
		}
	},
	drawImage : function(url) {
		if (url) {
			this.url = url;
			this.createUnderImg();
			this.createMask();
			this.createoverImg();
			this.preImage();
		}
	},
	setImgSize : function(e, t, o) {
		var img = o.img, w = img.width, h = img.height;
		var s = this.adjustImgSize(w, h, this.width, this.height);
		if (this.underImg) {
			this.underImg.setSize(s.w, s.h);
		}
		if (this.overImg) {
			this.overImg.setSize(s.w, s.h)
		}
		this.fireEvent('init', this);

		// alert(w + " " + h + ";" + s.w + " " + s.h);
	},
	// 获取尺寸 nw:nowwidth,aw:adjustWidth
	adjustImgSize : function(width, heigth, maxWidth, maxHeight) {
		var iwidth = width, iheight = heigth, scale = iwidth / iheight;
		if (maxHeight) {// 按比例设置
			iwidth = (iheight = maxHeight) * scale;
		}
		if (maxWidth && (!maxHeight || iwidth > maxWidth)) {// 返回尺寸对象
			iheight = (iwidth = maxWidth) / scale;
		}
		return {
			w : Math.round(iwidth),
			h : Math.round(iheight)
		}
	},
	setPreview : function(el, vw, vh) {
		this.view = el;
		this.viewWidth = vw;
		this.viewHeight = vh;
		this.initPreview();
	},
	initPreview : function() {
		var view = Ext.get(this.view);// 可以通过配置项来指定preview容器
		Ext.destroy(this.preview);
		if (view) {
			view.position();
			view.setOverflow('hidden');
			view.setSize(this.viewWidth, this.viewHeight);
			this.viewWidth = Math.round(this.viewWidth);
			this.viewHeight = Math.round(this.viewHeight);
			if (this.url) {
				this.preview = view.createChild( {
					tag : 'img'
				});
				this.preview.position('absolute');
				this.preview.setSize(this.viewWidth, this.viewHeight);
				Ext.getDom(this.preview).src = this.url;
				this.preview.on('load', this.showSelection, this);
			}
		}
	},
	viewPreImg : function(p) {
		if (this.preview) {
			var s = this.adjustImgSize(p.width, p.height, this.viewWidth,
					this.viewHeight);
			var scale = s.h / p.height;
			var ph = 0, pw = 0;
			var ph = Math.round(this.overImg.getHeight() * scale);
			var pw = Math.round(this.overImg.getWidth() * scale);
			var pt = Math.round(p.y * scale), pl = Math.round(p.x * scale);
			this.preview.setSize(pw, ph);
			this.preview.setLeftTop(-pl, -pt);

			this.preview.dom.style.clip = "rect(" + pt + "px " + (pl + s.w)
					+ "px	 " + (pt + s.h) + "px " + pl + "px)";
		}
	},
	getDragBox : function() {
		return this.dragEl ? this.dragEl.getBox(null, true) : null;
	},
	setDragEl : function(t) {
		this.dragEl = Ext.get(t.el);
		this.dragEl.position('absolute', 9999);
		this.dragEl.setLeftTop(10, 30);
		this.dragEl.setStyle('backgroundColor', 'transparent');
		this.drag = new Ext.ImgCrop.DD(this, this.dragEl);
	},
	initResize : function() {
		this.resize = new Ext.ux.resizeSpot( {
			transparent : false,
			//ratio:true,
			onSize : this.showSelection.createDelegate(this)
		});

		this.resize.on('render', this.setDragEl, this);
		this.resize.render(this.el);
	},
	showSelection : function() {
		var p = this.getDragBox();// 按拖放对象的参数进行切割
		if (Ext.isIE6) {
			with (this.dragEl.dom.style) {
				zoom = .9;
				zoom = 1;
			};
		};
		if (this.overImg)
			this.overImg.setStyle('clip', "rect(" + p.y + "px "
					+ (p.x + p.width) + "px " + (p.y + p.height) + "px " + p.x
					+ "px)");
		this.viewPreImg(p);// 设置预览
	}
});
Ext.ns("Ext.ImgCrop");
Ext.ImgCrop.DD = function(imgCrop, el) {
	this.imgCrop = imgCrop;
	Ext.ImgCrop.DD.superclass.constructor.call(this, el);

	if (Ext.isIE) {
		var m = el.createChild();
		m.setStyle( {
			backgroundColor : "#fff",
			fontSize : 0,
			width : '100%',
			height : '98%',
			filter : "alpha(opacity:0)"// 不能使用setOpacity
		});
	}
	el.setStyle('cursor', 'move');
	this.scroll = false;
};
Ext.extend(Ext.ImgCrop.DD, Ext.dd.DD, {
	startDrag : function() {
		this.constrainTo(this.imgCrop.el, {
			right : 0,
			left : 0,
			bottom : 0,
			top : 0
		});
	},
	onDrag : function(e) {
		this.setDragElPos(e.getPageX(), e.getPageY());
		this.imgCrop.showSelection();

	}
});

Ext.onReady(function() {
	var upload = new Ext.form.FileUploadField( {
		fieldLabel : '上传文件',
		width : 300,
		id : 'a',
		name: 'a', 
		cellCls : 'uploadpanding',
		buttonText : '浏览',
		colspan : 2
	});
	var imgcrop = new Ext.ux.ImgCrop( {
		width : 234,
		height : 174,
		url : 'spade.jpg'
	});
	var imgcropCt = new Ext.form.FieldSet( {
		style : 'margin:0px 10px 5px 8px',
		title : '上传图片区',
		height : 200,
		width : 250,
		layout : 'fit',
		items : [imgcrop]
	});
	var preview = new Ext.Panel( {
		id : 'preview',
		width : 154,
		height : 174
	});
	var previewCt = new Ext.form.FieldSet( {
		style : 'margin:0px 10px 5px 0px',
		title : '预览图片区',
		items : [preview],
		width : 180,
		height : 200
	});

	previewCt.on('afterlayout', function(t) {/* 不能采用render事件 */
				imgcrop.setPreview(preview.body, 154, 174);
			}, this);
	upload.on('fileselected', function(fb, v) {
		imgcrop.drawImage(v);
	}, this);

	var win = new Ext.Window( {
		layout : 'tableform',
		labelWidth : 60,
		labelAlign : 'right',
		layoutConfig : {
			columns : 2
		},
		width : 470,
		autoHeight : true,
		closeAction : 'hide',
		modal : true,
		title : '上传调整',
		items : [upload, imgcropCt, previewCt],
		buttonAlign : 'center',
		buttons : [ {
			text : '提交',
			handler : uploaddata
		}, {
			text : '复位'
		}]
	});
	win.show();
	
	function uploaddata(){
	  alert("eeee"+ Ext.getCmp('upload').getCmp('a').getValue());
	}
});
