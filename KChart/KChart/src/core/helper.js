KChart.Helper = {

	getMax: function(values) {
		var max = values[0];
		for(var i = 1; i < values.length; i++) {

			if(max < values[i]) {
				max = values[i];
			}
		}

		return max;
	},

	getMin: function(values) {
		var min = values[0];
		for(var i = 1; i < values.length; i++) {

			if(min > values[i]) {
				min = values[i];
			}
		}

		return min;
	},

	//Add Event to chart
	addEvent: function(chart, eventType) {

		switch(eventType) {
			case 'mousemove':
				var handler = new KChart.HoverHandler(chart);
				KChart.CrossBrowserEvent.addListener(chart.painter.canvas, eventType, function(e) {
					handler.handle.call(handler, e);
				});
			default:
				break;
		}
	},

	
};