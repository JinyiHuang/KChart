Drawing.Arc = Drawing.Shape.extend({
	
	initialize: function(center, radius, sAngle, eAngle, counterclockwise) {
		this.vertexes = [center];
		this.center=center;
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