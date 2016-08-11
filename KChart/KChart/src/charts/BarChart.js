KChart.BarChart = KChart.Chart.extend({

    initialize: function (graphics, config) {
        this.constructor.__base__.initialize.apply(this, arguments);

        var graphics = this.graphics,
            defaultConfig = KChart.Chart.defaultConfig;
        var basePoint = new KChart.Vertex(graphics.width * Number.parseInt(this.padingLeft) / 100,
                graphics.height * Number.parseInt(this.padingTop) / 100 + this.height);
        var xAxis = this.config.xAxis || defaultConfig.xAxis,
            yAxis = this.config.yAxis || defaultConfig.yAxis;

        xAxis.style = xAxis.style || defaultConfig.xAxis.style;
        yAxis.style = yAxis.style || defaultConfig.yAxixs.style;
        yAxis.valueLineStyle = yAxis.valueLineStyle || defaultConfig.yAxis.valueLineStyle;
        yAxis.values = this.config.data.values;

        this.coordinate = new KChart.CartesianCoordinate(basePoint, this.width, this.height, xAxis, yAxis, this.elementCount);
    },

    draw: function () {

        this.constructor.__base__.draw.apply(this, arguments);

        var painter = new KChart.Painter(this.graphics, new KChart.Style());

        this.coordinate.draw(painter);

        var Vertex = KChart.Vertex;
        var polygons = this.elements = [];
        var data = this.config.data,
            defaultData = KChart.BarChart.defaultConfig.data;

        if (data.values.length == 0) {
            return;
        }

        var values = data.values,
            barWidth = Number.parseFloat(data.barWidth || defaultData.barWidth) / 100,
            unitWidth = this.coordinate.unitWidth,
            basePoint = this.coordinate.basePoint,
            axisTickX = this.coordinate.axisTickX,
            axisTickY = this.coordinate.axisTickY;

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

        var animation = new KChart.BarAnimation(0, 30);
        animation.begin(painter, this);

        var event = this.config.event,
            defaultEvent = KChart.Chart.defaultConfig.event;
        if (event && event.hover && event.hover.enable) {
            var tooltipStyle = event.hover.tooltipStyle || defaultEvent.hover.tooltipStyle;
            var handler = new KChart.HoverHandler(this, tooltipStyle);
            KChart.Event.addEvent(this, "mousemove", handler.handle.bind(handler));
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

