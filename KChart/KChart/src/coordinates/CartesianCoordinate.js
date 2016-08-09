KChart.CartesianCoordinate = KChart.Coordinate.extend({

    initialize: function (basePoint, width, height, xAxis, yAxis, elementCount) {
        this.basePoint = basePoint;
        this.elementCount = elementCount;
        this.width = width;
        this.unitWidth = width / elementCount;
        this.unitHeight = height / elementCount;
        this.height = height;

        this.xAxis = xAxis;
        this.yAxis = yAxis;
    },

    //drawXAxis: function(painter, keys) {
    //	painter.setStyle(new KChart.Style({
    //		color: 'black',
    //		dashArray: null
    //	}));

    //	var horizontalOffset = this.basePoint.x,
    //		height = this.basePoint.y;

    //	var x = new KChart.PolyLine([this.basePoint, new KChart.Vertex(horizontalOffset + this.width, height)]);
    //	painter.draw(x);

    //	for(var i = 0; i < keys.length; i++) {
    //		var textLen = keys[i].length;

    //		for(var j = 0; j < textLen; j++) {
    //			painter.drawText(keys[i][j],
    //				(i + 0.5) * this.unitWidth + horizontalOffset,
    //				height + 20 + 15 * j);
    //		}
    //	}
    //},

    //drawYAxis: function(painter, values) {
    //	painter.setStyle(new KChart.Style({
    //		color: 'black',
    //		dashArray: null
    //	}));

    //	var horizontalOffset = this.basePoint.x,
    //		vertexOffset = height - this.height,
    //		height = this.basePoint.y;

    //	var y = new KChart.PolyLine([this.basePoint, new KChart.Vertex(horizontalOffset, height - this.height)]);
    //	painter.draw(y);

    //	var unitHeight = this.unitHeight,
    //		unitWidth = this.unitWidth;

    //	var vertex = KChart.Vertex;

    //	painter.setStyle(new KChart.Style({
    //		color: "black",
    //		weight: 1,
    //		fill: true,
    //		fillColor: "black",
    //		dashArray: [6, 12]
    //	}));

    //	for(var i = 0; i < values.length; i++) {
    //		var polyline = new KChart.PolyLine([
    //			new vertex(horizontalOffset, height - values[i] * unitHeight),
    //			new vertex((i + 0.5) * unitWidth + horizontalOffset, height - values[i] * unitHeight)
    //		]);
    //		painter.draw(polyline);

    //		painter.cxt.textAlign = "right";
    //		painter.cxt.fillText(values[i], horizontalOffset - 5, height - values[i] * unitHeight);
    //	}
    //}

    drawXAxis: function (painter) {
        var oldStyle = painter.style;
        painter.setStyle(this.xAxis.style || Chart.defaultOptions.xAxis.style);

        var endPoint = new KChart.Vertex(this.width + this.basePoint.x, this.basePoint.y);
        var x = new KChart.PolyLine([this.basePoint, endPoint]);
        painter.draw(x);

        var axisTick, axisTickX = [];
        for (var i = 0; i < this.elementCount; i++) {
            axisTickX[i] = this.basePoint.x + this.unitWidth / 2 + this.unitWidth * i;
            axisTick = new KChart.PolyLine([
                    new KChart.Vertex(axisTickX[i], this.basePoint.y),
                    new KChart.Vertex(axisTickX[i], this.basePoint.y + this.height * 0.01)]);
            painter.draw(axisTick);

            if (this.xAxis.labels[i]) {
                painter.drawText(axisTickX[i], this.basePoint.y + this.height * 0.02);
            }
        }

        painter.setStyle(oldStyle);
    },

    drawYAxis: function (painter) {
        var oldStyle = painter.style;
        painter.setStyle(this.yAxis.style || Chart.defaultOptions.yAxis.style);

        var endPoint = new KChart.Vertex(this.basePoint.x, this.basePoint.y - this.height);
        var y = new KChart.PolyLine([this.basePoint, endPoint]);
        painter.draw(y);

        var axisTick, axisTickY = [], heightLabel;
        for (var i = 0; i < this.elementCount + 1; i++) {
            axisTickY[i] = this.basePoint.y - this.unitHeight * i;
            axisTick = new KChart.PolyLine([
                    new KChart.Vertex(this.basePoint.x, axisTickY[i]),
                    new KChart.Vertex(this.basePoint.x - this.width * 0.01, axisTickY[i])]);
            painter.draw(axisTick);

            heightLabel = (this.yAxis.maxValue - this.yAxis.minValue) / this.height * this.unitHeight * i + this.yAxis.minValue;
            painter.drawText(heightLabel, this.basePoint.y + this.height * 0.02);
        }

        painter.setStyle(oldStyle);
    }
});