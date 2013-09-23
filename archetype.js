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
	Archetype_EventCount = new Date().getTime();

	Archetype_Super = {
		instance : function(){
			var newObj = Object.create(this);
			newObj.__super__ = this.__super__ || this;
			return newObj.initialize.apply(newObj, arguments);
		},
		super : function(methodName){
			return Object.getPrototypeOf(this.__super__ || this)[methodName]
					.apply(this, Array.prototype.slice.apply(arguments).slice(1));
		}
	};

	Archetype_Events = {
		on : function(eventName, event){
			Archetype_EventCount++;
			this.__events__ = this.__events__ || [];
			this.__events__.push({
				id    : Archetype_EventCount,
				name  : eventName,
				event : event
			});
			return Archetype_EventCount;
		},
		trigger : function(eventIdentifier){
			this.__events__ = this.__events__ || [];
			for(var i = 0; i < this.__events__.length; i++) {
				if(eventIdentifier === this.__events__[i].id || eventIdentifier === this.__events__[i].name){
					this.__events__[i].event.apply(this, Array.prototype.slice.apply(arguments).slice(1));
				}
			}
			return this;
		},
		off : function(eventIdentifier){
			if(!eventIdentifier){
				this.__events__ = [];
				return this;
			}
			var events = [];
			this.__events__ = this.__events__ || [];
			for(var i = 0; i < this.__events__.length; i++) {
				if(eventIdentifier !== this.__events__[i].id && eventIdentifier !== this.__events__[i].name){
					events.push(this.__events__[i]);
				}
			}
			this.__events__ = events;
			return this;
		}
	};

	Archetype_Inheritance = {
		initialize : function(){
			return this;
		},
		instance : function(){
			var newObj = Object.create(this);
			return newObj.initialize.apply(newObj, arguments);
		},
		extend : function(methods){
			return Object.create(this).mixin(methods);
		},
		mixin : function(methods){
			for(var methodName in methods){
				this[methodName] = methods[methodName];
			}
			return this;
		},
	};


	Archetype = Object.create(Archetype_Inheritance);
	Archetype.mixin(Archetype_Super);
	Archetype.mixin(Archetype_Events);

})();









