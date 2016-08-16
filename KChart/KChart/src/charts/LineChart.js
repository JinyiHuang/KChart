KChart.LineChart = KChart.Chart.extend({

    initialize: function (graphics, config) {
        var me = this;
        this.constructor.__base__.initialize.apply(me, arguments);

        var graphics = me.graphics,
            config = me.config,
            defaultConfig = KChart.Chart.defaultConfig;
        var basePoint = new KChart.Vertex(graphics.width * Number.parseInt(me.padingLeft) / 100,
                graphics.height * Number.parseInt(this.padingTop) / 100 + me.height);
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

        var Vertex = KChart.Vertex,
            Circle = KChart.Circle,
            coordinate = me.coordinate,
            config = me.config,
            defaultConfig = KChart.Chart.defaultConfig,
            lineDefaultConfig = KChart.LineChart.defaultConfig;

        var painter = new KChart.Painter(me.graphics);

        coordinate.draw(painter);

        var dots = me.elements = [];
        var data = config.data,
            defaultData = lineDefaultConfig.data;

        if (!data.values.length) {
            return;
        }

        var values = data.values,
            axisTickX = coordinate.axisTickX,
            axisTickY = coordinate.axisTickY;

        var styles = data.styles || defaultData.style;
        me.lineStyle = data.lineStyle || defaultData.lineStyle;
        if (!Array.isArray(styles)) {
            var tempStyle = styles;
            styles = [];
            for (var i = 0; i < values.length; i++) {
                styles[i] = tempStyle;
            }
        }

        var radius = me.width * 0.005;
        var centers = [];
        for (i = 0; i < values.length; i++) {
            centers[i] = new Vertex(axisTickX[i], axisTickY[i]);
            dots[i] = {
                shape: new Circle(centers[i], radius),
                style: styles[i]
            };
        }

        var animationConfig = config.animation || defaultConfig.animation;
        if (animationConfig.enable) {
            var animation = new KChart.LineAnimation(0, animationConfig.during, animationConfig.tween);
            animation.begin(painter, me);
        }
        else {
            var polyLine = new KChart.PolyLine(centers);
            painter.setStyle(me.lineStyle)
            painter.draw(polyLine);

            for (i = 0; i < dots.length; i++) {
                painter.setStyle(dots[i].style);
                painter.draw(dots[i].shape);
            }
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
                style: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                }),
                lineStyle: new KChart.Style({
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