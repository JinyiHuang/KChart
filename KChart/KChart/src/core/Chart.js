//KChart.Chart = KChart.Object.extend({

//	initialize: function(width, height, data, title) {
//		this.width = width;
//		this.height = height;
//		this.data = data;
//		this.title = title;
//	},

//	draw: function(canvas, style) {

//		if(canvas) {
//			this.horizontalOffset = (canvas.width - this.width) / 2;
//			this.verticalOffset = (canvas.height - this.height) / 2;
//		} else {
//			this.horizontalOffset = this.width * 0.15;
//			this.verticalOffset = this.height * 0.15;
//			canvas = new KChart.Canvas(this.width + this.horizontalOffset * 2, this.height +
//				this.verticalOffset * 2, "#eeeeee");
//		}

//		style = style || new KChart.Style({
//			fill: true,
//			fillColor: "#50aaff"
//		});
//		var painter = this.painter = new KChart.Painter(canvas, style);

//		if(this.title) {
//			painter.drawText(this.title, this.width / 2 + this.horizontalOffset, 10);
//		}
//	}
//});

KChart.Chart = KChart.Object.extend({

    initialize: function (graphics, config) {
        this.config = config || {
            data: {
                values: []
            }
        };

        if (!graphics) {
            throw Error("The Argument 'graphics' Cannot Be Null");
        }
        if (!(graphics instanceof KChart.Graphics)) {
            throw Error("The Argument should be the instance of KChart.Graphics");
        }
        this.graphics = graphics;

        if (this.config.grid) {
            this.padingLeft = this.config.grid.left || KChart.Chart.defaultOptions.grid.left;
            this.padingRight = this.config.grid.right || KChart.Chart.defaultOptions.grid.right;
            this.padingTop = this.config.grid.top || KChart.Chart.defaultOptions.grid.top;
            this.padingBottom = this.config.grid.bottom || KChart.Chart.defaultOptions.grid.bottom;
        }
        else {
            this.padingLeft = KChart.Chart.defaultOptions.grid.left;
            this.padingRight = KChart.Chart.defaultOptions.grid.right;
            this.padingtTop = KChart.Chart.defaultOptions.grid.top;
            this.padingBottom = KChart.Chart.defaultOptions.grid.bottom;
        }
        this.width = this.graphics.width * (1 - this.padingLeft - this.padingRight);
        this.height = this.graphics.height * (1 - this.padingtTop - this.padingtTop);

        this.elementCount = KChart.Helper.getMax(this.config.data.values.length, (
                this.config.options && this.config.options.xAxis && this.config.options.xAxis.lables) ?
                this.config.options.xAxis.lables.length : 0);
    },

    draw: function () {

    },

    statics: {
        defaultOptions: {
            grid: {
                left: '3%',
                right: '3%',
                top: '3%',
                bottom: '3%'
            },

            xAxis: {
                style: new KChart.Style({
                    borderColor: 'black',
                    weight: '1px'
                }),
                visable: true,
                lables: []
            },

            yAxis: {
                minValue: 0,
                maxValue: Number.MAX_VALUE,
                style: new KChart.Style({
                    borderColor: 'black',
                    weight: '1px',
                    textAlign: 'right'
                }),
                visable: true
            }
        }
    }
});