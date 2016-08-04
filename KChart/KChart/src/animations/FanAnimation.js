Drawing.FanAnimation = Drawing.Animation.extend({

	initialize: function(start, end, base, tween) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	drawAnimation: function(chart) {
		var colors = chart.colors,
			fans = chart.eles,
			painter = chart.painter;

		var index = 0;

		var me = this,
			t = me.start,
			d = me.end,
			b = fans[index].sAngle,
			c = fans[index].eAngle - fans[index].sAngle;

		var center = fans[index].vertexes[0],
			radius = fans[index].radius;

		var newStyle = new Drawing.Style({
			weight: 0,
			fill: true,
			fillColor: colors[index]
		});
		painter.setStyle(newStyle);

		Drawing.helper.requestAnimFrame.call(window, draw);

		function draw() {
			t++;
			var angelCh = me.tween(t, b, c, d);

			var fan = new Drawing.Fan(center, radius, b, angelCh);
			painter.draw(fan);

			if(t < d) {
				Drawing.helper.requestAnimFrame.call(window, draw);
			} else {
				index++;

				if(index == 6) {
					Drawing.helper.cancelAnimFrame.call(window, draw);
				} else {
					t = me.start,
						d = me.end,
						b = fans[index].sAngle,
						c = fans[index].eAngle - fans[index].sAngle;

					center = fans[index].vertexes[0],
						radius = fans[index].radius;

					newStyle = new Drawing.Style({
						weight: 0,
						fill: true,
						fillColor: colors[index]
					});
					painter.setStyle(newStyle);

					Drawing.helper.requestAnimFrame.call(window, draw);
				}
			}
		}
	}
});