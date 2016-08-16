KChart.FanChart = KChart.Chart.extend({

    initialize: function (width, height, data, title) {
        var me = this;
        this.constructor.__base__.initialize.apply(me, arguments);

        var graphics = me.graphics,
            width = me.width,
            height = me.height,
            config = me.config,
            defaultConfig = KChart.Chart.defaultConfig;

        var centerPrecent = config.center || defaultConfig.center;
        var convert = KChart.Helper.convertPercentToNumber;
        var left = graphics.width * convert(me.padingLeft) + width * convert(centerPrecent[0]),
            top = graphics.height * convert(me.padingTop) + height * convert(centerPrecent[1]);
        me.center = new KChart.Vertex(left, top);

        var radiusPrecent = config.radius || defaultConfig.radius;
        me.maxRadius = width < height ? width * convert(radiusPrecent) : height * convert(radiusPrecent);
    },

    draw: function (canvas, style) {
        var me = this;
        this.constructor.__base__.draw.apply(me, arguments);

        var painter = new KChart.Painter(me.graphics);

        var Vertex = KChart.Vertex,
            config = me.config,
            defaultConfig = KChart.Chart.defaultConfig;

        var fans = me.elements = [];

        var data = config.data,
            defaultData = defaultConfig.data,
            values = data.values;

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

        var center = me.center,
            radius = me.maxRadius,
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

        var animationConfig = config.animation || defaultConfig.animation;
        if (animationConfig.enable) {
            var animation = new KChart.FanAnimation(0, animationConfig.during, animationConfig.tween);
            animation.begin(painter, me);
        }
        else {
            for (var i = 0; i < fans.length; i++) {
                painter.setStyle(fans[i].style);
                painter.draw(fans[i].shape);
            }
        }

        var event = config.event,
            defaultEvent = defaultConfig.event;
        if (event && event.hover && event.hover.enable) {
            var tooltipStyle = event.hover.tooltipStyle || defaultEvent.hover.tooltipStyle;
            var handler = new KChart.HoverHandler(me, tooltipStyle);
            KChart.Event.addEvent(me, "mousemove", handler.handle.bind(handler));
        }
    }

});