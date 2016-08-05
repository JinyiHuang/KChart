KChart.CartesianCoordinate = KChart.Coordinate.extend({

	initialize: function(basePoint, width, height, unitWidth, unitHeight) {
		this.basePoint = basePoint;
		this.width = width;
		this.height = height;
		this.unitWidth = unitWidth;
		this.unitHeight = unitHeight;
	},

	drawXAxis: function(painter, keys) {
		painter.setStyle(new KChart.Style({
			color: 'black',
			dashArray: null
		}));

		var horizontalOffset = this.basePoint.x,
			height = this.basePoint.y;

		var x = new KChart.PolyLine([this.basePoint, new KChart.Vertex(horizontalOffset + this.width, height)]);
		painter.draw(x);

		for(var i = 0; i < keys.length; i++) {
			var textLen = keys[i].length;

			for(var j = 0; j < textLen; j++) {
				painter.drawText(keys[i][j],
					(i + 0.5) * this.unitWidth + horizontalOffset,
					height + 20 + 15 * j);
			}
		}
	},

	drawYAxis: function(painter, values) {
		painter.setStyle(new KChart.Style({
			color: 'black',
			dashArray: null
		}));

		var horizontalOffset = this.basePoint.x,
			vertexOffset = height - this.height,
			height = this.basePoint.y;

		var y = new KChart.PolyLine([this.basePoint, new KChart.Vertex(horizontalOffset, height - this.height)]);
		painter.draw(y);

		var unitHeight = this.unitHeight,
			unitWidth = this.unitWidth;

		var vertex = KChart.Vertex;

		painter.setStyle(new KChart.Style({
			color: "black",
			weight: 1,
			fill: true,
			fillColor: "black",
			dashArray: [6, 12]
		}));

		for(var i = 0; i < values.length; i++) {
			var polyline = new KChart.PolyLine([
				new vertex(horizontalOffset, height - values[i] * unitHeight),
				new vertex((i + 0.5) * unitWidth + horizontalOffset, height - values[i] * unitHeight)
			]);
			painter.draw(polyline);

			painter.cxt.textAlign = "right";
			painter.cxt.fillText(values[i], horizontalOffset - 5, height - values[i] * unitHeight);
		}
	}
});