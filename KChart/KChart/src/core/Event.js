KChart.Event = {
    addEvent: function (chart, type, handler) {
        KChart.CrossBrowserEvent.addListener(chart.graphics.ctx.canvas, type, handler);
    },

    removeEvent: function (chart, type, handler) {
        KChart.CrossBrowserEvent.removeListener(chart.graphics.ctx.canvas, type, handler);
    }
};