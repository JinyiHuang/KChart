KChart.Graphics = KChart.Object.extend({

    initialize: function () {

    },

    width: 0,
    height: 0,
    bgColor: 'white',
    fillStyle: function (fillstyle) { },
    strokeStyle: function (strokestyle) { },
    lineCap: function (linecap) { },
    lineWidth: function (linewidth) { },
    lineJoin: function (linejoin) { },
    clearRect: function (x, y, width, height) { },
    fill: function () { },
    stroke: function () { },
    beginPath: function () { },
    moveTo: function (x, y) { },
    closePath: function () { },
    lineTo: function (x, y) { },
    quadraticCurveTo: function (cpx, cpy, x, y) { },
    bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y) { },
    arc: function (x, y, r, sAngle, eAngle, counterclockwise) { },
    arcTo: function (x1, y1, x2, y2, r) { },
    isPointInPath: function (x, y) { },
    scale: function (scalewidth, scaleheight) { },
    rotate: function (angle) { },
    translate: function (x, y) { },
    transform: function (a, b, c, d, e, f) { },
    font: function (fontStyle) { },
    textAlign: function (textalign) { },
    textBaseline: function (textbaseline) { },
    fillText: function (text, x, y, maxWidth) { },
    strokeText: function (text, x, y, maxWidth) { },

    //Transform the point's position from relative to client to relative to the canvas.
    getPointOnGraphics: function (point) { }
});