KChart.Animation = KChart.Object.extend({

	initialize: function(start, end, tween) {
		this.start = start;
		this.end = end;
		this.tween = tween || KChart.Tween.Linear;
	},

	drawAnimation: function(chart) {}
});