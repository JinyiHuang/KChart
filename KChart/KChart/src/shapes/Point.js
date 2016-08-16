KChart.Point = KChart.Shape.extend({
	
    initialize: function (x, y) {
        this.x = x;
        this.y = y;
        this.vertex = new KChart.Vertex(x, y);
        this.constructor.__base__.initialize.call(this, [this.vertex]);
    },

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