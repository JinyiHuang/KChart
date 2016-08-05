KChart.CrossBrowserEvent = {

	addListener: function(elem, type, handler) {

		if(elem.addEventListener) {
		    addListener = function (target, eventType, eventHandler) {
		        target.addEventListener(eventType, eventHandler, false);
		    }
		} else if (elem.attachEvent) {
		    addListener = function (target, eventType, eventHandler) {
		        target.attachEvent("on" + eventType, eventHandler);
		    }
		} else {
		    addListener = function (target, eventType, eventHandler) {

		        if (typeof target["on" + eventType] === 'function') {
		            var oldHandler = target["on" + eventType];
		            target["on" + eventType] = function () {
		                oldHandler();
		                eventHandler();
		            }
		        } else {
		            target["on" + eventType] = eventHandler;
		        }
		    }
		}

		addListener(elem, type, handler);
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

	    if (elem.removeEventListener) {
	        removeListener = function (target, eventType, eventHandler) {
	            target.removeEventListener(eventType, eventHandler, false);
	        }
	    } else if (elem.detachEvent) {
	        removeListener = function (target, eventType, eventHandler) {
	            target.detachEvent("on" + eventType, eventHandler);
	        }
	    } else {
	        removeListener = function (target, eventType, eventHandler) {
	            target["on" + eventType] = null;
	        }
	    }

	    removeListener(elem, type, handler);
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