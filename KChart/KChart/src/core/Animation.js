Drawing.Animation = Drawing.Object.extend({

	initialize: function(start, end, tween) {
		this.start = start;
		this.end = end;
		this.tween = tween || Drawing.helper.Tween.Linear;
	},

	drawAnimation: function(chart) {}
});