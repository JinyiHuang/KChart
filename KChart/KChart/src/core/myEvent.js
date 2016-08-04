Drawing.myEvent = {

	addListener: function(elem, type, handler) {

		if(elem.addEventListener) {
			elem.addEventListener(type, handler, false);
		} else if(elem.attachEvent) {
			elem.attachEvent("on" + type, handler);
		} else {

			if(typeof elem["on" + type] === 'function') {
				var oldHandler = elem["on" + type];
				elem["on" + type] = function() {
					oldHandler();
					handler();
				}
			} else {
				elem["on" + type] = handler;
			}
		}
	},

	getEvent: function(event) {
		return event ? event : window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	preventDefault: function(event) {

		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeListener: function(elem, type, handler) {

		if(elem.removeEventListener) {
			elem.removeEventListener(type, handler, false);
		} else if(elem.detachEvent) {
			elem.detachEvent("on" + type, handler);
		} else {
			elem["on" + type] = null;
		}
	},

	stopPropagation: function(event) {

		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},

	getRelatedTarget: function(event) {

		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if(event.toElement && event.type == "mouseout") {
			return event.toElement;
		} else if(event.fromElement && event.type == "mouseover") {
			return event.fromElement;
		} else {
			return null;
		}
	},

	getButton: function(event) {

		if(document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
					break;
				case 2:
				case 6:
					return 2;
					break;
				case 4:
					return 1;
					break;
				default:
					break;
			}
		}
	},

	getCharCode: function(event) {

		if(typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}
};