Archetype
=========

An experimental micro inheritance and events library for javascript.

## Inhertiance

`.instance(args)` - Returns a new instance of the Obj, calling it's initialize function passing the args along

`.extend(methods)` - Returns a new instance of Obj, with the given methods mixed in.

`.mixin(methods)` - Mixes in the given methods to the object and returns it.

`.super(methodName, args)` - Calls the given methodName with the args, if it exists somewhere in the prototype chain


## Events

`.on(eventName, event)` - Sets up an event listener for the given eventName, which will trigger the given event. Returns a unique event id.

`.off(), .off(eventName),.off(eventId)` - Removes the listener for the given event. If nothing is passed, it removes all event listeners.

`.trigger(eventName), .trigger(eventId)` - Triggers event listeners for all given events.





