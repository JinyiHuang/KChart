KChart.Handler = KChart.Object.extend({

	initialize: function(chart) {
		this.chart = chart;

		var div = document.getElementById('floatDiv');

		if(!div) {
			div = document.createElement('div');
			div.id = 'floatDiv';
			div.style.position = 'absolute';
			div.style.background = 'rgba(255,255,255,0.5)';
			div.zIndex = 888;
			document.body.appendChild(div);
		}

		this.div = div;
	},

	handle: function(e) {}
});