;(function(){
	/**
	 * Shim for Object.create, in case the browser doesn't support it
	 */
	if (typeof Object.create === 'undefined') {
		Object.create = function (o) {
			function F() {};
			F.prototype = o;
			return new F();
		};
	}
	var archetype_EventCount = new Date().getTime();

	var fullCall = function(obj,method, args){
		if(obj[method]) fullCall(Object.getPrototypeOf(obj), args);
		if(obj.hasOwnProperty(method)) obj[method].apply(newObj, args);
	};


	Archetype = {
		initialize : function(){
			return this;
		},
		create : function(){
			var newObj = Object.create(this);
			fullCall(newObj, 'initialize', arguments);
			return newObj;
		},
		extend : function(methods){
			return Object.create(this).mixin(methods);
		},
		mixin : function(methods){
			for(var methodName in methods){
				this[methodName] = methods[methodName];
			}
			return this;
		}
	};

	Archetype_Events = {
		on : function(eventName, event){
			archetype_EventCount++;
			this.__events__ = this.__events__ || [];
			this.__events__.push({
				id    : archetype_EventCount,
				name  : eventName,
				event : event
			});
			return archetype_EventCount;
		},
		trigger : function(eventName){
			this.__events__ = this.__events__ || [];
			for(var i = 0; i < this.__events__.length; i++) {
				if(eventName === this.__events__[i].id || eventName === this.__events__[i].name){
					this.__events__[i].event.apply(this, Array.prototype.slice.apply(arguments).slice(1));
				}
			}
			return this;
		},
		off : function(eventName){
			if(!eventName){
				this.__events__ = [];
				return this;
			}
			var events = [];
			this.__events__ = this.__events__ || [];
			for(var i = 0; i < this.__events__.length; i++) {
				if(eventName !== this.__events__[i].id && eventName !== this.__events__[i].name){
					events.push(this.__events__[i]);
				}
			}
			this.__events__ = events;
			return this;
		}
	};

	Archetype_Super = {
		create : function(){
			var self = this;
			var newObj = Object.create(this);
			newObj.super = function(){
				return self;
			};
			fullCall(newObj, 'initialize', arguments);
			return newObj;
		},
		super : function(){
			return Object.getPrototypeOf(this);
		},
	};


	Archetype.mixin(Archetype_Events);
	Archetype.mixin(Archetype_Super);
	archetype = Archetype;
})();