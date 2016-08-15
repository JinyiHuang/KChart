KChart.FanChart = KChart.Chart.extend({

    initialize: function (width, height, data, title) {
        this.constructor.__base__.initialize.apply(this, arguments);

        var graphics = this.graphics,
            width = this.width,
            height = this.height,
            config = this.config,
            defaultConfig = KChart.Chart.defaultConfig;

        var centerPrecent = config.center || defaultConfig.center;
        var left = (graphics.width * Number.parseFloat(this.padingLeft) + width * Number.parseFloat(centerPrecent[0])) / 100,
            top = (graphics.height * Number.parseFloat(this.padingTop) + height * Number.parseFloat(centerPrecent[1])) / 100;
        this.center = new KChart.Vertex(left, top);

        var radiusPrecent = config.radius || defaultConfig.radius;
        this.maxRadius = width < height ? width * Number.parseFloat(radiusPrecent) / 100 : height * Number.parseFloat(radiusPrecent) / 100;
    },

    draw: function (canvas, style) {

        this.constructor.__base__.draw.apply(this, arguments);

        var painter = new KChart.Painter(this.graphics, new KChart.Style());

        var Vertex = KChart.Vertex;
        var fans = this.elements = [];
        var data = this.config.data,
            defaultData = KChart.BarChart.defaultConfig.data;
        var values = data.values;

        if (values.length == 0) {
            return;
        }

        var styles = data.styles || defaultData.style;
        if (!Array.isArray(styles)) {
            var tempStyle = styles;
            styles = [];
            for (var i = 0; i < values.length; i++) {
                styles[i] = tempStyle;
            }
        }

        var amount = KChart.Helper.sum(values),
            max = KChart.Helper.getMax(values);

        var center = this.center,
            radius = this.maxRadius,
            sAngle = 0,
			eAngle,
            realRadius;

        for (var i = 0; i < values.length; i++) {
            realRadius = radius * (values[i] / max);
            eAngle = (values[i] / amount) * 2 * Math.PI + sAngle;

            var fan = new KChart.Fan(center, realRadius, sAngle, eAngle);
            fans[i] = { shape: fan, style: styles[i] };

            sAngle = eAngle;
        }

        var animation = new KChart.FanAnimation(0, 30);
        animation.begin(painter, this);

        var event = this.config.event,
            defaultEvent = KChart.Chart.defaultConfig.event;
        if (event && event.hover && event.hover.enable) {
            var tooltipStyle = event.hover.tooltipStyle || defaultEvent.hover.tooltipStyle;
            var handler = new KChart.HoverHandler(this, tooltipStyle);
            KChart.Event.addEvent(this, "mousemove", handler.handle.bind(handler));
        }
    }

});