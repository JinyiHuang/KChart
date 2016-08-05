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

	//Transform the point's position from relative to client to relative to the canvas.
	getPointOnCanvas: function(canvas, point) {
		var bbox = canvas.getBoundingClientRect();

		return {
			x: point.x - bbox.left * (canvas.width / bbox.width),
			y: point.y - bbox.top * (canvas.height / bbox.height)
		};
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

	/*
	 * According to the eles' type judge whether mp is in the range of one of eles.
	 * If so, return the index of the ele.
	 */
	inRange: function(mp, eles) {
		switch(eles[0].constructor) {
			case KChart.Polygon:
				return this.inPolygonRange(mp, eles);
				break;
			case KChart.Circle:
				return this.inCircleRange(mp, eles);
				break;
			case KChart.Fan:
				return this.inFanRange(mp, eles);
				break;
			default:
				throw new Error("not implemented.");
				break;
		}
	},

	inPolygonRange: function(mp, eles) {
		var mouseX = mp.x,
			mouseY = mp.y;

		for(var i = 0; i < eles.length; i++) {
			var minX = eles[i].vertexes[1].x,
				minY = eles[i].vertexes[1].y,
				maxX = eles[i].vertexes[3].x,
				maxY = eles[i].vertexes[3].y;

			if(mouseX >= minX &&
				mouseX <= maxX &&
				mouseY >= minY &&
				mouseY <= maxY) {

				return i;
			}
		}

		return -1;
	},

	inCircleRange: function(mp, eles) {
		var mouseX = mp.x,
			mouseY = mp.y;

		for(var i = 0; i < eles.length; i++) {
			var x = eles[i].vertexes[0].x,
				y = eles[i].vertexes[0].y,
				radius = eles[i].radius;

			if((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) <= Math.pow(radius, 2)) {
				return i;
			}
		}

		return -1;
	},

	inFanRange: function(mp, eles) {
		var mouseX = mp.x,
			mouseY = mp.y;

		for(var i = 0; i < eles.length; i++) {
			var x = eles[i].vertexes[0].x,
				y = eles[i].vertexes[0].y,
				radius = eles[i].radius;

			if((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) <= Math.pow(radius, 2)) {
				var difX = mouseX - x,
					difY = mouseY - y;
				var angle = Math.atan(difY / difX);

				if(difX >= 0 && difY >= 0) {
					angle = angle;
				} else if(difX >= 0 & difY < 0) {
					angle += Math.PI * 2;
				} else {
					angle += Math.PI;
				}

				if(angle >= eles[i].sAngle && angle <= eles[i].eAngle) {
					return i;
				}
			}
		}

		return -1;
	},
};