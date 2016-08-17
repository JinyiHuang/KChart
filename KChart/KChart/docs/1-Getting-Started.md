### Usage

To import KChart.js using an script tag:

```html
<script src="KChart.js"></script>
```

### Creating a Chart

To create a chart, we need to instantiate the subclass of `Graphics` class. To do this, we need to pass in the canvas of where we want to draw the chart. Here's an example.

```html
<canvas id="myChart" width="400" height="400"></canvas>
```

```javascript
// Any of the following formats may be used

//1
var graphics = new KChart.CanvasGraphics('myChart');

//2
var ctx = document.getElementById('myChart');
var graphics = new KChart.CanvasGraphics(ctx);

//3
var ctx = document.getElementById('myChart').getContext('2d');
var graphics = new KChart.CanvasGraphics(ctx);
```


The following example instantiates a bar chart.

```html
<canvas id="canvas" height="800" width="800"></canvas>
<script>
        var Style = KChart.Style;
        var canvas = document.getElementById('canvas');
        var graphics = new KChart.CanvasGraphics(canvas);
        var barChart = new KChart.BarChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                barWidth: '70%',
                styles:[
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#3398DB"
                    }),
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "red"
                    }),
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "green"
                    }),
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "blue"
                    }),
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "yellow"
                    }),
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "orange"
                    }),
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#ccc"
                    }),
                ]
            },
            grid: {
                left: '5%',
                right: '5%',
                top: '5%',
                bottom: '5%'
            },

            xAxis: {
                style: new Style({
                    borderColor: 'black',
                    weight: '1px',
                    fill: true,
                    fillColor: 'black'
                }),
                labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
            },

            yAxis: {
                style: new Style({
                    borderColor: 'black',
                    weight: '1px',
                    textAlign: 'right'
                }),
                valueLineStyle: new Style({
                    borderColor: '#ccc',
                    weight: '1px',
                    fill: true,
                    fillColor: 'black'
                })
            },
            event: {
                hover: {
                    enable: true,
                    tooltipStyle: new Style({
                        fillColor: "rgba(50, 50, 50, 0.701961)",
                        fontColor: "#fff",
                        fontSize: '14px'
                    })
                }
            }
        });
        barChart.draw();
</script>
```
If you don't want to create a specific chart, you can also just pass in the data and use the default config:

```html
<canvas id="canvas" height="800" width="800"></canvas>
<script>
        var canvas = document.getElementById('canvas');
        var graphics = new KChart.CanvasGraphics(canvas);
        var lineChart = new KChart.LineChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120]
            },
            xAxis: {
                labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
            },
            event: {
                hover: {
                    enable: true
                }
            }
        });
        lineChart.draw();
</script>
```

It's that easy to get started using KChart.js! From here you can explore the many options that can help you customise your charts with colors, custom actions, and much more.