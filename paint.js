HTMLElement.prototype.paint = function(canvasContextType, painter){
	if (this._cav == null) {
		this._cav = document.createElement("canvas");
		this._cav_ctxs = {};
	};
	if (this._cav.width != this.offsetWidth) this._cav.width = this.offsetWidth;
	if (this._cav.height != this.offsetHeight) this._cav.height = this.offsetHeight;

	if (this._cav_ctxs[canvasContextType] == null) {
		this._cav_ctxs[canvasContextType] = this._cav.getContext(canvasContextType);
	};

	painter(this._cav_ctxs[canvasContextType]);

	this.style.backgroundImage = "url(\"" + this._cav.toDataURL("image/png") + "\")";
};