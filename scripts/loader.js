var Snake = {
		settings : {
			rows : 20,
			columns : 20,
			speed : 10,		//kontroluje predkosc poruszania sie weza, a przy okazji fps-y
			height : 400,
			width: 400,
			pointRate : 1,
			controls : {
				KEY_UP : "moveUp",
				KEY_LEFT : "moveLeft",
				KEY_DOWN : "moveDown",
				KEY_RIGHT : "moveRight",
				KEY_ENTER : "gameControl"
			}
			
		}
};

window.addEventListener("load", function() {

	Modernizr.load([
	                {
	                	load : [
	                	        "scripts/sizzle.js",
	                	        "scripts/dom.js",
	                	        "scripts/input.js",
	                	        "scripts/program.js",
	                	        "scripts/display.js"
	                	        
	                	        ],
	                	        complete : function() {
	                	        	Snake.program.initialize();
	                	        	Snake.display.initialize();
	                	        	console.log("Ready.");
	                	        }
	                }
	                ]);

}, false);