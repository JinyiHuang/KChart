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
    },

    convertPercentToNumber: function (percent) {
        return Number.parseFloat(percent) / 100;
    },

    getNumberLength: function (num) {
        return num.toString().length;
    },

    getNthDigit: function (num, n) {
        return +num.toString()[n - 1];
    },

    getMaxCeil: function (num) {
        var helper = KChart.Helper;
        var numLen = helper.getNumberLength(num);
        var digit, ceil;
        for (var i = 1; i < numLen + 1; i++) {
            ceil = 0;
            for (var j = 1; j < i; j++) {
                digit = helper.getNthDigit(num, j);
                ceil += (digit) * Math.pow(10, numLen - j);
            }
            digit = helper.getNthDigit(num, j);
            ceil += (digit + 1) * Math.pow(10, numLen - j);
            if (ceil * 4 / 5 < num) {
                return ceil;
            }
        }
    }
};