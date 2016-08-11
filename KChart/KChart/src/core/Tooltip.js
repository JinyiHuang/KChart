KChart.Tooltip = KChart.Object.extend({
    initialize: function (style) {
        this.style = style;

        var div = this.div = document.createElement('div');
        div.style.position = 'absolute';
        div.width = 0;
        div.height = 0;
        div.style.background = style.fillColor;
        div.style.fontSize = style.fontSize;
        div.style.fontFamily = style.fontFamily;
        div.style.color = style.fontColor;
        div.style.padding = '3px 5px';
        div.style.display = 'none';
        div.zIndex = 888;
        document.body.appendChild(div);
    },

    show: function (position, innerHTML) {
        var div = this.div;
        div.style.display = 'inline';
        div.style.left = position.x + 20 + "px";
        div.style.top = position.y + 10 + "px";
        div.innerHTML = innerHTML;
    },

    disappear: function () {
        var div = this.div;
        div.style.display = 'none';
        div.width = 0;
        div.height = 0;
        div.innerHTML = "";
    }
});