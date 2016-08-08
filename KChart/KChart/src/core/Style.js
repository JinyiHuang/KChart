KChart.Style = KChart.Object.extend({

    initialize: function (options) {
        KChart.Util.extend(this, this.options);
        KChart.Util.extend(this, options);
    },

    options: {
        stroke: true,
        borderColor: '#3388ff',
        weight: 3,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: null,
        dashOffset: null,
        fill: false,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        fontFamily: "Arial",
        fontSize: '12px',
        fontColor: 'black',
        textAlign: 'center',
        textBaseline: 'bottom',
    }
});