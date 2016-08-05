KChart.Circle = KChart.Shape.extend({
	
	initialize: function(center, radius) {
		this.vertexes = [center];
		this.center=center;
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