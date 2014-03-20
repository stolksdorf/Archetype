Check out a demo [here](http://stolksdorf.github.io/Archetype).

# What is it
Archetype provides inheritable and "event-y" objects in Javascript. Archetype is built with readability and tweakability in mind. I've tried to keep Archetype objects as close to Plain Old JS Objects (POJOs) as possible.


# Inheritance
Trying to fit traditional classes in Javascript has been met with limited success. Instead of going down this route, we'll only the few methods we need and rely heavily on using the [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) as much as possible.

**extend** &nbsp; `var object = archetype.extend({ ... })` <br>
Creates a new object with it's prototype set to the object you are extending from (meanin git will have access to all of it's functions and attributes). All attributes passed in will be added to the new object.

	var Sloth = archetype.extend({
		initialize : function(name){
			this.name = name;
		},
		numOfToes : 2,
		nap       : function(){ ... },
		eat       : function(food){ ... }
	});


**create** &nbsp; `var newObject = object.create(args)` <br>
Creates a new object and sets it's prototype to the object you are creating from. Any arguments passed in will be passed along to the `initialize` function and then called.

	var mySloth = Sloth.create("Woodford");
	console.log("Hello " + mySloth.name);

**initialize** &nbsp; `object.initialize(args)` <br>
`initialize()` is called whenever an object is made using `create()`. Any arguments passed into `create()` will be passed into `initialize()`.

**mixin** &nbsp; `object.mixin({ ... })` <br>
`mixin()` will add any attributes passed to it to the object. Useful for augmenting already created objects.`extend()` uses it in it's execution.

	mySloth.mixin({
		numOfToes : 3,
		hasBowtie : true
	});

**deep** &nbsp; `object.deep(methodName, arg1, arg2, arg3...)` <br>
Being able to access functions from object within the prototype chain can be useful, however can be dangerous. Accidentally modifying objects within the prototype chain can have far reaching effects on many objects inheriting from it. Archetype limits this danger by restricting itself to only execute functions (using the current scope) objects inherited from.

`deep()` traverses the prototype chain and executes every function with a given name in order from oldest to newest. It's Archetypes's form of `super`. Used to call each `initialize()` in the prototype chain whenever you use `create()`.

	Sloth.mixin({
		classification : function(){
			console.log("Suborder : Folivora");
		}
	});

	mySloth.mixin({
		classification : function(){
			console.log("Family : Bradypodidae");
		}
	})
	mySloth.deep("classification"); //both the suborder and family will be printed


# Events
Every object extended from `archetype` can also emit their own events, allowing very easy reactive programming.

**events** &nbsp; `object.events()` <br>
`events()` will return as array of all the current events registered on that object. Useful for debugging.

**on** &nbsp; `object.on(event, function(arg1, arg2,...))` <br>
On sets up a listener for a specific event name. Whenever that event is triggered, each function added with `on()`, will be called with whatever arguments `trigger()` was called with. Each event will be given a unique id, which can be used to specifically disable it useing `off()`.

	var napEventId = sloth.on('nap', function(adjective){
		console.log('The sloth is taking a ' + adjective + ' nap!');
	});

	sloth.trigger('nap', 'aggressive');

**once** &nbsp; `object.once(event, function(arg1, arg2,...))` <br>
The same as `on()` but after it's first call, it will be removed, ensuring it will only be called once.

	sloth.once('yawn', function(){
		console.log('The sloth yawned');
	});
	sloth.trigger('yawn');
	sloth.trigger('yawn'); //Won't yawn twice in a row

**trigger** &nbsp; `object.trigger(event, arg1, arg2, ...)` <br>
Trigger activates each listener for a specific event. You can add any additional parameters to be passed to the listener.

**off** &nbsp; `object.off([event])` <br>
Off removes all listeners on an object for a given event anem or event id. If nothing is given, it will remove all listeners on that object.

	sloth.on('run_fast', function(){
		console.log('The sloth made a speedy getaway.');
	});
	sloth.off('run_fast');
	sloth.trigger('run_fast'); //Won't trigger the speedy getaway

# Other Cool Stuff
Also check out [XO](http://stolksdorf.github.io/XO), a lightweight MVC framework built on Archetype objects, inspired by Backbone.js
