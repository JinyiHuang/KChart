KChart.CanvasGraphics = KChart.Graphics.extend({

    initialize: function (ctx) {

        if (ctx.constructor === HTMLCanvasElement) {
            this.width = ctx.width;
            this.height = ctx.height;
            this.bgColor = ctx.style.background || 'white';
            this.ctx = ctx.getContext('2d');
        }
        else if (ctx.constructor === CanvasRenderingContext2D) {
            this.width = ctx.canvas.width;
            this.height = ctx.cancas.height;
            this.bgColor = ctx.canvas.style.background || 'white';
            this.ctx = ctx;
        }

        //this._fillStyle = null;
        //this._strokeStyle = null;
        //this._lineCap = null;
        //this._lineWidth = null;
        //this._lineJoin = null;
        //this._font = null;
        //this._textAlign = null;
        //this._textBaseline = null;
        Object.defineProperties(this, {
            'fillStyle': {
                get: function () {
                    return this.ctx.fillStyle;
                },
                set: function (fillstyle) {
                    this.ctx.fillStyle = fillstyle;
                }
            },
            'strokeStyle': {
                get: function () {
                    return this.ctx.strokeStyle;
                },
                set: function (strokestyle) {
                    this.ctx.strokeStyle = strokestyle;
                }
            },
            'lineCap': {
                get: function () {
                    return this.ctx.lineCap;
                },
                set: function (linecap) {
                    this.ctx.lineCap = linecap;
                }
            },
            'lineWidth': {
                get: function () {
                    return this.ctx.lineWidth;
                },
                set: function (linewidth) {
                    this.ctx.lineWidth = linewidth;
                }
            },
            'lineJoin': {
                get: function () {
                    return this.ctx.lineJoin;
                },
                set: function (linejoin) {
                    this.ctx.lineJoin = linejoin;
                }
            },
            'font': {
                get: function () {
                    return this.ctx.font;
                },
                set: function (font) {
                    this.ctx.font = font;
                }
            },
            'textAlign': {
                get: function () {
                    return this.ctx.textAlign;
                },
                set: function (textalign) {
                    this.ctx.textAlign = textalign;
                }
            },
            'textBaseline': {
                get: function () {
                    return this.ctx.textBaseline;
                },
                set: function (textbaseline) {
                    this.ctx.textBaseline = textbaseline;
                }
            }
        });
    },

    clearRect: function (x, y, width, height) {
        this.ctx.clearRect(x, y, width, height);
    },

    fill: function () {
        this.ctx.fill();
    },

    stroke: function () {
        this.ctx.stroke();
    },

    beginPath: function () {
        this.ctx.beginPath();
    },

    moveTo: function (x, y) {
        this.ctx.moveTo(x, y);
    },

    closePath: function () {
        this.ctx.closePath();
    },

    lineTo: function (x, y) {
        this.ctx.lineTo(x, y);
    },

    quadraticCurveTo: function (cpx, cpy, x, y) {
        this.ctx.quadraticCurveTo(cpx, cpy, x, y);
    },

    bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y) {
        this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    },

    arc: function (x, y, r, sAngle, eAngle, counterclockwise) {
        this.ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
    },

    arcTo: function (x1, y1, x2, y2, r) {
        this.ctx.arcTo(x1, y1, x2, y2, r);
    },

    isPointInPath: function (x, y) {
        this.ctx.isPointInPath(x, y);
    },

    scale: function (scalewidth, scaleheight) {
        this.ctx.scale(scalewidth, scaleheight);
    },

    rotate: function (angle) {
        this.ctx.rotate(angle);
    },

    translate: function (x, y) {
        this.ctx.translate(x, y);
    },

    transform: function (a, b, c, d, e, f) {
        this.ctx.transform(a, b, c, d, e, f);
    },

    fillText: function (text, x, y) {
        this.ctx.fillText(text, x, y);
    },

    strokeText: function (text, x, y, maxWidth) {
        this.ctx.strokeText(text, x, y, maxWidth);
    },

    setLineDash: function (dashArray) {
        this.ctx.setLineDash(dashArray);
    },

    getPointOnGraphics: function (point) {
        var bbox = this.ctx.canvas.getBoundingClientRect();

        return {
            x: point.x - bbox.left * (this.width / bbox.width),
            y: point.y - bbox.top * (this.height / bbox.height)
        };
    }
});