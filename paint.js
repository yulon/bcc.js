if (document.getCSSCanvasContext) {
	HTMLElement.prototype.paint = function(canvasContextType, painter){
		if (this._paint_ctx_type != canvasContextType) {
			this._paint_ctx_type = canvasContextType;
			this._paint_ctx_id = "_" + Math.floor(Date.parse(new Date()) * Math.random()).toString(16);
			this._paint_ctx = document.getCSSCanvasContext("2d", this._paint_ctx_id, this.offsetWidth, this.offsetHeight);	
		} else {
			if (this._paint_ctx.canvas.width != this.offsetWidth) {
				this._paint_ctx.canvas.width = this.offsetWidth;
			};
			if (this._paint_ctx.canvas.height != this.offsetHeight) {
				this._paint_ctx.canvas.height = this.offsetHeight;
			};
		};
		painter(this._paint_ctx);
		this.style.backgroundImage = "-webkit-canvas(" + this._paint_ctx_id + ")";
	};
} else {
	HTMLElement.prototype.paint = function(canvasContextType, painter){
		if (this._paint_ctx_type != canvasContextType) {
			this._paint_ctx_type = canvasContextType;
			this._paint_ctx = document.createElement("canvas").getContext(canvasContextType);
			this._paint_ctx.canvas.width = this.offsetWidth;
			this._paint_ctx.canvas.height = this.offsetHeight;
		} else {
			if (this._paint_ctx.canvas.width != this.offsetWidth) {
				this._paint_ctx.canvas.width = this.offsetWidth;
			};
			if (this._paint_ctx.canvas.height != this.offsetHeight) {
				this._paint_ctx.canvas.height = this.offsetHeight;
			};
		};
		painter(this._paint_ctx);
		this.style.backgroundImage = "url(\"" + this._paint_ctx.canvas.toDataURL("image/png") + "\")";
	};
};