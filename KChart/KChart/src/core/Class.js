KChart.Util = {

	extend: function(dist) {
		var i, j, len, src;

		//Add the second and later arguments' properties to the first argument.
		for(i = 1, len = arguments.length; i < len; i++) {
			src = arguments[i];

			for(j in src) {
				dist[j] = src[j];
			}
		}

		return dist;
	},

	create: Object.create || function(proto) {
		function F() {};
		F.prototype = proto;
		return new F();
	}
};

KChart.Object = function() {};

KChart.Object.extend = function(props) {

	// @function extend(props: Object): Function
	// [Extends the current class](#class-inheritance) given the properties to be included.
	// Returns a Javascript function that is a class constructor (to be called with `new`).
	var NewClass = function() {
		if(this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};

	/*
	 * NewClass.__root__ points to Object's prototype
	 * NewClass__base__ points to its parent's prototype
	 */
	var parentProto = NewClass.__root__ = NewClass.__base__ = this.prototype;
	var proto = KChart.Util.create(parentProto);
	proto.constructor = NewClass;
	NewClass.prototype = proto;

	// inherit parent's statics
	var i;
	for(i in this) {
		if(this.hasOwnProperty(i) && i != 'prototype' && i != '__base__') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if(props.statics) {
		KChart.Util.extend(NewClass, props.statics);
		delete props.statics;
	}

	// merge options
	if(proto.options) {
		proto.options = KChart.Util.extend(KChart.Util.create(proto.options), props.options);
		delete props.options;
	}

	// merge options
	KChart.Util.extend(proto, props);

	return NewClass;
};