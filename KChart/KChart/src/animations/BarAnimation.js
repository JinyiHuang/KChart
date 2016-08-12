KChart.BarAnimation = KChart.Animation.extend({

    initialize: function (start, end, tween) {
        this.constructor.__base__.initialize.apply(this, arguments);
    },

    begin: function (painter, chart) {
        var Vertex = KChart.Vertex,
            elements = chart.elements,
            coordinate = chart.coordinate,
            tween = this.tween,
            start = this.start,
            end = this.end;

        var beginValues = [],
            variations = [],
            xLeft = [],
            xRight = [];

        for (var i = 0; i < elements.length; i++) {
            beginValues[i] = elements[i].shape.vertexes[0].y;
            variations[i] = elements[i].shape.vertexes[1].y - beginValues[i];
            xLeft[i] = elements[i].shape.vertexes[0].x;
            xRight[i] = elements[i].shape.vertexes[3].x;
        }

        KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, draw);

        function draw() {
            var yChange, polygon;
            start++;

            var graphics = painter.graphics;
            graphics.clearRect(0, 0, graphics.width, graphics.height);
            coordinate.draw(painter);

            for (var i = 0; i < elements.length; i++) {
                yChange = tween(start, beginValues[i], variations[i], end);
                polygon = new KChart.Polygon([
                        new Vertex(xLeft[i], beginValues[i]),
                        new Vertex(xLeft[i], yChange),
                        new Vertex(xRight[i], yChange),
                        new Vertex(xRight[i], beginValues[i])]);
                painter.setStyle(elements[i].style);
                painter.draw(polygon);
            }

            if (start <= end) {
                KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, draw);
            }
            else {
                graphics.clearRect(0, 0, graphics.width, graphics.height);
                coordinate.drawValueLine(painter);
                for (i = 0; i < elements.length; i++) {
                    painter.setStyle(elements[i].style);
                    painter.draw(elements[i].shape);
                }
                coordinate.drawWithoutValueLine(painter);
            }
        }
    }

    //terminate: function () {
    //    KChart.CrossBrowserAnimFrame.cancelAnimFrame.call(window, this.draw.bind(this));
    //}

    //drawAnimation: function(chart) {
    //	var height = chart.height,
    //		width = chart.width,
    //		horizontalOffset = chart.horizontalOffset,
    //		verticalOffset = chart.verticalOffset,
    //		realHeight = height + verticalOffset,
    //		painter = chart.painter,
    //		values = chart.values,
    //		count = values.length,
    //		unitWidth = chart.unitWidth,
    //		unitHeight = chart.unitHeight;

    //	var vertex = KChart.Vertex;

    //	var index = 0;
    //	var me = this,
    //		t = me.start,
    //		d = me.end,
    //		b = 0,
    //		c = values[index] * unitHeight;

    //	KChart.Helper.requestAnimFrame.call(window, draw);

    //	function draw() {
    //		t++;
    //		var heightCh = me.tween(t, b, c, d);

    //		var polygon = new KChart.Polygon(
    //			[new vertex((index + 0.25) * unitWidth + horizontalOffset, realHeight),
    //				new vertex((index + 0.25) * unitWidth + horizontalOffset, realHeight - heightCh),
    //				new vertex((index + 0.75) * unitWidth + horizontalOffset, realHeight - heightCh),
    //				new vertex((index + 0.75) * unitWidth + horizontalOffset, realHeight)
    //			]);
    //		painter.draw(polygon);

    //		if(t < d) {
    //			KChart.Helper.requestAnimFrame.call(window, draw);
    //		} else {
    //			index++;

    //			if(index == count) {
    //				KChart.Helper.cancelAnimFrame.call(window, draw);
    //			} else {
    //				t = me.start,
    //					d = me.end,
    //					b = 0,
    //					c = values[index] * unitHeight;
    //				KChart.Helper.requestAnimFrame.call(window, draw);
    //			}
    //		}
    //	};
    //}

});