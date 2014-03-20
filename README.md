Archetype
=========

An experimental micro inheritance and events library for javascript.

## Inhertiance

`.create(args)` - Returns a new instance of the Obj, calling it's initialize and each of it's prototype's initialize

`.extend(methods)` - Returns a new instance of Obj, with the given methods mixed in.

`.mixin(methods)` - Mixes in the given methods to the object and returns it.

`.super()` - Intelligently returns the object's prototype, useful for calling overwritten functions

## Events

`.on(eventName, event)` - Sets up an event listener for the given eventName, which will trigger the given event. Returns a unique event id.

`.off(), .off(eventName),.off(eventId)` - Removes the listener for the given event. If nothing is passed, it removes all event listeners.

`.trigger(eventName), .trigger(eventId)` - Triggers event listeners for all given events.


##Examples

	var Ball = Archetype.extend({
		initialize : function()
		{
			this.on('bounce', function(){

			});
			return this;
		},
		bounce : function()
		{
			console.log('bounce');
			return this;
		}
	});

	var myBall = Ball.instance();

	var MemoryBall = Ball.extend({
		bounceCount : 0,
		getBounceCount  : function()
		{
			return this.bounceCount;
		},
	};

	myBall.mixin(BounceCountMixin);
