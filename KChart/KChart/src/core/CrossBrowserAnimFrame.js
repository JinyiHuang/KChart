KChart.CrossBrowserAnimFrame = {

    requestAnimFrame: (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
    })(),

    cancelAnimFrame: (function () {
        return window.cancelAnimationFrame ||
		    window.webkitCancelAnimationFrame ||
		    window.mozCancelAnimationFrame ||
		    window.oCancelAnimationFrame ||
		    window.msCancelAnimationFrame ||
		    function (callback) {
		        return window.clearTimeout(callback, 1000 / 60);
		    }
    })()
}