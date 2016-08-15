KChart.Chart = KChart.Object.extend({

    initialize: function (graphics, config) {
        this.config = config || KChart.Chart.defaultConfig;

        if (!graphics) {
            throw Error("The Argument 'graphics' Cannot Be Null");
        }
        this.graphics = graphics;

        var grid = this.config.grid || KChart.Chart.defaultConfig.grid,
            defaultGrid = KChart.Chart.defaultConfig.grid;
        this.padingLeft = grid.left || defaultGrid.left;
        this.padingRight = grid.right || defaultGrid.right;
        this.padingTop = grid.top || defaultGrid.top;
        this.padingBottom = grid.bottom || defaultGrid.bottom;

        this.width = graphics.width * (1 - Number.parseFloat(this.padingLeft) / 100 - Number.parseFloat(this.padingRight) / 100);
        this.height = graphics.height * (1 - Number.parseFloat(this.padingTop) / 100 - Number.parseFloat(this.padingBottom) / 100);

        var valueLength = this.config.data.values.length,
            labelLength = this.config.xAxis.labels.length;
        this.elementCount = valueLength > labelLength ? valueLength : labelLength;
    },

    draw: function () {

    },

    statics: {
        defaultConfig: {
            grid: {
                left: '5%',
                right: '5%',
                top: '5%',
                bottom: '5%'
            },

            xAxis: {
                style: new KChart.Style({
                    borderColor: 'black',
                    weight: '1px',
                    fill: true,
                    fillColor: 'black'
                }),
                labels: []
            },

            yAxis: {
                style: new KChart.Style({
                    borderColor: 'black',
                    weight: '1px',
                    textAlign: 'right'
                }),
                valueLineStyle: new KChart.Style({
                    borderColor: '#ccc',
                    weight: '1px',
                    fill: true,
                    fillColor: 'black'
                })
            },

            data: {
                value: []
            },

            event: {
                hover: {
                    enable: false,
                    tooltipStyle: new KChart.Style({
                        fillColor: "rgba(50, 50, 50, 0.701961)",
                        fontColor: "#fff",
                        fontSize: '14px'
                    })
                }
            }
        }
    }
});


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

