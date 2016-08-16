KChart.BarChart = KChart.Chart.extend({

    initialize: function (graphics, config) {
        var me = this;
        me.constructor.__base__.initialize.apply(me, arguments);

        var graphics = me.graphics,
            config = me.config,
            defaultConfig = KChart.Chart.defaultConfig;
        var convert = KChart.Helper.convertPercentToNumber;
        var basePoint = new KChart.Vertex(graphics.width * convert(me.padingLeft),
                graphics.height * convert(me.padingTop) + me.height);
        var xAxis = config.xAxis || defaultConfig.xAxis,
            yAxis = config.yAxis || defaultConfig.yAxis;

        xAxis.style = xAxis.style || defaultConfig.xAxis.style;
        yAxis.style = yAxis.style || defaultConfig.yAxixs.style;
        yAxis.valueLineStyle = yAxis.valueLineStyle || defaultConfig.yAxis.valueLineStyle;
        yAxis.values = config.data.values;

        me.coordinate = new KChart.CartesianCoordinate(basePoint, me.width, me.height, xAxis, yAxis, me.elementCount);
    },

    draw: function () {
        var me = this;
        me.constructor.__base__.draw.apply(me, arguments);

        var coordinate = me.coordinate,
            graphics = me.graphics,
            width = graphics.width,
            height = graphics.height,
            painter = new KChart.Painter(graphics);

        coordinate.draw(painter);

        var Vertex = KChart.Vertex,
            config = me.config,
            defaultConfig = KChart.Chart.defaultConfig;

        var polygons = me.elements = [];
        var data = config.data,
            defaultData = defaultConfig.data;

        if (data.values.length == 0) {
            return;
        }

        var values = data.values,
            barWidth = KChart.Helper.convertPercentToNumber(data.barWidth || defaultData.barWidth),
            unitWidth = coordinate.unitWidth,
            basePoint = coordinate.basePoint,
            axisTickX = coordinate.axisTickX,
            axisTickY = coordinate.axisTickY;

        var styles = data.styles || defaultData.style;
        if (!Array.isArray(styles)) {
            var tempStyle = styles;
            styles = [];
            for (var i = 0; i < values.length; i++) {
                styles[i] = tempStyle;
            }
        }

        var lbPoint, ltPoint, rtPoint, rbPoint;
        var halfUnitWidth = unitWidth * barWidth / 2;
        for (i = 0; i < values.length; i++) {
            lbPoint = new Vertex(axisTickX[i] - halfUnitWidth, basePoint.y);
            ltPoint = new Vertex(axisTickX[i] - halfUnitWidth, axisTickY[i]);
            rtPoint = new Vertex(axisTickX[i] + halfUnitWidth, axisTickY[i]);
            rbPoint = new Vertex(axisTickX[i] + halfUnitWidth, basePoint.y);
            polygons[i] = { shape: new KChart.Polygon([lbPoint, ltPoint, rtPoint, rbPoint]), style: styles[i] };
        }

        var animationConfig = config.animation || defaultConfig.animation;
        if (animationConfig.enable) {
            var animation = new KChart.BarAnimation(0, animationConfig.during, animationConfig.tween);
            animation.begin(painter, me);
        }
        else {
            graphics.clearRect(0, 0, width, height);
            coordinate.drawValueLine(painter);
            for (i = 0; i < polygons.length; i++) {
                painter.setStyle(polygons[i].style);
                painter.draw(polygons[i].shape);
            }
            coordinate.drawWithoutValueLine(painter);
        }

        var event = config.event,
            defaultEvent = defaultConfig.event;
        if (event && event.hover && event.hover.enable) {
            var tooltipStyle = event.hover.tooltipStyle || defaultEvent.hover.tooltipStyle;
            var handler = new KChart.HoverHandler(me, tooltipStyle);
            KChart.Event.addEvent(me, "mousemove", handler.handle.bind(handler));
        }
    },

    statics: {
        defaultConfig: {
            data: {
                value: [],
                barWidth: '60%',
                style: new KChart.Style({
                    stroke: false,
                    fill: true,
                    fillColor: "#3398DB"
                })
            }
        }
    }
});

//KChart.BarChart = KChart.Chart.extend({

//	initialize: function(width, height, data, title) {
//		this.constructor.__base__.initialize.apply(this, arguments);
//	},

//	draw: function(canvas, style) {

//		this.constructor.__base__.draw.apply(this, arguments);

//		var Helper = KChart.Helper,

//			height = this.height,
//			width = this.width,
//			horizontalOffset = this.horizontalOffset,
//			verticalOffset = this.verticalOffset,
//			data = this.data,
//			realHeight = height + verticalOffset,

//			painter = this.painter,
//			oldStyle = painter.style;

//		var keys = this.keys = Object.keys(data),
//			count = keys.length,
//			values = this.values = [];

//		for(var i = 0; i < count; i++) {
//			values.push(data[keys[i]]);
//		}

//		var max = Helper.getMax(values),
//			unitWidth = this.unitWidth = width / count,
//			unitHeight = this.unitHeight = (height * 0.95) / max;

//		var vertex = KChart.Vertex;
//		var polygons = this.eles = [];

//		for(var i = 0; i < count; i++) {
//			var polygon = new KChart.Polygon(
//				[new vertex((i + 0.25) * unitWidth + horizontalOffset, realHeight),
//					new vertex((i + 0.25) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight),
//					new vertex((i + 0.75) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight),
//					new vertex((i + 0.75) * unitWidth + horizontalOffset, realHeight)
//				]);
//			polygons.push(polygon);
//		}

//		//Helper.drawXYAxis(painter, offset / 2);
//		var axis = new KChart.Axis(new vertex(horizontalOffset, realHeight), width, height, unitWidth, unitHeight);
//		axis.drawXAxis(painter, keys);
//		axis.drawYAxis(painter, values);

//		painter.setStyle(oldStyle);
//		var animation = new KChart.BarAnimation(0, 15);
//		animation.drawAnimation(this);

//		Helper.addEvent(this, 'mousemove');
//	}
//});

