KChart.LineChart = KChart.Chart.extend({

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
        var dots = this.elements = [];
        var data = this.config.data,
            defaultData = KChart.LineChart.defaultConfig.data;

        if (!data.values.length) {
            return;
        }

        var values = data.values,
            axisTickX = this.coordinate.axisTickX,
            axisTickY = this.coordinate.axisTickY;

        var styles = data.styles || defaultData.style;
        this.lineStyle = data.lineStyle || defaultData.lineStyle;
        if (!Array.isArray(styles)) {
            var tempStyle = styles;
            styles = [];
            for (var i = 0; i < values.length; i++) {
                styles[i] = tempStyle;
            }
        }

        var radius = this.width * 0.005;
        for (i = 0; i < values.length; i++) {
            dots[i] = {
                shape: new KChart.Circle(new Vertex(axisTickX[i], axisTickY[i]), radius),
                style: styles[i]
            };
        }

        var animation = new KChart.LineAnimation(0, 100);
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
                style: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                }),
                lineStyle:new KChart.Style({
                    stroke: true,
                    borderColor: '#3398DB',
                })
            }
        }
    }
});


//initialize: function(width, height, data, title) {
//	this.constructor.__base__.initialize.apply(this, arguments);
//},

//draw: function(canvas, style) {

//	this.constructor.__base__.draw.apply(this, arguments);

//	var Helper = KChart.Helper,

//		height = this.height,
//		width = this.width,
//		horizontalOffset = this.horizontalOffset,
//		verticalOffset = this.verticalOffset,
//		data = this.data,
//		realHeight = height + verticalOffset,

//		painter = this.painter,
//		oldStyle = painter.style;

//	var keys = this.keys = Object.keys(data),
//		count = keys.length,
//		values = this.values = [];

//	for(var i = 0; i < count; i++) {
//		values.push(data[keys[i]]);
//	}

//	var max = Helper.getMax(values),
//		unitWidth = this.unitWidth = width / count,
//		unitHeight = this.unitHeight = (height * 0.95) / max;

//	var vertex = KChart.Vertex;
//	var vertexes = this.vertexes = [];

//	for(var i = 0; i < count; i++) {
//		vertexes.push(new vertex((i + 0.5) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight));
//	}

//	var axis = new KChart.Axis(new vertex(horizontalOffset, realHeight), width, height, unitWidth, unitHeight);
//	axis.drawXAxis(painter, keys);
//	axis.drawYAxis(painter, values);

//	painter.setStyle(new KChart.Style({
//		color: "red",
//		fill: true,
//		fillColor: "#eeeeee",
//		dashArray: null
//	}));

//	this.eles = [];
//	var circle;

//	for(var i = 0; i < count; i++) {
//		var circle = new KChart.Circle(vertexes[i], 3);
//		painter.draw(circle);

//		this.eles.push(circle);
//	}

//	painter.setStyle(oldStyle);
//	var animation = new KChart.LineAnimation(0, 15);
//	animation.drawAnimation(this);

//	Helper.addEvent(this, 'mousemove');
//}