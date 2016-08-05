KChart.BarAnimation = KChart.Animation.extend({

	initialize: function(start, end, tween) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	drawAnimation: function(chart) {
		var height = chart.height,
			width = chart.width,
			horizontalOffset = chart.horizontalOffset,
			verticalOffset = chart.verticalOffset,
			realHeight = height + verticalOffset,
			painter = chart.painter,
			values = chart.values,
			count = values.length,
			unitWidth = chart.unitWidth,
			unitHeight = chart.unitHeight;

		var vertex = KChart.Vertex;

		var index = 0;
		var me = this,
			t = me.start,
			d = me.end,
			b = 0,
			c = values[index] * unitHeight;

		KChart.Helper.requestAnimFrame.call(window, draw);

		function draw() {
			t++;
			var heightCh = me.tween(t, b, c, d);

			var polygon = new KChart.Polygon(
				[new vertex((index + 0.25) * unitWidth + horizontalOffset, realHeight),
					new vertex((index + 0.25) * unitWidth + horizontalOffset, realHeight - heightCh),
					new vertex((index + 0.75) * unitWidth + horizontalOffset, realHeight - heightCh),
					new vertex((index + 0.75) * unitWidth + horizontalOffset, realHeight)
				]);
			painter.draw(polygon);

			if(t < d) {
				KChart.Helper.requestAnimFrame.call(window, draw);
			} else {
				index++;

				if(index == count) {
					KChart.Helper.cancelAnimFrame.call(window, draw);
				} else {
					t = me.start,
						d = me.end,
						b = 0,
						c = values[index] * unitHeight;
					KChart.Helper.requestAnimFrame.call(window, draw);
				}
			}
		};
	}
});