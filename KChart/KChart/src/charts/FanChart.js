Drawing.FanChart = Drawing.Chart.extend({

	initialize: function(width, height, data, title) {
		this.constructor.__base__.initialize.apply(this, arguments);
	},

	draw: function(canvas, style) {

		this.constructor.__base__.draw.apply(this, arguments);

		var helper = Drawing.helper,

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

		var vertex = Drawing.Vertex;
		var fans = this.eles = [],
			colors = this.colors = [];

		var sAngle = 0,
			eAngle, realRadius;
		var newStyle;

		for(var i = 0; i < count; i++) {
			realRadius = radius * (values[i] / max);
			eAngle = (values[i] / amount) * 2 * Math.PI + sAngle;

			var fan = new Drawing.Fan(new Drawing.Vertex(centerX, centerY), realRadius, sAngle, eAngle);
			fans.push(fan);

			sAngle = eAngle;

			var rRandom = Math.round(Math.random() * 255),
				gRandom = Math.round(Math.random() * 255),
				bRandom = Math.round(Math.random() * 255);
			var colorStr = 'rgb(' + rRandom + ',' + gRandom + ',' + bRandom + ')';
			colors.push(colorStr);
		}

		painter.setStyle(oldStyle);
		var animation = new Drawing.FanAnimation(0, 15);
		animation.drawAnimation(this);

		helper.addEvent(this, 'mousemove');
	}

});