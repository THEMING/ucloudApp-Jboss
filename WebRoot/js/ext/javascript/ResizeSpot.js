Ext.ns("Ext.ux");
Ext.ux.resizeSpot = Ext.extend(Ext.BoxComponent, {
	spots : 'tl,tr,bl,br,tc,bc,lc,rc',
	transparent : false,
	minWidth : 0,
	minHeight : 0,
	width : 100,
	height : 60,
	maxWidth : 100000,
	maxHeight : 10000,
	limitFlag : true,
	ratio : false,
	onRender : function(ct, position) {
		Ext.ux.resizeSpot.superclass.onRender.call(this, ct, position);
		this.createEl(ct);
		this.el.position();
		this.createSpots();
		this.el.unselectable();
	},
	createSpots : function() {
		var spotEls = this.getSpots();
		this.spotEls = {};
		for (var i = 0, len = spotEls.length; i < len; i++) {
			var pos = spotEls[i];
			if (pos && this.dragPos[pos])
				this.spotEls[pos] = this.createSpot(pos);
		}
	},
	createSpot : function(pos) {
		var el = Ext.DomHelper.append(this.el, {
			tag : 'div'
		}, true);
		el.addClass(['dragEl', 'dragEl-' + pos]);
		el.addClassOnOver('dragEl-changeColor');
		this.transparent ? el.setOpacity(0) : '';
		el.on('mousedown', this.start, this, {
			pos : pos
		});
		// el.position('absolute');
		return Ext.get(el);
	},
	getSpots : function() {
		return this.spots.split(/\s*?[,;]\s*?| /);
	},
	createEl : function(ct) {
		if (!this.el) {
			var s = this.transparent
					? 'border:1px dotted #ff0000;'
					: 'border:1px dotted #ff0000; ';
			this.el = Ext.get(ct).createChild( {
				style : s + ' background:#fff;'
			});
		}
		this.el.setSize(this.width, this.height);
		this.el = Ext.get(this.el);
	},
	start : function(e, t, o) {
		e.stopEvent();
		this.startBox = this.el.getBox();
		this.scale = this.startBox.width / this.startBox.height;
		this.startPoint = e.getXY();
		this.curPos = o.pos;
		// for(var m in this.spotEls){
		// this.spotEls[m].position(null,900);
		// }
		// this.spotEls[this.curPos].dom.style.zIndex=9999;
		this.curBox = this.startBox;
		this.dragBegin = true;
		Ext.get(document).on('mousemove', this.onMouseMove, this);
		Ext.get(document).on('mouseup', this.onMouseUp, this);
	},
	onMouseMove : function(e, t, o) {
		if (this.dragBegin == true) {
			e.stopEvent();
			this.nowPoint = e.getXY();
			var dXY = {
				x : this.nowPoint[0] - this.startPoint[0],
				y : this.nowPoint[1] - this.startPoint[1]
			};
			var resizeFn = this.dragPos[this.curPos].createDelegate(this);
			var nb = resizeFn(this.curBox, dXY);
			nb ? this.resizeElement(nb) : '';
		}
	},
	onMouseUp : function(e, t, o) {
		this.dragBegin = false;
		// this.spotEls[this.curPos].dom.style.zIndex=999;
		Ext.get(document).un("mousemove", this.onMouseMove);
		Ext.get(document).un("mouseup", this.onMouseUp);
	},
	resizeElement : function(nb) {
		if (this.fireEvent('beforeResize', this, nb) !== false) {
			this.setPagePosition(nb.x, nb.y);
			this.setSize(nb.width, nb.height);
			this.onSize(nb, this);
		}
	},
	onSize : function(nb) {
	},
	adjustValue : function(v, h) {
		return h ? Math.round(v * this.scale) : Math.round(v / this.scale);
	},
	convert : function(b, pos) {
		this.curPos = pos;
		this.curBox = this.clone(b);
		this.startPoint = this.clone(this.nowPoint);
		return null;
	},
	// 值加上变化值在指定的最小值和最大值之间
	constrain : function(wh, delta, min, max) {
		if (wh + delta <= min) {
			delta = wh - min;
		}
		if (wh + delta >= max) {
			delta = max - wh;
		}
		return delta;
	},
	clone : function(b, d) {
		return Ext.apply( {}, b, {
			d : d
		});

	},
	calDelta : function(d, b, xy) {
		if (this.ratio) {// 约束
			if (xy == 'h-w')
				d.x = this.adjustValue(d.y, 'h');// 比率的增量x
			else {
				d.y = this.adjustValue(d.x);
			}
			if (d.x > (this.maxWidth - b.width)) {// 大于最大的增量值
				d.x = this.maxWidth - b.width;// 设为最大增加值
				d.y = this.adjustValue(d.x);// 现在根据x来调整y的增量
			} else if (d.x < (this.minWidth - b.width)) {
				d.x = this.minWidth - b.width;
				d.y = this.adjustValue(d.x);
			}
		}
	},
	limit : function(b, d, xy) {
		if (this.limitFlag) {
			if (xy == 'x') {
				d.x = this
						.constrain(b.width, d.x, this.minWidth, this.maxWidth);
			} else if (xy == 'y') {
				d.y = this.constrain(b.height, d.y, this.minHeight,
						this.maxHeight);
			} else if (xy == 'xy') {
				d.x = this
						.constrain(b.width, d.x, this.minWidth, this.maxWidth);
				d.y = this.constrain(b.height, d.y, this.minHeight,
						this.maxHeight);
			} else {
			}
		}
	},

	adjustRatio : function(b, d, s) {
		if (this.ratio) {
			switch (s) {
				case 't' :
					b.width = b.width - d.x;
					b.x = b.x + d.x / 2;
					break;
				case 'b' :
					b.width = b.width + d.x;
					b.x = b.x - d.x / 2;
					break;
				case 'l' :
					b.height = b.height - d.y;
					b.y = b.y + d.y / 2;
					break;
				case 'r' :
					b.height = b.height + d.y;
					b.y = b.y - d.y / 2;
					break;
				case 'tr' :
					d.x = -d.x;
					break;
				case 'bl' :
					d.y = -d.y;
					break;
			}
		}
	},

	dragPos : {
		t : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'y');
			this.calDelta(d, b, 'h-w');
			this.adjustRatio(b, d, 't');
			b.y += d.y;
			b.height -= d.y;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.height <= 0 ? this.convert(b, 'b') : b;
		},
		b : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'y');
			this.calDelta(d, b, 'h-w');
			this.adjustRatio(b, d, 'b');
			b.height += d.y;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.height <= 0 ? this.convert(b, 't') : b;

		},
		l : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'x');
			this.calDelta(d, b, 'w-h');
			this.adjustRatio(b, d, 'l');
			b.x += d.x;
			b.width -= d.x;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.width <= 0 ? this.convert(b, 'r') : b;

		},
		r : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'x');
			this.calDelta(d, b, 'w-h');
			this.adjustRatio(b, d, 'r');
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			b.width += d.x;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.width <= 0 ? this.convert(b, 'l') : b;
		},
		tl : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'xy');
			this.calDelta(d, b, 'w-h');
			b.y += d.y;
			b.height -= d.y;
			b.x += d.x;
			b.width -= d.x;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.width <= 0 && b.height <= 0 ? this.convert(b, 'br') : b;
		},
		tr : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'xy');
			this.calDelta(d, b, 'h-w');
			this.adjustRatio(b, d, 'tr');
			b.width += d.x;
			b.y += d.y;
			b.height -= d.y;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.width <= 0 && b.height <= 0 ? this.convert(b, 'bl') : b;
		},
		bl : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'xy')
			this.calDelta(d, b, 'w-h');
			this.adjustRatio(b, d, 'bl');
			b.height += d.y;
			b.width -= d.x;
			b.x += d.x;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.width <= 0 && b.height <= 0 ? this.convert(b, 'tr') : b;
		},
		br : function(b, d) {
			var b = this.clone(b);
			this.limit(b, d, 'xy')
			this.calDelta(d, b, 'w-h');
			b.width += d.x;
			b.height += d.y;
			// document.getElementById('test1').value += d.x + ":" + d.y + " ";
			return b.width <= 0 && b.height <= 0 ? this.convert(b, 'tl') : b;
		},
		tc : function(b, d) {
			return this.dragPos.t.createDelegate(this)(b, d);
		},
		bc : function(b, d) {
			return this.dragPos.b.createDelegate(this)(b, d);
		},
		lc : function(b, d) {
			return this.dragPos.l.createDelegate(this)(b, d);
		},
		rc : function(b, d) {
			return this.dragPos.r.createDelegate(this)(b, d);
		}
	}
});
