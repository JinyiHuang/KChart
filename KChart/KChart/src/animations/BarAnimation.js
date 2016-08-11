KChart.BarAnimation = KChart.Animation.extend({

    initialize: function (start, end, tween) {
        this.constructor.__base__.initialize.apply(this, arguments);
    },

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

    draw: function () {
        var Vertex = KChart.Vertex,
            painter = this.painter,
            elements = this.elements,
            coordinate = this.coordinate,
            tween = this.tween,
            end = this.end,
            beginValues = this.beginValues,
            variations = this.variations,
            xLeft = this.xLeft,
            xRight = this.xRight;

        var yChange, polygon;
        this.start++;

        var graphics = painter.graphics;
        graphics.clearRect(0, 0, graphics.ctx.canvas.width, graphics.ctx.canvas.height);
        coordinate.draw(painter);

        for (var i = 0; i < elements.length; i++) {
            yChange = tween(this.start, beginValues[i], variations[i], end);
            polygon = new KChart.Polygon([new Vertex(xLeft[i], beginValues[i]), new Vertex(xLeft[i], yChange), new Vertex(xRight[i], yChange), new Vertex(xRight[i], beginValues[i])]);
            painter.setStyle(elements[i].style);
            painter.draw(polygon);
        }

        if (this.start < end) {
            KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, this.draw.bind(this));
        }
        else {
            graphics.clearRect(0, 0, graphics.ctx.canvas.width, graphics.ctx.canvas.height);
            coordinate.drawValueLine(painter);
            for (i = 0; i < elements.length; i++) {
                painter.setStyle(elements[i].style);
                painter.draw(elements[i].shape);
            }
            coordinate.drawWithoutValueLine(painter);
        }
    },

    begin: function (painter, chart) {
        this.painter = painter;
        var elements = this.elements = chart.elements;
        this.coordinate = chart.coordinate;
        var bv = this.beginValues = [],
            variations = this.variations = [],
            xl = this.xLeft = [],
            xr = this.xRight = [];
        for (var i = 0; i < elements.length; i++) {
            bv[i] = elements[i].shape.vertexes[0].y;
            variations[i] = elements[i].shape.vertexes[1].y - bv[i];
            xl[i] = elements[i].shape.vertexes[0].x;
            xr[i] = elements[i].shape.vertexes[3].x;
        }

        console.log(Date.now());
        KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, this.draw.bind(this));
    },

    //terminate: function () {
    //    KChart.CrossBrowserAnimFrame.cancelAnimFrame.call(window, this.draw.bind(this));
    //}
});