HTMLElement.prototype.getBackgroundCanvasContext = function(ctxType){
	var ctx, getImg;

	if (document.getCSSCanvasContext) {
		var ctxId = "_" + Math.floor(Date.parse(new Date()) * Math.random()).toString(16);
		ctx = document.getCSSCanvasContext(ctxType, ctxId, this.offsetWidth, this.offsetHeight);
		getImg = function() {
			return "-webkit-canvas(" + ctxId + ")";
		};
	} else {
		ctx = document.createElement("canvas").getContext(this._paint_ctx_type);
		ctx.canvas.width = this.offsetWidth;
		ctx.canvas.height = this.offsetHeight;
		getImg = function() {
			return "url(\"" + ctx.canvas.toDataURL("image/png") + "\")";
		};
	};

	var ele = this;

	ctx.update = function() {
		if (this.canvas.width != ele.offsetWidth) {
			this.canvas.width = ele.offsetWidth;
		};
		if (this.canvas.height != ele.offsetHeight) {
			this.canvas.height = ele.offsetHeight;
		};
		ele.style.backgroundImage = getImg();
	};

	/*for (var attr in ctx) {
		if (ctx[attr].constructor == Function) {
			console.log(attr);
			var old = ctx[attr];

			ctx[attr] = function(){
				if (this.canvas.width != ele.offsetWidth) {
					this.canvas.width = ele.offsetWidth;
				};
				if (this.canvas.height != ele.offsetHeight) {
					this.canvas.height = ele.offsetHeight;
				};
				
				var arg = new Array(old.length);

				for (var i = 0; i < arguments.length; i++) {
					arg[i] = arguments[i];
				};

				old.apply(this, arg);
				this.update();
			};
		};
	};*/

	return ctx;
};