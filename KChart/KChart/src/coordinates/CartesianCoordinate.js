KChart.CartesianCoordinate = KChart.Coordinate.extend({

    initialize: function (basePoint, width, height, xAxis, yAxis, elementCount) {
        this.basePoint = basePoint;
        this.elementCount = elementCount;
        this.width = width;
        this.unitWidth = width / elementCount;
        this.height = height;

        this.xAxis = xAxis;
        this.yAxis = yAxis;
    },

    //drawXAxis: function(painter, keys) {
    //	painter.setStyle(new KChart.Style({
    //		color: 'black',
    //		dashArray: null
    //	}));

    //	var horizontalOffset = basePoint.x,
    //		height = basePoint.y;

    //	var x = new KChart.PolyLine([basePoint, new Vertex(horizontalOffset + this.width, height)]);
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

    //	var horizontalOffset = basePoint.x,
    //		vertexOffset = height - this.height,
    //		height = basePoint.y;

    //	var y = new KChart.PolyLine([basePoint, new Vertex(horizontalOffset, height - this.height)]);
    //	painter.draw(y);

    //	var unitHeight = this.unitHeight,
    //		unitWidth = this.unitWidth;

    //	var vertex = Vertex;

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

    draw: function (painter) {
        this.drawXAxis(painter);
        this.drawYAxis(painter);
    },

    drawXAxis: function (painter) {
        var oldStyle = painter.style;
        painter.setStyle(this.xAxis.style);

        var Vertex = KChart.Vertex,
            basePoint = this.basePoint;
        var endPoint = new Vertex(this.width + basePoint.x, basePoint.y);
        var x = new KChart.PolyLine([basePoint, endPoint]);
        painter.draw(x);

        var axisTick, axisTickX = this.axisTickX = [];
        for (var i = 0; i < this.elementCount; i++) {
            axisTickX[i] = basePoint.x + this.unitWidth / 2 + this.unitWidth * i;
            axisTick = new KChart.PolyLine([
                    new Vertex(axisTickX[i], basePoint.y),
                    new Vertex(axisTickX[i], basePoint.y + this.height * 0.01)]);
            painter.draw(axisTick);

            if (this.xAxis.labels[i]) {
                painter.drawText(this.xAxis.labels[i], axisTickX[i], basePoint.y + this.height * 0.03);
            }
        }

        painter.setStyle(oldStyle);
    },

    drawYAxis: function (painter) {
        var oldStyle = painter.style;
        painter.setStyle(this.yAxis.style);

        var Vertex = KChart.Vertex,
            basePoint = this.basePoint;
        var endPoint = new Vertex(basePoint.x, basePoint.y - this.height);
        var y = new KChart.PolyLine([basePoint, endPoint]);
        painter.draw(y);

        var axisTick, axisTickY = this.axisTickY = [];
        var maxValue = KChart.Helper.getMax(this.yAxis.values);
        var unitHeight = this.height / maxValue;
        for (var i = 0; i < this.elementCount; i++) {
            axisTickY[i] = basePoint.y - unitHeight * this.yAxis.values[i];
            axisTick = new KChart.PolyLine([
                    new Vertex(basePoint.x, axisTickY[i]),
                    new Vertex(basePoint.x - this.width * 0.01, axisTickY[i])]);
            painter.draw(axisTick);

            painter.drawText(this.yAxis.values[i], basePoint.x - this.width * 0.01, axisTickY[i]);
        }

        painter.setStyle(this.yAxis.valueLineStyle);
        var valueLine;
        for (i = 0; i < this.elementCount; i++) {
            valueLine = new KChart.PolyLine([
                    new Vertex(basePoint.x, axisTickY[i]),
                    new Vertex(basePoint.x + this.width, axisTickY[i])]);
            painter.draw(valueLine);
        }

        painter.setStyle(oldStyle);
    }
});