var KChart = {
    version: '2.1.0'
}; //As namespace


/// <reference path="core/Animation.js" />
/// <reference path="core/Chart.js" />
/// <reference path="core/Class.js" />
/// <reference path="core/Coordinate.js" />
/// <reference path="core/crossBrowserAnimFrame.js" />
/// <reference path="core/crossBrowserEvent.js" />
/// <reference path="core/Graphics.js" />
/// <reference path="core/Handler.js" />
/// <reference path="core/Helper.js" />
/// <reference path="core/Painter.js" />
/// <reference path="core/Shape.js" />
/// <reference path="core/Style.js" />
/// <reference path="core/Tween.js" />
/// <reference path="core/Vertex.js" />
/// <reference path="shapes/Arc.js" />
/// <reference path="shapes/Circle.js" />
/// <reference path="shapes/Fan.js" />
/// <reference path="shapes/Point.js" />
/// <reference path="shapes/Polygon.js" />
/// <reference path="shapes/PolyLine.js" />
/// <reference path="coordinates/CartesianCoordinate.js" />
/// <reference path="coordinates/PolarCoordinate.js" />
/// <reference path="animations/BarAnimation.js" />
/// <reference path="animations/FanAnimation.js" />
/// <reference path="animations/LineAnimation.js" />
/// <reference path="charts/BarChart.js" />
/// <reference path="charts/FanChart.js" />
/// <reference path="charts/LineChart.js" />
/// <reference path="handlers/HoverHandler.js" />
/// <reference path="core/Tooltip.js" />
/// <reference path="core/Event.js" />
/// <reference path="graphics/CanvasGraphics.js" />
(function () {
    var jsFiles = [
        "core/Class.js",
        "core/Helper.js",
        "CrossBrowser/crossBrowserAnimFrame.js",
        "CrossBrowser/crossBrowserEvent.js",
        "core/Tween.js",
        "core/Vertex.js",
        "shapes/Shape.js",
        "graphics/Graphics.js",
        "core/Style.js",
        "core/Painter.js",
        "coordinates/Coordinate.js",
        "core/Chart.js",
        "animations/Animation.js",
        "handlers/Handler.js",
        "core/Event.js",
        "graphics/CanvasGraphics.js",
        "shapes/Arc.js",
        "shapes/Circle.js",
        "shapes/Fan.js",
        "shapes/Point.js",
        "shapes/Polygon.js",
        "shapes/PolyLine.js",
        "coordinates/CartesianCoordinate.js",
        "coordinates/PolarCoordinate.js",
        "charts/BarChart.js",
        "charts/FanChart.js",
        "charts/LineChart.js",
        "animations/BarAnimation.js",
        "animations/FanAnimation.js",
        "animations/LineAnimation.js",
        "handlers/HoverHandler.js",
        "core/Tooltip.js"
    ];

    var scriptTags = new Array(jsFiles.length);
    var host = "../src/";
    for (var i = 0, len = jsFiles.length; i < len; i++) {
        scriptTags[i] = "<script src='" + host + jsFiles[i] +
                               "'></script>";
    }
    if (scriptTags.length > 0) {
        document.write(scriptTags.join(""));
    }
})();