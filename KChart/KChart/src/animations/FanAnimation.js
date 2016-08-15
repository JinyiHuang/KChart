KChart.FanAnimation = KChart.Animation.extend({

    initialize: function (start, end, tween) {
        this.constructor.__base__.initialize.apply(this, arguments);
    },

    begin: function (painter, chart) {
        var Fan = KChart.Fan;
        elements = chart.elements,
        tween = this.tween,
        start = this.start,
        end = Math.floor(this.end / (chart.elementCount - 1)),
        index = 0,
        graphics = painter.graphics;

        var center = chart.center;

        var beginValue = elements[index].shape.sAngle,
            variation = elements[index].shape.eAngle - elements[index].shape.sAngle,
            radius = elements[index].shape.radius;

        KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, draw);

        function draw() {
            var eChange = tween(start, beginValue, variation, end);
            start++;

            graphics.clearRect(0, 0, graphics.width, graphics.height);

            for (var i = 0; i < index; i++) {
                painter.setStyle(elements[i].style);
                painter.draw(elements[i].shape);
            }

            painter.setStyle(elements[index].style);
            painter.draw(new Fan(center, radius, beginValue, eChange));

            if (start <= end) {
                KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, draw);
            }
            else {
                index++;

                if (index == elements.length) {
                    KChart.CrossBrowserAnimFrame.cancelAnimFrame.call(window, draw);
                } else {
                    start = 0;
                    beginValue = elements[index].shape.sAngle,
                    variation = elements[index].shape.eAngle - elements[index].shape.sAngle,
                    radius = elements[index].shape.radius;

                    KChart.CrossBrowserAnimFrame.requestAnimFrame.call(window, draw);
                }
            }
        }
    }
});



//drawAnimation: function(chart) {
//    var colors = chart.colors,
//        fans = chart.eles,
//        painter = chart.painter;

//    var index = 0;

//    var me = this,
//        t = me.start,
//        d = me.end,
//        b = fans[index].sAngle,
//        c = fans[index].eAngle - fans[index].sAngle;

//    var center = fans[index].vertexes[0],
//        radius = fans[index].radius;

//    var newStyle = new KChart.Style({
//        weight: 0,
//        fill: true,
//        fillColor: colors[index]
//    });
//    painter.setStyle(newStyle);

//    KChart.Helper.requestAnimFrame.call(window, draw);

//    function draw() {
//        t++;
//        var angelCh = me.tween(t, b, c, d);

//        var fan = new KChart.Fan(center, radius, b, angelCh);
//        painter.draw(fan);

//        if(t < d) {
//            KChart.Helper.requestAnimFrame.call(window, draw);
//        } else {
//            index++;

//            if(index == 6) {
//                KChart.Helper.cancelAnimFrame.call(window, draw);
//            } else {
//                t = me.start,
//                    d = me.end,
//                    b = fans[index].sAngle,
//                    c = fans[index].eAngle - fans[index].sAngle;

//                center = fans[index].vertexes[0],
//                    radius = fans[index].radius;

//                newStyle = new KChart.Style({
//                    weight: 0,
//                    fill: true,
//                    fillColor: colors[index]
//                });
//                painter.setStyle(newStyle);

//                KChart.Helper.requestAnimFrame.call(window, draw);
//            }
//        }
//    }
//}