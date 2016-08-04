Drawing.Chart = Drawing.Object.extend({

	initialize: function(width, height, data, title) {
		this.width = width;
		this.height = height;
		this.data = data;
		this.title = title;
	},

	draw: function(canvas, style) {

		if(canvas) {
			this.horizontalOffset = (canvas.width - this.width) / 2;
			this.verticalOffset = (canvas.height - this.height) / 2;
		} else {
			this.horizontalOffset = this.width * 0.15;
			this.verticalOffset = this.height * 0.15;
			canvas = new Drawing.Canvas(this.width + this.horizontalOffset * 2, this.height +
				this.verticalOffset * 2, "#eeeeee");
		}

		style = style || new Drawing.Style({
			fill: true,
			fillColor: "#50aaff"
		});
		var painter = this.painter = new Drawing.Painter(canvas, style);

		if(this.title) {
			painter.drawText(this.title, this.width / 2 + this.horizontalOffset, 10);
		}
	}
});