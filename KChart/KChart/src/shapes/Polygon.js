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