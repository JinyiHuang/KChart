KChart.LineAnimation = KChart.Animation.extend({

	initialize: function(start, end, base, tween) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	drawAnimation: function(chart) {
		var vertex = KChart.Vertex,
			vertexes = chart.vertexes,
			count = vertexes.length,
			painter = chart.painter;

		var index = 0;

		var me = this,
			t = me.start,
			d = me.end,
			b = vertexes[index].x,
			c = vertexes[index + 1].x - vertexes[index].x;

		var k = (vertexes[index].y - vertexes[index + 1].y) /
			(vertexes[index].x - vertexes[index + 1].x),
			a = vertexes[index].y - k * vertexes[index].x;

		KChart.Helper.requestAnimFrame.call(window, draw);

		function draw() {
			t++;
			var xCh = me.tween(t, b, c, d);

			var line = new KChart.PolyLine([vertexes[index], new KChart.Vertex(xCh, k * xCh + a)]);
			painter.draw(line);

			if(t < d) {
				KChart.Helper.requestAnimFrame.call(window, draw);
			} else {
				index++;

				if(index == count - 1) {
					KChart.Helper.cancelAnimFrame.call(window, draw);
				} else {

					t = me.start,
						d = me.end,
						b = vertexes[index].x,
						c = vertexes[index + 1].x - vertexes[index].x;

					k = (vertexes[index].y - vertexes[index + 1].y) /
						(vertexes[index].x - vertexes[index + 1].x),
						a = vertexes[index].y - k * vertexes[index].x;

					KChart.Helper.requestAnimFrame.call(window, draw);
				}
			}
		};
	}
});