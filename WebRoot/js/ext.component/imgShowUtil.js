Ext.namespace('ucloud')

ucloud.imgShowUtil = {
	reSize : function(imgObj, value) {
		if (value == 0) {
			size = 1;
		} else {
			var zoomSize = imgObj.style.zoom;
			if (size == null || size == undefined || size == "") {
				size = zoomSize;
				if (value > 0) {
					size = parseInt(size) + 0.1;
				} else {
					size = parseInt(size) - 0.1;
				}
			} else {
				if (value > 0) {
					// 达到一定比例的时候 不处理了
					if (size < 1.85) {
						size = size + 0.1;
					}
				} else {
					// 小于一定比例 不处理
					if (size > 0.15) {
						size = size - 0.1;
					}
				}
			}
		}
		imgObj.style.zoom = size;
	},
	toChangeDocument : function(sid, record, urlAction, ImgD, panel) {
		if (record == null || record == undefined) {
			ImgD.src = urlAction;
		} else {
			var sourceSid = record.get("sourceSid");
			if (sourceSid != null) {
				ImgD.src = urlAction;
			} else {
				var url = "../../images/default/unfiled.JPG";
				ImgD.src = urlAction;
			}
		}
		// 自动到最合适并还原
		setTimeout(function() {
					ucloud.imgShowUtil.toBack(ImgD, panel)
				}, 10);
	},
	rightRoll : function(obj, num) {
		obj.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(Rotation="
				+ num + ")";
	},
	toBack : function(ImgD, panel) {
		// 还原比例
		ucloud.imgShowUtil.showImg(ImgD, panel);
		// 还原旋转
		var num = 0;
		ImgD.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(Rotation="
				+ num + ")";
	},
	showImg : function(ImgD, panel) {
		var image = new Image();
		image.src = ImgD.src;
		// 调整大小请求
		var FitWidth = panel.getInnerWidth();
		var FitHeight = panel.getInnerHeight();
		if (image.width == null || image.width == undefined) {
			Ext.MessageBox.alert("提示", "该图片类型无法识别");
			return false;
		}
		var rate = 1;
		if (image.width > 0 && image.height > 0) {// 必须大于零
			if (image.width > FitWidth || image.height > FitHeight) {// 如果图片宽度或长度
				var heightRate = FitHeight / image.height;
				var widthRate = FitWidth / image.width;
				// 高宽都比实际大时
				if (widthRate < 1 && heightRate < 1) {
					if (widthRate > heightRate) {
						rate = heightRate;
					} else {
						rate = widthRate;
					}
				} else if (widthRate < 1) {
					rate = widthRate;
				} else if (heightRate < 1) {
					rate = heightRate;
				}
				ImgD.style.zoom = rate;
				size = rate;
			}
		}
		ImgD.style.zoom = rate;
		size = rate;
	},
	toPrintPre : function() {
		try {
			document.all.WebBrowser.ExecWB(7, 1);
		} catch (e) {
			alert("您的浏览器不支持此功能或被功能被阻止");
		}
	},
	pageSet : function() {
		try {
			document.all.WebBrowser.ExecWB(8, 1);
		} catch (e) {
			alert("您的浏览器不支持此功能或被功能被阻止");
		}
	},
	toPrint : function() {
		try {
			document.all.WebBrowser.ExecWB(6, 6);
		} catch (e) {
			alert("您的浏览器不支持此功能或被功能被阻止");
		}
		return false;
	}
};