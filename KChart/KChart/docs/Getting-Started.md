### Usage

To import KChart.js using an script tag:

```html
<script src="KChart.js"></script>
```

### Creating a Chart

To create a chart, we need to instantiate the subclass of `Chart` class. To do this, we need to pass in the canvas of where we want to draw the chart. Here's an example.

```html
<canvas id="myChart" width="400" height="400"></canvas>
```

```javascript
var ctx = document.getElementById("myChart");
```

Once you have the element or context, you're ready to instantiate a pre-defined chart-type or create your own!

The following example instantiates a bar chart.

```html
<canvas id="canvas" width="800" height="800"></canvas>
<script>
		var data = {
			"一月": 50,
			"二月": 150,
			"三月": 40,
			"四月": 100,
			"五月": 110,
			"六月": 200
		};
		var barChart = new KChart.BarChart(600, 600, data);

		var c = document.getElementById('canvas');
		var s = new KChart.Style({
			stroke: true,
			color: '#3388ff',
			weight: 3,
			opacity: 1,
			lineCap: 'round',
			lineJoin: 'round',
			dashArray: null,
			dashOffset: null,
			fill: true,
			fillColor: '#3388ff',
			fillOpacity: 0.2,
			fillRule: 'evenodd'
		});
		barChart.draw(c, s);
</script>
```

It's that easy to get started using KChart.js! From here you can explore the many options that can help you customise your charts with colors, custom actions, and much more.