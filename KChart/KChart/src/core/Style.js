KChart.Style = KChart.Object.extend({

    initialize: function (options) {
        KChart.Util.extend(this, this.options);
        KChart.Util.extend(this, options);
    },

    options: {
        stroke: true,
        color: '#3388ff',
        weight: 3,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: null,
        dashOffset: null,
        fill: false,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd'
    }
});