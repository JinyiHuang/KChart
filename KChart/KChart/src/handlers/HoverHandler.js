KChart.HoverHandler = KChart.Handler.extend({

    initialize: function (chart, tooltipStyle) {
        this.constructor.__base__.initialize.apply(this, arguments);
        this.tooptip = new KChart.Tooltip(tooltipStyle);
    },

    handle: function (e) {
        var chart = this.chart,
			tooptip = this.tooptip;

        e = KChart.CrossBrowserEvent.getEvent(e);

        var mousePosition = chart.graphics.getPointOnGraphics({
            x: e.clientX,
            y: e.clientY
        });

        var index = this.inRange(mousePosition, chart.elements);

        if (index != -1) {
            tooptip.show(mousePosition, chart.config.xAxis.labels[index] + " : " + chart.config.data.values[index]);
        } else {
            tooptip.disappear();
        }
    },

    /*
	 * According to the eles' type judge whether mp is in the range of one of eles.
	 * If so, return the index of the ele.
	 */
    inRange: function (mp, eles) {
        switch (eles[0].shape.constructor) {
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

    inPolygonRange: function (mp, eles) {
        var mouseX = mp.x,
			mouseY = mp.y;

        for (var i = 0; i < eles.length; i++) {
            var minX = eles[i].shape.vertexes[1].x,
				minY = eles[i].shape.vertexes[1].y,
				maxX = eles[i].shape.vertexes[3].x,
				maxY = eles[i].shape.vertexes[3].y;

            if (mouseX >= minX &&
				mouseX <= maxX &&
				mouseY >= minY &&
				mouseY <= maxY) {

                return i;
            }
        }

        return -1;
    },

    inCircleRange: function (mp, eles) {
        var mouseX = mp.x,
			mouseY = mp.y;

        for (var i = 0; i < eles.length; i++) {
            var x = eles[i].shape.center.x,
				y = eles[i].shape.center.y,
				radius = eles[i].shape.radius;

            if ((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) <= Math.pow(radius, 2)) {
                return i;
            }
        }

        return -1;
    },

    inFanRange: function (mp, eles) {
        var mouseX = mp.x,
			mouseY = mp.y;

        for (var i = 0; i < eles.length; i++) {
            var x = eles[i].shape.vertexes[0].x,
				y = eles[i].shape.vertexes[0].y,
				radius = eles[i].shape.radius;

            if ((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) <= Math.pow(radius, 2)) {
                var difX = mouseX - x,
					difY = mouseY - y;
                var angle = Math.atan(difY / difX);

                if (difX >= 0 && difY >= 0) {
                    angle = angle;
                } else if (difX >= 0 & difY < 0) {
                    angle += Math.PI * 2;
                } else {
                    angle += Math.PI;
                }

                if (angle >= eles[i].shape.sAngle && angle <= eles[i].shape.eAngle) {
                    return i;
                }
            }
        }

        return -1;
    },
});