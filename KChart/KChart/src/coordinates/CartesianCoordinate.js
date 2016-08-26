KChart.CartesianCoordinate = KChart.Coordinate.extend({

    initialize: function (basePoint, width, height, xAxis, yAxis, elementCount) {
        var me = this;
        me.basePoint = basePoint;
        me.elementCount = elementCount;
        me.width = width;
        me.unitWidth = width / elementCount;
        me.height = height;

        me.xAxis = xAxis;
        me.yAxis = yAxis;
    },

    draw: function (painter) {
        var me = this;
        me.drawXAxis(painter);
        me.drawYAxis(painter);
        me.drawValueLine(painter);
    },

    drawWithoutValueLine: function (painter) {
        var me = this;
        me.drawXAxis(painter);
        me.drawYAxis(painter);
    },

    drawXAxis: function (painter) {
        var me = this;
        var oldStyle = painter.style;
        painter.setStyle(me.xAxis.style);

        var Vertex = KChart.Vertex,
            basePoint = me.basePoint;
        var endPoint = new Vertex(me.width + basePoint.x, basePoint.y);
        var x = new KChart.PolyLine([basePoint, endPoint]);
        painter.draw(x);

        var axisTick, axisTickX = me.axisTickX = [];
        for (var i = 0; i < me.elementCount; i++) {
            axisTickX[i] = basePoint.x + me.unitWidth / 2 + me.unitWidth * i;
            axisTick = new KChart.PolyLine([
                    new Vertex(axisTickX[i], basePoint.y),
                    new Vertex(axisTickX[i], basePoint.y + me.height * 0.01)]);
            painter.draw(axisTick);

            if (me.xAxis.labels[i]) {
                painter.drawText(me.xAxis.labels[i], axisTickX[i], basePoint.y + me.height * 0.03);
            }
        }

        painter.setStyle(oldStyle);
    },

    drawYAxis: function (painter) {
        var me = this,
            helper = KChart.Helper;
        var oldStyle = painter.style;
        painter.setStyle(me.yAxis.style);

        var Vertex = KChart.Vertex,
            basePoint = me.basePoint,
            endPoint = new Vertex(basePoint.x, basePoint.y - me.height);
        var y = new KChart.PolyLine([basePoint, endPoint]);
        painter.draw(y);

        var max = helper.getMax(me.yAxis.values);
        var axisTick,
            y = me.y = [],
            axisTickY = me.axisTickY = [],
            maxCeil = helper.getMaxCeil(max);
        var unitHeight = me.unitHeight = me.height / maxCeil;

        for (var i = 0; i <= 5; i++) {
            y[i] = basePoint.y - unitHeight * maxCeil / 5 * (i);
            axisTick = new KChart.PolyLine([
                    new Vertex(basePoint.x, y[i]),
                    new Vertex(basePoint.x - me.width * 0.01, y[i])]);
            painter.draw(axisTick);

            painter.drawText(maxCeil / 5 * (i), basePoint.x - me.width * 0.01, y[i]);
        }

        for (var i = 0; i < me.elementCount; i++) {
            axisTickY[i] = basePoint.y - unitHeight * me.yAxis.values[i];
        }

        painter.setStyle(oldStyle);
    },

    drawValueLine: function (painter) {
        var me = this;
        var oldStyle = painter.style;
        var Vertex = KChart.Vertex,
            basePoint = me.basePoint,
            axisTickY = me.y;
        painter.setStyle(me.yAxis.valueLineStyle);
        var valueLine;
        for (i = 1; i < axisTickY.length; i++) {
            valueLine = new KChart.PolyLine([
                    new Vertex(basePoint.x, axisTickY[i]),
                    new Vertex(basePoint.x + me.width, axisTickY[i])]);
            painter.draw(valueLine);
        }

        painter.setStyle(oldStyle);
    }
});



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