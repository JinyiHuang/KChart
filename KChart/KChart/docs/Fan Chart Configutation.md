---
title: Fan Chart Configuration
anchor: chart-configuration
---

You're provided a number of options for changing the behaviour of created fan charts. These configuration options can be changed by passing in an options object when creating the chart. Besides, the global configuration would be uesd as default options.

### Chart Data

To display data, the chart must be passed a data object that contains all of the information needed by the chart. The data object can contain the following parameters

Name | Type | Description | Default
--- | --- | ---- | ---
values | Array[Number] | Contains values need to be shown. | *
styles | Style or Array[Style] | Optional parameter that set the style of each fan elements. | new Style({stroke: true,border: 'black',fill: true,fillColor: 'red'})


#### Example Usage

To create a bar chart with configuration data options, simply pass an object containing your data to the constructor. In the example below, a bar chart is created.

```javascript
var fanChart = new KChart.FanChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                styles: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                }),
			}
		});
```



### X-Axis Configuration


Name | Type | Description | Default
--- | --- | --- | ---
labels | Array[String] | Optional parameter that shows labels of values | Null




#### Example Usage

The example below would enable x-axis and y-axis on the chart that is created.

```javascript
var fanChart = new KChart.FanChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                styles: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                })
			},
            
            xAxis: {
                labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
            }
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
var fanChart = new KChart.FanChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                styles: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                })
			},
            
            xAxis: {
                labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
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
var fanChart = new KChart.FanChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                styles: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                })
			},
            
            xAxis: {
                labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
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
var fanChart = new KChart.FanChart(graphics, {
            data: {
                values: [10, 50, 100, 500, 450, 230, 120],
                styles: new KChart.Style({
                    stroke: true,
                    border: 'black',
                    fill: true,
                    fillColor: 'red'
                })
			},
            
            xAxis: {
                labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
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
