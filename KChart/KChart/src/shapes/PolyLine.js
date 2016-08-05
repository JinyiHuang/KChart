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