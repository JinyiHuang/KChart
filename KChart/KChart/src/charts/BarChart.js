KChart.BarChart = KChart.Chart.extend({

	initialize: function(width, height, data, title) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	draw: function(canvas, style) {

		this.constructor.__base__.draw.apply(this, arguments);

		var Helper = KChart.Helper,

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

		var max = Helper.getMax(values),
			unitWidth = this.unitWidth = width / count,
			unitHeight = this.unitHeight = (height * 0.95) / max;

		var vertex = KChart.Vertex;
		var polygons = this.eles = [];

		for(var i = 0; i < count; i++) {
			var polygon = new KChart.Polygon(
				[new vertex((i + 0.25) * unitWidth + horizontalOffset, realHeight),
					new vertex((i + 0.25) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight),
					new vertex((i + 0.75) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight),
					new vertex((i + 0.75) * unitWidth + horizontalOffset, realHeight)
				]);
			polygons.push(polygon);
		}

		//Helper.drawXYAxis(painter, offset / 2);
		var axis = new KChart.Axis(new vertex(horizontalOffset, realHeight), width, height, unitWidth, unitHeight);
		axis.drawXAxis(painter, keys);
		axis.drawYAxis(painter, values);

		painter.setStyle(oldStyle);
		var animation = new KChart.BarAnimation(0, 15);
		animation.drawAnimation(this);

		Helper.addEvent(this, 'mousemove');
	}
});