KChart.Painter = KChart.Object.extend({
	
    initialize: function(graphics, style) {
		this.graphics = graphics;
		this.setStyle(style);
	},

	draw: function(shape) {
		//this.setCxtStyle();

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
		this.graphics.beginPath();

		this.graphics.moveTo(polyline.vertexes[0].x, polyline.vertexes[0].y);

		for(var i = 1; i < polyline.vertexes.length; i++) {
			this.graphics.lineTo(polyline.vertexes[i].x, polyline.vertexes[i].y);
		}

		this.graphics.stroke();
		this.graphics.closePath();
	},

	drawPolygon: function(polygon) {
		this.graphics.beginPath();

		this.graphics.moveTo(polygon.vertexes[0].x, polygon.vertexes[0].y);

		for(var i = 1; i < polygon.vertexes.length; i++) {
			this.graphics.lineTo(polygon.vertexes[i].x, polygon.vertexes[i].y);
		}

		this.graphics.lineTo(polygon.vertexes[0].x, polygon.vertexes[0].y);

		this.graphics.closePath();

		this.graphics.stroke();
		this.graphics.fill(this.style.options.fillRule);
	},

	drawCircle: function(circle) {
		this.graphics.beginPath();

		this.graphics.arc(circle.vertexes[0].x, circle.vertexes[0].y, circle.radius, 0, 2 * Math.PI);

		this.graphics.closePath();

		this.graphics.stroke();
		this.graphics.fill(this.style.options.fillRule);
	},

	drawText: function (text, x, y) {
	    var oldFillColor = this.graphics.fillStyle;
	    this.graphics.fillStyle = this.style.fontColor;
	    this.graphics.textAlign = this.style.textAlign;
	    this.graphics.textBaseline = this.style.textBaseline;
	    this.graphics.fillText(text, x, y);
	    this.graphics.fillStyle = oldFillColor;
	},

	drawArc: function(arc) {
		this.graphics.beginPath();

		this.graphics.arc(arc.vertexes[0].x, arc.vertexes[0].y,
			arc.radius, arc.sAngle, arc.eAngle, arc.counterclockwise);

		this.graphics.stroke();
	},

	drawFan: function(fan) {
		this.graphics.beginPath();

		this.graphics.arc(fan.vertexes[0].x, fan.vertexes[0].y, fan.radius,
			fan.sAngle, fan.eAngle, fan.counterclockwise);

		this.graphics.lineTo(fan.vertexes[0].x, fan.vertexes[0].y);
		this.graphics.lineTo(fan.vertexes[0].x + fan.radius * Math.cos(fan.sAngle),
			fan.vertexes[0].y + fan.radius * Math.sin(fan.sAngle));

		this.graphics.closePath();

		this.graphics.stroke();
		this.graphics.fill(this.style.options.fillRule);
	},

	//setCanvas: function(canvas) {
	//	var c;

	//	if(canvas.constructor === KChart.Canvas) {
	//		c = document.createElement("canvas");
	//		c.width = canvas.width;
	//		c.height = canvas.height;
	//		c.style.background = canvas.bgColor;
	//		c.style.margin = '20px';
	//		document.body.appendChild(c);
	//	} else if(canvas.constructor === HTMLCanvasElement) {
	//		c = canvas;
	//	}

	//	this.canvas = c;
	//	this.graphics = c.getContext('2d');
	//	this.setCxtStyle();
	//},

	setStyle: function(style) {
		this.style = style || new KChart.Style();
		this.setCxtStyle();
	},

	setCxtStyle: function() {
		var options = this.style;
		var graphics = this.graphics;

		graphics.strokeStyle = options.stroke ? options.borderColor : "rgba(0,0,0,0)";
		graphics.fillStyle = options.fill ? options.fillColor : "rgba(0,0,0,0)";
		graphics.lineWidth = options.weight;
		graphics.lineCap = options.lineCap;
		graphics.lineJoin = options.lineJoin;
		if(Array.isArray(options.dashArray)) {
			graphics.setLineDash(options.dashArray);
		} else {
			graphics.setLineDash(new Array());
		}
		graphics.font = options.fontSize + ' ' + options.fontFamily;
	}
});