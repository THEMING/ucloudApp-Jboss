var imgCropper = function(c) {
	for (var p in c || {})
		this[p] = c[p];
	this.init(c);
}
imgCropper.prototype = {
	init : function(c) {
		with (this) {
			initCt();
			initImg();
			initMask();
			initPreview();
			initResizeEl();
			initPos();
		}
	},
	initCt : function() {
		if (!this.ct) {
			var ct = document.createElement("div");
			document.body.appendChild(ct);
			ct.width = 300 + "px";
			ct.height = 400 + "px";
			this.ct = ct;
		}
		this.ct = this.getEl(this.ct);
		this.ct.unselectable = "on";
		this.ct.style.position = "relative";
		this.ct.style.overflow = "hidden";
		var xy = this.getPageXY(this.ct);
		this.ctBox = {
			x : xy.x,
			y : xy.y,
			w : this.ct.offsetWidth,
			h : this.ct.offsetHeight
		};
	},
	initImg : function() {
		var t = this;
		if (this.upload) {
			this.upload = document.getElementById(this.upload);
			this.addEvent(this.upload, 'change', function() {
				if (t.checkImgType(t.upload.value) || false) {
					t.url = t.upload.value;
					t.drawImage();
				} else {
					alert('类型不对');
				}
			});
		}
		if (this.url)
			this.drawImage();

	},
	drawImage : function(url) {
		this.underImg = this.ct.appendChild(document.createElement("img"));
		this.underImg.unselectable = "on";
		this.overImg = this.ct.appendChild(document.createElement("img"));
		this.overImg.unselectable = "on";
		this.overImg.onload = this.changeScope(this, this.setPos);
		var img = new Image();
		img.src = url || this.url;
		img.onload = this.changeScope(this, this.setImgSize, img);
	},

	// 设置图片大小
	setImgSize : function(img) {
		var s = this.adjustImgSize(img.width, img.height, this.width,
				this.height);
		this.underImg.style.width = this.overImg.style.width = s.w + "px";
		this.underImg.style.height = this.overImg.style.height = s.h + "px";

	},
	// 获取尺寸 nw:nowwidth,aw:adjustWidth
	adjustImgSize : function(nw, nh, aw, ah) {
		var iw = nw, ih = nh, scale = nw / nh;
		// 按比例设置
		if (ah) {
			iw = (ih = ah) * scale;
		}
		if (aw && (!ah || iw > aw)) {
			ih = (iw = aw) / scale;
		}
		// 返回尺寸对象
		return {
			w : iw,
			h : ih
		}
	},
	initMask : function() {
		var mask = this.mask = document.createElement("div");
		mask.style.position = "absolute";
		mask.style.width = this.width + "px";
		mask.style.height = this.height + "px";
		mask.style.backgroundColor = "#FFFFFF";
		mask.style.filter = "alpha(opacity=50)";
		mask.style.opacity = "0.5";
		this.ct.appendChild(mask);
		this.mask.unselectable = "on";
	},
	initPreview : function() {
		if (this.preview) {
			var v = this.getEl(this.preview);// 预览对象
			this.vct = v;
			if (v) {
				v.style.position = "relative";
				v.style.overflow = "hidden";
				v.style.width = this.viewWidth + "px";
				v.style.height = this.viewHeight + "px";
				this.viewWidth = Math.round(this.viewWidth);
				this.viewHeight = Math.round(this.viewHeight);
				this.preview = v.appendChild(document.createElement("img"));
				this.preview.style.width = this.width + "px";
				this.preview.style.height = this.height + "px";
				this.preview.onload = this.changeScope(this, this.viewPreImg);
			}
		}
	},
	viewPreImg : function() {
		if (this.preview) {
			var p = this.getSelPos();
			var s = this.adjustImgSize(p.w, p.h, this.viewWidth,
					this.viewHeight);
			var scale = s.h / p.h;
			var ph = this.underImg.height * scale;
			var pw = this.underImg.width * scale;
			var pt = p.t * scale, pl = p.l * scale;
			with (this.preview.style) {
				width = pw + "px";
				height = ph + "px";
				top = -pt + "px ";
				left = -pl + "px";
				clip = "rect(" + pt + "px " + (pl + s.w) + "px " + (pt + s.h)
						+ "px " + pl + "px)";
			}
		}
	},
	getSelPos : function() {

		if (!this.resizeEl)
			return;
		with (this.getEl(this.resizeEl)) {
			return {
				t : offsetTop,
				l : offsetLeft,
				w : offsetWidth,
				h : offsetHeight
			}
		}

	},
	initResizeEl : function() {
		// 设置拖放
		this.resizeEl = this.getEl(this.resizeEl);
		this.resizeEl.style.backgroundColor = 'transparent';
		// this.resizeEl.style.filter = "alpha(opacity=0)";
		// this.resizeEl.style.opacity = "0";
		this.drag = new dragDrop(this.resizeEl, {
			ct : this.ct,
			transparent : true,
			onDrag : this.changeScope(this, this.setPos)
		});

		this.resize = new resize(this.resizeEl, {
			transparent : false,
			onResize : this.changeScope(this, this.setPos)
		});

	},
	initPos : function() {
		this.ct.style.position = "relative";
		this.ct.style.overflow = "hidden";
		this.underImg.style.zIndex = 100;
		this.mask.style.zIndex = 101;
		this.overImg.style.zIndex = 200;
		this.resizeEl.style.zIndex = 9999;
		this.underImg.style.position = this.overImg.style.position = this.mask.style.position = "absolute";
		this.preview.style.position = "absolute";
		this.underImg.style.top = this.underImg.style.left = 0 + 'px';
		this.overImg.style.top = this.overImg.style.left = 0 + 'px';// 对齐
		this.underImg.src = this.overImg.src = this.preview.src = this.url;
		// 初始化设置
		this.onInit();
	},
	onInit : function() {
	},
	setPos : function() {
		// ie6渲染bug
		if (document.all) {
			with (this.resizeEl.style) {
				zoom = .9;
				zoom = 1;
			};
		};
		// 获取位置参数
		var p = this.getSelPos();
		// 按拖放对象的参数进行切割
		this.overImg.style.clip = "rect(" + p.t + "px " + (p.l + p.w) + "px "
				+ (p.t + p.h) + "px " + p.l + "px)";
		document.getElementById('test1').value = "x:" + p.t + ",y:" + p.l
				+ ",w:" + p.w + ",h:" + p.h + "  ";
		// 设置预览
		this.viewPreImg();
	},
	addEvent : function(elem, type, fn) {
		if (elem.addEventListener)
			elem.addEventListener(type, fn, false);
		else if (elem.attachEvent)
			elem.attachEvent("on" + type, fn);
	},
	removeEvent : function(el, type, fn) {
		if (el.removeEventListener) {
			el.removeEventListener(type, fn, false);
		} else if (el.detachEvent) {
			el.detachEvent("on" + type, fn);
		}
	},
	getPageXY : function(el) {
		var left = 0, top = 0;
		do {
			left += el.offsetLeft;
			top += el.offsetTop;
			var v = document.getElementById('test1').value;
			v = v + "  " + el.offsetLeft;
			document.getElementById('test1').value = v;
		} while (el = el.offsetParent)
		return {
			x : left,
			y : top
		};

	},
	getPointXY : function(e) {
		if (e.pageX || e.pageY) {
			return {
				x : e.pageX,
				y : e.pageY
			};
		}
		var d = document.documentElement || document.body;
		return {
			x : e.clientX + d.scrollLeft,
			y : e.clientY + d.scrollTop
		};
	},
	changeScope : function(object, fun) {
		var args = Array.prototype.slice.call(arguments).slice(2);
		return function() {
			return fun.apply(object, args.concat(arguments));
		}
	},
	getEl : function(el) {
		if (typeof el == 'string')
			return document.getElementById(el);
		else
			return el;
	}
}
// 构建一个容器
// 把将要上传的图片preload(比例)在容器中。img w:100%,h:100% 根据ct大小计算Image()的大小
// mask层（正好在图片上面）可以配置（传入mask层）
// 内容层（正常显示出来的内容）
// preview层（传入元素）比例显示选择中的部分
// 传入拖曳的选择层
// 选择之后（保存）
