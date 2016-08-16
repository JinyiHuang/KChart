KChart.LineAnimation = KChart.Animation.extend({

    initialize: function (start, end, base, tween) {
        this.constructor.__base__.initialize.apply(this, arguments);
    },

    begin: function (painter, chart) {
        var me = this,
            Vertex = KChart.Vertex,
            PolyLine = KChart.PolyLine,
            elements = chart.elements,
            coordinate = chart.coordinate,
            tween = me.tween,
            start = me.start,
            end = Math.floor(me.end / (chart.elementCount - 1)),
            index = 0,
            graphics = painter.graphics,
            width = graphics.width,
            height = graphics.height,
            requestAnimFrame = KChart.CrossBrowserAnimFrame.requestAnimFrame,
            cancelAnimFrame = KChart.CrossBrowserAnimFrame.cancelAnimFrame;

        var centers = [], points = [];
        for (var i = 0; i < elements.length; i++) {
            centers[i] = elements[i].shape.center;
        }

        var beginValue = centers[index].x,
            variation = centers[index + 1].x - elements[index].shape.center.x;
        var k = (centers[index].y - centers[index + 1].y) /
                (centers[index].x - centers[index + 1].x),
            a = centers[index].y - k * centers[index].x;

        var xChange;
        requestAnimFrame.call(window, draw);

        function draw() {
            xChange = tween(start, beginValue, variation, end);
            start++;

            graphics.clearRect(0, 0, width, height);
            coordinate.draw(painter);

            points = [];
            for (var i = 0; i <= index; i++) {
                points[i] = centers[i];
            }
            points.push(new Vertex(xChange, k * xChange + a))
            painter.setStyle(chart.lineStyle);
            painter.draw(new PolyLine(points));

            for (i = 0; i <= index; i++) {
                painter.setStyle(elements[i].style);
                painter.draw(elements[i].shape);
            }

            if (start <= end) {
                requestAnimFrame.call(window, draw);
            }
            else {
                index++;

                if (index == elements.length - 1) {
                    painter.setStyle(elements[index].style);
                    painter.draw(elements[index].shape);
                    cancelAnimFrame.call(window, draw);
                } else {
                    start = 0;
                    beginValue = centers[index].x;
                    variation = centers[index + 1].x - elements[index].shape.center.x;
                    k = (centers[index].y - centers[index + 1].y) /
                        (centers[index].x - centers[index + 1].x);
                    a = centers[index].y - k * centers[index].x;

                    requestAnimFrame.call(window, draw);
                }
            }
        }
    }
});


//drawAnimation: function(chart) {
//    var vertex = KChart.Vertex,
//        vertexes = chart.vertexes,
//        count = vertexes.length,
//        painter = chart.painter;

//    var index = 0;

//    var me = this,
//        t = me.start,
//        d = me.end,
//        b = vertexes[index].x,
//        c = vertexes[index + 1].x - vertexes[index].x;

//    var k = (vertexes[index].y - vertexes[index + 1].y) /
//        (vertexes[index].x - vertexes[index + 1].x),
//        a = vertexes[index].y - k * vertexes[index].x;

//    KChart.Helper.requestAnimFrame.call(window, draw);

//    function draw() {
//        t++;
//        var xCh = me.tween(t, b, c, d);

//        var line = new KChart.PolyLine([vertexes[index], new KChart.Vertex(xCh, k * xCh + a)]);
//        painter.draw(line);

//        if(t < d) {
//            KChart.Helper.requestAnimFrame.call(window, draw);
//        } else {
//            index++;

//            if(index == count - 1) {
//                KChart.Helper.cancelAnimFrame.call(window, draw);
//            } else {

//                t = me.start,
//                    d = me.end,
//                    b = vertexes[index].x,
//                    c = vertexes[index + 1].x - vertexes[index].x;

//                k = (vertexes[index].y - vertexes[index + 1].y) /
//                    (vertexes[index].x - vertexes[index + 1].x),
//                    a = vertexes[index].y - k * vertexes[index].x;

//                KChart.Helper.requestAnimFrame.call(window, draw);
//            }
//        }
//    };
//}