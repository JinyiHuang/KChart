Drawing.HoverHandler = Drawing.Handler.extend({

	initialize: function(chart) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	handle: function(e) {
		var chart = this.chart,
			div = this.div;

		e = myEvent.getEvent(e);

		var mousePosition = Drawing.helper.getPointOnCanvas(chart.painter.canvas, {
			x: e.clientX,
			y: e.clientY
		});

		var index = Drawing.helper.inRange(mousePosition, chart.eles);

		if(index != -1) {
			div.width = 100;
			div.height = 100;
			div.style.left = e.pageX + 10 + 'px';
			div.style.top = e.pageY + 10 + 'px';
			div.innerHTML = chart.keys[index] + ' : ' + chart.values[index];
		} else {
			div.width = 0;
			div.height = 0;
			div.innerHTML = '';
		}
	}
});