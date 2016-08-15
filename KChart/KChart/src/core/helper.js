KChart.Helper = {

    getMax: function (values) {
        var max = values[0];
        for (var i = 1; i < values.length; i++) {

            if (max < values[i]) {
                max = values[i];
            }
        }

        return max;
    },

    getMin: function (values) {
        var min = values[0];
        for (var i = 1; i < values.length; i++) {

            if (min > values[i]) {
                min = values[i];
            }
        }

        return min;
    },

    sum: function (values) {
        var amount = 0;
        for (var i = 0; i < values.length; i++) {
            amount += values[i];
        }
        return amount;
    }
};