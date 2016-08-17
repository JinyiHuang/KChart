---
title: Bar Chart Configuration
anchor: chart-configuration
---

You're provided a number of options for changing the behaviour of created bar charts. These configuration options can be changed by passing in an options object when creating the chart. Besides, the global configuration would be uesd as default options.

### Chart Data

To display data, the chart must be passed a data object that contains all of the information needed by the chart. The data object can contain the following parameters

Name | Type | Description | Default
--- | --- | ---- | ---
values | Array[Number] | Contains values need to be shown. | *
barWidth | String of A percent number | Optional parameter that  determine bars' width. | 60%
styles | Style or Array[Style] | Optional parameter that set the style for each bar elements. | new Style({stroke: false,fill: true,fillColor: "#3398DB"})

#### Example Usage

To create a bar chart with configuration data options, simply pass an object containing your data to the constructor. In the example below, a bar chart is created.

```javascript
var barChart = new KChart.BarChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                barWidth: '70%',
                styles:
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#3398DB"
                    })
			}
		});
```



### X-Axis Configuration


Name | Type | Description | Default
--- | --- | --- | ---
labels | Array[String] | Optional parameter that shows labels of values | Null
style | Style | Optional parameter that set the style of x-axis | new Style({borderColor: 'black',weight: '1px',})



### Y-Axis Configuration


Name | Type | Description | Default
--- | --- | --- | ---
style | Style | Optional parameter that set the style of y-axis | new Style({borderColor: 'black',weight: '1px',textAlign: 'right'})
valueLineStyle | Style | Optional parameter that set the style of value lines | new Style({borderColor: '#ccc',weight: '1px'})


#### Example Usage

The example below would enable x-axis and y-axis on the chart that is created.

```javascript
var barChart = new KChart.BarChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                barWidth: '70%',
                styles:
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#3398DB"
                    })
			},
            
            xAxis: {
                style: new Style({
                    borderColor: 'black',
                    weight: '1px',
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
                })
            },
		});
```

### Grid Configuration

This grid configuration controls the padding of chart graphics.

Name | Type | Description | Default
--- | --- | --- | ---
left | String of A percent number | padding-left | 5%
right | String of A percent number | padding-right | 5%
top | String of A percent number | padding-top | 5%
bottom | String of A percent number | padding-bottom | 5%


#### Example Usage

The example below would enable x-axis and y-axis on the chart that is created.

```javascript
var barChart = new KChart.BarChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                barWidth: '70%',
                styles:
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#3398DB"
                    })
			},
            
            xAxis: {
                style: new Style({
                    borderColor: 'black',
                    weight: '1px',
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
                })
            },
            
            grid: {
                left: '5%',
                right: '5%',
                top: '5%',
                bottom: '5%'
            },
		});
```

### Animation Configuration

The following animation options are available. 

Name | Type | Description | Default 
--- |---| --- | ---
enable | Boolean | enable animation | true
duration | Number | The number of milliseconds an animation takes. | 30
tween | Tween | Easing function to use. | Tween.Linear

#### Example Usage
```javascript
var barChart = new KChart.BarChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                barWidth: '70%',
                styles:
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#3398DB"
                    })
			},
            
            xAxis: {
                style: new Style({
                    borderColor: 'black',
                    weight: '1px',
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
                })
            },
            
            grid: {
                left: '5%',
                right: '5%',
                top: '5%',
                bottom: '5%'
            },
            
             animation: {
                enable: true,
                during: 30,
                tween: KChart.Tween.Linear
            }
		});
```



### Event Configuration

Only hover event is supported now.


Name | Type | Description | Default
--- | --- | --- | ---
hover | Object | hover event configuration | *


#### Hover Event Configuration

Name | Type | Description | Default
--- | --- | --- | ---
enable | Boolean | enable hover event | false
tooltipStyle | Style | set the style of tooltip | new Style({fillColor: "rgba(50, 50, 50, 0.701961)",fontColor: "#fff",fontSize: '14px'})


#### Example Usage
```javascript
var barChart = new KChart.BarChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                barWidth: '70%',
                styles:
                    new Style({
                        stroke: false,
                        fill: true,
                        fillColor: "#3398DB"
                    })
			},
            
            xAxis: {
                style: new Style({
                    borderColor: 'black',
                    weight: '1px',
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
                })
            },
            
            grid: {
                left: '5%',
                right: '5%',
                top: '5%',
                bottom: '5%'
            },
            
             animation: {
                enable: true,
                during: 30,
                tween: KChart.Tween.Linear
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
```
