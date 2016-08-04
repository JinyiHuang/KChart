Drawing.Style = Drawing.Object.extend({
	
	initialize: function(options) {
		Drawing.Util.extend(this, this.options);
		Drawing.Util.extend(this, options);
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

Drawing.Canvas = Drawing.Object.extend({
	
	initialize: function(width, height, bgColor) {
		this.width = width;
		this.height = height;
		this.bgColor = bgColor || "black";
	}
});

Drawing.Painter = Drawing.Object.extend({
	
	initialize: function(canvas, style) {
		this.style = new Drawing.Style();
		this.setCanvas(canvas);
		this.setStyle(style);
	},

	draw: function(shape) {
		this.setCxtStyle();

		switch(shape.constructor) {
			case Drawing.Point:
				this.drawPoint(shape.vertexes[0]);
				break;
			case Drawing.PolyLine:
				this.drawPolyline(shape);
				break;
			case Drawing.Polygon:
				this.drawPolygon(shape);
				break;
			case Drawing.Circle:
				this.drawCircle(shape);
				break;
			case Drawing.Arc:
				this.drawArc(shape);
				break;
			case Drawing.Fan:
				this.drawFan(shape);
				break;
			default:
				return "wrong shape";
				break;
		}
	},

	drawPoint: function(vertex) {
		var circlePoint = new Drawing.Circle(vertex, 1);
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

		if(canvas.constructor === Drawing.Canvas) {
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
		this.style = style || new Drawing.Style();
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