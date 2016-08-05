KChart.Canvas = KChart.Object.extend({

    initialize: function (width, height, bgColor) {
        this.width = width;
        this.height = height;
        this.bgColor = bgColor || "black";
    }
});