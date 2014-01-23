Ext.namespace("Ext.ux");
Ext.ux.TableFormLayout = Ext.extend(Ext.layout.TableLayout, {
	monitorResize : true,
	setContainer : function() {
		Ext.layout.FormLayout.prototype.setContainer.apply(this, arguments);
		Ext.ux.TableFormLayout.prototype.fieldTpl = Ext.layout.FormLayout.prototype.fieldTpl;
		Ext.ux.TableFormLayout.superclass.setContainer.apply(this, arguments);
	},
	renderItem : function(c, position, target) {
		if (c && !c.rendered) {
			Ext.layout.FormLayout.prototype.renderItem.call(this, c, 0, Ext
					.get(this.getNextCell(c)));
		}
	},
	getAnchorSize : function(ct) {
		var aw, ah;
		if (ct.anchorSize) {
			if (typeof ct.anchorSize == "number") {
				aw = ct.anchorSize;
			} else {
				aw = ct.anchorSize.width;
				ah = ct.anchorSize.height;
			}
		} else {
			aw = ct.initialConfig.width;
			ah = ct.initialConfig.height;
		}
		return [aw, ah];
	},
	getAnchorViewSize : function(ct, target) {
		return Ext.fly(ct.body).getSize();//.getStyleSize();
	},
	getCellWH : function(c, viewSize, i) {
		var cell, w, h, cell = c.getEl().parent(".x-table-layout-cell");
		//alert(viewSize.width);
		w = (viewSize.width / this.columns) * (c.colspan || 1);
		//alert(w);
		cell.setWidth(w+5);
		// w = w - 10;
		h = cell.getHeight();
		if (this.onCellWH)
			return this.onCellWH(c, cell, viewSize, i, w, h);
		return [w, h];
	},
	calAnchorSpec : function(c, a) {
		var cw = c.initialConfig.width, ch = c.initialConfig.height;
		if (!c.anchorSpec) {
			var vs = c.anchor.split(" ");
			c.anchorSpec = {
				right : this.parseAnchor(vs[0], cw, a[0]),
				bottom : this.parseAnchor(vs[1], ch, a[1])
			};
		}
		return c.anchorSpec;
	},
	  adjustHeightAnchor : function(value, comp){
	  //	alert(value);
        return value;
    }    ,
     adjustWidthAnchor : function(value, comp){
     //	alert(value);
        return value - (comp.isFormField  ? (comp.hideLabel ? 0 : this.labelAdjust) : 0);
    },
	calSize : function(c, wh, a) {
		var cw = a.right
				? this.adjustWidthAnchor(a.right(wh[0]), c)
				: undefined;
		var ch = a.bottom
				? this.adjustHeightAnchor(a.bottom(wh[1]), c)
				: undefined;
				//alert('cwh'+cw+":"+ch);
		if (cw || ch) {
			c.setSize(cw || undefined, ch || undefined);
		}
	},
	onLayout : function(ct, target) {
		Ext.ux.TableFormLayout.superclass.onLayout.call(this, ct, target);
		if (!target.hasClass("x-table-form-layout-ct")) {
			target.addClass("x-table-form-layout-ct");
		}
		var viewSize = this.getAnchorViewSize(ct, target);
		var anchorSize = this.getAnchorSize(ct);
		var cs = ct.items.items, len = cs.length, i, c, wh, anchorSpec;
		for (i = 0; i < len; i++) {
			c = cs[i];
			wh = this.getCellWH(c, viewSize, i);
			if (c.anchor) {
				anchorSpec = this.calAnchorSpec(c, anchorSize);
				this.calSize(c, wh, anchorSpec);
			}
		}
	}
});
Ext.applyIf(Ext.ux.TableFormLayout.prototype, Ext.layout.FormLayout.prototype);
Ext.Container.LAYOUTS["tableform"] = Ext.ux.TableFormLayout;
