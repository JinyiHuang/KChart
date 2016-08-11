KChart.Shape = KChart.Object.extend({

    initialize: function (vertexes) {

        if (!Array.isArray(vertexes)) {
            console.log("the type of argument should be [Array]");
        }

        this.vertexes = vertexes;
    },

    getPerimeter: function () {
        console.log("not implemented.");
    },

    getArea: function () {
        console.log("not implemented.");
    },

    resize: function (vertexIndex, multiple) {

        if (vertexIndex > this.vertexes.length - 1) {
            console.log("Index out of arrange");
        }

        var standardVertex = this.vertexes[vertexIndex];

        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].x = standardVertex.x -
				(standardVertex.x - this.vertexes[i].x) * multiple;
            this.vertexes[i].y = standardVertex.y -
				(standardVertex.y - this.vertexes[i].y) * multiple;
        }
    },

    move: function (veticalOffset, horizontalOffset) {

        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].x += veticalOffset;
            this.vertexes[i].y += horizontalOffset;
        }
    }
});