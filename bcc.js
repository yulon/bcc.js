HTMLElement.prototype.getBackgroundCanvasContext = function(ctxType){
	var ctx, getImg;

	if (document.getCSSCanvasContext) {
		var ctxId = "_" + Math.floor(Date.parse(new Date()) * Math.random()).toString(16);
		ctx = document.getCSSCanvasContext(ctxType, ctxId, this.clientWidth, this.clientHeight);
		getImg = function() {
			return "-webkit-canvas(" + ctxId + ")";
		};
	} else {
		ctx = document.createElement("canvas").getContext(this._paint_ctx_type);
		ctx.canvas.width = this.clientWidth;
		ctx.canvas.height = this.clientHeight;
		getImg = function() {
			return "url(\"" + ctx.canvas.toDataURL("image/png") + "\")";
		};
	};

	var ele = this;

	ctx.update = function() {
		if (this.canvas.width != ele.clientWidth) {
			this.canvas.width = ele.clientWidth;
		};
		if (this.canvas.height != ele.clientHeight) {
			this.canvas.height = ele.clientHeight;
		};
		ele.style.backgroundImage = getImg();
	};

	return ctx;
};