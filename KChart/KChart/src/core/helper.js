Drawing.helper = {

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
				var handler = new Drawing.HoverHandler(chart);
				Drawing.myEvent.addListener(chart.painter.canvas, eventType, function(e) {
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
			case Drawing.Polygon:
				return this.inPolygonRange(mp, eles);
				break;
			case Drawing.Circle:
				return this.inCircleRange(mp, eles);
				break;
			case Drawing.Fan:
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