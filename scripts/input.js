Snake.input = (function() {
	var dom = Snake.dom,
	$ = dom.$,
	settings = Snake.settings,
	inputHandlers;
	
	var keys = {
			37 : "KEY_LEFT",
			38 : "KEY_UP",
			39 : "KEY_RIGHT",
			40 : "KEY_DOWN",
			13 : "KEY_ENTER"
	};
	
	function initialize() {
		inputHandlers = {};
		dom.bind(document, "keydown", function(event) {
			var keyName = keys[event.keyCode];
			if (keyName && settings.controls[keyName]) {
				event.preventDefault();
				trigger(settings.controls[keyName]);
			}
		});
	}
	
	function bind(action, handler) {
		if (!inputHandlers[action]) {
			inputHandlers[action] = [];
		}
		inputHandlers[action].push(handler);
	}
	
	function trigger(action) {
		var handlers = inputHandlers[action],
		args = Array.prototype.slice.call(arguments, 1);
		if (handlers) {
			for (var i=0;i<handlers.length;i++) {
				handlers[i].apply(null, args);
			}
		}
	}
	
	return {
		initialize : initialize,
		bind : bind
	};
})();