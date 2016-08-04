Drawing.LineChart = Drawing.Chart.extend({

	initialize: function(width, height, data, title) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	draw: function(canvas, style) {

		this.constructor.__base__.draw.apply(this, arguments);

		var helper = Drawing.helper,

			height = this.height,
			width = this.width,
			horizontalOffset = this.horizontalOffset,
			verticalOffset = this.verticalOffset,
			data = this.data,
			realHeight = height + verticalOffset,

			painter = this.painter,
			oldStyle = painter.style;

		var keys = this.keys = Object.keys(data),
			count = keys.length,
			values = this.values = [];

		for(var i = 0; i < count; i++) {
			values.push(data[keys[i]]);
		}

		var max = helper.getMax(values),
			unitWidth = this.unitWidth = width / count,
			unitHeight = this.unitHeight = (height * 0.95) / max;

		var vertex = Drawing.Vertex;
		var vertexes = this.vertexes = [];

		for(var i = 0; i < count; i++) {
			vertexes.push(new vertex((i + 0.5) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight));
		}

		var axis = new Drawing.Axis(new vertex(horizontalOffset, realHeight), width, height, unitWidth, unitHeight);
		axis.drawXAxis(painter, keys);
		axis.drawYAxis(painter, values);

		painter.setStyle(new Drawing.Style({
			color: "red",
			fill: true,
			fillColor: "#eeeeee",
			dashArray: null
		}));

		this.eles = [];
		var circle;

		for(var i = 0; i < count; i++) {
			var circle = new Drawing.Circle(vertexes[i], 3);
			painter.draw(circle);

			this.eles.push(circle);
		}

		painter.setStyle(oldStyle);
		var animation = new Drawing.LineAnimation(0, 15);
		animation.drawAnimation(this);

		helper.addEvent(this, 'mousemove');
	}
});