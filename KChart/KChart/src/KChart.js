var KChart = {}; //As namespace

KChart.Util = {

	extend: function(dist) {
		var i, j, len, src;

		//Add the second and later arguments' properties to the first argument.
		for(i = 1, len = arguments.length; i < len; i++) {
			src = arguments[i];

			for(j in src) {
				dist[j] = src[j];
			}
		}

		return dist;
	},

	create: Object.create || function(proto) {
		function F() {};
		F.prototype = proto;
		return new F();
	}
};

KChart.Object = function() {};

KChart.Object.extend = function(props) {

	// @function extend(props: Object): Function
	// [Extends the current class](#class-inheritance) given the properties to be included.
	// Returns a Javascript function that is a class constructor (to be called with `new`).
	var NewClass = function() {
		if(this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};

	/*
	 * NewClass.__root__ points to Object's prototype
	 * NewClass__base__ points to its parent's prototype
	 */
	var parentProto = NewClass.__root__ = NewClass.__base__ = this.prototype;
	var proto = KChart.Util.create(parentProto);
	proto.constructor = NewClass;
	NewClass.prototype = proto;

	// inherit parent's statics
	var i;
	for(i in this) {
		if(this.hasOwnProperty(i) && i != 'prototype' && i != '__base__') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if(props.statics) {
		KChart.Util.extend(NewClass, props.statics);
		delete props.statics;
	}

	// merge options
	if(proto.options) {
		proto.options = KChart.Util.extend(KChart.Util.create(proto.options), props.options);
		delete props.options;
	}

	// merge options
	KChart.Util.extend(proto, props);

	return NewClass;
};

KChart.myEvent = {

	addListener: function(elem, type, handler) {

		if(elem.addEventListener) {
			elem.addEventListener(type, handler, false);
		} else if(elem.attachEvent) {
			elem.attachEvent("on" + type, handler);
		} else {

			if(typeof elem["on" + type] === 'function') {
				var oldHandler = elem["on" + type];
				elem["on" + type] = function() {
					oldHandler();
					handler();
				}
			} else {
				elem["on" + type] = handler;
			}
		}
	},

	getEvent: function(event) {
		return event ? event : window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	preventDefault: function(event) {

		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeListener: function(elem, type, handler) {

		if(elem.removeEventListener) {
			elem.removeEventListener(type, handler, false);
		} else if(elem.detachEvent) {
			elem.detachEvent("on" + type, handler);
		} else {
			elem["on" + type] = null;
		}
	},

	stopPropagation: function(event) {

		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},

	getRelatedTarget: function(event) {

		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if(event.toElement && event.type == "mouseout") {
			return event.toElement;
		} else if(event.fromElement && event.type == "mouseover") {
			return event.fromElement;
		} else {
			return null;
		}
	},

	getButton: function(event) {

		if(document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
					break;
				case 2:
				case 6:
					return 2;
					break;
				case 4:
					return 1;
					break;
				default:
					break;
			}
		}
	},

	getCharCode: function(event) {

		if(typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}
};

KChart.Vertex = KChart.Object.extend({

	initialize: function(x, y) {
		this.x = x;
		this.y = y;
	}
});

KChart.Shape = KChart.Object.extend({

	initialize: function(vertexes) {

		if(!Array.isArray(vertexes)) {
			console.log("the type of argument should be [Array]");
		}

		this.vertexes = vertexes;
	},

	getPerimeter: function() {
		console.log("not implemented.");
	},

	getArea: function() {
		console.log("not implemented.");
	},

	resize: function(vertexIndex, multiple) {

		if(vertexIndex > this.vertexes.length - 1) {
			console.log("Index out of arrange");
		}

		var standardVertex = this.vertexes[vertexIndex];

		for(var i = 0; i < this.vertexes.length; i++) {
			this.vertexes[i].x = standardVertex.x -
				(standardVertex.x - this.vertexes[i].x) * multiple;
			this.vertexes[i].y = standardVertex.y -
				(standardVertex.y - this.vertexes[i].y) * multiple;
		}
	},

	move: function(veticalOffset, horizontalOffset) {

		for(var i = 0; i < this.vertexes.length; i++) {
			this.vertexes[i].x += veticalOffset;
			this.vertexes[i].y += horizontalOffset;
		}
	}
});

KChart.Style = KChart.Object.extend({

	initialize: function(options) {
		KChart.Util.extend(this, this.options);
		KChart.Util.extend(this, options);
	},

	options: {
		stroke: true,
		color: '#3388ff',
		weight: 3,
		opacity: 1,
		lineCap: 'round',
		lineJoin: 'round',
		dashArray: null,
		dashOffset: null,
		fill: false,
		fillColor: null,
		fillOpacity: 0.2,
		fillRule: 'evenodd'
	}
});

KChart.Canvas = KChart.Object.extend({

	initialize: function(width, height, bgColor) {
		this.width = width;
		this.height = height;
		this.bgColor = bgColor || "black";
	}
});

KChart.Painter = KChart.Object.extend({

	initialize: function(canvas, style) {
		this.style = new KChart.Style();
		this.setCanvas(canvas);
		this.setStyle(style);
	},

	draw: function(shape) {
		this.setCxtStyle();

		switch(shape.constructor) {
			case KChart.Point:
				this.drawPoint(shape.vertexes[0]);
				break;
			case KChart.PolyLine:
				this.drawPolyline(shape);
				break;
			case KChart.Polygon:
				this.drawPolygon(shape);
				break;
			case KChart.Circle:
				this.drawCircle(shape);
				break;
			case KChart.Arc:
				this.drawArc(shape);
				break;
			case KChart.Fan:
				this.drawFan(shape);
				break;
			default:
				return "wrong shape";
				break;
		}
	},

	drawPoint: function(vertex) {
		var circlePoint = new KChart.Circle(vertex, 1);
		this.drawCircle(circlePoint);
	},

	drawPolyline: function(polyline) {
		this.cxt.beginPath();

		this.cxt.moveTo(polyline.vertexes[0].x, polyline.vertexes[0].y);

		for(var i = 1; i < polyline.vertexes.length; i++) {
			this.cxt.lineTo(polyline.vertexes[i].x, polyline.vertexes[i].y);
		}

		this.cxt.stroke();
		this.cxt.closePath();
	},

	drawPolygon: function(polygon) {
		this.cxt.beginPath();

		this.cxt.moveTo(polygon.vertexes[0].x, polygon.vertexes[0].y);

		for(var i = 1; i < polygon.vertexes.length; i++) {
			this.cxt.lineTo(polygon.vertexes[i].x, polygon.vertexes[i].y);
		}

		this.cxt.lineTo(polygon.vertexes[0].x, polygon.vertexes[0].y);

		this.cxt.closePath();

		this.cxt.stroke();
		this.cxt.fill(this.style.options.fillRule);
	},

	drawCircle: function(circle) {
		this.cxt.beginPath();

		this.cxt.arc(circle.vertexes[0].x, circle.vertexes[0].y, circle.radius, 0, 2 * Math.PI);

		this.cxt.closePath();

		this.cxt.stroke();
		this.cxt.fill(this.style.options.fillRule);
	},

	drawText: function(text, x, y) {
		this.cxt.fillStyle = 'black';
		this.cxt.textAlign = "center";
		this.cxt.fillText(text, x, y);
	},

	drawArc: function(arc) {
		this.cxt.beginPath();

		this.cxt.arc(arc.vertexes[0].x, arc.vertexes[0].y,
			arc.radius, arc.sAngle, arc.eAngle, arc.counterclockwise);

		this.cxt.stroke();
	},

	drawFan: function(fan) {
		this.cxt.beginPath();

		this.cxt.arc(fan.vertexes[0].x, fan.vertexes[0].y, fan.radius,
			fan.sAngle, fan.eAngle, fan.counterclockwise);

		this.cxt.lineTo(fan.vertexes[0].x, fan.vertexes[0].y);
		this.cxt.lineTo(fan.vertexes[0].x + fan.radius * Math.cos(fan.sAngle),
			fan.vertexes[0].y + fan.radius * Math.sin(fan.sAngle));

		this.cxt.closePath();

		this.cxt.stroke();
		this.cxt.fill(this.style.options.fillRule);
	},

	setCanvas: function(canvas) {
		var c;

		if(canvas.constructor === KChart.Canvas) {
			c = document.createElement("canvas");
			c.width = canvas.width;
			c.height = canvas.height;
			c.style.background = canvas.bgColor;
			c.style.margin = '20px';
			document.body.appendChild(c);
		} else if(canvas.constructor === HTMLCanvasElement) {
			c = canvas;
		}

		this.canvas = c;
		this.cxt = c.getContext('2d');
		this.setCxtStyle();
	},

	setStyle: function(style) {
		this.style = style || new KChart.Style();
		this.setCxtStyle();
	},

	setCxtStyle: function() {
		var options = this.style;
		var cxt = this.cxt;

		cxt.strokeStyle = options.stroke ? options.color : "rgba(0,0,0,0)";
		cxt.fillStyle = options.fill ? options.fillColor : "rgba(0,0,0,0)";
		cxt.lineWidth = options.weight;
		cxt.lineCap = options.lineCap;
		cxt.lineJoin = options.lineJoin;
		if(Array.isArray(options.dashArray)) {
			cxt.setLineDash(options.dashArray);
		} else {
			cxt.setLineDash(new Array());
		}
	}
});

KChart.Animation = KChart.Object.extend({

	initialize: function(start, end, tween) {
		this.start = start;
		this.end = end;
		this.tween = tween || KChart.helper.Tween.Linear;
	},

	drawAnimation: function(chart) {}
});

KChart.Axis = KChart.Object.extend({

	initialize: function(basePoint, width, height, unitWidth, unitHeight) {
		this.basePoint = basePoint;
		this.width = width;
		this.height = height;
		this.unitWidth = unitWidth;
		this.unitHeight = unitHeight;
	},

	drawXAxis: function(painter, keys) {
		painter.setStyle(new KChart.Style({
			color: 'black',
			dashArray: null
		}));

		var horizontalOffset = this.basePoint.x,
			height = this.basePoint.y;

		var x = new KChart.PolyLine([this.basePoint, new KChart.Vertex(horizontalOffset + this.width, height)]);
		painter.draw(x);

		for(var i = 0; i < keys.length; i++) {
			var textLen = keys[i].length;

			for(var j = 0; j < textLen; j++) {
				painter.drawText(keys[i][j],
					(i + 0.5) * this.unitWidth + horizontalOffset,
					height + 20 + 15 * j);
			}
		}
	},

	drawYAxis: function(painter, values) {
		painter.setStyle(new KChart.Style({
			color: 'black',
			dashArray: null
		}));

		var horizontalOffset = this.basePoint.x,
			vertexOffset = height - this.height,
			height = this.basePoint.y;

		var y = new KChart.PolyLine([this.basePoint, new KChart.Vertex(horizontalOffset, height - this.height)]);
		painter.draw(y);

		var unitHeight = this.unitHeight,
			unitWidth = this.unitWidth;

		var vertex = KChart.Vertex;

		painter.setStyle(new KChart.Style({
			color: "black",
			weight: 1,
			fill: true,
			fillColor: "black",
			dashArray: [6, 12]
		}));

		for(var i = 0; i < values.length; i++) {
			var polyline = new KChart.PolyLine([
				new vertex(horizontalOffset, height - values[i] * unitHeight),
				new vertex((i + 0.5) * unitWidth + horizontalOffset, height - values[i] * unitHeight)
			]);
			painter.draw(polyline);

			painter.cxt.textAlign = "right";
			painter.cxt.fillText(values[i], horizontalOffset - 5, height - values[i] * unitHeight);
		}
	}
});

KChart.Handler = KChart.Object.extend({

	initialize: function(chart) {
		this.chart = chart;

		var div = document.getElementById('floatDiv');

		if(!div) {
			div = document.createElement('div');
			div.id = 'floatDiv';
			div.style.position = 'absolute';
			div.style.background = 'rgba(255,255,255,0.5)';
			div.zIndex = 888;
			document.body.appendChild(div);
		}

		this.div = div;
	},

	handle: function(e) {}
});

KChart.helper = {

	getMax: function(values) {
		var max = values[0];
		for(var i = 1; i < values.length; i++) {

			if(max < values[i]) {
				max = values[i];
			}
		}

		return max;
	},

	getMin: function(values) {
		var min = values[0];
		for(var i = 1; i < values.length; i++) {

			if(min > values[i]) {
				min = values[i];
			}
		}

		return min;
	},

	//Transform the point's position from relative to client to relative to the canvas.
	getPointOnCanvas: function(canvas, point) {
		var bbox = canvas.getBoundingClientRect();

		return {
			x: point.x - bbox.left * (canvas.width / bbox.width),
			y: point.y - bbox.top * (canvas.height / bbox.height)
		};
	},

	//Add Event to chart
	addEvent: function(chart, eventType) {

		switch(eventType) {
			case 'mousemove':
				var handler = new KChart.HoverHandler(chart);
				KChart.myEvent.addListener(chart.painter.canvas, eventType, function(e) {
					handler.handle.call(handler, e);
				});
			default:
				break;
		}
	},

	/*
	 * According to the eles' type judge whether mp is in the range of one of eles.
	 * If so, return the index of the ele.
	 */
	inRange: function(mp, eles) {
		switch(eles[0].constructor) {
			case KChart.Polygon:
				return this.inPolygonRange(mp, eles);
				break;
			case KChart.Circle:
				return this.inCircleRange(mp, eles);
				break;
			case KChart.Fan:
				return this.inFanRange(mp, eles);
				break;
			default:
				throw new Error("not implemented.");
				break;
		}
	},

	inPolygonRange: function(mp, eles) {
		var mouseX = mp.x,
			mouseY = mp.y;

		for(var i = 0; i < eles.length; i++) {
			var minX = eles[i].vertexes[1].x,
				minY = eles[i].vertexes[1].y,
				maxX = eles[i].vertexes[3].x,
				maxY = eles[i].vertexes[3].y;

			if(mouseX >= minX &&
				mouseX <= maxX &&
				mouseY >= minY &&
				mouseY <= maxY) {

				return i;
			}
		}

		return -1;
	},

	inCircleRange: function(mp, eles) {
		var mouseX = mp.x,
			mouseY = mp.y;

		for(var i = 0; i < eles.length; i++) {
			var x = eles[i].vertexes[0].x,
				y = eles[i].vertexes[0].y,
				radius = eles[i].radius;

			if((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) <= Math.pow(radius, 2)) {
				return i;
			}
		}

		return -1;
	},

	inFanRange: function(mp, eles) {
		var mouseX = mp.x,
			mouseY = mp.y;

		for(var i = 0; i < eles.length; i++) {
			var x = eles[i].vertexes[0].x,
				y = eles[i].vertexes[0].y,
				radius = eles[i].radius;

			if((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) <= Math.pow(radius, 2)) {
				var difX = mouseX - x,
					difY = mouseY - y;
				var angle = Math.atan(difY / difX);

				if(difX >= 0 && difY >= 0) {
					angle = angle;
				} else if(difX >= 0 & difY < 0) {
					angle += Math.PI * 2;
				} else {
					angle += Math.PI;
				}

				if(angle >= eles[i].sAngle && angle <= eles[i].eAngle) {
					return i;
				}
			}
		}

		return -1;
	},

	requestAnimFrame: window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			return window.setTimeout(callback, 1000 / 60);
		},

	cancelAnimFrame: window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		window.msCancelAnimationFrame ||
		function(callback) {
			return window.clearTimeout(callback, 1000 / 60);
		},

	Tween: {
		Linear: function(t, b, c, d) {
			return c * t / d + b;
		},
		Quad: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOut: function(t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) return c / 2 * t * t + b;
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut: function(t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut: function(t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut: function(t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function(t, b, c, d) {
				return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut: function(t, b, c, d) {
				return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if(t == 0) return b;
				if(t == d) return b + c;
				if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function(t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut: function(t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function(t, b, c, d, a, p) {
				var s;
				if(t == 0) return b;
				if((t /= d) == 1) return b + c;
				if(typeof p == "undefined") p = d * .3;
				if(!a || a < Math.abs(c)) {
					s = p / 4;
					a = c;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut: function(t, b, c, d, a, p) {
				var s;
				if(t == 0) return b;
				if((t /= d) == 1) return b + c;
				if(typeof p == "undefined") p = d * .3;
				if(!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			},
			easeInOut: function(t, b, c, d, a, p) {
				var s;
				if(t == 0) return b;
				if((t /= d / 2) == 2) return b + c;
				if(typeof p == "undefined") p = d * (.3 * 1.5);
				if(!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			}
		},
		Back: {
			easeIn: function(t, b, c, d, s) {
				if(typeof s == "undefined") s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut: function(t, b, c, d, s) {
				if(typeof s == "undefined") s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut: function(t, b, c, d, s) {
				if(typeof s == "undefined") s = 1.70158;
				if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function(t, b, c, d) {
				return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut: function(t, b, c, d) {
				if((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if(t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if(t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOut: function(t, b, c, d) {
				if(t < d / 2) {
					return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				} else {
					return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
				}
			}
		}
	}
};

KChart.Chart = KChart.Object.extend({

	initialize: function(width, height, data, title) {
		this.width = width;
		this.height = height;
		this.data = data;
		this.title = title;
	},

	draw: function(canvas, style) {

		if(canvas) {
			this.horizontalOffset = (canvas.width - this.width) / 2;
			this.verticalOffset = (canvas.height - this.height) / 2;
		} else {
			this.horizontalOffset = this.width * 0.15;
			this.verticalOffset = this.height * 0.15;
			canvas = new KChart.Canvas(this.width + this.horizontalOffset * 2, this.height +
				this.verticalOffset * 2, "#eeeeee");
		}

		style = style || new KChart.Style({
			fill: true,
			fillColor: "#50aaff"
		});
		var painter = this.painter = new KChart.Painter(canvas, style);

		if(this.title) {
			painter.drawText(this.title, this.width / 2 + this.horizontalOffset, 10);
		}
	}
});

KChart.BarAnimation = KChart.Animation.extend({

	initialize: function(start, end, tween) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	drawAnimation: function(chart) {
		var height = chart.height,
			width = chart.width,
			horizontalOffset = chart.horizontalOffset,
			verticalOffset = chart.verticalOffset,
			realHeight = height + verticalOffset,
			painter = chart.painter,
			values = chart.values,
			count = values.length,
			unitWidth = chart.unitWidth,
			unitHeight = chart.unitHeight;

		var vertex = KChart.Vertex;

		var index = 0;
		var me = this,
			t = me.start,
			d = me.end,
			b = 0,
			c = values[index] * unitHeight;

		KChart.helper.requestAnimFrame.call(window, draw);

		function draw() {
			t++;
			var heightCh = me.tween(t, b, c, d);

			var polygon = new KChart.Polygon(
				[new vertex((index + 0.25) * unitWidth + horizontalOffset, realHeight),
					new vertex((index + 0.25) * unitWidth + horizontalOffset, realHeight - heightCh),
					new vertex((index + 0.75) * unitWidth + horizontalOffset, realHeight - heightCh),
					new vertex((index + 0.75) * unitWidth + horizontalOffset, realHeight)
				]);
			painter.draw(polygon);

			if(t < d) {
				KChart.helper.requestAnimFrame.call(window, draw);
			} else {
				index++;

				if(index == count) {
					KChart.helper.cancelAnimFrame.call(window, draw);
				} else {
					t = me.start,
						d = me.end,
						b = 0,
						c = values[index] * unitHeight;
					KChart.helper.requestAnimFrame.call(window, draw);
				}
			}
		};
	}
});

KChart.FanAnimation = KChart.Animation.extend({

	initialize: function(start, end, base, tween) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	drawAnimation: function(chart) {
		var colors = chart.colors,
			fans = chart.eles,
			painter = chart.painter;

		var index = 0;

		var me = this,
			t = me.start,
			d = me.end,
			b = fans[index].sAngle,
			c = fans[index].eAngle - fans[index].sAngle;

		var center = fans[index].vertexes[0],
			radius = fans[index].radius;

		var newStyle = new KChart.Style({
			weight: 0,
			fill: true,
			fillColor: colors[index]
		});
		painter.setStyle(newStyle);

		KChart.helper.requestAnimFrame.call(window, draw);

		function draw() {
			t++;
			var angelCh = me.tween(t, b, c, d);

			var fan = new KChart.Fan(center, radius, b, angelCh);
			painter.draw(fan);

			if(t < d) {
				KChart.helper.requestAnimFrame.call(window, draw);
			} else {
				index++;

				if(index == 6) {
					KChart.helper.cancelAnimFrame.call(window, draw);
				} else {
					t = me.start,
						d = me.end,
						b = fans[index].sAngle,
						c = fans[index].eAngle - fans[index].sAngle;

					center = fans[index].vertexes[0],
						radius = fans[index].radius;

					newStyle = new KChart.Style({
						weight: 0,
						fill: true,
						fillColor: colors[index]
					});
					painter.setStyle(newStyle);

					KChart.helper.requestAnimFrame.call(window, draw);
				}
			}
		}
	}
});

KChart.LineAnimation = KChart.Animation.extend({

	initialize: function(start, end, base, tween) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	drawAnimation: function(chart) {
		var vertex = KChart.Vertex,
			vertexes = chart.vertexes,
			count = vertexes.length,
			painter = chart.painter;

		var index = 0;

		var me = this,
			t = me.start,
			d = me.end,
			b = vertexes[index].x,
			c = vertexes[index + 1].x - vertexes[index].x;

		var k = (vertexes[index].y - vertexes[index + 1].y) /
			(vertexes[index].x - vertexes[index + 1].x),
			a = vertexes[index].y - k * vertexes[index].x;

		KChart.helper.requestAnimFrame.call(window, draw);

		function draw() {
			t++;
			var xCh = me.tween(t, b, c, d);

			var line = new KChart.PolyLine([vertexes[index], new KChart.Vertex(xCh, k * xCh + a)]);
			painter.draw(line);

			if(t < d) {
				KChart.helper.requestAnimFrame.call(window, draw);
			} else {
				index++;

				if(index == count - 1) {
					KChart.helper.cancelAnimFrame.call(window, draw);
				} else {

					t = me.start,
						d = me.end,
						b = vertexes[index].x,
						c = vertexes[index + 1].x - vertexes[index].x;

					k = (vertexes[index].y - vertexes[index + 1].y) /
						(vertexes[index].x - vertexes[index + 1].x),
						a = vertexes[index].y - k * vertexes[index].x;

					KChart.helper.requestAnimFrame.call(window, draw);
				}
			}
		};
	}
});

KChart.HoverHandler = KChart.Handler.extend({

	initialize: function(chart) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	handle: function(e) {
		var chart = this.chart,
			div = this.div;

		e = KChart.myEvent.getEvent(e);

		var mousePosition = KChart.helper.getPointOnCanvas(chart.painter.canvas, {
			x: e.clientX,
			y: e.clientY
		});

		var index = KChart.helper.inRange(mousePosition, chart.eles);

		if(index != -1) {
			div.width = 100;
			div.height = 100;
			div.style.left = e.pageX + 10 + 'px';
			div.style.top = e.pageY + 10 + 'px';
			div.innerHTML = chart.keys[index] + ' : ' + chart.values[index];
		} else {
			div.width = 0;
			div.height = 0;
			div.innerHTML = '';
		}
	}
});

KChart.Arc = KChart.Shape.extend({

	initialize: function(center, radius, sAngle, eAngle, counterclockwise) {
		this.vertexes = [center];
		this.center = center;
		this.radius = radius;
		this.sAngle = sAngle;
		this.eAngle = eAngle;
		this.counterclockwise = counterclockwise;
	},

	getPerimeter: function() {
		return 2 * Math.PI * this.radius;
	},

	getArea: function() {
		return Math.PI * Math.pow(this.radius, 2);
	},

	resize: function(multiple) {
		this.radius *= multiple;
	}
});

KChart.Circle = KChart.Shape.extend({

	initialize: function(center, radius) {
		this.vertexes = [center];
		this.center = center;
		this.radius = radius;
	},

	getPerimeter: function() {
		return 2 * Math.PI * this.radius;
	},

	getArea: function() {
		return Math.PI * Math.pow(this.radius, 2);
	},

	resize: function(multiple) {
		this.radius *= multiple;
	}
});

KChart.Fan = KChart.Shape.extend({

	initialize: function(center, radius, sAngle, eAngle, counterclockwise) {
		this.center = center;
		this.vertexes = [center];
		this.radius = radius;
		this.sAngle = sAngle;
		this.eAngle = eAngle;
		this.counterclockwise = counterclockwise;
	},

	getPerimeter: function() {
		return 2 * (Math.PI * this.radius + this.radius);
	},

	getArea: function() {
		return Math.PI * Math.pow(this.radius, 2);
	},

	resize: function(multiple) {
		this.radius *= multiple;
	}
});

KChart.Point = KChart.Shape.extend({

	getPerimeter: function() {
		return 0;
	},

	getArea: function() {
		return 0;
	},

	resize: function(multiple) {
		console.log("not implemented.");
	}
});

KChart.Polygon = KChart.Shape.extend({

	getPerimeter: function() {
		var perimeter = 0;

		for(var i = 0; i < this.vertexes.length - 1; i++) {
			perimeter += Math.sqrt(Math.pow(this.vertexes[i + 1].x - this.vertexes[i].x, 2) +
				Math.pow(this.vertexes[i + 1].y - this.vertexes[i].y, 2));
		}

		perimeter += Math.sqrt(Math.pow(this.vertexes[0].x - this.vertexes[this.vertexes.length - 1].x, 2) +
			Math.pow(this.vertexes[0].y - this.vertexes[this.vertexes.length - 1].y, 2));
		return perimeter;
	},

	getArea: function() {
		var area = 0,
			originX, originY, point1, point2;
		var length = this.vertexes.length;

		originX = this.vertexes[0].x;
		originY = this.vertexes[0].y;

		for(var i = 1; i < length - 1; i++) {
			point1 = this.vertexes[i];
			point2 = this.vertexes[i + 1];

			area += (point1.x - originX) * (point2.y - originY) - (point1.y - originY) * (point2.x - originX);
		}

		return Math.abs(area) / 2;
	}
});

KChart.PolyLine = KChart.Shape.extend({

	getPerimeter: function() {
		var perimeter = 0;

		for(var i = 0; i < this.vertexes.length - 1; i++) {
			perimeter += Math.sqrt(Math.pow(this.vertexes[i + 1].x - this.vertexes[i].x, 2) +
				Math.pow(this.vertexes[i + 1].y - this.vertexes[i].y, 2));
		}

		return perimeter;
	},

	getArea: function() {
		return 0;
	}
});

KChart.BarChart = KChart.Chart.extend({

	initialize: function(width, height, data, title) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	draw: function(canvas, style) {

		this.constructor.__base__.draw.apply(this, arguments);

		var helper = KChart.helper,

			height = this.height,
			width = this.width,
			horizontalOffset = this.horizontalOffset,
			verticalOffset = this.verticalOffset,
			data = this.data,
			realHeight = height + verticalOffset,

			painter = this.painter,
			oldStyle = painter.style;

		var keys = this.keys = Object.keys(data),
			count = keys.length,
			values = this.values = [];

		for(var i = 0; i < count; i++) {
			values.push(data[keys[i]]);
		}

		var max = helper.getMax(values),
			unitWidth = this.unitWidth = width / count,
			unitHeight = this.unitHeight = (height * 0.95) / max;

		var vertex = KChart.Vertex;
		var polygons = this.eles = [];

		for(var i = 0; i < count; i++) {
			var polygon = new KChart.Polygon(
				[new vertex((i + 0.25) * unitWidth + horizontalOffset, realHeight),
					new vertex((i + 0.25) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight),
					new vertex((i + 0.75) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight),
					new vertex((i + 0.75) * unitWidth + horizontalOffset, realHeight)
				]);
			polygons.push(polygon);
		}

		//helper.drawXYAxis(painter, offset / 2);
		var axis = new KChart.Axis(new vertex(horizontalOffset, realHeight), width, height, unitWidth, unitHeight);
		axis.drawXAxis(painter, keys);
		axis.drawYAxis(painter, values);

		painter.setStyle(oldStyle);
		var animation = new KChart.BarAnimation(0, 15);
		animation.drawAnimation(this);

		helper.addEvent(this, 'mousemove');
	}
});

KChart.FanChart = KChart.Chart.extend({

	initialize: function(width, height, data, title) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	draw: function(canvas, style) {

		this.constructor.__base__.draw.apply(this, arguments);

		var helper = KChart.helper,

			painter = this.painter,
			oldStyle = painter.style;

		var centerX = this.width / 2 + this.horizontalOffset,
			centerY = this.height / 2 + this.verticalOffset,
			radius = centerX < centerY ? centerX * 0.8 : centerY * 0.8,
			data = this.data;

		var keys = this.keys = Object.keys(data),
			count = keys.length,
			values = this.values = [],
			amount = 0;

		for(var i = 0; i < count; i++) {
			values.push(data[keys[i]]);
			amount += data[keys[i]];
		}

		var max = helper.getMax(values);

		var vertex = KChart.Vertex;
		var fans = this.eles = [],
			colors = this.colors = [];

		var sAngle = 0,
			eAngle, realRadius;
		var newStyle;

		for(var i = 0; i < count; i++) {
			realRadius = radius * (values[i] / max);
			eAngle = (values[i] / amount) * 2 * Math.PI + sAngle;

			var fan = new KChart.Fan(new KChart.Vertex(centerX, centerY), realRadius, sAngle, eAngle);
			fans.push(fan);

			sAngle = eAngle;

			var rRandom = Math.round(Math.random() * 255),
				gRandom = Math.round(Math.random() * 255),
				bRandom = Math.round(Math.random() * 255);
			var colorStr = 'rgb(' + rRandom + ',' + gRandom + ',' + bRandom + ')';
			colors.push(colorStr);
		}

		painter.setStyle(oldStyle);
		var animation = new KChart.FanAnimation(0, 15);
		animation.drawAnimation(this);

		helper.addEvent(this, 'mousemove');
	}

});

KChart.LineChart = KChart.Chart.extend({

	initialize: function(width, height, data, title) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	draw: function(canvas, style) {

		this.constructor.__base__.draw.apply(this, arguments);

		var helper = KChart.helper,

			height = this.height,
			width = this.width,
			horizontalOffset = this.horizontalOffset,
			verticalOffset = this.verticalOffset,
			data = this.data,
			realHeight = height + verticalOffset,

			painter = this.painter,
			oldStyle = painter.style;

		var keys = this.keys = Object.keys(data),
			count = keys.length,
			values = this.values = [];

		for(var i = 0; i < count; i++) {
			values.push(data[keys[i]]);
		}

		var max = helper.getMax(values),
			unitWidth = this.unitWidth = width / count,
			unitHeight = this.unitHeight = (height * 0.95) / max;

		var vertex = KChart.Vertex;
		var vertexes = this.vertexes = [];

		for(var i = 0; i < count; i++) {
			vertexes.push(new vertex((i + 0.5) * unitWidth + horizontalOffset, realHeight - values[i] * unitHeight));
		}

		var axis = new KChart.Axis(new vertex(horizontalOffset, realHeight), width, height, unitWidth, unitHeight);
		axis.drawXAxis(painter, keys);
		axis.drawYAxis(painter, values);

		painter.setStyle(new KChart.Style({
			color: "red",
			fill: true,
			fillColor: "#eeeeee",
			dashArray: null
		}));

		this.eles = [];
		var circle;

		for(var i = 0; i < count; i++) {
			var circle = new KChart.Circle(vertexes[i], 3);
			painter.draw(circle);

			this.eles.push(circle);
		}

		painter.setStyle(oldStyle);
		var animation = new KChart.LineAnimation(0, 15);
		animation.drawAnimation(this);

		helper.addEvent(this, 'mousemove');
	}
});