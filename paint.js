(function(){
	var reCavCtx, getBgImg;

	if (document.getCSSCanvasContext) {
		reCavCtx = function(e) {
			e._paint_ctx_id = "_" + Math.floor(Date.parse(new Date()) * Math.random()).toString(16);
			e._paint_ctx = document.getCSSCanvasContext(e._paint_ctx_type, e._paint_ctx_id, e.offsetWidth, e.offsetHeight);
		}
		getBgImg = function(e) {
			return "-webkit-canvas(" + e._paint_ctx_id + ")";
		};
	} else {
		reCavCtx = function(e) {
			e._paint_ctx = document.createElement("canvas").getContext(e._paint_ctx_type);
			e._paint_ctx.canvas.width = e.offsetWidth;
			e._paint_ctx.canvas.height = e.offsetHeight;
		}
		getBgImg = function(e) {
			return "url(\"" + e._paint_ctx.canvas.toDataURL("image/png") + "\")";
		};
	};

	HTMLElement.prototype.paint = function(canvasContextType, painter){
		if (this._paint_ctx_type != canvasContextType) {
			this._paint_ctx_type = canvasContextType;
			reCavCtx(this);
		} else {
			if (this._paint_ctx.canvas.width != this.offsetWidth) {
				this._paint_ctx.canvas.width = this.offsetWidth;
			};
			if (this._paint_ctx.canvas.height != this.offsetHeight) {
				this._paint_ctx.canvas.height = this.offsetHeight;
			};
		};
		painter(this._paint_ctx);
		this.style.backgroundImage = getBgImg(this);
	};
})();