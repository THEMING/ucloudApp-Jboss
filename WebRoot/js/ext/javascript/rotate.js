Ext.ns('Ext.ux');

// (x’,y’) = (x cos(t) + y sin(t),y cos(t) - x sin(t))
Ext.ux.Rotate = Ext
		.extend(Ext.BoxComponent, {
			rotation : 0,
			duration : 500,
			radiusAngle : Math.PI / 4,
			onRender : function(ct, position) {
				Ext.ux.Rotate.superclass.onRender.call(this, ct, position);
				this.ct = Ext.get(ct);
				this.createCanvas();
			},
			createCanvas : function() {
				if (!this.el) {
					var canvas = document.createElement("canvas");
					this.ct.dom.appendChild(canvas);
					this.el = Ext.get(canvas);
					if (Ext.isIE && G_vmlCanvasManager)
						G_vmlCanvasManager.init_(document);
				}
				this.el = Ext.get(this.el);
				this.setCanvasSize(this.width, this.height);
				/* ,this.zIndex||9999 */
				this.el.position('absolute',this.zIndex);
				// this.el.position();
				this.canvas = Ext.getDom(this.el);
			},
			afterRender : function() {
				Ext.ux.Rotate.superclass.afterRender.apply(this, arguments);
				this.ctx = this.getContext();
				this.setImage(this.src, this.imageWidth, this.imageHeight);
				// this.initResizeEvent();
				this.layout();
			},
			setImage : function(src, w, h) {
				this.image = Ext.get(this.image);
				if (this.image) {
					this.imageLoaded = false;
					this.initImageEvent();
					this.image.dom.src = this.src;
					this.imageWidth = w;
					this.imageHeight = h;
				}
			},
			layout : function(ct) {
				var vs = (this.ct||ct).getViewSize();
				var w = vs.width, h = vs.height, ih = this.imageHeight, iw = this.imageWidth;
				if (!this.ctx || !this.imageLoaded) {
					this.positionImage(w, h, iw, ih);
				} else {
					this.positionCanvas(w, h, iw, ih);
					this.rotateImage(w, h, iw, ih);
				}
			},
			positionImage : function(w, h, iw, ih) {
				this.display('image');
				var ratio = Math.min(w / iw, h / ih, 1);
				var imgW = iw * ratio, imgH = ih * ratio;
				var x = Math.round((w - imgW) / 2), y = Math.round((h - imgH)
						/ 2);
				imgW = Math.round(imgW), imgH = Math.round(imgH);
				this.image.setLeftTop(x, y);
				this.image.setSize(imgW, imgH);
			},
			positionCanvas : function(w, h) {
				this.display('canvas');
				this.el.setLeftTop(0, 0);
				this.setCanvasSize(w, h);
			},
			display : function(el) {
				this.image.setDisplayed(el == 'canvas' ? "none" : "block");
				this.el.setDisplayed(el == 'canvas' ? "block" : "none");				
			},
			rotateImage : function(w, h, iw, ih) {
				this.ctx.save();
				this.ctx.clearRect(0, 0, w, h);
			this.ctx.translate(w / 2, h / 2);
				this.ctx.rotate(this.rotation);
				var scale = this.calScale(w, h, iw, ih);
				this.ctx.scale(scale, scale);
				this.ctx.translate(-iw / 2, -ih / 2);
				if (this.onDraw) {
					this.onDraw(this.ctx,this.image.dom,w,h,iw,ih);
				} else {
					this.ctx.drawImage(this.image.dom, 0, 0, iw, ih);
				}
				this.ctx.restore();
			},
			calScale : function(w, h, iw, ih) {
				var scale = 1, PI2 = Math.PI / 2;
				if (!(iw <= w && iw <= h && ih <= h && ih <= w)) {
					var sinr = this.sawFunc(this.rotation);
					var cosr = this.sawFunc(this.rotation + PI2);
					var ratio1 = sinr * Math.min(w / ih, h / iw);
					var ratio2 = cosr * Math.min(w / iw, h / ih);
					var ratio = Math.min(1, ratio1 + ratio2);
					scale = ratio;
				}
				return scale;
			},
			sawFunc : function(a) {
				var PI = Math.PI, PI2 = PI / 2;
				a = a % PI;
				a < 0 ? a += PI : '';
				return a < PI2 ? a / PI2 : (PI - a) / PI2;
			},

			rotateRight : function() {
				this.rotate();
			},
			rotateLeft : function() {
				this.rotate("-");
			},
			rotate : function(sign) {
				if (!this.isAnimating) {
					var ra = this.radiusAngle;
					this.startTime = new Date();
					this.currentAngle = this.rotation;
					this.deltaAngle = sign ? -ra : ra;
					this.isAnimating = true;
					this.onRotate();
				}
			},
			onRotate : function() {
				if (this.isAnimating) {
					var t = this.easeInEaseOut(Math.min(1,
							(new Date() - this.startTime) / this.duration));
					this.rotation = t * this.deltaAngle + this.currentAngle;
					if (t < 1) {
						setTimeout(this.onRotate.createDelegate(this), 10);
					} else {
						this.isAnimating = false;
					}
					this.layout();
				}
			},
			setCanvasSize : function(w, h) {
				this.el.setSize(w, h);
				this.el.set( {
					width : w,
					height : h
				});
			},
			getContext : function() {
				return this.el.dom.getContext("2d");
			},
			easeInEaseOut : function(t) {
				return 3 * t * t - 2 * t * t * t;
			},
			initResizeEvent : function() {
				Ext.get(window).on('resize', this.onwindowResize, this);
			},
			onwindowResize : function() {
				this.layout();
			},
			initImageEvent : function() {
				if (this.image) {
					Ext.get(this.image).on( {
						'load' : this.onImageLoad,
						'error' : this.onImageError,
						'abort' : this.onImageAbort,
						scope : this
					});
				}
			},
			onImageLoad : function(e) {
				this.imageLoaded = true;
				this.imageLoaded ? this.layout() : "";
			},
			onImageError : function(e) {
				this.imageLoaded = false;
			},
			onImageAbort : function(e) {
				this.imageLoaded = false;
			}

		});

/*
 * Ext.onReady(function() { r = new Ext.ux.Rotate( { width : 800, height : 500,
 * src : 'ff.jpg', image : 'pic', imageWidth : 608, imageHeight : 380 });
 * r.render('image-rotator'); Ext.get("left").on('click', function() {
 * this.rotateLeft(); }, r); Ext.get("right").on('click', function() {
 * this.rotateRight(); }, r); });
 * 
 */
