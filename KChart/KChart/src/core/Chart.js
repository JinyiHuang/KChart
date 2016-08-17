KChart.Chart = KChart.Object.extend({

    initialize: function (graphics, config) {
        var me = this;
        me.config = config || KChart.Chart.defaultConfig;

        if (!graphics) {
            throw Error("The Argument 'graphics' Cannot Be Null");
        }
        me.graphics = graphics;

        var grid = me.config.grid || KChart.Chart.defaultConfig.grid,
            defaultGrid = KChart.Chart.defaultConfig.grid;
        me.padingLeft = grid.left || defaultGrid.left;
        me.padingRight = grid.right || defaultGrid.right;
        me.padingTop = grid.top || defaultGrid.top;
        me.padingBottom = grid.bottom || defaultGrid.bottom;

        var convert = KChart.Helper.convertPercentToNumber;
        me.width = graphics.width * (1 - convert(me.padingLeft) - convert(me.padingRight));
        me.height = graphics.height * (1 - convert(me.padingTop) - convert(me.padingBottom));

        //var valueLength = me.config.data.values.length,
        //    labelLength = me.config.xAxis.labels.length;
        me.elementCount = me.config.data.values.length;
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
            },

            animation: {
                enable: true,
                during: 30,
                tween: KChart.Tween.Linear
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

